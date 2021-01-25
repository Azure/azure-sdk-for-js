let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"3":"modelName160434042281708356"},"newDate":{}}

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
  '88c04797-0b78-4bd7-9eaf-f047d1eaa400',
  'x-ms-ests-server',
  '2.1.11198.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Atc5BGbDmsNOgE3jnr9uhzT0CyfMAQAAAMZBMtcOAAAA; expires=Wed, 02-Dec-2020 18:07:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:07:02 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160434042281708356"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'ee647d58-a54e-413c-8580-ee2158559de8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b7f4fcb0-cc76-4f46-975b-e2d4823ee621","modelName":"modelName160434042281708356","status":"creating","createdDateTime":"2020-11-02T18:07:03Z","lastUpdatedDateTime":"2020-11-02T18:07:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'd29e2b85-bfc3-40b9-9653-cfa5f0f3e078',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b7f4fcb0-cc76-4f46-975b-e2d4823ee621","modelName":"modelName160434042281708356","status":"creating","createdDateTime":"2020-11-02T18:07:03Z","lastUpdatedDateTime":"2020-11-02T18:07:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'da4d1dc1-412d-4199-9885-22693f55c4b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b7f4fcb0-cc76-4f46-975b-e2d4823ee621","modelName":"modelName160434042281708356","status":"creating","createdDateTime":"2020-11-02T18:07:03Z","lastUpdatedDateTime":"2020-11-02T18:07:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '76a18833-e6e7-4b67-94e6-62b55d346af1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b7f4fcb0-cc76-4f46-975b-e2d4823ee621","modelName":"modelName160434042281708356","status":"creating","createdDateTime":"2020-11-02T18:07:03Z","lastUpdatedDateTime":"2020-11-02T18:07:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '4f726c32-c331-498a-bb6e-43c28dad19ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b7f4fcb0-cc76-4f46-975b-e2d4823ee621","modelName":"modelName160434042281708356","status":"creating","createdDateTime":"2020-11-02T18:07:03Z","lastUpdatedDateTime":"2020-11-02T18:07:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'c0fa5ecc-47f1-4d1f-8eed-fc90c0fb59ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b7f4fcb0-cc76-4f46-975b-e2d4823ee621')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b7f4fcb0-cc76-4f46-975b-e2d4823ee621","status":"ready","createdDateTime":"2020-11-02T18:07:03Z","lastUpdatedDateTime":"2020-11-02T18:07:19Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '2bb441ea-88cc-4e2f-bd0c-20e5e9ed52ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:23 GMT'
]);
