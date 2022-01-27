/*
Main Node.js Hardhat Environment
 - hre can get signers for testing.
 - deploy contract using a factory.
 - call functions on the contract after deployment with various signers.

 -- for now, enjoy some beautiful logs on from the contract side.
*/


const main = async () => {
    const [owner, sally] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveTxn,
        sallyWaveTxn,
        totalWaveCount, 
        ownerAccountCount,
        sallyAccountCount;

    totalWaveCount = await waveContract.getTotalWaves();
  
    // wave once, from owner.
    waveTxn = await waveContract.wave();
    await waveTxn.wait();

    // wave again, from owner
    waveTxn = await waveContract.wave();
    await waveTxn.wait();

    // get total waves
    totalWaveCount = await waveContract.getTotalWaves();

    sallyWaveTxn = await waveContract.connect(sally).wave();
    await sallyWaveTxn.wait();
    
    // notice public view functions do not need `await tx.wait()`
    //  as they respond to anyone nearly instantly.
    ownerAccountCount = await waveContract.getAccountWaves();

    sallyAccountCount = await waveContract.connect(sally).getAccountWaves();

    totalWaveCount = await waveContract.getTotalWaves();
    
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();