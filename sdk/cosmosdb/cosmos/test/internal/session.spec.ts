// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

describe("New session token", function () {
  it("preserves tokens", async function () {
    let response: Response<any>;
    let rqContext: RequestContext;
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, next) => {
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
      containerOptions
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
          plugin: async (context, next) => {
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
