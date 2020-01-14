// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EnvironmentCredential } from "@azure/identity";

export async function getTokenCredentialsFromAAD() {
  return new EnvironmentCredential();
}

export { EnvironmentCredential } from "@azure/identity";
