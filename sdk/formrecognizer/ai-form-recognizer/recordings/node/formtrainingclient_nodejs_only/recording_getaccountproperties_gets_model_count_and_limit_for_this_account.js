let nock = require('nock');

module.exports.hash = "f39bc13e3b78f27a32b5acb6689c5012";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":29,"limit":5000,"lastUpdatedDateTime":"2020-08-05T23:29:50Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '746a3129-c8cc-4ca3-b40f-ac673185feeb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:49 GMT'
]);
