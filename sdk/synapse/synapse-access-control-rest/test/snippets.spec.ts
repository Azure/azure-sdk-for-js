// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import AccessControl, { isUnexpected, paginate } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = AccessControl("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const initialResponse = await client.path("/roleAssignments").get();
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const assignments = paginate(client, initialResponse);
    for await (const assignment of assignments) {
      console.log(`Role Assignment ID: ${assignment.id}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
