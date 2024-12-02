// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "./env.js";

import type { AccessControlRestClient } from "../../../src/index.js";
import AccessControlClient from "../../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";

import type { ClientOptions } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  ENDPOINT: "https://testaccount.dev.azuresynapse.net",
};

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<AccessControlRestClient> {
  await recorder.start({
    envSetupForPlayback: replaceableVariables,
    removeCentralSanitizers: [
      "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    ],
  });

  const credential: TokenCredential = createTestCredential();
  const client = AccessControlClient(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ ...options, allowInsecureConnection: true }),
  );
  return client;
}

export function getWorkspaceName(): string {
  const url: string = env.ENDPOINT ?? "";
  // eslint-disable-next-line no-useless-escape
  const matches = url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/) ?? [];

  if (matches.length < 2) {
    throw new Error(`Could not extract workspace name from the environment ENDPOINT`);
  }

  const parts = matches[1].split(".");
  console.log(parts[0]);
  return `workspaces/${parts[0]}`;
}
