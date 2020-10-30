let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"4":"modelName160409709379600813"},"newDate":{}}

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
  '283c132e-3d81-4886-9d54-88c0facd0e00',
  'x-ms-ests-server',
  '2.1.11198.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmbegXd7RRtJolcUnBI1rs4; expires=Sun, 29-Nov-2020 22:31:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:31:33 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409709379600813"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '50580099-e452-4084-a995-9bd0d48db8db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a4c607c0-6aee-4e32-a81e-531e080fed35","modelName":"modelName160409709379600813","status":"creating","createdDateTime":"2020-10-30T22:31:34Z","lastUpdatedDateTime":"2020-10-30T22:31:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '16887f83-b4fd-4809-ad1d-4463da1f7eaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a4c607c0-6aee-4e32-a81e-531e080fed35","modelName":"modelName160409709379600813","status":"creating","createdDateTime":"2020-10-30T22:31:34Z","lastUpdatedDateTime":"2020-10-30T22:31:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '22215eaf-5f8b-4c62-8acb-44d0b73d8faa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a4c607c0-6aee-4e32-a81e-531e080fed35","modelName":"modelName160409709379600813","status":"creating","createdDateTime":"2020-10-30T22:31:34Z","lastUpdatedDateTime":"2020-10-30T22:31:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '1b97ccd7-f0bb-493b-9b55-0edb3b022c97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a4c607c0-6aee-4e32-a81e-531e080fed35","modelName":"modelName160409709379600813","status":"creating","createdDateTime":"2020-10-30T22:31:34Z","lastUpdatedDateTime":"2020-10-30T22:31:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'a538a4a5-b015-403a-aa4c-bf6c5fa5596f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a4c607c0-6aee-4e32-a81e-531e080fed35","modelName":"modelName160409709379600813","status":"creating","createdDateTime":"2020-10-30T22:31:34Z","lastUpdatedDateTime":"2020-10-30T22:31:34Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '21f5d8fa-839a-4182-a251-ef46673faed7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a4c607c0-6aee-4e32-a81e-531e080fed35","status":"ready","createdDateTime":"2020-10-30T22:31:34Z","lastUpdatedDateTime":"2020-10-30T22:31:50Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'cc7e19ed-0317-4115-b23d-0f342177b242',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:31:54 GMT'
]);
