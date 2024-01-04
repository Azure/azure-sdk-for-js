// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createBatchClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { BatchClient, CreateCertificateParameters, isUnexpected } from "../../src";
import { fail } from "assert";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets";

describe("Certificate Operations Test", () => {
  const certThumb = "cff2ab63c8c955aaf71989efa641b906558d9fb7";
  const certAlgorithm = "sha1";

  let recorder: Recorder;
  let batchClient: BatchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    batchClient = createBatchClient("AAD", recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list supported images successfully", async () => {
    const imagesResult = await batchClient
      .path("/supportedimages")
      .get({ queryParameters: { maxresults: 2 } });

    if (isUnexpected(imagesResult)) {
      fail(
        `Received unexpected status code from listSupportedImages response: ${imagesResult.status}`
      );
    }
    const supportedImages = imagesResult.body.value!;
    assert.equal(imagesResult.status, "200");
    assert.equal(supportedImages.length, 2);

    const supportedImage = supportedImages[0];
    assert.isNotNull(supportedImage.nodeAgentSKUId);
    assert.isNotNull(supportedImage.osType);
  });

  it("should add new certificate successfully", async () => {
    const cert: CreateCertificateParameters = {
      body: {
        thumbprint: certThumb,
        thumbprintAlgorithm: certAlgorithm,
        password: isPlaybackMode() ? fakeTestPasswordPlaceholder1 : "nodesdk",
        certificateFormat: "pfx",
        data: "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",
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const response = await batchClient.path("/certificates").post(cert);
    assert.equal(response.status, "201");
  });

  it("should list certificates successfully", async () => {
    const listCertsResult = await batchClient.path("/certificates").get();
    if (isUnexpected(listCertsResult)) {
      fail(`Received unexpected status code from list Certificates response: ${listCertsResult.status}.
           Response Body: ${listCertsResult.body}`);
    }

    const certificates = listCertsResult.body.value!;
    assert.isAtLeast(certificates.length, 1);
    assert.equal(certificates[0].thumbprint, certThumb);
    assert.equal(certificates[0].thumbprintAlgorithm, "sha1");
  });

  it("should get certificate reference successfully", async () => {
    const getCertResult = await batchClient
      .path(
        "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
        certAlgorithm,
        certThumb
      )
      .get({
        contentType: "application/json; odata=minimalmetadata",
      });

    if (isUnexpected(getCertResult)) {
      fail(`Received unexpected status code from list Certificates response: ${getCertResult.status}.
           Response Body: ${getCertResult.body}`);
    }

    assert.equal(getCertResult.body.thumbprint, certThumb);
    assert.equal(getCertResult.body.thumbprintAlgorithm, certAlgorithm);
  });

  it("Should delete a certificate successfully", async () => {
    const deleteResult = await batchClient
      .path(
        "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
        certAlgorithm,
        certThumb
      )
      .delete({
        contentType: "application/json; odata=minimalmetadata",
      });

    assert.equal(deleteResult.status, "202");
  });
});
