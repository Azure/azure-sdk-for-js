let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/create')
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
  'c99113e8-5af4-4973-a665-3c1363052df0',
=======
  '3cf0aeb9-3288-417e-8724-dd3ed810a6f5',
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
  'Thu, 01 Aug 2019 17:43:18 GMT',
=======
  'Fri, 02 Aug 2019 00:41:49 GMT',
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
  '97c39e16-947f-4b0a-b314-645eb7262600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHAQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:19 GMT; path=/; secure; HttpOnly',
=======
  '0df2fbdb-82e5-4c9a-9e1b-2242c0400000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHAQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:41:50 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:18 GMT',
=======
  'Fri, 02 Aug 2019 00:41:49 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/17cf5353e7b9480ba4143fed46c1de7a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ssRf1vPwiV9WXVj1XQS-pfCld3kfelR1Ihvx-OJ8zaOxkR81QPJh4beSh3ZgqzBYRwH3bt_IsFTmeHvUzFkufb88r6cFOmbI_ElKwDcATyuKRk1nmV4JefbmumRcyOa0AU1dXuD1nvtfus97ZS-puK5isBLTzIeJk-bYgwRm_IngqDxZPRbcfer2PZpuwXqDE5txIm7c_hmvYAb_ZIIhCH8XX7QmdqC07HHmgBQBqvsad_SLOcwLE5Gea7yT5NaqXDJwim9s_-eD4ctuSO2uv115DMU4_Qd14hUSBsJgpgSVwN7Gktqy80XY22R8-3OGeo1ftPyfzu_kKFDb7dwi8w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681399,"updated":1564681399,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/40966d9e20e943f298850fbed527c43f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5RdPvdoUXEqbU_VLwW88uwH35sp09lbDLGltGEJGAqgKwbz5MNrgmgvPwuYtZ7XPWkMnb06iru6jTHAKIHB4uRKmg_RAugZEINmjBRNlS3wgozxD0pHYixcvI4i-_GTdglJqoE0K69rz-gxmqGzd54foIfff5gpmkKCm1HR6XSBQmzP_qmQc51UaNUxmEQTd9x9sPbJ8qIoa9-CaxQeASB2Mc9d0unnY3T7I9kykdt7RHf4c6hJgxKtv9AuHN5Lto-mUQCp7dGFoLGxQbtqg3GYVPcZl9kZ8lfEBZ9qAYDyQUBTzDHbd4T97AvqN4sbcrMY2sfsJIhHNolWhHZdvAw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706510,"updated":1564706510,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '93854df4-fc42-4ad6-8861-9a347059f90b',
=======
  '981551e0-e159-423a-883d-55bc18e89cd4',
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
  'Thu, 01 Aug 2019 17:43:18 GMT',
=======
  'Fri, 02 Aug 2019 00:41:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '714' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  'c374c7a3-0df7-40d1-9d09-0ff42c66a5f0',
=======
  '60b8dc77-f492-415b-a210-f32e3ad6d63c',
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
  'Thu, 01 Aug 2019 17:43:20 GMT',
=======
  'Fri, 02 Aug 2019 00:41:50 GMT',
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
  'edfdb7cd-7d1c-4efa-9630-3a7c905f2e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHAgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:20 GMT; path=/; secure; HttpOnly',
=======
  '572eb77f-063d-4fdd-9e13-547f91180000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHAgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:41:51 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:19 GMT',
=======
  'Fri, 02 Aug 2019 00:41:51 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-","deletedDate":1564681400,"scheduledPurgeDate":1572457400,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/17cf5353e7b9480ba4143fed46c1de7a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ssRf1vPwiV9WXVj1XQS-pfCld3kfelR1Ihvx-OJ8zaOxkR81QPJh4beSh3ZgqzBYRwH3bt_IsFTmeHvUzFkufb88r6cFOmbI_ElKwDcATyuKRk1nmV4JefbmumRcyOa0AU1dXuD1nvtfus97ZS-puK5isBLTzIeJk-bYgwRm_IngqDxZPRbcfer2PZpuwXqDE5txIm7c_hmvYAb_ZIIhCH8XX7QmdqC07HHmgBQBqvsad_SLOcwLE5Gea7yT5NaqXDJwim9s_-eD4ctuSO2uv115DMU4_Qd14hUSBsJgpgSVwN7Gktqy80XY22R8-3OGeo1ftPyfzu_kKFDb7dwi8w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681399,"updated":1564681399,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-","deletedDate":1564706512,"scheduledPurgeDate":1572482512,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/40966d9e20e943f298850fbed527c43f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5RdPvdoUXEqbU_VLwW88uwH35sp09lbDLGltGEJGAqgKwbz5MNrgmgvPwuYtZ7XPWkMnb06iru6jTHAKIHB4uRKmg_RAugZEINmjBRNlS3wgozxD0pHYixcvI4i-_GTdglJqoE0K69rz-gxmqGzd54foIfff5gpmkKCm1HR6XSBQmzP_qmQc51UaNUxmEQTd9x9sPbJ8qIoa9-CaxQeASB2Mc9d0unnY3T7I9kykdt7RHf4c6hJgxKtv9AuHN5Lto-mUQCp7dGFoLGxQbtqg3GYVPcZl9kZ8lfEBZ9qAYDyQUBTzDHbd4T97AvqN4sbcrMY2sfsJIhHNolWhHZdvAw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706510,"updated":1564706510,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '2ee3416c-9c4c-4cfe-a00c-a54dbcabf41b',
=======
  'f227cb64-de39-4377-824f-4513c89f57be',
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
  'Thu, 01 Aug 2019 17:43:20 GMT',
=======
  'Fri, 02 Aug 2019 00:41:51 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '903' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  'b7f82a2a-7d2c-4d91-a455-15db6563efee',
=======
  '98161d56-9bfb-4a05-93df-4b0b5714f21b',
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
  'Thu, 01 Aug 2019 17:43:20 GMT',
=======
  'Fri, 02 Aug 2019 00:41:52 GMT',
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
  '9c2dfd27-72b9-43ee-8e5f-ca8d24302b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHAwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:21 GMT; path=/; secure; HttpOnly',
=======
  '0ac1188f-c753-4d49-a9e6-94651e200000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHAwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:41:53 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:21 GMT',
=======
  'Fri, 02 Aug 2019 00:41:52 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '58e2e150-bd5a-444d-b79f-3ce229bd1d74',
=======
  '8e23715d-af1b-4d21-8f1f-7a1fa8a686fa',
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
  'Thu, 01 Aug 2019 17:43:20 GMT',
=======
  'Fri, 02 Aug 2019 00:41:53 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '725977bc-afac-4c80-aa76-d8641a4743d4',
=======
  '7b850c3c-a6d3-4777-af49-ba00e04f5c5e',
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
  'Thu, 01 Aug 2019 17:43:31 GMT',
=======
  'Fri, 02 Aug 2019 00:42:04 GMT',
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
  '7e26f566-196a-4bab-9064-0c15b37c2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHBAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:32 GMT; path=/; secure; HttpOnly',
=======
  '7e65ccf8-224a-4cca-a226-9c2b7b5b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHBAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:04 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:32 GMT',
=======
  'Fri, 02 Aug 2019 00:42:04 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '355e6e07-1e56-49ba-8ad2-f86c328f3615',
=======
  '4957e504-bee6-46ae-9880-95850deadd66',
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
  'Thu, 01 Aug 2019 17:43:31 GMT',
=======
  'Fri, 02 Aug 2019 00:42:04 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkey-/create')
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
  '1a2037ef-7871-4924-9d43-2be627a7d9fc',
=======
  '7a163da0-66b9-412e-8f43-2f19225f718e',
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
  'Thu, 01 Aug 2019 17:43:32 GMT',
=======
  'Fri, 02 Aug 2019 00:42:05 GMT',
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
  'b0678720-2ee5-45bf-b989-8d049c912400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHBQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:33 GMT; path=/; secure; HttpOnly',
=======
  'bea54f0f-9029-4ba5-9251-b64f72570000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHBQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:05 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:32 GMT',
=======
  'Fri, 02 Aug 2019 00:42:04 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-/da7b7110e7104d108397fb78893e1255","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"v76caELp5To-2ORHNcZg08AXhDn8EK8Ie9WJTPEwKQGBgYdYXn6e3M_EXIgc2tKschOoL0Ds-_EVHpSs6hE48b7ushqIBrS4v0gLj5vylUAXLjr76xFK9JS1uMYwv49VfjujHcuR0hdjHPz33zWv6xCMiakQ2UGslwMYLxvG9ph1QKg8hd7HBTnRs5iqrBgVCWJ-QGiZ9CaTZg8TnU_-ntICbH3qqt8P1_n-_5fyIwsVRoVRTr0zg_PwkgZCz6yirAwsPLecEfOLa6pBr4Cmx_5eyaOYz22L3D10MAYmFpAEbKI6q9gX2xNLd-ADLYiQB3MIhB6PIofBauHKCrtpgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681413,"updated":1564681413,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-/67a5f5daeb6b475ea1ff5417fb19b660","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0O2d3_QJLjtlbxFdWtNkjp6nMjGSUY4xTLFUkwYSyJhf6YJ9rSLrIXiyN56JBoNzT7tWH8djC05sKN63BYBxgUh3F74TvH3QaH7p6WqSHEzipbz5vnZcN4FzT49BezkS9C-1yGIN_K5yEDtU2qG4CtiKy4yNCt8FBoDlRe3dn9Arg10VbjlZznG5bicvctXBiQ7Rq3TCrIBLi0c32vMkU4qpipB936xy0BVwkEwWUFzP8fHvHTBhFxhpYJgshlAQfb7mGH1oVwzJe8XReoVIu6I3aah8GKwwnKDRGavTeXl5QMbAuAYS3sXDtND7Bq7b9p7JZnN37mJpskV9s2fkvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706526,"updated":1564706526,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'eae01990-92bc-43f5-9101-db3996eecd58',
=======
  '704e5e8c-3b62-4525-a933-1b7481c4fce6',
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
  'Thu, 01 Aug 2019 17:43:32 GMT',
=======
  'Fri, 02 Aug 2019 00:42:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '695' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkey-')
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
  '659ea16e-c033-4607-a9ed-f159155fa575',
=======
  'ed67a43c-4e8d-4c83-85b1-d683bb544a36',
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
  'Thu, 01 Aug 2019 17:43:33 GMT',
=======
  'Fri, 02 Aug 2019 00:42:06 GMT',
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
  '62fc18eb-8354-4878-9a8c-899336892400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHBgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:33 GMT; path=/; secure; HttpOnly',
=======
  'd085aafa-7f07-4ac7-a2ec-f9c84d0c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHBgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:06 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:33 GMT',
=======
  'Fri, 02 Aug 2019 00:42:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-","deletedDate":1564681414,"scheduledPurgeDate":1572457414,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-/da7b7110e7104d108397fb78893e1255","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"v76caELp5To-2ORHNcZg08AXhDn8EK8Ie9WJTPEwKQGBgYdYXn6e3M_EXIgc2tKschOoL0Ds-_EVHpSs6hE48b7ushqIBrS4v0gLj5vylUAXLjr76xFK9JS1uMYwv49VfjujHcuR0hdjHPz33zWv6xCMiakQ2UGslwMYLxvG9ph1QKg8hd7HBTnRs5iqrBgVCWJ-QGiZ9CaTZg8TnU_-ntICbH3qqt8P1_n-_5fyIwsVRoVRTr0zg_PwkgZCz6yirAwsPLecEfOLa6pBr4Cmx_5eyaOYz22L3D10MAYmFpAEbKI6q9gX2xNLd-ADLYiQB3MIhB6PIofBauHKCrtpgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681413,"updated":1564681413,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-","deletedDate":1564706526,"scheduledPurgeDate":1572482526,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-/67a5f5daeb6b475ea1ff5417fb19b660","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0O2d3_QJLjtlbxFdWtNkjp6nMjGSUY4xTLFUkwYSyJhf6YJ9rSLrIXiyN56JBoNzT7tWH8djC05sKN63BYBxgUh3F74TvH3QaH7p6WqSHEzipbz5vnZcN4FzT49BezkS9C-1yGIN_K5yEDtU2qG4CtiKy4yNCt8FBoDlRe3dn9Arg10VbjlZznG5bicvctXBiQ7Rq3TCrIBLi0c32vMkU4qpipB936xy0BVwkEwWUFzP8fHvHTBhFxhpYJgshlAQfb7mGH1oVwzJe8XReoVIu6I3aah8GKwwnKDRGavTeXl5QMbAuAYS3sXDtND7Bq7b9p7JZnN37mJpskV9s2fkvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706526,"updated":1564706526,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '96c6264f-0f83-4637-96b4-c9aed119162e',
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
  'Thu, 01 Aug 2019 17:43:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '863' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '25091d18-cec9-4743-8fcf-f34ecc053c02',
=======
  'ee573eba-639b-4eea-83ab-11a2961edef0',
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
  'Thu, 01 Aug 2019 17:43:34 GMT',
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
  '68654fce-ffaa-4b17-82d0-e6f2b05d2100',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHBwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:34 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Thu, 01 Aug 2019 17:43:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '45d2f216-56e2-4172-a9cf-c14555d60f33',
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
  'Thu, 01 Aug 2019 17:43:34 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:42:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '865' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '6bb4f88e-c766-4599-b9b2-786ba9a03cde',
=======
  '72ad3c3f-5577-4a3f-b252-8fe46f1d91b2',
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
  'Thu, 01 Aug 2019 17:43:45 GMT',
=======
  'Fri, 02 Aug 2019 00:42:06 GMT',
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
  '37ad0127-a532-4df1-9d5f-a82144e52600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHCAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:46 GMT; path=/; secure; HttpOnly',
=======
  '572eb77f-063d-4fdd-9e13-547fd71a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHBwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:07 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:45 GMT',
=======
  'Fri, 02 Aug 2019 00:42:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  'f9df3985-3086-41ff-b759-c7fc8cae7f18',
=======
  'c38f4c31-026b-48c2-a60b-7ba23551f0e1',
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
  'Thu, 01 Aug 2019 17:43:46 GMT',
=======
  'Fri, 02 Aug 2019 00:42:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkeywithsize-/create')
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
  'f36ea3cd-dadd-4204-9159-09f3c1daf0b3',
=======
  'c32ea9e6-d294-4653-be1d-77dd54807481',
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
  'Thu, 01 Aug 2019 17:43:46 GMT',
=======
  'Fri, 02 Aug 2019 00:42:18 GMT',
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
  'b73de4a6-bb1f-4295-be27-8f098e7b2b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHCQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:47 GMT; path=/; secure; HttpOnly',
=======
  'a108e76d-b635-4c42-b848-7a48a5070000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHCAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:18 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:47 GMT',
