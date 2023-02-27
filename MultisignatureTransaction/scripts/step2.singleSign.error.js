const {
	TransferTransaction,
	Client,
	Hbar,
	HbarUnit
} = require("@hashgraph/sdk");
require('dotenv').config({path: 'Scheduled_TX/.env'});
const {PrivateKey} = require("@hashgraph/sdk");

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

const multiSignAccountId = '0.0.3581170';
const multiSignPrivateKey = PrivateKey.fromString("67ee39a35c140af851a646c55d74e31ef591a521bbecba6e75df573edf35d660");

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
	const transaction = await (await new TransferTransaction()
		.addHbarTransfer(multiSignAccountId, Hbar.from(-10, HbarUnit.Hbar))
		.addHbarTransfer(fourthAccountId, Hbar.from(10, HbarUnit.Hbar))
		.freezeWith(client)
		.sign(firstPrivateKey))
		.execute(client);

	const receipt = await transaction.getReceipt(client);

	console.log("Transaction status is: ", receipt.status.toString());

	process.exit();
}

main();
