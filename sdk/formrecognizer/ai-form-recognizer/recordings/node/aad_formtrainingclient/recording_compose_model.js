let nock = require('nock');

module.exports.hash = "f728c256d475c8390b8fd8293968133e";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName160591248046001271"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '0e56eb09-1249-4ba5-8aa4-b6f208442400',
  'x-ms-ests-server',
  '2.1.11251.20 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvkSnKcQSIZAnfAWc2BSAxPGLH8mAQAAAJo-StcOAAAA; expires=Sun, 20-Dec-2020 22:47:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:47:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/a0fb2a3c-ad88-4fe6-bee7-41e096363ac8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'e33da011-f0b2-497d-beba-e540a4f38e98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/1ae42e79-21a3-44fd-a38d-81f8c34c84a7',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '4573352f-7fa3-46dd-8cda-3a1da1d1432e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/a0fb2a3c-ad88-4fe6-bee7-41e096363ac8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a0fb2a3c-ad88-4fe6-bee7-41e096363ac8","modelName":"input2","status":"creating","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:55Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'fd7d036f-ff0d-4e20-943b-bb2e8cbaa2b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/1ae42e79-21a3-44fd-a38d-81f8c34c84a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1ae42e79-21a3-44fd-a38d-81f8c34c84a7","modelName":"input1","status":"creating","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:55Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'a422d4e7-6c04-436a-9202-9608eeba1186',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/a0fb2a3c-ad88-4fe6-bee7-41e096363ac8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a0fb2a3c-ad88-4fe6-bee7-41e096363ac8","modelName":"input2","status":"creating","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:55Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '91f3af6a-e75a-413e-9ef9-b4ee458354d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/1ae42e79-21a3-44fd-a38d-81f8c34c84a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1ae42e79-21a3-44fd-a38d-81f8c34c84a7","modelName":"input1","status":"creating","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:55Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '25b79c03-e05e-4c03-812d-3f536a6819da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/1ae42e79-21a3-44fd-a38d-81f8c34c84a7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"1ae42e79-21a3-44fd-a38d-81f8c34c84a7","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:58Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1239',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b795a574-ac65-442b-baf4-b560ecd53465',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:47:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/a0fb2a3c-ad88-4fe6-bee7-41e096363ac8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a0fb2a3c-ad88-4fe6-bee7-41e096363ac8","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:58Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Content-Length',
  '1239',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'f6eb723f-22d1-4bb4-aa67-ea8985dbe2e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models/compose', {"modelIds":["1ae42e79-21a3-44fd-a38d-81f8c34c84a7","a0fb2a3c-ad88-4fe6-bee7-41e096363ac8"],"modelName":"composedModelName160591248046001271"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/408f77a3-b456-458e-91f3-6e7f1423f45e',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  'feb5e35b-f1cc-4fa1-a663-08fe41c79cc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/408f77a3-b456-458e-91f3-6e7f1423f45e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"408f77a3-b456-458e-91f3-6e7f1423f45e","modelName":"composedModelName160591248046001271","status":"creating","createdDateTime":"2020-11-20T22:48:00Z","lastUpdatedDateTime":"2020-11-20T22:48:00Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'd8be025a-06cf-46c9-82ec-ba474c6202a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/408f77a3-b456-458e-91f3-6e7f1423f45e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"408f77a3-b456-458e-91f3-6e7f1423f45e","modelName":"composedModelName160591248046001271","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2020-11-20T22:48:00Z","lastUpdatedDateTime":"2020-11-20T22:48:01Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"1ae42e79-21a3-44fd-a38d-81f8c34c84a7","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"modelId":"a0fb2a3c-ad88-4fe6-bee7-41e096363ac8","errors":[]}]}, [
  'Content-Length',
  '2379',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'f31fdcd0-b7bc-400f-8504-486dba7d2693',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:48:00 GMT'
]);
