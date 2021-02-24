let nock = require('nock');

module.exports.hash = "e9e4d28818e35133b68bf236d797d9f8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTQxOTU5NDksIm5iZiI6MTYxNDE5NTk0OSwiZXhwIjoxNjE0MjgyNjQ5LCJhaW8iOiJFMlpnWU5pOTZ5aHZaZzNIdDRjbnpyb2RGUEdlQ1FBPSIsImFwcGlkIjoiNmIyNTY4MGMtYTU3Ny00NDFkLTg1MDEtYmFkMGQwNTFkNGQ3IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6Ijk3YTA3NTE4LTcxZWItNGU4My1hOWExLWU5NzAyMDRjMDk3NiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSd3hvSld0M3BSMUVoUUc2ME5CUjFOY2FBQUEuIiwic3ViIjoiOTdhMDc1MTgtNzFlYi00ZTgzLWE5YTEtZTk3MDIwNGMwOTc2IiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiQV8xaU8wNkM3MENfSWV0dl8wTV9BQSIsInZlciI6IjEuMCJ9.a-it2HzFs6xzF91YvL5R8CElr51FdlsdG3TbKkrzxmNdyscYwJttcqXts1vvBIpvzFXocG9oHZRhqEE4Yc6DbPm86z26Cf9mWbd5R_BH2SoG8-RzUJ-gC-2FUvkbFmQ5e-zNReX9IiEtd-soWGHxJLGSN95pn1k9lOIgwPYVirv5paZFNTeTrG6AU3OTh4KbGNVlKfQTT4NRYMjZRQOB4EErwLQcH4s-jCL2rsKUZ8A3ClEZYj-MxNoM-c2hJkFRGAR0v1f3H4EyiGQUpCEFupPLpoG8KEAjww2cdJmmlZnlpey4FzqAaH5fJIUBLHwl-TNCr4Ot6nkqfAAm2610Iw"}, [
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
  '3b62fd03-824e-40ef-bf21-eb6fff433f00',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArMP1QhhjPFEisGz-ku5B9SMqxLZAQAAABmlyNcOAAAA; expires=Fri, 26-Mar-2021 19:50:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Feb 2021 19:50:49 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"6088e7cc-4ecb-4270-b8ac-b001c7d75221","repeatabilityFirstSent":"Wed, 24 Feb 2021 19:50:49 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'T5o0Sr7lbU21yVq531FEpA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '513ms',
  'X-Azure-Ref',
  '0Gq42YAAAAAB+CDxFPejPSISXYxtk6ZUNWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 24 Feb 2021 19:50:50 GMT'
]);
