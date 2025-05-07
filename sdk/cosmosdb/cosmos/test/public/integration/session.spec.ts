// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientContext, Container, PluginConfig } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { OperationType, ResourceType } from "../../../src/common/index.js";
import { ConsistencyLevel } from "../../../src/index.js";
import { CosmosClient } from "../../../src/index.js";
import type { SessionContainer } from "../../../src/session/sessionContainer.js";
import { endpoint } from "../../public/common/_testConfig.js";
import { masterKey } from "../../public/common/_fakeTestSecrets.js";
import {
  addEntropy,
  getTestDatabase,
  removeAllDatabases,
} from "../../public/common/TestHelpers.js";
import type { RequestContext } from "../../../src/index.js";
import type { Response } from "../../../src/request/Response.js";
import { describe, it, assert, beforeEach } from "vitest";

describe("New session token", () => {
  it("preserves tokens", async () => {
    let response: Response<any>;
    let rqContext: RequestContext;
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, diagNode, next) => {
          assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
          rqContext = context;
          response = await next(context);
          return response;
        },
      },
    ];
    const sessionClient = new CosmosClient({
      endpoint,
      key: masterKey,
      consistencyLevel: ConsistencyLevel.Session,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      plugins,
    });
    const containerId = "sessionTestColl";

    const containerDefinition = {
      id: containerId,
      partitionKey: { paths: ["/id"] },
    };
    const containerOptions = { offerThroughput: 25100 };

    const clientContext: ClientContext = (sessionClient as any).clientContext;
    const sessionContainer: SessionContainer = (clientContext as any).sessionContainer;
    const database = await getTestDatabase("session test", sessionClient);

    const { resource: createdContainerDef } = await database.containers.create(
      containerDefinition,
      containerOptions,
    );
    const container = database.container(createdContainerDef.id);

    const resp = await container.items.create({ id: "1" });
    await container.item("1").read();

    await container.item("1").read();
    const responseToken = resp.headers["x-ms-session-token"];
    const token = sessionContainer.get({
      isNameBased: true,
      operationType: OperationType.Create,
      resourceAddress: container.url,
      resourceType: ResourceType.item,
      resourceId: "1",
    });
    assert.equal(responseToken, token);
    assert.equal(responseToken, rqContext?.headers["x-ms-session-token"]);
  });
});

describe.skip("Integrated Cache Staleness", async () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  const dbId = addEntropy("maxIntegratedCacheTestDB");
  const containerId = addEntropy("maxIntegratedCacheTestContainer");
  const dedicatedGatewayMaxAge = 20;
  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    consistencyLevel: ConsistencyLevel.Eventual,
    plugins: [
      {
        on: "request",
        plugin: async (context, diagNode, next) => {
          assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
          if (
            context.resourceType === ResourceType.item &&
            context.operationType !== OperationType.Create
          ) {
            assert.ok(typeof context.headers["x-ms-consistency-level"] !== "undefined");
            assert.ok(typeof context.headers["x-ms-consistency-level"] === "string");
            assert.ok(
              context.headers["x-ms-consistency-level"] === "Eventual" ||
                context.headers["x-ms-consistency-level"] === "Session",
              `${context.headers["x-ms-consistency-level"]} = EVENTUAL or SESSION`,
            );
            if (context.headers["x-ms-dedicatedgateway-bypass-cache"] !== undefined) {
              assert.ok(typeof context.headers["x-ms-dedicatedgateway-bypass-cache"] === "string");
              assert.ok(context.headers["x-ms-dedicatedgateway-bypass-cache"] === "true");
            }
            if (context.headers["x-ms-dedicatedgateway-max-age"] === "null") {
              assert.ok(
                context.headers["x-ms-dedicatedgateway-max-age"] === "null",
                "x-ms-dedicatedgateway-max-age will be ignored.",
              );
            }
            if (context.headers["x-ms-dedicatedgateway-max-age"] !== undefined) {
              assert.ok(typeof context.headers["x-ms-dedicatedgateway-max-age"] !== "undefined");
              assert.ok(
                typeof context.headers["x-ms-dedicatedgateway-max-age"] === "string",
                `${context.headers["x-ms-dedicatedgateway-max-age"]} = string`,
              );
              assert.ok(
                context.headers["x-ms-dedicatedgateway-max-age"] === `${dedicatedGatewayMaxAge}`,
                `${context.headers["x-ms-dedicatedgateway-max-age"]} = "${dedicatedGatewayMaxAge}"`,
              );
            }
            if (context.headers["x-ms-dedicatedgateway-max-age"] === "0") {
              assert.ok(
                context.headers["x-ms-dedicatedgateway-max-age"] === "0",
                "x-ms-dedicatedgateway-max-age will be ignored.",
              );
            }
          }
          const response = await next(context);
          return response;
        },
      },
    ],
  });

  const itemRequestFeedOptions = {
    maxIntegratedCacheStalenessInMs: dedicatedGatewayMaxAge,
    bypassIntegratedCache: true,
  };
  const { database } = await client.databases.createIfNotExists({
    id: dbId,
  });
  const { container } = await database.containers.createIfNotExists({
    id: containerId,
  });

  it("Should pass with maxIntegratedCacheStalenessInMs and consistency level set.", async () => {
    assert.ok(container.items.create({ id: "1" }));
    container.item("1").read(itemRequestFeedOptions);
    container.items
      .readAll({
        maxIntegratedCacheStalenessInMs: 0,
      })
      .fetchAll();
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.id=@id",
      parameters: [
        {
          name: "@id",
          value: "1",
        },
      ],
    };
    container.items.query(querySpec, itemRequestFeedOptions).fetchAll();

    // Should fail: maxIntegratedCacheStalenessInMs cannot be 0
    // dedicatedGatewayMaxAge = 0;
    // await container.read(dedicatedGatewayMaxAge);
  });
});

