let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName160409701196703558"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'fefea420-61fe-4721-9ad7-db06db161200',
  'x-ms-ests-server',
  '2.1.11198.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvcozjdhwH5GiHPPT1z3_Ff0CyfMAQAAAPOKLtcOAAAA; expires=Sun, 29-Nov-2020 22:30:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:30:11 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName160409701196703558"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'fbbbd0a9-32c5-4538-a28e-b8aee34476d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ef4560d0-3b02-41a4-baa4-6ebe24f31149","modelName":"copyModelName160409701196703558","status":"creating","createdDateTime":"2020-10-30T22:30:12Z","lastUpdatedDateTime":"2020-10-30T22:30:12Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '3b2993f5-a122-44bf-9bc6-97b179bc0749',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ef4560d0-3b02-41a4-baa4-6ebe24f31149","modelName":"copyModelName160409701196703558","status":"creating","createdDateTime":"2020-10-30T22:30:12Z","lastUpdatedDateTime":"2020-10-30T22:30:12Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '59a64501-6621-4b54-b36c-48167603a126',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ef4560d0-3b02-41a4-baa4-6ebe24f31149","modelName":"copyModelName160409701196703558","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:30:12Z","lastUpdatedDateTime":"2020-10-30T22:30:14Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '0ed82788-7867-4973-aab0-f02b3c90a15f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8","accessToken":"accessToken","expirationDateTimeTicks":1604183418}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/709cc424-7fb3-4e92-aec9-62c9f5ce27a8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '3282c985-413d-4510-b233-12a592b6c3b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8","accessToken":"accessToken","expirationDateTimeTicks":1604183418}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149/copyresults/a7345f14-513f-4cd2-9642-ff35408f5662',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '68119c3e-9653-4a92-9223-5180531f7488',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149/copyResults/a7345f14-513f-4cd2-9642-ff35408f5662')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:30:18Z","lastUpdatedDateTime":"2020-10-30T22:30:18Z","copyResult":{"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'aff4fcea-13a1-47a3-a6c2-eadd8497ccab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149/copyResults/a7345f14-513f-4cd2-9642-ff35408f5662')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-30T22:30:18Z","lastUpdatedDateTime":"2020-10-30T22:30:18Z","copyResult":{"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '91996b92-95ae-4f46-aad3-0fddd2fcadbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ef4560d0-3b02-41a4-baa4-6ebe24f31149/copyResults/a7345f14-513f-4cd2-9642-ff35408f5662')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-30T22:30:20.8251273Z","lastUpdatedDateTime":"2020-10-30T22:30:20.8251277Z","copyResult":{"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'b613839e-8f90-4350-a19e-0e9c7c3cac33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/709cc424-7fb3-4e92-aec9-62c9f5ce27a8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8","modelName":"copyModelName160409701196703558","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:30:12Z","lastUpdatedDateTime":"2020-10-30T22:30:14Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '45186d32-b891-4c3d-bf52-32070d8e9c7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:23 GMT'
]);
