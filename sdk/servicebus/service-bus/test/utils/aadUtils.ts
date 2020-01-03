// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EnvVarNames, getEnvVars } from "./envVarUtils";

import { loginWithServicePrincipalSecret } from "@azure/ms-rest-nodeauth";

const aadServiceBusAudience = "https://servicebus.azure.net/";

export async function getTokenCredentialsFromAAD() {
  const env = getEnvVars();
  const tokenCreds = await loginWithServicePrincipalSecret(
    env[EnvVarKeys.AAD_CLIENT_ID],
    env[EnEnvVarNamesAD_CLIENT_SECRET],
    env[EnEnvVarNamesAD_TENANT_ID],
    {EnvVarNames
      tokenAudience: aadServiceBusAudience
    }
  );
  return tokenCreds;
};EnvVarNames
EnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNamesEnvVarNames
