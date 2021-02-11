let nock = require('nock');

module.exports.hash = "7c12bd2e3a4959e8779facd7c0c0047e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTExMDAzMzEsIm5iZiI6MTYxMTEwMDMzMSwiZXhwIjoxNjExMTg3MDMxLCJhaW8iOiJFMkpnWUVpUU5MZWJXUkx6YSt2eU5NVWsweDNUQVE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiLVptNzJtOEJmRWUza01iXzQ2b01BUSIsInZlciI6IjEuMCJ9.Aq2dTHlrRFat88RRu8WhpuL6rGQzGaDYAPdtqpB5eZkZ7gHgrLEUM1IqH5oaEcj8euxAyaQJo_GfcgreUV7g4P1yVQTbiDP023Q-564_4UyIBfocsgWuoMPrjU9KfKjD50t8vvvp7X1xUNbeZ6oVGDVGi9BlG1BeTR7xUk98cP_fIUAaraU0RuYcHnwAD2j9_jRpGqj0jTQybvzHItsb81tQXRPqHJsrwfI4rthDPJjZvtCph7RKEHLV4hhcHT5f0Pz8xPxRlaBZckuFWoxnyU_PI7c87xTJkDffiwd_YxsavFF-wMjUrya0v1WbNK-R6hRADSSJ1fccGjTw8BfDfA"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1327',
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
  'dabb99f9-016f-477c-b790-c6ffe3aa0c01',
  'x-ms-ests-server',
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuqvfljIO2xBj3OKpGftjuhWyo4SAQAAANdomdcOAAAA; expires=Thu, 18-Feb-2021 23:57:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 19 Jan 2021 23:57:10 GMT'
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
  'vlZAyq1ZcEGOPRtMJ9JSQw.0',
  'X-Processing-Time',
  '299ms',
  'X-Azure-Ref',
  '013EHYAAAAAAnf+mY2TkXSZOLShKPRL8MRVdSMzBFREdFMDUwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 19 Jan 2021 23:57:11 GMT'
]);
