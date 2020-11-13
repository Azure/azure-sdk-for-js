let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a69ef379-bf1d-48cf-972d-e0dbacefac40',
  'x-envoy-upstream-service-time',
  '337',
  'apim-request-id',
  'a69ef379-bf1d-48cf-972d-e0dbacefac40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '977c7f8c-590b-4a9b-b7a6-0d61274384cb',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '977c7f8c-590b-4a9b-b7a6-0d61274384cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:41 GMT'
]);
