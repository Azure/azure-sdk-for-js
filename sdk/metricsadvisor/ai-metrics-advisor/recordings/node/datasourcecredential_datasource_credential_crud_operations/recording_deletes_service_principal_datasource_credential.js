let nock = require('nock');

module.exports.hash = "9d0b55ff5fc32dddbf48ccce45e475b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/3ee2df85-919c-4e6a-b0b4-dca40b2d7b10')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '210fcf3a-7c7b-41a9-85e4-95389cceadc0',
  'x-envoy-upstream-service-time',
  '245',
  'apim-request-id',
  '210fcf3a-7c7b-41a9-85e4-95389cceadc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:20 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/3ee2df85-919c-4e6a-b0b4-dca40b2d7b10')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '527e44eb-fb28-4a81-b722-51784d6ecf30',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '527e44eb-fb28-4a81-b722-51784d6ecf30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:20 GMT',
  'Connection',
  'close'
]);
