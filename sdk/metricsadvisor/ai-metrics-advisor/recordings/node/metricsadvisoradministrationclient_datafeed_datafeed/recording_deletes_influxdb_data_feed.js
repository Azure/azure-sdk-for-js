let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5dcea8df-b963-4e92-ad21-b727e3e262c9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '38505f94-80de-471a-945d-c28629ff850f',
  'x-envoy-upstream-service-time',
  '5673',
  'apim-request-id',
  '38505f94-80de-471a-945d-c28629ff850f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5dcea8df-b963-4e92-ad21-b727e3e262c9')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '94b06431-760e-4e7a-a69f-05448fa34e19',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '94b06431-760e-4e7a-a69f-05448fa34e19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:03 GMT'
]);
