// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert, describe, it } from "vitest";
import { execSync } from "child_process";

describe("Azure Container Instance Integration test", function () {
  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    console.log("Running in live mode");
    const azPath = runCommand("which", "az");

    const resourceGroup = requireEnvVar("IDENTITY_RESOURCE_GROUP");
    const containerInstanceName = requireEnvVar("IDENTITY_CONTAINER_INSTANCE_NAME");
    const subscriptionId = requireEnvVar("IDENTITY_SUBSCRIPTION_ID");

    if (process.env.ARM_OIDC_TOKEN) {
      // Log in as service principal in CI
      const clientId = requireEnvVar("AZURE_CLIENT_ID");
      const tenantId = requireEnvVar("AZURE_TENANT_ID");
      const oidc = requireEnvVar("ARM_OIDC_TOKEN");
      console.log("Logging in with OIDC token");
      runCommand(
        "az",
        `login --service-principal -u ${clientId} --federated-token ${oidc} --tenant ${tenantId}`,
      );
      console.log("Logged in with OIDC token");
    }

    runCommand("az", `account set --subscription ${subscriptionId}`);

    const command = `${azPath} container exec -g ${resourceGroup} -n ${containerInstanceName} --exec-command 'node /app/index.js --identity-type user'`;
    const output = runCommand("script -q -c", `"${command}"`);
    console.log("Container execution output:", output);
    assert.include(
      output,
      "ManagedIdentity: Successfully authenticated with storage",
      `Expected ${output} to include a ManagedIdentity success message`,
    );
  });
});

function runCommand(command: string, args: string = ""): string {
  return execSync(`${command} ${args}`).toString().trim();
}
function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
