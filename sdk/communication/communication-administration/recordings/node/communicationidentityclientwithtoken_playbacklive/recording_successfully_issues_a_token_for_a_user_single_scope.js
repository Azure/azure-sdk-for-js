let nock = require("nock");

module.exports.hash = "94601dd7a4aa157e7f368397131f263e";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTA5OTg4MzEsIm5iZiI6MTYxMDk5ODgzMSwiZXhwIjoxNjExMDg1NTMxLCJhaW8iOiJFMkpnWUdBeDl2Y3JPM1htakxCQWF2L1NlNStkQUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiZ05EcEpQZzMyVVdVRGdQQV9LWVBBQSIsInZlciI6IjEuMCJ9.fgt7jC1vFpYbP35kBXCMs4oco9unKU420IygUoDvAqDC73zPmZ0UpxPEJ-jVmJW1cB8U-wMkY-pwX5fcv_fH_p0MkR-nZNsjgsFonwCLPeG6Is7x0tcyT4jWA-rBu7vz33_skgsqIw6fsp2gHneluPlTVRxS1qIEvUyzWJ7UXD8kzLrtLGVUDu0TTXte9HbF15y-6cWAsmvjc7lRze5OEhBrdgT9E7WcN78MDMwZ6AeCrayUz3BUyIZYlp7DC2eMDyhguDBk9bT34vkz23FvuHF2yMtDKNvL_8KYmbz1i-3F-gpNUNBrwDGexWZlL1k2BQ-EYMMzpPj5RksIS7Ie5Q"}, [
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
  '2.1.11397.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Am4jMrsoBOFHv-w2Bw3VDJhWyo4SAQAAAFvcl9cOAAAA; expires=Wed, 17-Feb-2021 19:45:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Jan 2021 19:45:31 GMT',
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
  'upmffHt66EKoAp+vKhVnvQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '204ms',
  'X-Azure-Ref',
  '0W+UFYAAAAACcPnHoPzeoT4tR/kL4U+iRRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities/sanitized/token', {"scopes":["chat"]})
  .query(false)
  .reply(200, {"id":"sanitized","token":"sanitized","expiresOn":"2021-01-19T19:45:31.2400055+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '3UxOF+fS4k2FDcZT8fXOMg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '271ms',
  'X-Azure-Ref',
  '0W+UFYAAAAAClgQYNQUpbS6Fe5mqccTZTRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:32 GMT'
]);
