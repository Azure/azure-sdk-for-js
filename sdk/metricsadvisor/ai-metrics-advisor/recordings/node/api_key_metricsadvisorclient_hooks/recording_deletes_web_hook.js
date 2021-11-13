let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/5dfb93fa-fc9a-4725-af2b-c604e303336b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '75e34050-b0ae-43a0-9a51-c549b7667db7',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '75e34050-b0ae-43a0-9a51-c549b7667db7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5dfb93fa-fc9a-4725-af2b-c604e303336b')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '72cdd2ea-9393-4636-a477-a5cf2cac41f6',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '72cdd2ea-9393-4636-a477-a5cf2cac41f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:22 GMT'
]);
