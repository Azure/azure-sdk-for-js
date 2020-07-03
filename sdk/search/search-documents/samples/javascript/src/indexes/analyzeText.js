// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

const {
  SearchIndexClient,
  AzureKeyCredential,
  KnownTokenFilterNames
} = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running Analyze Text Sample....`);
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const index = await client.getIndex("example-index");

  // Note adding this analyzer to an existing index will cause it to be unresponsive
  // for a short period, hence the need to pass `allowIndexDowntime: true`.
  await client.createOrUpdateIndex(index, { allowIndexDowntime: true });

  const result = await client.analyzeText("example-index", {
    text: "MSFT is xyzzy Great!",
    analyzerName: "example-analyzer"
  });

  console.log(result.tokens);

}

main();
