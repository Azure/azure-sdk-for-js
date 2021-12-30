// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { CosmosClient } = require("@azure/cosmos");
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const dbId = process.env.COSMOS_DATABASE || "<cosmos database>";

const client = new CosmosClient({ endpoint, key });

async function handleError(error) {
  console.log("\nAn error with code '" + error.code + "' has occurred:");
  console.log(error);
  await finish();
  process.exitCode = 1;
}

async function finish() {
  try {
    await client.database(dbId).delete();
    console.log("\nEnd of demo.");
  } catch (err) {
    console.log(
      `Database: "${dbId}" might not have deleted properly. You might need to delete it manually.`
    );
    process.exitCode = 1;
  }
}

let currentStep = 0;
function logStep(message) {
  currentStep++;
  console.log(`\n${currentStep}: ${message}`);
}

function logSampleHeader(sampleName) {
  console.log("Azure Cosmos DB Node.js Samples");
  console.log("================================");
  console.log(sampleName);
  console.log("================================");
}

module.exports = { handleError, finish, logStep, logSampleHeader };
