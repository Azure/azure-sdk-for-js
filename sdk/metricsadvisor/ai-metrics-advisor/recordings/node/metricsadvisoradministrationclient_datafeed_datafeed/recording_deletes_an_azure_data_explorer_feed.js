let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6a3e95c1-99c6-4d71-9725-9fcb90f60724')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '62409df0-e858-44dd-9834-1850ba14dfdc',
  'x-envoy-upstream-service-time',
  '452',
  'apim-request-id',
  '62409df0-e858-44dd-9834-1850ba14dfdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6a3e95c1-99c6-4d71-9725-9fcb90f60724')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '67cbf160-0c70-4df7-8e24-2a0798064dc1',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '67cbf160-0c70-4df7-8e24-2a0798064dc1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:52 GMT'
]);
