// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// BatchSharedKeyCredentials is not supported in browser environment.

import { type AzureNamedKeyCredential } from "@azure/core-auth";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

export function createBatchSharedKeyCredentialsPolicy(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  _credentials: AzureNamedKeyCredential
): PipelinePolicy {
  throw new Error("Batch Shared Key authentication is not supported in browser environment.");
}
