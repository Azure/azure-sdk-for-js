let nock = require('nock');

module.exports.hash = "9fe96ef040315d1e16720e3f16d91c77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ec925b0d-e939-41a6-99d9-5c32e77b2c5a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '81ccb6f4-ae39-4edc-b5bb-dcaa88db3468',
  'x-envoy-upstream-service-time',
  '375',
  'apim-request-id',
  '81ccb6f4-ae39-4edc-b5bb-dcaa88db3468',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ec925b0d-e939-41a6-99d9-5c32e77b2c5a')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '14a91076-c5f1-42bc-8b0d-5c674d208391',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '14a91076-c5f1-42bc-8b0d-5c674d208391',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:02 GMT'
]);
