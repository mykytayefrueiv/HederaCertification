const {
	TransferTransaction,
	Client,
	ScheduleCreateTransaction,
	PrivateKey,
	Hbar, Timestamp, TransactionReceipt
} = require("@hashgraph/sdk");
require('dotenv').config();

const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");

const firstAccountId = '0.0.3581078'
const firstPrivateKey = PrivateKey.fromString("8af3b8419246d383864616739aa600cf6fb47cd47784ae2e17cf50980ef784f9");

const secondAccountId = '0.0.3581079'
const secondPrivateKey = PrivateKey.fromString("c3ce86ecf15ce138adfefe428c6c797e26717a631c92a67970b06d51add89607");

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
	//Create a transaction to schedule
	const transaction = new TransferTransaction()
		.addHbarTransfer(firstAccountId, Hbar.fromTinybars(-10))
		.addHbarTransfer(secondAccountId, Hbar.fromTinybars(10))

	const scheduleTransaction = await new ScheduleCreateTransaction()
		.setScheduledTransaction(transaction)
		.setScheduleMemo("Transaction")
		.setAdminKey(myPrivateKey)
		.execute(client);

	const receipt = await scheduleTransaction.getReceipt(client);

	const scheduleId = receipt.scheduleId;
	console.log("The schedule ID is " + scheduleId);

	const scheduledTxId = receipt.scheduledTransactionId;
	console.log("The scheduled transaction ID is " + scheduledTxId);

	console.log(
		{
			encodedInfo: btoa(JSON.stringify({
				scheduleId: receipt.scheduleId.toString(),
				scheduledTransactionId: receipt.scheduledTransactionId.toString()
			}))
		});

	// Put the base64 to the Step2.

	process.exit();
}

main();
