const {
	TokenCreateTransaction,
	Client,
	TokenType,
	TokenSupplyType,
	PrivateKey,
	AccountBalanceQuery, TokenFeeScheduleUpdateTransaction, CustomFee, CustomRoyaltyFee, CustomFixedFee, Hbar, AccountId,
	TokenMintTransaction, TokenAssociateTransaction, TransferTransaction
} = require("@hashgraph/sdk");
require('dotenv').config();

const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");

const firstAccountId = '0.0.3581078'
const firstPrivateKey = PrivateKey.fromString("8af3b8419246d383864616739aa600cf6fb47cd47784ae2e17cf50980ef784f9");

const secondAccountId = '0.0.3581079'
const secondPrivateKey = PrivateKey.fromString("c3ce86ecf15ce138adfefe428c6c797e26717a631c92a67970b06d51add89607");

const thirdAccountId = '0.0.3581080'
const thirdPrivateKey = PrivateKey.fromString("751550365f7ace8f82db2aec188ac5156b0fe2de9fb6958afd26fcb8246c44ef");

const fourthAccountId = '0.0.3581081'
const fourthPrivateKey = PrivateKey.fromString("7acf5fba00fb59e142d708e543b9f039c06645d285a9c8e5841a149a6dfde2ba");

const fifthAccountId = '0.0.3581083'
const fifthPrivateKey = PrivateKey.fromString("83106297d684c3a49bd918eebd90976625d6aa1989d865cc06f11b2c04bb2c3f");

const tokenId = '0.0.3581443';

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
	// Comment if necessary
	await mintNFTs();
	await associateNFT()
	await sendNFTs();

	let balanceCheckTx = await new AccountBalanceQuery().setAccountId(firstAccountId).execute(client);
	console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

	balanceCheckTx = await new AccountBalanceQuery().setAccountId(secondAccountId).execute(client);
	console.log(`- Buyer's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

	process.exit();
}

main();


async function mintNFTs() {
	for(let i = 0; i < 5; i++) {
		let mintTx = await new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(`NFT ${i}`)])
			.freezeWith(client);

		let mintTxSign = await mintTx.sign(firstPrivateKey);
		let mintTxSubmit = await mintTxSign.execute(client);
		let mintRx = await mintTxSubmit.getReceipt(client);

		console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
	}

	let balanceCheckTx = await new AccountBalanceQuery().setAccountId(firstAccountId).execute(client);
	console.log(`- User balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
}

async function associateNFT() {
	let associateBuyerTx = await new TokenAssociateTransaction()
		.setAccountId(secondAccountId)
		.setTokenIds([tokenId])
		.freezeWith(client)
		.sign(secondPrivateKey)

	let associateBuyerTxSubmit = await associateBuyerTx.execute(client);
	let associateBuyerRx = await associateBuyerTxSubmit.getReceipt(client);
	console.log(`- Token association with the users account: ${associateBuyerRx.status} \n`);
}

async function sendNFTs() {
	for(let i = 0; i < 5; i++) {
		let tokenTransferTx = await new TransferTransaction()
			.addNftTransfer(tokenId, i, firstAccountId, secondAccountId)
			.freezeWith(client)
			.sign(firstPrivateKey);

		let tokenTransferSubmit = await tokenTransferTx.execute(client);
		let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

		console.log(`\n- NFT transfer from Treasury to Buyer: ${tokenTransferRx.status} \n`);
	}
}