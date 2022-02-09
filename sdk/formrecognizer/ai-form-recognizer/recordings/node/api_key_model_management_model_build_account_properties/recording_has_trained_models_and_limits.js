let nock = require('nock');

module.exports.hash = "61d98e997a9450ff879cefd6cc6fca21";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/info')
  .query(true)
  .reply(200, {"customDocumentModels":{"count":178,"limit":20000}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'eb1d8438-8e2b-406d-a442-46363bb54e98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:50 GMT'
]);
