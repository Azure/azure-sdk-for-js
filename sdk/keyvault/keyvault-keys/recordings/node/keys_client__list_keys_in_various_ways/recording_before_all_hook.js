let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangettheversionsofakey-/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c7f04cda-2fdd-44b5-b1ba-e0643489e24e',
=======
  '056672d1-a349-4e6b-8e8d-74a5c636f2bd',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:52 GMT',
=======
  'Fri, 02 Aug 2019 00:45:42 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '8a0e4296-d750-4e92-b013-4eab26ca2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHAQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:52 GMT; path=/; secure; HttpOnly',
=======
  '3b69f8cd-cfc4-4a68-8815-215d282b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHAQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:42 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:51 GMT',
=======
  'Fri, 02 Aug 2019 00:45:42 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangettheversionsofakey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakey-/5534a161cc984de69e8b102a2fa873ee","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"u_if1iE4nm4QNyPVqKkrPK_5ALkzw0QgIUO-CBIsbe_-xt9DFArwzO7EvsJxjMf3F3X3Z352h_o82GE39o_bse8ag9iZ4aE0muZbju6YaRVFu2tia3haPMKVqVAdNaLWoMY79052RzqTwpZ4tGOoGMCIXaNpg_LY18wL5ToZ7cQyHLKd3UI1HnY-fUcX_1KL2utqdw6HFXTMLXGr7yK37x8qpjzdHIFVx7jMGiTyAKPDiAvez4kWrqdTE3FmgNmHtzpV3I-g2d9FARf0RHUk2R57YsNqs2PFAwUPY_ldZcKt_kEPBvi2KHG9v5sBjvXJE9aoYGfreOYZ8IOJ6yLaGw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681672,"updated":1564681672,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakey-/91afea8dde594b14b5b6b337a74f9e7d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ocfDo4nGO5a5LO9Y0jMqp7ID0lsPFV6iIkGooxjbraQ8JVmVl0pzySDVMeh14epWw4v2mGoiFMBKW8A-VQR--aKvVp-_MO3KrMsE3szxzu5OSLFmlC8Rp1slohfa12srXMszAODyQaJ0zy2_izeaZP82lIsWIaRP9wGzpdAnTSTF0q8DCUB6BRbYMnOxO4wvdD05_saIPxdvbmKpVtLyuJCsHckJS6wmMNWQSj2ZNUmVWJRd-6kJjMCZJBq6Od4LKBm38TphLfB_4kjQVJn0xJr_4_zaPMh1S2vZ1Rq2xF3Qql4JGw6ltxSupgvMvNQvrnUp21L9jmIWBv67wjrHVQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706742,"updated":1564706742,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b0f92895-ff67-490e-9f4d-ffb3555a1b98',
=======
  'd66b1709-3af9-4b52-bfb4-f53787050fb1',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:51 GMT',
=======
  'Fri, 02 Aug 2019 00:45:42 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '701' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangettheversionsofakey-/versions')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6885086a-8b59-4ce7-86ad-e13244574616',
=======
  '94f84101-f1a1-4f48-816b-8cf00885debc',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:52 GMT',
=======
  'Fri, 02 Aug 2019 00:45:42 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a473c204-9f11-4e3d-b013-cccddb2e2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHAgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:53 GMT; path=/; secure; HttpOnly',
=======
  '2d8c0b95-a5d0-44ce-acbb-a4031c763e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHAgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:43 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:52 GMT',
=======
  'Fri, 02 Aug 2019 00:45:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangettheversionsofakey-/versions')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakey-/5534a161cc984de69e8b102a2fa873ee","attributes":{"enabled":true,"created":1564681672,"updated":1564681672,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakey-/91afea8dde594b14b5b6b337a74f9e7d","attributes":{"enabled":true,"created":1564706742,"updated":1564706742,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7bd2b2b3-46e6-44e1-8dfc-89cc59f49aaa',
=======
  'ccee40dd-c041-4524-afb5-92af2d949215',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:52 GMT',
=======
  'Fri, 02 Aug 2019 00:45:42 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '279' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangettheversionsofakey-')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7208cf12-1fdc-4746-97b3-9a48176c1ac0',
=======
  '751bd733-9ac5-4327-b0d6-d98c70924fd0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:52 GMT',
=======
  'Fri, 02 Aug 2019 00:45:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '2d8c0b95-a5d0-44ce-acbb-a403b63d2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHAwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:53 GMT; path=/; secure; HttpOnly',
=======
  'b99d5355-cc45-4122-821c-8aa46d3b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHAwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:43 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:53 GMT',
=======
  'Fri, 02 Aug 2019 00:45:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangettheversionsofakey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangettheversionsofakey-","deletedDate":1564681674,"scheduledPurgeDate":1572457674,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakey-/5534a161cc984de69e8b102a2fa873ee","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"u_if1iE4nm4QNyPVqKkrPK_5ALkzw0QgIUO-CBIsbe_-xt9DFArwzO7EvsJxjMf3F3X3Z352h_o82GE39o_bse8ag9iZ4aE0muZbju6YaRVFu2tia3haPMKVqVAdNaLWoMY79052RzqTwpZ4tGOoGMCIXaNpg_LY18wL5ToZ7cQyHLKd3UI1HnY-fUcX_1KL2utqdw6HFXTMLXGr7yK37x8qpjzdHIFVx7jMGiTyAKPDiAvez4kWrqdTE3FmgNmHtzpV3I-g2d9FARf0RHUk2R57YsNqs2PFAwUPY_ldZcKt_kEPBvi2KHG9v5sBjvXJE9aoYGfreOYZ8IOJ6yLaGw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681672,"updated":1564681672,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangettheversionsofakey-","deletedDate":1564706744,"scheduledPurgeDate":1572482744,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakey-/91afea8dde594b14b5b6b337a74f9e7d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ocfDo4nGO5a5LO9Y0jMqp7ID0lsPFV6iIkGooxjbraQ8JVmVl0pzySDVMeh14epWw4v2mGoiFMBKW8A-VQR--aKvVp-_MO3KrMsE3szxzu5OSLFmlC8Rp1slohfa12srXMszAODyQaJ0zy2_izeaZP82lIsWIaRP9wGzpdAnTSTF0q8DCUB6BRbYMnOxO4wvdD05_saIPxdvbmKpVtLyuJCsHckJS6wmMNWQSj2ZNUmVWJRd-6kJjMCZJBq6Od4LKBm38TphLfB_4kjQVJn0xJr_4_zaPMh1S2vZ1Rq2xF3Qql4JGw6ltxSupgvMvNQvrnUp21L9jmIWBv67wjrHVQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706742,"updated":1564706742,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8714b7c3-ddae-4b1d-80e7-4f472b9a2a14',
=======
  '1a770366-a6ca-4e9c-a4d4-7d5f5d740277',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:53 GMT',
=======
  'Fri, 02 Aug 2019 00:45:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '877' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakey-')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '144b571a-7669-4289-8483-b2d744672cc2',
=======
  'c30ad4f3-596a-40d4-9c8c-2c8b11c843f2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:54 GMT',
=======
  'Fri, 02 Aug 2019 00:45:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3a8aa867-99a4-4bab-85b0-934654302800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHBAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:54 GMT; path=/; secure; HttpOnly',
=======
  'cc785417-0c71-4109-bf3f-f7f2cb1c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHBAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:44 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:54 GMT',
=======
  'Fri, 02 Aug 2019 00:45:44 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1b4f5432-dd98-496c-b440-7240500deff2',
=======
  '897e44b7-2d20-4d80-8e2b-791b918f5692',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:54 GMT',
=======
  'Fri, 02 Aug 2019 00:45:44 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakey-')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a7ee53ba-3fe5-4741-8202-a8896d35ec76',
=======
  'c8b8b77e-c95b-42b5-a0ca-3de37fd40f67',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:04 GMT',
=======
  'Fri, 02 Aug 2019 00:45:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '80610dd6-6199-4f1d-a392-2b99c3572500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHBQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:05 GMT; path=/; secure; HttpOnly',
=======
  '4a9e6cc4-5b23-476b-bc87-1bb990033700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHBQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:55 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:04 GMT',
=======
  'Fri, 02 Aug 2019 00:45:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakey-')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '15a90a4b-6e08-47bd-97a7-a8c6b8257e6c',
=======
  '585e3323-828e-480d-8d58-0507e56a8f20',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:05 GMT',
=======
  'Fri, 02 Aug 2019 00:45:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangettheversionsofakeypaged-/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '0f24f091-2ce6-4f03-ac93-b8af6fc053e1',
=======
  '1cf0d0fd-f61c-4fd0-b962-59b91f35ac18',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:05 GMT',
=======
  'Fri, 02 Aug 2019 00:45:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '64f9c5b9-b49e-403d-ade3-059efb922200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHBgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:06 GMT; path=/; secure; HttpOnly',
=======
  '0e65268a-7149-486c-99a7-cd166e953500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHBgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:56 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:05 GMT',
=======
  'Fri, 02 Aug 2019 00:45:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangettheversionsofakeypaged-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakeypaged-/0b47d48adffd486899777498646b22bd","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ufkEOCd_A64h0RoWEs2FPYFdhZmxIc96mBJkKS-zvsYZYckwbd6KGCDkFufoWKBJxLxM0cie_d1PriSuIjiQeZbm_b0NjxtNbGm6i1teUfs5tkFW0UTBOwg0_MUndc3lWNXBlkpUZJBNvijNTJe8EhYlRDpPkZTrwqTaRvUBpJsNNJva7Nbvz88Pxn5bVLHuVL9Tx7kfJPOrej78AUjKjauOX8wMNhsMlO8A9oFlAtO_zajWKlwuWYEejVCdhpLAHSOTVsYILX5okfAuPe7R9XFUJFY-TFMI30aEFODGBGW4kni7DKkhcuGWqkJOeKFEfvfpTsvBa4KIS73kzAmJ_Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681686,"updated":1564681686,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakeypaged-/ad632858f014414ea3dabfca14caabcb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4vh0e4a0pmud7tau9d-9j5cFBJj_TVBPwBMOZcOR8ni2fSgnRJ_UhfPuwjuNnixmN0ZDM1AFkfTaOrJs8gaerETfvio7ngHysGTih4P9V3xgdm3vjSuWWVnyp4UF8N1TjiTunq6fzYa2-W4tpy_aTwMCXNjCDeWoi-tUI5cDWmCSE_1-bmNW2zoVPcf0kPH7p0u2xdTdg-d1G96rRjPiZ040epveW_DEmuBefEleMjEtUS6obA4zQf35QRCRJtyboZnq3OAqc72P3HNh54vw3AweqGn9MKM6X4E1IDVEdYpOP19naykuAxZaWQNJ2gWp84lmRAoXjzO9tncAASohmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706756,"updated":1564706756,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '131b9c14-326a-4250-be42-176895c4c18f',
=======
  '2b15a604-f803-4afc-af00-bd87b872ced0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '706' ]);
=======
  'Fri, 02 Aug 2019 00:45:56 GMT',
  'Connection',
  'close',
  'Content-Length',
  '707' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangettheversionsofakeypaged-/versions')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c0ddc03a-9583-47eb-ae3f-c3197e7dd31c',
=======
  '5e88215c-5214-4aab-9e2c-ba4a4aaeb682',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:06 GMT',
=======
  'Fri, 02 Aug 2019 00:45:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '6282711c-e40f-4e50-8eb2-d947ad8a2700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHBwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:07 GMT; path=/; secure; HttpOnly',
=======
  '057877d1-2bf8-4aa2-83b1-4c120a233800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHBwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:57 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:07 GMT',
=======
  'Fri, 02 Aug 2019 00:45:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangettheversionsofakeypaged-/versions')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakeypaged-/0b47d48adffd486899777498646b22bd","attributes":{"enabled":true,"created":1564681686,"updated":1564681686,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakeypaged-/ad632858f014414ea3dabfca14caabcb","attributes":{"enabled":true,"created":1564706756,"updated":1564706756,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3f8d4f48-66b5-4718-b3ce-d7b0278b0003',
=======
  '4ae1dd0c-ded6-439b-84ea-928259cd7c6e',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '284' ]);
=======
  'Fri, 02 Aug 2019 00:45:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '285' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangettheversionsofakeypaged-')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '0da9a94f-d7b9-4cc5-8fa3-272b8704496e',
=======
  '56acefbc-e153-48b2-a3af-2dc5abeaa94e',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:08 GMT',
=======
  'Fri, 02 Aug 2019 00:45:57 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a06cf865-0757-4df7-a6d7-4da1de662900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHCAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:08 GMT; path=/; secure; HttpOnly',
=======
  'aaf90e38-cdad-42a4-acab-08baffdc3a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHCAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:07 GMT',
=======
  'Fri, 02 Aug 2019 00:45:57 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangettheversionsofakeypaged-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangettheversionsofakeypaged-","deletedDate":1564681688,"scheduledPurgeDate":1572457688,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakeypaged-/0b47d48adffd486899777498646b22bd","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ufkEOCd_A64h0RoWEs2FPYFdhZmxIc96mBJkKS-zvsYZYckwbd6KGCDkFufoWKBJxLxM0cie_d1PriSuIjiQeZbm_b0NjxtNbGm6i1teUfs5tkFW0UTBOwg0_MUndc3lWNXBlkpUZJBNvijNTJe8EhYlRDpPkZTrwqTaRvUBpJsNNJva7Nbvz88Pxn5bVLHuVL9Tx7kfJPOrej78AUjKjauOX8wMNhsMlO8A9oFlAtO_zajWKlwuWYEejVCdhpLAHSOTVsYILX5okfAuPe7R9XFUJFY-TFMI30aEFODGBGW4kni7DKkhcuGWqkJOeKFEfvfpTsvBa4KIS73kzAmJ_Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681686,"updated":1564681686,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangettheversionsofakeypaged-","deletedDate":1564706758,"scheduledPurgeDate":1572482758,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangettheversionsofakeypaged-/ad632858f014414ea3dabfca14caabcb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4vh0e4a0pmud7tau9d-9j5cFBJj_TVBPwBMOZcOR8ni2fSgnRJ_UhfPuwjuNnixmN0ZDM1AFkfTaOrJs8gaerETfvio7ngHysGTih4P9V3xgdm3vjSuWWVnyp4UF8N1TjiTunq6fzYa2-W4tpy_aTwMCXNjCDeWoi-tUI5cDWmCSE_1-bmNW2zoVPcf0kPH7p0u2xdTdg-d1G96rRjPiZ040epveW_DEmuBefEleMjEtUS6obA4zQf35QRCRJtyboZnq3OAqc72P3HNh54vw3AweqGn9MKM6X4E1IDVEdYpOP19naykuAxZaWQNJ2gWp84lmRAoXjzO9tncAASohmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706756,"updated":1564706756,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'dc8b9e42-755e-49c0-a9a0-6ab6461ba7d7',
=======
  '0b70a1ce-fd49-4b1f-b098-a568ed327156',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '887' ]);
=======
  'Fri, 02 Aug 2019 00:45:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '889' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakeypaged-')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '726c83f8-6517-446d-b6d6-57d3a910fecc',
=======
  '60d9eb43-cb34-43f2-a9eb-56f333dcfddf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:08 GMT',
=======
  'Fri, 02 Aug 2019 00:45:58 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '1ab2799c-07fc-4c0f-8844-b4d31bd22a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHCQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:09 GMT; path=/; secure; HttpOnly',
=======
  '1780856f-ebb6-46ab-b927-040c1d5a2e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHCQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:45:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:08 GMT',
=======
  'Fri, 02 Aug 2019 00:45:58 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakeypaged-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '05460ab2-3537-41ec-8838-b75d9b2a8713',
=======
  'c3efe06f-dec1-4275-9f6a-0fc46e5a2054',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:09 GMT',
=======
  'Fri, 02 Aug 2019 00:45:58 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakeypaged-')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '47d09d99-6564-4e7c-bd53-6467d66ef6aa',
=======
  'e2ca5310-76b9-412c-b803-4843226ea5ad',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:20 GMT',
=======
  'Fri, 02 Aug 2019 00:46:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '99157695-23bc-4f3b-9306-ac74ef902500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHCgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:21 GMT; path=/; secure; HttpOnly',
=======
  '53dea278-1f5a-4978-8cdc-4a257c100000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHCgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:09 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:20 GMT',
=======
  'Fri, 02 Aug 2019 00:46:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangettheversionsofakeypaged-')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7d5824a4-4020-4c86-a359-bc75c93113be',
=======
  '53fafbbe-60d3-4770-9457-92c499b32261',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:21 GMT',
=======
  'Fri, 02 Aug 2019 00:46:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-list0versionsofanon-existingkey-/versions')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '76b052cd-8922-48a7-8ff9-3c348c7fd140',
=======
  '38d88451-0949-40d0-b0ce-23dc20d9d65d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:22 GMT',
=======
  'Fri, 02 Aug 2019 00:46:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f806288e-209b-4fca-a19f-375af5592a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHCwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:23 GMT; path=/; secure; HttpOnly',
=======
  '2f847618-73c2-45ac-bcdd-3c29b9270000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHCwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:22 GMT',
=======
  'Fri, 02 Aug 2019 00:46:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-list0versionsofanon-existingkey-/versions')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8029abaa-2b8e-436d-b8de-a10889fca9bd',
=======
  'bfcdd789-1a5b-410f-8d44-8440b985527b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:23 GMT',
=======
  'Fri, 02 Aug 2019 00:46:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '28' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-list0versionsofanon-existingkeypaged-/versions')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8a9575cb-f0d8-4a4b-88bd-784866c87245',
=======
  '4e84f3cd-5589-47ed-92c1-36710f7db675',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:25 GMT',
=======
  'Fri, 02 Aug 2019 00:46:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f4312597-6c0a-48c4-8715-1880b7cc2300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHDAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:25 GMT; path=/; secure; HttpOnly',
=======
  '057877d1-2bf8-4aa2-83b1-4c1281273800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHDAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:24 GMT',
=======
  'Fri, 02 Aug 2019 00:46:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-list0versionsofanon-existingkeypaged-/versions')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6472bd57-77a4-4989-b11b-8ed096d89291',
=======
  '843ec7a5-f8df-42ac-8f89-4a88ca2cad6b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:25 GMT',
=======
  'Fri, 02 Aug 2019 00:46:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '28' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeys--0/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'cef2cfa3-4128-4e62-82e5-756fb899b0b5',
=======
  '5fbcb426-fe71-49b8-8f0c-e7131ca3420b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:27 GMT',
=======
  'Fri, 02 Aug 2019 00:46:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '230c9841-69b6-442f-ae83-1ad433602600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHDQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:28 GMT; path=/; secure; HttpOnly',
=======
  'eda1f222-3e8f-4f2e-bfa6-b720ae0c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHDQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:28 GMT',
=======
  'Fri, 02 Aug 2019 00:46:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeys--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--0/2f87b42c6433416faf93fbc32da9449a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qttzqm9auHdxo-qLacbs6-itdqHmB3_zLMjtr-jlUorbzGqLDcloc85hnPEw4JGlovfySF0l1xGXUeSUvSbhfT-SA4RY4HHUGkzPpPVYvnocS5EFEtRXg6hqbyfdY1bLq5xoGVZCD_YWsLaGTLilFj58ZJpfqE1OiwbHC-1pwr17TiDXhwGHb4NrEh7Om-Tt4sQkj4dl4sVdeOqFJ4_uTnRLqYlfcVnffxEe4SnwCgzrmWylxrGNSgc7YOI7GlZL1kiAJoBjkP88-lqhYpak1im3E1QhwCqq07fFNw6LirQg90gpDMruhfQa9BvuzPGnVXyLnQl_FjxekwLF0mSiSQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681709,"updated":1564681709,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6d7d1d38-457c-4a5a-a98d-1879f7268c7c',
=======
  'f81fd28a-3e70-4771-ade2-e71b0522ce68',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:29 GMT',
=======
  'Fri, 02 Aug 2019 00:46:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '705' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeys--1/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '06e13dd1-a43e-4555-8dfb-912093aa234d',
=======
  '2c5f0429-a450-460f-b5af-1b8a540f6a2f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:30 GMT',
=======
  'Fri, 02 Aug 2019 00:46:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'efba9e04-8f53-4a7f-9357-748a3cd02600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHDgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:30 GMT; path=/; secure; HttpOnly',
=======
  '89fc61b2-0bd9-4b18-997d-5d4513400000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHDgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:30 GMT',
=======
  'Fri, 02 Aug 2019 00:46:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeys--1/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--1/fb305f7941134497a22938403664d4f6","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"iOef-nrmAo4YJ9kXXrX02tMyXRLOerEdEixiIA3mTCNboeGVWqu3tgY8T1IEw9ZvMmIydgqSchCd_8CdMsnN_o_4EFTYPfzACw8Jg5G5tltEnpA4MXw5Gw3xqvB_T3w1Ug51glXZ1R8NF7GS2YAUL8Z1q5BD-jww56354ZQtSye17FBAO09R2IIluTcnePBEKhpFfAujkVfB-R84hYljHdIyrOtAlyuxCDKTOLYM_D7Hpz4JVsy3SzDK86HOOXhZzw8nzHFAEhm_EUsikYg48gSwR7IaoPGDzrib9IJstLhKXDCD91eeARbOuoNdYbGhhoBKAjuReSnqCxGzjkSHqw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681710,"updated":1564681710,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--0/d65c9244a50c4a98ba6100680078a67b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zaOCnlYvryB_6JQfXvnynlBumvcSdX21Qq9PBoaHAI5Hzg_58MrrhNf3ctwL-cXocVqmOe_3jAClCHGdsgeu9qWPQr3Minpxvb4Htj-HKWCOPjt4VkeE665e7V8XbYf4DaKPoXLpUZORedgCJ0lettcHs6OPHILzM3NW9TjkfRUaBcBT90sH7Vm0Hwaz8rSte7vwGn4R_P3DeRIKt2-07swK87Ec5asUL8QouzvIgeyropsMXz6DDXztFmSIbvJexadCncDZKTk1mIlJhm7Rxtz6887_97Ajej5ejEGiX55kPQ0TiKXg90jPqVy3NUW6aK1ExuWjoQCp4KksJD8wVQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706783,"updated":1564706783,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '847b1c60-5274-4fc8-89d3-74b1b5cfb1c5',
=======
  '3cce0ec4-f0dc-4d51-ae12-ae97eca96616',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:29 GMT',
=======
  'Fri, 02 Aug 2019 00:46:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '705' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '5f246929-aaae-443f-896f-3f469b5657ae',
=======
  'cb09bed5-d0f0-462c-b784-9af8fafcd724',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:30 GMT',
=======
  'Fri, 02 Aug 2019 00:46:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e53bbb31-eed2-443b-9486-726cc5e92800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHDwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:31 GMT; path=/; secure; HttpOnly',
=======
  '1c3a974a-02e3-45b9-99ca-6f0cf1453700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHDwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:30 GMT',
=======
  'Fri, 02 Aug 2019 00:46:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateadisabledkey-21596680364625942","attributes":{"enabled":false,"created":1561685638,"updated":1561685638,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EVTVJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJTMFZaVjBsVVNFNVBWRUpGUms5U1JTMHpPVFExTWpNNU9UVXlOakE0TVRFMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--1/8e46634c5b3d42f986df520b145072a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"nP7h-tCRymDPwB_nVTzj_-YfoannXZj03RzjGK3AOuIEBQqHy5dPEaoTRNz2oaesZuj5D3-7woJg9nPvlY3H-GFQzlCrGnpwgsWpiiiYVWDKjsI0_MgX-jPvw82aZSMHOQyuWx0LmTEa3WPrbGzmHREVpezilYr95LBhLxqszAVTNi3d5239Uf5CiF5-nDkkk2n2hx9pJXVEP7xxyXO3BITj2mn99s5zs7mEv8BYoYbEDiSWi3zxGYTiIiAwucZ5K-iOQ4tOzREI34Qq-D6tgFGms9Yk73plQucShVHeLDhfKeGaJ0se47H8KHvcQZvnAQqOJhz7X3X2eZ-xVe8hNQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706784,"updated":1564706784,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '984f704e-5dba-401b-a4b4-de71781ab3a6',
=======
  '71f2e23c-0456-4fd2-8d7d-6abaf86bfc37',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:31 GMT',
=======
  'Fri, 02 Aug 2019 00:46:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '556' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8cbf0067-7f66-4ab6-9d3e-6d71cd3e0e7a',
=======
  'f123c0ad-48b5-482c-b162-a15757ff1080',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:31 GMT',
=======
  'Fri, 02 Aug 2019 00:46:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e91fca1a-1a58-4d5b-a729-edb205402f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHEAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:32 GMT; path=/; secure; HttpOnly',
=======
  '9115a522-1480-49c7-af0b-650fd7bb3d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHEAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:24 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:32 GMT',
=======
  'Fri, 02 Aug 2019 00:46:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMTYhTURBd01EUXpJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVIUlZSQlMwVlpMVE01TkRVeU16azVOVEkyTURneE1UVWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '9a0a3fa9-2828-4f50-aa4d-534cdcdf1319',
=======
  '0c5b2796-7731-445f-aaf4-200096f94274',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:32 GMT',
=======
  'Fri, 02 Aug 2019 00:46:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '309' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c66ba43e-3134-443f-810c-e1c00e1cd2ca',
=======
  '36e07172-cf21-4a98-b8f1-7caf13a716fe',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:32 GMT',
=======
  'Fri, 02 Aug 2019 00:46:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'fb842dbb-2cf6-48a3-ae4f-d192ad822b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHEQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:33 GMT; path=/; secure; HttpOnly',
=======
  'd47c7ebd-5cb4-4afe-a0cd-a9e2b3270000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHEQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:25 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:32 GMT',
=======
  'Fri, 02 Aug 2019 00:46:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRYPTOTEST01","attributes":{"enabled":true,"created":1562805007,"updated":1562805007,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976015901904087","attributes":{"enabled":true,"created":1559760164,"updated":1559760164,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976018742005808","attributes":{"enabled":true,"created":1559760193,"updated":1559760193,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976035851309215","attributes":{"enabled":true,"created":1559760364,"updated":1559760364,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976038662209208","attributes":{"enabled":true,"created":1559760392,"updated":1559760392,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976059075801511","attributes":{"enabled":true,"created":1559760596,"updated":1559760596,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976061918309867","attributes":{"enabled":true,"created":1559760624,"updated":1559760624,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976088192202903","attributes":{"enabled":true,"created":1559760887,"updated":1559760887,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976090993105220","attributes":{"enabled":true,"created":1559760915,"updated":1559760915,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976118089506049","attributes":{"enabled":true,"created":1559761186,"updated":1559761186,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976120964305668","attributes":{"enabled":true,"created":1559761215,"updated":1559761215,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019567836900080","attributes":{"enabled":true,"created":1560195684,"updated":1560195684,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568419900112","attributes":{"enabled":true,"created":1560195689,"updated":1560195689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568998004417","attributes":{"enabled":false,"created":1560195695,"updated":1560195695,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNVGsxTnpBeE5UYzNNRFF3TVRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e9c69ad0-76db-40f2-a91d-00f388d2aa0c',
=======
  '50f8295d-3416-4da4-b90c-d94a896bc9c2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:33 GMT',
=======
  'Fri, 02 Aug 2019 00:46:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2857' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'aa865359-5874-4fe1-8b62-56cdf09cb396',
=======
  '82f3dca0-f5e9-462f-817a-0280ad5882f4',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:33 GMT',
=======
  'Fri, 02 Aug 2019 00:46:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd4288b21-6815-4f1a-ba52-365912db2600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHEgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:34 GMT; path=/; secure; HttpOnly',
=======
  '8a95b4e2-b4ab-4b6f-b8e9-23cfdc2e3a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHEgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:33 GMT',
=======
  'Fri, 02 Aug 2019 00:46:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156019570157704018","attributes":{"enabled":true,"created":1560195707,"updated":1560195707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019573560701886","attributes":{"enabled":true,"created":1560195741,"updated":1560195741,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019965517806158","attributes":{"enabled":true,"created":1560199660,"updated":1560199660,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966095601383","attributes":{"enabled":true,"created":1560199666,"updated":1560199666,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966655202551","attributes":{"enabled":false,"created":1560199672,"updated":1560199672,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019967216106153","attributes":{"enabled":true,"created":1560199678,"updated":1560199678,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019970108507840","attributes":{"enabled":true,"created":1560199707,"updated":1560199707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019971819409376","attributes":{"enabled":true,"created":1560199723,"updated":1560199723,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020041605602688","attributes":{"enabled":true,"nbf":1560200421,"created":1560200422,"updated":1560200422,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020107570005644","attributes":{"enabled":true,"exp":1560201080,"created":1560201081,"updated":1560201081,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakEyTlRZM05ERXhNRFU1TmpraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRYPTOTEST01","attributes":{"enabled":true,"created":1562805007,"updated":1562805007,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976015901904087","attributes":{"enabled":true,"created":1559760164,"updated":1559760164,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976018742005808","attributes":{"enabled":true,"created":1559760193,"updated":1559760193,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976035851309215","attributes":{"enabled":true,"created":1559760364,"updated":1559760364,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976038662209208","attributes":{"enabled":true,"created":1559760392,"updated":1559760392,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976059075801511","attributes":{"enabled":true,"created":1559760596,"updated":1559760596,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976061918309867","attributes":{"enabled":true,"created":1559760624,"updated":1559760624,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976088192202903","attributes":{"enabled":true,"created":1559760887,"updated":1559760887,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976090993105220","attributes":{"enabled":true,"created":1559760915,"updated":1559760915,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976118089506049","attributes":{"enabled":true,"created":1559761186,"updated":1559761186,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976120964305668","attributes":{"enabled":true,"created":1559761215,"updated":1559761215,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019567836900080","attributes":{"enabled":true,"created":1560195684,"updated":1560195684,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568419900112","attributes":{"enabled":true,"created":1560195689,"updated":1560195689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568998004417","attributes":{"enabled":false,"created":1560195695,"updated":1560195695,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNVGsxTnpBeE5UYzNNRFF3TVRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e6126b3e-a207-441f-a147-25339b7f0786',
=======
  '3a22a217-6ef5-4c40-a56b-a79df24a8880',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2160' ]);
=======
  'Fri, 02 Aug 2019 00:46:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2857' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd9c418a5-b942-4538-87d8-f5b049222758',
=======
  'ad0b43cd-fd31-47ee-8a05-9305fdfc7b55',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:34 GMT',
=======
  'Fri, 02 Aug 2019 00:46:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3712160c-a992-4489-993b-ced51f982b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHEwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:35 GMT; path=/; secure; HttpOnly',
=======
  'c7335e29-481c-40ec-8a94-243dcabd3900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHEwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:27 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:34 GMT',
