// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import nock from "nock";
import type { Container } from "../../../src/index.js";
import { CosmosClient, PatchOperationType, ResourceType } from "../../../src/index.js";
import { getTestContainer } from "../../public/common/TestHelpers.js";
import type { AccessToken, TokenCredential } from "@azure/identity";
import { RequestHandler } from "../../../src/request/RequestHandler.js";
import { masterKey } from "../../public/common/_fakeTestSecrets.js";
import { endpoint } from "../../public/common/_testConfig.js";
import type { MockInstance } from "vitest";
import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from "vitest";

if (!nock.isActive()) {
  nock.activate();
}

class MockCredential implements TokenCredential {
  constructor(public returnPromise: Promise<AccessToken | null>) {}

  getToken(): Promise<AccessToken | null> {
    return this.returnPromise;
  }
}
const requiredHeadersForAADAuth = {
  reqheaders: {
    authorization: "type=aad&ver=1.0&sig=aadToken",
  },
};
const database1Definition = {
  id: "db1",
};
const container1Definition = {
  id: "col1",
};
const item1Definition = {
  id: "item1",
  value: "item1Value",
};
const item1patchRequest = {
  op: PatchOperationType.add,
  path: "/value",
  value: "patched_value",
};
const testDataset = {
  databaseGetResponse: {
    body: database1Definition,
    path: "",
    resourceType: ResourceType.database,
    resourceId: "db1",
  },
  containerGetResponse: {
    body: container1Definition,
    path: "",
    id: "col1",
    resourceType: ResourceType.container,
    resourceId: "col1",
  },
  itemGetResponse: {
    body: item1Definition,
    path: "",
    resourceType: ResourceType.item,
    resourceId: "item1",
  },
  itemPatchResponse: {
    body: item1Definition,
    path: "",
    resourceType: ResourceType.item,
    resourceId: "item1",
  },
};

describe("Testing Credentials integration for Client", () => {
  // endpoint for mock server, which doesn't conflict with emulator's endpoints.
  const mockedEndpoint = "https://localhost:8082";
  const aadToken = "aadToken";
  let spy: MockInstance;

  function setupSpyOnRequestHandler(): void {
    spy = vi.spyOn(RequestHandler, "request");
  }

  describe("Client Test With AAD Credentials", () => {
    let client: CosmosClient;

    beforeEach(async () => {
      if (!nock.isActive()) {
        nock.activate();
      }
      setupMockResponse();
    });

    afterEach(async () => {
      vi.restoreAllMocks();
      nock.cleanAll();
    });

    afterAll(() => {
      nock.restore();
    });

    it("Test pipeline setup for items.create for aadCredentials", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.create(item1Definition);
      expect(spy).toHaveBeenCalled();
    });

    it("Test pipeline setup for items.read for aadCredentials", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      await container.items.create(item1Definition);
      setupSpyOnRequestHandler();
      await container.item(item1Definition.id, "dummy_partition_key").read();
      expect(spy).toHaveBeenCalled();
    });

    it("Test pipeline setup for items.patch", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      await container.items.create(item1Definition);
      setupSpyOnRequestHandler();
      await container.item(item1Definition.id).patch([item1patchRequest]);
      expect(spy).toHaveBeenCalled();
    });

    it("Test pipeline setup for items.replace", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container
        .item(item1Definition.id, "dummy_partition_key")
        .replace(testDataset.itemGetResponse);
      expect(spy).toHaveBeenCalled();
    });

    it("Test pipeline setup for items.upsert", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.upsert(testDataset.itemGetResponse);
      expect(spy).toHaveBeenCalled();
    });

    it("Test pipeline setup for items.delete", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      await container.items.create(item1Definition);
      setupSpyOnRequestHandler();
      await container.item(item1Definition.id, "dummy_partition_key").delete();
      expect(spy).toHaveBeenCalled();
    });

    it("Test pipeline setup for items.batch", async () => {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.batch([]);
      expect(spy).toHaveBeenCalled();
    });

    function setupMockResponse(): void {
      if (!nock.isActive()) {
        nock.activate();
      }
      nock(mockedEndpoint).persist(true).get("/").reply(200, {});
      // headersWithAADAuthToken contains required aad token, nock will only intercept requests if this token is present.
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .post("/dbs")
        .reply(200, testDataset.databaseGetResponse);
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .post(/\/dbs\/[^/]+\/colls/)
        .reply(200, testDataset.containerGetResponse);
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .get(/\/dbs\/[^/]+\/colls\/[^/]+/)
        .reply(200, testDataset.containerGetResponse);
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .post(/\/dbs\/[^/]+\/colls\/[^/]+/)
        .reply(200, testDataset.containerGetResponse);
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .patch(/\/dbs\/[^/]+\/colls\/[^/]+\/docs\/[^/]+/)
        .reply(200, testDataset.itemPatchResponse);
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .delete(/\/dbs\/[^/]+\/colls\/[^/]+\/docs\/[^/]+/)
        .reply(200, testDataset.itemPatchResponse);
      nock(mockedEndpoint, requiredHeadersForAADAuth)
        .persist(true)
        .put(/\/dbs\/[^/]+\/colls\/[^/]+\/docs\/[^/]+/)
        .reply(200, testDataset.itemGetResponse);
    }
  });
  describe("Client Test With key", () => {
    it("Test items.create for tokens", async () => {
      const client = new CosmosClient({
        endpoint: endpoint,
        key: masterKey,
      });
      const container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.create(item1Definition);
      expect(spy).toHaveBeenCalled();
    });
  });
});
