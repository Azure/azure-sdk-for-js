let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0e4969fb-02fc-494c-97c8-f64353a17013')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b9c77347-8f20-4f35-bfcd-0970df429b0a',
  'x-envoy-upstream-service-time',
  '329',
  'apim-request-id',
  'b9c77347-8f20-4f35-bfcd-0970df429b0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0e4969fb-02fc-494c-97c8-f64353a17013')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '120000e9-ff2a-42b1-aa03-89a157e61f2d',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '120000e9-ff2a-42b1-aa03-89a157e61f2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:46 GMT'
]);
