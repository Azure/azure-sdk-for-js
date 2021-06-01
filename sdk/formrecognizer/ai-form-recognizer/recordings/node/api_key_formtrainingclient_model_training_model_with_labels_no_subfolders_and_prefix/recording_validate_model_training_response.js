let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"1":"modelName162196590315201641"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName162196590315201641"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'afe36328-d083-43d6-b1f2-bacca70d0edf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6","modelName":"modelName162196590315201641","status":"creating","createdDateTime":"2021-05-25T18:05:03Z","lastUpdatedDateTime":"2021-05-25T18:05:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '3476cf48-227c-40d8-934f-00125e3983fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6","modelName":"modelName162196590315201641","status":"creating","createdDateTime":"2021-05-25T18:05:03Z","lastUpdatedDateTime":"2021-05-25T18:05:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '89622c9b-bea0-47e0-aa5f-921a88a02c85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6","modelName":"modelName162196590315201641","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T18:05:03Z","lastUpdatedDateTime":"2021-05-25T18:05:06Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1284',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'c2d00f2b-4703-4bea-851d-5046b3f82535',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:08 GMT'
]);
