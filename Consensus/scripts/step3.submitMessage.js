const {
    PrivateKey,
    TopicMessageSubmitTransaction,
    Client
} = require("@hashgraph/sdk");
require('dotenv').config({ path: 'Consensus_Service/.env' });

const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");
const topicId = '0.0.3582074'

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
    let sendResponse = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: `Current time: ${Date.now().valueOf()}`,
    }).execute(client);
    const getReceipt = await sendResponse.getReceipt(client);
    const transactionStatus = getReceipt.status;

    console.log("The message transaction status: " + transactionStatus);

    process.exit();
}

main();
