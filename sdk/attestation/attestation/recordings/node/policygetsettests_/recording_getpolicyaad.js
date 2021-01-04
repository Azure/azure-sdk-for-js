let nock = require('nock');

module.exports.hash = "1fec8eaa12beff22f1910a50be8d72bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fattest.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  '749ddacd-9656-4dbe-9218-68fb0d935700',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArhXP640M0BGrn3oIZ2mZdy0r_H1AQAAABk9hdcOAAAA; expires=Wed, 03-Feb-2021 16:45:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Jan 2021 16:45:13 GMT',
  'Content-Length',
  '1317'
]);

nock('aad_attestation_url:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiAiUlMyNTYiLCAiamt1IjogImh0dHBzOi8vZGVhbG1haGFhdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsICJraWQiOiAiMTVOMk1Ib2o5aUFka0YvYzVuUkUzSjJIQjhKRzZWdWUzVXp2dTNLL1Nlcz0iLCAidHlwIjogIkpXVCJ9.eyJleHAiOiAxNjA5NzgyMzE1LCAiaWF0IjogMTYwOTc3ODcxNSwgImlzcyI6ICJodHRwczovL2RlYWxtYWhhYXR0ZXN0YXRpb25hYWQud3VzLmF0dGVzdC5henVyZS5uZXQiLCAibmJmIjogMTYwOTc3ODcxNSwgIngtbXMtcG9saWN5IjogImV5SmhiR2NpT2lKdWIyNWxJbjAuZXlKQmRIUmxjM1JoZEdsdmJsQnZiR2xqZVNJNklDSmtiVlo1WXpKc2RtSnFNR2ROVXpSM1R6SkdNV1JIYUhaamJXdzJXVmhTY0dJeU5YbGtWM2hzWXpOMGFrOXNkREJsV0VKc1VGUXdhVXBIYkhwTVYxSnNXVzVXYmxveVJtbGlSMVZwV0ZOQk9WQnBRbmRhV0VwMFlWaFJiMHRVZERsUE1teDZZek5XYUdKdFRteGpibFp6V2xoT04xbDZjR0prU0d4M1dsUXdPVWxwVW5CamVURnJXbGRLTVZveVpHaFpiWGhzU1d3d1oxQlVOR2RoV0U1NlpGZFZiMlJJYkhkYVZEQnBZVmhOZEZwSFZtbGtWMlJ1V1ZkS2MxcFRTWE5KU0Zwb1lraFdiRkJYVFhWa2JVWnpaRmRWY0U4eVRUWlhNMUkxWTBkVk9WQlRTV3RqTW1RMFRGY3hlV015Ykc1aWJWWjVTV3d3WjFCVU5HZGhXRTU2WkZkVmIyUkliSGRhVkRCcFl6SmtORXhYTVhsak1teHVZbTFXZVVscGQyZGtiVVp6WkZkVk9WbDVOVEpaVjNneFdsTnJOMWw2Y0dKa1NHeDNXbFF3T1VscFVucGFNMmQwWWxoS2JHSnRUbk5aV0Zwc1NXd3daMUJVTkdkaFdFNTZaRmRWYjJSSWJIZGFWREJwWXpKa05FeFhNWGxhVnpWcVlrZEdNbHBUU1hOSlNGcG9Za2hXYkZCWFRYVmtiVVp6WkZkVmNFOHlUVFpYTTFJMVkwZFZPVkJUU1d0alNFcDJXa2hXYW1SRE1YQmFRMHBrU1VRd0xVbEhiSHBqTTFac1MwaFNOV05IVlRsSmJrSjVZakpTTVZrelVYUmhWMUZwVEVOQ01sbFhlREZhVkRGcVRHNWFhR0pJVm14TFZIUnFUMngwTUdWWVFteFFWREJwU2toT01tSnBTbVJKUkRBdFNVZHNlbU16Vm14TFNGSTFZMGRWT1VsdVRqSmlhVWx6U1VoYWFHSklWbXhRVjAxMVpHMUdjMlJYVlhCUE1rMDJWek5TTldOSFZUbFFVMGxyWkVkV2JFbHNNR2RRVkRSbllWaE9lbVJYVlc5a1NHeDNXbFF3YVdSSFZteEphWGRuWkcxR2MyUlhWVGxaZVRVeVdWZDRNVnBUYXpkbVZITWlmUS4ifQ.fAcmCjPLTVmz6osuf6rDpDGYnXptKl9HnMpG2Dtq7PMsJPKZpXxYd6WWoFKXu0OJaA_d5j6XMYMjdtzSHy4XK7AjLTv1a3q3A4cuqRj5yZFlx2etZH_QqJz-UF7T_GWAenF3DyATvZxQir6FdBSQuz5SHg92Zr74s0Qe2mJnfkU"}, [
  'Connection',
  'close',
  'Date',
  'Mon, 04 Jan 2021 16:45:15 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1783',
  'x-ms-request-id',
  '00-78f39a35bea256cf870ae03c8bf9b611-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01439.0001'
]);
