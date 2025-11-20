// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  MetricAnomalyFeedback,
  MetricChangePointFeedback,
  MetricCommentFeedback,
  MetricPeriodFeedback,
  MetricsAdvisorClient,
} from "../../src/index.js";
import { createRecordedAdvisorClient, makeCredential } from "./util/recordedClients.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { getYieldedValue, matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}]`, () => {
    describe("MetricsAdvisorClient", () => {
      let client: MetricsAdvisorClient;
      let recorder: Recorder;

      beforeEach(async (ctx) => {
        ({ recorder, client } = await createRecordedAdvisorClient(ctx, makeCredential(useAad)));
      });

      afterEach(async () => {
        if (recorder) {
          await recorder.stop();
        }
      });

      it("listAnomaliesForDetectionConfiguration()", async () => {
        const iterator = client.listAnomaliesForDetectionConfiguration(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          new Date(Date.UTC(2021, 4, 5)),
          new Date(Date.UTC(2021, 10, 1)),
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting first anomaly");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting second anomaly");
      });

      it("listAnomaliesForDetectionConfiguration() by page", async () => {
        const iterator = client
          .listAnomaliesForDetectionConfiguration(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
            new Date(Date.UTC(2021, 4, 5)),
            new Date(Date.UTC(2021, 10, 1)),
          )
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two anomalies in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two anomalies in second page");
      });

      it("listAnomaliesForDetectionConfiguration() with datetime strings", async () => {
        const iterator = client.listAnomaliesForDetectionConfiguration(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          "2021-05-05T00:00:00.000Z",
          "2021-11-01T00:00:00.000Z",
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting first anomaly");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting second anomaly");
      });

      it("listAnomaliesForDetectionConfiguration() throws for invalid datetime strings", async () => {
        try {
          const iterator = client.listAnomaliesForDetectionConfiguration(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
            "startTime",
            "endTime",
          );
          await iterator.next();
          assert.fail("Error should have been thrown for invalid date strings");
        } catch (err: any) {
          assert.equal(
            err.message,
            'Error "Invalid time value" occurred in serializing the payload - undefined.',
          );
        }
      });

      it("listIncidentsForDetectionConfiguration()", async () => {
        const iterator = client.listIncidentsForDetectionConfiguration(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          new Date(Date.UTC(2021, 4, 5)),
          new Date(Date.UTC(2021, 10, 1)),
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.rootDimensionKey, "Expecting first incident");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.rootDimensionKey, "Expecting second incident");
      });

      it("listIncidentsForDetectionConfiguration() by page", async () => {
        const iterator = client
          .listIncidentsForDetectionConfiguration(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
            new Date(Date.UTC(2021, 4, 5)),
            new Date(Date.UTC(2021, 10, 1)),
          )
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two incidents in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two incidents in second page");
      });

      it("listIncidentsForDetectionConfiguration() with datetime strings", async () => {
        const iterator = client.listIncidentsForDetectionConfiguration(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          "2021-05-05T00:00:00.000Z",
          "2021-11-01T00:00:00.000Z",
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.rootDimensionKey, "Expecting first incident");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.rootDimensionKey, "Expecting second incident");
      });

      it("listIncidentsForDetectionConfiguration() throws for invalid datetime string", async () => {
        try {
          const iterator = client.listIncidentsForDetectionConfiguration(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
            "startTime",
            "endTime",
          );
          await iterator.next();
          assert.fail("Error should have been thrown for invalid date strings");
        } catch (err: any) {
          assert.isDefined(err.message, "Invalid time value");
        }
      });

      it("listAnomalyDimensionValues()", async () => {
        const iterator = client.listAnomalyDimensionValues(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          new Date(Date.UTC(2021, 4, 5)),
          new Date(Date.UTC(2021, 10, 1)),
          "category",
        );
        let result = await iterator.next();
        assert.isDefined(result.value, "Expecting first dimension value");
        result = await iterator.next();
        assert.isDefined(result.value, "Expecting second dimension value");
      });

      it("listAnomalyDimensionValues() with datetime strings", async () => {
        const iterator = client.listAnomalyDimensionValues(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          "2021-01-05T00:00:00.000Z",
          "2021-11-05T00:00:00.000Z",
          "category",
        );
        let result = await iterator.next();
        assert.isDefined(result.value, "Expecting first dimension value");
        result = await iterator.next();
        assert.isDefined(result.value, "Expecting second dimension value");
      });

      it("listAnomalyDimensionValues() by page", async () => {
        const iterator = client
          .listAnomalyDimensionValues(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
            new Date(Date.UTC(2021, 4, 5)),
            new Date(Date.UTC(2021, 10, 1)),
            "category",
          )
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two dimension values in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two dimension values in second page");
      });

      it("lists alerts for alert configuration", async () => {
        const iterator = client.listAlerts(
          assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
          new Date(Date.UTC(2021, 4, 5)),
          new Date(Date.UTC(2021, 10, 1)),
          "AnomalyTime",
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.id, "Expecting first alert");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.id, "Expecting second alert");
      });

      it("lists alerts for alert configuration with datetime strings", async () => {
        const iterator = client.listAlerts(
          assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
          "2021-05-05T00:00:00.000Z",
          "2021-11-01T00:00:00.000Z",
          "AnomalyTime",
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.id, "Expecting first alert");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.id, "Expecting second alert");
      });

      it("lists alerts for alert configuration by page", async () => {
        const iterator = client
          .listAlerts(
            assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
            new Date(Date.UTC(2021, 4, 5)),
            new Date(Date.UTC(2021, 10, 1)),
            "AnomalyTime",
          )
          .byPage({ maxPageSize: 1 });
        let result = await iterator.next();
        assert.equal(result.value.length, 1, "Expecting one alert in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 1, "Expecting one alert in second page");
      });

      it("lists anomalies for alert", async () => {
        const iterator = client.listAnomaliesForAlert({
          alertConfigId: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
          id: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_ID"),
        });
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting first anomaly");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting second anomaly");
      });

      it("lists anomalies for alert by page", async () => {
        const iterator = client
          .listAnomaliesForAlert({
            alertConfigId: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
            id: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_ID"),
          })
          .byPage({ maxPageSize: 1 });
        let result = await iterator.next();
        assert.equal(result.value.length, 1, "Expecting one anomaly in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 1, "Expecting one anomaly in second page");
      });

      it("lists incidents for alert", async () => {
        const iterator = client.listIncidentsForAlert({
          alertConfigId: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
          id: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_ID"),
        });
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.id, "Expecting first incident");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.id, "Expecting second incident");
      });

      it("lists incidents for alert by page", async () => {
        const iterator = client
          .listIncidentsForAlert({
            alertConfigId: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_CONFIG_ID"),
            id: assertEnvironmentVariable("METRICS_ADVISOR_ALERT_ID"),
          })
          .byPage({ maxPageSize: 1 });
        let result = await iterator.next();
        assert.equal(result.value.length, 1, "Expecting one incident in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 1, "Expecting one incident in second page");
      });

      it("listMetricSeriesDefinitions()", async () => {
        const iterator = client.listMetricSeriesDefinitions(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          new Date(Date.UTC(2021, 7, 5)),
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting first definition");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting second definition");
      });

      it("listMetricSeriesDefinitions() with datetime string", async () => {
        const iterator = client.listMetricSeriesDefinitions(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          "2021-08-05T00:00:00.000Z",
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting first definition");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.seriesKey, "Expecting second definition");
      });

      it("listMetricSeriesDefinitions() by page", async () => {
        const iterator = client
          .listMetricSeriesDefinitions(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            new Date(Date.UTC(2021, 7, 5)),
          )
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two definitions in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two definitions in second page");
      });

      it("listMetricDimensionValues()", async () => {
        const iterator = client.listMetricDimensionValues(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          "category",
        );
        let result = await iterator.next();
        assert.isDefined(result.value, "Expecting first dimension value");
        result = await iterator.next();
        assert.isDefined(result.value, "Expecting second dimension value");
      });

      it("listMetricDimensionValues() by page", async () => {
        const iterator = client
          .listMetricDimensionValues(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            "category",
          )
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two dimension values in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two dimension values in second page");
      });

      it("lists series data for a metric", async () => {
        const data = await client.getMetricSeriesData(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          [
            { region: "Delhi", category: "Handmade" },
            { region: "Cairo", category: "Home & Garden" },
          ],
          new Date(Date.UTC(2021, 7, 5)),
          new Date(Date.UTC(2021, 11, 5)),
        );
        assert.isDefined(data);
        assert.equal(data!.length, 2, "Expecting data for two time series");
        assert.equal(
          data![0].definition.metricId,
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
        );
        assert.deepStrictEqual(data![0].definition.seriesKey, {
          region: "Delhi",
          category: "Handmade",
        });

        assert.isNotEmpty(data![0].timestamps, "Expecting data for the first time series");
        assert.isNotEmpty(data![0].values, "Expecting data for the first time series");

        assert.equal(
          data![1].definition.metricId,
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
        );
        assert.deepStrictEqual(data![1].definition.seriesKey, {
          region: "Cairo",
          category: "Home & Garden",
        });

        assert.isNotEmpty(data![1].timestamps, "Expecting data for the second time series");
        assert.isNotEmpty(data![1].values, "Expecting data for the second time series");
      });

      it("lists series data for a metric with datetime strings", async () => {
        const data = await client.getMetricSeriesData(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          [
            { category: "Home & Garden", region: "Cairo" },
            { category: "Shoes Handbags & Sunglasses", region: "Manila" },
          ],
          "2021-08-05T00:00:00.000Z",
          "2021-09-05T00:00:00.000Z",
        );
        assert.isDefined(data);
        assert.equal(data!.length, 2, "Expecting data for two time series");
        assert.equal(
          data![0].definition.metricId,
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
        );
        assert.deepStrictEqual(data![0].definition.seriesKey, {
          region: "Cairo",
          category: "Home & Garden",
        });

        assert.isNotEmpty(data![0].timestamps, "Expecting data for the first time series");
        assert.isNotEmpty(data![0].values, "Expecting data for the first time series");
      });

      it.skip("list enriched data for a detection configuration", async () => {
        const data = await client.getMetricEnrichedSeriesData(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          [
            { category: "Shoes Handbags & Sunglasses", region: "Manila" },
            { category: "Home & Garden", region: "Cairo" },
          ],
          new Date(Date.UTC(2021, 7, 1)),
          new Date(Date.UTC(2021, 7, 27)),
        );
        assert.isDefined(data);
        assert.equal(data!.length, 2, "Expecting data for two time series");

        assert.deepStrictEqual(data![0].seriesKey, {
          region: "Manila",
          category: "Shoes Handbags & Sunglasses",
        });

        assert.isNotEmpty(data![0].timestamps, "Expecting enriched data for the first time series");
        assert.isNotEmpty(data![0].values, "Expecting enriched data for the first time series");
        assert.isNotEmpty(data![0].isAnomaly, "Expecting enriched data for the first time series");

        assert.deepStrictEqual(data![1].seriesKey, {
          region: "Cairo",
          category: "Home & Garden",
        });

        assert.isNotEmpty(
          data![1].timestamps,
          "Expecting enriched data for the second time series",
        );
        assert.isNotEmpty(data![1].values, "Expecting enriched data for the second time series");
        assert.isNotEmpty(data![0].isAnomaly, "Expecting enriched data for the second time series");
      });

      it.skip("list enriched data for a detection configuration with datetime strings", async () => {
        const data = await client.getMetricEnrichedSeriesData(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          [
            { category: "Shoes Handbags & Sunglasses", region: "Manila" },
            { category: "Home & Garden", region: "Cairo" },
          ],
          "2021-08-01T00:00:00.000Z",
          "2021-08-27T00:00:00.000Z",
        );
        assert.isDefined(data && data!.length === 2, "Expecting data for two time series");

        assert.deepStrictEqual(data![0].seriesKey, {
          region: "Manila",
          category: "Shoes Handbags & Sunglasses",
        });
      });

      it("list metric enrichment status", async () => {
        const iterator = client.listMetricEnrichmentStatus(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          new Date(Date.UTC(2021, 0, 1)),
          new Date(Date.UTC(2021, 8, 18)),
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.status, "Expecting first status");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.status, "Expecting second status");
      });

      it("list metric enrichment status with datetime strings", async () => {
        const iterator = client.listMetricEnrichmentStatus(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
          "2021-01-01T00:00:00.000Z",
          "2021-09-18T00:00:00.000Z",
        );
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.status, "Expecting first status");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.status, "Expecting second status");
      });

      it("list metric enrichment status by page", async () => {
        const iterator = client
          .listMetricEnrichmentStatus(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            new Date(Date.UTC(2021, 0, 1)),
            new Date(Date.UTC(2021, 10, 5)),
          )
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two results in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two results in second page");
      });

      it("gets root causes of an incident", async () => {
        const result = await client.getIncidentRootCauses(
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID"),
          assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_INCIDENT_ID"),
        );

        assert.isNotEmpty(result.rootCauses, "Expecting non empty root cause list");
        const first = result.rootCauses[0];
        assert.deepStrictEqual(first.path, ["category"]);
        assert.isDefined(first.score, "Expecting score");
        assert.equal(
          first.description,
          "Increase on region = Beijing | category = Handmade contributes the most to current incident.",
        );
      });

      (useAad ? describe.skip : describe)("Feedback", async () => {
        let createdFeedbackId: string;
        it("creates Anomaly feedback", async () => {
          const anomalyFeedback: MetricAnomalyFeedback = {
            metricId: assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            feedbackType: "Anomaly",
            startTime: new Date(Date.UTC(2021, 7, 5)),
            endTime: new Date(Date.UTC(2021, 7, 7)),
            value: "NotAnomaly",
            dimensionKey: { category: "Home & Garden", region: "Cairo" },
          };
          const actual = await client.addFeedback(anomalyFeedback);

          assert.isDefined(actual.id, "Expecting valid feedback");
          createdFeedbackId = actual.id!;
          assert.equal(actual.feedbackType, "Anomaly");
          if (actual.feedbackType === "Anomaly") {
            assert.equal(actual.value, anomalyFeedback.value);
          }
        });

        // Skipped due to potential errors on service side
        // Issue - https://github.com/Azure/azure-sdk-for-js/issues/19747
        it.skip("creates ChangePoint feedback", async () => {
          const changePointFeedback: MetricChangePointFeedback = {
            metricId: assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            feedbackType: "ChangePoint",
            startTime: new Date(Date.UTC(2021, 7, 5)),
            value: "ChangePoint",
            dimensionKey: { category: "Home & Garden", region: "Cairo" },
          };
          const actual = await client.addFeedback(changePointFeedback);
          assert.isDefined(actual.id, "Expecting valid feedback");
          createdFeedbackId = actual.id!;
          assert.equal(actual.feedbackType, "ChangePoint");
          if (actual.feedbackType === "ChangePoint") {
            assert.equal(actual.value, changePointFeedback.value);
          }
        });

        // Skipped due to potential errors on service side
        // Issue - https://github.com/Azure/azure-sdk-for-js/issues/19747
        it.skip("creates Period feedback", async () => {
          const periodFeedback: MetricPeriodFeedback = {
            metricId: assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            feedbackType: "Period",
            periodType: "AutoDetect",
            periodValue: 4,
            dimensionKey: { category: "Home & Garden", region: "Cairo" },
          };
          const actual = await client.addFeedback(periodFeedback);

          assert.isDefined(actual.id, "Expecting valid feedback");
          createdFeedbackId = actual.id!;
          assert.equal(actual.feedbackType, "Period");
          if (actual.feedbackType === "Period") {
            assert.equal(actual.periodType, periodFeedback.periodType);
            assert.equal(actual.periodValue, periodFeedback.periodValue);
          }
        });

        it("creates Comment feedback", async () => {
          const expectedCommentFeedback: MetricCommentFeedback = {
            metricId: assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            feedbackType: "Comment",
            dimensionKey: { category: "Home & Garden", region: "Cairo" },
            comment: "This is a comment",
          };

          const actual = await client.addFeedback(expectedCommentFeedback);

          assert.isDefined(actual.id, "Expecting valid feedback");
          createdFeedbackId = actual.id!;
          assert.equal(actual.feedbackType, "Comment");
          if (actual.feedbackType === "Comment") {
            assert.equal(actual.comment, expectedCommentFeedback.comment);
          }
        });

        it("retrieves Comment feedback", async () => {
          const actual = await client.getFeedback(createdFeedbackId);

          assert.isDefined(actual.id, "Expecting valid feedback");
          createdFeedbackId = actual.id!;
          assert.equal(actual.feedbackType, "Comment");
          if (actual.feedbackType === "Comment") {
            assert.equal(actual.comment, "This is a comment");
          }
        });

        it("lists Anomaly feedbacks", async () => {
          const iterator = client.listFeedback(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            {
              filter: {
                startTime: new Date(Date.UTC(2021, 10, 1)),
                endTime: new Date(Date.UTC(2021, 10, 5)),
                timeMode: "FeedbackCreatedTime",
              },
            },
          );
          let result = getYieldedValue(await iterator.next());
          assert.isDefined(result.id, "Expecting first status");
          result = getYieldedValue(await iterator.next());
          assert.isDefined(result.id, "Expecting second status");
        });

        it("lists Anomaly feedbacks with datetime strings", async () => {
          const iterator = client.listFeedback(
            assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"),
            {
              filter: {
                startTime: "2021-11-01T00:00:00.000Z",
                endTime: "2021-11-05T00:00:00.000Z",
                timeMode: "FeedbackCreatedTime",
              },
            },
          );
          let result = getYieldedValue(await iterator.next());
          assert.isDefined(result.id, "Expecting first status");
          result = getYieldedValue(await iterator.next());
          assert.isDefined(result.id, "Expecting second status");
        });

        it("lists Anomaly feedbacks by page", async () => {
          const iterator = client
            .listFeedback(assertEnvironmentVariable("METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1"))
            .byPage({ maxPageSize: 2 });
          let result = await iterator.next();
          assert.equal(result.value.length, 2, "Expecting two entries in first page");
          result = await iterator.next();
          assert.equal(result.value.length, 2, "Expecting two entries in second page");
        });
      });
    });
  });
});