// This test has to be run against sqlx endpoint
describe.skip("Bypass integrated cache", () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("Should pass with bypass integrated cache set", async () => {
    const dbId = addEntropy("bypassIntegratedCacheTestDB");
    const containerId = addEntropy("bypassIntegratedCacheTestContainer");
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      consistencyLevel: ConsistencyLevel.Eventual,
    });
    const { database } = await client.databases.createIfNotExists({
      id: dbId,
    });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
    });
    await container.items.create({ id: "1" });
    const response = await container
      .item("1")
      .read({ maxIntegratedCacheStalenessInMs: 500, bypassIntegratedCache: true });
    assert.ok(response);
    console.log("x-ms-cosmos-cache-bypass", response.headers["x-ms-cosmos-cache-bypass"]);
    assert.ok(response.headers["x-ms-cosmos-cache-bypass"] !== undefined);
    assert.ok(response.headers["x-ms-cosmos-cache-bypass"] === "True");
  });
});

// For some reason this test does not pass against the emulator. Skipping it for now
describe.skip("Session Token", () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("retries session not found successfully", async () => {
    const clientA = new CosmosClient({
      endpoint,
      key: masterKey,
      consistencyLevel: ConsistencyLevel.Session,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });
    // Create a second client with a plugin that simulates "Session Not Found" error
    const clientB = new CosmosClient({
      endpoint,
      key: masterKey,
      consistencyLevel: ConsistencyLevel.Session,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      plugins: [
        {
          on: "request",
          plugin: async (context, diagNode, next) => {
            assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
            // Simulate a "Session Not Found" error by manually making the client session token *way* ahead of any available session on the server
            // This is just a way to simulate the error. Getting this to happen in practice is difficult and only usually occurs cross region where there is significant replication lag
            if (context.headers["x-ms-session-token"]) {
              context.headers["x-ms-session-token"] = "0:0#900000#3=8600000#10=-1";
            }
            const response = await next(context);
            return response;
          },
        },
      ],
    });

    const dbId = addEntropy("sessionTestDB");
    const containerId = addEntropy("sessionTestContainer");

    // Create Database and Container
    const { database } = await clientA.databases.createIfNotExists({
      id: dbId,
    });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
    });

    // Create items using both clients so they each establish a session with the backend
    const container2 = clientB.database(dbId).container(containerId);
    await Promise.all([createItem(container), createItem(container2)]);

    // Create an item using client
    const id = await createItem(container);
    const { resource, statusCode } = await container2.item(id).read();
    console.log(statusCode, resource);
    assert.ok(resource);
    assert.strictEqual(statusCode, 200);
  });
});

async function createItem(container: Container): Promise<string> {
  const {
    resource: { id },
  } = await container.items.create({
    id: (Math.random() + 1).toString(36).substring(7),
  });
  return id;
}
