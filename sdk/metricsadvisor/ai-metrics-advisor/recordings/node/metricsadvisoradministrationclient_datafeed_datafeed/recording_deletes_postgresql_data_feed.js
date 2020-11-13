let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/fced3f71-4e1c-41c9-8bc2-3532d723a1bc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9627426d-c346-4053-92ca-e9319444238f',
  'x-envoy-upstream-service-time',
  '305',
  'apim-request-id',
  '9627426d-c346-4053-92ca-e9319444238f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/fced3f71-4e1c-41c9-8bc2-3532d723a1bc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '16dfd0a6-157b-4488-9426-5194d1e92903',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '16dfd0a6-157b-4488-9426-5194d1e92903',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:56 GMT'
]);
