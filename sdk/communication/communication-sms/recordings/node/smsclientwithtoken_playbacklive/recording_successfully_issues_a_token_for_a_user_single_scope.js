let nock = require('nock');

module.exports.hash = "60565f8dbf8144b9e086c949385f4c3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTA5OTE1NjYsIm5iZiI6MTYxMDk5MTU2NiwiZXhwIjoxNjExMDc4MjY2LCJhaW8iOiJFMkpnWUVqWUpiSC90MS9WZ2kzS2lZNGF2TUg2QUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiY3BBRktYYmtKVVdyT1dWVlF0X0pBQSIsInZlciI6IjEuMCJ9.dlXs72WWjrQ13fP80ayNKhsHN8xuLXqCOzB75s3sW7sm9eThObHzA04yyMgg4J4h5PSLsJRpkO6mxbyv0CzFbAo6hzEl2kawBwNehGrQNZ30ali6IbIe3dKnsFHCRBZ0i7L4_sbWmpxOFb2yaDWXuoZZTACCyXLfCenaZnbbE4Trb4_ENrp9R_zMhn960vKrmavf9PA3BPyJtkFHNyQgsmUTwM_SMos1SzC1hi1fTV5I9xVaYG13AL0_oQVo5ijftQOKgfX_vt_2EVd4HpusvxXouY3sKKMWtZXJn2jY6xNFE0h8ufEfvq7FrtSj9pEx1Hd5x0mu3Gde7N2fIMbl4A"}, [
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
  '29059072-e476-4525-ab39-655542dfc900',
  'x-ms-ests-server',
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsGyjGWXEBJHoR_H86VLMf9Wyo4SAQAAAPq_l9cOAAAA; expires=Wed, 17-Feb-2021 17:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Jan 2021 17:44:25 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","to":["+18005551234"],"message":"test message","sendSmsOptions":{}})
  .query(true)
  .reply(200, {"messageId":"Sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'E0XMJjbiCkuE0bWxOftbyw.0',
  'X-Processing-Time',
  '315ms',
  'X-Azure-Ref',
  '0+sgFYAAAAAC8l1ej7Z5bTY2rZFBHh145RVdSMzBFREdFMDYxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 17:44:26 GMT'
]);
