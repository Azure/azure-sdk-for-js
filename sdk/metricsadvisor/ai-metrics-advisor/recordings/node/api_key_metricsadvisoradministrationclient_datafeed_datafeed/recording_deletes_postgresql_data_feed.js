let nock = require('nock');

module.exports.hash = "e94fe8b844567fad45d46761354ccf88";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/a05742bb-89c6-4b3b-b637-28ef740cb87b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '258c1f52-55ad-471f-b689-4710ccb26a17',
  'x-envoy-upstream-service-time',
  '394',
  'apim-request-id',
  '258c1f52-55ad-471f-b689-4710ccb26a17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a05742bb-89c6-4b3b-b637-28ef740cb87b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5c725276-be75-4a96-a9fc-29cfa1f8ffd7',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '5c725276-be75-4a96-a9fc-29cfa1f8ffd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:45 GMT'
]);
