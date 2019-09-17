pragma solidity ^0.4.24;

contract LeaseProperty {
    address[16] public leasees;  //16개의 address 배열

    function lease(uint propertyId) public returns(uint) {
        require(propertyId >= 0 && propertyId <= 15);
        leasees[propertyId] = msg.sender;
        return propertyId;
     }   // propertyId를 호출한 address를 배열에 set.

    function getLessees() public view returns (address[16]) {
        return leasees;
    }    // lessees 배열 set.
}

    