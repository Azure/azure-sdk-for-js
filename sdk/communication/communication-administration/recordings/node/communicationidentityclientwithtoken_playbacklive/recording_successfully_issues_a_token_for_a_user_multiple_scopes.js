let nock = require('nock');

module.exports.hash = "3a781f5c72e6153f2bf8095c6929d1b1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTExODcxNjksIm5iZiI6MTYxMTE4NzE2OSwiZXhwIjoxNjExMjczODY5LCJhaW8iOiJFMkpnWURCejZTNmFZZUIxdEUxVFIwWk8wbXN4QUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiZUJTRDVWcGxia0NXYmxuTlVLTktBQSIsInZlciI6IjEuMCJ9.PZsjSuL0VoiCmwibQVhuCAxp2lCIzfcNlbl5cF1SkPHgAacfQ744v-Sb0xeRLHriE5pVcOngbfdun9ntoclY3qzdMafqQunOMgOT9qtSSM5S5wzBWaRBz3EcYW3D9kFsV2m5O1sZaPXPcbdvcEXs9hiAdm9jfDE0JwX2-OOPLSzDtKAWb5ES8cG7TFizVyaLI6kubY8F_x2wkFFGfQKDQVuclBYQGkbK6xGl5nMmYhQmtoUtSajPezO8ZH9CQJB1K1t89msOZ0R_Ybup0-XOegltd6a10bRMV7f-5_FZa0GshbqrGzSLNVu0lhLTcyv08vswwXOMqUgDx8nwNAoHnA"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11419.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtQYQhtVXGxAl2HRYGEM9KBWyo4SAgAAAAu8mtcOAAAA; expires=Sat, 20-Feb-2021 00:04:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Jan 2021 00:04:28 GMT'
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
  '+228zHuTcE+i2INmpf/DeQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '206ms',
  'X-Azure-Ref',
  '0DcUIYAAAAAAC6+h+zVScTJpFpLyDcI5HRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 21 Jan 2021 00:04:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities/sanitized/token', {"scopes":["chat","pstn"]})
  .query(true)
  .reply(200, {"id":"sanitized","token":"sanitized","expiresOn":"2021-01-22T00:04:28.9279178+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5x9WnSeooUCFUUjqzAkkTA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '274ms',
  'X-Azure-Ref',
  '0DcUIYAAAAABr35Qn+npVQoTb9NPLRQaWRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 21 Jan 2021 00:04:29 GMT'
]);
