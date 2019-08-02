let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkey-/create')
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
  '1da79f13-9e6e-4aa5-9049-1b9a9ae711f2',
=======
  '6ec10ee3-2702-411d-837d-5f95f22e073a',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
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
  'Fri, 02 Aug 2019 00:49:20 GMT',
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
  'fa99845e-65c7-480c-ab4c-f75288712800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHAQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:47 GMT; path=/; secure; HttpOnly',
=======
  'be872453-8c00-4586-b4c7-1366ce170000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHAQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:47 GMT',
=======
  'Fri, 02 Aug 2019 00:49:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/34d0136a6fd149e7bf2a776e35b8b26a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0hI7TvjoQLMff1snWbq-Ht6_WVreuaH8s-10McNGKE55j5Q0jyMtbpR9ETtO_aftVoFil7q-FDLTw0HdFnJxWAU7WizdG_W8NfHrGMUEHZx7YPcSCjshb2S9fysfRT6TLlzOJUhSLNeQN4Hy5wgLJp7hX0U9T0Q0GQ9h_qW1-EcZC8zrsldZzIygsgF6I7Loh6VHatJOMPq8t7uOND5hUAL5H9ZSvsocXw5qdCFUPklYOe-Zi5P8QkrOGg6jHttoyDWtXUqZ1Y17Q4Q_r-tal85DV7oIqjj7NC_3zRi_Ae6YRD2VwXr01a0ZAcVCzlCssGH8UQIshLQZHkNABYifvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681908,"updated":1564681908,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/8c7506391f5f46c88ca2163271be0946","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"li6eCDktSrWqUCF1cjgNJEpntcwPy6yJI2tIk3hmoRywaKa5wTPZZFV1ckWr6sN3ts6JHreeODAWX1719bz0pmW_7w2NL3b-1CzwXBE76UtMB9c2ZAIdOPUuq8MvCMW_iVFYFgebyYOkMx8OpU3uzSs9Sz05kiHSgB0vU1-ARCA9K9DBxtAzkBDAxjM_iFwIalGNyI79iz6z6TwAU592vBGi0aoFWuR8pQ1F799U9kbrW4rK4cB4xrgDqOC93-sLKxOOGu34jnJ1GSMzGMJZS_TZtk5W9RiTQw_KabhT-3YYYoQK8bg5aaYC1HjUGQfqiHe8dI-eidb8tyoHitjiQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706961,"updated":1564706961,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '513afa34-6d8e-433c-b815-eb65a67de51c',
=======
  '47a88a4a-d0bf-4f2c-a787-156d97488dcf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:47 GMT',
=======
  'Fri, 02 Aug 2019 00:49:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '699' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
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
  '45fd8af5-63cd-4231-b31b-9a23d8c0c073',
=======
  'aad8288f-3c0f-4039-9e1b-7dcfcea7e4f2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:48 GMT',
=======
  'Fri, 02 Aug 2019 00:49:20 GMT',
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
  'e8c846a7-61ff-4aed-ac87-61f76cdc2600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHAgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:48 GMT; path=/; secure; HttpOnly',
=======
  '01569306-4775-441c-827b-45a5accf3d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHAgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:48 GMT',
=======
  'Fri, 02 Aug 2019 00:49:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1564681909,"scheduledPurgeDate":1572457909,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/34d0136a6fd149e7bf2a776e35b8b26a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0hI7TvjoQLMff1snWbq-Ht6_WVreuaH8s-10McNGKE55j5Q0jyMtbpR9ETtO_aftVoFil7q-FDLTw0HdFnJxWAU7WizdG_W8NfHrGMUEHZx7YPcSCjshb2S9fysfRT6TLlzOJUhSLNeQN4Hy5wgLJp7hX0U9T0Q0GQ9h_qW1-EcZC8zrsldZzIygsgF6I7Loh6VHatJOMPq8t7uOND5hUAL5H9ZSvsocXw5qdCFUPklYOe-Zi5P8QkrOGg6jHttoyDWtXUqZ1Y17Q4Q_r-tal85DV7oIqjj7NC_3zRi_Ae6YRD2VwXr01a0ZAcVCzlCssGH8UQIshLQZHkNABYifvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681908,"updated":1564681908,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1564706962,"scheduledPurgeDate":1572482962,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/8c7506391f5f46c88ca2163271be0946","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"li6eCDktSrWqUCF1cjgNJEpntcwPy6yJI2tIk3hmoRywaKa5wTPZZFV1ckWr6sN3ts6JHreeODAWX1719bz0pmW_7w2NL3b-1CzwXBE76UtMB9c2ZAIdOPUuq8MvCMW_iVFYFgebyYOkMx8OpU3uzSs9Sz05kiHSgB0vU1-ARCA9K9DBxtAzkBDAxjM_iFwIalGNyI79iz6z6TwAU592vBGi0aoFWuR8pQ1F799U9kbrW4rK4cB4xrgDqOC93-sLKxOOGu34jnJ1GSMzGMJZS_TZtk5W9RiTQw_KabhT-3YYYoQK8bg5aaYC1HjUGQfqiHe8dI-eidb8tyoHitjiQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706961,"updated":1564706961,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '0eb8946d-6d6f-412e-a021-680a86cb9d3b',
=======
  '90762f07-1a48-4724-8ae5-387db3178cc9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:48 GMT',
=======
  'Fri, 02 Aug 2019 00:49:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '873' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'd43cb786-ae0e-4519-858f-318b11c2776d',
=======
  '6e1ec4d0-193c-4403-bd12-5c3d120842c9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:49 GMT',
=======
  'Fri, 02 Aug 2019 00:49:22 GMT',
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
  'e018b6e5-f819-4bb9-86dc-80f0af802d00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHAwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:51:49 GMT; path=/; secure; HttpOnly',
=======
  '452f3f7f-d237-4192-9aaa-6b495b0d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHAwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:49 GMT',
=======
  'Fri, 02 Aug 2019 00:49:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '121',
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
  '3418cc39-b185-432b-8c36-3a85df7717c0',
=======
  'db7730f5-bdf1-4868-81e9-31e0a9331671',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:49 GMT',
=======
  'Fri, 02 Aug 2019 00:49:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'fb6c9e22-cdb1-4f55-b894-3c47a0b71d06',
=======
  '87d3336b-8353-4eb8-bee6-c423ed593bb4',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:51:59 GMT',
=======
  'Fri, 02 Aug 2019 00:49:33 GMT',
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
  '093c68e9-1527-4a78-a3eb-83b1dfbd2b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHBAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:00 GMT; path=/; secure; HttpOnly',
=======
  '10a916ed-299e-4a96-885b-4d2c6ee73100',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHBAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:33 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:00 GMT',
=======
  'Fri, 02 Aug 2019 00:49:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '121',
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
  'bf0b483c-b211-45ed-898f-0dd2de9903da',
=======
  'f6a39f13-b2d5-4ed6-b401-0e0309d64539',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:00 GMT',
=======
  'Fri, 02 Aug 2019 00:49:32 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'ccbe471e-85ff-46e0-8bf8-9f17cc1a5064',
=======
  '34ecc517-0de4-458f-9a47-264a3dbb49cf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:11 GMT',
=======
  'Fri, 02 Aug 2019 00:49:43 GMT',
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
  '55997062-c482-4c21-8e5f-72f892982800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHBQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:12 GMT; path=/; secure; HttpOnly',
=======
  '1fcb79d9-2483-4ff3-a80d-3c4b83320000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHBQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:44 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:11 GMT',
=======
  'Fri, 02 Aug 2019 00:49:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1564681909,"scheduledPurgeDate":1572457909,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/34d0136a6fd149e7bf2a776e35b8b26a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0hI7TvjoQLMff1snWbq-Ht6_WVreuaH8s-10McNGKE55j5Q0jyMtbpR9ETtO_aftVoFil7q-FDLTw0HdFnJxWAU7WizdG_W8NfHrGMUEHZx7YPcSCjshb2S9fysfRT6TLlzOJUhSLNeQN4Hy5wgLJp7hX0U9T0Q0GQ9h_qW1-EcZC8zrsldZzIygsgF6I7Loh6VHatJOMPq8t7uOND5hUAL5H9ZSvsocXw5qdCFUPklYOe-Zi5P8QkrOGg6jHttoyDWtXUqZ1Y17Q4Q_r-tal85DV7oIqjj7NC_3zRi_Ae6YRD2VwXr01a0ZAcVCzlCssGH8UQIshLQZHkNABYifvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681908,"updated":1564681908,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1564706962,"scheduledPurgeDate":1572482962,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/8c7506391f5f46c88ca2163271be0946","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"li6eCDktSrWqUCF1cjgNJEpntcwPy6yJI2tIk3hmoRywaKa5wTPZZFV1ckWr6sN3ts6JHreeODAWX1719bz0pmW_7w2NL3b-1CzwXBE76UtMB9c2ZAIdOPUuq8MvCMW_iVFYFgebyYOkMx8OpU3uzSs9Sz05kiHSgB0vU1-ARCA9K9DBxtAzkBDAxjM_iFwIalGNyI79iz6z6TwAU592vBGi0aoFWuR8pQ1F799U9kbrW4rK4cB4xrgDqOC93-sLKxOOGu34jnJ1GSMzGMJZS_TZtk5W9RiTQw_KabhT-3YYYoQK8bg5aaYC1HjUGQfqiHe8dI-eidb8tyoHitjiQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706961,"updated":1564706961,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'ac073041-60e7-4f87-bdfd-f20b08cc5c76',
=======
  'acaff17b-215f-4baf-95af-7e2b9d602930',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:12 GMT',
=======
  'Fri, 02 Aug 2019 00:49:43 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '873' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkey-/recover')
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
  'ede72284-b09f-450e-ba45-aa4eba0aacb6',
=======
  '81b71b3f-717d-47eb-b4dc-c6bf329ef7d4',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:12 GMT',
=======
  'Fri, 02 Aug 2019 00:49:44 GMT',
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
  'c9a1e610-a370-4fc2-88e2-cbf3a8b52a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHBgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:13 GMT; path=/; secure; HttpOnly',
=======
  '73f75ffd-aa8e-4286-b397-114965220000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHBgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:44 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:13 GMT',
=======
  'Fri, 02 Aug 2019 00:49:44 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkey-/recover')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/34d0136a6fd149e7bf2a776e35b8b26a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0hI7TvjoQLMff1snWbq-Ht6_WVreuaH8s-10McNGKE55j5Q0jyMtbpR9ETtO_aftVoFil7q-FDLTw0HdFnJxWAU7WizdG_W8NfHrGMUEHZx7YPcSCjshb2S9fysfRT6TLlzOJUhSLNeQN4Hy5wgLJp7hX0U9T0Q0GQ9h_qW1-EcZC8zrsldZzIygsgF6I7Loh6VHatJOMPq8t7uOND5hUAL5H9ZSvsocXw5qdCFUPklYOe-Zi5P8QkrOGg6jHttoyDWtXUqZ1Y17Q4Q_r-tal85DV7oIqjj7NC_3zRi_Ae6YRD2VwXr01a0ZAcVCzlCssGH8UQIshLQZHkNABYifvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681908,"updated":1564681908,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/8c7506391f5f46c88ca2163271be0946","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"li6eCDktSrWqUCF1cjgNJEpntcwPy6yJI2tIk3hmoRywaKa5wTPZZFV1ckWr6sN3ts6JHreeODAWX1719bz0pmW_7w2NL3b-1CzwXBE76UtMB9c2ZAIdOPUuq8MvCMW_iVFYFgebyYOkMx8OpU3uzSs9Sz05kiHSgB0vU1-ARCA9K9DBxtAzkBDAxjM_iFwIalGNyI79iz6z6TwAU592vBGi0aoFWuR8pQ1F799U9kbrW4rK4cB4xrgDqOC93-sLKxOOGu34jnJ1GSMzGMJZS_TZtk5W9RiTQw_KabhT-3YYYoQK8bg5aaYC1HjUGQfqiHe8dI-eidb8tyoHitjiQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706961,"updated":1564706961,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '7d047c43-8fa6-47c7-897d-e75937d6f1a1',
=======
  '2e1301a3-76da-4a7a-a94b-e64cb0bdb3cf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:13 GMT',
=======
  'Fri, 02 Aug 2019 00:49:44 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '699' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'f8d6169b-2380-4f0f-993d-2d435b29b5da',
=======
  '4e68f4d2-d52c-41ae-a267-ef95f9500cd6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:14 GMT',
=======
  'Fri, 02 Aug 2019 00:49:44 GMT',
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
  '8407d32a-2f22-4428-a38d-a16cbb432600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHBwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:15 GMT; path=/; secure; HttpOnly',
=======
  '79613264-58f0-4e3e-86a6-afeb11390000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHBwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:45 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:14 GMT',
=======
  'Fri, 02 Aug 2019 00:49:45 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
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
  'b97c93f4-25c4-40e8-a0bb-141b31a9a110',
=======
  '2f37fd77-1af9-4b1e-a30c-76b7da2122b8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:14 GMT',
=======
  'Fri, 02 Aug 2019 00:49:45 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'f33b90f1-0a1d-4c5c-8fd3-9584c6b4d230',
=======
  '2d0586d1-0145-4858-8ffc-7fcd7cfbf47b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:24 GMT',
=======
  'Fri, 02 Aug 2019 00:49:56 GMT',
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
  '50497a2e-19d0-4b84-9f47-0ba1cb8a2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHCAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:25 GMT; path=/; secure; HttpOnly',
=======
  '8a07f656-6c47-4d42-80b2-679b0fc70000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHCAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:56 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:25 GMT',
=======
  'Fri, 02 Aug 2019 00:49:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/34d0136a6fd149e7bf2a776e35b8b26a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0hI7TvjoQLMff1snWbq-Ht6_WVreuaH8s-10McNGKE55j5Q0jyMtbpR9ETtO_aftVoFil7q-FDLTw0HdFnJxWAU7WizdG_W8NfHrGMUEHZx7YPcSCjshb2S9fysfRT6TLlzOJUhSLNeQN4Hy5wgLJp7hX0U9T0Q0GQ9h_qW1-EcZC8zrsldZzIygsgF6I7Loh6VHatJOMPq8t7uOND5hUAL5H9ZSvsocXw5qdCFUPklYOe-Zi5P8QkrOGg6jHttoyDWtXUqZ1Y17Q4Q_r-tal85DV7oIqjj7NC_3zRi_Ae6YRD2VwXr01a0ZAcVCzlCssGH8UQIshLQZHkNABYifvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681908,"updated":1564681908,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/8c7506391f5f46c88ca2163271be0946","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"li6eCDktSrWqUCF1cjgNJEpntcwPy6yJI2tIk3hmoRywaKa5wTPZZFV1ckWr6sN3ts6JHreeODAWX1719bz0pmW_7w2NL3b-1CzwXBE76UtMB9c2ZAIdOPUuq8MvCMW_iVFYFgebyYOkMx8OpU3uzSs9Sz05kiHSgB0vU1-ARCA9K9DBxtAzkBDAxjM_iFwIalGNyI79iz6z6TwAU592vBGi0aoFWuR8pQ1F799U9kbrW4rK4cB4xrgDqOC93-sLKxOOGu34jnJ1GSMzGMJZS_TZtk5W9RiTQw_KabhT-3YYYoQK8bg5aaYC1HjUGQfqiHe8dI-eidb8tyoHitjiQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706961,"updated":1564706961,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'fa8c370a-e9e5-4a61-a6a9-bf4c452655cc',
=======
  'f66ff9ff-2410-4bcf-b889-b61eee5e1d51',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:26 GMT',
=======
  'Fri, 02 Aug 2019 00:49:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '699' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
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
  '43bacffe-6e71-4212-a45d-2f450b35c6e8',
=======
  '5d414a5a-79ed-4e54-a12e-844a459a4596',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:25 GMT',
=======
  'Fri, 02 Aug 2019 00:49:56 GMT',
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
  'a4c4844d-c6e3-4685-92dc-991aa0272500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHCQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:26 GMT; path=/; secure; HttpOnly',
=======
  '7e32c9bb-b717-4911-b8e1-74ea7d110000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHCQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:57 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:26 GMT',
=======
  'Fri, 02 Aug 2019 00:49:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1564681946,"scheduledPurgeDate":1572457946,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/34d0136a6fd149e7bf2a776e35b8b26a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0hI7TvjoQLMff1snWbq-Ht6_WVreuaH8s-10McNGKE55j5Q0jyMtbpR9ETtO_aftVoFil7q-FDLTw0HdFnJxWAU7WizdG_W8NfHrGMUEHZx7YPcSCjshb2S9fysfRT6TLlzOJUhSLNeQN4Hy5wgLJp7hX0U9T0Q0GQ9h_qW1-EcZC8zrsldZzIygsgF6I7Loh6VHatJOMPq8t7uOND5hUAL5H9ZSvsocXw5qdCFUPklYOe-Zi5P8QkrOGg6jHttoyDWtXUqZ1Y17Q4Q_r-tal85DV7oIqjj7NC_3zRi_Ae6YRD2VwXr01a0ZAcVCzlCssGH8UQIshLQZHkNABYifvw","e":"AQAB"},"attributes":{"enabled":true,"created":1564681908,"updated":1564681908,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1564706997,"scheduledPurgeDate":1572482997,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/8c7506391f5f46c88ca2163271be0946","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"li6eCDktSrWqUCF1cjgNJEpntcwPy6yJI2tIk3hmoRywaKa5wTPZZFV1ckWr6sN3ts6JHreeODAWX1719bz0pmW_7w2NL3b-1CzwXBE76UtMB9c2ZAIdOPUuq8MvCMW_iVFYFgebyYOkMx8OpU3uzSs9Sz05kiHSgB0vU1-ARCA9K9DBxtAzkBDAxjM_iFwIalGNyI79iz6z6TwAU592vBGi0aoFWuR8pQ1F799U9kbrW4rK4cB4xrgDqOC93-sLKxOOGu34jnJ1GSMzGMJZS_TZtk5W9RiTQw_KabhT-3YYYoQK8bg5aaYC1HjUGQfqiHe8dI-eidb8tyoHitjiQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564706961,"updated":1564706961,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'edb36cba-51fc-4c69-b66b-02ff7ac4c7b5',
=======
  'b8127908-9d5e-47b8-9c66-cba41be133ed',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:26 GMT',
=======
  'Fri, 02 Aug 2019 00:49:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '873' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'e6367542-948f-4f81-9ffd-795eebd49e2b',
=======
  '0ec16a4e-b96d-4323-8675-431f8c7a2941',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:26 GMT',
=======
  'Fri, 02 Aug 2019 00:49:57 GMT',
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
  'b1cdcbbf-1084-4cb9-a20a-b1dcb8891e00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHCgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:27 GMT; path=/; secure; HttpOnly',
=======
  'b74e7fd5-61a5-4a73-856e-6e90b63a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHCgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:49:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:27 GMT',
=======
  'Fri, 02 Aug 2019 00:49:57 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'f66c234b-4cb8-4944-a7d8-f635cc52fa03',
=======
  'a0a57f23-82d2-4ee2-b245-1ece3f3819d9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:27 GMT',
=======
  'Fri, 02 Aug 2019 00:49:57 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  '8507fb3b-87a6-4b22-af46-0f3360219755',
=======
  '010d7754-50ce-4348-be38-187a10c789c8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:37 GMT',
=======
  'Fri, 02 Aug 2019 00:50:08 GMT',
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
  '026978d2-f636-4722-b345-726e05fe2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHCwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:38 GMT; path=/; secure; HttpOnly',
=======
  '4d07f594-176b-4b4c-9eac-99c66d500000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHCwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:08 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:37 GMT',
=======
  'Fri, 02 Aug 2019 00:50:07 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'f0bef214-9eae-4616-ba4c-c0b2283443b1',
=======
  'db65761f-01d3-4adf-b8fc-69fe6ea2e2c2',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:38 GMT',
=======
  'Fri, 02 Aug 2019 00:50:08 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
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
  'da8afb29-f0e8-4df4-b8a7-6ed110e2d895',
=======
  '68da2bde-917c-4503-9732-aa268ce9abeb',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:09 GMT',
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
  '901358f2-c5dd-406d-8ee8-1efd82d32b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHDAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:39 GMT; path=/; secure; HttpOnly',
=======
  'af29e1d5-2824-4c7b-9adf-0fc6426f3700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHDAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:09 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:38 GMT',
=======
  'Fri, 02 Aug 2019 00:50:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '139',
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
  '78926d2d-2125-457c-b840-ee13e15c181a',
=======
  '61d36804-e233-4898-b96d-a0e83be15c94',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/create')
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
  '3356a396-7de9-4218-b5b8-5bdb5c472e30',
=======
  '3909f8ad-2c77-4576-81d7-6ffaa4ccb8d5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:09 GMT',
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
  '37ef4c97-e2c2-4f64-95ed-adedc7912800',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHDQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:39 GMT; path=/; secure; HttpOnly',
=======
  'aa326bf7-829d-49dd-bb31-b1b7c33e3b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHDQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:10 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/c26261c0bc384332aa6dad6ab0e5541e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uoNV8cb71MQ2VoHqnJeO0jkJTPFZBcfmMhZ_8gu9qt1qgJlCy1-WvDxNzBohA0OcAVvEy-9R2AsoX9VJXdwFa37YyP-vJMJ8Q2PG0rk-hNag0p5L-QNU1uRz2f6av0fiGEnuxcCHEIbUdHwwKhbnmiKyUq6c4kUgQftVL8MvuJIJCPEyZEPHOCuW9CeKZfTeXcqhUaO-qbvO8wjHtQGg7tIdAgOkxRAPPesGdGAAc_vA8Mn0vAG1qo_Sj0QzsxLZp3ZunVokWenwQ9LuKNv83WmQBqFlGAllZDyvoA4JDpvqt_NVzY7Rap6cRBPOt9cbOdJq1rF0ys-HQp4X7Ls0vQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681960,"updated":1564681960,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/a9349cebe9654e6287b4f867970a837f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tJGAz7hBC8MkefBISgmKusbl9H08IsDmh_PHZgPqXEiEsORkmdkNnDmDRhZOKFYCQASKEkkKPzubcjR6KOwuRZ455HoF4AeZxAUTeeJ_RTROdB-e0ZTRcNFUclYtFCLMrBbDtuEWFa_JJFE93Ly_RmS6_FIWTO_XVGDI2HXmL1PfAgim5YWUW_vUwYshmOhdd6qbEVUghkQn10sVuCU8jKPBbETijDa98c7wsI0MsCAsMHb47bonn55U48gzubsKosl31s9uFW_hdXCm2fML-QHpt7_8YWYErVcNFvIUh9PsEUo3m2IuYRDwdzgmIwC7UU8gwO4ixK06vhrh-uW5Zw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707010,"updated":1564707010,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'abac1587-1caf-453a-9c82-3a0b2e31a46f',
=======
  '93cde459-e887-44ea-8bdb-62b7b0f77d52',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '702' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/backup')
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
  '2866997c-5d84-4e82-8da5-ea0bb7e21095',
=======
  '241062c1-861b-45e4-a7c6-fac1201bd796',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:10 GMT',
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
  'a048a91a-8bcb-405b-904b-7afbc3772900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHDgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:40 GMT; path=/; secure; HttpOnly',
=======
  '59f22272-8d9f-4c39-88a7-534b573d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHDgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:11 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:39 GMT',
