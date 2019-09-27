import React, { Component } from 'react'
//import Store from "./contracts/Store.json";
//import Store from "./contracts/Store_ropsten.json";
import Store from "./contracts/Store.json";
import getWeb3 from './utils/getWeb3';
import logo from './sprite_logo2.jpg';

class App extends Component {
constructor(props) {
super(props)

this.state = {
web3: null,
storeInstance:null, //storeInstance 추가
myAccount:null, //myAccount 추가

//새로운추가 코드
myCokeNum:0 // 나의 콜라 개수저장 변수 myCokeNum추가
   }
 }

componentWillMount() {
getWeb3
   .then(results => {
this.setState({
web3: results.web3
     })

this.instantiateContract()
   })
   .catch(() => {
console.log('Error finding web3.')  
   })
 }

instantiateContract() {

const contract = require('truffle-contract')
const simpleStore = contract(Store)
simpleStore.setProvider(this.state.web3.currentProvider)
console.log("provider");
console.dir(this.state.web3.currentProvider);
//아래를 추가해주시면 됩니다.
this.state.web3.eth.getAccounts((error,accounts)=>{
if(!error){
simpleStore.deployed().then(instance=>{
this.setState({storeInstance:instance,myAccount:accounts[0]})
console.log("get instance ")
console.dir(instance) 
console.log(" ethaccounts : ");
console.dir( accounts[0]);
//새로운 추가 코드
this.getMyCoke();

       })
     }
   })

 }

buyCoke=()=>{
console.log("##성공")
this.state.storeInstance.BuyCoke({
from:this.state.myAccount,
value:this.state.web3.toWei(0.01,"ether")
   })
 }

getMyCoke=()=>{
this.state.storeInstance.GetMyCokeNum().then(result=>{
this.setState({myCokeNum: result.toNumber()});
console.log(" Total " + this.state.myCokeNum +  "   " + result );
   });
 }

render() {
return (
<div>
   <center>
<h1><font size="7"> Beverage </font></h1>
   <img src={logo} className="App-logo" alt="logo" width="" height="450" />  
   <div><font size="5" >Sprite : </font> <button onClick={this.buyCoke}> <font size="4" >Buy Now</font></button></div>
   <div><font size="5" >Total : {this.state.myCokeNum}  </font> <button onClick={this.getMyCoke}><font size="4" >Refresh</font></button> </div> 
   </center>
</div>
   );
 }
}

export default App