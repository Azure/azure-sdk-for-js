// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, env } from "@azure-tools/test-recorder";
import { assert } from "vitest";
import { createClientLogger } from "@azure/logger";
import type { LogsTable } from "../../../src/index.js";
import { LogsQueryClient } from "../../../src/index.js";
import type { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
export const loggerForTest = createClientLogger("test");

const replacementForLogsResourceId = env["LOGS_RESOURCE_ID"]?.startsWith("/")
  ? "/logs-arm-resource-id"
  : "logs-arm-resource-id";

const envSetupForPlayback: Record<string, string> = {
  MONITOR_WORKSPACE_ID: "workspace-id",
  LOGS_RESOURCE_ID: replacementForLogsResourceId,
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
  ],
};
export interface RecorderAndLogsClient {
  client: LogsQueryClient;
  recorder: Recorder;
}

export function getLogsResourceId(): string {
  return assertEnvironmentVariable("LOGS_RESOURCE_ID");
}

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export async function createRecorderAndLogsClient(
  recorder: Recorder,
  retryOptions?: ExponentialRetryPolicyOptions,
): Promise<RecorderAndLogsClient> {
  await recorder.start(recorderOptions);
  await recorder.addSanitizers(
    {
      bodySanitizers: [
        {
          regex: true,
          target: "(.*)range x from 1 to (?<step_limit>[0-9]+) step 1(.*)",
          value: "10000000000000",
          groupForReplace: "step_limit",
        },
      ],
    },
    ["playback", "record"],
  );

  const client = new LogsQueryClient(
    createTestCredential(),
    recorder.configureClientOptions({ retryOptions }),
  );

  return {
    client,
    recorder,
  };
}

export function getMonitorWorkspaceId(): string {
  return assertEnvironmentVariable("MONITOR_WORKSPACE_ID");
}

export function printLogQueryTables(tables: LogsTable[]): void {
  for (const table of tables) {
    const columnHeaderString = table.columnDescriptors
      .map((c) => `${c.name}(${c.type}) `)
      .join("| ");
    console.log(columnHeaderString);

    for (const row of table.rows) {
      const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
      console.log(columnValuesString);
    }
  }
}

export function assertQueryTable(
  table: LogsTable | undefined,
  expectedTable: {
    name: string;
    columns: string[];
    rows: LogsTable["rows"];
  },
  message: string,
): void {
  if (table == null) {
    throw new Error(`${message}: Table was null/undefined`);
  }

  assert.deepEqual(
    {
      name: table.name,
      rows: table.rows,
      columns: table.columnDescriptors.map((c) => c.name),
    },
    expectedTable,
    `${message}: tables weren't equal`,
  );
}
