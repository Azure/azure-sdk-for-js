let nock = require('nock');

module.exports.hash = "61d98e997a9450ff879cefd6cc6fca21";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/info')
  .query(true)
  .reply(200, {"customDocumentModels":{"count":28,"limit":20000}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'b7e42587-52be-4b35-ba25-ad581256a491',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:25:01 GMT'
]);
