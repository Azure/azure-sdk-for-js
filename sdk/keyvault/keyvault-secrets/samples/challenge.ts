import { SecretsClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

import {
  RequestPolicyFactory,
  deserializationPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  userAgentPolicy
} from "@azure/core-http";

import { RetryConstants } from "../src/core/utils/constants";
import {
  challengeBasedAuthenticationPolicy
} from "../src/core/challengeBasedAuthenticationPolicy";

import { Pipeline } from "../src/core/keyVaultBase";

async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const retryOptions: any = {};
  const pipelineOptions: any = {};
  const requestPolicyFactories: RequestPolicyFactory[] = [
    proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings)),
    userAgentPolicy({ value: "" }),
    generateClientRequestIdPolicy(),
    deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
    throttlingRetryPolicy(),
    systemErrorRetryPolicy(),
    exponentialRetryPolicy(
      retryOptions.retryCount,
      retryOptions.retryIntervalInMS,
      RetryConstants.MIN_RETRY_INTERVAL_MS, // Minimum retry interval to prevent frequent retries
      retryOptions.maxRetryDelayInMs
    ),
    redirectPolicy(),

    challengeBasedAuthenticationPolicy(credential)
  ];

  const pipeline: Pipeline = {
    httpClient: pipelineOptions.HTTPClient,
    httpPipelineLogger: pipelineOptions.logger,
    requestPolicyFactories
  };

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretsClient(url, credential, pipeline);

  // Create a secret
  const secretName = "MySecretName12345";
  const result = await client.setSecret(secretName, "MySecretValue");
  console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret);

  // Update the secret with different attributes
  const updatedSecret = await client.updateSecretProperties(secretName, result.properties.version!, {
    enabled: false
  });
  console.log("updated secret: ", updatedSecret);

  // Delete the secret
  await client.deleteSecret(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
