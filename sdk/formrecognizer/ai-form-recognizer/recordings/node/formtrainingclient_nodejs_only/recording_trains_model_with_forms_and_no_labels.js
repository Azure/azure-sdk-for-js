let nock = require('nock');

module.exports.hash = "bb482db3fb10d0ee44e322df4f19ed76";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?undefined","sourceFilter":{},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/0bcd569d-7341-4ed7-8a6f-49f602c4c05f',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '7d1d74a2-db1f-4c05-bfb1-1e67f323816d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/0bcd569d-7341-4ed7-8a6f-49f602c4c05f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0bcd569d-7341-4ed7-8a6f-49f602c4c05f","status":"creating","createdDateTime":"2020-05-02T06:36:10Z","lastUpdatedDateTime":"2020-05-02T06:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '366',
  'apim-request-id',
  'c7152169-958a-4944-b51d-ebd47cd28a4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/0bcd569d-7341-4ed7-8a6f-49f602c4c05f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0bcd569d-7341-4ed7-8a6f-49f602c4c05f","status":"creating","createdDateTime":"2020-05-02T06:36:10Z","lastUpdatedDateTime":"2020-05-02T06:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5062',
  'apim-request-id',
  '88d7133f-9c41-4a53-bd08-2f5bed3e1b14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/0bcd569d-7341-4ed7-8a6f-49f602c4c05f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0bcd569d-7341-4ed7-8a6f-49f602c4c05f","status":"creating","createdDateTime":"2020-05-02T06:36:10Z","lastUpdatedDateTime":"2020-05-02T06:36:10Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'd36f420d-6866-43dc-b1fa-09d8a4352b5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/0bcd569d-7341-4ed7-8a6f-49f602c4c05f')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"0bcd569d-7341-4ed7-8a6f-49f602c4c05f","status":"ready","createdDateTime":"2020-05-02T06:36:10Z","lastUpdatedDateTime":"2020-05-02T06:36:22Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  'e4103290-aeb4-44f3-afc7-d18b7cb459ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:26 GMT'
]);
