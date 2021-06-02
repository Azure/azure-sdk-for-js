let nock = require('nock');

module.exports.hash = "64cf5c6126184b4197c02d4fc2aa63fc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6972a76c-acca-4ffa-b042-e9596d77e5d1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd5cc5325-5c0d-42cb-a12c-40ff3a4c53c7',
  'x-envoy-upstream-service-time',
  '392',
  'apim-request-id',
  'd5cc5325-5c0d-42cb-a12c-40ff3a4c53c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6972a76c-acca-4ffa-b042-e9596d77e5d1')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '91f68544-0159-42d8-93a2-c6411d05fb7c',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '91f68544-0159-42d8-93a2-c6411d05fb7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:22 GMT'
]);
