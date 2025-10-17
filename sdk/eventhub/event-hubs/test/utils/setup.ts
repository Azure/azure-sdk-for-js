// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretClient } from "@azure/keyvault-secrets";
import { createTestCredential } from "@azure-tools/test-credential";
import type { MockServerOptions } from "@azure-tools/mock-hub";
import { MockEventHub } from "@azure-tools/mock-hub";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import type { GlobalSetupContext } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import type { AzureLogLevel } from "@azure/logger";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in keyof Omit<typeof EnvVarKeys, "AZURE_LOG_LEVEL">]: string;
  } & { AZURE_LOG_LEVEL: AzureLogLevel | undefined };
  export interface ProvidedContext extends MyEnvVarKeys {}
}

function assertEnvironmentVariable<K extends EnvVarKeys.AZURE_LOG_LEVEL>(
  key: K,
): AzureLogLevel | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  // handle defaults
  if (!value) {
    switch (key) {
      case EnvVarKeys.TEST_MODE:
        return "mock";
      case EnvVarKeys.AZURE_LOG_LEVEL:
        return undefined;
      default:
        throw new Error(`Environment variable ${key} is not defined.`);
    }
  }
  return value;
}

function createMockServer(options: MockServerOptions = {}): MockEventHub {
  return new MockEventHub({
    name: MOCKS.EVENTHUB_NAME,
    consumerGroups: [MOCKS.EVENTHUB_CONSUMER_GROUP_NAME],
    partitionCount: 4,
    connectionInactivityTimeoutInMs: 300000, // 5 minutes
    port: 5671,
    tlsOptions: {
      cert: readFileSync(resolvePath(process.cwd(), "certs", "my-server.crt.pem")),
      key: readFileSync(resolvePath(process.cwd(), "certs", "my-server.key.pem")),
    },
    ...options,
  });
}

function getAzureLogLevel(): AzureLogLevel | undefined {
  const val = process.env[EnvVarKeys.AZURE_LOG_LEVEL];
  if (![undefined, "error", "warning", "info", "verbose"].includes(val)) {
    throw new Error(`Invalid value for ${EnvVarKeys.AZURE_LOG_LEVEL}: ${val}`);
  }
  return val as AzureLogLevel | undefined;
}

export default async function ({ provide }: GlobalSetupContext) {
  if (process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() === "live") {
    const kvUri = assertEnvironmentVariable("KEYVAULT_URI");
    const eventHubConnectionStringSecretName = assertEnvironmentVariable(
      "EVENTHUB_CONNECTION_STRING_SECRET_NAME",
    );
    const kvClient = new SecretClient(kvUri, createTestCredential());
    const { value: connectionString } = await kvClient.getSecret(
      eventHubConnectionStringSecretName,
    );
    if (!connectionString) {
      throw new Error(
        `Secret ${eventHubConnectionStringSecretName} not found in Key Vault ${kvUri}`,
      );
    }
    process.env[EnvVarKeys.EVENTHUB_CONNECTION_STRING] = connectionString;
    for (const key of Object.values(EnvVarKeys)) {
      provide(key, assertEnvironmentVariable(key));
    }
    return () => {};
  } else if (process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() === "playback") {
    return () => {};
  }
  provide(EnvVarKeys.TEST_MODE, "mock");
  provide(EnvVarKeys.EVENTHUB_NAME, MOCKS.EVENTHUB_NAME);
  provide(EnvVarKeys.EVENTHUB_CONSUMER_GROUP_NAME, MOCKS.EVENTHUB_CONSUMER_GROUP_NAME);
  provide(EnvVarKeys.EVENTHUB_FQDN, MOCKS.EVENTHUB_FQDN);
  provide(EnvVarKeys.AZURE_LOG_LEVEL, getAzureLogLevel());
  provide(EnvVarKeys.EVENTHUB_CONNECTION_STRING, MOCKS.EVENTHUB_CONNECTION_STRING_WITH_KEY);
  const server = createMockServer();
  await server.start();
  return async function (): Promise<void> {
    await server.stop();
  };
}
