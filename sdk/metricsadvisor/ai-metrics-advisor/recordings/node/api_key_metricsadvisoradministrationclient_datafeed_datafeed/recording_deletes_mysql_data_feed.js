let nock = require('nock');

module.exports.hash = "6736fa1edd97ca9694f3279647ec71ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/ae45fff1-950e-4271-801c-e64de61d8982')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ed12266b-54a7-4a76-93e4-bc8f500ab8bd',
  'x-envoy-upstream-service-time',
  '356',
  'apim-request-id',
  'ed12266b-54a7-4a76-93e4-bc8f500ab8bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/ae45fff1-950e-4271-801c-e64de61d8982')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '11266d3c-c2d7-4818-9ce1-0e8f0c216a59',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '11266d3c-c2d7-4818-9ce1-0e8f0c216a59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:25 GMT'
]);
