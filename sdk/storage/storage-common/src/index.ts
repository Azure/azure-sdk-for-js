// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./BufferScheduler.js";
export { getCachedDefaultHttpClient } from "./cache.js";

export * from "./StorageBrowserPolicyFactory.js";
export * from "./credentials/AnonymousCredential.js";
export * from "./credentials/Credential.js";
export * from "./credentials/StorageSharedKeyCredential.js";

export * from "./StorageRetryPolicyFactory.js";
export { BaseRequestPolicy } from "./policies/RequestPolicy.js";
export * from "./policies/AnonymousCredentialPolicy.js";
export * from "./policies/CredentialPolicy.js";
export * from "./policies/StorageBrowserPolicy.js";
export * from "./policies/StorageBrowserPolicyV2.js";
export * from "./policies/StorageCorrectContentLengthPolicy.js";
export * from "./policies/StorageRetryPolicyType.js";
export * from "./policies/StorageRetryPolicy.js";
export * from "./policies/StorageRetryPolicyV2.js";
export * from "./policies/StorageSharedKeyCredentialPolicy.js";
export * from "./policies/StorageSharedKeyCredentialPolicyV2.js";
export * from "./StorageRetryPolicyFactory.js";
export * from "./policies/StorageRequestFailureDetailsParserPolicy.js";
export * from "./credentials/UserDelegationKeyCredential.js";
