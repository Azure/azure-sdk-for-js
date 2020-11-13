let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/bc09d93d-a110-4b43-841b-afe413e9064f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '73335366-0af3-44a3-a069-299c9b17e4b9',
  'x-envoy-upstream-service-time',
  '380',
  'apim-request-id',
  '73335366-0af3-44a3-a069-299c9b17e4b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/bc09d93d-a110-4b43-841b-afe413e9064f')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '979ee174-b76f-4f51-bd98-bcef89db7bd5',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '979ee174-b76f-4f51-bd98-bcef89db7bd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:47 GMT'
]);
