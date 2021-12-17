let nock = require('nock');

module.exports.hash = "70567b49536730af02fa9c4263794cca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/b8959ab1-6408-4db8-b777-2c951201fa4e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '23638271-6bbf-4bfd-82fb-95f11a6d2c28',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  '23638271-6bbf-4bfd-82fb-95f11a6d2c28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/b8959ab1-6408-4db8-b777-2c951201fa4e')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4569d1fc-f117-4c22-a0bd-34bc8067b058',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '4569d1fc-f117-4c22-a0bd-34bc8067b058',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:24 GMT'
]);
