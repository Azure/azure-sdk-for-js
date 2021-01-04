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
  'cbeb5474-24a8-4316-91ac-e043880e8f01',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuG62KBHvtBOlYrV7pHg3wm0r_H1AQAAABw9hdcOAAAA; expires=Wed, 03-Feb-2021 16:45:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Jan 2021 16:45:17 GMT',
  'Content-Length',
  '1317'
]);

nock('https://shareduks.uks.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiAiUlMyNTYiLCAiamt1IjogImh0dHBzOi8vc2hhcmVkdWtzLnVrcy5hdHRlc3QuYXp1cmUubmV0L2NlcnRzIiwgImtpZCI6ICI3TzB5QmJqNDhvTVBLcEJjc2hGeFlvMlRaZW8vbmFXQTZIcmd1UUV3b1VNPSIsICJ0eXAiOiAiSldUIn0.eyJleHAiOiAxNjA5NzgyMzE4LCAiaWF0IjogMTYwOTc3ODcxOCwgImlzcyI6ICJodHRwczovL3NoYXJlZHVrcy51a3MuYXR0ZXN0LmF6dXJlLm5ldCIsICJuYmYiOiAxNjA5Nzc4NzE4LCAieC1tcy1wb2xpY3kiOiAiZXlKaGJHY2lPaUp1YjI1bEluMC5leUpCZEhSbGMzUmhkR2x2YmxCdmJHbGplU0k2SUNKa2JWWjVZekpzZG1KcU1HZE5VelIzVHpKR01XUkhhSFpqYld3MldWaFNjR0l5Tlhsa1YzaHNZek4wYWs5c2REQmxXRUpzVUZRd2FVcEhiSHBNVjFKc1dXNVdibG95Um1saVIxVnBXRk5CT1ZCcFFuZGFXRXAwWVZoUmIwdFVkRGxQTW14Nll6TldhR0p0VG14amJsWnpXbGhPTjFsNmNHSmtTR3gzV2xRd09VbHBVbkJqZVRGcldsZEtNVm95WkdoWmJYaHNTV3d3WjFCVU5HZGhXRTU2WkZkVmIyUkliSGRhVkRCcFlWaE5kRnBIVm1sa1YyUnVXVmRLYzFwVFNYTkpTRnBvWWtoV2JGQlhUWFZrYlVaelpGZFZjRTh5VFRaWE0xSTFZMGRWT1ZCVFNXdGpNbVEwVEZjeGVXTXliRzVpYlZaNVNXd3daMUJVTkdkaFdFNTZaRmRWYjJSSWJIZGFWREJwWXpKa05FeFhNWGxqTW14dVltMVdlVWxwZDJka2JVWnpaRmRWT1ZsNU5USlpWM2d4V2xOck4xbDZjR0prU0d4M1dsUXdPVWxwVW5wYU0yZDBZbGhLYkdKdFRuTlpXRnBzU1d3d1oxQlVOR2RoV0U1NlpGZFZiMlJJYkhkYVZEQnBZekprTkV4WE1YbGFWelZxWWtkR01scFRTWE5KU0Zwb1lraFdiRkJYVFhWa2JVWnpaRmRWY0U4eVRUWlhNMUkxWTBkVk9WQlRTV3RqU0VwMldraFdhbVJETVhCYVEwcGtTVVF3TFVsSGJIcGpNMVpzUzBoU05XTkhWVGxKYmtKNVlqSlNNVmt6VVhSaFYxRnBURU5DTWxsWGVERmFWREZxVEc1YWFHSklWbXhMVkhScVQyeDBNR1ZZUW14UVZEQnBTa2hPTW1KcFNtUkpSREF0U1Vkc2VtTXpWbXhMU0ZJMVkwZFZPVWx1VGpKaWFVbHpTVWhhYUdKSVZteFFWMDExWkcxR2MyUlhWWEJQTWswMlZ6TlNOV05IVlRsUVUwbHJaRWRXYkVsc01HZFFWRFJuWVZoT2VtUlhWVzlrU0d4M1dsUXdhV1JIVm14SmFYZG5aRzFHYzJSWFZUbFplVFV5V1ZkNE1WcFRhemRtVkhNaWZRLiJ9.MLDA0T_soxqaDcPwkZ2ajFvK6NzxBG7qxq66hXp84S1QxCmocFhulsuMK-aPfTv5kmFX0P7MKOn9w-p8swR_XY_L77io16anYgt8NiIXS5MjzC21OsdIFWVO4j2q898TXWd1I6Y-T3M1GK34_3J3I5n8YwbucxhVTKTyn0xKRTU"}, [
  'Connection',
  'close',
  'Date',
  'Mon, 04 Jan 2021 16:45:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1748',
  'x-ms-request-id',
  '00-eba009e3f109febf267b64b62885ce6d-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01439.0001'
]);
