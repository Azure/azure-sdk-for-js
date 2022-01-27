let nock = require('nock');

module.exports.hash = "efe63fbb523fcf030074aa573e076058";

module.exports.testInfo = {"uniqueName":{"1":"modelName164331090870809307"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"modelName164331090870809307","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint//formrecognizer/operations/31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '918',
  'apim-request-id',
  'aec45cfd-c6bf-44b9-a495-34c9e1e00d19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:09 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19')
  .query(true)
  .reply(200, {"operationId":"31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T19:15:08Z","lastUpdatedDateTime":"2022-01-27T19:15:09Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164331090870809307?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'ac3b79ca-b785-4785-bbfa-9a2f36d713d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:09 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19')
  .query(true)
  .reply(200, {"operationId":"31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T19:15:08Z","lastUpdatedDateTime":"2022-01-27T19:15:09Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164331090870809307?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'd5060a83-7609-461a-91c2-23f3a84df35d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:09 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19')
  .query(true)
  .reply(200, {"operationId":"31523057091_aec45cfd-c6bf-44b9-a495-34c9e1e00d19","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-01-27T19:15:08Z","lastUpdatedDateTime":"2022-01-27T19:15:11Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164331090870809307?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"modelName164331090870809307":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName164331090870809307","createdDateTime":"2022-01-27T19:15:11Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '3f03b75b-183e-4cba-8f98-705f2c81a4de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:14 GMT'
]);
