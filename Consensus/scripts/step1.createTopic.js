const {
    TopicCreateTransaction,
    Client,
    PrivateKey
} = require("@hashgraph/sdk");
require('dotenv').config();

const firstAccountId = '0.0.3581078'
const firstPrivateKey = PrivateKey.fromString("8af3b8419246d383864616739aa600cf6fb47cd47784ae2e17cf50980ef784f9");

const client = Client.forTestnet();

client.setOperator(firstAccountId, firstPrivateKey);

async function main() {
    let txResponse = await new TopicCreateTransaction().execute(client);
    let receipt = await txResponse.getReceipt(client);
    let topicId = receipt.topicId;

    console.log(`Your topic ID is: ${topicId}`);

    // Wait 5 seconds between consensus topic creation and subscription
    await new Promise((resolve) => setTimeout(resolve, 5000));

    process.exit();
}

main();