=======
  'Fri, 02 Aug 2019 00:42:17 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkeywithsize-/create', {"kty":"RSA","key_size":2048,"attributes":{}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-/ef557dcac7734cb0a969904032233298","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jrCKJ8hJ5mSRj7OfgNAyp_HoRvgR4NmZQJl_gzhHqBLBB_VY5XP4h4cwaimqZHkKQFcegZStdjdA3qB6rXpBKer7Sb1Vpz7Ha5FlZtxRKyNHn4O4knYRAiaxCZkxP9hmji0B89u6isgLr7Wnf6eihJz3iP5Vi4ETc5RFhU41BdkvLwLTBeK10fGbyuAVAKxZ4xtPE0-6p_1L8Hm23Ki2nAAGZ6C19US0LrBN237viAODnKAVbUwMuBcF6vl86Mtjuc1VeoltUWM9mM7BRHfOiGt7I2hJlZblDRwVo6mrCuzOo4NkRi94YkgthyVMlEge6A3OUtfxArZOo0UksTpRjw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681427,"updated":1564681427,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '72e5b6d2-ca48-443c-8e1d-d5708c917899',
=======
  '8f93c1fb-e212-46e7-8a35-f26d8ebe4daa',
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
  'Thu, 01 Aug 2019 17:43:47 GMT',
=======
  'Fri, 02 Aug 2019 00:42:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '702' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  'e8a3b4e2-878a-4750-82a0-911538567919',
=======
  '0301918e-f0bb-405c-99fb-61f3063755aa',
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
  'Thu, 01 Aug 2019 17:43:47 GMT',
=======
  'Fri, 02 Aug 2019 00:42:19 GMT',
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
  '3c891686-a436-4a56-9381-c09b5aad2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHCgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:48 GMT; path=/; secure; HttpOnly',
=======
  '5cb9ebd5-467b-4377-9756-f8da20623400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHCQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:19 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:47 GMT',
=======
  'Fri, 02 Aug 2019 00:42:18 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkeywithsize-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-","deletedDate":1564681429,"scheduledPurgeDate":1572457429,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-/ef557dcac7734cb0a969904032233298","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jrCKJ8hJ5mSRj7OfgNAyp_HoRvgR4NmZQJl_gzhHqBLBB_VY5XP4h4cwaimqZHkKQFcegZStdjdA3qB6rXpBKer7Sb1Vpz7Ha5FlZtxRKyNHn4O4knYRAiaxCZkxP9hmji0B89u6isgLr7Wnf6eihJz3iP5Vi4ETc5RFhU41BdkvLwLTBeK10fGbyuAVAKxZ4xtPE0-6p_1L8Hm23Ki2nAAGZ6C19US0LrBN237viAODnKAVbUwMuBcF6vl86Mtjuc1VeoltUWM9mM7BRHfOiGt7I2hJlZblDRwVo6mrCuzOo4NkRi94YkgthyVMlEge6A3OUtfxArZOo0UksTpRjw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681427,"updated":1564681427,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-/38cbf6db92ad4f289de86b245745ea8f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yI0_Xkdgos7I04lJRv9A9XOY5lIuUEnzGUwQRsg_oDLqYuzDekITP7unypemYB0me6FEfGbFhZgg-tv_TO1_Ic7JxMVHnBp6zvOSqKag75nheDN1PANe4SYgWy-TjOh7AENpM5d5U9jqFW5jAnvAp5TJXddCgRpMPSMtIajdV0sUhKasVEEe4NopqvUR6awA4i1-xwnu-V_dPGbgWyXEKvQ5ZgbaDkBqmQFQ6KvV3znZfHO3yA_BfPNlQQpBdDSwggFWDFNxYJ3MnLorrjj72EZS6tftLIYP9LwtJst59HSgYFHVc_W3FHSsGkTygN_hHxXD5j_adA1MZ20d3HhtMw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706539,"updated":1564706539,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '85539de1-48d3-4249-92d2-cbc7ff0b4ecb',
=======
  'd0c1c62c-e4cc-46c2-a3fc-7d6df2091e1b',
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
  'Thu, 01 Aug 2019 17:43:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '879' ]);
=======
  'Fri, 02 Aug 2019 00:42:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '703' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '9bafda45-c46c-41ba-b0d7-99c595555350',
=======
  '55cff052-a390-44d7-acad-372459933267',
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
  'Thu, 01 Aug 2019 17:43:49 GMT',
=======
  'Fri, 02 Aug 2019 00:42:19 GMT',
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
  '61a827a3-aa58-49db-b153-4fd4942d2b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHCwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:43:50 GMT; path=/; secure; HttpOnly',
=======
  '30f5b514-41a4-43b4-a655-3890f0f53200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHCgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:43:49 GMT',
=======
  'Fri, 02 Aug 2019 00:42:19 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-","deletedDate":1564706540,"scheduledPurgeDate":1572482540,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-/38cbf6db92ad4f289de86b245745ea8f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yI0_Xkdgos7I04lJRv9A9XOY5lIuUEnzGUwQRsg_oDLqYuzDekITP7unypemYB0me6FEfGbFhZgg-tv_TO1_Ic7JxMVHnBp6zvOSqKag75nheDN1PANe4SYgWy-TjOh7AENpM5d5U9jqFW5jAnvAp5TJXddCgRpMPSMtIajdV0sUhKasVEEe4NopqvUR6awA4i1-xwnu-V_dPGbgWyXEKvQ5ZgbaDkBqmQFQ6KvV3znZfHO3yA_BfPNlQQpBdDSwggFWDFNxYJ3MnLorrjj72EZS6tftLIYP9LwtJst59HSgYFHVc_W3FHSsGkTygN_hHxXD5j_adA1MZ20d3HhtMw","e":"AQAB"},"attributes":{"enabled":true,"created":1564706539,"updated":1564706539,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '855c2ef5-e826-4651-a737-160a1515e941',
=======
  '5fc7133e-d453-40f6-bb07-415e43ba277e',
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
  'Thu, 01 Aug 2019 17:43:49 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:42:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '881' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '1985a731-85d0-48df-82f5-8b97a6d1c731',
=======
  'f31e0b21-4327-41fc-b084-bcbe3640e47b',
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
  'Thu, 01 Aug 2019 17:44:00 GMT',
=======
  'Fri, 02 Aug 2019 00:42:19 GMT',
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
  'aa326bf7-829d-49dd-bb31-b1b743392a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHDAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:01 GMT; path=/; secure; HttpOnly',
=======
  'a75e3925-808e-4e4e-901c-81d327293700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHCwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:00 GMT',
=======
  'Fri, 02 Aug 2019 00:42:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '08e9d176-f5f2-4e2e-b7ec-72e346539a1b',
=======
  '2f626dab-6a80-4311-b4fe-35f760e462f0',
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
  'Thu, 01 Aug 2019 17:44:00 GMT',
=======
  'Fri, 02 Aug 2019 00:42:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkey-/create')
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
  '88abd12b-a909-48cd-a298-87576fa129b9',
=======
  'abfba797-ad2b-4317-828f-eeefce8db208',
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
  'Thu, 01 Aug 2019 17:44:01 GMT',
=======
  'Fri, 02 Aug 2019 00:42:30 GMT',
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
  'eadb1cab-abdf-4360-995c-3655b78a2600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHDQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:01 GMT; path=/; secure; HttpOnly',
=======
  '9b758a90-7294-43c7-85c5-088bc10f0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHDAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:31 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:01 GMT',
=======
  'Fri, 02 Aug 2019 00:42:31 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkey-/create', {"kty":"EC"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkey-/bad84e034ac74207b7d4083838b732c1","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"Vk3GGzIWrKgJvh43XRa7xA5nZWjQPBJntxycmp9Rawo","y":"esvh6oup5FO3ayIUOR-HDkRnuZqz1CqAPFjHXOIsILs"},"attributes":{"enabled":true,"created":1564681442,"updated":1564681442,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '4dd9608d-171e-4ff6-9c12-bbf4a3537b1b',
=======
  '65382abb-c827-4606-b5ff-ea11377c420d',
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
  'Thu, 01 Aug 2019 17:44:01 GMT',
=======
  'Fri, 02 Aug 2019 00:42:31 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '405' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkey-')
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
  '752d38db-3219-4623-b929-bc40c382a168',
=======
  'fc1e0313-eb2e-4a7d-b235-d2f1dd81674c',
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
  'Thu, 01 Aug 2019 17:44:01 GMT',
=======
  'Fri, 02 Aug 2019 00:42:32 GMT',
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
  '02ee58eb-4b03-4d71-899e-9eccff892a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHDgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:02 GMT; path=/; secure; HttpOnly',
=======
  '9bf5dd2c-e120-4f2c-a440-75126e533e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHDQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:32 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:02 GMT',
=======
  'Fri, 02 Aug 2019 00:42:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateanECkey-","deletedDate":1564681443,"scheduledPurgeDate":1572457443,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkey-/bad84e034ac74207b7d4083838b732c1","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"Vk3GGzIWrKgJvh43XRa7xA5nZWjQPBJntxycmp9Rawo","y":"esvh6oup5FO3ayIUOR-HDkRnuZqz1CqAPFjHXOIsILs"},"attributes":{"enabled":true,"created":1564681442,"updated":1564681442,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkey-/6764b99eaf684020b9d20d3f358d23a2","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"nLF-OUWkP8vXwoYD7aAZoiuqX7phu5YN48Jg3Q1Qq-M","y":"wEHgUBnCfR8NTbj4gYnDJ0lsEWoOXbuJHsmiRsUhQ-k"},"attributes":{"enabled":true,"created":1564706553,"updated":1564706553,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '990fc8d7-71c2-41e6-ad5c-f6f9a00fbe06',
=======
  'bb878fd3-3525-4f09-bc2c-e2736916e8f0',
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
  'Thu, 01 Aug 2019 17:44:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '574' ]);
=======
  'Fri, 02 Aug 2019 00:42:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '406' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  '1a0fc66c-b831-462e-860a-71021715636b',
=======
  'f8f426d0-5943-4394-96d1-a7d2d01767cb',
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
  'Thu, 01 Aug 2019 17:44:03 GMT',
=======
  'Fri, 02 Aug 2019 00:42:33 GMT',
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
  '9ab1c769-5e16-4d61-b048-90f9761d2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHDwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:03 GMT; path=/; secure; HttpOnly',
=======
  '79123db6-148e-47f9-9e1b-e9500c520000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHDgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:33 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:03 GMT',
=======
  'Fri, 02 Aug 2019 00:42:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateanECkey-","deletedDate":1564706553,"scheduledPurgeDate":1572482553,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkey-/6764b99eaf684020b9d20d3f358d23a2","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"nLF-OUWkP8vXwoYD7aAZoiuqX7phu5YN48Jg3Q1Qq-M","y":"wEHgUBnCfR8NTbj4gYnDJ0lsEWoOXbuJHsmiRsUhQ-k"},"attributes":{"enabled":true,"created":1564706553,"updated":1564706553,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '397d6d01-f88c-42da-a92e-c7dae390d758',
=======
  '9c0772dc-5ab0-413c-807f-008af559e64d',
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
  'Thu, 01 Aug 2019 17:44:03 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:42:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '576' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  'b5ce372d-fa35-4617-bac7-e2f089fd16ae',
=======
  'fa7bad47-4038-4148-96a7-29fc13a28be8',
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
  'Thu, 01 Aug 2019 17:44:14 GMT',
=======
  'Fri, 02 Aug 2019 00:42:34 GMT',
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
  'e53bbb31-eed2-443b-9486-726cd1b22800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHEAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:14 GMT; path=/; secure; HttpOnly',
=======
  '4deed568-bbc4-4537-83ee-a7fd2fef3900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHDwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:13 GMT',
=======
  'Fri, 02 Aug 2019 00:42:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  '7a1e9105-5a61-4e66-810d-757c8a35af4b',
=======
  'd85dc781-053c-4d41-ac5e-c05e82fba463',
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
  'Thu, 01 Aug 2019 17:44:13 GMT',
=======
  'Fri, 02 Aug 2019 00:42:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkeywithcurve-/create')
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
  '94f2ff9e-b336-472b-b635-94062db38308',
=======
  '7477ce9f-8be7-4a32-a1de-2817b204052f',
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
  'Thu, 01 Aug 2019 17:44:14 GMT',
=======
  'Fri, 02 Aug 2019 00:42:45 GMT',
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
  '19323b2d-23ef-4dae-9db1-8a1fa70b2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHEQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:15 GMT; path=/; secure; HttpOnly',
=======
  '81317433-be59-4276-b073-51a9ca320000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHEAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:45 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:14 GMT',
=======
  'Fri, 02 Aug 2019 00:42:44 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkeywithcurve-/create', {"kty":"EC","attributes":{},"crv":"P-256"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkeywithcurve-/df70ca6a31fb4885a4b529aa0b1e404d","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"2EssF5w3ZL6XyltExNAUSrM9fsMZutfKH3GwxoEQ4Ms","y":"e3JJZHpDwVIhrW0FUsxOe9QOuJknKwl1SuPtOK1Wj38"},"attributes":{"enabled":true,"created":1564681455,"updated":1564681455,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'ddf4ca95-ecc8-4dc3-ad8b-92005096775d',
=======
  '0eea0c2f-eaa1-4df5-a7e5-bb5903a4c6f4',
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
  'Thu, 01 Aug 2019 17:44:14 GMT',
=======
  'Fri, 02 Aug 2019 00:42:44 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '414' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '602766d6-6335-43b2-b450-9bfb4a4da22d',
=======
  '6e3cc6cc-ce1a-40ae-9d5c-216ca93da88a',
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
  'Thu, 01 Aug 2019 17:44:15 GMT',
=======
  'Fri, 02 Aug 2019 00:42:45 GMT',
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
  'd9e5abdc-3616-4f06-bce7-ab4c97202800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHEgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:16 GMT; path=/; secure; HttpOnly',
=======
  '5e3298ab-419c-41e9-9e0c-e7bac02a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHEQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:46 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:16 GMT',
=======
  'Fri, 02 Aug 2019 00:42:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkeywithcurve-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-","deletedDate":1564681456,"scheduledPurgeDate":1572457456,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkeywithcurve-/df70ca6a31fb4885a4b529aa0b1e404d","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"2EssF5w3ZL6XyltExNAUSrM9fsMZutfKH3GwxoEQ4Ms","y":"e3JJZHpDwVIhrW0FUsxOe9QOuJknKwl1SuPtOK1Wj38"},"attributes":{"enabled":true,"created":1564681455,"updated":1564681455,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkeywithcurve-/14d1ac4309c84926b1062471e7990393","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"Lz4ZGle_o-Tj7-4v3ewJsc0J0to_2fcXs9ie8TG35fY","y":"IqRyNBI4mULn3xK11pxGFfA7DnJjKIozq-bBDgtV6_A"},"attributes":{"enabled":true,"created":1564706567,"updated":1564706567,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'a87fbda8-71d2-4cd2-9bfe-f6ad035ff877',
=======
  'a3656ef5-7189-4477-b7b5-6ed4e2cebe5c',
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
  'Thu, 01 Aug 2019 17:44:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '592' ]);
=======
  'Fri, 02 Aug 2019 00:42:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '415' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  'a1cee77c-b4b7-41ae-99ff-80d28141bf46',
=======
  'e527f4e7-d109-4178-b9f8-5812e6e6c26a',
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
  'Thu, 01 Aug 2019 17:44:15 GMT',
=======
  'Fri, 02 Aug 2019 00:42:46 GMT',
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
  'e29963fd-2207-4014-9872-081acf822400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHEwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:16 GMT; path=/; secure; HttpOnly',
=======
  '4091c075-aa7d-4099-a36b-aef326fb3600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHEgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:16 GMT',
=======
  'Fri, 02 Aug 2019 00:42:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-","deletedDate":1564706568,"scheduledPurgeDate":1572482568,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkeywithcurve-/14d1ac4309c84926b1062471e7990393","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"Lz4ZGle_o-Tj7-4v3ewJsc0J0to_2fcXs9ie8TG35fY","y":"IqRyNBI4mULn3xK11pxGFfA7DnJjKIozq-bBDgtV6_A"},"attributes":{"enabled":true,"created":1564706567,"updated":1564706567,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'f7263681-e20f-4317-9353-45a52ce9e92a',
=======
  '2c5e01ad-5546-4f12-b4ad-ff54af24204c',
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
  'Thu, 01 Aug 2019 17:44:16 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:42:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '594' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  'b2d3e0cf-3aad-46c8-99b2-3d95cc35e80e',
=======
  'd1e3c7f9-6016-42fc-a650-b6242f75c88c',
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
  'Thu, 01 Aug 2019 17:44:27 GMT',
=======
  'Fri, 02 Aug 2019 00:42:47 GMT',
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
  '0d416895-c101-4ed5-aef0-fa7e33ae2300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHFAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:27 GMT; path=/; secure; HttpOnly',
=======
  'efe152b0-84cf-48f4-9970-30107d100000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHEwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:48 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:27 GMT',
=======
  'Fri, 02 Aug 2019 00:42:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '99ef0a2e-e7e1-4243-8ff1-5270f4a27171',
=======
  '02af1098-b36b-426c-93c3-d06652afeffb',
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
  'Thu, 01 Aug 2019 17:44:27 GMT',
=======
  'Fri, 02 Aug 2019 00:42:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '27fb239b-6d19-47f9-9c4b-6a57e9cccbea',
=======
  '6160b6b4-cf62-477d-a316-b3e65def9031',
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
  'Thu, 01 Aug 2019 17:44:37 GMT',
=======
  'Fri, 02 Aug 2019 00:42:59 GMT',
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
  '18001304-3c29-454c-943f-7df1fd7c2800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHFQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:38 GMT; path=/; secure; HttpOnly',
=======
  'a8dee67c-bb45-4995-90ae-f21952360000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHFAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:42:59 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:37 GMT',
=======
  'Fri, 02 Aug 2019 00:42:58 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '7b0f930e-37e8-4c1c-851a-e19ac7cda62b',
=======
  'e8556722-b0cc-4156-89d4-a18928f270a1',
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
  'Thu, 01 Aug 2019 17:44:38 GMT',
=======
  'Fri, 02 Aug 2019 00:42:59 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateadisabledkey-/create')
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
  '16cd1cc6-e6fa-46cd-8332-f29e4f1d24cd',
