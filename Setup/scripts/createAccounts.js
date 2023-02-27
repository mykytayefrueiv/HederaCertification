const { Client, PrivateKey, AccountCreateTransaction, Hbar, HbarUnit} = require("@hashgraph/sdk");
require("dotenv").config();

const myAccountId = "0.0.3370717";
const myPrivateKey = "7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12";

async function main() {
	const client = Client.forTestnet();
	client.setOperator(myAccountId, myPrivateKey);

	for(let i = 0; i < 5; i++) {
		const newAccountPrivateKey = PrivateKey.generateED25519();
		const newAccountPublicKey = newAccountPrivateKey.publicKey;

		const newAccount = await new AccountCreateTransaction()
			.setKey(newAccountPublicKey)
			.setInitialBalance(Hbar.from(100, HbarUnit.Hbar))
			.execute(client);

		const getReceipt = await newAccount.getReceipt(client);

		console.log({
			newAccountId: getReceipt.accountId.toString(),
			newAccountPublicKey: newAccountPublicKey.toStringRaw(),
			newAccountPrivateKey: newAccountPrivateKey.toStringRaw(),
		})
	}

	process.exit();
}

main();
