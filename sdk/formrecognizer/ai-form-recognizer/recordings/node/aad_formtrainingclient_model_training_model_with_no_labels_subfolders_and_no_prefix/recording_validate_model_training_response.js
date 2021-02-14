let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"4":"modelName160591275440001886"},"newDate":{}}

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
  '4547ee6a-35a5-4745-b4bc-1fec159d2700',
  'x-ms-ests-server',
  '2.1.11251.20 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AplXIPJsK8NApg6EA64Nneo; expires=Sun, 20-Dec-2020 22:52:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:52:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160591275440001886"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  'b3bbceb4-aa26-4714-b750-2f811a10ccd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"323be9ed-dbc2-4309-a3f7-e13c72aa8203","modelName":"modelName160591275440001886","status":"creating","createdDateTime":"2020-11-20T22:52:34Z","lastUpdatedDateTime":"2020-11-20T22:52:34Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'cf530f5c-91f2-4a7f-8a37-0f79693a20e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"323be9ed-dbc2-4309-a3f7-e13c72aa8203","modelName":"modelName160591275440001886","status":"creating","createdDateTime":"2020-11-20T22:52:34Z","lastUpdatedDateTime":"2020-11-20T22:52:34Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '30305b5e-a577-4ef4-b6a6-c04027c9de74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"323be9ed-dbc2-4309-a3f7-e13c72aa8203","modelName":"modelName160591275440001886","status":"creating","createdDateTime":"2020-11-20T22:52:34Z","lastUpdatedDateTime":"2020-11-20T22:52:34Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '19bb65e4-6672-44c9-a0e7-7fc715537358',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"323be9ed-dbc2-4309-a3f7-e13c72aa8203","modelName":"modelName160591275440001886","status":"creating","createdDateTime":"2020-11-20T22:52:34Z","lastUpdatedDateTime":"2020-11-20T22:52:34Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '3a2d6932-93dc-470e-bfc1-e9908ae4b0d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"323be9ed-dbc2-4309-a3f7-e13c72aa8203","status":"ready","createdDateTime":"2020-11-20T22:52:34Z","lastUpdatedDateTime":"2020-11-20T22:52:49Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1022',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'd991fd51-3d08-4ff3-90fa-85d13aaa3989',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:49 GMT'
]);
