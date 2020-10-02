// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to provide feedback for a metric.
 */
// Load the .env file if it exists
require("dotenv").config();

const { MetricsAdvisorKeyCredential, MetricsAdvisorClient } = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const metricId = process.env["METRICS_ADVISOR_METRIC_ID"] || "<metric id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const client = new MetricsAdvisorClient(endpoint, credential);

  await provideAnomalyFeedback(client, metricId);
  await provideChangePointFeedback(client, metricId);
  await providePeriodFeedback(client, metricId);
  const commentFeedback = await provideCommentFeedback(client, metricId);
  await listFeedback(client, metricId);
  await getFeedback(client, commentFeedback.id);
}

async function provideAnomalyFeedback(client, metricId) {
  console.log("Creating an anomaly feedback...");
  const anomalyFeedback = {
    metricId,
    feedbackType: "Anomaly",
    startTime: new Date("2020/08/05"),
    endTime: new Date("2020/08/07"),
    value: "NotAnomaly",
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
  };
  return await client.createMetricFeedback(anomalyFeedback);
}

async function providePeriodFeedback(client, metricId) {
  console.log("Creating a period feedback...");
  const periodFeedback = {
    metricId,
    feedbackType: "Period",
    periodType: "AutoDetect",
    periodValue: 4,
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
  };
  return await client.createMetricFeedback(periodFeedback);
}

async function provideChangePointFeedback(client, metricId) {
  console.log("Creating a change point feedback...");
  const changePointFeedback = {
    metricId,
    feedbackType: "ChangePoint",
    startTime: new Date("2020/08/05"),
    value: "ChangePoint",
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
  };
  return await client.createMetricFeedback(changePointFeedback);
}

async function provideCommentFeedback(client, metricId) {
  console.log("Creating a comment feedback...");
  const commendFeedback = {
    metricId,
    feedbackType: "Comment",
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Amphibian" } },
    comment: "This is a comment"
  };
  return await client.createMetricFeedback(commendFeedback);
}

async function getFeedback(client, feedbackId) {
  console.log(`Retrieving feedback with id '${feedbackId}'...`);
  const feedback = await client.getMetricFeedback(feedbackId);
  console.log(feedback);
}

async function listFeedback(client, metricId, startTime, endTime) {
  console.log("Listing feedbacks...");
  console.log("  first two pages using iterator");
  const iterator = client
    .listMetricFeedbacks(metricId, {
      filter: {
        timeMode: "FeedbackCreatedTime"
      }
    })
    .byPage({ maxPageSize: 2 });
  const result = await iterator.next();

  if (!result.done) {
    console.log("first page");
    console.table(result.value.feedbacks);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("second page");
      console.table(nextPage.value.feedbacks);
    }
  }

  console.log("  using for-await-of loop");
  for await (const f of client.listMetricFeedbacks(metricId, {
    filter: {
      startTime: new Date("08/01/2020"),
      endTime: new Date("08/11/2020"),
      timeMode: "MetricTimestamp"
    }
  })) {
    console.log(f);
  }
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });
