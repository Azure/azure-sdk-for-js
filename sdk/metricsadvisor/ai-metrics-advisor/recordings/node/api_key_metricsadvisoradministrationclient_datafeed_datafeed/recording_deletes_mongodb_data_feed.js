let nock = require('nock');

module.exports.hash = "70567b49536730af02fa9c4263794cca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d0dcb761-6da3-41aa-a865-6018f378b429')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9c1c8d6c-ca4f-402b-a984-0d0d50e74e1f',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  '9c1c8d6c-ca4f-402b-a984-0d0d50e74e1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d0dcb761-6da3-41aa-a865-6018f378b429')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2633c3f2-9a4a-44a1-9587-80b54d5c23a5',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '2633c3f2-9a4a-44a1-9587-80b54d5c23a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:11 GMT'
]);
