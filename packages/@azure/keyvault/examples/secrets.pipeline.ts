// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { SecretsClient, Pipeline } from "../lib/secretsClient";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { RestError, signingPolicy, exponentialRetryPolicy, deserializationPolicy } from '@azure/ms-rest-js';

async function main(): Promise<void> {
  const clientId = process.env["CLIENT_ID"] || "";
  const clientSecret = process.env["CLIENT_SECRET"] || "";
  const tenantId = process.env["TENANT_ID"] || "";
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"

  const url = `https://${vaultName}.vault.azure.net`;

  // Authenticate with Azure AD interactively
  // const authResponse = await msRestNodeAuth.interactiveLoginWithAuthResponse({
  //   tokenAudience: 'https://vault.azure.net'
  // });

  // Or authenticate with Azure AD using MSI to get TokenCredential.
  const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
    clientId,
    clientSecret,
    tenantId,
    {
      tokenAudience: 'https://vault.azure.net'
    }
  );

  const client = new SecretsClient(url, credential);

  // The client can be configured using INewPipelineOptions
  // const client = new SecretsClient(url, credential, {
  //   telemetry: { value: "Customized-user-agent/0.1"},
  //   retryOptions: { retryCount: 5 }
  // });

  const result = await client.setSecret("name", "secret");
  console.log("result: ", result);

  try {
    await client.getSecret("invalid-name", "3597ab0798b043d398cde46f309010ea");
  } catch (e) {
    if (e instanceof RestError) {
      console.log("Rest Error: ", e.message);
    } else {
      throw e;
    }
  }

  // The client can also be configured using a a customized Pipeline. This allows control
  // over the request policy factories( for example, adding your own RequestPolicyFactory),
  // as well as providng a custom-implementation of HTTP Client.
  // This is a more advanced scenario. For more information, see
  // https://github.com/Azure/ms-rest-js/blob/master/docs/architectureOverview.md
  const customPipeline: Pipeline = {
    requestPolicyFactories: [
      deserializationPolicy(),
      exponentialRetryPolicy(),
      signingPolicy(credential),
    ]
  };
  const client2 = new SecretsClient(url, credential, customPipeline);

  const secret = await client2.getSecret("Hello", "3597ab0798b043d398cde46f309010ea");
  console.log("secret: ", secret);
}

main().catch((err) => {
  console.log("error: ", err);
});
