// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in keyof typeof EnvVarKeys]: string;
  };
  export interface ProvidedContext
    extends Omit<
      MyEnvVarKeys,
      | typeof EnvVarKeys.SERVICEBUS_CONNECTION_STRING
      | typeof EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM
    > {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: string | undefined;
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM]: string | undefined;
  }
}

function assertEnvironmentVariable<
  T extends Pick<
    typeof EnvVarKeys,
    "SERVICEBUS_CONNECTION_STRING" | "SERVICEBUS_CONNECTION_STRING_PREMIUM"
  >,
>(key: T): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return !value ? value : value.toLowerCase();
  }
  if (
    (
      [
        EnvVarKeys.SERVICEBUS_CONNECTION_STRING,
        EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM,
      ] as string[]
    ).includes(key)
  ) {
    return value;
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
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
    const { disableLocalAuth } = await sbMgmtClient.namespaces.get(rgName, namespaceName);
    const { disableLocalAuth: disableLocalAuthPremium } = await sbMgmtClient.namespaces.get(
      rgName,
      namespaceNamePremium,
    );
    if (!disableLocalAuth && !disableLocalAuthPremium) {
      const { primaryConnectionString: connectionString } = await sbMgmtClient.namespaces.listKeys(
        rgName,
        namespaceName,
        authRule,
      );
      const { primaryConnectionString: connectionStringPremium } =
        await sbMgmtClient.namespaces.listKeys(rgName, namespaceNamePremium, authRulePremium);
      process.env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING] = connectionString;
      process.env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM] = connectionStringPremium;
    }

    for (const key of Object.values(EnvVarKeys)) {
      provide(key, assertEnvironmentVariable(key));
    }
  }
}
