// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EnvVarKeys, getEnvVars } from "./envVarUtils";

import { loginWithServicePrincipalSecret } from "@azure/ms-rest-nodeauth";

const aadServiceBusAudience = "https://servicebus.azure.net/";

export async function getTokenCredentialsFromAAD() {
  const env = getEnvVars();
  const tokenCreds = await loginWithServicePrincipalSecret(
    env[EnvVarKeys.AAD_CLIENT_ID],
    env[EnvVarKeys.AAD_CLIENT_SECRET],
    env[EnvVarKeys.AAD_TENANT_ID],
    {
      tokenAudience: aadServiceBusAudience
    }
  );
  return tokenCreds;
};
