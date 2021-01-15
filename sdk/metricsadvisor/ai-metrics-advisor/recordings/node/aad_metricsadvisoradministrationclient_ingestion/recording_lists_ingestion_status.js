let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/undefined/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(401, {"error":"invalid_client","error_description":"AADSTS7000216: 'client_assertion', 'client_secret' or 'request' is required for the 'client_credentials' grant type.\r\nTrace ID: 3d8ee8b9-f124-4696-946e-f1dbbcf03100\r\nCorrelation ID: 086813c5-bebf-4448-b5d1-eb8dd6272fcf\r\nTimestamp: 2021-01-15 08:38:00Z","error_codes":[7000216],"timestamp":"2021-01-15 08:38:00Z","trace_id":"3d8ee8b9-f124-4696-946e-f1dbbcf03100","correlation_id":"086813c5-bebf-4448-b5d1-eb8dd6272fcf","error_uri":"https://login.microsoftonline.com/error?code=7000216"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '3d8ee8b9-f124-4696-946e-f1dbbcf03100',
  'x-ms-ests-server',
  '2.1.11397.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3E; expires=Sun, 14-Feb-2021 08:38:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:37:59 GMT',
  'Content-Length',
  '538'
]);
