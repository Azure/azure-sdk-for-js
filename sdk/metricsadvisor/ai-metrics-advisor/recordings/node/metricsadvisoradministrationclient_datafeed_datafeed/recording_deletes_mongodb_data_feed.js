let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f578b955-d3fa-4e70-b681-3887edece923')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'cd9fe5e6-0a66-4900-a267-65e04144b980',
  'x-envoy-upstream-service-time',
  '643',
  'apim-request-id',
  'cd9fe5e6-0a66-4900-a267-65e04144b980',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f578b955-d3fa-4e70-b681-3887edece923')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '45021ab2-2549-4b66-9910-904492b1e739',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '45021ab2-2549-4b66-9910-904492b1e739',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:05 GMT'
]);
