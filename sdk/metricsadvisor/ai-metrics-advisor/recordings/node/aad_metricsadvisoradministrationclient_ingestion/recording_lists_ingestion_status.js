let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/undefined/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(401, {"error":"invalid_client","error_description":"AADSTS7000216: 'client_assertion', 'client_secret' or 'request' is required for the 'client_credentials' grant type.\r\nTrace ID: 440f27be-dbce-42f5-9fbf-6dc40f783800\r\nCorrelation ID: c0eb4740-dd2f-4a2d-b53c-d55a24732c2d\r\nTimestamp: 2021-01-15 08:57:18Z","error_codes":[7000216],"timestamp":"2021-01-15 08:57:18Z","trace_id":"440f27be-dbce-42f5-9fbf-6dc40f783800","correlation_id":"c0eb4740-dd2f-4a2d-b53c-d55a24732c2d","error_uri":"https://login.microsoftonline.com/error?code=7000216"}, [
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
  '440f27be-dbce-42f5-9fbf-6dc40f783800',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhEFQ7fUqNxCrPj6fCaubU8; expires=Sun, 14-Feb-2021 08:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:57:17 GMT',
  'Content-Length',
  '538'
]);