=======
  '3a5c23ac-5ac2-4952-87ca-af4a369aa488',
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
  'Thu, 01 Aug 2019 17:44:39 GMT',
=======
  'Fri, 02 Aug 2019 00:42:59 GMT',
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
  'a048a91a-8bcb-405b-904b-7afbde0a2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHFgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:39 GMT; path=/; secure; HttpOnly',
=======
  '685d1687-2d7b-474f-b3ba-505ebb470000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHFQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:00 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateadisabledkey-/create', {"kty":"RSA","attributes":{"enabled":false}})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateadisabledkey-/5f9523d58fc04c6a815e2314f527b1ec","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"opPqEZzC39Yh2_9NC20OvAKhAL8Ur0WkbLWuWZ-7uvrECPPMH3lgZzhrrqL8Oe87U7sNy6QenyRq9NK7jvIiK_e7bOmheIGP0pChQsqaHKB-iuA9DxPzwvReWFK6FLZAwOHGtMpJtYVInGrOaM3oUeaYR3ZGi_m_u6ioxKSyNfbfTvB95HnJDHnt2IgSreotcqqIfaxbqoR0PiiHKPyh-gmO71ZuwXVxfzxgDahRwueOnMkoPm9E35yEJefi7RyfvWS38F5IpT_0U82XsuX3TPhmCeFLh_xMPvNc7Hx8whYbIcD8SXBHwjbUHhduZEeLg2gDBH3iTEaGrwuTXIdiow","e":"AQAB"},"attributes":{"enabled":false,"created":1564681479,"updated":1564681479,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateadisabledkey-/d8cc3d6133204c4b9b588d3973265f36","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"v5f3PIhxzCdm2N3cWXM8x5isPbVSyG749Hg2-y58D9uVmrVS4xjfeuy8kBW2Ui5rwLcU8Dz-EGz9Bal0QhKIr0LowLmEwDHaDAq6pWuNl5j2My3JvOifkWUHlALkgTZOgEAZuWvjOxekTpD8YWg6CNwxoHQ0gQhSaJUHQv8IoZAY_LoNXkZrE6yQtW6nJ-PF32s-6tcL2X9rXyMOFlpF-LkkaMwvDG-Uk2Cys669CM8m_yWUZoYEnLqKghEQ90202U5t8RJIe8PBVQGJMrz6YopaW-YdmjHe9ofal1hEg9ZmuSbsWpjgucAV22ZQG807hRxPv8MKdKLG_LhK0X4-XQ","e":"AQAB"},"attributes":{"enabled":false,"created":1564706581,"updated":1564706581,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '531316f8-7b8a-48e1-a4bc-8520054df772',
=======
  '5ad649e8-9ad0-4c7a-8db7-d1476c103628',
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
  'Thu, 01 Aug 2019 17:44:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '701' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateadisabledkey-')
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
  'ac4ca9f6-59a7-47a5-ae8d-58d71bd1873e',
=======
  'bc6a2067-e5a1-4daf-89ef-9078bb4b9ef1',
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
  'Thu, 01 Aug 2019 17:44:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:01 GMT',
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
  '18a1ab24-373e-484c-8fff-4e0b60882700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHFwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:40 GMT; path=/; secure; HttpOnly',
=======
  'b1ba0e85-9d4f-484a-a4d5-20bb43473300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHFgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:01 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateadisabledkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateadisabledkey-","deletedDate":1564681480,"scheduledPurgeDate":1572457480,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateadisabledkey-/5f9523d58fc04c6a815e2314f527b1ec","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"opPqEZzC39Yh2_9NC20OvAKhAL8Ur0WkbLWuWZ-7uvrECPPMH3lgZzhrrqL8Oe87U7sNy6QenyRq9NK7jvIiK_e7bOmheIGP0pChQsqaHKB-iuA9DxPzwvReWFK6FLZAwOHGtMpJtYVInGrOaM3oUeaYR3ZGi_m_u6ioxKSyNfbfTvB95HnJDHnt2IgSreotcqqIfaxbqoR0PiiHKPyh-gmO71ZuwXVxfzxgDahRwueOnMkoPm9E35yEJefi7RyfvWS38F5IpT_0U82XsuX3TPhmCeFLh_xMPvNc7Hx8whYbIcD8SXBHwjbUHhduZEeLg2gDBH3iTEaGrwuTXIdiow","e":"AQAB"},"attributes":{"enabled":false,"created":1564681479,"updated":1564681479,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateadisabledkey-","deletedDate":1564706582,"scheduledPurgeDate":1572482582,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateadisabledkey-/d8cc3d6133204c4b9b588d3973265f36","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"v5f3PIhxzCdm2N3cWXM8x5isPbVSyG749Hg2-y58D9uVmrVS4xjfeuy8kBW2Ui5rwLcU8Dz-EGz9Bal0QhKIr0LowLmEwDHaDAq6pWuNl5j2My3JvOifkWUHlALkgTZOgEAZuWvjOxekTpD8YWg6CNwxoHQ0gQhSaJUHQv8IoZAY_LoNXkZrE6yQtW6nJ-PF32s-6tcL2X9rXyMOFlpF-LkkaMwvDG-Uk2Cys669CM8m_yWUZoYEnLqKghEQ90202U5t8RJIe8PBVQGJMrz6YopaW-YdmjHe9ofal1hEg9ZmuSbsWpjgucAV22ZQG807hRxPv8MKdKLG_LhK0X4-XQ","e":"AQAB"},"attributes":{"enabled":false,"created":1564706581,"updated":1564706581,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'af50dd07-6c29-4bb1-8822-0493b9ba26d3',
=======
  '9c21e945-7439-448e-a66d-a7bce1980969',
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
  'Thu, 01 Aug 2019 17:44:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '876' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  '7e38dde4-8e1d-4464-b084-f9d32b1147c3',
=======
  '020988e5-8534-4aa7-ac07-13390ff9c6e5',
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
  'Thu, 01 Aug 2019 17:44:40 GMT',
=======
  'Fri, 02 Aug 2019 00:43:02 GMT',
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
  '720e497c-a990-45da-a983-7158ff782100',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHGAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:40 GMT; path=/; secure; HttpOnly',
=======
  'ae71731c-0c5f-4120-b77a-3fb0873a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHFwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:02 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:40 GMT',
=======
  'Fri, 02 Aug 2019 00:43:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  '22ca7ae1-64e9-450f-9971-22c05d2c322e',
=======
  '878a2e36-a9dd-4793-9d29-2bdd6afc149b',
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
  'Thu, 01 Aug 2019 17:44:41 GMT',
=======
  'Fri, 02 Aug 2019 00:43:02 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  '39ebd7ad-7ba2-433c-ade7-6e184e88e792',
=======
  '46cf1c6c-628d-455c-8747-f1a457c55653',
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
  'Thu, 01 Aug 2019 17:44:51 GMT',
=======
  'Fri, 02 Aug 2019 00:43:12 GMT',
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
  'e352f98f-8fb3-47e6-96f2-0d98e9232600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHGQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:51 GMT; path=/; secure; HttpOnly',
=======
  '6726f526-c5b1-4996-b354-8edb6b1b3800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHGAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:13 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  'd2cc5265-d775-4356-b201-d29a9941e64b',
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
  'Thu, 01 Aug 2019 17:44:51 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithnotBefore-/create')
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
  '61e0cd75-82c7-4dfd-97c6-b338a60fe408',
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
  'Thu, 01 Aug 2019 17:44:51 GMT',
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
  'd3977beb-0a25-4a00-aa30-04be671f2b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHGgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Thu, 01 Aug 2019 17:44:52 GMT',
=======
  'Fri, 02 Aug 2019 00:43:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithnotBefore-/create', {"kty":"RSA","attributes":{"nbf":1546300805}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-/77645ea6150c44a990e1a0100bec972e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oLEBR_QtgX2mfUVnRMx3cIcUVtJ4AgmHfd4LOlreTrjXJP_1Nu-kEgxWUuH6wfB7dumXXeGDQqSbuKWMxBKI2yyu9vZAR-i6g7sZ-g93D0cT1EEzRhTOGrAoTtvZHZ-SMO6NbAVNA8C066MvCRr-x4YyWdRN3vbW3wc2GeHMiBSdJNUBj-RCYofRjGiSmHqs5eAmozuQVsf5DksosHHCyt0LWUEoyAK8_isczgXX4BXr5DkDCJB0Gax1FqXMpIVV4DtlIRr2kIeWBWk6xqrRNZsBPn0QMmr_faNnUTNccl82MD-nsh3JfNpSa1yAr18IozC5p7kDOKr_cMS7bJe4wQ","e":"AQAB"},"attributes":{"enabled":true,"nbf":1546300805,"created":1564681493,"updated":1564681493,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '6735ea95-6bc5-4e18-a9ca-60e628bbdde6',
=======
  '5e24c477-8d30-4feb-b4fb-91b76da45c0f',
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
  'Thu, 01 Aug 2019 17:44:52 GMT',
=======
  'Fri, 02 Aug 2019 00:43:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '721' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithnotBefore-')
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
  'fd5d8397-383f-4cea-bf2f-7aebbfb4fc1a',
=======
  '0ec26253-87fa-4b4e-8421-7cdcd71916ac',
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
  'Thu, 01 Aug 2019 17:44:52 GMT',
=======
  'Fri, 02 Aug 2019 00:43:13 GMT',
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
  'f43796a4-6a34-447a-9bc0-5cb318972300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHGwAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:53 GMT; path=/; secure; HttpOnly',
=======
  '244a60c8-1b28-485a-ac5a-f9ff590b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHGQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:14 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:53 GMT',
=======
  'Fri, 02 Aug 2019 00:43:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithnotBefore-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-","deletedDate":1564681493,"scheduledPurgeDate":1572457493,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-/77645ea6150c44a990e1a0100bec972e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oLEBR_QtgX2mfUVnRMx3cIcUVtJ4AgmHfd4LOlreTrjXJP_1Nu-kEgxWUuH6wfB7dumXXeGDQqSbuKWMxBKI2yyu9vZAR-i6g7sZ-g93D0cT1EEzRhTOGrAoTtvZHZ-SMO6NbAVNA8C066MvCRr-x4YyWdRN3vbW3wc2GeHMiBSdJNUBj-RCYofRjGiSmHqs5eAmozuQVsf5DksosHHCyt0LWUEoyAK8_isczgXX4BXr5DkDCJB0Gax1FqXMpIVV4DtlIRr2kIeWBWk6xqrRNZsBPn0QMmr_faNnUTNccl82MD-nsh3JfNpSa1yAr18IozC5p7kDOKr_cMS7bJe4wQ","e":"AQAB"},"attributes":{"enabled":true,"nbf":1546300805,"created":1564681493,"updated":1564681493,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-/0900fc564b284ce8a8719510c2ae2846","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zw-uyDf9MSfM60-y9FxdwXx9XlV3wz3NdFb2_w6UbLtcIvnaRwCoMBbup1bswi7LZR119s_6b5SncdNssyi1dWQn4EQ9roDRAvDtS2mu3Jr0a_knKkO6Q9R_GwpWKxn4Egc2FKjYJ1yB7Vy4cTpSKhQYIK-1Ja41hM7PDEeMfApAQpQWlj6V1I3gIpEOniIV-Cav9PvCtp5YiB67xSrX1_r1QaVkQMt611HiAyWjjR5R7rDk19q0-DXnbWaYci04c_zDB4gILTbC1JKnKOA-MJiTXL8PEKQJMkqyofs-27KgYfnBSGmoEHLlCHW62EHgB4n207mjbdFqAYzFK8sTkw","e":"AQAB"},"attributes":{"enabled":true,"nbf":1546300805,"created":1564706594,"updated":1564706594,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'be9990ac-f3fd-44a8-bd25-222f655576da',
=======
  '35d98b87-d63f-4b9b-ae54-2bcf9021dadb',
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
  'Thu, 01 Aug 2019 17:44:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '900' ]);
=======
  'Fri, 02 Aug 2019 00:43:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '722' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  '27ed63b3-3986-45d6-bec8-969b308219a9',
=======
  'c336148a-9a47-4099-9f7c-ca1fad2187f4',
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
  'Thu, 01 Aug 2019 17:44:54 GMT',
=======
  'Fri, 02 Aug 2019 00:43:14 GMT',
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
  '98af8715-5a08-4dc9-b561-b31833202900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHAAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:44:54 GMT; path=/; secure; HttpOnly',
=======
  '0e0582c5-1e9e-4633-8cd6-a838a6813700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHGgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:15 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:44:53 GMT',
