// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import * as path from "path";

import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, env } from "@azure-tools/test-recorder";

import { ClientCertificateCredential } from "../../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { parseCertificate } from "../../../src/credentials/clientCertificateCredential";

const ASSET_PATH = "assets";

describe("ClientCertificateCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    await recorder.setMatcher("BodilessMatcher");
  });

  afterEach(async function () {
    await cleanup();
  });

  const certificatePath = path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function () {
    let errors: Error[] = [];
    try {
      new ClientCertificateCredential(undefined as any, env.AZURE_CLIENT_ID!, {
        certificatePath: env.AZURE_CLIENT_CERTIFICATE_PATH!,
      });
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, undefined as any, {
        certificatePath: env.AZURE_CLIENT_CERTIFICATE_PATH!,
      });
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(undefined as any, undefined as any, undefined as any);
    } catch (e: any) {
      errors.push(e);
    }
    assert.equal(errors.length, 3);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientCertificateCredential: tenantId and clientId are required parameters.",
      );
    });

    errors = [];
    try {
      // If configuration object is undefined. Relevant for JavaScript.
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, undefined as any);
    } catch (e: any) {
      errors.push(e);
    }
    try {
      // If configuration object is empty.
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, {} as any);
    } catch (e: any) {
      errors.push(e);
    }
    assert.equal(errors.length, 2);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientCertificateCredential: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.",
      );
    });

    let error: unknown;
    try {
      // If both values are provided. Relevant for JavaScript.
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, {
        certificatePath: "some/path",
        certificate: "certificate-value",
      } as any);
    } catch (e: any) {
      error = e;
    }
    assert.ok(error);
    assert.equal(
      (error as Error).message,
      "ClientCertificateCredential: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.",
    );
  });

  it("throws when given a file that doesn't contain a PEM-formatted certificate", async function (this: Context) {
    const fullPath = path.resolve("./clientCertificateCredential.spec.ts");
    const credential = new ClientCertificateCredential("tenant", "client", {
      certificatePath: fullPath,
    });

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (_error: any) {
      error = _error;
    }

    assert.ok(error);
    assert.deepEqual(error?.message, `ENOENT: no such file or directory, open '${fullPath}'`);
  });

  it("throws when given a certificate that isn't PEM-formatted", async function (this: Context) {
    const credential = new ClientCertificateCredential("tenant", "client", {
      certificate: "not-pem-formatted",
    });

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (_error: any) {
      error = _error;
    }

    assert.ok(error);
    assert.deepEqual(
      error?.message,
      `The file at the specified path does not contain a PEM-encoded certificate.`,
    );
  });

  describe("parseCertificate", function () {
    it("includes the x5c value when sendCertificateChain is true", async function () {
      const result = await parseCertificate(
        {
          certificatePath,
        },
        true,
      );
      assert.isNotEmpty(result.x5c);
      assert.strictEqual(result.x5c, result.certificateContents);
    });

    it("omits the x5c value when sendCertificateChain is false", async function () {
      const result = await parseCertificate(
        {
          certificatePath,
        },
        false,
      );
      assert.isUndefined(result.x5c);
    });
  });
});
