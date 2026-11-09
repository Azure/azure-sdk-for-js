// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { Account } from "@azure/provisioning-cognitiveservices";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateAccount", () => {
    const stack = new Stack("cognitive-services-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const account = new Account(stack, {
      name: "my-cognitive-services",
      location: "eastus",
      kind: "CognitiveServices",
      sku: { name: "S0" },
      properties: {
        customSubDomainName: "my-unique-cognitive-services",
        disableLocalAuth: true,
      },
    });

    stack.outputs.add("accountId", "string", account.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
