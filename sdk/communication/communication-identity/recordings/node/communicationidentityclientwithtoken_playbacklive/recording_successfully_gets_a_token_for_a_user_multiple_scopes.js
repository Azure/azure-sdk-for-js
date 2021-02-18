let nock = require('nock');

module.exports.hash = "a91f3fcca9a24a85e7fd284bad6a1005";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTM1MjI5NzYsIm5iZiI6MTYxMzUyMjk3NiwiZXhwIjoxNjEzNjA5Njc2LCJhaW8iOiJFMlpnWU9ETWRYNWpYMlI4NTJmVzFkSU41Z3Y2QUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiVVRlci0zR29uMHlvRjdycUNLOUtBQSIsInZlciI6IjEuMCJ9.WtUWUg-Xq9UATbK7YPcnUWcUrJvUy8vXNwITTlBOFW6mB5Sw_bFHwflw2nwUq5FoTuKijJsFMISQjMKNiWk9a-AsK9B4TbuJA2xCoWCB_MqRpB0p_sw4rpE-kctewtp7lrE4i8zIxk7JZjD6f-Xx3JBupa2RlyTokIyjzyH9b0RU9ypFZockwoZo2YdMKQterTAHxIefia37l81VBisslZCcZpQoTELUOqWyxNeAzNlHM4tvg7N1YjfFsoQF3z1T5qV5XUPzwvPx76Cb5Bscwg88apK7KFxd-iPs97VeaavOc0O05avMpr1J5OpACMze3VlPmW-xixDRFXpNjidjlw"}, [
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
  'fpc=AkTnoos9pIBEvTYiZcFsYrxWyo4SAgAAAEtgvtcOAAAA; expires=Fri, 19-Mar-2021 00:54:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 17 Feb 2021 00:54:36 GMT'
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
  'sHtbD7FeSE21nZa9TqYIWg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '18ms',
  'X-Azure-Ref',
  '0TGksYAAAAADBM+p95WGSToQ3B35Xv08CWVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 17 Feb 2021 00:54:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":["chat","voip"]})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-02-18T00:54:35.9952578+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'uGokX3YXak6BJF4wT8zWIg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '23ms',
  'X-Azure-Ref',
  '0TGksYAAAAACKiZMrNERvSK5QoB0Fp/hYWVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 17 Feb 2021 00:54:36 GMT'
]);
