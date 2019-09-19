// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosClientOptions } from "../../dist-esm/CosmosClientOptions";
import {
  ConnectionPolicy,
  DatabaseAccount,
  defaultConnectionPolicy,
  Location
} from "../../dist-esm/documents";
import { LocationCache } from "../../dist-esm/LocationCache";

import * as assert from "assert";
import { OperationType, ResourceType } from "../../dist-esm/common";

const scenarios: Scenario[] = [];
const regions = ["westus", "East US", "eastus2", "south Centralus", "sEasIa"];

interface Scenario {
  defaultEndpoint?: string;
  connectionPolicy?: ConnectionPolicy;
  databaseAccount?: DatabaseAccount;
}

function getEndpointFromRegion(regionName?: string) {
  const prefix = "https://test";
  const suffix = ".documents.azure.com:443";
  return `${prefix}${regionName ? `-${regionName}` : ""}${suffix}`;
}

function addScenario(options: { numberOfRegions?: number; useMultipleWriteLocations: boolean }) {
  const connectionPolicy: ConnectionPolicy = Object.assign({}, defaultConnectionPolicy, {
    useMultipleWriteLocations: options.useMultipleWriteLocations
  });
  const databaseAccountConfig: {
    writableLocations?: Location[];
    readableLocations?: Location[];
    enableMultipleWriteLocations?: boolean;
  } = {};
  const defaultEndpoint = getEndpointFromRegion();

  if (options.numberOfRegions) {
    connectionPolicy.preferredLocations = regions.slice(0, options.numberOfRegions);
    databaseAccountConfig.readableLocations = connectionPolicy.preferredLocations.map(
      (locationName) => {
        return { name: locationName, databaseAccountEndpoint: getEndpointFromRegion(locationName) };
      }
    );
    if (options.useMultipleWriteLocations) {
      connectionPolicy.useMultipleWriteLocations = options.useMultipleWriteLocations;
      databaseAccountConfig.writableLocations = connectionPolicy.preferredLocations
        .map((locationName) => {
          return {
            name: locationName,
            databaseAccountEndpoint: getEndpointFromRegion(locationName)
          };
        })
        .sort((a, b) => (a.name > b.name ? 1 : -1));
      databaseAccountConfig.enableMultipleWriteLocations = options.useMultipleWriteLocations;
    } else {
      databaseAccountConfig.writableLocations = (connectionPolicy.preferredLocations || regions)
        .slice(0, 1)
        .map((locationName) => {
          return {
            name: locationName,
            databaseAccountEndpoint: getEndpointFromRegion(locationName)
          };
        })
        .sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  }

  scenarios.push({
    connectionPolicy,
    defaultEndpoint,
    databaseAccount: new DatabaseAccount(databaseAccountConfig, {})
  });
}

addScenario({ useMultipleWriteLocations: false });
addScenario({ numberOfRegions: 1, useMultipleWriteLocations: false });
addScenario({ numberOfRegions: 2, useMultipleWriteLocations: false });
addScenario({ numberOfRegions: 3, useMultipleWriteLocations: false });
addScenario({ numberOfRegions: 5, useMultipleWriteLocations: false });
addScenario({ numberOfRegions: 1, useMultipleWriteLocations: true });
addScenario({ numberOfRegions: 2, useMultipleWriteLocations: true });
addScenario({ numberOfRegions: 3, useMultipleWriteLocations: true });
addScenario({ numberOfRegions: 5, useMultipleWriteLocations: true });

describe("Location Cache", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 2000);
  for (const scenario of scenarios) {
    describe(`when there is a DatabaseAccount refresh and ${scenario.connectionPolicy.preferredLocations.length} preferred region and multi-region write is ${scenario.connectionPolicy.useMultipleWriteLocations}.`, function() {
      const connectionPolicy: ConnectionPolicy = scenario.connectionPolicy;
      const endpoint = scenario.defaultEndpoint;
      const cosmosClientOptions: CosmosClientOptions = { endpoint, connectionPolicy };
      const locationCache = new LocationCache(cosmosClientOptions);

      before(function() {
        locationCache.onDatabaseAccountRead(scenario.databaseAccount);
      });

      it("shouldn't refresh", function() {
        const { shouldRefresh, canRefreshInBackground } = locationCache.shouldRefreshEndpoints();
        assert.equal(shouldRefresh, false, "shouldn't need to refresh");
      });

      it("preferred locations should match the connection policy preferred locations", function() {
        const preferredLocations = locationCache.prefferredLocations;
        assert.equal(
          preferredLocations.length,
          scenario.connectionPolicy.preferredLocations.length,
          "preffered locations size should match"
        );
      });

      it("read endpoint should match most preferred endpoint", function() {
        const readEndpoint = locationCache.getReadEndpoint();
        assert.equal(
          readEndpoint,
          scenario.connectionPolicy.preferredLocations.length > 0
            ? getEndpointFromRegion(regions[0])
            : endpoint,
          "read endpoint should match most preferred endpoint after database account info refresh"
        );
      });

      it("write endpoint should match default endpoint", function() {
        const writeEndpoint = locationCache.getWriteEndpoint();
        const expectedEndpoint =
          scenario.connectionPolicy.preferredLocations.length > 0
            ? getEndpointFromRegion(scenario.connectionPolicy.preferredLocations[0])
            : endpoint;
        assert.equal(
          writeEndpoint,
          expectedEndpoint,
          "write endpoint should match most preferred endpoint after database account info refresh"
        );
      });

      it(`read request for resolve endpoint, retry count 0, should match read endpoint`, function() {
        const resolveEndpoint = locationCache.resolveServiceEndpoint({
          operationType: OperationType.Read,
          resourceType: ResourceType.item,
          retryCount: 0
        });

        const readEndpoint = locationCache.getReadEndpoint();
        assert.equal(resolveEndpoint, readEndpoint, "resolve endpoint should match read endpoint");
      });

      it(`write request for resolve endpoint, retry count 0, should match write endpoint`, function() {
        const resolveEndpoint = locationCache.resolveServiceEndpoint({
          operationType: OperationType.Replace,
          resourceType: ResourceType.item,
          retryCount: 0
        });

        const writeEndpoint = locationCache.getWriteEndpoint();
        assert.equal(
          resolveEndpoint,
          writeEndpoint,
          "resolve endpoint should match write endpoint"
        );
      });

      // After this, there are side effects. All the "markUnavailable" ones will remove locations from the list.
      // It's probably best to not add new "it"s below here to avoid unreliable tests.
      if (scenario.connectionPolicy.preferredLocations.length > 0) {
        if (!scenario.connectionPolicy.useMultipleWriteLocations) {
          it("write endpoint should match default endpoint even after being marked unavailable", function() {
            locationCache.markCurrentLocationUnavailableForWrite(locationCache.getWriteEndpoint());
            const writeEndpoint = locationCache.getWriteEndpoint();
            assert.equal(
              writeEndpoint,
              scenario.databaseAccount.writableLocations[0].databaseAccountEndpoint,
              "write endpoint should match default endpoint prior to any database account info"
            );
            const resolveEndpoint = locationCache.resolveServiceEndpoint({
              operationType: OperationType.Replace,
              resourceType: ResourceType.item,
              retryCount: 1
            });

            assert.equal(
              resolveEndpoint,
              writeEndpoint,
              "resolve endpoint should match write endpoint"
            );
            const {
              shouldRefresh,
              canRefreshInBackground
            } = locationCache.shouldRefreshEndpoints();
            assert.equal(shouldRefresh, true, "should need to refresh");
          });
        }
      } else {
        if (!scenario.connectionPolicy.useMultipleWriteLocations) {
          it("write endpoint should match default endpoint even after being marked unavailable", function() {
            locationCache.markCurrentLocationUnavailableForWrite(locationCache.getWriteEndpoint());
            const writeEndpoint = locationCache.getWriteEndpoint();
            assert.equal(
              writeEndpoint,
              endpoint,
              "write endpoint should match default endpoint prior to any database account info"
            );
            const resolveEndpoint = locationCache.resolveServiceEndpoint({
              operationType: OperationType.Replace,
              resourceType: ResourceType.item,
              retryCount: 1
            });

            assert.equal(
              resolveEndpoint,
              writeEndpoint,
              "resolve endpoint should match write endpoint"
            );
            const {
              shouldRefresh,
              canRefreshInBackground
            } = locationCache.shouldRefreshEndpoints();
            assert.equal(
              shouldRefresh,
              scenario.connectionPolicy.preferredLocations.length > 0,
              "should need to refresh"
            );
          });
        }
      }

      if (scenario.connectionPolicy.preferredLocations.length > 1) {
        it("read endpoint should return next endpoint after being marked unavailable", function() {
          locationCache.markCurrentLocationUnavailableForRead(locationCache.getReadEndpoint());
          const readEndpoint = locationCache.getReadEndpoint();
          assert.equal(
            readEndpoint,
            getEndpointFromRegion(regions[1]),
            "read endpoint should match default endpoint prior to any database account info even if unavailable"
          );
          const resolveEndpoint = locationCache.resolveServiceEndpoint({
            operationType: OperationType.Read,
            resourceType: ResourceType.item,
            retryCount: 1
          });
          assert.equal(
            resolveEndpoint,
            readEndpoint,
            "resolve endpoint should match read endpoint"
          );
          const { shouldRefresh, canRefreshInBackground } = locationCache.shouldRefreshEndpoints();
          assert.equal(shouldRefresh, true, "should need to refresh");
        });

        if (scenario.connectionPolicy.useMultipleWriteLocations) {
          it("write endpoint should return next endpoint after being marked unavailable", function() {
            locationCache.markCurrentLocationUnavailableForWrite(locationCache.getWriteEndpoint());
            const writeEndpoint = locationCache.getWriteEndpoint();
            assert.equal(
              writeEndpoint,
              getEndpointFromRegion(regions[1]),
              "write endpoint should match default endpoint prior to any database account info"
            );
            const resolveEndpoint = locationCache.resolveServiceEndpoint({
              operationType: OperationType.Replace,
              resourceType: ResourceType.item,
              retryCount: 1
            });

            assert.equal(
              resolveEndpoint,
              writeEndpoint,
              "resolve endpoint should match write endpoint"
            );
            const {
              shouldRefresh,
              canRefreshInBackground
            } = locationCache.shouldRefreshEndpoints();
            assert.equal(
              shouldRefresh,
              scenario.connectionPolicy.preferredLocations.length > 0,
              "should need to refresh"
            );
          });
        }
      } else {
        it("read endpoint should match default endpoint even after being marked unavailable", function() {
          locationCache.markCurrentLocationUnavailableForRead(locationCache.getReadEndpoint());
          const readEndpoint = locationCache.getReadEndpoint();
          assert.equal(
            readEndpoint,
            endpoint,
            "read endpoint should match default endpoint prior to any database account info even if unavailable"
          );

          const resolveEndpoint = locationCache.resolveServiceEndpoint({
            operationType: OperationType.Read,
            resourceType: ResourceType.item,
            retryCount: 1
          });
          assert.equal(
            resolveEndpoint,
            readEndpoint,
            "resolve endpoint should match read endpoint"
          );
          const { shouldRefresh, canRefreshInBackground } = locationCache.shouldRefreshEndpoints();
          assert.equal(
            shouldRefresh,
            scenario.connectionPolicy.preferredLocations.length > 0,
            "shouldn't need to refresh"
          );
        });

        if (scenario.connectionPolicy.useMultipleWriteLocations) {
          it("write endpoint should match default endpoint even after being marked unavailable", function() {
            locationCache.markCurrentLocationUnavailableForWrite(locationCache.getWriteEndpoint());
            const writeEndpoint = locationCache.getWriteEndpoint();
            assert.equal(
              writeEndpoint,
              endpoint,
              "write endpoint should match default endpoint prior to any database account info"
            );
            const resolveEndpoint = locationCache.resolveServiceEndpoint({
              operationType: OperationType.Replace,
              resourceType: ResourceType.item,
              retryCount: 1
            });

            assert.equal(
              resolveEndpoint,
              writeEndpoint,
              "resolve endpoint should match write endpoint"
            );
            const {
              shouldRefresh,
              canRefreshInBackground
            } = locationCache.shouldRefreshEndpoints();
            assert.equal(shouldRefresh, true, "should need to refresh");
          });
        }
      }
    });

    describe(`when there is not a DatabaseAccount refresh and ${scenario.connectionPolicy.preferredLocations.length} preferred regions and multi-region write is ${scenario.connectionPolicy.useMultipleWriteLocations}.`, function() {
      const connectionPolicy: ConnectionPolicy = scenario.connectionPolicy;
      const endpoint = scenario.defaultEndpoint;
      const cosmosClientOptions: CosmosClientOptions = { endpoint, connectionPolicy };
      const locationCache = new LocationCache(cosmosClientOptions);

      if (!scenario.connectionPolicy.useMultipleWriteLocations) {
        it("shouldn't refresh", function() {
          const { shouldRefresh, canRefreshInBackground } = locationCache.shouldRefreshEndpoints();
          assert.equal(shouldRefresh, false, "shouldn't need to refresh");
        });
      } else {
        it("should refresh", function() {
          const { shouldRefresh, canRefreshInBackground } = locationCache.shouldRefreshEndpoints();
          assert.equal(shouldRefresh, true, "should need to refresh");
        });
      }

      it("preferred locations should match the connection policy preferred locations", function() {
        const preferredLocations = locationCache.prefferredLocations;
        assert.equal(
          preferredLocations.length,
          scenario.connectionPolicy.preferredLocations.length,
          "preffered locations size should match"
        );
      });

      it("read endpoint should match default endpoint", function() {
        const readEndpoint = locationCache.getReadEndpoint();
        assert.equal(
          readEndpoint,
          endpoint,
          "read endpoint should match default endpoint prior to any database account info"
        );
      });

      it("write endpoint should match default endpoint", function() {
        const writeEndpoint = locationCache.getWriteEndpoint();
        assert.equal(
          writeEndpoint,
          endpoint,
          "write endpoint should match default endpoint prior to any database account info"
        );
      });

      it(`read request for resolve endpoint, retry count 0, should match read endpoint`, function() {
        const resolveEndpoint = locationCache.resolveServiceEndpoint({
          operationType: OperationType.Read,
          resourceType: ResourceType.item,
          retryCount: 0
        });

        const readEndpoint = locationCache.getReadEndpoint();
        assert.equal(resolveEndpoint, readEndpoint, "resolve endpoint should match read endpoint");
      });

      it(`write request for resolve endpoint, retry count 0, should match write endpoint`, function() {
        const resolveEndpoint = locationCache.resolveServiceEndpoint({
          operationType: OperationType.Replace,
          resourceType: ResourceType.item,
          retryCount: 0
        });

        const writeEndpoint = locationCache.getWriteEndpoint();
        assert.equal(
          resolveEndpoint,
          writeEndpoint,
          "resolve endpoint should match write endpoint"
        );
      });

      // After this, there are side effects. All the "markUnavailable" ones will remove locations from the list.
      // It's probably best to not add new "it"s below here to avoid unreliable tests.
      it("read endpoint should match default endpoint even after being marked unavailable", function() {
        locationCache.markCurrentLocationUnavailableForRead(locationCache.getReadEndpoint());
        const readEndpoint = locationCache.getReadEndpoint();
        assert.equal(
          readEndpoint,
          endpoint,
          "read endpoint should match default endpoint prior to any database account info even if unavailable"
        );
        const resolveEndpoint = locationCache.resolveServiceEndpoint({
          operationType: OperationType.Read,
          resourceType: ResourceType.item,
          retryCount: 1
        });
        assert.equal(resolveEndpoint, readEndpoint, "resolve endpoint should match read endpoint");
      });

      it("write endpoint should match default endpoint even after being marked unavailable", function() {
        locationCache.markCurrentLocationUnavailableForWrite(locationCache.getWriteEndpoint());
        const writeEndpoint = locationCache.getWriteEndpoint();
        assert.equal(
          writeEndpoint,
          endpoint,
          "write endpoint should match default endpoint prior to any database account info"
        );
        const resolveEndpoint = locationCache.resolveServiceEndpoint({
          operationType: OperationType.Replace,
          resourceType: ResourceType.item,
          retryCount: 1
        });

        assert.equal(
          resolveEndpoint,
          writeEndpoint,
          "resolve endpoint should match write endpoint"
        );
      });
    });
  }
});
