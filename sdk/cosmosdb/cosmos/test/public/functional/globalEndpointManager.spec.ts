// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DatabaseAccount, ResourceResponse } from "../../../src";
import { masterKey } from "../common/_fakeTestSecrets";
import { GlobalEndpointManager } from "../../../src";
import { OperationType, ResourceType } from "../../../src";

import assert from "assert";

const headers = {
  "access-control-allow-credentials": "true",
  "access-control-allow-origin": "",
  "cache-control": "no-store, no-cache",
  "content-location": "https://localhost:8081/",
  "content-type": "application/json",
  date: "Mon, 19 Aug 2019 22:22:13 GMT",
  pragma: "no-cache",
  server: "Microsoft-HTTPAPI/2.0",
  "transfer-encoding": "chunked",
  "x-ms-databaseaccount-consumed-mb": "0",
  "x-ms-databaseaccount-provisioned-mb": "0",
  "x-ms-databaseaccount-reserved-mb": "0",
  "x-ms-gatewayversion": "version=2.4.0.0",
  "x-ms-max-media-storage-usage-mb": "10240",
  "x-ms-media-storage-usage-mb": "0",
  "x-ms-throttle-retry-count": 0,
  "x-ms-throttle-retry-wait-time-ms": 0,
};
const databaseAccountBody: any = {
  writableLocations: [
    { name: "West US 2", databaseAccountEndpoint: "https://test-westus2.documents.azure.com:443/" },
  ],
  readableLocations: [
    { name: "West US 2", databaseAccountEndpoint: "https://test-westus2.documents.azure.com:443/" },
    { name: "East US 2", databaseAccountEndpoint: "https://test-eastus2.documents.azure.com:443/" },
  ],
  DatabasesLink: "/dbs/",
  MediaLink: "/media/",
  ConsistencyPolicy: "Session",
};

describe("GlobalEndpointManager", function () {
  describe("#resolveServiceEndpoint", function () {
    it("should resolve the correct endpoint", async function () {
      const gem = new GlobalEndpointManager(
        {
          endpoint: "https://test.documents.azure.com:443/",
          key: masterKey,
          connectionPolicy: {
            enableEndpointDiscovery: true,
            preferredLocations: ["East US 2", "West US 2"],
          },
        },
        async () => {
          const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
            new DatabaseAccount(databaseAccountBody, headers),
            headers,
            200
          );
          return response;
        }
      );
      // We don't block on init for database account calls
      assert.equal(
        await gem.resolveServiceEndpoint(ResourceType.none, OperationType.Read),
        "https://test.documents.azure.com:443/"
      );

      assert.equal(
        await gem.resolveServiceEndpoint(ResourceType.item, OperationType.Read),
        "https://test-eastus2.documents.azure.com:443/"
      );
    });
    it("should allow you to pass a normalized preferred location", async function () {
      const gem = new GlobalEndpointManager(
        {
          endpoint: "https://test.documents.azure.com:443/",
          key: masterKey,
          connectionPolicy: {
            enableEndpointDiscovery: true,
            preferredLocations: ["eastus2", "West US 2"],
          },
        },
        async () => {
          const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
            new DatabaseAccount(databaseAccountBody, headers),
            headers,
            200
          );
          return response;
        }
      );

      assert.equal(
        await gem.resolveServiceEndpoint(ResourceType.item, OperationType.Read),
        "https://test-eastus2.documents.azure.com:443/"
      );
    });
  });
});
