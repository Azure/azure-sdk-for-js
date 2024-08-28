// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { env, Recorder, isRecordMode } from "@azure-tools/test-recorder";

import { CertificateClient } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Certificates client - list certificates in various ways", () => {
  const prefix = `list${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert",
  };

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  // Use this while recording to make sure the target keyvault is clean.
  // The next tests will produce a more consistent output.
  // This test is only useful while developing locally.
  // WARNING: When TEST_MODE equals "record", all of the certificates in the indicated KEYVAULT_NAME will be deleted as part of this test.
  it.skipIf(!isRecordMode())("can purge all certificates", async function (): Promise<void> {
    for await (const certificate of client.listPropertiesOfCertificates({
      includePending: true,
    })) {
      try {
        await testClient.flushCertificate(certificate.name!);
      } catch (e: any) {
        // Nothing to do here
      }
    }
    for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
      try {
        await testClient.purgeCertificate(certificate.name!);
      } catch (e: any) {
        // Nothing to do here
      }
    }
  });

  it("can list certificates", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(
        name,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await createPoller.pollUntilDone();
    }

    let found = 0;
    for await (const certificate of client.listPropertiesOfCertificates({ includePending: true })) {
      // The vault might contain more certificates than the ones we inserted.
      if (!certificateNames.includes(certificate.name!)) continue;
      found += 1;
    }

    expect(found).toEqual(2);
  });

  it("can list deleted certificates", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(
        name,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await createPoller.pollUntilDone();
    }
    for (const name of certificateNames) {
      const deletePoller = await client.beginDeleteCertificate(name, testPollerProperties);
      await deletePoller.pollUntilDone();
    }

    let found = 0;
    for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
      // The vault might contain more certificates than the ones we inserted.
      if (!certificateNames.includes(certificate.properties.name!)) continue;
      found += 1;
    }

    expect(found).toEqual(2);

    for (const name of certificateNames) {
      await testClient.purgeCertificate(name);
    }
  });

  it("can list certificates by page", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(
        name,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await createPoller.pollUntilDone();
    }
    let found = 0;
    for await (const page of client
      .listPropertiesOfCertificates({ includePending: true })
      .byPage()) {
      for (const certificate of page) {
        // The vault might contain more certificates than the ones we inserted.
        if (!certificateNames.includes(certificate.name!)) continue;
        found += 1;
      }
    }
    expect(found).toEqual(2);
  });

  it("can list deleted certificates by page", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(
        name,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await createPoller.pollUntilDone();
    }
    for (const name of certificateNames) {
      const deletePoller = await client.beginDeleteCertificate(name, testPollerProperties);
      await deletePoller.pollUntilDone();
    }

    let found = 0;
    for await (const page of client.listDeletedCertificates({ includePending: true }).byPage()) {
      for (const deleteCertificate of page) {
        // The vault might contain more certificates than the ones we inserted.
        if (!certificateNames.includes(deleteCertificate.properties.name!)) continue;
        found += 1;
      }
    }
    expect(found).toEqual(2);
    for (const name of certificateNames) {
      await testClient.purgeCertificate(name);
    }
  });

  it("can retrieve all versions of a certificate", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

    const certificateTags = ["tag01", "tag02", "tag03"];

    interface VersionTagPair {
      // version: string;
      tag: string;
    }

    const versions: VersionTagPair[] = [];
    for (const tag of certificateTags) {
      // One can't re-create a certificate while it's pending,
      // so we're retrying until Azure allows us to do this.
      const createPoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        {
          ...testPollerProperties,
          tags: { tag },
          enabled: true,
        },
      );
      const response = await createPoller.pollUntilDone();
      // Versions don't match. Something must be happening under the hood.
      // versions.push({ version: response.version!, tag: response.properties.tags!.tag });
      versions.push({ tag: response.properties.tags!.tag });
    }

    const results: VersionTagPair[] = [];
    for await (const item of client.listPropertiesOfCertificateVersions(certificateName, {})) {
      const version = item.version!;
      const certificate = await client.getCertificateVersion(certificateName, version);
      // Versions don't match. Something must be happening under the hood.
      // results.push({ version: item.properties.version!, tag: certificate.properties.tags!.tag! });
      results.push({ tag: certificate.properties.tags!.tag! });
    }

    const comp = (a: VersionTagPair, b: VersionTagPair): number => a.tag.localeCompare(b.tag);
    results.sort(comp);
    versions.sort(comp);

    expect(results).to.deep.equal(versions);
  });

  it("can list certificate versions (non existing)", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    let totalVersions = 0;
    for await (const page of client.listPropertiesOfCertificateVersions(certificateName).byPage()) {
      for (const version of page) {
        expect(version.name).toEqual(certificateName);
        totalVersions += 1;
      }
    }
    expect(totalVersions).toEqual(0);
  });
});
