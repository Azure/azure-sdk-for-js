let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/4b1094cb-c65d-4f1e-ba2f-e2455f9222d1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f7eba0f7-c629-4970-a163-ca0beda6351d',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  'f7eba0f7-c629-4970-a163-ca0beda6351d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/4b1094cb-c65d-4f1e-ba2f-e2455f9222d1')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c6993e12-05e0-4043-8421-2e28123ef5ff',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'c6993e12-05e0-4043-8421-2e28123ef5ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:19 GMT'
]);
