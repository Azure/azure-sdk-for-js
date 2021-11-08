let nock = require('nock');

module.exports.hash = "70567b49536730af02fa9c4263794cca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7399c6c7-c05a-4c25-832b-a887f75a3fb8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5ebbcf70-e8f4-4c40-84f1-65a1926ed263',
  'x-envoy-upstream-service-time',
  '284',
  'apim-request-id',
  '5ebbcf70-e8f4-4c40-84f1-65a1926ed263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7399c6c7-c05a-4c25-832b-a887f75a3fb8')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '557375aa-160c-404d-a354-488bb3acf26b',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '557375aa-160c-404d-a354-488bb3acf26b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:00 GMT'
]);
