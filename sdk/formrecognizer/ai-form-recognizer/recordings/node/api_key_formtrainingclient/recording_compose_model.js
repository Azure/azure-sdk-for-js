let nock = require('nock');

module.exports.hash = "f728c256d475c8390b8fd8293968133e";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName162078251069407190"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/24d22e40-ed74-4dd8-b564-4084cd462f3a',
  'x-envoy-upstream-service-time',
  '866',
  'apim-request-id',
  '3f089e56-ba25-48fd-be26-ced89b6f5222',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/d5f9b4d7-43eb-4c44-8db4-64dee26073c6',
  'x-envoy-upstream-service-time',
  '998',
  'apim-request-id',
  'a5cb2584-5494-4d6c-9c3d-c04708d33940',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/24d22e40-ed74-4dd8-b564-4084cd462f3a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"24d22e40-ed74-4dd8-b564-4084cd462f3a","modelName":"input2","status":"creating","createdDateTime":"2021-05-12T01:21:44Z","lastUpdatedDateTime":"2021-05-12T01:21:44Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'c9746048-b7c5-46e0-9086-c8e31fcc5d88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/24d22e40-ed74-4dd8-b564-4084cd462f3a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"24d22e40-ed74-4dd8-b564-4084cd462f3a","modelName":"input2","status":"creating","createdDateTime":"2021-05-12T01:21:44Z","lastUpdatedDateTime":"2021-05-12T01:21:44Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '3732c1a1-10f9-439c-8bc7-82ff43176db0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/d5f9b4d7-43eb-4c44-8db4-64dee26073c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d5f9b4d7-43eb-4c44-8db4-64dee26073c6","modelName":"input1","status":"creating","createdDateTime":"2021-05-12T01:21:44Z","lastUpdatedDateTime":"2021-05-12T01:21:44Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  '3a42c47c-d6cd-4541-97a5-9068e80b130d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/d5f9b4d7-43eb-4c44-8db4-64dee26073c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d5f9b4d7-43eb-4c44-8db4-64dee26073c6","modelName":"input1","status":"creating","createdDateTime":"2021-05-12T01:21:44Z","lastUpdatedDateTime":"2021-05-12T01:21:44Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '320',
  'apim-request-id',
  '7d717167-6e44-46d8-ab87-512ef3756703',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/24d22e40-ed74-4dd8-b564-4084cd462f3a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"24d22e40-ed74-4dd8-b564-4084cd462f3a","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-12T01:21:44Z","lastUpdatedDateTime":"2021-05-12T01:21:48Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  'e0663e72-a9ed-42a3-9100-53c56d0e991f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/d5f9b4d7-43eb-4c44-8db4-64dee26073c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d5f9b4d7-43eb-4c44-8db4-64dee26073c6","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-12T01:21:44Z","lastUpdatedDateTime":"2021-05-12T01:21:49Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '8c7772ae-0811-4b15-9296-8f251a296cb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/compose', {"modelIds":["d5f9b4d7-43eb-4c44-8db4-64dee26073c6","24d22e40-ed74-4dd8-b564-4084cd462f3a"],"modelName":"composedModelName162078251069407190"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/b71aee82-46e4-4225-a1b2-7804db78b7a3',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  '57251872-a0d4-4153-b7ca-2c61c3b470f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b71aee82-46e4-4225-a1b2-7804db78b7a3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b71aee82-46e4-4225-a1b2-7804db78b7a3","modelName":"composedModelName162078251069407190","status":"creating","createdDateTime":"2021-05-12T01:21:50Z","lastUpdatedDateTime":"2021-05-12T01:21:50Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b9453f11-5624-456e-ac30-a5b87bee6a0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b71aee82-46e4-4225-a1b2-7804db78b7a3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b71aee82-46e4-4225-a1b2-7804db78b7a3","modelName":"composedModelName162078251069407190","status":"creating","createdDateTime":"2021-05-12T01:21:50Z","lastUpdatedDateTime":"2021-05-12T01:21:50Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '53478c09-3217-4867-9ac2-e0a05491fbec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b71aee82-46e4-4225-a1b2-7804db78b7a3')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b71aee82-46e4-4225-a1b2-7804db78b7a3","modelName":"composedModelName162078251069407190","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-05-12T01:21:50Z","lastUpdatedDateTime":"2021-05-12T01:21:51Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"24d22e40-ed74-4dd8-b564-4084cd462f3a","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"d5f9b4d7-43eb-4c44-8db4-64dee26073c6","errors":[]}]}, [
  'Content-Length',
  '2427',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '3a136cf4-a073-4f00-b91c-124a20f0246b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:21:55 GMT'
]);
