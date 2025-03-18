// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { logger } from "./logger.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in keyof typeof EnvVarKeys]: string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: string | undefined;
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM]: string | undefined;
  }
}

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return !value ? "mock" : value.toLowerCase();
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

function setEnvVar(key: string, value: string | undefined, warningMessage: string): void {
  if (!value) {
    logger.warning(warningMessage);
  } else {
    process.env[key] = value;
  }
}

export default async function ({ provide }: TestProject): Promise<void> {
  if (process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() === "live") {
    const subId = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const rgName = assertEnvironmentVariable("RESOURCE_GROUP");
    const authRule = assertEnvironmentVariable("AUTHORIZATION_RULE_NAME");
    const authRulePremium = assertEnvironmentVariable("AUTHORIZATION_RULE_NAME_PREMIUM");
    const namespaceName = assertEnvironmentVariable("NAMESPACE_NAME");
    const namespaceNamePremium = assertEnvironmentVariable("NAMESPACE_NAME_PREMIUM");
    const cred = createLiveCredential();
    const sbMgmtClient = new ServiceBusManagementClient(cred, subId);
    const { primaryConnectionString: connectionString } = await sbMgmtClient.namespaces.listKeys(
      rgName,
      namespaceName,
      authRule,
    );
    const { primaryConnectionString: connectionStringPremium } =
      await sbMgmtClient.namespaces.listKeys(rgName, namespaceNamePremium, authRulePremium);
    setEnvVar(
      EnvVarKeys.SERVICEBUS_CONNECTION_STRING,
      connectionString,
      "There is no connection string",
    );
    setEnvVar(
      EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM,
      connectionStringPremium,
      "There is no connection string for the premium namespace",
    );
    for (const key of Object.values(EnvVarKeys)) {
      provide(key, assertEnvironmentVariable(key));
    }
  }
}