=======
  'Fri, 02 Aug 2019 00:50:10 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/backup')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLkVTUFRNWlc2ajJNdGRYdUpncUhaTktGUEowY2JBQVBYU1E3Z1VHN0tWc0h3cG5LcnlKMW9sNGkwQTVUQmNET3NrS0s0SkhZUzR0UWw5UDBha1JvNTJpa3pNa19heU14c2lsUzc4MjNlSDJMWFRrMlJXZGRNaTM1V2hYUEM3VVpHUThPTWN4TUZrQVJYVTNfellrb054UWVhN2g4N29XU21TUEpXN1M3T3lIMkxBc0R3UWNDV1ZzbDh6RGZrdW9YUmFVS1I5NFpic00yRzdsYnJkeUw0VXFyb3hoWl81a2FpNEZoRjNoWGMxZEtjUjVwNlZPSjlJUllFeERVV1RtUGZtWWVNSEdyUnpOaDNKcllIS3E4OVZjNmV2ZDZQbjUtX21CSk04UHI1UkQ0UFJuekJzZTItajAwdHo4X1BQamJlSm56a3RpbU5HOUlZd3RnSHc1d25vdy5NZ1lCa3RjMXYyR1FKNktwNWNieVBBLjl3TjdhMHRzcENib05BSkg1MEhiT2M5Q0VyTEZBZ2pKcDB6NDZTSF9Na2hDYUZMSlVNc2EyRnZrUlk1NnQydjhGQlQ4UmkwNmRqdjdpY1VCSDlUNFNtVzFVQ0xrbE41bnBmM2lpSUo2VFc3bW5NWnFQT0FkN1JfdEtGMEVfelhtazd0X3NEQzlrVWU5aEtmWmpLbGc0dlVxUXY0ZW14T3l6aDkteVpRZk5mN3pzOHFXbVpkay13TTVNVEhjTllmVkplREQ3TXpnUW1TcUZ1VmRBeERCZ0l6OF9Vc21WLWJtb21rWUdmeU1sYUtPaElUdkZDbGlwaEdOU2Z5NUYyUjQ2RmNNVExKUnRlMW1yWHhQc0JvSkNZTlBadUI2T01tVjloWFJOSlJqTkR0MEdjcGpOTXN2UEkzUTVsbXJUUVdiMkFucXJLRi02TVE1SkRYdmR5Yy1xQzZwWDl1eFp6aGQxVXNPRFI5LUM3MUhNTkk3dkRrNVpmWDVCbGdOemRxT3BmNzdIX1BaWFlpZ045MThSakxiWkx5SFVHVjBEenVWdUJNR25hYzM1Q0ZJVmFGSmRBTEZEeUFleFBJQVVxUFhUTmJGcDFSaVFkWDdPRFk4aFZVdWdxbVNaYkdmcGxVcm1KY2Ytb2w3c3ZyYUZtNFhGaV9XNVRyajFGalJkT1hQYndTeE5YX24tTUtCUk9GMDQyYWdfbThiaV85Y1hhQjJEeDVfejJ2SHdzZUZ4Z3QwRVowTUZITFpIVkhYOGZBRHBNXzRFYVQ4dzE2RnpmblljSXFDaEhKOWxjdld2M0E1M1RJSHlNYW1lU3dkdFdvbkJVRnZvdTkwdWxlTzktR0V4VEp6em96YzVISy1qY3BmZmRMOUZMd2ZIeG9CWmZsVU1qWVVZbmdZSk05UEFZVkNvTkl1OV9zVlhMMWRPZW5panYzUjMwTTAtVDkyeVBaZ21TVnNrV0dXT3BtQ01iQ01SaW9fTXR0a1BtX19IZ1B0ck4xZzdhQlFDQkg0T1VscGg3S0JmemwzQWhOUEhYWllnUlk0NGxnd0RzdkxQT241c0dLSTVheU9vX0hfN3FxTG94dlJLeWdJY1phY2h4LW1RQVpreThkN1JDeENXbGs5N0diQlFqN2g0V2t5dkdKMkphR3h5UXo2TkVFbm1ZOFowQVJocm01LWxnNDhFaXFoLVVfLU9SX1ZjanZIV3RoM01kaExsWnUwbndUa3ViTmU1bm5MeXp2QkdpbGhESlBTTEFHbEJaQnZEQndtdkU0NXFWLUhKcTJST1ZDemhMVlNtaS1RSWJrOEJQcU96bG1weTdTV09HbTU4ZnpRc21kV3ZlbVN3R2JYb0RTUVBHTDluNVBVU2prd19sWG5hTzNEaXhIaTNtRGVlVW9tSEh3YlJlWmhWYXdERUVtMUZhT012WG9hUFEwanA4N2x1NFdGQTlhaS00Qzh1NXA0cjc0NWpOVEJUNDFYenpzZGZzOVpQSTZGdnVjSkxqZlhtY1FtcnNZZHQwQlhERC1hNkNSQ1NJNmotZnA1cmdrSFNRbFIxTjJCNDkzc0ZQRXVzdHlOU0pZeTl6a0JQeTgtTnQtRmJRNG9lenctbTV6ZmpyOG5ud2VqZW9SM0RZN05yUzZEMXJ4Wlh6MzJwUElfTGRmZ2xCMDk5YWtzb0Z6Q28xYktZcEFTTG9VV0VLWjcwWTZpQ2FnX3JtX0kxWXNPTFNNNFFHWWFIYmJ6Z29mYVZLX2dhMHhtSjZxakl4TkFFeFF3R1hhQlVDNTdYWnRmTmNoUUlHSXZrWjhTWW80OF85dWFPUVVZMjlHMlpjSElPeGw3N01acklhV3RmNlllZXNtdGZMMEtKd1lMeUYtV3lRYzg2RUJMaWlGd1dJRzV2Ym5vVnkwajdQcnZ4aGJfOHhxb1lHaUlEWmhzZFhNQmU3MFFZWEVCZVN6ejE3NHR0M3laVlZRSVNVVU5QZWNaR1BOMEdOU3pRVnpCREJCajA3MEhmdzN1NlNSdGdxMi1ZNFBJN0gwR1ZzMGVyZmtJeGlwSkJ2cXJjZnFHTERRY1VlMXlKWkdxZlF1VXNkX1IwR0JhT0tlNy1pZ1BLMFVzWFUtMllHaFJpN1Y2S3c2aHB3aGJ0dnJEUHA5SlE4YkxFaXM5azBsaVZiQlBPd08ybS00TEF1b29ncXA4aVEwZkFNZ1k0WkVyblJEWTFSalhZVV9GcTJEcXhtanB1S20yN3FmN1RWdy1LSElENHFJcUZ0TTQ1YmRzSHpXNTFINjF4a1pNZG1JOXVsTlN3dE5KMlpXMXRsdUpzNE9ZaWxnUHZ2MkY3cnZlMzRrM2V0ZV9mcWxLVTZTcFNXOE54RWFRbHF4SFk0a2VMV0lWb2h2N01QVmRNWnJNci1xdzFreW1wY3lOdC10SU12LTkxRmlsYU5LUFpQNmdjLVJ6bURqcVJOTHpvRjctR2MwX1c5WUZhTDBXb18yWjBPNE1WX2tHV0Jlb1lKc1IyWmFjTjFoVUpjUlRaemMyelBlU1NBc29KY3dqQzY0dGRqZV82RFVJOUUzQjliM1FMekZTZTJMbGVWMmU2WGFIQl9vM1pYMk1GZW1xOVJQeDRCbXMxQ2w3UWZOMF9zWjc5bUVydC1vclgwWVlxeVhqUG4tVVYzY0pQLWoyeFJxTVJTSThJYVhmOFdHNzY5R1QtamxNQnd1X2tNSGpoaHY5RVB1WElxbF9uUktOX3RxclhSTXlPMzVMTFBEMk9SQkdIMXJBam53azk4SmxjWUhaMzhic3FTOEpMWDFfZXZqNkl5dG02M2RzTUxINnFUSmZTWjkxSWN4MENjNF94WEc2WjlXU3ZVZXd2UmhMVzJxcmU3aE5TbXNKQUZjY2s4cUxTTkFDeE40ejE2aXJfOU9aV0dvYWloall6dHBBVlE3Zi1qTVl0a2o3a1BseGhKd3d3Y2Zaand5VVNkWUhmU3NkQllsTkZfcmFpck1aLU9WS2xWTTdTd3RMUTVjelZTeG5GRG5SaEZGYmxCQS1yeEQ3T3BuTzZoQkoyc1VNaFpvd3pHR3d2R1NWcWtOQ21IZVRmSkdtSnRMem51SVlKeXQ1M1o1UnMyTTd1V0FSMVlBS3djbG02UHBFY0dHMUZlMXVWVk1YVDNqQnhYb3lFTWtHOUZETjlrLXZ4V2tmbU9wWnlUVy1NbWRvdWFmUk9PUVNiMm1URUNpVU9RcVBicVpISzU0WmR5bEd4VW1vWTlEZnIxbXF6TmxLRnctY25KUFd0WThqclBVZ1dSYldTY0tOYkxEb29WaXVucUIzZGZUTmpsNXVFdW5uWm5vei0ydVk1VjFXRTJsSWc4YVBTc1JMaHBSOTd1U3NFVDhkTnhLWUJta09kYmpmSUhxOXUtamhZZVhNNkIyeldTUVp6RDA2OGVSRkZaeC1HQmZBeTRQbFozTUtQYjF3YWxfVzZvMTFYOGVveS1MVks3V2xZQU4wa3drMVc5TXNDMGxlSDB0azYyNm4wY2Z0MHNtTTJLdFhYbXk3R3VER29GeVlrc1lNby1FYlFMcTZTNHpNQnFndEhxTmdfaEdDTlItNnd2Z0NUbGZFU1VoMEdmcXlqeTFTWXRqUFlxRjVxWnpCeS1IUmExNC0xVlM5R1ZsYkE0Y2w0SjZ4SmNCSDVZaEhtZ212VFpqNVdDLXlyUHJzV0JiYkZVOWRDaFNFMklXQUpJLW80aDlfVEZjNjJ2elVqa0N0RWZkODlZRUpYTkFrX1JxeTBmLXNVZzR0SGxjRkhORVR5VHc2V0RZNHM0NDd4RUxzX1hqaXNvelZmNzFXbl9wVDkzTXM0TWNiSzU5c2JxZ2NPbmtnZEZCNjM5T0w4b1JnRUNNU1UzMkpWeGJJZ2VLSEV6Y3FfQmVfODhsVVgxaHl0aUZmQXMxdWxWQ0hmSWlhQWJNYVhmU1ltQjNSbmMxOHRsN0tWZnN3YmNfdkNrcHNFSkZVeWQxSGwxeldibzNTcGk5cjV1azNHb0JMbW5YWkJaV3BVdUctb1BMd1J5c1N2UzFpNWsycWIxcHB5Y3c5YnBJQWFxYlhQX25WWmw3Y2hNZDVBVm8zbHU1ZEZ2ZGFGelFYSGVVT2VKdDlvSktZSVF6RlkzVW5CdFRQQVJnX1l5V0p0MEtPcVZLUW12RmtyUDg2bzVual9SR05KbXBPejFxQ1R3OV8tbWwwRHBPTVM4Y3dQcWttVFV3RUlpQ3N0V1d0MUtTeVdOVmJOTXJiN09iSVBmR0NvWkVKSGRfX0NrWENnS0R6MXFvTVcyOW50U0pVSWhQbmxnbjdkQTJNZjFuSlp2Wk44QUJxTzhpSzkwMFRSaDk4U01BWEFmYURkZWpQdFNoU05kWGF0Uzg3WC1xeGhOOEJLal93R3pQWVN1cVQxa055TGtlcVhLWXJsMTV4NDAyd0hpcXNidjB2TnhtS043S0p3aFkzVk9qSHZ5bURKMDN3OWN4Y05LTWRWSERST3ZVME5LbE1sRVlVRHNpMjdEa0FVTW5uS1N3SEJMZENRNDlIMkFsQ1EzVG83WGFvNjVxSFo4ang2Y3VfY3hUb1JxVC1ILUhqb28zNFdXekpvQ29PNmtOZjg3Y0FJVGoybEQ4MEJBWE5UdmNadEMtQ2lYVEVNUERHZUEzZkJBaXpmVDV3Q0dyeWwxRDlwaHNmaklNRDdCSG5uaUpsRnM1NVFodUk2Q1lYd1JnTHlWVjBINzNyZkp2dFl6T21xTEFKN083dWNIM2FzRGRONXNJeWJlYXBxY2xoc2pCbXhEaU1QLTMwRUdOVlc1N1dISE5MUTRkOTgyV3VCQTU4MXl1QVRSYmlTaXVHZmdvZjFFMlJ5ck5FXzducVhORlFkcTNHV29RQ3NkYXhVR002dGI2Yi0wTFd1RGxRbjJpZm56MEhhSElYa3JnN3ZLNmtaRDJ0ajVCMnYwSVRYakR2UXBsM2dOU1VLQkItbXZwMVhvVjdHcFppLW9fZVMzbF91SFl0SmRBazc4UW02b0VZYmRmaEFHNmRoS3lGSVhhWTgxMDNjV0dtVExFM2d3YU00bGtaaGFoZmgyamZ5N0RaMzFZRTRuV3JGNTI2c0RJU1E4b1l5NWFBZXQ1QVI1MzhuNzFKUFFlQUpFMHFtd3A0Rzdvcl9EdTNZYlVrdmV6VFRzdVJiQjFiY24zNVBuZXFKVXRjdXFWU1FuVU1mS1p2ak1nVWlZY1luc0dzRlRPay1MS3huVk5NX1Q4YzVyR1hwdUkxTWI3bTVhVHhFa1kzRzdlYzV3Y0w5TlVZSzYtQ2ZvYkxTSFdFTGRyaVpyNWxnQXJoUU95Njl0d3BKcldnQ3hFclpiamg1Wkc4OEpralpnbFBfS200aW5Jb3hET2tmNUttWnJPUzd6dlFzUmFtZkFCcmtSbjRrV2EzeDJUamVJZUZsLXhEcDNBQWUtNmhUMjlKdXlNLTZTdXE5TG1WX1JDY3Y4ZkJuS05SQnVEbTROSE5vZW9FSkNJb1RPSEdoa3lQQjRFN19GVEdDZk5kZEhyMlZNOFA3cTNKSjY5eHo4X1NfTENMVW1mWEJXSXNNMUliWVBvcDZrbmdtNjh4SG5McGJWOFNORE90RE5pZjhPdHZwWFVvaFFUanpaX216aEI1Q0lYcXpkQ3d4bHJNczRSSy1fVWZOVjA4amw2d21zNnViOWNmenpZZUhMVUVLSVVsbmFjRWxJOU9DeUtQcTdueVVtNVJjTTRjeTV3MmxhS2RLRFZSVVlzVFI5azQzaUtGN3B0bGloTkZlVTBOZUNIQU5fUTVVQTBtR240aHdFRVBaU2lWMmtNNDZqd2VIVFZwSmV3YW9TUmI3Mmk0NzZPM3RIYm05bEpfMTIzS3Z2b1lKTU05eHVJRDFWMFptMGt1U3M1M2gtMDEtVno5R2hXbjFsYmc5NlhNUDV5NmRTa0JOQjNqRThtS0hCTk9EclNjVDhPLXJTUHhjNFhLam40YnZVMldIcllBdmtsbXZwTTNRelU0eTlSbnZDTExoMjJndDE3c19kZEcxSVZFbmxwZWxYWHRKOFpJZ3RUa0ZKQjVSdHpkUTdFWEtGYTh1ZTlkcWJkQWN0RkE1ck4xcXNvLUtkeER2MkU2S3dneVhKQUVmdFlvUVpBQ1B5T0pDb2dyZVFCSW9tV3BlV0FsUC1EZTZQbmZVNmcyYWtGREVuUUlTa0U0V0owM2RaMmk5dnpEMXFwTzBMUzgyTHZUZmJ2bE5sVWgyOXhEV0lPS0cydlp1UWRRVXFUVE5OZVdobWJRZlBYNW9pLWFEcndTWm16aFphVWVPejBoZzNtYm1ia1BqMEdGSkFiQnBxVGdCZlNsNmlObkh5RTlKSnNzZ1prOTl3NExteTNmN0Ztd2RocmRHelIxSFNtSzh1TjhaSDNTYl9Id2dROTZNUEpYSjlyVFZpNHpVRDBlMVdzLWx0Q1FCNmppdS1lRlJRVHRkMUh0Zkd5QU16S0NqbTdxQ1M5N19PZHVjQkdwUVE5WnlTQXFJbk1UbW5KUE5FTUxYbE5vaXptejlPaTJwcTQ5bkpvMzdTd0owZXh5STh1aDZ2WDY1cWxGVlRYZG9iNEZLN3hXTHNmdFBIYi1KRU1saXFqOTJaZVhXdl9tb1p5cEZ3MG1TV3VBQi1kX2h0NlNnaHR3RUVuTmh3N0x0RjBiRFlnYy0yWnJBTTlCVU1GVXFzNmNDdnkwcHVkUXZqcXBwNW1jbk9WRnJNNm1JdDg0em9hZS10S1N6WU1LWFZMV3pBaFlRNFltaXpHLXlwVFlnUWR5dTBXSUN1Wll2SWNIYW5COTROSW56MVZLSlNDMlltNEFJWHVmaHVvdElFSE5nM1A5WmtCQTFmT0VPUll1X2NLazBmYU9mNVlMY3dxdGhTWUxmTnh6ZWxCRl9YVkdKZTNLbHhOYW1LNXlHaXVjanB0QTJBTjRFU2dXNkRZclhPd1NxeXh6VTFsUExNamhrYkk2N1MwaGVoZlQwV29RWjU4Qm1LREtGdFNXZ0NKRWExVnVneENSWkZIeU9Kbmlvdlh2S0QzdFh5M0lJa2trMHBZTFpYYjZXQXVFSzk1QjZONHczVW9XQ0ltY3VWU3c5RnFiZDF4MVVwQTM3enRqLXNBeGpIZlgtNzZVeXROSGxLblhZRmJjMjFxa05jc3lYWldXQUF1ZFc5bjI4VWZKQU1rMjBWQ2dsNDFpRDhYQ09rdmVzUEZSN2ViM0xicXEzcm01T0toeUw0R2pzTmM0TS1kMjh3c19pN1BoSnQtSmtrdDNKVDEwVjFVVFpZUnVOU2dYR29EMjB0cmtabXd4Y29taXJjZnZwRTZsdjhBbjlucVRrdXFwTXVWWmxaUmtXSGRCQ2UzWmsxVEFOQjVmUGVzVjBpYmRHU0l5VENqcC1hR0pPWTRvWDJzbzZuMnJObHFvTG1tdTZKckJENjJ4aDlyNjhBeUtPSnljWjdVQkFXNHNqV2tYblBhUjlFd0FrZkJWeFR6MXlpWmhyTWt6UTRPaXAxcm1NY0QzeEZMU0dyTkR1VDFCeUJCbDVGQXNlWkNyc1QyNU1Pc2ZRRkk1V1liRm1iX0RZMDRlX2pCUHM0blVkSm5iRzc0cThyRHhxWjdkNW1MR252V19SYVR5WnE1UThsNk5uMFBwVlRWUTRqRThTWE1PT1Y2NlJPcWl0RTM3cWk1VEhpU1dEaXV5RHI3V1BaUWhhRG5OTl9NYVR2Y2pPdUlZWXZTcG16ZE15NkJ6MGJqcWR5SEFCOGZzN1BsekZtMkRMUl9uQ1NpczNwdjd0WExwamNnb2g0VXRGcnhSMFhIYzc2SWkyVnBfRktfX1lVSkYxQzlla2tFWkRscTdvaE9pVlBpQW01UkdYUm05b1JfcUJJZUZPamsyczlhZXBJNFp6SnRrMVJsdUMtTk81SEdaWUdCRmp5NkNIUG56Rnc2aEcyVDlOZlROc2VrVDd6V0pFbkJTZGpVTlhVSlJBRFVpcE5lbjhBWEJKLWlySDYzMDhBckVKVkVtREt2ZF9INW5DdzEzaVYxMjJETFRLQUx1T3BIZGpoY08wN1h3UnhwZWxpTGo5RGlfbl9nNFFQRlBfQzNtSFNRdDlrakl5SWZpaThWeTZhR3NwREFPaDFDZFZLTHRQdDJ6MDM0OU1vb01WQ0JoSjU0UHVYV3ZTTktGTjBTcHVrb2V6MUppNFJfNTdNZll4V1VPUklpSzhESXNCeU1XdHNPakhtaW0xQ0FCTlBFX2ZxWk1XSWhrREtCUGRMdlBuVXhrbzg0bVVJMktvNXN3QzhwMGlWVlhQUEMwMU5nOUtFRUlNZFJGaWlWNXhhdHh3SjNNbnhIaDgyY1VCNVcxa3VkSkZqZVVyUUVLcldaY1pmOXl6TC1NNnZNSkxrcnlTbzdTSEs5eks4Zy1BLXBuZTUtTDdWVWZLbmVuV21IeGRxSTk1Z0JhcGZXSFVYYkFfNGxqZ3BNNHZBYkFCSElvbEFkaEVtclBybGtRZDd1RkFiT2hjeFZsNUZYTDZnR0JMY29MYXlxeGtDbndadmJReGZSd19LbF9LTm5mckNVTDR4V01oLXNBa2dhT0MwcUZtR0U4Z25rdzc2dkFjM2RQc2kxMWh0ckFYbmNsTVpHMWoyTy1td0hRLVdnV1kzYWoxZ1RMV19WV1JxSGZOTUN3SFZGN05xcU5GZ0lfZzNfNEwyOVk1bUdYeEJoR2FtbUJVOU1YVHlpNEVmbHJxOU5FNkk4OGREZ1VNWlBWc3JSSjJ2QUpEVmZpQnBVNU8zTGlZclM0b2VrdUMzajBRSGQ4eVg4SGloTUZzQkpaY1EzSFZpOUd5X0RQbzlMeS1sVjZIbmFDYmJrRzFqUXpyck9JVDB4TjJkanNyTU9CZVNEVDBOOGFjRXJMRW1lYkZmOWpuWmx3LS02QVFuQVRNWGU3SGU1UndwUXBMSFRxTFpOdDVQeFFac0hSeHJVdUtwYzRSVFh3cFlJeUFleFNBd21oal9JZi1XMlRPWXMwY080UDMyd2tXektrZ00xV0RPOGlTRjkzS3U5aGQxTnJFMkZ6ZVlXVllDSEk0RDVBYXVBSC00dU1sa0FVZjdzVGk2Z2haN2dRMkVkaDBUSFhTZC04ZE5nNV82MG5ORjU2ZTVRRnpMTGxSNGM5a0Q2T281TTZDdGhvZ3JEMWpiaUgtRkF1eHVRUXM3YlYxZmF5YUdLelA3c0xLc2EwZEFRSGZLcUk4Yzl4NHdnS20yVGNYS29pTDR0X2tIVTZVMGQydDRXQU8zbXlmQWhmYWZOODJVOHVsaWVGWXlvQjFjMFpwYUVTaTN6QlBOMzlmb1RYVFhHS2xqZV9ueWc5WVBSWUFFNC1XT3ZqTjR3OXppQ2MyNExRWEJZaHJwSVJYdnduVVo2cU9nR0o2M1d2Z1gzcUNlSjhPdThJVGN0MjcyNVVCVVNHc2dsMXc0R1ViYmlsM3JubkdmSVhMTllNUmRuMFkzR2RiMmlMZkdGZFRaX0NCcXV0ZjRsQjdicmE5ZTNqV3owNHRJelhYckZSMnpmYURYN1dzaHd0c29ZWFd6QTl4TzgxckROX2ROS0M2RHRCSnFRZTNMNFp4M3ByN1lraVdxSFhjYmpfSXlnUjVsVUI1OWREZUl1LVdMektPU2xRc3RRRllmOVFIcEprQzBsTWxVdnZ3eUR5U0FBNHNTRUo5ZmdLM19VZ3pZbmdDZ0dMVWxkNUQ1bExqV0l0Uy00eEZ3N0N4OGdjNHlJcUZUR2xxaDRkU3pFZEpYVXFuYVdiS1FGWDZJdnpKNkV5REtRVlB2MGVlQlBwcmNBZl8zd3ZKeS10MGJ3emQ1cm9MSzJtTU9CWWlPek9jNkFlNVY2M2VSYmRrNnFCeHJZWEdxQkdBODNaZnJyTmpRamFMajEwWERZVzdsY1Mta01mNnFqS3RuSDVIOHRBNHpWako2ek44cG80aHZha3d3YmJwcGs5NkFxdWlLRkhtMWlBc2k3ank1M2lxOXZIeWxPY3g2a042eTZ6N1ljeWZmX1Y4XzljcWEybHBrdi1jdkczcTQ4aENNZFFwd3RUUlZUckZuSmNTeG8xS1FDbmd0X1hRa2xLRDlab3JzcTc1NVJMLTJkeU9WY0NsSEZDb1J5ZlNHUGs3NGd5YlVMd3JvWm15Q2ttNzdWX1kwNzBIVWltWm5xLWNkTjFFUHdPRVZ4alpwYXRDYlk1OHhHUWNtWVV4dDRsNXYtaGR0SmdkS2JRQlRPbnVJMk53SzVQQUZ6djNOR2lSaERDWFYzUHQ0N2ZXbW1VRXlQaTJ0MmRVdjByUVBrRjZLd3I0TGQ3S3M2LXhyRGVZalNPZlNLa3Q5clVDamM3WVZ2Yi1ONk5TTXBlTi16X0pPRFc1THV6WnZmNG9ZMzh1U2RESGd5NHNPZG1ZNVZSQ3dlYjZodkhPaWxkQk9LY092NDY1V0xzVGdXZWR1M2l2VXZ3YXFCemFJNVlUMldPVzRIc2s4Ri1SUmNrR1hEU1pKTXBVbUxuSEpEYk9sYXRZSkhtdnNYbjVSZS16RVJmdVBZRENzMjdmWE50YzRxZTJ1OHhvQ3Z2clMzeEs0QjcyMzE3MzM1LUFLcUdKb2tYWjZtTHRHaUFQWWhPSnhYTWNONjUyeHBFOEF0VHBJZmtHUGxGZ3ZjOW1yUmpUOUtfa1Qxb1lSRXdkT3BWRzUzRHdSUGszOHgxWFliWDJuMzZrR1ViOGpKb2luNWxRd19fRDk4NGlDLTZOTHNfQlBfSnd3RVZ5cW1VU0RVdU02UUd3UGZpaHhRT0NmMFlTS0JtSWhfQmR3VzVLaXhXVHJkRjVnYkhLa1RfT3Y5SWg3NHoxajBrb3ZUU3FUci1DYVQ4VmlCS0VVY1dqaTBXZTUzc0xIbWNsMmtRMVl1WkpUMEQwLTlMVW52Wnk0czNkNXVPdUZMMTRtMXEwNWJBSUFzVGtfMkVBY3E5V2M2NzZYVS53NFkzV3hTdmw5LW96VEpHTWc5ZFRR"}, [ 'Cache-Control',
=======
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLklEZDAzbVZnSU50cWk3QklUank2cXNkTlRtV0VXQXVzQ1ZEazFlRzhDdmJIS2F1UWR4eDZPV09QNUNoNFFVelR4aHRucUl0UkF1Nlk4dE5feVMxZWtGQjRPemh2dktRZ2F2bTFGTHhhaVRYRUtGWm5KNXd4amRobFEwakxZSVlEcl9UU1N2dVMxRWNQRl9zQnQyQXFuWVpQWVZMSnVaZTVQNjVxREwtRklEcWN6ZnNqOFNJdVNtRWhiX2VCVVlCUmQzRjBWNlRTTDN2ejRmVUJqeEEyaHBtNXN5NWZrRUhxQUE0Ql9fRlJCOTdhRjJtQkd3R1Y1cE4zazVxcjJsWDVQbnNKSGs0V2pfSlZLQmFfbUpqYi1xaG9WakdQcE1vRUM0aVJRdXhMVERLelFhbUxGelFxeDk3eHY5cUxIQnJIMG9IRl84bmVRYWxybFdtZko5aFBTUS4xZ0Q3UkpkaG1xUmNVUm1KdFlTMm5RLllEVkp0NktJcnAxTF85TmxSMnUzazBuc0ptM3ZuVGlGcHkzVVNTc3NmUDIxNEduQXdWNHY2a3hzSnBiTzF1WVJIVlBvYVoyWmt3UzZHWUh6MXREZFdWNWt4UjAzZmdKUEV2eUJjRnQzc0loak4tT1k0aHVWS0p2MFY0aG1yYXJDU2lGRmg2QVFrOU5JcnVwRy1vUnpCd1k3V21TeklkVEJCS0JkSU9sTDRvaW5aLU1GVkZkRXBXNFdCUVdBZjZUZkpQZGFObDdrSzVKaXFhcDdVb3dJdWlRN014ZUdCREdhYkRudVBKNXJVbFBpeHo1SWhTT21SVUNvRU5kLURoc1dMOGN4UWx2dkJfTmg1RURSbnU4aDBSMlhoSzdNTEItUWtGbDYwWEJPU21PdlM5VElNRFk4elcwSjZVZFpQSFg3VGR2elZLTm1pLUI4YmZheW5EMThRNXV6X19kRV91WWF0bUN3SXItdmVCODdoVm80dEprdUtxaUFOWjl6Uzg3ZkN5U1NOSnQ5TnI1NWNGVGxCT0J0UzhzUHZHUFpiZmVjemEtNVJxb0d3UXRZdjV4WXpGeEUwVHRfT2lyNkhNZU9NZUVVZnowdTFjdFlOV0FPM1FTRGNWdnJFc2p0VFRVWGNrQlk5ejhkNzQ3dVhscUJLZDlwZHZHVThYOG9tMlU5REVtUGxWOXBKeFNQZzZ0a05iSUo2bVJFOW1yNUpLMHVON3BkVlJZRzVoUTYxLW4xX0dlQUZ3bUE1dEtaWHVCbldDY194WDlCTlRqamFrbHN3YzR6THl0R2JTbktQY2I3cldhNUZHdWlYeU8wN3ZZQ3M0c3Nla1RkaFo1MFUxT2tGMnZRc2ZUTUhjOTlVS3FLWkcxLUJWQXp4V3ZsMnZ1SDlCVksyYjMwbC1nZThXMVc0RDY0SXBGcE4zT1NwY3FLazFzblRkdkw3MGxmM2t5eFBlZWUxdjc3T05JZnZvbWxPb2huNGxOdUd0MFdwdXk5dUxtRnZDaHlTQk9PS3pEaGFyY0hmc0NZVzMwVzZfc0tLRlhqOXJVOGVHVkZzQ29Jci1IRXBZbXlmeDJqbDdyR3c2azVZXzR0TXFDVlo0dWx0b1U1d2xUa0dqMm9Fc1Q4dHZ2R3pUNjVxd2RGYTZJZEwyZDdkQjFTNDhBZ1pBZXdxMWNXdzRRZEVkMHp4TVA5aUxqdFBWdlkzZVAtTmR3RFJGQnM4Z3ktOE1oMUZVdW5CbWpOR1RjZmFxRk9MVlM4a1BoRlhNWVJvMmpUNmdYcTNhQ3NCX1Vvd0xwTHVUdnhSWnhaTTIwbTJuWVpiTUlZV1A2U1VLS2xkeEw1UTctOGs2SUtRNGlnU0E5SlBuTEtCNzJ5Y1d3XzViV09fMU9DRUg1MzJUb1doeDE1alY5blJYanh0SmFQOV9RWHQtcmFPSzVQczdxejE4eWRfVGNRQWNITkNPNXU3VTlfX0ZZUlhTR0czQkV3eXJfTlBocEtqa09GelYtUzhfNWE5YmpBNlhaMGprU2Z1M0dtMmp4b3l4eFNmcmpoSHQ1aFdIS2lfZ1p5alNXaFFKS3pmb1M0TUdTb293Q1FMeEZBcUFDakt2TmZhMGNoVGh1LWV0eUdBM29GWnRfWjVXTzhCX2lIRjUwVlRqVm9JVjhiNTF5NTYtQWYtczhRNk5jN1M1T3FmZTdGX19fRnA1NGpkU2pqc3gyTm13dFA1WFhMeElFR0tQUncyWDlQeFJGX05lcy12dS1YeHZSam9FdmY1OEZ1VEJXdEVYTThYOG9wWHY0bnlQSVMxaU5nYWItMDlsSWNfeFZYUVd1MzdRMnhsbTRKUUJVOHFEVDNPNHpiUDRUU2U0bXQ0NnVrdEo5dHo2Mm1NR2lBUjF5MTZNWUtmbHA3cEd0VlhxMy1Vc0pBOXpDMmRMbThpUzhaMDlVdE5Lc3RjVmlsZlFrNlpzcVB1QjZWX1VLbjFfcUFXR0NpdFRjMXBSWk5FTlRDOTRZejI5RGMtTEFDcTdLLTBEQ1dmSTJkOHhDNnVOR280THlicGZVT0VPSFdLdm80NVZleTVWNk1lcGFIU3ZieFdoOWh5SUhJcm9FT3dqaktnVE1qNVp2ZW4yZkMtQ3RLVEt1NWJZQkZZbTJ1N3hmV2ZXcGFMVU56S2Rvd0QxeWdnU3VJNHpld0N6dHNZU1RIaHBGNmFDeVUxVGZKekNCaV8xcVpIVUlKTGZYeFp4WmJwYlllMXNIZWxFTXFZN0ExVFQ5V1E5c2hWTU5wWWZkcEdvTW1KSXd2dnBJdW9YUEpTaFNPTU9VdXZnNjdQaUhtVGJoQTZmejVUQnQ4M1VCMTNFYjFXdUppemFUTFdSc24zSUlHNWtaTFhQWURGYWl0c21JenFYQ3BfMFJwdDNxbXBleFBvdGp1VHNYQ0FnM2JhWk01aUNrOEhmNEJLZFFkVUZwVHBubHZhSDJHSmdTQ083aHkwYlVZZnFIWUtGdy1NYnpWR2Y4SUtNOHNJY0V6a083UmZWV1dVZE5NN090WlhwTDd4TDFlaXBwa1JlaTNIQ2pPV2M0Y2p5ejZ2cEQxOXRBQlgtUng5LTdXZHI5c01xbEFaNGxKMGxZeGowNFA0aWI0MzBISUo4N0xCMjNLMVY5aHViYk92b2EyTTZsOUJ5SEJUdUNlVlRqNjRUMEt1NlAwaDVqd2JlT0kzQ2FKNFAzZGJiSFI1eFpnT1c1RzVDUk15d285bUVzQTg3ZXBBMnFCUG5tTGtsWHd4anh1OVVnaGhpS00xa0VmWFdZUHFKeHdreDI2ZDJoaW9aNnlLWl95cTJ1MTVXeXdIZ05nbndJQTExT1FubjVpQ1N1dmpZdjR6Yi1aYU5DSUhaNktVd1drWk1fQ2tLNnBoM2hGQlJoOFlGdy1PWUVGZGdNSnlQaGFZbHo0SE91REFQRjdlTDlXZ0xsekVldlBlbTJQZWJiWDQzSlpiNG0wb1I0MjQ3OUZaRTU0RndiU1BHUC1YVDJqM0RyMEw4RXoxdFMxNEZvajMyWldMVWl2ZWxUTTBsRWU0MDFpXy1fWnVIYlFTaE04cDlLbnJMMHIxWDlmN2FKeFVnc3ZFZzExcmwxSm1hUEtqYzhoMUhmeTFUVTFWaWdsc2Rta0I2U09iMlhramkyclBfdWVMY01sYmZJelMxVzZvQS1ZRWpVbmdSMDcwR0ZoNTdLcXcxamNJX1ZUNjF6REdyQ2xVaUR4cnNEQUljNnQ4Xy1qdHFQNlhqenJfZ2xfNEl3eDAyR2d2UG1DM0RZSHYyazd6QzJpQlp1M0U1N0NVT3A5WThsN2FtZkp2N3g0UEVfOTF1bHRIUU9MODZNV080aVEwOXRCSjRLUkNUbEo1UkU4MFVzcmM4ZzU5b1BqREpjTWxtdWxvLTV0QXRTZXJfSDd2dEdhY2Y1amNSMWd5MlRLUHY1QTlvYTNPUHpJMnFsZFpGZFBvenIxbkhJS2g4OGNMN3lwYWQyWFpyNFA1TlRONFNIMEFXMXNVY3ROMHRPUDVuRUlOOEZlUVZpSWpsUE5LeVFMYXcwYzRlckI5bXFPSE56N09HNFpxRlpPaUdGZ0xOS0I5MnN5Q2ExOERkeEhwZnJvVzFzVnJBT2QwT1Z4d2hldGZaY2pKQ2lUWFJQVEdsZ2tVTmhUcFd5UlQwRFR1WWNiUDdMVXNLTnE0TFFURFlYQTRWam5jdS1fNTJFU3pxdURDRTdfVzVFOHVTRDhOVDRWOU5QUFBmdXMxVm14T3BhNmF4allVUW5icGtYSnV4TVduVkYxbm14TkNTOUpEbEdVWlMyaHpHaXJ6aEM2UnVKSm1ray1oY25PMnJidm9FOGtKWHRKcWxNbVZvME9IZWd0Smg0VnV0ODcwbkRrblcyUExtZXB3OVdYR2JDaXFmYUlObjVTcU0tU1YycjhGbHRROGdBeEktR01kWFhibTZIeGd3SUhvMG5WTmdwSXJ1eVFrTnJJWWFTeTlvNFNWUVhpMi1TOXVKdG5FUERiVE1YMDdxUUZmRzE3b2tVYTBLNWZOcHhieHV3VVJfbUU0R1A4eHF1NFBwUlpiNkN6eWxXVkdvSV9NWkxIcUVTMVlKelRzVG5XVWNGYU9WeGVmRHdGQkhRbXhJSkttMGFucTA4SUxrN2JYNXY3UTFsOTFMS3d4TUg2ME9FRnZPVGxaNlhYbjBDUW5SNkg3WjBkdnRGOGprOWRpXzcxdUdrS2wwSV9nRHRDT2xIWDg3eFBISU15MW1lNTlRNkxwQ2lvTEFLSXdGczQ2WHlqQ1pWVTFvSFpaRjF0QjJYZDM2aUhEYlZTLXQxRHVCTmdfeWJ6N0h5QlJFSUFaVEhSbTVNdzZQcjl2VTk2Njd4UU9mdjFXTDhkdlFxcFBHVVI2QzE5a3ZBZ1NxS1hmaE56S1FFaGRmcWozUGxySTJyQWtITE9fTElYRDVZclBsZ2V5YVZzZmU4Z2RMRUNRcXJrQ0x4VW04Qk9Ia21Cc1FGQXVHMW1YMkU4dDA0d205OU9xWjlDUjZsRHlHOTJEa3dKX1c5YkVBakw2ZlVDWmV0ZTNvVFMzRm1nWkNCVHY3b3d3eldDQ0lnM3NtVmE4cGI1cS1HS18yWkRGT1NERFVOempSc05IUE56bFMzaHdMRW90akZtTmcxSGJnN0wwendXQWtnX18tRVJUa2ZEMVNaa1lTRklBMFZMWnBtNmtESW5keUdpd1VncDdua1dEdVZkQUdsampRcW8zeVY1R2pKMUVXdWo5YVFaeU5UVEFiUk5xUnNOcTJqaURhZzFjTDRjbG5iUE9JZzRyXzNCTDZlV3lvM2p0V2tiaEFlejZPSHkxenNaZHRTakRHOFRadGxNcHloVlVwSUtJLXZjRk5feHI3enZKenV1NDhraXZVMTB6U1M5U0QxZTdOZ2x6WTc5TjlCOW9FWmNTa3hLV3RqMVhUVUo2dzBXdGFPVm80YlZNcnZxN2VnTnhxcHpmME0xRGg0T1RJVmxpaWJhWF9TUm5mRlhvdjdzTVdnMllIeGV0bnpyMmJrYjZCWUNxVEhpd0VROUFSR2VrN2J4UnJNSU9UdFptdFdteGZDMU9OYzQ0MHpRLXN6c2xDWTU4NWZVQzlONUl4RmoyRnNUbGdaX08xdHhpSlFUVVFXU0xkR1VHWlZrLXJlMXd5WlBacE13MEc2djdYQmF0Y2ZUZHR3aXNWb1ZwbzdUZGVpUEZwajZJdXUyRWJDOWpXNHoxN2FNaEVKVnd5WVd3R3EtUjQxbnVmZHdWNVdMTHk4VFhXVFNvTnlHSUs5TFFFS2FXSHlKYnZ4NWhRbG1hVkc5MWRoSWc5Y0xlQURGNzVvNXphUGs0SmlsQWVnMlgtUDByLUxzek95NE1kNTgwWThJTlo5ZUUxTDBDMmw2d2RaSmVTVTQxNEgweWhrUUh6bE1yMmphNi0wcEt6UzhsS0JlRXJ0TkduVzVmWUFQOWJXUW1SYWtvWmJycFpVQm12WGlQSjkyMWJyY3FnemRaR1prQ1g0WUVvV0lHQVh4MXhRc3E0cDgxcUVRek1FWTl2bUEyQll4UW1lWFNvSkg0MVNSUjJmcEpkSXZmT3VJc21JcDcxY3NzNGJCNGFJbkNFbDFzNC02Y2dMUXNXVG5sdU1La1Y1V2ZobS1nQmd3enJhQ05YLUFKbzUyZnYyTU50UjBBR1dFWkQ4Q29IUDM3S3NRZXhaOXQzM242LWdySzIxMGRpei1oQW93YnExeF8ySjZsSDNOSlNCaHl0M09uNFlQRGtBbjZoaWFqWnZsdk1yZ250N2J5R0pNYXMtdTB0Sll1TE1XdkdrUDdlNlNxb1M3WUZOc01pQlhVRFdtOHNnYmxqajBuTmhoZ1Q5dVpKX1pkR3NYejVFOUlvMEVJczJvMHZTa05LODRaQThFSmdOT2xUVUZMWHJpMko1WjFWenhJTHB2b0JHNkNIVTJaZ2RReVI3V2paNkx1MFMyWTlIY1hINFE4YlR5Mld3dnVpazFqYzVwSlhQa1luVlFWTUxsNXJISFpMY1ZVQ2ExS2xmMHI4NFVIaGp2WFZwVy0wb3ZLY1paRE5BbzZ2VnlnZUtMdUlBSF9sZ3Q0VU5mZUpocGxVVVNRaV9zUEJKaWtIU2FaUXhzeTZGcnBSQW5sc0xsS1FQdDFYVGhwemFvMFBsM0U3eHJ4aDlySHlIQkdtOXY2c1BjSkpJWjdsOFlLdml4TVF3RnZJRFdoWkhGRGRKUE1uekpPdWF2N1Q1Mi15LVdJR3NBd0UtcUs3TF9XcUswWTZ5QmE0ZXJUZzVDMi1EUkVpbWFzdXRpcEllZ1FNSnlkcEh4ZWVfQlRPZWdqdUtVZ0lWRE5zNHY4MHBHdmN1d182U0pMTHRrTWR0ZEhtZWI3TGJyYUxUQUhIUGlLdzJIOG9raUlkSll3NFhCWTRkNFpfc0xRcGZZYTVBeXdMVHJqWkpZMEdGU19meEg5WVM3aDBGOFFPWHVPWHMyS2dpVDlGVjNESFJwZTVHTWJJMGZEWndhSkRiVG4zcjNRVmlSS1JXbWlldjF6MDJ6MGNqclpIZTFKUTdyd25iN29RUkJsa1pVRFFvZklLZTdHN0xFZ0VYY1V3X3lnYXhyYkNSb2tXbGRsQWtSQXhfcF8xZzVWdzdDRFpRLXJLSlFGMXY4dmJpMG5ncUU0a3lfRmk1OUQ3SDdoT1hxcDMwa1ItVVQ5Si15dHpCeEZHaVJOUDJmQ0pxMzdaZUtlOGFTdm5UcEQ2MHVZbnVTWFlCa1hXOThvcDUwSmJsTlhlaXg5eWZobHNmRlZuSVdwUk00aFIydFAzR3JDUFE0YVNRdkdpUEdZcXVwdGQwT0RyVGtqeGZLVldZcTBPZU1CdjFEdUpJMm14YmNfQ1FYRzRlSGhhbExKWHNjb2xKNTVqUUl5TmFvbjB1ZFJqNmdGd3M1XzBQVV8ySjg4eXFPd0k5NkhIdXp6TGluZk5ueHAtbWFjU2F4TnZEcHBPM2tLb2h1NWlkemR4SUtXWVlTcFdhZWc0cEl0YlpvX0l6Szd5T3JXUTF0TlFtb3NPUi1PZkZ5V1QtVmQ3Y3pJemk5MF9sZ2JVRHNmMHJra0JfdHVjX0s2Z09nT0lhcXFKWHF0N2NVTGlldm1zSHZ3cUV0ZGtvNDdobmwtT3E4ZFFBMC13NnBLdkMxWWJXdjE5Yl9za1BTLTVQSXRFUlZtdnN5ZDN2Qk5lWlpFZFFrMGJ3LS1nWFJFdUFXM0pDNkFvazA0dWV5ZGNWT0lMMEFqQ3BNdUhTR3RKQXR3T1FWQVhSckRVSXdkX2JaMHJyYi1OSlFkUjhjLTI5cGxKbzN3dWl1dmc4aGlvMFc2OGw4MEhQbVRUMkZzeVpSS09iWi1KcTlsbVQ5LWRHeVY2dmFUNFNrVkhTMDdrUHNUTXdZX1NkcDA0aWRUOE50QjBWYTdQRnh4N2wtUmh3YUF3VHRZd2lQcHBuQ3I2bzM2UF9CbEVoVFBFN2JsU3RGbFMwZjRXYnp4bE1XbFFKNy1ISjhCY21zcHF3ZFFBUnNhd0FqY2Nna3hPUWRJUi1veG45VUJwTkszQ2lINV9oZWc0Vi0wYnJ2YVoyTkNrVUdBVERLZHZVRktnS29OUk9GMGpMRFNCRlpKT1RTUHNwZnNrU2otOVVzcFNsMG81Qjk5SEJhMldCQ0dJT2lwSlg2cVp1U3ZBVENjYUNPeExHYnhEc25KYXVJOEplRFhmOUVpbVFTdTJrdTlJcFV1Q1lfdmJ2bmZSZVc2a3lNSDhVTVVvSUthUFF4ODVkcmRSTDFuQms2M1dteVY4azdlU0V6dHUwZWtoZjVlS2JqWTdGVTZ0enUxMGl4TTFvSGtQdGZZUTlMME9PMWx5Z3U2azNSX1ZMU1VVNzRUdkFjbGk5WVlWRHByanVfLVdPelFNWXMwdHh0enlWQ08yc2Vsd05FZVZ4WEtUVWNsbnBNaGJfV2s1R2Zza3BjS0RhU2RLblE5UTVmOWQ4S0VOZ1VnbDI4Mkc3QmhiRzYtVTVVbGh4djd6WWRiYTF4T1UzZGlkZG9wVGZ0dW5pQ01SZFlLSl9SeGtGQVhyY20wUndJaTVIM1dQX1YzNkFRTGdHdkVkY25tc2w4S25WVXA2OFNFTTd2N3FaR0tNUTl5dzQ2VmRfNk15RFhpa1dqcGVpM29Jd0IyNHpYUGxmaFYtQ1RfR0FjSWNrSTk1WjJPbmE0Ny1ONXI4djZUc1BQelB3MkJ5bUhiQVFvbWV2N0dNMWg5dHdHWk9JTzNLSDlZUHNTOFN6SnRobThtc19JalJDbjUzZ3pJRkpjRGNYQUZkVU9LcXRnd0ZrWlp0V3hTeHBsRFN2THFqaTRFeVpsU2xTY1l6LXFoMl9ZTjZ3cjdPRHhhWFRYLTJ1Zjg1aDBQZldfNDRpbmg0ZGZ2Wmw3OWVVQ3h1WjNqcGNHa0Y2dk5uVF9OMUlBQTNRSnhzdm9JVF84OVZsdHNzeEJJYVU5ekhXV1FZT21PRTBmVkVYUWVVTm4zenl3dURRN0JOaDZHdHBPbFA1bk5tRGdDbnhMQmdncFZxSFB3SFphNkpMeTctdTVhdTZ4TEMwSEwyME5jVjBuU0lxRVE1dVFJMHphWkJabTc2TGdCbjA1bnZwWUwydmRKeTF1N2xuUGlxUFVqczIzcXdJaW9kaUxmckt2SEZFVWpXWmVFa3hFODBVWlRFUnJqTGZFTXB1NUVpTk5TNDMzNlJ3cEtYckMxMUM3T1UtazVweHhGc1RFV0c2N2F1R2JxWXE2OVBtOExOUV94TG1vaTBVVDJwQWhndWNZekNIQ2JBaDhjWnF5a0daUHpzQWtsbV9oQW96bm9DVW1SQkZoQmp1UHJvM3dzaUFLWTY3YmNJUkdiX3hGYjlrQ1k3Q1lBTF9ZZ1RnWGtVamhwZmVLWW42RTQ5dlZqb3FvZnZoU0dSaEY2YzFtLXVkcC1wRVF5VzIxdFVpei02UF9yZmZwUnhKVXBEb3NhUXp6REY2WnhJWkp6bTZ0RXdCZEx0QzZjUkk2TS1vZmwzTEdGWEJDalJkM3N6R2stMHR3NkJLTlVtZXU4NG56ZWRiRmZuSGJDWXcyWWpuUURmbnN0Q3NiVE5ORE9RZGx5Z2JkQnBrUHB3TDExWGU5SllDenp0UW9UZXozV21BV2g5Z2thOXJQZk1lcGV3dTFjVThHMDJRNjNkN2ZHZk95LVZCb0hqM1RKSnRwM2dMSXdxczhmT1p0ZjBzWTZZVjFCN2dJazd6WHhtVDNSU3pONE1fZjBVa01xb3dpZ0RyYVc3V0VFdzR1QlBlTGx0elczbm0wSC1vaUxyY0RlVzhzZU9JY3VDVk5rM1prWC1kUEFKSm12OF9CT0hDc2ZMeUtlRy1KM0ZUT3NuQUs3ZVdyeTIwQ29PU1haVkswTUZQNUhIVXZwbWUwUEpBLWx4TnBaV2JBbDNNQVp6N0VqTHlINzRDdEZhRHZWUkZETHU1cG9ScjJnWFV2TXlXeFozak42RXdzMEFoMUhnNXlNaGFwdmxlcXdvNjJQTzlHcTIxM1Vsa0ZJQjZqbEs5NmFkR2dOT1lkcHBtVWFZblRma0FfZ2pyWGgzUEItdXJ1dWQ4eXpwdUh5OFJhNUFrZHlLZVVUQk1GYmxaekRYaVZOWko2RTloMkJlY2otT3VNc3I4anZlSktZQ1duT0hmckFyeFE5MDZIekFGVHBCcV9saTU5THduYzc4akZ3VjIyb0FGSnU3TjlFeTVGRVl2eGt4c2lkbnBRSHhkQkpXQW1ZX1ZVRllabXY5MUxCOC1hVUxHQXNleEhJaGF3V214b2YyZlRrSnBBX2sxSlVvMGhqWXJZR09Pa3lYMG5LeVF5cklTU3YwalVtME43dnc5OUlWX29NYW9nck9HaGVFMmxvYmtTX2VGbmxpakRwdEhfeTB1RlptN0tDSkh1WVBDOE5HanhyS25VN0JBbkRWVDdfZy12Q3dOSU1oVDB2Zmlvd2NJSjRFMDFWVFlSWEdjWU5WTk1Cd3FUa0dndEQ2X3hKQ0JpWUp6X3hMNGRja2V0MFI1NjlNdmY5c3lZWVhhZ0VvNXdSUTNJWVgyZEVCbTRUZnJlZ1JaQ2drZ1lNVzAtbE1zX1BzLV8weEVsbjF4b0xtZ0xZLWRxbmtsbzRCZ1BFajJQUi1mUEU5ZUMycGNBUlNsWHhVSWQtZ2pTRFBFZUQ4bmN5OXo5cHdEZVdneUxmRlJIblI3MUpuYnV6LVRFUC1oTDlWcGlUMnRsbHlObFZERGtXMGlnZ3dZRHpJV3BMYnpZUVRybTJUejM4Rl9KSFJkaGQ1LU4ybEY2aDE4UzYwTV92RlozRFBCaUVPb2J2aHFrTHpNSnBqU29weWg4a3g0bERNd3g2QzdDUjhXWTFlS1RwbHNBRVV6b29xMDFCSmhBT2J2MkplZU5naG1PLUJTOWZ3N0NrLTRxWEZPcmJwZktwd3NFN1RDeWFJeWJpNmt6bGVTYi1hRXo1cFM4aUFESlZyM1NyX2JXNVg4b3dycnJfMkF1WGVLNDAzdGl6cEdFcmItZURNSXRheXBobmhnWm5QTjVmWllKUzliampkSFA1VGU1LVlCT3d5NXZObmFCMFVfVGZCNHpTeE5HNEc2NFpsWU1wMUNSUURZNE1ZbjBRcnRGWV9BSmxKTW81MHl0UUpTX0RhNVNJdHJiLVZuazlkT2dsUXFDU05yRVNTcUNtWENTb1NtVm1MVmZheHhBUkd5eHVZYzd3bXZ2Z0RlY1U1VnY5dTdobUkxdTdIVkpkcW9UaGx6RE9yUDdERFlwRVVmeV9maUE0WmY1cXI0S3ppOWEta29EcGw4WkpHMVhWQWRjdC1BZ1U1N0ZhZmFqQVZPSE5tOHBBNDZuaUtxRGppRi1YMldXY3lIdWZ2UXVvNzlRNkI4RUtEN1l6ZDlfczFDaThIV3VlTXNVUXFtZWVGSzRRVThLam45dkxCYy4yZEcxV1NobDZ1bkRXdEdmd0c1ZmRR"}, [ 'Cache-Control',
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
  '437de592-3560-48a3-b70f-512d43568e4e',
