let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0992b58a-87f5-498b-8909-081a9fe869bb')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2465a68f-f444-4bee-ba54-5b5f2079e84d',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  '2465a68f-f444-4bee-ba54-5b5f2079e84d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0992b58a-87f5-498b-8909-081a9fe869bb')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'def82524-a35d-4f50-ac3c-d1fab7e5ae04',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'def82524-a35d-4f50-ac3c-d1fab7e5ae04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:25 GMT'
]);
