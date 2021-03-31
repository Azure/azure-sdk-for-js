let nock = require('nock');

module.exports.hash = "e053cbc80349f5f08e81d46786911ef0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":123,"limit":20000,"lastUpdatedDateTime":"2021-03-30T23:13:44Z"}}, [
  'Content-Length',
  '84',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '2283acb2-beb1-4ae4-85eb-a8ce41a2321a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:44 GMT'
]);
