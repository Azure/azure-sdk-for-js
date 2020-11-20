let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/66d374dc-d28d-4b05-9a79-bdecbc2a346b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9b682f81-18cb-4c55-93b0-16d3b30f74d9',
  'x-envoy-upstream-service-time',
  '376',
  'apim-request-id',
  '9b682f81-18cb-4c55-93b0-16d3b30f74d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/66d374dc-d28d-4b05-9a79-bdecbc2a346b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '33b4db63-ce22-4a81-9126-5463a7f0acaf',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '33b4db63-ce22-4a81-9126-5463a7f0acaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:29 GMT'
]);
