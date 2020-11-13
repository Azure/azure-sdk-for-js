let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e84515ef-97ad-48c3-a7d1-d0dd94015703')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'acdc38a8-778a-48be-bdb8-562cdcb50aea',
  'x-envoy-upstream-service-time',
  '346',
  'apim-request-id',
  'acdc38a8-778a-48be-bdb8-562cdcb50aea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e84515ef-97ad-48c3-a7d1-d0dd94015703')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e2dd7952-1fc9-417b-862f-b17ccee6516a',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'e2dd7952-1fc9-417b-862f-b17ccee6516a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:44 GMT'
]);
