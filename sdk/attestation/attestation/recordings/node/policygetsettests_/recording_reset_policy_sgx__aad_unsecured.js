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
  '019718ad-b59b-4ce9-903c-653c2cc20200',
  'x-ms-ests-server',
  '2.1.11722.26 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AuqZyK2c9JtCnsPw4XzlDoW81LWYCAAAAEtWQ9gOAAAA; expires=Sun, 27-Jun-2021 21:23:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 28 May 2021 21:23:50 GMT'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .put('/policies/SgxEnclave', "eyJhbGciOiJub25lIn0.eyJBdHRlc3RhdGlvblBvbGljeSI6ImRtVnljMmx2YmoweExqQTdJR0YxZEdodmNtbDZZWFJwYjI1eWRXeGxjM3M5UGlCd1pYSnRhWFFvS1R0OU95QnBjM04xWVc1alpYSjFiR1Z6ZTMwNyJ9.")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjIyNDA2MzEsImlhdCI6MTYyMjIzNzAzMSwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyMjM3MDMxLCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJVcGRhdGVkIiwieC1tcy1wb2xpY3ktdG9rZW4taGFzaCI6ImM2c0VKUUl0VjUwT2VQOUlyUF9ienl3QU1PVnZqNXVEUGJrbEFfYndkWVEifQ.W94Q3GBIZTXs-fFNas1bGg7_BlcPogWYiv5NHfLmlPJum2glaq5PhZQxM9RzOE_f7tB-IyEceedL6LhKo9-OPzXicGarIFwEXx-GDMsoL5y1lV-ArJM6LT6FVmuxG6E9nlDZgE-MWjyWirztLMbtXtqYhfpb9yfRlRjy6N25doeJ5wPEIjI6pGZzG_rZ15ptxYYdRniP85y_T_Jc8kmLi32Gr96wO08OMVNkB8ij74lO_Rzn__1_w0LgsMwOa9wZrijPDXt_9upYEsw3J0OIaXwZ00kdow9-1Yk-jS0KsGst-0sab0z9aFtjnHsalN2rtAVnSf3jtccNCuMHXJs79g"}, [
  'Connection',
  'close',
  'Date',
  'Fri, 28 May 2021 21:23:51 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '837',
  'x-ms-request-id',
  '00-f47bdbd4bc2c600b12f3e34c73cb6d68-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .post('/policies/SgxEnclave:reset', "eyJhbGciOiJub25lIn0..")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjIyNDA2MzIsImlhdCI6MTYyMjIzNzAzMiwiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyMjM3MDMyLCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJSZW1vdmVkIn0.jS3Sv7HmTf-c7ztzqrqEqbancZHsMblTMhGoEwLThZJRHIJdDTPKbZUamUzT0aqjghS2ic9_AWEXPHo0h_QgPBCJEy2Rloslptar6qkYkcqKZePU26PFLvnx1Bk26--pWrm3ZOP5l7hohUF2tOhslCUC0YKaQhAVsskoLDBWulJFz5GNTu2jF9Ltv19S9BcF0Ldvy_DPXUmGPwQQ1ugHSwyS99xe3N1Ld6h1vL65A-5egNuqZ2eI4gokltHEsLu18Vcxfifqf1U4yWUjGPyfB973r9KduXGhc3iVqNUoLqS9bz6mK6DXTQYzh8aiLuwj8qW8cQmcz37f_3M2ck2u5Q"}, [
  'Connection',
  'close',
  'Date',
  'Fri, 28 May 2021 21:23:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '742',
  'x-ms-request-id',
  '00-c20a5b3a08a96a8596864f20a6026de5-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/policies/SgxEnclave')
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjIyNDA2MzMsImlhdCI6MTYyMjIzNzAzMywiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjIyMjM3MDMzLCJ4LW1zLXBvbGljeSI6ImV5SmhiR2NpT2lKdWIyNWxJbjAuZXlKQmRIUmxjM1JoZEdsdmJsQnZiR2xqZVNJNkltUnRWbmxqTW14Mlltb3daMDFUTkhkUE1rWXhaRWRvZG1OdGJEWlpXRkp3WWpJMWVXUlhlR3hqTTNNNVVHbENkMXBZU25SaFdGRnZTMVIwT1U4eWJIcGpNMVpvWW0xT2JHTnVWbk5hV0U0M1dYcHdZbVJJYkhkYVZEQTVTVzVuZEdKWVRYUmpNbVEwVEZkc2VreFhVbXhaYmxadVdqSkdhV0pIVldsWVUwRTVVR2xDY0dNelRqRmFVMmd3WlZoQ2JGQlRTbkJqZVRGcldsZEtNVm95WkdoWmJYaHNTV2wzWjJSdFJuTmtWMVU1V1hrMU1sbFhlREZhVTJzM1dYcHdZbVJJYkhkYVZEQTVTVzVuZEdKWVRYUmpNbVEwVEZjeGVXTXliRzVpYlZaNVNXd3daMUJVTkdkaFdFNTZaRmRWYjJSSWJIZGFWREJwWXpKa05FeFhNWGxqTW14dVltMVdlVWxwZDJka2JVWnpaRmRWT1ZsNU5USlpWM2d4V2xOck4xbDZjR0prU0d4M1dsUXdPVWx1WjNSaVdFMTBZekprTkV4WE1YbGFWelZxWWtkR01scFRTbVJKUkRBdFNVZHNlbU16Vm14TFNGSTFZMGRWT1VsdVRtNWxRekYwWTIxV2RWa3llR2hrYlZWcFRFTkNNbGxYZURGYVZERnFURzVhYUdKSVZteExWSFJxVDJ4ME1HVllRbXhRVkRCcFpVTXhkR041TVhwYU0yZDBZMGhLZGxwSVZtcGtRekZ3V2tOS1pFbEVNQzFKUjJ4Nll6TldiRXRJVWpWalIxVTVTVzVDZVdJeVVqRlpNMUYwWVZkUmFVeERRakpaVjNneFdsUXhha3h1V21oaVNGWnNTMVIwYWs5c2REQmxXRUpzVUZRd2FXVkRNWFJqZVRGNldqTm5kR016V25WSmJEQm5VRlEwWjJGWVRucGtWMVZ2WkVoc2QxcFVNR2xqTTFwMVNXbDNaMlJ0Um5Oa1YxVTVXWGsxTWxsWGVERmFVMnMzV1hwd1ltUkliSGRhVkRBNVNXNW5kR0pZVFhSWldGSXdXbGhPTUZsWVVuQmlNalIwWkVoc2QxcFRTbVJKUkRBdFNVZHNlbU16Vm14TFNGSTFZMGRWT1VsdVVteGFVMGx6U1VoYWFHSklWbXhRVjAxMVpHMUdjMlJYVlhCUE16QTNJbjAuIn0.nG2X_mHLSJOWlCQHPZU4w3CDA2vO9t5PFH6IktB-pLfX7s31CWDO7m5NknE6_rqZwUvmDK-ocDd8AZrQg4Ee7RIGw-ajIy8feDMLkSAecVrVLkeoN0w_XOxwolwatZDDX1xgEME-sP2g2UT87Kh1dd1SUiSGbn6K5QJBxuHMa6VZyFdyLHHmB6eesGgF59flD1PRZoiTqR3DvZP780yjE4LEH0R86o7Oi38UEXMs65XJ4KQz2vcGzt7KDd-TiPWR883-a3Fid5KqtI_OfKYZDjJtoQe_K7Xcj3PCxA2Rpx5cTZseVtwRraNk3x3Dzkor-xS5gyrdTWf1qaD46SPAFw"}, [
  'Connection',
  'close',
  'Date',
  'Fri, 28 May 2021 21:23:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1982',
  'x-ms-request-id',
  '00-374c4c6761e382950444d47522b6a58c-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
