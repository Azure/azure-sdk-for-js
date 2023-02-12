// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs/promises";
import * as jwt from "jsonwebtoken";
import * as net from "net";
import * as os from "os";
import * as path from "path";
import * as tls from "tls";
import { msalNodeTestSetup, MsalTestCleanup } from "../../msalTestUtils";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Context } from "mocha";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import Sinon from "sinon";
import { WorkloadIdentityCredential } from "../../../src/credentials/workloadIdentityCredential";
import { assert } from "chai";
import { env } from "@azure-tools/test-recorder";
import ms from "ms";
import { v4 as uuid } from "uuid";

describe("WorkloadIdentityCredential (internal)", () => {
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
      new WorkloadIdentityCredential(undefined as any, env.AZURE_CLIENT_ID ?? "client", "file.txt");
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new WorkloadIdentityCredential(env.AZURE_TENANT_ID ?? "tenant", undefined as any, "file.txt");
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new WorkloadIdentityCredential(
        env.AZURE_TENANT_ID ?? "tenant",
        env.AZURE_CLIENT_ID ?? "client",
        undefined as any
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new WorkloadIdentityCredential(undefined as any, undefined as any, undefined as any);
    } catch (e: any) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "WorkloadIdentityCredential: tenantId, clientId, and federatedTokenFilePath are required parameters."
      );
    });
  });

  it("should send the correct parameters", async () => {
    const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;
    const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;
    const certificatePath = env.IDENTITY_SP_CERT_PEM || path.join("assets", "fake-cert.pem");
    const authorityHost = `https://login.microsoftonline.com/${tenantId}`;

    const jwtoken = await createJWTTokenFromCertificate(authorityHost, clientId, certificatePath);
    const filePath = path.join(os.tmpdir(), "jwt.txt");
    await fs.writeFile(filePath, jwtoken, { encoding: "utf-8" });

    const credential = new WorkloadIdentityCredential(tenantId, clientId, filePath);

    try {
      await credential.getToken("https://vault.azure.net/.default");
    } catch (e: any) {
      // We're ignoring errors since our main goal here is to ensure that we send the correct parameters to MSAL.
      console.log("error", e);
    }

    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);
  });
});

async function createJWTTokenFromCertificate(
  authorityHost: string,
  clientId: string,
  certificatePath: string
): Promise<string> {
  const privateKeyPemCert = await fs.readFile(certificatePath);
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
    jwtid: uuid(),
    expiresIn: ms("1 h"),
    subject: clientId,
    issuer: clientId,
  });
  return signedCert;
}
