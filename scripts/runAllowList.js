const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const [owner, address1, address2] = await hre.ethers.getSigners();

  // Define a list of allowlisted wallets
  const allowlistedAddresses = [
    address1.address,
    address2.address,
  ];

  // Select an allowlisted address to mint NFT
  const selectedAddress = address1.address;

  // Define wallet that will be used to sign messages
  const walletAddress = '0x63a22a955534635e612765A50Febfc3759EB81b9'; // owner.address
  const privateKey = 'b1f744981e9542547f68b2246d9c65da189df0033db442cddbb57b3b07fee922';
  const signer = new ethers.Wallet(privateKey);
  console.log("Wallet used to sign messages: ", signer.address, "\n");

  let messageHash, signature;

  // Check if selected address is in allowlist
  // If yes, sign the wallet's address
  if (allowlistedAddresses.includes(selectedAddress)) {
    console.log("Address is allowlisted! Minting should be possible.");

    // Compute message hash
    messageHash = ethers.utils.id(selectedAddress);
    console.log("Message Hash: ", messageHash);

    // Sign the message hash
    let messageBytes = ethers.utils.arrayify(messageHash);
    signature = await signer.signMessage(messageBytes);
    console.log("Signature: ", signature, "\n");
  }

  const factory = await hre.ethers.getContractFactory("NFTAllowlist");
  const contract = await factory.deploy();

  await contract.deployed();
  console.log("Contract deployed to: ", contract.address);
  console.log("Contract deployed by (Owner/Signing Wallet): ", owner.address, "\n");

  recover = await contract.recoverSigner(messageHash, signature);
  console.log("Message was signed by: ", recover.toString());

  let txn;
  txn = await contract.connect(address1).claimAirdrop(2, messageHash, signature);
  await txn.wait();
  console.log("NFTs minted successfully!");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });