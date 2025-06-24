// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OnlineExperimentationClient,
  isUnexpected,
  paginate,
  KnownDesiredDirection,
  KnownLifecycleStage,
} from "@azure-rest/onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("InitializeClient", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();

    // Initialize a client with default API version
    const client = OnlineExperimentationClient(endpoint, credential);
  });

  it("InitializeClientWithApiVersion", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();

    // Initialize a client with specific API version
    const clientWithVersion = OnlineExperimentationClient(endpoint, credential, {
      apiVersion: "2025-05-31-preview",
    });
  });

  it("CreateEventCountMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "prompt_sent_count")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "Total number of prompts sent",
          description: "Counts the total number of prompts sent by users to the chatbot",
          categories: ["Usage"],
          desiredDirection: KnownDesiredDirection.Increase,
          definition: {
            type: "EventCount",
            event: { eventName: "PromptSent" },
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("CreateUserCountMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "users_prompt_sent")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "Users with at least one prompt sent on checkout page",
          description:
            "Counts unique users who sent at least one prompt while on the checkout page",
          categories: ["Usage"],
          desiredDirection: KnownDesiredDirection.Increase,
          definition: {
            type: "UserCount",
            event: {
              eventName: "PromptSent",
              filter: "Page == 'checkout.html'",
            },
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("CreateEventRateMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "mo_mo_pct_relevance_good")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "% evaluated conversations with good relevance",
          description:
            "Percentage of evaluated conversations where the LLM response has good relevance (score >= 4)",
          categories: ["Quality"],
          desiredDirection: KnownDesiredDirection.Increase,
          definition: {
            type: "EventRate",
            event: { eventName: "EvaluateLLM" },
            rateCondition: "Relevance > 4",
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("CreateUserRateMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path(
        "/experiment-metrics/{experimentMetricId}",
        "pct_chat_to_high_value_purchase_conversion",
      )
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "% users with LLM interaction who made a high-value purchase",
          description:
            "Percentage of users who received a response from the LLM and then made a purchase of $100 or more",
          categories: ["Business"],
          desiredDirection: KnownDesiredDirection.Increase,
          definition: {
            type: "UserRate",
            startEvent: { eventName: "ResponseReceived" },
            endEvent: {
              eventName: "Purchase",
              filter: "Revenue > 100",
            },
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("CreateSumMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "total_revenue")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "Total revenue",
          description: "Sum of revenue from all purchase transactions",
          categories: ["Business"],
          desiredDirection: KnownDesiredDirection.Increase,
          definition: {
            type: "Sum",
            value: {
              eventProperty: "Revenue",
              eventName: "Purchase",
              filter: "Revenue > 0",
            },
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("CreateAverageMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "avg_revenue_per_purchase")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "Average revenue per purchase",
          description: "The average revenue per purchase transaction in USD",
          categories: ["Business"],
          desiredDirection: KnownDesiredDirection.Increase,
          definition: {
            type: "Average",
            value: {
              eventProperty: "Revenue",
              eventName: "Purchase",
            },
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("CreatePercentileMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "p95_response_time_seconds")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
          displayName: "P95 LLM response time [seconds]",
          description: "The 95th percentile of response time in seconds for LLM responses",
          categories: ["Performance"],
          desiredDirection: "Decrease",
          definition: {
            type: "Percentile",
            percentile: 95,
            value: {
              eventName: "ResponseReceived",
              eventProperty: "ResponseTimeSeconds",
            },
          },
        },
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("ValidateExperimentMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    // Validate the metric definition
    const validationResponse = await client.path("/experiment-metrics:validate").post({
      body: {
        lifecycle: KnownLifecycleStage.Active,
        displayName: "Test metric for validation",
        description: "This metric definition will be validated before creation",
        categories: ["Test"],
        desiredDirection: KnownDesiredDirection.Increase,
        definition: {
          type: "EventCount",
          event: { eventName: "TestEvent" },
        },
      },
    });

    if (isUnexpected(validationResponse)) {
      throw validationResponse.body.error;
    }

    if (validationResponse.body.isValid !== true) {
      // Inspect the validation errors
      for (const error of validationResponse.body.diagnostics) {
        console.log(`- [${error.code}] ${error.message}`);
      }
    }
  });

  it("GetExistingMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const metricResponse = await client
      .path("/experiment-metrics/{experimentMetricId}", "avg_revenue_per_purchase")
      .get();

    if (isUnexpected(metricResponse)) {
      throw metricResponse.body.error;
    }

    // Access metric properties
    const metricId = metricResponse.body.id;
    const displayName = metricResponse.body.displayName;
    const description = metricResponse.body.description;
  });

  it("ListExperimentMetrics", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const listResponse = await client.path("/experiment-metrics").get({
      queryParameters: {
        top: 10,
        skip: 0,
      },
    });

    if (isUnexpected(listResponse)) {
      throw listResponse;
    }

    for await (const metric of paginate(client, listResponse)) {
      // Access metric properties
      const id = metric.id;
      const name = metric.displayName;
    }
  });

  it("UpdateExperimentMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    // First, get the existing metric
    const existingMetricId = "avg_revenue_per_purchase";
    const getResponse = await client
      .path("/experiment-metrics/{experimentMetricId}", existingMetricId)
      .get();

    if (isUnexpected(getResponse)) {
      throw getResponse.body.error;
    }

    const updateResponse = await client
      .path("/experiment-metrics/{experimentMetricId}", existingMetricId)
      .patch({
        contentType: "application/merge-patch+json",
        headers: {
          "If-Match": getResponse.body.eTag, // optional, ensures no one else updated this metric in the meantime
        },
        body: {
          displayName: "Average revenue per purchase [USD]",
          description:
            "The average revenue per purchase transaction in USD. Refund transactions are excluded.",
        },
      });

    if (isUnexpected(updateResponse)) {
      throw updateResponse.body.error;
    }
  });

  it("DeactivateExperimentMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const updateResponse = await client
      .path("/experiment-metrics/{experimentMetricId}", "test_metric_id")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Inactive,
        },
      });

    if (isUnexpected(updateResponse)) {
      throw updateResponse;
    }
  });

  it("ReactivateExperimentMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const updateResponse = await client
      .path("/experiment-metrics/{experimentMetricId}", "test_metric_id")
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          lifecycle: KnownLifecycleStage.Active,
        },
      });

    if (isUnexpected(updateResponse)) {
      throw updateResponse;
    }
  });

  it("DeleteExperimentMetric", async () => {
    const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = OnlineExperimentationClient(endpoint, credential);

    const response = await client
      .path("/experiment-metrics/{experimentMetricId}", "test_metric_id")
      .delete();

    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
