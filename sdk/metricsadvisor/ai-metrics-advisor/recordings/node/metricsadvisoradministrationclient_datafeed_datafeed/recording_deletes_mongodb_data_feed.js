let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/2ff20eac-b64c-4bde-95d4-8feba3b2d311')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '52af53c1-3c9d-4b5a-81b4-af2c9de3158c',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '52af53c1-3c9d-4b5a-81b4-af2c9de3158c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:49 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2ff20eac-b64c-4bde-95d4-8feba3b2d311')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '08e10421-edc2-49fc-8341-49b353e889a5',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '08e10421-edc2-49fc-8341-49b353e889a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:48 GMT',
  'Connection',
  'close'
]);