=======
  '56533f35-2905-45e9-8a1d-1e95e47308df',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:40 GMT',
=======
  'Fri, 02 Aug 2019 00:50:11 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '11716' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangenerateabackupofakey-')
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
  '83c6f830-09ce-47fe-9f96-5a3d51494fab',
=======
  'ca19712f-c5ef-4cd3-9cb5-e54d237879c8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:40 GMT',
=======
  'Fri, 02 Aug 2019 00:50:11 GMT',
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
  '43b40cd9-ef49-47c1-95b6-124a411d2700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHDwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:41 GMT; path=/; secure; HttpOnly',
=======
  '82b68afe-41d4-4c81-a21f-c76ff6503000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHDwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:12 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:41 GMT',
=======
  'Fri, 02 Aug 2019 00:50:11 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-","deletedDate":1564681961,"scheduledPurgeDate":1572457961,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/c26261c0bc384332aa6dad6ab0e5541e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uoNV8cb71MQ2VoHqnJeO0jkJTPFZBcfmMhZ_8gu9qt1qgJlCy1-WvDxNzBohA0OcAVvEy-9R2AsoX9VJXdwFa37YyP-vJMJ8Q2PG0rk-hNag0p5L-QNU1uRz2f6av0fiGEnuxcCHEIbUdHwwKhbnmiKyUq6c4kUgQftVL8MvuJIJCPEyZEPHOCuW9CeKZfTeXcqhUaO-qbvO8wjHtQGg7tIdAgOkxRAPPesGdGAAc_vA8Mn0vAG1qo_Sj0QzsxLZp3ZunVokWenwQ9LuKNv83WmQBqFlGAllZDyvoA4JDpvqt_NVzY7Rap6cRBPOt9cbOdJq1rF0ys-HQp4X7Ls0vQ","e":"AQAB"},"attributes":{"enabled":true,"created":1564681960,"updated":1564681960,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-","deletedDate":1564707012,"scheduledPurgeDate":1572483012,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/a9349cebe9654e6287b4f867970a837f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tJGAz7hBC8MkefBISgmKusbl9H08IsDmh_PHZgPqXEiEsORkmdkNnDmDRhZOKFYCQASKEkkKPzubcjR6KOwuRZ455HoF4AeZxAUTeeJ_RTROdB-e0ZTRcNFUclYtFCLMrBbDtuEWFa_JJFE93Ly_RmS6_FIWTO_XVGDI2HXmL1PfAgim5YWUW_vUwYshmOhdd6qbEVUghkQn10sVuCU8jKPBbETijDa98c7wsI0MsCAsMHb47bonn55U48gzubsKosl31s9uFW_hdXCm2fML-QHpt7_8YWYErVcNFvIUh9PsEUo3m2IuYRDwdzgmIwC7UU8gwO4ixK06vhrh-uW5Zw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707010,"updated":1564707010,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'c8045fae-83a8-49de-90b5-426c8ec530a8',
=======
  '4ffe9507-a0e6-4645-a7fb-cf99d8364b76',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:42 GMT',
=======
  'Fri, 02 Aug 2019 00:50:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '879' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  '0022d043-0c22-4f8b-8c61-f13b9d8ce84a',
=======
  '071f18d5-c1a2-4e61-9130-c4ed0fafc83d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:41 GMT',
=======
  'Fri, 02 Aug 2019 00:50:12 GMT',
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
  'a24ac5ad-ad1a-46ea-9ee0-22bd90cf2200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHEAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:42 GMT; path=/; secure; HttpOnly',
=======
  '4e78aef6-9dde-4024-bd5a-daa579a63a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHEAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:12 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:42 GMT',
=======
  'Fri, 02 Aug 2019 00:50:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  '040a87b9-ac54-46b2-a312-d42261d9a2dd',
=======
  '315097eb-13b4-47ce-97ed-6ac159be60e7',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:42 GMT',
=======
  'Fri, 02 Aug 2019 00:50:12 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  '22ec8eae-d593-40af-9946-44279bd6b8e8',
=======
  'ae073ba9-7ab7-4ef3-9db8-d6844c8bb623',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:53 GMT',
=======
  'Fri, 02 Aug 2019 00:50:23 GMT',
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
  'c572730d-54f3-4966-99d8-d4e8e0902000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHEQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:53 GMT; path=/; secure; HttpOnly',
=======
  '27636235-8940-4ce9-9caa-55d640410000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHEQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:52 GMT',
=======
  'Fri, 02 Aug 2019 00:50:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'febcd310-27b5-47a4-b5dc-346438f219f6',
=======
  'e6b186b2-c1fb-419b-a8a3-a7c5e8a61418',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:52 GMT',
=======
  'Fri, 02 Aug 2019 00:50:23 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-failstogenerateabackupofanon-existingkey-/backup')
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
  'fd2dd58a-b19e-4239-8a98-f9d7946b9b34',
=======
  '8f189a29-849a-4768-bfbc-bb70189b6185',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:53 GMT',
=======
  'Fri, 02 Aug 2019 00:50:23 GMT',
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
  '4c291690-7b0d-454b-b1ac-3defe2882600',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHEgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:54 GMT; path=/; secure; HttpOnly',
=======
  '5905b8b0-d25c-4222-8d85-a904234a0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHEgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:24 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:53 GMT',
=======
  'Fri, 02 Aug 2019 00:50:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-failstogenerateabackupofanon-existingkey-/backup')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failstogenerateabackupofanon-existingkey-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
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
  '9d96ef5b-02e7-41d6-b690-dd8d83fff90b',
=======
  '36b76cf1-cb0c-482f-8762-539779b7baa6',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:53 GMT',
=======
  'Fri, 02 Aug 2019 00:50:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create')
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
  '9e27b26e-4aac-4c5b-9dbb-7e6df64b3065',
=======
  '19dcf383-1573-4205-9185-fc0ecefe9900',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:54 GMT',
=======
  'Fri, 02 Aug 2019 00:50:24 GMT',
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
  '6e19a3f6-8665-411f-b223-ec797d132a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHEwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:54 GMT; path=/; secure; HttpOnly',
=======
  '90e1adf2-ed92-4b0c-9be9-4324b7ab3200',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHEwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:25 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:54 GMT',
=======
  'Fri, 02 Aug 2019 00:50:24 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/63acdb9cb40049ef960269b0a1806df0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mUIdc0GYT5jPpgDBi0Hu6pH96eDRTPDKP8NT75pErIH9YfirxknPRcZ4yX3jWCTqZZJnd7bLuiEp-V7dYfuH8ZovZTk8vGZyDAzt_EwQzHMk9SfQiu2-Un2ABoo665aiw5bENndgjVXUtxnlocSPrNuxyKmAEPQRj0iHPKYHfVSZL95ju8CyBrKtD9ZHjypdsUiBuulmEPRGFj0QRfDJeIzU9TXC5L1U04zGF-i4ldapS1dNCgbHxzgOhOtofbFnassyx85k3A9YzSIKl_T7MsaYo3-QvxJo2YGcj4YSgBsdd-EpGK0-oUCfx6OwKEruw4uaZWrcGzJjUKxaBVuY7Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681975,"updated":1564681975,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/1562f28639b34e5b915763894b2539d2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rg-vBO_azk7ZPkj5ySYmGcVJnuxS7MFcBuIcVdzn5qfUOP0j0_HBH0yXPQNciRBl02T8163OFhP7IgmRVQm3ocB0qVrpnZzTUlHVQdNY63a68NIzOQPOXoXGR3SpUtYdm2nL26Evx6LRewm3d3hNA7lf7751XdDGnFKC6Vg19d7oVzy9Y29rPpgkbb-ZtSai0ND_MD5pRdMLBf4YSGyNyDC6HuCQGGLLY9mf7d5TEJ7Uu48na-zLuTjWg44PPtntsBVdfGR_bvr3r9uHUMOLGvc08O0C3Alb93T3V4bUHep5jaBvYFk0WxrYB2LYzOxrl5SCjuROCcRXIpuwh0G3Lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707025,"updated":1564707025,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '34795234-d8b4-44b4-9fee-612f85d97c02',
=======
  '44657754-b749-406c-bb3b-e8847c543063',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:55 GMT',
=======
  'Fri, 02 Aug 2019 00:50:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '708' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
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
  '121f3044-27ff-483e-805d-6d2e101769b4',
=======
  '58acc2f4-5649-4f73-8b3f-5984ee67a16f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:55 GMT',
=======
  'Fri, 02 Aug 2019 00:50:25 GMT',
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
  'a473c204-9f11-4e3d-b013-cccd216b2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHFAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:55 GMT; path=/; secure; HttpOnly',
=======
  '75c7167e-972c-4706-9311-e611d01c0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHFAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:55 GMT',
=======
  'Fri, 02 Aug 2019 00:50:25 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLllkaW5vTmJ0a1NkS2JBUmJUWlcybkNGdEdsSDBrVjhtYjRkbTlNaUZGSFE4dEx2UWJiaEV1eHQ3ZnIzREJxeE1kZVF4Y3ZwdVpnYzBrTDhHVEdZLURSTjFaWDBTRm5zbzlZS2JEY2dQaUpOdHVXU1pkOXlURmpmMFU5a0d6ejZGQUVEa05CaWZvaVRQQlhlLUhZTU5XRmR3M0xlOVRyRkhjWlVqaDd6ZGI3OWUyRDhkM1JDNjgxREFBaks1NFlKSDdBcWtSY2xoR0dLX0luX0l1TThDcWRvQlliNzEzcU5SOTZVTHc4dWZQTnhEa0JndWJQUzY5R2xWRmhyTUdQSllXUXBKd2d5bms3bGQyWktpWS1fX1BzeFdiLWNHWlFyYTRaWDFjUVNWejZVZUt0YTFud1hjUUhoTDZ2RDc1SmdyRXlabUtsTFd5Q05ab0x6enZFVVp0QS5PQVY4cGFXbUJnUFVnX2toQ0Z6MG13LlhCcTJPZVFwVGdHZVBma3Nmc1RfVUU5NlRKRVpCeUFkcG83OVBsLXJjakU3TDRJajRfSm9uTDBlaEFZTktiRlloeGYwMWFXLVlHcE5KSnZWa3ZxTlkwbHdGbFNtYkI2YXp2RTdCYXI2S211REsyX1NMYWdoX3dCVmIwSGd6bDR5OWZEWEVuY3dGUEdKbWdGMDhXVjhZNEFkbnZpSkxfMTJka09yRFo4MWV6QUJZcHd6bXZiU0JvbEJXcWRPREpBSzlMV09Qa1Q0b2hqdTAzZkl0TVZYYzlWMjdhdE5faEMzRUZvZEtteDI3aWZHRi00MGFRREZCZkNpU2lqTjhxT2ZMZnM5ZWJocEZLNkw4MGd0bmcwWngwb2xwendmaE04dlJGUGxCYlRZbHJtcUp6d1ZFSVZsdU85OFl2alB0cjl1R1ZNdWFLQjlQd1pSWmtkYmlLQXhkMkZNS1RjTE1ocU5tQWNkYnpiSDlyem5QaTJORVZEdktKd0VyZGlfaC11YTNEQTNYeXV3SEs3T254Nk5ZY01OS3JLODBWYkRVbXVJNUdGaWhiV0FlVjV2UnBUMmFhSkJQV0RGWS1LMzZ0ZXlfZTJVLTFDOWh6Yi1DYXJScXl5UmlpLVd5WS1xMklKSFBHSE1fbVNJb2o5SS14cGs0VVBrWFhfSXpZOUtlcEdUMDBYUVZsSENwYXA5TTBVVkVPT0JPcmg0eEV1UEpQbnhPLUVhX0NhT2lwVk1xdkpJdHhKR3VsVFBuV0k4NWdZbFZSWjBmVTc2TlVkaVRfRFdwWV9oVjZvQWQwQUtZbk1zU1ExbElOckNhazZ2MDkwUWV2NGczZmwxc1h4LWZWcXphQ0xYYVdxWTBmRzFXc0JGZUc5ZWRCbGlUZm1RbWdUa2RqcVUwS2I1UmUzUHpiSGRvd1d1bGluU01EUVlNR2IycTZDRkFtRVd0WWp5M0dycl90ZjVOclB4UXg0TmNfYVNCQ1JIRUctM0ttelVyb0g3UXBNeFRWOURTdTRucHJXQTIyV3pwcmcySXBEamZrZ3U3SGxpeE1rZWo5aU5hZzh3a0ozWV9FbUFVYUZBTWpaS0hBU2wyMXhILWh0Y1JUZEt3Qi1tSG9Tc0ZxRTR2cE13cGhzTlVCcXhELXduTktORFEtb1AxS01sVVJUUnNPbzllb3ZhNTRhSHRWZnE1ajdTVjVUa2kwUlBxeldOUVBWOG9ma3VwWFlxb3JRZWxTQkpFV2RXdGxSbUE0bWRwTkl6aW8wa051TG1oWTdNV0FXUGtRbTFlbjRFaWtqUy1qQmNCeE9LX1ZWbm5LM2RIcFJ4MWh4YmpyOEMwZG5ZRVo1T1BWd0xXLXNJT2pCVlBLYkMtWjktY2Rmcl9nNlRVUUZQV2NJemNsaWRPNHI5eUUxazVxWjJ6VGozNDBEUHpYTkdWSEt2bW9YTGg4OHpqYVpRTkNJeXdKejdUNXBGdUp4M0xNeVVEaVNheUlqdWJITkRSX2lRMUJpUHNwamN0amQzX3dMZlZSTWFjMWVxeXZ2Q0IycU84SDkzeWtLYjJZNkpMam4tQ2FPdmhmdFNTNHRkSGh3WXRZTko2S0dtd2F3d25Ra0I3NnhqckN2R2dLandBczRJTlBzVzI1LWliX0RRTW1OZHBjVUx5RU0yNGs0WWJQQ2Y0NUd0TFZabEg3eFdadlFOd2JiS1RkT1NicC1mLWlsXzBjUmFMQTJuRmVyZ3paZU5lSTFxSl9PV0stWU9RT3h3WDhUTXpOVHNPcEhFN2psdTdRczY3QUZTNUdUdnhucVA1V1FmNEN3MzBVY3hsX1ZtWl9wR2RSYUVpVUNZb3VLdnVIdnhTQ1BGTHNZY3ZNZDBrei1DSWZxa3NaT0tZQWxtYWZzSDRnZkpCQjM0RjA5d3ZnZVl0TEhxSk9UdmwtNlRVaGRpbzhhNUZtdUszdWtUSW85NnhCUThQbzViR0xySHphaXdkckZJU09zLU43SFdzQVh2SklhQVp2VE1COVZudTNRRWJsbkRZdnIteWE0YnpBYUVZSlVCNzlXOVU2X01UV3hmX3dLWEZCckREZGZxUkMyOFhUUVFiS0NtMEVDLUJPM1lMN3hnOFFTUm10bHpwbXNhRDYzTEZMZ3F2M1diN0tjejRfSlZrdFZJWThrekVleHduS0xFOHBTVkVuaWtsdHFnRG8yajlEc2lDNTBqR3QyNDNWNVZYU2MxWnhDYlQ5YVVFMlY0ZDZaeWg0dE84VmVaSWVfa01VREVScnlQci1mSUhJUzZBVmJxTHVLcVZqRmwtWkI5cjVLVThLd0JNeUhQZnRBX1dLdDFMSk12T0Mta0kxZ05NTGFTRXlTVWdRMnAwRWNFTWtiMkFkQXlxa3ZVTHFhQ05qeEdvZnBCTmJPVW1mSXFFWTl2dzN6alZWYjhUY1B4VTUtV2ZSU3MyOS1zdzRtQlg0ZmJHZG9SLUhYSnEwY29TcV8yaWJ0MHNKQTBnNGNTUXI1ZTQ4WWxkeHRWMEtPaV9CT3NZV0ZGU0NSeklCZHROTFU0alRGaUlnMGpFNU04TEhyN1dheUp3eEN6NENsZTBzR0dyTDdvU2hPRjhCWFR3Y1BELVZtSEVYM3hHcUIwekYyNHRXeHU4UThOMlZaT2pwVE9PZ25OU1doWkhZLW5GVUZlMk9LNzNGTG9SWWM1cFR6cXBsNUVOMF9vbWZVSzN5TnRDTW9WS2xCQ21RajF2LWZNYlRTaGpaWjB6SnRPR0JKVkVWdS1NR0ZXQ3JGOUZFLThWSEdKRVR3cG92THByYXlvZmJhdUw3SVFUbXRESjlkbGlWS0MyZDVXcF9aSlpoX1lqWGVOQTNVOUN0eVJ3ZFcxakRkRWxUMjNlWllkRE1uakliUUNKU2RQa2FlTmlKc1VpdklZbU9QOHRydEpVUmRfdy1KLW9FTE1qa3ctcGczbkwzdzBxU21XeE55dlN2TWhpcTMyR2NNc0RlbkZZR2k0eWM2TGhVelNYQldNamRZZzZHdGd2MHFQS3VyRVVVeXIzTHl0Qlo3TVlDTjFVM1FNdHN5WW5FUUtoSy01Mng5bUJZWWJ2VUJmandYUlR1Vjl2U2N6b0FyQ1ZIMGRLazZ3anBMT2UtNEJXZVFHVXJGOG4tTkk0WVJySEFRN3NkNUFGbTYtUGU5emNGbFRrZEFEZkdHQzl4MDhab2dhZ2ljdlFGRDNBR25xSXExVFpFS29IR1RYSWhWZ0RVZjlCRTZ5TmN2Qmlyb3ZmUnVXbnhYMVA0djhwcjZrWnh2emE0dWVXY3Nyei1aX2t2WGlKc0pKSTN4ckVhdHg3dW1CYUdsT21jTzZsLURaYUt1Nk5iUXBrYjZJQWlkT2VWNndTNHNKbS1DM0w1amhZN0JZVEVzWmFibUw0QTNDb0xGS0EzYlEtNjlNM0hYRWd1X0dybGtjenNnOTNwbTJUWVBXM3dqb2otY0FfQi1XMXNYM0tYUU9jakJBemwyVTJUaVlwYkN6OEktOG1zQUF4c0xEVUlpckFQd3dOeHlTdl9oYkNzQkdKM3dCZjN2dDh1MFFYdDhmUHdDaTRkMjNRU3Z5WWEyOHk3eHpkTmd0T3dMbkpiMHA0MnZPUUFzeUFXX09hQ2lKTkxMV1oyaUhVQkpsdWI5aERSdWh0cFFUQjh2X0ZiTEJuSmFYZGtsTjEzTzFFWnhwSWlGbnp6ZFFCLWJoRXkwS3RNZmt6d0JxWmQwRUYwY0JlcTVxNHZpQUZFYlNvQVJfT2p6LXJsYXRuZHVxMGVUbW4wQ1NQRndXRHhOay1kYkVVME5pTXVwYk80U184TVlWMlh4WHZnSlRCWEpqT2pJcVBITXlJVzkxcVN2SWRfcm1nSzlwa1RaZ2h5aUxfd0tla3QySDdDZ1ZsdFFQTlJfY3hSSG5PamdRWUlTU2JCeXZtMnJhNFNlWkJZVEZXbzZFblczaGFEQ2x2X2doOFMxNThsbTNtNWgwTnM4ajNwVWlxOWIwelpqaDZjSlhGbGlydGJERUtWa1FUbXIwM0lpVFd2aGRONkRud3c2TmM5b2hCNzB2Q2NKMDZwNDc5VE1CYTQwZm5Jc3lSSVhLRHZJWEIzcUJEVTdLS1o2SnhTN0tFVHlGQVFVSFFaOXRqQllmZVVVNTZoRFJxVFJaRXpiWG9EWkEzdDd2YTVRVTdUc2dvVnctTkVlOVdLaEctQml3SEh1UUZnTlUwVERYTFYtcUQ4Q2RXRW04QzZmNU44RFlvQmlIdnRNbnk3bGkxdDBBWDdmSVZYaE5xQ0JSaVd1bkF6eF8yZ2ViVjZRZFp2TlNJTWdMSXhkZWQtYmZ4RlpCVWx2cmdZc3FsV2U1b2ZzcUp3WWJFdHpKWm9ORUI5RWkxblh1SVZ3RHl3LWFvR3VHUWJRSGdaYnB4c3o5V2U0a05FT1p3dDZJOHA2RnNMQXpVN3FXdGdQcmpqcV9BZE1iVzJzNlJxbGtwQndfLWNNR2Z1VHhkVXhvQ0t4VFBtdkpJeVRYR1FpNldmV0w2NEQ0TENBZ3dFRFZRODczM0QzWGROUVVwNEZYSnlyRHJxMDF5TWxQdFJ3SXN3dWdEdU9uTDZQN0toVmI1QWFxRVdhdWRKZ3diVV92Vi16cWlVNmhPWWJpUnBLdlZkWlVTc2dCQzJ3eDhhaUdQVTVfa1FCMVUtS3JaR3VwQzVxYjVTX3l3YUswLWU4WFFHQmNoR3BCdVpmV1ZfYWVQVGxhUWtZN0liVE9pQVdLNEtHZVZjbFhCTVRXTVBXTFZ2Ri1fcVJrdUthZGpaSmtzSzFnbWx4c0ctQzJKbEhxYkZFN21KS0Ezd3J3RGRfdElTTWJ3MG4wUjZ2d3ZhTDMxSnM4UEJONXJlVXFjUVduNWZraURvTFpQdGVhZ0N5WU96T3J0cGhtOV9KMEo0dDE4RDNqdnFyeDVwa0szd3A0cllyUFRjSHNzUFFnN2YxY2tPSDJMZkVpaFlOSnFoTjBsSXNwRXJXT1VqR0F2VVB6bG9VVGowYTBGWTBXREo4MW9mYXNoVkszNFlaRU1lYTlIM3E4Rm9PTXg3YTFnQ0RaTUVTZ1RNbGZldzlzMHRyZ1VyM3hScU1kdTVrSEJlSTdpcWV4S1k2NS1Kd0VVMy1QTmJ5MEZDX3dVYk52TVl3MUY2RXo4S2tGZGpLR3c5T29IQW0tZ2VRallPWnVBOHF3T0x1NjF0TjZFQi10V1lxQllHS05EYTB5VGZHaFoyTnV1bDByX0RyOGlKMzRqOUIyNURfS19XdnNuMmxQZDlSTU1kRXUxRU9pekkxT1d0a1psTGlwRzBlNXNObXp1TUhXelBKb00xbGlrb0Z4WERuTEVTbXc4ai1xRTVKTXBHYk9lRDdzNVp1M3JkamNkTUVXVi1ZUUlMQXoteXJZRnVtVnZxMThZWmJQR0xSdHdMbDUxSElTbVJabmZTQ0prTjdtSUVtaEtLaHhaRHhfdUVJX2gtaGF0NzhzbEdzbUNYMnRjbVZ4ZDdmTElQaWdJNHlmdGZRMHNkV2M1dTUzNm1veFNnREVSNnY2cmlUczdjcTREUzdJNnRfTjd0X1E4WDFiLXVFSUdoLUZnVlJ0QjJpNzRLRHcyYWVtME16cUd0WmtjWGtnQzEzQk10SnQ5VUdaaEVBQUdmUFNVamRRdmZWVFUyek5mcHZxdG84dnQ0Sk81RllhX1VvQ3FwLXRqYk9YUllBXzJ6NkVSeVZfUmFmWVpJY24zLTZZNUktelg5bHNNb2FSSnd4YzBvcl9ob0hqdVVzMzBHYzB6QWsxaUFMS0RTdk5KSlNsVHVZMUdmc1Q4UkhWR0R4UHFQWm5yOEVKclJVTHE1U3UwMlRhelpTZEhEU2dSV3hZWFFCOGFSMi13ZjBzTjNSamdxTlhmT09SNnlkeHVFT2ZNR2JYZ3hKclJEU0dsR1oxcG83akoySnBTOTFEQmNtNExxUHhnMVQyc1NlTjZ4b2ZCOGZrR21YMDQ4ODYzeUpnb1Z5YnZ5OFppSWYzSE5QMDRNUHlPMlRuUzZNVXo2ZWhqT1dCTnozaU8zc0I0N3d2S0VzVDNKcG9CX0lnbGFyS2Zta1FSYVF1R0JzbHZteFh0OWFFdFZWdGZuZjhkYzBPVHdkTlZZZXg5Z3FKdkdvdkFkM1NuN2hoM3ZxVWx1UVlTWkYtZ2Z5NVgzNTdLSW9BbEZOZS1CcTUxTEFyTkVDTHFZZGFXMFdERzdENlhxaTVDMnQtQWpkMmxkaWsxQXBqbnlZanZxU0F2bXNKb1Y5alRaMWdvZC1EZkJHZ2lzZWozWGxDYk9ISUt3T1hwYU56Rms2VTZJeVU3amd0YmxjYmpiNWdHRjU5cXVZbmY5Q3FoNE5rXzNzbGI3WmFReDN2MkpZd3ZobDVLNUpSRnNpcFdIQVhfT1ZHY3BqZzlXNkxsZHVDWGRiQmhLa2gyQWZxeVNYanBWSExBTWFPS0NDUC1fMTN3TjFwWTJ1T2djdlJUSXQzNjk5YnBqQnFKMFNQVm1zRXFaM0pPSFNNM0xkRnB3UHFHblBPQ3J1eUV2cE9PQkRrNDVhVVRIYV9jWlc4cmpDckdHQ3IwYmo3c0JqTHF3a3BmUWdwZmpkdEF3WTVEYWpqTnNQRVM1bDU1ZGF0clE5bTlSUXlMaE5YTW84WVI4bnA3R2V6akdCUDYxTFJFbThBVTZmZC1KaGxsd0lwS1RDalUyZEFsY3pZLW9zM0NZZXZYMmNZWHF2WVR3RHpmQzFMNEFrMWoxek9DZlpNX1NfZDZaZmJhcXByVlpUS0U0d1BSWE90Y2stdlhJQVcyekpTajZVNWswWm1OR2NxdDIzSGl6NmQ2Y3V0TkkwcnIzcTZMZGo4SDZUWXlwTkhZWW1nNzh6UERYZVJMbXVjMEFmcEZ0OGdLcGFONl80TVdvcFgtcGEzWU4wUlVBUXNUaEdoQ0NZVlZBaEpKVHlkc0o3bEV2Y21jTG5RVkp0dmt0RWFpdmRfOEZKUXJ5VHJlaU1kbTZKYTkybEZrZW9UWm5KLWt5M1RoVE9uXzg2am9nTHQ2V0pvWktWQ1pyYi1lUW1xVmU3akl6cEY0SkM5YjdCV2RoS2xXSnRCU21YM1dmYXZlZU9Kc25kN3hWV1RvT2FVaDNKQmVkOTlOeVNaNkYyWUdfdV9GMkVGV0NBLWFvdEY4QnRFN2w3Ulo0dFBDOVdGOVpWcmg4TUhwSXMyYWlSVGhpNnhueXpYYjB3M1NZWnQxUjFnTGdiYUJSck1mZ20zUkZ0Y1NsV3dZVXp0VjdBODRNTkNKekh4NnlVVkZTTGJTdjUwRzhhTWg0cXpxcU1KcG1iSWFLUUxkXzVpR3hqSjRFMWJOQWk1TW9ndUY3TzdTeGYybDdPSkI4dDJFZ3JGekpKRTRqSy1iZUFTVS00LTVkZVk5dXdnenFnMGhNUTUtVzF4YXhCVHA4bUR2VVlIeFByUm1uZ181NjR1b3pabEl4UlRzWV9waXhHQTEyejdabXlNUTFXaG4tOE5jTU40Um5YdVY4aXFOcXlEQU05bEJFa3R2ZVhJVVJ6T3N5cmQ3Y0hTVzNoSzR2MXc5QVZXTUQ4blF1UU9RYnhvUUZhTDAxY21nUmdrSnN1OFVIUnNCek1JbzFTdjQyM1lxSnhVejA3NElITmlfM1NUeVZrdFRGM2RGbEJJVVgyQ2dGZ3hLdks2NE1leDRnMVZyWFIweHdaY0VVeVRCVjZBQ0RMRG55MFhyNjE2UV9McExGNzNIYS1MaVJYbVE3NmlRS1RheFp5QXkzNDJ6eFR2eFhfUEVXeE4xbnRGNldQOVctdGpiZllkNjJSYmI3NFdjdGZES3MxbjYxcTZ0TVVvUWx0ZkVTejhHeVVIN0h2Tk1nUWJMTkRhaHJlR3VJcUdDSTZVWU8zdklKd09wcWhjakxzX0hydlVGTnZsa01PVUNIOUE1cVhlS2cxOEJ5cTN6d053SG9fYnJKUjB6SndUN2pYdDdPamViVThuWGNYOEFUM0FkQ2pVY0JfVk9TQkhvYkJRRTVFdUFENU14dDFlUU9hRTM2WWN4NTdWbk0zS3lRWThKTGhjeml5MHVqZ0w3U2JTX2J0bE5zRTdTTk9RcHlZaXlRNTBveXhVQ0FkOTBMQ3ZMMVJwZ1JEN1BqRGFpazVmYVNSdnV2YUYwTlBtd08wNXhWVEw5aXlKVGFWMGpMcGg0OXR0UjVYVXVtQTVIM2xVOTVna1Jsdk9GUG1lbHhpaGFnamxUQ0dfd2ZVOXpLbzFvb082SjZmZ2FXNVRUOXp6U1V5TTh5VjlwdVViWkZhSFJlUnVYeE1WY1g5dzQtRFN5SkdSQktuWHh6b2NPUklrMVJJeUh5UkYwZWZ1NzF5ZWpQS0RBeS1fSHBPcHhnZzZJQzFQTnVKYUhOZ24wZDRUTTFjMmlpbGgxXzdReE1ZQ01hSlE1VmVfSHdOeU9mbzMyREVwczZCMS11dEhfYk5qWmhYa3RtMnJ6OXdUMTMwZkMtcl9vLXdMX29ySlM5ZXNMdkotSWQyUFVFN0ZSYVVvWlhULWNBU0RUTkVsUmJTbWk5NVdCOGpwSzR2VTE5QzFERmhFSE1BMXJFV1ZJQUNZZ210eFMyN1RjU2VtSWJIb0liOG9neDREaU9ZeFd2OEE4a1daVkxTZW1jQW1DeklkSFNUNUdKQU14OWwxcno3OWFpUzA3dmJHQkQ3ZHRRbC0xSk5JaFI4dXZVWXhJYnNVVm9xSUtLOTdWTVdodVdqTU9Gd2xrd0psQjFxU0RUQlJtSWJKN1dlZVFsbXJ3NkJjLTRQMWh1WWJNMHk0U2Ywak5IQUxWTUNFUk12X1Q3MFZKOXdqLTZfaUgzd2ZST19fRE04LTlUaVpwYkJiZWFFblBMbHVLbDhCQmMyczF1SUJxMExwaWFGMHBuUTV0ZHZxbUprMG54VmlQeVlIWmRJNWZFTllSRG1Db0prYjlROEpodXFnd1J6cG9vY2I3ekRLMl9YSmZmTXFTYWZUT2x6RzdfdlluUlJSbjJhZjdFYzRId0w2TE1rYXpIbHh5dEN6SmNfUTBJQTFNbG1qenJCTTktVUNwMjVTRUwxanVVbG1ZMWpON0doa2gzR1R2MnlPVlFNeGxXMVJta1NCZEsxakVRTVdwdGV0LUJRMDBjZjhjREo0dnVIS004aXI5UzhHYi1OUDZOTVpraDF3NjZyQ2RXdTlZMmVHNjdZZ3gzNTByckhaX2RPTERHc01HVGhwXzJxOGpyNUVsbm1HUmtrU0lJZ1QxdkZvSDRZb092bTViVHNHZTlzbjZqSHM4MzRKbVBXS3BqX01qbDM5M0JXLVphdVNMZi0zLUNDTGRqdmxSaTRLbDh4TG9yWGRpMlktVkRBUE1wV04tai0wR0VSNGptNm1jYUpWaFFpTl94OWRMZHhSTElMY1NGZGhDYjI5c3VQQzJmMUxRRldSM3JvazhQNHVXbnRNREhMRXQ4V3E3MVVnMy1CVnpMd3NiaU9ob1g2YzAzbUJKNXNqYy1VYy15MlMwMkY5WnVud3dsekgxYVJaaDVkOW9PUFhRU0oySnJJWXF6ZGgxT0UzWFNsa2pmaDEzTjhzWUN4a1NxM1NKbjRoRndIUTZoeUdhZjh4R3Myd1J2aTF6VW1fZWFncHNHQUZ3Sjd3bU82ZzNHRmY0MmN0eGtZRzNfd0Nzd1R6bWphejN1c2FWVHBFZnV5X2Nseko3U3VBaGx6MFJ3VWNBZXl4eFdZUWQ0UkVDZWFqQ1o5Q3J5d0Fwd0FweVBZb0RSOXJxdWRHbzlndE5QMDJtSHNBV2RZZmZiLUdaaUlYRW5wNGVkcS1vWUl3N3RPa2UwbFFfaW1KOWN0VGpaZ2k3TF81T0VPUVpFRGNkeklXdlk0bWc0cUlXMjl0dHZ6LXNycnp1d1RhN21qdVhrMG5jUmJtUHpEWFFnVnhyOFF5a1JpQ0V4UlFpeXdSZk1ObmJ5b0hzV0paVnRPVlNnU0ZNMkRYTG1Jck9pUmNPRE9RMXBYTzFIV3drTld0enFoVVFqQi1KUVpIZm1DdkdjZFNPTG4xV3A3eGFnay1IQm1abDVJeHJHaFdCLXJmQktPdFpjVHZnYXh6Z0Zobk40LVR3YjZSdjVYNVRRbnRScEZYeEVUd09rYTctdnMtcEpobm9ic21IXzFjRFhZVEhlU1RRSFk2MEhpSndJV1A4WWc1UFp1Y2hDWDZFWXVIRGRfbjlSZnBwWldjRmZZcTZlUFhRbWVIa25sQk51dFVwT01NdzVMYU5vVXJycGdTQXcxLXVEZV9VckhxUVZpaXRINzBmS1V6aTRMeVFzOTZSMjVQTTctYk96RW5TemdqeVc1MXVSZEdMN0dLbzJfVDNCVVIydkJrQVB5N19CX2V2a3BlTmdyODZSUFk2cWRDV2xMYzExbEVfR0hwUFpUQ21RWTl4MHNEVjNTQWhLTXhKZTdBa1gtUERDRDdBRzVXMm1xSnJDSzhoRy1kYzE2d0k1ejFUcHJXcGFlTzZQMmtfekdUV1JjZ1RoLUJ5enRPZnJpTmNmWnJRQTJMa1BTcmh3cTQ5LXhXcGJFREtyb1ZfaXVMN1RUUzVzaVJYZ2thdlpsc19ScGFqNVlZWjJwQUdibjBKTkJCdngzM0pMVUNsR0N2bzdfaFBRczJHTFR4Z1h6di1HZlVwdWRDbXNNbHU5VVNZNUpVTV9KOF8zMGZjVXF0YWxqaHRZRVlHQkdfN1JJT1RiQkNuYkNpSFdWMEM5NjNEbmloZ2tXZVpZVExHZ1ZFcndaeDREQ3dKSkliQm1RdVU1Tm5sZ0FxbnlxanBrMkVjcVBwMWJJTmZBM1ItOXBfcE1FcnA1NXYtSFFCQjdRcEQ1NWs4T3k1VGE4V055ejRwR2FxM2E1Rkg0aTB0cXV1dVFYZVZmeXBkYmptcTY0eWc3Z0J4QmpDZndCZkU4emYxMnM5UHZjWVZadnBKTThOWDFyeURraTV2anBNNGJwenVuUng1aTZrY01nWC4yQW5vdGRSRHZsU1Y1OG45a3YxT3VR"}, [ 'Cache-Control',
