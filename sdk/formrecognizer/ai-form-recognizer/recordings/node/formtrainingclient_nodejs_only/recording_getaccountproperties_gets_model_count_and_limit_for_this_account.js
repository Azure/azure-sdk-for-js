let nock = require('nock');

module.exports.hash = "f39bc13e3b78f27a32b5acb6689c5012";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":69,"limit":5000,"lastUpdatedDateTime":"2020-08-18T18:47:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '64990055-915b-4660-9f89-5d25461db1b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:42 GMT'
]);
