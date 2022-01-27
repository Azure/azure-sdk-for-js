let nock = require('nock');

module.exports.hash = "61d98e997a9450ff879cefd6cc6fca21";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/info')
  .query(true)
  .reply(200, {"customDocumentModels":{"count":167,"limit":20000}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9ad8100e-fad1-4694-ba70-049ed171d111',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:20 GMT'
]);
