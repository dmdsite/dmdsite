pragma solidity ^0.4.24;

contract LeaseProperty {

    address[16] public lessees;

    // Lease a property
    function lease(uint propertyId) public returns (uint) {
        require(propertyId >= 0 && propertyId <= 15);
        lessees[propertyId] = msg.sender;
        return propertyId;
    }

    // Retrieving the lessees
    function getLessees() public view returns (address[16]) {
        return lessees;
    }

    function resetAsset() public returns (address[16]) {
        // require(propertyId >= 0 && propertyId <= 15);
        // lessees[propertyId] = 0x0000000000000000000000000000000000000000;
        for(uint i=0; i<16; i++){
            lessees[i]=0x0000000000000000000000000000000000000000;
        }
        return lessees;
    }
}