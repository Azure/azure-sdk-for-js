let nock = require('nock');

module.exports.hash = "e053cbc80349f5f08e81d46786911ef0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":815,"limit":20000,"lastUpdatedDateTime":"2021-05-25T18:07:40Z"}}, [
  'Content-Length',
  '84',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '63dba2b0-eaa3-46bc-bfba-6a769e169bca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:39 GMT'
]);
