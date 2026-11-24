// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { BlobService, Container, StorageAccount } from "@azure/provisioning-storage";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateStorageAccount", () => {
    const stack = new Stack("storage-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const storageAccount = new StorageAccount(stack, {
      name: "myuniquestorageaccount",
      location: "eastus",
      sku: { name: "Standard_LRS" },
      kind: "StorageV2",
    });

    const blobService = new BlobService(storageAccount, {});
    new Container(blobService, {
      name: "my-container",
    });

    stack.outputs.add("storageAccountId", "string", storageAccount.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
