// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

import { getTrainingContainerSasUrl } from "../util/trainingContainer";
import { FormRecognizerClient, AzureKeyCredential, TrainingDocumentInfo } from "../../src";
import { env } from "@azure/test-utils-recorder";
import { BlobServiceClient } from '@azure/storage-blob';
// import { URLBuilder } from '@azure/core-http';

const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
const recognizerClient = new FormRecognizerClient(
  env.ENDPOINT,
  new AzureKeyCredential(env.FORM_RECOGNIZER_API_KEY)
);
let unlabeledModelId: string | undefined;
let labeledModelId: string | undefined;

describe("FormTrainingClient NodeJS only", () => {
  const trainingClient = recognizerClient.getFormTrainingClient();
  const expectedDocumentInfo: TrainingDocumentInfo = {
    documentName: "Form_1.jpg",
    errors: [],
    pageCount: 1,
    status: "succeeded"
  };

  it("trains model with forms and no labels", async () => {
    const containerSasUrl = getTrainingContainerSasUrl();
    assert.ok(containerSasUrl, "Expect valid container sas url");
    const poller = await trainingClient.beginTraining(containerSasUrl, false);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    unlabeledModelId = response!.modelId;

    assert.ok(response!.models && response!.models.length > 0, "Expected non empty sub model list");
    const model = response!.models![0];
    assert.equal(model.formType, "form-0");
    assert.equal(model.accuracy, undefined);
    assert.ok(model.fields["field-0"], "Expecting field with name 'field-0' to be valid");

    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("trains model with forms and labels", async () => {
    const containerSasUrl = getTrainingContainerSasUrl();
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, true);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    labeledModelId = response!.modelId;

    assert.ok(response!.models && response!.models.length > 0, "Expected non empty sub model list");
    const model = response!.models![0];
    assert.equal(model.formType, "TBD");
    assert.equal(model.accuracy, 0.973);
    assert.ok(model.fields["Signature"], "Expecting field with name 'Signature' to be valid");

    // TODO: why training with labels is missing `errors` array?
    assert.deepStrictEqual(response?.trainingDocuments![0].documentName, expectedDocumentInfo.documentName);
  });

  it("trains model with forms and no labels including sub folders", async () => {
    const containerSasUrl = getTrainingContainerSasUrl();
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      includeSubFolders: true
    });
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    assert.ok(
      response!.trainingDocuments && response!.trainingDocuments.length > 0,
      "Expected non empty training document list"
    );
    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("trains model with forms and no labels specifying prefix ", async () => {
    const containerSasUrl = getTrainingContainerSasUrl();
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      prefix: "Form_"
    });
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    assert.ok(
      response!.trainingDocuments && response!.trainingDocuments.length > 0,
      "Expected non empty training document list"
    );
    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });
}).timeout(60000);

describe("FormRecognizerClient form recognition NodeJS only", () => {
  it("recognizes form from a jpeg file stream using model trained without labels", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeForms(
      unlabeledModelId!,
      stream,
      "image/jpeg"
    );
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
    assert.equal(form.formType, "form-0");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields["field-0"], "Expecting field-0");
    assert.ok(form.fields["field-1"], "Expecting field-1");
    assert.ok(form.fields["field-2"], "Expecting field-2");
  });

  it("recognizes form from a url to a jpeg file using model trained without labels", async () => {
    const blobServiceClient = new BlobServiceClient(process.env.BLOB_SAS_ENDPOINT!);
    const containerName = `testform${new Date().getTime()}`;
    const blobName = `Form_1.jpg`;
    const { containerClient } = await blobServiceClient.createContainer(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");

    try {
      await blobClient.uploadFile(filePath, {
        blobHTTPHeaders: {
          blobContentType: "image/jpeg"
        }
      });

      assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
      const poller = await recognizerClient.beginRecognizeFormsFromUrl(unlabeledModelId!, blobClient.url, {
        onProgress: (ev) => { console.log(ev)}
      });
      await poller.pollUntilDone();
      const response = poller.getResult();

      assert.ok(response, "Expect valid response object");
      assert.equal(response!.status, "succeeded");
      assert.ok(
        response!.forms && response!.forms.length > 0,
        `Expect no-empty pages but got ${response!.forms}`
      );
      const form = response!.forms![0];
      assert.equal(form.formType, "form-0");
      assert.deepStrictEqual(form.pageRange, {
        firstPageNumber: 1,
        lastPageNumber: 1
      });
      assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
      assert.ok(form.fields["field-0"], "Expecting field-0");
      assert.ok(form.fields["field-1"], "Expecting field-1");
      assert.ok(form.fields["field-2"], "Expecting field-2");
    } finally {
      await blobServiceClient.deleteContainer(containerName);
    }
  });

  it("recognizes form from a jpeg file stream using model trained with labels", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeForms(
      labeledModelId!,
      stream,
      "image/jpeg"
    );
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["Merchant"]);
    assert.ok(form.fields["DatedAs"]);
    assert.ok(form.fields["CompanyPhoneNumber"]);
    assert.ok(form.fields["CompanyName"]);
    assert.ok(form.fields["Signature"]);
  });

  it("recognizes form from a jpeg file stream using model trained with labels without specifying content type", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(labeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeForms(labeledModelId!, stream);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["Merchant"]);
    assert.ok(form.fields["DatedAs"]);
    assert.ok(form.fields["CompanyPhoneNumber"]);
    assert.ok(form.fields["CompanyName"]);
    assert.ok(form.fields["Signature"]);
  });
}).timeout(60000);
