let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"6":"modelName160409668160500036"},"newDate":{}}

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
  '910c5f69-e29b-4c8d-8836-8ba815a40f00',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AokV6zTSNx5KpeNxKkbW60b0CyfMAQAAAKiJLtcOAAAA; expires=Sun, 29-Nov-2020 22:24:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:24:41 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409668160500036"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'e17ab71a-72ac-4b09-8055-73418f75c677',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13bf28d4-7ae4-4530-b10e-eae5f447af9c","modelName":"modelName160409668160500036","status":"creating","createdDateTime":"2020-10-30T22:24:42Z","lastUpdatedDateTime":"2020-10-30T22:24:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'e77a7af7-8454-414f-b794-c1f7b81e9937',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13bf28d4-7ae4-4530-b10e-eae5f447af9c","modelName":"modelName160409668160500036","status":"creating","createdDateTime":"2020-10-30T22:24:42Z","lastUpdatedDateTime":"2020-10-30T22:24:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'd17cd78a-e503-4734-b144-96a652c418d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13bf28d4-7ae4-4530-b10e-eae5f447af9c","modelName":"modelName160409668160500036","status":"creating","createdDateTime":"2020-10-30T22:24:42Z","lastUpdatedDateTime":"2020-10-30T22:24:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '51fc4a95-f752-4b21-83fb-b27ae9b96152',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13bf28d4-7ae4-4530-b10e-eae5f447af9c","modelName":"modelName160409668160500036","status":"creating","createdDateTime":"2020-10-30T22:24:42Z","lastUpdatedDateTime":"2020-10-30T22:24:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'af25bfe2-e089-4c05-a569-d4aa3193e79c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13bf28d4-7ae4-4530-b10e-eae5f447af9c","modelName":"modelName160409668160500036","status":"creating","createdDateTime":"2020-10-30T22:24:42Z","lastUpdatedDateTime":"2020-10-30T22:24:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '54af3602-d1b7-49cd-9f3e-957b3750148f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/13bf28d4-7ae4-4530-b10e-eae5f447af9c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"13bf28d4-7ae4-4530-b10e-eae5f447af9c","status":"ready","createdDateTime":"2020-10-30T22:24:42Z","lastUpdatedDateTime":"2020-10-30T22:24:58Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'cc30d1ba-5116-4816-b184-b0f35a8200cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:25:02 GMT'
]);
