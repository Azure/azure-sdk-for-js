let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"1":"modelName160409654330404681"},"newDate":{}}

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
  '8b1f07a0-1e12-46bf-b803-4b1590610f00',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArxwOTkPX4BJuIsJ5mVr4GT0CyfMAQAAAB-JLtcOAAAA; expires=Sun, 29-Nov-2020 22:22:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:22:23 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":true,"modelName":"modelName160409654330404681"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/6e428785-b987-443f-9a01-7c0c9223515f',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'fc996046-0b77-4df1-83b6-52176f238547',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:22:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6e428785-b987-443f-9a01-7c0c9223515f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6e428785-b987-443f-9a01-7c0c9223515f","modelName":"modelName160409654330404681","status":"creating","createdDateTime":"2020-10-30T22:22:23Z","lastUpdatedDateTime":"2020-10-30T22:22:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'ab8f2bf4-b4a0-41a8-a71a-d558e3723e78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:22:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6e428785-b987-443f-9a01-7c0c9223515f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6e428785-b987-443f-9a01-7c0c9223515f","modelName":"modelName160409654330404681","status":"creating","createdDateTime":"2020-10-30T22:22:23Z","lastUpdatedDateTime":"2020-10-30T22:22:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '18fd4352-1b9f-468b-b501-6569fdffcb45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:22:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6e428785-b987-443f-9a01-7c0c9223515f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"6e428785-b987-443f-9a01-7c0c9223515f","modelName":"modelName160409654330404681","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:22:23Z","lastUpdatedDateTime":"2020-10-30T22:22:25Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":1},{"fieldName":"CompanyPhoneNumber","accuracy":1},{"fieldName":"DatedAs","accuracy":1},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":1},{"fieldName":"PhoneNumber","accuracy":1},{"fieldName":"PurchaseOrderNumber","accuracy":1},{"fieldName":"Quantity","accuracy":1},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":1},{"fieldName":"Tax","accuracy":1},{"fieldName":"Total","accuracy":1},{"fieldName":"VendorName","accuracy":1},{"fieldName":"Website","accuracy":1}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9e74f833-28ae-4849-ae47-5ac50dbc8dcd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:22:29 GMT'
]);
