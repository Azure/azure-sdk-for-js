let nock = require('nock');

module.exports.hash = "efe63fbb523fcf030074aa573e076058";

module.exports.testInfo = {"uniqueName":{"1":"modelName164373411918807673"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"modelName164373411918807673","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '1029',
  'apim-request-id',
  'f657f3fb-2ad8-45af-a2d6-fead2a6cd322',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322')
  .query(true)
  .reply(200, {"operationId":"31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T16:48:39Z","lastUpdatedDateTime":"2022-02-01T16:48:40Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName164373411918807673?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'c813d206-4e95-4cac-a320-9a301c8579f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322')
  .query(true)
  .reply(200, {"operationId":"31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T16:48:39Z","lastUpdatedDateTime":"2022-02-01T16:48:40Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName164373411918807673?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'e6e94dd3-a2c2-45be-b58f-fbd2c237c03a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322')
  .query(true)
  .reply(200, {"operationId":"31522633881_f657f3fb-2ad8-45af-a2d6-fead2a6cd322","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-02-01T16:48:39Z","lastUpdatedDateTime":"2022-02-01T16:48:42Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName164373411918807673?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"modelName164373411918807673":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName164373411918807673","createdDateTime":"2022-02-01T16:48:42Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'e38427fa-2541-40ac-bc5a-2f5d74bf5cb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:45 GMT'
]);
