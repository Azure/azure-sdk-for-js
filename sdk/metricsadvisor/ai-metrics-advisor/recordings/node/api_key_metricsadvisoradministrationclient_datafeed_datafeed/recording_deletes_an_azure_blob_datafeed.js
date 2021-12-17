let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/c0b17aba-de6c-489d-b1df-2d97e405eca2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9d5f4287-f553-4c4d-a104-521298d73612',
  'x-envoy-upstream-service-time',
  '356',
  'apim-request-id',
  '9d5f4287-f553-4c4d-a104-521298d73612',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/c0b17aba-de6c-489d-b1df-2d97e405eca2')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2a12c4c1-d8b8-4bf0-adfa-8142581ddf3d',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '2a12c4c1-d8b8-4bf0-adfa-8142581ddf3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:16 GMT'
]);
