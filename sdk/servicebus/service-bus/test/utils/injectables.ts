// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getFullyQualifiedNamespace(): string {
  return inject(EnvVarKeys.SERVICEBUS_FQDN);
}

export function getFullyQualifiedNamespacePremium(): string {
  return inject(EnvVarKeys.SERVICEBUS_FQDN_PREMIUM);
}

export function getConnectionString(): string | undefined {
  return inject(EnvVarKeys.SERVICEBUS_CONNECTION_STRING);
}

export function getConnectionStringPremium(): string | undefined {
  return inject(EnvVarKeys.SERVICEBUS_CONNECTION_STRING_PREMIUM);
}

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}
