let nock = require('nock');

module.exports.hash = "d98981d9bf602515a1154516d3524da1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/ec229472-182b-4961-bcd0-c329f6aa5f4a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5919c5a1-4c02-4792-b9f0-0778a7e5c852',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '5919c5a1-4c02-4792-b9f0-0778a7e5c852',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/ec229472-182b-4961-bcd0-c329f6aa5f4a')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b24fb550-51e0-4347-af9e-38a4d8f1abd7',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'b24fb550-51e0-4347-af9e-38a4d8f1abd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:01 GMT'
]);
