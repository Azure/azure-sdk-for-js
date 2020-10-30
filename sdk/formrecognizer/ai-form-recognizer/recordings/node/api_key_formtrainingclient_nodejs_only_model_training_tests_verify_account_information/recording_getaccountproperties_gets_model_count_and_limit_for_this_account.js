let nock = require('nock');

module.exports.hash = "629d306717ac7b295514d78b626d5a4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":49,"limit":5000,"lastUpdatedDateTime":"2020-10-30T22:36:43Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'b469c9c3-c56a-4e06-b7a2-7c2e902c6986',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:43 GMT'
]);