=======
  'Fri, 02 Aug 2019 00:46:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021398454601816","attributes":{"enabled":true,"created":1560213990,"updated":1560213990,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399025306001","attributes":{"enabled":true,"created":1560213996,"updated":1560213996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399613005852","attributes":{"enabled":true,"created":1560214001,"updated":1560214001,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400178007355","attributes":{"enabled":true,"created":1560214008,"updated":1560214008,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400838605408","attributes":{"enabled":false,"created":1560214013,"updated":1560214013,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401405804843","attributes":{"enabled":true,"nbf":1560214019,"created":1560214019,"updated":1560214019,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401972601264","attributes":{"enabled":true,"exp":1560214024,"created":1560214025,"updated":1560214025,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021402558506955","attributes":{"enabled":false,"created":1560214031,"updated":1560214036,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021403691203484","attributes":{"enabled":true,"created":1560214042,"updated":1560214042,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakUxTWpjek5UVXlNRGN5T0RjaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156019570157704018","attributes":{"enabled":true,"created":1560195707,"updated":1560195707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019573560701886","attributes":{"enabled":true,"created":1560195741,"updated":1560195741,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019965517806158","attributes":{"enabled":true,"created":1560199660,"updated":1560199660,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966095601383","attributes":{"enabled":true,"created":1560199666,"updated":1560199666,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966655202551","attributes":{"enabled":false,"created":1560199672,"updated":1560199672,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019967216106153","attributes":{"enabled":true,"created":1560199678,"updated":1560199678,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019970108507840","attributes":{"enabled":true,"created":1560199707,"updated":1560199707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019971819409376","attributes":{"enabled":true,"created":1560199723,"updated":1560199723,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020041605602688","attributes":{"enabled":true,"nbf":1560200421,"created":1560200422,"updated":1560200422,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020107570005644","attributes":{"enabled":true,"exp":1560201080,"created":1560201081,"updated":1560201081,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakEyTlRZM05ERXhNRFU1TmpraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '5fad184c-95e7-4a39-8cdd-2f36cf1bc81c',
=======
  'dc2251ab-04f9-4a30-872a-918a91ce6e82',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1976' ]);
=======
  'Fri, 02 Aug 2019 00:46:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2160' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b1b317ea-9b0a-4bba-9848-8fb579257a18',
=======
  '768ba540-6bbf-47e9-a165-15712f6b7014',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:35 GMT',
=======
  'Fri, 02 Aug 2019 00:46:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'db67f75b-d13d-4344-92e2-e060a1212a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHFAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:36 GMT; path=/; secure; HttpOnly',
=======
  'd30ed79e-ab65-4079-8e29-e4ab062c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHFAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:28 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:35 GMT',
=======
  'Fri, 02 Aug 2019 00:46:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021644428906562","attributes":{"enabled":true,"created":1560216450,"updated":1560216450,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645023201050","attributes":{"enabled":true,"created":1560216455,"updated":1560216455,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645600805675","attributes":{"enabled":true,"created":1560216461,"updated":1560216461,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646164300437","attributes":{"enabled":true,"created":1560216467,"updated":1560216467,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646738603126","attributes":{"enabled":false,"created":1560216473,"updated":1560216473,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647317101069","attributes":{"enabled":true,"nbf":1560216478,"created":1560216478,"updated":1560216478,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647896109795","attributes":{"enabled":true,"exp":1560216483,"created":1560216484,"updated":1560216484,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021648457806180","attributes":{"enabled":false,"created":1560216490,"updated":1560216495,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021649588105428","attributes":{"enabled":false,"exp":1560216501,"created":1560216501,"updated":1560216507,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021652991406663","attributes":{"enabled":true,"created":1560216535,"updated":1560216535,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021654118707998","attributes":{"enabled":true,"created":1560216546,"updated":1560216546,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021655789000990","attributes":{"enabled":true,"created":1560216563,"updated":1560216563,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021698079201746","attributes":{"enabled":true,"created":1560216986,"updated":1560216986,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNamMyTVRreU5UYzFNRFV6T0RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021398454601816","attributes":{"enabled":true,"created":1560213990,"updated":1560213990,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399025306001","attributes":{"enabled":true,"created":1560213996,"updated":1560213996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399613005852","attributes":{"enabled":true,"created":1560214001,"updated":1560214001,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400178007355","attributes":{"enabled":true,"created":1560214008,"updated":1560214008,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400838605408","attributes":{"enabled":false,"created":1560214013,"updated":1560214013,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401405804843","attributes":{"enabled":true,"nbf":1560214019,"created":1560214019,"updated":1560214019,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401972601264","attributes":{"enabled":true,"exp":1560214024,"created":1560214025,"updated":1560214025,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021402558506955","attributes":{"enabled":false,"created":1560214031,"updated":1560214036,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021403691203484","attributes":{"enabled":true,"created":1560214042,"updated":1560214042,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakUxTWpjek5UVXlNRGN5T0RjaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1b0f3f70-4e2a-4d9f-af0c-1fb14340eb2d',
=======
  'abaa28a2-27aa-407d-bbec-343b367bc0a2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:36 GMT',
=======
  'Fri, 02 Aug 2019 00:46:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2734' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '66686376-e09b-4e67-a5a0-ad90337ac6f6',
=======
  'a7590b21-d341-4243-92c6-803b217309c9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:36 GMT',
=======
  'Fri, 02 Aug 2019 00:46:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'c7b96ca8-11a5-4f87-a9ab-970b5ba82300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHFQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:37 GMT; path=/; secure; HttpOnly',
=======
  'aab5a53d-adc6-46d9-a491-95cdd3320000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHFQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:29 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:37 GMT',
=======
  'Fri, 02 Aug 2019 00:46:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156027682085504023","attributes":{"enabled":true,"created":1560276826,"updated":1560276826,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028175563002501","attributes":{"enabled":true,"created":1560281761,"updated":1560281761,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176140503335","attributes":{"enabled":true,"created":1560281767,"updated":1560281767,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176718009249","attributes":{"enabled":false,"created":1560281772,"updated":1560281772,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177274009592","attributes":{"enabled":true,"nbf":1560281777,"created":1560281778,"updated":1560281778,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177830101648","attributes":{"enabled":true,"exp":1560281783,"created":1560281784,"updated":1560281784,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028178407406544","attributes":{"enabled":false,"created":1560281789,"updated":1560281795,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028179546704608","attributes":{"enabled":false,"exp":1560281801,"created":1560281800,"updated":1560281806,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028182926703011","attributes":{"enabled":true,"created":1560281834,"updated":1560281834,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028184044006383","attributes":{"enabled":true,"created":1560281845,"updated":1560281845,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028189442507450","attributes":{"enabled":true,"created":1560281899,"updated":1560281899,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028205605702876","attributes":{"enabled":true,"created":1560282061,"updated":1560282061,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028212028407398","attributes":{"enabled":true,"created":1560282125,"updated":1560282125,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028213716108979","attributes":{"enabled":true,"created":1560282142,"updated":1560282142,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322090002888","attributes":{"enabled":false,"created":1560363226,"updated":1560363226,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNell6TWpJMk5UWTRNRGM0TVRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021644428906562","attributes":{"enabled":true,"created":1560216450,"updated":1560216450,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645023201050","attributes":{"enabled":true,"created":1560216455,"updated":1560216455,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645600805675","attributes":{"enabled":true,"created":1560216461,"updated":1560216461,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646164300437","attributes":{"enabled":true,"created":1560216467,"updated":1560216467,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646738603126","attributes":{"enabled":false,"created":1560216473,"updated":1560216473,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647317101069","attributes":{"enabled":true,"nbf":1560216478,"created":1560216478,"updated":1560216478,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647896109795","attributes":{"enabled":true,"exp":1560216483,"created":1560216484,"updated":1560216484,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021648457806180","attributes":{"enabled":false,"created":1560216490,"updated":1560216495,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021649588105428","attributes":{"enabled":false,"exp":1560216501,"created":1560216501,"updated":1560216507,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021652991406663","attributes":{"enabled":true,"created":1560216535,"updated":1560216535,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021654118707998","attributes":{"enabled":true,"created":1560216546,"updated":1560216546,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021655789000990","attributes":{"enabled":true,"created":1560216563,"updated":1560216563,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021698079201746","attributes":{"enabled":true,"created":1560216986,"updated":1560216986,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNamMyTVRreU5UYzFNRFV6T0RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '49f45bc1-5b1d-4b6a-ac0e-c96fa07fd392',
=======
  'a30e243f-c150-4b7d-a579-749432b04685',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:38 GMT',
=======
  'Fri, 02 Aug 2019 00:46:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3105' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3271dc70-bbeb-426f-ac13-a48d24ec6603',
=======
  'ff3a1857-a961-48ad-b098-28ad2ec15f15',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:37 GMT',
=======
  'Fri, 02 Aug 2019 00:46:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '8dacf484-c9f0-4fec-b54d-6998aa302500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHFgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:38 GMT; path=/; secure; HttpOnly',
=======
  '85e5b31d-3e4f-4a27-bce6-d312d7070000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHFgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:30 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:38 GMT',
=======
  'Fri, 02 Aug 2019 00:46:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322656807812","attributes":{"enabled":true,"nbf":1560363231,"created":1560363232,"updated":1560363232,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323238409224","attributes":{"enabled":true,"exp":1560363237,"created":1560363237,"updated":1560363237,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323804901755","attributes":{"enabled":false,"created":1560363243,"updated":1560363249,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036324938907401","attributes":{"enabled":false,"exp":1560363254,"created":1560363254,"updated":1560363260,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036328289805710","attributes":{"enabled":true,"created":1560363288,"updated":1560363288,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036329384707932","attributes":{"enabled":true,"created":1560363299,"updated":1560363299,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036335353805406","attributes":{"enabled":true,"created":1560363359,"updated":1560363359,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036352635406646","attributes":{"enabled":true,"created":1560363532,"updated":1560363532,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036359055200632","attributes":{"enabled":true,"created":1560363595,"updated":1560363595,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036360747106809","attributes":{"enabled":true,"created":1560363613,"updated":1560363613,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044301853106036","attributes":{"enabled":false,"created":1560443023,"updated":1560443029,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044302953209171","attributes":{"enabled":false,"exp":1560443035,"created":1560443035,"updated":1560443040,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044306342002510","attributes":{"enabled":true,"created":1560443069,"updated":1560443069,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044307483600798","attributes":{"enabled":true,"created":1560443080,"updated":1560443080,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044314989607523","attributes":{"enabled":true,"created":1560443155,"updated":1560443155,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044316109901534","attributes":{"enabled":true,"created":1560443166,"updated":1560443166,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044360211306282","attributes":{"enabled":true,"created":1560443607,"updated":1560443607,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044369613908113","attributes":{"enabled":true,"created":1560443701,"updated":1560443701,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044371294504848","attributes":{"enabled":true,"created":1560443718,"updated":1560443718,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156048233876700601","attributes":{"enabled":true,"created":1560482344,"updated":1560482344,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdOVFF4TWpJNU1qTXpNRGczTnpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156027682085504023","attributes":{"enabled":true,"created":1560276826,"updated":1560276826,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028175563002501","attributes":{"enabled":true,"created":1560281761,"updated":1560281761,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176140503335","attributes":{"enabled":true,"created":1560281767,"updated":1560281767,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176718009249","attributes":{"enabled":false,"created":1560281772,"updated":1560281772,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177274009592","attributes":{"enabled":true,"nbf":1560281777,"created":1560281778,"updated":1560281778,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177830101648","attributes":{"enabled":true,"exp":1560281783,"created":1560281784,"updated":1560281784,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028178407406544","attributes":{"enabled":false,"created":1560281789,"updated":1560281795,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028179546704608","attributes":{"enabled":false,"exp":1560281801,"created":1560281800,"updated":1560281806,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028182926703011","attributes":{"enabled":true,"created":1560281834,"updated":1560281834,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028184044006383","attributes":{"enabled":true,"created":1560281845,"updated":1560281845,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028189442507450","attributes":{"enabled":true,"created":1560281899,"updated":1560281899,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028205605702876","attributes":{"enabled":true,"created":1560282061,"updated":1560282061,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028212028407398","attributes":{"enabled":true,"created":1560282125,"updated":1560282125,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028213716108979","attributes":{"enabled":true,"created":1560282142,"updated":1560282142,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322090002888","attributes":{"enabled":false,"created":1560363226,"updated":1560363226,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNell6TWpJMk5UWTRNRGM0TVRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '76776881-00df-4b98-b64f-5810db131d9f',
=======
  'ec6816d8-9d0f-4772-8e11-695597bb3e2f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4047' ]);
=======
  'Fri, 02 Aug 2019 00:46:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '3105' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b73664c3-07be-42e6-809d-fd055c736133',
=======
  'aea4c976-5813-4058-a544-ba618296629c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:39 GMT',
=======
  'Fri, 02 Aug 2019 00:46:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'cfa4e651-8d10-409f-bc62-397df5ea2f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHFwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:39 GMT; path=/; secure; HttpOnly',
=======
  '44a295e0-ddce-4218-8f6a-518958470000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHFwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:31 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:39 GMT',
=======
  'Fri, 02 Aug 2019 00:46:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156054122923308772","attributes":{"enabled":true,"created":1560541235,"updated":1560541235,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953600799","attributes":{"enabled":true,"created":1560199735,"updated":1560199735,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953608137","attributes":{"enabled":true,"created":1560199740,"updated":1560199740,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308206","attributes":{"enabled":true,"created":1560216580,"updated":1560216580,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308448","attributes":{"enabled":true,"created":1560216575,"updated":1560216575,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118107647","attributes":{"enabled":true,"created":1560281922,"updated":1560281922,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118109631","attributes":{"enabled":true,"created":1560281916,"updated":1560281916,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061400928","attributes":{"enabled":true,"created":1560363381,"updated":1560363381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061402620","attributes":{"enabled":true,"created":1560363376,"updated":1560363376,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335800124","attributes":{"enabled":true,"created":1560443194,"updated":1560443194,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335808106","attributes":{"enabled":true,"created":1560443188,"updated":1560443188,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345205112","attributes":{"enabled":true,"created":1560443259,"updated":1560443259,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345209472","attributes":{"enabled":true,"created":1560443264,"updated":1560443264,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-0","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-1","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTJJV3RsZVM5TVNWTlVTMFZaVGtGTlJTMURRVTVIUlZSVVNFVldSVkpUU1U5T1UwOUdRVXRGV1Mwek1UUTNNREF5TlRJMk5ESXhOVGt5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322656807812","attributes":{"enabled":true,"nbf":1560363231,"created":1560363232,"updated":1560363232,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323238409224","attributes":{"enabled":true,"exp":1560363237,"created":1560363237,"updated":1560363237,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323804901755","attributes":{"enabled":false,"created":1560363243,"updated":1560363249,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036324938907401","attributes":{"enabled":false,"exp":1560363254,"created":1560363254,"updated":1560363260,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036328289805710","attributes":{"enabled":true,"created":1560363288,"updated":1560363288,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036329384707932","attributes":{"enabled":true,"created":1560363299,"updated":1560363299,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036335353805406","attributes":{"enabled":true,"created":1560363359,"updated":1560363359,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036352635406646","attributes":{"enabled":true,"created":1560363532,"updated":1560363532,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036359055200632","attributes":{"enabled":true,"created":1560363595,"updated":1560363595,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036360747106809","attributes":{"enabled":true,"created":1560363613,"updated":1560363613,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044301853106036","attributes":{"enabled":false,"created":1560443023,"updated":1560443029,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044302953209171","attributes":{"enabled":false,"exp":1560443035,"created":1560443035,"updated":1560443040,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044306342002510","attributes":{"enabled":true,"created":1560443069,"updated":1560443069,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044307483600798","attributes":{"enabled":true,"created":1560443080,"updated":1560443080,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044314989607523","attributes":{"enabled":true,"created":1560443155,"updated":1560443155,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044316109901534","attributes":{"enabled":true,"created":1560443166,"updated":1560443166,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044360211306282","attributes":{"enabled":true,"created":1560443607,"updated":1560443607,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044369613908113","attributes":{"enabled":true,"created":1560443701,"updated":1560443701,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044371294504848","attributes":{"enabled":true,"created":1560443718,"updated":1560443718,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156048233876700601","attributes":{"enabled":true,"created":1560482344,"updated":1560482344,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdOVFF4TWpJNU1qTXpNRGczTnpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1522611c-3794-4fd8-8269-be6874f66e70',
=======
  '21e499cf-e923-434f-90b8-65930bc5ced7',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '3192' ]);
=======
  'Fri, 02 Aug 2019 00:46:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4047' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'de3532a3-5310-435c-918d-2300624ea76d',
=======
  '99be34f6-4118-46d1-94d9-a4d1cd40e233',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:42 GMT',
=======
  'Fri, 02 Aug 2019 00:46:31 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '4a9e6cc4-5b23-476b-bc87-1bb9d54f2700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHGAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:42 GMT; path=/; secure; HttpOnly',
=======
  '22410ef1-f775-4b88-a1c6-0e8f21250000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHGAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:32 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:41 GMT',
=======
  'Fri, 02 Aug 2019 00:46:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/MyKeyName","attributes":{"enabled":true,"created":1559759721,"updated":1559759721,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-beforeeachhook-05210208539653571","attributes":{"enabled":true,"created":1564167055,"updated":1564167055,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-3045841949479433","attributes":{"enabled":true,"created":1563492996,"updated":1563492996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-4217460078350159","attributes":{"enabled":true,"created":1563492026,"updated":1563492026,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-7067376901955089","attributes":{"enabled":true,"created":1563492908,"updated":1563492908,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-9299135263076788","attributes":{"enabled":true,"created":1563492791,"updated":1563492791,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-845126448195596","attributes":{"enabled":true,"created":1563391406,"updated":1563391406,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--0","attributes":{"enabled":true,"created":1564681709,"updated":1564681709,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWXpJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1SFJWUlRSVlpGVWtGTVNVNVRSVkpVUlVSTFJWbFRMVGN5TkRBMU1qazRPRFExTkRVek5UTXRNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156054122923308772","attributes":{"enabled":true,"created":1560541235,"updated":1560541235,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953600799","attributes":{"enabled":true,"created":1560199735,"updated":1560199735,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953608137","attributes":{"enabled":true,"created":1560199740,"updated":1560199740,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308206","attributes":{"enabled":true,"created":1560216580,"updated":1560216580,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308448","attributes":{"enabled":true,"created":1560216575,"updated":1560216575,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118107647","attributes":{"enabled":true,"created":1560281922,"updated":1560281922,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118109631","attributes":{"enabled":true,"created":1560281916,"updated":1560281916,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061400928","attributes":{"enabled":true,"created":1560363381,"updated":1560363381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061402620","attributes":{"enabled":true,"created":1560363376,"updated":1560363376,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335800124","attributes":{"enabled":true,"created":1560443194,"updated":1560443194,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335808106","attributes":{"enabled":true,"created":1560443188,"updated":1560443188,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345205112","attributes":{"enabled":true,"created":1560443259,"updated":1560443259,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345209472","attributes":{"enabled":true,"created":1560443264,"updated":1560443264,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-0","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-1","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTJJV3RsZVM5TVNWTlVTMFZaVGtGTlJTMURRVTVIUlZSVVNFVldSVkpUU1U5T1UwOUdRVXRGV1Mwek1UUTNNREF5TlRJMk5ESXhOVGt5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4042c5ad-bf05-47eb-9a4a-3c2c48591161',
=======
  'fb6b25bc-7eae-42d9-9b79-f7a45f182e9a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2035' ]);
=======
  'Fri, 02 Aug 2019 00:46:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '3192' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c04184e1-9073-4366-8265-a512934f8e3e',
=======
  '851074f5-daec-47d6-85ef-a4acddda06ce',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:42 GMT',
=======
  'Fri, 02 Aug 2019 00:46:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '55997062-c482-4c21-8e5f-72f89a6b2800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHGQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:43 GMT; path=/; secure; HttpOnly',
=======
  'f931bb78-e504-406c-aaac-fbd2f3163700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHGQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:33 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:42 GMT',
=======
  'Fri, 02 Aug 2019 00:46:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--1","attributes":{"enabled":true,"created":1564681710,"updated":1564681710,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-1","attributes":{"enabled":true,"created":1563476816,"updated":1563476816,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-4883244773006783","attributes":{"enabled":true,"created":1561420381,"updated":1561420381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8006354275127874","attributes":{"enabled":true,"created":1561420833,"updated":1561420833,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8686288267292417","attributes":{"enabled":true,"created":1561420689,"updated":1561420689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699601597","attributes":{"enabled":true,"created":1560195758,"updated":1560195758,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699608155","attributes":{"enabled":true,"created":1560195752,"updated":1560195752,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/MyKeyName","attributes":{"enabled":true,"created":1559759721,"updated":1559759721,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-beforeeachhook-05210208539653571","attributes":{"enabled":true,"created":1564167055,"updated":1564167055,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-3045841949479433","attributes":{"enabled":true,"created":1563492996,"updated":1563492996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-4217460078350159","attributes":{"enabled":true,"created":1563492026,"updated":1563492026,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-7067376901955089","attributes":{"enabled":true,"created":1563492908,"updated":1563492908,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-9299135263076788","attributes":{"enabled":true,"created":1563492791,"updated":1563492791,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-845126448195596","attributes":{"enabled":true,"created":1563391406,"updated":1563391406,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--0","attributes":{"enabled":true,"created":1564706783,"updated":1564706783,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWTBJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1SFJWUlRSVlpGVWtGTVNVNVRSVkpVUlVSTFJWbFRMVEEzTWpjd09UWTJOREF6TkRRNU1qWTBMVEVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'fec558e7-4834-46ac-8756-4f2687a93ddc',
=======
  '04cb46bb-0007-4435-92c7-15c8db714480',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:43 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1505' ]);
=======
  'Fri, 02 Aug 2019 00:46:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2036' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b1cf9cc4-d680-44ff-887e-4016692afe9d',
=======
  '446d07c2-c077-4dc0-bc00-97393da68387',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:44 GMT',
=======
  'Fri, 02 Aug 2019 00:46:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'ba38e5e5-270b-44da-919a-7530fe3c2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHGgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:44 GMT; path=/; secure; HttpOnly',
=======
  '36fcdaeb-a880-40a6-bc9a-bfb7fbbb4000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHGgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:43 GMT',
=======
  'Fri, 02 Aug 2019 00:46:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeys--0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--0","deletedDate":1564681725,"scheduledPurgeDate":1572457725,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--0/2f87b42c6433416faf93fbc32da9449a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qttzqm9auHdxo-qLacbs6-itdqHmB3_zLMjtr-jlUorbzGqLDcloc85hnPEw4JGlovfySF0l1xGXUeSUvSbhfT-SA4RY4HHUGkzPpPVYvnocS5EFEtRXg6hqbyfdY1bLq5xoGVZCD_YWsLaGTLilFj58ZJpfqE1OiwbHC-1pwr17TiDXhwGHb4NrEh7Om-Tt4sQkj4dl4sVdeOqFJ4_uTnRLqYlfcVnffxEe4SnwCgzrmWylxrGNSgc7YOI7GlZL1kiAJoBjkP88-lqhYpak1im3E1QhwCqq07fFNw6LirQg90gpDMruhfQa9BvuzPGnVXyLnQl_FjxekwLF0mSiSQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681709,"updated":1564681709,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--1","attributes":{"enabled":true,"created":1564706784,"updated":1564706784,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-1","attributes":{"enabled":true,"created":1563476816,"updated":1563476816,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-4883244773006783","attributes":{"enabled":true,"created":1561420381,"updated":1561420381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8006354275127874","attributes":{"enabled":true,"created":1561420833,"updated":1561420833,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8686288267292417","attributes":{"enabled":true,"created":1561420689,"updated":1561420689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699601597","attributes":{"enabled":true,"created":1560195758,"updated":1560195758,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699608155","attributes":{"enabled":true,"created":1560195752,"updated":1560195752,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b4f4ead5-38c2-4800-bcad-9f95239a8356',
=======
  '1ba060ef-f920-4ea7-b494-b987ce5f8de6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:45 GMT',
  'Connection',
  'close',
  'Content-Length',
  '885' ]);
=======
  'Fri, 02 Aug 2019 00:46:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1506' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '61f991ca-9b1f-46aa-bd7c-b8704578d38a',
=======
  '1e9c86b0-c8a3-41a2-8040-53b6f04387e0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:48:44 GMT',
=======
  'Fri, 02 Aug 2019 00:46:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'bcee3424-870e-454e-a731-2065b5172400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHGwAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:48:59 GMT; path=/; secure; HttpOnly',
=======
  '81317433-be59-4276-b073-51a9cf550000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHGwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:00 GMT',
=======
  'Fri, 02 Aug 2019 00:46:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--0')
  .query(true)
