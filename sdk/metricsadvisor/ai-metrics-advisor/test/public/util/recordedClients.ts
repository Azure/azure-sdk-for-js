// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { TokenCredential } from "@azure/core-auth";
import {
  MetricsAdvisorAdministrationClient,
  MetricsAdvisorClient,
  MetricsAdvisorKeyCredential,
} from "../../../src";

export interface RecordedAdminClient {
  client: MetricsAdvisorAdministrationClient;
  recorder: Recorder;
}

export interface RecordedAdvisorClient {
  client: MetricsAdvisorClient;
  recorder: Recorder;
}

const blobConnectionString = "blob_connection_string";
const blobTemplate = "blob_template";
const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  METRICS_ADVISOR_SUBSCRIPTION_KEY: "sub_key",
  METRICS_ADVISOR_API_KEY: "api_key",
  METRICS_ADVISOR_ENDPOINT: "https://endpoint",
  METRICS_ADVISOR_AZURE_BLOB_CONNECTION_STRING: blobConnectionString,
  METRICS_ADVISOR_AZURE_BLOB_TEMPLATE: blobTemplate,
  METRICS_ADVISOR_AZURE_APPINSIGHTS_APPLICATION_ID: "appInsights_application",
  METRICS_ADVISOR_AZURE_APPINSIGHTS_API_KEY: "appInsights_app_key",
  METRICS_ADVISOR_AZURE_SQL_SERVER_CONNECTION_STRING: "sqlServer_connection_string",
  // fake ids
  METRICS_ADVISOR_ALERT_CONFIG_ID: "7edf304f-6487-4e3d-a137-cc4f679bcbc0",
  METRICS_ADVISOR_ALERT_ID: "17470297800",
  METRICS_ADVISOR_AZURE_SQLSERVER_DATAFEED_ID: "52b0c20c-cb7c-43f0-9507-2a33170342db",
  METRICS_ADVISOR_AZURE_SQLSERVER_METRIC_ID_1: "189ff959-d9f4-45c7-a1e0-f87c9c7ca80f",
  METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID: "26ece682-80a6-4415-89a2-05903dd9a640",
  METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_INCIDENT_ID:
    "045f03a31628d5938cd75cfdecfff045-17465dcc000",
  METRICS_ADVISOR_AZURE_SQLSERVER_INCIDENT_ID: "045f03a31628d5938cd75cfdecfff045-17465dcc000",
  METRICS_EVENTHUB_CONNECTION_STRING: "eventhub-connection-string",
  METRICS_EVENTHUB_CONSUMER_GROUP: "consumer-group",
};

export async function createRecordedAdminClient(
  context: Context,
  apiKey: TokenCredential | MetricsAdvisorKeyCredential,
): Promise<RecordedAdminClient> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start({
    envSetupForPlayback: replaceableVariables,
  });
  return {
    client: new MetricsAdvisorAdministrationClient(
      assertEnvironmentVariable("METRICS_ADVISOR_ENDPOINT"),
      apiKey,
      recorder.configureClientOptions({}),
    ),
    recorder,
  };
}

export async function createRecordedAdvisorClient(
  context: Context,
  apiKey: TokenCredential | MetricsAdvisorKeyCredential,
): Promise<RecordedAdvisorClient> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start({
    envSetupForPlayback: replaceableVariables,
  });
  return {
    client: new MetricsAdvisorClient(
      assertEnvironmentVariable("METRICS_ADVISOR_ENDPOINT"),
      apiKey,
      recorder.configureClientOptions({}),
    ),
    recorder,
  };
}

/**
 * Returns an appropriate credential depending on the value of `useAad`.
 */
export function makeCredential(useAad: boolean): TokenCredential | MetricsAdvisorKeyCredential {
  return useAad
    ? createTestCredential()
    : new MetricsAdvisorKeyCredential(
        assertEnvironmentVariable("METRICS_ADVISOR_SUBSCRIPTION_KEY"),
        assertEnvironmentVariable("METRICS_ADVISOR_API_KEY"),
      );
}

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
}

export function getRecorderUniqueVariable(recorder: Recorder, name: string): string {
  return recorder.variable(name, getUniqueName(name));
}
