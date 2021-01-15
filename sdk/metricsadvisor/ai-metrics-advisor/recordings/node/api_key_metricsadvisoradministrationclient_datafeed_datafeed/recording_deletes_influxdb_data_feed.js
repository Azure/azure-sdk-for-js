let nock = require('nock');

module.exports.hash = "4de38b90c2a36be689420c322f85a504";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/78b9eb42-b845-4f17-9014-b8b044bbcad9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8a2cab6f-23ea-4c38-b79e-d3ceb694f5fe',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  '8a2cab6f-23ea-4c38-b79e-d3ceb694f5fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78b9eb42-b845-4f17-9014-b8b044bbcad9')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c64470a3-4b90-4312-a7ea-9abd37a8ad10',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'c64470a3-4b90-4312-a7ea-9abd37a8ad10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:42 GMT'
]);