<<<<<<< HEAD
  .reply(204, "", [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--0","deletedDate":1564706795,"scheduledPurgeDate":1572482795,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--0/d65c9244a50c4a98ba6100680078a67b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zaOCnlYvryB_6JQfXvnynlBumvcSdX21Qq9PBoaHAI5Hzg_58MrrhNf3ctwL-cXocVqmOe_3jAClCHGdsgeu9qWPQr3Minpxvb4Htj-HKWCOPjt4VkeE665e7V8XbYf4DaKPoXLpUZORedgCJ0lettcHs6OPHILzM3NW9TjkfRUaBcBT90sH7Vm0Hwaz8rSte7vwGn4R_P3DeRIKt2-07swK87Ec5asUL8QouzvIgeyropsMXz6DDXztFmSIbvJexadCncDZKTk1mIlJhm7Rxtz6887_97Ajej5ejEGiX55kPQ0TiKXg90jPqVy3NUW6aK1ExuWjoQCp4KksJD8wVQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706783,"updated":1564706783,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'bd1df672-abe4-4410-a338-fb5438aa679a',
=======
  'c7db1417-cb50-4879-b021-2f273f98b6bc',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:00 GMT',
=======
  'Fri, 02 Aug 2019 00:46:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8c4d820d-bb30-4c75-a992-a8f60463aee2',
=======
  '348f9447-17b1-49e0-8d98-658284f33638',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:00 GMT',
=======
  'Fri, 02 Aug 2019 00:46:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '40287032-fcff-4567-a6dd-7e968df22a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHAAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:01 GMT; path=/; secure; HttpOnly',
=======
  '9b758a90-7294-43c7-85c5-088bc1310000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:35 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:00 GMT',
=======
  'Fri, 02 Aug 2019 00:46:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1","deletedDate":1564681741,"scheduledPurgeDate":1572457741,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--1/fb305f7941134497a22938403664d4f6","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"iOef-nrmAo4YJ9kXXrX02tMyXRLOerEdEixiIA3mTCNboeGVWqu3tgY8T1IEw9ZvMmIydgqSchCd_8CdMsnN_o_4EFTYPfzACw8Jg5G5tltEnpA4MXw5Gw3xqvB_T3w1Ug51glXZ1R8NF7GS2YAUL8Z1q5BD-jww56354ZQtSye17FBAO09R2IIluTcnePBEKhpFfAujkVfB-R84hYljHdIyrOtAlyuxCDKTOLYM_D7Hpz4JVsy3SzDK86HOOXhZzw8nzHFAEhm_EUsikYg48gSwR7IaoPGDzrib9IJstLhKXDCD91eeARbOuoNdYbGhhoBKAjuReSnqCxGzjkSHqw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681710,"updated":1564681710,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4e4102e7-121b-4d08-a8c4-ad78ba73eabe',
=======
  'b20fb726-afa5-4212-9a1e-7df71e67d67a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:01 GMT',
=======
  'Fri, 02 Aug 2019 00:46:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '885' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'ef3102e7-8990-4a14-b4b7-da1a6c42db86',
=======
  '124c8cbd-d6bc-4b90-9155-1c6e07e2f3fa',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:01 GMT',
=======
  'Fri, 02 Aug 2019 00:46:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f5eb54c9-634f-4ea9-a1b8-f6e248cc2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHQAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:02 GMT; path=/; secure; HttpOnly',
=======
  '8839dbfa-d984-489f-8c2f-f2e10c010000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:46 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:02 GMT',
=======
  'Fri, 02 Aug 2019 00:46:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6c021c49-249d-4e08-932b-7038625e1e19',
=======
  '337006b0-c9bc-460d-afa7-f3a9643a39d8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:01 GMT',
=======
  'Fri, 02 Aug 2019 00:46:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7afb2cf4-e173-4bae-b0d1-f62aac7c69b7',
=======
  '2dd1a8c7-c716-4b6b-810a-1c809782122a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:12 GMT',
=======
  'Fri, 02 Aug 2019 00:46:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e6e4f37d-e889-410d-acf7-4c10c1f72400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:13 GMT; path=/; secure; HttpOnly',
=======
  '4957af88-4305-4c06-b515-9200dac03e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:13 GMT',
=======
  'Fri, 02 Aug 2019 00:46:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
<<<<<<< HEAD
  .reply(204, "", [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1","deletedDate":1564706808,"scheduledPurgeDate":1572482808,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeys--1/8e46634c5b3d42f986df520b145072a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"nP7h-tCRymDPwB_nVTzj_-YfoannXZj03RzjGK3AOuIEBQqHy5dPEaoTRNz2oaesZuj5D3-7woJg9nPvlY3H-GFQzlCrGnpwgsWpiiiYVWDKjsI0_MgX-jPvw82aZSMHOQyuWx0LmTEa3WPrbGzmHREVpezilYr95LBhLxqszAVTNi3d5239Uf5CiF5-nDkkk2n2hx9pJXVEP7xxyXO3BITj2mn99s5zs7mEv8BYoYbEDiSWi3zxGYTiIiAwucZ5K-iOQ4tOzREI34Qq-D6tgFGms9Yk73plQucShVHeLDhfKeGaJ0se47H8KHvcQZvnAQqOJhz7X3X2eZ-xVe8hNQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706784,"updated":1564706784,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '9c1b32ba-2c8e-4c93-ab47-2e0b1687d8bf',
=======
  '66c26d20-2e2f-46c0-8a3d-dd2c1db38eec',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:13 GMT',
=======
  'Fri, 02 Aug 2019 00:46:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '92863c70-1e76-4528-9633-1499e566fa0d',
=======
  '5afe877e-f843-403b-9e4f-b01c8e788f37',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:13 GMT',
=======
  'Fri, 02 Aug 2019 00:46:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'baba500b-00d4-4558-a729-4cf539262600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:14 GMT; path=/; secure; HttpOnly',
=======
  '5f867dce-8a8a-4045-ac32-eb7f9c1e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:48 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Fri, 02 Aug 2019 00:46:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fe003121-3e23-4548-a7f9-e8df2b884397',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:46:48 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e65e93b7-aa0a-4b09-a079-280a2cdf646e',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:46:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  'f7c0316a-348e-4109-849e-fc6e82000000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:46:59 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:13 GMT',
=======
  'Fri, 02 Aug 2019 00:46:59 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0/5299844074b04f76a55405a612e1c5d5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ssnPIgjKEdBL1RBqxj55lWdEOenW3YpMDcmWIF3Qxgv9E5JaTMECGOYCfg1vJC398iaBC5K3jGYNASgtBC1QvbWX0CEGdWlrtWBCgEVDRd9YtDcVUEF3X-8MHkCXO_xhqP2M_l6Qfz_PeWKbRte0LBNPJvOQF9GrZ3OoM9js82QG4FlneT17t-pf7C_8mo44G31MP0OLdy0Sba1om_qN7zBm5dJof0IlKukWKCQuTinYmvqcGokTXeCeQfPmC-a0IHiXN5RafTn03JRafiz30vYO6rTVViAwYodAoA-tDI0uuc_dAlWj0dgy41hE2ThMpP1Pzm8yYIdxjAwdiAebgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681754,"updated":1564681754,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '76118769-3d68-4a79-ac71-f826adb4295a',
=======
  '590d964e-e631-48c4-a9ac-090d5a247dc5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:14 GMT',
=======
  'Fri, 02 Aug 2019 00:46:59 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '710' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '14078793-772a-4e59-b46f-e2e9bc121051',
=======
  '884e2898-beb2-42ec-a9ff-a77937a6ea1b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:14 GMT',
=======
  'Fri, 02 Aug 2019 00:47:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '96e9244c-6449-48d5-b512-3e9d34e02e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:14 GMT; path=/; secure; HttpOnly',
=======
  'f7c2f9dd-9fa7-4867-a805-91e8d4010000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:00 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:14 GMT',
=======
  'Fri, 02 Aug 2019 00:47:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1/a26707253df74ddebb4a9ad3373dfcd0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7AYzb6blcEDt_FQRMpHarJZvg7wtQNY0mpTwTK_RcfvXP2l1dOHqLKJYmVxWh5Jkij7BFaNcmRca2M6h6cPeNh1V2jd7c9Za3Mst_r_qTwvC1E7edZI13UdLyWkujY2I2yfk-8xPWyXwBaivOQObOPz9vPZ1wTnsJAaYi-leAtqYfPYNFWoJ3J04qGS8oW1I0xFhNTdHkXo5IfJMilsq3Fju0ad5LKMpLEb6zAh9Mals_anoqZ84CjFln66r0PGYZn61ZXrscNZnnw5vgWi8Pc-sgUc3tHYI11E94c9Miuq20h5H6RsNTX0r7YSLSN68MKxMx5KLGw81KxIzgnH8lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681755,"updated":1564681755,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0/9cf3b5f312aa471da356193f2be7080f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1KSYhjtBghLxT7Ml_-a4cXdQGnaxi08u5dBkpL_E4z_QpKkyIzFDO-K2eclHsCYTKL9MbhoEgksfL2Nvcjc99vuZJVEiLh6M-NVTcqFeb2cexJMCUFFYgJIpL9oeEmyphNvoAvOCUWzQhvSecIymAft3QqObgN5LHUUA3E7OdjeJEnh9lSfGH3WRzHCVA9SMMF6nQvNGWw5RnR90PXYg-uV6NEabIjljii2LVGDb2yySaSyAphdGhC5a7MYA8juVmrzG4q3WpwGZ_00lFQD9PJfMIKjSDI3XnxwYF_2yrPmjgos_NjpN2Y3vZEQtCwjnyf6g2kCSqMTV7_aHtXy13Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706820,"updated":1564706820,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b0d932cf-770e-4f17-925a-59d5e19735b7',
=======
  'fef55b82-bd01-4e0d-b660-4366ccae2f1d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:14 GMT',
=======
  'Fri, 02 Aug 2019 00:47:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '710' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'df932f07-db76-45d0-aa67-fda7333a02c8',
=======
  '419c2503-ad07-479e-b05b-a7db1006d8d1',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:14 GMT',
=======
  'Fri, 02 Aug 2019 00:47:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'ae13f1e7-9e99-4f1e-8713-2751d5da2b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:15 GMT; path=/; secure; HttpOnly',
=======
  '8a95b4e2-b4ab-4b6f-b8e9-23cf7e353a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:01 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:15 GMT',
=======
  'Fri, 02 Aug 2019 00:47:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateadisabledkey-21596680364625942","attributes":{"enabled":false,"created":1561685638,"updated":1561685638,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EVTVJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJTMFZaVjBsVVNFNVBWRUpGUms5U1JTMHpPVFExTWpNNU9UVXlOakE0TVRFMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1/3dbfb9a43ed549a587a08fe1d8d61a24","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"gw4dxwogpt0mEL5AGyspxTPB-0fgmL4MsaHn6-sOlW3JLTOnAgIRt9ZR9zpTWFfdPVY7rdIWN4ZAPCYHH4dS-M1tVMj7R5c2CF5aNgagvpRo_DxSUiMagQKHs4oWqL0k7NFvZQ6s5oLVLzpww1FJbbhgg0_C4U56Sl53gKvLi1oflRVQW3lMsNXerG6sFWDORXTVKO6g79JT2TC6g3UGxI_IK-xdENBwJ0aHLVBdeAmXA1oYBnLgop7BPriL96P6T6p9q_MQZsreqAL-TbvIQjta-8x4Yq7nqbyTLO6d6wIahwlG6r7UpjoAfeXb-q5MqZJXniPRrZtcaN6JylDarw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706821,"updated":1564706821,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8d68d867-3017-4f92-88f9-e18379d255a3',
=======
  '7761a84a-1808-458c-b24e-7870f69180f5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:16 GMT',
=======
  'Fri, 02 Aug 2019 00:47:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '556' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '37d56c23-c205-4c22-8b47-96ed28b90c1e',
=======
  '02ea4398-dbb8-4f8e-bbff-d152249acb77',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:15 GMT',
=======
  'Fri, 02 Aug 2019 00:47:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f0a42d4c-ef91-4163-a5f0-85b36f622d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:16 GMT; path=/; secure; HttpOnly',
=======
  'ec647209-d842-42ba-9019-6e22f3c53200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:02 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:16 GMT',
=======
  'Fri, 02 Aug 2019 00:47:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMTYhTURBd01EUXpJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVIUlZSQlMwVlpMVE01TkRVeU16azVOVEkyTURneE1UVWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'af4d7d4e-6830-4878-981e-74ade86079ef',
=======
  'ae77df92-ca94-4f05-91a0-0404b21739df',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:17 GMT',
=======
  'Fri, 02 Aug 2019 00:47:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '309' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '97bf4ac7-8b1f-420c-b24c-e53471e92112',
=======
  '3e2b61c0-6c97-4968-a684-b235c4521dea',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:17 GMT',
=======
  'Fri, 02 Aug 2019 00:47:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '4a069845-0cc7-4788-85f9-4711a1e62800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:17 GMT; path=/; secure; HttpOnly',
=======
  '1f33356a-63a3-4c37-89c6-70f411290000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:03 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:17 GMT',
=======
  'Fri, 02 Aug 2019 00:47:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRYPTOTEST01","attributes":{"enabled":true,"created":1562805007,"updated":1562805007,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976015901904087","attributes":{"enabled":true,"created":1559760164,"updated":1559760164,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976018742005808","attributes":{"enabled":true,"created":1559760193,"updated":1559760193,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976035851309215","attributes":{"enabled":true,"created":1559760364,"updated":1559760364,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976038662209208","attributes":{"enabled":true,"created":1559760392,"updated":1559760392,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976059075801511","attributes":{"enabled":true,"created":1559760596,"updated":1559760596,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976061918309867","attributes":{"enabled":true,"created":1559760624,"updated":1559760624,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976088192202903","attributes":{"enabled":true,"created":1559760887,"updated":1559760887,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976090993105220","attributes":{"enabled":true,"created":1559760915,"updated":1559760915,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976118089506049","attributes":{"enabled":true,"created":1559761186,"updated":1559761186,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976120964305668","attributes":{"enabled":true,"created":1559761215,"updated":1559761215,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019567836900080","attributes":{"enabled":true,"created":1560195684,"updated":1560195684,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568419900112","attributes":{"enabled":true,"created":1560195689,"updated":1560195689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568998004417","attributes":{"enabled":false,"created":1560195695,"updated":1560195695,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNVGsxTnpBeE5UYzNNRFF3TVRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd8a2421c-0ee4-45d0-9e8f-b7d798b9c378',
=======
  '5161e406-7797-419f-8a9d-9865edbcf707',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:18 GMT',
=======
  'Fri, 02 Aug 2019 00:47:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2857' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e15b9b67-11dd-4c87-9e52-daff8e8ee9a8',
=======
  'c620e829-c3b1-4d02-b474-cece3c850706',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:18 GMT',
=======
  'Fri, 02 Aug 2019 00:47:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '018fffbc-f079-4091-8837-0c5418532a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:19 GMT; path=/; secure; HttpOnly',
=======
  '56c18eac-4909-4a68-9660-3357864d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:04 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:18 GMT',
=======
  'Fri, 02 Aug 2019 00:47:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156019570157704018","attributes":{"enabled":true,"created":1560195707,"updated":1560195707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019573560701886","attributes":{"enabled":true,"created":1560195741,"updated":1560195741,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019965517806158","attributes":{"enabled":true,"created":1560199660,"updated":1560199660,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966095601383","attributes":{"enabled":true,"created":1560199666,"updated":1560199666,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966655202551","attributes":{"enabled":false,"created":1560199672,"updated":1560199672,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019967216106153","attributes":{"enabled":true,"created":1560199678,"updated":1560199678,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019970108507840","attributes":{"enabled":true,"created":1560199707,"updated":1560199707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019971819409376","attributes":{"enabled":true,"created":1560199723,"updated":1560199723,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020041605602688","attributes":{"enabled":true,"nbf":1560200421,"created":1560200422,"updated":1560200422,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020107570005644","attributes":{"enabled":true,"exp":1560201080,"created":1560201081,"updated":1560201081,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakEyTlRZM05ERXhNRFU1TmpraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRYPTOTEST01","attributes":{"enabled":true,"created":1562805007,"updated":1562805007,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976015901904087","attributes":{"enabled":true,"created":1559760164,"updated":1559760164,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976018742005808","attributes":{"enabled":true,"created":1559760193,"updated":1559760193,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976035851309215","attributes":{"enabled":true,"created":1559760364,"updated":1559760364,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976038662209208","attributes":{"enabled":true,"created":1559760392,"updated":1559760392,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976059075801511","attributes":{"enabled":true,"created":1559760596,"updated":1559760596,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976061918309867","attributes":{"enabled":true,"created":1559760624,"updated":1559760624,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976088192202903","attributes":{"enabled":true,"created":1559760887,"updated":1559760887,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976090993105220","attributes":{"enabled":true,"created":1559760915,"updated":1559760915,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976118089506049","attributes":{"enabled":true,"created":1559761186,"updated":1559761186,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key155976120964305668","attributes":{"enabled":true,"created":1559761215,"updated":1559761215,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019567836900080","attributes":{"enabled":true,"created":1560195684,"updated":1560195684,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568419900112","attributes":{"enabled":true,"created":1560195689,"updated":1560195689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019568998004417","attributes":{"enabled":false,"created":1560195695,"updated":1560195695,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNVGsxTnpBeE5UYzNNRFF3TVRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '063cb121-16b4-421b-98da-7f85f5377ee8',
=======
  '5a84fedb-5437-4695-9152-fe495b215352',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2160' ]);
=======
  'Fri, 02 Aug 2019 00:47:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2857' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '960646a5-00af-4087-9e28-77120f11998f',
=======
  '3534f367-e463-4ef9-88d5-5c0f9a9c538c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:19 GMT',
=======
  'Fri, 02 Aug 2019 00:47:04 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '69b2b54d-3f07-4128-b4b6-875564492900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:20 GMT; path=/; secure; HttpOnly',
=======
  '384e9af1-c045-457e-9419-58d5a8b83600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:05 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:20 GMT',
=======
  'Fri, 02 Aug 2019 00:47:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021398454601816","attributes":{"enabled":true,"created":1560213990,"updated":1560213990,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399025306001","attributes":{"enabled":true,"created":1560213996,"updated":1560213996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399613005852","attributes":{"enabled":true,"created":1560214001,"updated":1560214001,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400178007355","attributes":{"enabled":true,"created":1560214008,"updated":1560214008,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400838605408","attributes":{"enabled":false,"created":1560214013,"updated":1560214013,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401405804843","attributes":{"enabled":true,"nbf":1560214019,"created":1560214019,"updated":1560214019,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401972601264","attributes":{"enabled":true,"exp":1560214024,"created":1560214025,"updated":1560214025,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021402558506955","attributes":{"enabled":false,"created":1560214031,"updated":1560214036,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021403691203484","attributes":{"enabled":true,"created":1560214042,"updated":1560214042,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakUxTWpjek5UVXlNRGN5T0RjaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156019570157704018","attributes":{"enabled":true,"created":1560195707,"updated":1560195707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019573560701886","attributes":{"enabled":true,"created":1560195741,"updated":1560195741,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019965517806158","attributes":{"enabled":true,"created":1560199660,"updated":1560199660,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966095601383","attributes":{"enabled":true,"created":1560199666,"updated":1560199666,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019966655202551","attributes":{"enabled":false,"created":1560199672,"updated":1560199672,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019967216106153","attributes":{"enabled":true,"created":1560199678,"updated":1560199678,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019970108507840","attributes":{"enabled":true,"created":1560199707,"updated":1560199707,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156019971819409376","attributes":{"enabled":true,"created":1560199723,"updated":1560199723,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020041605602688","attributes":{"enabled":true,"nbf":1560200421,"created":1560200422,"updated":1560200422,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156020107570005644","attributes":{"enabled":true,"exp":1560201080,"created":1560201081,"updated":1560201081,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakEyTlRZM05ERXhNRFU1TmpraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '66be861b-94c7-47e9-91b7-b9757666dbb0',
=======
  '98827531-9c79-405a-b2a5-4b2a8092d678',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1976' ]);
=======
  'Fri, 02 Aug 2019 00:47:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2160' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '99a94230-ffc9-4fd9-a876-9abba092f8b6',
=======
  '559b4b13-e6c8-4acd-8b96-9a6ed733f97f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:20 GMT',
=======
  'Fri, 02 Aug 2019 00:47:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '230c9841-69b6-442f-ae83-1ad4656b2600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:21 GMT; path=/; secure; HttpOnly',
=======
  'c902a98a-e659-4744-88d3-cffbc4050000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:05 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:20 GMT',
=======
  'Fri, 02 Aug 2019 00:47:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021644428906562","attributes":{"enabled":true,"created":1560216450,"updated":1560216450,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645023201050","attributes":{"enabled":true,"created":1560216455,"updated":1560216455,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645600805675","attributes":{"enabled":true,"created":1560216461,"updated":1560216461,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646164300437","attributes":{"enabled":true,"created":1560216467,"updated":1560216467,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646738603126","attributes":{"enabled":false,"created":1560216473,"updated":1560216473,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647317101069","attributes":{"enabled":true,"nbf":1560216478,"created":1560216478,"updated":1560216478,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647896109795","attributes":{"enabled":true,"exp":1560216483,"created":1560216484,"updated":1560216484,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021648457806180","attributes":{"enabled":false,"created":1560216490,"updated":1560216495,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021649588105428","attributes":{"enabled":false,"exp":1560216501,"created":1560216501,"updated":1560216507,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021652991406663","attributes":{"enabled":true,"created":1560216535,"updated":1560216535,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021654118707998","attributes":{"enabled":true,"created":1560216546,"updated":1560216546,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021655789000990","attributes":{"enabled":true,"created":1560216563,"updated":1560216563,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021698079201746","attributes":{"enabled":true,"created":1560216986,"updated":1560216986,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNamMyTVRreU5UYzFNRFV6T0RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021398454601816","attributes":{"enabled":true,"created":1560213990,"updated":1560213990,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399025306001","attributes":{"enabled":true,"created":1560213996,"updated":1560213996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021399613005852","attributes":{"enabled":true,"created":1560214001,"updated":1560214001,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400178007355","attributes":{"enabled":true,"created":1560214008,"updated":1560214008,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021400838605408","attributes":{"enabled":false,"created":1560214013,"updated":1560214013,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401405804843","attributes":{"enabled":true,"nbf":1560214019,"created":1560214019,"updated":1560214019,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021401972601264","attributes":{"enabled":true,"exp":1560214024,"created":1560214025,"updated":1560214025,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021402558506955","attributes":{"enabled":false,"created":1560214031,"updated":1560214036,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021403691203484","attributes":{"enabled":true,"created":1560214042,"updated":1560214042,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakUxTWpjek5UVXlNRGN5T0RjaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a6b7f36b-c101-4173-9725-9d975f6fef00',
=======
  'eaf35f81-9387-4337-b1cd-2b12abeb0bce',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:21 GMT',
=======
  'Fri, 02 Aug 2019 00:47:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2734' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e7c35236-ab78-4ef6-8769-f2c32852ff66',
=======
  'cec6de97-b0d1-48b7-8fd2-0cc3dc8f99d9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:21 GMT',
=======
  'Fri, 02 Aug 2019 00:47:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd4288b21-6815-4f1a-ba52-3659b0e42600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:22 GMT; path=/; secure; HttpOnly',
=======
  '280b324d-69b8-47d9-bc36-e5186b8a3800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:06 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:21 GMT',
=======
  'Fri, 02 Aug 2019 00:47:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156027682085504023","attributes":{"enabled":true,"created":1560276826,"updated":1560276826,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028175563002501","attributes":{"enabled":true,"created":1560281761,"updated":1560281761,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176140503335","attributes":{"enabled":true,"created":1560281767,"updated":1560281767,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176718009249","attributes":{"enabled":false,"created":1560281772,"updated":1560281772,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177274009592","attributes":{"enabled":true,"nbf":1560281777,"created":1560281778,"updated":1560281778,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177830101648","attributes":{"enabled":true,"exp":1560281783,"created":1560281784,"updated":1560281784,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028178407406544","attributes":{"enabled":false,"created":1560281789,"updated":1560281795,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028179546704608","attributes":{"enabled":false,"exp":1560281801,"created":1560281800,"updated":1560281806,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028182926703011","attributes":{"enabled":true,"created":1560281834,"updated":1560281834,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028184044006383","attributes":{"enabled":true,"created":1560281845,"updated":1560281845,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028189442507450","attributes":{"enabled":true,"created":1560281899,"updated":1560281899,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028205605702876","attributes":{"enabled":true,"created":1560282061,"updated":1560282061,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028212028407398","attributes":{"enabled":true,"created":1560282125,"updated":1560282125,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028213716108979","attributes":{"enabled":true,"created":1560282142,"updated":1560282142,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322090002888","attributes":{"enabled":false,"created":1560363226,"updated":1560363226,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNell6TWpJMk5UWTRNRGM0TVRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156021644428906562","attributes":{"enabled":true,"created":1560216450,"updated":1560216450,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645023201050","attributes":{"enabled":true,"created":1560216455,"updated":1560216455,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021645600805675","attributes":{"enabled":true,"created":1560216461,"updated":1560216461,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646164300437","attributes":{"enabled":true,"created":1560216467,"updated":1560216467,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021646738603126","attributes":{"enabled":false,"created":1560216473,"updated":1560216473,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647317101069","attributes":{"enabled":true,"nbf":1560216478,"created":1560216478,"updated":1560216478,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021647896109795","attributes":{"enabled":true,"exp":1560216483,"created":1560216484,"updated":1560216484,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021648457806180","attributes":{"enabled":false,"created":1560216490,"updated":1560216495,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021649588105428","attributes":{"enabled":false,"exp":1560216501,"created":1560216501,"updated":1560216507,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021652991406663","attributes":{"enabled":true,"created":1560216535,"updated":1560216535,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021654118707998","attributes":{"enabled":true,"created":1560216546,"updated":1560216546,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021655789000990","attributes":{"enabled":true,"created":1560216563,"updated":1560216563,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156021698079201746","attributes":{"enabled":true,"created":1560216986,"updated":1560216986,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNamMyTVRreU5UYzFNRFV6T0RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3870fb1e-bded-4ea4-8737-b1a5b915a8ef',
=======
  '9d14c999-4391-4a84-b6b9-e22ef7ba46d0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:22 GMT',
=======
  'Fri, 02 Aug 2019 00:47:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3105' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '5eccc668-3fbe-48bd-b9a9-7d44ca849863',
=======
  'cdf657ae-e5f2-4138-847a-c4d7aac98315',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:22 GMT',
=======
  'Fri, 02 Aug 2019 00:47:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '86b5e0cc-161a-43f7-8416-0e957a082200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:23 GMT; path=/; secure; HttpOnly',
=======
  '057877d1-2bf8-4aa2-83b1-4c129b313800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:07 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:22 GMT',
=======
  'Fri, 02 Aug 2019 00:47:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322656807812","attributes":{"enabled":true,"nbf":1560363231,"created":1560363232,"updated":1560363232,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323238409224","attributes":{"enabled":true,"exp":1560363237,"created":1560363237,"updated":1560363237,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323804901755","attributes":{"enabled":false,"created":1560363243,"updated":1560363249,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036324938907401","attributes":{"enabled":false,"exp":1560363254,"created":1560363254,"updated":1560363260,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036328289805710","attributes":{"enabled":true,"created":1560363288,"updated":1560363288,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036329384707932","attributes":{"enabled":true,"created":1560363299,"updated":1560363299,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036335353805406","attributes":{"enabled":true,"created":1560363359,"updated":1560363359,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036352635406646","attributes":{"enabled":true,"created":1560363532,"updated":1560363532,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036359055200632","attributes":{"enabled":true,"created":1560363595,"updated":1560363595,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036360747106809","attributes":{"enabled":true,"created":1560363613,"updated":1560363613,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044301853106036","attributes":{"enabled":false,"created":1560443023,"updated":1560443029,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044302953209171","attributes":{"enabled":false,"exp":1560443035,"created":1560443035,"updated":1560443040,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044306342002510","attributes":{"enabled":true,"created":1560443069,"updated":1560443069,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044307483600798","attributes":{"enabled":true,"created":1560443080,"updated":1560443080,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044314989607523","attributes":{"enabled":true,"created":1560443155,"updated":1560443155,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044316109901534","attributes":{"enabled":true,"created":1560443166,"updated":1560443166,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044360211306282","attributes":{"enabled":true,"created":1560443607,"updated":1560443607,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044369613908113","attributes":{"enabled":true,"created":1560443701,"updated":1560443701,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044371294504848","attributes":{"enabled":true,"created":1560443718,"updated":1560443718,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156048233876700601","attributes":{"enabled":true,"created":1560482344,"updated":1560482344,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdOVFF4TWpJNU1qTXpNRGczTnpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156027682085504023","attributes":{"enabled":true,"created":1560276826,"updated":1560276826,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028175563002501","attributes":{"enabled":true,"created":1560281761,"updated":1560281761,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176140503335","attributes":{"enabled":true,"created":1560281767,"updated":1560281767,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028176718009249","attributes":{"enabled":false,"created":1560281772,"updated":1560281772,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177274009592","attributes":{"enabled":true,"nbf":1560281777,"created":1560281778,"updated":1560281778,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028177830101648","attributes":{"enabled":true,"exp":1560281783,"created":1560281784,"updated":1560281784,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028178407406544","attributes":{"enabled":false,"created":1560281789,"updated":1560281795,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028179546704608","attributes":{"enabled":false,"exp":1560281801,"created":1560281800,"updated":1560281806,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028182926703011","attributes":{"enabled":true,"created":1560281834,"updated":1560281834,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028184044006383","attributes":{"enabled":true,"created":1560281845,"updated":1560281845,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028189442507450","attributes":{"enabled":true,"created":1560281899,"updated":1560281899,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028205605702876","attributes":{"enabled":true,"created":1560282061,"updated":1560282061,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028212028407398","attributes":{"enabled":true,"created":1560282125,"updated":1560282125,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156028213716108979","attributes":{"enabled":true,"created":1560282142,"updated":1560282142,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322090002888","attributes":{"enabled":false,"created":1560363226,"updated":1560363226,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNell6TWpJMk5UWTRNRGM0TVRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'ed48d7da-77aa-4574-bf92-45f8c2a3e078',
=======
  '1318253c-fc91-4f8d-9bed-2c7622e733bb',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4047' ]);
=======
  'Fri, 02 Aug 2019 00:47:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '3105' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4ce2c2fe-61c8-44ed-b2b9-6f6cfa1bfc86',
=======
  '108f3316-b109-4590-b095-5b641b7c5686',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:23 GMT',
=======
  'Fri, 02 Aug 2019 00:47:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e244b10c-21e7-4d42-8fda-0047c3e42c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:24 GMT; path=/; secure; HttpOnly',
=======
  '81954158-262a-4f3c-8bde-c2509cb03b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:08 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:23 GMT',
=======
  'Fri, 02 Aug 2019 00:47:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156054122923308772","attributes":{"enabled":true,"created":1560541235,"updated":1560541235,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953600799","attributes":{"enabled":true,"created":1560199735,"updated":1560199735,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953608137","attributes":{"enabled":true,"created":1560199740,"updated":1560199740,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308206","attributes":{"enabled":true,"created":1560216580,"updated":1560216580,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308448","attributes":{"enabled":true,"created":1560216575,"updated":1560216575,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118107647","attributes":{"enabled":true,"created":1560281922,"updated":1560281922,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118109631","attributes":{"enabled":true,"created":1560281916,"updated":1560281916,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061400928","attributes":{"enabled":true,"created":1560363381,"updated":1560363381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061402620","attributes":{"enabled":true,"created":1560363376,"updated":1560363376,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335800124","attributes":{"enabled":true,"created":1560443194,"updated":1560443194,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335808106","attributes":{"enabled":true,"created":1560443188,"updated":1560443188,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345205112","attributes":{"enabled":true,"created":1560443259,"updated":1560443259,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345209472","attributes":{"enabled":true,"created":1560443264,"updated":1560443264,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-0","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-1","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTJJV3RsZVM5TVNWTlVTMFZaVGtGTlJTMURRVTVIUlZSVVNFVldSVkpUU1U5T1UwOUdRVXRGV1Mwek1UUTNNREF5TlRJMk5ESXhOVGt5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156036322656807812","attributes":{"enabled":true,"nbf":1560363231,"created":1560363232,"updated":1560363232,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323238409224","attributes":{"enabled":true,"exp":1560363237,"created":1560363237,"updated":1560363237,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036323804901755","attributes":{"enabled":false,"created":1560363243,"updated":1560363249,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036324938907401","attributes":{"enabled":false,"exp":1560363254,"created":1560363254,"updated":1560363260,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036328289805710","attributes":{"enabled":true,"created":1560363288,"updated":1560363288,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036329384707932","attributes":{"enabled":true,"created":1560363299,"updated":1560363299,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036335353805406","attributes":{"enabled":true,"created":1560363359,"updated":1560363359,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036352635406646","attributes":{"enabled":true,"created":1560363532,"updated":1560363532,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036359055200632","attributes":{"enabled":true,"created":1560363595,"updated":1560363595,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156036360747106809","attributes":{"enabled":true,"created":1560363613,"updated":1560363613,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044301853106036","attributes":{"enabled":false,"created":1560443023,"updated":1560443029,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044302953209171","attributes":{"enabled":false,"exp":1560443035,"created":1560443035,"updated":1560443040,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044306342002510","attributes":{"enabled":true,"created":1560443069,"updated":1560443069,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044307483600798","attributes":{"enabled":true,"created":1560443080,"updated":1560443080,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044314989607523","attributes":{"enabled":true,"created":1560443155,"updated":1560443155,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044316109901534","attributes":{"enabled":true,"created":1560443166,"updated":1560443166,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044360211306282","attributes":{"enabled":true,"created":1560443607,"updated":1560443607,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044369613908113","attributes":{"enabled":true,"created":1560443701,"updated":1560443701,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156044371294504848","attributes":{"enabled":true,"created":1560443718,"updated":1560443718,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/key156048233876700601","attributes":{"enabled":true,"created":1560482344,"updated":1560482344,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdOVFF4TWpJNU1qTXpNRGczTnpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '64e6685e-501d-4521-9e25-cea4743b593e',
=======
  'd2e3fc76-ce84-46e2-897c-a6bff3f86e43',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '3192' ]);
=======
  'Fri, 02 Aug 2019 00:47:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4047' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '5bc768b3-46db-4f5b-837c-14ae8eb0db91',
=======
  'fd435490-9eda-4a53-9740-1b02feb95c1f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:24 GMT',
=======
  'Fri, 02 Aug 2019 00:47:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'b73ffd5c-8e34-4634-99e6-3304fa1e2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:24 GMT; path=/; secure; HttpOnly',
=======
  'e22f1a7f-f7c7-4850-94f5-491ba2210000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:09 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:24 GMT',
=======
  'Fri, 02 Aug 2019 00:47:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/MyKeyName","attributes":{"enabled":true,"created":1559759721,"updated":1559759721,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-beforeeachhook-05210208539653571","attributes":{"enabled":true,"created":1564167055,"updated":1564167055,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-3045841949479433","attributes":{"enabled":true,"created":1563492996,"updated":1563492996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-4217460078350159","attributes":{"enabled":true,"created":1563492026,"updated":1563492026,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-7067376901955089","attributes":{"enabled":true,"created":1563492908,"updated":1563492908,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-9299135263076788","attributes":{"enabled":true,"created":1563492791,"updated":1563492791,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-845126448195596","attributes":{"enabled":true,"created":1563391406,"updated":1563391406,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1SFJWUlRSVlpGVWtGTVNVNVRSVkpVUlVSTFJWbFRVRUZIUlVRdE1EWXhOelV4TmpNM016UTNORE13TlMwd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156054122923308772","attributes":{"enabled":true,"created":1560541235,"updated":1560541235,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953600799","attributes":{"enabled":true,"created":1560199735,"updated":1560199735,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156019972953608137","attributes":{"enabled":true,"created":1560199740,"updated":1560199740,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308206","attributes":{"enabled":true,"created":1560216580,"updated":1560216580,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156021656935308448","attributes":{"enabled":true,"created":1560216575,"updated":1560216575,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118107647","attributes":{"enabled":true,"created":1560281922,"updated":1560281922,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156028191118109631","attributes":{"enabled":true,"created":1560281916,"updated":1560281916,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061400928","attributes":{"enabled":true,"created":1560363381,"updated":1560363381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156036337061402620","attributes":{"enabled":true,"created":1560363376,"updated":1560363376,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335800124","attributes":{"enabled":true,"created":1560443194,"updated":1560443194,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044318335808106","attributes":{"enabled":true,"created":1560443188,"updated":1560443188,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345205112","attributes":{"enabled":true,"created":1560443259,"updated":1560443259,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/keys156044325345209472","attributes":{"enabled":true,"created":1560443264,"updated":1560443264,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-0","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-4844377101593087-1","attributes":{"enabled":true,"created":1561685873,"updated":1561685873,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTJJV3RsZVM5TVNWTlVTMFZaVGtGTlJTMURRVTVIUlZSVVNFVldSVkpUU1U5T1UwOUdRVXRGV1Mwek1UUTNNREF5TlRJMk5ESXhOVGt5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '0031005c-d28e-4b57-a3f7-c79874b55bd9',
=======
  'e7245207-d57d-4153-b74b-2bfab84d4d39',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1823' ]);
=======
  'Fri, 02 Aug 2019 00:47:09 GMT',
  'Connection',
  'close',
  'Content-Length',
  '3192' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '61159fcd-c320-4284-b9e8-9c6ce049b16e',
=======
  '77e94d56-f17a-48cc-a349-235582e9f8cf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:25 GMT',
=======
  'Fri, 02 Aug 2019 00:47:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '81954158-262a-4f3c-8bde-c25089f42900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:25 GMT; path=/; secure; HttpOnly',
=======
  'd158d182-99a4-493c-8a1c-a5e1ac360000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:10 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:25 GMT',
=======
  'Fri, 02 Aug 2019 00:47:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0","attributes":{"enabled":true,"created":1564681754,"updated":1564681754,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1","attributes":{"enabled":true,"created":1564681755,"updated":1564681755,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-1","attributes":{"enabled":true,"created":1563476816,"updated":1563476816,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-4883244773006783","attributes":{"enabled":true,"created":1561420381,"updated":1561420381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8006354275127874","attributes":{"enabled":true,"created":1561420833,"updated":1561420833,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8686288267292417","attributes":{"enabled":true,"created":1561420689,"updated":1561420689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699601597","attributes":{"enabled":true,"created":1560195758,"updated":1560195758,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699608155","attributes":{"enabled":true,"created":1560195752,"updated":1560195752,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/MyKeyName","attributes":{"enabled":true,"created":1559759721,"updated":1559759721,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-beforeeachhook-05210208539653571","attributes":{"enabled":true,"created":1564167055,"updated":1564167055,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-3045841949479433","attributes":{"enabled":true,"created":1563492996,"updated":1563492996,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-4217460078350159","attributes":{"enabled":true,"created":1563492026,"updated":1563492026,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-7067376901955089","attributes":{"enabled":true,"created":1563492908,"updated":1563492908,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canabortcreatingakey-9299135263076788","attributes":{"enabled":true,"created":1563492791,"updated":1563492791,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-845126448195596","attributes":{"enabled":true,"created":1563391406,"updated":1563391406,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1SFJWUlRSVlpGVWtGTVNVNVRSVkpVUlVSTFJWbFRVRUZIUlVRdE1EY3lOekE1TmpZME1ETTBORGt5TmpRdE1DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '717273eb-83ee-410e-b46e-ef556b43660f',
=======
  '39a9ba15-d57d-4301-9247-92a7cdd767a5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1738' ]);
