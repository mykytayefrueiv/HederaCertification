const {
    TopicMessageQuery,
    Client,
    PrivateKey
} = require("@hashgraph/sdk");
require('dotenv').config();

const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");

const client = Client.forTestnet();
const topicId = '0.0.3582074'

client.setOperator(myAccountId, myPrivateKey);

async function main() {
    //Create the query to subscribe to a topic
    new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(
            client,
            (message) => console.log(Buffer.from(message.contents, "utf8").toString())
        );
}

main();