=======
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLldZMDNvMnRhUnB4ajZwTzFUZDA1NTJ2RlpSVl9sZUp0OHpacVI3d1ZUUnFxZ2lzenpqN2ZXVDNKV0tlVFhta09IMUhJd3JzbUNIMGZaUDUwSUk5eW56cXloV3ZvVnhLakNPbnV5ak11Y2lxRXR4a0VxNDBzSkJwTGF0SEJSYkQwRThxT3d1RVpGbDI1T0RuaTA0ZGNTVTRfenFWbmItN25tT1hyc1lwY3NsWlhFNmJwNkRzY0FuSTZMcC1kZER6S2V4Vm1idXAwRWxSNGVCU0pOYjNlaG0yNDQtTnhYVTN3bTR3a2s1Qk9wZC1TYnlwbFl6aDRGTjktdjRVYV9hQlljOHlJMjdSNFZNU3BkbFlpWlFadHk2LW50UWg3LTJzUTAteUViTW9XQWVnUGNPcld0NHF6Q2tHOFpKNHRmRGFFdUVyY0ZkQ3RfeDZJMVVnSnJXb2daUS5VS2U0ZElaM2RkSzBhOTRLMFI5aUd3LkJKNGxTb25fYThQM096RlZqNVBIUm5scTFuMXpBVWxHNU40LVZwTkxEMzBDSGw2eFh5WTVuQzFLRFdZNzJzWlRNVVdPQkpjcXdaa1I3QjhFQUZTS0JiM2JKdnJ4X0JkSUVia1ZGUzBkcXR4TmR5SnZJOG41WmJJa21OcDZUSWRFc3FzWTMzOUJ6N2sweno0QVBLS1hNX1d6YnFTbmNOdWdzUTVxWTV6YmhFMFJNdy1Pb3FCbWxQYWVQWUl1WUxXNktUZVZlZmRKQ1lGSld2Y2dRcG13dFUwTlAtMEZmaWxYUU1BYWN4SzBETmlybU9rWEJsdzVvQlZRbHZENHNxRWF0MjgxcWxUYl82MnVuaGpJQzJFcklWWWlQajlFQlRNb0lHRk9MekRJN1otRWt4SFg1SXptTmg2a2tTcGxOVVphMTFTLVpMczhtWnNxMXJWcVZVXzZPeVlfQTZ2M2FVVkhPcDAwaWFyQnl3Mk1kS3l6UmNHS2RNYmhIUXZDVkZPbUY2aEU3d3psczVTTnkycDdJWUVEdTdNN19oX2MwUG1haXBMQzN4TnZ6eEdXNXdvb1NqMDB1MlFId0pXdEs1bVFZbWNBN1N6R1R0eVBFb3dZdEJmZ3FrNVFyT1NKSEtWblMyOUdIODF0OVRSQzViT1MyWlBELVNOMkszWnY4eGtEV2kyb28zRmVJX1F5cW5ISUExTVlWQlBEbVhsRkVfWnhxT1Z5MjIwamNYY05rdG80YXFDRzNEWVhablhLakZGSXk5czU1blZOVGJuVnQzVW1WRVVvQzhTdzFKRkpoYVRCNDRCZGdwVlFGb1UxU0s0VExUNk5ReXhHNi1ERmFBbks2Q3JLU1B3TVd0VDBWX19ZYjd5akVrLWRtb2c2S3lkdlVzb0lubkFTeEU5SzJoOHRjcjZsR2dLOXMxZmozQUtkNTAxRTBBQXI5cFNabXIwYzdETktjR0liblBzUGxERVB4QnY3WnFldnUwS1JhTnFrRkY5NjBDSXNFQ2wwOTdjaFZxVTlhVUlMMjcxcVFtc1A4a0dRM1B0WXNRQmZMSmNURk1iRXhtS0t4Rm9kR1hpaWxZVk94UFhVMk1feU1GTU5JLTVTbEYzcHBUMi13czhqMHJFaExXamFOdjFtZ2p1NE93NFFBd3VtOGV6OWtfQVU2TmlMUzh3R185NW93UE5HNUp5QmJ3SmVoZms2NEZrRE1DTU1GZ3BuWUFGRkdZWV9HUWk1cGU1bGpXUVI0eWJxZ0podUs3WjdneTdNczY4X3NzNXZHSDYwNEtDVnRlZmFBRUVIdjdVanJGLTJldFBDLUxYRVFZaElGeUFUU1hZYTI3Vkc2Nno3SlNoNHhOZnpGc2o1cUx4Ml8zS0RBTG9BLUFBNTNnNUZJLVpMeGw1OVpxTlJaNUFFSHhUb05xWEhWWTdnMUZjRWd0aHNQNGhUYVFCSlg3SklhU01vWDd3M0s2cDZGOWNoY051dTI2QnVLd3hoMjAxc2wzb0R1UDB6V282YXRfV2ZLTFNYRGVoeEo3YlQtdUtxNUNSRElDQjBua3RicTNhTDY1elh1WFVhTG9EbGVTMG9wZzUwVFFleGhxTWEyZFhvSzAtbUo0RHF0VjN6RXQxOWc3SDRNY3htVnFmdUEwdS1Sa0NaaUFxUnNJWjdlOGlKQjBNcVZyYU1OdWVCOUUwYWVieHNhLWNNUjdjSnR1Yk1vU1ZlOTF2MjVINHVtVjlOZ2RjSkxleDktQUxVb3JOemVtRk9zWWQyeFBycVM0d0ZZM1JuN1ppN1JZMUU3QmV1N1JwQWhSTnJjVGk5eXNsS0ZIeng4OW1xM3hIUVEyZmRLd3hiNmF5ZFQ5U0JXRGdpNkVSaHFNRDRyc2cwdnFuRW5ySXJIcmRfSFBVZGhXZnlkbVNfZU5jUFJMTWZEa3BFLU5BeGZLQm1EeHFmNjVIOTJ3NWZxblhYM3k0a0llQVJabDJEMEQ3YVV4SE1wTXZrVmoxLUxrZDRXOEh0c2Q3M25ySEFYU1FnOUZ0NXhrcDZ5OWNrUnVNby1BTG1SWXVmLTZ1TS1DekVqNnFieHgzNE5TQjZQQ3ZMMzM3VFIxYzZUaTNVZDViU1RSazJQMDhPanZXY253NVlwUnV2VEpKVWpnTEdBSUU4VF9kd0x0SGw4cVNuTEFvQjBpbUJaNmx2TmhYNGxhcDN6eFdQRy1lWWRRckpGZnNXNER2SV9qWmV0QTFNaXZ4aDlDX2EtNmtqYUMzNFNNQ2psbXpha0ZoNzVIcFd4NDlweFp2ZHdpUFVvZngtd1YzTzlwN3lsY2FUSVE1cmxoZnhCdHR6X2JtTWY3LWNLQ213Y0FrZkcyajZrY2RnUUI1clEzTGdJTWxKeTMtX01LeDJtUmVBWjZON0pUQlRwQzVFdUZ4M1p5Q3o3eE5HbjlYSlNSNUhNS3pLSWVqOWlQaFhEeVUtNGNzbEZha0RzSjVENW9MQUlCUndxU29QcEUtTElJWk8yVE1KZXlFTzYzZ2tYbk5EVGpOeGtISFdLanBNaGFCS1lIT1dRWnp5cXJEelFseUgyd3ZvYXRWUVBJVE0xOHVhR1Z2cXBuUHd1UGhJSk9NdC1TTkY1eEdLbklzTm9MT3d0NTNBeVBSNU1QTTFiaDFncE91V3pSbEE1NWJfVy1NdXNrZTFLUU1rQmZQUGxPdlpmMTVQeHpHcFVKRmRyY09hb3dKeFVNTG5VdllLVkxxNzhCU2NwY3QybzBLbThtUGRONmRIeF81c1FhR0lTcktrSzAxS0Robnl2NGdwVGxGOXcyOGdjdUJQdlY3SjV0Umk5RDNQSlV6Zmo5dmRuZUE0ZDdFSzRwSVlOQzJQZHdNMTRaYWU4RWoxamh2UVQ1NWI2LUVPRlJ0UzQxLVUya3E1VWZ6bThYRjZMbVE0TmFuZGhFLXo2cVZINUJ2bWRyWHlveG5tS2JwcHdVam4wd1YyUExfdkYzakZLa3lydXJRaTB1VjZOMGpUUTUxclgzYm0yUGRZQ0Z6LTNabC12STBtazRMT2NiLVNGYm03WWNXM1F6ZXQ1VnhjM0p4U3dZUEpnc3BXWDNGZ3U4TWViTFZwZVFfTW1CYXJ0N3ZkSVRMX0x4TWV0WmJyOXcwRmkwOU9vTVI1Z3RjdGlZLTVfamd3ek5zQTBBNmFQeW51eFk3VEZBekZrODk0eGxPLW1QMVdRcjFGVGNRZG1pNnJqQ241R1A4MWc1M0daMWJOV2JYUHV4NVBmX2lMR2dmckRpZ3ZFWDVWUzZsUUZ6X0tnOGd6bnFkNnJ3M0tEUXdoRUllc0Q5U3VRa3c3RGNCZmx1YkdRUEh4QTh2cDNUZktPSkhVN1BpUzdHOGpsanJDQ1NjaFI2V2NfZjY2YkxZa1NUclBuLWZWY09fUkdyYjR4UVdkQWJ4WnY0REVtRklkNjVYLTcwN2g1T3prcXpWbXJqWlB5angxSXJvbjNqSWV6UmUtMl9ZUTFuQThYd3lWaHlBYW1POEFIZTV0NHQ3bUxxZGhLd2dTVHdrblQtVGNEV25HVFN4bWRlXzJmN1dvQjZRZ245aE1odnV0N3JDbEFnX0RkaERzUXpMNzNmeVE1VWUzZ1c2M2pURGZfUTVjNEs0cEtNUUhHQmxjckF3Qk1KNWtUVHpVQWhWQVYwRklXRUJ3ZTRLZzJfVk85MnB2TGhBazczWHNWTEF1clVXcjUzeGZkVWhscjhzX2FOcWpNTzhWSmlaYnJiQzFGQUtwUFZGS0RBTTE1cVlyOXdFRWtJLW4zdEcwbUhpeHpCeEFHYWxXZDAxTEFfdEVvSEV0V3ZEbG9wWjhtZ2tFcDdYNlBEczRaWHFpNjZNd3JfUkdjWk5xT3ZWMXpnNk95elNCU1d4eVdoRTA3REJIUl9QTkVhZ1NBbnFZU1duY1A4bFlLcU1FWUJoZjBua2JxUzlZOVJSWVNvS2NXRVo5eS1xTjN4a0IxSjFOOWtmSElvbHRzRURGWlpZUEFGODZzbnRaNm8yTkowMllSTERKS1R1X1F3SU0taUFXdUZuOEhRZDlhVDgydWNpOGp1dDV2dW9CTmluRTZsNnNFSHN5bEdtY29FZ2pFYXdFUThVUUN2WTFTRjRhcGd3b0NsOXhibDRVMEVjWERJejVoVmR1OERHVG9TUHlCT2t3Qm1tLTVidlFpenk0b3BtN3NXRGhxVWRtUG9YYkpVWVRrV3BNczQ2RGJucXBFTDRzaDJfd0M1NC1fTEVMR1dqdGl4UjBPWEg3REtNeFhVTUVLZzdLeHZfX0k5SXBlYUhhVUJ5dFhsSnVjZHcwc3B5TTNscWZYQWNUZS03TV85eWk3eGlsX19XeHdHQlFOMEpnOF9xYmgtOFF2YUhxcFVWeHpIMXFNb1pvamVzZkVzb1o0YXBzQ0FPbzlEYkg1NlhacDNfQ21TazhjLUpMTk1TbjNsaEFXdzVHandPS0tvaDRmZjhXbDFSbFRSUUNQTEoyM0pweTVHLXdTYnlnRlRubnFGUnhIUVF3UHkwR0lsOUxEV3dyRnhTTVZDR0JZbFBIUVdrWWVpcXRYOWY2NWdoUG5Gc3A3M1M4Wjh4WnpIcllDcTBxemRHNEFZTjNJazVmek5LLVZLUmZfV3VZVWNaeTE4RTB0aDRnOVF5R0dUSmpNa2hiVU5MMkFPWHRwdjY5TVhrdHhvYnNmRW1hcGlEeG4tQ1Z2UlRGZmRmU3Rpd0pqT0QzVkhWazRvUnlGYjdrd1hhYUx2X3FYTWJWZzh4RFNCR3lPWlBHazRMblFTc3R3cnNTZW4tYkR4azdoT29mRENRYkNRemE4cU9rS09pVDBvS2pTUE0tcm00ZmRGV3Nmd1otcmtibWJfR1RXd1RhY19xeTJTT1JCOF9ORkRCQkp0Q20xR3JlbWR3MVRUZDRnb0phN2NORUs3Q2RVUHNaTG5VNlhSdC1ldTdkaFZPMVJxckFBSkdXbkRFd3pVOVh3RzhrdlpMcVhRR0oyTW9NMFl6Q1JYT0lxbUJtd3pIYnMzYnZ1OGsxUk1vREhNc0g2QlE0VnlJa21zaGw3c1pDTkM4b0dfQlBIc196VE8ybmZYbHdwNFgyTVJMRUNkT1hfRkY3eDVRSF9sbGVGbU5VaXZVT2pQUGl3MDRYY2E5eTYyY2l2azloNWhESFd6eVE2Vk1CdHRUMV85R3pTM3RLWUVDc3hLOWctVTg0M2h3cmg3S2tqT2VQQjhieWV0cjlDdEt3bjFNTlBzLV9XNy1ITktHeG9iNC1zRmpEbW9SWHlaTURGSTJOUVBEMlE5d0Z0STh2eE9VSnZzeWVjUEtQTHZJMllXbjM3UU80TnVXQ0UzNDE0T2Vhb2RlSnVGazJ3VldaM2ZQOXZic2h0aEdBZmZmdmNSX3ZtRnZHQldZSXd1cTlVVi1ZZXJZQkVRU1NXU1NkcXcxYXJQZnUwVUNhcENYVG92WDl4bFRLSWMwV2UwMGFfRjBuUDV4dDk3QzRDTklMSTF5aEZISlRvQzZWZkZtM1lhSm9qX1lMc2xqVGtNajNPUUxrWnkycXpKenZCdlM2LXR3RkVfZ0xDQ3dkYl9za1FBcUx0Y0NUNUI4RW50SkotdEE5UHM5TGpxV3VaN2JDVjdkTlpZZEtoZjItQnk0dWVmbGV0WXRzWlphV2stWXV1V19tdmNiM2hvQTFQQU5hYXN3ekdlVjh5LVNfc1R0UFUzWHZqMG5PeFJMbjQ4YnhjaFc5ZG1ra2k0ZTBfdElYbzVBSlJ6dFhNTFllYkVtQkxhYXdpSnJiSUwtLVBpMTV1Wkhob0JBcmdXV0R0NS1fZGc3aHVpd3hOQzhWR1QzLUhNd1hSU2dmUEJhNnJZajFjM3c5N3o4a2xDRWlDMG00VURkYjVXUEtONi1BRDFUMm9KbGltZFpRa2xnT1VCaXlSVmpRRWxDRmFESEFkWVI0MkxqQUJPWk16blFQQ0xqaEs1THVBT0VDMDQxeFdsWlVMRG1DaGRhZGM0cy1zVHpSZ29qQzk5R0VuNDl2X3o1NGtwVDlZTlZlbDA1YXd6MWk3TENicW55REliTWJ1LXBMUjJESkVab0FUYkROVmRnM24xOWpEZ1RVVzYxNEZQZFAxWFpIeWdKTi1wV1lLckV4MWc0dW5EZHJsZy0tNEh1aHRYUGpoekEyOUNjVnh2VTR6N2pPMXdld2htNGdyMmthRHo1VGNEWUc5RXlkLVdoTFFLUHRJUEQyUkhkU0kxRUVrazltM1NsZnQyX3NoX3luWThPaU1CZlgtbWVhOU5NcldqOHhqTkNfWWhuX19zUmk4Y0I1UFZ3Z2RuUUV4VDZ4S3dJLXBNQXIxV3h0ZEZfRmV3SUwwSVJGaFJsQTBlUkw5S09MNGNLRGozRzlqQ3B3S3RHWkxhUW9BV3c2dHVsdFU2a25yeDY4NGRZazRBOFNfZXBUeE85U3d3U3YyYmY1cXFOUkoyU3dwR0VlMjkwWlNiZjdXbklKa0hoRmdZeE9lTUp2czBWUEcxWVN4SENzQmFOWnlUWTFYeTFtMmU3MnNmZzZ6ZVNPckVwQno5Ml9XMl9hbGdSRHd3UlhhRTc5Y0pqRVNpSnVUU3pqaXRkN091aXB4NklXdTBsREEyeE91TjE5MFN1ejVQMm9VRW5iLW9wR1ZhYnRQU2pRSElBd0I3ZlF3eUpMTmtyQ2UtX3F1Y0ZnbHVfTk95N1V2YVFKSEtUb3AySTlYUkd5TE52NjN1Qkprbm9KN1pTWTRSZG03bi1nSHIwQ055SkROenFKekN6WmhEQTZXWHpKd2RrLVFqR2p6aHBjRTVVMm9qcDBvYzd0YzRkaHo1b0ZmS0E5eEc3UTZla2Y1TU9rMkdSRlJWSE1pYklMc21MTnVFckFzd2dmVWxNeHUyUDVQNnlhcE5pcXNEMXYxQkJFNUI2NV9WSEluTktuVW1LMEFJb1V3aFlXTTREZUVGa0ptZm02Zkh5R0xMd1IxZFF0YXBZY0N4Q2ZaRDNWcl9wSjNZbFFDZk1HOGRSQnJUeTY5S2F1X0xJNlpmTmV5dEdCTWFNdGJFb1NaTFM4WVNOWGV0Y0RDZmJkVXVNcm5HdkN6TWg0aW8tc0VtVzdtQWgwbXA4WmQ1aXRqcTdIWFVjSnVZcFJOOHhkUEVJOEFtSEZrZzR0dk5XR2pYSXVnazVhNDhmZWZaZ1JnYXFHQVNidEJjYnN4SlY0aFhzRHFSaUEtajgxYVJBLWlnT2hRTzRaQXFNNzQtOUNLUk5PcXdIVWRWS3BmN0tEY2ozRHBYdW1tVGZpZkNoV25JUnhfLWI0MkZZV1ctakNuXzJLOHhuRXY3d19PRHdMbWpQZnh1OEV2SUlUcW1mRk9NOHZaMGJTWEQ0Q0IwdWQtWjNWTVpiSDk1a0J0VkEwSVgzSWNab2NGMVd3T0FPenpUQ2dMZHZOSzd3NmdBZm4yR3FwXzJibXNRN1VrZi1DSXlyY3lDQUZsVF9RcTA2clJ0WGxWLUlYNlUzLWtMV1NaMVdQNUR5ZHVnTXN4aG5BeFlmb2R5dkNVcVFxa01EdnE3VVRoalJORU1wZkw4MGJ4bzBzWDM0cE9KbVZJS3BMOEhjNVNXRWJINW9hczNERUQtaUlrb252VHBWa1dmQ2tyOFdPWklJQ2FPVS1zZkVVTUxRTFZpVl9PSFJsWDU5bEVadF9SZDlSR0J2NkR4eTZ2TGNPVTVSZnQ0djVrc3hKMkhJOTJqUkFVTzRJNFRYQmFuX2RzX0laWFpXT29iRm95LUNiX3d0NWlvSmdyWjZ0dW4wMV82ZnZyTDVDaUhHSzMtWXljS25YLUdmZ21pSnFfb0hSanFQMnhPSVNnSV82QXpVODVIcWtSN1FVbUNBRlh4aUYzd19uUURha0hnTXJnYzNtejZnRWk1V2N1TUtadTJwSXhldExMM1BQV3dTVE04aEJRc1JkeXlaaVpOMF9DUkxkeUw5OW1laG5kbHdVQVR6emxjcTAyUGRXdVNYVVkzR0JCaXVBYVExNTU3NGx6STV0WjJRWVBkdDdCTzVTS1NwMllTLVBhU2hTMnA1MUxXdXg5VnNueG1oWFpvMmRDT2RoN1B3eUhTNW9SN2J4T3h0akFXMnBwcUZVZ3R1aVFIWV92eVEyUEQxZ0w0RzkydXRicXd5bzByM0J1LUloNV9JUGtwUVhyZ0ZMMWM5eWJINnlEVGlyZk9zVTBrZkpaenhHYzN2bUJXZFZJUDA4QnNoTjRiQ1VfYVVBSjk0cGVwT3N1Z2pFTzZwLXZpUHVSR3VDcWxBcXZya2IteGwxR3NWeHZleEh3VVlacEs1ZnhxOHprNmh3STNtS1p1T3JfLWFscHVlWWw3MUJSUTBOOW44b0s5UUFBZ3hrc0lEZGxuc1IxWW52UXp5S291N1JhdjY3MkV0QTYtLTlRMEdGenhJbUVzQjBya0h6MUxzS3MtNWRESjA4d05MVTFXWllCTUlYWDNpb2huWHhCbjlsbWhJLWlXS1d5ZHpsV28tRmdNSnEybUhqbnp5NVdQck5HbmJ0TzRGeVR5LTE4bnJ6d0FHZFI4QTJaWC1oUWh2OFZWRXhhM3c5WkYySmMwdXBaRVE1dHFlRHlTUXFFY0prVHVwTW5ERWd0VjZ5ejhyM1ltdXliSzg5WDdRWW9CeHFybkxxbzFLZ2QtWW41Sy1nSklxcmlaTGF1TG5SYkVUME8zXzgyajlGdGxRRGZYdU44cUktbEdKQ1Q4SDJ3djlVUEZnNW1IU0VtQXdXOUxNZEEwN3d4ZnBlbng5eFIxN21JaFFianFraXFUY0dTZEJ2bldFY2gzSnFiNmFCb05mS2poakZoR1J4T1prc1JzOGFaWGZHQlJ5a1N0VmpPMG1IZGx3bVBQcklPY0pUc2YzNkExdmt3TXd6T0xSeW5RWU95RURXUU9oaEw5cEU3NFhfYkNCVEMydkVvUkt1QXhtRDVuSGFSakgwMVQwTGltdG5ScFZpeVFSb0NZYWU4d3VxNlU0RWlwaG51NUxOWlJyQTZTbm9yQU02dmlOQWRBdXFoNENPMU5IMks4STAxUXhLNnNwcVc2Z1l4WUFlQi05ZXRzT1lSdG9HRVdLTlhLRGJCcXlsYUxLS1JoT3NhX1paNlYwSWxmOVJQQ1Raalpsa2dvSVA2b3BoU3lHSTVrWlFXcXJrak8zdWh6ek9IYzNyMlJ0N3dLdzFsdE1sRmVjd0taUTNtUHZWX3h1ZHZHVzZtRGpsQ2ZtMldqOUMwY3JPcS1sT3R1N1FRLXN4UDkzUE5MZF8zcWN4RDNsbWVHb0RFTXBtdml5ck1rZ3VLdmJyS1ZQYmNjeHFCa3NJZzRiY19PZy1tamQwU01tTnZEczNKOHFEcENnN1EyY1pEUkljZFVJWmdPaHhsNGh0VDQwc05ON01LYVFodHhSNzBncHlxRWVob2pRbFc4WXFXSENyaUtYbjFnY3NtUWZVWFFIbnB3Mi0zNHJLRU5BcnNiRWx6S2dvdDR5a3N1eHhDUmNlUk1TYXZhbGJ5aC1xSmxCcFJXOENCbVJVRC14aGV0cWloYXlkTkVnalcxbUlVMUFzQzhWMC1tMngwM0g1bGZHYXhBMVRlU2NJQ0JpQnM5M01CUmJQOGVZY0Q0LVdxakFmNTk4UXBiMFEwS0VaUVRFQ3dSLUQ1RHNveUY3ZFRDdUJIZ0pKUEd2WFRrZm1VUnlQemgyZFFfUFFnd3RMTlkxLWEyRDBwWnotakNfQ3o2RkJuLUhSOHBuSHl2aWxMMHpMWW9kZ1NLUkZrNnM3cVd6R2FlSEUwXy1JUkY3Vi1OVzNwTWh5YWpEX3NKLWJXb2RDOTBsLUJXQ01mWlF4b2wtd21qSkI3X05xZkFNeENhN3lzMlVubmNwenZaQ1JZdWRhbnlyQmdEMldKYXJPQmdsVW1oT0tHV1B1RjBLaGEzdEEyNnN6MlJ4U1R4Z2xVbnBuM2ZvRE8wUFdUX2lXbzFCWEJEb2xrWC1MZXhkQndCNlQ0cDIybzF1U3J0VW9lVGlCSnZBWloxOXd5aDRpVVdjS2hERVlmM2ZQR2RyR1hrbTRITUJTTmRPVVlWNW96TW56VXlTdU5tZVZmX3d5am56QXY0c24wanFFekd6NHlmanhPTFFwVUZzaWUxU0o0LXlNd3hwVnEzWFhYbzdFYjh3Yk0tXzE3SVlGYlk0X1N4NDM3QUZhMHl6eFR4NldwU0FiTEQyQXlVMEVwVGlHaFgzZ3Frc0NndlZLbHZOUFVYQTRpN2J5aGVOMmZId1RuLTN1WkpKbGdKZERPcVRuZ2VDNVZZRkJzNnc5SWhndU5FekthNDFLV1hGUi1qb1VCT2VkaE5GOUlPZC03UEprTk9YLUhldWw5SlN1UThzOUFhTUFYdjc4RFMtd2JLVThhWlotdGl1b1ZaM0pEUGFsVENGUlR0WE95RkFhanY2Y21PUnBJZU1tR0xldWVlZ0NEUGVnUll5UDlnWjNLMHV3Vktpc1hzLVZZQVBlUkhwTmtmU3ZhbG1QdzB4S1ZtWS1GRHNoaXhvanJrUHZZQVQ5YTZQLU1takVnUTVSWTRBSy1fcVYxa0xlVHplN1JhN2d1VGs0SW1LOTRkeE9GUy1qRmhleTBXOWdjblhyVkhFa2tPS04tbnpzWU1JYUVHVERSVllldmhwT2lieU8zb3FjdmtPdFdGVlRmbGQzaWdfTXVRYk5XZmRObDAzRk56R1ptOHdPcXhLYlJjb3NFTE5WRUhXSWRyNF95TnJUd3BOMVd0emNiSFdaQzJESTdIcEdlR2t6d1VleExiak5LRHFfa0Zuc0xpMGo4dVRNSFFsb0hUdUJRbnJEcllTdV9rbUw4SjJqWEthbTdtQW9BMDFuT2dkOC0xb2gwR0tpUmF3QkFJSklkMjdWRnRxUWx2cG41eUUxM2Y1QUQ3Z21rUDhwMi1uRDlITVkzVS0wcS1QaXU2UGpIMGpaZzZhWDRPY3R1bGZfSDVLRFpRSGlXUVo0QUlMQi5YWklmazRvR2ltYkJVUTZBVnRNaF9n"}, [ 'Cache-Control',
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
  '53a37ab4-fa8d-4a02-b3c7-a5340f2df670',
