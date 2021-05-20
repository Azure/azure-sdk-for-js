let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"1":"modelName162078252815701117"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName162078252815701117"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  '8ab4324a-d874-4fc0-905a-f4bb5fa3717e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"04092960-7a18-48ec-a3ff-d9d31e32ccf5","modelName":"modelName162078252815701117","status":"creating","createdDateTime":"2021-05-12T01:22:08Z","lastUpdatedDateTime":"2021-05-12T01:22:08Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b5d33cab-a3cb-4e30-adbc-264f1058a41b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"04092960-7a18-48ec-a3ff-d9d31e32ccf5","modelName":"modelName162078252815701117","status":"creating","createdDateTime":"2021-05-12T01:22:08Z","lastUpdatedDateTime":"2021-05-12T01:22:08Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '3286bb4c-ea83-429b-b979-0cfa6dbce680',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"04092960-7a18-48ec-a3ff-d9d31e32ccf5","modelName":"modelName162078252815701117","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-12T01:22:08Z","lastUpdatedDateTime":"2021-05-12T01:22:11Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1284',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'fcefdb5b-8326-4277-a68f-d4d5cdfcf225',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:13 GMT'
]);
