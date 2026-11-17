// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { Server, ServerDatabase } from "@azure/provisioning-sql";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("ReadmeSampleCreateDatabase", () => {
    const stack = new Stack("sql-deployment", {
      targetScope: "resourceGroup",
      location: "eastus",
    });

    const administratorLogin = stack.parameters.add("administratorLogin", "string");
    const administratorObjectId = stack.parameters.add("administratorObjectId", "string");
    const administratorTenantId = stack.parameters.add("administratorTenantId", "string");

    const server = new Server(stack, {
      name: "my-unique-sql-server",
      location: "eastus",
      properties: {
        version: "12.0",
        minimalTlsVersion: "1.2",
        administrators: {
          administratorType: "ActiveDirectory",
          principalType: "Group",
          login: administratorLogin,
          sid: administratorObjectId,
          tenantId: administratorTenantId,
          azureAdOnlyAuthentication: true,
        },
      },
    });

    const database = new ServerDatabase(server, {
      name: "my-database",
      location: "eastus",
      sku: { name: "Basic", tier: "Basic" },
    });

    stack.outputs.add("databaseId", "string", database.id);

    console.log(JSON.stringify(serialize(stack), null, 2));
  });
});
