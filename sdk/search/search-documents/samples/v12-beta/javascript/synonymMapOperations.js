// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the SynonymMap Operations.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const TEST_SYNONYM_MAP_NAME = "example-synonymmap-sample-1";

async function createSynonymMap(synonymMapName, client) {
  console.log(`Creating SynonymMap Operation`);
  const sm = {
    name: synonymMapName,
    synonyms: ["United States, United States of America => USA", "Washington, Wash. => WA"],
  };
  await client.createSynonymMap(sm);
}

async function getAndUpdateSynonymMap(synonymMapName, client) {
  console.log(`Get And Update SynonymMap Operation`);
  const sm = await client.getSynonymMap(synonymMapName);
  console.log(`Update synonyms Synonym Map my-synonymmap`);
  sm.synonyms.push("Florida, Fld. => FL");
  await client.createOrUpdateSynonymMap(sm);
}

async function listSynonymMaps(client) {
  console.log(`List SynonymMaps Operation`);
  const listOfSynonymMaps = await client.listSynonymMaps();

  console.log(`List of SynonymMaps`);
  console.log(`*******************`);
  for (const sm of listOfSynonymMaps) {
    console.log(`Name: ${sm.name}`);
    console.log(`Synonyms`);
    for (const synonym of sm.synonyms) {
      console.log(synonym);
    }
  }
}

async function deleteSynonymMap(synonymMapName, client) {
  console.log(`Deleting SynonymMap Operation`);
  await client.deleteSynonymMap(synonymMapName);
}

async function main() {
  console.log(`Running Index Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());
  try {
    await createSynonymMap(TEST_SYNONYM_MAP_NAME, client);
    await getAndUpdateSynonymMap(TEST_SYNONYM_MAP_NAME, client);
    await listSynonymMaps(client);
  } finally {
    await deleteSynonymMap(TEST_SYNONYM_MAP_NAME, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
