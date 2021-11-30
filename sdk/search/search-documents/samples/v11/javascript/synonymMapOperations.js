// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the SynonymMap Operations.
 */

const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const dotenv = require("dotenv");
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const synonymMapName = "example-synonymmap-sample-1";

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
  for (let sm of listOfSynonymMaps) {
    console.log(`Name: ${sm.name}`);
    console.log(`Synonyms`);
    for (let synonym of sm.synonyms) {
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
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    await createSynonymMap(synonymMapName, client);
    await getAndUpdateSynonymMap(synonymMapName, client);
    await listSynonymMaps(client);
  } finally {
    await deleteSynonymMap(synonymMapName, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
