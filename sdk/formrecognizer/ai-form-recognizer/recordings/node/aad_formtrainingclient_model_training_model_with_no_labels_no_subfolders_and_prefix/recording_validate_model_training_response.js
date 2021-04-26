let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"5":"modelName161714574030503298"},"newDate":{}}

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
  '04946344-6b32-4d6b-8f2b-2c335769ed01',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjzFVQ1mzahOgLFbzhWoi1fGLH8mCwAAAPal9dcOAAAA; expires=Thu, 29-Apr-2021 23:09:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Mar 2021 23:09:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName161714574030503298"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246',
  'x-envoy-upstream-service-time',
  '259',
  'apim-request-id',
  '1209c69b-9f98-4df1-88d8-5dd950fa0453',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d62157c-86a7-453e-98cd-021f55c71246","modelName":"modelName161714574030503298","status":"creating","createdDateTime":"2021-03-30T23:09:00Z","lastUpdatedDateTime":"2021-03-30T23:09:00Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '0b83a42f-1901-463f-86df-201405671d77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d62157c-86a7-453e-98cd-021f55c71246","modelName":"modelName161714574030503298","status":"creating","createdDateTime":"2021-03-30T23:09:00Z","lastUpdatedDateTime":"2021-03-30T23:09:00Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '7be3c41a-10f3-4a3d-9a09-5218f10071ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:08:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d62157c-86a7-453e-98cd-021f55c71246","modelName":"modelName161714574030503298","status":"creating","createdDateTime":"2021-03-30T23:09:00Z","lastUpdatedDateTime":"2021-03-30T23:09:00Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '2643c2d5-9382-41f0-9a0c-3b28dc480eaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d62157c-86a7-453e-98cd-021f55c71246","modelName":"modelName161714574030503298","status":"creating","createdDateTime":"2021-03-30T23:09:00Z","lastUpdatedDateTime":"2021-03-30T23:09:00Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'c9c3cf60-a61a-4a1e-93ca-db7b60caa59a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d62157c-86a7-453e-98cd-021f55c71246","modelName":"modelName161714574030503298","status":"creating","createdDateTime":"2021-03-30T23:09:00Z","lastUpdatedDateTime":"2021-03-30T23:09:00Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '020d42c1-4fea-4c3b-bed5-654a8e8d8f2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4d62157c-86a7-453e-98cd-021f55c71246')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"4d62157c-86a7-453e-98cd-021f55c71246","modelName":"modelName161714574030503298","status":"ready","createdDateTime":"2021-03-30T23:09:00Z","lastUpdatedDateTime":"2021-03-30T23:09:18Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'e5f473d2-e98d-4794-8a34-43ade49c7ff9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:09:20 GMT'
]);
