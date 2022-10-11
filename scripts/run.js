async function main() {

    // Define a list of wallets to airdrop NFTs
    const airdropAddresses = [
      '0xE034873c34EDa00b6D745BBf51cDbBD9d84F3850',
      '0xe3648B1465193b639574459Dd33d376bd78f26Aa',
      '0x2320d90430fED27648E9107651C9041De09B3471',
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    ];
  
    const factory = await hre.ethers.getContractFactory("NFTAirdrop");
    const [owner] = await hre.ethers.getSigners();
	console.log("Account balance:", (await owner.getBalance()).toString());

    const contract = await factory.deploy();
  
    await contract.deployed();
    console.log("Contract deployed to: ", contract.address);
    console.log("Contract deployed by (Owner): ", owner.address, "\n");
  
    let txn;
    txn = await contract.airdropNfts(airdropAddresses);
    await txn.wait();
    console.log("NFTs airdropped successfully!");
  
    console.log("\nCurrent NFT balances:")
    for (let i = 0; i < airdropAddresses.length; i++) {
      let bal = await contract.balanceOf(airdropAddresses[i]);
      console.log(`${i + 1}. ${airdropAddresses[i]}: ${bal}`);
    }
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });