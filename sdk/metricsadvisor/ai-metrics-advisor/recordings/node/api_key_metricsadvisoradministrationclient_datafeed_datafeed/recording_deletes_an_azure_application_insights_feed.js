let nock = require('nock');

module.exports.hash = "649ff33f6dd8c7706f7f70061b6b7b8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/dddc1441-d099-4f8a-87f3-48b914c72444')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '74f366d6-af3f-4de7-8fd4-b0ea0eb8aadc',
  'x-envoy-upstream-service-time',
  '363',
  'apim-request-id',
  '74f366d6-af3f-4de7-8fd4-b0ea0eb8aadc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/dddc1441-d099-4f8a-87f3-48b914c72444')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '01ac04df-a054-4151-b908-677f1b33a9fc',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '01ac04df-a054-4151-b908-677f1b33a9fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:16 GMT'
]);
