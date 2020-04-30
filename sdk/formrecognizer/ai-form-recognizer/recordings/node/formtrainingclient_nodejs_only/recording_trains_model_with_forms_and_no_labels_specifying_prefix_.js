let nock = require('nock');

module.exports.hash = "059836df5122d8879ba53355614de9b6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models', {"source":"https://storageaccount/trainingdata?undefined","sourceFilter":{"prefix":"Form_"},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/dbd6b760-c52a-4ada-ac19-a4de07c13f0c',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '7d3690e9-1759-49f1-b1c1-7f0d15f844b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/dbd6b760-c52a-4ada-ac19-a4de07c13f0c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"dbd6b760-c52a-4ada-ac19-a4de07c13f0c","status":"creating","createdDateTime":"2020-05-02T06:36:52Z","lastUpdatedDateTime":"2020-05-02T06:36:52Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '554',
  'apim-request-id',
  '398750f9-f4c3-412c-af70-284bd1059251',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/dbd6b760-c52a-4ada-ac19-a4de07c13f0c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"dbd6b760-c52a-4ada-ac19-a4de07c13f0c","status":"creating","createdDateTime":"2020-05-02T06:36:52Z","lastUpdatedDateTime":"2020-05-02T06:36:52Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '71479365-6e3c-4469-84c0-7b39d07cfd78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/dbd6b760-c52a-4ada-ac19-a4de07c13f0c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"dbd6b760-c52a-4ada-ac19-a4de07c13f0c","status":"creating","createdDateTime":"2020-05-02T06:36:52Z","lastUpdatedDateTime":"2020-05-02T06:36:52Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '66b05eb9-f1f2-4209-b22d-9c200eb107d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:36:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/dbd6b760-c52a-4ada-ac19-a4de07c13f0c')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"dbd6b760-c52a-4ada-ac19-a4de07c13f0c","status":"ready","createdDateTime":"2020-05-02T06:36:52Z","lastUpdatedDateTime":"2020-05-02T06:37:00Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '3b4d966f-6a35-467f-a340-b20d5066cd4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:37:03 GMT'
]);
