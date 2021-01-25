let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"6":"modelName160434053903400727"},"newDate":{}}

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
  'dd5e85d2-b709-4903-a5e7-4b47c95c9a00',
  'x-ms-ests-server',
  '2.1.11198.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AleuJxJTzsFDs-rNv4GDUID0CyfMAQAAADtCMtcOAAAA; expires=Wed, 02-Dec-2020 18:08:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:08:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160434053903400727"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'fd3c4e08-526f-4b05-b032-728c021786d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"58dfd72d-2863-4fdb-96dc-46cf3f08a610","modelName":"modelName160434053903400727","status":"creating","createdDateTime":"2020-11-02T18:08:59Z","lastUpdatedDateTime":"2020-11-02T18:08:59Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '08b67cac-c8a9-4f44-ab6f-89b8dcf5257b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"58dfd72d-2863-4fdb-96dc-46cf3f08a610","modelName":"modelName160434053903400727","status":"creating","createdDateTime":"2020-11-02T18:08:59Z","lastUpdatedDateTime":"2020-11-02T18:08:59Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '79dafeae-368d-4eba-ae36-d22e57d875e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"58dfd72d-2863-4fdb-96dc-46cf3f08a610","modelName":"modelName160434053903400727","status":"creating","createdDateTime":"2020-11-02T18:08:59Z","lastUpdatedDateTime":"2020-11-02T18:08:59Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '72557433-1e64-4b23-9fe5-51790b2fe893',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"58dfd72d-2863-4fdb-96dc-46cf3f08a610","modelName":"modelName160434053903400727","status":"creating","createdDateTime":"2020-11-02T18:08:59Z","lastUpdatedDateTime":"2020-11-02T18:08:59Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '64159538-61b7-45a5-a13a-8ce794e98066',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"58dfd72d-2863-4fdb-96dc-46cf3f08a610","modelName":"modelName160434053903400727","status":"creating","createdDateTime":"2020-11-02T18:08:59Z","lastUpdatedDateTime":"2020-11-02T18:08:59Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '777971b0-8310-47ec-a15f-31ff16640fa8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/58dfd72d-2863-4fdb-96dc-46cf3f08a610')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"58dfd72d-2863-4fdb-96dc-46cf3f08a610","status":"ready","createdDateTime":"2020-11-02T18:08:59Z","lastUpdatedDateTime":"2020-11-02T18:09:19Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '26828388-8ce1-4158-b032-a5cf99cfb22c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:09:19 GMT'
]);
