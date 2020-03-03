// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
import { loggerForTest } from "./logHelpers";
import { delay } from "@azure/core-amqp";
dotenv.config();

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  EVENTHUB_CONNECTION_STRING = "EVENTHUB_CONNECTION_STRING",
  EVENTHUB_NAME = "EVENTHUB_NAME",
  IOTHUB_EH_COMPATIBLE_CONNECTION_STRING = "IOTHUB_EH_COMPATIBLE_CONNECTION_STRING",
  AZURE_TENANT_ID = "AZURE_TENANT_ID",
  AZURE_CLIENT_ID = "AZURE_CLIENT_ID",
  AZURE_CLIENT_SECRET = "AZURE_CLIENT_SECRET"
}

function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    // @ts-ignore
    return window.__env__[name];
  }
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  return {
    [EnvVarKeys.EVENTHUB_CONNECTION_STRING]: getEnvVarValue(EnvVarKeys.EVENTHUB_CONNECTION_STRING),
    [EnvVarKeys.EVENTHUB_NAME]: getEnvVarValue(EnvVarKeys.EVENTHUB_NAME),
    [EnvVarKeys.IOTHUB_EH_COMPATIBLE_CONNECTION_STRING]: getEnvVarValue(
      EnvVarKeys.IOTHUB_EH_COMPATIBLE_CONNECTION_STRING
    ),
    [EnvVarKeys.AZURE_TENANT_ID]: getEnvVarValue(EnvVarKeys.AZURE_TENANT_ID),
    [EnvVarKeys.AZURE_CLIENT_ID]: getEnvVarValue(EnvVarKeys.AZURE_CLIENT_ID),
    [EnvVarKeys.AZURE_CLIENT_SECRET]: getEnvVarValue(EnvVarKeys.AZURE_CLIENT_SECRET)
  };
}

export async function loopUntil(args: {
  name: string;
  timeBetweenRunsMs: number;
  maxTimes: number;
  until: () => Promise<boolean>;
  errorMessageFn?: () => string;
}): Promise<void> {
  for (let i = 0; i < args.maxTimes + 1; ++i) {
    const finished = await args.until();

    if (finished) {
      return;
    }

    loggerForTest(`[${args.name}: delaying for ${args.timeBetweenRunsMs}ms]`);
    await delay(args.timeBetweenRunsMs);
  }

  throw new Error(
    `Waited way too long for ${args.name}: ${args.errorMessageFn ? args.errorMessageFn() : ""}`
  );
}
