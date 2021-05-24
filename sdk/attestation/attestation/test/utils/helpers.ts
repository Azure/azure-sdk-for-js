// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { AttestationClient } from "../../src/";

import * as jsrsasign from "jsrsasign"; // works in the browser

import { decode } from "./decodeJWT";

import { encodeByteArray } from "./base64url"

export function decodeJWT(
  attestationToken: string,
  client: AttestationClient
): {
  [key: string]: any;
} {
  const decoded = decode(attestationToken, { complete: true, json: true });
  if (decoded?.header) {
    assert.notEqual(decoded.header.alg, "none");
    assert.equal(decoded.header.typ, "JWT");
    assert.equal(decoded.header.jku, client.instanceUrl + "/certs");
    return decoded;
  }
  throw new Error(`decoded token did not have header: ${decoded}`);
}

export async function verifyAttestationToken(
  attestationToken: string,
  client: AttestationClient
): Promise<{
  [key: string]: any;
}> {
  const decoded = decodeJWT(attestationToken, client);
  const keyId = decoded?.header.kid;

  const signingCerts = await client.getAttestationSigners();
  let signingCert;
  assert(signingCerts.length > 0);
  for (const key of signingCerts) {
    if (key.keyId === keyId) {
      signingCert = key.certificates;
    }
  }
  if (signingCert) {
    // Convert the inbound certificate to PEM format so the verify function is happy.
    let pemCert: string;
    pemCert = "-----BEGIN CERTIFICATE-----\r\n";
    pemCert += encodeByteArray(signingCert[1]);
    pemCert += "\r\n-----END CERTIFICATE-----\r\n";

    const pubKeyObj = jsrsasign.KEYUTIL.getKey(pemCert);
    const isValid = jsrsasign.KJUR.jws.JWS.verifyJWT(
      attestationToken,
      pubKeyObj as jsrsasign.RSAKey,
      {
        iss: [client.instanceUrl],
        alg: ["RS256"]
      }
    );
    if (!isValid) {
      throw new Error(`Verification failed! token: ${JSON.stringify(decoded)}`);
    }
  }
  return decoded.payload;
}
