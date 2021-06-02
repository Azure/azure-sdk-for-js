// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { ClientSecretCredential } from "@azure/identity";
import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { 
  AttestationClient, 
  AttestationClientOptions, 
  AttestationAdministrationClient, 
  AttestationSigningKey
} from "../../src/";
import "./env";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  ATTESTATION_LOCATION_SHORT_NAME: "wus",
  ISOLATED_ATTESTATION_URL: "https://isolated_attestation_url.wus.attest.azure.net",
  AAD_ATTESTATION_URL: "https://aad_attestation_url.wus.attest.azure.net",
  policySigningCertificate0: "policy_signing_certificate0",
  policySigningCertificate1: "policy_signing_certificate1",
  policySigningCertificate2: "policy_signing_certificate2",
  ATTESTATION_ISOLATED_SIGNING_CERTIFICATE: "isolated_signing_certificate",
  ATTESTATION_ISOLATED_SIGNING_KEY: "isolated_signing_key",
};

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
      const replaced = recording
        .replace("aad_attestation_url:443", "aad_attestation_url")
        .replace("isolated_attestation_url:443", "isolated_attestation_url");
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

export type EndpointType = "AAD" | "Isolated" | "Shared";

export function getAttestationUri(endpointType: EndpointType) : string{
  switch (endpointType) {
    case "AAD": {
      return  env.AAD_ATTESTATION_URL;
    }
    case "Isolated": {
      return env.ISOLATED_ATTESTATION_URL;
    }
    case "Shared": {
      return "https://shared" + env.ATTESTATION_LOCATION_SHORT_NAME + "." + env.ATTESTATION_LOCATION_SHORT_NAME + ".attest.azure.net";
    }
    default: {
      throw new Error(`Unsupported endpoint type: ${endpointType}`);
    }
  }
}

export function getIsolatedSigningKey() : AttestationSigningKey {
  const signingCert = env.ATTESTATION_ISOLATED_SIGNING_CERTIFICATE;

  let pemCert = "-----BEGIN CERTIFICATE-----\r\n";
  pemCert += signingCert + "\r\n";
  pemCert += "\r\n-----END CERTIFICATE-----\r\n";

  const signingKey = env.ATTESTATION_ISOLATED_SIGNING_KEY;
  let pemKey = "-----BEGIN PRIVATE KEY-----\r\n";
  pemKey += signingKey + "\r\n";
  pemKey += "-----END PRIVATE KEY-----\r\n";

  return new AttestationSigningKey(pemKey, pemCert);
}

export function createRecordedClient(
  endpointType: EndpointType,
  options?: AttestationClientOptions
): AttestationClient {
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  return new AttestationClient(credential, getAttestationUri(endpointType), options);
}

export function createRecordedAdminClient(
  endpointType: EndpointType,
  options?: AttestationClientOptions
): AttestationAdministrationClient {
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );
  return new AttestationAdministrationClient(credential, getAttestationUri(endpointType), options);
}
