let nock = require('nock');

module.exports.hash = "162b9f16b14b90248fc1d793cc0743fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'b9d570a9-1700-4304-a7a3-043aa9d69000',
  'x-ms-ests-server',
  '2.1.11722.26 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtWIzdkWarBDnfmCPyLEsoa81LWYCwAAAGm7SNgOAAAA; expires=Thu, 01-Jul-2021 23:36:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Jun 2021 23:36:25 GMT',
  'Content-Length',
  '1317'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .put('/policies/SgxEnclave', "eyJhbGciOiJub25lIn0.eyJBdHRlc3RhdGlvblBvbGljeSI6ImRtVnljMmx2YmoweExqQTdJR0YxZEdodmNtbDZZWFJwYjI1eWRXeGxjM3M5UGlCd1pYSnRhWFFvS1R0OU95QnBjM04xWVc1alpYSjFiR1Z6ZTMwNyJ9.")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjI1OTQxODcsImlhdCI6MTYyMjU5MDU4NywiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyNTkwNTg3LCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJVcGRhdGVkIiwieC1tcy1wb2xpY3ktdG9rZW4taGFzaCI6ImM2c0VKUUl0VjUwT2VQOUlyUF9ienl3QU1PVnZqNXVEUGJrbEFfYndkWVEifQ.vEShAUaLg5u8NpXdFfQKm7y3kglRypX6UOLRvjuVxoey87UqV-N-RGbmE_qZtMMHFNH6AA3-WEUdPhkoYynbiDHd71JT53O75b6psx3FJzEwKIyqxKuPY0L6yflohAffLrNFwGGoB7M7TqkqWOJ3GHnYzcQtok7ebbG4OiZRnYCff2zM_BUtPiDkV392iMfwTaPMbPyFT6LKFpYTszRuHVL9BfSKJJuEdF_4GSG9Ht0yqnfVYd8GZVo0uROm8bW27SLNn0fF1YPSWyFreezY6TG8C7jeNB8tlm-KGEE3gvYWxUbIya1H88yaPboZJivWHdaFQ5Auzs7pYjui-JHEqQ"}, [
  'Connection',
  'close',
  'Date',
  'Tue, 01 Jun 2021 23:36:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '837',
  'x-ms-request-id',
  '00-66e9113b86f28a6bca22c55e3433172e-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjI1OTQxODcsImlhdCI6MTYyMjU5MDU4NywiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyNTkwNTg3LCJ4LW1zLXBvbGljeSI6ImV5SmhiR2NpT2lKdWIyNWxJbjAuZXlKQmRIUmxjM1JoZEdsdmJsQnZiR2xqZVNJNkltUnRWbmxqTW14Mlltb3dlRXhxUVRkSlIwWXhaRWRvZG1OdGJEWlpXRkp3WWpJMWVXUlhlR3hqTTNNNVVHbENkMXBZU25SaFdGRnZTMVIwT1U5NVFuQmpNMDR4V1ZjMWFscFlTakZpUjFaNlpUTXdOeUo5LiJ9.03g8_cjSIXS0ygN08xaU-3rEaLKZLZ0Y4infTma6DnmnvCpJ5PR2mDEpTW7axRM9s5JmEfEdb9p-870DmZWG__ZeCYh78Ac4Q1YJ_8g7hqnZarfRCGUEbK1AmJwN3rcLz4WXsfXnktOBzvPSkqVU6kxKH7IPn4LJTDNeO9IYM-FzkucCV0ONP2xjsLy2YOLmDRZoCUmehozlZ6vMCDNLdQNq-Irvmg79JdhtQ6tIudBE68ugDXMVSi8lDZnmInZyYXpomuOobTULtVhmWqfE6PR0W2-mbQfnFlWfpThhJ5Opro3sBBwIkCIq6VCUEAPh5kJun1AAPAxXU7zI9RdsUw"}, [
  'Connection',
  'close',
  'Date',
  'Tue, 01 Jun 2021 23:36:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '943',
  'x-ms-request-id',
  '00-5832000480bb6d478ada8e976a421926-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
