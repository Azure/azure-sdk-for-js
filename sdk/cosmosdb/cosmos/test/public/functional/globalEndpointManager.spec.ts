// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DatabaseAccount, ResourceResponse } from "../../../src";
import { masterKey } from "../common/_fakeTestSecrets";
import { GlobalEndpointManager } from "../../../src";
import { OperationType, ResourceType } from "../../../src";
import * as fakeTimers from "@sinonjs/fake-timers";

import assert from "assert";

const locationUnavailabilityExpiratationTime = 6 * 60 * 1000;
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
    let gem = new GlobalEndpointManager(
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

    it("should resolve the correct endpoint", async function () {
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
      gem = new GlobalEndpointManager(
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
    it("should resolve to endpoint when call made after server unavailability time", async function () {
      const clock: fakeTimers.InstalledClock = fakeTimers.install();

      gem = new GlobalEndpointManager(
        {
          endpoint: "https://test.documents.azure.com:443/",
          key: masterKey,
          connectionPolicy: {
            enableEndpointDiscovery: true,
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

      await gem.markCurrentLocationUnavailableForRead(
        "https://test-westus2.documents.azure.com:443/"
      );
      assert.equal(
        await gem.resolveServiceEndpoint(ResourceType.item, OperationType.Read),
        "https://test.documents.azure.com:443/"
      );
      clock.tick(locationUnavailabilityExpiratationTime);
      await gem.refreshEndpointList();
      assert.equal(
        await gem.resolveServiceEndpoint(ResourceType.item, OperationType.Read),
        "https://test-westus2.documents.azure.com:443/"
      );
      clock.uninstall();
    });
  });

  describe("#markCurrentLocationUnavailableForRead", function () {
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

    it("should mark the current location unavailable for read", async function () {
      // We don't block on init for database account calls
      await gem.markCurrentLocationUnavailableForRead(
        "https://test-westus2.documents.azure.com:443/"
      );

      /* As we have marked current location unavailable for read,
        next read should go to the next location or default endpoint
      */
      assert.equal(await gem.getReadEndpoint(), "https://test.documents.azure.com:443/");
    });
    it("should mark the current location unavailable for write", async function () {
      // We don't block on init for database account calls
      await gem.markCurrentLocationUnavailableForWrite(
        "https://test-westus2.documents.azure.com:443/"
      );

      /* As we have marked current location unavailable for write,
        next write should go to the next location or default endpoint
      */
      assert.equal(await gem.getWriteEndpoint(), "https://test.documents.azure.com:443/");
    });
  });
});
