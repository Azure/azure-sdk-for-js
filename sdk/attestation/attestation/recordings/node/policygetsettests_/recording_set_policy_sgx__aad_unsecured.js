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
  'b944687d-6a15-4301-940b-8c8adca80200',
  'x-ms-ests-server',
  '2.1.11722.26 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AuqZyK2c9JtCnsPw4XzlDoW81LWYCAAAAEtWQ9gOAAAA; expires=Sun, 27-Jun-2021 21:23:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 28 May 2021 21:23:48 GMT',
  'Content-Length',
  '1317'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .put('/policies/SgxEnclave', "eyJhbGciOiJub25lIn0.eyJBdHRlc3RhdGlvblBvbGljeSI6ImRtVnljMmx2YmoweExqQTdJR0YxZEdodmNtbDZZWFJwYjI1eWRXeGxjM3M5UGlCd1pYSnRhWFFvS1R0OU95QnBjM04xWVc1alpYSjFiR1Z6ZTMwNyJ9.")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjIyNDA2MzAsImlhdCI6MTYyMjIzNzAzMCwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyMjM3MDMwLCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJVcGRhdGVkIiwieC1tcy1wb2xpY3ktdG9rZW4taGFzaCI6ImM2c0VKUUl0VjUwT2VQOUlyUF9ienl3QU1PVnZqNXVEUGJrbEFfYndkWVEifQ.u9c6kA8DT82f-VdV1SI7H_uIWymJuj9jJS_3N5VPKrXpinguXDJJPBdnIMiaJXoUdvHrjRqUosmUk6reeM0iXqdPA2jlZHqrce39m6Ud70DIUzQzOS8bGv9uKRYz27MZmkqdKOyAujcK9mf_QhVS_mBWKHroCH3J6lIoFkYTsi6GY5bdqtbfuCYkFjkGdpUY-tXVuIFajIFbf69UVgxPy-82OuclXrvKcBHxFPKaRpTrtkOfa_gsnEYMEmRbyfIQDJ5VKxfv0ztLMpxQonsCP1bEU-_gh0kKgMEnhNSB5Il98nCafXWbxY0V_FP_HfFVx4PaWYKhHXu8Q4UrICpIzw"}, [
  'Connection',
  'close',
  'Date',
  'Fri, 28 May 2021 21:23:49 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '837',
  'x-ms-request-id',
  '00-58d21261b8538b3fd53e1aebc0b0689a-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjIyNDA2MzAsImlhdCI6MTYyMjIzNzAzMCwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyMjM3MDMwLCJ4LW1zLXBvbGljeSI6ImV5SmhiR2NpT2lKdWIyNWxJbjAuZXlKQmRIUmxjM1JoZEdsdmJsQnZiR2xqZVNJNkltUnRWbmxqTW14Mlltb3dlRXhxUVRkSlIwWXhaRWRvZG1OdGJEWlpXRkp3WWpJMWVXUlhlR3hqTTNNNVVHbENkMXBZU25SaFdGRnZTMVIwT1U5NVFuQmpNMDR4V1ZjMWFscFlTakZpUjFaNlpUTXdOeUo5LiJ9.PyacI53sAQwZz8v-OY7UsgMLqNj23-7Uj4bB1NPWjAIBwRrg9z-1x2eDsDtRJoafmJ8M2D4yi2I6BJKuk-edYUoRkEX7XZ-5OYA4HZ_nj_injtUCoAxmh2-0JuzghY9ZN2T2qlBLBBZLaGC1CNXSO75SSAMW953Zn2rtyhUnizevEaD3IEZQ3_nfV1rEGA9xlODF9x8imEVMtmYYgRyZ7aIuHhR3S5AH5yRyj67oRrpGsISw2SWglZMfKEsQFv-p36Cvjf58RrgLO1Zy_e89BlJmnrfX0UHwXvEOY2-rB9z5fMf-sjxH97LGxlIfLZsaSJhopx7kOBpESpJ2qZ9Ivg"}, [
  'Connection',
  'close',
  'Date',
  'Fri, 28 May 2021 21:23:50 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '943',
  'x-ms-request-id',
  '00-24c431a8b2cb65cd00d285429fa41c97-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
