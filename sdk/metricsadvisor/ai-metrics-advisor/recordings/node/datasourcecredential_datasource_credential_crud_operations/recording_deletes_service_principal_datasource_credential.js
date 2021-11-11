let nock = require('nock');

module.exports.hash = "d98981d9bf602515a1154516d3524da1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ef5d5951-fbd0-4557-a7a8-8cb1ffe2ffc0',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'ef5d5951-fbd0-4557-a7a8-8cb1ffe2ffc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a61e3717-0d17-46b8-b8e1-e1a6d73fd842',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'a61e3717-0d17-46b8-b8e1-e1a6d73fd842',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:11 GMT'
]);
