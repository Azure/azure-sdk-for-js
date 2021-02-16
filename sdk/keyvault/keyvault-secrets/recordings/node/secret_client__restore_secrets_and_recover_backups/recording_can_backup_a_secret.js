let nock = require('nock');

module.exports.hash = "d9b266a98c31754155e3c9e8b5f8ef15";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-')
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
  '5b1b212d-fa28-4d66-a018-4d0a7a1afa21',
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
  'Tue, 16 Feb 2021 19:42:40 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
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
  '28469e1f-59a3-404d-b537-a3f08914e900',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aqv4IghlOCFFjTHdV6DF9XIA4qsDDwAAAPQWvtcOAAAA; expires=Thu, 18-Mar-2021 19:42:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:42:40 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/d11170a8a8a548f9a267c02c38e18a4d","attributes":{"enabled":true,"created":1613504561,"updated":1613504561,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '7e1eb463-babd-4798-8b55-ed51fb34f28b',
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
  'Tue, 16 Feb 2021 19:42:40 GMT',
  'Content-Length',
  '297'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canbackupasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuZFZpY3FYaVJUYnF6dVFacXBxdE9aT3FWMjR2T3o2anNQOHB4U1RUbzlvLUgwSkVlOVVaSnZrOUJ1c1JubWxLT3RSZ21aY3FFbW5GT1ExbnM3VmVRaEhiVzh0WnR4cEljWV9ib0QxUGp6QThWQTd4dkZ6UFZPLVhhMmdPZVItckhUbElLaDBhU3hkNUYzSWY4YktMdTRMLVJ3bkFDLS13NUY2VFlrdm5OemNyekpEMVNEczJRWmppSjE0YXRub3VLajFNcC1pMGVqSDVZbEoxckRLcDBwcTI5RU9obU5KdFFQM3Q1T2dWZmNRTHZpcTA0RGMzblIxbFE1X0JxVURrYXRMbVpKcVkxV29sVDFJTm5xQTNralZPYXlPWFNMdUZHU095djhEd0FMOEIyZy1XcFVYOTF5TTBsQktSVGlmNzNrNDBMbVpIWmVsaE83M2lQc1VQNFp3Lm9OaWplWWs3QzhsZmNHQXdoeXFDSkEuWk9rZ3hXYWdlcGU1d0NVaGRUZHpDZFJlbVk0eG1tb3ZaYVNrbzVsSGRkaVVNeGl2UUIyc2VJRFYzZVYtOVBrSWtVLTU3V2lRM3BWTjd2SFVickRUMDZVSUp1aXlSd0FjUkZxOVJzX1VKZXRRRG9FRVFPYnR3QjRGLW1QWWZENEpyMHJ4SkJjTm5acFVYVWNjdjlBa0Jwb1lCWFU2enJhY2FpWDloZERaOFBzdDM1SVM4M05oakhpVnZ2TEFMRk9TbEJXUXhLM3RXaVhLSHZBaHM1VEk1cVdIWkthWVgzQ19nTU5nN2lTRUM3Xy1KVmJrWEE4eWdXMXRuWkp1MV9YZDhOVC1rYU5zOXllRE02QjF3c2h5a3o4UWdzYk9Ib1YtSm04RUptTENtcDAya2Zza2xxSktjMnI3emJ0SWlmN3JPVG0taEs1eFMtT1VWQTRneDhnQmptNXJPT1R2OVpTeDhWbzRNcnlHbUQya2tJQ21sbUVEYlNYMW5QQWdoZDBYc0JJejlnVVJCcjZPazBjS0VVRzRDMWR5cVdmUXAxQWlzQjVlbU9wOUtVZVlPZWxpU1MyWFZCeWxSWVU1b1RTT1JueGxuSjhXOWpCLURhZU9LbUNTNGJwQ3ROSXplZTdRQmt6aGg0dG43aUl2aDJOc3NhUUhhXzhlNHVMcTRIekVEM1pYcHRCOUJpWkpsRTNkdDh1TFl6cTluSnNPWXFzUGtycUt2WUNLRmVuLXN1RzZ6bFlrRDZDb2pVbkwyLUQwalIxLXJEUjFGRkRsaEZGa24tWkZSSGNPS0pIazdpdk8xVFprd05mcjJPczRDd2M4cEViNDhQcmpuTXVTb3RwZURDdm9BZnoyMVBCY0ZIdXg5MnZQdDZNNlNyZ2hyLTJlT2E1a0tNOU5XNVUyNWN0YXI0R3Vnc1Y4ZFVQa2xPMUJxd2JPTFBCTUVsa2pVcU55T19mRnpmdUl6czBaUGRqNzliVG9OSC15WFJ4VW9vVnphWXJEemtlYXowY2dYRUdaelVIZ0hqbndwYUZTWkl4OS1TT1ctNFhoazY4b01fa2s2UzQ2OVRVeFBnLW92OVYwVGlMUnF2TUE2QVZMSk5YUVQ4YzU3cE1PWEpxRG9KQ2RGNTQzU3hyNGd3aTBPMHFQZWdNRnNhQWlpRDRsdi1OcEZvZ1pRSGk4bzdqb3g2NGFVbTlaajRYdHRJZXU0ekMxUTFnQkF0dU9Oc1JIaUJDLUpiX1h5cS0tUVRUcXBYaDJBVDdxYjNncDROaHNpLU9FbHM5M0tDeTFJVE9aTEtqdmxTRFYybEFhdkN1REhBWGdFTHljczJWUC1fQVVYMEZ6NTR4MzZvZTJJX3RsOTI3N3A1Tmd1aktka1MtRHZTc3VBMHM5SEpmZXFkNjNMTHVIYklKaFNfb2NyY3dab0ViWVRWRTFULXB1R2w2SW1MTW5lRkRCWGZ3X2RtTzJfaUxOZ0NMZ1h3YWw4ckNHczNDclRtZ0NzM2V0cm9zcVFnc1lUdUs5NHlwdzNUMHNTd0tNTWVpbTZELXJad3VhR0lHbUgyLWM0RC04LWJncEluNWtmVHRvdFlXWjdYOV9qRmNsNzhVNXNEUnRIUzdRdldZWDdFN3RVRTluVlZBSlNReWxSQ0xLUGVGMFlrN1o4d0puSnUxQTgzQUNwSTQ2SmNMN05VejFsZXhaS3I4bTRFWE1KRWhUWlg1aTZvSzRDdURxR0xOZlk4U2ptZUZodUpYUjVBWWg4NkdZT2NRek9lTGVlcmhVTHpLR1F6Q2JjNHBqd2xiY0lNdFZVVlZDX0ZnMVN3Z0I1ejBONWNJTG45TE1fWnVrRTV4cGdDQ3ppUVp1eWQwaVJjbmFGQS1Xa2lSWGFuQXdnb1dqaUc5MVpfUzY4TFhpakYtMHJDNEd3SkE3TFFZVlg1YXJ0dVpWSjF4bWFVa1NqLTFUbGFYVTE2MHUwcGVpbGV2WWJPQ3dXR1NrQUVFbksteFRNelk1YjFPZHdUbUVsWkVpWjBIYXhuQ3FuRzhlUmhGRG9FV2hsYjRZeUpJSDRDU1dpeXVwUm40TnRkRzh4bFA3eHgySGs4RTNCNWQxR1hidXU5X2QxejFsRWlDQXRtUVFXVmFyT3Zsay1tNG9UcHVNbjdudDkyQjRCQ2J0VWlLbmgwSnBvT2tWbWw3aThFZGVLVDQ3eDFwb01SN3pVLW51NTNxakxuQ3NreDZXdUVOMmttX1ZoR3AzZXZqN3NNdmxvLXhXVXV4aU94Y1BCdnVYMWFRcUVKYmVtZlhQWFRyVWtPLWZDUS1kR2kxdXBfN1hkNmpzQnRva3VQb2phTTR3bS0wN1pWNUlVVHY1S0dwODBBMkxWeUhGbFRQNTZ1dDZEeEh0N05iU01KZkdXbW9QWkdFZVowYXlNYjEzX1dGY2k4LS1JcXNzT2p4bzJlTjRpNi1raTFOMEJsemU2UjR2N2Y1YVVMeUxYQW92LTFWcklEcnpHS3lZdWQzWUxWcENGZmdpWWh2bkQwVG85UHZocG01LWYtNFZBbFZEZE1vekNOZlZtVlJuaEsteS1JcXlyb0x4R0QzT1ZxSi03RGl4YlJvTHFBN20xR1M5aWlrdnQ0Nm92Uk1TRW16YUV4NFBKTWYwZ0pRVW1CM2NXM2Qyamd2YnA2VGxiU3lnZmNkbTlXNmhiWEJINkREdjR2a0Q4andNaWtBaFBGSlFnRTRqQVF4bFhhSGVSVldsZUFKU0Q0bUg0RnBRamE3UE1TRTFiRTJTS09ydUVQQkpfeU16SEQ3YWZ4R1E0OUMyRlQ3aGZSVm8zXzAxYzhlVWg1S1VHWEtDMk13SnViUTNhem9OTTBTb0xqbURsYjdueW5RSGFXaXpqWnBWUzZObzJkd3BhbEcwdVA4TWVoVnUtaUJoMEV4WkduU2VFVTlGZkUwdnlualkzUTZJUGdsVEhtdmVBeTRNcGdiNmM4d25fNXFzN2kwUUN6QU42Y2p4TFJVR0xnVXA4RTM0SzZrT3BOaHpCMG84b2xJVjMtMVhrSDlDNGM5QUg0S1FUejZ5QU1pZ05kMGxhb1FrOXJxdGplNUI0RDctRWVicXh3aU1Gbm9Ud29PX2lhTEozb3Q3azI1MTFTaEdSOFFoZ0lLSnhPVEVkMjJNbEVHSzRxVFR6UFBnalhRWHNFdGJNSkQxMWRWVXBsbVVyclFUYTBWcFI3UDBBdmpTbTZuZ2Ixa29ZOFNwOGlNRUtfdXVUXzRhQy1QdG92NVJlUng0SUpsYjI2TmVGQmtUQWs1SDVpWmpVNmFtekJFWU5feGR5NVY0bFlnME5fVG1TeDJJd09lbC1NanhJbXBHVUs3NjhqRGh4N3NzSWJOYUFKU2IxTEdBMHc5Y0Y2T01weVkteG81TzdzUTRVQ2pvSkJHelA5LW9UYUw5NGZQeF83MV9fcHE5T2dQdnpGa3FkUUFKQTl1N2wxalNUU1VLV3FzM3RyU2o2Sk1zakNFR0tFcUdSemNGYmFFT0dHV0VhdUdiMnBtVVp6eld1eVRTSC1PMHpTYUthS21KODdlV0Q0MGptNDYtQmQ1VjJBTTJwcWhvSzg5VVpMWkFvR1BQT0Q0WXhLYjEtMk5qY0tSSnVUSHo4NUdpbHE5TW4wTl9KeTc0M2MyZkNIX2dYb21fXzE2dlhmX09OYVR4bHNhbDVQcVZzank2S1NTdWpUa0J0OGFpNUZUVHR1cXpUa0w3MUZwalBZWk4xZ2NOSjJMdXFpcmVRMmxvb2s0SUhpTjNnM3ozU1hQNTlzSEZyLU1LYnJTUTlQa0hYamYyNkRydWh5d3ZZcjZsTzhZbkp3NXhSVnRhRXlBUThRTWY4MHl5SkU1UUFsY0tYTDEzb3prOVBGNEpvWGhlSmdYam5DVTBDUWVDVWd1bnpJMXF6bGR2ZHJKczU2QUJQU2lKa2IyRzBqNEVyaVlVVlVmUzlNaFVtMHpRN1FDMzlDRHRXeUt4eTNnMUJ1UGczNGFXSTlVak5Ha1lZeDBQVm5vT1dfd2U0dHlHZTlfY3V6ZXpDdERqMGRXZEVCNEhjTVU0NEZBTWtsdzJtazduMWxrNkVUbGN0TGtJdjNoTGpGbUlBVDRoSkRneHhFS0pDLWE5V0puaWRrbDcybk5UUUQ2LUpZWDJoMnlCZURsWFgwbHNFNm51MXlLclFRVzlNSUo4LURNcWtfSFFJUTRNNDlvdkRiaGsyOU1qTktLbmZxRGRFMG52YjEzVzhuWXRaZGJnSHZGaTlKbVJaaHVJVzg5TkJwQ19EOFVTQnIzLW9PeGhQalQ5SThKSFFxZmdsdS1ESmJnLm5XN1NMZmFxYXl5YzVkVU1CdkNSVlRfYk0tU21WQ0pyZ2xDc0EtNXY4ajg"}, [
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
  '5602bd7d-deb9-4be4-b265-060631c85771',
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
  'Tue, 16 Feb 2021 19:42:40 GMT',
  'Content-Length',
  '5099'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1613504561,"scheduledPurgeDate":1614109361,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/d11170a8a8a548f9a267c02c38e18a4d","attributes":{"enabled":true,"created":1613504561,"updated":1613504561,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'b78287cb-2a76-48dd-94b0-b39283390ac4',
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
  'Tue, 16 Feb 2021 19:42:40 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '41fdc3b0-5b12-4ddb-ac7b-5f773c549f0b',
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
  'Tue, 16 Feb 2021 19:42:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '79ad7512-3758-45ae-88cc-2adfaa954a89',
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
  'Tue, 16 Feb 2021 19:42:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a4921ed4-bb96-4ea9-91e9-4833bc28b2ba',
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
  'Tue, 16 Feb 2021 19:42:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5b1b70d1-66e7-46da-900d-91624906a803',
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
  'Tue, 16 Feb 2021 19:42:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'bbe06a94-ad3b-414b-87e3-35b54c98bf14',
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
  'Tue, 16 Feb 2021 19:42:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1613504561,"scheduledPurgeDate":1614109361,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/d11170a8a8a548f9a267c02c38e18a4d","attributes":{"enabled":true,"created":1613504561,"updated":1613504561,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '711241e7-04f7-45de-9564-97f4a2c21454',
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
  'Tue, 16 Feb 2021 19:42:48 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
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
  '9eaadff8-ac39-437c-a7b7-9ee6c75f8c71',
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
  'Tue, 16 Feb 2021 19:42:48 GMT'
]);
