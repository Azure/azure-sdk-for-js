# Online Experimentation Rest Client - Examples

## Table of Contents

- [Authentication and Client Setup](#authentication-and-client-setup)
  - [Initialize Client](#initialize-client)
  - [Initialize Client with Specific API Version](#initialize-client-with-specific-api-version)
- [Reading and Querying Experiment Metric Definitions](#reading-and-querying-experiment-metric-definitions)
  - [List Experiment Metrics](#list-experiment-metrics)
  - [Get Existing Metric](#get-existing-metric)
- [Working with Experiment Metrics](#working-with-experiment-metrics)
  - [Validate Experiment Metric](#validate-experiment-metric)
  - [Create Event Count Metric](#create-event-count-metric)
  - [Create User Count Metric](#create-user-count-metric)
  - [Create Event Rate Metric](#create-event-rate-metric)
  - [Create User Rate Metric](#create-user-rate-metric)
  - [Create Sum Metric](#create-sum-metric)
  - [Create Average Metric](#create-average-metric)
  - [Create Percentile Metric](#create-percentile-metric)
  - [Update Experiment Metric](#update-experiment-metric)
- [Experiment Metric Lifecycle Management](#experiment-metric-lifecycle-management)
  - [Deactivate an Experiment Metric](#deactivate-an-experiment-metric)
  - [Reactivate an Experiment Metric](#reactivate-an-experiment-metric)
  - [Delete Experiment Metric](#delete-experiment-metric)

## Authentication and Client Setup

### Initialize Client

Create an Online Experimentation client with default API version.

```ts snippet:InitializeClient
import { DefaultAzureCredential } from "@azure/identity";
import { OnlineExperimentationClient } from "@azure-rest/onlineexperimentation";

const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
const credential = new DefaultAzureCredential();
// Initialize a client with default API version
const client = OnlineExperimentationClient(endpoint, credential);
```

### Initialize Client with Specific API Version

Create an Online Experimentation client with a specific API version.

```ts snippet:InitializeClientWithApiVersion
import { DefaultAzureCredential } from "@azure/identity";
import { OnlineExperimentationClient } from "@azure-rest/onlineexperimentation";

const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
const credential = new DefaultAzureCredential();
// Initialize a client with specific API version
const clientWithVersion = OnlineExperimentationClient(endpoint, credential, {
  apiVersion: "2025-05-31-preview",
});
```

## Reading and Querying Experiment Metric Definitions

> The `@azure-rest/onlineexperimentation` SDK is for managing online experiment metric definitions, to read the analysis results use the `@azure/???` package.

### List Experiment Metrics

List experiment metrics with pagination.

> Service may return a paginated response even when the client omits `top` and `skip` parameters.

```ts snippet:ListExperimentMetrics
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  isUnexpected,
  paginate,
} from "@azure-rest/onlineexperimentation";

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
```

### Get Existing Metric

Retrieve an existing experiment metric by ID.

```ts snippet:GetExistingMetric
import { DefaultAzureCredential } from "@azure/identity";
import { OnlineExperimentationClient, isUnexpected } from "@azure-rest/onlineexperimentation";

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
```

## Working with Experiment Metrics

### Validate Experiment Metric

Validate an experiment metric definition before creating it.

```ts snippet:ValidateExperimentMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Create Event Count Metric

Create a metric that counts the number of times a specific event occurs.

```ts snippet:CreateEventCountMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Create User Count Metric

Create a metric that counts the number of unique users who performed a specific event.

```ts snippet:CreateUserCountMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
      description: "Counts unique users who sent at least one prompt while on the checkout page",
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
```

### Create Event Rate Metric

Create a metric that measures the percentage of events that meet a condition.

```ts snippet:CreateEventRateMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Create User Rate Metric

Create a metric that measures the percentage of users who perform a start event and then perform an end event.

```ts snippet:CreateUserRateMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
const credential = new DefaultAzureCredential();
const client = OnlineExperimentationClient(endpoint, credential);
const response = await client
  .path("/experiment-metrics/{experimentMetricId}", "pct_chat_to_high_value_purchase_conversion")
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
```

### Create Sum Metric

Create a metric that sums up a numeric property across all events.

```ts snippet:CreateSumMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Create Average Metric

Create a metric that calculates the average of a numeric property across events.

```ts snippet:CreateAverageMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  KnownDesiredDirection,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Create Percentile Metric

Create a metric that calculates a percentile of a numeric property across events.

```ts snippet:CreatePercentileMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Update Experiment Metric

Update an existing experiment metric.

```ts snippet:UpdateExperimentMetric
import { DefaultAzureCredential } from "@azure/identity";
import { OnlineExperimentationClient, isUnexpected } from "@azure-rest/onlineexperimentation";

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
```

## Experiment Metric Lifecycle Management

### Deactivate an Experiment Metric

Stop a metric from being computed by updating its `lifecycle` property to `Inactive`.

```ts snippet:DeactivateExperimentMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Reactivate an Experiment Metric

Resume metric computation by updating its `lifecycle` property to `Active`.

```ts snippet:ReactivateExperimentMetric
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  KnownLifecycleStage,
  isUnexpected,
} from "@azure-rest/onlineexperimentation";

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
```

### Delete Experiment Metric

Permanently delete an experiment metric defintion.

```ts snippet:DeleteExperimentMetric
import { DefaultAzureCredential } from "@azure/identity";
import { OnlineExperimentationClient, isUnexpected } from "@azure-rest/onlineexperimentation";

const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
const credential = new DefaultAzureCredential();
const client = OnlineExperimentationClient(endpoint, credential);
const response = await client
  .path("/experiment-metrics/{experimentMetricId}", "test_metric_id")
  .delete();
if (isUnexpected(response)) {
  throw response.body.error;
}
```