=======
  '96f58452-606a-4720-b830-ccff6c565999',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:55 GMT',
=======
  'Fri, 02 Aug 2019 00:50:26 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '11744' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '691001b9-9696-4119-a275-1d4eedf691ce',
=======
  'e8362c16-3718-4972-b310-277afb9bfc55',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:55 GMT',
=======
  'Fri, 02 Aug 2019 00:50:26 GMT',
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
  'f154469e-1fee-48df-bb17-1bd8345c2000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHFQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:56 GMT; path=/; secure; HttpOnly',
=======
  '9c258112-070c-4d26-be58-1db5897e3500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHFQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:27 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:55 GMT',
=======
  'Fri, 02 Aug 2019 00:50:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1564681976,"scheduledPurgeDate":1572457976,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/63acdb9cb40049ef960269b0a1806df0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mUIdc0GYT5jPpgDBi0Hu6pH96eDRTPDKP8NT75pErIH9YfirxknPRcZ4yX3jWCTqZZJnd7bLuiEp-V7dYfuH8ZovZTk8vGZyDAzt_EwQzHMk9SfQiu2-Un2ABoo665aiw5bENndgjVXUtxnlocSPrNuxyKmAEPQRj0iHPKYHfVSZL95ju8CyBrKtD9ZHjypdsUiBuulmEPRGFj0QRfDJeIzU9TXC5L1U04zGF-i4ldapS1dNCgbHxzgOhOtofbFnassyx85k3A9YzSIKl_T7MsaYo3-QvxJo2YGcj4YSgBsdd-EpGK0-oUCfx6OwKEruw4uaZWrcGzJjUKxaBVuY7Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681975,"updated":1564681975,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1564707028,"scheduledPurgeDate":1572483028,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/1562f28639b34e5b915763894b2539d2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rg-vBO_azk7ZPkj5ySYmGcVJnuxS7MFcBuIcVdzn5qfUOP0j0_HBH0yXPQNciRBl02T8163OFhP7IgmRVQm3ocB0qVrpnZzTUlHVQdNY63a68NIzOQPOXoXGR3SpUtYdm2nL26Evx6LRewm3d3hNA7lf7751XdDGnFKC6Vg19d7oVzy9Y29rPpgkbb-ZtSai0ND_MD5pRdMLBf4YSGyNyDC6HuCQGGLLY9mf7d5TEJ7Uu48na-zLuTjWg44PPtntsBVdfGR_bvr3r9uHUMOLGvc08O0C3Alb93T3V4bUHep5jaBvYFk0WxrYB2LYzOxrl5SCjuROCcRXIpuwh0G3Lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707025,"updated":1564707025,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '00d2e87e-efae-48ce-81a1-7a9dc03016ba',
=======
  '66c29eee-e3f7-472b-b639-dff8dc0d7d5b',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:56 GMT',
=======
  'Fri, 02 Aug 2019 00:50:27 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '891' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '25ba00cb-e2f8-4e1e-b405-d68b514042c9',
=======
  '6dd9c776-2fc9-4b5a-b536-8004f10f9730',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:56 GMT',
=======
  'Fri, 02 Aug 2019 00:50:29 GMT',
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
  '6dbacf9a-21a1-447a-8eff-c7ed2caf2300',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHFgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:52:57 GMT; path=/; secure; HttpOnly',
=======
  '831e1a7b-4c33-45a2-9b40-cc564bd83700',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHFgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:29 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:56 GMT',
=======
  'Fri, 02 Aug 2019 00:50:29 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'ceef0ef9-6750-46f2-902a-8e910983b5f3',
=======
  '03996aae-902e-4f89-8491-a893ca2db797',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:52:57 GMT',
=======
  'Fri, 02 Aug 2019 00:50:30 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'f9540f9f-836e-47e1-8e38-99ab288e1283',
=======
  '9ab2495b-832a-47f8-8644-87868150b500',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:07 GMT',
=======
  'Fri, 02 Aug 2019 00:50:39 GMT',
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
  '4dbf3176-b068-4fa7-b9e8-529157812c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHFwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:08 GMT; path=/; secure; HttpOnly',
=======
  '1864096f-b6ac-4bec-a4c3-5ceec93d0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHFwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:40 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:07 GMT',
=======
  'Fri, 02 Aug 2019 00:50:40 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '7bb45c5a-bd62-4f4b-81e6-2e2523fef213',
=======
  'c013c71d-fde5-48e4-a701-68aade205495',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:07 GMT',
=======
  'Fri, 02 Aug 2019 00:50:41 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  '9bd4ec3f-888a-4ec9-873a-197b091749f9',
=======
  '1088605b-9910-4290-bf82-bdef9b0d8fd9',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:18 GMT',
=======
  'Fri, 02 Aug 2019 00:50:41 GMT',
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
  '0262e102-39a6-465b-8c75-12f53e4a2c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHGAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:19 GMT; path=/; secure; HttpOnly',
=======
  '1ea41c4b-340a-41f4-88bc-90a2792e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHGAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:42 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:18 GMT',
=======
  'Fri, 02 Aug 2019 00:50:41 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLldZMDNvMnRhUnB4ajZwTzFUZDA1NTJ2RlpSVl9sZUp0OHpacVI3d1ZUUnFxZ2lzenpqN2ZXVDNKV0tlVFhta09IMUhJd3JzbUNIMGZaUDUwSUk5eW56cXloV3ZvVnhLakNPbnV5ak11Y2lxRXR4a0VxNDBzSkJwTGF0SEJSYkQwRThxT3d1RVpGbDI1T0RuaTA0ZGNTVTRfenFWbmItN25tT1hyc1lwY3NsWlhFNmJwNkRzY0FuSTZMcC1kZER6S2V4Vm1idXAwRWxSNGVCU0pOYjNlaG0yNDQtTnhYVTN3bTR3a2s1Qk9wZC1TYnlwbFl6aDRGTjktdjRVYV9hQlljOHlJMjdSNFZNU3BkbFlpWlFadHk2LW50UWg3LTJzUTAteUViTW9XQWVnUGNPcld0NHF6Q2tHOFpKNHRmRGFFdUVyY0ZkQ3RfeDZJMVVnSnJXb2daUS5VS2U0ZElaM2RkSzBhOTRLMFI5aUd3LkJKNGxTb25fYThQM096RlZqNVBIUm5scTFuMXpBVWxHNU40LVZwTkxEMzBDSGw2eFh5WTVuQzFLRFdZNzJzWlRNVVdPQkpjcXdaa1I3QjhFQUZTS0JiM2JKdnJ4X0JkSUVia1ZGUzBkcXR4TmR5SnZJOG41WmJJa21OcDZUSWRFc3FzWTMzOUJ6N2sweno0QVBLS1hNX1d6YnFTbmNOdWdzUTVxWTV6YmhFMFJNdy1Pb3FCbWxQYWVQWUl1WUxXNktUZVZlZmRKQ1lGSld2Y2dRcG13dFUwTlAtMEZmaWxYUU1BYWN4SzBETmlybU9rWEJsdzVvQlZRbHZENHNxRWF0MjgxcWxUYl82MnVuaGpJQzJFcklWWWlQajlFQlRNb0lHRk9MekRJN1otRWt4SFg1SXptTmg2a2tTcGxOVVphMTFTLVpMczhtWnNxMXJWcVZVXzZPeVlfQTZ2M2FVVkhPcDAwaWFyQnl3Mk1kS3l6UmNHS2RNYmhIUXZDVkZPbUY2aEU3d3psczVTTnkycDdJWUVEdTdNN19oX2MwUG1haXBMQzN4TnZ6eEdXNXdvb1NqMDB1MlFId0pXdEs1bVFZbWNBN1N6R1R0eVBFb3dZdEJmZ3FrNVFyT1NKSEtWblMyOUdIODF0OVRSQzViT1MyWlBELVNOMkszWnY4eGtEV2kyb28zRmVJX1F5cW5ISUExTVlWQlBEbVhsRkVfWnhxT1Z5MjIwamNYY05rdG80YXFDRzNEWVhablhLakZGSXk5czU1blZOVGJuVnQzVW1WRVVvQzhTdzFKRkpoYVRCNDRCZGdwVlFGb1UxU0s0VExUNk5ReXhHNi1ERmFBbks2Q3JLU1B3TVd0VDBWX19ZYjd5akVrLWRtb2c2S3lkdlVzb0lubkFTeEU5SzJoOHRjcjZsR2dLOXMxZmozQUtkNTAxRTBBQXI5cFNabXIwYzdETktjR0liblBzUGxERVB4QnY3WnFldnUwS1JhTnFrRkY5NjBDSXNFQ2wwOTdjaFZxVTlhVUlMMjcxcVFtc1A4a0dRM1B0WXNRQmZMSmNURk1iRXhtS0t4Rm9kR1hpaWxZVk94UFhVMk1feU1GTU5JLTVTbEYzcHBUMi13czhqMHJFaExXamFOdjFtZ2p1NE93NFFBd3VtOGV6OWtfQVU2TmlMUzh3R185NW93UE5HNUp5QmJ3SmVoZms2NEZrRE1DTU1GZ3BuWUFGRkdZWV9HUWk1cGU1bGpXUVI0eWJxZ0podUs3WjdneTdNczY4X3NzNXZHSDYwNEtDVnRlZmFBRUVIdjdVanJGLTJldFBDLUxYRVFZaElGeUFUU1hZYTI3Vkc2Nno3SlNoNHhOZnpGc2o1cUx4Ml8zS0RBTG9BLUFBNTNnNUZJLVpMeGw1OVpxTlJaNUFFSHhUb05xWEhWWTdnMUZjRWd0aHNQNGhUYVFCSlg3SklhU01vWDd3M0s2cDZGOWNoY051dTI2QnVLd3hoMjAxc2wzb0R1UDB6V282YXRfV2ZLTFNYRGVoeEo3YlQtdUtxNUNSRElDQjBua3RicTNhTDY1elh1WFVhTG9EbGVTMG9wZzUwVFFleGhxTWEyZFhvSzAtbUo0RHF0VjN6RXQxOWc3SDRNY3htVnFmdUEwdS1Sa0NaaUFxUnNJWjdlOGlKQjBNcVZyYU1OdWVCOUUwYWVieHNhLWNNUjdjSnR1Yk1vU1ZlOTF2MjVINHVtVjlOZ2RjSkxleDktQUxVb3JOemVtRk9zWWQyeFBycVM0d0ZZM1JuN1ppN1JZMUU3QmV1N1JwQWhSTnJjVGk5eXNsS0ZIeng4OW1xM3hIUVEyZmRLd3hiNmF5ZFQ5U0JXRGdpNkVSaHFNRDRyc2cwdnFuRW5ySXJIcmRfSFBVZGhXZnlkbVNfZU5jUFJMTWZEa3BFLU5BeGZLQm1EeHFmNjVIOTJ3NWZxblhYM3k0a0llQVJabDJEMEQ3YVV4SE1wTXZrVmoxLUxrZDRXOEh0c2Q3M25ySEFYU1FnOUZ0NXhrcDZ5OWNrUnVNby1BTG1SWXVmLTZ1TS1DekVqNnFieHgzNE5TQjZQQ3ZMMzM3VFIxYzZUaTNVZDViU1RSazJQMDhPanZXY253NVlwUnV2VEpKVWpnTEdBSUU4VF9kd0x0SGw4cVNuTEFvQjBpbUJaNmx2TmhYNGxhcDN6eFdQRy1lWWRRckpGZnNXNER2SV9qWmV0QTFNaXZ4aDlDX2EtNmtqYUMzNFNNQ2psbXpha0ZoNzVIcFd4NDlweFp2ZHdpUFVvZngtd1YzTzlwN3lsY2FUSVE1cmxoZnhCdHR6X2JtTWY3LWNLQ213Y0FrZkcyajZrY2RnUUI1clEzTGdJTWxKeTMtX01LeDJtUmVBWjZON0pUQlRwQzVFdUZ4M1p5Q3o3eE5HbjlYSlNSNUhNS3pLSWVqOWlQaFhEeVUtNGNzbEZha0RzSjVENW9MQUlCUndxU29QcEUtTElJWk8yVE1KZXlFTzYzZ2tYbk5EVGpOeGtISFdLanBNaGFCS1lIT1dRWnp5cXJEelFseUgyd3ZvYXRWUVBJVE0xOHVhR1Z2cXBuUHd1UGhJSk9NdC1TTkY1eEdLbklzTm9MT3d0NTNBeVBSNU1QTTFiaDFncE91V3pSbEE1NWJfVy1NdXNrZTFLUU1rQmZQUGxPdlpmMTVQeHpHcFVKRmRyY09hb3dKeFVNTG5VdllLVkxxNzhCU2NwY3QybzBLbThtUGRONmRIeF81c1FhR0lTcktrSzAxS0Robnl2NGdwVGxGOXcyOGdjdUJQdlY3SjV0Umk5RDNQSlV6Zmo5dmRuZUE0ZDdFSzRwSVlOQzJQZHdNMTRaYWU4RWoxamh2UVQ1NWI2LUVPRlJ0UzQxLVUya3E1VWZ6bThYRjZMbVE0TmFuZGhFLXo2cVZINUJ2bWRyWHlveG5tS2JwcHdVam4wd1YyUExfdkYzakZLa3lydXJRaTB1VjZOMGpUUTUxclgzYm0yUGRZQ0Z6LTNabC12STBtazRMT2NiLVNGYm03WWNXM1F6ZXQ1VnhjM0p4U3dZUEpnc3BXWDNGZ3U4TWViTFZwZVFfTW1CYXJ0N3ZkSVRMX0x4TWV0WmJyOXcwRmkwOU9vTVI1Z3RjdGlZLTVfamd3ek5zQTBBNmFQeW51eFk3VEZBekZrODk0eGxPLW1QMVdRcjFGVGNRZG1pNnJqQ241R1A4MWc1M0daMWJOV2JYUHV4NVBmX2lMR2dmckRpZ3ZFWDVWUzZsUUZ6X0tnOGd6bnFkNnJ3M0tEUXdoRUllc0Q5U3VRa3c3RGNCZmx1YkdRUEh4QTh2cDNUZktPSkhVN1BpUzdHOGpsanJDQ1NjaFI2V2NfZjY2YkxZa1NUclBuLWZWY09fUkdyYjR4UVdkQWJ4WnY0REVtRklkNjVYLTcwN2g1T3prcXpWbXJqWlB5angxSXJvbjNqSWV6UmUtMl9ZUTFuQThYd3lWaHlBYW1POEFIZTV0NHQ3bUxxZGhLd2dTVHdrblQtVGNEV25HVFN4bWRlXzJmN1dvQjZRZ245aE1odnV0N3JDbEFnX0RkaERzUXpMNzNmeVE1VWUzZ1c2M2pURGZfUTVjNEs0cEtNUUhHQmxjckF3Qk1KNWtUVHpVQWhWQVYwRklXRUJ3ZTRLZzJfVk85MnB2TGhBazczWHNWTEF1clVXcjUzeGZkVWhscjhzX2FOcWpNTzhWSmlaYnJiQzFGQUtwUFZGS0RBTTE1cVlyOXdFRWtJLW4zdEcwbUhpeHpCeEFHYWxXZDAxTEFfdEVvSEV0V3ZEbG9wWjhtZ2tFcDdYNlBEczRaWHFpNjZNd3JfUkdjWk5xT3ZWMXpnNk95elNCU1d4eVdoRTA3REJIUl9QTkVhZ1NBbnFZU1duY1A4bFlLcU1FWUJoZjBua2JxUzlZOVJSWVNvS2NXRVo5eS1xTjN4a0IxSjFOOWtmSElvbHRzRURGWlpZUEFGODZzbnRaNm8yTkowMllSTERKS1R1X1F3SU0taUFXdUZuOEhRZDlhVDgydWNpOGp1dDV2dW9CTmluRTZsNnNFSHN5bEdtY29FZ2pFYXdFUThVUUN2WTFTRjRhcGd3b0NsOXhibDRVMEVjWERJejVoVmR1OERHVG9TUHlCT2t3Qm1tLTVidlFpenk0b3BtN3NXRGhxVWRtUG9YYkpVWVRrV3BNczQ2RGJucXBFTDRzaDJfd0M1NC1fTEVMR1dqdGl4UjBPWEg3REtNeFhVTUVLZzdLeHZfX0k5SXBlYUhhVUJ5dFhsSnVjZHcwc3B5TTNscWZYQWNUZS03TV85eWk3eGlsX19XeHdHQlFOMEpnOF9xYmgtOFF2YUhxcFVWeHpIMXFNb1pvamVzZkVzb1o0YXBzQ0FPbzlEYkg1NlhacDNfQ21TazhjLUpMTk1TbjNsaEFXdzVHandPS0tvaDRmZjhXbDFSbFRSUUNQTEoyM0pweTVHLXdTYnlnRlRubnFGUnhIUVF3UHkwR0lsOUxEV3dyRnhTTVZDR0JZbFBIUVdrWWVpcXRYOWY2NWdoUG5Gc3A3M1M4Wjh4WnpIcllDcTBxemRHNEFZTjNJazVmek5LLVZLUmZfV3VZVWNaeTE4RTB0aDRnOVF5R0dUSmpNa2hiVU5MMkFPWHRwdjY5TVhrdHhvYnNmRW1hcGlEeG4tQ1Z2UlRGZmRmU3Rpd0pqT0QzVkhWazRvUnlGYjdrd1hhYUx2X3FYTWJWZzh4RFNCR3lPWlBHazRMblFTc3R3cnNTZW4tYkR4azdoT29mRENRYkNRemE4cU9rS09pVDBvS2pTUE0tcm00ZmRGV3Nmd1otcmtibWJfR1RXd1RhY19xeTJTT1JCOF9ORkRCQkp0Q20xR3JlbWR3MVRUZDRnb0phN2NORUs3Q2RVUHNaTG5VNlhSdC1ldTdkaFZPMVJxckFBSkdXbkRFd3pVOVh3RzhrdlpMcVhRR0oyTW9NMFl6Q1JYT0lxbUJtd3pIYnMzYnZ1OGsxUk1vREhNc0g2QlE0VnlJa21zaGw3c1pDTkM4b0dfQlBIc196VE8ybmZYbHdwNFgyTVJMRUNkT1hfRkY3eDVRSF9sbGVGbU5VaXZVT2pQUGl3MDRYY2E5eTYyY2l2azloNWhESFd6eVE2Vk1CdHRUMV85R3pTM3RLWUVDc3hLOWctVTg0M2h3cmg3S2tqT2VQQjhieWV0cjlDdEt3bjFNTlBzLV9XNy1ITktHeG9iNC1zRmpEbW9SWHlaTURGSTJOUVBEMlE5d0Z0STh2eE9VSnZzeWVjUEtQTHZJMllXbjM3UU80TnVXQ0UzNDE0T2Vhb2RlSnVGazJ3VldaM2ZQOXZic2h0aEdBZmZmdmNSX3ZtRnZHQldZSXd1cTlVVi1ZZXJZQkVRU1NXU1NkcXcxYXJQZnUwVUNhcENYVG92WDl4bFRLSWMwV2UwMGFfRjBuUDV4dDk3QzRDTklMSTF5aEZISlRvQzZWZkZtM1lhSm9qX1lMc2xqVGtNajNPUUxrWnkycXpKenZCdlM2LXR3RkVfZ0xDQ3dkYl9za1FBcUx0Y0NUNUI4RW50SkotdEE5UHM5TGpxV3VaN2JDVjdkTlpZZEtoZjItQnk0dWVmbGV0WXRzWlphV2stWXV1V19tdmNiM2hvQTFQQU5hYXN3ekdlVjh5LVNfc1R0UFUzWHZqMG5PeFJMbjQ4YnhjaFc5ZG1ra2k0ZTBfdElYbzVBSlJ6dFhNTFllYkVtQkxhYXdpSnJiSUwtLVBpMTV1Wkhob0JBcmdXV0R0NS1fZGc3aHVpd3hOQzhWR1QzLUhNd1hSU2dmUEJhNnJZajFjM3c5N3o4a2xDRWlDMG00VURkYjVXUEtONi1BRDFUMm9KbGltZFpRa2xnT1VCaXlSVmpRRWxDRmFESEFkWVI0MkxqQUJPWk16blFQQ0xqaEs1THVBT0VDMDQxeFdsWlVMRG1DaGRhZGM0cy1zVHpSZ29qQzk5R0VuNDl2X3o1NGtwVDlZTlZlbDA1YXd6MWk3TENicW55REliTWJ1LXBMUjJESkVab0FUYkROVmRnM24xOWpEZ1RVVzYxNEZQZFAxWFpIeWdKTi1wV1lLckV4MWc0dW5EZHJsZy0tNEh1aHRYUGpoekEyOUNjVnh2VTR6N2pPMXdld2htNGdyMmthRHo1VGNEWUc5RXlkLVdoTFFLUHRJUEQyUkhkU0kxRUVrazltM1NsZnQyX3NoX3luWThPaU1CZlgtbWVhOU5NcldqOHhqTkNfWWhuX19zUmk4Y0I1UFZ3Z2RuUUV4VDZ4S3dJLXBNQXIxV3h0ZEZfRmV3SUwwSVJGaFJsQTBlUkw5S09MNGNLRGozRzlqQ3B3S3RHWkxhUW9BV3c2dHVsdFU2a25yeDY4NGRZazRBOFNfZXBUeE85U3d3U3YyYmY1cXFOUkoyU3dwR0VlMjkwWlNiZjdXbklKa0hoRmdZeE9lTUp2czBWUEcxWVN4SENzQmFOWnlUWTFYeTFtMmU3MnNmZzZ6ZVNPckVwQno5Ml9XMl9hbGdSRHd3UlhhRTc5Y0pqRVNpSnVUU3pqaXRkN091aXB4NklXdTBsREEyeE91TjE5MFN1ejVQMm9VRW5iLW9wR1ZhYnRQU2pRSElBd0I3ZlF3eUpMTmtyQ2UtX3F1Y0ZnbHVfTk95N1V2YVFKSEtUb3AySTlYUkd5TE52NjN1Qkprbm9KN1pTWTRSZG03bi1nSHIwQ055SkROenFKekN6WmhEQTZXWHpKd2RrLVFqR2p6aHBjRTVVMm9qcDBvYzd0YzRkaHo1b0ZmS0E5eEc3UTZla2Y1TU9rMkdSRlJWSE1pYklMc21MTnVFckFzd2dmVWxNeHUyUDVQNnlhcE5pcXNEMXYxQkJFNUI2NV9WSEluTktuVW1LMEFJb1V3aFlXTTREZUVGa0ptZm02Zkh5R0xMd1IxZFF0YXBZY0N4Q2ZaRDNWcl9wSjNZbFFDZk1HOGRSQnJUeTY5S2F1X0xJNlpmTmV5dEdCTWFNdGJFb1NaTFM4WVNOWGV0Y0RDZmJkVXVNcm5HdkN6TWg0aW8tc0VtVzdtQWgwbXA4WmQ1aXRqcTdIWFVjSnVZcFJOOHhkUEVJOEFtSEZrZzR0dk5XR2pYSXVnazVhNDhmZWZaZ1JnYXFHQVNidEJjYnN4SlY0aFhzRHFSaUEtajgxYVJBLWlnT2hRTzRaQXFNNzQtOUNLUk5PcXdIVWRWS3BmN0tEY2ozRHBYdW1tVGZpZkNoV25JUnhfLWI0MkZZV1ctakNuXzJLOHhuRXY3d19PRHdMbWpQZnh1OEV2SUlUcW1mRk9NOHZaMGJTWEQ0Q0IwdWQtWjNWTVpiSDk1a0J0VkEwSVgzSWNab2NGMVd3T0FPenpUQ2dMZHZOSzd3NmdBZm4yR3FwXzJibXNRN1VrZi1DSXlyY3lDQUZsVF9RcTA2clJ0WGxWLUlYNlUzLWtMV1NaMVdQNUR5ZHVnTXN4aG5BeFlmb2R5dkNVcVFxa01EdnE3VVRoalJORU1wZkw4MGJ4bzBzWDM0cE9KbVZJS3BMOEhjNVNXRWJINW9hczNERUQtaUlrb252VHBWa1dmQ2tyOFdPWklJQ2FPVS1zZkVVTUxRTFZpVl9PSFJsWDU5bEVadF9SZDlSR0J2NkR4eTZ2TGNPVTVSZnQ0djVrc3hKMkhJOTJqUkFVTzRJNFRYQmFuX2RzX0laWFpXT29iRm95LUNiX3d0NWlvSmdyWjZ0dW4wMV82ZnZyTDVDaUhHSzMtWXljS25YLUdmZ21pSnFfb0hSanFQMnhPSVNnSV82QXpVODVIcWtSN1FVbUNBRlh4aUYzd19uUURha0hnTXJnYzNtejZnRWk1V2N1TUtadTJwSXhldExMM1BQV3dTVE04aEJRc1JkeXlaaVpOMF9DUkxkeUw5OW1laG5kbHdVQVR6emxjcTAyUGRXdVNYVVkzR0JCaXVBYVExNTU3NGx6STV0WjJRWVBkdDdCTzVTS1NwMllTLVBhU2hTMnA1MUxXdXg5VnNueG1oWFpvMmRDT2RoN1B3eUhTNW9SN2J4T3h0akFXMnBwcUZVZ3R1aVFIWV92eVEyUEQxZ0w0RzkydXRicXd5bzByM0J1LUloNV9JUGtwUVhyZ0ZMMWM5eWJINnlEVGlyZk9zVTBrZkpaenhHYzN2bUJXZFZJUDA4QnNoTjRiQ1VfYVVBSjk0cGVwT3N1Z2pFTzZwLXZpUHVSR3VDcWxBcXZya2IteGwxR3NWeHZleEh3VVlacEs1ZnhxOHprNmh3STNtS1p1T3JfLWFscHVlWWw3MUJSUTBOOW44b0s5UUFBZ3hrc0lEZGxuc1IxWW52UXp5S291N1JhdjY3MkV0QTYtLTlRMEdGenhJbUVzQjBya0h6MUxzS3MtNWRESjA4d05MVTFXWllCTUlYWDNpb2huWHhCbjlsbWhJLWlXS1d5ZHpsV28tRmdNSnEybUhqbnp5NVdQck5HbmJ0TzRGeVR5LTE4bnJ6d0FHZFI4QTJaWC1oUWh2OFZWRXhhM3c5WkYySmMwdXBaRVE1dHFlRHlTUXFFY0prVHVwTW5ERWd0VjZ5ejhyM1ltdXliSzg5WDdRWW9CeHFybkxxbzFLZ2QtWW41Sy1nSklxcmlaTGF1TG5SYkVUME8zXzgyajlGdGxRRGZYdU44cUktbEdKQ1Q4SDJ3djlVUEZnNW1IU0VtQXdXOUxNZEEwN3d4ZnBlbng5eFIxN21JaFFianFraXFUY0dTZEJ2bldFY2gzSnFiNmFCb05mS2poakZoR1J4T1prc1JzOGFaWGZHQlJ5a1N0VmpPMG1IZGx3bVBQcklPY0pUc2YzNkExdmt3TXd6T0xSeW5RWU95RURXUU9oaEw5cEU3NFhfYkNCVEMydkVvUkt1QXhtRDVuSGFSakgwMVQwTGltdG5ScFZpeVFSb0NZYWU4d3VxNlU0RWlwaG51NUxOWlJyQTZTbm9yQU02dmlOQWRBdXFoNENPMU5IMks4STAxUXhLNnNwcVc2Z1l4WUFlQi05ZXRzT1lSdG9HRVdLTlhLRGJCcXlsYUxLS1JoT3NhX1paNlYwSWxmOVJQQ1Raalpsa2dvSVA2b3BoU3lHSTVrWlFXcXJrak8zdWh6ek9IYzNyMlJ0N3dLdzFsdE1sRmVjd0taUTNtUHZWX3h1ZHZHVzZtRGpsQ2ZtMldqOUMwY3JPcS1sT3R1N1FRLXN4UDkzUE5MZF8zcWN4RDNsbWVHb0RFTXBtdml5ck1rZ3VLdmJyS1ZQYmNjeHFCa3NJZzRiY19PZy1tamQwU01tTnZEczNKOHFEcENnN1EyY1pEUkljZFVJWmdPaHhsNGh0VDQwc05ON01LYVFodHhSNzBncHlxRWVob2pRbFc4WXFXSENyaUtYbjFnY3NtUWZVWFFIbnB3Mi0zNHJLRU5BcnNiRWx6S2dvdDR5a3N1eHhDUmNlUk1TYXZhbGJ5aC1xSmxCcFJXOENCbVJVRC14aGV0cWloYXlkTkVnalcxbUlVMUFzQzhWMC1tMngwM0g1bGZHYXhBMVRlU2NJQ0JpQnM5M01CUmJQOGVZY0Q0LVdxakFmNTk4UXBiMFEwS0VaUVRFQ3dSLUQ1RHNveUY3ZFRDdUJIZ0pKUEd2WFRrZm1VUnlQemgyZFFfUFFnd3RMTlkxLWEyRDBwWnotakNfQ3o2RkJuLUhSOHBuSHl2aWxMMHpMWW9kZ1NLUkZrNnM3cVd6R2FlSEUwXy1JUkY3Vi1OVzNwTWh5YWpEX3NKLWJXb2RDOTBsLUJXQ01mWlF4b2wtd21qSkI3X05xZkFNeENhN3lzMlVubmNwenZaQ1JZdWRhbnlyQmdEMldKYXJPQmdsVW1oT0tHV1B1RjBLaGEzdEEyNnN6MlJ4U1R4Z2xVbnBuM2ZvRE8wUFdUX2lXbzFCWEJEb2xrWC1MZXhkQndCNlQ0cDIybzF1U3J0VW9lVGlCSnZBWloxOXd5aDRpVVdjS2hERVlmM2ZQR2RyR1hrbTRITUJTTmRPVVlWNW96TW56VXlTdU5tZVZmX3d5am56QXY0c24wanFFekd6NHlmanhPTFFwVUZzaWUxU0o0LXlNd3hwVnEzWFhYbzdFYjh3Yk0tXzE3SVlGYlk0X1N4NDM3QUZhMHl6eFR4NldwU0FiTEQyQXlVMEVwVGlHaFgzZ3Frc0NndlZLbHZOUFVYQTRpN2J5aGVOMmZId1RuLTN1WkpKbGdKZERPcVRuZ2VDNVZZRkJzNnc5SWhndU5FekthNDFLV1hGUi1qb1VCT2VkaE5GOUlPZC03UEprTk9YLUhldWw5SlN1UThzOUFhTUFYdjc4RFMtd2JLVThhWlotdGl1b1ZaM0pEUGFsVENGUlR0WE95RkFhanY2Y21PUnBJZU1tR0xldWVlZ0NEUGVnUll5UDlnWjNLMHV3Vktpc1hzLVZZQVBlUkhwTmtmU3ZhbG1QdzB4S1ZtWS1GRHNoaXhvanJrUHZZQVQ5YTZQLU1takVnUTVSWTRBSy1fcVYxa0xlVHplN1JhN2d1VGs0SW1LOTRkeE9GUy1qRmhleTBXOWdjblhyVkhFa2tPS04tbnpzWU1JYUVHVERSVllldmhwT2lieU8zb3FjdmtPdFdGVlRmbGQzaWdfTXVRYk5XZmRObDAzRk56R1ptOHdPcXhLYlJjb3NFTE5WRUhXSWRyNF95TnJUd3BOMVd0emNiSFdaQzJESTdIcEdlR2t6d1VleExiak5LRHFfa0Zuc0xpMGo4dVRNSFFsb0hUdUJRbnJEcllTdV9rbUw4SjJqWEthbTdtQW9BMDFuT2dkOC0xb2gwR0tpUmF3QkFJSklkMjdWRnRxUWx2cG41eUUxM2Y1QUQ3Z21rUDhwMi1uRDlITVkzVS0wcS1QaXU2UGpIMGpaZzZhWDRPY3R1bGZfSDVLRFpRSGlXUVo0QUlMQi5YWklmazRvR2ltYkJVUTZBVnRNaF9n"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/1562f28639b34e5b915763894b2539d2 - key already exists or concurrent access"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '249',
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
  '6041be6f-9b0c-496d-957f-9d0ad6245763',
