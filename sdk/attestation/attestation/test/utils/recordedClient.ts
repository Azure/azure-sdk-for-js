// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { AttestationClient, AttestationClientOptionalParams } from "../../src/";

dotenv.config();

export interface RecordedClient {
  client: AttestationClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  ISOLATED_ATTESTATION_URL: "isolated_attestation_url",
  AAD_ATTESTATION_URL: "aad_attestation_url",
  policySigningCertificate0: "policy_signing_certificate0",
  policySigningCertificate1: "policy_signing_certificate1",
  policySigningCertificate2: "policy_signing_certificate2",
  isolatedSigningCertificate: "isolated_signing_certificate"
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace("endpoint:443", "endpoint");
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

type EndpointType = "AAD" | "Isolated";

export function createRecordedClient(
  context: Context,
  endpointType: EndpointType,
  options?: AttestationClientOptionalParams
): RecordedClient {
  const recorder = record(context, environmentSetup);

  switch (endpointType) {
    case "AAD": {
      return {
        client: new AttestationClient(testEnv.AAD_ATTESTATION_URL, options),
        recorder
      };
    }
    case "Isolated": {
      return {
        client: new AttestationClient(testEnv.ISOLATED_ATTESTATION_URL, options),
        recorder
      };
    }
    default: {
      throw new Error(`Unsupported endpoint type: ${endpointType}`);
    }
  }
}
