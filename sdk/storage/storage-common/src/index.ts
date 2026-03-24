// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "#platform/BufferScheduler";
export * from "#platform/StructuredMessageEncodingStream";
export * from "#platform/StructuredMessageDecodingStream";
export * from "./StorageCRC64Calculator.js";
export { getCachedDefaultHttpClient } from "./cache.js";
export type * from "./interfaces.js";

export * from "./StorageBrowserPolicyFactory.js";
export * from "./credentials/AnonymousCredential.js";
export * from "./credentials/Credential.js";
export * from "#platform/credentials/StorageSharedKeyCredential";

export * from "./StorageRetryPolicyFactory.js";
export { BaseRequestPolicy } from "./policies/RequestPolicy.js";
export * from "./policies/AnonymousCredentialPolicy.js";
export * from "./policies/CredentialPolicy.js";
export * from "./policies/StorageBrowserPolicyV2.js";
export * from "#platform/policies/StorageCorrectContentLengthPolicy";
export * from "./policies/StorageRetryPolicyV2.js";
export * from "./policies/StorageSharedKeyCredentialPolicy.js";
export * from "#platform/policies/StorageSharedKeyCredentialPolicyV2";
export * from "./policies/StorageRequestFailureDetailsParserPolicy.js";
export * from "#platform/credentials/UserDelegationKeyCredential";
