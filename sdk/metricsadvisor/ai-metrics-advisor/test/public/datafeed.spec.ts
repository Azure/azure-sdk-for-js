// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: (jeremymeng) fix tests due to dataSourceParameter now being optional
// @ts-nocheck

import { assert } from "chai";
import { Context } from "mocha";
import {
  DataFeedGranularity,
  DataFeedIngestionSettings,
  DataFeedOptions,
  DataFeedPatch,
  DataFeedSchema,
  DataFeedSource,
  DataFeedDimension,
  DataFeedMetric,
  MetricsAdvisorAdministrationClient,
  UnknownDataFeedSource
} from "../../src";
import { createRecordedAdminClient, testEnv, makeCredential } from "./util/recordedClients";
import { Recorder } from "@azure/test-utils-recorder";
import { matrix } from "./util/matrix";

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}]`, () => {
    describe("MetricsAdvisorAdministrationClient datafeed", () => {
      let client: MetricsAdvisorAdministrationClient;
      let recorder: Recorder;
      let feedName: string;
      let appInsightsFeedName: string;
      let sqlServerFeedName: string;
      let cosmosFeedName: string;
      let dataExplorerFeedName: string;
      let azureTableFeedName: string;
      let httpRequestFeedName: string;
      let influxDbFeedName: string;
      let mongoDbFeedName: string;
      let mySqlFeedName: string;
      let postgreSqlFeedName: string;

      beforeEach(function(this: Context) {
        ({ recorder, client } = createRecordedAdminClient(this, makeCredential(useAad)));
        if (recorder && !feedName) {
          feedName = recorder.getUniqueName("js-test-datafeed-");
        }
        if (recorder && !appInsightsFeedName) {
          appInsightsFeedName = recorder.getUniqueName("js-test-appInsightsFeed-");
        }
        if (recorder && !sqlServerFeedName) {
          sqlServerFeedName = recorder.getUniqueName("js-test-sqlServerFeed-");
        }
        if (recorder && !cosmosFeedName) {
          cosmosFeedName = recorder.getUniqueName("js-test-cosmosFeed-");
        }
        if (recorder && !dataExplorerFeedName) {
          dataExplorerFeedName = recorder.getUniqueName("js-test-dataExplorerFeed-");
        }
        if (recorder && !azureTableFeedName) {
          azureTableFeedName = recorder.getUniqueName("js-test-tableFeed-");
        }
        if (recorder && !httpRequestFeedName) {
          httpRequestFeedName = recorder.getUniqueName("js-test-httpRequestFeed-");
        }
        if (recorder && !influxDbFeedName) {
          influxDbFeedName = recorder.getUniqueName("js-test-influxdbFeed-");
        }
        if (recorder && !mongoDbFeedName) {
          mongoDbFeedName = recorder.getUniqueName("js-test-mongoDbFeed-");
        }
        if (recorder && !mySqlFeedName) {
          mySqlFeedName = recorder.getUniqueName("js-test-mySqlFeed-");
        }
        if (recorder && !postgreSqlFeedName) {
          postgreSqlFeedName = recorder.getUniqueName("js-test-postgreSqlFeed-");
        }
      });

      afterEach(async function() {
        if (recorder) {
          await recorder.stop();
        }
      });

      let createdAzureBlobDataFeedId: string;
      let createdAppFeedId: string;
      let createdSqlServerFeedId: string;
      let createdCosmosFeedId: string;
      let createdAzureDataExplorerFeedId: string;
      let createdAzureTableFeedId: string;
      let createdInfluxFeedId: string;
      let createdMongoDbFeedId: string;
      let createdMySqlFeedId: string;
      let createdPostGreSqlId: string;

      describe("DataFeed", async () => {
        const metric: DataFeedMetric[] = [
          {
            name: "cost",
            displayName: "cost",
            description: ""
          },
          {
            name: "revenue",
            displayName: "revenue",
            description: ""
          }
        ];
        const dimension: DataFeedDimension[] = [
          { name: "category", displayName: "category" },
          { name: "city", displayName: "city" }
        ];
        const dataFeedSchema: DataFeedSchema = {
          metrics: metric,
          dimensions: dimension
        };
        const dataFeedIngestion: DataFeedIngestionSettings = {
          ingestionStartTime: new Date(Date.UTC(2020, 7, 21)),
          ingestionStartOffsetInSeconds: 0,
          dataSourceRequestConcurrency: -1,
          ingestionRetryDelayInSeconds: -1,
          stopRetryAfterInSeconds: -1
        };
        const granularity: DataFeedGranularity = {
          granularityType: "Daily"
        };
        const options: DataFeedOptions = {
          description: "Data feed description",
          rollupSettings: {
            rollupType: "AutoRollup",
            rollupMethod: "Sum",
            rollupIdentificationValue: "__CUSTOM_SUM__"
          },
          missingDataPointFillSettings: {
            fillType: "CustomValue",
            customFillValue: 555
          },
          accessMode: "Private"
        };

        it("creates an Azure Blob datafeed", async () => {
          // accessing environment variables here so they are already replaced by test env ones
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureBlob",
            connectionString: testEnv.METRICS_ADVISOR_AZURE_BLOB_CONNECTION_STRING,
            container: "adsample",
            blobTemplate: testEnv.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE,
            authenticationType: "Basic"
          };
          const expectedSourceByService: DataFeedSource = {
            dataSourceType: "AzureBlob",
            connectionString: undefined,
            container: "adsample",
            blobTemplate: testEnv.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE,
            authenticationType: "Basic"
          };
          const actual = await client.createDataFeed({
            name: feedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAzureBlobDataFeedId = actual.id;

          assert.equal(actual.schema.metrics?.length, 2, "Expecting two metrics");
          assert.equal(actual.schema.dimensions?.length, 2, "Expecting two dimensions");
          assert.equal(actual.name, feedName);

          assert.deepStrictEqual(actual.source, expectedSourceByService, "Source mismatch!");
          assert.deepStrictEqual(actual.granularity, granularity, "Granularity mismatch!");
          assert.equal(
            actual.schema.metrics[0].name,
            dataFeedSchema.metrics[0].name,
            "Schema metric 1 name mismatch!"
          );
          assert.equal(
            actual.schema.metrics[1].name,
            dataFeedSchema.metrics[1].name,
            "Schema metric 2 name mismatch!"
          );
          assert.strictEqual(actual.schema.timestampColumn, "", "Schema timestampColumn mismatch!");
          assert.equal(
            actual.schema.dimensions![0].displayName,
            dataFeedSchema.dimensions![0].displayName,
            "Schema dimension 1 display name mismatch!"
          );
          assert.deepStrictEqual(
            actual.ingestionSettings,
            dataFeedIngestion,
            "Ingesting settings mismatch!"
          );
          assert.equal(
            actual.metricIds.get(dataFeedSchema.metrics[0].name),
            actual.schema.metrics[0].id
          );

          assert.equal(actual.description, options.description, "options.description mismatch");
          assert.equal(actual.accessMode, options.accessMode, "options.accessMode mismatch");
          assert.ok(
            actual.missingDataPointFillSettings,
            "Expecting valid options.missingDataPointFillSettings"
          );
          assert.equal(
            actual.missingDataPointFillSettings!.fillType,
            options.missingDataPointFillSettings!.fillType,
            "options.missingDataPointFillSettings.fillType mismatch"
          );
          assert.ok(
            actual.missingDataPointFillSettings!.fillType,
            "Expecting valid options.missingDataPointFillSettings.fillType"
          );
          if (actual.missingDataPointFillSettings!.fillType! === "CustomValue") {
            // not sure why TS didn't narrow down the union type for us...so casting to any
            assert.equal(
              (actual.missingDataPointFillSettings! as any).customFillValue,
              (options.missingDataPointFillSettings! as any).customFillValue,
              "options.missingDataPointFillSettings.customFillValue mismatch"
            );
          }
          assert.ok(actual.rollupSettings, "Expecting valid options.rollupSettings");
          assert.equal(
            actual.rollupSettings!.rollupType,
            options.rollupSettings!.rollupType,
            "options.missingDataPointFillSettings.rollupType mismatch"
          );
          assert.ok(
            actual.rollupSettings!.rollupType,
            "Expecting valid options.missingDataPointFillSettings.fillType"
          );
          if (actual.rollupSettings!.rollupType! === "AutoRollup") {
            // not sure why TS didn't narrow down the union type for us...so casting to any
            assert.equal(
              (actual.rollupSettings! as any).rollupIdentificationValue,
              (options.rollupSettings! as any).rollupIdentificationValue,
              "options.missingDataPointFillSettings.fillType mismatch"
            );
          }
        });

        it("retrieves an Azure Blob datafeed", async function(this: Context) {
          // accessing environment variables here so they are already replaced by test env ones
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureBlob",
            container: "adsample",
            connectionString: undefined,
            blobTemplate: testEnv.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE,
            authenticationType: "Basic"
          };

          if (!createdAzureBlobDataFeedId) {
            this.skip();
          }

          const actual = await client.getDataFeed(createdAzureBlobDataFeedId);
          assert.equal(actual.schema.metrics?.length, 2, "Expecting two metrics");
          assert.equal(actual.schema.dimensions?.length, 2, "Expecting two dimensions");
          assert.equal(actual.name, feedName);
          assert.deepStrictEqual(actual.source, expectedSource, "Source mismatch!");
          assert.deepStrictEqual(actual.granularity, granularity, "Granularity mismatch!");
          assert.equal(
            actual.schema.metrics[0].name,
            dataFeedSchema.metrics[0].name,
            "Schema metric 1 name mismatch!"
          );
          assert.equal(
            actual.schema.metrics[1].name,
            dataFeedSchema.metrics[1].name,
            "Schema metric 2 name mismatch!"
          );
          assert.strictEqual(actual.schema.timestampColumn, "", "Schema timestampColumn mismatch!");
          assert.equal(
            actual.schema.dimensions![0].displayName,
            dataFeedSchema.dimensions![0].displayName,
            "Schema dimension 1 display name mismatch!"
          );
        });

        it("updates an Azure Blob datafeed", async function(this: Context) {
          if (!createdAzureBlobDataFeedId) {
            this.skip();
          }
          const expectedSourceParameter = {
            dataSourceType: "AzureBlob",
            connectionString: "Updated Azure Blob connection string",
            container: "Updated Azure Blob container",
            blobTemplate: "Updated Azure Blob template",
            authenticationType: "ManagedIdentity"
          };
          const expectedServerParameter = {
            dataSourceType: "AzureBlob",
            connectionString: undefined,
            container: "Updated Azure Blob container",
            blobTemplate: "Updated Azure Blob template",
            authenticationType: "ManagedIdentity"
          }
          const expectedIngestionSettings = {
            ingestionStartTime: new Date(Date.UTC(2020, 7, 1)),
            ingestionStartOffsetInSeconds: 2,
            dataSourceRequestConcurrency: 3,
            ingestionRetryDelayInSeconds: 4,
            stopRetryAfterInSeconds: 5
          };
          const patch: DataFeedPatch = {
            source: {              
              ...expectedSourceParameter
            },
            name: recorder.getUniqueName("Updated-Azure-Blob-data-feed-"),
            schema: {
              timestampColumn: "UpdatedTimestampeColumn"
            },
            ingestionSettings: expectedIngestionSettings,
            description: "Updated Azure Blob description",
            rollupSettings: {
              rollupType: "AlreadyRollup",
              rollupIdentificationValue: "__Existing__"
            },
            missingDataPointFillSettings: {
              fillType: "PreviousValue"
            },
            accessMode: "Public",
            viewerEmails: ["viewer1@example.com"],
            actionLinkTemplate: "Updated Azure Blob action link template"
          };
          await client.updateDataFeed(createdAzureBlobDataFeedId, patch);
          const updated = await client.getDataFeed(createdAzureBlobDataFeedId);
          assert.ok(updated.id, "Expecting valid data feed");
          assert.equal(updated.source.dataSourceType, "AzureBlob");
          assert.deepStrictEqual(updated.source, expectedServerParameter);
          assert.equal(updated.source.authenticationType, expectedSourceParameter.authenticationType);
          assert.deepStrictEqual(updated.ingestionSettings, expectedIngestionSettings);
          assert.equal(updated.description, "Updated Azure Blob description");
          assert.ok(updated.rollupSettings, "Expecting valid updated.options.rollupSettings");
          assert.equal(updated.rollupSettings!.rollupType, "AlreadyRollup");
          assert.equal((updated.rollupSettings! as any).rollupIdentificationValue, "__Existing__");
          assert.equal(updated.missingDataPointFillSettings?.fillType, "PreviousValue");
          assert.equal(updated.accessMode, "Public");
          assert.deepStrictEqual(updated.viewerEmails, ["viewer1@example.com"]);
          assert.equal(updated.actionLinkTemplate, "Updated Azure Blob action link template");
        });

        it("creates an Azure Application Insights feed", async () => {
          // accessing environment variables here so they are already replaced by test env ones
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureApplicationInsights",
            azureCloud: "Azure",
            applicationId: testEnv.METRICS_ADVISOR_AZURE_APPINSIGHTS_APPLICATION_ID,
            apiKey: testEnv.METRICS_ADVISOR_AZURE_APPINSIGHTS_API_KEY,
            query:
                "let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"
          };
          const actual = await client.createDataFeed({
            name: appInsightsFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAppFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureApplicationInsights");
          if (actual.source.dataSourceType === "AzureApplicationInsights") {
            assert.equal(actual.source.azureCloud, "Azure");
            assert.equal(
              actual.source.applicationId,
              testEnv.METRICS_ADVISOR_AZURE_APPINSIGHTS_APPLICATION_ID
            );
            assert.equal(
              actual.source.apiKey,
              undefined
            );
            assert.equal(
              actual.source.query,
              "let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"
            );
          }
        });

        it("creates an Azure SQL Server Feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "SqlServer",
            connectionString: testEnv.METRICS_ADVISOR_AZURE_SQL_SERVER_CONNECTION_STRING,
            query: "select * from adsample2 where Timestamp = @StartTime"
          };
          const actual = await client.createDataFeed({
            name: sqlServerFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdSqlServerFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "SqlServer");
          if (actual.source.dataSourceType === "SqlServer") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(
              actual.source.query,
              "select * from adsample2 where Timestamp = @StartTime"
            );
          }
        });

        it("lists datafeed", async function() {
          const iterator = client.listDataFeeds({
            filter: {
              dataFeedName: "js-test-"
            }
          });
          let result = await iterator.next();
          assert.ok(result.value.status, "Expecting first data feed");
          result = await iterator.next();
          assert.ok(result.value.status, "Expecting second data feed");
        });

        it("lists datafeed by pages", async function() {
          const iterator = client
            .listDataFeeds({
              filter: {
                dataFeedName: "js-test-"
              }
            })
            .byPage({ maxPageSize: 1 });
          let result = await iterator.next();
          assert.equal(result.value.length, 1, "Expecting one entry in first page");
          result = await iterator.next();
          assert.equal(result.value.length, 1, "Expecting one entry in second page");
        });

        it("deletes an Azure Blob datafeed", async function() {
          await verifyDataFeedDeletion(client, createdAzureBlobDataFeedId);
        });

        it("deletes an Azure Application Insights feed", async function() {
          await verifyDataFeedDeletion(client, createdAppFeedId);
        });

        it("deletes an Azure SQL Server feed", async function() {
          await verifyDataFeedDeletion(client, createdSqlServerFeedId);
        });

        it("creates an Azure Cosmos DB Feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureCosmosDB",
            connectionString: "Server=server.example.net;Encrypt=True;",
            sqlQuery: "let starttime=datetime(@StartTime); let endtime=starttime",
            database: "sample",
            collectionId: "sample",
            authenticationType: "Basic"
          };
          const actual = await client.createDataFeed({
            name: cosmosFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdCosmosFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureCosmosDB");
          if (actual.source.dataSourceType === "AzureCosmosDB") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(
              actual.source.sqlQuery,
              "let starttime=datetime(@StartTime); let endtime=starttime"
            );
            assert.equal(actual.source.database, "sample");
            assert.equal(actual.source.collectionId, "sample");
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes an Azure Cosmos DB", async function() {
          await verifyDataFeedDeletion(client, createdCosmosFeedId);
        });

        it("creates an Azure Data Explorer feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureDataExplorer",
            connectionString: "Server=server.example.net;Encrypt=True;",
            query: "let starttime=datetime(@StartTime); let endtime=starttime",
            authenticationType: "ManagedIdentity"
          };
          const actual = await client.createDataFeed({
            name: dataExplorerFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAzureDataExplorerFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureDataExplorer");
          if (actual.source.dataSourceType === "AzureDataExplorer") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(
              actual.source.query,
              "let starttime=datetime(@StartTime); let endtime=starttime"
            );
            assert.equal(actual.source.authenticationType, "ManagedIdentity");
          }
        });

        it("deletes an Azure Data Explorer feed", async function() {
          await verifyDataFeedDeletion(client, createdAzureDataExplorerFeedId);
        });

        it("creates an Azure Table feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureTable",
            connectionString: "https://table.example.net",
            table: "table-name",
            query: "partition-key eq @start-time",
            authenticationType: "Basic"
          };
          const actual = await client.createDataFeed({
            name: azureTableFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAzureTableFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureTable");
          if (actual.source.dataSourceType === "AzureTable") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(actual.source.table, "table-name");
            assert.equal(actual.source.query, "partition-key eq @start-time");
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes an Azure Table feed", async function() {
          await verifyDataFeedDeletion(client, createdAzureTableFeedId);
        });

        it("creates MongoDB data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "MongoDB",
            connectionString: "https://connect-to-mongodb",
            database: "data-feed-mongodb",
            command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
            authenticationType: "Basic"
          };
          const actual = await client.createDataFeed({
            name: mongoDbFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdMongoDbFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "MongoDB");
          if (actual.source.dataSourceType === "MongoDB") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(actual.source.database, "data-feed-mongodb");
            assert.equal(
              actual.source.command,
              "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"
            );
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes MongoDB data feed", async function() {
          await verifyDataFeedDeletion(client, createdMongoDbFeedId);
        });

        it("creates MySQL data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "MySql",
            connectionString: "https://connect-to-mysql",
            query: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
            authenticationType: "Basic"
          };
          const actual = await client.createDataFeed({
            name: mySqlFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdMySqlFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "MySql");
          if (actual.source.dataSourceType === "MySql") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(
              actual.source.query,
              "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"
            );
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes MySQL data feed", async function() {
          await verifyDataFeedDeletion(client, createdMySqlFeedId);
        });

        it("creates PostgreSQL data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "PostgreSql",
            connectionString: "https://connect-to-postgresql",
            query: "{ find: postgresql,filter: { Time: @StartTime },batch: 200 }",
            authenticationType: "Basic"
          };
          const actual = await client.createDataFeed({
            name: postgreSqlFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options
          });

          assert.ok(actual.id, "Expecting valid data feed id");
          createdPostGreSqlId = actual.id;
          assert.equal(actual.source.dataSourceType, "PostgreSql");
          if (actual.source.dataSourceType === "PostgreSql") {
            assert.equal(
              actual.source.connectionString,
              undefined
            );
            assert.equal(
              actual.source.query,
              "{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"
            );
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("updates data feed to have a different data source type", async function() {
          const patch: DataFeedPatch = {
            source: {
              dataSourceType: "MongoDB",
              connectionString: "https://connect-to-mongodb-patch",
              database: "data-feed-mongodb-patch",
              command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
              authenticationType: "Basic"              
            }
          };
          const patchServer = {
            source: {
              dataSourceType: "MongoDB",
              connectionString: undefined,
              database: "data-feed-mongodb-patch",
              command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
              authenticationType: "Basic"              
            }
          };
          await client.updateDataFeed(createdPostGreSqlId, patch);
          const updated = await client.getDataFeed(createdPostGreSqlId);
          assert.ok(updated.id, "Expecting valid data feed");
          assert.equal(updated.source.dataSourceType, "MongoDB");
          
          assert.deepStrictEqual(
            updated.source,
            patchServer.source
          );
        });

        it("deletes PostgreSQL data feed", async function() {
          await verifyDataFeedDeletion(client, createdPostGreSqlId);
        });

        it("creates Unknown data feed", async () => {
          const expectedSource: UnknownDataFeedSource = {
            dataSourceType: "Unknown",
            connectionString: "https://connect-to-postgresql",
            query: "{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"
          };
          try {
            await client.createDataFeed({
              name: postgreSqlFeedName,
              source: expectedSource,
              granularity,
              schema: dataFeedSchema,
              ingestionSettings: dataFeedIngestion,
              ...options
            });
            assert.fail("Test should throw error");
          } catch (error) {
            assert.equal(
              (error as any).message,
              "Cannot create a data feed with the Unknown source type."
            );
          }
        });

        it("updates data feed to have an unknown data source type", async function() {
          const patch: DataFeedPatch = {
            source: {
              dataSourceType: "Unknown",
              connectionString: "https://connect-to-mongodb-patch",
              database: "data-feed-mongodb-patch",
              command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"
            }
          };
          try {
            await client.updateDataFeed(createdPostGreSqlId, patch);
            assert.fail("Test should throw error");
          } catch (error) {
            assert.equal(
              (error as any).message,
              "Cannot update a data feed to have the Unknown source type."
            );
          }
        });
      });
    }).timeout(60000);
  });
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function verifyDataFeedDeletion(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  this: any,
  client: MetricsAdvisorAdministrationClient,
  createdDataFeedId: string
): Promise<void> {
  if (!createdDataFeedId) {
    this.skip();
  }

  await client.deleteDataFeed(createdDataFeedId);
  try {
    await client.getDataFeed(createdDataFeedId);
    assert.fail("Expecting error getting data feed");
  } catch (error) {
    assert.equal((error as any).code, "ERROR_INVALID_PARAMETER");
    assert.equal((error as any).message, "datafeedId is invalid.");
  }
}
