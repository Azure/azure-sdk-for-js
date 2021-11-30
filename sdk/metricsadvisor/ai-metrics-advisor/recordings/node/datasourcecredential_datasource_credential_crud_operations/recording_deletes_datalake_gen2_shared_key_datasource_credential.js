let nock = require('nock');

module.exports.hash = "a7e884bf029eb2cbf4e153650529df49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/54cb9964-58fa-496f-b408-479ef69a8965')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5ba866e7-55ea-4e5b-86b1-7134e44af044',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '5ba866e7-55ea-4e5b-86b1-7134e44af044',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/54cb9964-58fa-496f-b408-479ef69a8965')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '881e5592-1d4c-4008-a2e8-23dea3da00f3',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '881e5592-1d4c-4008-a2e8-23dea3da00f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:40 GMT'
]);
