let nock = require('nock');

module.exports.hash = "74b0a721ea9c3a41da1fece133538168";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/layout/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"InvalidPageRange","message":"The Pages parameter exceeds the number of pages."}}, [
  'Content-Length',
  '98',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '341',
  'apim-request-id',
  '319654e7-3392-4da3-b6f9-741bff596901',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:13:11 GMT'
]);
