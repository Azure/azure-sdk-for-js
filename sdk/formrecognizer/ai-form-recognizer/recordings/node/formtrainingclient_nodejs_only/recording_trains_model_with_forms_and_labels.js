let nock = require('nock');

module.exports.hash = "cad1a0d190f552be0293f81c20b80044";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/8868c5b9-2248-4650-b906-a30bd14196bb',
  'x-envoy-upstream-service-time',
  '5093',
  'apim-request-id',
  '866a1217-6c0b-491f-bbbe-f5b666017852',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:26 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/8868c5b9-2248-4650-b906-a30bd14196bb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8868c5b9-2248-4650-b906-a30bd14196bb","status":"creating","createdDateTime":"2020-06-26T21:23:22Z","lastUpdatedDateTime":"2020-06-26T21:23:22Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '2b4f9d53-b8c9-4aab-a13c-e4e1f28bbe0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:32 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/8868c5b9-2248-4650-b906-a30bd14196bb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"8868c5b9-2248-4650-b906-a30bd14196bb","status":"ready","createdDateTime":"2020-06-26T21:23:22Z","lastUpdatedDateTime":"2020-06-26T21:23:36Z"},"trainResult":{"averageModelAccuracy":0.973,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":1},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'b5892068-1533-4b07-911f-0dc9abdb9429',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:23:37 GMT',
  'Connection',
  'close'
]);
