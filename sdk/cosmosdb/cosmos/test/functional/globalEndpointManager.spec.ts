import { DatabaseAccount, ResourceResponse, RequestOptions, RequestContext, ConnectionPolicy } from "../../dist-esm";
import { endpoint, masterKey } from "../common/_testConfig";
import { GlobalEndpointManager } from "../../dist-esm/globalEndpointManager";
import { sleep, HTTPMethod, OperationType, ResourceType } from "../../dist-esm/common";

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
  "x-ms-throttle-retry-wait-time-ms": 0
};
const databaseAccountBody: any = {
  writableLocations: [{ name: "West US 2", databaseAccountEndpoint: "https://test-westus2.documents.azure.com:443/" }],
  readableLocations: [
    { name: "West US 2", databaseAccountEndpoint: "https://test-westus2.documents.azure.com:443/" },
    { name: "East US 2", databaseAccountEndpoint: "https://test-eastus2.documents.azure.com:443/" }
  ],
  DatabasesLink: "/dbs/",
  MediaLink: "/media/",
  ConsistencyPolicy: "Session"
};

describe("GlobalEndpointManager", function() {
  describe("#resolveServiceEndpoint", function() {
    it("should resolve the correct endpoint", async function() {
      const gem = new GlobalEndpointManager(
        {
          endpoint: "https://test.documents.azure.com:443/",
          key: masterKey,
          connectionPolicy: { enableEndpointDiscovery: true, preferredLocations: ["East US 2", "West US 2"] }
        },
        async (opts: RequestOptions) => {
          await sleep(1000);

          const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
            new DatabaseAccount(databaseAccountBody, headers),
            headers,
            200
          );

          return response;
        }
      );
      const request: RequestContext = {
        endpoint: undefined,
        globalEndpointManager: gem,
        requestAgent: undefined, // shouldn't be needed
        connectionPolicy: this.connectionPolicy,
        method: HTTPMethod.get,
        client: undefined, // shouldn't be needed
        operationType: OperationType.Read,
        path: undefined, // shouldn't be needed
        resourceType: ResourceType.none, // DatabaseAccount
        options: undefined, // shouldn't be needed
        plugins: undefined // shouldn't be needed
      };
      // We don't block on init for database account calls
      assert.equal(await gem.resolveServiceEndpoint(request), "https://test.documents.azure.com:443/");

      // For item calls, we do block on init, so this should resolve the correct regional endpoint
      request.resourceType = ResourceType.item;
      assert.equal(await gem.resolveServiceEndpoint(request), "https://test-eastus2.documents.azure.com:443/");

      // This time, it should use the current regional endpoint.
      request.resourceType = ResourceType.none; // DatabaseAccount
      assert.equal(await gem.resolveServiceEndpoint(request), "https://test-eastus2.documents.azure.com:443/");
    });
  });
});
