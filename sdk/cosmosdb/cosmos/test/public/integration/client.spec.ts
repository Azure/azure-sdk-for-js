// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "../../../src/index.js";
import { CosmosClient, ResourceType } from "../../../src/index.js";
import { getTestContainer } from "../../public/common/TestHelpers.js";
import type { AccessToken, TokenCredential } from "@azure/identity";
import nock from "nock";
import { describe, it, beforeEach } from "vitest";

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

describe("TestingCredentialsintegrationforClient", function () {
  // endpoint for mock server, which doesn't conflict with emulator's endpoints.
  const mockedEndpoint = "https://localhost:8082";
  const aadToken = "aadToken";

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
    it("Test pipeline setup for items.create for aadCredentials", async function () {
      console.log("Setting up mock response");
      setupMockResponse();
      console.log("Creating container");
      const container: Container = await getTestContainer("Test Container", client);
      console.log("Created container", container);
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
});
