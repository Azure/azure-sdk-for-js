let nock = require('nock');

module.exports.hash = "327f8adc568814406df75b5dba40ca9d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .query(true)
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTEwODc1NzUsIm5iZiI6MTYxMTA4NzU3NSwiZXhwIjoxNjExMTc0Mjc1LCJhaW8iOiJFMkpnWURqMCsxa1J3NlNhZ2dtT1FzWXNiNjIrQVFBPSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiLUtJYzZXcE9nMFdNMVlDb0o3el9BQSIsInZlciI6IjEuMCJ9.JoXmNLJN7MpVhqbzCoAZTSkzQfqUpRw5pf5NmRl8PutPpWR1pyKwETLtgVURImT6Ym1Ocwo_xs7K8rv6eZv1KoTqZ-PcQ_wN9c8H8jRv3sLjgMfshNFHdxSlAN0K3KgVmfh0p41TIaWYLWeT8lS6K41z-7oHd96pthoqHm4Gg94XOXzQE8nlpsu5_OiPnQm7Uq2QwR_NYdT3RPRDqXouTvogpOg49XM6n5B36OgcSAgxhyhw3e1In3U4ZAppgtSyJfR5Im3lTADqmPjksxTfmKkBajOZFaudz3Q81CXBJTTQwwl_p0GBulcseg8PvxTY2gPFHlcPi_4O_OXHmS_Yxw"}, [
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
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqaO3QkNnipOoSGmfbP7BhpWyo4SAgAAAP42mdcOAAAA; expires=Thu, 18-Feb-2021 20:24:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 19 Jan 2021 20:24:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/administration/phonenumbers/countries/US/phoneplangroups')
  .query(true)
  .reply(200, {"phonePlanGroups":[{"phonePlanGroupId":"sanitized","phoneNumberType":"Geographic","localizedName":"Azure- User - Geographic","localizedDescription":"These are numbers used by Azure resources."},{"phonePlanGroupId":"sanitized","phoneNumberType":"Geographic","localizedName":"Azure - Geographic","localizedDescription":"These are numbers used by Azure resources."},{"phonePlanGroupId":"sanitized","phoneNumberType":"TollFree","localizedName":"Azure - Toll Free","localizedDescription":"These are toll free numbers used by Azure resources."}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'jAOTN5sYg0qTVjzuMCq/Aw.0',
  'X-Processing-Time',
  '623ms',
  'X-Azure-Ref',
  '0BEAHYAAAAAChZ1Dp2GCmSqSCWHjWzw4hRVdSMzBFREdFMDUxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 19 Jan 2021 20:24:36 GMT'
]);
