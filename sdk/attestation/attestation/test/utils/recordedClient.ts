// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  AttestationAdministrationClient,
  AttestationClient,
  AttestationClientOptions,
} from "../../src/";
import "./env";
import { pemFromBase64 } from "../utils/helpers";

const envSetupForPlayback: { [k: string]: string } = {
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
  ATTESTATION_ISOLATED_SIGNING_KEY: "isolated_signing_key",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export type EndpointType = "AAD" | "Isolated" | "Shared";

export function getAttestationUri(endpointType: EndpointType): string {
  switch (endpointType) {
    case "AAD": {
      return assertEnvironmentVariable("ATTESTATION_AAD_URL");
    }
    case "Isolated": {
      return assertEnvironmentVariable("ATTESTATION_ISOLATED_URL");
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
  const signingCert = assertEnvironmentVariable("ATTESTATION_ISOLATED_SIGNING_CERTIFICATE");

  const pemCert = pemFromBase64(signingCert, "CERTIFICATE");

  const signingKey = assertEnvironmentVariable("ATTESTATION_ISOLATED_SIGNING_KEY");
  const pemKey = pemFromBase64(signingKey, "PRIVATE KEY");

  return { privateKey: pemKey, certificate: pemCert };
}

// Note that the AttestationClient does not require authentication.
export function createRecordedClient(
  recorder: Recorder,
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
        expectedIssuer: getAttestationUri(endpointType),
      },
    };
  }
  if (authenticatedClient) {
    const attClient = new AttestationClient(
      getAttestationUri(endpointType),
      createTestCredential(),
      recorder.configureClientOptions(options)
    );
    return attClient;
  }
  const attClient = new AttestationClient(
    getAttestationUri(endpointType),
    recorder.configureClientOptions(options)
  );
  return attClient;
}

export function createRecordedAdminClient(
  recorder: Recorder,
  endpointType: EndpointType,
  options?: AttestationClientOptions
): AttestationAdministrationClient {
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
        expectedIssuer: getAttestationUri(endpointType),
      },
    };
  }
  const adminClient = new AttestationAdministrationClient(
    getAttestationUri(endpointType),
    createTestCredential(),
    recorder.configureClientOptions(options)
  );
  return adminClient;
}
