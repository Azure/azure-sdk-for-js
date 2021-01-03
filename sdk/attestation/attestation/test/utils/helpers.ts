// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { AttestationClient } from "../../src/";

import { decode, verify } from "jsonwebtoken";


export async function verifyAttestationToken(
  attestationToken: string,
  client: AttestationClient
): Promise<any | undefined> {
  const decoded = decode(attestationToken, { complete: true, json: true });

  assert(decoded);
  let keyId;
  if (decoded?.header) {
    assert.notEqual(decoded.header.alg, "none");
    assert.equal(decoded.header.typ, "JWT");
    assert.equal(decoded.header.jku, client.instanceUrl + "/certs");
    keyId = decoded.header.kid;
  }

  const signingCerts = await client.signingCertificates.get();
  let signingCertx5C;
  if (signingCerts?.keys) {
    assert(signingCerts.keys?.length > 0);
    for (const key of signingCerts.keys) {
      if (key.kid == keyId) {
        signingCertx5C = key.x5C;
      }
    }
    if (signingCertx5C !== null && signingCertx5C !== undefined) {
      // Convert the inbound certificate to PEM format so the verify function is happy.dir dist
      let pemCert: string;
      pemCert = "-----BEGIN CERTIFICATE-----\r\n";
      pemCert += signingCertx5C[0];
      pemCert += "\r\n-----END CERTIFICATE-----\r\n";

      return verify(attestationToken, pemCert, {
        algorithms: ["RS256"],
        ignoreExpiration: true,
        clockTolerance: 10,
        issuer: client.instanceUrl
      });
    }
  }

  return decoded?.payload;
}
