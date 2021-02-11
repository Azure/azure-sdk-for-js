let nock = require('nock');

module.exports.hash = "a52cc920254fc48126d48b8e90979c0b";

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
  'westus',
  'x-ms-request-id',
  '3fa8effe-d7ce-471e-a5ef-2e7194dd03a2',
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
  'Thu, 25 Jun 2020 12:04:48 GMT'
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
  '39d9e72f-586b-43fe-becf-262d2ae31101',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aka1TFxy5wZCnTgPOfHUaPk_aSJHAQAAAOCJhtYOAAAA; expires=Sat, 25-Jul-2020 12:04:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:04:49 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/a6bb27d7e6b849e6b210019fd018d2d4","attributes":{"enabled":true,"created":1593086689,"updated":1593086689,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '6e4316e8-c390-4d73-b0c6-f7c32041b3a4',
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
  'Thu, 25 Jun 2020 12:04:49 GMT',
  'Content-Length',
  '297'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canbackupasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnF4Z2pGRjNjZnNRRDEzOGstQ3NGdDdkWGFnT2NUUkZISzMzNFRBRTVmQnBpWVNrWkhHaHB1SHFtRjVzN0JLUDFfcGFWOEI2SjE4UVJSMkotbk1hUndsdzZybXBzS3NSa25CSVh0U2twbkdwRlZrMkF6NjNMRnIyZWpraHZ5bGlMNDFrSjBpUnp1dG9zS0locDNvX0pOQXVKcHJnS2dzS1M5SHRIeW1TRTA2c25SMk1hYzNScS1ONUVsb0JFWVZ1a3B0VzlZVnJoQUtrclBhdjN0WFJvS3I4a2FCTVRYZ1A0NUNIS19Dc25vSHRGOWY4eDA4LVJMVWxQdmZtOEtFY2ZXMG5LeDJXMkxMV0djVnBqZVZBbG9sU215UFpNM0JNWFNrQ0MwenF4OTl6cE1aclh3VXYxejdpcTB5Q3VGa250WWtNaXZybU0wNGFKd2dhSXlyR1NjZy5QUnlfaGVwdmdXcW1xRUNQZXdmMUpnLjdXMzRxYnpSOWRVbnk5aG1ZYmRkRk1kcnNjd1BNXzhUSkdlVWpLR1MzVVpxMlNaZnBjOTRva0hfaENLUk9NVGVQeUt3VW1CWGRHeXRsS0RUdlJ0OXZhOTNDeXdJMVEzQ2hKR3ZXc2V6Yk9zbUprOXp3WEhiUGJFYUpQeGh0aFdKNGhYYTM2QkdEM2p0SjIwR2VQUl9PVzVOYTkxbDB6YUN2YV81NUhZaFJaSXZVNVViZmhHZEk4anotMjl3bk1hUms5cjFCMUJLbkVUeWhfdF9KYjFIY2dheHNYUHhnVW1mMVRnR2t0WHVjU0dRa2RpYXlxT056RjVwWHR1VnNmYnpwSnNKal84VEkzMWZzM2t4MElJMlN3MGZ1RE1mUjVCY012d0pONUtYRGdWdHlHREVMUFRFTDlVUWt4T2gycHVFaUxnbDBqWXhJY2szbWR1RFpUNzhQQ05pZ3Q1YXVWMWJTMnp0R1JmZy01UnJVTWw1MTduQkxwQjRfZ3dsR2lPdGtVM09RUkZCc2pFeVVWT2M0aVRUeFRZSE9semRid3dJVVdoNnVuTkNpZzl5N29LbE9MeTVmRTN6VmZVRWdaUS1CUURNWEoxZVNTcVotYkktZ0RMZ2ZObEUwRFZ2d1ZCbmdiTzdsMkZpbmhQUGxYQTlCLWdxc09uai11eHJmSy1hbUF3c2Jnb1ozSTNXN01SVmlQOEdlZ09LdHpyMjlBZFNiTjZSd3pUNkZ4Q0dEUTNmOXdiTGxHRVNsLWJPRV9GTTBpd19BdWhHWGlFNnV0QTFnaUJDOG11YnhQcGxVYXIxLVVUaXR2bjg4ZFZraEpPMk4yQmE4dVJLNG1FNGxKVEd0MjdaU2ZMaE1nY2ZmWFNoaFJDQ3hCLVBzTmRvUXhPdnM5aEVCd3hiZm9IQXNDSFJZdGlUaFN5MUl4LUs5dmhkb2p2TUx6VzFENVhEOThSbEo2Zmd1U1BjYWhxazAyMEZMZUpaa09vdWxnc2tkT05nWmFuQ3g3b3R5ekU2X3JRYWpnMURJSDViNlZKbVZpQ0ZUbi1OWUpHTlRrRXpQYUZoNlhaZE8yUlRCVUd5cVZxbjg0MjNnREcwQWxTajNSZWtaZGZEQWdpNGhSNnZzMnd2eGN3dW5TQ2ZIa1JzQTVJemlrRUd4NVVUWDhnUGxTS2lDOW1uYU11ZUZHOF83bTFJR0cxbjFVTkNYMk1VX21KLVJyV1pfd2R3VE13SkpKVFRqdUNlbERpdXVPS19GRkxqYnBfb2pMU2V1UVRoZGlYZXMxMFhUcl9ENEpxS0k0U1NvMkhxYUtnMnd3ZzljNmYzaWQ3NHRHNEJGZVlCQU5SYXhtV0pFT29VdkltREFRUkVWdVc5clJmZTFoQ0p5dU96SkxXdXpXOXdYQi05WFczdk9qNjQxN25CY0NNWGVDcWpPaVhwUHNCRmVHY2tjWnN5YVNPekdrN21EVzhnclBjS2d2WG9GdnNqQjZya0p2SUZmOHUxYTRGT0hmVHltczkxUEZ2anNHM3RkazlNSjhFZWQ5TmhITERJcVBUOWxkTVI0TTRqVjZTM2I0SVdwR1hyOXpydUstWXZyMUZFeWRUZGY5N3FTSldYcE1hR05JdXVEc0NNakFJUWZ1Ql84ZXdsSnVfZ2lmeUYzVWdTREFvUHdkSGdtcGFRdGozZnJ3blBBZWlMUGZkbzJGaS1rVm1iMDMtVndabkpwQ3Q5bjFMcXRxT2ZfWTB0OW9yWjR4bksyTkVjU3ZzY25CbVlYOUgtOXN2bF9md1ZETm9WM1pDOWt3dmlCVFZsakwyckxPX09QdkdCVTlVQ3J0S2pDZk5xa2FIN3NTR2d2dTZTSmVtTDFRMU5zd1RDemljWWpqNG91LUE1NEFtN0YwM214TnY3NjFXeXNMOE94emlqa2ZyRFljZmRIWW8tQjZYOEdkNUJNWjhYRElWQUwtMWN2T1VyWVhRUElic3dleFNETmF2cVI2ZnJwNGFDRm9pZTUyTGp2Q2hyanZwTFFZT08xbV9LNXN3ZzZOaW0xemp5UEJtTzIwb01HMW5QMWJjdTdLRHVUX0VBWTZ0dllBSXdtRjVvQzczUlltSDFCY2Y0VXdSTUpWbTJIV2UwNDdBX2RNSF9sc0dIU2hOZHJuaGRkYlJrVS1Sel9paUc0S3RheldlRl9RaUZlUVlpVzJsUEdLUW04d0JBNVhRU0NzSzJjbjd6ZzcyTEVRSzhXRkthaXpBV1hFNGtvaEU3aGNvdFVMNk5INVl2bXlyZDVQMkFIOXJIOXg4UEdWR1Q4SmFIeFZlWGFCcHFEMDFlYkY0RjJDalIxR1FOTnVhNzNpdS1YbzJ3cXE1WXVkbUg0VzVPdE9FaDMtUkRkMVJqZlBxMm1OUHQzQVFQbzZLV0Y1eDRfbFJjWlpHa2t3SVNfQUNsbjFjclFuY00wcW0xbFhzM0VlUTZRcnQwOVd6azNzWGxsOVZNa0N6SjdrenV2cTdyN3E0cXhVQVhBVFctZGYzc1lPSzVDSzNaNGw0VDZ6bGNNd1lTME5kSGM0NUI2c0tmYzlZRy1FeFpOb3BKd2hLZDdKc2JmQ0ZjM3Z4bXR5UHJxTjVmVjN2UHN5ckFGLUh4RjBjbFZZNlNnSUlqMy10WElkd01yc0xCQ0hPYmtoeERjUmUtV3JBbzRkcDdFUG4wN3hpUEkzS242U1YzUnl4c1VzWUppLUVRMTRrWkxsc1NkMnliU2Q4cjdIOFFaSW96LTlMN0F0YTVadVVCNWFYdXRfdmxlSExtaERQd2ZHTENSdE11WTZJZFVReDRmZ3FudGluTzk0SkphVC0yajNBUEpTSWJVR0lSZm9mMnJ3b0lkV3dFazU0QzQ4RzhJOFRXaDNadkJKRzZvUWd2QVJrRHpSRzJEbFZzcFVUenhCTGNSeDI5em50X0FWekxDU3dtTFJHaXZLei1OQ1NRb2hULXZ2Q2FmcE1DZndPeEhvRmcwMVJIdU9wX1NFLUY3c0dMZ1hSeVRlNnFCb1RCUUxKTDF5OFZUMUpPY0w5WDg3UkpPcjZEbzNYaEJNc3FTbU02NUNWVzRvbnZiWkpMdm1mYktPbzJia05RN3RBVUZDQno4V1V2WExtVzZxdzNWaHBUY3BRYkdQdWpPUDE1V0RQb1VfbW5FbVhjMUU3VTExVXV5VEZvZlZpb2tuV0ZYYWNWUVBOQXYzNXA0Zm5qRFRvQTlzMDFhY2Y0MmQ1U1A1VV9TQmY2MzZNQ3BkYWFlMUZFRnpOZkVqYkx1U0RPTGZlcmM4bi1BN3ZkMEtWOHJndHpEVEhzVkFCX1kxUnVyc3Y0Q2xxc1FLT0RrODVWWFVVUEVaUzdOTFFERWs4S3UzcG8wcHpuM0QxMWtTRm9Nd0hZclp6c0Jpc3NfWTl5eXpZai01c2FDWDJoaTdoWVppajQ2R2t6WHF6UlJVZVRwNGw1dHNqLXVlbzFQdXkxZ1JKUGJRcUJCNmJXQ2VzRUxoNnpNdVE5LVBkTkVlSDJVRy04VnkxTFRyX2xOcEpuTzZ0VEpjT1FIX29FM0VRZ2g2SkJpcVc0WVR4Y1pkdXZRUVl4OTRKUHRPbndMZ1BmQkZTM0JGQVJEckhEaFhWWjhWZGVXM3pCRFlGOV9HcEFsMnhCeEdoSWkwUkNUeGxmYVNvSXA1MUxXVVQwY3ZUV3FEcWYtdnpWbXJJUi0zYUlxUnhralhsVTBlQWR1WlBTNE5vSkZ3RGt2RnNLT1l2LVhOZ3dTVE9FZXJVNkd0VmxuUC1oTFhwOGZsZ0ZsZEUzckZVLWwwZDVORHdVNFdZZGQwU2ZjV05FYmhsRTJhZWZqblo3eEo1Umd6NGtuME9ybEllWlVvci1VTEttUmUzclpnX0pWZkNqNElYRU5UZmR3V3duU3RWZC1Ybk5QTWdOV204TlV0bTE0bzFiUG9QUTM1ZVBqM2xsb1Jab29FY3pKWlRqZDVUTUZKQjdaOGdwUUl2RDdFd1A4dmczUEhUb1hDYlMxMUhVVXV6NWFvRjdhNnNGbUszSkRxLXlCMWl1c19UcnduVi1DZzRnYmdpMldhb0VMTUtNaksxVlNhdHdWbWI0ZURaUTVjc2JMRW9CeHlHQTV5MEZnT1J4SUNFaHppUzczM0xwdWhaZUNORXlyNXdOb1B1SU90Y3dnS2ktNUJBNHJxeVAycUV6Q0FHd1IxM1JOZVFlM1AyX1ItTTJrbTFQdHZ1TnNHSFFMRktQLTRKX1pkTmFxc3FhZkp1ZktybXNVcG43R2tJSDFSUGJRX19KWVNlaVNHLXkwRHVGQWk3SjlRSnhBLXI0ZFBZNGdOY3F4bnkxbkJGbndrRU5meVF0QXpQNUJTcTh2MkR3VWVLY2xFbjMxdXA2Ml9LTHBjUS1mUVVVWGI5WEpIcjNlM1FGVWJkT29qc2RNYUNwS2YtU2tHNHFuTjRYclJSSGRSaVVZUmpuWW1HdHFFT3BlWEs1Y09jdk5wWWJ0ODJhREhqODBoVndIc2YzNmc0dUtDYi01VEptZmFENVNUNGpXdzRmZXVidmtfSDJqUlVqSElGUnZCaW5JZzRKSVpaNWFhQ21rcy11bjhnbE5JQm05UENVLUkxQ2dzRUtUM3VlcDI3Mlpjek51MlcxTDFYTEl1cXdEanJXd1I4ZUNZYTctVkNGaUo1eFBEVExNeHdnTHlSa3ZweTF2TTFIRGx2OEZXYTVadnFZX25WbzhHTDZKbUJSZVJZNkREOFpNem9FNHZLTExTOWtoS0RNSjdaSGdOVWJiUS1neVdpd1UtTVJkOFlrRTdwQjhDVi1oUHByN0Z1X1JmRUFESUtiUlhJdS1DdlpJNk5VbzNQSkdaTmtBOFlEemVkZGRId2szdjV2TGJNLUlxQmNKN1VNc0JiUHdUZEZOLTNkS09OckRudGNpYWFIMjlweVR6dTRJVnRsd2syZFdqZEQwZ0YxVWNVN2dFbkZOX3pPVFhhMlhGcjJ5Sk03cjJNVkstZGpCUE1LUk1zcDlub1l4WWdXdFR2Q1RoTWJqaDgxRTh0THZtVFNPX2toYXFQa3BIell0ZWlTczB6RERDV3NrRHlaa1NSdlJJcE84Snh4QVhSekpKUThZM3pvRWJyT1lHRDF0VS1RdUNOYURmaGgzNVNzdmFmd1ZRVVNmb2lEOVhybXpLamFnY01URmE4Y1FZRWxlcFNtZmlHdHFXZmpwRFIzM3NUSzBGQ3dhT0ZBaVhyTVpUeGdXQk10UWQ5ZVpXYU02Xzc1cXJlT3Z2eWdtaERUTE01Qjlyc3pubUV2TGxlTFhya0lWQzFZbE5wc1JWM0c0R1o5S0ZnN0FJSmNkMVlLSUVfNTAzQzdrNGRTaUlhYVB1cl9TaE1KNzBnMExPSkhxdEtJaFBIMmdYOTI5ckgySnF4TENyR3Q0OFBVT2Y1VWhYSnBJaFgwSkpzYVVMVmZNOWRscVBPd2c3RkVUMy02MmV6T1RPWnNnSVpoUVVPV3dXdVVka0hTOTdlcUVJdVB6dEpKOGZYSi1VVDd3VDNodTdQSmtOU1lrTHJmQXN2YnhPUWdrQW1jLUxHdWNuM25yNGd1S1FmcE1DQW1CNEN1YWg4OHp4RFI4RnkxMWpBUTAxUm5JZjc4Z3Q2UlBrT1dXOEdVb2dva3hmTXZWMnA3Q0NEWTRjY1lSUHllUDVTSFRyc0ozeEFlR2NIVzdfMWFGUWJIMXRHN0J3N3JaSnl0ZXljS1NMY1k3bHlGT01pQjdVMnZhVWE1N1QzLTNiMnVGTFp6Ymw1UWZLcmMxZVFkcG5paTExRDBLcW1lVzFsY1pkX1BKMlVWUVRmSmE3cUNfRDJDbVkweXkzc0cxR1RHa2lZTmZSWDZyMFUwNWEydGk1a2RPNGZfSmlIcVhua2lBZ2RnbExidC1YZmF3dk1SczI3akFBWkZEM0x3eWlFU2t3Zmc0Y2Z4V3p2dU1KU0xMWFMxLXVlcXRrb0t4ZTZoNmFnN3cyRzdLWExjMlR3dFdDNlg4eHBxTGRQNFluN0dwM2pxcWlFeFRpVTFTUDVNT2xPaHpwRjJyNUVjNnhIbUtvSzk4Mm0xTy1CSk5XTkRVYXpWaTN5M1lxNmlrUTgxV3F1TU1qOFlELVVYektPR2ZacDA0bXFzVnRYUy12YnYtVTZISTJiTFFDX1VWT2NUa3RXa1lBcXJlU3U5VUdXNFdnUFFaOGtWV213MjJDamtCcU1rcGhMal9STG45SmY5OE42OGdYNzg2VkdKUG13N0pqSFFrLWs0OTRQS09NZm81X1F2cXJXbk1oRGk5dDJsdDN4TGZOZkhNOGpkMmQ2dTR5d0pyU3V6REhJUWNIQ1hEMEEtQVE4S0dqNlI3dmFzTE5GWHI4WExDRkJUZlF1RWhYVDBEZUhKeUcxWndJWmNSaDZBWThtQUh2dkVndFVoQTlFZjVzWHdZM3Vpb3VYWVJDdk90QThiUUhjeVFkdzcyTGxTNkNNNUV2YmxkSk9PYkFDVWg1YjIzQ2hWYVN4QnBILXl4V04yci1fMHREbjlwT1NqN3AzTDZ2bzB1MEtLV2xhVXI1ZHUwNnpicnpHT3pTR3FBYW9DTHlWbU1acWVvQWJLQkh3ckc3eEkzX0pfQ0pRblZodFJMMmdhVDZxcG40a250cU4yel9xQjZLR3JaaWZjOEFhWHJuZkZxRklQZ3FOc0hBaGpYbGZ1SzR4cTdCWTBfSTMtbFJHOTdPMEZQdW1pZlgzTnVVRVVBSDJ0NUplV0xZZkVKd1EtSk4teC1wMV8xWVVoaUFkRkJuTXNsRFJPRmpHaUdQcWZnajdaUDhMY1NOa3FoQnRpQ2hmS2dkT0EtX2tFQ2kxcTlxcUZJd3huanlkWUxLT3kxUTlwOEc4SGw5Q1dkMS1JMDBzamc5Sm9obUN6QXNyMU1rb2ZHcG5ybW5zV2hQeE9Sc0VYOWw1cTRqWjM2WFBKUkpZT1ZrQzJhbGcuZkJCOEFWODhiLTczVWd4RVVueUxwZw"}, [
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
  'b780b1f9-63af-4549-9ff5-47948b1febe7',
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
  'Thu, 25 Jun 2020 12:04:49 GMT',
  'Content-Length',
  '7710'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1593086689,"scheduledPurgeDate":1600862689,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/a6bb27d7e6b849e6b210019fd018d2d4","attributes":{"enabled":true,"created":1593086689,"updated":1593086689,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '1bf0fe0a-ab15-4ad7-b0cd-4785bd99f12e',
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
  'Thu, 25 Jun 2020 12:04:49 GMT',
  'Content-Length',
  '471'
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
  'westus',
  'x-ms-request-id',
  'ac1799db-265d-423f-8d9b-cd59e45ecf58',
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
  'Thu, 25 Jun 2020 12:04:49 GMT'
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
  'westus',
  'x-ms-request-id',
  '56c32880-9edb-4d0d-ab13-ad3fa05e6486',
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
  'Thu, 25 Jun 2020 12:04:49 GMT'
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
  'westus',
  'x-ms-request-id',
  'a848bf23-5ad4-4574-a221-2342390137ef',
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
  'Thu, 25 Jun 2020 12:04:51 GMT'
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
  'westus',
  'x-ms-request-id',
  '024a7a28-85a3-4c48-89b7-7c9b4ab538ec',
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
  'Thu, 25 Jun 2020 12:04:54 GMT'
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
  'westus',
  'x-ms-request-id',
  '151c36f1-f224-420b-869d-c38c5a782827',
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
  'Thu, 25 Jun 2020 12:04:55 GMT'
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
  'westus',
  'x-ms-request-id',
  'df07181f-c5e0-42d0-a353-7d6ab9682e45',
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
  'Thu, 25 Jun 2020 12:04:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1593086689,"scheduledPurgeDate":1600862689,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/a6bb27d7e6b849e6b210019fd018d2d4","attributes":{"enabled":true,"created":1593086689,"updated":1593086689,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '1a49e56f-4b92-4b11-8948-f70fb3c77927',
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
  'Thu, 25 Jun 2020 12:05:00 GMT',
  'Content-Length',
  '471'
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
  'westus',
  'x-ms-request-id',
  'eb67a09e-5d73-4447-8765-be60d48ce8ea',
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
  'Thu, 25 Jun 2020 12:05:00 GMT'
]);
