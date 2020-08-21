// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndex
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

export async function main() {
  console.log(`Running Create Index Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const index: SearchIndex = {
    name: "example-index-2",
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true
      },
      {
        type: "Edm.Double",
        name: "awesomenessLevel",
        sortable: true,
        filterable: true,
        facetable: true
      },
      {
        type: "Edm.String",
        name: "description",
        searchable: true
      },
      {
        type: "Edm.ComplexType",
        name: "details",
        fields: [
          {
            type: "Collection(Edm.String)",
            name: "tags",
            searchable: true
          }
        ]
      },
      {
        type: "Edm.Int32",
        name: "hiddenWeight",
        hidden: true
      }
    ]
  };
  await client.createIndex(index);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
