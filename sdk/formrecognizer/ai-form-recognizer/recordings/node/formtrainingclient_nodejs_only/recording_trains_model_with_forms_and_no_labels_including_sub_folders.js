let nock = require('nock');

module.exports.hash = "60455a0a4014aea1a6797571858e33c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?undefined","sourceFilter":{"includeSubFolders":true},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '8b53e604-777b-4c3c-b520-67b9a6e55780',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ba0a695-b76d-42b8-8bfa-7276059b6c03","status":"creating","createdDateTime":"2020-05-02T06:36:42Z","lastUpdatedDateTime":"2020-05-02T06:36:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'ec020637-fbc4-4e40-815a-12c406477fd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ba0a695-b76d-42b8-8bfa-7276059b6c03","status":"creating","createdDateTime":"2020-05-02T06:36:42Z","lastUpdatedDateTime":"2020-05-02T06:36:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '9af4e290-0c69-43a5-8351-9a1160531b67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ba0a695-b76d-42b8-8bfa-7276059b6c03","status":"creating","createdDateTime":"2020-05-02T06:36:42Z","lastUpdatedDateTime":"2020-05-02T06:36:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '365b14a8-b6c7-4fe9-81f7-95f929f9ebcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ba0a695-b76d-42b8-8bfa-7276059b6c03","status":"ready","createdDateTime":"2020-05-02T06:36:42Z","lastUpdatedDateTime":"2020-05-02T06:36:51Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '123edeef-c785-475e-89a8-9b192bd54327',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:51 GMT'
]);
