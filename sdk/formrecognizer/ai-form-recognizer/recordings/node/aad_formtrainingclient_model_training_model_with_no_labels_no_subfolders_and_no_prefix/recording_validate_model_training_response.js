let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"6":"modelName161714577748401047"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '04946344-6b32-4d6b-8f2b-2c33d96ded01',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mDAAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:09:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName161714577748401047"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  'fd99cf29-2488-401d-9b69-cb70157d537b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fd41ff95-08ef-438a-b283-c9c23ea9cab1","modelName":"modelName161714577748401047","status":"creating","createdDateTime":"2021-03-30T23:09:37Z","lastUpdatedDateTime":"2021-03-30T23:09:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'cf9f540f-9681-4f33-b809-0cf833078f1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fd41ff95-08ef-438a-b283-c9c23ea9cab1","modelName":"modelName161714577748401047","status":"creating","createdDateTime":"2021-03-30T23:09:37Z","lastUpdatedDateTime":"2021-03-30T23:09:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '0aa12256-0190-4e8b-a617-032652c184de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fd41ff95-08ef-438a-b283-c9c23ea9cab1","modelName":"modelName161714577748401047","status":"creating","createdDateTime":"2021-03-30T23:09:37Z","lastUpdatedDateTime":"2021-03-30T23:09:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '37aa8289-23dd-4bac-b89c-ad70d5849231',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fd41ff95-08ef-438a-b283-c9c23ea9cab1","modelName":"modelName161714577748401047","status":"creating","createdDateTime":"2021-03-30T23:09:37Z","lastUpdatedDateTime":"2021-03-30T23:09:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'f217fbaf-da40-4e09-ac29-0108e71baa78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fd41ff95-08ef-438a-b283-c9c23ea9cab1","modelName":"modelName161714577748401047","status":"creating","createdDateTime":"2021-03-30T23:09:37Z","lastUpdatedDateTime":"2021-03-30T23:09:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '2da67da1-5fa6-49b1-b4e9-e3a7b1714687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/fd41ff95-08ef-438a-b283-c9c23ea9cab1')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"fd41ff95-08ef-438a-b283-c9c23ea9cab1","modelName":"modelName161714577748401047","status":"ready","createdDateTime":"2021-03-30T23:09:37Z","lastUpdatedDateTime":"2021-03-30T23:09:54Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '9f434a66-ca53-462d-8c71-e0a12d7afcb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:57 GMT'
]);
