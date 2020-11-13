let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3304c833-4bd4-4569-960c-5b77d4fc9a99',
  'x-envoy-upstream-service-time',
  '579',
  'apim-request-id',
  '3304c833-4bd4-4569-960c-5b77d4fc9a99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '369c8b7c-ccba-4dcf-91c7-b9158b2a85a1',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '369c8b7c-ccba-4dcf-91c7-b9158b2a85a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:09 GMT'
]);
