// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "node:fs";
import * as net from "node:net";
import * as tls from "node:tls";

import jwt from "jsonwebtoken";
import ms from "ms";
import { randomUUID } from "@azure/core-util";

export async function createJWTTokenFromCertificate(
  authorityHost: string,
  clientId: string,
  certificatePath: string,
): Promise<string> {
  console.log("client ID =", clientId);
  const privateKeyPemCert = fs.readFileSync(certificatePath);
  const audience = `${authorityHost}/v2.0`;
  const secureContext = tls.createSecureContext({
    cert: privateKeyPemCert,
  });
  const secureSocket = new tls.TLSSocket(new net.Socket(), { secureContext });
  const cert = secureSocket.getCertificate() as tls.PeerCertificate;
  secureSocket.destroy();
  const signedCert = jwt.sign({}, privateKeyPemCert, {
    header: {
      alg: "RS256",
      typ: "JWT",
      x5t: Buffer.from(cert.fingerprint256, "hex").toString("base64"),
    },
    algorithm: "RS256",
    audience: audience,
    jwtid: randomUUID(),
    expiresIn: ms("1 h"),
    subject: clientId,
    issuer: clientId,
  });
  return signedCert;
}
