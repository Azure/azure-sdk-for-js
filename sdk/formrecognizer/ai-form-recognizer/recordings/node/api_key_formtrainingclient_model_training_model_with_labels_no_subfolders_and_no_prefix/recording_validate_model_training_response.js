let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"2":"modelName162196591477004591"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName162196591477004591"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '3056aeff-c52d-401b-909e-3b182c091d41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb","modelName":"modelName162196591477004591","status":"creating","createdDateTime":"2021-05-25T18:05:14Z","lastUpdatedDateTime":"2021-05-25T18:05:14Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'aa98c9c4-3483-411e-9af9-bc7a295ebb22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb","modelName":"modelName162196591477004591","status":"creating","createdDateTime":"2021-05-25T18:05:14Z","lastUpdatedDateTime":"2021-05-25T18:05:14Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'cd8796f1-c7b1-4b92-95dd-bd1ec42b1be1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb","modelName":"modelName162196591477004591","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T18:05:14Z","lastUpdatedDateTime":"2021-05-25T18:05:17Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1284',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '18da2bbd-8906-4ca3-91de-4412e1d1e5b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:05:20 GMT'
]);
