let nock = require('nock');

module.exports.hash = "327f8adc568814406df75b5dba40ca9d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTExODcxNzIsIm5iZiI6MTYxMTE4NzE3MiwiZXhwIjoxNjExMjczODcyLCJhaW8iOiJFMkpnWVBpY2x1dy9UVDk5ejIrQlAvcmhrbnYzQXdBPSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiQXRCbmszWWV5a21mckQ3UTRQOFVBQSIsInZlciI6IjEuMCJ9.TiQUDCVYNuJQVmqloZ4u0gP4rS4XaV7HwcpgCbTn994QoIBGGUMKOK-KR8e8U_gifiWGsatnVq9-LTvLq0OjCCuO9UFe-d4UNljyJtSZ2WF_DuchwA4vIzBY1-9CmmXkCpTUfFUsghKEf3UrVXRaDsdnoSKV_exYKMxrkzNNcVAjlgcwvTap5TuUVLmPNv9BWmnf-SfkKNklMdO03jJ9j46BacWf5lToH8gQJ0Q5pAehJQ9hsRDRRB-KZXn4e2CHtzpyxMtnnmbNlD3fIyTI_NMC29qjpWZINJCmSwvxNe_pM0dHwy6VE5P3Mt4fq2t4T0ehSJmmz8HH0Ra7eKBj_Q"}, [
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
  '2.1.11419.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtQYQhtVXGxAl2HRYGEM9KBWyo4SAwAAAAu8mtcOAAAA; expires=Sat, 20-Feb-2021 00:04:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Jan 2021 00:04:32 GMT',
  'Content-Length',
  '1327'
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
  '+4uJIAe1x0OvPbKUJMtlUA.0',
  'X-Processing-Time',
  '623ms',
  'X-Azure-Ref',
  '0EMUIYAAAAAC0o6cAdVC/TbazsMk2AVIfRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 21 Jan 2021 00:04:32 GMT'
]);
