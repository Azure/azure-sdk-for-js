let nock = require('nock');

module.exports.hash = "9f4661f53a67579b7f3f5c54df73ccc1";

module.exports.testInfo = {"uniqueName":{"input1":"input1163337186973805237","input2":"input2163337186973906435","composedModelName":"composedModelName163337187639305208"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input1163337186973805237","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '883',
  'apim-request-id',
  '3ba105f1-7f12-49e9-bfcb-77a6d9e99561',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561')
  .query(true)
  .reply(200, {"operationId":"31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-10-04T18:24:29Z","lastUpdatedDateTime":"2021-10-04T18:24:29Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163337186973805237?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'bbebd1ad-19d7-4ff4-a0b0-d020262dba20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561')
  .query(true)
  .reply(200, {"operationId":"31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:29Z","lastUpdatedDateTime":"2021-10-04T18:24:30Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163337186973805237?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'cef81567-2297-44b1-93c2-96c439b71bc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input2163337186973906435","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1217',
  'apim-request-id',
  'f4c647b3-5065-4cbd-a8a6-0fd223372cb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3')
  .query(true)
  .reply(200, {"operationId":"31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-10-04T18:24:29Z","lastUpdatedDateTime":"2021-10-04T18:24:29Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163337186973906435?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '01d9894a-59bf-4a77-a777-d3ef54dd62b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3')
  .query(true)
  .reply(200, {"operationId":"31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:29Z","lastUpdatedDateTime":"2021-10-04T18:24:31Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163337186973906435?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e8845d99-395e-45e0-9443-6cbbb9e0ecc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561')
  .query(true)
  .reply(200, {"operationId":"31532996130_3ba105f1-7f12-49e9-bfcb-77a6d9e99561","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:24:29Z","lastUpdatedDateTime":"2021-10-04T18:24:32Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163337186973805237?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input1163337186973805237":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1163337186973805237","createdDateTime":"2021-10-04T18:24:32Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '741c97aa-8b85-4083-8c66-ff10451f2673',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3')
  .query(true)
  .reply(200, {"operationId":"31532996130_f4c647b3-5065-4cbd-a8a6-0fd223372cb3","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:24:29Z","lastUpdatedDateTime":"2021-10-04T18:24:32Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163337186973906435?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input2163337186973906435":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2163337186973906435","createdDateTime":"2021-10-04T18:24:32Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'a663d75b-c17b-4743-bd97-d923f172dedc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:compose', {"modelId":"composedModelName163337187639305208","componentModels":[{"modelId":"input1163337186973805237"},{"modelId":"input2163337186973906435"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996124_e9cce039-4f97-4cd5-b316-8a256d8f6582?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'e9cce039-4f97-4cd5-b316-8a256d8f6582',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996124_e9cce039-4f97-4cd5-b316-8a256d8f6582')
  .query(true)
  .reply(200, {"operationId":"31532996124_e9cce039-4f97-4cd5-b316-8a256d8f6582","kind":"documentModelCompose","status":"running","createdDateTime":"2021-10-04T18:24:36Z","lastUpdatedDateTime":"2021-10-04T18:24:36Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163337187639305208?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '357d54de-12ef-46e1-a293-2e5cce9c096f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996124_e9cce039-4f97-4cd5-b316-8a256d8f6582')
  .query(true)
  .reply(200, {"operationId":"31532996124_e9cce039-4f97-4cd5-b316-8a256d8f6582","kind":"documentModelCompose","status":"succeeded","createdDateTime":"2021-10-04T18:24:36Z","lastUpdatedDateTime":"2021-10-04T18:24:36Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163337187639305208?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input1163337186973805237":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input2163337186973906435":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName163337187639305208","createdDateTime":"2021-10-04T18:24:36Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1bab5b90-00ab-423a-afc6-6f2e3db96f20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:36 GMT'
]);
