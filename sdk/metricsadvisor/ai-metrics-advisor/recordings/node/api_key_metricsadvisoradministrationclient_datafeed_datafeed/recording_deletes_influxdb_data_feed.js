let nock = require('nock');

module.exports.hash = "95c25f09cf194bdeaa62de3da2b4d804";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/6310155b-fea4-4f11-8ead-a7ad0be3599c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '472b4690-4660-441c-b8d8-d350b30d11c1',
  'x-envoy-upstream-service-time',
  '332',
  'apim-request-id',
  '472b4690-4660-441c-b8d8-d350b30d11c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/6310155b-fea4-4f11-8ead-a7ad0be3599c')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0b954ab1-f6f9-4ebf-930f-1c1a010a47de',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '0b954ab1-f6f9-4ebf-930f-1c1a010a47de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:22 GMT'
]);
