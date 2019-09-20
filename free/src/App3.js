import React, { Component } from 'react'
//import Store from "./contracts/Store.json";
//import Store from "./contracts/Store_ropsten.json";
import Store from "./contracts/Store copy 3";
import getWeb3 from './utils/getWeb3';

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
   
   //아래를 추가해주시면 됩니다.
   this.state.web3.eth.getAccounts((error,accounts)=>{
   if(!error){
   simpleStore.deployed().then(instance=>{
   this.setState({storeInstance:instance,myAccount:accounts[0]})
   
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
      });
    }
   
   render() {
      return (
         <div>
         <h3>우진이가 좋아하는 사이다 구매 페이지</h3>
         <div><input type="text" value={this.state.num} onChange={this.handleChange}></input></div>
         <div>사이다 구매하기 : <button onClick={this.buyCoke}>클릭</button></div>
         <div>우진의 사이다 개수 : {this.state.myCokeNum} <button onClick={this.getMyCoke}>갱신하기</button> </div> 
         </div>
            );
          }
         }
   
   export default App
   