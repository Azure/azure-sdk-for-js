let nock = require('nock');

module.exports.hash = "d98981d9bf602515a1154516d3524da1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/d92566c8-6a08-4ddc-917f-120139250878')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c2b8bd68-e01c-45fd-a169-ce0dd05ea2e1',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  'c2b8bd68-e01c-45fd-a169-ce0dd05ea2e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d92566c8-6a08-4ddc-917f-120139250878')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4d81d811-1087-4541-8325-3c08eee25274',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '4d81d811-1087-4541-8325-3c08eee25274',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);
