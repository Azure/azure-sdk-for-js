// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import * as assert from "assert";
import { env, isPlaybackMode, Recorder, isRecordMode } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";

import { CertificateClient } from "../../src";
import { assertThrowsAbortError } from "../utils/utils.common";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

const { expect } = chai;

describe("Certificates client - list certificates in various ways", () => {
  const prefix = `list${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert"
  };

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  // Use this while recording to make sure the target keyvault is clean.
  // The next tests will produce a more consistent output.
  // This test is only useful while developing locally.
  it("can purge all certificates", async function(): Promise<void> {
    // WARNING: When TEST_MODE equals "record", all of the certificates in the indicated KEYVAULT_NAME will be deleted as part of this test.
    if (!isRecordMode()) {
      return this.skip();
    }
    for await (const certificate of client.listPropertiesOfCertificates({
      includePending: true
    })) {
      try {
        await testClient.flushCertificate(certificate.name!);
      } catch (e) {
        // Nothing to do here
      }
    }
    for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
      try {
        await testClient.purgeCertificate(certificate.name!);
      } catch (e) {
        // Nothing to do here
      }
    }
  });

  it("can list certificates", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(name, basicCertificatePolicy, testPollerProperties);
      await createPoller.pollUntilDone();
    }

    let found = 0;
    for await (const certificate of client.listPropertiesOfCertificates({ includePending: true })) {
      // The vault might contain more certificates than the ones we inserted.
      if (!certificateNames.includes(certificate.name!)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of certificates found by listCertificates.");

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  it("can list deleted certificates", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(name, basicCertificatePolicy, testPollerProperties);
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

    assert.equal(found, 2, "Unexpected number of certificates found by getDeletedCertificates.");

    for (const name of certificateNames) {
      await testClient.purgeCertificate(name);
    }
  });

  it("can list certificates by page", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(name, basicCertificatePolicy, testPollerProperties);
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
    assert.equal(found, 2, "Unexpected number of certificates found by listCertificates.");
    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  if (isNode && !isPlaybackMode()) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can get several inserted certificates with requestOptions timeout", async function() {
      const iter = client.listPropertiesOfCertificates({ requestOptions: { timeout: 1 } });
      await assertThrowsAbortError(async () => {
        await iter.next();
      });
    });
  }

  it("can list deleted certificates by page", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      const createPoller = await client.beginCreateCertificate(name, basicCertificatePolicy, testPollerProperties);
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
    assert.equal(found, 2, "Unexpected number of certificates found by getDeletedCertificates.");
    for (const name of certificateNames) {
      await testClient.purgeCertificate(name);
    }
  });

  // On playback mode, the tests happen too fast for the timeout to work - in browsers only
  it("list deleted certificates with requestOptions timeout", async function() {
    recorder.skip("browser", "Timeout tests don't work on playback mode.");
    const iter = client.listDeletedCertificates({ requestOptions: { timeout: 1 } });
    await assertThrowsAbortError(async () => {
      await iter.next();
    });
  });

  it("can retrieve all versions of a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

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
          enabled: true
        }
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
    await testClient.flushCertificate(certificateName);
  });

  // On playback mode, the tests happen too fast for the timeout to work - in browsers only
  it("can get the versions of a certificate with requestOptions timeout", async function() {
    recorder.skip("browser", "Timeout tests don't work on playback mode.");
    const iter = client.listPropertiesOfCertificateVersions("doesn't matter", {
      requestOptions: { timeout: 1 }
    });
    await assertThrowsAbortError(async () => {
      await iter.next();
    });
  });

  it("can list certificate versions (non existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let totalVersions = 0;
    for await (const page of client.listPropertiesOfCertificateVersions(certificateName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          certificateName,
          "Unexpected certificate name in result from listKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for certificate ${certificateName}`);
  });
});
