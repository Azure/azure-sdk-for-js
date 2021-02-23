let nock = require('nock');

module.exports.hash = "e9e4d28818e35133b68bf236d797d9f8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTQxMTY2NzEsIm5iZiI6MTYxNDExNjY3MSwiZXhwIjoxNjE0MjAzMzcxLCJhaW8iOiJFMlpnWU5nUXR1U3hxZW4ydHdidmtsWGFoVFd5QUE9PSIsImFwcGlkIjoiNmIyNTY4MGMtYTU3Ny00NDFkLTg1MDEtYmFkMGQwNTFkNGQ3IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6Ijk3YTA3NTE4LTcxZWItNGU4My1hOWExLWU5NzAyMDRjMDk3NiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSd3hvSld0M3BSMUVoUUc2ME5CUjFOY2FBQUEuIiwic3ViIjoiOTdhMDc1MTgtNzFlYi00ZTgzLWE5YTEtZTk3MDIwNGMwOTc2IiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiSmZRaWVyNl9EMHFYVlJ0elVRSVpBQSIsInZlciI6IjEuMCJ9.fB1PZ_Xkrb3EsS3N-IwLUnfuOqfvlw4K_Vyu2cR2PE6rj61hTz0G1ibkGNjaPydVECXyxvbc6EkP-gdHspc-ANgYNZL90jmyOnPfL6aLwUI3svvCEx0cIz3pI58b7fS5VnEpVo_U7sXdq5OS0G_sQRTHLuxoxFU5FHUfFzrtO7v7MiQbNLYPSOAnZ5f4zUQBocdDCom-Zq9rx75L8mw5ZIT0n3-YKEH2z_miz93lIeja-eJeDws3ENk4gUxAZmdTVF1fokYDZCaeFsL2hLrkN5trPADDrggYAmt_pQZPdm-z_AGpnooQJaEXpU4lT5IVUOH8P_izp2Cp4iG9R6tF5A"}, [
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
  '7a22f425-bfbe-4a0f-9755-1b7351021900',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai4P-bQtmV5Pntx2-UM9UpuMqxLZAQAAAGtvx9cOAAAA; expires=Thu, 25-Mar-2021 21:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 21:49:30 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"97da7435-be0c-4d0b-81a6-4a46ac318cf0","repeatabilityFirstSent":"Tue, 23 Feb 2021 21:49:30 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zhSqiZ1s50CeNabIPzvVxQ.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '630ms',
  'X-Azure-Ref',
  '0a3g1YAAAAABAPKFpNGJdSKYW3UhQA1HSWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 23 Feb 2021 21:49:31 GMT'
]);
