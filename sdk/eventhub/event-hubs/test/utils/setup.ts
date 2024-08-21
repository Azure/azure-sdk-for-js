// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SecretClient } from "@azure/keyvault-secrets";
import { createTestCredential } from "@azure-tools/test-credential";
import { MockEventHub, MockServerOptions } from "@azure/mock-hub";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import type { GlobalSetupContext } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in keyof typeof EnvVarKeys]: string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {}
}

const defaultLogLevel = "error";

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  // handle defaults
  if (!value) {
    switch (key) {
      case EnvVarKeys.TEST_MODE:
        return "mock";
      case EnvVarKeys.AZURE_LOG_LEVEL:
        return defaultLogLevel;
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

export default async function ({ provide }: GlobalSetupContext) {
  if (process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() === "live") {
    const kvUri = assertEnvironmentVariable("KEYVAULT_URI");
    const eventHubConnectionStringSecretName = assertEnvironmentVariable(
      "EVENTHUB_CONNECTION_STRING_SECRET_NAME",
    );
    const kvClient = new SecretClient(kvUri, createTestCredential());
    const { value: connectionStringWithKey } = await kvClient.getSecret(
      eventHubConnectionStringSecretName,
    );
    if (!connectionStringWithKey) {
      throw new Error(
        `Secret ${eventHubConnectionStringSecretName} not found in Key Vault ${kvUri}`,
      );
    }
    process.env[EnvVarKeys.EVENTHUB_CONNECTION_STRING] = connectionStringWithKey;
    for (const key of Object.values(EnvVarKeys)) {
      provide(key, assertEnvironmentVariable(key));
    }
    return function () {};
  }
  provide(EnvVarKeys.TEST_MODE, "mock");
  provide(EnvVarKeys.EVENTHUB_NAME, MOCKS.EVENTHUB_NAME);
  provide(EnvVarKeys.EVENTHUB_CONSUMER_GROUP_NAME, MOCKS.EVENTHUB_CONSUMER_GROUP_NAME);
  provide(EnvVarKeys.EVENTHUB_FQDN, MOCKS.EVENTHUB_FQDN);
  provide(EnvVarKeys.AZURE_LOG_LEVEL, process.env[EnvVarKeys.AZURE_LOG_LEVEL] || defaultLogLevel);
  provide(EnvVarKeys.EVENTHUB_CONNECTION_STRING, MOCKS.EVENTHUB_CONNECTION_STRING_WITH_KEY);
  const server = createMockServer();
  await server.start();
  return async function (): Promise<void> {
    await server.stop();
  };
}
