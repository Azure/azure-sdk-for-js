// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env } from "@azure-tools/test-recorder";

/**
 * Acts as a proxy to check with we're running on public or sovereign cloud.
 *
 * @returns - true if running on public cloud, false otherwise.
 */
export function isPublicCloud(): boolean {
  return (env.AZURE_AUTHORITY_HOST ?? "").includes(".microsoftonline.com");
}
