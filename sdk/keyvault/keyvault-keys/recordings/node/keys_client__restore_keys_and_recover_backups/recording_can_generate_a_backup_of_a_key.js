let nock = require('nock');

module.exports.hash = "83c2671b74004a487fddac03e56e9725";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create')
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
  '13e2982f-9bbc-45a6-8965-fbe275d5c13d',
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
  'Thu, 25 Jun 2020 12:07:36 GMT'
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
  '95553c0d-2795-4fdc-986c-d33e41041d00',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmNKygfvn-hApCtPZiFGxBA_aSJHAQAAAImKhtYOAAAA; expires=Sat, 25-Jul-2020 12:07:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c097b3e3-49fa-4d1d-838c-5bcbc94d111d',
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
  'Thu, 25 Jun 2020 12:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/840e0695ad694e62b1c1128df401b221","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"l_u9TB4eoL-AysEKeZR013xq_5GwKHOVHkZ_SAgrdX3x7XoDmLUmQSU5T_krbR8HFW9pXRbvBdWP-IyC7eHUWRHJLMvfFd3MuUA-rFIlOeHIZG-qV6_vkU1XSvgpyyhDifN7xsEJ9MJWJ5ufbw74zJolybKMP81u0T5UagMGRPoXx-5gT3rxMZDt4RSTkh9qVii1crJWD2M-MMnXqKYvZEMHHefaYrEyDotXoR758QSKwYSAb--8DB-TCtvOKe9PqCPFbmmENQH2RVTH8yseNVRsx46uC-XhePXrQ1upHOVXL6JThgAgqlDSXf3ITUALoc7e8zIgUKmdsylN6tEjDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086857,"updated":1593086857,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '97954028-8fd4-4b9f-b52b-dbdc3d14eb64',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '736'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlA3MzNIcHZxZU1Ndk5NU3FjejZta0xGYnNzUTZLc3p4OFQwbkg4TmVqSkhoWTd1b3Q0N0MwZVNjWTlZS1V4Ti1MNWRvWXdpWGI4ejc2RGl0dUxXbTZsUWNsVmNKYThXUERDTG93Uk1zdW1rOWFIeFFwSUNjZF92MkdnVU4tUS1fbF9pSUJzUFBlUkRfS2l5Y19DQVZjUTE5OGNTR1lmbDItcW5faDRKbmZlM3o4OHdBS19EVW5Wc1lOeGxodHg5b2hSZDVaQjlRdmJrTHZUeXRaQ0FTLTJFY1RmeTdzWWlvNmpYbEFkXzJ4MjQ5bjBjZ0hEQzB3QVJqakRPMWhNelIyNE1iNlBRazlLYVZlVV9TdDFFVTlXVlFUQ0pOZTVZNk9LTFVtNndPSDdaREdpdXNUYUZSVEpDcFBDSVVkYVlKT1hZaU82bUl4NS1nM1dJNU13ZzlSdy5iWlpScW1meTR4WUJmcWFyZGtla2NRLjkwWXlpTEJZQUVsa1JOY3lka1N5dno3MTY4Y0pCUl92c0UxcmNmWUxqYWtzaGpvQUo0MGtMYW9QT2RRSDJlckJhS1RCTDlrUjAxUEFYbVltSE1WQ3BwNE1aRnpmR1VyUEtqbGx3ZHU1OFlPQUNRb0RLWEpsTkdLQkNHWWItZ3FiT3o5eUxrLTNlR2JfWkhZcjFwYWtGS0hiT05RQXR1aGVEZU9qa0pSejZ3NTlzcE9VdEx2SkkyTWp3ZTFHYUdsb2R0YU5BeVctbmNxaWFvaGoxcnRkWkJwSGVER1lIZU93X1hBYTV3RXBPOU9UUXlqYjV2bXRzTVhKRS1odnZ3VWlCeEV2RzZKZHQtTTFXcWRNVzloNm9WT2czNVZ5ZFJVcHR6ZTg1eTJiYlZuOHZreVBrWVpFRGI4ZTdldU5kX0UwSFo0VW9pR3dWNDBhV2JXQWZoRVk4YU51RDNqdjBoQU9OaGdNc1BXeW9fTDlYZldpM1ROSDlDY0FscTJvVW4xbGM2bmFkSzd4NU9Kb3ZhX1FzUC1TSERLS2FLLTQwX3BVblZqRzVWdFVuRkdpOHFWNnNNaVZsWldhMjc3X0dHY2tVUVJkcGMtZjRFNHFYcm5BLTRkODZ3R0hKbG9sSjA2N2RLYTFKMW5HU195RFlDQmowcGV5NVlHSkQ3NXAxcHRTbTdWcWFUd0NkdUVfenZUUU5hWndVR0VibjI0WUZRMTFJdTVCTHJrUnRTMnNQM0J2SXRMTEVaQ01HY1FNcjRFekZja3R2VFRLTjVJWHl5LVRMVG55UUVPWWoxY0VxZGxyX0VPRm53TUhhTFhTOUlJTHFSTFZITE1uUVo3NW9lOFhod2lxMEthMFgweE4yNU5lTEVlLTRfZVM1QWQ0S05MVC02R1BYdERHSjE2M1NuZUhIdHd5VzFuSFZrVjI4bGZzcU4tVjBiYnZwUHA4UDFCZl9RVmpPa0NCc1U0MV9zM0ZkNmhlejcwUU12U1AzQnFzNjBYdkFPSzB0ZFQxc05abWVrUUJtQ2JsbENBa1dKbmwtRHpBby05aFQxbnJqSV9PblR5VVJCdFFqTy1wbVUxSjBmbTFxNmllTFIyRGxfWjFWcjZ2X3ZuMm9VSEtNMkFKcklVa0ZTYTIwTWs2SVd2TmZ0Vzc0TjFkSV9aY2VKTlJXclVROWdNdTA4SHBZa0NFWnB2REN5ZXdJa3ZQcXAzWC1fYkZuTkNqQWgwQ3hLRnU1dzhxZFJuRWZYVUlKWU9hQ1p4by1YaWZrSVI2b3Z4bTdRVTVicXhUaW0wX3NkZFdnQ21GaU9OXzJVd3RQQnkwVGI3aDVPTlMwaHRPMlhJX3A0RERHNjFoS1pfMGpyem9iVjJUaFZma0o3V3VFNjlWcHlSQjFlWWRtaTdKVG8yRzZVbTlLdUtwOEhhVkJRYTdQMDdYaWFHZ2RZdnQxQmlvZGkyTlFxZkp1X2FCdnBLU25zcTFYVGZrZWRrR1FTRVJDUlpqTkRFekxQMm5HcmNGQUZhUERac09NOUZvc2d4QmdxSnFSTlJDWlpjMm9kbDlFMlR6YlFRRk04cFdQMlZCZDFEclpsd2MtNG5vVjJ1MlYxZWh4eGNjczRNVERsS3kyNUlQeVlRUEppTTZ6MGFLbkZPZTlsTkM0X3JkSE5XU2NqWWYzV3pVOTk4R2c5TTlDY29RZTJ2ZC1VNkFLazcyWndtTG1tTWlqeTZ1dXp0dWdDcWg2MjVlZjZYSkhTa3hKSm1yTUpqWEZqS29NV1pPR2diekh5cENpa21KLTJsSDluQS1taG9XbDZTa09zTEpzd0RkTU11Yi1Wd3lSOE85UVM3WWotaDZndjgzTUpQSVB6bDF4T0dpYlJIbm5yUlZSRGRNMW5OVlBrV25KaWYtSThKaGtVbmlUaWRVcjdLb0lKMDNSelE5SGFMVzhZdVM5VENESi1FdkM4LS1acVRGLXhjb3JBT2JDN0xDLUVjZzJZdTJsTGZTelZFZ2tobk8ycXJpWGRDVFlaRnNrejBfUy0zR1ZDTm0tMVFZYmllQ1JJWTh1ZlRUQ2tWbDVFUHRoWTJOWEZEQUlnRExzVXZZc2l3ZVVxeU9UdlBFeGVmOHpYR1k0ZVA5R2lvZ0VwelRsZjB5MnFSU01nSVdxaDdjTm5VeTdwdkdJVVZoYXpvZUFnbXZhQ29fejhMb1NXYWxrMlMyNmxvMTNka3Z0MkM5eHFyOWZFLXlxVFU3OEtOM0sxUDNiM2NhRUxnU2xVY1hEUmo2aXYwTXI3WW9CSXJLX2l1N3pJb2VXVklodzA2SjdSVVF0eDdzdXU5QXFpdHJWRHVNZzIwbkowbEJ3RkdyOGNEbXVBQUlzUEM5aVdZbzFBSjloY3pZVUdHSXhFa1FzWVpPbEVsVFQ1UFpQc3VXdkFpR3h2VWVpVllFTlppTTFfQzVIVGJNVTY2Z2pMbVFPV1dYeXdPX0JFVU15a3JCcmRJNkhmUkFQVDJVYWxaOWFCWm9kazNXT1VkbWJhaTVyUHRORDgwUHZCcmxTOUUzVk5Qckp0ZmdVaW52V0tJNUw4NXQtOENyWXpzbDFhWGlzR2JBazhoOEJKdkdXTWRvUmpNZ2p5YnNVMEtGV1pRemIzUC1EUVM1Ulo2N19qNXZtZFNOYjl6OURkeEZ6cnAtME9ySDRzU0hPd2pLY3R2VVBWWjd5T29Lb3dHdnNmUFlhTnlvOXNac0UxQXpiUUM5SjJPcDNRd0V1YXNQeC1acFJtYVQ3a0hoSndjaG1oOExUR0NoUjZmSndsX1psam9tek43QkI2M2JjSExEdnNxbzdRNkhGUDdhOFZmVEhjdDUzWGFUdG9KUnB4WnFPWVh3anFSV2NMamJQcjlaXy1TV0xBNlh2azIxaUk3c004aVdyc2Y3WUtjc2pTS3lFS0VUWXFZWVpscjVTOFFFNXJ4b0VpOVJ4V002THNoOWFUNVZ3ZWhhS1VmX0c5RkNnRG8tZkN0dDhQazdKRnhQenk4Tk5JRTZqMmJaWmllNDBWSnlZOHNxVVhOU09ZOHNoNUc3TGg5WXRRSFZVN2pVNUZqS0E0SXk3ekpuVktXRGNBb1ZZUTdINzBsXzRmSWxWNmtXbzNwMEFTY0lmNDB5OGxROTFCMlRwUUN5M2d0c3dWSDRrajVKdmNpclJ5ekFjSWtBR0s3RG9rQm9NVEdtOExHQ1lYVHVxSzF2RU83TTJKYjNEVlNLWkExaGpieFJ6RzJDRE93NWVUZ3h0UUZXUnZGcHdqS3dwVV9MLWF4SHVfSEJHVEtLN0xfOHBxWEhZRm5rOUYzOW1mNUE0NElRR3M2Uk1tMWZJNzlOaVhnUHdQd2NGRmlGTWhkV3RrczZzRjBHandJaVVwU0lLUU13NURYWFF2bUV4M0xYNXc4OGpsX1RDeXJsU0huZEVZWFpCZ0NobEdkbnVfbmVFX0paZlJWNHVVUGJGZ0FOZG15YVNZM05CejJfSFFFcm9sTzBnNlZ6dzhoR1ZVeUx2TnhwWXYtN0gwZVNfVml2UDJWeTFsWVJrRWRDUnlRdHk3clFjMVpNUEMwODY3OTB3a2p4STQ4clZjZ1IzRXY4OXF2dTRyeVhaV0o5RFhpWUgtVlNxREhjdW44OVlVdi1nUXRpbHcyWEpYUTAzblRqd1djMFFVNFp0ejViTk5UTUdTTk5IMmlDakxINnlhaWszZUt6cmtXQlBoTUhQQXVpTndWZUN6LXI0bFNmY1BsSzA2SXZHWXVKeVBWT2Y0SWZXbV9DUDhxa2NlQlFpSk5NUTkxcmZnZkFRWkxZRHBGcFVhU2hRd2JJMlZndEpSRTR6NUFPVjl2cEU2X0xJSExPRmVGaUlKd0UwajdnWjRURUIxMHBQeGFKNjZaWXRycEd6NUd1aW13YjBYd1JJT1hsMDJYajZ0RTVuSl9hMXprS1hzZnlZb1R1cUotTVdVMXpreXQweXlyc2ZuSzFyOFJkV24zZHBJNjYwMlU4WWRWMmFrNkZhSERydkZkblRZRXhhVnhFcW5mRDVYYV96ckVjVGg1U0VzLVR2Y2ZEVFhBdVg2dDlycmxFWE5RR01obTVSdHQ3Q3B2ZnNwOGY3Q1JTMkdwLXVSdzMxTXkxNHBsY3AyVUU1YlkzcmlNeGNwQU9yZThfUzhja2J6aXItV3kxT2FFS2JwTHVhV2t6ZnNIa0VrYXNZdGJkMjVEZzZkcVFPeV8yS2lRcFNvVTF5cUl1MGVTMFMtUTJEODgzX2NYQ3ZlTndQNWlFYXpzT2xvTC1hSTBNYkhhX1B1OFppcm9QVW9yM003NENUSFNxQWNUSXpCWTVyWkpNWmZPWjN3U0M1R3Bwb0x5bzAtRGE4WGRZbE11bTRNaUl6TjZPNDRycTh0eUZSQXRLb3YzLUhoWGxCRE5xME5Rdnl5T2Z5ZzJQbFFnRm9ZM0tVZC1zUzlXRFJoTU14M3llcllLQ3R1dW9XbnExOWVQdXdwUFpwb0o0LXBhM3ZQM2R1bzR0REUyYmNDcE9aVWNLYTFhaHFPamszdFlKT2JmbjZoQzNNRWxfM01pN3NuSVJDbUNXMm44eldwRWFRSkVOeWcyMjNKakg2bHkyZDdXVWVuYkZVMGt4LUlyM1RaX2pqdlhHdVdacE42S1VfdUR5Y21adm0wclVNQWlnTVVvM2xXWW9TMzNLeko3RDlzTWpXcFVDcTVCSDNCMkhraEplVE5yNEMwZEN5WUtnSmNtdHhZUDJhakpFMjJGUTlDNDZkZ1cxdzNSdnU0ajQ5WnRUcHNPQnQzS2dMd1E0aEx2ZlBiSUR2MEd1NkRDYW5JSl8wVmdud3BuMWxMTXo2b3VaSDUxVEFhWldtVXZhMnNtZlY4aFpLcWlrN0R6Y3M4a2hhWTg5aGtiRFJwNVdrRzRQOG9HaURwclFPUVRiOFNjOXVtNmJnOXBrV3FGclRhdDhRNjFZdjNzR2VfamwtQUdYR2lLSlBRVGc4UTlJVTRla0RHUzIwYU9ueTBueFp1dkszd1FKSUdFVTRpNVRhNGNYQUJFM0xwV0NUSVYzMk5vbFJLMTFiREM2aHpDQUIzdlRqTnZ5ZUNzY0c3MjNIRmhvNHkwUkFUTUJMTXVkVVBXd2oxV1NNSFlicmIxWFhoZlhtZ2l2eVFXUV81MzZNX3Z3RGoyQ2lmVldrdXUxNnBYN0FlUXUya3hZdWJOcWR2WUFqQVZSTVB0cm1pUUVJRGxVZlFjbW9CM3d2WmRQcjJ5alo2elhObkpsSUdpS1h2RzZTOVIzSXAzQ1BQZXFHQ2plNzhBSXpjVVRBN002MzJob3o0UndHRFAtTkZoaU12bXBGTnZidWZFQlNIYmNqRlJndVBKRjQzUUxTVC1pZk9iYVMwbnF5RG1wX3dseFhUUXROLU04NDdqZk1hbVZtd28ySENhcGhUVFF3NjVoazBwZy1fMlhDV2JRTTR5SUN1aTU4WVplRno1Rlg5QmtkNU1pRlhRaGIwTFlHM3JKUVJPNDU1V2ozZmdyUnREbkxqMG1IeFlpZTdHN0Joa29oclNGVXBVX201YjdGc1R6MTBpRllwTkRnQ0VvUmR0RVM5cUJSMDZ0QVBBMzFWM1o4Qjk5QlNjNTNyYVFLaTlZSmdrYmszdVhoM2poZEVDdGdTRU9GVEpWNWdSbEk4SFlmaWRRS0E4QnRQV014bl94WUVPYW10czlGZkpJUnBJcW1ENjZ2NWJRUldjTGo2RkJIalJwRGh3bjJ4U0F3UW1MdXlySVVUcFFoUXU2cTVsYU5OLUs5MWRidlVFblQ5aGVwSzdZUllWOUdEbGZzWHJ1ekczOVc3Tll1QkNyNlE3bjNEbXFuNVFkb3NtaEJZODBmSjNOX1M0elN0clZiaWIzWURaZ2JmRV96b25kaXpva1h2bWNtNXYwb2V2QVlPTzVsbTBrT1dHVWZ4enM1YzFyZHU0Skc5Y2NjdXFSekdPNzM3bTFQd19kVEdKaUJQejZFdzE4QURLUWlzbHcyYTE0WHhrQU4zel9yZE1zM29LRjF1aVFjQS11ZjBsYTZwaHVoOUhENmN0ZmN0NUFoa2FlcnNvRkM4MFZZTnM3N0taYk9naWJNUHB0VWVvS3h0ekhNNS15MFdZWmdyX0RTNHdJZjY1QjFfVVQ3UHRnTXpFOThGWURNRkJMcVZBdXhSTlhXbDZHTnZPdkJueldxUFRrdC1abUZXNm1sUHMxV2o3YnQzLVZPdGR1Nk93Smh1M1lZZVN0SWdfYXBoNklHT1lhTU9KVE4tVnoxTVplS2VpZXFQQUMycWdwUjhNWEoySUNTM0FJYVN3V2tLTDJXZHdNYjRNYlhXcWZ6dWJFV3ZzWmRvOWZmQnFPNFR1a2lJdUc5Zk41R2RBeE1OYzhHOFlVaTNHRjVlRHZJbGdmdmc5eHVMR0lVQ3JWWDU2VVpZb1FGNU5nb3FReFNid1RBTW5uMmZwbWgwX2N3X3BrMFljeGNlN0JOb1UwakZmR082elB0VjNrY2RYSEJlZWVhYnZsazJmTzdQYW10cE90Z3F6Rnp4THNJdDhVU1EySFRLRllOZkFiNFBiODlfcFBUd051bV9TWG4yM1Vab1JkR2kzMDlYZWdNZWx0SHVEajRvUE11YXdEa2FSVlRqVkYxcHhYaWVEN1NSVTg4WUdpMmdIUE8tVGdod0I5bEQ3Qk5xcUhsbC1xb1RLVlZIQjRGNzZrbEJyRmlKZ2txdjRMcTlDQ0tKMS00NDhkaE1qMy1WV3hVdl9XN1YzcWJXRFAxNFVTa0ZkNDhrS08xd3Q4SEpoRlBTTzFjT1RpdXFVQnFBTjl2alNCT0Rib25LRmxXcm1VR2ZKRm9MbWVUNFhOcnQ5WFVkakxCWjFTZlI1dUNJNkgxR043d04yWmdReVFobjZ1Q0h1QXZyNm1yakN0NDYwclRMdlB4Zlk0SXd0WFJpd2dXenl6RzBfR3ZnbDhIN0lNSVdNOFk0NlM3cUZBQkZ1NkRPNUw2RlJ5eGdaWjdYZXgxYWxkNWhlcU1HR2lRTkJaM0RNUHZIbGlZUk9QR1UxS0t4NkNuRUJBVEZqbmhZMjhuYUgtYnNQRUcwbmxUbG1yaWFQR2gySFVGdDdVc3gxWUJCaFlSOGJCV29WWWY2QlBRTlM2YTBodHg3dFFRTXE4VjA4UFdlSVFlakk2SXRSajVxOXRpWnA1TC15UGZlUl93V1lUNklzSlp6akZmTGZXRm9NdjNxUmdfTGJKNUliOE4wdDAyN0Jfb2VQejhRMTdMTUtRNHAzbWd4bC10U2lfQjZHNGtQQlJFcllQYUUtcnh3b043N2M2Y3dUU1JoOFN5VUE4cHRsZHBQSzNkd3lKYXR3VXpZeWMyVzhGYmhxYkZpLXh0aHljV2poNmhvX2Q3VzVkX01iYUoxcHNzX3hmWG1tbURvNTJfdEhRNWJQSkwyMmlPUXRVSm9KZEpjYzRGcXVwQ24tWUFmMFBHTFdaTkpCVEZYQl9kb2tDT0lmZ3V1STF3MWVFdUMzakRQSEViX0c3SVFnck44SUFRdnFBd1NZbHFza2Y0eEN1Z0RucnZIS1BrcmpoMzhWMEJkV2IzTnpISnpyb1VtV243SjJaTmdEZ3RiYlVQWUg2SXk0R1dOWGNJcGw2N283Tng1RFZDd1puRmk5a25GbndLd2pXaDBRU0tJMGgtemp4a0FjQmxtN2pNejRsRVNxTWxfeDhtbmFibGxoMXVPbTBSdHFvT3FVd2hDWW9CRm9fcjZHdVNHZnk3NTZwVlpBb0ZwZ1J3Q0h3dXhocjBvODFOcmJpNEZwWHVUZU9WUTZkS1RzSU9ORHVjUk1aY2pGbTQ4RkhyMVpHV0laQkNzd1FxTVpxRlZIQ1pfYllfdGM2NC13Uk1aajFfVXN3bHJ2QjRNRnVlWHFha3lreERWcU55NGxHRHplQ3lxZ2U4SWJCMHZhbzZYZzRkbTFySlRxaE9yTEhWdi1KYnJMWDBlV2tWWWZlODM1R1ZsOXBGTmV2MTVFWVF0YzI4Z3YzRFQ5ZHVwUjBBbnBDR3ZsN3lCRFZMelJHOHlzcWxsSW43UzJ1a2Jack5TdmdKWW56R01qa0pYeFVzUUVmbzFZdGZLZGdQclIzbUdGcy1KWl9xbEo0RVZCV3lyeUlvd1NMV1MzV3Vod0FPckE4b2RiTFQ1SXUyLUZNN3lGSlgyeDh5YTEzVjRmell3STFOMkJWOGVRYkVVWUtlczZnN2s5dzlIMFRyeFFzQjNqSG9uc09HMlVvbXA5RmFaUHBnV3d5QThId0VRb1g0N0tUNmQzanlJd19UV0o3SWpoNkVUbU9sMjZiazRsS01FT0dhaG8wVGduenVBYUdCaFdic1FDVkRfYlh5YmZ4cVFWQnhZSlpGNkNJSnV2MHhlYzhYM1ZiYUpHR190dkF6MUpnUUJYeUNJUzFTSE5LZGhQMDJueVg2TS1YTzFwZnBIWlRENUtzM1FuUTczNUp0RkNkaV85QUNMeEo1dGhya3M3SE55S3hQSkNzSnRDZTFYaG9ZYWsyYUF3b3FXdW9Xd0xjQTZoWEpPVFM4VFlRQXNKTnpybDdCMnI3YUFkSjJJWnpRbzhrR29hbmtzWEs3WHEyNUVBejlmdGtMSkxSMkdQSkpoLVgzRTNSVXhFZG9rMkRqVGN5Tlh6ZUxOZy1SUEU3Q3F5d1VMZmU2QTlqbFFVYVdGUVB2a0ppX3ZRcjdSRTZyV2ZtMEJFcTlELXU3V3FRYTNiUUM0bFE2MktUODRPWjJXbG5NUl9ja2c0UC1kLTBIUFE1cnlzVjhSUVp3TGF0MmYyNDZTTkhXei1mX214U0NVSkhEdlc1d1drOUwzYUVwQ1NBc3FLM3hvTlBYMzZ4dEg1dWNNSzFFby1wLXB3dVBiaF9Ed0RVcXgzN1RWVFFnUWVHcTFfNEpNVHZjdzlFX1AwRXNvV08zeUtwbHhvb2dDai1LUTdocXRPcEZKQkI1U0tnMV9XWGQxMTRWTGNKSS0xbUZfR2tEd0o5akZKX3lWOGRGT3pYeVJnUUpBVTE2c2s1RlVScWN4MkY3c3c1a05URU5xTUZJMm9UNVg3S0t5MlRCeGJSVWhkT05WM1J4cnpHZ21sUU0yVGtsYzFyNlhNWnJLa00ySTZXdlQyTDN4MG50SjFYc0gtNGx5cm85dzhYc25pTFVGNnlaempBNHg0MjFrSDRSYjJVU3h3dmxrVER2ZVlxaFBUd3MtMnZzUW5ZdTBJckpPMUN1MEl2cWVjMkM2bUNRMVZ2U3lXQm5lRjNNSXl0bU9sclFUSXJSUl84cmRmc1dzenhZYmJiQl9oQTlyNUhGcE5jTjl6aVhCWUtrNzE1VjhqTlAxdmpRbWpJU0Q3NlptcUNITkpjMnduSVBBMjYzQnRjNEZPOTdEYS10ZmFMd3hjRl9sampvT1YyYkV2cDVxbG16UVlpM3I5cVFpd2p2MG5JMlBTQjdsZjl5VVd0aFRtRkZBSnF3eG1GS2g4aUdsbERZckFmQlRRNjhJX2pzZjNZOTNKY0N2cVlIZF9TejQ5RUpxT0UwdGswbWQxcUxnZi1fcUtKaWM1d1haRUJVcXAwcmxBNlozZENLYTkzWUQzQmMyUVR1NFF5eVRqQVQ4QklMZUE1YlQyVG0welQ3UVo4OHFyTm9nVDZubUQxTUJFTV9OdHozaFJpeGx5V3dwdl9NTmY0M1VIZUZzS3l4U05VZ0MxYldvSUpxYWxXcDhDS19rTEZrbnk2QmRvbUM5b0ZMWGJUOTV3dnluVXBkYWVfYzh0T1haNXhtODJtbDZ4OHV1Z2RWQ1lYZG1uSFlCQkVPQ1plWGp4cDg4VEZJMjZvakpTZnJZQlZOSFloZEdSZTR3Y3h4MnFEZE9ISkpCWWJPVXh6V3lTdlF3S3gtTWZqcHl5SHVuSmR2Y2V5Y1dkel9aRWM1VUJqeWdwWDNLRW9tNk9sWENELXYxTFZhaVFlZHFPYkJzYktsZ1Q0WUdrX09vNk13YTJDckI1ZnJIdG5DY0tOLWdmTE5qYjF4YnBldk0zUGFVeWxIRnpoeXo1LWZEWXlHeGJrUjhMTE0zOFNoUXlEMUdGUFRjdWcxb1NXMGxNMnpMaFczYlRUcnZXYzNERWVCbHl1WEE4Z3d1dTB3djk5d2FsTjhFSmRzOEpRMFJadzVJTFVSN0VuTFExU1R2cVZNaDhOdWx1WGQ4ZWJ2RjVzUXNId18yVjMyWW91Qk1xblVPUTRKVWlKVEVjNjU5eHRzQ0RKYkwzam42MUp5N0ZNSEozNVNBdjgtcC0tQlVsaW1JOHVoUVY2d3JWOXFIaFdJRjVPa3BIVkJyNG5yR3FtdEJoOGc4V0J4VkhjNHVQUHZFWlludlNyY0NYUlhabHB2TDNZQmhwREoteUdEWm95SkZZTjZZYlNMSlRIWG9NZ1g5SDNaNVQ1NnVuM015SnNuaFJNODZnSnRUTDR4T0xFUFVyb0xvbUl2QXhLQzJ5a29QSGFLUm1hTHhlX3l0VmlJbndwSVNLT3oweVJ5a3g2cHVxMFBkM1lIbnN3UFJVSkp0elBqdGw2SUFjSm1OYUFONFBIMTcyMXBNdWRSTUdNZ2VNeUMyd2N1Rnl2YUs3bFZQMUhrTnRDYWJCZHE1YXJqeTRZZENwdlJuSVUxZHNSbWpnSDREQTJZRXJ0SlRVanFPM3VOOE10Rmd4VHVBUGxHN011Nk5VYzFZZHNIUGVhU1FxUTJRTVctSVlFaUNTUDNYMEZScDBXYU44cFlXOHhsS0hxUzFnUkd6aVdJTHJJYTY0VlZJMUR0Q19kZEdEeDRoX1RWek5WSERJQjdybkZ1QnVMUnlrdDh0M0VlVmdXX2tyMUxNdXd0VllyYlVKWkZ5Mk9ZWEtwXy1mY21wU3AtSEs2bVhHbElZVGMwLV85eUZCdEJPRVZjVFFCeEx6OUNpcGEzamlsSUwtWjZQVEI3WmdXZXdwdGtwa1JlTlJZbmJiTTlReWZDSmJPNEdMc0ZEZWlkRTRNS08zbWI3SzQ0RVBiOUZCRmdsWlN5VUtfY25YUGtqOXlKU2xsWjdDdzNXaWZrT3F6ZkVyMTZvdGQxZlVXR2lINnNCOXRIUkFJMTdVS3FWNkVfUGlMeVhILXBLODhsYS14T3lLamw5WURtamxQNXVBOFkyaFFaaHZRVGhMYk9uUEJveF91R05PczhmN09LUl92eUFzeWtLbFRIcDhObmdCeEQyYU1fUFFTMEZUc1U0dm9reXpwM2dIcmpSa01Bb0J0TWt0Q1ZyWGpUNTdOYkVFZ3lIbTl2cFl1aUR3UzVnX3dGLUgzWFJFbUpCX09hWnNEOUwxMGlrSTRtWFZvVDEtOXpkY1h2NmM2cHROQ0Y3d2h2WXJVaDZmLTlNSDBoZFJXSzZHaU0yWWhZUE9PeGplUWxZNVJKY3ctcFNUM3NVc1V3RzVjU0FvTnBrLUlVS3pLYnRHM2ZzZEFJU09IbDJJN25ENDFmN1QwVlpINlZwMndiWk1EX2EzUFJqVTM4S0REUXhvNEJoM2lkaHlhUlpWa29WRGhEaUFocWtMS05SV2ZEMk5LNVRoYi0wOVVlclRhcVM4eXc0Wk5hM2NNWk15WElfTWxQMURRVmhqTWdzbzBZMDlPSDYtTHo0RWcwZFRrQ2thSnJZUDBIVXA4Sm5SczhMa0UxVnlTQ1NCMVBxZnVMZ1ZObjlBUUZwVTNIbW5jNHJQVFBJS1Nva3A4bXdGOUN6WGFaaC1TMFQ4QmNMOGhjVmMteWlkRzFzUkRwSzVCdlFQMkNMV0U4QmFfR2lGTXVleVNtTEJFLUNHMFp4WWRTS1k2RTFhQmZoeXhpdGFxS043MFEtNVZSMFNoeHdCQ3VtUjNMZUdtZGtIWjAyZmppQ2FiMGZVejhHV1MtN2g2ZDBiVGRkVXlRMFJSUnFudjJZaWdhdEJCLVJVczhSV2xYYVoxekZKaUFCTmhMRDRNVWthcExKMkFQQXh5TmZ0NU9CQmFuRHlKQXkxS0xHbWpmOWx2akdCQ2c1YUVENGJuYUQ4aVJqai1mNlBpV0t4dnhQWWo0SzFtQ2xSaHlpY2RKdnJWd3J4cHFSMzNHbTNLYl85ZGxYYTdDdlJITWpWdVpkdV9wVGZDclFiT2o2a0ZyLVE4Rk90VFdJSlduY3Z0VjU1Vlpqb0tsc3U3MW5TR0QxdWFEQ045Sjc5ellfck5abXMwNUZnaG1BZXBjZXEwUklLajVpNEVjekltUHJCTXZuNVd6dWdkOUo1NEpGZW4wS0ZjanJrTjRDSGdJVU53X2dUTXFjN1Q2NUNJSFEubFhtTVloWXFwNE1rQ0Z6b3loQ2Uwdw"}, [
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
  '90ff81d3-9ff6-4120-beea-13cdbbd7f53a',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '13054'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1593086857,"scheduledPurgeDate":1600862857,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/840e0695ad694e62b1c1128df401b221","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"l_u9TB4eoL-AysEKeZR013xq_5GwKHOVHkZ_SAgrdX3x7XoDmLUmQSU5T_krbR8HFW9pXRbvBdWP-IyC7eHUWRHJLMvfFd3MuUA-rFIlOeHIZG-qV6_vkU1XSvgpyyhDifN7xsEJ9MJWJ5ufbw74zJolybKMP81u0T5UagMGRPoXx-5gT3rxMZDt4RSTkh9qVii1crJWD2M-MMnXqKYvZEMHHefaYrEyDotXoR758QSKwYSAb--8DB-TCtvOKe9PqCPFbmmENQH2RVTH8yseNVRsx46uC-XhePXrQ1upHOVXL6JThgAgqlDSXf3ITUALoc7e8zIgUKmdsylN6tEjDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086857,"updated":1593086857,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'd1527889-2e96-4293-891e-49b921a57adc',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2adaa13e-0bfe-4e74-b035-cc84584ae034',
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
  'Thu, 25 Jun 2020 12:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '014f0228-6d1e-4246-ae83-084b92667813',
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
  'Thu, 25 Jun 2020 12:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f694ebc8-e5d9-4618-8f91-9a099389dfeb',
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
  'Thu, 25 Jun 2020 12:07:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0579897a-636e-46f5-af06-b0972a1efc2a',
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
  'Thu, 25 Jun 2020 12:07:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5ce28f6-6bb7-445b-b1f3-a0de979ac9c6',
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
  'Thu, 25 Jun 2020 12:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8383e2a7-1e9d-4357-9e65-dfc644e16844',
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
  'Thu, 25 Jun 2020 12:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8918df03-fd0f-4567-9665-20f8a1206767',
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
  'Thu, 25 Jun 2020 12:07:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1b23cb72-933d-4a72-8465-58c062404eed',
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
  'Thu, 25 Jun 2020 12:07:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '90309020-e343-46ae-aaa2-67c9116c3a22',
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
  'Thu, 25 Jun 2020 12:07:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b6b5024e-d4c7-4955-b84b-d3383b78c0de',
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
  'Thu, 25 Jun 2020 12:07:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ac0784be-3584-4822-89b6-f908c3ef0836',
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
  'Thu, 25 Jun 2020 12:07:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4f421b52-088b-4b93-9acc-4dc8085ab37b',
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
  'Thu, 25 Jun 2020 12:07:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574","deletedDate":1593086855,"scheduledPurgeDate":1600862855,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/tracingKeyName-tracesthemethodsimportKey-9542721020543574/0586ea0607a64b99b8213b28b98120cd","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB"},"attributes":{"enabled":true,"created":1589471805,"updated":1589471805,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5b94dce5-2822-4986-9eac-4daa5c05abb6',
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
  'Thu, 25 Jun 2020 12:07:49 GMT',
  'Content-Length',
  '917'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
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
  '88e9c086-0c95-4c70-95f9-637fa7defee6',
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
  'Thu, 25 Jun 2020 12:07:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1593086857,"scheduledPurgeDate":1600862857,"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-","attributes":{"enabled":true,"created":1593086857,"updated":1593086857,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzIhTURBd01USTRJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklRMFZTVkVsR1NVTkJWRVZPUVUxRkxVRlZWRWhGVGxSSlEwRlVTVTlPVTBoUFZVeEVWMDlTUzBaUFVsQkJVa0ZNVEVWTVVrVlJWVVZUVkZNdE5EWTVNams1T0RVME16azJNekF6TWkwd0x6VkNRVVZHTWtFMk1VTXhRelExTlROQ01EazNOamt3TkRNMU1rSTJSVEE1SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a03c1e83-dc63-4a09-926a-c1f899276ad8',
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
  'Thu, 25 Jun 2020 12:07:49 GMT',
  'Content-Length',
  '929'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1593086857,"scheduledPurgeDate":1600862857,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/840e0695ad694e62b1c1128df401b221","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"l_u9TB4eoL-AysEKeZR013xq_5GwKHOVHkZ_SAgrdX3x7XoDmLUmQSU5T_krbR8HFW9pXRbvBdWP-IyC7eHUWRHJLMvfFd3MuUA-rFIlOeHIZG-qV6_vkU1XSvgpyyhDifN7xsEJ9MJWJ5ufbw74zJolybKMP81u0T5UagMGRPoXx-5gT3rxMZDt4RSTkh9qVii1crJWD2M-MMnXqKYvZEMHHefaYrEyDotXoR758QSKwYSAb--8DB-TCtvOKe9PqCPFbmmENQH2RVTH8yseNVRsx46uC-XhePXrQ1upHOVXL6JThgAgqlDSXf3ITUALoc7e8zIgUKmdsylN6tEjDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086857,"updated":1593086857,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4c6b8d99-fa67-4ff7-afb5-e9cabdc3b940',
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
  'Thu, 25 Jun 2020 12:07:50 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
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
  '50f72f2c-2821-4ef1-81e2-aa676d2824cd',
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
  'Thu, 25 Jun 2020 12:07:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
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
  '8f6b4862-78bd-48db-a980-9c44dd911cc4',
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
  'Thu, 25 Jun 2020 12:07:50 GMT'
]);
