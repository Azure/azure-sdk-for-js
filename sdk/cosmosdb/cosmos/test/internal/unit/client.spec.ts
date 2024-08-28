// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Container,
  CosmosClient,
  PatchOperationType,
  RequestContext,
  ResourceType,
} from "../../../src";
import assert from "assert";
import { Suite } from "mocha";
import Sinon, { SinonSandbox, SinonSpy } from "sinon";
import { getTestContainer } from "../../public/common/TestHelpers";
import { AccessToken, TokenCredential } from "@azure/identity";
import nock from "nock";
import { RequestHandler } from "../../../src/request/RequestHandler";
import { masterKey } from "../../public/common/_fakeTestSecrets";
import { endpoint } from "../../public/common/_testConfig";

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

describe("Testing Credentials integration for Client", function (this: Suite) {
  // endpoint for mock server, which doesn't conflict with emulator's endpoints.
  const mockedEndpoint = "https://localhost:8082";
  const aadToken = "aadToken";
  let sandbox: SinonSandbox;
  let spy: SinonSpy;
  beforeEach(function () {
    sandbox = Sinon.createSandbox();
  });
  function setupSpyOnRequestHandler() {
    spy = sandbox.spy(RequestHandler, "request");
  }

  afterEach(function () {
    sandbox.restore();
  });
  describe("Client Test With AAD Credentials", function () {
    let client: CosmosClient;
    beforeEach(function () {
      client = new CosmosClient({
        endpoint: mockedEndpoint,
        aadCredentials: new MockCredential(
          Promise.resolve({ token: aadToken, expiresOnTimestamp: 0 }),
        ),
      });
    });
    afterEach(function () {
      nock.restore();
      nock.cleanAll();
      nock.enableNetConnect();
    });
    it("Test pipeline setup for items.create for aadCredentials", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.create(item1Definition);
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });
    it("Test pipeline setup for items.read for aadCredentials", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      await container.items.create(item1Definition);
      setupSpyOnRequestHandler();
      await container.item(item1Definition.id, "dummy_partition_key").read();
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });
    it("Test pipeline setup for items.patch", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      await container.items.create(item1Definition);
      setupSpyOnRequestHandler();
      await container.item(item1Definition.id).patch([item1patchRequest]);
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });
    it("Test pipeline setup for items.replace", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container
        .item(item1Definition.id, "dummy_partition_key")
        .replace(testDataset.itemGetResponse);
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });
    it("Test pipeline setup for items.upsert", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.upsert(testDataset.itemGetResponse);
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });
    it("Test pipeline setup for items.delete", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      await container.items.create(item1Definition);
      setupSpyOnRequestHandler();
      await container.item(item1Definition.id, "dummy_partition_key").delete();
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });
    it("Test pipeline setup for items.batch", async function () {
      setupMockResponse();
      const container: Container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.batch([]);
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            return !!arg?.pipeline;
          }),
        ),
      );
    });

    function setupMockResponse() {
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
  describe("Client Test With key", function () {
    it("Test items.create for tokens", async function () {
      const client = new CosmosClient({
        endpoint: endpoint,
        key: masterKey,
      });
      const container = await getTestContainer("Test Container", client);
      setupSpyOnRequestHandler();
      await container.items.create(item1Definition);
      assert(
        spy.calledWithMatch(
          Sinon.match(function (arg: RequestContext) {
            const AUTH_PREFIX = `type%3Dmaster%26ver%3D1`;
            const authHeader: string = arg?.headers["authorization"]?.toString() || "";
            return authHeader.includes(AUTH_PREFIX);
          }),
        ),
      );
    });
  });
});
