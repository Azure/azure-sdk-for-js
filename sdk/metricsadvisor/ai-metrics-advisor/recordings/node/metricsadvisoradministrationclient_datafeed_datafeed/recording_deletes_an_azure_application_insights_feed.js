let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3d796418-6f80-4970-8e69-c76956cb5702')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '65f3cb20-8dd5-4998-9f40-c86924ad3580',
  'x-envoy-upstream-service-time',
  '431',
  'apim-request-id',
  '65f3cb20-8dd5-4998-9f40-c86924ad3580',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3d796418-6f80-4970-8e69-c76956cb5702')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8770e4f0-9a5a-4f88-a37a-61a76523fb09',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '8770e4f0-9a5a-4f88-a37a-61a76523fb09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:10 GMT'
]);
