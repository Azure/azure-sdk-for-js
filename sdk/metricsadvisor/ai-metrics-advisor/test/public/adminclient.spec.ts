// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import {
  AnomalyAlertConfiguration,
  AnomalyDetectionConfiguration,
  MetricAlertConfiguration,
  MetricsAdvisorAdministrationClient
} from "../../src";
import { createRecordedAdminClient, makeCredential, testEnv } from "./util/recordedClients";
import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "./util/matrix";

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}]`, () => {
    describe("MetricsAdvisorAdministrationClient", () => {
      let client: MetricsAdvisorAdministrationClient;
      let recorder: Recorder;

      beforeEach(function(this: Context) {
        ({ recorder, client } = createRecordedAdminClient(this, makeCredential(useAad)));
      });

      afterEach(async function() {
        if (recorder) {
          await recorder.stop();
        }
      });

      describe("Ingestion", function() {
        it("lists ingestion status", async function() {
          const iterator = client.listDataFeedIngestionStatus(
            testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID,
            new Date(Date.UTC(2020, 9, 30)),
            new Date(Date.UTC(2021, 10, 1))
          );
          let result = await iterator.next();
          assert.ok(result.value.status, "Expecting first status");
          result = await iterator.next();
          assert.ok(result.value.status, "Expecting second status");
        });

        it("lists ingestion status with datetime strings", async function() {
          const iterator = client.listDataFeedIngestionStatus(
            testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID,
            "2020-08-30T00:00:00.000Z",
            "2021-11-01T00:00:00.000Z"
          );
          let result = await iterator.next();
          assert.ok(result.value.status, "Expecting first status");
          result = await iterator.next();
          assert.ok(result.value.status, "Expecting second status");
        });

        it("lists ingestion status by page", async function() {
          const iterator = client
            .listDataFeedIngestionStatus(
              testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID,
              new Date(Date.UTC(2020, 9, 30)),
              new Date(Date.UTC(2021, 10, 1))
            )
            .byPage({ maxPageSize: 2 });
          let result = await iterator.next();
          assert.equal(result.value.length, 2, "Expecting two entries in first page");
          result = await iterator.next();
          assert.equal(result.value.length, 2, "Expecting two entries in second page");
        });

        it("gets ingestion progress", async function() {
          const result = await client.getDataFeedIngestionProgress(
            testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID
          );

          assert.ok(result.latestSuccessTimestamp, "Expecting valid latest success timestamp");
          assert.ok(result.latestActiveTimestamp, "Expecting valid latest active timestamp");
        });

        it("refreshes ingesetion status", async function(this: Context) {
          const iterator = client.listDataFeedIngestionStatus(
            testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID,
            new Date(Date.UTC(2020, 9, 30)),
            new Date(Date.UTC(2020, 10, 1))
          );
          const result = await iterator.next();

          if (result.value.status === "Succeeded") {
            await client.refreshDataFeedIngestion(
              testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID,
              new Date(Date.UTC(2020, 9, 30)),
              new Date(Date.UTC(2020, 10, 1))
            );

            const iterator2 = client.listDataFeedIngestionStatus(
              testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID,
              new Date(Date.UTC(2020, 9, 30)),
              new Date(Date.UTC(2020, 10, 1))
            );
            const result2 = await iterator2.next();
            assert.notEqual(result2.value.status, "Succeeded");
          } else {
            this.skip();
          }
        });
      });

      describe("detection and alert configs CRUD operations", async function() {
        let createdDetectionConfigId: string;
        let createdAlertConfigId: string;
        let expectedDetectionConfigName: string;

        it("creates a detection configuration", async function() {
          expectedDetectionConfigName = recorder.getUniqueName("js-detection-config-");
          const expected: Omit<AnomalyDetectionConfiguration, "id"> = {
            name: expectedDetectionConfigName,
            description: "fresh detection",
            metricId: testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1,
            wholeSeriesDetectionCondition: {
              conditionOperator: "AND",
              changeThresholdCondition: {
                anomalyDetectorDirection: "Both",
                shiftPoint: 1,
                changePercentage: 33,
                withinRange: true,
                suppressCondition: { minNumber: 2, minRatio: 2 }
              },
              hardThresholdCondition: {
                anomalyDetectorDirection: "Up",
                upperBound: 400,
                suppressCondition: { minNumber: 2, minRatio: 2 }
              }
            },
            seriesGroupDetectionConditions: [],
            seriesDetectionConditions: []
          };

          const actual = await client.createDetectionConfig(expected);

          assert.ok(actual.id, "Expecting valid detection config");
          createdDetectionConfigId = actual.id!;

          assert.equal(actual.name, expected.name);
          assert.strictEqual(actual.description, expected.description);
          assert.equal(actual.metricId, expected.metricId);
          assert.deepStrictEqual(
            actual.wholeSeriesDetectionCondition,
            expected.wholeSeriesDetectionCondition
          );
          assert.deepStrictEqual(
            actual.seriesGroupDetectionConditions,
            expected.seriesGroupDetectionConditions
          );
          assert.deepStrictEqual(
            actual.seriesDetectionConditions,
            expected.seriesDetectionConditions
          );
        });

        it("updates a detection configuration", async function() {
          const expected: Partial<Omit<AnomalyDetectionConfiguration, "id" | "metricId">> = {
            name: "new Name",
            description: "new description",
            wholeSeriesDetectionCondition: {
              conditionOperator: "OR",
              changeThresholdCondition: {
                anomalyDetectorDirection: "Both",
                shiftPoint: 2,
                withinRange: true,
                changePercentage: 44,
                suppressCondition: { minNumber: 4, minRatio: 4 }
              },
              hardThresholdCondition: {
                anomalyDetectorDirection: "Up",
                upperBound: 500,
                suppressCondition: { minNumber: 5, minRatio: 5 }
              }
            },
            seriesGroupDetectionConditions: [
              {
                groupKey: { region: "Mumbai" },
                hardThresholdCondition: {
                  anomalyDetectorDirection: "Up",
                  upperBound: 400,
                  suppressCondition: { minNumber: 2, minRatio: 2 }
                }
              }
            ],
            seriesDetectionConditions: [
              {
                seriesKey: { region: "Kolkata", category: "Handmade" },
                changeThresholdCondition: {
                  anomalyDetectorDirection: "Both",
                  shiftPoint: 1,
                  changePercentage: 33,
                  withinRange: true,
                  suppressCondition: { minNumber: 2, minRatio: 2 }
                }
              }
            ]
          };

          const actual = await client.updateDetectionConfig(createdDetectionConfigId, expected);
          assert.ok(actual.id, "Expecting valid detection config");
          createdDetectionConfigId = actual.id!;

          assert.equal(actual.name, expected.name);
          assert.strictEqual(actual.description, expected.description);
          assert.deepStrictEqual(
            actual.wholeSeriesDetectionCondition,
            expected.wholeSeriesDetectionCondition
          );
          assert.ok(
            actual.seriesGroupDetectionConditions,
            "Expecting valid seriesGroupDetectionConditions"
          );
          assert.deepStrictEqual(
            actual.seriesGroupDetectionConditions![0].groupKey,
            expected.seriesGroupDetectionConditions![0].groupKey
          );
          assert.deepStrictEqual(
            actual.seriesGroupDetectionConditions![0].hardThresholdCondition,
            expected.seriesGroupDetectionConditions![0].hardThresholdCondition
          );
          assert.ok(actual.seriesDetectionConditions, "Expecting valid seriesDetectionConditions");
          delete (actual.seriesDetectionConditions![0].seriesKey as any).seriesId; // workaround service issue
          assert.deepStrictEqual(
            actual.seriesDetectionConditions![0].seriesKey,
            expected.seriesDetectionConditions![0].seriesKey
          );
          assert.deepStrictEqual(
            actual.seriesDetectionConditions![0].changeThresholdCondition,
            expected.seriesDetectionConditions![0].changeThresholdCondition
          );
        });

        it("retrieves a detection configuration", async function() {
          const result = await client.getDetectionConfig(createdDetectionConfigId);

          assert.equal(result.name, "new Name");
          assert.equal(result.description, "new description");
        });

        it("lists detection configurations", async function() {
          const iterator = client.listDetectionConfigs(
            testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1
          );
          let result = await iterator.next();

          assert.ok(result.value.id, "Expecting first detection config");
          result = await iterator.next();
          assert.ok(result.value.id, "Expecting second detection config");
        });

        it("lists detection configurations by page", async function() {
          const iterator = client
            .listDetectionConfigs(testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1)
            .byPage();
          const result = await iterator.next();
          assert.ok(result.value.length > 1, "Expecting more than one entries in page");
        });

        let expectedAlertConfigName: string;
        it("creates an alert configuration", async function() {
          expectedAlertConfigName = recorder.getUniqueName("js-alert-config-");
          const metricAlertConfig: MetricAlertConfiguration = {
            detectionConfigurationId: createdDetectionConfigId,
            alertScope: {
              scopeType: "All"
            }
          };
          const expectedAlertConfig: Omit<AnomalyAlertConfiguration, "id"> = {
            name: expectedAlertConfigName,
            description: "alerting config description",
            crossMetricsOperator: "AND",
            metricAlertConfigurations: [metricAlertConfig, metricAlertConfig],
            hookIds: [],
            dimensionsToSplitAlert: []
          };

          const actual = await client.createAlertConfig(expectedAlertConfig);

          assert.ok(actual.id, "Expecting valid alert config");
          createdAlertConfigId = actual.id;
          assert.equal(actual.name, expectedAlertConfig.name);
          assert.equal(actual.description, expectedAlertConfig.description);
          assert.equal(actual.crossMetricsOperator, expectedAlertConfig.crossMetricsOperator);
          assert.deepStrictEqual(
            actual.metricAlertConfigurations[0].alertScope,
            expectedAlertConfig.metricAlertConfigurations[0].alertScope
          );
          assert.deepStrictEqual(actual.hookIds, expectedAlertConfig.hookIds);
          assert.deepStrictEqual(
            actual.dimensionsToSplitAlert,
            expectedAlertConfig.dimensionsToSplitAlert
          );
        });

        it("retrieves an alert configuration", async function() {
          const actual = await client.getAlertConfig(createdAlertConfigId);

          assert.ok(actual.id, "Expecting valid alert config");
          createdAlertConfigId = actual.id;
          assert.equal(actual.name, expectedAlertConfigName);
        });

        it("updates an alert configuration", async function() {
          const metricAlertConfig: MetricAlertConfiguration = {
            detectionConfigurationId: createdDetectionConfigId,
            alertScope: {
              scopeType: "TopN",
              topNAnomalyScope: {
                minTopCount: 2,
                top: 3,
                period: 4
              }
            }
          };
          const patch: Partial<Omit<AnomalyAlertConfiguration, "id">> = {
            name: "new alert config name",
            description: "new alert config description",
            crossMetricsOperator: "OR",
            metricAlertConfigurations: [metricAlertConfig, metricAlertConfig]
          };

          const actual = await client.updateAlertConfig(createdAlertConfigId, patch);
          assert.ok(actual.id, "Expecting valid alerting config");
          assert.equal(actual.name, "new alert config name");
          assert.equal(actual.description, "new alert config description");
          assert.equal(actual.crossMetricsOperator, "OR");
          assert.deepStrictEqual(
            actual.metricAlertConfigurations![0].alertScope,
            metricAlertConfig.alertScope
          );
          assert.deepStrictEqual(
            actual.metricAlertConfigurations![1].alertScope,
            metricAlertConfig.alertScope
          );
        });

        it("lists alert configurations one by one and by pages", async function() {
          const secondAlertConfigName = recorder.getUniqueName("js-alert-config2-");
          // creating a second alert config for listing
          const metricAlertConfig: MetricAlertConfiguration = {
            detectionConfigurationId: createdDetectionConfigId,
            alertScope: {
              scopeType: "All"
            }
          };
          const secondAlertConfig = await client.createAlertConfig({
            name: secondAlertConfigName,
            crossMetricsOperator: "OR",
            metricAlertConfigurations: [metricAlertConfig],
            hookIds: []
          });
          try {
            const iterator = client.listAlertConfigs(createdDetectionConfigId);
            let result = await iterator.next();

            assert.ok(result.value.id, "Expecting first alert config");
            result = await iterator.next();
            assert.ok(result.value.id, "Expecting second alert config");

            const pageIterator = client.listAlertConfigs(createdDetectionConfigId).byPage();
            const pageResult = await pageIterator.next();
            assert.isTrue(pageResult.value.length > 1, "Expecting more than one entries in page");
          } finally {
            await client.deleteAlertConfig(secondAlertConfig.id);
          }
        });

        it("deletes an alert configuration", async function(this: Context) {
          if (!createdAlertConfigId) {
            this.skip();
          }

          await client.deleteAlertConfig(createdAlertConfigId);
          try {
            await client.getAlertConfig(createdAlertConfigId);
            assert.fail("Expecting error getting alert config");
          } catch (error) {
            assert.equal((error as any).code, "Not Found");
          }
        });

        it("deletes a detection configuration", async function(this: Context) {
          if (!createdDetectionConfigId) {
            this.skip();
          }

          await client.deleteDetectionConfig(createdDetectionConfigId);
          try {
            await client.getDetectionConfig(createdDetectionConfigId);
            assert.fail("Expecting error getting detection config");
          } catch (error) {
            assert.equal((error as any).code, "Not Found");
          }
        });
      });
    }).timeout(60000);
  });
});
