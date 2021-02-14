let nock = require('nock');

module.exports.hash = "3036d48fd4d60343c94d8d13197601e0";

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
  '2d8460e5-dd62-401d-9679-f12d203f5ade',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT'
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
  '30a25477-f449-43cf-8d7b-ec3b5d014a00',
  'x-ms-ests-server',
  '2.1.10963.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmSBXbEyAAZLigR0reepjlc_aSJHAQAAAGXS0NYOAAAA; expires=Sat, 19-Sep-2020 20:21:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a","attributes":{"enabled":true,"created":1597954918,"updated":1597954918,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '3db5977a-a36b-4b9a-a194-8056ad81e55b',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT',
  'Content-Length',
  '298'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canrestoreasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"}, [
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
  '21032355-2963-4cd9-ab9d-657af2cce793',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT',
  'Content-Length',
  '8022'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1597954918,"scheduledPurgeDate":1605730918,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a","attributes":{"enabled":true,"created":1597954918,"updated":1597954918,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '49d414dd-467f-4938-bcab-4430ee24d97f',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT',
  'Content-Length',
  '473'
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
  'westus',
  'x-ms-request-id',
  '50f2407b-0ae8-4662-9928-6c5b7f696a6a',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT'
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
  'westus',
  'x-ms-request-id',
  'c4269a49-d447-46f2-a163-f9a6fdbad8d4',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:21:58 GMT'
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
  'westus',
  'x-ms-request-id',
  'b1e2e3d7-9e3e-489d-a702-e3eb401d5bd7',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:00 GMT'
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
  'westus',
  'x-ms-request-id',
  '6a816305-3e06-432d-a215-359f9770f940',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:02 GMT'
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
  'westus',
  'x-ms-request-id',
  '66cc21ce-123e-42d4-bd73-b91e51a55b31',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:04 GMT'
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
  'westus',
  'x-ms-request-id',
  '2560857e-405a-4c87-9e97-c331ce2b5c9d',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:06 GMT'
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
  'westus',
  'x-ms-request-id',
  '2097b4f5-81b8-45bd-ae02-733a3f38a44d',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1597954918,"scheduledPurgeDate":1605730918,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a","attributes":{"enabled":true,"created":1597954918,"updated":1597954918,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'fb5378b7-0e7c-4723-8450-b988c3aff0a9',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:10 GMT',
  'Content-Length',
  '473'
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
  'c24b33b5-8b3a-447b-aa31-954b1f8c960c',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '11287b98-6974-4c78-b31a-1e2d45121514',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0cfb8c74-68d8-4cca-949b-77cd46f5a054',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '97fe1c61-f93e-4119-a496-a821c1479bb8',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9c8528f0-d2d3-40e3-adce-d0658de5ef21',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '38f45fa8-74cb-4357-8e8d-ec71f5cc0802',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b5e9da40-38b2-4bf9-9d3f-4803758f306d',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '632cc9c3-6b7a-4312-9828-ae8ba24de7a6',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02a29955-566c-451b-abeb-6a72b2144623',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring secret https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a - secret already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f539cd9a-98fc-4c04-9c28-044e2cdcfc71',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V5TlRaRFFrTXRTRk0xTVRJaWZRLnBIeHRlanBfbnFzbjNpWHdnNTBGMDZrOWxvMERUN0NKQ3NjWC1vdU40ZDVEcUNoWXAzYW01djdyNGxJSk1LMDBoZHdEdVlhOEQ3ZEFZdU94dVRzMDFvMEpJRzEyUl8yYzNzc0swU2Y1dkdCalE5a3hNX3hreWVrME9UdGxNdVVQSmw2dFIxYkdWNloxcTdNR2NZc0tOSWUyNzRjSzUwNWxFb0hiOTBjRkg2Q3ZKZHZLVnBObi1wVU8wZENLc05wZ1BUb09vZ2NIeWlhQkdKS2hUTjgweHdOclFtUHVtNjJRZktDb255V0NXUEZzUkNDQlVxVGJIb3JoNUVJSjVtRVJkaS1ZeDFqbkhEY21OVThxRHNJVTYwLVVBZWhyb1h4T2Q0SlllVmFwTWhKckFwZDRQYnc3bW9EcFhLOXlycjYySk44SU9taXF1MnRIMzh5bFFWVjhZZy5qdVRvU0ZEb0dza1RYU3dQS2czX2dnLkNGOWd3Z2ppZ0g5WmxwUmxMQnUtZGVZNXJGU0syWms1UXRIUWlKU1M1bWROWFR6RGRMSF9HZU82YS1HZE1oQ2Y5TFBKQ19oV0pPOU9kSVU2WGtmQl9VMmtQOWhzd3Zwamk4T0diUFhqY0xCWWJLVmY0MWlHYm5IazdnMVNXUlBwOHU3XzM4dWZUWXZRZU1yMWRHcjdmVV9YSGVNRk5OZkpHbnZQU05FYWNzVTVFMWNtb2NvN2w2Y0g5enR5ZkpFRmxObkNtc2tlcW5ENGEyLXFPWC01VG9jR3p4MEczNVRxLXlXRE0ybzZYVkpjdVdiZnM4U3FQd0VieFJZdm9JdC12Vi1pSjY1ZDZxODMzN0R2VmpNSkQxSnlMbkJQeEtacU55c1Y2bmZ6YjR6d21Oc29BOTJKZnljZk04MWUxdHJGMFJvTl9kVF8zbUt1VGlSLVdkNGpiZUlVdjU0aXRROXpWNXFSeXNFTlAwa2ExdVQweDcyQWJCRlJNdzBURFByTWZ5UEZMVWl0aU10NlN5TWRWY3ZGRG5zcG1PTzRzVlJQN3I0aXgtMUdKSWw2QzlBc2IyTTA5YXdrMVJaZXA4MVZXTDZPeW13TzFiZW41QTZOWkdpTlhvdVJvdTFDVjhSNk54b0lValpBZlo3TUpaOVBrU1k0UFRtUjY3M2c3cG12dExGRVN3S3J4cTRRZC1PTGxvaHZRS3BEUkZxRjNXOVg2WHg4Ui1Qa0RnRlRGQnJKMWFnQ3pLQXhjZTN6QUlrVGxPS09ycjRTTnRvMHpXNGFMbE1qUXRNajN0UEJHVnYyT0xYRGNFR25CM3g3bVN5endGTTdNc0N0bXpGaU56RmE4eWNhdXRiTkJyTUlxczhMVnBuaU9uM0ZvQmw4RF9Md1ZmamMxaWEzbTRLd0tFXzBudzA2WnUzekRLeUZUQ0xHQkpCWjFsV3YzcUpXWEFScGo5UmpkWmdEZnJKamhVWGoyVm55TTVyUG90eFRnb2RWRXg4MGFJWGxIQXlvZWo5NnlPSExFcml0Q0JLbHBKeTdYR0dsLXBZX05XNmJiVHJpcDM0dmRia3BRLWZHdmtNREJLamxhY2FHSVRWWjVvTVJfaXNpa2VqWHRZLXl1ZHVGY3p2Qi1tZy02bDFkdkl1amhMYVpBNjFSLWxsVktabVZhV1VhYTJQdGZFWXIwREpkWHlPWHlzc01HSFdnSVpZNGQ2Z1FsVVdPWDhneG1fUlBZMF9TTVhuVU1qUHAxdWo0cmQ1YUdZRXk5V2YxMnZyblc1cHRqN3BhMEZLU1prcVhiNmZpM1l3ejBHeVZMOEtidmpMUXJZOW90d0NxcWVqOXJBZHR0WTFsYW5UaUhHOEdRNXVyT3ctTkwwblN0NWs5WXhqTjZjam5ERFNDejh3RFNPNkdkRVl0TklkWUFrVEhlcThPb09QSDVDRV9FSDhpV0pDM3B1NnRhVU01TW9tNXF5RXgzNC1Zam5tY1AwZjltcGIyTnZwRThsdXRmZ2dvMW9iTlpEejBXV0liMGI2LUdHcDV6TjZwMW5sd3k4bTdBMzVtNk1uZFdwTXVGWXVIR24tWTBnVFBodzBNUFlSU2I5SGVyMnZXcnNoLWJiNm9GVlBHdVhnNnNBOXF1ZmZpblNEN2ZpR0ZVMWowMUxNd0xkQTNING1ZOGRKdGFyV3g5OEZ6czNHZEtIRlpwLUtQc2E2dVhxbWhPMVdIQVo5cmhGWWl6MHZFTDVsWFFjbGVZOFlsdkZGZ29uWUFvS3dzZjlybW53bU9hUERkdjF2ZVdzSV8tazM5U2tZVy1QVUw1UEQzeEZOcnJhSUJock1rSFZFZGIzbC1nbE9GQkw3NG5EX3R1LXZJMG5WMV9lRWZsOXJYeUM3eUFfWDliOTd1U3Zpb0NxYlBDQmdCSjBLOVRFeXVNVnBfUnA0THBhbjNnVjFOUXNqc2NSc3lqRGZSMjZzV2FwM0lmQVNLZnNxSERoZnVjSmNNREJ4bFBSLXFMSG02VzFPWmh2NUNBVmZrSTZpdHZscVpvdDZEalh3MWktd1FVcF9jcmJLWW1Cdk4tY3RPdTBuVWwzTk1zU3g0aXJhRWtlTXozX05YSXVQVGlmTTB1S2xvTVRyU25jcFM0NTFERnhWQ0JUS1lEcFVZOHhldnZoODJvYklQbzdMLXFxLVJudklCOEUzRzE5ekwyZHBETkZoZERHVGhsdmwxU2YxZXk0TkVsVlJ3RjZpd210WFhHYk9nbk5fZEcyN1Y4dVZHeC1LaFVzdEwzUHZXR0xzVnliRk8tVkJmc1I5b1pSTEJqcl84aFZWTm8zdmVxQkJ3a1lkRS1XcDVGN1RTa0h4RkhkQ1NRN3VGdC1jOTFFOHNTVWNBazRzTjZyRDFCNjdxSk5yUTI0ZjU4MFRUT0dmVzlTWm5lRnBFdHdjOWdrOEVHenlJZmZINVZiYmtUOERrRGpCV2FTdnRBWWtBeXBtMkJSS0M3cmNHbFo2cnNMMExwMm9yTEdtVmtURWd0SnpacFdOSUlqeUFOb0ZiZ29qdVFRczNRQzg4VGF3MTlTemN6WDZKaF9kaEgzS3hodFg5SnlRSkY3NWppaFBhN0dLVTJIUF80LWNlaC1oaXpiLUJOMkxUUVRCR0NEUDNJNzNGVlZxejBxbmZFdVVSSzF2c2RYUDVWRjZHOVA2dTlQNlVscVBMUmIyLXpxaWo2Tk1WVm9Fblg3TzFJdXo4LW9BZW1OSzNxZmNfRXpCUS11WGdjTUZlMDE0UWM1TVg2dDBySHBDdk9Hd1dyYWZTdmNDWld4TEp1bGk2c2pyejBpNGdOYV9WQjdKWjl0QmlOMHdqd3dBQmVyVDVKaVRhaWRtdC13VlI0dDRjcmZGZDQ1ZEYycWdDR0JPUWdMd2lFMy11d3pZT0hoZ1R5TS02ZVVCUm4zVWk2R2xrdW80MXk2UDg3N1M3dE45SWZnLWtVa1hwaVBOcXRyODYwMjFuWF8xUGplVlVQT3BiRy13TzgxbGg5aHc0eWNjeDBITHIzTWZ1c2tMWlhLYjdnQjZ1M1lvMFBoWEJOZWU2SkswT0FsNVNvRk9TNDVGRWNpWGpwc1dZQ05pNXlnaUt5RmtQRXhWQmhITnNXcWZUTkpHSllETVpkR0NBTlYtRmNONzB5WE5QNnJWUnZOUHBCaTJzUDZVSE1JT3dPemJHOGx1XzNuNldSWW5mdm80T1NCS0FBY09UN0pIcFdhTnlRMjU0NllJRWhYQl9DcWtCb1NsSk9LZnVRTks4M3V1clRqU2hEZWJJU21XWm5fcS1tWXFsUEFBSy1RVFlibzZLQjRsamdFamQ2YWJFdjVDSGVwelFkaEJESGR6VGZTM2ROeHV5a0QzRG1aRmMxTTZUaFBqYTgza3lya2NGTkxUMFFMUU1HWWM3bU84VVcwdXNCMm1GUEE3elpZZlZPeXlGSThEYlFuWFQ1ZzB3UE5kTlhrVlJqUy1JVlB5cFF4SUc2X20wTjlCSWRWT2RzQzl6TG01ZVlIWDR5aWQybFZibU9KN3NNZEJlc1F4VlFNam5PZUdxTlg5V0VsUEEzaVdydEEtbVBZb2ZxZ0NiZEdlY2dTdF9HaGE4N0N1YVVKNnI5a09INzBDS1p2VjJSUTRtXzAyS0x4dF9DOTUweU5Fd2pwc2tkYkpMMm5iUjVycTFHWERLR09uRXZzWGNCYWdVQl94NGhqVDRNSkp5QklVN2VSWkIzQ2g4QnB1RkFHWkh5bmIyNnBZYXl6cFFLYnJ2dVFtbS1sOU10QTdQbGtnYllwbHk1RHllLV9MZVVKZWlCRFJVZ090NERwY19VeXVZT0ozQTlFdWR3X2JpM0tMV0piNUo4eEtlczd5UlF6VV9jNWdjSU1sdHlOcklldUpfWmRsTktSc05mVG5TbmJlUjJzXzl2MTdOLWJjU1pEeU1TLTJSOTlwRjlvMWlkeUVMMHF3N2lyRkl1MU9CXzQtcndyTTF4eDRUcDhGUkpJWkNqODl5YmsxV0J5YjlsTXl2ZS1neHpCZnlSRUtZODd5RGhLM08zTDVnTHBsbDcwdEZab0VjZGdvcjBPTF9TX1J2aFdOd1pjaUxaMnRIYnBqX0lpSEpqS1lEZDZlTEpLcTJaQTU1aGJOZWcxWUZsZlI4c2xhNFJua2V2SFp2Zk9GWF9IVDVGY2tnSjRqUmFBN3RLRkRqQU5FNFJIRTdqR04tbHZHTHFYZHppVVQ2a18yUzBCNkVJWjVRa1VKMXlnUEs4dnYwT0IweEJOMHctNkpOTDZib0RKNTQ3bS1ra3ZvTHZmTDlGZVp3TjZpMEZHejBiYmlDZHFhYWFMVmd2VUxYdndxVS1DTU9pRTZoUkdrWVNTZXFlMmM5SXF2aG5Dc05lejRQLTRoWE0yV3hHYWVxOVMxaEFPcnk2cW1YN0lnYktvY0lFcDdwRC1nOHBaZFZpMFl1WTNiZEI4Vkt4aXhhWTAtekVnOFYxRjBWYmsxRF83U2dRTTIyMDhFNlFnSWljdU5Ya1JtNERlMnZGakVHamZsdk0wOGVuSks1TFZMVmFueDRTV0N0eDVobnVnbG9vaFUxU3F6S3o4VENFZnNTejdtMlBhZFBrUFZXazVlalYtbmhMdDRrcS1ZUHE5VVFzUHVaMkY1SkxYLWUwRHFWdjdhYXloa2JGYkI0czZFWjZFRUdscERES0xMMUZzR1NaX01IWl9tanFvLWhTT1lSZnJvSklHYjNiV1RrU2F0TWZvSmJjNmd2Rm8teW1MXzlsbGVwSU5JbjZPR0hacWp2Zm1EWThvdy03X0VDVjlHeC02cnZuWnV6dzRta204dHVrUEdqa3dxY0M5ZVF4RGVBU3RrUzdHRFJOYnRUVkRzUnVtOUVMUzJDYzlQaHIteWtLZ01VV3JGTHhDUk1JOWlOc0o1SUtNN3N3ZnhPdjBWR1dkeDY5ejRMbTNQU1dMdldTUF9VQ19nU2NRVEplOVhvQ1Z3V1FJd2pqcEUzalhPYTNjRFAxYTFRMTlSdHJWUk1jaS1EUDlmV0kzblQxV19QbkIxNTY2OE56NTJzMldWZTc3b0pIT3dHekVxZHZ1bnlPV1FPem4yUm9wZm1mczQwREcyUUJkdi11Wkt2QmREU2RfQ2M2cElYSEtTSmQ5Y1NJLTYzRG9aa1N5SkFrSFBJdDl2d1dHZEVJZ2U1dmRpaWxybmxiNTNYS2Jwbm9CMzJDaTBfRm03UVMyeF91bVAydkxDRnZEcGdBMmdTMkhuT0VuSEdyNTU2QWlWR19VT01STG1OOVdjMjFPbGxjNFhMYjhwR2Z6OW5uYXlYM3AyVFk1UndpZ3pGTms2allEeDdRRzhaSE8xdmFCMGxtV1ZSUm56VE1RdHZiTGdNVFJ3RHUxVDVCWWpnM2FDSGdtbk04cGRaV0FfcDNVdDB4U3B4cF81eVRkemVxaUV6MUZscmVTcllsOUFUMkh5OHpfT0tEbzVnbEpMYlVlalhma250S2NzT3djRk11WERGWHJ5RDF0bE9SN25QeTB6T1dmX0oycDdXR0pDTzVXTnFzeWthZEZNWE1qVDhWR3o1ZUR6Y2xoRU4zWV9rakRrQjVLMjluN09sR21SNk9vV19CNGRqdkdOTERTTUZDVDJBeUN5NFJCd2U3RXlRTV9YVFlNTVpaeUoxSlR0S1REcklKQWVTZTJBQk1hS3dac1lLTkdvYm85eHpaQTBQczlwVDY3U04tNHFTM185UDJGaTJ6YW4xSzNoZUZyaTQyTUNmbU1DYTljNkJFM0JuNk5Md0JzVUlmSWc4QXVwa2dRN01VaHkxM0JBbjNlS0dkVk15WmptWDd2WUxWVzdsR3VxcnZNYVBha2FobkozaDVBYUhfMk01cU52NkM3VXlZN0VtUDNvSGVyT0M4dTdtRUwzRHVXODlsdm4wYnJMOUxnMkhxX0lSTU5xNDFjNWdjb3llUUVHMFExa1lvS1BCWS10TnNiOVdxU25FbkdRWUE5WksyaHNXcE1oU21Pck9manJEbW9NbVR5SUhTYnlwUXhTcXlZS2F2OXlUOFRWM0ZtNkdmSy1wX0lXQ3FERzJ4c3FWV3VHUFpLNkhIWDlYYmFvSGlxRE5IMDNMTmhtZFBlVVotdGtmdTRIRDhkbWp6SmJlVFUzUTI5elNrZVNLNTUxYkJBVU84QmI5V0JQbnBLV01MTlhDUmhPWW9CU29VblhUQW5yVG5sNTdfam83TzVQNEQ4bGktT1JiTWxKLTZ1LV85Zk5NU204Ri1mYW1zTnNjRjE3M21HVzAtSG9GSXRpM0JvNThMYXZ0Y3IwdUJjQ0ItLW1KQkdBYWFzUlplY2RNVnY0VWpFVk1kUk05bVRTd0lFZTRGNXA0M1NPRFRscGI5UGV2TGdxRHZJalo3aVM3NHczams1dWh4VVRxU3VGd29rWEpLaldMT0l0NjA3NERrSjRfT0hBNEVBSFdTRzV4bHhVelFxNUZCamU2WnZNNjNLYzlPTlVhelRRVFFVM1plT1pqU2M2V0NMSElHd1RQRWx2U1BqLXRVaUxJT09WZmstTERvOEVMQlUzREhNblRWcjJPRXdkYzlkMkVHWTA2SnVyX3RzWWljaHM3QWtYU1hreTRXN1hub2o5ZnZvYnh0ZHVLMTgtejJMdVNTZHBDd1pUTVNzOGdIR2h4ekFjUUVLSENTNXRTbzlNTlFBWm1DSUdCMTBPOWpOTDRZWXNzQlBFRko3U1E4clhvb3JLOGFLLXNVYkpkLVVBOVNVVWppVUdZbERaWFAyTGZJUG5rZnBaWjUtN2FoRTBTQjl0aVo2SWQxbkNpVnZRVDhhQ0xsZndUQ0dYaklfQ3NuTDVVdEQ3MzI5T0ZQcE5RdEg0UFZWYnJCS1AwekpBamdrT0tGTzdhbVhYMDFKTUlvMVdaMXU4X241Q2N2VGR3engtUWNLd0xrRV9aZUVXdm4xQ2dIWG9PZUZEVEIwVXVrcXVEWEl4WXhOUlV1TUZITWNkOEpNdER1eGs3TFBHVURObjNHbTJxNzVFVDlDM2NsaHV1UEVVX2RZMXVRZWdNSVptcEZoVkNOcXdQcHlzc0E5SVhWQ0xfckI3eTZoejU2UHpZNzBlcWlHdG5yOTJ2TGVObzk2aVdjZjdzdk54Y25GQXRoTDY2MlRvQWthWVpPSzdfVmZFYmtsWnFyNHZEX2pXYWVteF9IckItV0JOeV9TaDk4RnB5cFdvY01zZ0pvT2o4WUcwWDFub2YuWGVwRWFLUTVwdXU5QzRWZHFmXy13LVd1Y1NIN0NZckQ0QmNNSEhXT1RmRQ"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a","attributes":{"enabled":true,"created":1597954918,"updated":1597954918,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b337e1ed-2f96-41d4-909f-4154c9fe95bb',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:27 GMT',
  'Content-Length',
  '284'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1597954948,"scheduledPurgeDate":1605730948,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a","attributes":{"enabled":true,"created":1597954918,"updated":1597954918,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'eb21857d-af4a-4c1d-9ca8-0c70effbca22',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:27 GMT',
  'Content-Length',
  '473'
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
  'westus',
  'x-ms-request-id',
  '2f2c538d-8c3d-4e90-a40e-852b70a02fad',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:27 GMT'
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
  'westus',
  'x-ms-request-id',
  '70defb21-a3e0-4ad6-80c8-17f722103e26',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:27 GMT'
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
  'westus',
  'x-ms-request-id',
  'cdb1b628-1d04-4bb9-97b3-85629b7a994c',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:29 GMT'
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
  'westus',
  'x-ms-request-id',
  'e52a542a-f3bb-4bd2-b6de-06c7f5c04ba9',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:32 GMT'
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
  'westus',
  'x-ms-request-id',
  '25ed0baf-25a1-4970-96ef-3335653c1a8b',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:34 GMT'
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
  'westus',
  'x-ms-request-id',
  '7ef92693-380a-46ca-a3bf-f908b354700b',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:36 GMT'
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
  'westus',
  'x-ms-request-id',
  '8058562b-9b10-41ae-9085-6117b9f75a55',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:38 GMT'
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
  'westus',
  'x-ms-request-id',
  '0a11d2c8-e7a0-45af-87a7-26e88e1e9521',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:40 GMT'
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
  'westus',
  'x-ms-request-id',
  '86da1d6f-a136-4f95-b12a-03bf1d06e14d',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:42 GMT'
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
  'westus',
  'x-ms-request-id',
  '4f68667f-42ef-49eb-b2ab-8363596b0fdd',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:44 GMT'
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
  'westus',
  'x-ms-request-id',
  'dca664ad-254d-4c74-b11c-51effa591e3e',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:45 GMT'
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
  'westus',
  'x-ms-request-id',
  '27dc5b1e-7cb6-4c87-92df-523c04f4655c',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:48 GMT'
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
  'westus',
  'x-ms-request-id',
  '60b68942-193a-47a5-86fb-0f8c4a19ef84',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:50 GMT'
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
  'westus',
  'x-ms-request-id',
  '3ce2ae07-2688-4718-ae96-ba8f5b6aea3a',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1597954948,"scheduledPurgeDate":1605730948,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/ca7cae354ad7442a963eb5eb07ccd61a","attributes":{"enabled":true,"created":1597954918,"updated":1597954918,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f7bd2730-d07d-480a-b68e-54a4613b4574',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:54 GMT',
  'Content-Length',
  '473'
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
  '8be188aa-19f2-4873-ace8-896473b92d99',
  'x-ms-keyvault-service-version',
  '1.1.31.4',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.247.252.149;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 20 Aug 2020 20:22:54 GMT'
]);
