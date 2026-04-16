// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext extends Omit<MyEnvVarKeys, "DISABLE_LOCAL_AUTH"> {
    DISABLE_LOCAL_AUTH: boolean;
  }
}

function assertEnvironmentVariable<T extends Pick<typeof EnvVarKeys, "TEST_MODE">>(
  key: T,
): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return value?.toLowerCase();
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = assertEnvironmentVariable(EnvVarKeys.TEST_MODE);
  if (![undefined, "playback"].includes(testMode)) {
    const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
    const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
    const wpsName = assertEnvironmentVariable(EnvVarKeys.WPS_NAME);
    const wpsEndpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
    const socketIOEndpoint = assertEnvironmentVariable(EnvVarKeys.SOCKETIO_ENDPOINT);
    const cred = createLiveCredential();
    const mgmtClient = new WebPubSubManagementClient(cred, subId);
    const { disableLocalAuth } = await mgmtClient.webPubSub.get(rgName, wpsName);
    const { primaryConnectionString, primaryKey } = await mgmtClient.webPubSub.listKeys(
      rgName,
      wpsName,
    );
    if (!primaryConnectionString || !primaryKey) {
      throw new Error("Failed to get primary connection string or key.");
    }
    if (!wpsEndpoint) {
      throw new Error("Failed to get WPS endpoint.");
    }
    const reverseProxyEndpoint = primaryConnectionString
      .split(";")
      .find((s) => s.startsWith("Endpoint="))
      ?.split("=")[1];
    if (!reverseProxyEndpoint) {
      throw new Error("Failed to get reverse proxy endpoint.");
    }
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth ?? false);
    provide(EnvVarKeys.CONNECTION_STRING, primaryConnectionString);
    provide(EnvVarKeys.REVERSE_PROXY_ENDPOINT, reverseProxyEndpoint);
    provide(EnvVarKeys.API_KEY, primaryKey);
    provide(EnvVarKeys.ENDPOINT, wpsEndpoint);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.SOCKETIO_ENDPOINT, socketIOEndpoint);
  } else {
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, MOCKS.DISABLE_LOCAL_AUTH);
    provide(EnvVarKeys.CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.REVERSE_PROXY_ENDPOINT, MOCKS.REVERSE_PROXY_ENDPOINT);
    provide(EnvVarKeys.API_KEY, MOCKS.API_KEY);
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.SOCKETIO_ENDPOINT, MOCKS.SOCKETIO_ENDPOINT);
    provide(EnvVarKeys.TEST_MODE, testMode);
  }
}
