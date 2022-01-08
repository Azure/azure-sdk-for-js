let nock = require('nock');

module.exports.hash = "95c25f09cf194bdeaa62de3da2b4d804";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7d7530cf-260c-4e74-994a-f49b279939a0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'cbfecdfe-cd18-4f80-a0ca-913235e35e10',
  'x-envoy-upstream-service-time',
  '298',
  'apim-request-id',
  'cbfecdfe-cd18-4f80-a0ca-913235e35e10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7d7530cf-260c-4e74-994a-f49b279939a0')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '55158b91-51f5-4f5e-9474-612405175b4e',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '55158b91-51f5-4f5e-9474-612405175b4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:10 GMT'
]);
