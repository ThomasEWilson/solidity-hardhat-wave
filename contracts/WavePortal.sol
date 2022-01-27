// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract WavePortal {
    uint256 totalWaves;
    mapping(address => uint) public waves;

    constructor() {
        console.log("Yo yo, I am a contract and I am (not that) smart");
    }

    function wave() public {
        waves[msg.sender] += 1;
        totalWaves += 1;
        console.log("Waving in the breeze, sender sways..");
        console.log("Added a wave for %s for account total %d", msg.sender, waves[msg.sender]);
        console.log("Total Accumulated Waves: %d", totalWaves);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getAccountWaves() public view returns (uint256) {
        console.log("We have %d waves on account %s!", waves[msg.sender], msg.sender);
        return waves[msg.sender];
    }
}
