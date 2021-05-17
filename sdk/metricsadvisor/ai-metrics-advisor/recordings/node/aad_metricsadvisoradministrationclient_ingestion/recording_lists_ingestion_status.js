let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(400, {"error":"invalid_request","error_description":"AADSTS90002: Tenant '12345678-1234-1234-1234-123456789012' not found. This may happen if there are no active subscriptions for the tenant. Check to make sure you have the correct tenant ID. Check with your subscription administrator.\r\nTrace ID: c07bcae7-ba0e-4a79-a071-a56335343000\r\nCorrelation ID: f6d0f194-0ceb-4f50-a36a-1d40a304f647\r\nTimestamp: 2021-05-15 03:41:29Z","error_codes":[90002],"timestamp":"2021-05-15 03:41:29Z","trace_id":"c07bcae7-ba0e-4a79-a071-a56335343000","correlation_id":"f6d0f194-0ceb-4f50-a36a-1d40a304f647","error_uri":"https://login.microsoftonline.com/error?code=90002"}, [
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
  'c07bcae7-ba0e-4a79-a071-a56335343000',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGFb6HqYAQAAAOg5MdgOAAAA; expires=Mon, 14-Jun-2021 03:41:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 03:41:28 GMT',
  'Content-Length',
  '652'
]);
