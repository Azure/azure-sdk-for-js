let nock = require('nock');

module.exports.hash = "d0d8cce7416b41fe0a906e809149451d";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160047313700200224"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2020-09-17T00:00:00Z","latestActiveTimestamp":"2020-09-17T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0bb9ecf8-cea9-4082-a189-3fcbe4bed704',
  'x-envoy-upstream-service-time',
  '5387',
  'apim-request-id',
  '0bb9ecf8-cea9-4082-a189-3fcbe4bed704',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:52:19 GMT',
  'Connection',
  'close'
]);
