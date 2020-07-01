// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndex,
  KnownTokenFilterNames
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running Analyze Text Sample....`);
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const index:SearchIndex = await client.getIndex("example-index");

  index.tokenizers?.push({
    name: "example-tokenizer",
    odatatype: "#Microsoft.Azure.Search.StandardTokenizerV2",
    maxTokenLength: 125
  });

  index.charFilters?.push({
    name: "example-char-filter",
    odatatype: "#Microsoft.Azure.Search.MappingCharFilter",
    mappings: ["MSFT=>Microsoft"]
  });

  index.tokenFilters?.push({
    name: "example-token-filter",
    odatatype: "#Microsoft.Azure.Search.StopwordsTokenFilter",
    stopwords: ["xyzzy"]
  });

  index.analyzers?.push({
    name: "example-analyzer",
    odatatype: "#Microsoft.Azure.Search.CustomAnalyzer",
    tokenizerName: "example-tokenizer",
    charFilters: ["example-char-filter"],
    tokenFilters: [KnownTokenFilterNames.Lowercase, "example-token-filter"]
  });

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
