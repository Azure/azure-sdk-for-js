// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env } from "@azure-tools/test-recorder";
import { ClientAssertionCredential } from "../../../src";
import { Context } from "mocha";
import Sinon from "sinon";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { ConfidentialClientApplication } from "@azure/msal-node";
import * as tls from "tls";
import * as net from "net";
import * as fs from "fs";
import * as uuid from "uuid";
import * as crypto from "crypto";

describe("ClientAssertionCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");
    doGetTokenSpy = Sinon.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    );
  });
  afterEach(async function () {
    await cleanup();
    Sinon.restore();
  });

  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new ClientAssertionCredential(
        undefined as any,
        env.AZURE_CLIENT_ID ?? "client",
        async () => "assertion"
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(
        env.AZURE_TENANT_ID ?? "tenant",
        undefined as any,
        async () => "assertion"
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(
        env.AZURE_TENANT_ID ?? "tenant",
        env.AZURE_CLIENT_ID ?? "client",
        undefined as any
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(undefined as any, undefined as any, undefined as any);
    } catch (e: any) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientAssertionCredential: tenantId, clientId, and clientAssertion are required parameters."
      );
    });
  });

  it("Sends the expected parameters", async function () {
    const tenantId = env.AZURE_TENANT_ID ?? "tenant";
    const clientId = env.AZURE_CLIENT_ID ?? "client";
    const certificatePath = env.AZURE_CLIENT_CERTIFICATE_PATH ?? "certificate-path";
    const authorityHost = `https://login.microsoftonline.com/${tenantId}`;

    async function getAssertion(): Promise<string> {
      const jwt = await createJWTTokenFromCertificate(authorityHost, clientId, certificatePath);
      return jwt;
    }
    const credential = new ClientAssertionCredential(tenantId, clientId, getAssertion);

    try {
      await credential.getToken("https://vault.azure.net/.default");
    } catch (e: any) {
      // We're ignoring errors since our main goal here is to ensure that we send the correct parameters to MSAL.
      console.log("error", e);
    }

    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    // TODO: you can test if this matches
    // const returnedAssertion = await getAssertion();
    // const sentConfiguration = doGetTokenSpy.args[0][0];
    // assert.equal(sentConfiguration.clientAssertion, "assertion");
  });
});

async function createJWTTokenFromCertificate(
  authorityHost: string,
  clientId: string,
  certificatePath: string
) {
  const pemCert = fs.readFileSync(certificatePath);
  const audience = `${authorityHost}/v2`;
  const secureContext = tls.createSecureContext({
    cert: pemCert,
  });

  const secureSocket = new tls.TLSSocket(new net.Socket(), { secureContext });

  const cert = secureSocket.getCertificate() as tls.PeerCertificate;
  const headerJSON = {
    typ: "JWT",
    alg: "RS256",
    x5t: Buffer.from(cert.fingerprint256, "hex").toString("base64"),
  };
  secureSocket.destroy();
  const currentDate = new Date("2022-07-01T23:28:35.248Z");
  const payloadJSON = {
    jti: uuid.v4(),
    aud: audience,
    iss: clientId,
    sub: clientId,
    nbf: Math.floor(+currentDate / 1000),
    exp: addMinutes(currentDate, 30),
  };
  const headerBuffer = Buffer.from(JSON.stringify(headerJSON), "utf-8");
  const headerString = headerBuffer.toString("base64");
  const payloadBuffer = Buffer.from(JSON.stringify(payloadJSON), "utf-8");
  const payloadString = payloadBuffer.toString("base64");
  const flattenedJws = headerString + "." + payloadString;
  // TODO : sign like the .NET equivalent
  // const pki = forge.pki;
  // const privateKey = pki.privateKeyFromPem(pemCert.toString());
  // const signature = privateKey.sign(flattenedJws,"sha256");
  // clientCertificate.GetRSAPrivateKey().SignData(Encoding.ASCII.GetBytes(flattenedJws), HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
  const signatureAlg = crypto.createSign("sha256");
  signatureAlg.update(flattenedJws);
  const signature = signatureAlg.sign(pemCert.toString());
  return flattenedJws + "." + signature.toString("base64");
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}
