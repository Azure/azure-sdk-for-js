let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '84ab98ec-672b-4058-aade-aa36e0997519',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  '84ab98ec-672b-4058-aade-aa36e0997519',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b294ab5c-8f00-402c-b076-6a0d3b33428e',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'b294ab5c-8f00-402c-b076-6a0d3b33428e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:24 GMT'
]);
