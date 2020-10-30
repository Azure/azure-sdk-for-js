let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"5":"modelName160409664762509289"},"newDate":{}}

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
  '2f3b08df-5b44-488c-9d07-2f8e03a80f00',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiCXN5_ZCTFMuyhJPHCqUC_0CyfMAQAAAIeJLtcOAAAA; expires=Sun, 29-Nov-2020 22:24:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409664762509289"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/617eae25-e3f2-428b-8bcc-161ff54ab47f',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '44c24552-ef20-4eca-976f-90cd8c1b45c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/617eae25-e3f2-428b-8bcc-161ff54ab47f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"617eae25-e3f2-428b-8bcc-161ff54ab47f","modelName":"modelName160409664762509289","status":"creating","createdDateTime":"2020-10-30T22:24:08Z","lastUpdatedDateTime":"2020-10-30T22:24:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'fda84eeb-ad1f-46d6-b7c1-21b815b85ae2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/617eae25-e3f2-428b-8bcc-161ff54ab47f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"617eae25-e3f2-428b-8bcc-161ff54ab47f","modelName":"modelName160409664762509289","status":"creating","createdDateTime":"2020-10-30T22:24:08Z","lastUpdatedDateTime":"2020-10-30T22:24:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '97484620-a04e-4088-b05c-0898b0499621',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/617eae25-e3f2-428b-8bcc-161ff54ab47f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"617eae25-e3f2-428b-8bcc-161ff54ab47f","modelName":"modelName160409664762509289","status":"creating","createdDateTime":"2020-10-30T22:24:08Z","lastUpdatedDateTime":"2020-10-30T22:24:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '41ae1c40-4438-4aab-aa2e-f175cb27b52e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/617eae25-e3f2-428b-8bcc-161ff54ab47f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"617eae25-e3f2-428b-8bcc-161ff54ab47f","modelName":"modelName160409664762509289","status":"creating","createdDateTime":"2020-10-30T22:24:08Z","lastUpdatedDateTime":"2020-10-30T22:24:08Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '729a633b-3143-45f5-bbce-1b13045b7d82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/617eae25-e3f2-428b-8bcc-161ff54ab47f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"617eae25-e3f2-428b-8bcc-161ff54ab47f","status":"ready","createdDateTime":"2020-10-30T22:24:08Z","lastUpdatedDateTime":"2020-10-30T22:24:21Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'da78dbd1-04b8-4aa2-8b60-ec8af2f027d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:24:23 GMT'
]);
