let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/2531af07-9d0f-4cda-9b03-4284a940c710')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7d498232-61a8-4b36-83ac-f5c70bb2c0dd',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '7d498232-61a8-4b36-83ac-f5c70bb2c0dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/2531af07-9d0f-4cda-9b03-4284a940c710')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e1b8db7f-8f40-4f9e-8eb4-0dbe61d7c092',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'e1b8db7f-8f40-4f9e-8eb4-0dbe61d7c092',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:21 GMT'
]);
