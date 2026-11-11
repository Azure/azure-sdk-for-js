// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { Workspace } from "@azure/provisioning-operationalinsights";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateWorkspace", () => {
    const stack = new Stack("log-analytics-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const workspace = new Workspace(stack, {
      name: "my-log-analytics-workspace",
      location: "eastus",
      properties: {
        sku: { name: "PerGB2018" },
        retentionInDays: 30,
      },
    });

    stack.outputs.add("workspaceId", "string", workspace.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
