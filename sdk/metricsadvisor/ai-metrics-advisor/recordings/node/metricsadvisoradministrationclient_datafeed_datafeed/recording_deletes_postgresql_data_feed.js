let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6242f6d8-d0a0-4b18-8e2f-41e57174596a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1ca98ea0-c7a2-46d4-a45e-ecc5ce01c23e',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '1ca98ea0-c7a2-46d4-a45e-ecc5ce01c23e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:52 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6242f6d8-d0a0-4b18-8e2f-41e57174596a')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3e2532c0-5be6-434d-b29e-13ba87251caf',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '3e2532c0-5be6-434d-b29e-13ba87251caf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:52 GMT',
  'Connection',
  'close'
]);
