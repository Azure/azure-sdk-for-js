let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"5":"modelName160409713282909803"},"newDate":{}}

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
  'a8f5ba1c-bfd8-4c96-94ec-423543021000',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiFjiHIlK-hEphi_HMYbRij0CyfMAQAAAGyLLtcOAAAA; expires=Sun, 29-Nov-2020 22:32:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:32:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160409713282909803"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'a98fb198-3645-4c34-bf74-e059352af218',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"967394f6-1d24-4978-98e3-f9db0f5e7987","modelName":"modelName160409713282909803","status":"creating","createdDateTime":"2020-10-30T22:32:13Z","lastUpdatedDateTime":"2020-10-30T22:32:13Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '2e051ca0-37bb-4c1b-98d0-27336d916010',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"967394f6-1d24-4978-98e3-f9db0f5e7987","modelName":"modelName160409713282909803","status":"creating","createdDateTime":"2020-10-30T22:32:13Z","lastUpdatedDateTime":"2020-10-30T22:32:13Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '6949d03c-12f4-42bb-abed-42e28a263f80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"967394f6-1d24-4978-98e3-f9db0f5e7987","modelName":"modelName160409713282909803","status":"creating","createdDateTime":"2020-10-30T22:32:13Z","lastUpdatedDateTime":"2020-10-30T22:32:13Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '7ce1a4b4-f1b8-48d0-bdb0-48b78868788e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"967394f6-1d24-4978-98e3-f9db0f5e7987","modelName":"modelName160409713282909803","status":"creating","createdDateTime":"2020-10-30T22:32:13Z","lastUpdatedDateTime":"2020-10-30T22:32:13Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'ec1a5af0-81a4-4509-b40a-e493881e3a03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"967394f6-1d24-4978-98e3-f9db0f5e7987","status":"ready","createdDateTime":"2020-10-30T22:32:13Z","lastUpdatedDateTime":"2020-10-30T22:32:28Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '10a73dc8-12ca-41eb-8131-8f883a895753',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:32:28 GMT'
]);
