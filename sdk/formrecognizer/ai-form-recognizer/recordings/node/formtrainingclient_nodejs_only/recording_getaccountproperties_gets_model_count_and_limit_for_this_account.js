let nock = require('nock');

module.exports.hash = "b214fa2de1c94068fba27da016bb8c5e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":90,"limit":5000,"lastUpdatedDateTime":"2020-05-02T06:37:03Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'e99c9265-7c38-4c29-a832-2c7346d64edb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:37:03 GMT'
]);