=======
  'Fri, 02 Aug 2019 00:43:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-","deletedDate":1564706595,"scheduledPurgeDate":1572482595,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-/0900fc564b284ce8a8719510c2ae2846","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zw-uyDf9MSfM60-y9FxdwXx9XlV3wz3NdFb2_w6UbLtcIvnaRwCoMBbup1bswi7LZR119s_6b5SncdNssyi1dWQn4EQ9roDRAvDtS2mu3Jr0a_knKkO6Q9R_GwpWKxn4Egc2FKjYJ1yB7Vy4cTpSKhQYIK-1Ja41hM7PDEeMfApAQpQWlj6V1I3gIpEOniIV-Cav9PvCtp5YiB67xSrX1_r1QaVkQMt611HiAyWjjR5R7rDk19q0-DXnbWaYci04c_zDB4gILTbC1JKnKOA-MJiTXL8PEKQJMkqyofs-27KgYfnBSGmoEHLlCHW62EHgB4n207mjbdFqAYzFK8sTkw","e":"AQAB"},"attributes":{"enabled":true,"nbf":1546300805,"created":1564706594,"updated":1564706594,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '5c373567-743d-41ea-9970-5529556b9d7d',
=======
  'dc6f3d2f-365a-4175-8055-cddc2455ddb8',
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
  'Thu, 01 Aug 2019 17:44:54 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:43:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '902' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  'a02dddb7-8e73-4f7d-be3b-c109d631da18',
=======
  '693ee47c-ffe6-4702-b84f-6f099dd41339',
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
  'Thu, 01 Aug 2019 17:45:04 GMT',
=======
  'Fri, 02 Aug 2019 00:43:15 GMT',
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
  '83f22673-d70f-4cc7-8a93-8cc346702f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHQAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:05 GMT; path=/; secure; HttpOnly',
=======
  '1ee66313-9505-47f2-90ca-401b7c510000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHGwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:16 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:04 GMT',
=======
  'Fri, 02 Aug 2019 00:43:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  '2a8ee151-2258-4017-a671-a1b243f2777f',
=======
  '1e6d546a-0c7a-412e-9d52-1225f3b53817',
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
  'Thu, 01 Aug 2019 17:45:05 GMT',
=======
  'Fri, 02 Aug 2019 00:43:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  'a84ef06d-34e9-4d35-a6fe-e6101cff6bdb',
=======
  '38718039-3d72-4f0f-bcb1-3a52bb5b9c7a',
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
  'Thu, 01 Aug 2019 17:45:15 GMT',
=======
  'Fri, 02 Aug 2019 00:43:26 GMT',
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
  '044b1dd6-02df-4427-a575-331db74f2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:16 GMT; path=/; secure; HttpOnly',
=======
  '97c63379-7972-458e-b67e-6b5334550000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:15 GMT',
=======
  'Fri, 02 Aug 2019 00:43:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  'bda98830-3de8-4a3f-8ed5-552900cc0524',
=======
  '2815a945-1566-41f3-adab-8e70938ae259',
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
  'Thu, 01 Aug 2019 17:45:16 GMT',
=======
  'Fri, 02 Aug 2019 00:43:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  '198ab039-933e-4ecc-a7e9-c0773872c426',
=======
  '31ad0819-e35b-4ded-8283-67212fb0af7b',
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
  'Thu, 01 Aug 2019 17:45:15 GMT',
=======
  'Fri, 02 Aug 2019 00:43:37 GMT',
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
  '24968e6f-fb97-48e4-866a-545fe5482200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:16 GMT; path=/; secure; HttpOnly',
=======
  'e92b8e45-dd3a-4641-8da5-9d5f64160000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:37 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:16 GMT',
=======
  'Fri, 02 Aug 2019 00:43:37 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithexpires-/bf0fdd0bfd9640d189c75de7b1102f26","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"o-U8hlMMbap1THcctvI44Y7Q4m20p1FB9hIOEktU0E2s3j0kISr57M1N28dUddxWw0P_xAsY_c-shB1SPU5knSe26IKkmsIBNH0p8F6WOAKW88qQw3AADfasBsEY4OAbD4d8OM9l9SOQulA7_PvCbjwWkv6zHFWeydb5PB8eWZfp_5iLMWlW4Oe_KHqcZ5wFV8xfoGWh2dQSDbT6l7z9_IIdtHxRoiNG1HTx_NPnEcRObAssP8w3AhLoiz2V-HNPT6AhVhmRgeg5ibvB149ZOk1Gv_kgEdvnrLUWixktScnS1Mr07VtpyKHcG_BG_eNZqYECViN0e9qCSv92yWUIww","e":"AQAB"},"attributes":{"enabled":true,"exp":1546300805,"created":1564681517,"updated":1564681517,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(204, "", [ 'Cache-Control',
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
  '15402025-186a-45c2-a35d-f3d244650c53',
=======
  'dfbbd6ad-1d23-4935-827d-61b240073bdb',
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
  'Thu, 01 Aug 2019 17:45:16 GMT',
=======
  'Fri, 02 Aug 2019 00:43:38 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithexpires-/create')
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
  '3cea1b24-9922-4ff4-9808-656656d06a3b',
=======
  '79462532-4ddf-4dc5-8b87-32a9a90e463f',
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
  'Thu, 01 Aug 2019 17:45:17 GMT',
=======
  'Fri, 02 Aug 2019 00:43:37 GMT',
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
  '5f624537-d079-4063-ab7f-7764567a2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:17 GMT; path=/; secure; HttpOnly',
=======
  '0e65268a-7149-486c-99a7-cd16f7793500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:38 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:16 GMT',
=======
  'Fri, 02 Aug 2019 00:43:38 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithexpires-/create', {"kty":"RSA","attributes":{"exp":1546300805}})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithexpires-","deletedDate":1564681518,"scheduledPurgeDate":1572457518,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithexpires-/bf0fdd0bfd9640d189c75de7b1102f26","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"o-U8hlMMbap1THcctvI44Y7Q4m20p1FB9hIOEktU0E2s3j0kISr57M1N28dUddxWw0P_xAsY_c-shB1SPU5knSe26IKkmsIBNH0p8F6WOAKW88qQw3AADfasBsEY4OAbD4d8OM9l9SOQulA7_PvCbjwWkv6zHFWeydb5PB8eWZfp_5iLMWlW4Oe_KHqcZ5wFV8xfoGWh2dQSDbT6l7z9_IIdtHxRoiNG1HTx_NPnEcRObAssP8w3AhLoiz2V-HNPT6AhVhmRgeg5ibvB149ZOk1Gv_kgEdvnrLUWixktScnS1Mr07VtpyKHcG_BG_eNZqYECViN0e9qCSv92yWUIww","e":"AQAB"},"attributes":{"enabled":true,"exp":1546300805,"created":1564681517,"updated":1564681517,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithexpires-/21eac8e8dc69427d91adaf7719c0dbc5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qOpfvxlKNNmpmYoaS3BxTKCkgFwUoqeKmdK_Grr6ar2tn9WUDfNKYEPN3NzQIuXwO0jleoTUGvzevV6e-MTYwanFgGY2y7ZdvNErpRsKNAnbtnoetX0N1K_bBo5bhRQ-JhAoxJk3bfMedsYQKc8mI0K8S_MygbNbgYZc2lF3y-At27ErArWa0N5pA78EsCEcG1Ej1Me_gTQMl-tZ1gzJNQWH4TiMSN8Zq3DNASzuvwsgLgCsQ1GWqi--WDoOYjQ6F3-aIFojPrWx-Q0m1YZWvW024JW93iSXazTd9z3Iz6GnE4robi3kHxtoJJXHNj1Y1fVfrX6P1SSZy68KCqbM5w","e":"AQAB"},"attributes":{"enabled":true,"exp":1546300805,"created":1564706619,"updated":1564706619,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '4cf67548-9fdb-4264-adfb-7de94d8e3e43',
=======
  'd7154f19-9bc1-46db-93d3-6fa542aecaf1',
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
  'Thu, 01 Aug 2019 17:45:17 GMT',
=======
  'Fri, 02 Aug 2019 00:43:38 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '720' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithexpires-')
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
  '85b338bc-1c3b-459e-bb46-c899491b62ba',
=======
  'e162e916-bb20-412f-b32d-702e5690e8d0',
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
  'Thu, 01 Aug 2019 17:45:17 GMT',
=======
  'Fri, 02 Aug 2019 00:43:39 GMT',
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
  'f0d0b364-efd5-47a4-83d7-2dcf4b2e2200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:18 GMT; path=/; secure; HttpOnly',
=======
  '01569306-4775-441c-827b-45a5798e3d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:39 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:17 GMT',
=======
  'Fri, 02 Aug 2019 00:43:39 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithexpires-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithexpires-","deletedDate":1564706620,"scheduledPurgeDate":1572482620,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithexpires-/21eac8e8dc69427d91adaf7719c0dbc5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qOpfvxlKNNmpmYoaS3BxTKCkgFwUoqeKmdK_Grr6ar2tn9WUDfNKYEPN3NzQIuXwO0jleoTUGvzevV6e-MTYwanFgGY2y7ZdvNErpRsKNAnbtnoetX0N1K_bBo5bhRQ-JhAoxJk3bfMedsYQKc8mI0K8S_MygbNbgYZc2lF3y-At27ErArWa0N5pA78EsCEcG1Ej1Me_gTQMl-tZ1gzJNQWH4TiMSN8Zq3DNASzuvwsgLgCsQ1GWqi--WDoOYjQ6F3-aIFojPrWx-Q0m1YZWvW024JW93iSXazTd9z3Iz6GnE4robi3kHxtoJJXHNj1Y1fVfrX6P1SSZy68KCqbM5w","e":"AQAB"},"attributes":{"enabled":true,"exp":1546300805,"created":1564706619,"updated":1564706619,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'ee7c8c2c-a401-4e1d-a0d4-ef1c3204b204',
=======
  '9da0ff90-39d8-4f27-8bca-a0e735ebfd17',
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
  'Thu, 01 Aug 2019 17:45:18 GMT',
=======
  'Fri, 02 Aug 2019 00:43:40 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '898' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '0ce1a1ac-a010-44f1-af61-b6a9af04be6d',
=======
  '7b01a62b-a85b-44ad-8dc6-cdc08df46a2c',
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
  'Thu, 01 Aug 2019 17:45:29 GMT',
=======
  'Fri, 02 Aug 2019 00:43:40 GMT',
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
  '2fee6f88-6250-4349-99c4-c322d8ce2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:29 GMT; path=/; secure; HttpOnly',
=======
  '244a60c8-1b28-485a-ac5a-f9ff0e0e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:40 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:29 GMT',
=======
  'Fri, 02 Aug 2019 00:43:39 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '415f80b9-04fb-4c42-a48d-300270ec0cc0',
=======
  '7e1acb81-5aaf-48e5-a662-66f4be292020',
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
  'Thu, 01 Aug 2019 17:45:29 GMT',
=======
  'Fri, 02 Aug 2019 00:43:40 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '86c5cfaf-9f5b-4631-b86e-4a2d11e766dd',
=======
  'd9b5a8fd-a903-4b59-9275-274fece17bbc',
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
  'Thu, 01 Aug 2019 17:45:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:50 GMT',
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
  'c9fb86b1-65fa-4b35-b27e-1fe64ce12800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:40 GMT; path=/; secure; HttpOnly',
=======
  'f2462882-1be0-43a3-952a-3edd942a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:51 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:39 GMT',
=======
  'Fri, 02 Aug 2019 00:43:51 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '4d701edb-060c-46fa-821a-17fb41892794',
=======
  '9315cb3d-d6cd-457f-bf33-8d5be493071f',
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
  'Thu, 01 Aug 2019 17:45:40 GMT',
=======
  'Fri, 02 Aug 2019 00:43:51 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdatekey-/create')
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
  '6fbb2d9c-d724-4404-a46e-ca60433635b1',
=======
  '1921f205-db74-4953-be8f-be5e57f31359',
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
  'Thu, 01 Aug 2019 17:45:40 GMT',
=======
  'Fri, 02 Aug 2019 00:43:51 GMT',
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
  '19323b2d-23ef-4dae-9db1-8a1f2f1e2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:41 GMT; path=/; secure; HttpOnly',
=======
  '3a8ca9a2-5eec-4aa2-a115-9fa994120000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:52 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:41 GMT',
=======
  'Fri, 02 Aug 2019 00:43:52 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdatekey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/56102a2177f445c887c9dea6bfe30374","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wOWGMLsjaDK0PvHRgckcF1k2pUnMekelPj8mGMnkxnAHZjAkD6KR3J-DWEHXFTCK8Kfnxi_cotKC_MC7lpc7d3jO5hFX-Pge2fQ5_5ash9wShC70G8IucYQvUR0pvo9zrzNfhPOr10XlV3E4t1VNeHWXIuJfktlcx8PKj7hxlcX6cPjBys0nqRRcZA_DKiL3elOKkgebgGaa-G3nLbcUL-cro2wTJGbekWiAoW7uohQQqocBV3LOz8LbJgvjkhW17tKeBQWQJTIobPB9cjZoYmkXSyEu_wjkuo5cj5iHpu-3HeNpHLbCWxCh_E2GYRMacAkpSp9ubbyA4HtXYrXA9w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681541,"updated":1564681541,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/7ab371841f034917ab0a883e15cc0291","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tKJ4LohYx-B_gURnIGyExj-fFlwxEZgUcyM0buqvVas040a1RUYwCMxEXVt5mJv_voD0smi885VNOUu_zgIrtRTL6cAOP7TnzVoTbkn_RTiXT17qQR-AYm3ZWjreCjXl3l0a3QiIxgJBtJJ41qhAWS2COlGE50DBH4i0lMEa59Buu3xMXWJYirY3X4m1kW7iJ56pqWwlb9ZRFTSU0gEUCJoU6G3dJQZ2C4J3sdIfDsDg_OEwlM3w6i6Bvd-LOmv90FJ8OXEMKNwXp-HUgak53dnc86kS3cX_eWT3TsoxsIm8pz_0rWXDMTWgqAuIxyVgbvMnB5SX8dekBZlgbSUbow","e":"AQAB"},"attributes":{"enabled":true,"created":1564706633,"updated":1564706633,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'afa531bd-87d7-4ece-8430-4a284959da99',
=======
  'b7b14833-8f42-4aaa-a3c8-5667c0836ea6',
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
  'Thu, 01 Aug 2019 17:45:41 GMT',
=======
  'Fri, 02 Aug 2019 00:43:53 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '691' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .patch('/keys/recoverKeyName-canupdatekey-/56102a2177f445c887c9dea6bfe30374')
=======
  .patch('/keys/recoverKeyName-canupdatekey-/7ab371841f034917ab0a883e15cc0291')
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
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
  '0499c83c-bcf1-4ff8-a6cb-9061e70e2142',
=======
  'aab9c046-ede2-4251-bcdc-9b01a157d21a',
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
  'Thu, 01 Aug 2019 17:45:41 GMT',
=======
  'Fri, 02 Aug 2019 00:43:53 GMT',
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
  'eb6c5bd9-495f-4e3e-80dc-a408b7711e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:42 GMT; path=/; secure; HttpOnly',
=======
  'f8bc6ff3-fa6f-42fb-91fc-0b1d1a150000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:53 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:41 GMT',
