// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { createRecorder } from "./utils/recorderUtils";
import { Context } from "mocha";
import DocumentIntelligence, {
  AnalyzeResultOperationOutput,
  DocumentClassifierBuildOperationDetailsOutput,
  DocumentIntelligenceClient,
  getLongRunningPoller,
  isUnexpected,
} from "../../src";
import assert from "assert";
import { ASSET_PATH, getRandomNumber } from "./utils/utils";
import path from "path";
import fs from "fs";
import { containerSasUrl } from "./utils/utils";

describe("DocumentIntelligenceClient", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  const options = {
    /* apiVersion: "2023-07-31" */
  };
  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = DocumentIntelligence(
      assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT"),
      { key: assertEnvironmentVariable("FORM_RECOGNIZER_API_KEY") },
      recorder.configureClientOptions(options)
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("API Key works - getInfo", async function () {
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000"
    );
  });

  it.skip("AAD works - getInfo", async function () {
    client = DocumentIntelligence(
      assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT"),
      createTestCredential(),
      recorder.configureClientOptions(options)
    );
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000"
    );
  });

  it("documentModels get", async function () {
    const response = await client.path("/documentModels").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // assert.strictEqual(
    //   response.body.value[0].apiVersion,
    //   options.apiVersion,
    //   "expected apiVersion to match"
    // );
  });

  it.skip("documentModels analyze prebuilt-businessCard", async function () {
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-businessCard")
      .post({
        contentType: "application/json",
        body: {
          urlSource:
            "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/businessCard/business-card-english.jpg",
        },
        queryParameters: { locale: "en-IN" },
      });
    // add a test for stream

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput;
    // assert.strictEqual(
    //   result.analyzeResult?.apiVersion,
    //   options.apiVersion,
    //   "expected apiVersion to match"
    // );
    assert.strictEqual(
      result.analyzeResult?.content,
      `Dr. Avery Smith\nSenior Researcher\nCloud & Al Department\navery.smith@contoso.com\nhttps://www.contoso.com/\nmob: +44 (0) 7911 123456\ntel: +44 (0) 20 9876 5432\nfax: +44 (0) 20 6789 2345\nContoso\n2 Kingdom Street\nPaddington, London, W2 6BD`,
      "expected content to match"
    );
    assert.strictEqual(
      result.analyzeResult?.documents?.[0].docType,
      "businessCard",
      "expected docType to be businessCard"
    );
  });

  it("documentModels analyze prebuilt-layout - receipt", async function () {
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          urlSource:
            "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
        },
        queryParameters: { locale: "en-IN" },
      });
    // add a test for stream

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = <AnalyzeResultOperationOutput>(await (await poller).pollUntilDone()).body;
    console.log(result);
    // {
    //   status: 'succeeded',
    //   createdDateTime: '2023-11-10T13:27:55Z',
    //   lastUpdatedDateTime: '2023-11-10T13:27:57Z',
    //   analyzeResult: {
    //     apiVersion: '2023-10-31-preview',
    //     modelId: 'prebuilt-layout',
    //     stringIndexType: 'textElements',
    //     content: 'Contoso\n' +
    //       '123 Main Street Redmond, WA 98052\n' +
    //       '987-654-3210\n' +
    //       '6/10/2019 13:59 Sales Associate: Paul\n' +
    //       '2 Surface Pro 6 $1,998.00\n' +
    //       '3 Surface Pen $299.97\n' +
    //       'Sub-Total\n' +
    //       '$2,297.97\n' +
    //       'Tax\n' +
    //       '$218.31\n' +
    //       'Total\n' +
    //       '$2,516.28',
    //     pages: [ [Object] ],
    //     tables: [],
    //     paragraphs: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object]
    //     ],
    //     styles: [],
    //     contentFormat: 'text'
    //   }
    // }
    console.log(result.analyzeResult?.modelId);
  });

  it("documentModels analyze prebuilt-layout - invoice", async function () {
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          urlSource:
            "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/6704eff082aaaf2d97c1371a28461f512f8d748a/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf",
        },
        queryParameters: { locale: "en-IN" },
      });
    // add a test for stream

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = <AnalyzeResultOperationOutput>(await (await poller).pollUntilDone()).body;
    console.log(result);
    // {
    //   status: 'succeeded',
    //   createdDateTime: '2023-11-10T13:31:31Z',
    //   lastUpdatedDateTime: '2023-11-10T13:31:34Z',
    //   analyzeResult: {
    //     apiVersion: '2023-10-31-preview',
    //     modelId: 'prebuilt-layout',
    //     stringIndexType: 'textElements',
    //     content: 'Contoso\n' +
    //       'Address: 1 Redmond way Suite 6000 Redmond, WA 99243\n' +
    //       'Invoice For: Microsoft\n' +
    //       '1020 Enterprise Way\n' +
    //       'Sunnayvale, CA 87659\n' +
    //       'Invoice Number\n' +
    //       'Invoice Date\n' +
    //       'Invoice Due Date\n' +
    //       'Charges\n' +
    //       'VAT ID\n' +
    //       '34278587\n' +
    //       '6/18/2017\n' +
    //       '6/24/2017\n' +
    //       '$56,651.49\n' +
    //       'PT',
    //     pages: [ [Object] ],
    //     tables: [ [Object] ],
    //     paragraphs: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object]
    //     ],
    //     styles: [],
    //     contentFormat: 'text'
    //   }
    // }
    console.log(result.analyzeResult?.modelId);
    // prebuilt-layout
  });

  it("documentModels analyze prebuilt-layout - invoice (stream)", async function () {
    console.log("ASSET_PATH", ASSET_PATH);
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          base64Source,
        },
        queryParameters: { locale: "en-IN" },
      });
    // add a test for stream

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = <AnalyzeResultOperationOutput>(await (await poller).pollUntilDone()).body;
    console.log(result);
    // {
    //   status: 'succeeded',
    //   createdDateTime: '2023-11-10T13:46:18Z',
    //   lastUpdatedDateTime: '2023-11-10T13:46:20Z',
    //   analyzeResult: {
    //     apiVersion: '2023-10-31-preview',
    //     modelId: 'prebuilt-layout',
    //     stringIndexType: 'textElements',
    //     content: 'Contoso\n' +
    //       'Address: 1 Redmond way Suite 6000 Redmond, WA 99243\n' +
    //       'Invoice For: Microsoft\n' +
    //       '1020 Enterprise Way\n' +
    //       'Sunnayvale, CA 87659\n' +
    //       'Invoice Number\n' +
    //       'Invoice Date\n' +
    //       'Invoice Due Date\n' +
    //       'Charges\n' +
    //       'VAT ID\n' +
    //       '34278587\n' +
    //       '6/18/2017\n' +
    //       '6/24/2017\n' +
    //       '$56,651.49\n' +
    //       'PT',
    //     pages: [ [Object] ],
    //     tables: [ [Object] ],
    //     paragraphs: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object]
    //     ],
    //     styles: [],
    //     contentFormat: 'text'
    //   }
    // }
    console.log(result.analyzeResult?.modelId);
    // prebuilt-layout
  });

  it("documentClassifiers build", async function () {
    const initialResponse = await client.path("/documentClassifiers:build").post({
      body: {
        classifierId: recorder.variable(
          "customClassifierId",
          `customClassifier${getRandomNumber()}`
        ),
        description: "Custom classifier description",
        docTypes: {
          foo: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
          bar: {
            // Adding source kind fails with 400 Invalid Argument
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
        },
      },
    });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const poller = getLongRunningPoller(client, initialResponse);
    const response = <DocumentClassifierBuildOperationDetailsOutput>(
      (await (await poller).pollUntilDone()).body
    );
    console.log(response);
    //  {
    //    operationId: '31466834048_f3ee629e-73fb-48ab-993b-1d55d73ca460',
    //    kind: 'documentClassifierBuild',
    //    status: 'succeeded',
    //    createdDateTime: '2023-11-09T12:45:51Z',
    //    lastUpdatedDateTime: '2023-11-09T12:45:56Z',
    //    resourceLocation: 'https://endpoint/documentintelligence/documentClassifiers/customClassifier10978?api-version=2023-10-31-preview',
    //    percentCompleted: 100,
    //    result: {
    //      classifierId: 'customClassifier10978',
    //      createdDateTime: '2023-11-09T12:45:56Z',
    //      expirationDateTime: '2025-11-08T12:45:56Z',
    //      apiVersion: '2023-10-31-preview',
    //      docTypes: { foo: [Object], bar: [Object] },
    //      description: 'Custom classifier description'
    //    },
    //    apiVersion: '2023-10-31-preview'
    //  }
    assert.strictEqual(
      response.result?.classifierId,
      recorder.variable("customClassifierId"),
      "expected classifierId to match"
    );
    // assert.strictEqual(result.apiVersion, options.apiVersion, "expected apiVersion to match");
  });

  // it("classify from PNG file URL", async function (this: Context) {
  //   const url = makeTestUrl("/Invoice_1.pdf");

  //   const { classifierId } = await requireClassifier();

  //   const poller = await client.beginClassifyDocumentFromUrl(
  //     classifierId,
  //     url,
  //     testPollingOptions
  //   );

  //   const result = await poller.pollUntilDone();

  //   assert.oneOf(result.documents?.[0].docType, ["foo", "bar"]);
  // });
});
