let nock = require('nock');

module.exports.hash = "81ce971f29723c92439a2f7abf28283b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/68b8db03-4d1d-47ee-bbdd-b1a0ab7cf7fe')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '68fc2cf5-97e2-4000-adfe-96a39b86286b',
  'x-envoy-upstream-service-time',
  '350',
  'apim-request-id',
  '68fc2cf5-97e2-4000-adfe-96a39b86286b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/68b8db03-4d1d-47ee-bbdd-b1a0ab7cf7fe')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '515e521d-60cf-422d-98b2-80e766051e82',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '515e521d-60cf-422d-98b2-80e766051e82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:17 GMT'
]);
