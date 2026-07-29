// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "#platform/BufferScheduler";
export * from "#platform/bufferHelpers";
export { createBlobFromData } from "./bufferHelpers.common.js";
export * from "#platform/StructuredMessageEncodingStream";
export * from "#platform/StructuredMessageDecodingStream";
export * from "./StorageCRC64Calculator.js";
export { getCachedDefaultHttpClient } from "./cache.js";
export type * from "#platform/interfaces";

export * from "./StorageBrowserPolicyFactory.js";
export * from "./credentials/AnonymousCredential.js";
export * from "./credentials/Credential.js";
export * from "#platform/credentials/StorageSharedKeyCredential";

export * from "./StorageRetryPolicyFactory.js";
export { BaseRequestPolicy } from "./policies/RequestPolicy.js";
export * from "./policies/AnonymousCredentialPolicy.js";
export * from "./policies/CredentialPolicy.js";
export * from "#platform/policies/StorageBrowserPolicyV2";
export * from "#platform/policies/StorageCorrectContentLengthPolicy";
export * from "./policies/StorageRetryPolicyV2.js";
export * from "#platform/policies/StorageSharedKeyCredentialPolicyV2";
export * from "./policies/StorageRedirectRangeHeaderPolicy.js";
export * from "./policies/StorageRequestFailureDetailsParserPolicy.js";
export * from "#platform/credentials/UserDelegationKeyCredential";
export type { UserDelegationKey } from "./credentials/UserDelegationKey.js";

// Readable is Node.js only - export a never type for browser builds
export type Readable = never;
