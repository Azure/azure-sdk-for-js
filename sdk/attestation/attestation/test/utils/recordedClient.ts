// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { ClientSecretCredential } from "@azure/identity";
import {
  env,
  Recorder,
  record,
  RecorderEnvironmentSetup,
  isPlaybackMode
} from "@azure-tools/test-recorder";

import {
  AttestationClient,
  AttestationClientOptions,
  AttestationAdministrationClient
} from "../../src/";
import "./env";
import { pemFromBase64 } from "../utils/helpers";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  ATTESTATION_LOCATION_SHORT_NAME: "wus",
  ATTESTATION_ISOLATED_URL: "https://isolated_attestation_url.wus.attest.azure.net",
  ATTESTATION_AAD_URL: "https://aad_attestation_url.wus.attest.azure.net",
  policySigningCertificate0: "policy_signing_certificate0",
  policySigningCertificate1: "policy_signing_certificate1",
  policySigningCertificate2: "policy_signing_certificate2",
  ATTESTATION_ISOLATED_SIGNING_CERTIFICATE: "isolated_signing_certificate",
  ATTESTATION_ISOLATED_SIGNING_KEY: "isolated_signing_key"
};

const environmentSetup: RecorderEnvironmentSetup = {
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

export function getAttestationUri(endpointType: EndpointType): string {
  switch (endpointType) {
    case "AAD": {
      return env.ATTESTATION_AAD_URL;
    }
    case "Isolated": {
      return env.ATTESTATION_ISOLATED_URL;
    }
    case "Shared": {
      return (
        "https://shared" +
        env.ATTESTATION_LOCATION_SHORT_NAME +
        "." +
        env.ATTESTATION_LOCATION_SHORT_NAME +
        ".attest.azure.net"
      );
    }
    default: {
      throw new Error(`Unsupported endpoint type: ${endpointType}`);
    }
  }
}

export function getIsolatedSigningKey(): { privateKey: string; certificate: string } {
  const signingCert = env.ATTESTATION_ISOLATED_SIGNING_CERTIFICATE;

  const pemCert = pemFromBase64(signingCert, "CERTIFICATE");

  const signingKey = env.ATTESTATION_ISOLATED_SIGNING_KEY;
  const pemKey = pemFromBase64(signingKey, "PRIVATE KEY");

  return { privateKey: pemKey, certificate: pemCert };
}

// Note that the AttestationClient does not require authentication.
export function createRecordedClient(
  endpointType: EndpointType,
  authenticatedClient?: boolean,
  options?: AttestationClientOptions
): AttestationClient {
  // If we're talking to a live server, we should validate the time results,
  // otherwise we want to skip them.
  if (options === undefined) {
    options = {
      validationOptions: {
        validateToken: true,
        validateExpirationTime: !isPlaybackMode(),
        validateNotBeforeTime: !isPlaybackMode(),
        validateIssuer: !isPlaybackMode(),
        timeValidationSlack: 10, // 10 seconds slack in validation time.
        expectedIssuer: getAttestationUri(endpointType)
      }
    };
  }
  if (authenticatedClient !== undefined && authenticatedClient) {
    const credentials = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
    return new AttestationClient(getAttestationUri(endpointType), credentials, options);
  }
  return new AttestationClient(getAttestationUri(endpointType), options);
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

  // If we're talking to a live server, we should validate the time results,
  // otherwise we want to skip them.
  if (options === undefined) {
    options = {
      validationOptions: {
        validateToken: true,
        validateExpirationTime: !isPlaybackMode(),
        validateNotBeforeTime: !isPlaybackMode(),
        timeValidationSlack: 10, // 10 seconds slack in validation time.
        validateIssuer: !isPlaybackMode(),
        expectedIssuer: getAttestationUri(endpointType)
      }
    };
  }
  return new AttestationAdministrationClient(getAttestationUri(endpointType), credential, options);
}