=======
  'Fri, 02 Aug 2019 00:47:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1823' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '42578031-f99e-4fd7-8fb6-b9e6f8c11907',
=======
  'e4c7253b-05e7-4b5c-887c-7dc6c0c1b998',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:26 GMT',
=======
  'Fri, 02 Aug 2019 00:47:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd7d8987f-a788-4637-8cc0-648dd5522800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:26 GMT; path=/; secure; HttpOnly',
=======
  '42891a81-c51f-4b1d-af99-1e5a9a3a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:11 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:26 GMT',
=======
  'Fri, 02 Aug 2019 00:47:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0","deletedDate":1564681767,"scheduledPurgeDate":1572457767,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0/5299844074b04f76a55405a612e1c5d5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ssnPIgjKEdBL1RBqxj55lWdEOenW3YpMDcmWIF3Qxgv9E5JaTMECGOYCfg1vJC398iaBC5K3jGYNASgtBC1QvbWX0CEGdWlrtWBCgEVDRd9YtDcVUEF3X-8MHkCXO_xhqP2M_l6Qfz_PeWKbRte0LBNPJvOQF9GrZ3OoM9js82QG4FlneT17t-pf7C_8mo44G31MP0OLdy0Sba1om_qN7zBm5dJof0IlKukWKCQuTinYmvqcGokTXeCeQfPmC-a0IHiXN5RafTn03JRafiz30vYO6rTVViAwYodAoA-tDI0uuc_dAlWj0dgy41hE2ThMpP1Pzm8yYIdxjAwdiAebgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681754,"updated":1564681754,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0","attributes":{"enabled":true,"created":1564706820,"updated":1564706820,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1","attributes":{"enabled":true,"created":1564706821,"updated":1564706821,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-1","attributes":{"enabled":true,"created":1563476816,"updated":1563476816,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-4883244773006783","attributes":{"enabled":true,"created":1561420381,"updated":1561420381,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8006354275127874","attributes":{"enabled":true,"created":1561420833,"updated":1561420833,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-8686288267292417","attributes":{"enabled":true,"created":1561420689,"updated":1561420689,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699601597","attributes":{"enabled":true,"created":1560195758,"updated":1560195758,"recoveryLevel":"Recoverable+Purgeable"}},{"kid":"https://keyvault_name.vault.azure.net/keys/secret156019574699608155","attributes":{"enabled":true,"created":1560195752,"updated":1560195752,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6bb9f4e1-20df-417b-ae01-2ccc5f9c0f4c',
=======
  '864f5e15-b063-4e63-bf7d-4f39ed6c7061',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '895' ]);
=======
  'Fri, 02 Aug 2019 00:47:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1740' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1d63b68f-a1aa-4471-8b96-e123cf1f2f0b',
=======
  '98cba54b-054a-4ebf-9386-a91584a2fac2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:26 GMT',
=======
  'Fri, 02 Aug 2019 00:47:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '29a36dc2-c80a-46d8-9023-0673dae02b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:27 GMT; path=/; secure; HttpOnly',
=======
  'bfebcbf4-e224-48ab-91e3-a061e7380000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:11 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:26 GMT',
=======
  'Fri, 02 Aug 2019 00:47:11 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0","deletedDate":1564706832,"scheduledPurgeDate":1572482832,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--0/9cf3b5f312aa471da356193f2be7080f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1KSYhjtBghLxT7Ml_-a4cXdQGnaxi08u5dBkpL_E4z_QpKkyIzFDO-K2eclHsCYTKL9MbhoEgksfL2Nvcjc99vuZJVEiLh6M-NVTcqFeb2cexJMCUFFYgJIpL9oeEmyphNvoAvOCUWzQhvSecIymAft3QqObgN5LHUUA3E7OdjeJEnh9lSfGH3WRzHCVA9SMMF6nQvNGWw5RnR90PXYg-uV6NEabIjljii2LVGDb2yySaSyAphdGhC5a7MYA8juVmrzG4q3WpwGZ_00lFQD9PJfMIKjSDI3XnxwYF_2yrPmjgos_NjpN2Y3vZEQtCwjnyf6g2kCSqMTV7_aHtXy13Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706820,"updated":1564706820,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '31e6daeb-b628-4585-9ba2-a5e55082dca8',
=======
  '508b61a4-9605-41b1-bc82-7fb9d4f08009',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:27 GMT',
=======
  'Fri, 02 Aug 2019 00:47:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4ae9ad5e-3537-40d0-9018-cf3ac09e10e4',
=======
  '5c242a40-c888-4937-9710-8770c1faa2fe',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:47:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
  'b7819a2e-62a5-445e-ae2e-8dc79abc3800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:12 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Fri, 02 Aug 2019 00:47:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c2d4bfae-4804-4f2b-a6d8-25d54f1e705f',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:47:12 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c6905261-5411-4f81-a776-5e2bdb8ee091',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:38 GMT',
=======
  'Fri, 02 Aug 2019 00:47:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '49d6a206-8bcc-45eb-be37-38c8690f2f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:38 GMT; path=/; secure; HttpOnly',
=======
  '8b38e450-7b52-4c70-a944-91bcda510000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:37 GMT',
=======
  'Fri, 02 Aug 2019 00:47:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'df513d34-5ef7-4b7a-8a34-3a2be6351f02',
=======
  '6e18bb25-beca-4226-aaf2-fff96fa50b76',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:37 GMT',
=======
  'Fri, 02 Aug 2019 00:47:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e64a996f-87be-4a6a-b517-6aaa9f8fc158',
=======
  '7b6d1dc1-6b41-46d8-a873-977c51117fee',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:49 GMT',
=======
  'Fri, 02 Aug 2019 00:47:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '55997062-c482-4c21-8e5f-72f8df792800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:50 GMT; path=/; secure; HttpOnly',
=======
  '6470d1f3-3118-49d5-8b0f-5b8c73020000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:49 GMT',
=======
  'Fri, 02 Aug 2019 00:47:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '64efebb5-a963-48d6-a26b-4f69c1eb66e2',
=======
  'e552ad0f-7ba9-4481-9abd-55fc882146b5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:49 GMT',
=======
  'Fri, 02 Aug 2019 00:47:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8dddb234-0e6e-4b5a-a634-470823e02d28',
=======
  '0b73b978-e270-4143-afc4-b90dde3149f6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:50 GMT',
=======
  'Fri, 02 Aug 2019 00:47:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a7518e3e-d628-4e91-8c39-01e773722a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:51 GMT; path=/; secure; HttpOnly',
=======
  'a49a1af9-017e-4622-8630-27e1db2c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:35 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:50 GMT',
=======
  'Fri, 02 Aug 2019 00:47:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--1","deletedDate":1564681791,"scheduledPurgeDate":1572457791,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1/a26707253df74ddebb4a9ad3373dfcd0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7AYzb6blcEDt_FQRMpHarJZvg7wtQNY0mpTwTK_RcfvXP2l1dOHqLKJYmVxWh5Jkij7BFaNcmRca2M6h6cPeNh1V2jd7c9Za3Mst_r_qTwvC1E7edZI13UdLyWkujY2I2yfk-8xPWyXwBaivOQObOPz9vPZ1wTnsJAaYi-leAtqYfPYNFWoJ3J04qGS8oW1I0xFhNTdHkXo5IfJMilsq3Fju0ad5LKMpLEb6zAh9Mals_anoqZ84CjFln66r0PGYZn61ZXrscNZnnw5vgWi8Pc-sgUc3tHYI11E94c9Miuq20h5H6RsNTX0r7YSLSN68MKxMx5KLGw81KxIzgnH8lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681755,"updated":1564681755,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--1","deletedDate":1564706855,"scheduledPurgeDate":1572482855,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged--1/3dbfb9a43ed549a587a08fe1d8d61a24","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"gw4dxwogpt0mEL5AGyspxTPB-0fgmL4MsaHn6-sOlW3JLTOnAgIRt9ZR9zpTWFfdPVY7rdIWN4ZAPCYHH4dS-M1tVMj7R5c2CF5aNgagvpRo_DxSUiMagQKHs4oWqL0k7NFvZQ6s5oLVLzpww1FJbbhgg0_C4U56Sl53gKvLi1oflRVQW3lMsNXerG6sFWDORXTVKO6g79JT2TC6g3UGxI_IK-xdENBwJ0aHLVBdeAmXA1oYBnLgop7BPriL96P6T6p9q_MQZsreqAL-TbvIQjta-8x4Yq7nqbyTLO6d6wIahwlG6r7UpjoAfeXb-q5MqZJXniPRrZtcaN6JylDarw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706821,"updated":1564706821,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'cef3c7b5-3862-4d26-9509-4d1f70d6c3dd',
=======
  '8feffa43-5ffb-41e2-a6d7-e8e4d019eff5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:50 GMT',
=======
  'Fri, 02 Aug 2019 00:47:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '895' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '91440142-a182-4266-a8be-61e23899f748',
=======
  'c0a25cdc-d3c4-413d-a531-597bbd6ab03d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:51 GMT',
=======
  'Fri, 02 Aug 2019 00:47:36 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '6df35c98-d056-4fbe-a637-f30f8f412900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:49:51 GMT; path=/; secure; HttpOnly',
=======
  '35ea3cfd-339f-40a3-a766-5d7849580000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:36 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:51 GMT',
=======
  'Fri, 02 Aug 2019 00:47:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '244ed4b8-789c-46f3-b5f1-dcded061806b',
=======
  '35e7cc89-1db5-4841-b73a-caaf3b0e0ae4',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:49:52 GMT',
=======
  'Fri, 02 Aug 2019 00:47:36 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '861b8935-ec3b-489e-8c25-7d03164b7958',
=======
  'c7f439e6-311a-4886-be20-39d4bd6d2013',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:02 GMT',
=======
  'Fri, 02 Aug 2019 00:47:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'c5ffd091-dec4-4082-b40e-ca4c3b7d2700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:02 GMT; path=/; secure; HttpOnly',
=======
  '48680b92-6cae-4e84-969f-9fb435320000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:01 GMT',
=======
  'Fri, 02 Aug 2019 00:47:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '099f411e-698d-4935-afde-eb518354215f',
=======
  'bdc3c614-9476-4dde-95f0-1a2840653551',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:02 GMT',
=======
  'Fri, 02 Aug 2019 00:47:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeys--0/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6fb923d9-d85b-4d12-af3e-d01d83af3293',
=======
  'ea5a21c6-222e-419a-a022-eb18f7efc625',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:02 GMT',
=======
  'Fri, 02 Aug 2019 00:47:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '861956ae-cba6-4783-a6c3-e7ae24932500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:03 GMT; path=/; secure; HttpOnly',
=======
  '9b758a90-7294-43c7-85c5-088bf23b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:48 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:02 GMT',
=======
  'Fri, 02 Aug 2019 00:47:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeys--0/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0/5a0fdeadca1b4b778a715e015d698fe0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"stN8l1tTkcLqeLyhAq62kZeq-CfFSSKyv_vX6NqFJNq77ljXQELKO-GAqik0Gr5QG2Ww9KNk4Dx_nG19glcB0C_8E_BwqTzyQ0I6dIVL30V5kRLY9s4HqWJx7q25_kWGUhtyQs_jE6tUQRsTHyFfsmLC4obgmTSXTZVWGKIXsMyQlGDXWRhEIlIJZJbMsAhtzPPMQWWZcqtuxA93sz3z3lQP4R8w5pCi-kGBniFIYZ4nqq4dBy4kapeZk5et9X18KHKbSofv1pvTdYA30j9Rho8Iz35jJKr90s7xkrwPYZcWo8AbQIxhlHlRNrYdSeMYoYN4gMyXfYeWdFqKU58cmw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681804,"updated":1564681804,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0/1c819a5702044a218359bf44d82d736e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"18bKFRCf7aWxM3jtQ5P8PpB0AKFQvISjDNCFEU3qf7ssL948vyKOKVUAiMxHLnbT4wBHLHyN1DxgQweZB4NbumFGfidCgnUlzY5P6787wvnsmkuB81jGlFHwkZAqFtI6BHXOjbJxP9cpVeArkHcI0zL1ST2jAXOb9sDdn0PXaajHTJDyuZq3FbkmCjsNsXiu9tRPB9_knDO5pVjJuua9ER9IMbq1A7vYr67t2zLeeX29rVwoHoEUv83COie27xuO_uWhHWyauoul8cc7i8XdjVAUEaA9gRnV6Oa1YvYvlEO-lIXg0zd1N9weiBwKXXR2JpVhycphrTIpak6qkCRCsQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706868,"updated":1564706868,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4af6bfd3-83eb-4167-90f6-4226c4a3929a',
=======
  'a7af25b8-cd38-4526-84e5-a510132d822c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:03 GMT',
=======
  'Fri, 02 Aug 2019 00:47:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '695' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeys--1/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'be0a4f23-70e0-4757-9cbd-beef6098110f',
=======
  'd44af03d-bb82-4c75-98b5-ea628914ff23',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:03 GMT',
=======
  'Fri, 02 Aug 2019 00:47:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'ddb1f926-6b98-465b-a96d-874b34eb2a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:09 GMT; path=/; secure; HttpOnly',
=======
  'fbd8a6b1-c0ad-4d3d-89a9-ce2ed3330000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:49 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:08 GMT',
=======
  'Fri, 02 Aug 2019 00:47:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeys--1/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--1/5c543ffca3bc401eb3867399075f76c3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"g0SzajkYwyevSP2sPvQZNUkf3AywTuf2NjV-ObmTsX2BWH_F6eFGVmv3L1ize9YfWtkHbnGg-U3EGZioaAIfotDwdaqSL_aNk6ZGVbwo_Mb4s_a1OomFjAZdQcXGCQxFDSrzj7dCVb0LIXgV6EUCAST5Vzq6dFsA6vS8KWe9oKIU-Fr4hABbln_JxKeDGp9xfWG-LMHS0BLoRMeG29Kyins8gt1KFF2qzrSA9edJO3p6i6FYCmIg7MrZ_8ceEpMWWvZTIE1hW6_itaFo4xwhf7MCodIL7Qg-TOaPiDKYpAanB4RndCERPEELa8pbher8Eu6yEdZbFvQ8MdLa1dZAoQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681809,"updated":1564681809,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--1/45aa10fb109d4623a6a8e219f9e381ae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sIv4csDfFKoJJrZfcMP1b4AGvZln1a_AgZ5alzw4Db7pIVtBayVKvwX1z8XdJRrPw-PkUTGaaz35IObcRRK3pDUGJstIE2cPpuE72-2nr0fCz8fFEuyUZl5TX_x4sTU2QR2gUhARvUUKOhkTgyAhUNyyoaueEwsfDG_OllHqxbTTXbYh6Fm4kIL4ZjZgFCQGHKJ7EyL66oL1e94IHfXslQmH5kDPARF59TizvTYudbBAYJmZWJF95s6y1g6Hy_-dw21C_GR10U-E2DdhxYQcvxCA_qnaOydYl9iLkPAPzZaDP65AGAo_zhMtPkH_LxHIxYPnMtJWepiou6KBIb5jOw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706869,"updated":1564706869,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e34ad38e-73b8-4e5b-aeee-82fa3ac26e02',
=======
  'b28edd63-234b-4567-9a1d-464565f643e5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:09 GMT',
=======
  'Fri, 02 Aug 2019 00:47:49 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '695' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7fc96c22-f5de-4f28-9ba5-28975c3f5213',
=======
  'e65b69ea-fdc6-47fa-9303-659d6621e95a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:09 GMT',
=======
  'Fri, 02 Aug 2019 00:47:49 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a64b2ce8-fae1-4a73-b069-4547947b2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:10 GMT; path=/; secure; HttpOnly',
=======
  'e892b0ce-aa6a-4618-81ab-566f2bb83b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:50 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:09 GMT',
=======
  'Fri, 02 Aug 2019 00:47:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeys--0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--0","deletedDate":1564681810,"scheduledPurgeDate":1572457810,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0/5a0fdeadca1b4b778a715e015d698fe0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"stN8l1tTkcLqeLyhAq62kZeq-CfFSSKyv_vX6NqFJNq77ljXQELKO-GAqik0Gr5QG2Ww9KNk4Dx_nG19glcB0C_8E_BwqTzyQ0I6dIVL30V5kRLY9s4HqWJx7q25_kWGUhtyQs_jE6tUQRsTHyFfsmLC4obgmTSXTZVWGKIXsMyQlGDXWRhEIlIJZJbMsAhtzPPMQWWZcqtuxA93sz3z3lQP4R8w5pCi-kGBniFIYZ4nqq4dBy4kapeZk5et9X18KHKbSofv1pvTdYA30j9Rho8Iz35jJKr90s7xkrwPYZcWo8AbQIxhlHlRNrYdSeMYoYN4gMyXfYeWdFqKU58cmw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681804,"updated":1564681804,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--0","deletedDate":1564706870,"scheduledPurgeDate":1572482870,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0/1c819a5702044a218359bf44d82d736e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"18bKFRCf7aWxM3jtQ5P8PpB0AKFQvISjDNCFEU3qf7ssL948vyKOKVUAiMxHLnbT4wBHLHyN1DxgQweZB4NbumFGfidCgnUlzY5P6787wvnsmkuB81jGlFHwkZAqFtI6BHXOjbJxP9cpVeArkHcI0zL1ST2jAXOb9sDdn0PXaajHTJDyuZq3FbkmCjsNsXiu9tRPB9_knDO5pVjJuua9ER9IMbq1A7vYr67t2zLeeX29rVwoHoEUv83COie27xuO_uWhHWyauoul8cc7i8XdjVAUEaA9gRnV6Oa1YvYvlEO-lIXg0zd1N9weiBwKXXR2JpVhycphrTIpak6qkCRCsQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706868,"updated":1564706868,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8dd23689-e0af-49ab-ae16-c7877515c15e',
=======
  '2400d4d8-2a5f-4707-a399-3e9f0ca6bb3a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:09 GMT',
=======
  'Fri, 02 Aug 2019 00:47:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '865' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeys--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e3411efc-5df1-4d5c-ae33-984b9b03d7dc',
=======
  '1e941203-4029-47f7-a096-9b0c0c812be9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:10 GMT',
=======
  'Fri, 02 Aug 2019 00:47:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '0cf9883c-5bc9-4de4-8cd2-987efe612e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:11 GMT; path=/; secure; HttpOnly',
=======
  '47f9e25c-d493-4ca4-85d6-182dd6320000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:51 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:11 GMT',
=======
  'Fri, 02 Aug 2019 00:47:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeys--1')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--1","deletedDate":1564681811,"scheduledPurgeDate":1572457811,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--1/5c543ffca3bc401eb3867399075f76c3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"g0SzajkYwyevSP2sPvQZNUkf3AywTuf2NjV-ObmTsX2BWH_F6eFGVmv3L1ize9YfWtkHbnGg-U3EGZioaAIfotDwdaqSL_aNk6ZGVbwo_Mb4s_a1OomFjAZdQcXGCQxFDSrzj7dCVb0LIXgV6EUCAST5Vzq6dFsA6vS8KWe9oKIU-Fr4hABbln_JxKeDGp9xfWG-LMHS0BLoRMeG29Kyins8gt1KFF2qzrSA9edJO3p6i6FYCmIg7MrZ_8ceEpMWWvZTIE1hW6_itaFo4xwhf7MCodIL7Qg-TOaPiDKYpAanB4RndCERPEELa8pbher8Eu6yEdZbFvQ8MdLa1dZAoQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681809,"updated":1564681809,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--1","deletedDate":1564706871,"scheduledPurgeDate":1572482871,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--1/45aa10fb109d4623a6a8e219f9e381ae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sIv4csDfFKoJJrZfcMP1b4AGvZln1a_AgZ5alzw4Db7pIVtBayVKvwX1z8XdJRrPw-PkUTGaaz35IObcRRK3pDUGJstIE2cPpuE72-2nr0fCz8fFEuyUZl5TX_x4sTU2QR2gUhARvUUKOhkTgyAhUNyyoaueEwsfDG_OllHqxbTTXbYh6Fm4kIL4ZjZgFCQGHKJ7EyL66oL1e94IHfXslQmH5kDPARF59TizvTYudbBAYJmZWJF95s6y1g6Hy_-dw21C_GR10U-E2DdhxYQcvxCA_qnaOydYl9iLkPAPzZaDP65AGAo_zhMtPkH_LxHIxYPnMtJWepiou6KBIb5jOw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706869,"updated":1564706869,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e14bc849-80a1-4a0e-9105-ad684c371339',
=======
  'aadd5b11-d69e-4aa6-ac9a-0eee3135960b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:11 GMT',
=======
  'Fri, 02 Aug 2019 00:47:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '865' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'ea3ac949-4bbf-473b-8447-ddb98343cac8',
=======
  'ee4fa908-4bfb-41c6-b84d-5bc99e95ce1e',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:47:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  'a90b63fa-c307-440f-8fe0-876445140000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:47:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Fri, 02 Aug 2019 00:47:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-listdeletedkeys--0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8d0774de-0393-4989-bce6-631066a5ce66',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:47:52 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9267f0ec-af2b-4bb2-8552-12fdf1156b63',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:11 GMT',
=======
  'Fri, 02 Aug 2019 00:48:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd05829c0-6ac5-4891-815b-427dafc72700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:12 GMT; path=/; secure; HttpOnly',
=======
  '5aaa4c4d-95bc-4bf8-89ec-b06610020000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:02 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:11 GMT',
=======
  'Fri, 02 Aug 2019 00:48:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-listdeletedkeys--0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '117',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '593e4d6d-659a-4a26-967a-6862d48339d9',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Aug 2019 17:50:12 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'efdc2f90-7c02-45d1-9c67-f6e06de81ae9',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Aug 2019 17:50:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  'cd4f1c20-f405-46bd-8b66-1af737312c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:23 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Thu, 01 Aug 2019 17:50:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-listdeletedkeys--0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '117',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '2a7ffdac-6ffb-467f-807d-bf12cb746965',
=======
  '422d2afa-3c7d-4980-a6ed-7efd1ed400cf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:22 GMT',
=======
  'Fri, 02 Aug 2019 00:48:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1b73b12a-a32d-4220-a3ba-afaaedc6ad22',
=======
  'b698e816-16b8-4aa7-9334-467147a4f553',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:34 GMT',
=======
  'Fri, 02 Aug 2019 00:48:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3712160c-a992-4489-993b-ced510b32b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:34 GMT; path=/; secure; HttpOnly',
=======
  '60e58e02-d68e-4bb1-bdfb-5832d8520000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:13 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:33 GMT',
=======
  'Fri, 02 Aug 2019 00:48:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--0","deletedDate":1564681810,"scheduledPurgeDate":1572457810,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0/5a0fdeadca1b4b778a715e015d698fe0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"stN8l1tTkcLqeLyhAq62kZeq-CfFSSKyv_vX6NqFJNq77ljXQELKO-GAqik0Gr5QG2Ww9KNk4Dx_nG19glcB0C_8E_BwqTzyQ0I6dIVL30V5kRLY9s4HqWJx7q25_kWGUhtyQs_jE6tUQRsTHyFfsmLC4obgmTSXTZVWGKIXsMyQlGDXWRhEIlIJZJbMsAhtzPPMQWWZcqtuxA93sz3z3lQP4R8w5pCi-kGBniFIYZ4nqq4dBy4kapeZk5et9X18KHKbSofv1pvTdYA30j9Rho8Iz35jJKr90s7xkrwPYZcWo8AbQIxhlHlRNrYdSeMYoYN4gMyXfYeWdFqKU58cmw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681804,"updated":1564681804,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--0","deletedDate":1564706870,"scheduledPurgeDate":1572482870,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0/1c819a5702044a218359bf44d82d736e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"18bKFRCf7aWxM3jtQ5P8PpB0AKFQvISjDNCFEU3qf7ssL948vyKOKVUAiMxHLnbT4wBHLHyN1DxgQweZB4NbumFGfidCgnUlzY5P6787wvnsmkuB81jGlFHwkZAqFtI6BHXOjbJxP9cpVeArkHcI0zL1ST2jAXOb9sDdn0PXaajHTJDyuZq3FbkmCjsNsXiu9tRPB9_knDO5pVjJuua9ER9IMbq1A7vYr67t2zLeeX29rVwoHoEUv83COie27xuO_uWhHWyauoul8cc7i8XdjVAUEaA9gRnV6Oa1YvYvlEO-lIXg0zd1N9weiBwKXXR2JpVhycphrTIpak6qkCRCsQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706868,"updated":1564706868,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'ec82246a-b3f2-4ea4-8ce0-0445fde78998',
=======
  'ebb7a0ca-0341-4aa6-9a8b-1858e070c0a3',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:34 GMT',
=======
  'Fri, 02 Aug 2019 00:48:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '865' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'da22eac5-f56a-4f53-81f0-74469be92a82',
=======
  'b6cc86ce-1919-4242-bf55-dc7c0fa51191',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:34 GMT',
=======
  'Fri, 02 Aug 2019 00:48:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd7d8987f-a788-4637-8cc0-648d4a5e2800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:35 GMT; path=/; secure; HttpOnly',
=======
  '2b6db11b-158e-49db-80dc-6efa201c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:14 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:34 GMT',
=======
  'Fri, 02 Aug 2019 00:48:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateadisabledkey-3945239952608115","deletedDate":1561686237,"scheduledPurgeDate":1569462237,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateadisabledkey-3945239952608115","attributes":{"enabled":false,"created":1561686237,"updated":1561686237,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateadisabledkey-7541698336411891","deletedDate":1561685852,"scheduledPurgeDate":1569461852,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateadisabledkey-7541698336411891","attributes":{"enabled":false,"created":1561685851,"updated":1561685851,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-027153260791364264","deletedDate":1561414117,"scheduledPurgeDate":1569190117,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-027153260791364264","attributes":{"enabled":true,"created":1561414117,"updated":1561414117,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-030825440796210968","deletedDate":1561413873,"scheduledPurgeDate":1569189873,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-030825440796210968","attributes":{"enabled":true,"created":1561413873,"updated":1561413873,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-03824218588079642","deletedDate":1561685734,"scheduledPurgeDate":1569461734,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-03824218588079642","attributes":{"enabled":true,"created":1561685734,"updated":1561685734,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-11113737196703477","deletedDate":1561412406,"scheduledPurgeDate":1569188406,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-11113737196703477","attributes":{"enabled":true,"created":1561412406,"updated":1561412406,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-12295619840490901","deletedDate":1561414368,"scheduledPurgeDate":1569190368,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-12295619840490901","attributes":{"enabled":true,"created":1561414367,"updated":1561414367,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-21596680364625942","deletedDate":1561685633,"scheduledPurgeDate":1569461633,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-21596680364625942","attributes":{"enabled":true,"created":1561685633,"updated":1561685633,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-23059577576776458","deletedDate":1561685795,"scheduledPurgeDate":1569461795,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-23059577576776458","attributes":{"enabled":true,"created":1561685795,"updated":1561685795,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-2463484917953478","deletedDate":1561414027,"scheduledPurgeDate":1569190027,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-2463484917953478","attributes":{"enabled":true,"created":1561414027,"updated":1561414027,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-30282256577400357","deletedDate":1561414305,"scheduledPurgeDate":1569190305,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-30282256577400357","attributes":{"enabled":true,"created":1561414304,"updated":1561414304,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3650896677992299","deletedDate":1561685687,"scheduledPurgeDate":1569461687,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3650896677992299","attributes":{"enabled":true,"created":1561685687,"updated":1561685687,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJTMFZaVjBoSlRFVkhTVlpKVGtkQlRVRk9WVUZNVkZsUVJTMHpOalV3T0RrMk5qYzNPVGt5TWprNUwwUTBOVGxDTkVORFFUTkdNelF4TmpBNFJqaENSa1E0UTBOQ1JrVXpNa1V5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'ce8b759c-3bf0-488f-93c9-5511650e5a37',
=======
  '4aadb104-e82c-46c9-bd15-f88718219ae5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:34 GMT',
=======
  'Fri, 02 Aug 2019 00:48:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '5344' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '48bc6be4-bb0a-4cf8-934a-df10336ecb6e',
=======
  '7c208a7f-ff4f-493f-9a43-b25061bb4571',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:35 GMT',
=======
  'Fri, 02 Aug 2019 00:48:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3fb91c80-31d6-454a-b213-5e9f7dc52a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:36 GMT; path=/; secure; HttpOnly',
=======
  'c572730d-54f3-4966-99d8-d4e839702f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:15 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:35 GMT',
