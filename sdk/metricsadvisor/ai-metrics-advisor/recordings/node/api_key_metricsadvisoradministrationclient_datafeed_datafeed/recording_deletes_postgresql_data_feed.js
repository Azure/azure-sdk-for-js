let nock = require('nock');

module.exports.hash = "e94fe8b844567fad45d46761354ccf88";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/55343889-8ee9-4f18-9235-3f49607c9eb4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '102ecde7-99c6-481f-9484-8c0768c89042',
  'x-envoy-upstream-service-time',
  '391',
  'apim-request-id',
  '102ecde7-99c6-481f-9484-8c0768c89042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/55343889-8ee9-4f18-9235-3f49607c9eb4')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7bb0b883-1b45-46aa-94e5-40ec7a5dbc43',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '7bb0b883-1b45-46aa-94e5-40ec7a5dbc43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:51 GMT'
]);
