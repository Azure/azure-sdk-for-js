let nock = require('nock');

module.exports.hash = "396f33ccde650bfc160f4758a8adedc2";

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
  'bf960de9-69b2-490c-9a2f-79fc9e2a9800',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtWIzdkWarBDnfmCPyLEsoa81LWYCwAAAGm7SNgOAAAA; expires=Thu, 01-Jul-2021 23:36:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Jun 2021 23:36:27 GMT',
  'Content-Length',
  '1317'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .put('/policies/SgxEnclave', "eyJhbGciOiJub25lIn0.eyJBdHRlc3RhdGlvblBvbGljeSI6ImRtVnljMmx2YmoweExqQTdJR0YxZEdodmNtbDZZWFJwYjI1eWRXeGxjM3M5UGlCd1pYSnRhWFFvS1R0OU95QnBjM04xWVc1alpYSjFiR1Z6ZTMwNyJ9.")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjI1OTQxODgsImlhdCI6MTYyMjU5MDU4OCwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyNTkwNTg4LCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJVcGRhdGVkIiwieC1tcy1wb2xpY3ktdG9rZW4taGFzaCI6ImM2c0VKUUl0VjUwT2VQOUlyUF9ienl3QU1PVnZqNXVEUGJrbEFfYndkWVEifQ.G8UlMnl6DRGp9tosdfgvtzLBZ7O3H59WnuW0quFvXacDCNm57d9PFLSdz8bP4JaEOxuirfyToG2HXN0nqX_U9DsLU07fT2OnhO0jCe6b2HvzKtYhJx7jm8bImCs5EwpOk9rG3iNZY4BYCsI4I7SGkmLvGK2ywgSR2zhWrZrPM0AJACiKUBj0X7Kkz8quw1GZaCPpa8EWsmMBINEr_WqxQ652cro0QriuGQMOGICil7eNO7lyL2iLg6NAtCEfDLbbGAppt5-8ywy46piWyFI36py-3pzBjvd4saQ0r1smO6par1uIXNxt4Rvutam4evB6PkI-afWW5_l7j5LuFrLJ2w"}, [
  'Connection',
  'close',
  'Date',
  'Tue, 01 Jun 2021 23:36:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '837',
  'x-ms-request-id',
  '00-31e5dcf3ad45b48afc79b5d2796f99ca-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .post('/policies/SgxEnclave:reset', "eyJhbGciOiJub25lIn0..")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjI1OTQxODksImlhdCI6MTYyMjU5MDU4OSwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyNTkwNTg5LCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJSZW1vdmVkIn0.DwVMaYKZTYasGSH7WDtoUlsKkEFox2xWDM_KSWVPEz6E6W3tsS-PzyP4C7OxKPyocXUicxavYGIokQa1C_kS0TYGaziYR55hPnXx_z5aXoR2LJg7cWZaNyiTXmaC8Skf_LL5JY0rvXfh7gBKFHrEGofFOgfpXGFErMW4oXVPSzruWgLxAd6N1xgUT6mtNjTzGCl157W5WmdMch4SMNRyt_Y-Q_zkBfV-H1ZgLKDURDTNHMUOdCkYGlsvEA8ZEaVNEkcseA-abzfFHNEKa4kQqh2BTyGtU8HGkCruwxu4yxyt7dC7_far-pUaewXw9djv986GqAhBlzBLCqimgnAaWA"}, [
  'Connection',
  'close',
  'Date',
  'Tue, 01 Jun 2021 23:36:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '742',
  'x-ms-request-id',
  '00-d2355a38be8d7cc7f8660cbe1f8c73af-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjI1OTQxOTAsImlhdCI6MTYyMjU5MDU5MCwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyNTkwNTkwLCJ4LW1zLXBvbGljeSI6ImV5SmhiR2NpT2lKdWIyNWxJbjAuZXlKQmRIUmxjM1JoZEdsdmJsQnZiR2xqZVNJNkltUnRWbmxqTW14Mlltb3daMDFUTkhkUE1rWXhaRWRvZG1OdGJEWlpXRkp3WWpJMWVXUlhlR3hqTTNNNVVHbENkMXBZU25SaFdGRnZTMVIwT1U4eWJIcGpNMVpvWW0xT2JHTnVWbk5hV0U0M1dYcHdZbVJJYkhkYVZEQTVTVzVuZEdKWVRYUmpNbVEwVEZkc2VreFhVbXhaYmxadVdqSkdhV0pIVldsWVUwRTVVR2xDY0dNelRqRmFVMmd3WlZoQ2JGQlRTbkJqZVRGcldsZEtNVm95WkdoWmJYaHNTV2wzWjJSdFJuTmtWMVU1V1hrMU1sbFhlREZhVTJzM1dYcHdZbVJJYkhkYVZEQTVTVzVuZEdKWVRYUmpNbVEwVEZjeGVXTXliRzVpYlZaNVNXd3daMUJVTkdkaFdFNTZaRmRWYjJSSWJIZGFWREJwWXpKa05FeFhNWGxqTW14dVltMVdlVWxwZDJka2JVWnpaRmRWT1ZsNU5USlpWM2d4V2xOck4xbDZjR0prU0d4M1dsUXdPVWx1WjNSaVdFMTBZekprTkV4WE1YbGFWelZxWWtkR01scFRTbVJKUkRBdFNVZHNlbU16Vm14TFNGSTFZMGRWT1VsdVRtNWxRekYwWTIxV2RWa3llR2hrYlZWcFRFTkNNbGxYZURGYVZERnFURzVhYUdKSVZteExWSFJxVDJ4ME1HVllRbXhRVkRCcFpVTXhkR041TVhwYU0yZDBZMGhLZGxwSVZtcGtRekZ3V2tOS1pFbEVNQzFKUjJ4Nll6TldiRXRJVWpWalIxVTVTVzVDZVdJeVVqRlpNMUYwWVZkUmFVeERRakpaVjNneFdsUXhha3h1V21oaVNGWnNTMVIwYWs5c2REQmxXRUpzVUZRd2FXVkRNWFJqZVRGNldqTm5kR016V25WSmJEQm5VRlEwWjJGWVRucGtWMVZ2WkVoc2QxcFVNR2xqTTFwMVNXbDNaMlJ0Um5Oa1YxVTVXWGsxTWxsWGVERmFVMnMzV1hwd1ltUkliSGRhVkRBNVNXNW5kR0pZVFhSWldGSXdXbGhPTUZsWVVuQmlNalIwWkVoc2QxcFRTbVJKUkRBdFNVZHNlbU16Vm14TFNGSTFZMGRWT1VsdVVteGFVMGx6U1VoYWFHSklWbXhRVjAxMVpHMUdjMlJYVlhCUE16QTNJbjAuIn0.tsN1MhnUPvprLO_8coaI_LKHGtGlZjkIImtEPpYkp0tZA5lIdeU0Yve3zIkRpjmcfzRJ2KAnCGzaqGtFT7O7Y75cOrGk12V0g95E-rfWZl0Mg_cgt6VhHBwWqhvOKFCJtXkHODkR1LzL5VTZYc_NJwfHhdjhhOGFGll87Ge4h5CaOQ51im0lSnm9Nvh-Wul3KBXMYnT5KCdHlJxovJicOm4ct8atA7fsWw9T50RDXwjdds3L7XnyOlVR9pC1Y6XxVBxlppqAT7xoNNIigfkWu45ZfvNZvtih6VwMahuPNSvKS1vbgL1RuqgWxMsaA7gCyaudCPWNTNslS4xkgZ5EfQ"}, [
  'Connection',
  'close',
  'Date',
  'Tue, 01 Jun 2021 23:36:30 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1982',
  'x-ms-request-id',
  '00-dac76a775aef15f24b61ee624245cd24-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
