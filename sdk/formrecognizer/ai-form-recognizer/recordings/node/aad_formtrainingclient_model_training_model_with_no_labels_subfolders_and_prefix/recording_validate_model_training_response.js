let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"3":"modelName160591272656504110"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '9edca42f-623b-4d13-8ab0-b8e2e2822300',
  'x-ms-ests-server',
  '2.1.11251.20 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqPN67mkvopFhAiddUGy_czGLH8mAQAAAJU_StcOAAAA; expires=Sun, 20-Dec-2020 22:52:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:52:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160591272656504110"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '128fa305-73b4-4231-b9a7-52d58416f939',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c01ea28a-8731-4262-b2cd-ef75057a8e4e","modelName":"modelName160591272656504110","status":"creating","createdDateTime":"2020-11-20T22:52:07Z","lastUpdatedDateTime":"2020-11-20T22:52:07Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'ef02403b-cc5b-4819-aebd-7d0e42b9b578',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c01ea28a-8731-4262-b2cd-ef75057a8e4e","modelName":"modelName160591272656504110","status":"creating","createdDateTime":"2020-11-20T22:52:07Z","lastUpdatedDateTime":"2020-11-20T22:52:07Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'dd180cb6-e6d9-4205-945b-ddbc7e17aee9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c01ea28a-8731-4262-b2cd-ef75057a8e4e","modelName":"modelName160591272656504110","status":"creating","createdDateTime":"2020-11-20T22:52:07Z","lastUpdatedDateTime":"2020-11-20T22:52:07Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '12274711-339e-4b6c-9558-d8ea12c226cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c01ea28a-8731-4262-b2cd-ef75057a8e4e","modelName":"modelName160591272656504110","status":"creating","createdDateTime":"2020-11-20T22:52:07Z","lastUpdatedDateTime":"2020-11-20T22:52:07Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'a768afb0-b2a7-4531-9289-b639f7bbb39d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"c01ea28a-8731-4262-b2cd-ef75057a8e4e","status":"ready","createdDateTime":"2020-11-20T22:52:07Z","lastUpdatedDateTime":"2020-11-20T22:52:20Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1022',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '5c505c6a-e4cd-4781-904a-dfe538792aaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:52:22 GMT'
]);
