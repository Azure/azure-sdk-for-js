let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f4c738f2-6671-43ad-9a8e-86f0d37e7f10')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '83ef62c1-7d49-4295-9c31-d30617334e94',
  'x-envoy-upstream-service-time',
  '440',
  'apim-request-id',
  '83ef62c1-7d49-4295-9c31-d30617334e94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f4c738f2-6671-43ad-9a8e-86f0d37e7f10')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '739190cb-3e59-4aee-8bd6-07c55623e42a',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '739190cb-3e59-4aee-8bd6-07c55623e42a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:12 GMT'
]);
