let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"1":"modelName160409675137509575"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160409675137509575"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/59a48030-a88c-439b-bf3e-19c8446b77c9',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '760fc2d8-fcf6-4240-b2ba-1b754dab1048',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:25:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/59a48030-a88c-439b-bf3e-19c8446b77c9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"59a48030-a88c-439b-bf3e-19c8446b77c9","modelName":"modelName160409675137509575","status":"creating","createdDateTime":"2020-10-30T22:25:51Z","lastUpdatedDateTime":"2020-10-30T22:25:51Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '7933b5e6-5a36-4227-bd17-a491d5be1922',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:25:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/59a48030-a88c-439b-bf3e-19c8446b77c9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"59a48030-a88c-439b-bf3e-19c8446b77c9","modelName":"modelName160409675137509575","status":"creating","createdDateTime":"2020-10-30T22:25:51Z","lastUpdatedDateTime":"2020-10-30T22:25:51Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'efbce520-e869-4014-aff9-3d235ca60936',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:25:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/59a48030-a88c-439b-bf3e-19c8446b77c9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"59a48030-a88c-439b-bf3e-19c8446b77c9","modelName":"modelName160409675137509575","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:25:51Z","lastUpdatedDateTime":"2020-10-30T22:25:53Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '1a6e0a7b-8080-4e56-9f1e-cd1746e61cb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:25:56 GMT'
]);
