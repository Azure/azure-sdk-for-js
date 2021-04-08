let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"3":"modelName161714567579609490"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'e21f3fd9-26a6-4f10-b98f-ee6bc3761802',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mCAAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:07:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:07:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName161714567579609490"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  'e19a3e40-d23c-415f-beaf-d5c200f10450',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d96173b1-c5b5-40b6-b6e5-23051ef7f036","modelName":"modelName161714567579609490","status":"creating","createdDateTime":"2021-03-30T23:07:55Z","lastUpdatedDateTime":"2021-03-30T23:07:55Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'fa674bdf-b9c1-4f91-87a1-44d1de62157b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d96173b1-c5b5-40b6-b6e5-23051ef7f036","modelName":"modelName161714567579609490","status":"creating","createdDateTime":"2021-03-30T23:07:55Z","lastUpdatedDateTime":"2021-03-30T23:07:55Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'c111df9a-5069-4f9a-95f2-467ca13aed70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:07:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d96173b1-c5b5-40b6-b6e5-23051ef7f036","modelName":"modelName161714567579609490","status":"creating","createdDateTime":"2021-03-30T23:07:55Z","lastUpdatedDateTime":"2021-03-30T23:07:55Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'e6a9e79e-2656-4223-acf5-248e62658015',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d96173b1-c5b5-40b6-b6e5-23051ef7f036","modelName":"modelName161714567579609490","status":"creating","createdDateTime":"2021-03-30T23:07:55Z","lastUpdatedDateTime":"2021-03-30T23:07:55Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'eb49ddf1-7cf3-46c7-9577-1e3939090ffb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d96173b1-c5b5-40b6-b6e5-23051ef7f036","modelName":"modelName161714567579609490","status":"creating","createdDateTime":"2021-03-30T23:07:55Z","lastUpdatedDateTime":"2021-03-30T23:07:55Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '67f20b81-bd29-482f-b470-3eb801b48806',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/d96173b1-c5b5-40b6-b6e5-23051ef7f036')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"d96173b1-c5b5-40b6-b6e5-23051ef7f036","modelName":"modelName161714567579609490","status":"ready","createdDateTime":"2021-03-30T23:07:55Z","lastUpdatedDateTime":"2021-03-30T23:08:13Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'bcb36f9d-170a-46a1-a8d3-5539556dec5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:15 GMT'
]);
