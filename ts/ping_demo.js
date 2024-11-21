"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3 = require("@solana/web3.js");
var dotenv = require("dotenv");
var helpers_1 = require("@solana-developers/helpers");
var CLUSTER_NAME = "devnet";
var PING_PROGRAM_ADDRESS = new web3.PublicKey("CWXWAWgmHsKisPp8rvAhWrbECzc5xwBk2DiB43txNBp1");
var PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
dotenv.config();
var payer = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
console.log("\uD83D\uDD11 Loaded keypair ".concat(payer.publicKey.toBase58(), "!"));
var connection = new web3.Connection(web3.clusterApiUrl(CLUSTER_NAME));
console.log("\u26A1\uFE0F Connected to Solana ".concat(CLUSTER_NAME, " cluster!"));
// Note: may not work first time as `await` returns before Lamports are confirmed.
// Being fixed in https://github.com/solana-labs/solana-web3.js/issues/1579
await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1);
console.log("\uD83D\uDCB8 Got some ".concat(CLUSTER_NAME, " lamports!"));
var transaction = new web3.Transaction();
var programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
var pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);
var instruction = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
        },
    ],
    programId: programId,
});
transaction.add(instruction);
var signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
console.log("\u2705 Transaction completed! You can view your transaction on the Solana Explorer at:");
console.log("https://explorer.solana.com/tx/".concat(signature, "?cluster=").concat(CLUSTER_NAME));
