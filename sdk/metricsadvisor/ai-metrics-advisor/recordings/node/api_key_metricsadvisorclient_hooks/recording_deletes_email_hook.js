let nock = require('nock');

module.exports.hash = "79c0e1473caadc9c5f728c477cb92563";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/535ee654-f225-461b-9d8d-2c6abb9fed1a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '861e8103-8f4d-4ad5-b46d-237074547983',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '861e8103-8f4d-4ad5-b46d-237074547983',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/535ee654-f225-461b-9d8d-2c6abb9fed1a')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2b2a00f0-451c-4247-814a-970a43800bf6',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '2b2a00f0-451c-4247-814a-970a43800bf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:27 GMT'
]);
