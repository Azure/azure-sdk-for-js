// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type AzureNamedKeyCredential } from "@azure/core-auth";

export function createBatchSharedKeyCredentialsPolicy(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  _: AzureNamedKeyCredential,
): never {
  throw new Error("BatchSharedKeyCredentialsPolicy is not supported in react native environment");
}
