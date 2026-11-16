// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { DatabaseAccount } from "@azure/provisioning-cosmosdb";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateDatabaseAccount", () => {
    const stack = new Stack("cosmosdb-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const account = new DatabaseAccount(stack, {
      name: "my-unique-cosmosdb-account",
      location: "eastus",
      kind: "GlobalDocumentDB",
      properties: {
        databaseAccountOfferType: "Standard",
        locations: [{ locationName: "eastus", failoverPriority: 0 }],
        disableLocalAuth: true,
      },
    });

    stack.outputs.add("accountId", "string", account.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
