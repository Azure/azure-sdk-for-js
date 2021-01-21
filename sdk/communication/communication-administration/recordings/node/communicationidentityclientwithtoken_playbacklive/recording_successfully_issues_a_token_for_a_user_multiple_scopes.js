let nock = require("nock");

module.exports.hash = "3a781f5c72e6153f2bf8095c6929d1b1";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTA5OTg4MzIsIm5iZiI6MTYxMDk5ODgzMiwiZXhwIjoxNjExMDg1NTMyLCJhaW8iOiJFMkpnWVBpVCtxNW4vclh3WjB0NDV6akx2bHlzRGdBPSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiMGpRS2NvTlNra1NyeVVOQXdUVE1BQSIsInZlciI6IjEuMCJ9.WGCnrP3iwQercsy2T4xY7fMAdzjG5kQoi1GCHjp8U3cq4vPvWVWu2OZcHtuXSpryfaDiIK3P0c42iabY2Fj_GeaaZ5pb8gV9MxwlaQB9p-_YYZcp2Lz9ikg1WgHK35AIqwwbHx_f_gfc-LuX4SSIA3BWKWN43sQCWcWQsYZ0Uq9r8nNima5--ho6bsQoDGUfZ0iUQOe8zZvOQZZzQ7KBYNmWf4kagXSDsz5_mcFC3LOBXsqKffEJ6tH2_kMMJeAOpS0sckD_9aeBguCyXel-OyeJPVoV-W_SM16c_vj3qFNUIusC3_Og7gCt5eTYCHeJru6lf92q02Eyknx7A1XyBA"}, [
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
  '2.1.11397.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4jMrsoBOFHv-w2Bw3VDJhWyo4SAgAAAFvcl9cOAAAA; expires=Wed, 17-Feb-2021 19:45:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Jan 2021 19:45:32 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities')
  .query(false)
  .reply(200, {"id":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'NJliVzYvf0CcssPRX5uIsw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '200ms',
  'X-Azure-Ref',
  '0XOUFYAAAAAA++yp6/sDiSLXfuvRwEIDHRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities/sanitized/token', {"scopes":["chat","pstn"]})
  .query(false)
  .reply(200, {"id":"sanitized","token":"sanitized","expiresOn":"2021-01-19T19:45:32.0590096+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'PnJFwoU040G/L4DCr2YfpQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '272ms',
  'X-Azure-Ref',
  '0XOUFYAAAAACWYihSGOO8RJXgW3FNmlfaRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:33 GMT'
]);