=======
  'Fri, 02 Aug 2019 00:48:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3945239952608115","deletedDate":1561686230,"scheduledPurgeDate":1569462230,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3945239952608115","attributes":{"enabled":true,"created":1561686229,"updated":1561686229,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-4521671903162241","deletedDate":1561412660,"scheduledPurgeDate":1569188660,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-4521671903162241","attributes":{"enabled":true,"created":1561412659,"updated":1561412659,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-49665580519739794","deletedDate":1561415149,"scheduledPurgeDate":1569191149,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-49665580519739794","attributes":{"enabled":true,"created":1561415147,"updated":1561415147,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6100746209317036","deletedDate":1561414691,"scheduledPurgeDate":1569190691,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6100746209317036","attributes":{"enabled":true,"created":1561414690,"updated":1561414690,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6143082435852443","deletedDate":1561411064,"scheduledPurgeDate":1569187064,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6143082435852443","attributes":{"enabled":true,"created":1561411063,"updated":1561411063,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6596998315181399","deletedDate":1561415010,"scheduledPurgeDate":1569191010,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6596998315181399","attributes":{"enabled":true,"created":1561415009,"updated":1561415009,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6745532996565062","deletedDate":1561415277,"scheduledPurgeDate":1569191277,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6745532996565062","attributes":{"enabled":true,"created":1561415276,"updated":1561415276,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-7541698336411891","deletedDate":1561685844,"scheduledPurgeDate":1569461844,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-7541698336411891","attributes":{"enabled":true,"created":1561685844,"updated":1561685844,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8414867982202452","deletedDate":1561414795,"scheduledPurgeDate":1569190795,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8414867982202452","attributes":{"enabled":true,"created":1561414794,"updated":1561414794,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8902329538192819","deletedDate":1561413350,"scheduledPurgeDate":1569189350,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8902329538192819","attributes":{"enabled":true,"created":1561413350,"updated":1561413350,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithexpires-3945239952608115","deletedDate":1561686240,"scheduledPurgeDate":1569462240,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithexpires-3945239952608115","attributes":{"enabled":true,"exp":1546300805,"created":1561686240,"updated":1561686240,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithexpires-7541698336411891","deletedDate":1561685855,"scheduledPurgeDate":1569461855,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithexpires-7541698336411891","attributes":{"enabled":true,"exp":1546300805,"created":1561685854,"updated":1561685854,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EVTVJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJTMFZaVjBsVVNFNVBWRUpGUms5U1JTMHpPVFExTWpNNU9UVXlOakE0TVRFMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8b16d815-2dc7-41d9-8e67-ee57a2a64f3c',
=======
  '5792af6d-0144-469b-84cb-f214e0a4954f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:35 GMT',
=======
  'Fri, 02 Aug 2019 00:48:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '5295' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3aa59b12-3c12-481f-822d-74c50a32f933',
=======
  'c9a901fd-715f-4bf8-a45e-e88ab77d2df3',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:36 GMT',
=======
  'Fri, 02 Aug 2019 00:48:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '9efa2ad2-4699-4133-a181-1a77a3182700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:37 GMT; path=/; secure; HttpOnly',
=======
  '907a6872-0c5e-4642-8114-f1995f053600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:15 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:37 GMT',
=======
  'Fri, 02 Aug 2019 00:48:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithnotBefore-3945239952608115","deletedDate":1561686239,"scheduledPurgeDate":1569462239,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithnotBefore-3945239952608115","attributes":{"enabled":true,"nbf":1546300805,"created":1561686238,"updated":1561686238,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithnotBefore-7541698336411891","deletedDate":1561685853,"scheduledPurgeDate":1569461853,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithnotBefore-7541698336411891","attributes":{"enabled":true,"nbf":1546300805,"created":1561685853,"updated":1561685853,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkey-21596680364625942","deletedDate":1561685637,"scheduledPurgeDate":1569461637,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkey-21596680364625942","attributes":{"enabled":true,"created":1561685636,"updated":1561685636,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkey-3945239952608115","deletedDate":1561686234,"scheduledPurgeDate":1569462234,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkey-3945239952608115","attributes":{"enabled":true,"created":1561686234,"updated":1561686234,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkey-7541698336411891","deletedDate":1561685849,"scheduledPurgeDate":1569461849,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkey-7541698336411891","attributes":{"enabled":true,"created":1561685848,"updated":1561685848,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-21596680364625942","deletedDate":1561685638,"scheduledPurgeDate":1569461638,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-21596680364625942","attributes":{"enabled":true,"created":1561685637,"updated":1561685637,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-3945239952608115","deletedDate":1561686236,"scheduledPurgeDate":1569462236,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-3945239952608115","attributes":{"enabled":true,"created":1561686235,"updated":1561686235,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-7541698336411891","deletedDate":1561685850,"scheduledPurgeDate":1569461850,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-7541698336411891","attributes":{"enabled":true,"created":1561685850,"updated":1561685850,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-21596680364625942","deletedDate":1561685635,"scheduledPurgeDate":1569461635,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-21596680364625942","attributes":{"enabled":true,"created":1561685634,"updated":1561685634,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-3945239952608115","deletedDate":1561686231,"scheduledPurgeDate":1569462231,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-3945239952608115","attributes":{"enabled":true,"created":1561686231,"updated":1561686231,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-6981438213869133","deletedDate":1562874910,"scheduledPurgeDate":1570650910,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-6981438213869133","attributes":{"enabled":true,"created":1562874910,"updated":1562874910,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-7541698336411891","deletedDate":1561685846,"scheduledPurgeDate":1569461846,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-7541698336411891","attributes":{"enabled":true,"created":1561685845,"updated":1561685845,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithsize-21596680364625942","deletedDate":1561685636,"scheduledPurgeDate":1569461636,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithsize-21596680364625942","attributes":{"enabled":true,"created":1561685635,"updated":1561685635,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3hJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJVbE5CUzBWWlYwbFVTRk5KV2tVdE1qRTFPVFkyT0RBek5qUTJNalU1TkRJdk1qRXhOa0ZGUVRjME9UUTRORU13TURoRFJVWTJNRVl6TkRNeFFqVTFNRVloTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '23543899-8aa1-4432-8709-13663b2108f2',
=======
  '9dfeee42-0d5b-44a4-9098-bf130ab4d3ce',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:37 GMT',
=======
  'Fri, 02 Aug 2019 00:48:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '5427' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c5c6904e-e44e-4292-b1b5-4e6afad9d9da',
=======
  '2cf4e4ba-bad9-4bd9-829e-8338c6394724',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:37 GMT',
=======
  'Fri, 02 Aug 2019 00:48:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '0bc79bb6-08b5-4450-8550-0fc377252a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:38 GMT; path=/; secure; HttpOnly',
=======
  '254ebc02-81f5-4d78-8bb8-7296643d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:16 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:37 GMT',
=======
  'Fri, 02 Aug 2019 00:48:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithsize-3945239952608115","deletedDate":1561686233,"scheduledPurgeDate":1569462233,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithsize-3945239952608115","attributes":{"enabled":true,"created":1561686232,"updated":1561686232,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithsize-7541698336411891","deletedDate":1561685847,"scheduledPurgeDate":1569461847,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithsize-7541698336411891","attributes":{"enabled":true,"created":1561685847,"updated":1561685847,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-candeleteakey-3945239952608115","deletedDate":1561686245,"scheduledPurgeDate":1569462245,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-candeleteakey-3945239952608115","attributes":{"enabled":true,"created":1561686245,"updated":1561686245,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-candeleteakey-7541698336411891","deletedDate":1561685860,"scheduledPurgeDate":1569461860,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-candeleteakey-7541698336411891","attributes":{"enabled":true,"created":1561685860,"updated":1561685860,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-041906371603109616","deletedDate":1561685972,"scheduledPurgeDate":1569461972,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-041906371603109616","attributes":{"enabled":true,"created":1561685972,"updated":1561685972,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-13938301836807887","deletedDate":1561685900,"scheduledPurgeDate":1569461900,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-13938301836807887","attributes":{"enabled":true,"created":1561685900,"updated":1561685900,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-6097754638482769","deletedDate":1561416018,"scheduledPurgeDate":1569192018,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-6097754638482769","attributes":{"enabled":true,"created":1561416018,"updated":1561416018,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-6723873262302544","deletedDate":1561415954,"scheduledPurgeDate":1569191954,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-6723873262302544","attributes":{"enabled":true,"created":1561415953,"updated":1561415953,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-7045353749486702","deletedDate":1561686157,"scheduledPurgeDate":1569462157,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-7045353749486702","attributes":{"enabled":true,"created":1561686156,"updated":1561686156,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-7541698336411891","deletedDate":1561685866,"scheduledPurgeDate":1569461866,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-7541698336411891","attributes":{"enabled":true,"created":1561685866,"updated":1561685866,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-8455281744731713","deletedDate":1561686136,"scheduledPurgeDate":1569462136,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-8455281744731713","attributes":{"enabled":true,"created":1561686135,"updated":1561686135,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-9166100965013404","deletedDate":1561686091,"scheduledPurgeDate":1569462091,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-9166100965013404","attributes":{"enabled":true,"created":1561686091,"updated":1561686091,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMTYhTURBd01EUXpJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVIUlZSQlMwVlpMVE01TkRVeU16azVOVEkyTURneE1UVWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '294ccd69-c2ba-449f-af5d-ccbaf273e432',
=======
  'a563b595-1fb7-417b-b2b7-f0bc2701858e',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:38 GMT',
=======
  'Fri, 02 Aug 2019 00:48:17 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4857' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a7bdc7cd-7d07-4828-94cf-29bfc60eed67',
=======
  '663d8779-6001-4ee2-b038-01c20845270c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:37 GMT',
=======
  'Fri, 02 Aug 2019 00:48:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'ece6dc80-abf8-4e86-adcd-48ffff592700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:38 GMT; path=/; secure; HttpOnly',
=======
  '81b2a297-5a49-4768-965e-2eac4a350000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:17 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:38 GMT',
=======
  'Fri, 02 Aug 2019 00:48:17 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetakey-3945239952608115","deletedDate":1561686248,"scheduledPurgeDate":1569462248,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-3945239952608115","attributes":{"enabled":true,"created":1561686247,"updated":1561686247,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetakey-7541698336411891","deletedDate":1561685863,"scheduledPurgeDate":1569461863,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-7541698336411891","attributes":{"enabled":true,"created":1561685862,"updated":1561685862,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetaspecificversionofakey-3945239952608115","deletedDate":1561686250,"scheduledPurgeDate":1569462250,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetaspecificversionofakey-3945239952608115","attributes":{"enabled":true,"created":1561686249,"updated":1561686249,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetaspecificversionofakey-7541698336411891","deletedDate":1561685865,"scheduledPurgeDate":1569461865,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetaspecificversionofakey-7541698336411891","attributes":{"enabled":true,"created":1561685864,"updated":1561685864,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdateadisabledkey-3945239952608115","deletedDate":1561686244,"scheduledPurgeDate":1569462244,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-3945239952608115","attributes":{"enabled":false,"exp":1546300800,"created":1561686243,"updated":1561686244,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdateadisabledkey-7541698336411891","deletedDate":1561685859,"scheduledPurgeDate":1569461859,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-7541698336411891","attributes":{"enabled":false,"exp":1546300800,"created":1561685858,"updated":1561685858,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdatekey-3945239952608115","deletedDate":1561686242,"scheduledPurgeDate":1569462242,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdatekey-3945239952608115","attributes":{"enabled":false,"created":1561686241,"updated":1561686242,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdatekey-7541698336411891","deletedDate":1561685857,"scheduledPurgeDate":1569461857,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdatekey-7541698336411891","attributes":{"enabled":false,"created":1561685856,"updated":1561685856,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test-key","deletedDate":1564437302,"scheduledPurgeDate":1572213302,"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test-key","attributes":{"enabled":true,"created":1564437301,"updated":1564437301,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CryptographyClientTestKey","deletedDate":1564415084,"scheduledPurgeDate":1572191084,"kid":"https://keyvault_name.vault.azure.net/keys/CryptographyClientTestKey","attributes":{"enabled":true,"created":1564415081,"updated":1564415081,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFU1TnpZd01UZzNOREl3TURVNE1EZ3ZPVGc0TWtVd05VVXhRMFV6TkVRMFJqbEJNRFl5UmpCQlEwUTJOVVpGUkRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '719374c8-c87a-41ea-bf6d-d33fe097822a',
=======
  'f960ffd3-a0e2-47b0-a6f7-aa1319e88df9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:39 GMT',
=======
  'Fri, 02 Aug 2019 00:48:17 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4084' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a2824c21-1ccf-4b25-9fb6-511c42f08c66',
=======
  'c50efcc8-5627-4379-ba23-10376dc5351b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:39 GMT',
=======
  'Fri, 02 Aug 2019 00:48:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a4815b86-721e-45f1-a755-b2d773511f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:39 GMT; path=/; secure; HttpOnly',
=======
  '6d19f4a6-5168-481c-a6aa-d55d85250000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:18 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:39 GMT',
=======
  'Fri, 02 Aug 2019 00:48:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019567242501310","deletedDate":1560195770,"scheduledPurgeDate":1567971770,"kid":"https://keyvault_name.vault.azure.net/keys/key156019567242501310","attributes":{"enabled":true,"created":1560195678,"updated":1560195678,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNVGsxTnpBeE5UYzNNRFF3TVRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7429d56d-5b63-4058-8bb1-ef71954d2e94',
=======
  '7761f8aa-d141-4510-985f-01ca9dbd601d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:40 GMT',
=======
  'Fri, 02 Aug 2019 00:48:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '609' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '93887291-7244-4d21-992c-2a9a17944cb7',
=======
  'd4a38bfd-297e-44a0-ae9b-ac014c51be85',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:40 GMT',
=======
  'Fri, 02 Aug 2019 00:48:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '108ceab6-acd3-4ddb-811b-3a6277a92800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:40 GMT; path=/; secure; HttpOnly',
=======
  '36fcdaeb-a880-40a6-bc9a-bfb7f0d14000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:19 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:40 GMT',
=======
  'Fri, 02 Aug 2019 00:48:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019571294800134","deletedDate":1560195724,"scheduledPurgeDate":1567971724,"kid":"https://keyvault_name.vault.azure.net/keys/key156019571294800134","attributes":{"enabled":true,"created":1560195718,"updated":1560195718,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019588703602255","deletedDate":1560195904,"scheduledPurgeDate":1567971904,"kid":"https://keyvault_name.vault.azure.net/keys/key156019588703602255","attributes":{"enabled":false,"created":1560195892,"updated":1560195892,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019614908508155","deletedDate":1560196160,"scheduledPurgeDate":1567972160,"kid":"https://keyvault_name.vault.azure.net/keys/key156019614908508155","attributes":{"enabled":true,"nbf":1560196154,"created":1560196155,"updated":1560196155,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019626145109618","deletedDate":1560196278,"scheduledPurgeDate":1567972278,"kid":"https://keyvault_name.vault.azure.net/keys/key156019626145109618","attributes":{"enabled":true,"nbf":1560196266,"created":1560196267,"updated":1560196267,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019643192308535","deletedDate":1560196443,"scheduledPurgeDate":1567972443,"kid":"https://keyvault_name.vault.azure.net/keys/key156019643192308535","attributes":{"enabled":true,"nbf":1560196436,"created":1560196437,"updated":1560196437,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019676499600673","deletedDate":1560196776,"scheduledPurgeDate":1567972776,"kid":"https://keyvault_name.vault.azure.net/keys/key156019676499600673","attributes":{"enabled":true,"nbf":1560196769,"created":1560196770,"updated":1560196770,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019678704709785","deletedDate":1560196798,"scheduledPurgeDate":1567972798,"kid":"https://keyvault_name.vault.azure.net/keys/key156019678704709785","attributes":{"enabled":true,"nbf":1560196792,"created":1560196792,"updated":1560196792,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019683131108936","deletedDate":1560196842,"scheduledPurgeDate":1567972842,"kid":"https://keyvault_name.vault.azure.net/keys/key156019683131108936","attributes":{"enabled":true,"nbf":1560196836,"created":1560196836,"updated":1560196836,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019687132907648","deletedDate":1560196888,"scheduledPurgeDate":1567972888,"kid":"https://keyvault_name.vault.azure.net/keys/key156019687132907648","attributes":{"enabled":true,"nbf":1560196876,"created":1560196876,"updated":1560196876,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019964932000764","deletedDate":1560199758,"scheduledPurgeDate":1567975758,"kid":"https://keyvault_name.vault.azure.net/keys/key156019964932000764","attributes":{"enabled":true,"created":1560199655,"updated":1560199655,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TVRrNU5qVTFNVGM0TURZeE5UZ3ZSalkyTVVNMVJrRkNOVEpETkRnMk5rRkJSVFk0TXpBMFF6Z3pRVE13TURRaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4fbdfa85-4dbd-4b6c-b665-bffe5af0ae13',
=======
  '636cd34d-d42e-4635-9449-41460c914e37',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:40 GMT',
=======
  'Fri, 02 Aug 2019 00:48:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3732' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '79e1cdec-e2cc-451c-bf83-ee947e586e63',
=======
  'dd0bc295-b89c-43f9-a2e9-6ea80ae5b37c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:41 GMT',
=======
  'Fri, 02 Aug 2019 00:48:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'fe70b550-0109-4cc3-95d7-ce811bc02b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:41 GMT; path=/; secure; HttpOnly',
=======
  '03e19496-28c8-4980-8721-f291b7010000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:41 GMT',
=======
  'Fri, 02 Aug 2019 00:48:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019968394501499","deletedDate":1560199695,"scheduledPurgeDate":1567975695,"kid":"https://keyvault_name.vault.azure.net/keys/key156019968394501499","attributes":{"enabled":true,"created":1560199689,"updated":1560199689,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020010748409548","deletedDate":1560200123,"scheduledPurgeDate":1567976123,"kid":"https://keyvault_name.vault.azure.net/keys/key156020010748409548","attributes":{"enabled":true,"nbf":1560200112,"created":1560200113,"updated":1560200113,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020097075304975","deletedDate":1560200982,"scheduledPurgeDate":1567976982,"kid":"https://keyvault_name.vault.azure.net/keys/key156020097075304975","attributes":{"enabled":true,"exp":1560200975,"created":1560200976,"updated":1560200976,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020589654200630","deletedDate":1560205908,"scheduledPurgeDate":1567981908,"kid":"https://keyvault_name.vault.azure.net/keys/key156020589654200630","attributes":{"enabled":true,"created":1560205902,"updated":1560205902,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020600810901019","deletedDate":1560206019,"scheduledPurgeDate":1567982019,"kid":"https://keyvault_name.vault.azure.net/keys/key156020600810901019","attributes":{"enabled":true,"created":1560206013,"updated":1560206013,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakEyTlRZM05ERXhNRFU1TmpraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '91f92735-8180-44fb-87e3-68bf8e38055c',
=======
  '7fe27511-f2b4-48e4-b535-8569d91e8191',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:41 GMT',
=======
  'Fri, 02 Aug 2019 00:48:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1951' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a6243254-8037-4e97-801a-adf778368a5c',
=======
  '29a37f34-3b6c-49d1-bacd-c80fc89542e3',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:42 GMT',
=======
  'Fri, 02 Aug 2019 00:48:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a64b2ce8-fae1-4a73-b069-454779822c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:42 GMT; path=/; secure; HttpOnly',
=======
  '18aef5c2-ec71-44a6-8cd4-37b85c550000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:42 GMT',
=======
  'Fri, 02 Aug 2019 00:48:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020656741105969","deletedDate":1560206579,"scheduledPurgeDate":1567982579,"kid":"https://keyvault_name.vault.azure.net/keys/key156020656741105969","attributes":{"enabled":true,"created":1560206573,"updated":1560206573,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021202578402557","deletedDate":1560212037,"scheduledPurgeDate":1567988037,"kid":"https://keyvault_name.vault.azure.net/keys/key156021202578402557","attributes":{"enabled":true,"created":1560212031,"updated":1560212031,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021212284606500","deletedDate":1560212139,"scheduledPurgeDate":1567988139,"kid":"https://keyvault_name.vault.azure.net/keys/key156021212284606500","attributes":{"enabled":true,"created":1560212128,"updated":1560212128,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021228525302930","deletedDate":1560212302,"scheduledPurgeDate":1567988302,"kid":"https://keyvault_name.vault.azure.net/keys/key156021228525302930","attributes":{"enabled":true,"created":1560212290,"updated":1560212290,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021252900505638","deletedDate":1560212547,"scheduledPurgeDate":1567988547,"kid":"https://keyvault_name.vault.azure.net/keys/key156021252900505638","attributes":{"enabled":true,"created":1560212534,"updated":1560212534,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021259169107011","deletedDate":1560212608,"scheduledPurgeDate":1567988608,"kid":"https://keyvault_name.vault.azure.net/keys/key156021259169107011","attributes":{"enabled":true,"created":1560212597,"updated":1560212597,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021275535604420","deletedDate":1560212772,"scheduledPurgeDate":1567988772,"kid":"https://keyvault_name.vault.azure.net/keys/key156021275535604420","attributes":{"enabled":true,"created":1560212760,"updated":1560212760,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021319425603898","deletedDate":1560213205,"scheduledPurgeDate":1567989205,"kid":"https://keyvault_name.vault.azure.net/keys/key156021319425603898","attributes":{"enabled":true,"created":1560213200,"updated":1560213200,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021368188700680","deletedDate":1560213698,"scheduledPurgeDate":1567989698,"kid":"https://keyvault_name.vault.azure.net/keys/key156021368188700680","attributes":{"enabled":true,"created":1560213687,"updated":1560213687,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021382077504638","deletedDate":1560213837,"scheduledPurgeDate":1567989837,"kid":"https://keyvault_name.vault.azure.net/keys/key156021382077504638","attributes":{"enabled":false,"created":1560213826,"updated":1560213832,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021397882409430","deletedDate":1560214070,"scheduledPurgeDate":1567990070,"kid":"https://keyvault_name.vault.azure.net/keys/key156021397882409430","attributes":{"enabled":true,"created":1560213984,"updated":1560213984,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TWpFek9Ua3dNalV6TURZd01ERXZSa015UWpZME9UaEZOa1JETkRnME1rSkRNVEUyTWpaR1JUa3lSakpGT0VFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '771875d6-3a01-4285-8ed9-e92617b8e19f',
=======
  '78b88718-5622-432c-995d-cc7d6834e087',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:42 GMT',
=======
  'Fri, 02 Aug 2019 00:48:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3940' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '50d4bcca-10e3-48b6-becc-9549073ce110',
=======
  '4ee6cbc2-57f2-4728-900f-ae0e52030ad6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:42 GMT',
=======
  'Fri, 02 Aug 2019 00:48:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '719869f3-6077-434c-93f4-f3836ca82300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:43 GMT; path=/; secure; HttpOnly',
=======
  '79942e24-70d0-4eb2-b59a-3472843a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:42 GMT',
=======
  'Fri, 02 Aug 2019 00:48:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021404805303613","deletedDate":1560214059,"scheduledPurgeDate":1567990059,"kid":"https://keyvault_name.vault.azure.net/keys/key156021404805303613","attributes":{"enabled":true,"created":1560214053,"updated":1560214053,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021443658305298","deletedDate":1560214455,"scheduledPurgeDate":1567990455,"kid":"https://keyvault_name.vault.azure.net/keys/key156021443658305298","attributes":{"enabled":false,"created":1560214442,"updated":1560214449,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021469847200127","deletedDate":1560214715,"scheduledPurgeDate":1567990715,"kid":"https://keyvault_name.vault.azure.net/keys/key156021469847200127","attributes":{"enabled":false,"exp":1560214704,"created":1560214704,"updated":1560214709,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021500992805037","deletedDate":1560215026,"scheduledPurgeDate":1567991026,"kid":"https://keyvault_name.vault.azure.net/keys/key156021500992805037","attributes":{"enabled":false,"exp":1560215015,"created":1560215015,"updated":1560215021,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021508931202421","deletedDate":1560215105,"scheduledPurgeDate":1567991105,"kid":"https://keyvault_name.vault.azure.net/keys/key156021508931202421","attributes":{"enabled":false,"exp":1560215095,"created":1560215094,"updated":1560215100,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakUxTWpjek5UVXlNRGN5T0RjaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd8e2c8af-4fbc-4484-824f-a7d7b994d55b',
=======
  'd000c3b1-c749-48d6-ad43-fb38bf1579c0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:44 GMT',
=======
  'Fri, 02 Aug 2019 00:48:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1972' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '2cc1fc1d-4ba3-492a-a7f1-b1b04da5c9d4',
=======
  '08e4d356-2662-4ed3-821c-395d29b0767a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:44 GMT',
=======
  'Fri, 02 Aug 2019 00:48:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '5df2dc2c-51f3-4656-ad27-40207d432200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:45 GMT; path=/; secure; HttpOnly',
=======
  '5905b8b0-d25c-4222-8d85-a90468380000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:44 GMT',
=======
  'Fri, 02 Aug 2019 00:48:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021527355207287","deletedDate":1560215290,"scheduledPurgeDate":1567991290,"kid":"https://keyvault_name.vault.azure.net/keys/key156021527355207287","attributes":{"enabled":false,"exp":1560215279,"created":1560215279,"updated":1560215284,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021572903002132","deletedDate":1560215746,"scheduledPurgeDate":1567991746,"kid":"https://keyvault_name.vault.azure.net/keys/key156021572903002132","attributes":{"enabled":false,"exp":1560215734,"created":1560215734,"updated":1560215740,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021643840901237","deletedDate":1560216615,"scheduledPurgeDate":1567992615,"kid":"https://keyvault_name.vault.azure.net/keys/key156021643840901237","attributes":{"enabled":true,"created":1560216444,"updated":1560216444,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021650717904471","deletedDate":1560216518,"scheduledPurgeDate":1567992518,"kid":"https://keyvault_name.vault.azure.net/keys/key156021650717904471","attributes":{"enabled":true,"created":1560216512,"updated":1560216512,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TWpFMk5UQTNNVGM1TURRME56RXZRMEUyT1VKQ05UUkJRVVpFTkRBMFFVSkNORFF6TWpCQlJrVkNNVEpHTWpZaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a1991209-ffd8-4cf0-aa28-53c648c0f761',
=======
  'b0a44949-fae2-4c7b-9251-4682ef4149ea',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:44 GMT',
=======
  'Fri, 02 Aug 2019 00:48:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1686' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '52418645-0cff-49c0-867a-9cfee711031c',
=======
  'c0f73c92-b84b-4eaf-b729-bf0e02bf6c11',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:45 GMT',
=======
  'Fri, 02 Aug 2019 00:48:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'c50cd5dd-ef31-4a67-81dc-27db1ed02700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:45 GMT; path=/; secure; HttpOnly',
=======
  '7066a3de-e986-43bc-a0d8-823303090000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:45 GMT',
=======
  'Fri, 02 Aug 2019 00:48:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021753923506478","deletedDate":1560217550,"scheduledPurgeDate":1567993550,"kid":"https://keyvault_name.vault.azure.net/keys/key156021753923506478","attributes":{"enabled":true,"created":1560217545,"updated":1560217545,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021772195104221","deletedDate":1560217733,"scheduledPurgeDate":1567993733,"kid":"https://keyvault_name.vault.azure.net/keys/key156021772195104221","attributes":{"enabled":true,"created":1560217727,"updated":1560217727,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026375447403976","deletedDate":1560263766,"scheduledPurgeDate":1568039766,"kid":"https://keyvault_name.vault.azure.net/keys/key156026375447403976","attributes":{"enabled":true,"created":1560263760,"updated":1560263760,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026429107509170","deletedDate":1560264308,"scheduledPurgeDate":1568040308,"kid":"https://keyvault_name.vault.azure.net/keys/key156026429107509170","attributes":{"enabled":true,"created":1560264296,"updated":1560264296,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026780583504617","deletedDate":1560267823,"scheduledPurgeDate":1568043823,"kid":"https://keyvault_name.vault.azure.net/keys/key156026780583504617","attributes":{"enabled":true,"created":1560267811,"updated":1560267811,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026937854708786","deletedDate":1560269396,"scheduledPurgeDate":1568045396,"kid":"https://keyvault_name.vault.azure.net/keys/key156026937854708786","attributes":{"enabled":true,"created":1560269384,"updated":1560269384,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027282511708087","deletedDate":1560272836,"scheduledPurgeDate":1568048836,"kid":"https://keyvault_name.vault.azure.net/keys/key156027282511708087","attributes":{"enabled":true,"created":1560272831,"updated":1560272831,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027441059203813","deletedDate":1560274422,"scheduledPurgeDate":1568050422,"kid":"https://keyvault_name.vault.azure.net/keys/key156027441059203813","attributes":{"enabled":true,"created":1560274416,"updated":1560274416,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNamMyTVRreU5UYzFNRFV6T0RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '62396d90-2e66-4dd3-865f-ad5d0b3da425',
=======
  '9e705a59-17bf-49d6-bc1c-de8df01287b5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:46 GMT',
=======
  'Fri, 02 Aug 2019 00:48:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2898' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8f8a5309-82aa-4406-a22b-c3633d8b614b',
=======
  '777ca788-67cb-48b8-864e-d1feaabf54d8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:46 GMT',
=======
  'Fri, 02 Aug 2019 00:48:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f770b0f2-bca2-48c8-9d92-ebaf65512c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:46 GMT; path=/; secure; HttpOnly',
=======
  'f089d359-a418-4781-9308-d16e6bdf4000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:24 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:45 GMT',
=======
  'Fri, 02 Aug 2019 00:48:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027619257505383","deletedDate":1560276204,"scheduledPurgeDate":1568052204,"kid":"https://keyvault_name.vault.azure.net/keys/key156027619257505383","attributes":{"enabled":true,"created":1560276198,"updated":1560276198,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027654046904526","deletedDate":1560276552,"scheduledPurgeDate":1568052552,"kid":"https://keyvault_name.vault.azure.net/keys/key156027654046904526","attributes":{"enabled":true,"created":1560276546,"updated":1560276546,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027669556403953","deletedDate":1560276707,"scheduledPurgeDate":1568052707,"kid":"https://keyvault_name.vault.azure.net/keys/key156027669556403953","attributes":{"enabled":true,"created":1560276701,"updated":1560276701,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027692061805591","deletedDate":1560276984,"scheduledPurgeDate":1568052984,"kid":"https://keyvault_name.vault.azure.net/keys/key156027692061805591","attributes":{"enabled":true,"created":1560276926,"updated":1560276926,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027875260704123","deletedDate":1560278769,"scheduledPurgeDate":1568054769,"kid":"https://keyvault_name.vault.azure.net/keys/key156027875260704123","attributes":{"enabled":true,"created":1560278758,"updated":1560278758,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028044085404301","deletedDate":1560280458,"scheduledPurgeDate":1568056458,"kid":"https://keyvault_name.vault.azure.net/keys/key156028044085404301","attributes":{"enabled":true,"created":1560280446,"updated":1560280446,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028174986105799","deletedDate":1560282270,"scheduledPurgeDate":1568058270,"kid":"https://keyvault_name.vault.azure.net/keys/key156028174986105799","attributes":{"enabled":true,"created":1560281755,"updated":1560281755,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TWpneE56YzRNekF4TURFMk5EZ3ZNVVF5TnpVMU5VUTJPVU0wTkRFd1JUaEROa00zUXpZNU0wVXdNVFZDTURVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '75312826-d873-49ba-9db5-cd0bc70a5861',
