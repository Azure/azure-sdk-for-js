let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"4":"modelName161714570792206901"},"newDate":{}}

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
  '3b726c0c-8821-4d7c-806d-e61bbafae401',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mCgAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:08:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:08:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName161714570792206901"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d',
  'x-envoy-upstream-service-time',
  '255',
  'apim-request-id',
  '038dc18f-185f-4633-bbcb-77b2be329270',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"138056a4-0599-43c6-a6ee-3238249e897d","modelName":"modelName161714570792206901","status":"creating","createdDateTime":"2021-03-30T23:08:28Z","lastUpdatedDateTime":"2021-03-30T23:08:28Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '159a40af-7f95-4914-98c1-b23396c4e3c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"138056a4-0599-43c6-a6ee-3238249e897d","modelName":"modelName161714570792206901","status":"creating","createdDateTime":"2021-03-30T23:08:28Z","lastUpdatedDateTime":"2021-03-30T23:08:28Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'c6c65b2f-4f28-4318-b4b8-d9f4565b2f54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"138056a4-0599-43c6-a6ee-3238249e897d","modelName":"modelName161714570792206901","status":"creating","createdDateTime":"2021-03-30T23:08:28Z","lastUpdatedDateTime":"2021-03-30T23:08:28Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '2a2972de-e19d-4310-a565-51293f5cadf0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"138056a4-0599-43c6-a6ee-3238249e897d","modelName":"modelName161714570792206901","status":"creating","createdDateTime":"2021-03-30T23:08:28Z","lastUpdatedDateTime":"2021-03-30T23:08:28Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '2c84a0d1-c6f4-4904-81cd-49b3e21f5577',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"138056a4-0599-43c6-a6ee-3238249e897d","modelName":"modelName161714570792206901","status":"creating","createdDateTime":"2021-03-30T23:08:28Z","lastUpdatedDateTime":"2021-03-30T23:08:28Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '5126bd75-6865-401e-982b-c4baff11d30f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/138056a4-0599-43c6-a6ee-3238249e897d')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"138056a4-0599-43c6-a6ee-3238249e897d","modelName":"modelName161714570792206901","status":"ready","createdDateTime":"2021-03-30T23:08:28Z","lastUpdatedDateTime":"2021-03-30T23:08:45Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'b6b4410e-cdd4-4e35-a8f3-82f7c780938a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:48 GMT'
]);