=======
  'Fri, 02 Aug 2019 00:43:52 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .patch('/keys/recoverKeyName-canupdatekey-/56102a2177f445c887c9dea6bfe30374', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/56102a2177f445c887c9dea6bfe30374","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wOWGMLsjaDK0PvHRgckcF1k2pUnMekelPj8mGMnkxnAHZjAkD6KR3J-DWEHXFTCK8Kfnxi_cotKC_MC7lpc7d3jO5hFX-Pge2fQ5_5ash9wShC70G8IucYQvUR0pvo9zrzNfhPOr10XlV3E4t1VNeHWXIuJfktlcx8PKj7hxlcX6cPjBys0nqRRcZA_DKiL3elOKkgebgGaa-G3nLbcUL-cro2wTJGbekWiAoW7uohQQqocBV3LOz8LbJgvjkhW17tKeBQWQJTIobPB9cjZoYmkXSyEu_wjkuo5cj5iHpu-3HeNpHLbCWxCh_E2GYRMacAkpSp9ubbyA4HtXYrXA9w","e":"AQAB"},"attributes":{"enabled":false,"created":1564681541,"updated":1564681542,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .patch('/keys/recoverKeyName-canupdatekey-/7ab371841f034917ab0a883e15cc0291', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/7ab371841f034917ab0a883e15cc0291","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tKJ4LohYx-B_gURnIGyExj-fFlwxEZgUcyM0buqvVas040a1RUYwCMxEXVt5mJv_voD0smi885VNOUu_zgIrtRTL6cAOP7TnzVoTbkn_RTiXT17qQR-AYm3ZWjreCjXl3l0a3QiIxgJBtJJ41qhAWS2COlGE50DBH4i0lMEa59Buu3xMXWJYirY3X4m1kW7iJ56pqWwlb9ZRFTSU0gEUCJoU6G3dJQZ2C4J3sdIfDsDg_OEwlM3w6i6Bvd-LOmv90FJ8OXEMKNwXp-HUgak53dnc86kS3cX_eWT3TsoxsIm8pz_0rWXDMTWgqAuIxyVgbvMnB5SX8dekBZlgbSUbow","e":"AQAB"},"attributes":{"enabled":false,"created":1564706633,"updated":1564706634,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '75760937-8f37-4f00-a1da-9d05cbb778ca',
=======
  'f9d6da6d-7816-475e-acd5-2aaa2658ccb6',
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
  'Thu, 01 Aug 2019 17:45:42 GMT',
=======
  'Fri, 02 Aug 2019 00:43:53 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '692' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdatekey-')
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
  '00c8ad0f-c7fb-4781-8fcf-51ea435db766',
=======
  '01bfee9c-7bd8-4a07-842c-5a20938e9c10',
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
  'Thu, 01 Aug 2019 17:45:41 GMT',
=======
  'Fri, 02 Aug 2019 00:43:53 GMT',
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
  '8a1140f3-9a70-423a-8870-5c63dfa02c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:43 GMT; path=/; secure; HttpOnly',
=======
  '2d0ad68e-fda4-4933-80b4-fa65398d3800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:54 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:42 GMT',
=======
  'Fri, 02 Aug 2019 00:43:54 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdatekey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canupdatekey-","deletedDate":1564681543,"scheduledPurgeDate":1572457543,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/56102a2177f445c887c9dea6bfe30374","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wOWGMLsjaDK0PvHRgckcF1k2pUnMekelPj8mGMnkxnAHZjAkD6KR3J-DWEHXFTCK8Kfnxi_cotKC_MC7lpc7d3jO5hFX-Pge2fQ5_5ash9wShC70G8IucYQvUR0pvo9zrzNfhPOr10XlV3E4t1VNeHWXIuJfktlcx8PKj7hxlcX6cPjBys0nqRRcZA_DKiL3elOKkgebgGaa-G3nLbcUL-cro2wTJGbekWiAoW7uohQQqocBV3LOz8LbJgvjkhW17tKeBQWQJTIobPB9cjZoYmkXSyEu_wjkuo5cj5iHpu-3HeNpHLbCWxCh_E2GYRMacAkpSp9ubbyA4HtXYrXA9w","e":"AQAB"},"attributes":{"enabled":false,"created":1564681541,"updated":1564681542,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canupdatekey-","deletedDate":1564706634,"scheduledPurgeDate":1572482634,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/7ab371841f034917ab0a883e15cc0291","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tKJ4LohYx-B_gURnIGyExj-fFlwxEZgUcyM0buqvVas040a1RUYwCMxEXVt5mJv_voD0smi885VNOUu_zgIrtRTL6cAOP7TnzVoTbkn_RTiXT17qQR-AYm3ZWjreCjXl3l0a3QiIxgJBtJJ41qhAWS2COlGE50DBH4i0lMEa59Buu3xMXWJYirY3X4m1kW7iJ56pqWwlb9ZRFTSU0gEUCJoU6G3dJQZ2C4J3sdIfDsDg_OEwlM3w6i6Bvd-LOmv90FJ8OXEMKNwXp-HUgak53dnc86kS3cX_eWT3TsoxsIm8pz_0rWXDMTWgqAuIxyVgbvMnB5SX8dekBZlgbSUbow","e":"AQAB"},"attributes":{"enabled":false,"created":1564706633,"updated":1564706634,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'a51457d9-1c03-475c-9baa-8e7e1ba6c7d6',
=======
  '804a15d3-3d0e-4654-9fc5-85042c8f531d',
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
  'Thu, 01 Aug 2019 17:45:42 GMT',
=======
  'Fri, 02 Aug 2019 00:43:54 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '858' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  '6a28c794-280d-46ca-b5cd-b91cc44e4b89',
=======
  'f60627b1-0708-45b0-8ad3-71ad74de1b5a',
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
  'Thu, 01 Aug 2019 17:45:42 GMT',
=======
  'Fri, 02 Aug 2019 00:43:54 GMT',
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
  '49416d44-179c-4307-bcb7-b8e32e2e2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:43 GMT; path=/; secure; HttpOnly',
=======
  '8c789399-5dc7-4ef0-990f-d1d4fc0f3c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:43:55 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:43 GMT',
=======
  'Fri, 02 Aug 2019 00:43:54 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  '3020d713-9c59-4a8f-a46d-5f5c0c3bb99a',
=======
  '32970425-e332-41f3-a2cf-75b19baae53e',
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
  'Thu, 01 Aug 2019 17:45:43 GMT',
=======
  'Fri, 02 Aug 2019 00:43:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  '8f33008f-e8c3-4b96-b181-883b50b9a729',
=======
  '9648dfbe-9662-4c0f-a48a-9c09c5af5fbf',
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
  'Thu, 01 Aug 2019 17:45:54 GMT',
=======
  'Fri, 02 Aug 2019 00:44:05 GMT',
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
  'eb5ced57-1e88-4189-bab4-c8e7bc232a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:45:54 GMT; path=/; secure; HttpOnly',
=======
  '2fee6f88-6250-4349-99c4-c32270d43200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:06 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:45:54 GMT',
=======
  'Fri, 02 Aug 2019 00:44:05 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  '46ed0975-1783-42eb-9ee6-ccd117cb9634',
=======
  'dea9246a-9eb7-4ea4-884a-b25d8e0edf72',
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
  'Thu, 01 Aug 2019 17:45:54 GMT',
=======
  'Fri, 02 Aug 2019 00:44:06 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  'e5300e86-99da-460f-85c2-7b6f8cf1fcee',
=======
  'e4f251cb-3f80-4e08-a6af-444fa4b9ad95',
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
  'Thu, 01 Aug 2019 17:46:04 GMT',
=======
  'Fri, 02 Aug 2019 00:44:06 GMT',
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
  '1ab2799c-07fc-4c0f-8844-b4d399b62a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:05 GMT; path=/; secure; HttpOnly',
=======
  '9a6658ef-cde4-4403-85a4-b40650992f00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:07 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:05 GMT',
=======
  'Fri, 02 Aug 2019 00:44:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
  .query(true)
<<<<<<< HEAD
  .reply(204, "", [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/55d827e2f97f4527aeb967bdc6ecf08f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qSxHbNmSafgz5USi3yxbXsU94gxRFFuMPDhpKUbaIYPGTvDOdtIliZ9WImbF_wjOgL1_1vyE6ZBZqmiDFwjkWT7IkSUjVGpvlA2PNoeuRskcodEFV9-h5t0Y2aaXfa764qBqqBHvEYGmt2QzH8NY4ylncarBljmIbZvF6Q2Q0GWQMsTdU7Enais78EpPpjtwUPP83OIZdw8F4ACo20skLxlRg_EqnaWpZkZ2VEuoeFstR7lc22MxSx5ygRbLbqdnEysyO-B8heTDBcMaUQe7bBQ5ER831kMUb0lcF5Ah0C0RCQbm_lxGCJszuMYiddTFucVuYalYVlwBHNEa5_3Vdw","e":"AQAB"},"attributes":{"enabled":false,"created":1564706647,"updated":1564706647,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '70979a14-fdd0-4ff7-b210-4f7d9f4984a7',
=======
  'c7610754-77b5-4b1f-87ab-49b189cdc33e',
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
  'Thu, 01 Aug 2019 17:46:05 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdateadisabledkey-/create')
=======
  'Fri, 02 Aug 2019 00:44:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '701' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdateadisabledkey-/55d827e2f97f4527aeb967bdc6ecf08f')
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
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
  '3f177c08-9588-496d-b5fa-9e2a404f7066',
=======
  '29c88fc3-dd2c-4e15-ad0a-3d6500bd842e',
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
  'Thu, 01 Aug 2019 17:46:05 GMT',
=======
  'Fri, 02 Aug 2019 00:44:07 GMT',
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
  '27677619-6b32-48bd-ba4b-fbb33a7f2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:06 GMT; path=/; secure; HttpOnly',
=======
  'cbe42d76-ac64-47fa-94e4-2d4a810f0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:08 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:05 GMT',
=======
  'Fri, 02 Aug 2019 00:44:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .post('/keys/recoverKeyName-canupdateadisabledkey-/create', {"kty":"RSA","attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/4a5306c60eb444cdbc73e02a00fb6777","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0apwjmG8IVwBKzVt2YmXQHfWUtLfnD180Vu_ycEjiDWfGX0tQ5iiNbwPTbSW4zRCeY6dvpnLV0Hv6AnXsS-ye72E5x-5DnSiDyh5-13DIv35wmVZmi7ZAOPgOcQW5tE_nH79LLYYFWeNYTPkJGM-Ya5VlWYKPfRlQuIVcNvyVPI-gfU--Z6y4PrHcY2oZRmmzQ5mwViiPXoBV5I1QQ_zz_RjU4mWSsUJyfRF1_2v9VqkFsUgfnBcSJMT-83B2tuAoKSm3a9WiptMWDWk-P3nbULBz_7GdAo9s3JXbRVaeeGusmvh2PWKX3oBPN3iszcPZohmLbhRlp_VSjlYeP4nyQ","e":"AQAB"},"attributes":{"enabled":false,"created":1564681566,"updated":1564681566,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .patch('/keys/recoverKeyName-canupdateadisabledkey-/55d827e2f97f4527aeb967bdc6ecf08f', {"attributes":{"exp":1546300800}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/55d827e2f97f4527aeb967bdc6ecf08f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qSxHbNmSafgz5USi3yxbXsU94gxRFFuMPDhpKUbaIYPGTvDOdtIliZ9WImbF_wjOgL1_1vyE6ZBZqmiDFwjkWT7IkSUjVGpvlA2PNoeuRskcodEFV9-h5t0Y2aaXfa764qBqqBHvEYGmt2QzH8NY4ylncarBljmIbZvF6Q2Q0GWQMsTdU7Enais78EpPpjtwUPP83OIZdw8F4ACo20skLxlRg_EqnaWpZkZ2VEuoeFstR7lc22MxSx5ygRbLbqdnEysyO-B8heTDBcMaUQe7bBQ5ER831kMUb0lcF5Ah0C0RCQbm_lxGCJszuMYiddTFucVuYalYVlwBHNEa5_3Vdw","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1564706647,"updated":1564706648,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '30ebd429-8efd-49da-a3d3-49ee36c0c4f5',
=======
  '602ff78b-1eed-4a43-9a9a-c87ef0b1765d',
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
  'Thu, 01 Aug 2019 17:46:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '700' ]);
=======
  'Fri, 02 Aug 2019 00:44:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '718' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdateadisabledkey-/4a5306c60eb444cdbc73e02a00fb6777')
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
  '820c25c6-bef3-4019-a398-b35e22ff831f',
=======
  '5dc43d8e-fd5a-4800-9b50-6de0c0398d70',
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
  'Thu, 01 Aug 2019 17:46:06 GMT',
=======
  'Fri, 02 Aug 2019 00:44:08 GMT',
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
  'db67f75b-d13d-4344-92e2-e06023042a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:07 GMT; path=/; secure; HttpOnly',
=======
  'c7718cb8-204c-4e95-9708-e373493d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:09 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:06 GMT',
=======
  'Fri, 02 Aug 2019 00:44:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdateadisabledkey-/4a5306c60eb444cdbc73e02a00fb6777', {"attributes":{"exp":1546300800}})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/4a5306c60eb444cdbc73e02a00fb6777","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0apwjmG8IVwBKzVt2YmXQHfWUtLfnD180Vu_ycEjiDWfGX0tQ5iiNbwPTbSW4zRCeY6dvpnLV0Hv6AnXsS-ye72E5x-5DnSiDyh5-13DIv35wmVZmi7ZAOPgOcQW5tE_nH79LLYYFWeNYTPkJGM-Ya5VlWYKPfRlQuIVcNvyVPI-gfU--Z6y4PrHcY2oZRmmzQ5mwViiPXoBV5I1QQ_zz_RjU4mWSsUJyfRF1_2v9VqkFsUgfnBcSJMT-83B2tuAoKSm3a9WiptMWDWk-P3nbULBz_7GdAo9s3JXbRVaeeGusmvh2PWKX3oBPN3iszcPZohmLbhRlp_VSjlYeP4nyQ","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1564681566,"updated":1564681567,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canupdateadisabledkey-","deletedDate":1564706649,"scheduledPurgeDate":1572482649,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/55d827e2f97f4527aeb967bdc6ecf08f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qSxHbNmSafgz5USi3yxbXsU94gxRFFuMPDhpKUbaIYPGTvDOdtIliZ9WImbF_wjOgL1_1vyE6ZBZqmiDFwjkWT7IkSUjVGpvlA2PNoeuRskcodEFV9-h5t0Y2aaXfa764qBqqBHvEYGmt2QzH8NY4ylncarBljmIbZvF6Q2Q0GWQMsTdU7Enais78EpPpjtwUPP83OIZdw8F4ACo20skLxlRg_EqnaWpZkZ2VEuoeFstR7lc22MxSx5ygRbLbqdnEysyO-B8heTDBcMaUQe7bBQ5ER831kMUb0lcF5Ah0C0RCQbm_lxGCJszuMYiddTFucVuYalYVlwBHNEa5_3Vdw","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1564706647,"updated":1564706648,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '45332e65-5cff-4d09-8b5f-0c46e471dd5e',
=======
  '27b61f02-767d-4598-aaa5-6b15f2721bae',
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
  'Thu, 01 Aug 2019 17:46:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '717' ]);
=======
  'Fri, 02 Aug 2019 00:44:09 GMT',
  'Connection',
  'close',
  'Content-Length',
  '893' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdateadisabledkey-')
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
  'b9c27d65-74cd-48af-b0b6-2a394f59345e',
=======
  'fdf3c1e5-a76e-412e-abc7-854708372518',
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
  'Thu, 01 Aug 2019 17:46:07 GMT',
