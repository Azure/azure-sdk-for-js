let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/8599bd94-50c5-488e-9533-dbf4d8ac4f61')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1cdeeae7-81b7-4bbd-8101-ec3ddb2a4e6a',
  'x-envoy-upstream-service-time',
  '349',
  'apim-request-id',
  '1cdeeae7-81b7-4bbd-8101-ec3ddb2a4e6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8599bd94-50c5-488e-9533-dbf4d8ac4f61')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '67079759-f17e-4075-b4e0-dd88a8c5db64',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '67079759-f17e-4075-b4e0-dd88a8c5db64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:02 GMT'
]);
