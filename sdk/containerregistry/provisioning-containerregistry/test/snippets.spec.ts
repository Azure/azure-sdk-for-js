// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Registry } from "@azure/provisioning-containerregistry";
import { Stack } from "@azure/provisioning-core";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateRegistry", () => {
    const stack = new Stack("container-registry", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    new Registry(stack, {
      name: "exampleregistry",
      sku: { name: "Basic" },
      properties: {
        adminUserEnabled: false,
      },
    });
  });
});
