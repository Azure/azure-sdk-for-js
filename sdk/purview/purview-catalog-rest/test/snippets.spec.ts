// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PurviewCatalog from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = PurviewCatalog(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleGetAllTypeDefs", async () => {
    const client = PurviewCatalog(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const dataSources = await client.path("/atlas/v2/types/typedefs").get();
    // @ts-preserve-whitespace
    if (dataSources.status !== "200") {
      throw dataSources.body;
    }
    // @ts-preserve-whitespace
    for (const entityDef of dataSources.body.entityDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
