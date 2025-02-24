// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PurviewScanning, { isUnexpected, paginate } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = PurviewScanning(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleListAllDataSources", async () => {
    const client = PurviewScanning(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const dataSources = await client.path("/datasources").get();
    if (isUnexpected(dataSources)) {
      throw dataSources.body.error;
    }
    // @ts-preserve-whitespace
    const pagedDataSources = paginate(client, dataSources);
    for await (const dataSource of pagedDataSources) {
      console.log(`Data Source Name: ${dataSource.name}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
