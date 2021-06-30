let nock = require('nock');

module.exports.hash = "3b26ef694bf46025b536723153ef1756";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/97101930-32aa-4bd2-a63c-2ad543c51fcf')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6abf7e03-b69f-40ae-9d27-659700f43ea3',
  'x-envoy-upstream-service-time',
  '948',
  'apim-request-id',
  '6abf7e03-b69f-40ae-9d27-659700f43ea3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:26:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/97101930-32aa-4bd2-a63c-2ad543c51fcf')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6f573bb-58d3-4a43-8148-0e32a2d15ff0',
  'x-envoy-upstream-service-time',
  '5229',
  'apim-request-id',
  'd6f573bb-58d3-4a43-8148-0e32a2d15ff0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:27:02 GMT'
]);
