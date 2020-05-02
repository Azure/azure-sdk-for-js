let nock = require('nock');

module.exports.hash = "b214fa2de1c94068fba27da016bb8c5e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models')
  .query(true)
  .reply(200, {"summary":{"count":96,"limit":5000,"lastUpdatedDateTime":"2020-05-02T20:00:36Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '59720a35-fae5-4e52-93c7-c3b4b70774ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:35 GMT'
]);
