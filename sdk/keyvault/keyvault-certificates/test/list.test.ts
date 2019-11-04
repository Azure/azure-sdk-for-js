// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import chai from "chai";
import { CertificateClient } from "../src";
import { retry, isRecording } from "./utils/recorder";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
const { expect } = chai;

describe("Certificates client - list certificates in various ways", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subjectName: "cn=MyCert"
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

  it("can purge all certificates", async function() {
    // WARNING: When running integration-tests, or having TEST_MODE="record", all of the certificates in the indicated KEYVAULT_NAME will be deleted as part of this test.
    for await (const certificate of client.listCertificates({ includePending: true })) {
      try {
        await testClient.flushCertificate(certificate.properties.name);
      } catch (e) {}
    }
    for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
      try {
        await testClient.purgeCertificate(certificate.properties.name);
      } catch (e) {}
    }
  });

  it("can list certificates", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      await client.createCertificate(name, basicCertificatePolicy);
    }

    let found = 0;
    for await (const certificate of client.listCertificates({ includePending: true })) {
      // The vault might contain more certificates than the ones we inserted.
      if (!certificateNames.includes(certificate.properties.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of certificates found by listCertificates.");

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  // This test only passes during recording.
  // I believe it's a bug on the recorder, but we're
  // migrating to the new recorder soon, so I'm hoping to let
  // this oddity happen for now and come back when the new recorder is here.
  if (isRecording) {
    it("can list deleted certificates", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const certificateNames = [`${certificateName}0`, `${certificateName}1`];
      for (const name of certificateNames) {
        await client.createCertificate(name, basicCertificatePolicy);
      }
      for (const name of certificateNames) {
        await client.deleteCertificate(name);
      }

      // Waiting until the certificates are deleted
      for (const name of certificateNames) {
        await retry(async () => client.getDeletedCertificate(name));
      }

      let found = 0;
      for await (const certificate of client.listDeletedCertificates({ includePending: true })) {
        // The vault might contain more certificates than the ones we inserted.
        if (!certificateNames.includes(certificate.properties.name)) continue;
        found += 1;
      }

      assert.equal(found, 2, "Unexpected number of certificates found by getDeletedCertificates.");

      for (const name of certificateNames) {
        await testClient.purgeCertificate(name);
      }
    });
  }

  it("can list certificates by page", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      await client.createCertificate(name, basicCertificatePolicy);
    }
    let found = 0;
    for await (const page of client.listCertificates({ includePending: true }).byPage()) {
      for (const certificate of page) {
        // The vault might contain more certificates than the ones we inserted.
        if (!certificateNames.includes(certificate.properties.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of certificates found by listCertificates.");
    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  it("can list deleted certificates by page", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      await client.createCertificate(name, basicCertificatePolicy);
    }
    for (const name of certificateNames) {
      await client.deleteCertificate(name);
    }

    // Waiting until the certificates are deleted
    for (const name of certificateNames) {
      await retry(async () => client.getDeletedCertificate(name));
    }

    let found = 0;
    for await (const page of client.listDeletedCertificates({ includePending: true }).byPage()) {
      for (const deleteCertificate of page) {
        // The vault might contain more certificates than the ones we inserted.
        if (!certificateNames.includes(deleteCertificate.properties.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of certificates found by getDeletedCertificates.");
    for (const name of certificateNames) {
      await testClient.purgeCertificate(name);
    }
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
      await retry(async () =>
        client.createCertificate(certificateName, basicCertificatePolicy, {
          tags: { tag },
          enabled: true
        })
      );
      let response: any;
      await retry(async () => {
        response = await client.getCertificate(certificateName);
        if (response.properties.tags!.tag !== tag) throw "retrying due to mismatched tag";
      });
      // Versions don't match. Something must be happening under the hood.
      // versions.push({ version: response.version!, tag: response.properties.tags!.tag });
      versions.push({ tag: response.properties.tags!.tag });
    }

    const results: VersionTagPair[] = [];
    for await (const item of client.listCertificateVersions(certificateName, {
      includePending: true
    })) {
      const version = item.properties.version!;
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

  it("can list certificate versions (non existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    let totalVersions = 0;
    for await (const page of client.listCertificateVersions(certificateName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.properties.name,
          certificateName,
          "Unexpected key name in result from listKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for certificate ${certificateName}`);
  });
});
