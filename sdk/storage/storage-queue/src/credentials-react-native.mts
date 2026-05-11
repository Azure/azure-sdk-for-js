// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native uses the same credential behavior as browsers
export {
  isStorageSharedKeyCredential,
  parseConnectionString,
  isValidCredential,
  isCredentialOrPipeline,
} from "./credentials-browser.mjs";
export type { CredentialType } from "./credentials-browser.mjs";
