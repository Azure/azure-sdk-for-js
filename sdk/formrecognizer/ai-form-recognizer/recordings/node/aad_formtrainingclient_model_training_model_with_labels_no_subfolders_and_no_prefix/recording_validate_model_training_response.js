let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"2":"modelName160434040411104380"},"newDate":{}}

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
  '6bac265f-7f7f-40af-914b-e908a06a9400',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai-DE4GHu6NGi9TI1VQ7GxD0CyfMAQAAALRBMtcOAAAA; expires=Wed, 02-Dec-2020 18:06:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:06:44 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160434040411104380"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/2e6ed808-e037-4eff-868b-189a17dfb98a',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'b868f699-8b31-444f-90fe-8ba21b69090e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2e6ed808-e037-4eff-868b-189a17dfb98a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"2e6ed808-e037-4eff-868b-189a17dfb98a","modelName":"modelName160434040411104380","status":"creating","createdDateTime":"2020-11-02T18:06:45Z","lastUpdatedDateTime":"2020-11-02T18:06:45Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '49cb91e4-1196-40fe-b6af-abf2466ca9d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2e6ed808-e037-4eff-868b-189a17dfb98a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"2e6ed808-e037-4eff-868b-189a17dfb98a","modelName":"modelName160434040411104380","status":"creating","createdDateTime":"2020-11-02T18:06:45Z","lastUpdatedDateTime":"2020-11-02T18:06:45Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'a3165d23-82a5-4001-a64b-979dfd85e4d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/2e6ed808-e037-4eff-868b-189a17dfb98a')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"2e6ed808-e037-4eff-868b-189a17dfb98a","modelName":"modelName160434040411104380","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-02T18:06:45Z","lastUpdatedDateTime":"2020-11-02T18:06:46Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '43667749-215e-46ac-a59c-c2148938706e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:06:50 GMT'
]);
