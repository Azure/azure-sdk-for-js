// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component } from "@azure/provisioning-appinsights";
import { Stack } from "@azure/provisioning-core";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateComponent", () => {
    const stack = new Stack("application-insights", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    new Component(stack, {
      name: "example-appinsights",
      kind: "web",
      properties: {
        applicationType: "web",
      },
    });
  });
});
