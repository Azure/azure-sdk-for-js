// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type AzureNamedKeyCredential } from "@azure/core-auth";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";

export function createBatchSharedKeyCredentialsPolicy(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  _: AzureNamedKeyCredential,
): PipelinePolicy {
  throw new Error("BatchSharedKeyCredentialsPolicy is not supported in react native environment");
}
