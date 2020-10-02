let nock = require('nock');

module.exports.hash = "f14778014370d35d1f524c6d167f7f57";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e18ddf78-a00c-46e9-a1b2-31ace9c83b67')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '87264852-54e8-4f96-a6aa-e9f535020369',
  'x-envoy-upstream-service-time',
  '253',
  'apim-request-id',
  '87264852-54e8-4f96-a6aa-e9f535020369',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e18ddf78-a00c-46e9-a1b2-31ace9c83b67')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '179253d9-1514-4ef1-9b53-20b606309d36',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '179253d9-1514-4ef1-9b53-20b606309d36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:39 GMT'
]);
