let nock = require('nock');

module.exports.hash = "aa3b203d9e2d26ba658b05deffc4bd31";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTA5OTg4NzMsIm5iZiI6MTYxMDk5ODg3MywiZXhwIjoxNjExMDg1NTczLCJhaW8iOiJFMkpnWVBCbmYxUXlxYUZpRitQV1EvYmZVaVVjQUE9PSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoidjNpRGtZcDMtMFdMQVJDcFJ2ekdBQSIsInZlciI6IjEuMCJ9.RXa1QgXtmwSUAguz-X1kA3rE1G4x8RFab1oFjXnqHpmBHWBZDIbyaeiYXHZJ-TwRGSU7mFrkxVJk8fBFUyiKDSeVc72Q_Zvvh4yRjiy6Os30KYqC920Bw2x8Ai8YHzVdQoeOxOXDhZelMmrYgVrONnHRXfDtJ_OHxCjj2NEQrbJdPjrp36VpiXfk2ii6DKfkzM9mwxuY-NazVsPCGohYLNR6TLz4RrbJDk78NCuwsU1J7mAm32mMDV0TJOdfNfCyMVGRSsA3Q3B4sub7ZMmU7IlDY9BbE2oY6OCN-2cx3c72WulLCUusr5TcP8BRql_jyeBaqobWSUqHbKveCCpD2g"}, [
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
  'fpc=Am4jMrsoBOFHv-w2Bw3VDJhWyo4SAwAAAFvcl9cOAAAA; expires=Wed, 17-Feb-2021 19:46:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Jan 2021 19:46:13 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/administration/phonenumbers/countries/US/phoneplangroups')
  .query(false)
  .reply(200, {"phonePlanGroups":[{"phonePlanGroupId":"sanitized","phoneNumberType":"Geographic","localizedName":"Azure- User - Geographic","localizedDescription":"These are numbers used by Azure resources."},{"phonePlanGroupId":"sanitized","phoneNumberType":"Geographic","localizedName":"Azure - Geographic","localizedDescription":"These are numbers used by Azure resources."},{"phonePlanGroupId":"sanitized","phoneNumberType":"TollFree","localizedName":"Azure - Toll Free","localizedDescription":"These are toll free numbers used by Azure resources."}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '9p7xC3P5xkSdwa/raGsqxg.0',
  'X-Processing-Time',
  '424ms',
  'X-Azure-Ref',
  '0heUFYAAAAACpr13XBFUTSb8SFBilgJWNRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:46:13 GMT'
]);
