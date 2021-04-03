let nock = require('nock');

module.exports.hash = "940cd2c248551b4c4ddd264452ae7f8d";

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
  'westus2',
  'x-ms-request-id',
  '8cd030c2-6eb0-4e72-b0b6-662cdbbf15f5',
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
  'Tue, 16 Feb 2021 19:42:49 GMT'
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
  '4a367a92-d2e8-45ed-ad57-62dc7e6bed00',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aqv4IghlOCFFjTHdV6DF9XIA4qsDEQAAAPQWvtcOAAAA; expires=Thu, 18-Mar-2021 19:42:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:42:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2","attributes":{"enabled":true,"created":1613504570,"updated":1613504570,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'bde628dc-a6d6-428c-818e-83a90919561d',
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
  'Tue, 16 Feb 2021 19:42:49 GMT',
  'Content-Length',
  '298'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canrestoreasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"}, [
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
  '817cc71b-0b35-45df-bba8-8b87ba2c4795',
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
  'Tue, 16 Feb 2021 19:42:49 GMT',
  'Content-Length',
  '5099'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1613504570,"scheduledPurgeDate":1614109370,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2","attributes":{"enabled":true,"created":1613504570,"updated":1613504570,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'c93bd78e-c7ec-4b54-b306-0b3887a88f16',
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
  'Tue, 16 Feb 2021 19:42:49 GMT',
  'Content-Length',
  '464'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f7a2858d-ec73-4b87-8ac5-bcbf5ed9a0e2',
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
  'Tue, 16 Feb 2021 19:42:49 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '55b11238-1030-4618-998e-83c5eacf33d7',
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
  'Tue, 16 Feb 2021 19:42:49 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3b50768d-c911-4fdd-b6a3-502e790657f0',
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
  'Tue, 16 Feb 2021 19:42:52 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ebb92aa6-a163-4ea9-bdb5-5fd6a05e53a6',
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
  'Tue, 16 Feb 2021 19:42:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1613504570,"scheduledPurgeDate":1614109370,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2","attributes":{"enabled":true,"created":1613504570,"updated":1613504570,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '7bd7f378-daaa-4491-a18c-259bdc912990',
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
  'Tue, 16 Feb 2021 19:42:56 GMT',
  'Content-Length',
  '464'
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
  'westus2',
  'x-ms-request-id',
  'b0a1ef66-3dbf-4a94-98f3-50568ef6e819',
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
  'Tue, 16 Feb 2021 19:42:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '674',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9807e240-f431-4794-a36d-d4ff64d65e62',
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
  'Tue, 16 Feb 2021 19:42:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '674',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fd3a413a-42cd-4bbe-8899-b4b802891a87',
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
  'Tue, 16 Feb 2021 19:42:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '674',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '65ce1b55-cde8-489c-9605-02611f8be76f',
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
  'Tue, 16 Feb 2021 19:42:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '674',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4cee9b89-af13-40e7-9c24-895531dd82f2',
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
  'Tue, 16 Feb 2021 19:43:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '674',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7f68ad5f-3ba3-4251-8b68-a28c70ef1a23',
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
  'Tue, 16 Feb 2021 19:43:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '674',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c098d978-bcdc-4e7d-9b7c-d60ed614f4c6',
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
  'Tue, 16 Feb 2021 19:43:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYnZ3NDVTbHc0S3dWLXdPcDk4d1VuLVFJTUtLMmZyRFFhdi1xVUc0ek83V3l1NjVpYWlER0NYWE1QRFhuMzc4TDZsNExRYVdDdFYxOTV0cjFaMzZEZWgwRkVuOXZiT2ZKai1EbEMyZ1lqYVFGakJOWnBHNk5ha0VfeWVBeWRKdy1xWC10VnhHYUgzUWVjT0I0Nk8wY1FDNDYyMmUxWEVKS1JUNFJ5OXdCcmtHWEhFa2RsLXZBNzBqRWc3emhLU2h4NzNvUjZ1MU5ILUFpcW96dFNTSC1mTHc3VlpEVm93a3RWWERzSkhid05yQkl4QTdMcEoyYXhLVGJadUxCbzNFQkhHS3VCRzl3ZFRpaHQwNkgxYi1EX01BaHNhSVNVOXFOazhRTnRXeXhGb1k5RW9tQ1ZiSTJ2WWpXTng0b1hXLXB6ckh4ZnJvME10WjR4aVZ2OGFBYlVBLmRGdFg2clV1anhUTDlwZnhxN29JWncuZXRkMS1oRVU3TUhuNlEtWVJyUWhRYzhYbTg4OG11M2ZoNk5QQlpjLUVMcFJyelhzMXlON0RrUDg5NWFxcmQxcDFPLURweVRGU090R1FSakxpanlPdmFua2d4dGxIMmg2cTk2dmUyaHNmNTA1R05BZzRkU3AzOWUwdHBuVUJPcVJaa0JzaHo4TGY3WkFwRzBlbXpyc1BxZlM5TW9FNjlXRFkyV3lmVmxZekF2b1dpY3BFOEpfOXVTN1Q0VHZGdnNmTENDYU5FSS01Vnh0ei03VXptSVBYZ1ViVnBZM2J1Ni1TR0tLcUdNejRwcXVpSlhSYTI3Um55S3dLRnZ5X0ZQN0J4dWUwLXl6aFQxdWlzN1Y1dVVISU90OU5qRjZZa1pnWHBiZkRsWXg4Y0gyNEdaZHBpWkZScENFX2xqVTJSeVZfOVNQajhXYlZwaENCRUJQZlRjWVpWUE14X3lDSFd5czNFdVJ6SUdfQUhhWlpUMGlRSGdPVkp6cDlTem1ha3lDSVktTm9KYUs3NlFfRzZiRzFjM09FbWVrdjlXOXRfTzQyaDlZdnZBVktRZmtMYjlTSDJsRFVHVVRmSGhaUS12QTBwcHNYUGlGOTJ6M0NoRlhQTjM0LWp3VGRoNXZuYkE0bHNpM21sTWxRLTRyNXZvSjNxQW5LM29VUUhCMVFxOXE2T3REbzhBMXZpRVZHWTMtWTFQYjB1N0NWMmNlaThxalJmU0xSTzdRTHhpMzVxM3ZMYkRBQlJ3VGhUV05xQ1dRbEItVFJ0eVY1M2w1WVJQelMyUTM3TkRSUW83dFhqWHdiVks5aEpOV2F1SHAwa0VHVHNtWHU3eVBRWWFrWlJyNk1tSkZvQWVsaWRERWV6cmxmWVdra2h3UzRtdnQ2cElOYnVyMUE4ak1zRGtpdC1ZdHh3TlFHVTVhX25mVF9DUmUwVlNTeXBqU1VuWmRVcnRGbHg1dmVILXdEMlFPNmxPbnRCdkZLWGN2cDFhSl9RYzJCOTlCSGpUNWhtel9SLW5MX2Z1TWFjWWl3bHNfbVNvc05qa21VWTBKeUtVR2h6d3Q4ZE9iSzcwUV9wd2JzSm1WY2xLLTZmY0pHQkVsOTBsSVhyakVlbDV4a2FsRTdqVl9NUUFCZ2JfNmFwQjgtejhtdDRsbDJzYlJjR3ZDQjYyRDg2TmJsc3M2YlJlMEFtTXEwUEs5TWI1S0cza2Yzb0pxR0MtZ2liMFB2dno4cE1mVExpQ2ozS25IN3pLcVVYVUJ6bnhrb1RMb1dhZ0hGOVA5dm1Xdy1sVzluVUNCRjFQZjZxUEZmck5xaTNCMjA3OXZRaFRmV2dMcTRSeHN2UnFYSV9BQmFoQ1hRZ0Z4NDEzS0RYcHA5dWQ3a1NVdVcxTkFlcHVvQjJOdlhjOXRvQ1lVNS1DYXVRUjM1OUZTQ1ZyRFhSR054bjNZbmUzeHBRcnN0VzRJbG5JVTJaUEs1LV9rWUl2Zkt4SUt3Mzdod2RtWTdCN2VMb0JjV2pRQm5vRUhseFgwODJnNjlFRjZ3N3FpUnB4dXktM2FHTnNWNERjdnduWG5NSGczRk9sbmhhM0dnb3JnM3B3Yzd4RTZZa2NoR0JXalpOZGFodFhmYXZEaTVLTURYLUJvc1NDMElLOXZXX2twcDNZYjJpNXNrczlVVjZFVDVyX1FLVDZqdDgyeTNZdklGcnB4TlN4aXF1al80WUVjNTNCaGhiMzQ0V2FjZXh1NHJDYkhmT1hxbWltOGJMYnUtWHJtVXJHc0kyTG1haEpoTFlEbUh5bzZnR1BZOVJSY0E1bE5JVXJoWE40M3hRaDZ1Q0g5bWdWSjlZT3B3aDU1ZlM2MEtRaUh5UFhfVXgyZUMtaloyNVQ4emQtcXVySnFpN19WMzZRMDdiaG5WY2xmZklLOUxqUkQtNzVsOFNtQS1Sd2dZTXAyTUhKS1VnSzQtZTQta0hxWE95S3hLMW9tN3hzTWlHY3FCSGdidkR1ZzVCTjhMX0k5bUJIYjVtTXJ5cFVpQXpVNmpkNlhyMjRpdFNpR2pyNExnRTM1bmctVzJFY1B6blFvTk1BT0tLczEzamxGRXd2LTV1QVgtRXVPbzF3Y3JSd1FWVHVOaTNTV2xDeThyV1FFQVViUENOdE5uWl9VUEVyeWJISnRBeTdmNDF4bmtwNmZBTUhmOE1Uc0wtcURZSFF0Szk3Q0c0VDJyekc2eXJPYUx3N2lodkdsXzZuVFVmaGZKR29CcmxXakhZbzc5cDNka0JHU3NJQXdFUG5JWXdNMXNIOFlMbDEwVDdGUm5RNk5SbFBzVUpoM205b3p6SzJiMFdIa1ZtS1BSbFU0eHFMMUl0Qm1DNlNldlplSmh3YXh6dlMtYkQwRUY3UDhQWEJta1BTX3BDS1F0VjEwaWNOTTZ2UmZvQU4xR1pKa01hZG5rTGEwUGJjcmVYQXo0SE5jcVJrYVpmaTBWZlBiXzNuYnh4WmZFSGlySUp6WU9jbVZaVEhTOUE3WW1FZXl6ZV85Q2YzeTVDc25DUTJpX3BMSHg1aUR5RTI1ZVVJbHUzWWRIbkxCRHVQcHYtcGhtUVR6Z1g1dU9KSlZ1bFlJWFZXazlaNDhJWG41cFBpYzFFa0FUbGVxNDBrbzNISkJYclpaQjBxYWZfVDhzUUNzd1p0UWw2SS1Gcjdfa3FidjNPc3M3a1hLa2NPdFVEbXhZOHFEUFBvcGRyTlQ3eGx1MzBENDdlaGhUcUtQdkJscnk0VUZMUWtndHp1RUR4QWlHOTg5cUxrN2I5UnVTekFSQVItVXhTV0pJWVIzcHYzVkJnYUQ0T0FpRzI2WVNJRHJndFFIYklHSzA3YzFDNjg3V29Id1YwWGh0cF9TZVlySXp2TWVYbjZDX0hTd0k2WVoyUkQxcWdMZl9HMnNlRVdnZnkxN3pSOXlzR3h3RTZuSVU2S2F6VGNGTjM2MnpaYUg0ZG8xTGVaWUZ6RjBHQ0lBOUFpb2FUZjRWaTVSS2xTcWNkTHlhYzdIU0FXMS01ckpLUFVQRk5icG9ZUGwwOE0yb29QOFhua1dLdkhjZktJM0doUTFDVHhEdTV1b3pTTENHRWd6aTdtQWgtNGFTY2ZsckZFOER6ZzJxSlBvRkpjalJiYWFmd3l0LTROam96em5mQjRxUG5abk94UTcxUmF4QkZZZVUwREIwbHdGMXJCRDFhUDBlaFBtYzNoenI5cng3eEFJNjFjeXlaVzlyZkN4T0RVMldkY2RaZnlkOXFLSHB6bUlBNC1nOV9nSTExU3R4UVZvdUpaejNkMjY1RnRPZFZNdk1XdHp0LXhBQjRJOEJMblhrSVFCNlA0WWwzRi1ybWlRM3YwclotVTd5LUd6Vkh1RjVRZDhDQXNXeXhNNmFxLWRVdFRVMExETVVVRmJTLU9fV2V0a2Vya3MwVEhCZi1DR0h3NmstY3lacW9HdldPUUZndkc0WTRtT21TVng0QW1rdGRoMkFUWGJzOGF1VGpGalZISzBLZVl2dGZ0MUNOVUdfeWx2OWNzdzVwOHhsbzQtR3JqUnpqTEVaU0JCSTY5a0d0NXdfRFZLX2d2S1NieVpuZ3hzcTVLandlMUJNbDQzUnNvdVUxY202Q2dHLUxlQ0d1SjFEOHFCaE0yZzdaemY2LW5FTkR6d1N5SkdlaDBXSzk1ZUZvcW1uTG9WUEhTeWdrMHN0ZVF1SnRmTDNYd1lEYkhWdU94LWZqNl9BdTFZQVY4STZWVzBpN3N0c0ZLVElsWm1iaWhFVEE2bWpaMWZBeXdDSHVxUjJiWVdiQmpsRUlrYlhEQ19yUXgyMENsY1F6dllRTGFjM09mT1F6RGRKNzBvcHhHTFZ1b0huN1JLZGVvSFpub0ZqUkg0dzh3VDYzajYtWDNIbWcyMS1IUkdNVFk2SlVmYmNGTHI3TGE3aFQzM2JYc3p6OTE1SDZ0ZWxOTDJkdnNEUHljVVRMd1g4WDl6NHZ3cEJxdmZvaURIeXJ6ZGNmem1MdHVtM3lBOWZPLTBETXFRYUlVYUdpMUhUcU0tNlhXT2FnanlZT29QbVRIVHN4TVNveENWU2ZCWVFSdnZtRk5zMEJVR0pDZTRRVW54MzZlNnJ5RmxYM29QcGdsVHhDZlkyTWhoTFhraDhZbjE2V01oa0p5X2t3NDlTQXk2Q09KMThkanVKeHJ5MnAzRzltaTFMdEFlQnRhYUQ5ZlFQdVNJMG93YkljTjZaTnk4ejBiSFVxWVdNQ1Bic0pOc0YyLWQyeHFfU3JpTXJpNXJySmlmdzEzY3d1SWNPOUc2QUw4cEI4OG9ySlk3cGVBbVpyV0UtODR2bzNRLlVuTC1UMnc3Q0YyQkQ5eUxmcmdSazd6cWhVR3RRME1JSUktSE5oaDYxRlU"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2","attributes":{"enabled":true,"created":1613504570,"updated":1613504570,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '1db71472-1996-417c-b0ff-3375f4e6dc2d',
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
  'Tue, 16 Feb 2021 19:43:07 GMT',
  'Content-Length',
  '284'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1613504587,"scheduledPurgeDate":1614109387,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2","attributes":{"enabled":true,"created":1613504570,"updated":1613504570,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ba328029-a6e0-4a1c-ad2d-e8d8583b83c1',
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
  'Tue, 16 Feb 2021 19:43:07 GMT',
  'Content-Length',
  '464'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '82b7eb30-2631-42ac-83f8-6418eabecd57',
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
  'Tue, 16 Feb 2021 19:43:07 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b0454ab2-8bc4-4c15-9716-c5dab5c24796',
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
  'Tue, 16 Feb 2021 19:43:07 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '407ad841-cc4f-4e90-b0f1-bb52c704e144',
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
  'Tue, 16 Feb 2021 19:43:09 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5823598d-4a6c-43e4-9c2a-a58ac6cf33c3',
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
  'Tue, 16 Feb 2021 19:43:11 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0b82fe20-72be-4587-b965-366dc2cab847',
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
  'Tue, 16 Feb 2021 19:43:13 GMT'
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
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1925992c-f133-4364-8f96-66b205713543',
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
  'Tue, 16 Feb 2021 19:43:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1613504587,"scheduledPurgeDate":1614109387,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/64499136d36f40b69bc93132610493f2","attributes":{"enabled":true,"created":1613504570,"updated":1613504570,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '34566b0a-4fcc-4117-9e3c-25eb03847cee',
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
  'Tue, 16 Feb 2021 19:43:16 GMT',
  'Content-Length',
  '464'
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
  'westus2',
  'x-ms-request-id',
  'aebd99ed-fc1f-4ff2-8e99-df1db1959d6a',
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
