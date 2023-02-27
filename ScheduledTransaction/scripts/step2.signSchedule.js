const {
	TransferTransaction,
	Client,
	ScheduleCreateTransaction,
	PrivateKey,
	Hbar, Timestamp, TransactionReceipt, ScheduleSignTransaction, TransactionId
} = require("@hashgraph/sdk");
require('dotenv').config();

const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");

const firstAccountId = '0.0.3581078'
const firstPrivateKey = PrivateKey.fromString("8af3b8419246d383864616739aa600cf6fb47cd47784ae2e17cf50980ef784f9");

const serializedTransactionInfo = 'eyJzY2hlZHVsZUlkIjoiMC4wLjM1ODIwMTYiLCJzY2hlZHVsZWRUcmFuc2FjdGlvbklkIjoiMC4wLjMzNzA3MTdAMTY3NzQ5NDIzOS43MjU5ODI1NzE/c2NoZWR1bGVkIn0='

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
	const scheduleInfo = JSON.parse(atob(serializedTransactionInfo))

	const transaction = await new ScheduleSignTransaction()
		.setScheduleId(scheduleInfo.scheduleId)
		.freezeWith(client)
		.sign(firstPrivateKey);

	const txResponse = await transaction.execute(client);

	const receipt1 = await txResponse.getReceipt(client);
	console.log("The transaction status is " +receipt1.status.toString());

	const scheduledTxRecord = await TransactionId.fromString(scheduleInfo.scheduleId).getRecord(client);
	console.log("The scheduled transaction record is: " +scheduledTxRecord);

	process.exit();
}

main();
