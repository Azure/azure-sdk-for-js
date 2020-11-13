let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/020d58e2-fca1-4e87-a3ab-47497986bef6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2a84ed92-19f1-4cbc-a24e-3ace2a806537',
  'x-envoy-upstream-service-time',
  '304',
  'apim-request-id',
  '2a84ed92-19f1-4cbc-a24e-3ace2a806537',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/020d58e2-fca1-4e87-a3ab-47497986bef6')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5b7b7c42-e536-43bd-b6d7-72c9656d6e73',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '5b7b7c42-e536-43bd-b6d7-72c9656d6e73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:37 GMT'
]);
