let nock = require('nock');

module.exports.hash = "26be118ace021c1235287359e5075d53";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/3b5d71ac-af9c-4855-a1da-11d83a9fa4cc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a8154039-4eca-4227-9cbf-ff92a7794c1a',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'a8154039-4eca-4227-9cbf-ff92a7794c1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/3b5d71ac-af9c-4855-a1da-11d83a9fa4cc')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f2d4d853-af04-44ea-b953-d5f979a99223',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  'f2d4d853-af04-44ea-b953-d5f979a99223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:18 GMT'
]);
