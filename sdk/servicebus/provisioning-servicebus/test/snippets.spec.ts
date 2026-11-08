// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { Namespace, Queue } from "@azure/provisioning-servicebus";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateQueue", () => {
    const stack = new Stack("servicebus-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const namespace = new Namespace(stack, {
      name: "my-unique-servicebus-namespace",
      location: "eastus",
      sku: { name: "Standard" },
    });

    const queue = new Queue(namespace, {
      name: "my-queue",
      properties: {
        maxDeliveryCount: 10,
        deadLetteringOnMessageExpiration: true,
      },
    });

    stack.outputs.add("queueId", "string", queue.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
