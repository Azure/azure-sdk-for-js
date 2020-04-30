let nock = require('nock');

module.exports.hash = "5a98b0b4f208c33690bb9023a8a45c33";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?undefined","sourceFilter":{},"useLabelFile":true})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/4d1950d3-b109-4b97-9720-cdf2ff4763e7',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '4e45c696-8de9-4353-8a3c-ffa1780fd34a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/4d1950d3-b109-4b97-9720-cdf2ff4763e7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d1950d3-b109-4b97-9720-cdf2ff4763e7","status":"creating","createdDateTime":"2020-05-02T06:36:26Z","lastUpdatedDateTime":"2020-05-02T06:36:26Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '191efbfc-d987-4f25-a921-07f9a2ed5d99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/4d1950d3-b109-4b97-9720-cdf2ff4763e7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d1950d3-b109-4b97-9720-cdf2ff4763e7","status":"creating","createdDateTime":"2020-05-02T06:36:26Z","lastUpdatedDateTime":"2020-05-02T06:36:26Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '67af4e10-4281-4d4a-8c4c-dd512f63d1fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/4d1950d3-b109-4b97-9720-cdf2ff4763e7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d1950d3-b109-4b97-9720-cdf2ff4763e7","status":"creating","createdDateTime":"2020-05-02T06:36:26Z","lastUpdatedDateTime":"2020-05-02T06:36:26Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  'c91b7fe7-75bb-4adf-8678-8ad2a84725d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/4d1950d3-b109-4b97-9720-cdf2ff4763e7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d1950d3-b109-4b97-9720-cdf2ff4763e7","status":"creating","createdDateTime":"2020-05-02T06:36:26Z","lastUpdatedDateTime":"2020-05-02T06:36:26Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '974c1db1-0fee-46af-a441-09d30e680a35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/4d1950d3-b109-4b97-9720-cdf2ff4763e7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d1950d3-b109-4b97-9720-cdf2ff4763e7","status":"ready","createdDateTime":"2020-05-02T06:36:26Z","lastUpdatedDateTime":"2020-05-02T06:36:39Z"},"trainResult":{"averageModelAccuracy":0.973,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":1},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '93dd21a2-1d90-488b-af31-cc0a468d6b5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:41 GMT'
]);
