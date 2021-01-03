let nock = require('nock');

module.exports.hash = "08f27c8c26b375d84a5bec71721f5e47";

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
  'f3dd3c72-5868-4a83-abc3-aee14a0d5001',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=At8oFaTpF_JNo-B8C5Nh9jS0r_H1AQAAAI44g9cOAAAA; expires=Tue, 02-Feb-2021 04:01:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 03 Jan 2021 04:01:18 GMT'
]);

nock('https://shareduks.uks.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiAiUlMyNTYiLCAiamt1IjogImh0dHBzOi8vc2hhcmVkdWtzLnVrcy5hdHRlc3QuYXp1cmUubmV0L2NlcnRzIiwgImtpZCI6ICI3TzB5QmJqNDhvTVBLcEJjc2hGeFlvMlRaZW8vbmFXQTZIcmd1UUV3b1VNPSIsICJ0eXAiOiAiSldUIn0.eyJleHAiOiAxNjA5NjUwMDgwLCAiaWF0IjogMTYwOTY0NjQ4MCwgImlzcyI6ICJodHRwczovL3NoYXJlZHVrcy51a3MuYXR0ZXN0LmF6dXJlLm5ldCIsICJuYmYiOiAxNjA5NjQ2NDgwLCAieC1tcy1wb2xpY3kiOiAiZXlKaGJHY2lPaUp1YjI1bEluMC5leUpCZEhSbGMzUmhkR2x2YmxCdmJHbGplU0k2SUNKa2JWWjVZekpzZG1KcU1HZE5VelIzVHpKR01XUkhhSFpqYld3MldWaFNjR0l5Tlhsa1YzaHNZek4wYWs5c2REQmxXRUpzVUZRd2FVcEhiSHBNVjFKc1dXNVdibG95Um1saVIxVnBXRk5CT1ZCcFFuZGFXRXAwWVZoUmIwdFVkRGxQTW14Nll6TldhR0p0VG14amJsWnpXbGhPTjFsNmNHSmtTR3gzV2xRd09VbHBVbkJqZVRGcldsZEtNVm95WkdoWmJYaHNTV3d3WjFCVU5HZGhXRTU2WkZkVmIyUkliSGRhVkRCcFlWaE5kRnBIVm1sa1YyUnVXVmRLYzFwVFNYTkpTRnBvWWtoV2JGQlhUWFZrYlVaelpGZFZjRTh5VFRaWE0xSTFZMGRWT1ZCVFNXdGpNbVEwVEZjeGVXTXliRzVpYlZaNVNXd3daMUJVTkdkaFdFNTZaRmRWYjJSSWJIZGFWREJwWXpKa05FeFhNWGxqTW14dVltMVdlVWxwZDJka2JVWnpaRmRWT1ZsNU5USlpWM2d4V2xOck4xbDZjR0prU0d4M1dsUXdPVWxwVW5wYU0yZDBZbGhLYkdKdFRuTlpXRnBzU1d3d1oxQlVOR2RoV0U1NlpGZFZiMlJJYkhkYVZEQnBZekprTkV4WE1YbGFWelZxWWtkR01scFRTWE5KU0Zwb1lraFdiRkJYVFhWa2JVWnpaRmRWY0U4eVRUWlhNMUkxWTBkVk9WQlRTV3RqU0VwMldraFdhbVJETVhCYVEwcGtTVVF3TFVsSGJIcGpNMVpzUzBoU05XTkhWVGxKYmtKNVlqSlNNVmt6VVhSaFYxRnBURU5DTWxsWGVERmFWREZxVEc1YWFHSklWbXhMVkhScVQyeDBNR1ZZUW14UVZEQnBTa2hPTW1KcFNtUkpSREF0U1Vkc2VtTXpWbXhMU0ZJMVkwZFZPVWx1VGpKaWFVbHpTVWhhYUdKSVZteFFWMDExWkcxR2MyUlhWWEJQTWswMlZ6TlNOV05IVlRsUVUwbHJaRWRXYkVsc01HZFFWRFJuWVZoT2VtUlhWVzlrU0d4M1dsUXdhV1JIVm14SmFYZG5aRzFHYzJSWFZUbFplVFV5V1ZkNE1WcFRhemRtVkhNaWZRLiJ9.Yz2t2xoA3SPTpB23YIFQp5UNX8y3kcOW1GUScWuxM4NlpqI0FnE904iiOVt0UPcGwuuTwXv7TmeQ4g98HRpCgD_4IjxVDQ-u9KC6h_VdZR6fY0zS7FA9QMDN8HcrOM3aIeN5Ze78PSYd9C-DXvKDFxKtyThfzQWik0lAoH9UI4k"}, [
  'Connection',
  'close',
  'Date',
  'Sun, 03 Jan 2021 04:01:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1748',
  'x-ms-request-id',
  '00-19d05bda19f810e487b61ae6c2671663-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01439.0001'
]);
