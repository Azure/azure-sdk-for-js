let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"1":"modelName160434038557101453"},"newDate":{}}

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
  '40ce2cfa-0677-4a20-a1cf-0e2d38fa9a00',
  'x-ms-ests-server',
  '2.1.11198.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aisvyh2G0hdLiM2CFy1J9Cv0CyfMAQAAAKFBMtcOAAAA; expires=Wed, 02-Dec-2020 18:06:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:06:24 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160434038557101453"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/891fe24d-c3dd-4ae1-b0f5-6e05733a160d',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '2d17c808-2d89-41d5-9677-ed48d1b340ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/891fe24d-c3dd-4ae1-b0f5-6e05733a160d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"891fe24d-c3dd-4ae1-b0f5-6e05733a160d","modelName":"modelName160434038557101453","status":"creating","createdDateTime":"2020-11-02T18:06:26Z","lastUpdatedDateTime":"2020-11-02T18:06:26Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '3d8e0767-b9d8-4fb8-9774-a7abf16e4ba8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/891fe24d-c3dd-4ae1-b0f5-6e05733a160d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"891fe24d-c3dd-4ae1-b0f5-6e05733a160d","modelName":"modelName160434038557101453","status":"creating","createdDateTime":"2020-11-02T18:06:26Z","lastUpdatedDateTime":"2020-11-02T18:06:26Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '989fd981-790e-4c2c-83c6-4a259b499c04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/891fe24d-c3dd-4ae1-b0f5-6e05733a160d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"891fe24d-c3dd-4ae1-b0f5-6e05733a160d","modelName":"modelName160434038557101453","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:06:26Z","lastUpdatedDateTime":"2020-11-02T18:06:27Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '46a26b02-a20d-47a3-8008-505e81a57e01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:31 GMT'
]);
