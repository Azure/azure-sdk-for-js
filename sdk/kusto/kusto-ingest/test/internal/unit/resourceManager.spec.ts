// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "@azure/test-utils";
import moment from "moment";
import sinon from "sinon";
import { Client as KustoClient, KustoResponseDataSet } from "@azure/kusto-data";
import { IngestClientResources, ResourceManager } from "../../../src/resourceManager";

describe("ResourceManager", () => {
  const rows = [
    {
      ResourceTypeName: "SecuredReadyForAggregationQueue",
      StorageRoot: "https://account.queue.core.windows.net/ready1?sas",
    },
    {
      ResourceTypeName: "FailedIngestionsQueue",
      StorageRoot: "https://account.queue.core.windows.net/failed?sas",
    },
    {
      ResourceTypeName: "SuccessfulIngestionsQueue",
      StorageRoot: "https://account.queue.core.windows.net/success?sas",
    },
    {
      ResourceTypeName: "SecuredReadyForAggregationQueue",
      StorageRoot: "https://account.queue.core.windows.net/ready2?sas",
    },
    {
      ResourceTypeName: "TempStorage",
      StorageRoot: "https://account.blob.core.windows.net/t1?sas",
    },
    {
      ResourceTypeName: "TempStorage",
      StorageRoot: "https://account.blob.core.windows.net/t2?sas",
    },
  ];

  const mockedResourcesResponse = {
    primaryResults: [
      {
        *rows() {
          for (const row of rows) {
            yield row;
          }
        },
      },
    ],
  };

  describe("#constructor()", () => {
    it("valid input", () => {
      const resourceManager = new ResourceManager(
        new KustoClient("https://cluster.kusto.windows.net")
      );

      assert.strictEqual(resourceManager.ingestClientResources, null);
      assert.strictEqual(resourceManager.authorizationContext, null);
    });
  });

  describe("#getIngestClientResourcesFromService()", () => {
    it("valid input", async () => {
      const client = new KustoClient("https://cluster.kusto.windows.net");
      sinon
        .stub(client, "execute")
        .returns(Promise.resolve(mockedResourcesResponse as KustoResponseDataSet));

      const resourceManager = new ResourceManager(client);

      const resources = await resourceManager.getIngestClientResourcesFromService();
      assert.strictEqual(resources.containers!.length, 2);
      assert.strictEqual(resources.successfulIngestionsQueues!.length, 1);
      assert.strictEqual(resources.failedIngestionsQueues!.length, 1);
      assert.strictEqual(resources.securedReadyForAggregationQueues!.length, 2);
    });

    it("error response", async () => {
      const client = new KustoClient("https://cluster.kusto.windows.net");
      sinon.stub(client, "execute").throwsException(new Error("Kusto request erred (403)"));

      const resourceManager = new ResourceManager(client);
      try {
        await resourceManager.getIngestClientResourcesFromService();
      } catch (ex: any) {
        assert.ok(ex instanceof Error);
        assert(ex.message.startsWith("Kusto request erred (403)"));
        return;
      }
      assert.fail();
    });
  });

  describe("#getResourceByName()", () => {
    it("valid input", () => {
      const resourceManager = new ResourceManager(
        new KustoClient("https://cluster.kusto.windows.net")
      );

      const resources = resourceManager.getResourceByName(
        mockedResourcesResponse.primaryResults[0],
        "TempStorage"
      );
      assert.strictEqual(resources.length, 2);
    });
  });

  describe("#refreshIngestClientResources()", () => {
    it("should refresh", async () => {
      const resourceManager = new ResourceManager(
        new KustoClient("https://cluster.kusto.windows.net")
      );

      const call = sinon.stub(resourceManager, "getIngestClientResourcesFromService");

      await resourceManager.refreshIngestClientResources();
      assert.strictEqual(call.calledOnce, true);
    });

    it("shouldn't refresh", async () => {
      const resourceManager = new ResourceManager(
        new KustoClient("https://cluster.kusto.windows.net")
      );

      const call = sinon.stub(resourceManager, "getIngestClientResourcesFromService");
      resourceManager.ingestClientResourcesNextUpdate = moment().add(1, "minute");
      resourceManager.ingestClientResources = new IngestClientResources([], [], [], []);

      await resourceManager.refreshIngestClientResources();
      assert.strictEqual(call.calledOnce, false);
    });
  });
});