=======
  'd4475655-4590-4bea-ba56-7d273e6694fb',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:18 GMT',
=======
  'Fri, 02 Aug 2019 00:50:42 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  '4d05b52b-0285-48f6-b212-1e28bd0861af',
=======
  'f0575088-322e-47c2-a70e-d093b509591f',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:19 GMT',
=======
  'Fri, 02 Aug 2019 00:50:52 GMT',
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
  '15fc0eac-bee4-4546-8dec-c62063d12900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHGQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:19 GMT; path=/; secure; HttpOnly',
=======
  'ed1163fc-9281-4d6d-a053-227afabc3c00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHGQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:53 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:18 GMT',
=======
  'Fri, 02 Aug 2019 00:50:53 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLllkaW5vTmJ0a1NkS2JBUmJUWlcybkNGdEdsSDBrVjhtYjRkbTlNaUZGSFE4dEx2UWJiaEV1eHQ3ZnIzREJxeE1kZVF4Y3ZwdVpnYzBrTDhHVEdZLURSTjFaWDBTRm5zbzlZS2JEY2dQaUpOdHVXU1pkOXlURmpmMFU5a0d6ejZGQUVEa05CaWZvaVRQQlhlLUhZTU5XRmR3M0xlOVRyRkhjWlVqaDd6ZGI3OWUyRDhkM1JDNjgxREFBaks1NFlKSDdBcWtSY2xoR0dLX0luX0l1TThDcWRvQlliNzEzcU5SOTZVTHc4dWZQTnhEa0JndWJQUzY5R2xWRmhyTUdQSllXUXBKd2d5bms3bGQyWktpWS1fX1BzeFdiLWNHWlFyYTRaWDFjUVNWejZVZUt0YTFud1hjUUhoTDZ2RDc1SmdyRXlabUtsTFd5Q05ab0x6enZFVVp0QS5PQVY4cGFXbUJnUFVnX2toQ0Z6MG13LlhCcTJPZVFwVGdHZVBma3Nmc1RfVUU5NlRKRVpCeUFkcG83OVBsLXJjakU3TDRJajRfSm9uTDBlaEFZTktiRlloeGYwMWFXLVlHcE5KSnZWa3ZxTlkwbHdGbFNtYkI2YXp2RTdCYXI2S211REsyX1NMYWdoX3dCVmIwSGd6bDR5OWZEWEVuY3dGUEdKbWdGMDhXVjhZNEFkbnZpSkxfMTJka09yRFo4MWV6QUJZcHd6bXZiU0JvbEJXcWRPREpBSzlMV09Qa1Q0b2hqdTAzZkl0TVZYYzlWMjdhdE5faEMzRUZvZEtteDI3aWZHRi00MGFRREZCZkNpU2lqTjhxT2ZMZnM5ZWJocEZLNkw4MGd0bmcwWngwb2xwendmaE04dlJGUGxCYlRZbHJtcUp6d1ZFSVZsdU85OFl2alB0cjl1R1ZNdWFLQjlQd1pSWmtkYmlLQXhkMkZNS1RjTE1ocU5tQWNkYnpiSDlyem5QaTJORVZEdktKd0VyZGlfaC11YTNEQTNYeXV3SEs3T254Nk5ZY01OS3JLODBWYkRVbXVJNUdGaWhiV0FlVjV2UnBUMmFhSkJQV0RGWS1LMzZ0ZXlfZTJVLTFDOWh6Yi1DYXJScXl5UmlpLVd5WS1xMklKSFBHSE1fbVNJb2o5SS14cGs0VVBrWFhfSXpZOUtlcEdUMDBYUVZsSENwYXA5TTBVVkVPT0JPcmg0eEV1UEpQbnhPLUVhX0NhT2lwVk1xdkpJdHhKR3VsVFBuV0k4NWdZbFZSWjBmVTc2TlVkaVRfRFdwWV9oVjZvQWQwQUtZbk1zU1ExbElOckNhazZ2MDkwUWV2NGczZmwxc1h4LWZWcXphQ0xYYVdxWTBmRzFXc0JGZUc5ZWRCbGlUZm1RbWdUa2RqcVUwS2I1UmUzUHpiSGRvd1d1bGluU01EUVlNR2IycTZDRkFtRVd0WWp5M0dycl90ZjVOclB4UXg0TmNfYVNCQ1JIRUctM0ttelVyb0g3UXBNeFRWOURTdTRucHJXQTIyV3pwcmcySXBEamZrZ3U3SGxpeE1rZWo5aU5hZzh3a0ozWV9FbUFVYUZBTWpaS0hBU2wyMXhILWh0Y1JUZEt3Qi1tSG9Tc0ZxRTR2cE13cGhzTlVCcXhELXduTktORFEtb1AxS01sVVJUUnNPbzllb3ZhNTRhSHRWZnE1ajdTVjVUa2kwUlBxeldOUVBWOG9ma3VwWFlxb3JRZWxTQkpFV2RXdGxSbUE0bWRwTkl6aW8wa051TG1oWTdNV0FXUGtRbTFlbjRFaWtqUy1qQmNCeE9LX1ZWbm5LM2RIcFJ4MWh4YmpyOEMwZG5ZRVo1T1BWd0xXLXNJT2pCVlBLYkMtWjktY2Rmcl9nNlRVUUZQV2NJemNsaWRPNHI5eUUxazVxWjJ6VGozNDBEUHpYTkdWSEt2bW9YTGg4OHpqYVpRTkNJeXdKejdUNXBGdUp4M0xNeVVEaVNheUlqdWJITkRSX2lRMUJpUHNwamN0amQzX3dMZlZSTWFjMWVxeXZ2Q0IycU84SDkzeWtLYjJZNkpMam4tQ2FPdmhmdFNTNHRkSGh3WXRZTko2S0dtd2F3d25Ra0I3NnhqckN2R2dLandBczRJTlBzVzI1LWliX0RRTW1OZHBjVUx5RU0yNGs0WWJQQ2Y0NUd0TFZabEg3eFdadlFOd2JiS1RkT1NicC1mLWlsXzBjUmFMQTJuRmVyZ3paZU5lSTFxSl9PV0stWU9RT3h3WDhUTXpOVHNPcEhFN2psdTdRczY3QUZTNUdUdnhucVA1V1FmNEN3MzBVY3hsX1ZtWl9wR2RSYUVpVUNZb3VLdnVIdnhTQ1BGTHNZY3ZNZDBrei1DSWZxa3NaT0tZQWxtYWZzSDRnZkpCQjM0RjA5d3ZnZVl0TEhxSk9UdmwtNlRVaGRpbzhhNUZtdUszdWtUSW85NnhCUThQbzViR0xySHphaXdkckZJU09zLU43SFdzQVh2SklhQVp2VE1COVZudTNRRWJsbkRZdnIteWE0YnpBYUVZSlVCNzlXOVU2X01UV3hmX3dLWEZCckREZGZxUkMyOFhUUVFiS0NtMEVDLUJPM1lMN3hnOFFTUm10bHpwbXNhRDYzTEZMZ3F2M1diN0tjejRfSlZrdFZJWThrekVleHduS0xFOHBTVkVuaWtsdHFnRG8yajlEc2lDNTBqR3QyNDNWNVZYU2MxWnhDYlQ5YVVFMlY0ZDZaeWg0dE84VmVaSWVfa01VREVScnlQci1mSUhJUzZBVmJxTHVLcVZqRmwtWkI5cjVLVThLd0JNeUhQZnRBX1dLdDFMSk12T0Mta0kxZ05NTGFTRXlTVWdRMnAwRWNFTWtiMkFkQXlxa3ZVTHFhQ05qeEdvZnBCTmJPVW1mSXFFWTl2dzN6alZWYjhUY1B4VTUtV2ZSU3MyOS1zdzRtQlg0ZmJHZG9SLUhYSnEwY29TcV8yaWJ0MHNKQTBnNGNTUXI1ZTQ4WWxkeHRWMEtPaV9CT3NZV0ZGU0NSeklCZHROTFU0alRGaUlnMGpFNU04TEhyN1dheUp3eEN6NENsZTBzR0dyTDdvU2hPRjhCWFR3Y1BELVZtSEVYM3hHcUIwekYyNHRXeHU4UThOMlZaT2pwVE9PZ25OU1doWkhZLW5GVUZlMk9LNzNGTG9SWWM1cFR6cXBsNUVOMF9vbWZVSzN5TnRDTW9WS2xCQ21RajF2LWZNYlRTaGpaWjB6SnRPR0JKVkVWdS1NR0ZXQ3JGOUZFLThWSEdKRVR3cG92THByYXlvZmJhdUw3SVFUbXRESjlkbGlWS0MyZDVXcF9aSlpoX1lqWGVOQTNVOUN0eVJ3ZFcxakRkRWxUMjNlWllkRE1uakliUUNKU2RQa2FlTmlKc1VpdklZbU9QOHRydEpVUmRfdy1KLW9FTE1qa3ctcGczbkwzdzBxU21XeE55dlN2TWhpcTMyR2NNc0RlbkZZR2k0eWM2TGhVelNYQldNamRZZzZHdGd2MHFQS3VyRVVVeXIzTHl0Qlo3TVlDTjFVM1FNdHN5WW5FUUtoSy01Mng5bUJZWWJ2VUJmandYUlR1Vjl2U2N6b0FyQ1ZIMGRLazZ3anBMT2UtNEJXZVFHVXJGOG4tTkk0WVJySEFRN3NkNUFGbTYtUGU5emNGbFRrZEFEZkdHQzl4MDhab2dhZ2ljdlFGRDNBR25xSXExVFpFS29IR1RYSWhWZ0RVZjlCRTZ5TmN2Qmlyb3ZmUnVXbnhYMVA0djhwcjZrWnh2emE0dWVXY3Nyei1aX2t2WGlKc0pKSTN4ckVhdHg3dW1CYUdsT21jTzZsLURaYUt1Nk5iUXBrYjZJQWlkT2VWNndTNHNKbS1DM0w1amhZN0JZVEVzWmFibUw0QTNDb0xGS0EzYlEtNjlNM0hYRWd1X0dybGtjenNnOTNwbTJUWVBXM3dqb2otY0FfQi1XMXNYM0tYUU9jakJBemwyVTJUaVlwYkN6OEktOG1zQUF4c0xEVUlpckFQd3dOeHlTdl9oYkNzQkdKM3dCZjN2dDh1MFFYdDhmUHdDaTRkMjNRU3Z5WWEyOHk3eHpkTmd0T3dMbkpiMHA0MnZPUUFzeUFXX09hQ2lKTkxMV1oyaUhVQkpsdWI5aERSdWh0cFFUQjh2X0ZiTEJuSmFYZGtsTjEzTzFFWnhwSWlGbnp6ZFFCLWJoRXkwS3RNZmt6d0JxWmQwRUYwY0JlcTVxNHZpQUZFYlNvQVJfT2p6LXJsYXRuZHVxMGVUbW4wQ1NQRndXRHhOay1kYkVVME5pTXVwYk80U184TVlWMlh4WHZnSlRCWEpqT2pJcVBITXlJVzkxcVN2SWRfcm1nSzlwa1RaZ2h5aUxfd0tla3QySDdDZ1ZsdFFQTlJfY3hSSG5PamdRWUlTU2JCeXZtMnJhNFNlWkJZVEZXbzZFblczaGFEQ2x2X2doOFMxNThsbTNtNWgwTnM4ajNwVWlxOWIwelpqaDZjSlhGbGlydGJERUtWa1FUbXIwM0lpVFd2aGRONkRud3c2TmM5b2hCNzB2Q2NKMDZwNDc5VE1CYTQwZm5Jc3lSSVhLRHZJWEIzcUJEVTdLS1o2SnhTN0tFVHlGQVFVSFFaOXRqQllmZVVVNTZoRFJxVFJaRXpiWG9EWkEzdDd2YTVRVTdUc2dvVnctTkVlOVdLaEctQml3SEh1UUZnTlUwVERYTFYtcUQ4Q2RXRW04QzZmNU44RFlvQmlIdnRNbnk3bGkxdDBBWDdmSVZYaE5xQ0JSaVd1bkF6eF8yZ2ViVjZRZFp2TlNJTWdMSXhkZWQtYmZ4RlpCVWx2cmdZc3FsV2U1b2ZzcUp3WWJFdHpKWm9ORUI5RWkxblh1SVZ3RHl3LWFvR3VHUWJRSGdaYnB4c3o5V2U0a05FT1p3dDZJOHA2RnNMQXpVN3FXdGdQcmpqcV9BZE1iVzJzNlJxbGtwQndfLWNNR2Z1VHhkVXhvQ0t4VFBtdkpJeVRYR1FpNldmV0w2NEQ0TENBZ3dFRFZRODczM0QzWGROUVVwNEZYSnlyRHJxMDF5TWxQdFJ3SXN3dWdEdU9uTDZQN0toVmI1QWFxRVdhdWRKZ3diVV92Vi16cWlVNmhPWWJpUnBLdlZkWlVTc2dCQzJ3eDhhaUdQVTVfa1FCMVUtS3JaR3VwQzVxYjVTX3l3YUswLWU4WFFHQmNoR3BCdVpmV1ZfYWVQVGxhUWtZN0liVE9pQVdLNEtHZVZjbFhCTVRXTVBXTFZ2Ri1fcVJrdUthZGpaSmtzSzFnbWx4c0ctQzJKbEhxYkZFN21KS0Ezd3J3RGRfdElTTWJ3MG4wUjZ2d3ZhTDMxSnM4UEJONXJlVXFjUVduNWZraURvTFpQdGVhZ0N5WU96T3J0cGhtOV9KMEo0dDE4RDNqdnFyeDVwa0szd3A0cllyUFRjSHNzUFFnN2YxY2tPSDJMZkVpaFlOSnFoTjBsSXNwRXJXT1VqR0F2VVB6bG9VVGowYTBGWTBXREo4MW9mYXNoVkszNFlaRU1lYTlIM3E4Rm9PTXg3YTFnQ0RaTUVTZ1RNbGZldzlzMHRyZ1VyM3hScU1kdTVrSEJlSTdpcWV4S1k2NS1Kd0VVMy1QTmJ5MEZDX3dVYk52TVl3MUY2RXo4S2tGZGpLR3c5T29IQW0tZ2VRallPWnVBOHF3T0x1NjF0TjZFQi10V1lxQllHS05EYTB5VGZHaFoyTnV1bDByX0RyOGlKMzRqOUIyNURfS19XdnNuMmxQZDlSTU1kRXUxRU9pekkxT1d0a1psTGlwRzBlNXNObXp1TUhXelBKb00xbGlrb0Z4WERuTEVTbXc4ai1xRTVKTXBHYk9lRDdzNVp1M3JkamNkTUVXVi1ZUUlMQXoteXJZRnVtVnZxMThZWmJQR0xSdHdMbDUxSElTbVJabmZTQ0prTjdtSUVtaEtLaHhaRHhfdUVJX2gtaGF0NzhzbEdzbUNYMnRjbVZ4ZDdmTElQaWdJNHlmdGZRMHNkV2M1dTUzNm1veFNnREVSNnY2cmlUczdjcTREUzdJNnRfTjd0X1E4WDFiLXVFSUdoLUZnVlJ0QjJpNzRLRHcyYWVtME16cUd0WmtjWGtnQzEzQk10SnQ5VUdaaEVBQUdmUFNVamRRdmZWVFUyek5mcHZxdG84dnQ0Sk81RllhX1VvQ3FwLXRqYk9YUllBXzJ6NkVSeVZfUmFmWVpJY24zLTZZNUktelg5bHNNb2FSSnd4YzBvcl9ob0hqdVVzMzBHYzB6QWsxaUFMS0RTdk5KSlNsVHVZMUdmc1Q4UkhWR0R4UHFQWm5yOEVKclJVTHE1U3UwMlRhelpTZEhEU2dSV3hZWFFCOGFSMi13ZjBzTjNSamdxTlhmT09SNnlkeHVFT2ZNR2JYZ3hKclJEU0dsR1oxcG83akoySnBTOTFEQmNtNExxUHhnMVQyc1NlTjZ4b2ZCOGZrR21YMDQ4ODYzeUpnb1Z5YnZ5OFppSWYzSE5QMDRNUHlPMlRuUzZNVXo2ZWhqT1dCTnozaU8zc0I0N3d2S0VzVDNKcG9CX0lnbGFyS2Zta1FSYVF1R0JzbHZteFh0OWFFdFZWdGZuZjhkYzBPVHdkTlZZZXg5Z3FKdkdvdkFkM1NuN2hoM3ZxVWx1UVlTWkYtZ2Z5NVgzNTdLSW9BbEZOZS1CcTUxTEFyTkVDTHFZZGFXMFdERzdENlhxaTVDMnQtQWpkMmxkaWsxQXBqbnlZanZxU0F2bXNKb1Y5alRaMWdvZC1EZkJHZ2lzZWozWGxDYk9ISUt3T1hwYU56Rms2VTZJeVU3amd0YmxjYmpiNWdHRjU5cXVZbmY5Q3FoNE5rXzNzbGI3WmFReDN2MkpZd3ZobDVLNUpSRnNpcFdIQVhfT1ZHY3BqZzlXNkxsZHVDWGRiQmhLa2gyQWZxeVNYanBWSExBTWFPS0NDUC1fMTN3TjFwWTJ1T2djdlJUSXQzNjk5YnBqQnFKMFNQVm1zRXFaM0pPSFNNM0xkRnB3UHFHblBPQ3J1eUV2cE9PQkRrNDVhVVRIYV9jWlc4cmpDckdHQ3IwYmo3c0JqTHF3a3BmUWdwZmpkdEF3WTVEYWpqTnNQRVM1bDU1ZGF0clE5bTlSUXlMaE5YTW84WVI4bnA3R2V6akdCUDYxTFJFbThBVTZmZC1KaGxsd0lwS1RDalUyZEFsY3pZLW9zM0NZZXZYMmNZWHF2WVR3RHpmQzFMNEFrMWoxek9DZlpNX1NfZDZaZmJhcXByVlpUS0U0d1BSWE90Y2stdlhJQVcyekpTajZVNWswWm1OR2NxdDIzSGl6NmQ2Y3V0TkkwcnIzcTZMZGo4SDZUWXlwTkhZWW1nNzh6UERYZVJMbXVjMEFmcEZ0OGdLcGFONl80TVdvcFgtcGEzWU4wUlVBUXNUaEdoQ0NZVlZBaEpKVHlkc0o3bEV2Y21jTG5RVkp0dmt0RWFpdmRfOEZKUXJ5VHJlaU1kbTZKYTkybEZrZW9UWm5KLWt5M1RoVE9uXzg2am9nTHQ2V0pvWktWQ1pyYi1lUW1xVmU3akl6cEY0SkM5YjdCV2RoS2xXSnRCU21YM1dmYXZlZU9Kc25kN3hWV1RvT2FVaDNKQmVkOTlOeVNaNkYyWUdfdV9GMkVGV0NBLWFvdEY4QnRFN2w3Ulo0dFBDOVdGOVpWcmg4TUhwSXMyYWlSVGhpNnhueXpYYjB3M1NZWnQxUjFnTGdiYUJSck1mZ20zUkZ0Y1NsV3dZVXp0VjdBODRNTkNKekh4NnlVVkZTTGJTdjUwRzhhTWg0cXpxcU1KcG1iSWFLUUxkXzVpR3hqSjRFMWJOQWk1TW9ndUY3TzdTeGYybDdPSkI4dDJFZ3JGekpKRTRqSy1iZUFTVS00LTVkZVk5dXdnenFnMGhNUTUtVzF4YXhCVHA4bUR2VVlIeFByUm1uZ181NjR1b3pabEl4UlRzWV9waXhHQTEyejdabXlNUTFXaG4tOE5jTU40Um5YdVY4aXFOcXlEQU05bEJFa3R2ZVhJVVJ6T3N5cmQ3Y0hTVzNoSzR2MXc5QVZXTUQ4blF1UU9RYnhvUUZhTDAxY21nUmdrSnN1OFVIUnNCek1JbzFTdjQyM1lxSnhVejA3NElITmlfM1NUeVZrdFRGM2RGbEJJVVgyQ2dGZ3hLdks2NE1leDRnMVZyWFIweHdaY0VVeVRCVjZBQ0RMRG55MFhyNjE2UV9McExGNzNIYS1MaVJYbVE3NmlRS1RheFp5QXkzNDJ6eFR2eFhfUEVXeE4xbnRGNldQOVctdGpiZllkNjJSYmI3NFdjdGZES3MxbjYxcTZ0TVVvUWx0ZkVTejhHeVVIN0h2Tk1nUWJMTkRhaHJlR3VJcUdDSTZVWU8zdklKd09wcWhjakxzX0hydlVGTnZsa01PVUNIOUE1cVhlS2cxOEJ5cTN6d053SG9fYnJKUjB6SndUN2pYdDdPamViVThuWGNYOEFUM0FkQ2pVY0JfVk9TQkhvYkJRRTVFdUFENU14dDFlUU9hRTM2WWN4NTdWbk0zS3lRWThKTGhjeml5MHVqZ0w3U2JTX2J0bE5zRTdTTk9RcHlZaXlRNTBveXhVQ0FkOTBMQ3ZMMVJwZ1JEN1BqRGFpazVmYVNSdnV2YUYwTlBtd08wNXhWVEw5aXlKVGFWMGpMcGg0OXR0UjVYVXVtQTVIM2xVOTVna1Jsdk9GUG1lbHhpaGFnamxUQ0dfd2ZVOXpLbzFvb082SjZmZ2FXNVRUOXp6U1V5TTh5VjlwdVViWkZhSFJlUnVYeE1WY1g5dzQtRFN5SkdSQktuWHh6b2NPUklrMVJJeUh5UkYwZWZ1NzF5ZWpQS0RBeS1fSHBPcHhnZzZJQzFQTnVKYUhOZ24wZDRUTTFjMmlpbGgxXzdReE1ZQ01hSlE1VmVfSHdOeU9mbzMyREVwczZCMS11dEhfYk5qWmhYa3RtMnJ6OXdUMTMwZkMtcl9vLXdMX29ySlM5ZXNMdkotSWQyUFVFN0ZSYVVvWlhULWNBU0RUTkVsUmJTbWk5NVdCOGpwSzR2VTE5QzFERmhFSE1BMXJFV1ZJQUNZZ210eFMyN1RjU2VtSWJIb0liOG9neDREaU9ZeFd2OEE4a1daVkxTZW1jQW1DeklkSFNUNUdKQU14OWwxcno3OWFpUzA3dmJHQkQ3ZHRRbC0xSk5JaFI4dXZVWXhJYnNVVm9xSUtLOTdWTVdodVdqTU9Gd2xrd0psQjFxU0RUQlJtSWJKN1dlZVFsbXJ3NkJjLTRQMWh1WWJNMHk0U2Ywak5IQUxWTUNFUk12X1Q3MFZKOXdqLTZfaUgzd2ZST19fRE04LTlUaVpwYkJiZWFFblBMbHVLbDhCQmMyczF1SUJxMExwaWFGMHBuUTV0ZHZxbUprMG54VmlQeVlIWmRJNWZFTllSRG1Db0prYjlROEpodXFnd1J6cG9vY2I3ekRLMl9YSmZmTXFTYWZUT2x6RzdfdlluUlJSbjJhZjdFYzRId0w2TE1rYXpIbHh5dEN6SmNfUTBJQTFNbG1qenJCTTktVUNwMjVTRUwxanVVbG1ZMWpON0doa2gzR1R2MnlPVlFNeGxXMVJta1NCZEsxakVRTVdwdGV0LUJRMDBjZjhjREo0dnVIS004aXI5UzhHYi1OUDZOTVpraDF3NjZyQ2RXdTlZMmVHNjdZZ3gzNTByckhaX2RPTERHc01HVGhwXzJxOGpyNUVsbm1HUmtrU0lJZ1QxdkZvSDRZb092bTViVHNHZTlzbjZqSHM4MzRKbVBXS3BqX01qbDM5M0JXLVphdVNMZi0zLUNDTGRqdmxSaTRLbDh4TG9yWGRpMlktVkRBUE1wV04tai0wR0VSNGptNm1jYUpWaFFpTl94OWRMZHhSTElMY1NGZGhDYjI5c3VQQzJmMUxRRldSM3JvazhQNHVXbnRNREhMRXQ4V3E3MVVnMy1CVnpMd3NiaU9ob1g2YzAzbUJKNXNqYy1VYy15MlMwMkY5WnVud3dsekgxYVJaaDVkOW9PUFhRU0oySnJJWXF6ZGgxT0UzWFNsa2pmaDEzTjhzWUN4a1NxM1NKbjRoRndIUTZoeUdhZjh4R3Myd1J2aTF6VW1fZWFncHNHQUZ3Sjd3bU82ZzNHRmY0MmN0eGtZRzNfd0Nzd1R6bWphejN1c2FWVHBFZnV5X2Nseko3U3VBaGx6MFJ3VWNBZXl4eFdZUWQ0UkVDZWFqQ1o5Q3J5d0Fwd0FweVBZb0RSOXJxdWRHbzlndE5QMDJtSHNBV2RZZmZiLUdaaUlYRW5wNGVkcS1vWUl3N3RPa2UwbFFfaW1KOWN0VGpaZ2k3TF81T0VPUVpFRGNkeklXdlk0bWc0cUlXMjl0dHZ6LXNycnp1d1RhN21qdVhrMG5jUmJtUHpEWFFnVnhyOFF5a1JpQ0V4UlFpeXdSZk1ObmJ5b0hzV0paVnRPVlNnU0ZNMkRYTG1Jck9pUmNPRE9RMXBYTzFIV3drTld0enFoVVFqQi1KUVpIZm1DdkdjZFNPTG4xV3A3eGFnay1IQm1abDVJeHJHaFdCLXJmQktPdFpjVHZnYXh6Z0Zobk40LVR3YjZSdjVYNVRRbnRScEZYeEVUd09rYTctdnMtcEpobm9ic21IXzFjRFhZVEhlU1RRSFk2MEhpSndJV1A4WWc1UFp1Y2hDWDZFWXVIRGRfbjlSZnBwWldjRmZZcTZlUFhRbWVIa25sQk51dFVwT01NdzVMYU5vVXJycGdTQXcxLXVEZV9VckhxUVZpaXRINzBmS1V6aTRMeVFzOTZSMjVQTTctYk96RW5TemdqeVc1MXVSZEdMN0dLbzJfVDNCVVIydkJrQVB5N19CX2V2a3BlTmdyODZSUFk2cWRDV2xMYzExbEVfR0hwUFpUQ21RWTl4MHNEVjNTQWhLTXhKZTdBa1gtUERDRDdBRzVXMm1xSnJDSzhoRy1kYzE2d0k1ejFUcHJXcGFlTzZQMmtfekdUV1JjZ1RoLUJ5enRPZnJpTmNmWnJRQTJMa1BTcmh3cTQ5LXhXcGJFREtyb1ZfaXVMN1RUUzVzaVJYZ2thdlpsc19ScGFqNVlZWjJwQUdibjBKTkJCdngzM0pMVUNsR0N2bzdfaFBRczJHTFR4Z1h6di1HZlVwdWRDbXNNbHU5VVNZNUpVTV9KOF8zMGZjVXF0YWxqaHRZRVlHQkdfN1JJT1RiQkNuYkNpSFdWMEM5NjNEbmloZ2tXZVpZVExHZ1ZFcndaeDREQ3dKSkliQm1RdVU1Tm5sZ0FxbnlxanBrMkVjcVBwMWJJTmZBM1ItOXBfcE1FcnA1NXYtSFFCQjdRcEQ1NWs4T3k1VGE4V055ejRwR2FxM2E1Rkg0aTB0cXV1dVFYZVZmeXBkYmptcTY0eWc3Z0J4QmpDZndCZkU4emYxMnM5UHZjWVZadnBKTThOWDFyeURraTV2anBNNGJwenVuUng1aTZrY01nWC4yQW5vdGRSRHZsU1Y1OG45a3YxT3VR"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/63acdb9cb40049ef960269b0a1806df0 - key already exists or concurrent access"}}, [ 'Cache-Control',
