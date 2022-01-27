let nock = require('nock');

module.exports.hash = "eb64dd72d88b975f89e675779f458bdb";

module.exports.testInfo = {"uniqueName":{"input1":"input1164331089610203463","input2":"input2164331089610309085","composedModelName":"composedModelName164331090306002599"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input2164331089610309085","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint//formrecognizer/operations/31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '946',
  'apim-request-id',
  '1f971c61-39f1-481d-ae0e-7233a5239ae3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:14:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3')
  .query(true)
  .reply(200, {"operationId":"31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T19:14:56Z","lastUpdatedDateTime":"2022-01-27T19:14:57Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/input2164331089610309085?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'e7c03666-8dcb-41bc-9cc8-c7f48047a389',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:14:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3')
  .query(true)
  .reply(200, {"operationId":"31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T19:14:56Z","lastUpdatedDateTime":"2022-01-27T19:14:57Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/input2164331089610309085?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b0dc7a98-603b-481d-9e97-8058352c9cdd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:14:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input1164331089610203463","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint//formrecognizer/operations/31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '1446',
  'apim-request-id',
  '2acbc12f-3aa0-4544-8098-46e91b76796d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:14:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d')
  .query(true)
  .reply(200, {"operationId":"31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-01-27T19:14:56Z","lastUpdatedDateTime":"2022-01-27T19:14:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/input1164331089610203463?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '91b3a8ea-31d4-49d3-a060-a061f7444888',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:14:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d')
  .query(true)
  .reply(200, {"operationId":"31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-01-27T19:14:56Z","lastUpdatedDateTime":"2022-01-27T19:14:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/input1164331089610203463?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '40a6481f-6625-460f-96f5-83ba0d8a2adf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:14:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3')
  .query(true)
  .reply(200, {"operationId":"31523057104_1f971c61-39f1-481d-ae0e-7233a5239ae3","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-01-27T19:14:56Z","lastUpdatedDateTime":"2022-01-27T19:14:59Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/input2164331089610309085?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input2164331089610309085":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2164331089610309085","createdDateTime":"2022-01-27T19:14:59Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'bc68c036-b0cb-47ff-bb97-323d38bbc300',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d')
  .query(true)
  .reply(200, {"operationId":"31523057104_2acbc12f-3aa0-4544-8098-46e91b76796d","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-01-27T19:14:56Z","lastUpdatedDateTime":"2022-01-27T19:14:59Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/input1164331089610203463?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input1164331089610203463":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1164331089610203463","createdDateTime":"2022-01-27T19:14:59Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '81c951df-98c1-4d81-a038-7dc5aa482b5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:compose', {"modelId":"composedModelName164331090306002599","componentModels":[{"modelId":"input1164331089610203463"},{"modelId":"input2164331089610309085"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint//formrecognizer/operations/31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  '211c13e3-3401-4a0b-b4a2-72b0598647f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0')
  .query(true)
  .reply(200, {"operationId":"31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0","kind":"documentModelCompose","status":"notStarted","createdDateTime":"2022-01-27T19:15:03Z","lastUpdatedDateTime":"2022-01-27T19:15:03Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/composedModelName164331090306002599?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '672d6625-7aa9-41e3-b8db-df3501b8eef3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0')
  .query(true)
  .reply(200, {"operationId":"31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0","kind":"documentModelCompose","status":"running","createdDateTime":"2022-01-27T19:15:03Z","lastUpdatedDateTime":"2022-01-27T19:15:03Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/composedModelName164331090306002599?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '510c9117-2cd6-4b08-a798-53967049115e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0')
  .query(true)
  .reply(200, {"operationId":"31523057097_211c13e3-3401-4a0b-b4a2-72b0598647f0","kind":"documentModelCompose","status":"succeeded","createdDateTime":"2022-01-27T19:15:03Z","lastUpdatedDateTime":"2022-01-27T19:15:03Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/composedModelName164331090306002599?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input1164331089610203463":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input2164331089610309085":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName164331090306002599","createdDateTime":"2022-01-27T19:15:03Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '0807768f-5be6-43af-bd40-e549091b34be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:07 GMT'
]);
