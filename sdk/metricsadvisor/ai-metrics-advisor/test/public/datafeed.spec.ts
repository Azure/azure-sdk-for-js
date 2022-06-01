// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import {
  DataFeedGranularity,
  DataFeedIngestionSettings,
  DataFeedPatch,
  DataFeedSchema,
  DataFeedSource,
  DataFeedDimension,
  DataFeedMetric,
  MetricsAdvisorAdministrationClient,
  UnknownDataFeedSource,
  DataFeedDescriptor,
  DataFeedRollupSettings,
  AzureBlobDataFeedSource,
  DataFeedAccessMode,
  MongoDbDataFeedSource,
  AzureDataLakeStorageGen2DataFeedSource,
  AzureEventHubsDataFeedSource,
  AzureLogAnalyticsDataFeedSource,
} from "../../src";
import { createRecordedAdminClient, testEnv, makeCredential } from "./util/recordedClients";
import { Recorder } from "@azure-tools/test-recorder";
import { matrix, getYieldedValue } from "@azure/test-utils";

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
      let eventHubsFeedName: string;
      let influxDbFeedName: string;
      let mongoDbFeedName: string;
      let mySqlFeedName: string;
      let postgreSqlFeedName: string;
      let datalakeGenFeedName: string;
      let logAnalyticsFeedName: string;

      beforeEach(function (this: Context) {
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
        if (recorder && !eventHubsFeedName) {
          eventHubsFeedName = recorder.getUniqueName("js-test-eventhubRequestFeed-");
        }
        if (recorder && !logAnalyticsFeedName) {
          logAnalyticsFeedName = recorder.getUniqueName("js-test-logAnalyticsFeed-");
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
        if (recorder && !datalakeGenFeedName) {
          datalakeGenFeedName = recorder.getUniqueName("js-test-dataLakeGenFeed-");
        }
      });

      afterEach(async function () {
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
      let createdDataLakeGenId: string;
      let createdEventhubsId: string;
      let createdLogAnalyticsId: string;

      describe("DataFeed", async () => {
        const metric: DataFeedMetric[] = [
          {
            name: "cost",
            displayName: "cost",
            description: "",
          },
          {
            name: "revenue",
            displayName: "revenue",
            description: "",
          },
        ];
        const dimension: DataFeedDimension[] = [
          { name: "category", displayName: "category" },
          { name: "city", displayName: "city" },
        ];
        const dataFeedSchema: DataFeedSchema = {
          metrics: metric,
          dimensions: dimension,
        };
        const dataFeedIngestion: DataFeedIngestionSettings = {
          ingestionStartTime: new Date(Date.UTC(2020, 7, 21)),
          ingestionStartOffsetInSeconds: 0,
          dataSourceRequestConcurrency: -1,
          ingestionRetryDelayInSeconds: -1,
          stopRetryAfterInSeconds: -1,
        };
        const granularity: DataFeedGranularity = {
          granularityType: "Daily",
        };
        const rollupSettings: DataFeedRollupSettings = {
          rollupType: "AutoRollup",
          rollupMethod: "Sum",
          rollupIdentificationValue: "__CUSTOM_SUM__",
        };
        const options = {
          description: "Data feed description",
          rollupSettings: rollupSettings,
          missingDataPointFillSettings: {
            fillType: "CustomValue",
            customFillValue: 555,
          },
          accessMode: "Private",
        };

        it("creates an Azure Blob datafeed", async () => {
          // accessing environment variables here so they are already replaced by test env ones
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureBlob",
            connectionString: testEnv.METRICS_ADVISOR_AZURE_BLOB_CONNECTION_STRING,
            container: "adsample",
            blobTemplate: testEnv.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE,
            authenticationType: "Basic",
          };
          const expectedSourceByService = {
            dataSourceType: "AzureBlob",
            connectionString: undefined,
            container: "adsample",
            blobTemplate: testEnv.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE,
            authenticationType: "Basic",
          } as unknown as DataFeedSource;
          const feed = {
            name: feedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor;
          const actual = await client.createDataFeed(feed);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAzureBlobDataFeedId = actual.id;

          assert.equal(actual.schema.metrics?.length, 2, "Expecting two metrics");
          assert.equal(actual.schema.dimensions?.length, 2, "Expecting two dimensions");
          assert.equal(actual.name, feedName);
          // the service doesn't return sensitive data
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
            actual.metricIds[dataFeedSchema.metrics[0].name],
            actual.schema.metrics[0].id
          );

          assert.equal(actual.description, options.description, "options.description mismatch");
          assert.equal(
            actual.accessMode,
            options.accessMode as DataFeedAccessMode,
            "options.accessMode mismatch"
          );
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

        it("retrieves an Azure Blob datafeed", async function (this: Context) {
          // accessing environment variables here so they are already replaced by test env ones
          const expectedSource = {
            dataSourceType: "AzureBlob",
            container: "adsample",
            connectionString: undefined,
            blobTemplate: testEnv.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE,
            authenticationType: "Basic",
          } as unknown as AzureBlobDataFeedSource;

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

        it("updates an Azure Blob datafeed", async function (this: Context) {
          if (!createdAzureBlobDataFeedId) {
            this.skip();
          }
          const expectedSourceParameter: DataFeedSource = {
            dataSourceType: "AzureBlob",
            connectionString: "Updated Azure Blob connection string",
            container: "Updated Azure Blob container",
            blobTemplate: "Updated Azure Blob template",
            authenticationType: "ManagedIdentity",
          };
          const expectedServerParameter = {
            dataSourceType: "AzureBlob",
            connectionString: undefined,
            container: "Updated Azure Blob container",
            blobTemplate: "Updated Azure Blob template",
            authenticationType: "ManagedIdentity",
          };
          const expectedIngestionSettings = {
            ingestionStartTime: new Date(Date.UTC(2020, 9, 30)),
            ingestionStartOffsetInSeconds: 2,
            dataSourceRequestConcurrency: 3,
            ingestionRetryDelayInSeconds: 64,
            stopRetryAfterInSeconds: 65,
          };
          const patch: DataFeedPatch = {
            source: {
              ...expectedSourceParameter,
            },
            name: recorder.getUniqueName("Updated-Azure-Blob-data-feed-"),
            schema: {
              timestampColumn: "UpdatedTimestampeColumn",
            },
            ingestionSettings: expectedIngestionSettings,
            description: "Updated Azure Blob description",
            rollupSettings: {
              rollupType: "AlreadyRollup",
              rollupIdentificationValue: "__Existing__",
            },
            missingDataPointFillSettings: {
              fillType: "PreviousValue",
            },
            accessMode: "Public",
            viewers: ["viewer1@example.com"],
            actionLinkTemplate: "Updated Azure Blob action link template",
          };
          const updated = await client.updateDataFeed(createdAzureBlobDataFeedId, patch);
          assert.ok(updated.id, "Expecting valid data feed");
          assert.equal(updated.source.dataSourceType, "AzureBlob");
          assert.deepStrictEqual(
            updated.source,
            expectedServerParameter as unknown as AzureBlobDataFeedSource
          );
          assert.equal(
            updated.source.authenticationType,
            expectedSourceParameter.authenticationType
          );
          assert.deepStrictEqual(updated.ingestionSettings, expectedIngestionSettings);
          assert.equal(updated.description, "Updated Azure Blob description");
          assert.ok(updated.rollupSettings, "Expecting valid updated.options.rollupSettings");
          assert.equal(updated.rollupSettings!.rollupType, "AlreadyRollup");
          assert.equal((updated.rollupSettings! as any).rollupIdentificationValue, "__Existing__");
          assert.equal(updated.missingDataPointFillSettings?.fillType, "PreviousValue");
          assert.equal(updated.accessMode, "Public");
          assert.deepStrictEqual(updated.viewers, ["viewer1@example.com"]);
          assert.equal(updated.actionLinkTemplate, "Updated Azure Blob action link template");
        });

        it("creates an Azure Application Insights feed", async () => {
          // accessing environment variables here so they are already replaced by test env ones
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureApplicationInsights",
            azureCloud: "Azure",
            authenticationType: "Basic",
            applicationId: testEnv.METRICS_ADVISOR_AZURE_APPINSIGHTS_APPLICATION_ID,
            apiKey: testEnv.METRICS_ADVISOR_AZURE_APPINSIGHTS_API_KEY,
            query:
              "let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode",
          };
          const actual = await client.createDataFeed({
            name: appInsightsFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAppFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureApplicationInsights");
          if (actual.source.dataSourceType === "AzureApplicationInsights") {
            assert.equal(actual.source.azureCloud, "Azure");
            assert.equal(
              actual.source.applicationId,
              testEnv.METRICS_ADVISOR_AZURE_APPINSIGHTS_APPLICATION_ID
            );
            assert.equal(actual.source.apiKey, undefined);
            assert.equal(
              actual.source.query,
              "let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"
            );
          }
        });

        it("creates an Azure SQL Server Feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "SqlServer",
            connectionString: testEnv.METRICS_ADVISOR_AZURE_SQL_SERVER_CONNECTION_STRING,
            query: "select * from adsample2 where Timestamp = @StartTime",
            authenticationType: "Basic",
          };
          const feed = {
            name: sqlServerFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor;
          const actual = await client.createDataFeed(feed);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdSqlServerFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "SqlServer");
          if (actual.source.dataSourceType === "SqlServer") {
            assert.equal((actual.source as any).connectionString, undefined);
            assert.equal(
              actual.source.query,
              "select * from adsample2 where Timestamp = @StartTime"
            );
          }
        });

        it("lists datafeed", async function () {
          const iterator = client.listDataFeeds({
            filter: {
              dataFeedName: "js-test-",
            },
          });
          let result = getYieldedValue(await iterator.next());
          assert.ok(result.status, "Expecting first data feed");
          result = getYieldedValue(await iterator.next());
          assert.ok(result.status, "Expecting second data feed");
        });

        it("lists datafeed by pages", async function () {
          const iterator = client
            .listDataFeeds({
              filter: {
                dataFeedName: "js-test-",
              },
            })
            .byPage({ maxPageSize: 1 });
          let result = await iterator.next();
          assert.equal(result.value.length, 1, "Expecting one entry in first page");
          result = await iterator.next();
          assert.equal(result.value.length, 1, "Expecting one entry in second page");
        });

        it("deletes an Azure Blob datafeed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdAzureBlobDataFeedId);
        });

        it("deletes an Azure Application Insights feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdAppFeedId);
        });

        it("deletes an Azure SQL Server feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdSqlServerFeedId);
        });

        it("creates an Azure Cosmos DB Feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureCosmosDB",
            connectionString: "Server=server.example.net;Encrypt=True;",
            sqlQuery: "let starttime=datetime(@StartTime); let endtime=starttime",
            database: "sample",
            collectionId: "sample",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: cosmosFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdCosmosFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureCosmosDB");
          if (actual.source.dataSourceType === "AzureCosmosDB") {
            assert.equal(actual.source.connectionString, undefined);
            assert.equal(
              actual.source.sqlQuery,
              "let starttime=datetime(@StartTime); let endtime=starttime"
            );
            assert.equal(actual.source.database, "sample");
            assert.equal(actual.source.collectionId, "sample");
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes an Azure Cosmos DB", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdCosmosFeedId);
        });

        it("creates an Azure Data Explorer feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureDataExplorer",
            connectionString: "Server=server.example.net;Encrypt=True;",
            query: "let starttime=datetime(@StartTime); let endtime=starttime",
            authenticationType: "ManagedIdentity",
          };
          const actual = await client.createDataFeed({
            name: dataExplorerFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAzureDataExplorerFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureDataExplorer");
          if (actual.source.dataSourceType === "AzureDataExplorer") {
            assert.equal(actual.source.connectionString, undefined);
            assert.equal(
              actual.source.query,
              "let starttime=datetime(@StartTime); let endtime=starttime"
            );
            assert.equal(actual.source.authenticationType, "ManagedIdentity");
          }
        });

        it("deletes an Azure Data Explorer feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdAzureDataExplorerFeedId);
        });

        it("creates an Azure Table feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "AzureTable",
            connectionString: "https://table.example.net",
            table: "table-name",
            query: "partition-key eq @start-time",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: azureTableFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdAzureTableFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureTable");
          if (actual.source.dataSourceType === "AzureTable") {
            assert.equal(actual.source.connectionString, undefined);
            assert.equal(actual.source.table, "table-name");
            assert.equal(actual.source.query, "partition-key eq @start-time");
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes an Azure Table feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdAzureTableFeedId);
        });

        it("creates InfluxDB data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "InfluxDB",
            connectionString: "https://connect-to-influxdb",
            database: "data-feed-database",
            userName: "user",
            password: "SecretPlaceholder",
            query: "partition-key eq @start-time",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: influxDbFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdInfluxFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "InfluxDB");
          if (actual.source.dataSourceType === "InfluxDB") {
            assert.equal(actual.source.connectionString, "https://connect-to-influxdb");
            assert.equal(actual.source.database, "data-feed-database");
            assert.equal(actual.source.userName, "user");
            assert.equal(actual.source.password, undefined);
            assert.equal(actual.source.query, "partition-key eq @start-time");
          }
        });

        it("deletes InfluxDB data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdInfluxFeedId);
        });

        it("creates MongoDB data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "MongoDB",
            connectionString: "https://connect-to-mongodb",
            database: "data-feed-mongodb",
            command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: mongoDbFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdMongoDbFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "MongoDB");
          if (actual.source.dataSourceType === "MongoDB") {
            assert.equal(actual.source.connectionString, undefined);
            assert.equal(actual.source.database, "data-feed-mongodb");
            assert.equal(
              actual.source.command,
              "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"
            );
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes MongoDB data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdMongoDbFeedId);
        });

        it("creates MySQL data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "MySql",
            connectionString: "https://connect-to-mysql",
            query: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: mySqlFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdMySqlFeedId = actual.id;
          assert.equal(actual.source.dataSourceType, "MySql");
          if (actual.source.dataSourceType === "MySql") {
            assert.equal(actual.source.connectionString, undefined);
            assert.equal(
              actual.source.query,
              "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"
            );
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("deletes MySQL data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdMySqlFeedId);
        });

        it("creates Datalake Gen 2 data feed", async () => {
          const expectedSource: AzureDataLakeStorageGen2DataFeedSource = {
            dataSourceType: "AzureDataLakeStorageGen2",
            directoryTemplate: "directory-template",
            fileSystemName: "file-system-name",
            fileTemplate: "file-template",
            accountKey: "account-key",
            accountName: "account-name",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: datalakeGenFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdDataLakeGenId = actual.id;
          assert.equal(actual.source.dataSourceType, "AzureDataLakeStorageGen2");
          if (actual.source.dataSourceType === "AzureDataLakeStorageGen2") {
            assert.equal(actual.source.accountName, expectedSource.accountName);
            assert.equal(actual.source.authenticationType, expectedSource.authenticationType);
            assert.equal(actual.source.fileSystemName, expectedSource.fileSystemName);
            assert.equal(actual.source.fileTemplate, expectedSource.fileTemplate);
            assert.equal(actual.source.directoryTemplate, expectedSource.directoryTemplate);
          }
        });

        it("deletes Datalake Gen 2 data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdDataLakeGenId);
        });

        it.skip("creates Eventhubs data feed", async () => {
          const expectedSource: AzureEventHubsDataFeedSource = {
            dataSourceType: "AzureEventHubs",
            authenticationType: "Basic",
            connectionString: testEnv.METRICS_EVENTHUB_CONNECTION_STRING,
            consumerGroup: testEnv.METRICS_EVENTHUB_CONSUMER_GROUP,
          };
          const actual = await client.createDataFeed({
            name: eventHubsFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdEventhubsId = actual.id;
          assert.equal(actual.source.dataSourceType, expectedSource.dataSourceType);
          if (actual.source.dataSourceType === "AzureEventHubs") {
            assert.equal(actual.source.consumerGroup, expectedSource.consumerGroup);
            assert.equal(actual.source.authenticationType, expectedSource.authenticationType);
            assert.equal(actual.source.connectionString, undefined);
          }
        });

        it.skip("deletes Eventhubs data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdEventhubsId);
        });

        it("creates Log Analytics data feed", async () => {
          const expectedSource: AzureLogAnalyticsDataFeedSource = {
            dataSourceType: "AzureLogAnalytics",
            authenticationType: "Basic",
            clientId: "client-id",
            clientSecret: "client-secret",
            tenantId: "tenant-id",
            workspaceId: "workspace-id",
            query: "query",
          };
          const actual = await client.createDataFeed({
            name: logAnalyticsFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdLogAnalyticsId = actual.id;
          assert.equal(actual.source.dataSourceType, expectedSource.dataSourceType);
          if (actual.source.dataSourceType === "AzureLogAnalytics") {
            assert.equal(actual.source.query, expectedSource.query);
            assert.equal(actual.source.workspaceId, expectedSource.workspaceId);
            assert.equal(actual.source.authenticationType, expectedSource.authenticationType);
            if (actual.source.authenticationType === "Basic") {
              assert.equal(actual.source.tenantId, expectedSource.tenantId);
              assert.equal(actual.source.clientId, expectedSource.clientId);
              assert.equal(actual.source.clientSecret, undefined);
            }
          }
        });

        it("deletes Log Analytics data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdLogAnalyticsId);
        });

        it("creates PostgreSQL data feed", async () => {
          const expectedSource: DataFeedSource = {
            dataSourceType: "PostgreSql",
            connectionString: "https://connect-to-postgresql",
            query: "{ find: postgresql,filter: { Time: @StartTime },batch: 200 }",
            authenticationType: "Basic",
          };
          const actual = await client.createDataFeed({
            name: postgreSqlFeedName,
            source: expectedSource,
            granularity,
            schema: dataFeedSchema,
            ingestionSettings: dataFeedIngestion,
            ...options,
          } as DataFeedDescriptor);

          assert.ok(actual.id, "Expecting valid data feed id");
          createdPostGreSqlId = actual.id;
          assert.equal(actual.source.dataSourceType, "PostgreSql");
          if (actual.source.dataSourceType === "PostgreSql") {
            assert.equal(actual.source.connectionString, undefined);
            assert.equal(
              actual.source.query,
              "{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"
            );
            assert.equal(actual.source.authenticationType, "Basic");
          }
        });

        it("updates data feed to have a different data source type", async function () {
          const patch: DataFeedPatch = {
            source: {
              dataSourceType: "MongoDB",
              connectionString: "https://connect-to-mongodb-patch",
              database: "data-feed-mongodb-patch",
              command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
              authenticationType: "Basic",
            },
          };
          const patchServer = {
            source: {
              dataSourceType: "MongoDB",
              connectionString: undefined,
              database: "data-feed-mongodb-patch",
              command: "{ find: mongodb,filter: { Time: @StartTime },batch: 200 }",
              authenticationType: "Basic",
            },
          };
          const updated = await client.updateDataFeed(createdPostGreSqlId, patch);
          assert.ok(updated.id, "Expecting valid data feed");
          assert.equal(updated.source.dataSourceType, "MongoDB");

          assert.deepStrictEqual(
            updated.source,
            patchServer.source as unknown as MongoDbDataFeedSource
          );
        });

        it("deletes PostgreSQL data feed", async function (this: Context) {
          await verifyDataFeedDeletion(this, client, createdPostGreSqlId);
        });

        it("creates Unknown data feed", async () => {
          const expectedSource: UnknownDataFeedSource = {
            dataSourceType: "Unknown",
            dataSourceParameter: "",
            authenticationType: "Basic",
          };
          try {
            await client.createDataFeed({
              name: postgreSqlFeedName,
              source: expectedSource,
              granularity,
              schema: dataFeedSchema,
              ingestionSettings: dataFeedIngestion,
              ...options,
            } as DataFeedDescriptor);
            assert.fail("Test should throw error");
          } catch (error: any) {
            assert.equal(
              (error as any).message,
              "Cannot create a data feed with the Unknown source type."
            );
          }
        });

        it("updates data feed to have an unknown data source type", async function () {
          const patch: DataFeedPatch = {
            source: {
              dataSourceType: "Unknown",
            },
          };
          try {
            await client.updateDataFeed(createdPostGreSqlId, patch);
            assert.fail("Test should throw error");
          } catch (error: any) {
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

export async function verifyDataFeedDeletion(
  context: Context,
  client: MetricsAdvisorAdministrationClient,
  createdDataFeedId: string
): Promise<void> {
  if (!createdDataFeedId) {
    context.skip();
  }

  await client.deleteDataFeed(createdDataFeedId);
  try {
    await client.getDataFeed(createdDataFeedId);
    assert.fail("Expecting error getting data feed");
  } catch (error: any) {
    assert.equal((error as any).code, "404 NOT_FOUND");
    assert.equal((error as any).message, "datafeedId is invalid.");
  }
}
