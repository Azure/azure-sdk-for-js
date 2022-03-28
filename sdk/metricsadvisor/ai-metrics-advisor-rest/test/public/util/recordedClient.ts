// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import "./env";

import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isLiveMode,
  record,
} from "@azure-tools/test-recorder";
import { TokenCredential } from "@azure/core-auth";

import { ClientOptions } from "@azure-rest/core-client";
import { ClientSecretCredential } from "@azure/identity";
import { Context } from "mocha";
import * as dotenv from "dotenv";
import { createXhrHttpClient } from "@azure/test-utils";
import { MetricsAdvisorKeyCredential } from "../../../src/metricsAdvisorKeyCredentialPolicy";
import { createClient as createMetricsAdvisorClient } from "../../../src/credentialHelper";
import { GeneratedClientLike } from "../../../src/generated";

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

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode =
  typeof process !== "undefined" &&
  !!process.version &&
  !!process.versions &&
  !!process.versions.node;

if (isNode) {
  dotenv.config();
}
const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();


export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace("endpoint:443", "endpoint");
      return replaced;
    },
  ],
  queryParametersToSkip: [],
};

export function createClient(useAad: boolean, options?: ClientOptions): GeneratedClientLike {
  const credential = makeCredential(useAad);
  return createMetricsAdvisorClient(env.METRICS_ADVISOR_ENDPOINT, credential, { ...options, httpClient });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

/**
 * Returns an appropriate credential depending on the value of `useAad`.
 */
export function makeCredential(useAad: boolean): TokenCredential | MetricsAdvisorKeyCredential {
  return useAad
    ? new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET,
      {
        httpClient,
      }
    ) : {
      key: env.METRICS_ADVISOR_API_KEY,
      subscriptionKey: env.METRICS_ADVISOR_SUBSCRIPTION_KEY
    } as MetricsAdvisorKeyCredential
}
