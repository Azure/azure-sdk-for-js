// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { WebPubSub } from "@azure/provisioning-webpubsub";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateWebPubSub", () => {
    const stack = new Stack("web-pubsub", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    new WebPubSub(stack, {
      name: "example-web-pubsub",
      kind: "WebPubSub",
      sku: {
        name: "Standard_S1",
        tier: "Standard",
        capacity: 1,
      },
    });
  });
});
