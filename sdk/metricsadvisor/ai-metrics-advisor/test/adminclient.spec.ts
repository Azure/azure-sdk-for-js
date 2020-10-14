// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import * as dotenv from "dotenv";
dotenv.config();

import {
  AnomalyAlertConfiguration,
  AnomalyDetectionConfiguration,
  MetricAlertConfiguration,
  MetricsAdvisorAdministrationClient,
  MetricsAdvisorKeyCredential
} from "../src";
import { createRecordedAdminClient, testEnv } from "./util/recordedClients";
import { Recorder } from "@azure/test-utils-recorder";

describe("MetricsAdvisorAdministrationClient", () => {
  let client: MetricsAdvisorAdministrationClient;
  let recorder: Recorder;

  const apiKey = new MetricsAdvisorKeyCredential(
    testEnv.METRICS_ADVISOR_SUBSCRIPTION_KEY,
    testEnv.METRICS_ADVISOR_API_KEY
  );

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client } = createRecordedAdminClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
  });

  describe("Ingestion", function() {
    it("lists ingestion status", async function() {
      const iterator = client.listDataFeedIngestionStatus(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_DATAFEED_ID,
        new Date(Date.UTC(2020, 7, 1)),
        new Date(Date.UTC(2020, 8, 1))
      );
      let result = await iterator.next();
      assert.ok(result.value.status, "Expecting first status");
      result = await iterator.next();
      assert.ok(result.value.status, "Expecting second status");
    });

    it("lists ingestion status by page", async function() {
      const iterator = client
        .listDataFeedIngestionStatus(
          testEnv.METRICS_ADVISOR_AZURE_BLOB_DATAFEED_ID,
          new Date(Date.UTC(2020, 7, 1)),
          new Date(Date.UTC(2020, 8, 1))
        )
        .byPage({ maxPageSize: 2 });
      let result = await iterator.next();
      assert.equal(result.value.statusList.length, 2, "Expecting two entries in first page");
      result = await iterator.next();
      assert.equal(result.value.statusList.length, 2, "Expecting two entries in second page");
    });

    it("gets ingestion progress", async function() {
      const result = await client.getDataFeedIngestionProgress(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_DATAFEED_ID
      );

      assert.ok(result.latestSuccessTimestamp, "Expecting valid latest success timestamp");
      assert.ok(result.latestActiveTimestamp, "Expecting valid latest active timestamp");
    });

    it("refreshes ingesetion status", async function() {
      const iterator = client.listDataFeedIngestionStatus(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_DATAFEED_ID,
        new Date(Date.UTC(2020, 7, 22)),
        new Date(Date.UTC(2020, 7, 23))
      );
      const result = await iterator.next();

      if (result.value.status === "Succeeded") {
        await client.refreshDataFeedIngestion(
          testEnv.METRICS_ADVISOR_AZURE_BLOB_DATAFEED_ID,
          new Date(Date.UTC(2020, 7, 22)),
          new Date(Date.UTC(2020, 7, 23))
        );

        const iterator2 = client.listDataFeedIngestionStatus(
          testEnv.METRICS_ADVISOR_AZURE_BLOB_DATAFEED_ID,
          new Date(Date.UTC(2020, 7, 22)),
          new Date(Date.UTC(2020, 7, 23))
        );
        const result2 = await iterator2.next();
        assert.notEqual(result2.value.status, "Succeeded");
      } else {
        // eslint-disable-next-line no-invalid-this
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
        metricId: testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
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

      const actual = await client.createMetricAnomalyDetectionConfiguration(expected);

      assert.ok(actual.id, "Expecting valid detecion config");
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
      assert.deepStrictEqual(actual.seriesDetectionConditions, expected.seriesDetectionConditions);
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
            group: { dimension: { Dim1: "Common Lime" } },
            hardThresholdCondition: {
              anomalyDetectorDirection: "Up",
              upperBound: 400,
              suppressCondition: { minNumber: 2, minRatio: 2 }
            }
          }
        ],
        seriesDetectionConditions: [
          {
            series: { dimension: { Dim1: "Common Beech", Dim2: "Ant" } },
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

      const actual = await client.updateMetricAnomalyDetectionConfiguration(
        createdDetectionConfigId,
        expected
      );

      assert.ok(actual.id, "Expecting valid detecion config");
      createdDetectionConfigId = actual.id!;

      assert.equal(actual.name, expected.name);
      assert.strictEqual(actual.description, expected.description);
      assert.deepStrictEqual(
        actual.wholeSeriesDetectionCondition,
        expected.wholeSeriesDetectionCondition
      );
      assert.deepStrictEqual(
        actual.seriesGroupDetectionConditions,
        expected.seriesGroupDetectionConditions
      );
      delete (actual.seriesDetectionConditions![0].series as any).seriesId; // workaround service issue
      assert.deepStrictEqual(actual.seriesDetectionConditions, expected.seriesDetectionConditions);
    });

    it("retrieves a detection configuration", async function() {
      const result = await client.getMetricAnomalyDetectionConfiguration(createdDetectionConfigId);

      assert.equal(result.name, "new Name");
      assert.equal(result.description, "new description");
    });

    it("lists detection configurations", async function() {
      const iterator = client.listMetricAnomalyDetectionConfigurations(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1
      );
      let result = await iterator.next();

      assert.ok(result.value.id, "Expecting first detection config");
      result = await iterator.next();
      assert.ok(result.value.id, "Expecting second detection config");
    });

    it("lists detection configurations by page", async function() {
      const iterator = client
        .listMetricAnomalyDetectionConfigurations(testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1)
        .byPage();
      const result = await iterator.next();
      assert.ok(
        result.value.detectionConfigurations.length > 1,
        "Expecting more than one entries in page"
      );
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
        hookIds: []
      };

      const actual = await client.createAnomalyAlertConfiguration(expectedAlertConfig);

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
    });

    it("retrieves an alert configuration", async function() {
      const actual = await client.getAnomalyAlertConfiguration(createdAlertConfigId);

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

      const actual = await client.updateAnomalyAlertConfiguration(createdAlertConfigId, patch);

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
      const secondAlertConfig = await client.createAnomalyAlertConfiguration({
        name: secondAlertConfigName,
        crossMetricsOperator: "OR",
        metricAlertConfigurations: [metricAlertConfig],
        hookIds: []
      });
      try {
        const iterator = client.listAnomalyAlertConfigurations(createdDetectionConfigId);
        let result = await iterator.next();

        assert.ok(result.value.id, "Expecting first alert config");
        result = await iterator.next();
        assert.ok(result.value.id, "Expecting second alert config");

        const pageIterator = client
          .listAnomalyAlertConfigurations(createdDetectionConfigId)
          .byPage();
        const pageResult = await pageIterator.next();
        assert.isTrue(
          pageResult.value.alertConfigurations.length > 1,
          "Expecting more than one entries in page"
        );
      } finally {
        await client.deleteAnomalyAlertConfiguration(secondAlertConfig.id);
      }
    });

    it("deletes an alert configuration", async function() {
      if (!createdAlertConfigId) {
        // eslint-disable-next-line no-invalid-this
        this.skip();
      }

      await client.deleteAnomalyAlertConfiguration(createdAlertConfigId);
      try {
        await client.getAnomalyAlertConfiguration(createdAlertConfigId);
        assert.fail("Expecting error getting alert config");
      } catch (error) {
        assert.equal((error as any).code, "Not Found");
      }
    });

    it("deletes a detection configuration", async function() {
      if (!createdDetectionConfigId) {
        // eslint-disable-next-line no-invalid-this
        this.skip();
      }

      await client.deleteMetricAnomalyDetectionConfiguration(createdDetectionConfigId);
      try {
        await client.getMetricAnomalyDetectionConfiguration(createdDetectionConfigId);
        assert.fail("Expecting error getting detection config");
      } catch (error) {
        assert.equal((error as any).code, "Not Found");
      }
    });
  });
}).timeout(60000);
