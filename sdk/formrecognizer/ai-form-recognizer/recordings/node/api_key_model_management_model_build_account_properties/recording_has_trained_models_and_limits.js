let nock = require('nock');

module.exports.hash = "1f861698d78be3e12db00b8f60495084";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/info')
  .query(true)
  .reply(200, {"customDocumentModels":{"count":86,"limit":20000}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'dd878d47-6265-4f94-9127-24c98a97e1b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:55 GMT'
]);
