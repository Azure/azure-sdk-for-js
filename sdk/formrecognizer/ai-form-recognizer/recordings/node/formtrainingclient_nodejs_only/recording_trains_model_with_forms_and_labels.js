let nock = require('nock');

module.exports.hash = "a181fcf800995552f3b6ecc4ec38773d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '91d61c85-e8cc-42c4-8cfa-fc9562c9a472',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4ec054a8-15f0-41bb-aa8f-051646530b13","status":"creating","createdDateTime":"2020-08-18T18:47:06Z","lastUpdatedDateTime":"2020-08-18T18:47:06Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'db06cac7-2063-4afd-9bd4-4bea151314f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4ec054a8-15f0-41bb-aa8f-051646530b13","status":"creating","createdDateTime":"2020-08-18T18:47:06Z","lastUpdatedDateTime":"2020-08-18T18:47:06Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '06829c22-9457-41b9-b1d5-cd75c13fcbd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4ec054a8-15f0-41bb-aa8f-051646530b13","status":"creating","createdDateTime":"2020-08-18T18:47:06Z","lastUpdatedDateTime":"2020-08-18T18:47:06Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '3cf7dac6-10c5-40a5-b876-29c1e13f36b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4ec054a8-15f0-41bb-aa8f-051646530b13","status":"ready","createdDateTime":"2020-08-18T18:47:06Z","lastUpdatedDateTime":"2020-08-18T18:47:12Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '7f6c4c98-2041-44b8-a3e6-a7ea4ed078b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:16 GMT'
]);
