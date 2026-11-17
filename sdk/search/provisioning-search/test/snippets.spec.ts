// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { SearchService } from "@azure/provisioning-search";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateSearchService", () => {
    const stack = new Stack("search-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const searchService = new SearchService(stack, {
      name: "my-unique-search-service",
      location: "eastus",
      sku: { name: "basic" },
      properties: {
        replicaCount: 1,
        partitionCount: 1,
        disableLocalAuth: true,
      },
    });

    stack.outputs.add("searchServiceId", "string", searchService.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
