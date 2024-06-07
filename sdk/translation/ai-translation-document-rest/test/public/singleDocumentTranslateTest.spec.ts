// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DocumentTranslateDefaultResponse, DocumentTranslateParameters, DocumentTranslationClient, createFile, isUnexpected } from "../../src";
import { createDocumentTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { CreateFileOptions } from "@typespec/ts-http-runtime";

describe("SingleDocumentTranslate tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("document translate", async () => {
    const file = await getDocumentFileContent();
    
    const options: DocumentTranslateParameters = {
      queryParameters: {
      targetLanguage: 'hi'
      },
      contentType: 'multipart/form-data',
      body: {
        document: file
      }
    };

    const response = await client.path("/document:translate").post(options);
    const typedResponse = response as DocumentTranslateDefaultResponse;    
    
    if(typedResponse.status == "200") {
      console.log('Response code: ' + typedResponse.status + ', Response body: ' + typedResponse.body);      
      assert.isTrue(typedResponse.body !== null);
    }    
    else {
      console.log('Response code: ' + typedResponse.status + ', Response body: ' + typedResponse.body.error.message);
      throw typedResponse.body;
    }
  });

  it("single CSV glossary", async () => {
    const documentFile = await getDocumentFileContent();
    const glossaryFile = await getSingleGlossaryContent();
    
    const options: DocumentTranslateParameters = {
      queryParameters: {
      targetLanguage: 'hi'
      },
      contentType: 'multipart/form-data',
      body: {
        document: documentFile,
        glossary: glossaryFile
      }
    };

    const response = await client.path("/document:translate").post(options);
    
    if(response.status == "200") {
      console.log('Response code: ' + response.status + ', Response body: ' + response.body);      
      assert.isTrue(response.body !== null);
      assert.isTrue(response.body.toString().includes("test"));
    }    
    else {
      const typedResponse = response as DocumentTranslateDefaultResponse;    
      console.log('Response code: ' + typedResponse.status + ', Response body: ' + typedResponse.body.error.message);
      throw typedResponse.body;
    }
  });

  it("Multiple CSV glossary", async () => {
    const documentFile = await getDocumentFileContent();
    const glossaryFile = await getMultipleGlossaryContent();
    
    const options: DocumentTranslateParameters = {
      queryParameters: {
      targetLanguage: 'hi'
      },
      contentType: 'multipart/form-data',
      body: {
        document: documentFile,
        glossary: glossaryFile
      }
    };

    const response = await client.path("/document:translate").post(options) as DocumentTranslateDefaultResponse;
       
    if (isUnexpected(response)) {
      console.log('Response code: ' + response.status + ', Response error message: ' + response.body.error.message);
      assert.isTrue(response.body.error.message.includes("exceeded"));
    }
    else
    {
      assert.isFalse(true);
    }
  });

});

async function getDocumentFileContent(): Promise<File> {
  const fileName = "test-input.txt";
  const fileContent = new TextEncoder().encode("This is a test.");
  const createFileOptions: CreateFileOptions = {
    type: "text/html"
  }
  const file = createFile(fileContent, fileName, createFileOptions)
  return file;
}

async function getSingleGlossaryContent() {
  const file = await getGlossaryFileDetails();
  const glossaries: (string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream | File)[] = [];
  glossaries.push(file);
  return glossaries;
}

async function getMultipleGlossaryContent() {
  const file = await getGlossaryFileDetails();
  const glossaries: (string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream | File)[] = [];
  glossaries.push(file);
  glossaries.push(file);
  return glossaries;
}

async function getGlossaryFileDetails(): Promise<File> {
  const fileName = "test-glossary.csv";
  const fileContent = new TextEncoder().encode("test,test");
  const createFileOptions: CreateFileOptions = {
    type: "text/csv"
  }
  const file = createFile(fileContent, fileName, createFileOptions)
  return file;
}
