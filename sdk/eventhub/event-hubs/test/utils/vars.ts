// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function isMock(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "mock";
}

export function getEventhubName(): string {
  return inject(EnvVarKeys.EVENTHUB_NAME);
}

export function getFullyQualifiedNamespace(): string {
  return inject(EnvVarKeys.EVENTHUB_FQDN);
}

export function getConsumerGroupName(): string {
  return inject(EnvVarKeys.EVENTHUB_CONSUMER_GROUP_NAME);
}

export function getConnectionStringWithKey(): string {
  return inject(EnvVarKeys.EVENTHUB_CONNECTION_STRING);
}
