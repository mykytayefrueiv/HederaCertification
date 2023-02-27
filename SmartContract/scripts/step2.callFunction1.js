const {
    Client,
    ContractFunctionParameters,
    ContractExecuteTransaction,
    PrivateKey, Wallet,
} = require("@hashgraph/sdk");
require('dotenv').config({ path: 'SmartContract_Service/.env' });

const Web3 = require('web3');
const web3 = new Web3;
let abi;
const myAccountId = "0.0.3370717";
const myPrivateKey = PrivateKey.fromString("7b8acad34afaab133fdad81573783da790576edb49217d5d4d9a51eeba2ccb12");

const client = Client.forTestnet();
const contractId = "0.0.3582219";

client.setOperator(myAccountId, myPrivateKey);

async function main() {
    const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("function1", new ContractFunctionParameters().addUint16(4).addUint16(3));

    const submitExecTx = await contractExecTx.execute(client);

    const receipt = await submitExecTx.getReceipt(client);

    console.log("The transaction status is " + receipt.status.toString());

    const record = await submitExecTx.getRecord(client);
    console.log('Result 1', record.contractFunctionResult.bytes);

    // Is not working :(
    // const nextContractExecTx = await new ContractExecuteTransaction()
    //     .setContractId(contractId)
    //     .setGas(100000)
    //     .setFunction("function2", new ContractFunctionParameters().addUint16(+record.contractFunctionResult.bytes));
    //
    // const nextSubmitExecTx = await nextContractExecTx.execute(client);
    //
    // const receipt2 = await nextSubmitExecTx.getReceipt(client);
    //
    // const record2 = await submitExecTx.getRecord(client);
    //
    // console.log(record2);
    //
    // console.log("The transaction status is " + receipt2.status.toString());

    process.exit();
}
