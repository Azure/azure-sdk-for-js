let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"3":"modelName160409705970900253"},"newDate":{}}

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
  'cbaf35e8-ac88-4b7a-acc6-a13a0d991000',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aq9ToWPJPPNHgeUmBr0bYi8; expires=Sun, 29-Nov-2020 22:30:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:30:59 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409705970900253"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'ef5086f4-cfa7-4624-9f24-2392dfa2a3b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"85f64af2-84ff-4042-a41a-5e45f64fd1a6","modelName":"modelName160409705970900253","status":"creating","createdDateTime":"2020-10-30T22:31:00Z","lastUpdatedDateTime":"2020-10-30T22:31:00Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'aab7f871-a025-4b1d-b25e-52a51e98b9e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"85f64af2-84ff-4042-a41a-5e45f64fd1a6","modelName":"modelName160409705970900253","status":"creating","createdDateTime":"2020-10-30T22:31:00Z","lastUpdatedDateTime":"2020-10-30T22:31:00Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '97a45d4d-0dfe-42f6-8b23-211819822924',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:30:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"85f64af2-84ff-4042-a41a-5e45f64fd1a6","modelName":"modelName160409705970900253","status":"creating","createdDateTime":"2020-10-30T22:31:00Z","lastUpdatedDateTime":"2020-10-30T22:31:00Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '9009e0a2-d980-4cc4-ad26-4430f5d74076',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"85f64af2-84ff-4042-a41a-5e45f64fd1a6","modelName":"modelName160409705970900253","status":"creating","createdDateTime":"2020-10-30T22:31:00Z","lastUpdatedDateTime":"2020-10-30T22:31:00Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '9bff581c-e042-4f7e-833a-fe7145add249',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"85f64af2-84ff-4042-a41a-5e45f64fd1a6","modelName":"modelName160409705970900253","status":"creating","createdDateTime":"2020-10-30T22:31:00Z","lastUpdatedDateTime":"2020-10-30T22:31:00Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '769ed635-87a5-4f5a-9f6b-802a712b3ba1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"85f64af2-84ff-4042-a41a-5e45f64fd1a6","status":"ready","createdDateTime":"2020-10-30T22:31:00Z","lastUpdatedDateTime":"2020-10-30T22:31:19Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'aa773fbc-a65c-4f63-b797-2746d79133de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:20 GMT'
]);
