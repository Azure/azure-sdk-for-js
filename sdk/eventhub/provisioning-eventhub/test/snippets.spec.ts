// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { Eventhub, Namespace } from "@azure/provisioning-eventhub";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateEventHub", () => {
    const stack = new Stack("eventhub-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const namespace = new Namespace(stack, {
      name: "my-unique-eventhub-namespace",
      location: "eastus",
      sku: { name: "Standard", tier: "Standard", capacity: 1 },
    });

    const eventHub = new Eventhub(namespace, {
      name: "my-event-hub",
      properties: {
        partitionCount: 2,
        messageRetentionInDays: 7,
      },
    });

    stack.outputs.add("eventHubId", "string", eventHub.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
