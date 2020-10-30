let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"6":"modelName160409716123904971"},"newDate":{}}

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
  '636cb542-2746-48b1-bc2c-d64517f30e00',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ak0KsTYDp2VNpi6fbgp4VDD0CyfMAQAAAIiLLtcOAAAA; expires=Sun, 29-Nov-2020 22:32:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:32:40 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409716123904971"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '1f7f3785-2385-4578-bc19-5def17a28c56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2","modelName":"modelName160409716123904971","status":"creating","createdDateTime":"2020-10-30T22:32:42Z","lastUpdatedDateTime":"2020-10-30T22:32:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '46bb356c-5ed3-4595-93ce-afda2e336d85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2","modelName":"modelName160409716123904971","status":"creating","createdDateTime":"2020-10-30T22:32:42Z","lastUpdatedDateTime":"2020-10-30T22:32:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'fd214bfa-0f93-4a9e-8fc8-e9916b1e384e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2","modelName":"modelName160409716123904971","status":"creating","createdDateTime":"2020-10-30T22:32:42Z","lastUpdatedDateTime":"2020-10-30T22:32:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '4b5eb913-1c26-4f8a-b25b-a03a5520463c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2","modelName":"modelName160409716123904971","status":"creating","createdDateTime":"2020-10-30T22:32:42Z","lastUpdatedDateTime":"2020-10-30T22:32:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '48400879-0ded-4e12-9afa-075c2b6f73dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2","status":"ready","createdDateTime":"2020-10-30T22:32:42Z","lastUpdatedDateTime":"2020-10-30T22:32:55Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'a2dafa1f-719f-4397-b4d6-f028bd1269ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:56 GMT'
]);
