let nock = require('nock');

module.exports.hash = "eb64dd72d88b975f89e675779f458bdb";

module.exports.testInfo = {"uniqueName":{"input1":"input1164373410659402637","input2":"input2164373410659503905","composedModelName":"composedModelName164373411356202147"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input1164373410659402637","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522633893_e281aa07-f496-4993-883f-c2f06fd2efba?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '1309',
  'apim-request-id',
  'e281aa07-f496-4993-883f-c2f06fd2efba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633893_e281aa07-f496-4993-883f-c2f06fd2efba')
  .query(true)
  .reply(200, {"operationId":"31522633893_e281aa07-f496-4993-883f-c2f06fd2efba","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T16:48:26Z","lastUpdatedDateTime":"2022-02-01T16:48:28Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1164373410659402637?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '6bf37aef-6207-4ba7-b78b-7aeeb7f07306',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input2164373410659503905","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '1294',
  'apim-request-id',
  '82ffa0e7-c55d-4098-a788-63f7ef940f12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633893_e281aa07-f496-4993-883f-c2f06fd2efba')
  .query(true)
  .reply(200, {"operationId":"31522633893_e281aa07-f496-4993-883f-c2f06fd2efba","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T16:48:26Z","lastUpdatedDateTime":"2022-02-01T16:48:28Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1164373410659402637?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '122db06e-7efd-4c83-b209-6b6bcfdd10e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12')
  .query(true)
  .reply(200, {"operationId":"31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-02-01T16:48:26Z","lastUpdatedDateTime":"2022-02-01T16:48:26Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2164373410659503905?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9bcaf2dc-b654-416a-822e-d1a9ec6cbf0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12')
  .query(true)
  .reply(200, {"operationId":"31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T16:48:26Z","lastUpdatedDateTime":"2022-02-01T16:48:28Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2164373410659503905?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'f8e71ab9-3c05-4f2a-891a-b0c27535d2b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633893_e281aa07-f496-4993-883f-c2f06fd2efba')
  .query(true)
  .reply(200, {"operationId":"31522633893_e281aa07-f496-4993-883f-c2f06fd2efba","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-02-01T16:48:26Z","lastUpdatedDateTime":"2022-02-01T16:48:30Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1164373410659402637?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input1164373410659402637":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1164373410659402637","createdDateTime":"2022-02-01T16:48:30Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '6c476155-6cc9-4f7b-bdc0-a8c58af345c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12')
  .query(true)
  .reply(200, {"operationId":"31522633893_82ffa0e7-c55d-4098-a788-63f7ef940f12","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-02-01T16:48:26Z","lastUpdatedDateTime":"2022-02-01T16:48:30Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2164373410659503905?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input2164373410659503905":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2164373410659503905","createdDateTime":"2022-02-01T16:48:30Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '3488eb3c-81b5-4270-98c3-0f19ac369d49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:compose', {"modelId":"composedModelName164373411356202147","componentModels":[{"modelId":"input1164373410659402637"},{"modelId":"input2164373410659503905"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'eeca130f-4284-4fd6-a746-c4da8b3c6310',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310')
  .query(true)
  .reply(200, {"operationId":"31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310","kind":"documentModelCompose","status":"notStarted","createdDateTime":"2022-02-01T16:48:33Z","lastUpdatedDateTime":"2022-02-01T16:48:33Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName164373411356202147?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '2f018d34-3bb7-4633-8221-527ae38ef33c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310')
  .query(true)
  .reply(200, {"operationId":"31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310","kind":"documentModelCompose","status":"running","createdDateTime":"2022-02-01T16:48:33Z","lastUpdatedDateTime":"2022-02-01T16:48:33Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName164373411356202147?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '4416e882-d1b3-42ed-8773-1f076f154095',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310')
  .query(true)
  .reply(200, {"operationId":"31522633886_eeca130f-4284-4fd6-a746-c4da8b3c6310","kind":"documentModelCompose","status":"succeeded","createdDateTime":"2022-02-01T16:48:33Z","lastUpdatedDateTime":"2022-02-01T16:48:34Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName164373411356202147?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input2164373410659503905":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input1164373410659402637":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName164373411356202147","createdDateTime":"2022-02-01T16:48:34Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '01519ce4-20a6-444c-8f12-d18d8d782b58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:38 GMT'
]);
