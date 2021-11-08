let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6e6eb136-9bbe-4c2b-9e42-4cb217d4cfef')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5156cb65-6ede-486c-9552-5bc7d4c0e260',
  'x-envoy-upstream-service-time',
  '358',
  'apim-request-id',
  '5156cb65-6ede-486c-9552-5bc7d4c0e260',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6e6eb136-9bbe-4c2b-9e42-4cb217d4cfef')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9de49dd3-18a9-439d-a3f8-d7bece63bf27',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '9de49dd3-18a9-439d-a3f8-d7bece63bf27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:29 GMT'
]);
