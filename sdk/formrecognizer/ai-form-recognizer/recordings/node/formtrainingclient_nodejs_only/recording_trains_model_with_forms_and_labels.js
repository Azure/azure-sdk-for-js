let nock = require('nock');

module.exports.hash = "1daed15cf476c3b313fec4903aaa1913";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '5644987f-8a4b-4e29-813a-2e81ebe119f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d4488598-71ae-4cdc-8847-a3eca7a0473d","status":"creating","createdDateTime":"2020-10-21T18:08:02Z","lastUpdatedDateTime":"2020-10-21T18:08:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '7f84e560-e28f-49df-805a-28e60ddeb821',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d4488598-71ae-4cdc-8847-a3eca7a0473d","status":"creating","createdDateTime":"2020-10-21T18:08:02Z","lastUpdatedDateTime":"2020-10-21T18:08:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '9d57df3f-7416-46b7-ab69-db896979e4fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d4488598-71ae-4cdc-8847-a3eca7a0473d","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-21T18:08:02Z","lastUpdatedDateTime":"2020-10-21T18:08:04Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'f6740cdc-3cc6-4bc1-85b7-e09634d4701c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:07 GMT'
]);
