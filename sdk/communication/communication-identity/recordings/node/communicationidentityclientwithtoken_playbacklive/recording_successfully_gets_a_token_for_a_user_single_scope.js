let nock = require('nock');

module.exports.hash = "4b71805393b6313134537016202f37a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTM1MjI5NzYsIm5iZiI6MTYxMzUyMjk3NiwiZXhwIjoxNjEzNjA5Njc2LCJhaW8iOiJFMlpnWUdDVkxwZ1NaUkZ1cTVYcjVLNmhzK2NkQUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiaFh6d1hNTU80a21Md3FZNWpNeEdBQSIsInZlciI6IjEuMCJ9.mO7a_HsVR6HsPesz3bIlUUBj7gHLmW_RBkgsMhLhDnxX4dH5o2saVMR7XEMS-gWKsb6ycY-ujAFZYujq8FUeYfEm-RADnLIMD8fjX-jdN-fBcIBWqdI_gYGH8-uCKI5BGafuzOx1Rhx3IpFkJsDwJ9zCqP8wKbx_ymJUGmkAekJBPqWNZjX8hXS6RE6hRLy1K3NKdtFVy7Od6UEkx0pE5DnFFRP4L89r-NZKH5kazTWPNyCMArgWNelm_5RPLZVwGRvJ-X4D4iBXXVtLNnDkwfu6l5FbEdEDFq762X3xoHDNZK8x8ECivvYtU8pycp33JIMZ72nJPk2IojALezc1Uw"}, [
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
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkTnoos9pIBEvTYiZcFsYrxWyo4SAQAAAEtgvtcOAAAA; expires=Fri, 19-Mar-2021 00:54:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 17 Feb 2021 00:54:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'tBEG2qPSzEut2z1L6Da+0g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '15ms',
  'X-Azure-Ref',
  '0TGksYAAAAAB5BE+rN/9pQ4o6GoD7Qi20WVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 17 Feb 2021 00:54:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-02-18T00:54:35.6893953+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '/bTUamZNSk23+lc5+7317Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '21ms',
  'X-Azure-Ref',
  '0TGksYAAAAABtA9WPPtd+QKllsNAJlHB3WVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 17 Feb 2021 00:54:36 GMT'
]);
