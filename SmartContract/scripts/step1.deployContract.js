const {
    Client,
    FileCreateTransaction,
    ContractCreateTransaction,
    PrivateKey,
    ContractFunctionParameters, Wallet, ContractCreateFlow
} = require("@hashgraph/sdk");
const fs = require("fs");
require('dotenv').config();

const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");

const firstAccountId = '0.0.3581078'
const firstPrivateKey = PrivateKey.fromString("8af3b8419246d383864616739aa600cf6fb47cd47784ae2e17cf50980ef784f9");

const client = Client.forTestnet();

client.setOperator(firstAccountId, firstPrivateKey);

async function main() {
    let contract = require("../contracts/artifacts/CertificationC1.json");
    const bytecode = contract.bytecode;

    const contractCreate = new ContractCreateFlow()
        .setGas(100000)
        .setBytecode(bytecode);

    const txResponse = contractCreate.execute(client);
    const receipt = (await txResponse).getReceipt(client);
    const newContractId = (await receipt).contractId;

    console.log("The new contract ID is " +newContractId);
    process.exit();
}

main();


