let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5b7e9583-8bc5-4af3-88d2-367497dc5f03')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '405bb38a-6c18-49d9-87e4-e4b476faac15',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  '405bb38a-6c18-49d9-87e4-e4b476faac15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:42 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5b7e9583-8bc5-4af3-88d2-367497dc5f03')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f362c88f-3caf-4052-b20c-718fb170a959',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'f362c88f-3caf-4052-b20c-718fb170a959',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:42 GMT',
  'Connection',
  'close'
]);
