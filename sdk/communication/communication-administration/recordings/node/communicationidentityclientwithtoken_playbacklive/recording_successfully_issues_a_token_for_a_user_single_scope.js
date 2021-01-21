let nock = require('nock');

module.exports.hash = "94601dd7a4aa157e7f368397131f263e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTExODcxNjgsIm5iZiI6MTYxMTE4NzE2OCwiZXhwIjoxNjExMjczODY4LCJhaW8iOiJFMkpnWUhCTnRwUVA0a3hZL0VtNDU4K0h1dVEzQUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoidmxJQ01fOUh1RWVKa0w1R2Nab1VBQSIsInZlciI6IjEuMCJ9.cJFY3gXeXdTAEshZNorTXZQWUIDcplQ-BCbETE0DmGuWdmgYkDyvL9_CvSpqKRZkDowmrLvJeT47WQ49Ic3ikkmwCcjzA1sg0OSnNMvUEdsv3i9JC4537kiyFpDo5MmDZipSqlfZTvwRWAO5JGOZxkq81iRRZWNlMr48iMmaDMarWalnfgI1PfOTJCsxHKWnIM7GW5tFD20j02UTiG2B9kTHit_xfwi1WWA3KG2cTePr1H2Wc6JlhWOLGRbUam06lKIC93A0X8R1kQv1BR5XW9WUBsi1V10dI2IOQnVLp2863GeXU2Jm_7kaBWcAsRHFPka4XaxeJdEWdCxKr_uqUw"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11419.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtQYQhtVXGxAl2HRYGEM9KBWyo4SAQAAAAu8mtcOAAAA; expires=Sat, 20-Feb-2021 00:04:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Jan 2021 00:04:27 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'izeehkTKfkOdNpQgMxmNBw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '221ms',
  'X-Azure-Ref',
  '0DMUIYAAAAADyvXexfWmZSKGD0aGyWv3IRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 21 Jan 2021 00:04:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities/sanitized/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"sanitized","token":"sanitized","expiresOn":"2021-01-22T00:04:27.9969707+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'snlpHxIoWUagc97WfZbRJA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '273ms',
  'X-Azure-Ref',
  '0DMUIYAAAAABSD2srDVM5RomzMlg1D/NJRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 21 Jan 2021 00:04:28 GMT'
]);
