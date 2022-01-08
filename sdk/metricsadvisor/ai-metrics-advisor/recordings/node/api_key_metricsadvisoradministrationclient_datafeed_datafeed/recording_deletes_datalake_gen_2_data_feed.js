let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/376044ac-7a47-49bc-89ab-5ef0cc10e840')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '701b08af-4332-4546-99f8-7db73e1764aa',
  'x-envoy-upstream-service-time',
  '331',
  'apim-request-id',
  '701b08af-4332-4546-99f8-7db73e1764aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/376044ac-7a47-49bc-89ab-5ef0cc10e840')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '81e47209-1079-4e35-aeac-4889d6560d5e',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '81e47209-1079-4e35-aeac-4889d6560d5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:13 GMT'
]);
