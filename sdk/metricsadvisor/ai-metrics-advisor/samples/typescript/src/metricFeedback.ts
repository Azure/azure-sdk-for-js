// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to provide feedback for a metric.
 */
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorClient,
  MetricAnomalyFeedback,
  MetricChangePointFeedback,
  MetricCommentFeedback,
  MetricPeriodFeedback
} from "@azure/ai-metrics-advisor";

export async function main() {
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
  await getFeedback(client, commentFeedback.id!);
}

async function provideAnomalyFeedback(client: MetricsAdvisorClient, metricId: string) {
  console.log("Creating an anomaly feedback...");
  const anomalyFeedback: MetricAnomalyFeedback = {
    metricId: metricId,
    feedbackType: "Anomaly",
    startTime: new Date("2020/08/05"),
    endTime: new Date("2020/08/07"),
    value: "NotAnomaly",
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
  };
  return await client.createMetricFeedback(anomalyFeedback);
}

async function providePeriodFeedback(client: MetricsAdvisorClient, metricId: string) {
  console.log("Creating a period feedback...");
  const periodFeedback: MetricPeriodFeedback = {
    metricId: metricId,
    feedbackType: "Period",
    periodType: "AutoDetect",
    periodValue: 4,
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
  };
  return await client.createMetricFeedback(periodFeedback);
}

async function provideChangePointFeedback(client: MetricsAdvisorClient, metricId: string) {
  console.log("Creating a change point feedback...");
  const changePointFeedback: MetricChangePointFeedback = {
    metricId: metricId,
    feedbackType: "ChangePoint",
    startTime: new Date("2020/08/05"),
    value: "ChangePoint",
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
  };
  return await client.createMetricFeedback(changePointFeedback);
}

async function provideCommentFeedback(client: MetricsAdvisorClient, metricId: string) {
  console.log("Creating a comment feedback...");
  const commendFeedback: MetricCommentFeedback = {
    metricId: metricId,
    feedbackType: "Comment",
    dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Amphibian" } },
    comment: "This is a comment"
  };
  return await client.createMetricFeedback(commendFeedback);
}

async function getFeedback(client: MetricsAdvisorClient, feedbackId: string) {
  console.log(`Retrieving feedback with id '${feedbackId}'...`);
  const feedback = await client.getMetricFeedback(feedbackId);
  console.log(feedback);
}

async function listFeedback(client: MetricsAdvisorClient, metricId: string) {
  console.log("Listing feedbacks...");
  console.log("  using for-await-of syntax");
  for await (const feedback of client.listMetricFeedbacks(metricId, {
    filter: {
      startTime: new Date("08/01/2020"),
      endTime: new Date("08/03/2020"),
      timeMode: "MetricTimestamp"
    }
  })) {
    console.log(`    ${feedback.feedbackType} feedback ${feedback.id}`);
    console.log(`      created time: ${feedback.createdTime}`);
    console.log(`      metric id: ${feedback.metricId}`);
    console.log(`      user principal: ${feedback.userPrincipal}`);
    if (feedback.feedbackType === "Anomaly") {
      console.log(`      feedback value: ${feedback.value}`);
      console.log(`      anomaly detection config id: ${feedback.anomalyDetectionConfigurationId}`);
    } else if (feedback.feedbackType === "ChangePoint") {
      console.log(`      feedback value: ${feedback.value}`);
    } else if (feedback.feedbackType === "Period") {
      console.log(`      period type: ${feedback.periodType}`);
      console.log(`      period value: ${feedback.periodValue}`);
    } else if (feedback.feedbackType === "Comment") {
      console.log(`      feedback comment: ${feedback.comment}`);
    }
  }

  console.log("  first two pages using iterator");
  const pageSettings = { maxPageSize: 2 };
  const iterator = client
    .listMetricFeedbacks(metricId, {
      filter: {
        timeMode: "FeedbackCreatedTime"
      }
    })
    .byPage(pageSettings);
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
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });
