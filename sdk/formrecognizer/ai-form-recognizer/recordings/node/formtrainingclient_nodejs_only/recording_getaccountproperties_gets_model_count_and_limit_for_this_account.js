let nock = require('nock');

module.exports.hash = "2643f9ec59ca7e6ee6fcef70b7b812cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":85,"limit":5000,"lastUpdatedDateTime":"2020-10-21T18:08:47Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '6d9808f3-a93b-47d2-a5fc-c8c2a58f6d0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:47 GMT'
]);
