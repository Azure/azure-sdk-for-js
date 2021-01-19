let nock = require('nock');

module.exports.hash = "60565f8dbf8144b9e086c949385f4c3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTEwNzgxNTUsIm5iZiI6MTYxMTA3ODE1NSwiZXhwIjoxNjExMTY0ODU1LCJhaW8iOiJFMkpnWU5DVlpRbVc0UDFZWjF0dTg2N1ZhRVlZQUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiaWlLZll0UmJwVVNpdXRla1VRUDNBQSIsInZlciI6IjEuMCJ9.PvG5oxPxhGau80ci-edmA7zaiK6JZDQifqmkO-0__LQ5_-KWAU3I1U8pnUvgKz-J9oEMV6ZTRECncwv4EBa6gEM7vayhG7nAa9pOvPNPKIR_TdlCWeOvZzrQa8ysUKaak4M6emy8hV5eRtNLERTbDdGbFueO7lr1APSb0ybLaVHSy_2uLdVD9XEPNryqSWPKHH9S8xPPRdOWwXongKGUsRPwgbVoCNq7pPndnp7T1NIBIkb9bo_n3C_h5-M_dvGxtX6CceS1qQwV2z-2NV2QnF9Al7zoLe7LSODEwB7W2U4HhPPmIiJXAJs3lUpZJGlYhCkbKCmM-qXuEbqIkT0hIg"}, [
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
  '629f228a-5bd4-44a5-a2ba-d7a45103f700',
  'x-ms-ests-server',
  '2.1.11397.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aj_-729LM0JIjWYKy_lo-FhWyo4SAQAAADYSmdcOAAAA; expires=Thu, 18-Feb-2021 17:47:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 19 Jan 2021 17:47:34 GMT'
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
  'j84YORT5f0+sj7XSC2NdIw.0',
  'X-Processing-Time',
  '300ms',
  'X-Azure-Ref',
  '0NxsHYAAAAADYX1clhOIrT57fR6Ej4vuARVdSMzBFREdFMDUyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 19 Jan 2021 17:47:35 GMT'
]);