=======
  'Fri, 02 Aug 2019 00:44:09 GMT',
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
  '1aab933f-add2-4220-afaa-e73ce0652d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:07 GMT; path=/; secure; HttpOnly',
=======
  '78b64f37-2dfd-4d03-ae9a-2e6b7cbd3400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:10 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:07 GMT',
=======
  'Fri, 02 Aug 2019 00:44:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canupdateadisabledkey-","deletedDate":1564681568,"scheduledPurgeDate":1572457568,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/4a5306c60eb444cdbc73e02a00fb6777","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0apwjmG8IVwBKzVt2YmXQHfWUtLfnD180Vu_ycEjiDWfGX0tQ5iiNbwPTbSW4zRCeY6dvpnLV0Hv6AnXsS-ye72E5x-5DnSiDyh5-13DIv35wmVZmi7ZAOPgOcQW5tE_nH79LLYYFWeNYTPkJGM-Ya5VlWYKPfRlQuIVcNvyVPI-gfU--Z6y4PrHcY2oZRmmzQ5mwViiPXoBV5I1QQ_zz_RjU4mWSsUJyfRF1_2v9VqkFsUgfnBcSJMT-83B2tuAoKSm3a9WiptMWDWk-P3nbULBz_7GdAo9s3JXbRVaeeGusmvh2PWKX3oBPN3iszcPZohmLbhRlp_VSjlYeP4nyQ","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1564681566,"updated":1564681567,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '8081a0d3-e4c5-4353-a67b-736a56e5e1c6',
=======
  'd06cab7b-a417-412e-8042-99f09c070702',
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
  'Thu, 01 Aug 2019 17:46:08 GMT',
=======
  'Fri, 02 Aug 2019 00:44:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '891' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '54953abe-9fc7-4376-917d-c46e27b28c93',
=======
  '67f36d0e-f60f-44bf-90db-5e46250be9c4',
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
  'Thu, 01 Aug 2019 17:46:08 GMT',
=======
  'Fri, 02 Aug 2019 00:44:19 GMT',
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
  '5c8aeee5-fd74-4040-b7c1-0d0cae002c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:08 GMT; path=/; secure; HttpOnly',
=======
  '1476aaf4-cd92-48a9-86a5-642432430000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:08 GMT',
=======
  'Fri, 02 Aug 2019 00:44:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '76aa370a-513a-4c94-95fd-e1af12797fde',
=======
  '37216c7a-9302-42bb-a3b2-3a52ca9033ca',
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
  'Thu, 01 Aug 2019 17:46:08 GMT',
=======
  'Fri, 02 Aug 2019 00:44:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '3167cde7-6c6e-474d-a39a-4351dabbecef',
=======
  'f3c5cb66-94e0-4ea6-a446-206ed3662dc8',
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
  'Thu, 01 Aug 2019 17:46:18 GMT',
=======
  'Fri, 02 Aug 2019 00:44:21 GMT',
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
  '37a6f89e-7363-4d12-b0e2-7ed2e4f92400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:19 GMT; path=/; secure; HttpOnly',
=======
  '1b8a6d2d-efe3-4a03-bc71-cb4e38670000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:19 GMT',
=======
  'Fri, 02 Aug 2019 00:44:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakey-/ea59b378134b42d9b19e3154e5d593a5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pxWHPgJPBPU5N8KJIMCaefK0KaDs7jqxrOTrdcchFopt6QOPbdZbreNIwPtmLmycDb57hp5fooPWTEzs7HqWIqczajBiWWs1OjbeYDgrqKMrrM0CvNm1J5rVIKxZgYHBJ8O3jwvWWK697qyoqLFPZZAlywEiw2xpNII6yEotCMFtRbu_yya7EpTY5Mrf9CUQf61txw5owB-aIHNHltIrZdWZOApOZBh9AUL9ttXDSAQYQYOfSMPSAsQO9ChPS3tv6cI2kXtyqIle89mw0r1Fs2cv3o6B4Ml9Vq4un75V1Alrm66fRXTKMstDggr6cFovfzzAXbeUIu-vO2gZq_KoIQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706662,"updated":1564706662,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '35de95e0-a4d2-4f3f-b4bf-c7be3f64e72d',
=======
  '8ef4ccd1-77a0-4f7c-aab0-120c554339dc',
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
  'Thu, 01 Aug 2019 17:46:19 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:44:21 GMT',
  'Connection',
  'close',
  'Content-Length',
  '692' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '67fd0422-fd59-4739-a744-22cb5c97b5c2',
=======
  '5562a8c0-f6cd-4dfb-982c-c720d34e77c2',
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
  'Thu, 01 Aug 2019 17:46:29 GMT',
=======
  'Fri, 02 Aug 2019 00:44:22 GMT',
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
  '5a152180-536e-43ea-8b86-44fc98de2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:30 GMT; path=/; secure; HttpOnly',
=======
  'e91fca1a-1a58-4d5b-a729-edb2bea64100',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:30 GMT',
=======
  'Fri, 02 Aug 2019 00:44:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
  .query(true)
<<<<<<< HEAD
  .reply(204, "", [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-candeleteakey-","deletedDate":1564706662,"scheduledPurgeDate":1572482662,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakey-/ea59b378134b42d9b19e3154e5d593a5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pxWHPgJPBPU5N8KJIMCaefK0KaDs7jqxrOTrdcchFopt6QOPbdZbreNIwPtmLmycDb57hp5fooPWTEzs7HqWIqczajBiWWs1OjbeYDgrqKMrrM0CvNm1J5rVIKxZgYHBJ8O3jwvWWK697qyoqLFPZZAlywEiw2xpNII6yEotCMFtRbu_yya7EpTY5Mrf9CUQf61txw5owB-aIHNHltIrZdWZOApOZBh9AUL9ttXDSAQYQYOfSMPSAsQO9ChPS3tv6cI2kXtyqIle89mw0r1Fs2cv3o6B4Ml9Vq4un75V1Alrm66fRXTKMstDggr6cFovfzzAXbeUIu-vO2gZq_KoIQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706662,"updated":1564706662,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '8e477590-183e-49e0-86d5-c19b6221d5c9',
=======
  '41b0bbcb-43d2-4475-99ff-35ad25f21d56',
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
  'Thu, 01 Aug 2019 17:46:30 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:44:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '859' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakey-/create')
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
  '83a0423a-e0af-426b-80d7-a9cd6674fea7',
=======
  'edff571e-2aa5-4aef-9a2b-f35072428c93',
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
  'Thu, 01 Aug 2019 17:46:30 GMT',
=======
  'Fri, 02 Aug 2019 00:44:22 GMT',
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
  'c373ac74-624d-4cae-bc16-8d46c0662b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:31 GMT; path=/; secure; HttpOnly',
=======
  '32313992-423c-4e3f-b5bd-17daa0620000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:31 GMT',
=======
  'Fri, 02 Aug 2019 00:44:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakey-/7c15dc7ce37448cfac6cdd733f766892","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sayPGrF1aBodV4ReIop9ibDkmegiBLOuQ90tNvZvCybHHlYazVf6LWTUN5zn2l3j2coCz4N2KYiIMjTWBDRFFjMHTU5iCntznxsDtbuK2SqT7CW9LVXgRHk8q7UqSFtxNyyrK0Gz4ppGGEbkjHWDBF5IRBEpIAHRJG7KVsBaf0ygBPwhMUyvjIT38VsihvZ4zRstu_iq8rBDHFnEGb21uAaGn8AGaTzr5Q99n34-2ksdHQRqalhL5hAWPdXpFKopJfnZc5VE1u_wD96aaAFZr-1e1zkNvAyhvvpOKJVBq8i7ODv80RsOmOIPaSXUhT_UCJz-3wS-0t41NkZD0XHO1w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681591,"updated":1564681591,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
<<<<<<< HEAD
=======
  'Content-Length',
  '106',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
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
  '604dde8a-f900-4a12-b2f5-f15008d384df',
=======
  '27fcbf76-0c76-4033-b49a-a8777c504b89',
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
  'Thu, 01 Aug 2019 17:46:30 GMT',
=======
  'Fri, 02 Aug 2019 00:44:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '691' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-candeleteakey-')
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
  'a57ae61e-d36c-4d68-b3a0-724b1f9437d9',
=======
  '31ef91e6-87c0-4d07-9e06-46128f391e0a',
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
  'Thu, 01 Aug 2019 17:46:31 GMT',
=======
  'Fri, 02 Aug 2019 00:44:22 GMT',
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
  '9e234f80-2c3f-4a3f-bfea-48d2fa7d2300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:32 GMT; path=/; secure; HttpOnly',
=======
  '73fc0c28-19f3-47c5-a0c8-be23a7150000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:31 GMT',
=======
  'Fri, 02 Aug 2019 00:44:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-candeleteakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-candeleteakey-","deletedDate":1564681592,"scheduledPurgeDate":1572457592,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakey-/7c15dc7ce37448cfac6cdd733f766892","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sayPGrF1aBodV4ReIop9ibDkmegiBLOuQ90tNvZvCybHHlYazVf6LWTUN5zn2l3j2coCz4N2KYiIMjTWBDRFFjMHTU5iCntznxsDtbuK2SqT7CW9LVXgRHk8q7UqSFtxNyyrK0Gz4ppGGEbkjHWDBF5IRBEpIAHRJG7KVsBaf0ygBPwhMUyvjIT38VsihvZ4zRstu_iq8rBDHFnEGb21uAaGn8AGaTzr5Q99n34-2ksdHQRqalhL5hAWPdXpFKopJfnZc5VE1u_wD96aaAFZr-1e1zkNvAyhvvpOKJVBq8i7ODv80RsOmOIPaSXUhT_UCJz-3wS-0t41NkZD0XHO1w","e":"AQAB"},"attributes":{"enabled":true,"created":1564681591,"updated":1564681591,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '18c87a68-c4bf-4407-96af-fdadfb511078',
=======
  '00f26fb9-0d11-474d-974f-842a5db2a6b1',
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
  'Thu, 01 Aug 2019 17:46:32 GMT',
=======
  'Fri, 02 Aug 2019 00:44:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '857' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-candeleteakey-/')
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
  '9a92f659-0a40-4103-976f-b11217d575f7',
=======
  '164d7fbe-6999-4d93-a5aa-dfa0e511cfcf',
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
  'Thu, 01 Aug 2019 17:46:32 GMT',
=======
  'Fri, 02 Aug 2019 00:44:33 GMT',
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
  '3c891686-a436-4a56-9381-c09b02cf2400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:32 GMT; path=/; secure; HttpOnly',
=======
  '22410ef1-f775-4b88-a1c6-0e8ff6160000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:32 GMT',
=======
  'Fri, 02 Aug 2019 00:44:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-candeleteakey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-candeleteakey-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '105',
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
  '49324627-08eb-43c9-a822-a32eadb330f6',
=======
  'b8a40e3d-124c-4f91-92c2-e55a18daf0b9',
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
  'Thu, 01 Aug 2019 17:46:32 GMT',
=======
  'Fri, 02 Aug 2019 00:44:34 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  '6495a2de-e2b7-4cc7-bbab-cf1a3a0e5859',
=======
  'ec649f29-bc01-43f8-940d-543aff89f814',
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
  'Thu, 01 Aug 2019 17:46:33 GMT',
=======
  'Fri, 02 Aug 2019 00:44:44 GMT',
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
  '80610dd6-6199-4f1d-a392-2b9935462500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:33 GMT; path=/; secure; HttpOnly',
=======
  '69506845-d4b2-4b01-b31a-56a40f2b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:46 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:32 GMT',
=======
  'Fri, 02 Aug 2019 00:44:45 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  '839996d8-296b-4eea-9668-ca114bae6217',
=======
  'ad948c4f-4663-4478-baf9-0b3bc20bc75e',
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
  'Thu, 01 Aug 2019 17:46:33 GMT',
=======
  'Fri, 02 Aug 2019 00:44:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  'ceaebc64-7ac0-43b5-92ba-467f81519410',
=======
  '7ab414f8-00d9-4467-a9d2-16d9a0174563',
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
  'Thu, 01 Aug 2019 17:46:43 GMT',
=======
  'Fri, 02 Aug 2019 00:44:46 GMT',
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
  '770f0238-5d71-4612-866b-37b5d6582200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:44 GMT; path=/; secure; HttpOnly',
=======
  '3cc81502-031d-4a75-91ff-a8f2c32a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:44 GMT',
=======
  'Fri, 02 Aug 2019 00:44:46 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
<<<<<<< HEAD
=======
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '44ff5ae1-bc50-456b-a3bf-ad8c91bded6d',
=======
  'a2dd09ec-b30c-413b-9b3e-2c7a2369a1f4',
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
  'Thu, 01 Aug 2019 17:46:44 GMT',
=======
  'Fri, 02 Aug 2019 00:44:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-deletenonexistingkey-/')
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
  '3c943deb-039e-45c4-8f43-ff2637af786c',
=======
  'ca3d8c76-cf72-46f4-8475-e0ef0b85deec',
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
  'Thu, 01 Aug 2019 17:46:44 GMT',
=======
  'Fri, 02 Aug 2019 00:44:47 GMT',
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
  '242fab8c-b5f3-4800-b007-89eafc582c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:45 GMT; path=/; secure; HttpOnly',
=======
  '61ca8ff0-8439-4b78-a047-4581f14b0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHJAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:48 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:45 GMT',
=======
  'Fri, 02 Aug 2019 00:44:47 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-deletenonexistingkey-/')
  .query(true)
<<<<<<< HEAD
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-deletenonexistingkey-"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/edb7331134ad402aa695e29f38d1c104","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sqrl6z8TC2eepInBh8Wkmtxtk17cFv4YOPLpI_yfRGUhOi_aWmc9iamU6J9yoVJemQvFfYL28qqRjqO6irpxH49v0r1bY32_qyQYWegWr5yrBZngxWt_H3FF8A69H8hyw4sMkJdGBiC7YVDAiqHo_02RGmbVMtOU0Qj43-tuD9XHP9MDDdR4JXsjMHFOzY-L4tNIGFtLTBb0reNeXkH04PT9YQWlreXOjDRvAxoD_uTFeJYFVs4ZZiS-ocDWKRH4hKjQi6dw8gy4VB8fxvJnkJsXdT1KOGSgmtyvcXMO1SwMs2ihINdQmXQTK7PZHlp4feeuZT4BX1zFR3WZBG4F_Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706688,"updated":1564706688,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
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
  '174d6485-194c-42fc-ab8b-6cffce686bcd',
=======
  '6f4e8cfb-6a4b-402b-b086-7ceb18354d18',
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
  'Thu, 01 Aug 2019 17:46:45 GMT',
  'Connection',
  'close' ]);
=======
  'Fri, 02 Aug 2019 00:44:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '689' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetakey-/create')
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
  'cfd16189-0260-4012-9951-e470e95cd262',
=======
  '1fbf20cb-f52f-4274-95d0-8fb8badd47cc',
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
  'Thu, 01 Aug 2019 17:46:45 GMT',
=======
  'Fri, 02 Aug 2019 00:44:48 GMT',
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
  '80ed5701-cfbf-4972-a1eb-fd9e30562d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:46 GMT; path=/; secure; HttpOnly',
=======
  'be872453-8c00-4586-b4c7-136661010000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHJQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:49 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:45 GMT',
