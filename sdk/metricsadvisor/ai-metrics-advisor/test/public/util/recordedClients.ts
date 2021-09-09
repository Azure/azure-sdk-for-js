// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredential } from "@azure/core-auth";
import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorClient,
  MetricsAdvisorAdministrationClient
} from "../../../src";
import * as dotenv from "dotenv";
import { isNode } from "@azure/core-http";

if (isNode) {
  dotenv.config();
}

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
  AZURE_TENANT_ID: "azure_tenant_id",
  METRICS_ADVISOR_SUBSCRIPTION_KEY: "sub_key",
  METRICS_ADVISOR_API_KEY: "api_key",
  METRICS_ADVISOR_ENDPOINT: "https://endpoint/",
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
  METRICS_EVENTHUB_CONSUMER_GROUP: "consumer-group"
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording
        .replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`)
        .replace(/"accessToken"\s?:\s?"[^"]*"/g, `"accessToken":"accessToken"`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const match = testEnv.METRICS_ADVISOR_ENDPOINT.replace(/^https:\/\//, "").replace(/\/$/, "");
      return recording.replace(match, "endpoint");
    }
  ],
  queryParametersToSkip: []
};

export function createRecordedAdminClient(
  context: Context,
  apiKey: TokenCredential | MetricsAdvisorKeyCredential
): RecordedAdminClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new MetricsAdvisorAdministrationClient(testEnv.METRICS_ADVISOR_ENDPOINT, apiKey),
    recorder
  };
}

export function createRecordedAdvisorClient(
  context: Context,
  apiKey: TokenCredential | MetricsAdvisorKeyCredential
): RecordedAdvisorClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new MetricsAdvisorClient(testEnv.METRICS_ADVISOR_ENDPOINT, apiKey),
    recorder
  };
}

/**
 * Returns an appropriate credential depending on the value of `useAad`.
 */
export function makeCredential(useAad: boolean): TokenCredential | MetricsAdvisorKeyCredential {
  return useAad
    ? new ClientSecretCredential(
        testEnv.AZURE_TENANT_ID,
        testEnv.AZURE_CLIENT_ID,
        testEnv.AZURE_CLIENT_SECRET
      )
    : new MetricsAdvisorKeyCredential(
        testEnv.METRICS_ADVISOR_SUBSCRIPTION_KEY,
        testEnv.METRICS_ADVISOR_API_KEY
      );
}
