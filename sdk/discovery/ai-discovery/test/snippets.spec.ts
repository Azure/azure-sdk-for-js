// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BookshelfClient, WorkspaceClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClients_Node", async () => {
    const credential = new DefaultAzureCredential();
    // WorkspaceClient exposes conversations, investigations, tasks, and tools.
    const workspaceClient = new WorkspaceClient("<workspace-endpoint>", credential);
    // BookshelfClient exposes knowledge bases.
    const bookshelfClient = new BookshelfClient("<bookshelf-endpoint>", credential);
  });

  it("ReadmeSampleCreateClients_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const workspaceClient = new WorkspaceClient("<workspace-endpoint>", credential);
    const bookshelfClient = new BookshelfClient("<bookshelf-endpoint>", credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
