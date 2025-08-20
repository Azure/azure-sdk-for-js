// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import FarmBeats, { isUnexpected, paginate } from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";

describe("snippets", async () => {
  it("CreateFarmBeatsClient", async () => {
    const client = FarmBeats(
      "https://<farmbeats resource name>.farmbeats.azure.net",
      new DefaultAzureCredential(),
    );
  });

  it("CreateParty", async () => {
    const client = FarmBeats(
      "https://<farmbeats resource name>.farmbeats.azure.net",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const partyId = "test_party";
    const result = await client.path("/parties/{partyId}", partyId).patch({
      body: {
        name: "Contoso Party",
        description: "Your custom party description here",
        status: "Active",
        properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
      },
      // Set the content-type of the request
      contentType: "application/merge-patch+json",
    });
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    const party = result.body;
    console.log(`Created Party: ${party.name}`);
  });

  it("ListParties", async () => {
    const client = FarmBeats(
      "https://<farmbeats resource name>.farmbeats.azure.net",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const response = await client.path("/parties").get();
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const parties = paginate(client, response);
    // @ts-preserve-whitespace
    // Log each party id
    for await (const party of parties) {
      const partyOutput = party;
      console.log(partyOutput.id);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
