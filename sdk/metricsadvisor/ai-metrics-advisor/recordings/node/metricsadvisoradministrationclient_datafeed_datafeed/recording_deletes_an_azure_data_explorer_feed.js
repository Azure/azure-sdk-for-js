let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ea71dfed-44ea-4f6e-a3e8-fbaeb2488f60')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b986438e-16b0-43e4-bb22-cbe6275c80da',
  'x-envoy-upstream-service-time',
  '414',
  'apim-request-id',
  'b986438e-16b0-43e4-bb22-cbe6275c80da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ea71dfed-44ea-4f6e-a3e8-fbaeb2488f60')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3ab9300a-82d1-41a7-bfea-d7da849afe44',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '3ab9300a-82d1-41a7-bfea-d7da849afe44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:15 GMT'
]);
