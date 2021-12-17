let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/hooks/1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '75878938-4601-4824-8856-031f8a3513f4',
  'x-envoy-upstream-service-time',
  '228',
  'apim-request-id',
  '75878938-4601-4824-8856-031f8a3513f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:27:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/hooks/1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'be22c67d-af6c-42c6-8ee0-4aa4a65610a8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  'be22c67d-af6c-42c6-8ee0-4aa4a65610a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:27:01 GMT'
]);
