let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/caedf499-e4ba-456a-bdb0-8f19a0bfaa04')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '849aa802-d3d2-435a-a6b4-9adda43803c7',
  'x-envoy-upstream-service-time',
  '363',
  'apim-request-id',
  '849aa802-d3d2-435a-a6b4-9adda43803c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/caedf499-e4ba-456a-bdb0-8f19a0bfaa04')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2bbd4439-ae26-4b3e-982a-c474d8c36a25',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '2bbd4439-ae26-4b3e-982a-c474d8c36a25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:50 GMT'
]);
