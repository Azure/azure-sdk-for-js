// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

dotenv.config();

declare const self: any;

export const isNode =
  !!globalThis.process &&
  !!globalThis.process.version &&
  !!globalThis.process.versions &&
  !!globalThis.process.versions.node;

export enum EnvVarKeys {
  NOTIFICATIONHUBS_CONNECTION_STRING = "NOTIFICATIONHUBS_CONNECTION_STRING",
  NOTIFICATION_HUB_NAME = "NOTIFICATION_HUB_NAME",
  APNS_DEVICE_TOKEN = "APNS_DEVICE_TOKEN",
  TEST_TARGET = "TEST_TARGET",
}

export function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return globalThis.process.env[name];
  } else {
    return self.__env__[name];
  }
}

function injectEnvironmentVariables(
  envVars: Omit<{ [key in EnvVarKeys]: string }, EnvVarKeys.TEST_TARGET>
): void {
  for (const key of Object.keys(envVars) as Exclude<EnvVarKeys, EnvVarKeys.TEST_TARGET>[]) {
    if (isNode) {
      globalThis.process.env[key] = envVars[key];
    } else {
      self.__env__[key] = envVars[key];
    }
  }
}

export function getEnvVars(): Omit<{ [key in EnvVarKeys]: any }, EnvVarKeys.TEST_TARGET> {
  if (getEnvVarValue(EnvVarKeys.TEST_TARGET) === "mock") {
    injectEnvironmentVariables({
      [EnvVarKeys.NOTIFICATIONHUBS_CONNECTION_STRING]: `Endpoint=sb://localhost/;SharedAccessKeyName=Foo;SharedAccessKey=Bar`,
      [EnvVarKeys.NOTIFICATION_HUB_NAME]: "mock-hub",
      [EnvVarKeys.APNS_DEVICE_TOKEN]:
        "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0",
    });
  }

  return {
    [EnvVarKeys.NOTIFICATIONHUBS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarKeys.NOTIFICATIONHUBS_CONNECTION_STRING
    ),
    [EnvVarKeys.NOTIFICATION_HUB_NAME]: getEnvVarValue(EnvVarKeys.NOTIFICATION_HUB_NAME),
    [EnvVarKeys.APNS_DEVICE_TOKEN]: getEnvVarValue(EnvVarKeys.APNS_DEVICE_TOKEN),
  };
}