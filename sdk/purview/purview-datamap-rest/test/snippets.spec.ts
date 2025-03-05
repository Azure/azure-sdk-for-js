// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PurviewDataMap, { isUnexpected } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = PurviewDataMap(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleGetAllTypeDefinitions", async () => {
    const client = PurviewDataMap(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const result = await client.path("/atlas/v2/types/typedefs").get();
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result.body;
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.businessMetadataDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.classificationDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.entityDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.enumDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.relationshipDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.structDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
    // @ts-preserve-whitespace
    for (const entityDef of result.body?.termTemplateDefs) {
      console.log(`Entity Definition Name: ${entityDef.name}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