=======
  '32442855-c10b-45fd-a910-920d22690e79',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:47 GMT',
=======
  'Fri, 02 Aug 2019 00:48:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2631' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c1030d42-8ad8-467f-94a2-0cb4beef2e34',
=======
  'd0f2c744-c348-4caf-8d1b-f3eeff0947e1',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:47 GMT',
=======
  'Fri, 02 Aug 2019 00:48:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '93d25844-a57e-45b3-aed6-87eaed952900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:47 GMT; path=/; secure; HttpOnly',
=======
  '3f258797-0926-41d8-a9de-16b350290000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:25 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:47 GMT',
=======
  'Fri, 02 Aug 2019 00:48:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028180668003726","deletedDate":1560281817,"scheduledPurgeDate":1568057817,"kid":"https://keyvault_name.vault.azure.net/keys/key156028180668003726","attributes":{"enabled":true,"created":1560281812,"updated":1560281812,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028185168006865","deletedDate":1560281862,"scheduledPurgeDate":1568057862,"kid":"https://keyvault_name.vault.azure.net/keys/key156028185168006865","attributes":{"enabled":true,"created":1560281857,"updated":1560281857,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156036321495001070","deletedDate":1560363783,"scheduledPurgeDate":1568139783,"kid":"https://keyvault_name.vault.azure.net/keys/key156036321495001070","attributes":{"enabled":true,"created":1560363220,"updated":1560363220,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNell6TWpJMk5UWTRNRGM0TVRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '03213d4a-7d60-4a00-ae0f-bf09ffee9a5c',
=======
  '78a76147-082a-4090-b549-a9b7feacdfef',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:48 GMT',
=======
  'Fri, 02 Aug 2019 00:48:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1263' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd53bd30e-9ac8-46cb-95a8-5d7331f3aa7d',
=======
  '3ace8f13-9f77-46d2-a1e2-5d92e6b2c2da',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:48 GMT',
=======
  'Fri, 02 Aug 2019 00:48:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '60009036-3c13-496e-975b-1aad6b042a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:48 GMT; path=/; secure; HttpOnly',
=======
  'ad6ee7a6-8d83-40c9-a05b-238d4b250000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:47 GMT',
=======
  'Fri, 02 Aug 2019 00:48:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156036326049603673","deletedDate":1560363271,"scheduledPurgeDate":1568139271,"kid":"https://keyvault_name.vault.azure.net/keys/key156036326049603673","attributes":{"enabled":true,"created":1560363266,"updated":1560363266,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156043977101909742","deletedDate":1560439782,"scheduledPurgeDate":1568215782,"kid":"https://keyvault_name.vault.azure.net/keys/key156043977101909742","attributes":{"enabled":true,"created":1560439776,"updated":1560439776,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156044301303900132","deletedDate":1560444138,"scheduledPurgeDate":1568220138,"kid":"https://keyvault_name.vault.azure.net/keys/key156044301303900132","attributes":{"enabled":true,"exp":1560443018,"created":1560443018,"updated":1560443018,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TkRRek1ERXpNRE01TURBeE16SXZPRGRETURGR05UTkRSa0l6TkRnM1JUZzBOamN3T1RFMU9UazRPVGczTmpNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '89b1f33e-a126-4a54-ab8a-74c80c0c2425',
=======
  '3ede4af3-3acf-4683-9bcb-bb20b63a27c6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:49 GMT',
=======
  'Fri, 02 Aug 2019 00:48:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1340' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '45133765-109c-45bf-b691-3ebbab14f1b8',
=======
  '546a59d4-466d-4bdd-a338-d7008c694466',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:48 GMT',
=======
  'Fri, 02 Aug 2019 00:48:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '69b2b54d-3f07-4128-b4b6-8755885b2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:49 GMT; path=/; secure; HttpOnly',
=======
  '935d150f-fd57-4c23-accb-5f9ec2da3300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:27 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:48 GMT',
=======
  'Fri, 02 Aug 2019 00:48:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156044304097508401","deletedDate":1560443052,"scheduledPurgeDate":1568219052,"kid":"https://keyvault_name.vault.azure.net/keys/key156044304097508401","attributes":{"enabled":true,"created":1560443046,"updated":1560443046,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156048034950305703","deletedDate":1560480365,"scheduledPurgeDate":1568256365,"kid":"https://keyvault_name.vault.azure.net/keys/key156048034950305703","attributes":{"enabled":true,"created":1560480356,"updated":1560480356,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdOVFF4TWpJNU1qTXpNRGczTnpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '292ae797-68f4-4916-9e78-77387dce0568',
=======
  'c5a282f2-9ede-4d79-b76e-93550b804ee3',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:49 GMT',
=======
  'Fri, 02 Aug 2019 00:48:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '936' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '81ae28ce-ff46-49b9-bc9e-651618c837c8',
=======
  '92cccdb7-e505-43ea-b5fc-2d875d1a3f81',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:49 GMT',
=======
  'Fri, 02 Aug 2019 00:48:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'b92d28a4-ac14-43ab-ae8b-4411a4c32b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:50 GMT; path=/; secure; HttpOnly',
=======
  '5af2f7a1-c1b0-4cd0-9c2c-34fc9f390000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:28 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:49 GMT',
=======
  'Fri, 02 Aug 2019 00:48:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019984111602317","deletedDate":1560199870,"scheduledPurgeDate":1567975870,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019984111602317","attributes":{"enabled":true,"created":1560199847,"updated":1560199847,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019984111709787","deletedDate":1560199876,"scheduledPurgeDate":1567975876,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019984111709787","attributes":{"enabled":true,"created":1560199852,"updated":1560199852,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019998725306556","deletedDate":1560200016,"scheduledPurgeDate":1567976016,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019998725306556","attributes":{"enabled":true,"created":1560199993,"updated":1560199993,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019998725308881","deletedDate":1560200022,"scheduledPurgeDate":1567976022,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019998725308881","attributes":{"enabled":true,"created":1560199998,"updated":1560199998,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EVTVJV3RsZVM5TFJWbFRNVFUyTURNMk16TTNNRFl4TkRBeU5qSXdMME5DUmpRNFFqTTFNVU13UmpRek1rVTVNVEUzTTBaRVJUVkVORGszUVRBeUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'fc2c706b-2838-43a3-8c78-047df4369c86',
=======
  'd088b3de-4b64-4063-9173-f92b4ecd5b6e',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:50 GMT',
=======
  'Fri, 02 Aug 2019 00:48:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1663' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '057c72f6-af41-4f39-9a50-190aa544e3db',
=======
  '1b4148a3-7bc3-485c-9c4e-28e48db96a3e',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:50 GMT',
=======
  'Fri, 02 Aug 2019 00:48:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3bc237fe-2a96-4ff7-8b60-afc256a12800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:51 GMT; path=/; secure; HttpOnly',
=======
  'f931bb78-e504-406c-aaac-fbd22f2d3700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:29 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:50 GMT',
=======
  'Fri, 02 Aug 2019 00:48:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156043989692705349","deletedDate":1560439913,"scheduledPurgeDate":1568215913,"kid":"https://keyvault_name.vault.azure.net/keys/keys156043989692705349","attributes":{"enabled":true,"created":1560439902,"updated":1560439902,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156043989692806134","deletedDate":1560439919,"scheduledPurgeDate":1568215919,"kid":"https://keyvault_name.vault.azure.net/keys/keys156043989692806134","attributes":{"enabled":true,"created":1560439908,"updated":1560439908,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys-3147002526421592-0","deletedDate":1561686288,"scheduledPurgeDate":1569462288,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-3147002526421592-0","attributes":{"enabled":true,"created":1561686279,"updated":1561686279,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys-3147002526421592-1","deletedDate":1561686289,"scheduledPurgeDate":1569462289,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-3147002526421592-1","attributes":{"enabled":true,"created":1561686280,"updated":1561686280,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-0","deletedDate":1561686297,"scheduledPurgeDate":1569462297,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-0","attributes":{"enabled":true,"created":1561686290,"updated":1561686290,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-1","deletedDate":1561686298,"scheduledPurgeDate":1569462298,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-1","attributes":{"enabled":true,"created":1561686290,"updated":1561686290,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTJJV3RsZVM5TVNWTlVTMFZaVGtGTlJTMURRVTVIUlZSVVNFVldSVkpUU1U5T1UwOUdRVXRGV1Mwek1UUTNNREF5TlRJMk5ESXhOVGt5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd2a89c18-0220-472c-b625-3085bba6c2ae',
=======
  'e73d894d-b373-4e8f-8124-0368cd485f1b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:51 GMT',
=======
  'Fri, 02 Aug 2019 00:48:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2608' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '64d9ea42-41a0-4812-aaa0-4482d53578db',
=======
  'a25693a7-37cc-4de6-b3b4-82da4dea8fd2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:51 GMT',
=======
  'Fri, 02 Aug 2019 00:48:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '78e3cf33-7944-4dd7-bb25-10a80dda2700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:52 GMT; path=/; secure; HttpOnly',
=======
  'cd759d47-79e1-4ce1-beb3-fdafb97e3900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:30 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:52 GMT',
=======
  'Fri, 02 Aug 2019 00:48:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakey-3147002526421592","deletedDate":1561686276,"scheduledPurgeDate":1569462276,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakey-3147002526421592","attributes":{"enabled":true,"created":1561686275,"updated":1561686275,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakey-4844377101593087","deletedDate":1561685869,"scheduledPurgeDate":1569461869,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakey-4844377101593087","attributes":{"enabled":true,"created":1561685868,"updated":1561685868,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakeypaged-3147002526421592","deletedDate":1561686277,"scheduledPurgeDate":1569462277,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakeypaged-3147002526421592","attributes":{"enabled":true,"created":1561686277,"updated":1561686277,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakeypaged-4844377101593087","deletedDate":1561685871,"scheduledPurgeDate":1569461871,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakeypaged-4844377101593087","attributes":{"enabled":true,"created":1561685870,"updated":1561685870,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys-7769917610769559-0","deletedDate":1561418276,"scheduledPurgeDate":1569194276,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys-7769917610769559-0","attributes":{"enabled":true,"created":1561418275,"updated":1561418275,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys-7769917610769559-1","deletedDate":1561418277,"scheduledPurgeDate":1569194277,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys-7769917610769559-1","attributes":{"enabled":true,"created":1561418276,"updated":1561418276,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeyspaged-7769917610769559-0","deletedDate":1561419307,"scheduledPurgeDate":1569195307,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeyspaged-7769917610769559-0","attributes":{"enabled":true,"created":1561419306,"updated":1561419306,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeyspaged-7769917610769559-1","deletedDate":1561419308,"scheduledPurgeDate":1569195308,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeyspaged-7769917610769559-1","attributes":{"enabled":true,"created":1561419307,"updated":1561419307,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01EZzVJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1QlFrOVNWRU5TUlVGVVNVNUhRVXRGV1MwM01EWTNNemMyT1RBeE9UVTFNRGc1TDBVd1JUTXdNRGhGT0VFd05EUXlNakZCT0VVeE1rRTBPRGxHUWtVME5ETkJJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6b2396fb-05c8-418a-b13e-99db668bce60',
=======
  'b928dcc8-d2ea-44fd-a80f-a1790139052d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:52 GMT',
=======
  'Fri, 02 Aug 2019 00:48:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3504' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8e31c0a4-75b1-4a26-a8e6-b5be9e26c2bc',
=======
  '9f7e0906-19ae-4715-841a-576cf357044c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:53 GMT',
=======
  'Fri, 02 Aug 2019 00:48:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'dbbd1192-9052-4179-84fb-3621ce162700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:53 GMT; path=/; secure; HttpOnly',
=======
  'a5e35e51-fb23-4907-8d07-bd76a72e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:31 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:52 GMT',
=======
  'Fri, 02 Aug 2019 00:48:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-054334075264537374","deletedDate":1563396687,"scheduledPurgeDate":1571172687,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-054334075264537374","attributes":{"enabled":true,"created":1563396687,"updated":1563396687,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-8132656009076245","deletedDate":1563396700,"scheduledPurgeDate":1571172700,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-8132656009076245","attributes":{"enabled":true,"created":1563396700,"updated":1563396700,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-9299135263076788","deletedDate":1563492865,"scheduledPurgeDate":1571268865,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-9299135263076788","attributes":{"enabled":true,"nbf":1546300805,"created":1563492865,"updated":1563492865,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-4217460078350159","deletedDate":1563492026,"scheduledPurgeDate":1571268026,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-4217460078350159","attributes":{"enabled":true,"created":1563492026,"updated":1563492026,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-9863940778048328","deletedDate":1564680048,"scheduledPurgeDate":1572456048,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-9863940778048328","attributes":{"enabled":true,"created":1564680048,"updated":1564680048,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-7067376901955089","deletedDate":1563492929,"scheduledPurgeDate":1571268929,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-7067376901955089","attributes":{"enabled":true,"created":1563492929,"updated":1563492929,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-36767371368026214","deletedDate":1561687104,"scheduledPurgeDate":1569463104,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-36767371368026214","attributes":{"enabled":true,"created":1561687103,"updated":1561687103,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-89097467879021","deletedDate":1561686972,"scheduledPurgeDate":1569462972,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-89097467879021","attributes":{"enabled":true,"created":1561686972,"updated":1561686972,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-9779781603101387","deletedDate":1561686397,"scheduledPurgeDate":1569462397,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-9779781603101387","attributes":{"enabled":true,"created":1561686396,"updated":1561686396,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-0","deletedDate":1563476819,"scheduledPurgeDate":1571252819,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-0","attributes":{"enabled":true,"created":1563476816,"updated":1563476816,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1SFJWUlRSVlpGVWtGTVNVNVRSVkpVUlVSTFJWbFRVRUZIUlVRdE9URXlORGt3TmpNMU5qa3dNRGcyTkMweElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '85f1852a-80b7-4c59-997b-2a58a0c5d4a7',
=======
  'fe8d42ae-c867-4e9e-a567-8d249acad354',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:53 GMT',
=======
  'Fri, 02 Aug 2019 00:48:31 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4384' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8c00c65b-ed2f-46ba-ace0-29e16817a16f',
=======
  '3f553e3e-42b4-4bbf-abf3-4ce2728b1655',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:53 GMT',
=======
  'Fri, 02 Aug 2019 00:48:31 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'c78bcbba-9151-4c93-9f21-c543e5302500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:54 GMT; path=/; secure; HttpOnly',
=======
  '2b6db11b-158e-49db-80dc-6efadd1d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:32 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:53 GMT',
=======
  'Fri, 02 Aug 2019 00:48:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-36767371368026214","deletedDate":1561687101,"scheduledPurgeDate":1569463101,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-36767371368026214","attributes":{"enabled":true,"created":1561687068,"updated":1561687068,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-89097467879021","deletedDate":1561686970,"scheduledPurgeDate":1569462970,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-89097467879021","attributes":{"enabled":true,"created":1561686926,"updated":1561686926,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-9779781603101387","deletedDate":1561686395,"scheduledPurgeDate":1569462395,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-9779781603101387","attributes":{"enabled":true,"created":1561686361,"updated":1561686361,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-04241354248077567","deletedDate":1561723518,"scheduledPurgeDate":1569499518,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-04241354248077567","attributes":{"enabled":true,"created":1561723517,"updated":1561723517,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-15374511265428148","deletedDate":1561723606,"scheduledPurgeDate":1569499606,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-15374511265428148","attributes":{"enabled":true,"created":1561723605,"updated":1561723605,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-36767371368026214","deletedDate":1561687106,"scheduledPurgeDate":1569463106,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-36767371368026214","attributes":{"enabled":true,"created":1561687105,"updated":1561687105,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-5165836270108091","deletedDate":1561723459,"scheduledPurgeDate":1569499459,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-5165836270108091","attributes":{"enabled":true,"created":1561723458,"updated":1561723458,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-8315331351345701","deletedDate":1561723721,"scheduledPurgeDate":1569499721,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-8315331351345701","attributes":{"enabled":true,"created":1561723720,"updated":1561723720,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-89097467879021","deletedDate":1561686975,"scheduledPurgeDate":1569462975,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-89097467879021","attributes":{"enabled":true,"created":1561686974,"updated":1561686974,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazNJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1U1JWTlVUMUpGUVV0RldWZEpWRWhCUjBsV1JVNUNRVU5MVlZBdE9Ea3dPVGMwTmpjNE56a3dNakV2UlVZMFJUUXhPVEV5TVRaRE5EWXdORUZFT1VWRlFrUTNNelU1T1VNMFJUWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '72e3935d-8150-4828-9812-697b0b4f27af',
=======
  'e27ba118-52c3-4b91-9f8e-e659b8e06a6d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:53 GMT',
=======
  'Fri, 02 Aug 2019 00:48:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4038' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'cc722602-0fd5-47a8-b437-a0b55ef9cbaf',
=======
  'fbd69019-e4a3-49d2-be7c-2f257875d106',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:54 GMT',
=======
  'Fri, 02 Aug 2019 00:48:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'cce9f33a-a257-4eda-a0e1-e05f7fa42a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:54 GMT; path=/; secure; HttpOnly',
=======
  '5e7208ed-26ea-45ca-9d15-1b388a270000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:32 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:54 GMT',
=======
  'Fri, 02 Aug 2019 00:48:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","deletedDate":1561723348,"scheduledPurgeDate":1569499348,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","attributes":{"enabled":true,"created":1561723347,"updated":1561723347,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","deletedDate":1561686400,"scheduledPurgeDate":1569462400,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","attributes":{"enabled":true,"created":1561686399,"updated":1561686399,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","deletedDate":1561723310,"scheduledPurgeDate":1569499310,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","attributes":{"enabled":true,"created":1561723309,"updated":1561723309,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--0","deletedDate":1564681810,"scheduledPurgeDate":1572457810,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0","attributes":{"enabled":true,"created":1564681804,"updated":1564681804,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--1","deletedDate":1564681811,"scheduledPurgeDate":1572457811,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--1","attributes":{"enabled":true,"created":1564681809,"updated":1564681809,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-0","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-0","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-1","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-1","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","deletedDate":1561723348,"scheduledPurgeDate":1569499348,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","attributes":{"enabled":true,"created":1561723347,"updated":1561723347,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","deletedDate":1561686400,"scheduledPurgeDate":1569462400,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","attributes":{"enabled":true,"created":1561686399,"updated":1561686399,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","deletedDate":1561723310,"scheduledPurgeDate":1569499310,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","attributes":{"enabled":true,"created":1561723309,"updated":1561723309,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--0","deletedDate":1564706870,"scheduledPurgeDate":1572482870,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--0","attributes":{"enabled":true,"created":1564706868,"updated":1564706868,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys--1","deletedDate":1564706871,"scheduledPurgeDate":1572482871,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys--1","attributes":{"enabled":true,"created":1564706869,"updated":1564706869,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-0","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-0","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-1","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-1","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '78b598af-e7d5-43c8-a6c5-737a8a769619',
=======
  'c93f3e16-1b9f-453f-985b-bec156f53b62',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:55 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2782' ]);
=======
  'Fri, 02 Aug 2019 00:48:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2786' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8aef75ae-194f-4f4d-8a0f-058d83239249',
=======
  'ec5384b5-3544-430c-8415-8a8bd3aeeebb',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:55 GMT',
=======
  'Fri, 02 Aug 2019 00:48:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '89149e51-c741-489c-b623-a34b93732900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:55 GMT; path=/; secure; HttpOnly',
=======
  'f4e90d24-4825-4360-83f8-6389a32c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:33 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:54 GMT',
=======
  'Fri, 02 Aug 2019 00:48:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeys--0')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1ecd7fe3-30e5-4a90-a4a2-17a9f1b4dab3',
=======
  'be65faa2-03b0-4522-ab49-d18166b7ade6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:56 GMT',
=======
  'Fri, 02 Aug 2019 00:48:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeys--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'cb47f9f6-ec7d-441b-9c80-facf2f670967',
=======
  '70f6a859-83de-4c54-b57a-60f3516e7ba1',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:56 GMT',
=======
  'Fri, 02 Aug 2019 00:48:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '1d52a0c9-f825-46f6-918e-076162962600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:57 GMT; path=/; secure; HttpOnly',
=======
  '59b64af5-8010-457b-8ec5-8be851510000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:56 GMT',
=======
  'Fri, 02 Aug 2019 00:48:33 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeys--1')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e2c2887d-4745-4fa9-8ccd-a4814e8f36ca',
=======
  '766f3895-4430-4a86-b06a-a3b4b30968ba',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:56 GMT',
=======
  'Fri, 02 Aug 2019 00:48:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeyspaged--0/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '09f433ef-d745-4752-9da3-b18b917c333e',
=======
  'f87be680-a7b4-420d-a495-14df15a6c585',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:57 GMT',
=======
  'Fri, 02 Aug 2019 00:48:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e9a43c43-c6a6-43e7-9724-f026aaa12a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:57 GMT; path=/; secure; HttpOnly',
=======
  '105840d7-7e31-4272-81c1-c76e914f0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHJAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:35 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:57 GMT',
=======
  'Fri, 02 Aug 2019 00:48:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeyspaged--0/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0/d613c2bd93aa47adb2a522a069a358c8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zZHfOovycOcFukiVcDoIenKtr-hKW3sph8lwZF-2aRBQSvdHihPGHAKe0-j5KxHPdhyLZ8mxECQsTmIARn9rZNQ38Q22K0s7mah3J7pmn9BhmSoEtfdmOujO8IW4FI3C96KaeUG4qy_igwHcJUKee8Q0QgwiYnV_ykhNmH2TSXW0SqcGU1izn4X-P1pd4L44HSHR558hmmwDqVdd7kKqGs-gcVv8yBCYUCAoSu7juAqCI0eGW9OI2_LiKTABsF33aeKFUQXpb25BTC0Pf3tVn89t4_AbbhLrA0kWidJwfV8ziaX-kCCs_dHXFAvCbl3-F_YlYSSgJ64G5hMFCmI60w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681858,"updated":1564681858,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0/e26d68bce6894f279487ee3d237f1e53","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uiaeeME_As_53I9TModmW0w1Wwb8A5YYsYF3lDaXZ3FU5A15K5Dey-JOLbZDwFLeF5ge4s8W-Db-imbG0lSeekeVwXu6LlFTQ400dyKxK93I_AqlFtMTnYuxdS6N3FzwBbyXzJbCcqA5CBSbM599oQaeZbYq4kRk6wKBtfpFjTxC2YSC31SKho5V02SzQK_YZ4uRQhSJLLRIz4NfNThuApnzyh2OaWIkKkMxc0L4vdJMz-pgAAVWD4F3yeHNv5M6s-PzUiMm1gwJP327szc_b6Pekc3KNyKD_ZytQ-KmPsWzqqZXOaU33cVHs1ed_lchw1hOSA9aagFpSn-R5_lqtQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706915,"updated":1564706915,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '613287cb-02c0-4dd2-8d85-d2e55f2aca49',
=======
  '66144ae8-a813-413b-92d4-08a49524df29',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:57 GMT',
=======
  'Fri, 02 Aug 2019 00:48:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '700' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeyspaged--1/create')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'fe8a25cc-8c43-4a76-821a-c35b39e2348b',
=======
  '260b57f2-06dc-4492-9723-47f824fac232',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:57 GMT',
=======
  'Fri, 02 Aug 2019 00:48:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '0e700c42-ce5c-414b-986e-9971e9b62200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:58 GMT; path=/; secure; HttpOnly',
=======
  '1bb1718b-4aa9-4c67-9cae-de9383093e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:36 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:58 GMT',
=======
  'Fri, 02 Aug 2019 00:48:35 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-listdeletedkeyspaged--1/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--1/5641192ce5d24f39aad61ad6c1c7a033","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"teWWXTwElr57Cf9JD5HNjKFt-c-NsHiraMcbich7DFup7ske0eQ0EaLYFqW4VwV1eOkimgvpMjpxrzz3ZRigQcCaIToUbFZ72O2y-HyKYj-dUbxgPh_PM-ZC6wPC2NuF5QY3XvQszN1zJMUzzmqgOVzN2ccqrwE57yZGtLKtPks1uF4vIpGI2gMRlmvmaDDe9QOFqzH_r7Tq-OIaR5tduCuFl0jAgXU94kY6uXBLrjocmAWR5DtSt8aWOm7oQcHZ24LRWXs9p6FR0Rt9ZKcBOwIjftw2fHHnQohDLBV_uecRoHRvXco3SiqgxKATZC2_OShs4uphQ6MwusZjJ1uAAw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681859,"updated":1564681859,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--1/e92a696ebf224d4d933accdbcf1f93f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"objw8xpDameW7dmeWo_dOHxieeOE6WlWSxQDWtMDpdeahVFM4XOHihpqEU6dm0FQZr6iiQObDYXtWSjVOyUDNSCeduUfYemP3ScPTumEwxMv0zPQhtbcE1NkRiiulMqI7VjOB4u-94hPROwvSYyNVj5xPwDUVzyJ0g9BZQE0nAXjawAzlYjvH67CnZ4ULqAi7dullUnCuVbVhe-fJGzz2XIf0eHfPEVJfA6Fb3de5m1ZGVHWM0DkvfxEsnKMziIg6hP87lvBrFOZ23x5TkmwLV3LYQ2cYrRSODjsvp060fu9XL0mN5dAXZsTBzNMZBJmw5zhdJN3mb5r92Xvznyr8w","e":"AQAB"},"attributes":{"enabled":true,"created":1564706916,"updated":1564706916,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '91e3a36b-a801-4878-839f-c8664b0dbd21',
=======
  'ec75fcf3-e9a7-496c-adef-8a1d185162dd',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:58 GMT',
=======
  'Fri, 02 Aug 2019 00:48:36 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '700' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'f33dfb5f-8293-4c2f-9984-87c78a564682',
=======
  'd2e3b8b1-b0ee-45ad-a158-65fd0e6f0e5f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:59 GMT',
=======
  'Fri, 02 Aug 2019 00:48:36 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'cf04696e-4005-4a03-b987-9d7531d62e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:50:59 GMT; path=/; secure; HttpOnly',
=======
  'e29d2079-97e8-4d9e-b677-f2efca130000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:37 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:50:58 GMT',
=======
  'Fri, 02 Aug 2019 00:48:36 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--0","deletedDate":1564681860,"scheduledPurgeDate":1572457860,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0/d613c2bd93aa47adb2a522a069a358c8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zZHfOovycOcFukiVcDoIenKtr-hKW3sph8lwZF-2aRBQSvdHihPGHAKe0-j5KxHPdhyLZ8mxECQsTmIARn9rZNQ38Q22K0s7mah3J7pmn9BhmSoEtfdmOujO8IW4FI3C96KaeUG4qy_igwHcJUKee8Q0QgwiYnV_ykhNmH2TSXW0SqcGU1izn4X-P1pd4L44HSHR558hmmwDqVdd7kKqGs-gcVv8yBCYUCAoSu7juAqCI0eGW9OI2_LiKTABsF33aeKFUQXpb25BTC0Pf3tVn89t4_AbbhLrA0kWidJwfV8ziaX-kCCs_dHXFAvCbl3-F_YlYSSgJ64G5hMFCmI60w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681858,"updated":1564681858,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--0","deletedDate":1564706917,"scheduledPurgeDate":1572482917,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0/e26d68bce6894f279487ee3d237f1e53","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uiaeeME_As_53I9TModmW0w1Wwb8A5YYsYF3lDaXZ3FU5A15K5Dey-JOLbZDwFLeF5ge4s8W-Db-imbG0lSeekeVwXu6LlFTQ400dyKxK93I_AqlFtMTnYuxdS6N3FzwBbyXzJbCcqA5CBSbM599oQaeZbYq4kRk6wKBtfpFjTxC2YSC31SKho5V02SzQK_YZ4uRQhSJLLRIz4NfNThuApnzyh2OaWIkKkMxc0L4vdJMz-pgAAVWD4F3yeHNv5M6s-PzUiMm1gwJP327szc_b6Pekc3KNyKD_ZytQ-KmPsWzqqZXOaU33cVHs1ed_lchw1hOSA9aagFpSn-R5_lqtQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706915,"updated":1564706915,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '2cc3228e-1069-44f9-86d4-ccbbe1b3506f',
=======
  '218ee454-3eb2-4df5-8b54-8c7334e78ee4',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:00 GMT',
=======
  'Fri, 02 Aug 2019 00:48:37 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '875' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeyspaged--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7f5c2b5a-22bb-4928-80be-e18155991940',
=======
  'aa8fdfcf-cc21-4fe1-b9f3-c019e6c66d18',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:00 GMT',
=======
  'Fri, 02 Aug 2019 00:48:37 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '28a65cf0-4e92-4890-9ec9-6299572a2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:00 GMT; path=/; secure; HttpOnly',
=======
  '9aefa5b9-c664-4081-8922-42a373320000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:37 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:00 GMT',
=======
  'Fri, 02 Aug 2019 00:48:37 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-listdeletedkeyspaged--1')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--1","deletedDate":1564681860,"scheduledPurgeDate":1572457860,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--1/5641192ce5d24f39aad61ad6c1c7a033","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"teWWXTwElr57Cf9JD5HNjKFt-c-NsHiraMcbich7DFup7ske0eQ0EaLYFqW4VwV1eOkimgvpMjpxrzz3ZRigQcCaIToUbFZ72O2y-HyKYj-dUbxgPh_PM-ZC6wPC2NuF5QY3XvQszN1zJMUzzmqgOVzN2ccqrwE57yZGtLKtPks1uF4vIpGI2gMRlmvmaDDe9QOFqzH_r7Tq-OIaR5tduCuFl0jAgXU94kY6uXBLrjocmAWR5DtSt8aWOm7oQcHZ24LRWXs9p6FR0Rt9ZKcBOwIjftw2fHHnQohDLBV_uecRoHRvXco3SiqgxKATZC2_OShs4uphQ6MwusZjJ1uAAw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681859,"updated":1564681859,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--1","deletedDate":1564706918,"scheduledPurgeDate":1572482918,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--1/e92a696ebf224d4d933accdbcf1f93f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"objw8xpDameW7dmeWo_dOHxieeOE6WlWSxQDWtMDpdeahVFM4XOHihpqEU6dm0FQZr6iiQObDYXtWSjVOyUDNSCeduUfYemP3ScPTumEwxMv0zPQhtbcE1NkRiiulMqI7VjOB4u-94hPROwvSYyNVj5xPwDUVzyJ0g9BZQE0nAXjawAzlYjvH67CnZ4ULqAi7dullUnCuVbVhe-fJGzz2XIf0eHfPEVJfA6Fb3de5m1ZGVHWM0DkvfxEsnKMziIg6hP87lvBrFOZ23x5TkmwLV3LYQ2cYrRSODjsvp060fu9XL0mN5dAXZsTBzNMZBJmw5zhdJN3mb5r92Xvznyr8w","e":"AQAB"},"attributes":{"enabled":true,"created":1564706916,"updated":1564706916,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7004293b-aef0-4290-bf74-9ab585435038',
