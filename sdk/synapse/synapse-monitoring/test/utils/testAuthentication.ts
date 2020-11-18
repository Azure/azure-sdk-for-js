import { ClientSecretCredential } from "@azure/identity";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { MonitoringClient } from "../../src";
import { uniqueString } from "./recorderUtils";
import { getWorkspaceName } from "./utils.common";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export async function authenticate(that: any): Promise<any> {
  const secretSuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      WORKSPACE_NAME: "workspace_name",
      SPARKPOOL_NAME: "sparkpool_name"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any =>
        secretSuffix === "" ? recording : recording.replace(new RegExp(secretSuffix, "g"), "")
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = await new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const workspaceName = getWorkspaceName();
  const workspaceEndpoint = `https://${workspaceName}.dev.azuresynapse.net`;
  const client = new MonitoringClient(workspaceEndpoint, credential);

  return { recorder, client, secretSuffix };
}
