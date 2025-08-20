// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { ExperimentMetric, ExperimentMetricOutput } from "@azure-rest/onlineexperimentation";
import type { OnlineExperimentationClient } from "@azure-rest/onlineexperimentation";
import {
  KnownDesiredDirection,
  isUnexpected,
  KnownLifecycleStage,
  KnownExperimentMetricType,
  paginate,
} from "@azure-rest/onlineexperimentation";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("OnlineExperimentationClient Routes", () => {
  let recorder: Recorder;
  let client: ReturnType<typeof OnlineExperimentationClient>;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  /**
   * Helper function to create an experiment metric for testing
   * @param metricId - ID of the metric to create
   * @param options - Optional customization of the metric
   * @returns The created metric and its ETag
   */
  async function createExperimentMetric(
    metricId: string,
    options?: Partial<ExperimentMetric>,
  ): Promise<ExperimentMetricOutput> {
    const metricDefinition: ExperimentMetric = {
      lifecycle: KnownLifecycleStage.Active,
      displayName: options?.displayName || `Test Metric ${metricId}`,
      description: options?.description || `A metric created for testing purposes (${metricId})`,
      categories: options?.categories || ["Test"],
      desiredDirection: KnownDesiredDirection.Increase,
      definition: {
        type: KnownExperimentMetricType.EventCount,
        event: { eventName: "TestEvent" },
      },
    };

    const response = await client.path("/experiment-metrics/{experimentMetricId}", metricId).patch({
      contentType: "application/merge-patch+json",
      body: metricDefinition,
    });

    if (isUnexpected(response)) {
      throw response;
    }

    if (!response.body.eTag) {
      throw new Error("Expected an ETag in response body.");
    }

    return response.body;
  }

  // CREATE operations
  describe("PATCH /experiment-metrics/{experimentMetricId}", () => {
    it("should create a new experiment metric", async () => {
      // Arrange
      const metricId = "test_create_new_metric";
      const metricDefinition: ExperimentMetric = {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "New Test Metric",
        description: "A metric created for testing purposes",
        categories: ["Test"],
        desiredDirection: KnownDesiredDirection.Increase,
        definition: {
          type: KnownExperimentMetricType.EventCount,
          event: { eventName: "TestEvent" },
        },
      };

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: metricDefinition,
        });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isNotNull(response.body);
      assert.strictEqual(response.body.id, metricId);
      assert.strictEqual(response.body.displayName, metricDefinition.displayName);
      assert.strictEqual(response.body.description, metricDefinition.description);
    });

    it("should create a metric only if it doesn't exist using If-None-Match", async () => {
      // Arrange
      const metricId = "test_create_if_not_exists";

      // Ensure the metric doesn't exist
      await client.path("/experiment-metrics/{experimentMetricId}", metricId).delete();

      const metricDefinition: ExperimentMetric = {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "If-None-Match Test Metric",
        description: "A metric created with If-None-Match header",
        categories: ["Test", "Conditional"],
        desiredDirection: KnownDesiredDirection.Increase,
        definition: {
          type: KnownExperimentMetricType.EventCount,
          event: { eventName: "ConditionalCreateEvent" },
        },
      };

      // Act - Create with If-None-Match: *
      const createResponse = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: metricDefinition,
          headers: {
            "If-None-Match": "*",
          },
        });

      // Assert
      if (isUnexpected(createResponse)) {
        throw createResponse;
      }

      assert.isNotNull(createResponse.body);
      assert.strictEqual(createResponse.body.id, metricId);
      assert.strictEqual(createResponse.body.displayName, metricDefinition.displayName);

      // Try to create it again with If-None-Match - should fail since resource now exists
      const secondCreateResponse = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: {
            ...metricDefinition,
            displayName: "This should not be updated",
          },
          headers: {
            "If-None-Match": "*",
          },
        });

      // Assert second create fails with precondition failed
      assert.isTrue(
        isUnexpected(secondCreateResponse),
        `Expected an error response but got: ${secondCreateResponse.status}`,
      );
      assert.strictEqual(secondCreateResponse.status, "412"); // Precondition Failed
    });

    it("should update an existing experiment metric", async () => {
      // Arrange
      const metricId = "test_update_existing_metric";
      await createExperimentMetric(metricId, {
        displayName: "Initial Test Metric",
        description: "A metric to be updated",
      });

      const updatedMetric: ExperimentMetric = {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "Updated Test Metric",
        description: "This metric was updated for testing purposes",
        categories: ["Test", "Updated"],
        desiredDirection: KnownDesiredDirection.Increase,
        definition: {
          type: KnownExperimentMetricType.EventCount,
          event: { eventName: "TestEvent" },
        },
      };

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: updatedMetric,
        });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isNotNull(response.body);
      assert.strictEqual(response.body.id, metricId);
      assert.strictEqual(response.body.displayName, updatedMetric.displayName);
      assert.strictEqual(response.body.description, updatedMetric.description);
    });

    it("should reject invalid experiment metric definitions", async () => {
      // Arrange
      const metricId = "test_invalid_metric_definition";
      const invalidMetric: Partial<ExperimentMetric> = {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "Invalid Test Metric",
        // Missing required fields
      };

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: invalidMetric,
        });

      // Assert
      assert.isTrue(
        isUnexpected(response),
        `Expected an error response but got: ${response.status}`,
      );
      assert.strictEqual(response.status, "400"); // Bad Request
    });

    it("should update a metric conditionally with If-Match header", async () => {
      // Arrange
      const metricId = "test_conditional_update_with_etag";
      const metric = await createExperimentMetric(metricId);
      const updatedDescription = "This metric was updated with a conditional request";

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: {
            ...metric,
            description: updatedDescription,
          },
          headers: {
            "If-Match": metric.eTag,
          },
        });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isNotNull(response.body);
      assert.strictEqual(response.body.id, metricId);
      assert.strictEqual(response.body.description, updatedDescription);
      assert.notStrictEqual(response.body.eTag, metric.eTag);
    });

    it("should fail to update when If-Match header does not match", async () => {
      // Arrange
      const metricId = "test_conditional_update_etag_mismatch";
      await createExperimentMetric(metricId);

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .patch({
          contentType: "application/merge-patch+json",
          body: {
            description: "This update should fail due to ETag mismatch",
          },
          headers: {
            "If-Match": '"incorrect-etag-value"',
          },
        });

      // Assert
      assert.isTrue(
        isUnexpected(response),
        `Expected an error response but got: ${response.status}`,
      );
      assert.strictEqual(response.status, "412"); // Precondition Failed
    });
  });

  // READ operations
  describe("GET /experiment-metrics", () => {
    it("should list all experiment metrics", async () => {
      // Act
      const response = await client.path("/experiment-metrics").get();

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      let metricCount = 0;
      for await (const _metric of paginate(client, response)) {
        metricCount++;
      }

      assert.isAtLeast(metricCount, 1);
    });

    it("should limit experiment metrics using top parameter", async () => {
      // Arrange
      const maxResults = 3;

      // Act
      const response = await client.path("/experiment-metrics").get({
        queryParameters: {
          top: maxResults,
        },
      });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isArray(response.body.value);
      assert.isAtMost(response.body.value.length, maxResults);
    });
  });

  describe("GET /experiment-metrics/{experimentMetricId}", () => {
    it("should retrieve a specific experiment metric", async () => {
      // Arrange
      const metricId = "test_retrieve_specific_metric";
      const metric = await createExperimentMetric(metricId);

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .get();

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isNotNull(response.body);
      assert.strictEqual(response.body.id, metricId);
      assert.strictEqual(response.body.eTag, metric.eTag);
      assert.strictEqual(response.headers.etag, metric.eTag);
    });

    it("should return error when retrieving a non-existent metric", async () => {
      // Arrange
      const nonExistentMetricId = "test_non_existent_metric_id";

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", nonExistentMetricId)
        .get();

      // Assert
      assert.isTrue(
        isUnexpected(response),
        `Expected an error response but got: ${response.status}`,
      );
      assert.strictEqual(response.status, "404"); // Not Found
    });
  });

  // VALIDATE operation (special operation)
  describe("POST /experiment-metrics:validate", () => {
    it("should validate a valid experiment metric", async () => {
      // Arrange
      const validMetric: ExperimentMetric = {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "Valid Test Metric",
        description: "A valid metric for validation testing",
        categories: ["Test", "Validation"],
        desiredDirection: KnownDesiredDirection.Increase,
        definition: {
          type: KnownExperimentMetricType.EventCount,
          event: { eventName: "TestValidationEvent" },
        },
      };

      // Act
      const response = await client.path("/experiment-metrics:validate").post({
        body: validMetric,
      });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isTrue(response.body.isValid);
      assert.isArray(response.body.diagnostics);
      assert.isEmpty(response.body.diagnostics);
    });

    it("should return diagnostics for an invalid experiment metric", async () => {
      // Arrange
      const invalidMetric = {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "Invalid Test Metric",
        description: "An invalid metric for validation testing",
        categories: ["Test"],
        desiredDirection: KnownDesiredDirection.Increase,
        definition: {
          type: KnownExperimentMetricType.EventCount,
          event: {
            eventName: "TestValidationEvent",
            filter: "this is not a valid filter expression.",
          },
        },
      };

      // Act
      const response = await client.path("/experiment-metrics:validate").post({
        body: invalidMetric,
      });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.isFalse(response.body.isValid);
      assert.isArray(response.body.diagnostics);
      assert.isNotEmpty(response.body.diagnostics);
    });
  });

  // DELETE operations
  describe("DELETE /experiment-metrics/{experimentMetricId}", () => {
    it("should delete an experiment metric", async () => {
      // Arrange
      const metricId = "test_delete_metric";
      await createExperimentMetric(metricId);

      // Act
      const deleteResponse = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .delete();

      // Assert
      if (isUnexpected(deleteResponse)) {
        throw deleteResponse;
      }

      // Verify the metric is gone
      const getResponse = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .get();

      assert.isTrue(
        isUnexpected(getResponse),
        `Expected an error response but got: ${getResponse.status}`,
      );
      assert.strictEqual(getResponse.status, "404"); // Not Found
    });

    it("should delete a metric conditionally with If-Match header", async () => {
      // Arrange
      const metricId = "test_conditional_delete_with_etag";
      const metric = await createExperimentMetric(metricId);

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .delete({
          headers: {
            "If-Match": metric.eTag,
          },
        });

      // Assert
      if (isUnexpected(response)) {
        throw response;
      }

      assert.strictEqual(response.status, "204"); // No content
    });

    it("should fail to delete when If-Match header does not match", async () => {
      // Arrange
      const metricId = "test_conditional_delete_etag_mismatch";
      await createExperimentMetric(metricId);

      // Act
      const response = await client
        .path("/experiment-metrics/{experimentMetricId}", metricId)
        .delete({
          headers: {
            "If-Match": '"incorrect-delete-etag"',
          },
        });

      // Assert
      assert.isTrue(
        isUnexpected(response),
        `Expected an error response but got: ${response.status}`,
      );
      assert.strictEqual(response.status, "412"); // Precondition Failed
    });
  });
});
