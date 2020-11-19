let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"5":"modelName160434050040703533"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1500',
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
  'f43ebce8-2779-4612-8b98-409ede3d9f00',
  'x-ms-ests-server',
  '2.1.11198.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag82Wga0KkNFsNk6GSwymnj0CyfMAQAAABRCMtcOAAAA; expires=Wed, 02-Dec-2020 18:08:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:08:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160434050040703533"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '3069ad10-a2a2-4548-bee4-7cd9ad9b0d57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","modelName":"modelName160434050040703533","status":"creating","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:20Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '74cbdce8-4a73-45da-92e2-49ce9bbfb189',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","modelName":"modelName160434050040703533","status":"creating","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:20Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'e3a0cc82-d45f-4a48-8e8a-c881aa002b1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","modelName":"modelName160434050040703533","status":"creating","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:20Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'b905dbf0-0e45-4c3a-8c20-65ebcffc647a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","modelName":"modelName160434050040703533","status":"creating","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:20Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '1c8f7964-efeb-4de0-8bc3-54caec86d840',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","modelName":"modelName160434050040703533","status":"creating","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:20Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'e6bd2ca9-811c-43b7-a184-1806703625e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","modelName":"modelName160434050040703533","status":"creating","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:20Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '4052ee2f-5026-4f62-83af-2a22252dab12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/de8234ae-6b7c-495b-ae52-d0071df494f7')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"de8234ae-6b7c-495b-ae52-d0071df494f7","status":"ready","createdDateTime":"2020-11-02T18:08:20Z","lastUpdatedDateTime":"2020-11-02T18:08:37Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '324f0dd3-ec6c-4539-90be-202f9da52c9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:46 GMT'
]);
