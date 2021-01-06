// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { ClientSecretCredential } from "@azure/identity";
import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { AttestationClient, AttestationClientOptionalParams } from "../../src/";

//import { Certificate } from '@fidm/x509';
//import { ASN1 } from '@fidm/asn1';

dotenv.config();

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
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

export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

type EndpointType = "AAD" | "Isolated" | "Shared";

export function createRecordedClient(
  endpointType: EndpointType,
  options?: AttestationClientOptionalParams
): AttestationClient {
  const credential = new ClientSecretCredential(
    testEnv.AZURE_TENANT_ID,
    testEnv.AZURE_CLIENT_ID,
    testEnv.AZURE_CLIENT_SECRET
  );
  switch (endpointType) {
    case "AAD": {
      return new AttestationClient(credential, testEnv.AAD_ATTESTATION_URL, options);
    }
    case "Isolated": {
      return new AttestationClient(credential, testEnv.ISOLATED_ATTESTATION_URL, options);
    }
    case "Shared": {
      return new AttestationClient(credential, "https://shareduks.uks.attest.azure.net", options);
    }
    default: {
      throw new Error(`Unsupported endpoint type: ${endpointType}`);
    }
  }
}
