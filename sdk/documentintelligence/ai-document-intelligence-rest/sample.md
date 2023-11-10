## Initialize Client

### With API KEY

```ts
const client = DocumentIntelligence(process.env["FORM_RECOGNIZER_ENDPOINT"], {
  key: process.env["FORM_RECOGNIZER_API_KEY"],
});
```

### With Token Credential

```ts
const client = DocumentIntelligence(
  assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT"),
  new DefaultAzureCredential()
);
```

## Get Info

```ts
const response = await client.path("/info").get();
if (isUnexpected(response)) {
  throw response.body.error;
}
console.log(response.body.customDocumentModels.limit);
// 20000
```

## Document Models

```ts
const response = await client.path("/documentModels").get();
if (isUnexpected(response)) {
  throw response.body.error;
}
console.log(response.body.value[0].apiVersion);
// 2021-09-30-preview
```

## Document Models

### Analyze prebuilt-layout

```ts
// Source Type 1: (urlSource)
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

// OR
// Source Type 2: (base64Source)
// const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
// const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

// const initialResponse = await client
//   .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
//   .post({
//     contentType: "application/json",
//     body: {
//       base64Source,
//     },
//     queryParameters: { locale: "en-IN" },
//   });

// Continue creating the poller from initial response
if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const poller = getLongRunningPoller(client, initialResponse);
const result = <AnalyzeResultOperationOutput>await(await poller).pollUntilDone().body;
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
```

## Document Classifiers #Build

```ts
const containerSasUrl = (): string => process.env["FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL"];
const initialResponse = await client.path("/documentClassifiers:build").post({
  body: {
    classifierId: `customClassifier${getRandomNumber()}`,
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
  await(await poller).pollUntilDone().body
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
console.log(response.result.classifierId);
// customClassifier10978
```
