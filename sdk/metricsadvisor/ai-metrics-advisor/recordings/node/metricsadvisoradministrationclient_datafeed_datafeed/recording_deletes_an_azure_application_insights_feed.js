let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/8415cf13-77d5-4d39-b39b-0fff8186cb20')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '24aa6ec4-6a39-4486-b1db-a3fcc5125987',
  'x-envoy-upstream-service-time',
  '462',
  'apim-request-id',
  '24aa6ec4-6a39-4486-b1db-a3fcc5125987',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8415cf13-77d5-4d39-b39b-0fff8186cb20')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '87dc48f8-1996-4bd0-b9ac-2de92c1f1898',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '87dc48f8-1996-4bd0-b9ac-2de92c1f1898',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:47 GMT'
]);