=======
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLldZMDNvMnRhUnB4ajZwTzFUZDA1NTJ2RlpSVl9sZUp0OHpacVI3d1ZUUnFxZ2lzenpqN2ZXVDNKV0tlVFhta09IMUhJd3JzbUNIMGZaUDUwSUk5eW56cXloV3ZvVnhLakNPbnV5ak11Y2lxRXR4a0VxNDBzSkJwTGF0SEJSYkQwRThxT3d1RVpGbDI1T0RuaTA0ZGNTVTRfenFWbmItN25tT1hyc1lwY3NsWlhFNmJwNkRzY0FuSTZMcC1kZER6S2V4Vm1idXAwRWxSNGVCU0pOYjNlaG0yNDQtTnhYVTN3bTR3a2s1Qk9wZC1TYnlwbFl6aDRGTjktdjRVYV9hQlljOHlJMjdSNFZNU3BkbFlpWlFadHk2LW50UWg3LTJzUTAteUViTW9XQWVnUGNPcld0NHF6Q2tHOFpKNHRmRGFFdUVyY0ZkQ3RfeDZJMVVnSnJXb2daUS5VS2U0ZElaM2RkSzBhOTRLMFI5aUd3LkJKNGxTb25fYThQM096RlZqNVBIUm5scTFuMXpBVWxHNU40LVZwTkxEMzBDSGw2eFh5WTVuQzFLRFdZNzJzWlRNVVdPQkpjcXdaa1I3QjhFQUZTS0JiM2JKdnJ4X0JkSUVia1ZGUzBkcXR4TmR5SnZJOG41WmJJa21OcDZUSWRFc3FzWTMzOUJ6N2sweno0QVBLS1hNX1d6YnFTbmNOdWdzUTVxWTV6YmhFMFJNdy1Pb3FCbWxQYWVQWUl1WUxXNktUZVZlZmRKQ1lGSld2Y2dRcG13dFUwTlAtMEZmaWxYUU1BYWN4SzBETmlybU9rWEJsdzVvQlZRbHZENHNxRWF0MjgxcWxUYl82MnVuaGpJQzJFcklWWWlQajlFQlRNb0lHRk9MekRJN1otRWt4SFg1SXptTmg2a2tTcGxOVVphMTFTLVpMczhtWnNxMXJWcVZVXzZPeVlfQTZ2M2FVVkhPcDAwaWFyQnl3Mk1kS3l6UmNHS2RNYmhIUXZDVkZPbUY2aEU3d3psczVTTnkycDdJWUVEdTdNN19oX2MwUG1haXBMQzN4TnZ6eEdXNXdvb1NqMDB1MlFId0pXdEs1bVFZbWNBN1N6R1R0eVBFb3dZdEJmZ3FrNVFyT1NKSEtWblMyOUdIODF0OVRSQzViT1MyWlBELVNOMkszWnY4eGtEV2kyb28zRmVJX1F5cW5ISUExTVlWQlBEbVhsRkVfWnhxT1Z5MjIwamNYY05rdG80YXFDRzNEWVhablhLakZGSXk5czU1blZOVGJuVnQzVW1WRVVvQzhTdzFKRkpoYVRCNDRCZGdwVlFGb1UxU0s0VExUNk5ReXhHNi1ERmFBbks2Q3JLU1B3TVd0VDBWX19ZYjd5akVrLWRtb2c2S3lkdlVzb0lubkFTeEU5SzJoOHRjcjZsR2dLOXMxZmozQUtkNTAxRTBBQXI5cFNabXIwYzdETktjR0liblBzUGxERVB4QnY3WnFldnUwS1JhTnFrRkY5NjBDSXNFQ2wwOTdjaFZxVTlhVUlMMjcxcVFtc1A4a0dRM1B0WXNRQmZMSmNURk1iRXhtS0t4Rm9kR1hpaWxZVk94UFhVMk1feU1GTU5JLTVTbEYzcHBUMi13czhqMHJFaExXamFOdjFtZ2p1NE93NFFBd3VtOGV6OWtfQVU2TmlMUzh3R185NW93UE5HNUp5QmJ3SmVoZms2NEZrRE1DTU1GZ3BuWUFGRkdZWV9HUWk1cGU1bGpXUVI0eWJxZ0podUs3WjdneTdNczY4X3NzNXZHSDYwNEtDVnRlZmFBRUVIdjdVanJGLTJldFBDLUxYRVFZaElGeUFUU1hZYTI3Vkc2Nno3SlNoNHhOZnpGc2o1cUx4Ml8zS0RBTG9BLUFBNTNnNUZJLVpMeGw1OVpxTlJaNUFFSHhUb05xWEhWWTdnMUZjRWd0aHNQNGhUYVFCSlg3SklhU01vWDd3M0s2cDZGOWNoY051dTI2QnVLd3hoMjAxc2wzb0R1UDB6V282YXRfV2ZLTFNYRGVoeEo3YlQtdUtxNUNSRElDQjBua3RicTNhTDY1elh1WFVhTG9EbGVTMG9wZzUwVFFleGhxTWEyZFhvSzAtbUo0RHF0VjN6RXQxOWc3SDRNY3htVnFmdUEwdS1Sa0NaaUFxUnNJWjdlOGlKQjBNcVZyYU1OdWVCOUUwYWVieHNhLWNNUjdjSnR1Yk1vU1ZlOTF2MjVINHVtVjlOZ2RjSkxleDktQUxVb3JOemVtRk9zWWQyeFBycVM0d0ZZM1JuN1ppN1JZMUU3QmV1N1JwQWhSTnJjVGk5eXNsS0ZIeng4OW1xM3hIUVEyZmRLd3hiNmF5ZFQ5U0JXRGdpNkVSaHFNRDRyc2cwdnFuRW5ySXJIcmRfSFBVZGhXZnlkbVNfZU5jUFJMTWZEa3BFLU5BeGZLQm1EeHFmNjVIOTJ3NWZxblhYM3k0a0llQVJabDJEMEQ3YVV4SE1wTXZrVmoxLUxrZDRXOEh0c2Q3M25ySEFYU1FnOUZ0NXhrcDZ5OWNrUnVNby1BTG1SWXVmLTZ1TS1DekVqNnFieHgzNE5TQjZQQ3ZMMzM3VFIxYzZUaTNVZDViU1RSazJQMDhPanZXY253NVlwUnV2VEpKVWpnTEdBSUU4VF9kd0x0SGw4cVNuTEFvQjBpbUJaNmx2TmhYNGxhcDN6eFdQRy1lWWRRckpGZnNXNER2SV9qWmV0QTFNaXZ4aDlDX2EtNmtqYUMzNFNNQ2psbXpha0ZoNzVIcFd4NDlweFp2ZHdpUFVvZngtd1YzTzlwN3lsY2FUSVE1cmxoZnhCdHR6X2JtTWY3LWNLQ213Y0FrZkcyajZrY2RnUUI1clEzTGdJTWxKeTMtX01LeDJtUmVBWjZON0pUQlRwQzVFdUZ4M1p5Q3o3eE5HbjlYSlNSNUhNS3pLSWVqOWlQaFhEeVUtNGNzbEZha0RzSjVENW9MQUlCUndxU29QcEUtTElJWk8yVE1KZXlFTzYzZ2tYbk5EVGpOeGtISFdLanBNaGFCS1lIT1dRWnp5cXJEelFseUgyd3ZvYXRWUVBJVE0xOHVhR1Z2cXBuUHd1UGhJSk9NdC1TTkY1eEdLbklzTm9MT3d0NTNBeVBSNU1QTTFiaDFncE91V3pSbEE1NWJfVy1NdXNrZTFLUU1rQmZQUGxPdlpmMTVQeHpHcFVKRmRyY09hb3dKeFVNTG5VdllLVkxxNzhCU2NwY3QybzBLbThtUGRONmRIeF81c1FhR0lTcktrSzAxS0Robnl2NGdwVGxGOXcyOGdjdUJQdlY3SjV0Umk5RDNQSlV6Zmo5dmRuZUE0ZDdFSzRwSVlOQzJQZHdNMTRaYWU4RWoxamh2UVQ1NWI2LUVPRlJ0UzQxLVUya3E1VWZ6bThYRjZMbVE0TmFuZGhFLXo2cVZINUJ2bWRyWHlveG5tS2JwcHdVam4wd1YyUExfdkYzakZLa3lydXJRaTB1VjZOMGpUUTUxclgzYm0yUGRZQ0Z6LTNabC12STBtazRMT2NiLVNGYm03WWNXM1F6ZXQ1VnhjM0p4U3dZUEpnc3BXWDNGZ3U4TWViTFZwZVFfTW1CYXJ0N3ZkSVRMX0x4TWV0WmJyOXcwRmkwOU9vTVI1Z3RjdGlZLTVfamd3ek5zQTBBNmFQeW51eFk3VEZBekZrODk0eGxPLW1QMVdRcjFGVGNRZG1pNnJqQ241R1A4MWc1M0daMWJOV2JYUHV4NVBmX2lMR2dmckRpZ3ZFWDVWUzZsUUZ6X0tnOGd6bnFkNnJ3M0tEUXdoRUllc0Q5U3VRa3c3RGNCZmx1YkdRUEh4QTh2cDNUZktPSkhVN1BpUzdHOGpsanJDQ1NjaFI2V2NfZjY2YkxZa1NUclBuLWZWY09fUkdyYjR4UVdkQWJ4WnY0REVtRklkNjVYLTcwN2g1T3prcXpWbXJqWlB5angxSXJvbjNqSWV6UmUtMl9ZUTFuQThYd3lWaHlBYW1POEFIZTV0NHQ3bUxxZGhLd2dTVHdrblQtVGNEV25HVFN4bWRlXzJmN1dvQjZRZ245aE1odnV0N3JDbEFnX0RkaERzUXpMNzNmeVE1VWUzZ1c2M2pURGZfUTVjNEs0cEtNUUhHQmxjckF3Qk1KNWtUVHpVQWhWQVYwRklXRUJ3ZTRLZzJfVk85MnB2TGhBazczWHNWTEF1clVXcjUzeGZkVWhscjhzX2FOcWpNTzhWSmlaYnJiQzFGQUtwUFZGS0RBTTE1cVlyOXdFRWtJLW4zdEcwbUhpeHpCeEFHYWxXZDAxTEFfdEVvSEV0V3ZEbG9wWjhtZ2tFcDdYNlBEczRaWHFpNjZNd3JfUkdjWk5xT3ZWMXpnNk95elNCU1d4eVdoRTA3REJIUl9QTkVhZ1NBbnFZU1duY1A4bFlLcU1FWUJoZjBua2JxUzlZOVJSWVNvS2NXRVo5eS1xTjN4a0IxSjFOOWtmSElvbHRzRURGWlpZUEFGODZzbnRaNm8yTkowMllSTERKS1R1X1F3SU0taUFXdUZuOEhRZDlhVDgydWNpOGp1dDV2dW9CTmluRTZsNnNFSHN5bEdtY29FZ2pFYXdFUThVUUN2WTFTRjRhcGd3b0NsOXhibDRVMEVjWERJejVoVmR1OERHVG9TUHlCT2t3Qm1tLTVidlFpenk0b3BtN3NXRGhxVWRtUG9YYkpVWVRrV3BNczQ2RGJucXBFTDRzaDJfd0M1NC1fTEVMR1dqdGl4UjBPWEg3REtNeFhVTUVLZzdLeHZfX0k5SXBlYUhhVUJ5dFhsSnVjZHcwc3B5TTNscWZYQWNUZS03TV85eWk3eGlsX19XeHdHQlFOMEpnOF9xYmgtOFF2YUhxcFVWeHpIMXFNb1pvamVzZkVzb1o0YXBzQ0FPbzlEYkg1NlhacDNfQ21TazhjLUpMTk1TbjNsaEFXdzVHandPS0tvaDRmZjhXbDFSbFRSUUNQTEoyM0pweTVHLXdTYnlnRlRubnFGUnhIUVF3UHkwR0lsOUxEV3dyRnhTTVZDR0JZbFBIUVdrWWVpcXRYOWY2NWdoUG5Gc3A3M1M4Wjh4WnpIcllDcTBxemRHNEFZTjNJazVmek5LLVZLUmZfV3VZVWNaeTE4RTB0aDRnOVF5R0dUSmpNa2hiVU5MMkFPWHRwdjY5TVhrdHhvYnNmRW1hcGlEeG4tQ1Z2UlRGZmRmU3Rpd0pqT0QzVkhWazRvUnlGYjdrd1hhYUx2X3FYTWJWZzh4RFNCR3lPWlBHazRMblFTc3R3cnNTZW4tYkR4azdoT29mRENRYkNRemE4cU9rS09pVDBvS2pTUE0tcm00ZmRGV3Nmd1otcmtibWJfR1RXd1RhY19xeTJTT1JCOF9ORkRCQkp0Q20xR3JlbWR3MVRUZDRnb0phN2NORUs3Q2RVUHNaTG5VNlhSdC1ldTdkaFZPMVJxckFBSkdXbkRFd3pVOVh3RzhrdlpMcVhRR0oyTW9NMFl6Q1JYT0lxbUJtd3pIYnMzYnZ1OGsxUk1vREhNc0g2QlE0VnlJa21zaGw3c1pDTkM4b0dfQlBIc196VE8ybmZYbHdwNFgyTVJMRUNkT1hfRkY3eDVRSF9sbGVGbU5VaXZVT2pQUGl3MDRYY2E5eTYyY2l2azloNWhESFd6eVE2Vk1CdHRUMV85R3pTM3RLWUVDc3hLOWctVTg0M2h3cmg3S2tqT2VQQjhieWV0cjlDdEt3bjFNTlBzLV9XNy1ITktHeG9iNC1zRmpEbW9SWHlaTURGSTJOUVBEMlE5d0Z0STh2eE9VSnZzeWVjUEtQTHZJMllXbjM3UU80TnVXQ0UzNDE0T2Vhb2RlSnVGazJ3VldaM2ZQOXZic2h0aEdBZmZmdmNSX3ZtRnZHQldZSXd1cTlVVi1ZZXJZQkVRU1NXU1NkcXcxYXJQZnUwVUNhcENYVG92WDl4bFRLSWMwV2UwMGFfRjBuUDV4dDk3QzRDTklMSTF5aEZISlRvQzZWZkZtM1lhSm9qX1lMc2xqVGtNajNPUUxrWnkycXpKenZCdlM2LXR3RkVfZ0xDQ3dkYl9za1FBcUx0Y0NUNUI4RW50SkotdEE5UHM5TGpxV3VaN2JDVjdkTlpZZEtoZjItQnk0dWVmbGV0WXRzWlphV2stWXV1V19tdmNiM2hvQTFQQU5hYXN3ekdlVjh5LVNfc1R0UFUzWHZqMG5PeFJMbjQ4YnhjaFc5ZG1ra2k0ZTBfdElYbzVBSlJ6dFhNTFllYkVtQkxhYXdpSnJiSUwtLVBpMTV1Wkhob0JBcmdXV0R0NS1fZGc3aHVpd3hOQzhWR1QzLUhNd1hSU2dmUEJhNnJZajFjM3c5N3o4a2xDRWlDMG00VURkYjVXUEtONi1BRDFUMm9KbGltZFpRa2xnT1VCaXlSVmpRRWxDRmFESEFkWVI0MkxqQUJPWk16blFQQ0xqaEs1THVBT0VDMDQxeFdsWlVMRG1DaGRhZGM0cy1zVHpSZ29qQzk5R0VuNDl2X3o1NGtwVDlZTlZlbDA1YXd6MWk3TENicW55REliTWJ1LXBMUjJESkVab0FUYkROVmRnM24xOWpEZ1RVVzYxNEZQZFAxWFpIeWdKTi1wV1lLckV4MWc0dW5EZHJsZy0tNEh1aHRYUGpoekEyOUNjVnh2VTR6N2pPMXdld2htNGdyMmthRHo1VGNEWUc5RXlkLVdoTFFLUHRJUEQyUkhkU0kxRUVrazltM1NsZnQyX3NoX3luWThPaU1CZlgtbWVhOU5NcldqOHhqTkNfWWhuX19zUmk4Y0I1UFZ3Z2RuUUV4VDZ4S3dJLXBNQXIxV3h0ZEZfRmV3SUwwSVJGaFJsQTBlUkw5S09MNGNLRGozRzlqQ3B3S3RHWkxhUW9BV3c2dHVsdFU2a25yeDY4NGRZazRBOFNfZXBUeE85U3d3U3YyYmY1cXFOUkoyU3dwR0VlMjkwWlNiZjdXbklKa0hoRmdZeE9lTUp2czBWUEcxWVN4SENzQmFOWnlUWTFYeTFtMmU3MnNmZzZ6ZVNPckVwQno5Ml9XMl9hbGdSRHd3UlhhRTc5Y0pqRVNpSnVUU3pqaXRkN091aXB4NklXdTBsREEyeE91TjE5MFN1ejVQMm9VRW5iLW9wR1ZhYnRQU2pRSElBd0I3ZlF3eUpMTmtyQ2UtX3F1Y0ZnbHVfTk95N1V2YVFKSEtUb3AySTlYUkd5TE52NjN1Qkprbm9KN1pTWTRSZG03bi1nSHIwQ055SkROenFKekN6WmhEQTZXWHpKd2RrLVFqR2p6aHBjRTVVMm9qcDBvYzd0YzRkaHo1b0ZmS0E5eEc3UTZla2Y1TU9rMkdSRlJWSE1pYklMc21MTnVFckFzd2dmVWxNeHUyUDVQNnlhcE5pcXNEMXYxQkJFNUI2NV9WSEluTktuVW1LMEFJb1V3aFlXTTREZUVGa0ptZm02Zkh5R0xMd1IxZFF0YXBZY0N4Q2ZaRDNWcl9wSjNZbFFDZk1HOGRSQnJUeTY5S2F1X0xJNlpmTmV5dEdCTWFNdGJFb1NaTFM4WVNOWGV0Y0RDZmJkVXVNcm5HdkN6TWg0aW8tc0VtVzdtQWgwbXA4WmQ1aXRqcTdIWFVjSnVZcFJOOHhkUEVJOEFtSEZrZzR0dk5XR2pYSXVnazVhNDhmZWZaZ1JnYXFHQVNidEJjYnN4SlY0aFhzRHFSaUEtajgxYVJBLWlnT2hRTzRaQXFNNzQtOUNLUk5PcXdIVWRWS3BmN0tEY2ozRHBYdW1tVGZpZkNoV25JUnhfLWI0MkZZV1ctakNuXzJLOHhuRXY3d19PRHdMbWpQZnh1OEV2SUlUcW1mRk9NOHZaMGJTWEQ0Q0IwdWQtWjNWTVpiSDk1a0J0VkEwSVgzSWNab2NGMVd3T0FPenpUQ2dMZHZOSzd3NmdBZm4yR3FwXzJibXNRN1VrZi1DSXlyY3lDQUZsVF9RcTA2clJ0WGxWLUlYNlUzLWtMV1NaMVdQNUR5ZHVnTXN4aG5BeFlmb2R5dkNVcVFxa01EdnE3VVRoalJORU1wZkw4MGJ4bzBzWDM0cE9KbVZJS3BMOEhjNVNXRWJINW9hczNERUQtaUlrb252VHBWa1dmQ2tyOFdPWklJQ2FPVS1zZkVVTUxRTFZpVl9PSFJsWDU5bEVadF9SZDlSR0J2NkR4eTZ2TGNPVTVSZnQ0djVrc3hKMkhJOTJqUkFVTzRJNFRYQmFuX2RzX0laWFpXT29iRm95LUNiX3d0NWlvSmdyWjZ0dW4wMV82ZnZyTDVDaUhHSzMtWXljS25YLUdmZ21pSnFfb0hSanFQMnhPSVNnSV82QXpVODVIcWtSN1FVbUNBRlh4aUYzd19uUURha0hnTXJnYzNtejZnRWk1V2N1TUtadTJwSXhldExMM1BQV3dTVE04aEJRc1JkeXlaaVpOMF9DUkxkeUw5OW1laG5kbHdVQVR6emxjcTAyUGRXdVNYVVkzR0JCaXVBYVExNTU3NGx6STV0WjJRWVBkdDdCTzVTS1NwMllTLVBhU2hTMnA1MUxXdXg5VnNueG1oWFpvMmRDT2RoN1B3eUhTNW9SN2J4T3h0akFXMnBwcUZVZ3R1aVFIWV92eVEyUEQxZ0w0RzkydXRicXd5bzByM0J1LUloNV9JUGtwUVhyZ0ZMMWM5eWJINnlEVGlyZk9zVTBrZkpaenhHYzN2bUJXZFZJUDA4QnNoTjRiQ1VfYVVBSjk0cGVwT3N1Z2pFTzZwLXZpUHVSR3VDcWxBcXZya2IteGwxR3NWeHZleEh3VVlacEs1ZnhxOHprNmh3STNtS1p1T3JfLWFscHVlWWw3MUJSUTBOOW44b0s5UUFBZ3hrc0lEZGxuc1IxWW52UXp5S291N1JhdjY3MkV0QTYtLTlRMEdGenhJbUVzQjBya0h6MUxzS3MtNWRESjA4d05MVTFXWllCTUlYWDNpb2huWHhCbjlsbWhJLWlXS1d5ZHpsV28tRmdNSnEybUhqbnp5NVdQck5HbmJ0TzRGeVR5LTE4bnJ6d0FHZFI4QTJaWC1oUWh2OFZWRXhhM3c5WkYySmMwdXBaRVE1dHFlRHlTUXFFY0prVHVwTW5ERWd0VjZ5ejhyM1ltdXliSzg5WDdRWW9CeHFybkxxbzFLZ2QtWW41Sy1nSklxcmlaTGF1TG5SYkVUME8zXzgyajlGdGxRRGZYdU44cUktbEdKQ1Q4SDJ3djlVUEZnNW1IU0VtQXdXOUxNZEEwN3d4ZnBlbng5eFIxN21JaFFianFraXFUY0dTZEJ2bldFY2gzSnFiNmFCb05mS2poakZoR1J4T1prc1JzOGFaWGZHQlJ5a1N0VmpPMG1IZGx3bVBQcklPY0pUc2YzNkExdmt3TXd6T0xSeW5RWU95RURXUU9oaEw5cEU3NFhfYkNCVEMydkVvUkt1QXhtRDVuSGFSakgwMVQwTGltdG5ScFZpeVFSb0NZYWU4d3VxNlU0RWlwaG51NUxOWlJyQTZTbm9yQU02dmlOQWRBdXFoNENPMU5IMks4STAxUXhLNnNwcVc2Z1l4WUFlQi05ZXRzT1lSdG9HRVdLTlhLRGJCcXlsYUxLS1JoT3NhX1paNlYwSWxmOVJQQ1Raalpsa2dvSVA2b3BoU3lHSTVrWlFXcXJrak8zdWh6ek9IYzNyMlJ0N3dLdzFsdE1sRmVjd0taUTNtUHZWX3h1ZHZHVzZtRGpsQ2ZtMldqOUMwY3JPcS1sT3R1N1FRLXN4UDkzUE5MZF8zcWN4RDNsbWVHb0RFTXBtdml5ck1rZ3VLdmJyS1ZQYmNjeHFCa3NJZzRiY19PZy1tamQwU01tTnZEczNKOHFEcENnN1EyY1pEUkljZFVJWmdPaHhsNGh0VDQwc05ON01LYVFodHhSNzBncHlxRWVob2pRbFc4WXFXSENyaUtYbjFnY3NtUWZVWFFIbnB3Mi0zNHJLRU5BcnNiRWx6S2dvdDR5a3N1eHhDUmNlUk1TYXZhbGJ5aC1xSmxCcFJXOENCbVJVRC14aGV0cWloYXlkTkVnalcxbUlVMUFzQzhWMC1tMngwM0g1bGZHYXhBMVRlU2NJQ0JpQnM5M01CUmJQOGVZY0Q0LVdxakFmNTk4UXBiMFEwS0VaUVRFQ3dSLUQ1RHNveUY3ZFRDdUJIZ0pKUEd2WFRrZm1VUnlQemgyZFFfUFFnd3RMTlkxLWEyRDBwWnotakNfQ3o2RkJuLUhSOHBuSHl2aWxMMHpMWW9kZ1NLUkZrNnM3cVd6R2FlSEUwXy1JUkY3Vi1OVzNwTWh5YWpEX3NKLWJXb2RDOTBsLUJXQ01mWlF4b2wtd21qSkI3X05xZkFNeENhN3lzMlVubmNwenZaQ1JZdWRhbnlyQmdEMldKYXJPQmdsVW1oT0tHV1B1RjBLaGEzdEEyNnN6MlJ4U1R4Z2xVbnBuM2ZvRE8wUFdUX2lXbzFCWEJEb2xrWC1MZXhkQndCNlQ0cDIybzF1U3J0VW9lVGlCSnZBWloxOXd5aDRpVVdjS2hERVlmM2ZQR2RyR1hrbTRITUJTTmRPVVlWNW96TW56VXlTdU5tZVZmX3d5am56QXY0c24wanFFekd6NHlmanhPTFFwVUZzaWUxU0o0LXlNd3hwVnEzWFhYbzdFYjh3Yk0tXzE3SVlGYlk0X1N4NDM3QUZhMHl6eFR4NldwU0FiTEQyQXlVMEVwVGlHaFgzZ3Frc0NndlZLbHZOUFVYQTRpN2J5aGVOMmZId1RuLTN1WkpKbGdKZERPcVRuZ2VDNVZZRkJzNnc5SWhndU5FekthNDFLV1hGUi1qb1VCT2VkaE5GOUlPZC03UEprTk9YLUhldWw5SlN1UThzOUFhTUFYdjc4RFMtd2JLVThhWlotdGl1b1ZaM0pEUGFsVENGUlR0WE95RkFhanY2Y21PUnBJZU1tR0xldWVlZ0NEUGVnUll5UDlnWjNLMHV3Vktpc1hzLVZZQVBlUkhwTmtmU3ZhbG1QdzB4S1ZtWS1GRHNoaXhvanJrUHZZQVQ5YTZQLU1takVnUTVSWTRBSy1fcVYxa0xlVHplN1JhN2d1VGs0SW1LOTRkeE9GUy1qRmhleTBXOWdjblhyVkhFa2tPS04tbnpzWU1JYUVHVERSVllldmhwT2lieU8zb3FjdmtPdFdGVlRmbGQzaWdfTXVRYk5XZmRObDAzRk56R1ptOHdPcXhLYlJjb3NFTE5WRUhXSWRyNF95TnJUd3BOMVd0emNiSFdaQzJESTdIcEdlR2t6d1VleExiak5LRHFfa0Zuc0xpMGo4dVRNSFFsb0hUdUJRbnJEcllTdV9rbUw4SjJqWEthbTdtQW9BMDFuT2dkOC0xb2gwR0tpUmF3QkFJSklkMjdWRnRxUWx2cG41eUUxM2Y1QUQ3Z21rUDhwMi1uRDlITVkzVS0wcS1QaXU2UGpIMGpaZzZhWDRPY3R1bGZfSDVLRFpRSGlXUVo0QUlMQi5YWklmazRvR2ltYkJVUTZBVnRNaF9n"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/1562f28639b34e5b915763894b2539d2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rg-vBO_azk7ZPkj5ySYmGcVJnuxS7MFcBuIcVdzn5qfUOP0j0_HBH0yXPQNciRBl02T8163OFhP7IgmRVQm3ocB0qVrpnZzTUlHVQdNY63a68NIzOQPOXoXGR3SpUtYdm2nL26Evx6LRewm3d3hNA7lf7751XdDGnFKC6Vg19d7oVzy9Y29rPpgkbb-ZtSai0ND_MD5pRdMLBf4YSGyNyDC6HuCQGGLLY9mf7d5TEJ7Uu48na-zLuTjWg44PPtntsBVdfGR_bvr3r9uHUMOLGvc08O0C3Alb93T3V4bUHep5jaBvYFk0WxrYB2LYzOxrl5SCjuROCcRXIpuwh0G3Lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707025,"updated":1564707025,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'f6edb534-a9ce-4a9f-8df4-a3574c2a6b3e',
=======
  '0e354332-cdbb-4800-90c5-b622174c721d',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:19 GMT',
=======
  'Fri, 02 Aug 2019 00:50:53 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '708' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/')
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
  '475dd004-bb52-4f35-805a-8c4ef3afe97a',
=======
  '0ce42e48-8ba3-43a7-aae9-53eccff1c5dd',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:29 GMT',
=======
  'Fri, 02 Aug 2019 00:50:54 GMT',
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
  '8dad87c0-dc37-4645-921e-d6ef707b2900',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHGgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:30 GMT; path=/; secure; HttpOnly',
=======
  '98b49210-ac68-43df-a252-ab7d9f490000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHGgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:55 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:30 GMT',
