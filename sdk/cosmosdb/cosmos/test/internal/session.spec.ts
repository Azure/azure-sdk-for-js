// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-unused-expressions */
import assert from "assert";
import { Suite } from "mocha";
import { ClientContext, Container, PluginConfig, PluginOn } from "../../src";
import { OperationType, ResourceType } from "../../src/common";
import { ConsistencyLevel } from "../../src";
import { CosmosClient } from "../../src";
import { SessionContainer } from "../../src/session/sessionContainer";
import { endpoint } from "../public/common/_testConfig";
import { masterKey } from "../public/common/_fakeTestSecrets";
import { addEntropy, getTestDatabase, removeAllDatabases } from "../public/common/TestHelpers";
import { RequestContext } from "../../src";
import { Response } from "../../src/request/Response";
import { expect } from "chai";

describe("New session token", function () {
  it("preserves tokens", async function () {
    let response: Response<any>;
    let rqContext: RequestContext;
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, diagNode, next) => {
          expect(diagNode, "DiagnosticsNode should not be undefined or null").to.exist;
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

describe("Integrated Cache Staleness", async function (this: Suite) {
  beforeEach(async function () {
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
          expect(diagNode, "DiagnosticsNode should not be undefined or null").to.exist;
          if (
            context.resourceType === ResourceType.item &&
            context.operationType !== OperationType.Create
          ) {
            assert.ok(typeof context.headers["x-ms-consistency-level"] === "undefined");
            assert.ok(typeof context.headers["x-ms-dedicatedgateway-max-age"] !== "undefined");
            assert.ok(typeof context.headers["x-ms-dedicatedgateway-bypass-cache"] === "boolean");
            assert.ok(typeof context.headers["x-ms-consistency-level"] === "string");
            assert.ok(
              context.headers["x-ms-consistency-level"] === "Eventual" ||
                context.headers["x-ms-consistency-level"] === "Session",
              `${context.headers["x-ms-consistency-level"]} = EVENTUAL or SESSION`,
            );
            assert.ok(context.headers["x-ms-dedicatedgateway-bypass-cache"] === true);
            if (context.headers["x-ms-dedicatedgateway-max-age"] === "null") {
              assert.ok(
                context.headers["x-ms-dedicatedgateway-max-age"] === "null",
                "x-ms-dedicatedgateway-max-age will be ignored.",
              );
            }
            assert.ok(
              typeof context.headers["x-ms-dedicatedgateway-max-age"] === "string",
              `${context.headers["x-ms-dedicatedgateway-max-age"]} = string`,
            );

            if (context.headers["x-ms-dedicatedgateway-max-age"] === "0") {
              assert.ok(
                context.headers["x-ms-dedicatedgateway-max-age"] === "0",
                "x-ms-dedicatedgateway-max-age will be ignored.",
              );
            }

            assert.ok(
              context.headers["x-ms-dedicatedgateway-max-age"] === `"${dedicatedGatewayMaxAge}"`,
              `${context.headers["x-ms-dedicatedgateway-max-age"]} = "${dedicatedGatewayMaxAge}"`,
            );
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

  it("Should pass with maxIntegratedCacheStalenessInMs and consistency level set.", async function () {
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
    this.dedicatedGatewayMaxAge = 0;
    await container.read(this.dedicatedGatewayMaxAge);
  });
});

// This test has to be run against sqlx endpoint
describe.skip("Bypass integrated cache", function (this: Suite) {
  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("Should pass with bypass integrated cache set", async function () {
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
describe.skip("Session Token", function (this: Suite) {
  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("retries session not found successfully", async function () {
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
            expect(diagNode, "DiagnosticsNode should not be undefined or null").to.exist;
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

async function createItem(container: Container) {
  const {
    resource: { id },
  } = await container.items.create({
    id: (Math.random() + 1).toString(36).substring(7),
  });
  return id;
}