=======
  '24c44ec5-63a5-4c3b-8621-7aa8215dc033',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:00 GMT',
=======
  'Fri, 02 Aug 2019 00:48:37 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '875' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '939204b5-6869-4445-b9ca-d360fb8b0759',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Aug 2019 17:51:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
  '4b9ebd79-f362-4678-85e8-1ecf08672600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:01 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Thu, 01 Aug 2019 17:51:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-listdeletedkeyspaged--0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '122',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '28cf488b-779e-4b49-be8b-2d96bdf30ab4',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Aug 2019 17:51:01 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '782ba53d-d31f-4084-b5fa-de50f4e94e4a',
=======
  '6cf945ad-8ef5-4713-833a-f4d0aa7a500b',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:48:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  '26a5e2ae-d3f3-4558-a593-cab4f3120000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:38 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Fri, 02 Aug 2019 00:48:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-listdeletedkeyspaged--0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '034bbca1-1866-4794-8627-8ab840cac1ec',
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Aug 2019 00:48:38 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6833281c-e0ae-457b-bc49-c9ad68d8b4bc',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:12 GMT',
=======
  'Fri, 02 Aug 2019 00:48:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '64bef91f-49f1-4e69-9a90-a6d97aab2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:12 GMT; path=/; secure; HttpOnly',
=======
  '6bf91015-8efe-40ea-b3a9-4b863eb93100',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:48:49 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:12 GMT',
=======
  'Fri, 02 Aug 2019 00:48:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-listdeletedkeyspaged--0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '122',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '950f9be4-ac7e-4647-bb11-23ac5e8ebf82',
=======
  '3d9d2b72-c3f9-469d-849a-07c35dbcdd48',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:13 GMT',
=======
  'Fri, 02 Aug 2019 00:48:49 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd118b5ac-970f-4044-a5df-67c05d8e9323',
=======
  '9d993138-bb66-438b-8493-13ccfebbeea8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:23 GMT',
=======
  'Fri, 02 Aug 2019 00:49:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e77e7d18-a953-4df3-8d8c-ddba59fb2700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:24 GMT; path=/; secure; HttpOnly',
=======
  'b7819a2e-62a5-445e-ae2e-8dc75dd43800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:00 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:24 GMT',
=======
  'Fri, 02 Aug 2019 00:48:59 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--0","deletedDate":1564681860,"scheduledPurgeDate":1572457860,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0/d613c2bd93aa47adb2a522a069a358c8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zZHfOovycOcFukiVcDoIenKtr-hKW3sph8lwZF-2aRBQSvdHihPGHAKe0-j5KxHPdhyLZ8mxECQsTmIARn9rZNQ38Q22K0s7mah3J7pmn9BhmSoEtfdmOujO8IW4FI3C96KaeUG4qy_igwHcJUKee8Q0QgwiYnV_ykhNmH2TSXW0SqcGU1izn4X-P1pd4L44HSHR558hmmwDqVdd7kKqGs-gcVv8yBCYUCAoSu7juAqCI0eGW9OI2_LiKTABsF33aeKFUQXpb25BTC0Pf3tVn89t4_AbbhLrA0kWidJwfV8ziaX-kCCs_dHXFAvCbl3-F_YlYSSgJ64G5hMFCmI60w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681858,"updated":1564681858,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--0","deletedDate":1564706917,"scheduledPurgeDate":1572482917,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0/e26d68bce6894f279487ee3d237f1e53","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uiaeeME_As_53I9TModmW0w1Wwb8A5YYsYF3lDaXZ3FU5A15K5Dey-JOLbZDwFLeF5ge4s8W-Db-imbG0lSeekeVwXu6LlFTQ400dyKxK93I_AqlFtMTnYuxdS6N3FzwBbyXzJbCcqA5CBSbM599oQaeZbYq4kRk6wKBtfpFjTxC2YSC31SKho5V02SzQK_YZ4uRQhSJLLRIz4NfNThuApnzyh2OaWIkKkMxc0L4vdJMz-pgAAVWD4F3yeHNv5M6s-PzUiMm1gwJP327szc_b6Pekc3KNyKD_ZytQ-KmPsWzqqZXOaU33cVHs1ed_lchw1hOSA9aagFpSn-R5_lqtQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706915,"updated":1564706915,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '69bc79fa-e21b-4982-ab26-76947fa023ac',
=======
  '97fa811b-38c7-481d-af67-0d7f03fb1be6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:24 GMT',
=======
  'Fri, 02 Aug 2019 00:48:59 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '875' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '062d053e-fd63-4687-b447-02af5ebce8da',
=======
  '19f79901-875b-4929-9980-1b2e77faebc7',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:24 GMT',
=======
  'Fri, 02 Aug 2019 00:49:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '9c2c1c14-cbe4-47ac-bdc0-bf4aa6432d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:25 GMT; path=/; secure; HttpOnly',
=======
  '8a95b4e2-b4ab-4b6f-b8e9-23cf804d3a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:01 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:24 GMT',
=======
  'Fri, 02 Aug 2019 00:49:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateadisabledkey-3945239952608115","deletedDate":1561686237,"scheduledPurgeDate":1569462237,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateadisabledkey-3945239952608115","attributes":{"enabled":false,"created":1561686237,"updated":1561686237,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateadisabledkey-7541698336411891","deletedDate":1561685852,"scheduledPurgeDate":1569461852,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateadisabledkey-7541698336411891","attributes":{"enabled":false,"created":1561685851,"updated":1561685851,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-027153260791364264","deletedDate":1561414117,"scheduledPurgeDate":1569190117,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-027153260791364264","attributes":{"enabled":true,"created":1561414117,"updated":1561414117,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-030825440796210968","deletedDate":1561413873,"scheduledPurgeDate":1569189873,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-030825440796210968","attributes":{"enabled":true,"created":1561413873,"updated":1561413873,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-03824218588079642","deletedDate":1561685734,"scheduledPurgeDate":1569461734,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-03824218588079642","attributes":{"enabled":true,"created":1561685734,"updated":1561685734,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-11113737196703477","deletedDate":1561412406,"scheduledPurgeDate":1569188406,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-11113737196703477","attributes":{"enabled":true,"created":1561412406,"updated":1561412406,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-12295619840490901","deletedDate":1561414368,"scheduledPurgeDate":1569190368,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-12295619840490901","attributes":{"enabled":true,"created":1561414367,"updated":1561414367,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-21596680364625942","deletedDate":1561685633,"scheduledPurgeDate":1569461633,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-21596680364625942","attributes":{"enabled":true,"created":1561685633,"updated":1561685633,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-23059577576776458","deletedDate":1561685795,"scheduledPurgeDate":1569461795,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-23059577576776458","attributes":{"enabled":true,"created":1561685795,"updated":1561685795,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-2463484917953478","deletedDate":1561414027,"scheduledPurgeDate":1569190027,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-2463484917953478","attributes":{"enabled":true,"created":1561414027,"updated":1561414027,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-30282256577400357","deletedDate":1561414305,"scheduledPurgeDate":1569190305,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-30282256577400357","attributes":{"enabled":true,"created":1561414304,"updated":1561414304,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3650896677992299","deletedDate":1561685687,"scheduledPurgeDate":1569461687,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3650896677992299","attributes":{"enabled":true,"created":1561685687,"updated":1561685687,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJTMFZaVjBoSlRFVkhTVlpKVGtkQlRVRk9WVUZNVkZsUVJTMHpOalV3T0RrMk5qYzNPVGt5TWprNUwwUTBOVGxDTkVORFFUTkdNelF4TmpBNFJqaENSa1E0UTBOQ1JrVXpNa1V5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'dfd86b23-c4c9-4cf5-a8e8-91ede2002dee',
=======
  '3a42a40f-7e95-460e-bdbb-b7b9fcb6df7f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:25 GMT',
=======
  'Fri, 02 Aug 2019 00:49:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '5344' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b13695ac-4da7-4ff1-92d2-fc847013a50f',
=======
  'dbf69b41-078d-431b-8192-05bbdf3fa960',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:25 GMT',
=======
  'Fri, 02 Aug 2019 00:49:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '47603ee1-cbce-4527-9e16-db8571742a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:26 GMT; path=/; secure; HttpOnly',
=======
  '73fc0c28-19f3-47c5-a0c8-be23553c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:02 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:25 GMT',
=======
  'Fri, 02 Aug 2019 00:49:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3945239952608115","deletedDate":1561686230,"scheduledPurgeDate":1569462230,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-3945239952608115","attributes":{"enabled":true,"created":1561686229,"updated":1561686229,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-4521671903162241","deletedDate":1561412660,"scheduledPurgeDate":1569188660,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-4521671903162241","attributes":{"enabled":true,"created":1561412659,"updated":1561412659,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-49665580519739794","deletedDate":1561415149,"scheduledPurgeDate":1569191149,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-49665580519739794","attributes":{"enabled":true,"created":1561415147,"updated":1561415147,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6100746209317036","deletedDate":1561414691,"scheduledPurgeDate":1569190691,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6100746209317036","attributes":{"enabled":true,"created":1561414690,"updated":1561414690,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6143082435852443","deletedDate":1561411064,"scheduledPurgeDate":1569187064,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6143082435852443","attributes":{"enabled":true,"created":1561411063,"updated":1561411063,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6596998315181399","deletedDate":1561415010,"scheduledPurgeDate":1569191010,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6596998315181399","attributes":{"enabled":true,"created":1561415009,"updated":1561415009,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6745532996565062","deletedDate":1561415277,"scheduledPurgeDate":1569191277,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-6745532996565062","attributes":{"enabled":true,"created":1561415276,"updated":1561415276,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-7541698336411891","deletedDate":1561685844,"scheduledPurgeDate":1569461844,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-7541698336411891","attributes":{"enabled":true,"created":1561685844,"updated":1561685844,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8414867982202452","deletedDate":1561414795,"scheduledPurgeDate":1569190795,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8414867982202452","attributes":{"enabled":true,"created":1561414794,"updated":1561414794,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8902329538192819","deletedDate":1561413350,"scheduledPurgeDate":1569189350,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8902329538192819","attributes":{"enabled":true,"created":1561413350,"updated":1561413350,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithexpires-3945239952608115","deletedDate":1561686240,"scheduledPurgeDate":1569462240,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithexpires-3945239952608115","attributes":{"enabled":true,"exp":1546300805,"created":1561686240,"updated":1561686240,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithexpires-7541698336411891","deletedDate":1561685855,"scheduledPurgeDate":1569461855,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithexpires-7541698336411891","attributes":{"enabled":true,"exp":1546300805,"created":1561685854,"updated":1561685854,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EVTVJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJTMFZaVjBsVVNFNVBWRUpGUms5U1JTMHpPVFExTWpNNU9UVXlOakE0TVRFMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7c64258a-e156-49e8-97e6-d55df69e9ca1',
=======
  '0e6907ef-b740-49b5-bdb0-9e96b10da356',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:25 GMT',
=======
  'Fri, 02 Aug 2019 00:49:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '5295' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'aea417b8-7feb-40c4-baa6-86853e400655',
=======
  'db16eaff-9e81-44ea-ba53-a27c45761593',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:26 GMT',
=======
  'Fri, 02 Aug 2019 00:49:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '1ff87b0a-03a3-44a5-9697-de98ec792700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:27 GMT; path=/; secure; HttpOnly',
=======
  '2f35da2b-f6ac-4d07-9f30-cb8fe4260000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:02 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:26 GMT',
=======
  'Fri, 02 Aug 2019 00:49:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithnotBefore-3945239952608115","deletedDate":1561686239,"scheduledPurgeDate":1569462239,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithnotBefore-3945239952608115","attributes":{"enabled":true,"nbf":1546300805,"created":1561686238,"updated":1561686238,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywithnotBefore-7541698336411891","deletedDate":1561685853,"scheduledPurgeDate":1569461853,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywithnotBefore-7541698336411891","attributes":{"enabled":true,"nbf":1546300805,"created":1561685853,"updated":1561685853,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkey-21596680364625942","deletedDate":1561685637,"scheduledPurgeDate":1569461637,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkey-21596680364625942","attributes":{"enabled":true,"created":1561685636,"updated":1561685636,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkey-3945239952608115","deletedDate":1561686234,"scheduledPurgeDate":1569462234,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkey-3945239952608115","attributes":{"enabled":true,"created":1561686234,"updated":1561686234,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkey-7541698336411891","deletedDate":1561685849,"scheduledPurgeDate":1569461849,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkey-7541698336411891","attributes":{"enabled":true,"created":1561685848,"updated":1561685848,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-21596680364625942","deletedDate":1561685638,"scheduledPurgeDate":1569461638,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-21596680364625942","attributes":{"enabled":true,"created":1561685637,"updated":1561685637,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-3945239952608115","deletedDate":1561686236,"scheduledPurgeDate":1569462236,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-3945239952608115","attributes":{"enabled":true,"created":1561686235,"updated":1561686235,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-7541698336411891","deletedDate":1561685850,"scheduledPurgeDate":1569461850,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-7541698336411891","attributes":{"enabled":true,"created":1561685850,"updated":1561685850,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-21596680364625942","deletedDate":1561685635,"scheduledPurgeDate":1569461635,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-21596680364625942","attributes":{"enabled":true,"created":1561685634,"updated":1561685634,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-3945239952608115","deletedDate":1561686231,"scheduledPurgeDate":1569462231,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-3945239952608115","attributes":{"enabled":true,"created":1561686231,"updated":1561686231,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-6981438213869133","deletedDate":1562874910,"scheduledPurgeDate":1570650910,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-6981438213869133","attributes":{"enabled":true,"created":1562874910,"updated":1562874910,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-7541698336411891","deletedDate":1561685846,"scheduledPurgeDate":1569461846,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-7541698336411891","attributes":{"enabled":true,"created":1561685845,"updated":1561685845,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithsize-21596680364625942","deletedDate":1561685636,"scheduledPurgeDate":1569461636,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithsize-21596680364625942","attributes":{"enabled":true,"created":1561685635,"updated":1561685635,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3hJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVEVWtWQlZFVkJVbE5CUzBWWlYwbFVTRk5KV2tVdE1qRTFPVFkyT0RBek5qUTJNalU1TkRJdk1qRXhOa0ZGUVRjME9UUTRORU13TURoRFJVWTJNRVl6TkRNeFFqVTFNRVloTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'abad90d2-c541-44e9-a1af-680be1c8ba20',
=======
  '2692189b-ed1d-439c-9be5-ef24347624e8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:27 GMT',
=======
  'Fri, 02 Aug 2019 00:49:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '5427' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '285993ac-406a-4817-b2a0-d4923da7c471',
=======
  'd5e5b232-49f1-461f-9cd7-4f99f5aa20bf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:27 GMT',
=======
  'Fri, 02 Aug 2019 00:49:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'badb2a90-59d0-4c31-b61a-719f12cb2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:28 GMT; path=/; secure; HttpOnly',
=======
  '572eb77f-063d-4fdd-9e13-547f9b550000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:03 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:27 GMT',
=======
  'Fri, 02 Aug 2019 00:49:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithsize-3945239952608115","deletedDate":1561686233,"scheduledPurgeDate":1569462233,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithsize-3945239952608115","attributes":{"enabled":true,"created":1561686232,"updated":1561686232,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithsize-7541698336411891","deletedDate":1561685847,"scheduledPurgeDate":1569461847,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithsize-7541698336411891","attributes":{"enabled":true,"created":1561685847,"updated":1561685847,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-candeleteakey-3945239952608115","deletedDate":1561686245,"scheduledPurgeDate":1569462245,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-candeleteakey-3945239952608115","attributes":{"enabled":true,"created":1561686245,"updated":1561686245,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-candeleteakey-7541698336411891","deletedDate":1561685860,"scheduledPurgeDate":1569461860,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-candeleteakey-7541698336411891","attributes":{"enabled":true,"created":1561685860,"updated":1561685860,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-041906371603109616","deletedDate":1561685972,"scheduledPurgeDate":1569461972,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-041906371603109616","attributes":{"enabled":true,"created":1561685972,"updated":1561685972,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-13938301836807887","deletedDate":1561685900,"scheduledPurgeDate":1569461900,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-13938301836807887","attributes":{"enabled":true,"created":1561685900,"updated":1561685900,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-6097754638482769","deletedDate":1561416018,"scheduledPurgeDate":1569192018,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-6097754638482769","attributes":{"enabled":true,"created":1561416018,"updated":1561416018,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-6723873262302544","deletedDate":1561415954,"scheduledPurgeDate":1569191954,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-6723873262302544","attributes":{"enabled":true,"created":1561415953,"updated":1561415953,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-7045353749486702","deletedDate":1561686157,"scheduledPurgeDate":1569462157,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-7045353749486702","attributes":{"enabled":true,"created":1561686156,"updated":1561686156,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-7541698336411891","deletedDate":1561685866,"scheduledPurgeDate":1569461866,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-7541698336411891","attributes":{"enabled":true,"created":1561685866,"updated":1561685866,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-8455281744731713","deletedDate":1561686136,"scheduledPurgeDate":1569462136,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-8455281744731713","attributes":{"enabled":true,"created":1561686135,"updated":1561686135,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-9166100965013404","deletedDate":1561686091,"scheduledPurgeDate":1569462091,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-9166100965013404","attributes":{"enabled":true,"created":1561686091,"updated":1561686091,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMTYhTURBd01EUXpJV3RsZVM5RFVsVkVTMFZaVGtGTlJTMURRVTVIUlZSQlMwVlpMVE01TkRVeU16azVOVEkyTURneE1UVWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd39de509-cebf-4a3e-aa6b-aebb08d617e9',
=======
  '639be576-9d20-42d7-bee8-fd40bb795415',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:27 GMT',
=======
  'Fri, 02 Aug 2019 00:49:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4857' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd33e8519-d431-4574-957b-a507833ef8c8',
=======
  'ceb673e9-f80b-4223-b73e-2fdb55711e11',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:29 GMT',
=======
  'Fri, 02 Aug 2019 00:49:03 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '93d25844-a57e-45b3-aed6-87eace9f2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:29 GMT; path=/; secure; HttpOnly',
=======
  '9dcf73f1-f2e4-4470-91b7-6e8f36120000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:04 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:28 GMT',
=======
  'Fri, 02 Aug 2019 00:49:04 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetakey-3945239952608115","deletedDate":1561686248,"scheduledPurgeDate":1569462248,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-3945239952608115","attributes":{"enabled":true,"created":1561686247,"updated":1561686247,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetakey-7541698336411891","deletedDate":1561685863,"scheduledPurgeDate":1569461863,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-7541698336411891","attributes":{"enabled":true,"created":1561685862,"updated":1561685862,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetaspecificversionofakey-3945239952608115","deletedDate":1561686250,"scheduledPurgeDate":1569462250,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetaspecificversionofakey-3945239952608115","attributes":{"enabled":true,"created":1561686249,"updated":1561686249,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetaspecificversionofakey-7541698336411891","deletedDate":1561685865,"scheduledPurgeDate":1569461865,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetaspecificversionofakey-7541698336411891","attributes":{"enabled":true,"created":1561685864,"updated":1561685864,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdateadisabledkey-3945239952608115","deletedDate":1561686244,"scheduledPurgeDate":1569462244,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-3945239952608115","attributes":{"enabled":false,"exp":1546300800,"created":1561686243,"updated":1561686244,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdateadisabledkey-7541698336411891","deletedDate":1561685859,"scheduledPurgeDate":1569461859,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-7541698336411891","attributes":{"enabled":false,"exp":1546300800,"created":1561685858,"updated":1561685858,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdatekey-3945239952608115","deletedDate":1561686242,"scheduledPurgeDate":1569462242,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdatekey-3945239952608115","attributes":{"enabled":false,"created":1561686241,"updated":1561686242,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdatekey-7541698336411891","deletedDate":1561685857,"scheduledPurgeDate":1569461857,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdatekey-7541698336411891","attributes":{"enabled":false,"created":1561685856,"updated":1561685856,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test-key","deletedDate":1564437302,"scheduledPurgeDate":1572213302,"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test-key","attributes":{"enabled":true,"created":1564437301,"updated":1564437301,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CryptographyClientTestKey","deletedDate":1564415084,"scheduledPurgeDate":1572191084,"kid":"https://keyvault_name.vault.azure.net/keys/CryptographyClientTestKey","attributes":{"enabled":true,"created":1564415081,"updated":1564415081,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFU1TnpZd01UZzNOREl3TURVNE1EZ3ZPVGc0TWtVd05VVXhRMFV6TkVRMFJqbEJNRFl5UmpCQlEwUTJOVVpGUkRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '56774193-90ee-4c07-b66e-bc3b562beaae',
=======
  'c2fb3b74-30d0-45a6-b841-ecf690197538',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:29 GMT',
=======
  'Fri, 02 Aug 2019 00:49:04 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4084' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '2b763115-93fe-4bde-94f8-ebc88d1774e3',
=======
  '1a882b6d-716e-42dd-b90c-dae37e96f8e0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:29 GMT',
=======
  'Fri, 02 Aug 2019 00:49:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3b5fea5a-110a-4e9a-8d7f-337b1d3d2500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:30 GMT; path=/; secure; HttpOnly',
=======
  '0dd6784b-25fa-4c62-8e2e-40d95c430000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:05 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:30 GMT',
=======
  'Fri, 02 Aug 2019 00:49:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019567242501310","deletedDate":1560195770,"scheduledPurgeDate":1567971770,"kid":"https://keyvault_name.vault.azure.net/keys/key156019567242501310","attributes":{"enabled":true,"created":1560195678,"updated":1560195678,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNVGsxTnpBeE5UYzNNRFF3TVRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1d8cd8e4-68ae-4006-9fdc-b22bd2ea4728',
=======
  '2cad616f-5838-4d0e-835b-4b55510f818e',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:30 GMT',
=======
  'Fri, 02 Aug 2019 00:49:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '609' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3d88e294-cb0f-4b35-9d7e-93d59c9c900c',
=======
  'a3129286-3213-4c1d-b84b-97f8ad0e99fa',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:30 GMT',
=======
  'Fri, 02 Aug 2019 00:49:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'c2653d80-ed10-4b62-a0dd-54d5a7642c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:31 GMT; path=/; secure; HttpOnly',
=======
  '8948e008-cb61-4546-8500-deb01f290000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:06 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:30 GMT',
=======
  'Fri, 02 Aug 2019 00:49:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019571294800134","deletedDate":1560195724,"scheduledPurgeDate":1567971724,"kid":"https://keyvault_name.vault.azure.net/keys/key156019571294800134","attributes":{"enabled":true,"created":1560195718,"updated":1560195718,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019588703602255","deletedDate":1560195904,"scheduledPurgeDate":1567971904,"kid":"https://keyvault_name.vault.azure.net/keys/key156019588703602255","attributes":{"enabled":false,"created":1560195892,"updated":1560195892,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019614908508155","deletedDate":1560196160,"scheduledPurgeDate":1567972160,"kid":"https://keyvault_name.vault.azure.net/keys/key156019614908508155","attributes":{"enabled":true,"nbf":1560196154,"created":1560196155,"updated":1560196155,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019626145109618","deletedDate":1560196278,"scheduledPurgeDate":1567972278,"kid":"https://keyvault_name.vault.azure.net/keys/key156019626145109618","attributes":{"enabled":true,"nbf":1560196266,"created":1560196267,"updated":1560196267,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019643192308535","deletedDate":1560196443,"scheduledPurgeDate":1567972443,"kid":"https://keyvault_name.vault.azure.net/keys/key156019643192308535","attributes":{"enabled":true,"nbf":1560196436,"created":1560196437,"updated":1560196437,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019676499600673","deletedDate":1560196776,"scheduledPurgeDate":1567972776,"kid":"https://keyvault_name.vault.azure.net/keys/key156019676499600673","attributes":{"enabled":true,"nbf":1560196769,"created":1560196770,"updated":1560196770,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019678704709785","deletedDate":1560196798,"scheduledPurgeDate":1567972798,"kid":"https://keyvault_name.vault.azure.net/keys/key156019678704709785","attributes":{"enabled":true,"nbf":1560196792,"created":1560196792,"updated":1560196792,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019683131108936","deletedDate":1560196842,"scheduledPurgeDate":1567972842,"kid":"https://keyvault_name.vault.azure.net/keys/key156019683131108936","attributes":{"enabled":true,"nbf":1560196836,"created":1560196836,"updated":1560196836,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019687132907648","deletedDate":1560196888,"scheduledPurgeDate":1567972888,"kid":"https://keyvault_name.vault.azure.net/keys/key156019687132907648","attributes":{"enabled":true,"nbf":1560196876,"created":1560196876,"updated":1560196876,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019964932000764","deletedDate":1560199758,"scheduledPurgeDate":1567975758,"kid":"https://keyvault_name.vault.azure.net/keys/key156019964932000764","attributes":{"enabled":true,"created":1560199655,"updated":1560199655,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TVRrNU5qVTFNVGM0TURZeE5UZ3ZSalkyTVVNMVJrRkNOVEpETkRnMk5rRkJSVFk0TXpBMFF6Z3pRVE13TURRaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '5cdef827-f433-47da-a8c6-88c0c8238d00',
=======
  'ad839cfd-18a8-449d-9ae0-6b4348c95768',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:31 GMT',
=======
  'Fri, 02 Aug 2019 00:49:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3732' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'f964cc31-a8ff-41fd-aee3-c0b17174624d',
=======
  '4485c39e-1686-4bf1-aede-1e4c18133aa3',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:31 GMT',
=======
  'Fri, 02 Aug 2019 00:49:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '38204f53-23b5-4e60-8156-bf5bfdfe2600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:32 GMT; path=/; secure; HttpOnly',
=======
  '41d42fb6-bb79-400e-8e5e-c42f2a4a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:07 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:31 GMT',
=======
  'Fri, 02 Aug 2019 00:49:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156019968394501499","deletedDate":1560199695,"scheduledPurgeDate":1567975695,"kid":"https://keyvault_name.vault.azure.net/keys/key156019968394501499","attributes":{"enabled":true,"created":1560199689,"updated":1560199689,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020010748409548","deletedDate":1560200123,"scheduledPurgeDate":1567976123,"kid":"https://keyvault_name.vault.azure.net/keys/key156020010748409548","attributes":{"enabled":true,"nbf":1560200112,"created":1560200113,"updated":1560200113,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020097075304975","deletedDate":1560200982,"scheduledPurgeDate":1567976982,"kid":"https://keyvault_name.vault.azure.net/keys/key156020097075304975","attributes":{"enabled":true,"exp":1560200975,"created":1560200976,"updated":1560200976,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020589654200630","deletedDate":1560205908,"scheduledPurgeDate":1567981908,"kid":"https://keyvault_name.vault.azure.net/keys/key156020589654200630","attributes":{"enabled":true,"created":1560205902,"updated":1560205902,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020600810901019","deletedDate":1560206019,"scheduledPurgeDate":1567982019,"kid":"https://keyvault_name.vault.azure.net/keys/key156020600810901019","attributes":{"enabled":true,"created":1560206013,"updated":1560206013,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakEyTlRZM05ERXhNRFU1TmpraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '457e1abc-d78a-421e-9034-b943cfe677ea',
=======
  '012a33a3-1354-450f-a304-7538018cd5c8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:32 GMT',
=======
  'Fri, 02 Aug 2019 00:49:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1951' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4f250e50-bd89-4a12-8a2e-e0e7e55007f4',
=======
  '21cf1bae-cb48-44a9-9350-cbe5cf8cac7b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:32 GMT',
=======
  'Fri, 02 Aug 2019 00:49:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '4a802246-5c39-4d40-8899-83d84bbd2d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:33 GMT; path=/; secure; HttpOnly',
=======
  '2e9d58ae-b4be-4c00-9625-2f383d3b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:07 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:32 GMT',
=======
  'Fri, 02 Aug 2019 00:49:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156020656741105969","deletedDate":1560206579,"scheduledPurgeDate":1567982579,"kid":"https://keyvault_name.vault.azure.net/keys/key156020656741105969","attributes":{"enabled":true,"created":1560206573,"updated":1560206573,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021202578402557","deletedDate":1560212037,"scheduledPurgeDate":1567988037,"kid":"https://keyvault_name.vault.azure.net/keys/key156021202578402557","attributes":{"enabled":true,"created":1560212031,"updated":1560212031,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021212284606500","deletedDate":1560212139,"scheduledPurgeDate":1567988139,"kid":"https://keyvault_name.vault.azure.net/keys/key156021212284606500","attributes":{"enabled":true,"created":1560212128,"updated":1560212128,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021228525302930","deletedDate":1560212302,"scheduledPurgeDate":1567988302,"kid":"https://keyvault_name.vault.azure.net/keys/key156021228525302930","attributes":{"enabled":true,"created":1560212290,"updated":1560212290,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021252900505638","deletedDate":1560212547,"scheduledPurgeDate":1567988547,"kid":"https://keyvault_name.vault.azure.net/keys/key156021252900505638","attributes":{"enabled":true,"created":1560212534,"updated":1560212534,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021259169107011","deletedDate":1560212608,"scheduledPurgeDate":1567988608,"kid":"https://keyvault_name.vault.azure.net/keys/key156021259169107011","attributes":{"enabled":true,"created":1560212597,"updated":1560212597,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021275535604420","deletedDate":1560212772,"scheduledPurgeDate":1567988772,"kid":"https://keyvault_name.vault.azure.net/keys/key156021275535604420","attributes":{"enabled":true,"created":1560212760,"updated":1560212760,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021319425603898","deletedDate":1560213205,"scheduledPurgeDate":1567989205,"kid":"https://keyvault_name.vault.azure.net/keys/key156021319425603898","attributes":{"enabled":true,"created":1560213200,"updated":1560213200,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021368188700680","deletedDate":1560213698,"scheduledPurgeDate":1567989698,"kid":"https://keyvault_name.vault.azure.net/keys/key156021368188700680","attributes":{"enabled":true,"created":1560213687,"updated":1560213687,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021382077504638","deletedDate":1560213837,"scheduledPurgeDate":1567989837,"kid":"https://keyvault_name.vault.azure.net/keys/key156021382077504638","attributes":{"enabled":false,"created":1560213826,"updated":1560213832,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021397882409430","deletedDate":1560214070,"scheduledPurgeDate":1567990070,"kid":"https://keyvault_name.vault.azure.net/keys/key156021397882409430","attributes":{"enabled":true,"created":1560213984,"updated":1560213984,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TWpFek9Ua3dNalV6TURZd01ERXZSa015UWpZME9UaEZOa1JETkRnME1rSkRNVEUyTWpaR1JUa3lSakpGT0VFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '0939b552-91e1-4b3b-a581-fa31682fc257',
