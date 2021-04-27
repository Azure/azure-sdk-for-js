// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientSecretCredential } from "@azure/identity";
import { env, record, Recorder } from "@azure/test-utils-recorder";
import { Context } from "mocha";
import { Table } from "../../../src/generated/logquery/src";

import * as dotenv from "dotenv";
dotenv.config();

/**
 * Declare the client and recorder instances.  We will set them using the
 * beforeEach hook.
 */
export function addTestRecorderHooks(): void {
  // When the recorder observes the values of these environment variables in any
  // recorded HTTP request or response, it will replace them with the values they
  // are mapped to below.
  const replaceableVariables: Record<string, string> = {
    MONITOR_WORKSPACE_ID: "<workspace-id>",
    METRICS_RESOURCE_ID_TO_QUERY: "<metrics-arm-resource-id>",

    AZURE_TENANT_ID: "azure_tenant_id",
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret"
  };

  let recorder: Recorder;

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(function(this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = record(this, {
      // == Recorder Environment Setup == Add the replaceable variables from
      // above
      replaceableVariables,

      // We don't use this in the template, but if we had any query parameters
      // we wished to discard, we could add them here
      queryParametersToSkip: [],

      // Finally, we need to remove the AAD `access_token` from any requests.
      // This is very important, as it cannot be removed using environment
      // variable or query parameter replacement.  The
      // `customizationsOnRecordings` field allows us to make arbitrary
      // replacements within recordings.
      customizationsOnRecordings: [
        (recording: any): any =>
          recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
      ]
    });
  });

  // After each test, we need to stop the recording.
  afterEach(async function() {
    await recorder.stop();
  });
}

export function createTestClientSecretCredential(): ClientSecretCredential {
  if (!env.AZURE_TENANT_ID || !env.AZURE_CLIENT_ID || !env.AZURE_CLIENT_SECRET) {
    throw new Error(
      "AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET must be set to run live tests"
    );
  }

  return new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );
}

export function getMonitorWorkspaceId(mochaContext: Pick<Context, "skip">): string {
  if (!env.MONITOR_WORKSPACE_ID) {
    // TODO: need to get the test resources situation ironed out.
    // throw new Error("MONITOR_WORKSPACE_ID must be defined in order to run LogsClient live tests.");
    console.log(`TODO: live tests skipped until test-resources + data population is set up.`);
    mochaContext.skip();
  }

  return env.MONITOR_WORKSPACE_ID!;
}

export function getMetricsArmResourceId(mochaContext: Pick<Context, "skip">): string {
  if (!env.METRICS_RESOURCE_ID_TO_QUERY) {
    // TODO: need to get the test resources situation ironed out.
    // throw new Error(
    //   "METRICS_RESOURCE_ID_TO_QUERY must be defined in order to run MetricsClient live tests."
    // );
    console.log(`TODO: live tests skipped until test-resources + data population is set up.`);
    mochaContext.skip();
  }

  return env.METRICS_RESOURCE_ID_TO_QUERY;
}

export function printLogQueryTables(tables: Table[]): void {
  for (const table of tables) {
    const columnHeaderString = table.columns.map((c) => `${c.name}(${c.type}) `).join("| ");
    console.log(columnHeaderString);

    for (const row of table.rows) {
      const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
      console.log(columnValuesString);
    }
  }
}
