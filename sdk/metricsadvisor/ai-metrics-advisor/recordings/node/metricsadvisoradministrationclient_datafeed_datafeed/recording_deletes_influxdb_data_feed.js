let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b3e7f834-8a25-4ffe-908a-9626c4875147')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '334b2a0b-4283-469e-bbb0-4f42380482da',
  'x-envoy-upstream-service-time',
  '796',
  'apim-request-id',
  '334b2a0b-4283-469e-bbb0-4f42380482da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b3e7f834-8a25-4ffe-908a-9626c4875147')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c998f4ce-aff6-411b-abdc-b10493239eca',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'c998f4ce-aff6-411b-abdc-b10493239eca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:23 GMT'
]);
