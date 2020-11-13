let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '63751bce-4b5e-47b6-8c49-bb9f652dddf4',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  '63751bce-4b5e-47b6-8c49-bb9f652dddf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a3570243-e955-4abe-9c57-d3b837336a3c',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'a3570243-e955-4abe-9c57-d3b837336a3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:36 GMT'
]);
