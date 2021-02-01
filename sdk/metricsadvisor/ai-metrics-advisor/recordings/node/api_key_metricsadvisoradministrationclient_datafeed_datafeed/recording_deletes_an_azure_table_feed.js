let nock = require('nock');

module.exports.hash = "9fe96ef040315d1e16720e3f16d91c77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/2594e90d-6ac8-4f44-bf81-5ca21a648b04')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b90e5611-109f-43b4-b28e-55c3427a5e9d',
  'x-envoy-upstream-service-time',
  '455',
  'apim-request-id',
  'b90e5611-109f-43b4-b28e-55c3427a5e9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2594e90d-6ac8-4f44-bf81-5ca21a648b04')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '55fe7ad3-b938-4b66-8319-447b05fa27bc',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '55fe7ad3-b938-4b66-8319-447b05fa27bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:38 GMT'
]);
