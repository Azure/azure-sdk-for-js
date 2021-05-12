let nock = require('nock');

module.exports.hash = "e053cbc80349f5f08e81d46786911ef0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":779,"limit":20000,"lastUpdatedDateTime":"2021-05-12T01:24:36Z"}}, [
  'Content-Length',
  '84',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '5fab91a8-3aaa-4d02-90f7-24e9e6bd75d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:24:36 GMT'
]);
