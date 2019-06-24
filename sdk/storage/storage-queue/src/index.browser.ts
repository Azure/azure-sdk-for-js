// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RestError } from "@azure/core-http";

import * as Models from "../src/generated/lib/models";

export * from "./Aborter";
export * from "./credentials/AnonymousCredential";
export * from "./credentials/Credential";
export * from "./credentials/RawTokenCredential";
export { IPRange } from "./IPRange";
export * from "./MessageIdClient";
export * from "./MessagesClient";
export * from "./Pipeline";
export * from "./policies/AnonymousCredentialPolicy";
export * from "./policies/CredentialPolicy";
export * from "./RetryPolicyFactory";
export * from "./LoggingPolicyFactory";
export * from "./TelemetryPolicyFactory";
export * from "./QueueClient";
export * from "./QueueSASPermissions";
export * from "./UniqueRequestIDPolicyFactory";
export * from "./QueueServiceClient";
export { Models, RestError };

// async iterator polyfill.
if (typeof Symbol === undefined || !Symbol.asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}
