let nock = require('nock');

module.exports.hash = "f728c256d475c8390b8fd8293968133e";

module.exports.testInfo = {"uniqueName":{"composedModelName":"composedModelName161714560265400665"},"newDate":{}}

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
  '04946344-6b32-4d6b-8f2b-2c33de56ed01',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mAQAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:06:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:06:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input1"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/b92f378c-8d38-4b96-8c14-8c60c41de53d',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '86fb43d6-72f1-47a1-afb6-8ce9bbe36826',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"input2"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/bd998955-e0e9-45a9-ae28-b6d44a8a3c14',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  'a9e3be4c-1405-4a8f-bd94-f60fa14ad820',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b92f378c-8d38-4b96-8c14-8c60c41de53d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b92f378c-8d38-4b96-8c14-8c60c41de53d","modelName":"input1","status":"creating","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:31Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '4f91ebae-7dec-4c2d-af28-ae8f0bebdade',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b92f378c-8d38-4b96-8c14-8c60c41de53d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b92f378c-8d38-4b96-8c14-8c60c41de53d","modelName":"input1","status":"creating","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:31Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'bac02487-ec30-44cb-b989-27d63b85773c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/bd998955-e0e9-45a9-ae28-b6d44a8a3c14')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd998955-e0e9-45a9-ae28-b6d44a8a3c14","modelName":"input2","status":"creating","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:31Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '83783e9a-737e-43ec-b785-77a3b438af36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/bd998955-e0e9-45a9-ae28-b6d44a8a3c14')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd998955-e0e9-45a9-ae28-b6d44a8a3c14","modelName":"input2","status":"creating","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:31Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'f1c7dca5-5c72-48c0-8cd0-3d33acf5f516',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b92f378c-8d38-4b96-8c14-8c60c41de53d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b92f378c-8d38-4b96-8c14-8c60c41de53d","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:35Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'b410d46a-6041-45ce-b815-4b9ee21e2506',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/bd998955-e0e9-45a9-ae28-b6d44a8a3c14')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd998955-e0e9-45a9-ae28-b6d44a8a3c14","modelName":"input2","status":"creating","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:31Z"}}, [
  'Content-Length',
  '191',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '0ee92a25-3b1b-4932-a806-a3ce8a9cdcd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/bd998955-e0e9-45a9-ae28-b6d44a8a3c14')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"bd998955-e0e9-45a9-ae28-b6d44a8a3c14","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:06:31Z","lastUpdatedDateTime":"2021-03-30T23:06:39Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'f328e41a-8eb1-439c-95f2-a934eb945c4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/compose', {"modelIds":["b92f378c-8d38-4b96-8c14-8c60c41de53d","bd998955-e0e9-45a9-ae28-b6d44a8a3c14"],"modelName":"composedModelName161714560265400665"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/d527c425-83a6-450f-aad5-14ff25b442fa',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  '0a625fb8-74a8-47e0-96e6-d671adf56503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d527c425-83a6-450f-aad5-14ff25b442fa')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d527c425-83a6-450f-aad5-14ff25b442fa","modelName":"composedModelName161714560265400665","status":"creating","createdDateTime":"2021-03-30T23:06:42Z","lastUpdatedDateTime":"2021-03-30T23:06:42Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '18d2a802-6008-48a1-bb81-46b5784383aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d527c425-83a6-450f-aad5-14ff25b442fa')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d527c425-83a6-450f-aad5-14ff25b442fa","modelName":"composedModelName161714560265400665","status":"creating","createdDateTime":"2021-03-30T23:06:42Z","lastUpdatedDateTime":"2021-03-30T23:06:42Z"}}, [
  'Content-Length',
  '220',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '62d241ac-19ad-4427-b777-f63846708166',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d527c425-83a6-450f-aad5-14ff25b442fa')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d527c425-83a6-450f-aad5-14ff25b442fa","modelName":"composedModelName161714560265400665","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-03-30T23:06:42Z","lastUpdatedDateTime":"2021-03-30T23:06:43Z"},"composedTrainResults":[{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"b92f378c-8d38-4b96-8c14-8c60c41de53d","errors":[]},{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"modelId":"bd998955-e0e9-45a9-ae28-b6d44a8a3c14","errors":[]}]}, [
  'Content-Length',
  '2427',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'ca7f4694-13c1-4382-9266-572c6a90e939',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:06:47 GMT'
]);
