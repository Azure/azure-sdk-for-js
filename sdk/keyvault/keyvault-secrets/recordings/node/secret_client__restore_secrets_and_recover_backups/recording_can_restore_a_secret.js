let nock = require('nock');

module.exports.hash = "538062ddb6caacf1e6af5d02227b1d4b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-')
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
  'westus',
  'x-ms-request-id',
  'a2e44918-a247-47b7-9b30-b70992047f9e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:01 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '70e20be0-3610-4ec0-85b2-68d95edf0c01',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkjQG230d5JCorx3UGes1Fo_aSJHAQAAAO2JhtYOAAAA; expires=Sat, 25-Jul-2020 12:05:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:05:01 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6ba1dfe7-ac86-4e35-b8b6-d550769f4cbb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:01 GMT',
  'Content-Length',
  '299'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canrestoreasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0347a338-6e6f-4618-8783-6f51c3596cfa',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:01 GMT',
  'Content-Length',
  '7710'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1593086702,"scheduledPurgeDate":1600862702,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cfed8b90-b0fc-4a0f-8ffb-2f3e3cce7820',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:02 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'abeb9e62-2b3f-403a-bd6f-138a84194a1b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '228512d6-a296-4ab0-a1d9-2148a3dbbbc4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bdd74e1f-7e06-46a6-86ab-a92bf5d0d7ae',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f5e610e4-c966-42b9-ab4e-dfad2865340a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9ec205dc-9d52-4bc3-ab60-eb7c58220450',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '857d0653-7331-43fa-b1d4-7cc52025329f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1eef89cf-ac70-411a-a93a-3509ae4e45b8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '93880c2b-5043-4040-8346-7f81741cc0bf',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1593086702,"scheduledPurgeDate":1600862702,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0158919f-8b78-4ad6-83b2-62beacd1d355',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:16 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '36482ca0-3ecd-4dc3-85ae-6ea166fe6289',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2ac7ef41-6c15-4930-a51a-60febc665562',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '25841215-9bcb-4128-800a-0f6c3082e400',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5f622428-d70a-4c70-ac59-53df02415def',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '410fd33e-e7ba-4731-85a2-4aea97496248',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'eed619ce-df6f-403b-b0f5-7cecf6e03dd5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ad37f610-b02a-438d-ae3e-b52e7b179314',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '70608d0d-bdcc-484d-875c-3c3a0e6c6ffd',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f401b87c-c2fa-47c1-b1ba-6577e91c12e3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1e4cd56c-9753-4271-855a-8410812e8103',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4e9ccb85-c6c2-4c87-8732-36125734cc29',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '64fa04c9-c24d-4a5c-bd23-279fdeeb89d4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0229a334-05df-4c86-9ebf-c8f8968fd643',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '22397e77-01e8-4285-8811-e818b01582c9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cb669ba1-a147-463c-afc8-6dfce18d400f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '58e097f0-eb40-4808-861f-7b19b9062225',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dcb91dbd-f9e3-4ed9-8e6d-f9ec0c3fa671',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f492a630-3579-4a11-b254-308dc08fedb7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '152d7d21-fbbc-434f-9235-8e04e9978318',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5 - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b4a12e9d-9fb8-4352-9d15-1de204ca0a23',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA2dUpERTY0VHN6WWE3aDJWWkdhaXRtUks4Ujl5VV9xeHlIX0RlTjhjSHg5Q1pLcjJLenlJRzNLeTBNNmNUNjhGSE5wWXRpU3YyZVZTME13d0p1VHpMMnQyTkJIY0V5bGk3UWo0LUpfV280TmMzVzZYdjlYWkVHVHZCMWJDX1ppVURZVUZBOTV5MXUxSXBld2Y2TWNKU2FGeTYtcng0SnJLalhjME4yeUtUcUZNUklwUm45eEQ4NEtwdXJNQVhTem5lUG1qRGNRUGdEa2ZiTWp3ZUZRcmdBeUhDWUJ3ZWdiOG1MZzdsQ2czYzc5MTJmLTdWalQ0RjFacmlrUDBMaVUtX2JwMDg2Tk5qRFZRUl9Kb0NxRzMxQzBJeGNDTlB3UkpXS2JSYzl3eVZxZXA3Wi1aUDFzWFdfeWNocHE3SlA1c1l0RlZYZVYySjZDcm5RV0dDX2tuUS5VVlEyVUEtZVdkQndKQ1VpaFZ3SlN3LlVOOU16RWNtZVhUY0Y1U2RhSDVudERrT2lMYVF4ZlBQRnBfc1N6elJQRjZERjRPQzJodmJZNnlKODdVUE8tS2V1cENNSHJyQjdJbWFvRmczR1l3VHowY29XSFYzZjkyYktUbUlmZ3ZpSm1XUkVtNEhXa25sYUlLVmxZaVdscnllQTBjWWZqVUxfOVBHbWl5UlJ0bEVWTXF6MFgzQXlTQk1ZR3ZKajk2bzhvXy1RODBUTnZ6ZmlJdW9pTWpSVHFyTXUzZ0RRTXdsR3ZuVmtpUG5TWWZDOVVZRENMLUtsR0NhQjVxNXBpNWlBZEg5Ykd5aWp6Mm5BbV8tbkxvXzdNc05hMngtVXUwekFHdVBMRklXRHdMYTNjZnNjWXZFSGx2NmdYQ19iMktYVUpHeUFidnBfU1QzTWJmSkpUUEdVdHJoM1BqWFMtVFZwTUJud0txWk9uaDN2OC1tWkJCbkRrajQxbWlyNmpmZUlHTXY2Qld1ajRCYXZOeU5ZQUEyRDdJMHM5UGZZWkVad1k5aUZHTXIxMkJFRlB4N1dEUUIyaGQwWkoya21iZWpfejhVSWdUOV9rWTdhU0tpSkpwM3NWMXl2VHV6Mlhxd0dYNlBZTjd0Wnd6UEo3c05BYUdHLTVYY1pCVUhkbzFJV1ZRRVN6MnZLVHNDNHJwWW5QWm1WTHUxSnZ6aVhRN2N2UG1kS3JWby1PdG5GVlVHN2tCWXNxcFVGNHhPQ2tRSkh6d3hQSnJlRlkwOUlDM0Rua1YxQmhET3p2X181emRKZlBzWXJVME1DbDcyaFpPSW9hY3BIRnVua0JmZUJNSTFQYmN4amozUW5iM0ZhTVVSRHRGRmNDOEc3NGx2ZHpFNkV2dFg2cGM5c2hWMGc4QmNHU3NvbjlBYVYza0stUjR6d1FmR1hvOFRrUTdONEE1Wkd3aGwxc2pVUGtkekFEM0tjcHY0SzRnRmdVVG50cXE0MmJPNWZxbFpxbTNicWMxVW51UnNxaDBBUWEtblhmNE54SDZOWUxrWDJtZ2ZJVm9kNmVSeW9EaGIxdmpyU0RJS2hRN0JIQWJQTzZKU3cxQXAtbXFVQklMcE5QZXJ5MUxzN3pUc1UxT1J4YUM0TTZQbFR1ckNJOWhzM2RKWmJWcHpTZldneTZ0T1A4enVtUGpfcmJjSGI1SV8weDJpc0FQdlBYWWJLYlhZREd0UlAtRVVEUklTWkhmT3lKd0tIbldkODZ4Y2ZwUHBLcXBkd2c5YUJvenlTN0tLUVNCZVJCbEVGSE5zOWdIaDN5Q05XWU80b1hFeVlyWlJ3MGNBc3MwRWIya05KUWpJOS1heTFncUM4aHFCc252V0l5T3BZRFFsaC05cnVQazZ3U1VwMk83VUYyazFMS1hqM3dha1NOeVJJRjdXd1psQU9CbVRId1V1MkZxWk1zY09yZWRySVVkMUc3cWMwMEJjX0xzRUpSZE1EeE5ydkhGalVxOXVXNE5seTBUMHV0dlRJT3NmdnlveGYwMHBzY1QyZHd3MHRQZHZ4MWcwa3FuLXNBQjk4eXp3b0k2M19BZG52Z2o1TVphdlltNmhzUWZCbVZ3bGEzRVpybWJKQVdlbDY4cUpHVGk3V0p2RHpCRzRKcUFQbTlBbUxKazRYRmhYbUk2Vmc2NmJhQjE5c3d3dGZWVVJ4c21sZXJtN2xSYkZkZ3p1NnRBVDI5VFNBbXVWZ0xoOXFLVVlJdDhOVldraVJ2SkNiVDZxand2V1VicmE4c3piM2JOeVQwdzhXQ3Y1T2x1cU5Tak1QbnZxN1phb1U0ZmpOblRQMExsdDNLMFBGTWlUcFNPVFJSZFUxV0htMlNpbFozSF84b0hIYXl1X00yNFhVeHZWT0t2eDFTampVWnpyZXp2WVNTRHZNZ0IyLWZiaW9DVHdIdE8wQ1k1bFNwN09CbjBxQWJlbU9LOU5zaWd3QzNkc3VITm9hQlh5NUtCY3dpdHhBN1cxSlktaFlvVjNqWWlkZ1ZqdEtUNTVKblY5MFNRd3lYZlhsaXJGNTRtbzQ5SExveXdFdmtSbHdobDJiX2xRaUxvWWFXY1U2YWxub3hBMzlhVXVlRGd5c3JaYnphZG1zRXFkVUxkcXRXZGhwcnR2bGJMM3dFdXJWSkNHNEZWWVNpSW1DTXZ3SUxlTnpXdXg4cmJIX3ZBalVBbmZZLXVONmpOcVF5RlM2bVBxOE9WTFJOeHNXYkNlRWZJTWtyNFlNOENsOEhTaFJlaG9MODJZV0VZcVVfUWctSEFpelpFanN2cHRicERRLWU1T2Jqbl9lRWxEQXJmTUVJY0ltR0lTU01sV2VLRzc2akRRN1RDYU9ldnRCOUZHTHVxOEkzUEdSdF9LZUtfRDhHUlZpUWs2MTZ3SDdZS3UtMzFqaEFVNlkyZ2hjZTJwd2NjemY3ZnhoSTNPbjhWSVF0NWVoRkh5dVRPaVVnS2wwbmJ2dWRWQkFfazBod2I2QWJsVUtLU3FLaVpBT1hCTjFqcEpUUWw5UURqcnUwVmZRczNTUjFWYm01NWhZNjlONVcxNGlEa3pnejgtX3BlOEFPeFJIQzJ1Smh5eDZiQnRFa3AyQkZFZk9oQXd1ZmdWYnliZ0psWTN5dm1vUXZfaThRV0trZUsxclBHNDFfcThzajZlYWtNaTJHdnV6MnMzVkNqeFRYS2pkbjg5aWdyUkF3MVhtSkdNaFhiM2J4bDdjOGxSMFgyT0MycnMxYXBLUHZYZ0hwS0JDS3JyT1hnZ3lSWjFEOHl5UERZX21tVkE0X3h0MmtlZHJfbDZjNWc5blp1cW5rbDRJR0k4bGhOSjZDNGFlNlZ4TTMybjJPaVM1S2tqeVRZY3BiNWpCNC04NFM2XzNDc09jWHJmMmt6MmE5TnRjQ0UyV1lldGlOSUl1VXRycUhJYmp2RTByMENPdHdNS3BFMk9ySWFRYXA5U0dSYmpsRUxveEJ5S1R5d2xxdDUwT0hjQnVaRVMxckp2SVBvWG9td1JyM2Q4WVJyeTlBcmEyMzFuUFVaZVF4c1hMQWNjbDU4SC14NEZUZkpBWVZyMHNOaW9UdGtfR3BLaW0yOS1COGlBbW1iRHhOSjlKYW45ekZwODJJeWFxZ2dXWVhBeDU5T1E1Y2tjbDZueFhCclh6RGszVnQ3UE9GOVNjWVpRMDBobnlMSzBIZ2tKS1JtYk5UM1UtMU1HeXlGbzIyNE1RWG5XRmt4b21ZVW50YWZkbDhHYTRUaEZoRGd6N2NRbWZrWk9mWVE5bTlqVHVQZ002aG5LUVhROEdtb0JjRVMzTnR6WjIzRGdVTVNsNmFCYlhjWHNEOWhhMGc2QkhWRGdBSlpOVWtQM1JvR0NUOGUzTVEzSHlXSmdvelB2b3AzdjdEUlpxRnhkdVkzMnpBTVNwY2stTzI4MnNxVWxBam1IVXY3VVZpZHpYV1BFenZ2SjRLem1LelN1TWRwbG5Xd3B6LWhJSXIxNW1GQ0tfMGRLRjNYbVZMOC1CVzRjWjFYcktsc1luelNsOFpMWGVXSGhFX3ZReEJuWUdwaGZyTlFwQnRzS0pxVnVqY050bzgwcFVtbmF5ZHpzNmxIeVkxelNhLWxTQkg4azRZMzVFYnRKUTctZ1EyWG9JUjEtb0R3ME55QkFQMmdidmVPTldqSEw0VzJZdmFNXzRCS1VWckpEREdoOTdab0E0bU1vZGlpdVRkYzRfUGhKSFF0bEIwQWJNQzBKMHJ0VExjOTlOaWFmWll6aHRKMGViQWhtMDBxQXJYZ3ZjUjhQQndtT3Nac1RKYmswT1dFTnNHN0VKbTZCZ3NWQWtEY09TSGNLWV9SNFpucUYwUng3dVBYVXFuRy0zS3VLdFdpREVUTkp3U1Nnb3k4NjVWSWI5eUI0bEpYWlE3elZ0d2VOMWVUUEpGUmlVeUxCTXpIbncyTk53a05rMmw3RTRFbmtOVkFiVkVhQ3VMZmh6cmVIbFNxQm9Mbi1pdmw4UER6RFpENEtza21sb05HQVhjcDJ6eEk0X3N0cEZ5RnUtd2ZKRS16QVhIbEZ6eDJWRjB6ZnhrRXJBVXU5b09DVklyT190eWV6SWJlcTdMc05PVjFxZEhTdGZGZ1hreVk5eTVacG1qT0VFX2NRZHB1V0l5TG5SblBnX3Y4UjVRek1NR1JoU0s4RkR3SFR6VDNFS1loMG8xNmo5RGFnYWxKTkp1M3NPaVlodTluVUVGQ3k1cTBJYUNkaFFld19Ob1RYeDB5Y0NBNGp1UTNkUmZBTU40aFFVemRiR2NjRXVTUHdmVXVtTGpyMGx5aDdYcFBQTmcyMlI2V0JUQWhfenozN0FmUDVOaTQzOGFHQ0pNdWxXVElMemhCMGh0VzZsczlEdjZsaGZjdXkzdHF5Q0VRd1lDQkdGOGNNYUxrblJPcGFSbXdRSWFMRUUzTTVTZU92NTdWZnRydDdMN0puLWNvc0V3WXBRZmxkZ0pieXFQTS0ycjhQT0xPV0JMaHU5Z1lOSVI5Q1d4YmxNQjdWZDF3N0FKaEhEdkZwdjRMODk4YlloS1pURWIwalN6ZURENjgwTlBVWmMzQjRhV3hpU0tiWFVSZTdmM3VqZTFXaUd6WkNjVDRvN292S3ZmX3pqNmZ1aTVteUxERmRWZUdXRmt5TTB0RnhTN1B3VFFWVmFoZk1qWkhJTjQ1ZGFSTnlubEtxd09rMHBScmxWa2dPOExTU0k5Y2ZWdEZ2aGgzUU9EUWtiUmp6RHdtOS1XMUtDaWgyNDhQOC1kdVRtbzRERElvS2xNV3JMb2pDcjdqX2oxVE5xZ0lUdHlsQ0NzXzNxbzBjNHVibmlKUWZyN1hIM1FwVkNqajFrNHZLU3JGdDdxZkFWVGh6YjhqQkthbGpkdjRpRUxhdUxEOVRXMWlzYjloazFMdGZNWE1BTHFBYmZXRWtQQTR3dkVLREQ0X1dYV0h5N1ByOU4xTkI0UXk0WWxGZ1M2MUx1ZjIwbzYtR2VPUS1tU2pidEwtR200ejZkQmg0U3AxWFhVclFrQUZqaERRVjhySkI0S0ZSUGZGandIUE95ZmxLNU5sWDFWS2lrS0NLazROd0ppeXVkbFp5TkRmUFNXYmEwRm1QZktUZzlGbzVHREVBb21kQXZTdzl4MklUckNZQ3BPUktJbWwzZjZIVmttX0pZdTFwUVhORW4ySjFBXzNyZnFIMG9BS000S0h6ZTFIU01vNFBpUkRaYm51UGIwQ0o2VFpHbkxBVEI2QjlJRWVxa2ZYWlJyWjZXZDB5LU51dUpzaVFBRFMxdHlQbnJ2dWxwd1dKa0tGeEE5VkhMSExaNkVXbVdmbDZ5aHpKN1R0Y0RHbUQwMWVHcnpoN1FKWFFXaG5ZZDAxX29PaU5XS1A1QjRCRm1kZmpKRjNuOVI4VW4yZ09mZlZuUWtJSkE1aDJ5cUdoRGNvUnZTMlZLRjRzZlJmY00ycWJwUzFTVXVCWGRvcmI0RG45alZUVTNSa3UtVVJpVDlfNEhPMmhYUW5kcmJtR2ZjLUt3ZENHY0JMd3RrYkp4cF93SVN2VTFJU21SR24xZEtBbXBhZGNjTTRWaUNLWEhZQlllbUtzb1paeU1HYU4yOXlfTVlJY2R0NkVIa3NBd3k5eEVmYnJ6MGVLbVllcENMUG9zOW1yQ2xlelRvdjVGTzI0a0FaeG9xcmswYVU5UjRlSnBPUkRtNzJaRTNqTzRMYjR2N0F5NjNXcVA0aWxUeFNqVWhFSGFLOEY1MjVTcmdtMTE5VFNqQXZiR05IX2pSbXFpZS16akQySzZub0xsMXVGV3YwdzJsVnZZNkRhRjI4LXNqd21pSTc0Qy12WURfY0ZybTdORkZTTWh6MmtUQXRqcmlndV9SdElkRWVRTHhnSzBFWEVPeFNNSE44VC0yWlNHbG5PMmdlamlFaUJqc2pXVDJ1dEZYSHVnM2hGNmRwZWNMTGpiMXZBSWZ0SE5xbXZyQ0VQR1dIWFNTM2hSYUt1QkV2UWo0MFpQZnd5TjRoRFNJLVVnaUlSYjRDa1dDay16dlRDU3NwdmVMVGlwdDU0MGtZcG5WRzdSNkM5T0JRYjJXS3NLaC1rU093QjhPQkVpcmFGYlBxRjIwTVdrck82YzdiQm8yRDBqMl81dmplU1hjUjZTb3djbERrYmcxMnpSQm5faFBoeTNITWExN0Fpb2VXQjVzTkFhMzZoSExkUUlXZmxmb1o1UzdRY0U4cnJ5WGJNVHdJOXEwS3pvelR6bUNWcG1SSWM3a1lOSHBmX0VmZmM3bWt6QUY1czg3aVVEYmhqQkQzU01TckVoLTdKcThGLUVqdlZUNmVFUWxsM3RkYzNkckxmSUhKamNSWFhHQ0JiM3R1RVRaYXU1c1l1MnM3cEVsdnZvaV9OZjFNelVzRktYOWZwY3FBM0g2LWh5V0NnNFFiOUF4TjIySWluV0JPVE5XTHZuQlN0YUJLSy1GSnowSnIxUEw3c1NZODdKNUtfcmV0N3hXMzBLa1MxeVR4aFRzb3BfODNDc182T1RhVXVfQTVZMDZ4Y19RaE9SREdGUENkQzRLT1MzU1hqeGJ2c0pqTzl3czlDcmc5eTlBSTZSQ1doWHJ5Z2YxcW42WnhfMGhqSFpGQ0Fqc3hCX1p4NmdQZ1dCbGYyOWVMSlZBR2NvRFpfUk5qY3VkRTBydDg3VDVBbV9icy1XWFJvLTEtNzlKbHZQdlBHSWs1QWM0RWZndzRPTXJWUHpfVXNTZmtJSHAtQ1JRdmJpQnRjMTZMZ3Z0ckRQMm1YT1MzSi1uTUQzcVp5YXFNMnA4ODZ4Ynk3aC14bzFmVVRpLUxmQk5tWTZuTWxvcmw0YUhMeVB2T0REUjYxcDlaSS11a0Vtc24ybTJFRENwVlNhZm0tZ2wxd0EzbGVZVE9xdGN5d080T0FkeXRIX2FtY0FJVzNRRXVhaHNVR2E1YjE3Sk9FaHJVSllIOE9makp3S3VDSzVqSXBZRWsuX3kxSEp2S3h4QUpBNE1pR05XcXNtZw"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '43b1e53b-e143-4b70-a146-2d56902fa6db',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:37 GMT',
  'Content-Length',
  '285'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/backupRestoreSecretName-canrestoreasecret-/')
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '82fe1dcc-9630-4d13-9bd3-4df7127483ab',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:37 GMT',
  'Content-Length',
  '299'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1593086737,"scheduledPurgeDate":1600862737,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '731c70f6-8704-4b93-9fd9-0171447d5f32',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:37 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4a87daf7-cefa-45d0-977e-1d38222bbd7d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a91fe285-015a-4cd6-a9fc-9c3084aa650b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '18a64ce1-b67b-4078-82ab-7ee02ca2af9f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1668aa85-3366-458a-a612-bb4b3327ba54',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cde3b454-533f-43d3-973a-ffe70259f3a6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5f1ac1cc-2ae8-489a-a870-e19801871bb2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '92435683-a90b-48d4-8ac6-8d18ae75136d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '44145186-560f-4ba5-8b0f-21d4644bc816',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9be0672b-e833-4ba4-a3aa-0799a1c8d3a4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7917b0d8-5f28-4f37-8937-56eddf021a0d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1593086737,"scheduledPurgeDate":1600862737,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/f6b2c5dc6a044650a5b499066bced3b5","attributes":{"enabled":true,"created":1593086702,"updated":1593086702,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5617acb1-becc-4771-b969-4c202b811553',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:56 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dbe88352-f56f-405b-9f2c-30c2ae926622',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:05:56 GMT'
]);
