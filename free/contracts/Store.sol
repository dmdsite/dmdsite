pragma solidity ^0.5.8;

contract Store{

    mapping (address=>uint16) MyCokeNum;
    uint16 mycoke = 0;

function BuyCoke() payable external{
    MyCokeNum[msg.sender]++;
    mycoke ++;
}

function GetMyCokeNum() view external returns(uint16){
    return mycoke;
    //return MyCokeNum[msg.sender];
}
}
