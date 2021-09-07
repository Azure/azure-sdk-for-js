// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Commented code in this file can be uncommented once batch is managed by rush and starts using the recorder

// import { Context } from "mocha";

// import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
// import { TokenCredential, ClientSecretCredential } from "@azure/identity";

import "./env";
import { BatchServiceClient } from "../../src/batchServiceClient";
import { AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import { BatchSharedKeyCredentials } from "../../src/batchSharedKeyCredentials";

// const replaceableVariables: { [k: string]: string } = {
//   AZURE_CLIENT_ID: "azure_client_id",
//   AZURE_CLIENT_SECRET: "azure_client_secret",
//   AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
//   AZURE_BATCH_ACCESS_KEY: "api_key",
//   AZURE_BATCH_ACCOUNT:"batch_account",
//   AZURE_BATCH_ENDPOINT: "https://endpoint"
// };

// export const environmentSetup: RecorderEnvironmentSetup = {
//   replaceableVariables,
//   customizationsOnRecordings: [
//     (recording: string): string =>
//       recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
//     // If we put ENDPOINT in replaceableVariables above, it will not capture
//     // the endpoint string used with nock, which will be expanded to
//     // https://<endpoint>:443/ and therefore will not match, so we have to do
//     // this instead.
//     (recording: string): string => {
//       const replaced = recording.replace("endpoint:443", "endpoint");
//       return replaced;
//     }
//   ],
//   queryParametersToSkip: []
// };

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(
  authMethod: AuthMethod,
  options?: AzureServiceClientOptions
): BatchServiceClient {
  let credential: BatchSharedKeyCredentials;
  switch (authMethod) {
    case "APIKey": {
      credential = new BatchSharedKeyCredentials(
        process.env.AZURE_BATCH_ACCOUNT!,
        process.env.AZURE_BATCH_ACCESS_KEY!
      );
      break;
    }
    case "AAD": {
      throw new Error("AAD is not supported");
      // credential = new ClientSecretCredential(
      //   process.env.AZURE_TENANT_ID!,
      //   process.env.AZURE_CLIENT_ID!,
      //   process.env.AZURE_CLIENT_SECRET!
      // );
      // break;
    }
    case "DummyAPIKey": {
      credential = new BatchSharedKeyCredentials("whatever", "whatever");
      break;
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
  return new BatchServiceClient(
    credential,
    process.env.AZURE_BATCH_ENDPOINT || "https://dummy.eastus.batch.azure.com",
    options
  );
}

// /**
//  * creates the recorder and reads the environment variables from the `.env` file.
//  * Should be called first in the test suite to make sure environment variables are
//  * read before they are being used.
//  */
// export function createRecorder(context: Context): Recorder {
//   return record(context, environmentSetup);
// }
