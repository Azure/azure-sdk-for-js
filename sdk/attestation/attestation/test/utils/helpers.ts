// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import { assert } from "chai";

import { AttestationSigner } from "../../src/";

import { decode } from "./decodeJWT";

import { EndpointType, getAttestationUri } from "./recordedClient";

export function decodeJWT(
  attestationToken: string,
  instanceUri: string
): {
  [key: string]: any;
} {
  const decoded = decode(attestationToken, { complete: true, json: true });
  if (decoded?.header) {
    assert.notEqual(decoded.header.alg, "none");
    assert.equal(decoded.header.typ, "JWT");
    assert.equal(decoded.header.jku, instanceUri + "/certs");
    return decoded;
  }
  throw new Error(`decoded token did not have header: ${decoded}`);
}

export async function verifyAttestationToken(
  attestationToken: string,
  signers: AttestationSigner[],
  endpointType: EndpointType
): Promise<{
  [key: string]: any;
}> {
  const decoded = decodeJWT(attestationToken, getAttestationUri(endpointType));
  const keyId = decoded?.header.kid;

  let signingCert: string[] = [];
  for (const key of signers) {
    if (key.keyId === keyId) {
      signingCert = key.certificates;
    }
  }
  if (signingCert.length) {
    // Convert the inbound certificate to PEM format so the verify function is happy.

    const pubKeyObj = jsrsasign.KEYUTIL.getKey(signingCert[0]);
    const isValid = jsrsasign.KJUR.jws.JWS.verifyJWT(attestationToken, pubKeyObj, {
      iss: [getAttestationUri(endpointType)],
      alg: ["RS256"]
    });
    if (!isValid) {
      throw new Error(`Verification failed! token: ${JSON.stringify(decoded)}`);
    }
  }
  return decoded.payload;
}