=======
  'Fri, 02 Aug 2019 00:50:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLllkaW5vTmJ0a1NkS2JBUmJUWlcybkNGdEdsSDBrVjhtYjRkbTlNaUZGSFE4dEx2UWJiaEV1eHQ3ZnIzREJxeE1kZVF4Y3ZwdVpnYzBrTDhHVEdZLURSTjFaWDBTRm5zbzlZS2JEY2dQaUpOdHVXU1pkOXlURmpmMFU5a0d6ejZGQUVEa05CaWZvaVRQQlhlLUhZTU5XRmR3M0xlOVRyRkhjWlVqaDd6ZGI3OWUyRDhkM1JDNjgxREFBaks1NFlKSDdBcWtSY2xoR0dLX0luX0l1TThDcWRvQlliNzEzcU5SOTZVTHc4dWZQTnhEa0JndWJQUzY5R2xWRmhyTUdQSllXUXBKd2d5bms3bGQyWktpWS1fX1BzeFdiLWNHWlFyYTRaWDFjUVNWejZVZUt0YTFud1hjUUhoTDZ2RDc1SmdyRXlabUtsTFd5Q05ab0x6enZFVVp0QS5PQVY4cGFXbUJnUFVnX2toQ0Z6MG13LlhCcTJPZVFwVGdHZVBma3Nmc1RfVUU5NlRKRVpCeUFkcG83OVBsLXJjakU3TDRJajRfSm9uTDBlaEFZTktiRlloeGYwMWFXLVlHcE5KSnZWa3ZxTlkwbHdGbFNtYkI2YXp2RTdCYXI2S211REsyX1NMYWdoX3dCVmIwSGd6bDR5OWZEWEVuY3dGUEdKbWdGMDhXVjhZNEFkbnZpSkxfMTJka09yRFo4MWV6QUJZcHd6bXZiU0JvbEJXcWRPREpBSzlMV09Qa1Q0b2hqdTAzZkl0TVZYYzlWMjdhdE5faEMzRUZvZEtteDI3aWZHRi00MGFRREZCZkNpU2lqTjhxT2ZMZnM5ZWJocEZLNkw4MGd0bmcwWngwb2xwendmaE04dlJGUGxCYlRZbHJtcUp6d1ZFSVZsdU85OFl2alB0cjl1R1ZNdWFLQjlQd1pSWmtkYmlLQXhkMkZNS1RjTE1ocU5tQWNkYnpiSDlyem5QaTJORVZEdktKd0VyZGlfaC11YTNEQTNYeXV3SEs3T254Nk5ZY01OS3JLODBWYkRVbXVJNUdGaWhiV0FlVjV2UnBUMmFhSkJQV0RGWS1LMzZ0ZXlfZTJVLTFDOWh6Yi1DYXJScXl5UmlpLVd5WS1xMklKSFBHSE1fbVNJb2o5SS14cGs0VVBrWFhfSXpZOUtlcEdUMDBYUVZsSENwYXA5TTBVVkVPT0JPcmg0eEV1UEpQbnhPLUVhX0NhT2lwVk1xdkpJdHhKR3VsVFBuV0k4NWdZbFZSWjBmVTc2TlVkaVRfRFdwWV9oVjZvQWQwQUtZbk1zU1ExbElOckNhazZ2MDkwUWV2NGczZmwxc1h4LWZWcXphQ0xYYVdxWTBmRzFXc0JGZUc5ZWRCbGlUZm1RbWdUa2RqcVUwS2I1UmUzUHpiSGRvd1d1bGluU01EUVlNR2IycTZDRkFtRVd0WWp5M0dycl90ZjVOclB4UXg0TmNfYVNCQ1JIRUctM0ttelVyb0g3UXBNeFRWOURTdTRucHJXQTIyV3pwcmcySXBEamZrZ3U3SGxpeE1rZWo5aU5hZzh3a0ozWV9FbUFVYUZBTWpaS0hBU2wyMXhILWh0Y1JUZEt3Qi1tSG9Tc0ZxRTR2cE13cGhzTlVCcXhELXduTktORFEtb1AxS01sVVJUUnNPbzllb3ZhNTRhSHRWZnE1ajdTVjVUa2kwUlBxeldOUVBWOG9ma3VwWFlxb3JRZWxTQkpFV2RXdGxSbUE0bWRwTkl6aW8wa051TG1oWTdNV0FXUGtRbTFlbjRFaWtqUy1qQmNCeE9LX1ZWbm5LM2RIcFJ4MWh4YmpyOEMwZG5ZRVo1T1BWd0xXLXNJT2pCVlBLYkMtWjktY2Rmcl9nNlRVUUZQV2NJemNsaWRPNHI5eUUxazVxWjJ6VGozNDBEUHpYTkdWSEt2bW9YTGg4OHpqYVpRTkNJeXdKejdUNXBGdUp4M0xNeVVEaVNheUlqdWJITkRSX2lRMUJpUHNwamN0amQzX3dMZlZSTWFjMWVxeXZ2Q0IycU84SDkzeWtLYjJZNkpMam4tQ2FPdmhmdFNTNHRkSGh3WXRZTko2S0dtd2F3d25Ra0I3NnhqckN2R2dLandBczRJTlBzVzI1LWliX0RRTW1OZHBjVUx5RU0yNGs0WWJQQ2Y0NUd0TFZabEg3eFdadlFOd2JiS1RkT1NicC1mLWlsXzBjUmFMQTJuRmVyZ3paZU5lSTFxSl9PV0stWU9RT3h3WDhUTXpOVHNPcEhFN2psdTdRczY3QUZTNUdUdnhucVA1V1FmNEN3MzBVY3hsX1ZtWl9wR2RSYUVpVUNZb3VLdnVIdnhTQ1BGTHNZY3ZNZDBrei1DSWZxa3NaT0tZQWxtYWZzSDRnZkpCQjM0RjA5d3ZnZVl0TEhxSk9UdmwtNlRVaGRpbzhhNUZtdUszdWtUSW85NnhCUThQbzViR0xySHphaXdkckZJU09zLU43SFdzQVh2SklhQVp2VE1COVZudTNRRWJsbkRZdnIteWE0YnpBYUVZSlVCNzlXOVU2X01UV3hmX3dLWEZCckREZGZxUkMyOFhUUVFiS0NtMEVDLUJPM1lMN3hnOFFTUm10bHpwbXNhRDYzTEZMZ3F2M1diN0tjejRfSlZrdFZJWThrekVleHduS0xFOHBTVkVuaWtsdHFnRG8yajlEc2lDNTBqR3QyNDNWNVZYU2MxWnhDYlQ5YVVFMlY0ZDZaeWg0dE84VmVaSWVfa01VREVScnlQci1mSUhJUzZBVmJxTHVLcVZqRmwtWkI5cjVLVThLd0JNeUhQZnRBX1dLdDFMSk12T0Mta0kxZ05NTGFTRXlTVWdRMnAwRWNFTWtiMkFkQXlxa3ZVTHFhQ05qeEdvZnBCTmJPVW1mSXFFWTl2dzN6alZWYjhUY1B4VTUtV2ZSU3MyOS1zdzRtQlg0ZmJHZG9SLUhYSnEwY29TcV8yaWJ0MHNKQTBnNGNTUXI1ZTQ4WWxkeHRWMEtPaV9CT3NZV0ZGU0NSeklCZHROTFU0alRGaUlnMGpFNU04TEhyN1dheUp3eEN6NENsZTBzR0dyTDdvU2hPRjhCWFR3Y1BELVZtSEVYM3hHcUIwekYyNHRXeHU4UThOMlZaT2pwVE9PZ25OU1doWkhZLW5GVUZlMk9LNzNGTG9SWWM1cFR6cXBsNUVOMF9vbWZVSzN5TnRDTW9WS2xCQ21RajF2LWZNYlRTaGpaWjB6SnRPR0JKVkVWdS1NR0ZXQ3JGOUZFLThWSEdKRVR3cG92THByYXlvZmJhdUw3SVFUbXRESjlkbGlWS0MyZDVXcF9aSlpoX1lqWGVOQTNVOUN0eVJ3ZFcxakRkRWxUMjNlWllkRE1uakliUUNKU2RQa2FlTmlKc1VpdklZbU9QOHRydEpVUmRfdy1KLW9FTE1qa3ctcGczbkwzdzBxU21XeE55dlN2TWhpcTMyR2NNc0RlbkZZR2k0eWM2TGhVelNYQldNamRZZzZHdGd2MHFQS3VyRVVVeXIzTHl0Qlo3TVlDTjFVM1FNdHN5WW5FUUtoSy01Mng5bUJZWWJ2VUJmandYUlR1Vjl2U2N6b0FyQ1ZIMGRLazZ3anBMT2UtNEJXZVFHVXJGOG4tTkk0WVJySEFRN3NkNUFGbTYtUGU5emNGbFRrZEFEZkdHQzl4MDhab2dhZ2ljdlFGRDNBR25xSXExVFpFS29IR1RYSWhWZ0RVZjlCRTZ5TmN2Qmlyb3ZmUnVXbnhYMVA0djhwcjZrWnh2emE0dWVXY3Nyei1aX2t2WGlKc0pKSTN4ckVhdHg3dW1CYUdsT21jTzZsLURaYUt1Nk5iUXBrYjZJQWlkT2VWNndTNHNKbS1DM0w1amhZN0JZVEVzWmFibUw0QTNDb0xGS0EzYlEtNjlNM0hYRWd1X0dybGtjenNnOTNwbTJUWVBXM3dqb2otY0FfQi1XMXNYM0tYUU9jakJBemwyVTJUaVlwYkN6OEktOG1zQUF4c0xEVUlpckFQd3dOeHlTdl9oYkNzQkdKM3dCZjN2dDh1MFFYdDhmUHdDaTRkMjNRU3Z5WWEyOHk3eHpkTmd0T3dMbkpiMHA0MnZPUUFzeUFXX09hQ2lKTkxMV1oyaUhVQkpsdWI5aERSdWh0cFFUQjh2X0ZiTEJuSmFYZGtsTjEzTzFFWnhwSWlGbnp6ZFFCLWJoRXkwS3RNZmt6d0JxWmQwRUYwY0JlcTVxNHZpQUZFYlNvQVJfT2p6LXJsYXRuZHVxMGVUbW4wQ1NQRndXRHhOay1kYkVVME5pTXVwYk80U184TVlWMlh4WHZnSlRCWEpqT2pJcVBITXlJVzkxcVN2SWRfcm1nSzlwa1RaZ2h5aUxfd0tla3QySDdDZ1ZsdFFQTlJfY3hSSG5PamdRWUlTU2JCeXZtMnJhNFNlWkJZVEZXbzZFblczaGFEQ2x2X2doOFMxNThsbTNtNWgwTnM4ajNwVWlxOWIwelpqaDZjSlhGbGlydGJERUtWa1FUbXIwM0lpVFd2aGRONkRud3c2TmM5b2hCNzB2Q2NKMDZwNDc5VE1CYTQwZm5Jc3lSSVhLRHZJWEIzcUJEVTdLS1o2SnhTN0tFVHlGQVFVSFFaOXRqQllmZVVVNTZoRFJxVFJaRXpiWG9EWkEzdDd2YTVRVTdUc2dvVnctTkVlOVdLaEctQml3SEh1UUZnTlUwVERYTFYtcUQ4Q2RXRW04QzZmNU44RFlvQmlIdnRNbnk3bGkxdDBBWDdmSVZYaE5xQ0JSaVd1bkF6eF8yZ2ViVjZRZFp2TlNJTWdMSXhkZWQtYmZ4RlpCVWx2cmdZc3FsV2U1b2ZzcUp3WWJFdHpKWm9ORUI5RWkxblh1SVZ3RHl3LWFvR3VHUWJRSGdaYnB4c3o5V2U0a05FT1p3dDZJOHA2RnNMQXpVN3FXdGdQcmpqcV9BZE1iVzJzNlJxbGtwQndfLWNNR2Z1VHhkVXhvQ0t4VFBtdkpJeVRYR1FpNldmV0w2NEQ0TENBZ3dFRFZRODczM0QzWGROUVVwNEZYSnlyRHJxMDF5TWxQdFJ3SXN3dWdEdU9uTDZQN0toVmI1QWFxRVdhdWRKZ3diVV92Vi16cWlVNmhPWWJpUnBLdlZkWlVTc2dCQzJ3eDhhaUdQVTVfa1FCMVUtS3JaR3VwQzVxYjVTX3l3YUswLWU4WFFHQmNoR3BCdVpmV1ZfYWVQVGxhUWtZN0liVE9pQVdLNEtHZVZjbFhCTVRXTVBXTFZ2Ri1fcVJrdUthZGpaSmtzSzFnbWx4c0ctQzJKbEhxYkZFN21KS0Ezd3J3RGRfdElTTWJ3MG4wUjZ2d3ZhTDMxSnM4UEJONXJlVXFjUVduNWZraURvTFpQdGVhZ0N5WU96T3J0cGhtOV9KMEo0dDE4RDNqdnFyeDVwa0szd3A0cllyUFRjSHNzUFFnN2YxY2tPSDJMZkVpaFlOSnFoTjBsSXNwRXJXT1VqR0F2VVB6bG9VVGowYTBGWTBXREo4MW9mYXNoVkszNFlaRU1lYTlIM3E4Rm9PTXg3YTFnQ0RaTUVTZ1RNbGZldzlzMHRyZ1VyM3hScU1kdTVrSEJlSTdpcWV4S1k2NS1Kd0VVMy1QTmJ5MEZDX3dVYk52TVl3MUY2RXo4S2tGZGpLR3c5T29IQW0tZ2VRallPWnVBOHF3T0x1NjF0TjZFQi10V1lxQllHS05EYTB5VGZHaFoyTnV1bDByX0RyOGlKMzRqOUIyNURfS19XdnNuMmxQZDlSTU1kRXUxRU9pekkxT1d0a1psTGlwRzBlNXNObXp1TUhXelBKb00xbGlrb0Z4WERuTEVTbXc4ai1xRTVKTXBHYk9lRDdzNVp1M3JkamNkTUVXVi1ZUUlMQXoteXJZRnVtVnZxMThZWmJQR0xSdHdMbDUxSElTbVJabmZTQ0prTjdtSUVtaEtLaHhaRHhfdUVJX2gtaGF0NzhzbEdzbUNYMnRjbVZ4ZDdmTElQaWdJNHlmdGZRMHNkV2M1dTUzNm1veFNnREVSNnY2cmlUczdjcTREUzdJNnRfTjd0X1E4WDFiLXVFSUdoLUZnVlJ0QjJpNzRLRHcyYWVtME16cUd0WmtjWGtnQzEzQk10SnQ5VUdaaEVBQUdmUFNVamRRdmZWVFUyek5mcHZxdG84dnQ0Sk81RllhX1VvQ3FwLXRqYk9YUllBXzJ6NkVSeVZfUmFmWVpJY24zLTZZNUktelg5bHNNb2FSSnd4YzBvcl9ob0hqdVVzMzBHYzB6QWsxaUFMS0RTdk5KSlNsVHVZMUdmc1Q4UkhWR0R4UHFQWm5yOEVKclJVTHE1U3UwMlRhelpTZEhEU2dSV3hZWFFCOGFSMi13ZjBzTjNSamdxTlhmT09SNnlkeHVFT2ZNR2JYZ3hKclJEU0dsR1oxcG83akoySnBTOTFEQmNtNExxUHhnMVQyc1NlTjZ4b2ZCOGZrR21YMDQ4ODYzeUpnb1Z5YnZ5OFppSWYzSE5QMDRNUHlPMlRuUzZNVXo2ZWhqT1dCTnozaU8zc0I0N3d2S0VzVDNKcG9CX0lnbGFyS2Zta1FSYVF1R0JzbHZteFh0OWFFdFZWdGZuZjhkYzBPVHdkTlZZZXg5Z3FKdkdvdkFkM1NuN2hoM3ZxVWx1UVlTWkYtZ2Z5NVgzNTdLSW9BbEZOZS1CcTUxTEFyTkVDTHFZZGFXMFdERzdENlhxaTVDMnQtQWpkMmxkaWsxQXBqbnlZanZxU0F2bXNKb1Y5alRaMWdvZC1EZkJHZ2lzZWozWGxDYk9ISUt3T1hwYU56Rms2VTZJeVU3amd0YmxjYmpiNWdHRjU5cXVZbmY5Q3FoNE5rXzNzbGI3WmFReDN2MkpZd3ZobDVLNUpSRnNpcFdIQVhfT1ZHY3BqZzlXNkxsZHVDWGRiQmhLa2gyQWZxeVNYanBWSExBTWFPS0NDUC1fMTN3TjFwWTJ1T2djdlJUSXQzNjk5YnBqQnFKMFNQVm1zRXFaM0pPSFNNM0xkRnB3UHFHblBPQ3J1eUV2cE9PQkRrNDVhVVRIYV9jWlc4cmpDckdHQ3IwYmo3c0JqTHF3a3BmUWdwZmpkdEF3WTVEYWpqTnNQRVM1bDU1ZGF0clE5bTlSUXlMaE5YTW84WVI4bnA3R2V6akdCUDYxTFJFbThBVTZmZC1KaGxsd0lwS1RDalUyZEFsY3pZLW9zM0NZZXZYMmNZWHF2WVR3RHpmQzFMNEFrMWoxek9DZlpNX1NfZDZaZmJhcXByVlpUS0U0d1BSWE90Y2stdlhJQVcyekpTajZVNWswWm1OR2NxdDIzSGl6NmQ2Y3V0TkkwcnIzcTZMZGo4SDZUWXlwTkhZWW1nNzh6UERYZVJMbXVjMEFmcEZ0OGdLcGFONl80TVdvcFgtcGEzWU4wUlVBUXNUaEdoQ0NZVlZBaEpKVHlkc0o3bEV2Y21jTG5RVkp0dmt0RWFpdmRfOEZKUXJ5VHJlaU1kbTZKYTkybEZrZW9UWm5KLWt5M1RoVE9uXzg2am9nTHQ2V0pvWktWQ1pyYi1lUW1xVmU3akl6cEY0SkM5YjdCV2RoS2xXSnRCU21YM1dmYXZlZU9Kc25kN3hWV1RvT2FVaDNKQmVkOTlOeVNaNkYyWUdfdV9GMkVGV0NBLWFvdEY4QnRFN2w3Ulo0dFBDOVdGOVpWcmg4TUhwSXMyYWlSVGhpNnhueXpYYjB3M1NZWnQxUjFnTGdiYUJSck1mZ20zUkZ0Y1NsV3dZVXp0VjdBODRNTkNKekh4NnlVVkZTTGJTdjUwRzhhTWg0cXpxcU1KcG1iSWFLUUxkXzVpR3hqSjRFMWJOQWk1TW9ndUY3TzdTeGYybDdPSkI4dDJFZ3JGekpKRTRqSy1iZUFTVS00LTVkZVk5dXdnenFnMGhNUTUtVzF4YXhCVHA4bUR2VVlIeFByUm1uZ181NjR1b3pabEl4UlRzWV9waXhHQTEyejdabXlNUTFXaG4tOE5jTU40Um5YdVY4aXFOcXlEQU05bEJFa3R2ZVhJVVJ6T3N5cmQ3Y0hTVzNoSzR2MXc5QVZXTUQ4blF1UU9RYnhvUUZhTDAxY21nUmdrSnN1OFVIUnNCek1JbzFTdjQyM1lxSnhVejA3NElITmlfM1NUeVZrdFRGM2RGbEJJVVgyQ2dGZ3hLdks2NE1leDRnMVZyWFIweHdaY0VVeVRCVjZBQ0RMRG55MFhyNjE2UV9McExGNzNIYS1MaVJYbVE3NmlRS1RheFp5QXkzNDJ6eFR2eFhfUEVXeE4xbnRGNldQOVctdGpiZllkNjJSYmI3NFdjdGZES3MxbjYxcTZ0TVVvUWx0ZkVTejhHeVVIN0h2Tk1nUWJMTkRhaHJlR3VJcUdDSTZVWU8zdklKd09wcWhjakxzX0hydlVGTnZsa01PVUNIOUE1cVhlS2cxOEJ5cTN6d053SG9fYnJKUjB6SndUN2pYdDdPamViVThuWGNYOEFUM0FkQ2pVY0JfVk9TQkhvYkJRRTVFdUFENU14dDFlUU9hRTM2WWN4NTdWbk0zS3lRWThKTGhjeml5MHVqZ0w3U2JTX2J0bE5zRTdTTk9RcHlZaXlRNTBveXhVQ0FkOTBMQ3ZMMVJwZ1JEN1BqRGFpazVmYVNSdnV2YUYwTlBtd08wNXhWVEw5aXlKVGFWMGpMcGg0OXR0UjVYVXVtQTVIM2xVOTVna1Jsdk9GUG1lbHhpaGFnamxUQ0dfd2ZVOXpLbzFvb082SjZmZ2FXNVRUOXp6U1V5TTh5VjlwdVViWkZhSFJlUnVYeE1WY1g5dzQtRFN5SkdSQktuWHh6b2NPUklrMVJJeUh5UkYwZWZ1NzF5ZWpQS0RBeS1fSHBPcHhnZzZJQzFQTnVKYUhOZ24wZDRUTTFjMmlpbGgxXzdReE1ZQ01hSlE1VmVfSHdOeU9mbzMyREVwczZCMS11dEhfYk5qWmhYa3RtMnJ6OXdUMTMwZkMtcl9vLXdMX29ySlM5ZXNMdkotSWQyUFVFN0ZSYVVvWlhULWNBU0RUTkVsUmJTbWk5NVdCOGpwSzR2VTE5QzFERmhFSE1BMXJFV1ZJQUNZZ210eFMyN1RjU2VtSWJIb0liOG9neDREaU9ZeFd2OEE4a1daVkxTZW1jQW1DeklkSFNUNUdKQU14OWwxcno3OWFpUzA3dmJHQkQ3ZHRRbC0xSk5JaFI4dXZVWXhJYnNVVm9xSUtLOTdWTVdodVdqTU9Gd2xrd0psQjFxU0RUQlJtSWJKN1dlZVFsbXJ3NkJjLTRQMWh1WWJNMHk0U2Ywak5IQUxWTUNFUk12X1Q3MFZKOXdqLTZfaUgzd2ZST19fRE04LTlUaVpwYkJiZWFFblBMbHVLbDhCQmMyczF1SUJxMExwaWFGMHBuUTV0ZHZxbUprMG54VmlQeVlIWmRJNWZFTllSRG1Db0prYjlROEpodXFnd1J6cG9vY2I3ekRLMl9YSmZmTXFTYWZUT2x6RzdfdlluUlJSbjJhZjdFYzRId0w2TE1rYXpIbHh5dEN6SmNfUTBJQTFNbG1qenJCTTktVUNwMjVTRUwxanVVbG1ZMWpON0doa2gzR1R2MnlPVlFNeGxXMVJta1NCZEsxakVRTVdwdGV0LUJRMDBjZjhjREo0dnVIS004aXI5UzhHYi1OUDZOTVpraDF3NjZyQ2RXdTlZMmVHNjdZZ3gzNTByckhaX2RPTERHc01HVGhwXzJxOGpyNUVsbm1HUmtrU0lJZ1QxdkZvSDRZb092bTViVHNHZTlzbjZqSHM4MzRKbVBXS3BqX01qbDM5M0JXLVphdVNMZi0zLUNDTGRqdmxSaTRLbDh4TG9yWGRpMlktVkRBUE1wV04tai0wR0VSNGptNm1jYUpWaFFpTl94OWRMZHhSTElMY1NGZGhDYjI5c3VQQzJmMUxRRldSM3JvazhQNHVXbnRNREhMRXQ4V3E3MVVnMy1CVnpMd3NiaU9ob1g2YzAzbUJKNXNqYy1VYy15MlMwMkY5WnVud3dsekgxYVJaaDVkOW9PUFhRU0oySnJJWXF6ZGgxT0UzWFNsa2pmaDEzTjhzWUN4a1NxM1NKbjRoRndIUTZoeUdhZjh4R3Myd1J2aTF6VW1fZWFncHNHQUZ3Sjd3bU82ZzNHRmY0MmN0eGtZRzNfd0Nzd1R6bWphejN1c2FWVHBFZnV5X2Nseko3U3VBaGx6MFJ3VWNBZXl4eFdZUWQ0UkVDZWFqQ1o5Q3J5d0Fwd0FweVBZb0RSOXJxdWRHbzlndE5QMDJtSHNBV2RZZmZiLUdaaUlYRW5wNGVkcS1vWUl3N3RPa2UwbFFfaW1KOWN0VGpaZ2k3TF81T0VPUVpFRGNkeklXdlk0bWc0cUlXMjl0dHZ6LXNycnp1d1RhN21qdVhrMG5jUmJtUHpEWFFnVnhyOFF5a1JpQ0V4UlFpeXdSZk1ObmJ5b0hzV0paVnRPVlNnU0ZNMkRYTG1Jck9pUmNPRE9RMXBYTzFIV3drTld0enFoVVFqQi1KUVpIZm1DdkdjZFNPTG4xV3A3eGFnay1IQm1abDVJeHJHaFdCLXJmQktPdFpjVHZnYXh6Z0Zobk40LVR3YjZSdjVYNVRRbnRScEZYeEVUd09rYTctdnMtcEpobm9ic21IXzFjRFhZVEhlU1RRSFk2MEhpSndJV1A4WWc1UFp1Y2hDWDZFWXVIRGRfbjlSZnBwWldjRmZZcTZlUFhRbWVIa25sQk51dFVwT01NdzVMYU5vVXJycGdTQXcxLXVEZV9VckhxUVZpaXRINzBmS1V6aTRMeVFzOTZSMjVQTTctYk96RW5TemdqeVc1MXVSZEdMN0dLbzJfVDNCVVIydkJrQVB5N19CX2V2a3BlTmdyODZSUFk2cWRDV2xMYzExbEVfR0hwUFpUQ21RWTl4MHNEVjNTQWhLTXhKZTdBa1gtUERDRDdBRzVXMm1xSnJDSzhoRy1kYzE2d0k1ejFUcHJXcGFlTzZQMmtfekdUV1JjZ1RoLUJ5enRPZnJpTmNmWnJRQTJMa1BTcmh3cTQ5LXhXcGJFREtyb1ZfaXVMN1RUUzVzaVJYZ2thdlpsc19ScGFqNVlZWjJwQUdibjBKTkJCdngzM0pMVUNsR0N2bzdfaFBRczJHTFR4Z1h6di1HZlVwdWRDbXNNbHU5VVNZNUpVTV9KOF8zMGZjVXF0YWxqaHRZRVlHQkdfN1JJT1RiQkNuYkNpSFdWMEM5NjNEbmloZ2tXZVpZVExHZ1ZFcndaeDREQ3dKSkliQm1RdVU1Tm5sZ0FxbnlxanBrMkVjcVBwMWJJTmZBM1ItOXBfcE1FcnA1NXYtSFFCQjdRcEQ1NWs4T3k1VGE4V055ejRwR2FxM2E1Rkg0aTB0cXV1dVFYZVZmeXBkYmptcTY0eWc3Z0J4QmpDZndCZkU4emYxMnM5UHZjWVZadnBKTThOWDFyeURraTV2anBNNGJwenVuUng1aTZrY01nWC4yQW5vdGRSRHZsU1Y1OG45a3YxT3VR"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/63acdb9cb40049ef960269b0a1806df0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mUIdc0GYT5jPpgDBi0Hu6pH96eDRTPDKP8NT75pErIH9YfirxknPRcZ4yX3jWCTqZZJnd7bLuiEp-V7dYfuH8ZovZTk8vGZyDAzt_EwQzHMk9SfQiu2-Un2ABoo665aiw5bENndgjVXUtxnlocSPrNuxyKmAEPQRj0iHPKYHfVSZL95ju8CyBrKtD9ZHjypdsUiBuulmEPRGFj0QRfDJeIzU9TXC5L1U04zGF-i4ldapS1dNCgbHxzgOhOtofbFnassyx85k3A9YzSIKl_T7MsaYo3-QvxJo2YGcj4YSgBsdd-EpGK0-oUCfx6OwKEruw4uaZWrcGzJjUKxaBVuY7Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681975,"updated":1564681975,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .get('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/1562f28639b34e5b915763894b2539d2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rg-vBO_azk7ZPkj5ySYmGcVJnuxS7MFcBuIcVdzn5qfUOP0j0_HBH0yXPQNciRBl02T8163OFhP7IgmRVQm3ocB0qVrpnZzTUlHVQdNY63a68NIzOQPOXoXGR3SpUtYdm2nL26Evx6LRewm3d3hNA7lf7751XdDGnFKC6Vg19d7oVzy9Y29rPpgkbb-ZtSai0ND_MD5pRdMLBf4YSGyNyDC6HuCQGGLLY9mf7d5TEJ7Uu48na-zLuTjWg44PPtntsBVdfGR_bvr3r9uHUMOLGvc08O0C3Alb93T3V4bUHep5jaBvYFk0WxrYB2LYzOxrl5SCjuROCcRXIpuwh0G3Lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707025,"updated":1564707025,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '6f681362-01c4-4282-810c-440dafb2404e',
=======
  '647a5e73-b26e-444b-8c44-7f912218c9cf',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:30 GMT',
=======
  'Fri, 02 Aug 2019 00:50:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '708' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '636d290e-8fb6-47d2-954b-82d465787679',
=======
  'db619bc6-9892-42bd-a639-53c34f7dba23',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:31 GMT',
=======
  'Fri, 02 Aug 2019 00:50:56 GMT',
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
  'b7c0f567-b5ad-4df4-b50e-0e288cf62b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHGwAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:31 GMT; path=/; secure; HttpOnly',
=======
  '2f38281e-55c2-441c-948e-fda2801e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHGwAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:56 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:31 GMT',
=======
  'Fri, 02 Aug 2019 00:50:55 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/63acdb9cb40049ef960269b0a1806df0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mUIdc0GYT5jPpgDBi0Hu6pH96eDRTPDKP8NT75pErIH9YfirxknPRcZ4yX3jWCTqZZJnd7bLuiEp-V7dYfuH8ZovZTk8vGZyDAzt_EwQzHMk9SfQiu2-Un2ABoo665aiw5bENndgjVXUtxnlocSPrNuxyKmAEPQRj0iHPKYHfVSZL95ju8CyBrKtD9ZHjypdsUiBuulmEPRGFj0QRfDJeIzU9TXC5L1U04zGF-i4ldapS1dNCgbHxzgOhOtofbFnassyx85k3A9YzSIKl_T7MsaYo3-QvxJo2YGcj4YSgBsdd-EpGK0-oUCfx6OwKEruw4uaZWrcGzJjUKxaBVuY7Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681975,"updated":1564681975,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1564707057,"scheduledPurgeDate":1572483057,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/1562f28639b34e5b915763894b2539d2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rg-vBO_azk7ZPkj5ySYmGcVJnuxS7MFcBuIcVdzn5qfUOP0j0_HBH0yXPQNciRBl02T8163OFhP7IgmRVQm3ocB0qVrpnZzTUlHVQdNY63a68NIzOQPOXoXGR3SpUtYdm2nL26Evx6LRewm3d3hNA7lf7751XdDGnFKC6Vg19d7oVzy9Y29rPpgkbb-ZtSai0ND_MD5pRdMLBf4YSGyNyDC6HuCQGGLLY9mf7d5TEJ7Uu48na-zLuTjWg44PPtntsBVdfGR_bvr3r9uHUMOLGvc08O0C3Alb93T3V4bUHep5jaBvYFk0WxrYB2LYzOxrl5SCjuROCcRXIpuwh0G3Lw","e":"AQAB"},"attributes":{"enabled":true,"created":1564707025,"updated":1564707025,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'fcd4d546-9b44-4eb2-971f-9606a0961e72',
=======
  'de778f3b-bdfe-4840-b2ba-cf026df0b293',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:31 GMT',
=======
  'Fri, 02 Aug 2019 00:50:56 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '891' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'aadc2254-1522-4839-aa4b-1396f084243c',
=======
  'a214f157-1d55-40be-8356-ca2cf322e590',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:32 GMT',
=======
  'Fri, 02 Aug 2019 00:50:57 GMT',
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
  '5794e41c-fabf-4e39-86d1-628057b22400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHHAAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:32 GMT; path=/; secure; HttpOnly',
=======
  'a2acc1a3-2ba5-403c-9c8f-b80a9f1e0000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHHAAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:50:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:32 GMT',
=======
  'Fri, 02 Aug 2019 00:50:57 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1564682012,"scheduledPurgeDate":1572458012,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/63acdb9cb40049ef960269b0a1806df0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mUIdc0GYT5jPpgDBi0Hu6pH96eDRTPDKP8NT75pErIH9YfirxknPRcZ4yX3jWCTqZZJnd7bLuiEp-V7dYfuH8ZovZTk8vGZyDAzt_EwQzHMk9SfQiu2-Un2ABoo665aiw5bENndgjVXUtxnlocSPrNuxyKmAEPQRj0iHPKYHfVSZL95ju8CyBrKtD9ZHjypdsUiBuulmEPRGFj0QRfDJeIzU9TXC5L1U04zGF-i4ldapS1dNCgbHxzgOhOtofbFnassyx85k3A9YzSIKl_T7MsaYo3-QvxJo2YGcj4YSgBsdd-EpGK0-oUCfx6OwKEruw4uaZWrcGzJjUKxaBVuY7Q","e":"AQAB"},"attributes":{"enabled":true,"created":1564681975,"updated":1564681975,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
=======
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
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
  'b5e3af4e-c37e-43e9-ae37-bb4387b9f4bf',
=======
  '464453cf-b061-48bb-b7c9-e8eb8e2601be',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:32 GMT',
=======
  'Fri, 02 Aug 2019 00:50:58 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '5a16ba89-4c21-4f9d-9c20-bb038b4ae90c',
=======
  '67b59343-5c18-45d3-a740-00230a0f19c8',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:32 GMT',
=======
  'Fri, 02 Aug 2019 00:51:09 GMT',
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
  'e26cff86-ba82-42f4-920a-f01dc7f92500',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHHQAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:33 GMT; path=/; secure; HttpOnly',
=======
  'bbe0b00f-7057-475d-ade0-d99394260000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHHQAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:51:09 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:33 GMT',
=======
  'Fri, 02 Aug 2019 00:51:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'b7e0c9c1-691a-4281-9092-fa1ba022a8bf',
=======
  '21fd8b9e-293d-4417-bd87-3e5010c195db',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:32 GMT',
=======
  'Fri, 02 Aug 2019 00:51:09 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '3f774043-563f-41cb-baec-7811fff923f7',
=======
  'b64208b1-db09-4ded-8c20-7eccd417a5b1',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:43 GMT',
=======
  'Fri, 02 Aug 2019 00:51:19 GMT',
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
  'b73de4a6-bb1f-4295-be27-8f0994ff2b00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHHgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:44 GMT; path=/; secure; HttpOnly',
=======
  '5440f344-3b5a-4f9d-a80f-5b1d24380000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHHgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:51:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:44 GMT',
=======
  'Fri, 02 Aug 2019 00:51:20 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '851bbdeb-f321-4a52-a121-4a396bd44acd',
=======
  '7e0ccf39-003c-4a64-8027-f2c781c608e3',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:44 GMT',
=======
  'Fri, 02 Aug 2019 00:51:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'ada348a7-e399-48dc-8865-7375b04ef762',
=======
  '931ee4d2-d8ed-41bd-bb7b-da7b92ab62f5',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:44 GMT',
=======
  'Fri, 02 Aug 2019 00:51:21 GMT',
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
  '5a152180-536e-43ea-8b86-44fc36352a00',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtMQnD65vmlNsJ97LpikNUE_aSJHHgAAALMd1dQOAAAA; expires=Sat, 31-Aug-2019 17:53:45 GMT; path=/; secure; HttpOnly',
=======
  'f1b14794-1095-425d-baeb-e70e45340000',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvIvgPeLmFtNl1Ceg-L7UJI_aSJHHgAAAJB_1dQOAAAA; expires=Sun, 01-Sep-2019 00:51:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:44 GMT',
=======
  'Fri, 02 Aug 2019 00:51:21 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"})
  .query(true)
  .reply(400, {"error":{"code":"Malformed backup blob","message":"Backup blob contains invalid or corrupt version."}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '103',
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
  '295e4bf3-afed-44b3-8ff7-7ba7d0659d65',
=======
  '1b18adf5-21a5-467f-beb2-933cde779a90',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'x-ms-keyvault-service-version',
  '1.1.0.872',
  'x-ms-keyvault-network-info',
  'addr=52.168.87.88;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Thu, 01 Aug 2019 17:53:45 GMT',
=======
  'Fri, 02 Aug 2019 00:51:22 GMT',
>>>>>>> [KeyVault] Removed abortSignal as an extra parameter
  'Connection',
  'close' ]);

