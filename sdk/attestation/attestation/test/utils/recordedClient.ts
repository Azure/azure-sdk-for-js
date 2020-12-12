// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { EnvironmentCredential } from "@azure/identity";

import { assert } from "chai";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { AttestationClient, AttestationClientOptionalParams } from "../../src/";

import { decode, verify } from "jsonwebtoken";
//import { Certificate } from '@fidm/x509';
//import { ASN1 } from '@fidm/asn1';

dotenv.config();

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

export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

type EndpointType = "AAD" | "Isolated" | "Shared";

export function createRecordedClient(
  endpointType: EndpointType,
  options?: AttestationClientOptionalParams
): AttestationClient {
  const credential = new EnvironmentCredential();
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

export async function verifyAttestationToken(
  attestationToken: string,
  client: AttestationClient
): Promise<any | undefined> {
  var decoded = decode(attestationToken, { complete: true, json: true });

  assert(decoded);
  var keyId;
  if (decoded?.header) {
    assert(decoded.header.alg != "none");
    assert(decoded.header.typ == "JWT");
    assert(decoded.header.jku == client.instanceUrl + "/certs");
    keyId = decoded.header.kid;
  }

  var signingCerts = await client.signingCertificates.get();
  var signingCertx5C;
  if (signingCerts?.keys) {
    assert(signingCerts.keys?.length > 0);
    for (var key of signingCerts.keys) {
      if (key.kid == keyId) {
        signingCertx5C = key.x5C;
      }
    }
    if (signingCertx5C != null) {
      //      var berCertificate = Buffer.from(signingCertx5C[0], "base64");
      //      console.log(berCertificate);
      //      let cert : Certificate;
      //      var asn1 = ASN1.fromDER(berCertificate);
      //      cert = new Certificate(asn1);
      //      console.log(cert);

      // Convert the inbound certificate to PEM format so the verify function is happy.dir dist
      let pemCert: string;
      pemCert = "-----BEGIN CERTIFICATE-----\r\n";
      pemCert += signingCertx5C[0];
      pemCert += "\r\n-----END CERTIFICATE-----\r\n";

      return verify(attestationToken, pemCert, { algorithms: ["RS256"] });
    }
  }

  return decoded?.payload;
}
