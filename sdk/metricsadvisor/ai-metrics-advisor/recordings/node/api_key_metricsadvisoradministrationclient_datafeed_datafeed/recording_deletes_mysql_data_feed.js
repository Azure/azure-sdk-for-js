let nock = require('nock');

module.exports.hash = "dd9d3737f1407f2c7563f2ae1728ce3b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5ff8be39-5ec4-47b7-9550-f70ab9ef03c6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '45494a76-57b0-4744-a50b-2743295b4295',
  'x-envoy-upstream-service-time',
  '408',
  'apim-request-id',
  '45494a76-57b0-4744-a50b-2743295b4295',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5ff8be39-5ec4-47b7-9550-f70ab9ef03c6')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '039d6c7f-f42b-4a42-a882-093fe6effa0f',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '039d6c7f-f42b-4a42-a882-093fe6effa0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:47 GMT'
]);
