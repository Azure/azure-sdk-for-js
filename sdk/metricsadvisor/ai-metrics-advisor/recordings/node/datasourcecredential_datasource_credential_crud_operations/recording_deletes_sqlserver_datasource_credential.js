let nock = require('nock');

module.exports.hash = "e69e95833cde036b5147477d76f419f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/31392928-b87b-4975-9be2-cea71a6e814b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '80af0c4d-7ccb-47fe-aa96-4cd1a979a3a9',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  '80af0c4d-7ccb-47fe-aa96-4cd1a979a3a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:18 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/31392928-b87b-4975-9be2-cea71a6e814b')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e581a8f9-1644-47c5-a508-bf09d32374b6',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'e581a8f9-1644-47c5-a508-bf09d32374b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:19 GMT',
  'Connection',
  'close'
]);
