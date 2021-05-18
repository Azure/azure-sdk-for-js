let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"2":"modelName162078254519203726"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName162078254519203726"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/5cce29f7-8129-4298-a3a2-31b4331147f5',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '4fbb6532-8c42-4eb5-8197-c29c13ece0f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/5cce29f7-8129-4298-a3a2-31b4331147f5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5cce29f7-8129-4298-a3a2-31b4331147f5","modelName":"modelName162078254519203726","status":"creating","createdDateTime":"2021-05-12T01:22:25Z","lastUpdatedDateTime":"2021-05-12T01:22:25Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'd1097a51-e71a-4b26-be40-5844f98cf2b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/5cce29f7-8129-4298-a3a2-31b4331147f5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5cce29f7-8129-4298-a3a2-31b4331147f5","modelName":"modelName162078254519203726","status":"creating","createdDateTime":"2021-05-12T01:22:25Z","lastUpdatedDateTime":"2021-05-12T01:22:25Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '8549579e-0ae2-4780-97c8-40473c8a885b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/5cce29f7-8129-4298-a3a2-31b4331147f5')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"5cce29f7-8129-4298-a3a2-31b4331147f5","modelName":"modelName162078254519203726","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-12T01:22:25Z","lastUpdatedDateTime":"2021-05-12T01:22:28Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1284',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '86eb9b54-d127-48f5-993b-d0f388d300fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:30 GMT'
]);
