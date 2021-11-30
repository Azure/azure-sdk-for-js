let nock = require('nock');

module.exports.hash = "2b8641347cfffae800a67810c101e008";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5878fb3d-55e7-485e-87d4-95455195e027')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd43cc0b6-1c8f-4de7-902f-56b63e96ce60',
  'x-envoy-upstream-service-time',
  '286',
  'apim-request-id',
  'd43cc0b6-1c8f-4de7-902f-56b63e96ce60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5878fb3d-55e7-485e-87d4-95455195e027')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '97b46437-e18b-4009-81f8-cc42842dd109',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '97b46437-e18b-4009-81f8-cc42842dd109',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:33 GMT'
]);
