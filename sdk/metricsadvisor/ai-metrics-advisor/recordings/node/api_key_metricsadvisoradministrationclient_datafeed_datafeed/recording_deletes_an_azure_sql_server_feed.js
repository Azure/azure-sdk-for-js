let nock = require('nock');

module.exports.hash = "26be118ace021c1235287359e5075d53";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/41d7b0ff-d17f-44b6-97e3-53b41cecd38e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bb333be2-8300-4a33-81c3-623bd82568bf',
  'x-envoy-upstream-service-time',
  '294',
  'apim-request-id',
  'bb333be2-8300-4a33-81c3-623bd82568bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/41d7b0ff-d17f-44b6-97e3-53b41cecd38e')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5c4e16d7-143d-4b55-80d5-481e0bcfe5a8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '5c4e16d7-143d-4b55-80d5-481e0bcfe5a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:24 GMT'
]);