=======
  '5e80bb58-0b55-490e-8ef4-25067e5e166c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:33 GMT',
=======
  'Fri, 02 Aug 2019 00:49:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3940' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'ff7ad32d-d82a-4085-8b0c-034f42112c7f',
=======
  'ff42bad4-3327-4252-9982-eaf0f03502f6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:33 GMT',
=======
  'Fri, 02 Aug 2019 00:49:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '1aab933f-add2-4220-afaa-e73c60aa2d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:34 GMT; path=/; secure; HttpOnly',
=======
  '019a7602-7d03-46de-aeaf-f30b3f0a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:08 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:33 GMT',
=======
  'Fri, 02 Aug 2019 00:49:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021404805303613","deletedDate":1560214059,"scheduledPurgeDate":1567990059,"kid":"https://keyvault_name.vault.azure.net/keys/key156021404805303613","attributes":{"enabled":true,"created":1560214053,"updated":1560214053,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021443658305298","deletedDate":1560214455,"scheduledPurgeDate":1567990455,"kid":"https://keyvault_name.vault.azure.net/keys/key156021443658305298","attributes":{"enabled":false,"created":1560214442,"updated":1560214449,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021469847200127","deletedDate":1560214715,"scheduledPurgeDate":1567990715,"kid":"https://keyvault_name.vault.azure.net/keys/key156021469847200127","attributes":{"enabled":false,"exp":1560214704,"created":1560214704,"updated":1560214709,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021500992805037","deletedDate":1560215026,"scheduledPurgeDate":1567991026,"kid":"https://keyvault_name.vault.azure.net/keys/key156021500992805037","attributes":{"enabled":false,"exp":1560215015,"created":1560215015,"updated":1560215021,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021508931202421","deletedDate":1560215105,"scheduledPurgeDate":1567991105,"kid":"https://keyvault_name.vault.azure.net/keys/key156021508931202421","attributes":{"enabled":false,"exp":1560215095,"created":1560215094,"updated":1560215100,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNakUxTWpjek5UVXlNRGN5T0RjaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '831d3b3e-cdb5-49a7-a6f9-54f1ca9bd7e1',
=======
  '23b300d2-b4d9-44b5-9303-be579cac8e71',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:34 GMT',
=======
  'Fri, 02 Aug 2019 00:49:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1972' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b0948678-f90e-43d4-b64e-0c6631b12921',
=======
  '0fe85810-5fd0-4f53-9e00-9cf55f654751',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:34 GMT',
=======
  'Fri, 02 Aug 2019 00:49:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'ecce70bd-ee5c-4416-8552-0e18fce22800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:34 GMT; path=/; secure; HttpOnly',
=======
  'f931bb78-e504-406c-aaac-fbd285343700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:09 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:34 GMT',
=======
  'Fri, 02 Aug 2019 00:49:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021527355207287","deletedDate":1560215290,"scheduledPurgeDate":1567991290,"kid":"https://keyvault_name.vault.azure.net/keys/key156021527355207287","attributes":{"enabled":false,"exp":1560215279,"created":1560215279,"updated":1560215284,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021572903002132","deletedDate":1560215746,"scheduledPurgeDate":1567991746,"kid":"https://keyvault_name.vault.azure.net/keys/key156021572903002132","attributes":{"enabled":false,"exp":1560215734,"created":1560215734,"updated":1560215740,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021643840901237","deletedDate":1560216615,"scheduledPurgeDate":1567992615,"kid":"https://keyvault_name.vault.azure.net/keys/key156021643840901237","attributes":{"enabled":true,"created":1560216444,"updated":1560216444,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021650717904471","deletedDate":1560216518,"scheduledPurgeDate":1567992518,"kid":"https://keyvault_name.vault.azure.net/keys/key156021650717904471","attributes":{"enabled":true,"created":1560216512,"updated":1560216512,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TWpFMk5UQTNNVGM1TURRME56RXZRMEUyT1VKQ05UUkJRVVpFTkRBMFFVSkNORFF6TWpCQlJrVkNNVEpHTWpZaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b6a19845-f7ed-4975-af7e-1e56d471a20a',
=======
  'c6acf4a9-c849-4372-a902-7e2e2c853fab',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:34 GMT',
=======
  'Fri, 02 Aug 2019 00:49:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1686' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '271e3ea5-5309-400e-8534-b0388f90a0a3',
=======
  'e35cc8b9-3dee-4a10-a93c-36b63fecfd09',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:35 GMT',
=======
  'Fri, 02 Aug 2019 00:49:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '06a7127f-58f8-41f6-9cb4-ba2120c62900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:35 GMT; path=/; secure; HttpOnly',
=======
  'b09e8049-08f8-4a31-bbf8-e604993a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:10 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:35 GMT',
=======
  'Fri, 02 Aug 2019 00:49:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021753923506478","deletedDate":1560217550,"scheduledPurgeDate":1567993550,"kid":"https://keyvault_name.vault.azure.net/keys/key156021753923506478","attributes":{"enabled":true,"created":1560217545,"updated":1560217545,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156021772195104221","deletedDate":1560217733,"scheduledPurgeDate":1567993733,"kid":"https://keyvault_name.vault.azure.net/keys/key156021772195104221","attributes":{"enabled":true,"created":1560217727,"updated":1560217727,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026375447403976","deletedDate":1560263766,"scheduledPurgeDate":1568039766,"kid":"https://keyvault_name.vault.azure.net/keys/key156026375447403976","attributes":{"enabled":true,"created":1560263760,"updated":1560263760,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026429107509170","deletedDate":1560264308,"scheduledPurgeDate":1568040308,"kid":"https://keyvault_name.vault.azure.net/keys/key156026429107509170","attributes":{"enabled":true,"created":1560264296,"updated":1560264296,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026780583504617","deletedDate":1560267823,"scheduledPurgeDate":1568043823,"kid":"https://keyvault_name.vault.azure.net/keys/key156026780583504617","attributes":{"enabled":true,"created":1560267811,"updated":1560267811,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156026937854708786","deletedDate":1560269396,"scheduledPurgeDate":1568045396,"kid":"https://keyvault_name.vault.azure.net/keys/key156026937854708786","attributes":{"enabled":true,"created":1560269384,"updated":1560269384,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027282511708087","deletedDate":1560272836,"scheduledPurgeDate":1568048836,"kid":"https://keyvault_name.vault.azure.net/keys/key156027282511708087","attributes":{"enabled":true,"created":1560272831,"updated":1560272831,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027441059203813","deletedDate":1560274422,"scheduledPurgeDate":1568050422,"kid":"https://keyvault_name.vault.azure.net/keys/key156027441059203813","attributes":{"enabled":true,"created":1560274416,"updated":1560274416,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNamMyTVRreU5UYzFNRFV6T0RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '5e05fd04-7c5a-4020-bcc7-f39d7334e99a',
=======
  '92b9ca7b-f14e-4111-92b2-f7687e2a693b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:35 GMT',
=======
  'Fri, 02 Aug 2019 00:49:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2898' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'a497a091-230a-41c9-8c7d-a928189a253f',
=======
  '6a53e901-7de7-4f1b-b36b-0cf87ea4f8f0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:36 GMT',
=======
  'Fri, 02 Aug 2019 00:49:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e31c188c-7c91-4377-8d9a-172fbfdc2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:36 GMT; path=/; secure; HttpOnly',
=======
  '2d01cc35-9d09-42ed-be33-4f2428470000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:11 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:35 GMT',
=======
  'Fri, 02 Aug 2019 00:49:11 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027619257505383","deletedDate":1560276204,"scheduledPurgeDate":1568052204,"kid":"https://keyvault_name.vault.azure.net/keys/key156027619257505383","attributes":{"enabled":true,"created":1560276198,"updated":1560276198,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027654046904526","deletedDate":1560276552,"scheduledPurgeDate":1568052552,"kid":"https://keyvault_name.vault.azure.net/keys/key156027654046904526","attributes":{"enabled":true,"created":1560276546,"updated":1560276546,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027669556403953","deletedDate":1560276707,"scheduledPurgeDate":1568052707,"kid":"https://keyvault_name.vault.azure.net/keys/key156027669556403953","attributes":{"enabled":true,"created":1560276701,"updated":1560276701,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027692061805591","deletedDate":1560276984,"scheduledPurgeDate":1568052984,"kid":"https://keyvault_name.vault.azure.net/keys/key156027692061805591","attributes":{"enabled":true,"created":1560276926,"updated":1560276926,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156027875260704123","deletedDate":1560278769,"scheduledPurgeDate":1568054769,"kid":"https://keyvault_name.vault.azure.net/keys/key156027875260704123","attributes":{"enabled":true,"created":1560278758,"updated":1560278758,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028044085404301","deletedDate":1560280458,"scheduledPurgeDate":1568056458,"kid":"https://keyvault_name.vault.azure.net/keys/key156028044085404301","attributes":{"enabled":true,"created":1560280446,"updated":1560280446,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028174986105799","deletedDate":1560282270,"scheduledPurgeDate":1568058270,"kid":"https://keyvault_name.vault.azure.net/keys/key156028174986105799","attributes":{"enabled":true,"created":1560281755,"updated":1560281755,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TWpneE56YzRNekF4TURFMk5EZ3ZNVVF5TnpVMU5VUTJPVU0wTkRFd1JUaEROa00zUXpZNU0wVXdNVFZDTURVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '13f745d1-6f3e-450e-b846-5cc510bb231b',
=======
  '4fc6cd58-0ab5-4ac8-9c36-732975dbefba',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:36 GMT',
=======
  'Fri, 02 Aug 2019 00:49:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2631' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'f1dc9d82-1da0-46ba-9e40-da6d801af859',
=======
  '5407bcb4-3049-4992-96d6-7ade2f621cad',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:36 GMT',
=======
  'Fri, 02 Aug 2019 00:49:11 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '914fcbf0-8b0a-4f76-afc9-9f55b2e22700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:37 GMT; path=/; secure; HttpOnly',
=======
  'c3ea3e0b-ef2c-486e-b660-1d1668260000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:12 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:36 GMT',
=======
  'Fri, 02 Aug 2019 00:49:11 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028180668003726","deletedDate":1560281817,"scheduledPurgeDate":1568057817,"kid":"https://keyvault_name.vault.azure.net/keys/key156028180668003726","attributes":{"enabled":true,"created":1560281812,"updated":1560281812,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156028185168006865","deletedDate":1560281862,"scheduledPurgeDate":1568057862,"kid":"https://keyvault_name.vault.azure.net/keys/key156028185168006865","attributes":{"enabled":true,"created":1560281857,"updated":1560281857,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156036321495001070","deletedDate":1560363783,"scheduledPurgeDate":1568139783,"kid":"https://keyvault_name.vault.azure.net/keys/key156036321495001070","attributes":{"enabled":true,"created":1560363220,"updated":1560363220,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdNell6TWpJMk5UWTRNRGM0TVRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '86903031-0731-4f81-a9c3-f9b5eaeb0945',
=======
  'ffa6ca23-4586-4c34-9630-50b36618709c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:37 GMT',
=======
  'Fri, 02 Aug 2019 00:49:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1263' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '97a3bd47-7bae-44ef-a888-f5cbc02c48c7',
=======
  '528b3b20-51ec-4ea1-a29f-57531f2f6a6b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:37 GMT',
=======
  'Fri, 02 Aug 2019 00:49:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '138afd6e-8ed9-40fc-b8ce-bcdb13092900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:38 GMT; path=/; secure; HttpOnly',
=======
  '990a79a6-9cbe-4450-9332-33daf6130000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:12 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:38 GMT',
=======
  'Fri, 02 Aug 2019 00:49:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156036326049603673","deletedDate":1560363271,"scheduledPurgeDate":1568139271,"kid":"https://keyvault_name.vault.azure.net/keys/key156036326049603673","attributes":{"enabled":true,"created":1560363266,"updated":1560363266,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156043977101909742","deletedDate":1560439782,"scheduledPurgeDate":1568215782,"kid":"https://keyvault_name.vault.azure.net/keys/key156043977101909742","attributes":{"enabled":true,"created":1560439776,"updated":1560439776,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156044301303900132","deletedDate":1560444138,"scheduledPurgeDate":1568220138,"kid":"https://keyvault_name.vault.azure.net/keys/key156044301303900132","attributes":{"enabled":true,"exp":1560443018,"created":1560443018,"updated":1560443018,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTRJV3RsZVM5TFJWa3hOVFl3TkRRek1ERXpNRE01TURBeE16SXZPRGRETURGR05UTkRSa0l6TkRnM1JUZzBOamN3T1RFMU9UazRPVGczTmpNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '84c652fc-27cc-4587-9b09-0e64966cfda0',
=======
  '14cb679a-3fdb-4be9-adc6-6f0ee6a8b9f6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:38 GMT',
=======
  'Fri, 02 Aug 2019 00:49:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1340' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3eb49cfc-c78f-4549-990d-48e58c1d3ebe',
=======
  '110cf173-0370-41cd-ac2f-b6dc8ba50db0',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:38 GMT',
=======
  'Fri, 02 Aug 2019 00:49:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '790fc0ee-21c3-480f-adef-aa8e96362700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:39 GMT; path=/; secure; HttpOnly',
=======
  'b39605a1-de1d-4c79-b4f7-4053ac490000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:13 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:38 GMT',
=======
  'Fri, 02 Aug 2019 00:49:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156044304097508401","deletedDate":1560443052,"scheduledPurgeDate":1568219052,"kid":"https://keyvault_name.vault.azure.net/keys/key156044304097508401","attributes":{"enabled":true,"created":1560443046,"updated":1560443046,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/key156048034950305703","deletedDate":1560480365,"scheduledPurgeDate":1568256365,"kid":"https://keyvault_name.vault.azure.net/keys/key156048034950305703","attributes":{"enabled":true,"created":1560480356,"updated":1560480356,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiE5MiFNREF3TURJMUlXdGxlUzlMUlZreE5UWXdOVFF4TWpJNU1qTXpNRGczTnpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b6b055a4-12bd-4a1c-8381-fb5298dd5df2',
=======
  'e654aff3-0630-4af8-87ce-d438c739dd86',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:39 GMT',
=======
  'Fri, 02 Aug 2019 00:49:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '936' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '884d8b67-0274-40c3-a964-90c07ede4b01',
=======
  '623c615a-a7bf-441c-9ea7-ed34fa6ce177',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:39 GMT',
=======
  'Fri, 02 Aug 2019 00:49:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '5a1bafc4-376a-4e77-95c5-4a50287b2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:40 GMT; path=/; secure; HttpOnly',
=======
  '4ef103be-72bd-450a-acd7-080b92270000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHJAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:14 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:39 GMT',
=======
  'Fri, 02 Aug 2019 00:49:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019984111602317","deletedDate":1560199870,"scheduledPurgeDate":1567975870,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019984111602317","attributes":{"enabled":true,"created":1560199847,"updated":1560199847,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019984111709787","deletedDate":1560199876,"scheduledPurgeDate":1567975876,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019984111709787","attributes":{"enabled":true,"created":1560199852,"updated":1560199852,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019998725306556","deletedDate":1560200016,"scheduledPurgeDate":1567976016,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019998725306556","attributes":{"enabled":true,"created":1560199993,"updated":1560199993,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156019998725308881","deletedDate":1560200022,"scheduledPurgeDate":1567976022,"kid":"https://keyvault_name.vault.azure.net/keys/keys156019998725308881","attributes":{"enabled":true,"created":1560199998,"updated":1560199998,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EVTVJV3RsZVM5TFJWbFRNVFUyTURNMk16TTNNRFl4TkRBeU5qSXdMME5DUmpRNFFqTTFNVU13UmpRek1rVTVNVEUzTTBaRVJUVkVORGszUVRBeUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'c220b460-fe89-474c-979c-c7e93f03d175',
=======
  '08c89e90-8c3a-4877-9add-05deff04ef1d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:40 GMT',
=======
  'Fri, 02 Aug 2019 00:49:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1663' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd23614ac-6f7b-470d-8996-cf980db2a8b4',
=======
  '3b99754e-7750-49c3-9abf-4888cc9cc9ae',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:40 GMT',
=======
  'Fri, 02 Aug 2019 00:49:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '2debf843-c22a-4399-8fbd-7fe6a2212700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:41 GMT; path=/; secure; HttpOnly',
=======
  'd582d3cb-3f4a-4860-83ed-547d86b02e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:15 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:40 GMT',
=======
  'Fri, 02 Aug 2019 00:49:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156043989692705349","deletedDate":1560439913,"scheduledPurgeDate":1568215913,"kid":"https://keyvault_name.vault.azure.net/keys/keys156043989692705349","attributes":{"enabled":true,"created":1560439902,"updated":1560439902,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/keys156043989692806134","deletedDate":1560439919,"scheduledPurgeDate":1568215919,"kid":"https://keyvault_name.vault.azure.net/keys/keys156043989692806134","attributes":{"enabled":true,"created":1560439908,"updated":1560439908,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys-3147002526421592-0","deletedDate":1561686288,"scheduledPurgeDate":1569462288,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-3147002526421592-0","attributes":{"enabled":true,"created":1561686279,"updated":1561686279,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys-3147002526421592-1","deletedDate":1561686289,"scheduledPurgeDate":1569462289,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys-3147002526421592-1","attributes":{"enabled":true,"created":1561686280,"updated":1561686280,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-0","deletedDate":1561686297,"scheduledPurgeDate":1569462297,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-0","attributes":{"enabled":true,"created":1561686290,"updated":1561686290,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-1","deletedDate":1561686298,"scheduledPurgeDate":1569462298,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged-3147002526421592-1","attributes":{"enabled":true,"created":1561686290,"updated":1561686290,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMzYhTURBd01EVTJJV3RsZVM5TVNWTlVTMFZaVGtGTlJTMURRVTVIUlZSVVNFVldSVkpUU1U5T1UwOUdRVXRGV1Mwek1UUTNNREF5TlRJMk5ESXhOVGt5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e2ec25b7-9bab-4648-af91-c0ce2c0b8e28',
=======
  'bc1659eb-77b9-46ee-a5fe-6163b12a909c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:41 GMT',
=======
  'Fri, 02 Aug 2019 00:49:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '2608' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '386fb451-df72-4b00-bf8b-d37f0aa96641',
=======
  '7d7dc6a9-5373-4889-b314-89419b96ef76',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:41 GMT',
=======
  'Fri, 02 Aug 2019 00:49:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '205fac16-e0b2-4cb2-bb8c-ed4c0dd42300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:42 GMT; path=/; secure; HttpOnly',
=======
  'afd11c77-ecf3-4144-a874-5aa0462f0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:16 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:41 GMT',
=======
  'Fri, 02 Aug 2019 00:49:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakey-3147002526421592","deletedDate":1561686276,"scheduledPurgeDate":1569462276,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakey-3147002526421592","attributes":{"enabled":true,"created":1561686275,"updated":1561686275,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakey-4844377101593087","deletedDate":1561685869,"scheduledPurgeDate":1569461869,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakey-4844377101593087","attributes":{"enabled":true,"created":1561685868,"updated":1561685868,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakeypaged-3147002526421592","deletedDate":1561686277,"scheduledPurgeDate":1569462277,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakeypaged-3147002526421592","attributes":{"enabled":true,"created":1561686277,"updated":1561686277,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangettheversionsofakeypaged-4844377101593087","deletedDate":1561685871,"scheduledPurgeDate":1569461871,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangettheversionsofakeypaged-4844377101593087","attributes":{"enabled":true,"created":1561685870,"updated":1561685870,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys-7769917610769559-0","deletedDate":1561418276,"scheduledPurgeDate":1569194276,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys-7769917610769559-0","attributes":{"enabled":true,"created":1561418275,"updated":1561418275,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys-7769917610769559-1","deletedDate":1561418277,"scheduledPurgeDate":1569194277,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys-7769917610769559-1","attributes":{"enabled":true,"created":1561418276,"updated":1561418276,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeyspaged-7769917610769559-0","deletedDate":1561419307,"scheduledPurgeDate":1569195307,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeyspaged-7769917610769559-0","attributes":{"enabled":true,"created":1561419306,"updated":1561419306,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeyspaged-7769917610769559-1","deletedDate":1561419308,"scheduledPurgeDate":1569195308,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeyspaged-7769917610769559-1","attributes":{"enabled":true,"created":1561419307,"updated":1561419307,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01EZzVJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1QlFrOVNWRU5TUlVGVVNVNUhRVXRGV1MwM01EWTNNemMyT1RBeE9UVTFNRGc1TDBVd1JUTXdNRGhGT0VFd05EUXlNakZCT0VVeE1rRTBPRGxHUWtVME5ETkJJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8b25f040-da08-4927-ac79-14128586157d',
=======
  'd5494f63-4532-4a30-85c7-3ea845c29070',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:42 GMT',
=======
  'Fri, 02 Aug 2019 00:49:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '3504' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '8ff2c9f1-8e18-4c9d-a6ac-1339f50bc221',
=======
  '17ce5bb1-385b-4992-b416-f9a21357225c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:42 GMT',
=======
  'Fri, 02 Aug 2019 00:49:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '98af8715-5a08-4dc9-b561-b3183c772900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:42 GMT; path=/; secure; HttpOnly',
=======
  'b179f298-a548-4ff2-86f5-d7ddfa0d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIAAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:17 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:42 GMT',
=======
  'Fri, 02 Aug 2019 00:49:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-054334075264537374","deletedDate":1563396687,"scheduledPurgeDate":1571172687,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-054334075264537374","attributes":{"enabled":true,"created":1563396687,"updated":1563396687,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-8132656009076245","deletedDate":1563396700,"scheduledPurgeDate":1571172700,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-8132656009076245","attributes":{"enabled":true,"created":1563396700,"updated":1563396700,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-9299135263076788","deletedDate":1563492865,"scheduledPurgeDate":1571268865,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-9299135263076788","attributes":{"enabled":true,"nbf":1546300805,"created":1563492865,"updated":1563492865,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-4217460078350159","deletedDate":1563492026,"scheduledPurgeDate":1571268026,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-4217460078350159","attributes":{"enabled":true,"created":1563492026,"updated":1563492026,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-9863940778048328","deletedDate":1564680048,"scheduledPurgeDate":1572456048,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-9863940778048328","attributes":{"enabled":true,"created":1564680048,"updated":1564680048,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-7067376901955089","deletedDate":1563492929,"scheduledPurgeDate":1571268929,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-7067376901955089","attributes":{"enabled":true,"created":1563492929,"updated":1563492929,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-36767371368026214","deletedDate":1561687104,"scheduledPurgeDate":1569463104,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-36767371368026214","attributes":{"enabled":true,"created":1561687103,"updated":1561687103,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-89097467879021","deletedDate":1561686972,"scheduledPurgeDate":1569462972,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-89097467879021","attributes":{"enabled":true,"created":1561686972,"updated":1561686972,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-9779781603101387","deletedDate":1561686397,"scheduledPurgeDate":1569462397,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-9779781603101387","attributes":{"enabled":true,"created":1561686396,"updated":1561686396,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-0","deletedDate":1563476819,"scheduledPurgeDate":1571252819,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetseveralinsertedkeyspaged-9124906356900864-0","attributes":{"enabled":true,"created":1563476816,"updated":1563476816,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1SFJWUlRSVlpGVWtGTVNVNVRSVkpVUlVSTFJWbFRVRUZIUlVRdE9URXlORGt3TmpNMU5qa3dNRGcyTkMweElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '836c9865-8a47-41f0-b81f-6c6274c06737',
=======
  '4d5e96aa-7d75-43f1-a6ca-50251f4601cc',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:43 GMT',
=======
  'Fri, 02 Aug 2019 00:49:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4384' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '4dff8912-b2ad-4f27-aefd-897731a1ed70',
=======
  '1fa3f652-ee66-4d3c-8161-09f71036f68c',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:43 GMT',
=======
  'Fri, 02 Aug 2019 00:49:16 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '4a802246-5c39-4d40-8899-83d89dbf2d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:43 GMT; path=/; secure; HttpOnly',
=======
  '8b049135-57d7-4231-9873-32f5b9590000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIQAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:17 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:43 GMT',
=======
  'Fri, 02 Aug 2019 00:49:17 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-36767371368026214","deletedDate":1561687101,"scheduledPurgeDate":1569463101,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-36767371368026214","attributes":{"enabled":true,"created":1561687068,"updated":1561687068,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-89097467879021","deletedDate":1561686970,"scheduledPurgeDate":1569462970,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-89097467879021","attributes":{"enabled":true,"created":1561686926,"updated":1561686926,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-9779781603101387","deletedDate":1561686395,"scheduledPurgeDate":1569462395,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-9779781603101387","attributes":{"enabled":true,"created":1561686361,"updated":1561686361,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-04241354248077567","deletedDate":1561723518,"scheduledPurgeDate":1569499518,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-04241354248077567","attributes":{"enabled":true,"created":1561723517,"updated":1561723517,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-15374511265428148","deletedDate":1561723606,"scheduledPurgeDate":1569499606,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-15374511265428148","attributes":{"enabled":true,"created":1561723605,"updated":1561723605,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-36767371368026214","deletedDate":1561687106,"scheduledPurgeDate":1569463106,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-36767371368026214","attributes":{"enabled":true,"created":1561687105,"updated":1561687105,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-5165836270108091","deletedDate":1561723459,"scheduledPurgeDate":1569499459,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-5165836270108091","attributes":{"enabled":true,"created":1561723458,"updated":1561723458,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-8315331351345701","deletedDate":1561723721,"scheduledPurgeDate":1569499721,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-8315331351345701","attributes":{"enabled":true,"created":1561723720,"updated":1561723720,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-89097467879021","deletedDate":1561686975,"scheduledPurgeDate":1569462975,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-89097467879021","attributes":{"enabled":true,"created":1561686974,"updated":1561686974,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.0&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazNJV3RsZVM5U1JVTlBWa1ZTUzBWWlRrRk5SUzFEUVU1U1JWTlVUMUpGUVV0RldWZEpWRWhCUjBsV1JVNUNRVU5MVlZBdE9Ea3dPVGMwTmpjNE56a3dNakV2UlVZMFJUUXhPVEV5TVRaRE5EWXdORUZFT1VWRlFrUTNNelU1T1VNMFJUWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '152c92f5-19e6-4dca-b0f5-a12d9b80a4e8',
=======
  '1085bffa-ee54-4457-b77c-b5660df5f1b2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:43 GMT',
=======
  'Fri, 02 Aug 2019 00:49:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '4038' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6b124bb9-94ea-4ff4-9f91-5014605204db',
=======
  '0a84dbe5-3c7d-4913-8ce7-98740a44f0fb',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:43 GMT',
=======
  'Fri, 02 Aug 2019 00:49:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '37ef4c97-e2c2-4f64-95ed-aded2d872800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:44 GMT; path=/; secure; HttpOnly',
=======
  'cbe42d76-ac64-47fa-94e4-2d4a3d380000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:18 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:44 GMT',
=======
  'Fri, 02 Aug 2019 00:49:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","deletedDate":1561723348,"scheduledPurgeDate":1569499348,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","attributes":{"enabled":true,"created":1561723347,"updated":1561723347,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","deletedDate":1561686400,"scheduledPurgeDate":1569462400,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","attributes":{"enabled":true,"created":1561686399,"updated":1561686399,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","deletedDate":1561723310,"scheduledPurgeDate":1569499310,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","attributes":{"enabled":true,"created":1561723309,"updated":1561723309,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-0","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-0","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-1","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-1","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--0","deletedDate":1564681860,"scheduledPurgeDate":1572457860,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0","attributes":{"enabled":true,"created":1564681858,"updated":1564681858,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--1","deletedDate":1564681860,"scheduledPurgeDate":1572457860,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--1","attributes":{"enabled":true,"created":1564681859,"updated":1564681859,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","deletedDate":1561723348,"scheduledPurgeDate":1569499348,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9471707164286285","attributes":{"enabled":true,"created":1561723347,"updated":1561723347,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","deletedDate":1561686400,"scheduledPurgeDate":1569462400,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9779781603101387","attributes":{"enabled":true,"created":1561686399,"updated":1561686399,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","deletedDate":1561723310,"scheduledPurgeDate":1569499310,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-9789286389123768","attributes":{"enabled":true,"created":1561723309,"updated":1561723309,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-0","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-0","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeys-972039377256978-1","deletedDate":1563476349,"scheduledPurgeDate":1571252349,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeys-972039377256978-1","attributes":{"enabled":true,"created":1563476349,"updated":1563476349,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--0","deletedDate":1564706917,"scheduledPurgeDate":1572482917,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--0","attributes":{"enabled":true,"created":1564706915,"updated":1564706915,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-listdeletedkeyspaged--1","deletedDate":1564706918,"scheduledPurgeDate":1572482918,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-listdeletedkeyspaged--1","attributes":{"enabled":true,"created":1564706916,"updated":1564706916,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'e1e6ce31-2c27-4468-8abb-c84770fdd8ca',
=======
  '79a88e80-5239-4e70-a78b-bc06232883d8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2802' ]);
=======
  'Fri, 02 Aug 2019 00:49:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2806' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '948bc792-456f-4b2c-aa01-d5633116c326',
=======
  '87b4aedd-7551-4fdb-a8b2-2e9f4767c356',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:45 GMT',
=======
  'Fri, 02 Aug 2019 00:49:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'dfcce879-c303-4f9b-93a8-707a9ed72e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:45 GMT; path=/; secure; HttpOnly',
=======
  '7e926063-329e-41e6-a135-1707f22a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHIwAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:19 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:45 GMT',
=======
  'Fri, 02 Aug 2019 00:49:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeyspaged--0')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '0eaa6ba3-38fb-49cb-803c-d5bec939c0cc',
=======
  '9a546892-06ee-4fcb-b849-f44be0190852',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:45 GMT',
=======
  'Fri, 02 Aug 2019 00:49:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeyspaged--1')
  .query(true)
  .reply(401, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6bc39de9-4953-4302-a44c-b99a44de9606',
=======
  '784adf76-c0de-4a21-b114-21a601ae864f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:45 GMT',
=======
  'Fri, 02 Aug 2019 00:49:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '684ae79e-083d-4063-b59d-30aee8fe2200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkAY5pBC4NMnPMMDDs-iWg_aSJHHgAAAMcc1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:46 GMT; path=/; secure; HttpOnly',
=======
  '0b58dfc7-654f-4612-a492-efd57d933f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ar2BoNHPO_VMq5KxoHpWRoU_aSJHHgAAALZ-1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:46 GMT',
=======
  'Fri, 02 Aug 2019 00:49:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-listdeletedkeyspaged--1')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '056f9b5e-6630-4cae-91f0-692f20aa26ee',
=======
  '015a81ab-3ab1-40b6-8f21-5de24f190162',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:46 GMT',
=======
  'Fri, 02 Aug 2019 00:49:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);

