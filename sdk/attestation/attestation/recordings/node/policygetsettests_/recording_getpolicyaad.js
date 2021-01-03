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
  'Content-Length',
  '1317',
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
  '18817caf-7482-4aee-83cb-bd532c6b4601',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqNvQfQ6NUtBlXtbpVUDx6u0r_H1AQAAAIw4g9cOAAAA; expires=Tue, 02-Feb-2021 04:01:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 03 Jan 2021 04:01:16 GMT'
]);

nock('aad_attestation_url:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiAiUlMyNTYiLCAiamt1IjogImh0dHBzOi8vZGVhbG1haGFhdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsICJraWQiOiAiMTVOMk1Ib2o5aUFka0YvYzVuUkUzSjJIQjhKRzZWdWUzVXp2dTNLL1Nlcz0iLCAidHlwIjogIkpXVCJ9.eyJleHAiOiAxNjA5NjUwMDc4LCAiaWF0IjogMTYwOTY0NjQ3OCwgImlzcyI6ICJodHRwczovL2RlYWxtYWhhYXR0ZXN0YXRpb25hYWQud3VzLmF0dGVzdC5henVyZS5uZXQiLCAibmJmIjogMTYwOTY0NjQ3OCwgIngtbXMtcG9saWN5IjogImV5SmhiR2NpT2lKdWIyNWxJbjAuZXlKQmRIUmxjM1JoZEdsdmJsQnZiR2xqZVNJNklDSmtiVlo1WXpKc2RtSnFNR2ROVXpSM1R6SkdNV1JIYUhaamJXdzJXVmhTY0dJeU5YbGtWM2hzWXpOMGFrOXNkREJsV0VKc1VGUXdhVXBIYkhwTVYxSnNXVzVXYmxveVJtbGlSMVZwV0ZOQk9WQnBRbmRhV0VwMFlWaFJiMHRVZERsUE1teDZZek5XYUdKdFRteGpibFp6V2xoT04xbDZjR0prU0d4M1dsUXdPVWxwVW5CamVURnJXbGRLTVZveVpHaFpiWGhzU1d3d1oxQlVOR2RoV0U1NlpGZFZiMlJJYkhkYVZEQnBZVmhOZEZwSFZtbGtWMlJ1V1ZkS2MxcFRTWE5KU0Zwb1lraFdiRkJYVFhWa2JVWnpaRmRWY0U4eVRUWlhNMUkxWTBkVk9WQlRTV3RqTW1RMFRGY3hlV015Ykc1aWJWWjVTV3d3WjFCVU5HZGhXRTU2WkZkVmIyUkliSGRhVkRCcFl6SmtORXhYTVhsak1teHVZbTFXZVVscGQyZGtiVVp6WkZkVk9WbDVOVEpaVjNneFdsTnJOMWw2Y0dKa1NHeDNXbFF3T1VscFVucGFNMmQwWWxoS2JHSnRUbk5aV0Zwc1NXd3daMUJVTkdkaFdFNTZaRmRWYjJSSWJIZGFWREJwWXpKa05FeFhNWGxhVnpWcVlrZEdNbHBUU1hOSlNGcG9Za2hXYkZCWFRYVmtiVVp6WkZkVmNFOHlUVFpYTTFJMVkwZFZPVkJUU1d0alNFcDJXa2hXYW1SRE1YQmFRMHBrU1VRd0xVbEhiSHBqTTFac1MwaFNOV05IVlRsSmJrSjVZakpTTVZrelVYUmhWMUZwVEVOQ01sbFhlREZhVkRGcVRHNWFhR0pJVm14TFZIUnFUMngwTUdWWVFteFFWREJwU2toT01tSnBTbVJKUkRBdFNVZHNlbU16Vm14TFNGSTFZMGRWT1VsdVRqSmlhVWx6U1VoYWFHSklWbXhRVjAxMVpHMUdjMlJYVlhCUE1rMDJWek5TTldOSFZUbFFVMGxyWkVkV2JFbHNNR2RRVkRSbllWaE9lbVJYVlc5a1NHeDNXbFF3YVdSSFZteEphWGRuWkcxR2MyUlhWVGxaZVRVeVdWZDRNVnBUYXpkbVZITWlmUS4ifQ.G0QvRhLRZqfGxCeD6cFrLbTyPb6iIp48FElMi7tYiIcMPYeJwsc_FS5RhQVa9Kw49RYIqqbeUcn5tVE_umDTjosiYYV2dp4HinkOwddQ3kyjJ8WzfXXQBFlgad_oxrepmehKzfLtDrGor1fys3EeYEinMjDTW-Pr-cq6XLgbi64"}, [
  'Connection',
  'close',
  'Date',
  'Sun, 03 Jan 2021 04:01:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1783',
  'x-ms-request-id',
  '00-6d9a9f997604e38e09e38bf33ac09160-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01439.0001'
]);
