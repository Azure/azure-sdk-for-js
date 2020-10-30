let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"4":"modelName160409661402305677"},"newDate":{}}

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
  'cbaf35e8-ac88-4b7a-acc6-a13a64431000',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjTxlRjewUZDhSNbTXGU0Rr0CyfMAQAAAGWJLtcOAAAA; expires=Sun, 29-Nov-2020 22:23:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:23:33 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409661402305677"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/37c98cdf-e22d-4a74-80d3-32cdb04b8fbd',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '9be94f08-cf76-4a1c-b4ff-cd56794d3d47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/37c98cdf-e22d-4a74-80d3-32cdb04b8fbd')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"37c98cdf-e22d-4a74-80d3-32cdb04b8fbd","modelName":"modelName160409661402305677","status":"creating","createdDateTime":"2020-10-30T22:23:34Z","lastUpdatedDateTime":"2020-10-30T22:23:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'cdfdbf56-2200-4e90-903f-071f55b2f7a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/37c98cdf-e22d-4a74-80d3-32cdb04b8fbd')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"37c98cdf-e22d-4a74-80d3-32cdb04b8fbd","modelName":"modelName160409661402305677","status":"creating","createdDateTime":"2020-10-30T22:23:34Z","lastUpdatedDateTime":"2020-10-30T22:23:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'b46607e9-86a1-4feb-8ef9-d6fd513c5b20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/37c98cdf-e22d-4a74-80d3-32cdb04b8fbd')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"37c98cdf-e22d-4a74-80d3-32cdb04b8fbd","modelName":"modelName160409661402305677","status":"creating","createdDateTime":"2020-10-30T22:23:34Z","lastUpdatedDateTime":"2020-10-30T22:23:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '127864dd-f818-485e-884e-e3931c1e7835',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/37c98cdf-e22d-4a74-80d3-32cdb04b8fbd')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"37c98cdf-e22d-4a74-80d3-32cdb04b8fbd","modelName":"modelName160409661402305677","status":"creating","createdDateTime":"2020-10-30T22:23:34Z","lastUpdatedDateTime":"2020-10-30T22:23:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '56c35a1c-ee6d-404b-a2fa-eeab3ac69bc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/37c98cdf-e22d-4a74-80d3-32cdb04b8fbd')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"37c98cdf-e22d-4a74-80d3-32cdb04b8fbd","status":"ready","createdDateTime":"2020-10-30T22:23:34Z","lastUpdatedDateTime":"2020-10-30T22:23:50Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '30c86fc7-0ea2-4bc7-83fe-6076ba585b72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:50 GMT'
]);
