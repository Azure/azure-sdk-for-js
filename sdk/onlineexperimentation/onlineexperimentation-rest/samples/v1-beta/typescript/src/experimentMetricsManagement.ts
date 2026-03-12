// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ConfigurationClient to retrieve a setting value.
 */

import type { ExperimentMetric } from "@azure-rest/onlineexperimentation";
import { OnlineExperimentationClient, isUnexpected, KnownLifecycleStage, KnownDesiredDirection, KnownExperimentMetricType } from "@azure-rest/onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {

  // [Step 1] Initialize the SDK client
  // The endpoint URL from the Microsoft.OnlineExperimentation/workspaces resource.
  const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint-not-set>";
  const credential = new DefaultAzureCredential();

  console.log(`AZURE_ONLINEEXPERIMENTATION_ENDPOINT is ${endpoint}`);

  const client = OnlineExperimentationClient(endpoint, credential);

  // [Step 2] Define the experiment metric
  const exampleMetric: ExperimentMetric = {
    lifecycle: KnownLifecycleStage.Active,
    displayName: "% users with LLM interaction who made a high-value purchase",
    description: "Percentage of users who received a response from the LLM and then made a purchase of $100 or more",
    categories: ["Business"],
    desiredDirection: KnownDesiredDirection.Increase,
    definition: {
      type: KnownExperimentMetricType.UserRate,
      startEvent: { eventName: "ResponseReceived" },
      endEvent: {
        eventName: "Purchase",
        filter: "Revenue > 100",
      },
    },
  };

  // [Optional][Step 2a] Validate the metric - checks for input errors without persisting anything.
  console.log(`Checking if the experiment metric definition is valid...`);
  console.log(JSON.stringify(exampleMetric, null, 2));

  const validationResponse = await client
    .path("/experiment-metrics:validate")
    .post({
      body: exampleMetric,
    });

  if (isUnexpected(validationResponse)) {
    throw validationResponse.body.error;
  }
  
  console.log(`Experiment metric definition valid: ${validationResponse.body.isValid}.`);
  for (const detail of validationResponse.body.diagnostics ?? []) {
    // Inspect details of why the metric definition was rejected as Invalid.
    console.log(`- ${detail.code}: ${detail.message}`);
  }

  // [Step 3] Create the experiment metric
  const exampleMetricId = `sample_metric_id_${Math.floor(Math.random() * 10000 + 10000)}`;

  console.log(`Creating the experiment metric ${exampleMetricId}...`);
  const createResponse = await client
    .path("/experiment-metrics/{experimentMetricId}", exampleMetricId)
    .patch({
      contentType: "application/merge-patch+json",
      headers: {
        // Ensure no one else created this metric in the meantime.
        "If-None-Match": "*",
      },
      body: exampleMetric,
    });

  if (isUnexpected(createResponse)) {
    throw createResponse.body.error;
  }

  console.log(`Experiment metric ${createResponse.body.id} created, etag: ${createResponse.headers.etag}.`);

  // [Step 4] Deactivate the experiment metric and update the description.
  const updateResponse = await client
    .path("/experiment-metrics/{experimentMetricId}", exampleMetricId)
    .patch({
      contentType: "application/merge-patch+json",
      headers: {
        // Ensures no one else updated the metric in the meantime.
        "If-Match": createResponse.headers.etag ?? "*"
      },
      body: {
        lifecycle: KnownLifecycleStage.Inactive, // pauses computation of this metric.
        description: "No longer need to compute this.",
      },
    });
  
  if (isUnexpected(updateResponse)) {
    throw updateResponse.body.error;
  }

  console.log(`Updated metric: ${updateResponse.body.id}, etag: ${updateResponse.headers.etag}.`);

  // [Step 5] Delete the experiment metric.
  const deleteResponse = await client
    .path("/experiment-metrics/{experimentMetricId}", exampleMetricId)
    .delete({
      headers: {
        // Ensures no one else updated the metric in the meantime.
        "If-Match": updateResponse.headers.etag ?? "*"
      },
    });

  if (isUnexpected(deleteResponse)) {
    throw deleteResponse.body.error;
  }

  console.log(`Deleted metric: ${exampleMetricId}.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
