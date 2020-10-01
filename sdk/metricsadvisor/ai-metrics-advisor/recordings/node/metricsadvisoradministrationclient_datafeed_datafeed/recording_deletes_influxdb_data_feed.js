let nock = require('nock');

module.exports.hash = "5e16750c8a08db725a49618c094d1f78";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b3dffe9d-9cd6-42c7-ac4d-78bf2151c452')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8abe289a-ad62-47f0-b0f0-1017e2afb119',
  'x-envoy-upstream-service-time',
  '298',
  'apim-request-id',
  '8abe289a-ad62-47f0-b0f0-1017e2afb119',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b3dffe9d-9cd6-42c7-ac4d-78bf2151c452')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '088d201c-26eb-4f80-92c2-890a66df224a',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '088d201c-26eb-4f80-92c2-890a66df224a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:55 GMT'
]);
