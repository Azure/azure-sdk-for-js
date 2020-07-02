let nock = require('nock');

module.exports.hash = "5a98b0b4f208c33690bb9023a8a45c33";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '34098037-97a2-406f-a674-f56b31b7f1db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7f954280-8212-4c61-9c33-8fea2e47d279","status":"creating","createdDateTime":"2020-05-02T20:00:04Z","lastUpdatedDateTime":"2020-05-02T20:00:04Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '5e601f0c-7b99-4928-8cd8-46863156553d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7f954280-8212-4c61-9c33-8fea2e47d279","status":"creating","createdDateTime":"2020-05-02T20:00:04Z","lastUpdatedDateTime":"2020-05-02T20:00:04Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '370aac86-e5a3-4069-ad0b-6726f0e905af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7f954280-8212-4c61-9c33-8fea2e47d279","status":"ready","createdDateTime":"2020-05-02T20:00:04Z","lastUpdatedDateTime":"2020-05-02T20:00:12Z"},"trainResult":{"averageModelAccuracy":0.973,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":1},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '2c23e3c3-4c7b-4304-b058-1b26feba5c61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:15 GMT'
]);
