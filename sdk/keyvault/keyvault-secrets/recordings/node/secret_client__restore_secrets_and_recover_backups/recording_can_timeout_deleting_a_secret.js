let nock = require('nock');

module.exports.hash = "35b30e34918b2521b394768199bbd301";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3f7fa339-851a-4a21-b4b9-e4ed6e7c8830',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '168a0b4d-8a83-46e3-9fb1-3b5b88b40401',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aqv4IghlOCFFjTHdV6DF9XIA4qsDEgAAAPQWvtcOAAAA; expires=Thu, 18-Mar-2021 19:43:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/66ba992198474ece8d4660564f951ea8","attributes":{"enabled":true,"created":1613504598,"updated":1613504598,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5622d51d-f5c6-48cd-a97b-19890850fcdc',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT',
  'Content-Length',
  '306'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuV25LV0JzOWJQcTdJSkppdjdCcFNhYXlIOE00V05CMHRzMXRjbnUwLVVLNE43VkNnTkF2Z2pzOXZmRi1JaXlNSmFJdElXbFg4Wnljdk5abUNYWWo1V0lOZWJQVXRUN2FZQUVrTzJ1N1lNWmpoLTMtdDdobk83M1Rta2MxYkdFbW5oLUQzZDlXVGZfRmVXLTdtcm1XZjlfNEZReDM0Sk1Xb2VvZVpvWWNuT1hFU2xxMWw4dnRsWTFVUmk2eGp2RHo3eHlIMTZaQzkyY0gzMVQ2QlFHR0lTcV91OFlhSTNrU3pvUjNETmg0Z0E4Ri13QUZOaWxjeTcySi1wR1R1NEdmLVBtMUZ2LUEwaEVYNHVxU1paZlFoSzBmVWFGLV9JX2l0cEkwWDctcWE2UnVIby13MU5ZZmlZQ01FUi1kMUJpSFpRdjItakQtb3NNb1VSMndHXzlldnRnLnNwT2o2NWNMdXd4b2dJd0lfMzRqN1EuUDhhLTE4eEVQZlhSdmxGSDlqNVVpQ1BLR1A0Z3FyNk4xY0t5eUpSU1prUGhzVmNiVWp6QXhCX0xMZlI3NmhRdHlaZ0JEbm1tcUNOSjVNNElsc2tfeU5WM3dEMXpwdFlIRmlBb3hXdFNTNkFrYWtFRWZEc1dpdzdSZUVPcmNzTUxLei13WFFBN0Q4d3NCNU5TUlpQelh1cmphaWdnU2tWdDV1cHlMTTRXOUxkaGNKU0gwaE1LMFlOYlpSZTkyWktuVFVkeFJzU3c2RzFuemtFTVlWeEZvQzMyV29aSm5SdUkxa0V4NXUyYlhSeUdQQmlvUUFxcm5nWVFQWE5sbUQ5SUViTWpPMEtYZEpnMzZGNHpzVEIxVjZPNGxUeFpjVEVLT0hSWUtoZHpvLTUzMVJFbkU1WWlzOHk1TzFnUXBsRnNWNVN4VXBCUnlLbXhNWEhja25JU01FWVBvUVJUZ1hvckRFVjdyOHE2VWNweTNDcTNTcFdscVNIdnVLcld5Ni03UzJHLThNU095U1BZSHgwZjFiZ0c4cVl6dy1tQ1JDWUptaXc2YzRrZkYwUXB3dFFCOXFkQ1NHMWRTM0hHQi1pMHExNXVKWHYxbVdnRG1BQ2VTUkNvYlZkQ3Rtek9QVG96dnJWSWxqUFk0S2NpV3dYWUNVT09GMmwxQVluZ0NaYzlod1Zfa3QxaDdpZDdtSWN2LVhxcXE4UnJQY3Z5em10NGdRcGZVUVpxMXdYaFRRVVFDLVUwZUJVY1dPUmZ3WWQ3c1hYMTlFcThhaHVxQWlxMmdKaGowNnNsVi1zMjZwN05oZThaYmkxNkphcURaMV9ZUk94aDlXcmFWNTZXVDRjeUpja0c1cGh0ekpqQ2ozMUtITTFBb0tod3JXVHRmSFRuZXVjWTdPUDdoR25nNVlvR1hCMFo4TEdISTlRWUY4YzVRT1J4Ymo5U2RxbzJQeTJfM2Z6SlVuVGYtbWk1T1NuT0NjOUpxOWE3R0NxZTlnWXBCMl9TUGJaTU9YWGxIeEV5anNVYkZ2TENGZVcxYnhsbmhPdG9zc2p4MUZETlZQZW1hYjFIWW0tRTEyTTRaSjdXbVlBeWwyellnU3h4QkJ5VGxqOUxrd0l6ZlVBMGJocHJSaWpWSC1kZjNJemtXeXpRU3BPaElHVUNjSnJVbm1RTjRYTW1rOEh4a0RJaWFNU0pVVjZPcWJkUFk3NVQyeHdkZWNqVXBNTThnNGZlUU5QMnNzLTdlZGZJRXNacGNTNHV2Q2ltUkc5ZmxUUGhULWFxcnlYRFZXWWRSUzB5SEtlSndqOVhzYU5SVE53OHB2VUNweThKWHVmRU1KVTFLaGpkYW16T2J2V3FWcW5DTWotdHpfS2k2Y1dxRks5RVZmQTgxcDNfQ0Y1NGpsWXZ6MWMtRGo5SEZNTWtsY1pXRUh5NW1BVVVxdGd1ajVCRFFyaVlfMGpJZWpKZFJEZV9mNm8zWjVkM2ZmSU90MXBqaGEzUVRZb2VIV005cy1CYXJMOGZMNk5rbk9FXzlzMHZTWk1QbGZLT2pxRUFTbWhCSGpSWGk3eDJFVDVWWXg0dFVZa1ZCcFg0ODhKQXREUHZKZWFnZkFyQnpla1BsZzhmTDVJTWo1dTBCMlVMeEFYX2QwOEdPQ2RFQmE3eUc5blBOWVZkbW9sMWpqYUd6SVY5NmZacXZIYWJTMWYzeGZMeFBxYlVmblNSTEZlaFhkeEt5SUdib3E2QU9NV09CVWlsRzlmanBRVDdlSHphYkh0Z1F4ZzZQV3VfQ3RHTDhOSUpIVXVEVmJPMm0yUGE3M044TlBaZS11VTNaYkkwZHlDakNyeUdTWEhEdmJ0VTBrb19RWHhnQW1RQ0dHZzRDTkZ1Zl94MENnc2RUOEd0eUlaXy1Sc2REVXlTckgyX1dXVHMxMFBHVWxjUERBQ2xYN0FjaDNwcEVvRHNfYktjSWttOFlFSzd2d2VJRjMxTWE5Q2ZRQTBZZW5OeDdqZzVIekViazB5eVRXcnhNWklXNVRTeXRxbjBYdWVBSnNJZllNWGg3QUJ0TGRqSGowYTE5dE1LSWxlWXdjb2lIYmtISUx6aDVNWFBJc2VldVNrYnlnZ2xOU3hOSVpOWHFBUTJBUkZZRGdVQTBlR1lTajVRbUVWQWxYcVRMcDhyRGZ3bEVwY0NSZXhaRWFfOEFvNzkyVGxvakhKQ3FCcjF6d3hsQktZT3A5TTEyQ1pKQ3RzUVc0T0RSNHNLakxJVXBWMnNwTU1MbjlfeVFhcU5Md3BaT2p5M1dIdmJGMzhWbEtuN2dLVGw0TkNDUzZENHNZLWoxcHV6cURwX09yQ1B3aDlfT29rQmZLSm1Wb0FiZFhla1ZqM21pazFPZjlXQXdJZnFoTVJFWnlFdlNOSURkR3RyUXpwaWo0LTI4N1lSNHZ1N3FLMF9WX2w0RnYwVzdZczhGV0ZvTHZ0WndFekFGLWFYVzlnR2Q5eUhkVkdFSWl2QnU5WmQ3STl1SU1wU0w5TnBFWEVjelJPU3hvSldZb1otQ3JndzlFTWxTNDdOa2J3ck96YWxjUHVpMTJ3WVQ0T2hFQUU1S1UwLU1iYVJjSkg3X3dUYWIyYXAwQTlwRENySzY0ckFjRjlzdlJkZTlTclh1alJCeGNjSXQ4SlNkNjFNd3BvVkxxcGlBX0R0VTgxRVJ4MzhmNllkSVZ4U01QLWl2TUk4NktQQkl1Ul9BeGd6LXlyd3lQWURENmNJR2xPaktBY0NrbGJudzVWWlhaVmR2ek54NWVnckhEUUpkUlI0SXhjUndSMlNRWEJtaGlmRk5KMUxXa0VOOHlndEh0RnpXeVI5bW9Oa1F2QVFwNjE2TXdCLVA0VndyWDVJcUxZY0hUOWZYX1FPa1hkYmNZWUlSZV8yYS1SbVd2eXE3U0ZYb2xJV0xRMEZiREVXR2pweVFVVHFrcU03OVNmV3plMmEtNHVYdWNBa0d1SlQ0OXBaRWR0VE13enVCVHMxVnhfUGU1eGlzTTk4RGhjTVBiQ25rQXJNZzNrVnRDSng5MXY0TkJ3OEh4V2VjQXQ5RmdIbjF6U2g5VVlodFVlNHV6cEp6ZlVKS2RlNFRJcG5wZE5nM2FRYjJ5YXNXYVc3c3F0Y2hlMHE5MlRuYlNINFVqYWFEN2QtTllncDZPaFFYMVZETHVxUXNIcS15TWdDU2F3RUVfaUN2bXRxaENpWWpDU0JKWl9iRDZmeEdqYkFTVjRrU2EwNHRCRTh1Rzc1b0hXTFlrRmVxeERBVzFBVHdONHNkeV9pTWJiYUZRUC1Bakd4Y3hQbDZCLWZLdUdoTFR0dHZJZTZpeS0zRmlrMjZLVm1iQ0xUTWhyUkhuaUxURGVIUEhBSGppS0VWSTRJTU80cWdHeDZITm9uNmRGa2JtWWQxb25WcFlkZkloQlltckhuWjlLRGJNRzBTd0IwRkROcnRpQm5WTEZVbjFfbnIzcU9qV0RsdFBGd3lMY21iTEZsbmhhSERidVN3WXlsN1J6Zl83ekYtNlNHRjVLLU9PejJ0SnU1dlVjV1czVEVjbzIyQl9vbHBDOVliTHFVNDdMamVPaU5BQkpSbk81LVEtUGVCMmRBMEFqQVI3NndNVnd6UmhyUlM2RzNqanhzc1F3S1lsbS0xTTFJd1RVTGxCWEtvRkVRa25YSVFwQkNQYXJCeHREaWdlWkotbWgxZFdKc0N0cXZnc3RSVzctNDNDRF9ObmxpeGZmNEQyTXZIdmlWRFNCUXg5RVdPcTFSeklTV0Zyc09fcktUYTFuN1JScHl3TU9YdDEyaTF6RU1IeHNxNWFIeERJSDcwcTdRVzhQeVd5WmRtY3htYUtGcWdfNFFPWUV0M1dyT1FPQ1dKdDZud3hzUnVxeDB3cGV6c3hFRmxseXUtZmFuZlQ3eGZmUE9GUHVEOWQ4SGRfbXNuY29ObmZsN01aaGdrcjVoYnoxR2VPSTR6MXRWU2JBQWRQT3F0QUUtTEw3ZDRGYl8yeHp5ZnNDMmIwbnBpekViTkc5STZ5TGp1N25idkc4UGRYSDNZTWlTckdYMmplU2JkcWxoS2Z3WDVQbkZOQWV2Mk9PRl9qMXdqRGZqcTBCT2MwZ0RzTE9kam80SjljQ0R3VWRrOUhBaHVyb1JoNXNINDJTZzFMOE1YUlIxenZJLVhmNjRCX2hwVkxEV3dHaGRZYWJ1S2E4WnBnTFkzRE9JUktMUWV0QXBpbU5TS2FSenN5TTNtdmpuZ1E2QTRGX1kySlAxcE5nYWZqZzg5S2txamMzU2l0M21vOEpqMkI3UVhoVE1lM3E5elBERWxsbkFueV90UDluSnQ4VlJyT3h4Z0FIak1CcWFhRzBNLjVPQklKRDNnTTdQME5ZS2JLV2dwOUxSNGhxX1hIcllrdnExYjUyckpSRDg"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '219c5de3-6fbb-49b8-8191-a636fb4719fc',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT',
  'Content-Length',
  '5127'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1613504598,"scheduledPurgeDate":1614109398,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/66ba992198474ece8d4660564f951ea8","attributes":{"enabled":true,"created":1613504598,"updated":1613504598,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f44a923c-6300-4b24-8b78-250b3a719695',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT',
  'Content-Length',
  '480'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b5b8e5d7-cbda-44d7-ad07-ca9ac461f72c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '82b9dc0d-b84a-4c1b-b4a2-a587fb485b8a',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2867b237-462b-431d-b4f0-9191d5a9619d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6e7f337d-5293-43bd-a8ce-5128619f6272',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9be2729c-bade-47b4-9e96-fc90c377f39a',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1613504598,"scheduledPurgeDate":1614109398,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/66ba992198474ece8d4660564f951ea8","attributes":{"enabled":true,"created":1613504598,"updated":1613504598,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd9b64952-dfd3-4443-9372-ff2da5290517',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:26 GMT',
  'Content-Length',
  '480'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7410e65f-239d-42d2-8bfc-8a219018e08f',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:43:26 GMT'
]);