=======
  'Fri, 02 Aug 2019 00:44:48 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetakey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/dc62e0c62d594e06acbed0dde0059ee4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rBIuVHxtEBovdaThWWC7P1VWTEMQzTXq7-kiusvXdoBqTFUfdEwV8HHFqvaxS841uG88REQgb02Wwk4fHIohIVpG66H9oE5sqgAWyDtW5R2gOK1WpPfZPUVqXEriyeNg3KeYB4R0DOk8ybVZ20lRq4tyeQxFefvq2bAw4gi5TNykK-x8qxw49OCftcgSYyFhUlUfqVEp3EePhqB-h9cmPYpdsYFn-V4APAVS1xvQQeVVX78CivpIvk-EaUgDHmOFrvhvllmoPoJn1fymcENIsQoUs4dM-V2GPe7pW1WQuwpTe1XzJzE4ULthc_y1f93o_H2517qIqSY1X1ShcZH4mQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681606,"updated":1564681606,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/edb7331134ad402aa695e29f38d1c104","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sqrl6z8TC2eepInBh8Wkmtxtk17cFv4YOPLpI_yfRGUhOi_aWmc9iamU6J9yoVJemQvFfYL28qqRjqO6irpxH49v0r1bY32_qyQYWegWr5yrBZngxWt_H3FF8A69H8hyw4sMkJdGBiC7YVDAiqHo_02RGmbVMtOU0Qj43-tuD9XHP9MDDdR4JXsjMHFOzY-L4tNIGFtLTBb0reNeXkH04PT9YQWlreXOjDRvAxoD_uTFeJYFVs4ZZiS-ocDWKRH4hKjQi6dw8gy4VB8fxvJnkJsXdT1KOGSgmtyvcXMO1SwMs2ihINdQmXQTK7PZHlp4feeuZT4BX1zFR3WZBG4F_Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706688,"updated":1564706688,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '8bd5e09e-8d7c-44fd-a615-1d341b640e2e',
=======
  'e9e7df68-2ec3-4b1f-974c-9a4f18948002',
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
  'Thu, 01 Aug 2019 17:46:46 GMT',
=======
  'Fri, 02 Aug 2019 00:44:49 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '689' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangetakey-/')
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
  '646be54d-b265-42f2-a05e-bdd6cb4d3d19',
=======
  '68f3ff7a-a44b-4712-8a25-c7ca7a896029',
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
  'Thu, 01 Aug 2019 17:46:46 GMT',
=======
  'Fri, 02 Aug 2019 00:44:49 GMT',
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
  'c3c1d97a-87b9-49e1-bbb1-1ca527cc2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:47 GMT; path=/; secure; HttpOnly',
=======
  '0df2fbdb-82e5-4c9a-9e1b-22422e5e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHJgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:49 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:47 GMT',
=======
  'Fri, 02 Aug 2019 00:44:49 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangetakey-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/dc62e0c62d594e06acbed0dde0059ee4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rBIuVHxtEBovdaThWWC7P1VWTEMQzTXq7-kiusvXdoBqTFUfdEwV8HHFqvaxS841uG88REQgb02Wwk4fHIohIVpG66H9oE5sqgAWyDtW5R2gOK1WpPfZPUVqXEriyeNg3KeYB4R0DOk8ybVZ20lRq4tyeQxFefvq2bAw4gi5TNykK-x8qxw49OCftcgSYyFhUlUfqVEp3EePhqB-h9cmPYpdsYFn-V4APAVS1xvQQeVVX78CivpIvk-EaUgDHmOFrvhvllmoPoJn1fymcENIsQoUs4dM-V2GPe7pW1WQuwpTe1XzJzE4ULthc_y1f93o_H2517qIqSY1X1ShcZH4mQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681606,"updated":1564681606,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetakey-","deletedDate":1564706690,"scheduledPurgeDate":1572482690,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/edb7331134ad402aa695e29f38d1c104","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sqrl6z8TC2eepInBh8Wkmtxtk17cFv4YOPLpI_yfRGUhOi_aWmc9iamU6J9yoVJemQvFfYL28qqRjqO6irpxH49v0r1bY32_qyQYWegWr5yrBZngxWt_H3FF8A69H8hyw4sMkJdGBiC7YVDAiqHo_02RGmbVMtOU0Qj43-tuD9XHP9MDDdR4JXsjMHFOzY-L4tNIGFtLTBb0reNeXkH04PT9YQWlreXOjDRvAxoD_uTFeJYFVs4ZZiS-ocDWKRH4hKjQi6dw8gy4VB8fxvJnkJsXdT1KOGSgmtyvcXMO1SwMs2ihINdQmXQTK7PZHlp4feeuZT4BX1zFR3WZBG4F_Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706688,"updated":1564706688,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '92881c16-8f5e-4b46-91ac-10332de74178',
=======
  '66e47f66-fcb8-4a12-854a-ba445fcb79e4',
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
  'Thu, 01 Aug 2019 17:46:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '688' ]);
=======
  'Fri, 02 Aug 2019 00:44:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '853' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetakey-')
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
  '01fbb5bc-9358-4e46-a893-847fcf3cfaf9',
=======
  '4b725aeb-f671-4333-b9ee-806916d543e1',
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
  'Thu, 01 Aug 2019 17:46:46 GMT',
=======
  'Fri, 02 Aug 2019 00:44:50 GMT',
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
  'f806288e-209b-4fca-a19f-375ad9442a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:48 GMT; path=/; secure; HttpOnly',
=======
  '6a3da728-1ecc-4e98-9270-beec77ae3500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:44:50 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:47 GMT',
=======
  'Fri, 02 Aug 2019 00:44:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetakey-","deletedDate":1564681608,"scheduledPurgeDate":1572457608,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/dc62e0c62d594e06acbed0dde0059ee4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rBIuVHxtEBovdaThWWC7P1VWTEMQzTXq7-kiusvXdoBqTFUfdEwV8HHFqvaxS841uG88REQgb02Wwk4fHIohIVpG66H9oE5sqgAWyDtW5R2gOK1WpPfZPUVqXEriyeNg3KeYB4R0DOk8ybVZ20lRq4tyeQxFefvq2bAw4gi5TNykK-x8qxw49OCftcgSYyFhUlUfqVEp3EePhqB-h9cmPYpdsYFn-V4APAVS1xvQQeVVX78CivpIvk-EaUgDHmOFrvhvllmoPoJn1fymcENIsQoUs4dM-V2GPe7pW1WQuwpTe1XzJzE4ULthc_y1f93o_H2517qIqSY1X1ShcZH4mQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681606,"updated":1564681606,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '4463237c-e57d-4134-9912-673d93e5053b',
=======
  'f17e1880-2210-46bc-b2e0-9f419b8511d5',
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
  'Thu, 01 Aug 2019 17:46:47 GMT',
=======
  'Fri, 02 Aug 2019 00:44:50 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '851' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  '8efc1e9c-e548-46b2-89f1-00ee09cc30be',
=======
  'e30806b5-2ec7-4ff3-b7c1-2b0e586b72d3',
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
  'Thu, 01 Aug 2019 17:46:48 GMT',
=======
  'Fri, 02 Aug 2019 00:45:01 GMT',
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
  'f99e10d5-557d-4aee-b581-6f7fc2362800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:49 GMT; path=/; secure; HttpOnly',
=======
  'dbb74b2d-f698-4db8-8767-a7211fd74000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:01 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:48 GMT',
=======
  'Fri, 02 Aug 2019 00:45:00 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  'd0e76126-5087-4201-b49d-3365fc766b4f',
=======
  'ba7e4f58-0a98-4413-9e25-56464b2349b7',
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
  'Thu, 01 Aug 2019 17:46:48 GMT',
=======
  'Fri, 02 Aug 2019 00:45:01 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  'a6e9e17a-5b78-44f3-9d16-dc4bb3f7a8c0',
=======
  '9b41c00f-a4c7-459f-82fa-6d6fee8c610e',
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
  'Thu, 01 Aug 2019 17:46:59 GMT',
=======
  'Fri, 02 Aug 2019 00:45:11 GMT',
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
  'e70c3e40-d163-4220-b3e9-53d547d72800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:46:59 GMT; path=/; secure; HttpOnly',
=======
  '95a70675-340c-4f2d-b297-e5dbb7310000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:12 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:46:59 GMT',
=======
  'Fri, 02 Aug 2019 00:45:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  '991864fa-2246-48a7-a6e9-6693dc356cea',
=======
  'f0eec5fb-26bb-49d5-a4d2-fe8452a1f114',
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
  'Thu, 01 Aug 2019 17:46:59 GMT',
=======
  'Fri, 02 Aug 2019 00:45:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetaspecificversionofakey-/create')
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
  '8f48a109-b0b0-4c84-bb56-977a8507874d',
=======
  'e3daf09f-1666-42cf-b0f6-8bb480b2f45a',
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
  'Thu, 01 Aug 2019 17:47:00 GMT',
=======
  'Fri, 02 Aug 2019 00:45:12 GMT',
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
  'f7cef422-382e-49d9-a1ed-7594256d2500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:00 GMT; path=/; secure; HttpOnly',
=======
  'bfebcbf4-e224-48ab-91e3-a06136290000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:13 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:00 GMT',
=======
  'Fri, 02 Aug 2019 00:45:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetaspecificversionofakey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/66224351526e4021a24cc2028d2c89b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qfP-mTp6gr2vpqN67I5zycxISx8DVOK_q_DOI54iKBNJJW0ksEas7lxVbYMxwQ_46Bo6svl2gfmmNpT22ertOBtTWJcpxpNIkgnNQ7h7T-S11bLCkXhzm9BtVy-hxEEgaFQSZh-KVNjejr5rwdHCNXxf7qe2E-nRm6cUse488KXduIwsGIgZjMNXlLDZ2CzsUNZ6XzCpORLa57OLEkBYwMsiNEtfpT2-tGqrnhWrI3klAAF7o4mff0ML5zOpRWdtd67aT7R0vx23gwv4DEUs1zCxNO3pPVS14NhidyfY_r_dum-uyu7D1s_aUbTZEnHlPCRIbUV90u-unRLItOT5FQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681621,"updated":1564681621,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/443f7bd25f774e06a6a0eb90046c82f8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vw9ErQB9P0G6dMRzFDe6FPZLVBjAozI4DASTbpeV8GsRdH3-8sQv4VScmQQx4SkB0daXBJTIef3epsixuPylxJzAXTeA4eH6uK8Ld2ZnuAb7CY9Q0_1mIY7k_q7c3EOeuBZwST-oiO9M3GWuVVqXw5txedq7OikU652YvT-rDy8wHlRjH8G7K_XvuLshWxEb08yB4hOhcDWpT-JcCYtITC2lhQ34c0wqVt44pKYCcCk-Y_mHcsDdbICa4040hPnvQzXLor3A_A2-MXzCboaVMD_3hFVc57U5sFEQNnVeDQFc8_2LCjA1B49sHV9StLEpAvvTiS50g0zKh4s2FSLN4Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706713,"updated":1564706713,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '95705f62-cb45-4084-a3ee-adc552a933a6',
=======
  'bab5b87c-103d-4ff7-853b-6e31eb0eaa38',
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
  'Thu, 01 Aug 2019 17:47:01 GMT',
=======
  'Fri, 02 Aug 2019 00:45:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '707' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/keys/recoverKeyName-cangetaspecificversionofakey-/66224351526e4021a24cc2028d2c89b2')
=======
  .get('/keys/recoverKeyName-cangetaspecificversionofakey-/443f7bd25f774e06a6a0eb90046c82f8')
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
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
  '51017e94-5ea5-44b2-aa3e-ba81cfc63642',
=======
  'a75aa513-959f-4b79-878c-63f324a5ee80',
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
  'Thu, 01 Aug 2019 17:47:00 GMT',
=======
  'Fri, 02 Aug 2019 00:45:13 GMT',
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
  '1c3a974a-02e3-45b9-99ca-6f0c3be72600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:01 GMT; path=/; secure; HttpOnly',
=======
  '73f75ffd-aa8e-4286-b397-114991070000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:14 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:01 GMT',
=======
  'Fri, 02 Aug 2019 00:45:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/keys/recoverKeyName-cangetaspecificversionofakey-/66224351526e4021a24cc2028d2c89b2')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/66224351526e4021a24cc2028d2c89b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qfP-mTp6gr2vpqN67I5zycxISx8DVOK_q_DOI54iKBNJJW0ksEas7lxVbYMxwQ_46Bo6svl2gfmmNpT22ertOBtTWJcpxpNIkgnNQ7h7T-S11bLCkXhzm9BtVy-hxEEgaFQSZh-KVNjejr5rwdHCNXxf7qe2E-nRm6cUse488KXduIwsGIgZjMNXlLDZ2CzsUNZ6XzCpORLa57OLEkBYwMsiNEtfpT2-tGqrnhWrI3klAAF7o4mff0ML5zOpRWdtd67aT7R0vx23gwv4DEUs1zCxNO3pPVS14NhidyfY_r_dum-uyu7D1s_aUbTZEnHlPCRIbUV90u-unRLItOT5FQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681621,"updated":1564681621,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .get('/keys/recoverKeyName-cangetaspecificversionofakey-/443f7bd25f774e06a6a0eb90046c82f8')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/443f7bd25f774e06a6a0eb90046c82f8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vw9ErQB9P0G6dMRzFDe6FPZLVBjAozI4DASTbpeV8GsRdH3-8sQv4VScmQQx4SkB0daXBJTIef3epsixuPylxJzAXTeA4eH6uK8Ld2ZnuAb7CY9Q0_1mIY7k_q7c3EOeuBZwST-oiO9M3GWuVVqXw5txedq7OikU652YvT-rDy8wHlRjH8G7K_XvuLshWxEb08yB4hOhcDWpT-JcCYtITC2lhQ34c0wqVt44pKYCcCk-Y_mHcsDdbICa4040hPnvQzXLor3A_A2-MXzCboaVMD_3hFVc57U5sFEQNnVeDQFc8_2LCjA1B49sHV9StLEpAvvTiS50g0zKh4s2FSLN4Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706713,"updated":1564706713,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '878ef9f7-9b60-4637-b9f5-bd328fed8cb3',
=======
  '071211d5-6976-43cd-825a-9e16c8991190',
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
  'Thu, 01 Aug 2019 17:47:01 GMT',
=======
  'Fri, 02 Aug 2019 00:45:13 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '707' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetaspecificversionofakey-')
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
  '1ee4f6fa-b5a8-4d60-8c93-56e4a9a68196',
=======
  '331321b7-f5ee-46e2-ab50-c201f2168441',
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
  'Thu, 01 Aug 2019 17:47:02 GMT',
=======
  'Fri, 02 Aug 2019 00:45:14 GMT',
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
  'fc03dcd1-295b-4ae3-9a00-35342acf2a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:02 GMT; path=/; secure; HttpOnly',
=======
  '8f71aec4-c0a9-4bbf-85e9-b120590e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:14 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:02 GMT',
=======
  'Fri, 02 Aug 2019 00:45:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetaspecificversionofakey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetaspecificversionofakey-","deletedDate":1564681622,"scheduledPurgeDate":1572457622,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/66224351526e4021a24cc2028d2c89b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qfP-mTp6gr2vpqN67I5zycxISx8DVOK_q_DOI54iKBNJJW0ksEas7lxVbYMxwQ_46Bo6svl2gfmmNpT22ertOBtTWJcpxpNIkgnNQ7h7T-S11bLCkXhzm9BtVy-hxEEgaFQSZh-KVNjejr5rwdHCNXxf7qe2E-nRm6cUse488KXduIwsGIgZjMNXlLDZ2CzsUNZ6XzCpORLa57OLEkBYwMsiNEtfpT2-tGqrnhWrI3klAAF7o4mff0ML5zOpRWdtd67aT7R0vx23gwv4DEUs1zCxNO3pPVS14NhidyfY_r_dum-uyu7D1s_aUbTZEnHlPCRIbUV90u-unRLItOT5FQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681621,"updated":1564681621,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetaspecificversionofakey-","deletedDate":1564706715,"scheduledPurgeDate":1572482715,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/443f7bd25f774e06a6a0eb90046c82f8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vw9ErQB9P0G6dMRzFDe6FPZLVBjAozI4DASTbpeV8GsRdH3-8sQv4VScmQQx4SkB0daXBJTIef3epsixuPylxJzAXTeA4eH6uK8Ld2ZnuAb7CY9Q0_1mIY7k_q7c3EOeuBZwST-oiO9M3GWuVVqXw5txedq7OikU652YvT-rDy8wHlRjH8G7K_XvuLshWxEb08yB4hOhcDWpT-JcCYtITC2lhQ34c0wqVt44pKYCcCk-Y_mHcsDdbICa4040hPnvQzXLor3A_A2-MXzCboaVMD_3hFVc57U5sFEQNnVeDQFc8_2LCjA1B49sHV9StLEpAvvTiS50g0zKh4s2FSLN4Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564706713,"updated":1564706713,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '0543b1ed-a8af-4b2a-9435-c47fdd57a38a',
=======
  '905f34ad-48d8-436e-9d94-b09c075d4d30',
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
  'Thu, 01 Aug 2019 17:47:02 GMT',
=======
  'Fri, 02 Aug 2019 00:45:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '889' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  'b494eaf6-7e16-490b-91fc-f62c97138366',
=======
  '7f9fce48-7034-4f16-80fb-3fa8ee3c9b84',
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
  'Thu, 01 Aug 2019 17:47:03 GMT',
=======
  'Fri, 02 Aug 2019 00:45:14 GMT',
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
  '2a22ae58-5352-4474-84af-361745ad2800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:03 GMT; path=/; secure; HttpOnly',
=======
  '7bcb235b-903f-4c41-81fb-fa36ed4c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:15 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:03 GMT',
=======
  'Fri, 02 Aug 2019 00:45:14 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  '0c53ccec-6f8e-4fca-a814-c85a61a6b4ad',
=======
  'eb3bbfb7-474f-4409-a535-883949c80c18',
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
  'Thu, 01 Aug 2019 17:47:02 GMT',
=======
  'Fri, 02 Aug 2019 00:45:15 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  '44b54350-2c67-4452-9f3a-287847f67622',
=======
  '1f123213-1a47-4e19-85fc-532e4460b697',
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
  'Thu, 01 Aug 2019 17:47:13 GMT',
=======
  'Fri, 02 Aug 2019 00:45:25 GMT',
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
  '5aeb91b4-9265-4779-8624-5ab383542900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:14 GMT; path=/; secure; HttpOnly',
=======
  '0f1c2d14-2835-4758-9518-157afd733c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:13 GMT',
=======
  'Fri, 02 Aug 2019 00:45:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  'a7e54391-402e-4d93-af9d-9a35ce6c6683',
=======
  '7975ebdc-0460-4f39-8f2e-835af8475362',
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
  'Thu, 01 Aug 2019 17:47:14 GMT',
=======
  'Fri, 02 Aug 2019 00:45:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetadeletedkey-/create')
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
  '3bb73a80-03ec-45f3-8231-9610bce6448f',
=======
  '31e43dc6-b25a-4340-ac70-dfeb1b734516',
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
  'Thu, 01 Aug 2019 17:47:14 GMT',
=======
  'Fri, 02 Aug 2019 00:45:27 GMT',
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
  'cf04696e-4005-4a03-b987-9d75baa52e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:14 GMT; path=/; secure; HttpOnly',
=======
  '76a6ab2d-fd17-4ca2-a53a-3221e8f03200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:27 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:14 GMT',
=======
  'Fri, 02 Aug 2019 00:45:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetadeletedkey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/7a7e30f69a944e0b959c3e3ef815d695","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tOHHKSFtMNAkNJhkCC1iij6CHeeheIOJAUt9g7ptt8Ao89KwBtaI66iCOgidtAngF8LVCGmeH_LCN3qSdBAfudSBVmx8lM5StJD50_4ySOcDrIQuB8OgstQDkHOcoTyBXEeNs0Z282eQrvtldHCfjBbmur2e-iaolnDcmHkzi1o52NpUUL0xGpJXmRnxt0DkuhdCUIbN_BMqNAxyC1bwkJ_R-fRTgloP1QwUjZWNToBj_7L45aVtiJqhf3d4-6gwE7ZEEu19SfD4z8-gQKsgrQYjAD7Tm0mYeBpay8bjIqriYAieNx3tYH-1LrrXtWA2p6lkwVCPuDKLmXDHEyklVw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681635,"updated":1564681635,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/1d246f55679648478e2c7e5a3d39e62a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rY2BzXSzUSirEDJeDjI0PrNFnb2WswCvWGgcTOcA1FFTM_ncW7hzjcGFiWKb5Lcf3X_CwLwT1ur9lYQfwT4S5gOG7V9usgCRXQ68qqxHrN4ZQUsQZhiY1snGWWe6H1B6ODc2lBVggujOGct0pjCFSw4s7Wl_RboLCd0T_6ixEx66YI8aVCaj-ofyoLWuQcxJx_rKfnlv6uIviZs1CA40KEU0j81yCuh01aK3ylM8Y-Y-JOL5_Nrg7pzUYQY9cPWLmJAIef8Nx7jLlVLi8nlLndOdOiT13kz8lpa4284ov6dva8LhA-_BKf_ZazXtG94pkfppO2WsMReDGX_X--81OQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706728,"updated":1564706728,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '81d14bae-9632-4376-88b9-1471b03d67e7',
=======
  'a672170c-94f3-4b63-944a-86f8ad74ca99',
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
  'Thu, 01 Aug 2019 17:47:15 GMT',
=======
  'Fri, 02 Aug 2019 00:45:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '696' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetadeletedkey-')
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
  '66713f61-7a59-417e-a40a-dcf2ff8cc225',
=======
  'f4f0d518-0ca6-44f0-b312-fc781258710d',
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
  'Thu, 01 Aug 2019 17:47:15 GMT',
=======
  'Fri, 02 Aug 2019 00:45:28 GMT',
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
  '39c4e332-0f08-4644-ac73-dad0f5672b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:15 GMT; path=/; secure; HttpOnly',
=======
  '5b54b7c0-01db-43c4-bc14-de00d5510000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:28 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:15 GMT',
=======
  'Fri, 02 Aug 2019 00:45:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetadeletedkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetadeletedkey-","deletedDate":1564681636,"scheduledPurgeDate":1572457636,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/7a7e30f69a944e0b959c3e3ef815d695","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tOHHKSFtMNAkNJhkCC1iij6CHeeheIOJAUt9g7ptt8Ao89KwBtaI66iCOgidtAngF8LVCGmeH_LCN3qSdBAfudSBVmx8lM5StJD50_4ySOcDrIQuB8OgstQDkHOcoTyBXEeNs0Z282eQrvtldHCfjBbmur2e-iaolnDcmHkzi1o52NpUUL0xGpJXmRnxt0DkuhdCUIbN_BMqNAxyC1bwkJ_R-fRTgloP1QwUjZWNToBj_7L45aVtiJqhf3d4-6gwE7ZEEu19SfD4z8-gQKsgrQYjAD7Tm0mYeBpay8bjIqriYAieNx3tYH-1LrrXtWA2p6lkwVCPuDKLmXDHEyklVw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681635,"updated":1564681635,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetadeletedkey-","deletedDate":1564706728,"scheduledPurgeDate":1572482728,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/1d246f55679648478e2c7e5a3d39e62a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rY2BzXSzUSirEDJeDjI0PrNFnb2WswCvWGgcTOcA1FFTM_ncW7hzjcGFiWKb5Lcf3X_CwLwT1ur9lYQfwT4S5gOG7V9usgCRXQ68qqxHrN4ZQUsQZhiY1snGWWe6H1B6ODc2lBVggujOGct0pjCFSw4s7Wl_RboLCd0T_6ixEx66YI8aVCaj-ofyoLWuQcxJx_rKfnlv6uIviZs1CA40KEU0j81yCuh01aK3ylM8Y-Y-JOL5_Nrg7pzUYQY9cPWLmJAIef8Nx7jLlVLi8nlLndOdOiT13kz8lpa4284ov6dva8LhA-_BKf_ZazXtG94pkfppO2WsMReDGX_X--81OQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706728,"updated":1564706728,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '43b7230c-2b26-4f18-b05f-2008e393cddc',
=======
  '97624f47-9943-42c5-ac69-608dd4acee1e',
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
  'Thu, 01 Aug 2019 17:47:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '865' ]);
=======
  'Fri, 02 Aug 2019 00:45:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '867' ]);
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  'f3dfb4ba-f85d-48a3-97af-9f8647b57f35',
=======
  '872a0ca2-fd45-43a2-a963-d7b8cbb6823f',
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
  'Thu, 01 Aug 2019 17:47:15 GMT',
=======
  'Fri, 02 Aug 2019 00:45:28 GMT',
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
  '92f66968-77ee-4190-9893-82964d3b2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:16 GMT; path=/; secure; HttpOnly',
=======
  '5447181a-a474-449e-93ee-e45b52230000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIAAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:29 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:15 GMT',
=======
  'Fri, 02 Aug 2019 00:45:28 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-cangetadeletedkey-"}}, [ 'Cache-Control',
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
  'fbeb1a5f-4909-49b9-9979-d584fd6a4a7c',
=======
  '3c66b4c2-8a3a-453f-90b6-380e2f7679ef',
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
  'Thu, 01 Aug 2019 17:47:16 GMT',
=======
  'Fri, 02 Aug 2019 00:45:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  '552f9aab-e700-40da-8293-46a76c735e2b',
=======
  '122f8ab5-5733-4545-931d-468b045287de',
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
  'Thu, 01 Aug 2019 17:47:27 GMT',
=======
  'Fri, 02 Aug 2019 00:45:39 GMT',
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
  '1f406822-ebee-46f2-b952-5ea7b64b2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:28 GMT; path=/; secure; HttpOnly',
=======
  'd0c45160-5ac3-4184-99e6-7634ad570000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHIQAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:40 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:27 GMT',
=======
  'Fri, 02 Aug 2019 00:45:39 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetadeletedkey-","deletedDate":1564681636,"scheduledPurgeDate":1572457636,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/7a7e30f69a944e0b959c3e3ef815d695","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tOHHKSFtMNAkNJhkCC1iij6CHeeheIOJAUt9g7ptt8Ao89KwBtaI66iCOgidtAngF8LVCGmeH_LCN3qSdBAfudSBVmx8lM5StJD50_4ySOcDrIQuB8OgstQDkHOcoTyBXEeNs0Z282eQrvtldHCfjBbmur2e-iaolnDcmHkzi1o52NpUUL0xGpJXmRnxt0DkuhdCUIbN_BMqNAxyC1bwkJ_R-fRTgloP1QwUjZWNToBj_7L45aVtiJqhf3d4-6gwE7ZEEu19SfD4z8-gQKsgrQYjAD7Tm0mYeBpay8bjIqriYAieNx3tYH-1LrrXtWA2p6lkwVCPuDKLmXDHEyklVw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681635,"updated":1564681635,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetadeletedkey-","deletedDate":1564706728,"scheduledPurgeDate":1572482728,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/1d246f55679648478e2c7e5a3d39e62a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rY2BzXSzUSirEDJeDjI0PrNFnb2WswCvWGgcTOcA1FFTM_ncW7hzjcGFiWKb5Lcf3X_CwLwT1ur9lYQfwT4S5gOG7V9usgCRXQ68qqxHrN4ZQUsQZhiY1snGWWe6H1B6ODc2lBVggujOGct0pjCFSw4s7Wl_RboLCd0T_6ixEx66YI8aVCaj-ofyoLWuQcxJx_rKfnlv6uIviZs1CA40KEU0j81yCuh01aK3ylM8Y-Y-JOL5_Nrg7pzUYQY9cPWLmJAIef8Nx7jLlVLi8nlLndOdOiT13kz8lpa4284ov6dva8LhA-_BKf_ZazXtG94pkfppO2WsMReDGX_X--81OQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706728,"updated":1564706728,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '12469cba-44aa-4e08-bb9e-8430510e8f00',
=======
  'b0f3eb1b-293c-4273-9242-adb23935ec67',
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
  'Thu, 01 Aug 2019 17:47:27 GMT',
=======
  'Fri, 02 Aug 2019 00:45:39 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '867' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  '38fc8bb1-e8d6-41ca-8d15-d9d22b7d895f',
=======
  'f1ae07ff-ebbd-4e46-ac67-2becf9e7eca8',
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
  'Thu, 01 Aug 2019 17:47:28 GMT',
=======
  'Fri, 02 Aug 2019 00:45:40 GMT',
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
  'dbb74b2d-f698-4db8-8767-a721c5782e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:28 GMT; path=/; secure; HttpOnly',
=======
  'e892b0ce-aa6a-4618-81ab-566f499e3b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHgAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:40 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:28 GMT',
=======
  'Fri, 02 Aug 2019 00:45:39 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  'c6800749-7c72-4b71-800d-8160b09e0db8',
=======
  '5f14e8ef-72ba-4ddb-9366-d48a7efeac33',
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
  'Thu, 01 Aug 2019 17:47:28 GMT',
=======
  'Fri, 02 Aug 2019 00:45:40 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cantgetadeletedkeythatdoesntexist-')
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
  '21d3f18b-7f08-4963-95a7-580838cce3f0',
=======
  '9f1744c6-8533-4a86-a9a1-d3d5f4511ccd',
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
  'Thu, 01 Aug 2019 17:47:29 GMT',
=======
  'Fri, 02 Aug 2019 00:45:41 GMT',
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
  '90c47aee-44d4-4721-aa2e-ca127f642900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au-PsWdO79tLl6q9OT_aeXQ_aSJHHgAAALYb1dQOAAAA; expires=Sat, 31-Aug-2019 17:47:29 GMT; path=/; secure; HttpOnly',
=======
  'e92b8e45-dd3a-4641-8da5-9d5fdd250000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmY0dzhJQU5FnqvaO1-HPOQ_aSJHHwAAAM191dQOAAAA; expires=Sun, 01-Sep-2019 00:45:41 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:47:29 GMT',
=======
  'Fri, 02 Aug 2019 00:45:41 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cantgetadeletedkeythatdoesntexist-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-cantgetadeletedkeythatdoesntexist-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
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
  '33f1711b-2cac-44e2-a703-e8be1626af19',
=======
  'adcbe656-25b0-4c4e-88f8-01ab0645ed52',
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
  'Thu, 01 Aug 2019 17:47:29 GMT',
=======
  'Fri, 02 Aug 2019 00:45:41 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);

