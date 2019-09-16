let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkey-/create')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2a2c9572-c84c-49da-9727-265f097f0b6b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:26 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'b1b30c0e-96eb-4a10-af52-8b58b2b74200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTAQAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:09:27 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:09:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/f3e349736cdd4feb9548d79deeb81128","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5i-rnBMXU94OmP_znCdQaEiw9NMx7v0I7acHhfH4GopgU1sLkTbHZibA9ASV6e2goLZP1rf3WWR-H-RAbcvMqKjRAUZomXYsCCBWpzvtZhALp8uA_e4mOLhjISZP7sCMq7R62_7Gl8aQxgVddo1rjutG2UGwHVrLuYKEvFPJLYK-o_sajrxhCiiyMapPZ7F8vEtv6QWPBPYZHC8j9IfRpdQ-AwFoO2-9X8KWOsJTkXkQwbW5_-cLOrJDdPnUjfpFlAB521GELsda40Ro9BL_BnYLRpiF4rJAEKHXa8-NlnB8wT6GbVTh_oslRdHI2Jkaqz4qXwSnlvNRwWHzQvDtpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568660968,"updated":1568660968,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '3d356c5f-2296-4461-b94d-8f024881376b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '707'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0fd88caa-0ef4-4b18-80cf-ed9bbcac3636',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:29 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '2431b191-465e-4618-85ad-f51b63c74400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTAgAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:09:30 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:09:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1568660971,"scheduledPurgeDate":1576436971,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/f3e349736cdd4feb9548d79deeb81128","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5i-rnBMXU94OmP_znCdQaEiw9NMx7v0I7acHhfH4GopgU1sLkTbHZibA9ASV6e2goLZP1rf3WWR-H-RAbcvMqKjRAUZomXYsCCBWpzvtZhALp8uA_e4mOLhjISZP7sCMq7R62_7Gl8aQxgVddo1rjutG2UGwHVrLuYKEvFPJLYK-o_sajrxhCiiyMapPZ7F8vEtv6QWPBPYZHC8j9IfRpdQ-AwFoO2-9X8KWOsJTkXkQwbW5_-cLOrJDdPnUjfpFlAB521GELsda40Ro9BL_BnYLRpiF4rJAEKHXa8-NlnB8wT6GbVTh_oslRdHI2Jkaqz4qXwSnlvNRwWHzQvDtpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568660968,"updated":1568660968,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'c22f8511-49a7-4d7a-976f-b31008affb45',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '889'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '56364253-1068-4eb7-b7ba-9ab17a4d3b94',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:32 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '9a9aa77b-71d6-4219-9617-fe8704974400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTAwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:09:33 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:09:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '7fc5d30f-80fb-4a16-8ed8-69799c641b4d',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:34 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0fd89393-67d5-44bc-98b4-04c2a30568a9',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:46 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '176459ed-3f7f-4d8e-ad6e-1672d6744c00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTBAAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:09:47 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:09:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1568660971,"scheduledPurgeDate":1576436971,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/f3e349736cdd4feb9548d79deeb81128","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5i-rnBMXU94OmP_znCdQaEiw9NMx7v0I7acHhfH4GopgU1sLkTbHZibA9ASV6e2goLZP1rf3WWR-H-RAbcvMqKjRAUZomXYsCCBWpzvtZhALp8uA_e4mOLhjISZP7sCMq7R62_7Gl8aQxgVddo1rjutG2UGwHVrLuYKEvFPJLYK-o_sajrxhCiiyMapPZ7F8vEtv6QWPBPYZHC8j9IfRpdQ-AwFoO2-9X8KWOsJTkXkQwbW5_-cLOrJDdPnUjfpFlAB521GELsda40Ro9BL_BnYLRpiF4rJAEKHXa8-NlnB8wT6GbVTh_oslRdHI2Jkaqz4qXwSnlvNRwWHzQvDtpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568660968,"updated":1568660968,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '81a4c108-ee8d-4425-b87c-d8e50264702a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '889'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkey-/recover')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '26e5c68f-890d-494a-a973-85e454e0065b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:49 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '8e881d8f-c64e-46a8-a2bf-2c739df74400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTBQAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:09:50 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:09:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkey-/recover')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/f3e349736cdd4feb9548d79deeb81128","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5i-rnBMXU94OmP_znCdQaEiw9NMx7v0I7acHhfH4GopgU1sLkTbHZibA9ASV6e2goLZP1rf3WWR-H-RAbcvMqKjRAUZomXYsCCBWpzvtZhALp8uA_e4mOLhjISZP7sCMq7R62_7Gl8aQxgVddo1rjutG2UGwHVrLuYKEvFPJLYK-o_sajrxhCiiyMapPZ7F8vEtv6QWPBPYZHC8j9IfRpdQ-AwFoO2-9X8KWOsJTkXkQwbW5_-cLOrJDdPnUjfpFlAB521GELsda40Ro9BL_BnYLRpiF4rJAEKHXa8-NlnB8wT6GbVTh_oslRdHI2Jkaqz4qXwSnlvNRwWHzQvDtpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568660968,"updated":1568660968,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'ee038366-5af0-43a8-8bc9-22e1e3f1487b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '707'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '370d9fda-29be-44c1-bf11-c7b0b411149b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:52 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'c6d33b71-f109-4844-90ab-2447b9ad4300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTBgAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:09:53 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:09:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '830fb979-27b2-450f-bfd9-618ccfc846a6',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:09:53 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e231a182-a30e-42eb-bbc6-82007a07fad5',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:05 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '176459ed-3f7f-4d8e-ad6e-16726d764c00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTBwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:07 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'bbd8b9c8-2ca4-4e79-acb8-b528a31f2da1',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:08 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '135d3574-4651-4c5e-a34a-2c198adb63cc',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:19 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '91e32c98-0bc4-4c27-9e03-af6568d24200',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTCAAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/f3e349736cdd4feb9548d79deeb81128","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5i-rnBMXU94OmP_znCdQaEiw9NMx7v0I7acHhfH4GopgU1sLkTbHZibA9ASV6e2goLZP1rf3WWR-H-RAbcvMqKjRAUZomXYsCCBWpzvtZhALp8uA_e4mOLhjISZP7sCMq7R62_7Gl8aQxgVddo1rjutG2UGwHVrLuYKEvFPJLYK-o_sajrxhCiiyMapPZ7F8vEtv6QWPBPYZHC8j9IfRpdQ-AwFoO2-9X8KWOsJTkXkQwbW5_-cLOrJDdPnUjfpFlAB521GELsda40Ro9BL_BnYLRpiF4rJAEKHXa8-NlnB8wT6GbVTh_oslRdHI2Jkaqz4qXwSnlvNRwWHzQvDtpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568660968,"updated":1568660968,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'ec2f1caa-9d65-45b0-9669-cce5eca94632',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '707'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5998ef7f-80e4-460c-bb41-1b8c4be58434',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:22 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '4f3dd40b-06d1-4d66-af95-ad43688d4300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTCQAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:23 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1568661024,"scheduledPurgeDate":1576437024,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/f3e349736cdd4feb9548d79deeb81128","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5i-rnBMXU94OmP_znCdQaEiw9NMx7v0I7acHhfH4GopgU1sLkTbHZibA9ASV6e2goLZP1rf3WWR-H-RAbcvMqKjRAUZomXYsCCBWpzvtZhALp8uA_e4mOLhjISZP7sCMq7R62_7Gl8aQxgVddo1rjutG2UGwHVrLuYKEvFPJLYK-o_sajrxhCiiyMapPZ7F8vEtv6QWPBPYZHC8j9IfRpdQ-AwFoO2-9X8KWOsJTkXkQwbW5_-cLOrJDdPnUjfpFlAB521GELsda40Ro9BL_BnYLRpiF4rJAEKHXa8-NlnB8wT6GbVTh_oslRdHI2Jkaqz4qXwSnlvNRwWHzQvDtpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568660968,"updated":1568660968,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'b4a9fb14-4552-41d7-9f69-5edb422c0957',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '889'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '52562e84-67a9-40b3-a6a5-68d982c659cc',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:24 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '77761cfc-4ea7-4493-9443-8e249a1d4400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTCgAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:25 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '50ebe213-f724-4c4a-a85b-2d1d16f26b3a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:26 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b9df2d07-89d8-4cde-8444-1768db36e087',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:37 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '77761cfc-4ea7-4493-9443-8e24581e4400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTCwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:38 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'fff6bb50-1948-4a07-8bca-5723a4f84d71',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:39 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5ff02c32-3f1e-4551-9135-f3587b2339bd',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:51 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '50cff4e3-d66c-4b46-a821-eff2261d4300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTDAAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '10a8c1be-ca0f-406b-a8e0-b65c839ecac3',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:53 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd2432358-e89f-4d97-93cd-b56ea4ada2ff',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:54 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '63a15c3f-4fe3-4290-8dd4-098a52714600',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTDQAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:55 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:55 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-"}}, [
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3c6243d8-6322-4858-9daa-a551fb660853',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:56 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/create')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'da19d82e-0800-4373-a7fb-08056fb72198',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:57 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'bf8ceb73-ac66-4df0-a050-4e7f53064500',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTDgAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:10:58 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:10:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/7d6f49195074407e8846477a033073ae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7rdyBs-9PeNorIaiYedswZNrn4eLzhhUEhSjqOvBue8HzIenWXlLu2cFq98A4avxPNcGmYbZ3g3CX8pJjeNqa_CtQC1zGrlj9WfMVrKUWALTT2f7x5yne9fmdvdqPoKNqhy7gIwA3A5YilAMLWK_F3bQD4mWdmswr_k2XFa--HUjzeR8-yuiTExe8R90btxxfv3lkfXpzMpACnx_3tyXvg79koakl8be7WSeHYk7USaU5_fLtGh2Qzoj46ECsxdBXhAS-uO1kCwbKXhje41ANNuhmgebe_eqiQiq7PGNUQKHae6nP1pyfLKqDnKBMvXlpWcLB6TGrtrxpAsKRsUL6w","e":"AQAB"},"attributes":{"enabled":true,"created":1568661059,"updated":1568661059,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '604d5477-092a-40ff-b642-379c28a52305',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:10:59 GMT',
  'Connection',
  'close',
  'Content-Length',
  '710'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/backup')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '132f2d5b-548a-45b1-95cf-0e579a3c30f4',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:00 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'c6d33b71-f109-4844-90ab-244727b24300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTDwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:01 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnE5NTlPcmk1eGpYTkRpd2pseWg1Z2NQZHVGb0dNX21oaVlBcklsYl9TMkpmLXhseFBnMW1RNEFmbnA3TGY3b09qZVQzX3V3ZWpwZzdHZHo2a0VzSGRQNWNRUHppNW1IejB4c3htZG42bW8tMjJMcG9jUUtqMHhsdEl6YXBsRDVKNmNMbUdoUXl2bWotVG0wS1hWWm5TUTY0dTF0WlVhbE1VZ25OVVFLTzJhWWlNUkZ6cjZVREI1ZUFsUTh0c1VjaGE0VWVKM0JDaDBzRnZmOFc1Z0phMHloX2dhVS1qQ2Q5amh6c2NTbTVXcnZTZmZUSDNtVUlRaXBKMEdYYUN3emVuSTVYbzByU0lOYTdwYnBZbVVGRGRWdWxJRGctcVJOclh0WUJMTGtYNV82bS1PeHhQT3plLVJ3UHR1VnoxeFpvd2dkOUQzWHpPdXcxSkNUNGlZSndBQS5zQ3UwRVQ5b2IxNTU0MU81MERVMElnLmdRRFlWWDRHSndLbHp6cjl3YktXdTVnZ281ZlNVZWdLWUJRQktlcU1JQzB0YUtSREJaSkZCWmRkcnlOcS1IbTBQMXF1NmtjSzhOdjVaMFNjM18taGpEVUEtZks3Vy15WFF3TnZ1LTNTYVdmTlJxbFl4a0FXbXVpVjFocEFNNkVCOGdKd0VzcVhHbHZ1OGlQOG9ocVpPX19KX0p6V2ZSZS1hRWdhTnZtY2dCSnc3RHRVYy1EZ2YzMVdxMEE5ODZhTkp6czFMTVpKM3FoX3RmcEJxQ2s3ZzJWS3VwVDR0QTRsM3RyR1JTMURoSzJ6NHl3TEx2Rk4yWDZnTk5meTBSeHpvWHpkTmpvRXRybElhQkMxX1lOOWJUUU5iS1BLTGhmOEMtNWhhc0t0NEtDQllBUmk4X1AzWEl1TTFWV0VfZnFScVhaMkRRWDVVdEY3NWc4Q0FXa3p4QTFwLVpMeW5lWnI2UTlGWlVuVXpYT2xnV0hZSWxneHlnSmJmRklNbTBrWFNlbnVZem50V1FzM3M4UUthVGVGcE9NU3lwa1A5ZWNCX0RuSGJzQmsyNFNrZDRVV2JQVnVQRU9mamhoVFdlMzJoN3R0VnFtd002VHFUbG1tUENUTG9fY0tOOXNZcU5UbXhPV2NPSG1uRkFkalN4NnBSaUlmRkw3b21hUk1hMTZhYzNvRmJ5c1AyS280YTZqY3NJOGs2TVBac1BBREF1c1BSQXFmLXNycUFmeFlZUENYanFldUlzU2JWSjZROVFlUnEyWlFLdkt3dGxLdnI5STBWUnFSYTJvMzFJRUlQdHNSVlhNM2tsSTNwWUE1MVlabXJqQW9ZMVloS25zM3BSWmdOZnVibU9tMkpYRmZlXzc2V09rQ0laM1d4eVl1MXpRVXBVYjI5YVFqM0xHejJPSGQ4NXB0Q1FuMTNNMGJod2lWUzBYd1ZJZGVHZXNZaEdyMFA1TDlkakVQeTFzbmM1TmhubHNneDhfMHJ0N0cyTG9QTzFhS05kT1RNdXVKUnB2MVZwUkR4bmxOZHlpQ0lMY05oLWZzNVNHZHFrQ2x2ZnNpSXhRZTR5dHQ5Z0V5TC1uU0R6dEVKMmVBNVAyMjlBQ2locUw5YTkxWTExM0ZaQWtieFVvbEhPWGlyTEU0MXhBeUdSTDhKeUthbzBWNl9GRjB0c0VHQk93aGFqZlRBcFJUM2xwZHlxQ2p3cFdFaFFCS3otOC12bGxJVWlrWjRWOHktT2NXVEdyRG1xU2tYdGJIcmJoc1ctNUhsRmRteGRwT2lTQW5OTXVSWEhfQWl2ZThEV05ZNkoyLUxFdHZmNldBUF9DV08zTXg0WWk4ay1hQUJkcWN4aWhjWXI4dklLZDhrN05naWdWVmpWeW5KUDBKSjRRTUd1bkxKMTF1T0JUaXNoOWswbTVoeG9xel9BSk95T0phMkxOWHRRYXA1S1hXMWJ6MjF4Rnk3ZlpFT21BZVkyTGJaai10TllTanoyU0FzbGpwVDFPWUZBMWJiVDRDdC1wWmdMMnNqOExpX0hINy1sX09IbWxaNVNQRF81aFVKNG1TT21hYWlKUmJhcGN0ZnBERXlxcjhIcnZqOFA3MjI2dWZSd3VnNUQ2elVzeS1QNVRTSE9qS2U1X0ZXYm5QQmk4anJrTVlQbU50R0dyRUE5cDE3X0h1RmVpbEtCaFJEcEtQQVFNVDkyenRzYnNQdk9FcERnN29XVl9ZR0VFZkpoejF0TzhOTi1fMUtCTUNfejBDd2Z1Q0RhRkR4ejB2aTRnVkZ2NmNHbl9qck1KUndVSjZHdVJHZV82WnlPWlRsWmdNTFpXNEl1S19kcElOeGh5SDNqSVgwTE85WjRRZXh5aEUySWxxbmVsZ2lCZjl4XzdZX1d5VS1UYVU3LW9oQVExcmtaYzJlVDYwUVdnRFJKMFRadXAxeG5XUC1tM1NoMmllNWQ4MS1Tbm5qUWdCeEMxaVBETTUzRWl6dFRpeFdFVW9xT1gxSnJteUd5cTdkSUZvRkpfX29UODgydXVJRHVRbEt5Wnhoa0lvNGpHMG5JTEdrTGFnRzE2NjdmeXpjSWw3d0dvYjQzX3JSYzgxcjEta2hYVC1sckJJdm11NXV2R2NVMlFTaEE2NlYtRGJiWXc5VlNMZWNIVVppeVVYTzRBVUpPbHpVNndJc05ZR2hHXzFnNFlwTm96N3VRVGxNcXFZZXJNRHQ3TXhJTWtpVUczZWl1bHA0R19CNjJvR2JuNGdSem5BZHNQLWNZNF91THVQZU53cExOVW1hZTNSYlNsVnd0SjB4QVdtV2YwdWw1TG84cmRzWWdJeVRMdFFXcndSVm55T0laTnBsZUJJaVVES09xa0VRUkVhbUI5UHBpTXhfWDFNZlB2eDBlbWZ5ZXFpX3BVZlczVFY4UFRla2hacU1ZbzdoU3pVQWNkS3h1WkhTUXBkMjVGRlUzcXprMTdXYjlFOUM5QURSTHV6aE5jOWM5YmhzeWRkSDQ3Q05MOVM4NVJhMkJnc3hmTW4wVEFYT1BQU2EzaTRGdzltQzB3SEUyODB4ZEphWTF3bnNSa0dnbE4ySkxZTFFKWGs4bFhyWktSVllzbUxSVXlkX2JGMF9reEY5SlRkZHhkbWdwQWJWN0V1QlRPelp2T3dGRDc2U0ZMbExFRTdDQXNMam9LZ2dHM3kycU1LTlAyY0VfZzhYQkFRcWtyVkttX2VndE9Qb2pZYkhnN2xYbUpxRHlobC1IT25HSy1ERjdUS1dUZjdnRlMtbkFjYk1jcjNzSXFGU0tYN3VGVFljeHVHeEJ0QnJoVzMzZTJ2aktuUmIzSWVUZkx6Q1VWbTRvaE4xRVRudWg5b1M4d3FkUEVhMDFieTFRUTZMaHdLQzFpenpWZGdnRDBRbkd5aHhheGRIakhja0VocTlZVnZMY253NmZzVGc3Wnk5Q0NJOE9fRWs2S2Y4c3V3YlJ0VHVscDByYV9lLUV3cE0ycjhoUlJwcUtTRzNESDd5c184N3hYRkg3U044RXFNeFFjQ0FOZWVMTGpEamZMR1lCT3owZnpoTHZlWGljV0pXVUdKWFQwRjRMNGtPVTZ4OEo2WHdvcHZvMDE3R3R2NDk4a3N3VVEyXzhpcUhrVlBZU0VwREpEa3VsMi1LbmhBMDR4ZE95R3VBREx0Sk5QWVJkX0VIZDhmZ0ppdEV4OWlEamMxQm5GaFdOd3lXRGpPakJqcmxEYjZBdk1LSXU1MFdmRWptUnhkTEdkb002WjNSNmNNeVZDNVRsRjUzLUJpM3IxTnlWdUpPQV93d0J6YTJXVGgtdWxyZ3gyNGwtYmQ3LW5TMDlBZTFxYVRjeXBya2JCTkZGM0RmaGszNXJ3YmJmOExSVzYyVzRQcFZoSERSWFlqU1VqTjhVVnQ5NlctUTQzc1I0VWhFM3NsdHppLUo3VThwNHU5STFTUEZLTE9ia1VtWU52WnhhbnEtQjgxblIwZElOVGFxeEZZSGJRU3ZtUDRiemsyRnMzYkVvNW9IQ2NManhGbDZuX0IzTW15V3JzV1gtVkxibGtQYzNwb3FMeThtSmpIWkVoZVQ3US1lOTZReU1JUEtKMDlQb2htd2FWb1NYM29oVnFDUHQ5YmlFbGRxOEh3Ri1zQ2dJQnJockgyY2dQQ2h0NDFOTWVVM2NVUGxWV3BXQ3dUODhELTZBOHMxOHRqdTc0a01wTkc3bUtlY2ZlRE1YRXpuRm5OdHRRdUVuQ3Y5ZlhydFpQLURTVE5CUjdCb1pEQzZsRUNjQUxCZnAyWlgxM0E5QVBqNzhZbzJJOUg4b0JGZkdzTFlYYk12WFVaN29XcU9qVXVLTGFNRU5KaUtBQkUxRW9XX3l3QWN1X3I0LWxQVExndXVjWmZ6OVZDcFUxUEZOMUZxZkk4YWJncGxQN0JiU1pTdXc5REJCZUFsVVYzdk1wN2VlcEc2NkFBX1lWcmZtamZyMmF6OThnR1JoTmM5eFlYLWNJakd0dlV2SDNRZUxBdUNEc3JyckhiQUhjYWlLNmdwSWp2UWRPV211d0ZYZ3NUWE9YallYOEFZVm11c25ad3VqSFlieW9NR19yTmxkMHJfVkdpWUZTV19Qa1czZUlCdkFiaGVIWm00aW5rQTZ6clNQRkFudlVscnBVdWx4d05lQmI0VFhRaHdLTjJhV2hSTEpxVkV6QTBvdjZTY3JFRzdCUEVnWE1DcFZHeEtlT1YtYVpJUTVRSHFmREhBbVhmTVdMaGdkUVVvd1dfOHJsSE0xMGpxN2Z4YVQ2SjZzUnZoMU12bExpZG90dFlxM0ZBUzhSMGc5UUFfUkllbDFuM2trT2VJY2V4OC1sM0o4V1p6RUxHazNGY0RDYzFQTWpBdFlrUk1WcWFrY2ExenpFMk9FTkFzQ2Fpc2FnNS0wbGNKYmdhcGdPZ1lzSVJlNmR0QlZ5eVhValRpdDhCTE5BWHBPYjlZeTZOSlNQN3JKY2ZKdjZtWk1LeDRTVjM0d1RCU2lUdGJ4Y282VEdvVlU0SzBXVm80TlF4dXNfNVdSV1diMEpUbjdzWTltTjB5MGk1R0FpbkJHcTlQMXRnRDZ5QzJ3b0pweHRrbTNyRVRTNEt2cFZJYTM1bzVvX2JsTnVYbTUtbTNJd0JzR1pWR1hUMWc5UXp6UkExUzF1RXF2SXRPZEgwRTMtRkUzWmtfYWlkajVudUlTSVh0RnhpcVJhSUROTG1GQ0VTV3NIUTJOUlg0U1VRVndpczF1R3c5WFR6ams1NEtSaW9rQ1ZvbjB4d1c5M0V1dEE5cldrMmJ0MkJURzBmdTZLWlFDMEFjNklPUmI0a3FNTWFMREZCaDhpMXVCTWNHcjFNaE5Eb0pORE0xRnhRei01MWVEbXZnM0xFdzJyNTF1dHBSc084c0JyckFDRjV6Umh6dE9tTktxd3BROGhBQW90WW9rZldReUdlWWxMUFRrdF81X1lWNW8xV05MdzdRaU02T0FrNF9xNllrOUx0cVZNYU5HR1lzeVVxTmk3OE1aQndSRGQ4cERyZmZXRDUxdW05OGxjYjNabFhia24wOXc4N1B0NzFxZzNjWEpBbTRPZTZIZGpjTW9udlBpaFRXUUR3emZVcFIxYVhVNHY3eGExdnd6UUNya0lkLUJXZWY2YTJWMTl3bl8wNEZuMGhldjVjbnM4azRVcEhCcVg1c0dGU0N5YnoxZUlKLVZKYTZMMlltT3lTV0lxR3ZLMVJ6NkpZTzVxMTdYRmJYeXU1Vl9VT25iWHhja0dyWEtoQzdwOXE4LVEwazljUzBmcUNYM1pTMmRsYmVyaGFaMVUzX1dndlVrZWtMcXl4TTVjUEVWd2Y3SXpqSXZHVXhIRWJZSm81SzBQNWFaM3YyUTdGYlI1TFRBdGRhRmlDbHZzTXYtTWFPMktIS3ktOWFTeDJLSFQyM0M0NndmQmcyQV83eHp2eXNQTGVMLVhpSmc2VWJIdWlwX3cxaUFPbExJdE0xT0J5MllBYjRJb0lxcE14R2xLUm1WUS1kbzVHX0sxN1ZIc2lfNm9FODdEUDJwX3kyMkxrTTFSdlQ2aXVKcnB6T21jN1ZXZ2JBOUxuSmIxZ1dIeWRhcDJuOHBEWGJkQnAtZWc0NkRhWVI1SXgtNWRpcFVwTC1tVm1GRk1wNWxBRmxnQU5EUGxva1FucW5zNTNXTzNMQWpWYWJmVEVZRHNoVklQemozSk5lWXUxbWNhNUEwcEV2dm1XdWRMalA5U0VIVTNybFRDeTFFZHByTE9ld3MxRHdXaGFIdGFUS1BOWnM0ZFhjMmZPMzhNSW1ERjUwOWFjVFliYnc2TUJ1UnYyeEswRTVaOTloNFNpUmF2by1vZERiRW1BaGVLZmd2bFhMM0JucUVzc2Z2UjFjdnB1cDY1LW5CdkVqR0JjNURmY0tFQzVQS1VkY2JzTVB0OXRPUktZOS16UmxjdTZtYkw2Q1cwdU4yYXZuMkJ3WnJPMDlpRWZLYjdnay1RY0V1V0dOY0ZGang2Z3dHWl82UjlzYjNKdlN5TzNTb3FCb0owaWZXd0FZOVI4SjNxZDdKWWQxSks0VFRoaGp2em5hd080dzJVYzAwN1BlSEUwUnhwSS1VMzZpRS1JdTh6RUtLdElIN00wMmI2LXQ4dE02T05kc0k2UkN0dlhmSld2THhLUVlEN3N4RzV5Ykh6RDNPYkxwRkl2X09iYU01ZTJwalltS244SW1qLW1TZnlzNUI5N09BeWxBUUZodjR6TnNxY2ppS25nVldyNU4yNkxjeDR0Q3Zac2t2U2tBX3kwT2NTTi1jUHFORDlJY051NVJFcFpvQjlHMExfc0tldFJjU2lUTnpaNFJuSzVnUFlEeGctZ1I2RkFSVmJYTWRZb0RkWU9oNk5jYlduSkdtOElPeURBbGZ3a1BVRTFsaUFfT3pUWHFXLXR3ZlF0UkVZUzR6NFR0UUZkX25nZGxmc3Q4QkpEMWtIUGI5WEc0WGllRjVkaVJJaDVGb3VhTDFLZmRmUzlDNDE0cmpCNW1fUC16TWE1c0RlejNlUU5EbW90Ri1ZTWZtbUZmaEhSNWtuMXl6b0FIOVR4OVk1LUJtVDk0dmxxdzhEcWRwYmRzTWp1UHhxRVlNODJGU3Bvcl9QVFo0RzNQNzVHTFVuY1h2bXc3R1YwMVBDd2NVRk50cXE5YW5oS0tHM21fdWFnb0tCa04yVlFmWkFXMFF2RE5kT0RELXl4dGNXclp6N3dEeHBsUjNtVzVuQnBOUzBCeVF3VHpvZjhSdFdlT1ZFeEVWMmUta0hCOWY4QUhfODVtWkpPdkEzbVJYYW94dzVvRm5WXzVZUlNsQ0lzS1ZNRFZ1ZVc5alFUOVhLeF9icEVjY3gyUWZtdlFDcmFRT1NNY2dSUkJaN2VweVdnVnptLXdFUW1DbFowMWQzTG5hcUJPTXRfSzNJa3lhU2MtOWktbFdiS2gtc0xUMTM5WVFUTjJONTdsNGRtaGoxUXZtVjBiODRLYnBGTWRPRF9WRGpVN1h5d0ZJU0wwU1NicUxSMDZHVXFpR2lzWHp4V3hva2ZyRUZNMlBkSkVEQmtSRDJoZVZuUzB1dy1JNjY1bVRaVklLeUpfajhaZWJuU3V2LWhzWi1VZFNnUmdVNlNCNmg0TXRtMlVwa0JQR2xjc1lyWFZjZTlfeDhMdkpKTVg1X1pXNFBXR3BhZllDNlU1dnM2bnI4bS1UVUY1aGdGWDNaWnNyTkJ3RktodFNjdFBvS0FmUmFrY2xPT2hKNW5TN3ktZzY3Z0NFaFlGN1dCcHB1Z2k2d1NUUXpkckt0dmdxNW8zcG5EZnVKQzB3THpyZ1h3X2tuN2tFaFdFc09rd1lLOUljbnpmYVVKcUxDSExHcEs3VTZQVUpaaWNwTTZuNS1VMUp3X0xzQXQ5M0w5QXNwQ25wUlU0cm1yeFdaQzZpVHNmMUlLSW9kcXFmd3Vjcm5md09zbFhXdU9hQ2l0T2ZKZmxrS0hpUExLNGc2cm02ZzVkb2RaeE5lR0swZ1JDakVrc3ZDa0tJMzJTR09fbzlBUUljcHJtQ0tpdS1GemZ5QnMwREkzQXV2cG5Vc0lxbHd6MThvWmJSN1JiTUtYa3NnYzA2TzNpbzRHTGJxa2w4eDVVcjhoU1pPeVpnREc2UlFkQURjaVhGUVlHY2gzRlcyc2VURFNKTmNndXNCR0JJQWRPdjNIaFVkNWVuaTlydWtxS2ZJMFp6NkdaOWRiQ1VDMjZXeFVXZHktQzY2cnZKTlpNVFc2X0JIY09veE5OemdSNjVMWklEV28tYXBJcThoWXlranE5aHpCX1hTV2QzZFNzMUswakJ2bnRfN21XbUExT01YQ0NWWFRkTi0wbUM3cE1VcmpTOU1SUG83a0xMTDJBOXNTS3ZacDJwcnRWTmJYWGRHWGJUb1FfX1lFdjRlOEwzRllCaGdxdVVGVnVQNHpHWXFIYXFwZVBqb0U2cGlPVHhmWWxDcWs1TXNkbDc5VU5waEN2Tzk3MXIyMmZwX0RuZGxJTXg4WHRCeWJiQ2pJc3RTX1I2RC1IWGRuNG9OTEJTelVnMkpzcFZrWDYtRmdrVDhpa2tQdHREdTlWWUdTWW11NUZQNnNqZEF0VjR2RkNXWkJCdTdsSzF6SzhUS3l1clNhM0lTS1AzZ0Q5aWF0bGt3V3RkWHM3d2pGcVdMcExIcnhxT0NwV0hNQnM5ZmszQlplekthNXA1R3E3c0xKa3RVSEJ2RnVQdnpSRDFBcElpNjNOampQVUhnc1FMejJSckgzcVdIcmt2SW1XUVl0QkM2RFNpMURyeWpSeWRybmFCejV2MHdXREhwd2dPZVlNLUlabjdGcVRWVTVVZ3N0QXFRT0p6d0pfTlBKNFN4RTNlSzdtLVVrcW1xOVJBd2VDQjI2SWt0UHJoN3dtRDhibk9BdmQzQWVZMjhiRnE2NTlZVUhFU3AyanJoQUNacnZiLW5zNE1WSUlTNW9Jejdvb0d3bGE2ajVxY2hhRlNrNmxnV0NTNDdidEwzRkxpa1AtZGM3YlJvUUU5dnFTQ0FuSDJWakFXRkExMTNQdnB4eWhPajBrRXhSZHF0bm5kRTg1Yi05RUpVYnlLZ1QxWVRmT2ZBUklVWUk0aVhNLUtSSXBaX0Y4OHVEZ01rVDdVRE0zclluVkxlUkhfVDd5UU5IcW5hQ1ZiQlU1VVVVNEZtRTZPSFFnTHdySVpuQmRkZnRacmw0VFpZX2hkQVU5bW5tVHk3VnNlWFh4b3ljY3dYbTBBXzVLZ081S3BPV2loc3I5OU5kUWhsRmJPUC1MY1I0cU1ObVVqbWFreHlLUk9PZk1aY3pSX3RaTFJnVFVtTk40TWt1VnVndUxiVUlXaktRRUw2R3RyQ3FkVEhzMU9CVTl6V2w0aktpR1VzM0RHSk1qUVFSczU3dGR5Z1VRUG5LckVpTEdCajdiNFFMUWt1Q19DMGRjZ0pUY2stRjRERVdZVDJHLVEzbW5ycHpWRXJ0YzczRUVEaGZBUGNYdGx3a1RCU3lsQk5tRnVYUDFxdFh4QkxhSDdhQXgwMUEwTDEwUmlDYmVkUW5kUWRrSzRTMkpxY3B0YUMxa0Y2NVRqckotbVFfQ1BLS3BYdHZNOGFTd0JsQ2M5RXZzMl9odGx3Sk5OOU01U2d0UVcyY3ExQlZMci01NTFWdmVIZEY2UHdMNkRrRnMyM2R3SDd4d3JNN1ptMXhEdjhERlk5NUJ4MTZlUzRBcXl6QW5NcllXc1pyd0dxbFFEdkJaQi1EZDRIWGRKRE5UbFRkeE1ybGNpZ0NkVTBGWmVlN0NNTC1rS2lqZF9WdXVCTFAxYXpJQmFLR24xbkJLM2ZoTGp0VnZkcDlVVGdJclN4NmF4ZThQZXJucFZ2N3hOS1NaZEhxUjVJZWl4T3pIaFpsSmxVcktIWl9GblI3M0dnQVkzNG9vblh6UXpJa0w3M05IcFZ6MTc0ZEZZV2JwbFk5UGswUUh0NnFWLVlUdnVaNDRyMTRXd3JaZllUdDBYMFJrWUtLOXBaLXhKcWRtUWpfQnZYWktuNlF3cFI3NXZBUkxvcDUzeWhsRDJxbndlWHB4UnlXWFo3eUV1WVZGbGZmNjVtMUtGWjB1MWx2Nm5mVTZKbXNyNGhUNEdXa0lpMl9DMnV0c2Z2WjViWXZ0YjBTN01pMERvLWRJY3Jaa3cxa2E5OEM2Rmc3Y09mZXBJcmlpU1drZXNiSVhwQ2c3WGIyQ1RXQUFScnBWM2tTTkhZdTdRSkF4RkJFbDQ0TGVaVTlkM3poWmpOckdzS3FsbExBUmZkX0lqc1hPYk44dzJ6UzY0b1JVeU9hY1RIYlJBZ040ZEJJMllhc2NVZ0RvNTVfRG8wa0lERnY4dzdMZXNYV2REUFQwdnpCM0lDdThwLTdsV3ZRcjBVUXEwWGR4QUJpUVhscVBQTm9CWEt1eV9SV1MwUFg2UnhrdjZvRGdGcDkzZHZzNGZabE1kNV9PcmUyRUs4dU1MWjgyYVh0cnBlenBCQmM1TGFfWFRPdExlS1ZSZ1Z6TUloYmVjTWQ5N3Nxd2xBTDgwMTFrTGVGSHh1RUx1d3BZRjIwOTRaOVVSSUpKaFY1ckZvMGREcTREVkNBUUpSR2NPZ29tdVk3bHVUTnJHVzVPN0VRRE16bEg3VjZ4blZJQ2lZNzVQNXVhNkd2VVFvdnhkUnZuV1pHVlFLMXhqM19YOF9yNng5RzR6SFZ1MWtkbWt6V3FlRFRpaU1PMkI5bWY4TklndHctVUpFU0I0THF0bEhmZlM0QXhiUjRtdDhGWnE2NmRXdElZeDRsWEZKS0lNZHhteGtkbXlwUDNERGN2bEt2bzljWjhRbTJtazNxUktTMmFWN0dmOEpxenNodjctWEZRY20xQWZjdnlaSkZwYkpNLS1ydWVfdC1ZVW1HTWtQcVpMM25YQy0wYmlodXc1aHk3eDh1UGhFQnBmMlZ1eDZtaHNidXdOZ1liQWpWSl9rT1BQTmlzYnpHTVgwRjR2ZmtSZkFtYVlGMWFJXzlwZXhiMHRTVFVmMkswaWwxLW1kbEozRkxFZUxfaU1TSUdocWRqR0E1YklzNTRGWHNvWUN3MEdia09zSjlicUlzTnZ5aGdlbVQxYWhFTDlDbFN6N1dXTTRwYzBWaUJLbVZITkk3NUZxa1AzdjduNnBKa1BJTm96Y3laY0R1blVxamNRTWdTS1czT0F4ejR2aHdJSWVyZktxR1dQYm8xLVpmcFRBVWJHclBqZ0xsZmxMNm5yVzhQS2V2NlM2cnF1VHRSdjdWa2EweS1HRnIyc1ZIQTV5U3F2cFhzYWkzWTVzSFhWMnRNREVlSC0tdDl6akRhU09zdkxQMXBRQTJBYy1NN090YUhZMnI4SG1BYVc2c2F1QkxVenNoVUU1TWpCSkFKdFFYTzJ4TUx4UVRCZnQtd3ZXNWxSd0hnR0pWWkdibkF2OUx3bWpkVnFlME40aXpEeVhkekl5Rmx1ZDFLSmhvZTd3UWc3Um9LUmI4QUZweGZPUVFGNlBLclVNWWhJT1hQM3pTX2ltQzJzYThtakRVWXQtT0NvdG1lWElsOWt6Uzdob1ozYnl3Y0FQdEZYZU9aOUZIaTFwSHd6akpiNmFNdmhpdURlcFhKeUxidzJtWVByeHZrcGMtSFdjLXpqQnJXanJlMTBkSU9ienZZaUF6UGp4akFzQ3NDUFhuZ0NpU3BONGRJb3NiTHpKR3o5Nmt1SzVOb2tfTUprajJkMFVMXzFRUnlnUERXZlJrTzk3ZEIxYkc1d0ViUVVyMU1jZkJXOFZ0bFk2dUpDRndGOEVpSmptRTIxZHBaYUloWHljQl9GdlI0bGZ2SVg1cC1wRFZXcW9nTHZlVGItcVh1WWY3OC11V01MY2tXbURiaW5kdmVGNGVqTHIyWGp5ZzkxSWp3WUJJWmZDSTZjWFo1QThPVmR2ckt3ZnB4LURjb2Zjb0lEWFYycE1zRGJaMWxWVWpDeDBWblU5N3B3OW55RjlrT3BGUkl4UFZnNFE0dkVVNnpveFpqZDVxS3Y5OFF4WFNXQXR5QmF2aWJYZENiTGV4cTc2NGNpUU8zVzVtOTA3bWxjR3lXejBFU2R0YWJ6c3BET2ZQRWdpUHMwQVdMbUU5WHNkRUxuVFFIWFNMTFFEbWhlUWtEVjNqbUpUR09mTkIxMmVCT0NGbFc0ZzZwMlZfSGx1QXYyY2pNdFd6VDNqbW9tVzdvcGR4LURLLURKYkpuUVVXcnBpUS1TVXA0RG9BYmoxZFFYX1RmM3Fmck03OEVVOGgwQjhvdGJ5QWxTZXhOelg1WnJITElhMXBRUWx2NlA3VW05dUk0c0hkZFJTQ2NUS3Q0cG5rMkczQkhESzlCNThIOXhJdERwYlBSUDZTZFRCem9Gb3BaVDNjU3p5c1pvc2tsRnZQU1g3T1ZqUHNuRllBaU9oclc3dWhOOHZyMW9GdGJUOU0tMTBxa1o1QUxONlA0WG9hVjl3WE0wM2otUXY0ZVZCRGtWZ09LdmpFdEVtbzdfa3ViWk00VEg1RVpXUUF5R1FHb1VRQV95Q2JJTnljbWw5YWw1M1Z0d19OZ2ZGNkNhdDM0dnVOeDRBUWtDbzVuNmpjQWNRejYwQmdySmFocEFOR054WWZBVzREM1dNRGdlV19DTi1jd0VaZmRGdWpxM2lRNjVGaEJyc200WG52MU9aWFkwdzhLTDIyV290Z3ZOeW1GelFfejFpRmNrVUN0ZjRmdjFkY3A2NDJ0S3JDN1lVc1dmTVloY2tNaUdwZmYycGlpbHREclc0VFlYcTAzQlNzTGhJNXFKQXpzMEZMR05HSmY1MHN1NGN3dG1uV25lZUVUMHJSRGl2SDNXTDM5Zm4yMjhWUEhsS1IwNC0yZTloRF82THZHNnNvZXVOMWhJbElWMXJWQVZfazY1OXVGTTZ6Zms5THU3Y0ljWlQ0VnVTcUNZZUI2Z0x3TXE0OW9MZWppYl9JOFpwSFIxaEFCa2d6dm9HdWVHeW1EeE5GWmV5YXhvdWZFQW1GR0ZUOWtvemRfbVYzLXFHQjV5ZzlyZE15QTQ3Y211eUx1OGdWUkFabDk3TDl5c0R2X1JaRzRoemo1NllDY1dTa09KM3l4TWd1MzlyNmdvNGM4MWFjVURDMlFtNEV2b2tGV3B4Q1hPSXYzYW81X2h1Rkw4MFBpQmtCTE55OTByWWRaclp4WDVkdFhOcDNuZkM2TGJfbU1QZlZPWVc5emx2bmstTGh2ZFZ5b0ZCc1ZWdVRmaWN5MmdfUmFuZy40VWIxOGMzOGhJanlWNmFHZ2hFaUFn"}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'e77d6f4c-1f9a-4aaa-b80d-5a150b623622',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '13508'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangenerateabackupofakey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1ad9c0ed-223b-45b0-a91b-862a691cf32c',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:03 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '9a9aa77b-71d6-4219-9617-fe872d9d4400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTEAAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:04 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-","deletedDate":1568661065,"scheduledPurgeDate":1576437065,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/7d6f49195074407e8846477a033073ae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7rdyBs-9PeNorIaiYedswZNrn4eLzhhUEhSjqOvBue8HzIenWXlLu2cFq98A4avxPNcGmYbZ3g3CX8pJjeNqa_CtQC1zGrlj9WfMVrKUWALTT2f7x5yne9fmdvdqPoKNqhy7gIwA3A5YilAMLWK_F3bQD4mWdmswr_k2XFa--HUjzeR8-yuiTExe8R90btxxfv3lkfXpzMpACnx_3tyXvg79koakl8be7WSeHYk7USaU5_fLtGh2Qzoj46ECsxdBXhAS-uO1kCwbKXhje41ANNuhmgebe_eqiQiq7PGNUQKHae6nP1pyfLKqDnKBMvXlpWcLB6TGrtrxpAsKRsUL6w","e":"AQAB"},"attributes":{"enabled":true,"created":1568661059,"updated":1568661059,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '73fd9a86-b65d-423e-980e-2041cedccdbc',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '895'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd877b21a-3879-48a9-b7a9-b8904ea36f2a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:06 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '3bcff336-72fe-48e8-93ae-27c0adcd4300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTEQAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:07 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '1c1966f3-9a75-45b8-8a7c-dd925291271d',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:08 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b89b0949-446d-4f5a-b37e-47d90e13948c',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:19 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '77761cfc-4ea7-4493-9443-8e2447204400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTEgAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '787ac9b4-8058-4b73-ae24-18bfcb96adb4',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:21 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-failstogenerateabackupofanon-existingkey-/backup')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'cb651330-869d-47e9-9205-f4dbcbff5911',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:21 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '771aabef-adc5-4d6e-96e4-587ac1514400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTEwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:23 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-failstogenerateabackupofanon-existingkey-/backup')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failstogenerateabackupofanon-existingkey-"}}, [
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c6f19a37-6ad2-40ad-a0ce-cb15de620b80',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:24 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '8f21051b-6907-4f3f-87ed-d3c4317f69f6',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:25 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'b556d84d-c391-4fe1-8558-b268e1b24700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFAAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:26 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/8ceaca8797e24ee4a6b86924ff79a88a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ou1lQsCDRArNkoCL1RBQq6bYBaGZSuBFDyi-vdG_tpm_pf-x-oxkrLvCSUU5VIAW8w7z2snDLr3RbYFP11YTtIR20T4KfsSDQSVEsnYLOYT9nwhof_V2BX-EGrmuPVspDrbfaGYWOZGr4ValT6IJMLosAGHOdzyqG2E898UKQ2aRRTUbSTKJDcLrkeT7cLnsiC2spWVJwgDAR0nGlOAcCwySLALtcQHmYPkTCfRIIUo2i5FZx2XR6mbS3urBVFRvoBNbkXBz_d3AEDE9wIqHRhxqFYnpGct5Mf7yfm2CShHbdI51UgIAzXPcswNijSRWUmxMrFbj1Hg4B5ZZo6pYvw","e":"AQAB"},"attributes":{"enabled":true,"created":1568661087,"updated":1568661087,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '77f12eaa-94d6-45bb-8b91-bc41227abc28',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '716'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '8910857f-7451-4670-a346-036ec72422cf',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:28 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '771aabef-adc5-4d6e-96e4-587a16524400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFQAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:29 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnAxQmlFbWZaYmhOQWk0bGFxM2Z0V2l4anltWVNSYWZSdTJTU3hlV0VieDlxZWxiTkNpMU5BVTJQUUtSdjZOenhQOVp2Yl9NbnF2OWczREpEd21HSGdaYVlCMGxGbWh3TDJ6Sk5sZTNFbkdVUUpLQjlaa0M5XzY2NmZKSHZBb0ZTMS1xc3ZrcVktZmt5ME9tN2VHWG5YNWNlYU55VUlsMUgwLVVVaDg3QmJSZ1NUMlJGN2RBWlltbUhXTHZjcUZ5eXEtVHkwaHYzek1rRFR2YzI2T1JTd0FrQncwQnE4ZnlvWWM5WmNWYk5yNXktM0ZmUF8zd2FYLW1vNnZrQlpqanJ2TncwS3NIN2dmVU5SNU5UZl95b3VXVVF5eVA1Y29hWnFyT19MSVJkRVFuWEF6dFVuTmFyQkRHT1NMWjAzMklMZ3VyVTNMV3llRVFTMmFJcGRMalNtQS53Zm8zLWJpcWQ1SVM3WU51NXBYNGRBLjZRdlUwOTZTTUd4TDllbjRzM2tPeWt2QnplalY4d0tOVk1ZNkJORVV0cmVfUTZnMkVyMmxCQ2NleXRfQXJVWHp0YkZPcE1rRVFLQ2hJdk5XcXhKb0xLN0JMWHJYZW9hRHh5V0g2SHJlejdvQzZrV1JQMlVqVkxBalIxVldKa3U3VnVEYmtmQ0steS1tc3duc3NpRW56S2FpVHNwYm5rWGJCb2E0RDFNVnY1Qk1LVHFyeVNzRzBVVE9jV21FdzZRRF96M0VQS1pHcVNqM1hJSmxBYU1OeThGX0ZrMG1DTUR1cTR4OWc4WjVCQldPdnJBdXpvekUxTmZmOUlNRlhuYnNPYmRWZk4wYUsteldpMy16UHRXMzlmbXRUVlloWVR2cTdOUkFjeVVyeUg1TVliVUFJZ25nei1xb1FRQnROWEJ3RmtfWm9kYVk2Q0VlTTE1ZkhnZE5fQkRPaE1GQUlRVGNURWZPVDVqSkdXLUZqUnVBY1JmUG1pbmtlVGpSeTRBaG9DY0lCYkd0UzYyX25jNkU0V3NNbjVsVVBMeS12RENJN2dVSS1vb3dwVzF0SkgtbHdSYzA4TWJJTVlJYzVUREtXWmt2blhIZ2ZBbG84bVpMeExzcFJ3NGd1Vm5SUjdDSm9adjFJZjNhamdxZTZmM3BWXzBqWm8xQTRzQUlRYWxXNzNiemJfVlZGS0hpNFpiVUpwRW1rOGhxX3duLVhDOXZmY0R5ZTdYYUhXRHEta2U5MEg3WV9ZZER2WmVtcUNqMEpRcEtVdURON2xubF9kRDlybWZVaElvOTFhdExVbHgxVjBlMDItdTI2Y2hWVHpMcW5uckZ6cmlRcGRTZWZDSkNQNHg2RkctTkZVTlMtYlJrY0JHNWFPbmd6VS1YRjNnMkN0eXJyS18yUUo1N1VpZW9zVlczLWdtWmtaOVc4UGhHSC1Ubm91bnZvMkVxd1A1cGZmMzdlSFU3aFVjWmQ4b3JDaFhhdDRUd1FRc3NmSkp2UVhZRkdNQVNhNHZzMzJKdzRCcGdaY1ZBWW14UU9CVHBleGVCVml5TlZnZ1Y2S2VqdlRncWdkQTZoZVdtTGR6TnpTZjFxaXdxX0twYnp1QjRzQlJUOGdvWEhhbXE2V3gyM21xQXNSR01IMWxLYWd1SVZtY2dlNGRrM3NqM25zOWlFdnphaEJSaUNaZHZhUU5tWl9ZSkU0RGdLb09mSVlXclRKenpVSmJJSi02UDZZdzV6MVlzOGVMQldrYWx3TTdhWmdRT1RBelB1UElJSUIyRFNwOWVPVHFRZGxEWHczWk9GNFBBbW1iZUdpeF9CMVh1X3hQU1F0V3Z4LXNaWG1mZ2RvaDdoYlFfUDNCdldwQkx4NC1VYjhtUjg1aUJGelBrR3BVSlpTbkFSVFF1OEJfamU3SVQ2V0lFUUowb2J4dV95QUwxQ2lfeTVCbHBaNjRqcVk1NUhPS2ZleXp0R3UxMkVvOHpyQnhkTGUteUtYVnNIa3hONXZwcXk2d3F3S0JyVUxYY0wxNE93R2hOZUY5OHRkRm5WV2o5M2xfbkpqSi0zd0s5RXV0Q2hWRDNnYlFoT2dUS1llRS1ISEw4dDBoQTJCWktRZ01FSGRsZWRHT0pOQ0VpMTlEZkp0dXdxQTl4OEZPZDJNSUplckNUSWhDT3c2SWtRTzBmaWNrZHRGM0xURF9HejVRWmFwU19qQS1HWGVCMFMtekdvdjluTFlEWTdnSDVPWnljdk1rdGR4Qk14TVN5WjdVZlNDQW5BR3FRMjJTQmIzOWpubk5waGdWZ3pSUzJoYXo4eFFGaHRCaXRMQW9RN185TkM1RlhRMENOOXVVNENLd3ZwY3VqRzF3eWFCSGpyYmQ0YnBvRmpoMzByZTE1NFJ0WGl6VHhDd1RfN2hlRU5JVG5uQUVwR2JhZmFjbHdxbkl4VnppQnJkQkRQM3ZLVjJZVDRwa0lXRUNyMlZ1bHVXVTNmZ1pRalNVNkJ0bkJDaVFDNXJCME5SeF9iQlpoOGZqaC1zcUtPbzJCWkk3TC16dGJ2TlVxY18zWjdNM2ZJdXJ4X0xva0l1UHhNeEtHQjZMdXN5M2lNdzRDR3dOaHhwaWtxa1NGekhnOExkT01mNFByQ3B2ZFJ1QnJNSTN1cXlnNFdzUHZGZGNQcDBWQ1g3SVhUcXVSVGpITjN5ZWRSaDBmQWNjQmttd3ZTV3dFOF9UNWZkZUotdE1XLTZiT3V0NDVvS1RpT3pyWHNDMWttd2JRMmhUR2FhZFM2a2VLanA3WmNQZ2dzN3lvRENDdUNIbWFiaUdmSU01VXNzRUoyM2FNS1BFZHFRSHlwZTJVaW1tODB0UUVOVS0xVHp5bmZGbXFiMEhCbzR0OWFCdUJXLUhyWHlVc0hQR01sbDAwYlpFZFI0bmpRUGVYeTR3WnN2eUx2RmVIY1JlVjRxQzdwYjg5RkU1ZUI2bGFnb2JGV2MxYXVHbXh5ME1wU0hxMVpqZF9MLVZ3OWlfcDZOLWMxY1pQOVZ5aFdvbHhXMkN5bjdNcEFmMUx4ekFsZDgtM3hDOHIwTkI5SG5TV082V1h6cjBOQU8xUmlnUTU5TnhGdDZqU08wM1Q2UTBTbkJYM0VjYURGZUJLbUUtVjdUQ3BweURQbk1XMWlZZ1MtREtQMGJpVERMSnhnaDZxUXhUYWxzMmtaOWNoWUdrV3BBTFpRUHJFTHI5TkxERnRPUTRWNm9UUGxnek5qOFlUNVQ2ckZWWTJKU3NhZjJleHlHZ3JyVXRtUjRMUl9ZRDRNT0dFcmV2cENOakI0R2tHbHpNVzdtZlNIUTlISk1WMHhpVUpMbGFXOUR6dnROZ0J5RENPOUNpVFJpU3BqTjhJbHBzekdSY2VxWlpHTTZvUUZjcU92M29jZ2I3V0prakFMZUd4bnBaejVHbThUUmhGRXJqYXpvZ2ZIYzBGN1loRUxaZ3hWaF9MNk14T09jVUNsOG9hblFPQ3ZtTURkek5XU0d0OENSeFFRcmJ0c2hFcUloNG4xdlpxemNHa0tJWmt0YjUyQWxZeENGejI2YWYtdjFuekRndUp1cVQ3bnhySE5SLWd2YklKRmU0LXg5MEhiOXRnVGpNV3ktclN5VWRfN3V0bGZyZ1NMNEloelBMMkdEZTJKZUpXTXluS2FSb25pTzVXNkYzWVVlTFVtQWhHdnYyU3BEUERIS25OSXM1akY5VGk2V1JSYVZkS3otMnkzdk91WVZsakxxMnl2Y2x6QzI3Y2lYeXpRNkwxWXkzUmtYUy13UjMtejdXU3hCaDY3RTh2TzNHTjJUcVFwLXpkeTdpR01aRWMxOEdnTnNlYzk0T2Z3X1FfOVgxcGIwdnZINkEtV05IX25qNGIzeXZRQXB1dm1sV0RSdGU1YW5zWTdLcHp4eVE5N05SOC1HWDM3aUJvcFJFendCX0ViYkFIQzFEUVFaLTVQTTZRRlBaNUZvWk1hZXJpQzRCVlU4U0hVTkJwVjZpMEd4QXZYOFF5Tm15VGF6Ynd0VnlUclhLd0tRZEM3MHU5ajlWUUZQM3JBY3lUQndVbk8wM3d3b0NUcDJfYmxjLXZka2ozSGU0eXVkMXdTT3l4SDA1OHhqcnhuRUppMG5sRU9MbzhzYm5wTllUYjNPSWw1ZWlQNU1xcFlPbzZ5dG5MSkZ2emZvZHZUd2JQRmFuSE1SWUV3cm5hWG5Bb3ZwNTFyS1c4a3BtdzdPZGg0LWJEdzBRcjlOSTZVY21Cd0hUbXpZOTg3eklVNmFDZDRQc1JQbnVGeFp5YTFGb3ZabWpCUTg2cHBYM1NEaUZ6Qzg5UldocjVXdjhiWG9mZENtNXZMU0RPZmQ0Q2VtbGVxMTN5cXp3S0UwUU9TVEszMktsa3JraVNkSjA0eTdYb1VHaWlkaW9SWDRZLVRVYVNZTVptSjd5SVBkWnpxeTZwNWsxckJ6d3VmYUotVXlyVFNTWXVDNVRxM29XZnRGaEV5YUNjUTQ1ZWpEQ3ZFc3NWMmt4TW9XVFM2Nmw4NGZVeXIwZkVPOWJHQ2lxOTNLWG1ZYlpHWjhrc0pIRlhWQ0dMY3BPd2kyYm5nTEtlV3JsSUZlUmd1UXIyemNLVFdwa0lHQWpXdm9hOHJXdGhYaGlwMTAtSThQdW9aUzM2UlpLUlRLRy10TndWWDhWdGNvcGhMb01KWjBBS2t2X3lQMVNXTmxhRnJmZGpnNUYweEY0WHJCbEFaX0lIdlNwa1hURERzVmdQNFNDZDE2V0ZUUDMwRVpZR29jQ29zVlJIUWVaZ0NlZk9OQnE3QWR6Qy1iVXU2VThfNlJqX1AwWXp5aDJKNi1EM3h5ZE9QUTJ1UGh0V0Ytd3VQUjhqaEpHQ2JzRG5HT3VsMGFtaHJjd1V2V01Ra2dzMlEzWThTeWR0dk8tWXcxa0xrVnU1VVBTM0RBVksyRWR6WkdiSURHYjY2SnRXVElDanVzeVBOUUFBdEJKdE9ya2cyRjhDYjhqblAzQkhxbkZSVU9kT1otcUNVU2JUZExGd0tHWTFud1dnYzF0OFJnU1JEOW91U3dBUVR4aG9GZl9vVVpSYndjS2RfQVd5UjdMZGVjQXZqNjhFTDlCakFrWk1ZclM2VEpNbnBjWHNsRXVla3dGbGgyNFJ2ZC13ZWxUZmhpZy1HcjA4UW1zbzFtbEZsVEhYU1ZQdW9PVFpnT2VLWDBPWW5sR2ViMXlpck5VSFFjYVFZcHZ3X0VLV2Q2THhsVmJUSVFLbklUV3BTX1VTODdEVWJwem9CWDNsZWJPQjRXUXQ5SnNYUHJHX09FdlQ1Sm52eUpDZVJNMXgxRjVYUHk5UFRoNDZUWllndXptRGV1ZGpRVVlRMnh0NF91TkNrRGVLMW9mZllfVURNOGVBXzFXVDRJN0tjNUF5My1qRU1YbHJKMC10bzljY19ieVd4QWZpajhvdXR4ODYtMlJFRklkSUNYTENmZW5RVWdoeDhTUEgzVWlDdUJBMFdDWWZzUmJxTXEyVloyMjRCVTdraVhzUU5EZXdjdnFPd0gtN1RxWHVhcDdzUm1teXpMTC1BRG5KeV93VkdBZlN3dElfUW52d1piOFJJaWdEenpwUzNxVFRTZzAxOFJZV0ZyNHhmWUlrcDlVMnlWN0V5OGNjb1BNWHBYb1Q4X2tBQlA0TzlpMHZXU2xjNGd1b2x2d2tVZ3VSdmZJWUxhTWR1TURqMkR3R3BhT29EV1RSM2p4QzJxWFpyZUIzaU9vbTgxNXBiYmo1dkl4NUFtQUFJaE5hUWNBWXV5MTR6M0UzV01RYmRYdldFNFdXV1M5blcxRUFmcW1icXc1YkE1NFdqa1NTOEQ2dktpdFZvMUJBYTNtTTA5LV8ycFlHSERSTVJ5bktna0dJVUg4MEhWLWdwYkpTbWw4Ulk5bWNBWnloZEl0ZDI1dE5HWDJTU25RM3JqR1hRN2tHTFoxX3NheFJuLWNYZHhvaVFZVUtWc0dRQk55aWdScUNPb1ViaTJhZGM0aVdsTTJNQmZSSlFDS3JVbGFXNG5peU1iMloxbnplcWJwTFVWc1k3b0VoMTJONEZHd1M4dUQ5aHE0Nm9RMUFGT0JMelRQU1ZNRGt2cnJXaUx1TmgzNlpRZ3NQMXViUDkwZU5fTHJzcTJLalIzU3F1MDMwWml0NWR5ZFFjTzBBV1N4OW53Q2g1UU83VE1MOGRNV1pONmdWQWhLcEFPWTh0QktwZ3R1MEJleVpaYmJYUy05RjF6ZDlnSWRoNGFLWndzVDBTcUlCbnFHS1B1eXhFMWp3UUtMcVlKcXkwaFNnMzJzZzNOMjg0dmlTSnJwNHZJVHFlLXMzX3hoX3haZ2VmRGNRYXc4dWFPWDQxMTlyYmxUMGdrNzQ4YlpaVGU5WG9idGhDclJfZFI1Z0VFNnBBNDI0bFVjRTR0c1pxMkg2UTBRak5Qd1FVTk1MZ05PWFZQdTRJakVrSnNBSVd5S0NFQTYySTJPVnlSd3E1VExrMEVQLVRLejRLZFMtZ01ubTFnMTZVUV9VdUhjcGlkSWlWaXBNOHJlLTFScFFrT2N6N0JjZXlXXzlsc0lLTEpaN3dZc2dHLWNnRlVMaWpoUWRMa1dhbmhma3Fkdm5ldnd2MzUwZXRnck0xRUxZUVZ3N1Fsa2pVd1JNcDBvUWlkVGVTVmpEQ2E5UjVDNU5GSEllYVh5LUcwY0lKQXRwUW1jVEhQN19UT3VwQnhQSXNGUE5qcHJvekVhakpTOWxydnA1UnpibUZVNGJmRWloWFdhVFd0T2tKZW9WSVo1UzRTN2tBR1pMTkJPbmJmTTZDVXZHMWxlT29HakVRUFl5Vi1IVEZqZUt3US1ST0RqMnY4YUFvZjVTTU5GV3d4VHg2RmZFWHdKNEZIWjRSMmg5b1BCMnNPR01vUFZCYlA5cjAzNWdWT1dkeENNNVdhSWU0QmRqVWdCZTdtOF9Ga3c4MDRLeFlFNGRkc0NTMWJ0aUhQU3ZUbjB5N0s2bEV4TlRwTm9SZDBHTDdwVk51VmxxZjlXMi1VSWo0cFQ4VEYtd1NEWk0xanhDd3A2S2NUTXBrdHRhMVR3MVc0enl1VzNBODBoY1NpZ1VZQldxbVJ4MUNsMnoyYUd3alZBdExLS3U5UmFTRTZhcENrTDZ5eTVkeG1nMkp3eUdfY0IwSWU4ZW5QcHAtdWEtX1RGT010WVZOTVFLTW1SWFliODNVTmFWU054dGUwNVZBbERQZEY2UWV5MlE1ejRRbWZ2TkNneXYzbF9UY0pVemx3SHpTd0IxVHAtUHFNMl9LOEFJVkVQU1loWndoMS1oRmthRHI2aXlSbGdEVGR4dVBXaW9DTk1jcWR2NnlUNFFuNTRDRDYtWjVjUXhDLXM1bGdmRWR4UmtoRGxSMTF5N1FrZGFYOHN3MTVRRDAtcy04UTJnUUV0SGxhSkk5YUdYWm9HVEZCSVd0NXIzUjN0NjhaX01PV04tYUtoc3lEaWpFRXhGU0lsVUlmQmcwejI2ME5DYkt3SjZuMFFRRmNSZHNKdDdlVGM0RzJVeUJLOUJvRk82V0kwUzNkY1J5RV9oM09kaFduMEgtX0VFSWNKNDFEWUhTUXBNc0hmRV9EdFdqTVJlbWFuOHBJTXdSTnN3OFNEVXZERDBQel96bUxGalZ0Z3ZEbFh6dDRILVRlZ2UyX3hBTXVleDlmaU14dWFUMGF2LXVRSlc3M1YtLW9IQUlfWmpwSk94MHlZck9JR05qbHlRQjc5cVdGemZ6UmJHUjRTTUtwenRXNmg4b0d6cS1ta19QMGs0SXVsb1QxdXB0QW5sU0FNU0VOYzVVZTdHVHhSaDZMNE5reF9ESVpleFFuRllWOXFBXzFMd3ZiN2lJcDQ5YzEyVllqZm5TTjJlZENUZnpUeTdIVC1jLWlmZzlXNXpfbDd6SWxELXo2anZDS2Z2QTlBelhCR2IwZjg2b2g5Ujc4Tk80aWprZEYxcHpOTFpvYmRObUhIV2JxeFlqX1FLVUpiQndPeTZHQjZpdEhySHBCNHJ4Ukg1RTREZnRUODFTQ3F6U2RHZVdObzBURkszQnBDRzZsS1R2MnRLdmZqNU5sdWZlWHZRVnBxeHNnb0FmRUlfNXo2LVZVZTl2MlRHNENfdGlPQkM3SkJTZ0ZDWXVxR2xhdUZsdkU4c1U2R0F3a0hUdlRja2xyb2ZiTUp0cThtOUd1SHh3azJZT1ZhbUZoOVU5TUEzNEJrX2hSUDc1bHRUX1VkR3BhTTlWOEpPbXNsMG8tUV9sU3RfRnpqUENGNWRQRW5PU19OX3N4VHZZTnJmckRKb2lvT0dUUXJ3SVlDMUQycHFSR0p1RGhVOHBuN1B1SlFEUEdDMnhDNnVBeWlsakVUSXdlYXZ2ZzRnNmVLSVJnY3BwX3h2TzVFREJCa0thZmlxY2d5cGRpZF9lZnd3U2I0dGNIQXdtYXk1c3E5SjhsUE1LN0JtcFA3c2M0VmZVZW4wTVR4YVY1Yk02djRjT051di1yUVhUbkNMQ1dfbUxqOTNnVGpGcEEwRzdpSGx1QVQ3S2pQNWFIUWtRWEtXVTV6QUFPNjVjb0l4bVVnR2o3UHl6TTYtbzFSN3VIV3l0Z1k1NmVscGJheVVULXotQnZnTmJyNzlUNm15RUpOZWFoT3c3RmhGdjNIOGRCb0FkVGZfdVVtM01vdkViUjdJMjJWWGdEVk54dnpFSlAzdEdrVjlDdUkzSmhJcFppNzJfcHZ4bjBiSy04VFlPeDJlTVV6aGZfWDJZaE00d0IzZmkwTjQ0V1ZHQTRKWnFrUEp1Q043NUhFWGJwbDJIZ0Y2YnNyVExNVFpPYjY4SzZELVh6dlRkbi16S2hPNzRuZUwyWTZTbjVaMGJyOXdZZFhEcjBaZVE5dzEza2lBU01fR3dBWlJxbU00LWJuM0s5bDNfeHZ6ZGdobjFsLXhvM2JfczhyWm8yMVhBa3VpVkZyV3pNeEVQTmNPSHlCR2JPR2kwbGt2d2FsUm9aUWdkQktQblNSQngwWVNaMkl1OE9OR0Y1amp0ZDluRXlTeVg1MVF1c2loLTZvYXE1YVc1bzRJVzVkbnBBbFdjTXpGX1FWd1pNc21tOVRsUEJCNi01d1UtcVFMS0xzTVFYa25ZMWVJWjZmc2RMT1RJNU5IWXo0TkQyVEFPRDdYbXVHT1VHNWpZYjJpRE03Q1l2eHpsRTRpX2ZWNGF1TmdnSWlhTG9EV081TW1iUXM0TElla0VzVmhZVzNoWndvOFZTZ043THVlckE2Q0otTWIxcllYbm9SaHM1b2JuLXVFbWlVOFRNZmxwVFk0VnktWnZpVS1mdXRNZjFPODIwbG1nNngzTzVWbEtFUjhEZzZ6UVFJczlBSHUxNGpqTHMwRU9zZW9hTWhqaFZ0QWZwWmFORXNmd0VPbk5pWnVXdWl6Yzh0NktnblN4OEZwYW5sVEN0M05hQWkzWkRZNEdPSGFsWVppRmNJanA0MndDWjdLU0hzbFFodVFiY0pBNm55QS1HWDNncmpZRThVT3NGeGNsT3JvTERnRnQ3V0VWYkU2QUdDaVlZSVpRV1dzVFp4eGZJOUR6QXJ0S2VxZzdVNU14d09DOEp3Yk1uSWpUeEpqRS04R1hfMjZkTjdlZS02TC15VXQ4dE01cWVZZnNLOUViVzBXUUh4SDZwUTNlSko2T0NrYnBIWXRWTG9Mb2pNbmwwNEdMWWpub1JnbE85TXZfV2RWWmtZTDQ3aDBlTklNVm52RnpYRlBhSzlxYjJETTFhcHRVWl8zQWRrbzJaaXBNNlo4elgtSUlYNEZLNzMyUUdGbS0yQzdhamFJeFVhOFA1NDRJYm04cjlGcDVjem9sWHhzS1JqUXptWWhWZWZRTVEyeF9ZOTh3bTNKbkZUR3pqOXRKdTBTVGMyUlRUMGpGNFVBX2RWamx5SzlpMEktaVRQZnB4cXVrMU9tT2s1WGpqSk83YlJfWVF5eVNQOXBuai1sb2UyRHRMSERLb1l6N0dISWZ6QmRfcWN1YUlxdHl4YWpNbjY5YkQtTy1aQmpWbmcyZU1hN195aGtrYnI2dVZvcmlUWWZEQ1BNZ3gwZmR0ZjdzVXFET1hobXhVUU9JZXBUcXVrTUxBVG02VkhLTW9TSEhYUGJ0UWd2bEN5MG9vU0pOTzVQRG0tOWNuMTFIa0FRM2xOdFF3MGwxVnBGNUV2MkNQSlRXYlpNVmp5WUZpdklwY05qTUMycjc5U1JUemJ1QnhwOFR1MmtyMWU4a2gtZmg4ckFfNGpRTllJT01Kc0xUZ1Z1UmFKeXdFMWV6YnFpT0p5czA3N2FUbWVyVEdZWUVnTkJPLXB1alFzWDV0LXlqamdyNU5qN3BBQmlyRHVUOXU0TW9IMEJQb3ZGc0M0NElna1g1dFNEbW84SUx4cGtuX094OGNEMkZWMW9renlmMTJkQW5SM0NrSHRBZTB5REppQjFqek5ZRUVJSzJ2aU9felAxbkFBak83SWluV3hXOU85c3JIOFJadVotOVVlc19ydURWLTE3SFhpYW9FUzA1RENCWUctVHJxR0pVeWp1QVB4UFp2XzdJTTBYMDdHZzNGbFRlREgwSWpFS2NsX0VwdzFZU2VRYk9yaDViM29IdXA3S0s0c3lmNGdkR3BTTlBQQlZpRlBvQk1MaGRteDliNkpRdFpxcE1jaUdYUnhCYVZCaE1hamdRejkxT290SUdsUUFELVBjWGdLcTlOZE5SVDFqaWtyU1BHLXo3VVUxU29nd2twQVNwak5NU0tfTmNUTElQeG1hZWx1SDE1eTRTQTJBTE9iR09yUzkwNXQ5Nnh0QVNocktseUJLUWxjUkZOem1OVHNvWHA5aVFrMTlwcW5WZlIzSkgwQ09VTTliSnVQamJDU2RQT2F6VGZvM29Cb09KeUpENzZTQm1jcERLVG1CdjlzOHcxYjJCbFlFUDh6eXNqTFJETjd4LWlmN1VneUxFWnI0YjNpQWJBbDVtcklQNzhqazA4akFTRzBFQi0zYmNwVW10eHlISmVJUm51TmJncER1d2Z5emstejVqcm9CYngzLU5DNzdyUHBkNEtnUDVTRVFDTmcwZFExNnN4Zk9KTHM1bFl5UEhPR1J1TEgwZURFczFtZUFHN3o2dzEwdjNqelBLZjZ2c2dOdW9GOTUtenRNVC16WXZFSXpnMzB1LWczMDhLbVpjVVdiRThfeHgwY3lxOGUyWEhnTzh5WldxcmJpRUdQSEJpOHFQR1M0bElLaE4xZkVsWW01bDBhdDdUTEpJemZ4d29UVFBXNmc2aDBfTDZDdjVORzVnaVBRZ3luX21rTEtGMk0way1WZ0F6WF9FdVc0VmlJVWZUSTN6MWpPWFFKNzFRVmJtX1J2dWRFT2FEeWJzU0RVaEZhdDA0ZDVLVkw0Y1ZFbHk5SURJeWZEMURmUzJEbDdYTHBOajNaTVpMLUZOMVV1cGhQa3pMOW9aZlVUT1ZqS2FBQWY4dzVFNm1QcTltR3VJWHkwS3d4U0xCVTBSajEtc3ZycndoOThhdWVVUVZKZXZaanhaZ0lQRjZNNGs3UGVFazYzUmJNRDVrc1BEaGpyVURnTmtzMGJEekN6bVJncTdiX19JZTVsU0FJclEyd05Pd1U0Q0huUUV2c25NLTd2QTBmQ3Z0d1NRX2M2Ykt2Zy1PNG43WjdyUGNyUWpWLU8yUHZHY3dTd0p4ZEVkN2VTRnI3WkM1VDRySEZmLUFoZm8tM2RLSUVnV2QtLU10RjFyZFJrRDlwQzluVUZPY0pEMzMxOXBmSWJ2cF9GY0Zfb0FwRXo4cEZfOEY4M1BBaUVTa0hlT2tDZzhwZVF2Nlg0UWFMdWNfcnptSDlwQ0NKSUJHZDlrMjJEY212eDUxNkJCTlBsdGxVdzZsSlVXYklXaFpCME9XcjhXM2RRblh0V3lmNWd5UXJiTGdRSGVrSTVXYkZONGx4YUF0dW1YQ2VfdnI2MHg3bkgxSEFIVlR3UzFrT1ZudmpvMXk0VFdCSFZoaEtSdzdpdWRMdGZXX21scFZQQlphZElpS3piZHp0T2prckxEY2FEaVhGNF9UX3pXQXd6eFliWUZjeUZ2dTNsd2VEQ0UzWkdaZncxOFRFYVNQTVFPMzFpTk15aUNCZ0RoRFZkbVV4RmZVbGljaGZsZVdsSVQ0d2xjMy1mbkx5blMxcWdVdEt5VGlmajhoNEJVa2ZQMzlXdUh1TmhzZW1Tc1Q0dmRBYm1kSDM1Zk5RaUlOYXVDVEszR3JGVndCN3RpS0Q1M0drS0VLUTRqMVlOTDVfbkU2NDFJalNZSGxkLXdlRUZNVXhkR0hBVEJaUnY4UFBTVlJWOFJCcHpJSDNLUUpGQ0ZKaHVJYkxlY1pqSm92cHZFUzdxaXVDSEdzRWlfcWJYcGE2dnE2X2sxdkkwaGQ1QS0tckQ5Uy1RVFR3NkNZZUtBUldJMWRTY0hIeHFBd21jR3BJbUdPUk53akUyN0h2NFp1MUwyMUM3c0VrNXlUb25LXzVXU2t0MVhOWDNDa3h6OWVLUmJJNjhEdVVXN3Vsd0MwcFFFcnRTZ2pKYzIxYTFsUGhoWkxiOHpRdVNKVzBaOXJ1OC1fRkxSRGlTbHpnMmJRS2V0QmZaSFo1VV91MHJ2dFRaeC1NMVR1Q2NFU29DdmpTdUR5TjFLQ0ViNExZVmRDekRVNGhlazJBU0pRSDFsMDZBcVlFaDkxdndBaVBGSlZZNV9PUEF3enJKZy14dENYTk1IaTc3WU9SNG9EMTdBMW00RkVQQTRNWXFjYVFCOXh1Q29iaWo2NlV2RTNmRUZHem1xOEZHV1l1RWhLVWxzRnBLUWRpLU1JS1RtUnZEMk5iYWpCM0Jmd1ZYRktvNDJ1X0JPZG1ON0FxUXc3OUdySmtBeUNoVU5fUFlkZUtyWFR2NmNvTlB0R0piY2xKWVMxRUhrak1ra3hhVjA3ODJ5enU3NDNUcmY1NUlyY214N0ZTRV9YVC14UHRzdUVvQlF6RDM1OG1Tc3FhSldyZDZOalJ4UXh2c05NNGd6Q1V2c0tLbGRqQkl5XzlOTDNJb1pBM05rY3hKdUJ4dEJKSURmTDZaNndhalVRYUtGWExDT1ZwMXNkcXFtS1ZzdEE4cUVvOFQtV01adExheElGd1FaWHFPS0hfTVNGQWtxaFJ1X0k3SXhEYmM5eEdpenBMUnV0UjQzbEh5eFUwXzFpUHZyQklhRi10dXdiOW01am52SkxqeUNPQnNWM0hrLXotQTRwWHlPYUlQUmJfLVdFekR3cFNZZTgxVDRMaUFFVlduUEdUaXpfUnpqNVpxWm83TS5vclhvZXluZXNGbnZuLU9SS2cySjNB"}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '42cefabb-3780-45b8-b5ad-330541bb59d8',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '13536'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '68d3510d-fafa-44fb-84f5-249ffca58353',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:31 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'c1804488-dc1d-4fdb-9c73-76211a574300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFgAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:32 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1568661093,"scheduledPurgeDate":1576437093,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/8ceaca8797e24ee4a6b86924ff79a88a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ou1lQsCDRArNkoCL1RBQq6bYBaGZSuBFDyi-vdG_tpm_pf-x-oxkrLvCSUU5VIAW8w7z2snDLr3RbYFP11YTtIR20T4KfsSDQSVEsnYLOYT9nwhof_V2BX-EGrmuPVspDrbfaGYWOZGr4ValT6IJMLosAGHOdzyqG2E898UKQ2aRRTUbSTKJDcLrkeT7cLnsiC2spWVJwgDAR0nGlOAcCwySLALtcQHmYPkTCfRIIUo2i5FZx2XR6mbS3urBVFRvoBNbkXBz_d3AEDE9wIqHRhxqFYnpGct5Mf7yfm2CShHbdI51UgIAzXPcswNijSRWUmxMrFbj1Hg4B5ZZo6pYvw","e":"AQAB"},"attributes":{"enabled":true,"created":1568661087,"updated":1568661087,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '3b83a587-9414-4842-a363-478591581e0b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '907'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c5516295-fb55-4a76-94f7-31f176f0650e',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:34 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '4f3dd40b-06d1-4d66-af95-ad4357924300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:35 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '2fc23f86-4c8b-446e-9646-1335105c4a56',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:36 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2b83c698-0015-4a0c-9bc9-11ac88b422d9',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:47 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '4f3dd40b-06d1-4d66-af95-ad4316934300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:48 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '423ca6e8-ba49-40ca-a26f-acd20fa0afdb',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:48 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'efacfd8b-ea5e-4551-a940-53ebcf769b8b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:50 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '4065f9eb-e5c5-43ba-9a47-3d77cd654300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:11:51 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:11:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnAxQmlFbWZaYmhOQWk0bGFxM2Z0V2l4anltWVNSYWZSdTJTU3hlV0VieDlxZWxiTkNpMU5BVTJQUUtSdjZOenhQOVp2Yl9NbnF2OWczREpEd21HSGdaYVlCMGxGbWh3TDJ6Sk5sZTNFbkdVUUpLQjlaa0M5XzY2NmZKSHZBb0ZTMS1xc3ZrcVktZmt5ME9tN2VHWG5YNWNlYU55VUlsMUgwLVVVaDg3QmJSZ1NUMlJGN2RBWlltbUhXTHZjcUZ5eXEtVHkwaHYzek1rRFR2YzI2T1JTd0FrQncwQnE4ZnlvWWM5WmNWYk5yNXktM0ZmUF8zd2FYLW1vNnZrQlpqanJ2TncwS3NIN2dmVU5SNU5UZl95b3VXVVF5eVA1Y29hWnFyT19MSVJkRVFuWEF6dFVuTmFyQkRHT1NMWjAzMklMZ3VyVTNMV3llRVFTMmFJcGRMalNtQS53Zm8zLWJpcWQ1SVM3WU51NXBYNGRBLjZRdlUwOTZTTUd4TDllbjRzM2tPeWt2QnplalY4d0tOVk1ZNkJORVV0cmVfUTZnMkVyMmxCQ2NleXRfQXJVWHp0YkZPcE1rRVFLQ2hJdk5XcXhKb0xLN0JMWHJYZW9hRHh5V0g2SHJlejdvQzZrV1JQMlVqVkxBalIxVldKa3U3VnVEYmtmQ0steS1tc3duc3NpRW56S2FpVHNwYm5rWGJCb2E0RDFNVnY1Qk1LVHFyeVNzRzBVVE9jV21FdzZRRF96M0VQS1pHcVNqM1hJSmxBYU1OeThGX0ZrMG1DTUR1cTR4OWc4WjVCQldPdnJBdXpvekUxTmZmOUlNRlhuYnNPYmRWZk4wYUsteldpMy16UHRXMzlmbXRUVlloWVR2cTdOUkFjeVVyeUg1TVliVUFJZ25nei1xb1FRQnROWEJ3RmtfWm9kYVk2Q0VlTTE1ZkhnZE5fQkRPaE1GQUlRVGNURWZPVDVqSkdXLUZqUnVBY1JmUG1pbmtlVGpSeTRBaG9DY0lCYkd0UzYyX25jNkU0V3NNbjVsVVBMeS12RENJN2dVSS1vb3dwVzF0SkgtbHdSYzA4TWJJTVlJYzVUREtXWmt2blhIZ2ZBbG84bVpMeExzcFJ3NGd1Vm5SUjdDSm9adjFJZjNhamdxZTZmM3BWXzBqWm8xQTRzQUlRYWxXNzNiemJfVlZGS0hpNFpiVUpwRW1rOGhxX3duLVhDOXZmY0R5ZTdYYUhXRHEta2U5MEg3WV9ZZER2WmVtcUNqMEpRcEtVdURON2xubF9kRDlybWZVaElvOTFhdExVbHgxVjBlMDItdTI2Y2hWVHpMcW5uckZ6cmlRcGRTZWZDSkNQNHg2RkctTkZVTlMtYlJrY0JHNWFPbmd6VS1YRjNnMkN0eXJyS18yUUo1N1VpZW9zVlczLWdtWmtaOVc4UGhHSC1Ubm91bnZvMkVxd1A1cGZmMzdlSFU3aFVjWmQ4b3JDaFhhdDRUd1FRc3NmSkp2UVhZRkdNQVNhNHZzMzJKdzRCcGdaY1ZBWW14UU9CVHBleGVCVml5TlZnZ1Y2S2VqdlRncWdkQTZoZVdtTGR6TnpTZjFxaXdxX0twYnp1QjRzQlJUOGdvWEhhbXE2V3gyM21xQXNSR01IMWxLYWd1SVZtY2dlNGRrM3NqM25zOWlFdnphaEJSaUNaZHZhUU5tWl9ZSkU0RGdLb09mSVlXclRKenpVSmJJSi02UDZZdzV6MVlzOGVMQldrYWx3TTdhWmdRT1RBelB1UElJSUIyRFNwOWVPVHFRZGxEWHczWk9GNFBBbW1iZUdpeF9CMVh1X3hQU1F0V3Z4LXNaWG1mZ2RvaDdoYlFfUDNCdldwQkx4NC1VYjhtUjg1aUJGelBrR3BVSlpTbkFSVFF1OEJfamU3SVQ2V0lFUUowb2J4dV95QUwxQ2lfeTVCbHBaNjRqcVk1NUhPS2ZleXp0R3UxMkVvOHpyQnhkTGUteUtYVnNIa3hONXZwcXk2d3F3S0JyVUxYY0wxNE93R2hOZUY5OHRkRm5WV2o5M2xfbkpqSi0zd0s5RXV0Q2hWRDNnYlFoT2dUS1llRS1ISEw4dDBoQTJCWktRZ01FSGRsZWRHT0pOQ0VpMTlEZkp0dXdxQTl4OEZPZDJNSUplckNUSWhDT3c2SWtRTzBmaWNrZHRGM0xURF9HejVRWmFwU19qQS1HWGVCMFMtekdvdjluTFlEWTdnSDVPWnljdk1rdGR4Qk14TVN5WjdVZlNDQW5BR3FRMjJTQmIzOWpubk5waGdWZ3pSUzJoYXo4eFFGaHRCaXRMQW9RN185TkM1RlhRMENOOXVVNENLd3ZwY3VqRzF3eWFCSGpyYmQ0YnBvRmpoMzByZTE1NFJ0WGl6VHhDd1RfN2hlRU5JVG5uQUVwR2JhZmFjbHdxbkl4VnppQnJkQkRQM3ZLVjJZVDRwa0lXRUNyMlZ1bHVXVTNmZ1pRalNVNkJ0bkJDaVFDNXJCME5SeF9iQlpoOGZqaC1zcUtPbzJCWkk3TC16dGJ2TlVxY18zWjdNM2ZJdXJ4X0xva0l1UHhNeEtHQjZMdXN5M2lNdzRDR3dOaHhwaWtxa1NGekhnOExkT01mNFByQ3B2ZFJ1QnJNSTN1cXlnNFdzUHZGZGNQcDBWQ1g3SVhUcXVSVGpITjN5ZWRSaDBmQWNjQmttd3ZTV3dFOF9UNWZkZUotdE1XLTZiT3V0NDVvS1RpT3pyWHNDMWttd2JRMmhUR2FhZFM2a2VLanA3WmNQZ2dzN3lvRENDdUNIbWFiaUdmSU01VXNzRUoyM2FNS1BFZHFRSHlwZTJVaW1tODB0UUVOVS0xVHp5bmZGbXFiMEhCbzR0OWFCdUJXLUhyWHlVc0hQR01sbDAwYlpFZFI0bmpRUGVYeTR3WnN2eUx2RmVIY1JlVjRxQzdwYjg5RkU1ZUI2bGFnb2JGV2MxYXVHbXh5ME1wU0hxMVpqZF9MLVZ3OWlfcDZOLWMxY1pQOVZ5aFdvbHhXMkN5bjdNcEFmMUx4ekFsZDgtM3hDOHIwTkI5SG5TV082V1h6cjBOQU8xUmlnUTU5TnhGdDZqU08wM1Q2UTBTbkJYM0VjYURGZUJLbUUtVjdUQ3BweURQbk1XMWlZZ1MtREtQMGJpVERMSnhnaDZxUXhUYWxzMmtaOWNoWUdrV3BBTFpRUHJFTHI5TkxERnRPUTRWNm9UUGxnek5qOFlUNVQ2ckZWWTJKU3NhZjJleHlHZ3JyVXRtUjRMUl9ZRDRNT0dFcmV2cENOakI0R2tHbHpNVzdtZlNIUTlISk1WMHhpVUpMbGFXOUR6dnROZ0J5RENPOUNpVFJpU3BqTjhJbHBzekdSY2VxWlpHTTZvUUZjcU92M29jZ2I3V0prakFMZUd4bnBaejVHbThUUmhGRXJqYXpvZ2ZIYzBGN1loRUxaZ3hWaF9MNk14T09jVUNsOG9hblFPQ3ZtTURkek5XU0d0OENSeFFRcmJ0c2hFcUloNG4xdlpxemNHa0tJWmt0YjUyQWxZeENGejI2YWYtdjFuekRndUp1cVQ3bnhySE5SLWd2YklKRmU0LXg5MEhiOXRnVGpNV3ktclN5VWRfN3V0bGZyZ1NMNEloelBMMkdEZTJKZUpXTXluS2FSb25pTzVXNkYzWVVlTFVtQWhHdnYyU3BEUERIS25OSXM1akY5VGk2V1JSYVZkS3otMnkzdk91WVZsakxxMnl2Y2x6QzI3Y2lYeXpRNkwxWXkzUmtYUy13UjMtejdXU3hCaDY3RTh2TzNHTjJUcVFwLXpkeTdpR01aRWMxOEdnTnNlYzk0T2Z3X1FfOVgxcGIwdnZINkEtV05IX25qNGIzeXZRQXB1dm1sV0RSdGU1YW5zWTdLcHp4eVE5N05SOC1HWDM3aUJvcFJFendCX0ViYkFIQzFEUVFaLTVQTTZRRlBaNUZvWk1hZXJpQzRCVlU4U0hVTkJwVjZpMEd4QXZYOFF5Tm15VGF6Ynd0VnlUclhLd0tRZEM3MHU5ajlWUUZQM3JBY3lUQndVbk8wM3d3b0NUcDJfYmxjLXZka2ozSGU0eXVkMXdTT3l4SDA1OHhqcnhuRUppMG5sRU9MbzhzYm5wTllUYjNPSWw1ZWlQNU1xcFlPbzZ5dG5MSkZ2emZvZHZUd2JQRmFuSE1SWUV3cm5hWG5Bb3ZwNTFyS1c4a3BtdzdPZGg0LWJEdzBRcjlOSTZVY21Cd0hUbXpZOTg3eklVNmFDZDRQc1JQbnVGeFp5YTFGb3ZabWpCUTg2cHBYM1NEaUZ6Qzg5UldocjVXdjhiWG9mZENtNXZMU0RPZmQ0Q2VtbGVxMTN5cXp3S0UwUU9TVEszMktsa3JraVNkSjA0eTdYb1VHaWlkaW9SWDRZLVRVYVNZTVptSjd5SVBkWnpxeTZwNWsxckJ6d3VmYUotVXlyVFNTWXVDNVRxM29XZnRGaEV5YUNjUTQ1ZWpEQ3ZFc3NWMmt4TW9XVFM2Nmw4NGZVeXIwZkVPOWJHQ2lxOTNLWG1ZYlpHWjhrc0pIRlhWQ0dMY3BPd2kyYm5nTEtlV3JsSUZlUmd1UXIyemNLVFdwa0lHQWpXdm9hOHJXdGhYaGlwMTAtSThQdW9aUzM2UlpLUlRLRy10TndWWDhWdGNvcGhMb01KWjBBS2t2X3lQMVNXTmxhRnJmZGpnNUYweEY0WHJCbEFaX0lIdlNwa1hURERzVmdQNFNDZDE2V0ZUUDMwRVpZR29jQ29zVlJIUWVaZ0NlZk9OQnE3QWR6Qy1iVXU2VThfNlJqX1AwWXp5aDJKNi1EM3h5ZE9QUTJ1UGh0V0Ytd3VQUjhqaEpHQ2JzRG5HT3VsMGFtaHJjd1V2V01Ra2dzMlEzWThTeWR0dk8tWXcxa0xrVnU1VVBTM0RBVksyRWR6WkdiSURHYjY2SnRXVElDanVzeVBOUUFBdEJKdE9ya2cyRjhDYjhqblAzQkhxbkZSVU9kT1otcUNVU2JUZExGd0tHWTFud1dnYzF0OFJnU1JEOW91U3dBUVR4aG9GZl9vVVpSYndjS2RfQVd5UjdMZGVjQXZqNjhFTDlCakFrWk1ZclM2VEpNbnBjWHNsRXVla3dGbGgyNFJ2ZC13ZWxUZmhpZy1HcjA4UW1zbzFtbEZsVEhYU1ZQdW9PVFpnT2VLWDBPWW5sR2ViMXlpck5VSFFjYVFZcHZ3X0VLV2Q2THhsVmJUSVFLbklUV3BTX1VTODdEVWJwem9CWDNsZWJPQjRXUXQ5SnNYUHJHX09FdlQ1Sm52eUpDZVJNMXgxRjVYUHk5UFRoNDZUWllndXptRGV1ZGpRVVlRMnh0NF91TkNrRGVLMW9mZllfVURNOGVBXzFXVDRJN0tjNUF5My1qRU1YbHJKMC10bzljY19ieVd4QWZpajhvdXR4ODYtMlJFRklkSUNYTENmZW5RVWdoeDhTUEgzVWlDdUJBMFdDWWZzUmJxTXEyVloyMjRCVTdraVhzUU5EZXdjdnFPd0gtN1RxWHVhcDdzUm1teXpMTC1BRG5KeV93VkdBZlN3dElfUW52d1piOFJJaWdEenpwUzNxVFRTZzAxOFJZV0ZyNHhmWUlrcDlVMnlWN0V5OGNjb1BNWHBYb1Q4X2tBQlA0TzlpMHZXU2xjNGd1b2x2d2tVZ3VSdmZJWUxhTWR1TURqMkR3R3BhT29EV1RSM2p4QzJxWFpyZUIzaU9vbTgxNXBiYmo1dkl4NUFtQUFJaE5hUWNBWXV5MTR6M0UzV01RYmRYdldFNFdXV1M5blcxRUFmcW1icXc1YkE1NFdqa1NTOEQ2dktpdFZvMUJBYTNtTTA5LV8ycFlHSERSTVJ5bktna0dJVUg4MEhWLWdwYkpTbWw4Ulk5bWNBWnloZEl0ZDI1dE5HWDJTU25RM3JqR1hRN2tHTFoxX3NheFJuLWNYZHhvaVFZVUtWc0dRQk55aWdScUNPb1ViaTJhZGM0aVdsTTJNQmZSSlFDS3JVbGFXNG5peU1iMloxbnplcWJwTFVWc1k3b0VoMTJONEZHd1M4dUQ5aHE0Nm9RMUFGT0JMelRQU1ZNRGt2cnJXaUx1TmgzNlpRZ3NQMXViUDkwZU5fTHJzcTJLalIzU3F1MDMwWml0NWR5ZFFjTzBBV1N4OW53Q2g1UU83VE1MOGRNV1pONmdWQWhLcEFPWTh0QktwZ3R1MEJleVpaYmJYUy05RjF6ZDlnSWRoNGFLWndzVDBTcUlCbnFHS1B1eXhFMWp3UUtMcVlKcXkwaFNnMzJzZzNOMjg0dmlTSnJwNHZJVHFlLXMzX3hoX3haZ2VmRGNRYXc4dWFPWDQxMTlyYmxUMGdrNzQ4YlpaVGU5WG9idGhDclJfZFI1Z0VFNnBBNDI0bFVjRTR0c1pxMkg2UTBRak5Qd1FVTk1MZ05PWFZQdTRJakVrSnNBSVd5S0NFQTYySTJPVnlSd3E1VExrMEVQLVRLejRLZFMtZ01ubTFnMTZVUV9VdUhjcGlkSWlWaXBNOHJlLTFScFFrT2N6N0JjZXlXXzlsc0lLTEpaN3dZc2dHLWNnRlVMaWpoUWRMa1dhbmhma3Fkdm5ldnd2MzUwZXRnck0xRUxZUVZ3N1Fsa2pVd1JNcDBvUWlkVGVTVmpEQ2E5UjVDNU5GSEllYVh5LUcwY0lKQXRwUW1jVEhQN19UT3VwQnhQSXNGUE5qcHJvekVhakpTOWxydnA1UnpibUZVNGJmRWloWFdhVFd0T2tKZW9WSVo1UzRTN2tBR1pMTkJPbmJmTTZDVXZHMWxlT29HakVRUFl5Vi1IVEZqZUt3US1ST0RqMnY4YUFvZjVTTU5GV3d4VHg2RmZFWHdKNEZIWjRSMmg5b1BCMnNPR01vUFZCYlA5cjAzNWdWT1dkeENNNVdhSWU0QmRqVWdCZTdtOF9Ga3c4MDRLeFlFNGRkc0NTMWJ0aUhQU3ZUbjB5N0s2bEV4TlRwTm9SZDBHTDdwVk51VmxxZjlXMi1VSWo0cFQ4VEYtd1NEWk0xanhDd3A2S2NUTXBrdHRhMVR3MVc0enl1VzNBODBoY1NpZ1VZQldxbVJ4MUNsMnoyYUd3alZBdExLS3U5UmFTRTZhcENrTDZ5eTVkeG1nMkp3eUdfY0IwSWU4ZW5QcHAtdWEtX1RGT010WVZOTVFLTW1SWFliODNVTmFWU054dGUwNVZBbERQZEY2UWV5MlE1ejRRbWZ2TkNneXYzbF9UY0pVemx3SHpTd0IxVHAtUHFNMl9LOEFJVkVQU1loWndoMS1oRmthRHI2aXlSbGdEVGR4dVBXaW9DTk1jcWR2NnlUNFFuNTRDRDYtWjVjUXhDLXM1bGdmRWR4UmtoRGxSMTF5N1FrZGFYOHN3MTVRRDAtcy04UTJnUUV0SGxhSkk5YUdYWm9HVEZCSVd0NXIzUjN0NjhaX01PV04tYUtoc3lEaWpFRXhGU0lsVUlmQmcwejI2ME5DYkt3SjZuMFFRRmNSZHNKdDdlVGM0RzJVeUJLOUJvRk82V0kwUzNkY1J5RV9oM09kaFduMEgtX0VFSWNKNDFEWUhTUXBNc0hmRV9EdFdqTVJlbWFuOHBJTXdSTnN3OFNEVXZERDBQel96bUxGalZ0Z3ZEbFh6dDRILVRlZ2UyX3hBTXVleDlmaU14dWFUMGF2LXVRSlc3M1YtLW9IQUlfWmpwSk94MHlZck9JR05qbHlRQjc5cVdGemZ6UmJHUjRTTUtwenRXNmg4b0d6cS1ta19QMGs0SXVsb1QxdXB0QW5sU0FNU0VOYzVVZTdHVHhSaDZMNE5reF9ESVpleFFuRllWOXFBXzFMd3ZiN2lJcDQ5YzEyVllqZm5TTjJlZENUZnpUeTdIVC1jLWlmZzlXNXpfbDd6SWxELXo2anZDS2Z2QTlBelhCR2IwZjg2b2g5Ujc4Tk80aWprZEYxcHpOTFpvYmRObUhIV2JxeFlqX1FLVUpiQndPeTZHQjZpdEhySHBCNHJ4Ukg1RTREZnRUODFTQ3F6U2RHZVdObzBURkszQnBDRzZsS1R2MnRLdmZqNU5sdWZlWHZRVnBxeHNnb0FmRUlfNXo2LVZVZTl2MlRHNENfdGlPQkM3SkJTZ0ZDWXVxR2xhdUZsdkU4c1U2R0F3a0hUdlRja2xyb2ZiTUp0cThtOUd1SHh3azJZT1ZhbUZoOVU5TUEzNEJrX2hSUDc1bHRUX1VkR3BhTTlWOEpPbXNsMG8tUV9sU3RfRnpqUENGNWRQRW5PU19OX3N4VHZZTnJmckRKb2lvT0dUUXJ3SVlDMUQycHFSR0p1RGhVOHBuN1B1SlFEUEdDMnhDNnVBeWlsakVUSXdlYXZ2ZzRnNmVLSVJnY3BwX3h2TzVFREJCa0thZmlxY2d5cGRpZF9lZnd3U2I0dGNIQXdtYXk1c3E5SjhsUE1LN0JtcFA3c2M0VmZVZW4wTVR4YVY1Yk02djRjT051di1yUVhUbkNMQ1dfbUxqOTNnVGpGcEEwRzdpSGx1QVQ3S2pQNWFIUWtRWEtXVTV6QUFPNjVjb0l4bVVnR2o3UHl6TTYtbzFSN3VIV3l0Z1k1NmVscGJheVVULXotQnZnTmJyNzlUNm15RUpOZWFoT3c3RmhGdjNIOGRCb0FkVGZfdVVtM01vdkViUjdJMjJWWGdEVk54dnpFSlAzdEdrVjlDdUkzSmhJcFppNzJfcHZ4bjBiSy04VFlPeDJlTVV6aGZfWDJZaE00d0IzZmkwTjQ0V1ZHQTRKWnFrUEp1Q043NUhFWGJwbDJIZ0Y2YnNyVExNVFpPYjY4SzZELVh6dlRkbi16S2hPNzRuZUwyWTZTbjVaMGJyOXdZZFhEcjBaZVE5dzEza2lBU01fR3dBWlJxbU00LWJuM0s5bDNfeHZ6ZGdobjFsLXhvM2JfczhyWm8yMVhBa3VpVkZyV3pNeEVQTmNPSHlCR2JPR2kwbGt2d2FsUm9aUWdkQktQblNSQngwWVNaMkl1OE9OR0Y1amp0ZDluRXlTeVg1MVF1c2loLTZvYXE1YVc1bzRJVzVkbnBBbFdjTXpGX1FWd1pNc21tOVRsUEJCNi01d1UtcVFMS0xzTVFYa25ZMWVJWjZmc2RMT1RJNU5IWXo0TkQyVEFPRDdYbXVHT1VHNWpZYjJpRE03Q1l2eHpsRTRpX2ZWNGF1TmdnSWlhTG9EV081TW1iUXM0TElla0VzVmhZVzNoWndvOFZTZ043THVlckE2Q0otTWIxcllYbm9SaHM1b2JuLXVFbWlVOFRNZmxwVFk0VnktWnZpVS1mdXRNZjFPODIwbG1nNngzTzVWbEtFUjhEZzZ6UVFJczlBSHUxNGpqTHMwRU9zZW9hTWhqaFZ0QWZwWmFORXNmd0VPbk5pWnVXdWl6Yzh0NktnblN4OEZwYW5sVEN0M05hQWkzWkRZNEdPSGFsWVppRmNJanA0MndDWjdLU0hzbFFodVFiY0pBNm55QS1HWDNncmpZRThVT3NGeGNsT3JvTERnRnQ3V0VWYkU2QUdDaVlZSVpRV1dzVFp4eGZJOUR6QXJ0S2VxZzdVNU14d09DOEp3Yk1uSWpUeEpqRS04R1hfMjZkTjdlZS02TC15VXQ4dE01cWVZZnNLOUViVzBXUUh4SDZwUTNlSko2T0NrYnBIWXRWTG9Mb2pNbmwwNEdMWWpub1JnbE85TXZfV2RWWmtZTDQ3aDBlTklNVm52RnpYRlBhSzlxYjJETTFhcHRVWl8zQWRrbzJaaXBNNlo4elgtSUlYNEZLNzMyUUdGbS0yQzdhamFJeFVhOFA1NDRJYm04cjlGcDVjem9sWHhzS1JqUXptWWhWZWZRTVEyeF9ZOTh3bTNKbkZUR3pqOXRKdTBTVGMyUlRUMGpGNFVBX2RWamx5SzlpMEktaVRQZnB4cXVrMU9tT2s1WGpqSk83YlJfWVF5eVNQOXBuai1sb2UyRHRMSERLb1l6N0dISWZ6QmRfcWN1YUlxdHl4YWpNbjY5YkQtTy1aQmpWbmcyZU1hN195aGtrYnI2dVZvcmlUWWZEQ1BNZ3gwZmR0ZjdzVXFET1hobXhVUU9JZXBUcXVrTUxBVG02VkhLTW9TSEhYUGJ0UWd2bEN5MG9vU0pOTzVQRG0tOWNuMTFIa0FRM2xOdFF3MGwxVnBGNUV2MkNQSlRXYlpNVmp5WUZpdklwY05qTUMycjc5U1JUemJ1QnhwOFR1MmtyMWU4a2gtZmg4ckFfNGpRTllJT01Kc0xUZ1Z1UmFKeXdFMWV6YnFpT0p5czA3N2FUbWVyVEdZWUVnTkJPLXB1alFzWDV0LXlqamdyNU5qN3BBQmlyRHVUOXU0TW9IMEJQb3ZGc0M0NElna1g1dFNEbW84SUx4cGtuX094OGNEMkZWMW9renlmMTJkQW5SM0NrSHRBZTB5REppQjFqek5ZRUVJSzJ2aU9felAxbkFBak83SWluV3hXOU85c3JIOFJadVotOVVlc19ydURWLTE3SFhpYW9FUzA1RENCWUctVHJxR0pVeWp1QVB4UFp2XzdJTTBYMDdHZzNGbFRlREgwSWpFS2NsX0VwdzFZU2VRYk9yaDViM29IdXA3S0s0c3lmNGdkR3BTTlBQQlZpRlBvQk1MaGRteDliNkpRdFpxcE1jaUdYUnhCYVZCaE1hamdRejkxT290SUdsUUFELVBjWGdLcTlOZE5SVDFqaWtyU1BHLXo3VVUxU29nd2twQVNwak5NU0tfTmNUTElQeG1hZWx1SDE1eTRTQTJBTE9iR09yUzkwNXQ5Nnh0QVNocktseUJLUWxjUkZOem1OVHNvWHA5aVFrMTlwcW5WZlIzSkgwQ09VTTliSnVQamJDU2RQT2F6VGZvM29Cb09KeUpENzZTQm1jcERLVG1CdjlzOHcxYjJCbFlFUDh6eXNqTFJETjd4LWlmN1VneUxFWnI0YjNpQWJBbDVtcklQNzhqazA4akFTRzBFQi0zYmNwVW10eHlISmVJUm51TmJncER1d2Z5emstejVqcm9CYngzLU5DNzdyUHBkNEtnUDVTRVFDTmcwZFExNnN4Zk9KTHM1bFl5UEhPR1J1TEgwZURFczFtZUFHN3o2dzEwdjNqelBLZjZ2c2dOdW9GOTUtenRNVC16WXZFSXpnMzB1LWczMDhLbVpjVVdiRThfeHgwY3lxOGUyWEhnTzh5WldxcmJpRUdQSEJpOHFQR1M0bElLaE4xZkVsWW01bDBhdDdUTEpJemZ4d29UVFBXNmc2aDBfTDZDdjVORzVnaVBRZ3luX21rTEtGMk0way1WZ0F6WF9FdVc0VmlJVWZUSTN6MWpPWFFKNzFRVmJtX1J2dWRFT2FEeWJzU0RVaEZhdDA0ZDVLVkw0Y1ZFbHk5SURJeWZEMURmUzJEbDdYTHBOajNaTVpMLUZOMVV1cGhQa3pMOW9aZlVUT1ZqS2FBQWY4dzVFNm1QcTltR3VJWHkwS3d4U0xCVTBSajEtc3ZycndoOThhdWVVUVZKZXZaanhaZ0lQRjZNNGs3UGVFazYzUmJNRDVrc1BEaGpyVURnTmtzMGJEekN6bVJncTdiX19JZTVsU0FJclEyd05Pd1U0Q0huUUV2c25NLTd2QTBmQ3Z0d1NRX2M2Ykt2Zy1PNG43WjdyUGNyUWpWLU8yUHZHY3dTd0p4ZEVkN2VTRnI3WkM1VDRySEZmLUFoZm8tM2RLSUVnV2QtLU10RjFyZFJrRDlwQzluVUZPY0pEMzMxOXBmSWJ2cF9GY0Zfb0FwRXo4cEZfOEY4M1BBaUVTa0hlT2tDZzhwZVF2Nlg0UWFMdWNfcnptSDlwQ0NKSUJHZDlrMjJEY212eDUxNkJCTlBsdGxVdzZsSlVXYklXaFpCME9XcjhXM2RRblh0V3lmNWd5UXJiTGdRSGVrSTVXYkZONGx4YUF0dW1YQ2VfdnI2MHg3bkgxSEFIVlR3UzFrT1ZudmpvMXk0VFdCSFZoaEtSdzdpdWRMdGZXX21scFZQQlphZElpS3piZHp0T2prckxEY2FEaVhGNF9UX3pXQXd6eFliWUZjeUZ2dTNsd2VEQ0UzWkdaZncxOFRFYVNQTVFPMzFpTk15aUNCZ0RoRFZkbVV4RmZVbGljaGZsZVdsSVQ0d2xjMy1mbkx5blMxcWdVdEt5VGlmajhoNEJVa2ZQMzlXdUh1TmhzZW1Tc1Q0dmRBYm1kSDM1Zk5RaUlOYXVDVEszR3JGVndCN3RpS0Q1M0drS0VLUTRqMVlOTDVfbkU2NDFJalNZSGxkLXdlRUZNVXhkR0hBVEJaUnY4UFBTVlJWOFJCcHpJSDNLUUpGQ0ZKaHVJYkxlY1pqSm92cHZFUzdxaXVDSEdzRWlfcWJYcGE2dnE2X2sxdkkwaGQ1QS0tckQ5Uy1RVFR3NkNZZUtBUldJMWRTY0hIeHFBd21jR3BJbUdPUk53akUyN0h2NFp1MUwyMUM3c0VrNXlUb25LXzVXU2t0MVhOWDNDa3h6OWVLUmJJNjhEdVVXN3Vsd0MwcFFFcnRTZ2pKYzIxYTFsUGhoWkxiOHpRdVNKVzBaOXJ1OC1fRkxSRGlTbHpnMmJRS2V0QmZaSFo1VV91MHJ2dFRaeC1NMVR1Q2NFU29DdmpTdUR5TjFLQ0ViNExZVmRDekRVNGhlazJBU0pRSDFsMDZBcVlFaDkxdndBaVBGSlZZNV9PUEF3enJKZy14dENYTk1IaTc3WU9SNG9EMTdBMW00RkVQQTRNWXFjYVFCOXh1Q29iaWo2NlV2RTNmRUZHem1xOEZHV1l1RWhLVWxzRnBLUWRpLU1JS1RtUnZEMk5iYWpCM0Jmd1ZYRktvNDJ1X0JPZG1ON0FxUXc3OUdySmtBeUNoVU5fUFlkZUtyWFR2NmNvTlB0R0piY2xKWVMxRUhrak1ra3hhVjA3ODJ5enU3NDNUcmY1NUlyY214N0ZTRV9YVC14UHRzdUVvQlF6RDM1OG1Tc3FhSldyZDZOalJ4UXh2c05NNGd6Q1V2c0tLbGRqQkl5XzlOTDNJb1pBM05rY3hKdUJ4dEJKSURmTDZaNndhalVRYUtGWExDT1ZwMXNkcXFtS1ZzdEE4cUVvOFQtV01adExheElGd1FaWHFPS0hfTVNGQWtxaFJ1X0k3SXhEYmM5eEdpenBMUnV0UjQzbEh5eFUwXzFpUHZyQklhRi10dXdiOW01am52SkxqeUNPQnNWM0hrLXotQTRwWHlPYUlQUmJfLVdFekR3cFNZZTgxVDRMaUFFVlduUEdUaXpfUnpqNVpxWm83TS5vclhvZXluZXNGbnZuLU9SS2cySjNB"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/8ceaca8797e24ee4a6b86924ff79a88a - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a322faae-116e-4941-9428-4c8501325e69',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:11:52 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '744dcd7a-b271-44c9-a06d-f642c48a1e97',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:03 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '771aabef-adc5-4d6e-96e4-587a6f544400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:04 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnAxQmlFbWZaYmhOQWk0bGFxM2Z0V2l4anltWVNSYWZSdTJTU3hlV0VieDlxZWxiTkNpMU5BVTJQUUtSdjZOenhQOVp2Yl9NbnF2OWczREpEd21HSGdaYVlCMGxGbWh3TDJ6Sk5sZTNFbkdVUUpLQjlaa0M5XzY2NmZKSHZBb0ZTMS1xc3ZrcVktZmt5ME9tN2VHWG5YNWNlYU55VUlsMUgwLVVVaDg3QmJSZ1NUMlJGN2RBWlltbUhXTHZjcUZ5eXEtVHkwaHYzek1rRFR2YzI2T1JTd0FrQncwQnE4ZnlvWWM5WmNWYk5yNXktM0ZmUF8zd2FYLW1vNnZrQlpqanJ2TncwS3NIN2dmVU5SNU5UZl95b3VXVVF5eVA1Y29hWnFyT19MSVJkRVFuWEF6dFVuTmFyQkRHT1NMWjAzMklMZ3VyVTNMV3llRVFTMmFJcGRMalNtQS53Zm8zLWJpcWQ1SVM3WU51NXBYNGRBLjZRdlUwOTZTTUd4TDllbjRzM2tPeWt2QnplalY4d0tOVk1ZNkJORVV0cmVfUTZnMkVyMmxCQ2NleXRfQXJVWHp0YkZPcE1rRVFLQ2hJdk5XcXhKb0xLN0JMWHJYZW9hRHh5V0g2SHJlejdvQzZrV1JQMlVqVkxBalIxVldKa3U3VnVEYmtmQ0steS1tc3duc3NpRW56S2FpVHNwYm5rWGJCb2E0RDFNVnY1Qk1LVHFyeVNzRzBVVE9jV21FdzZRRF96M0VQS1pHcVNqM1hJSmxBYU1OeThGX0ZrMG1DTUR1cTR4OWc4WjVCQldPdnJBdXpvekUxTmZmOUlNRlhuYnNPYmRWZk4wYUsteldpMy16UHRXMzlmbXRUVlloWVR2cTdOUkFjeVVyeUg1TVliVUFJZ25nei1xb1FRQnROWEJ3RmtfWm9kYVk2Q0VlTTE1ZkhnZE5fQkRPaE1GQUlRVGNURWZPVDVqSkdXLUZqUnVBY1JmUG1pbmtlVGpSeTRBaG9DY0lCYkd0UzYyX25jNkU0V3NNbjVsVVBMeS12RENJN2dVSS1vb3dwVzF0SkgtbHdSYzA4TWJJTVlJYzVUREtXWmt2blhIZ2ZBbG84bVpMeExzcFJ3NGd1Vm5SUjdDSm9adjFJZjNhamdxZTZmM3BWXzBqWm8xQTRzQUlRYWxXNzNiemJfVlZGS0hpNFpiVUpwRW1rOGhxX3duLVhDOXZmY0R5ZTdYYUhXRHEta2U5MEg3WV9ZZER2WmVtcUNqMEpRcEtVdURON2xubF9kRDlybWZVaElvOTFhdExVbHgxVjBlMDItdTI2Y2hWVHpMcW5uckZ6cmlRcGRTZWZDSkNQNHg2RkctTkZVTlMtYlJrY0JHNWFPbmd6VS1YRjNnMkN0eXJyS18yUUo1N1VpZW9zVlczLWdtWmtaOVc4UGhHSC1Ubm91bnZvMkVxd1A1cGZmMzdlSFU3aFVjWmQ4b3JDaFhhdDRUd1FRc3NmSkp2UVhZRkdNQVNhNHZzMzJKdzRCcGdaY1ZBWW14UU9CVHBleGVCVml5TlZnZ1Y2S2VqdlRncWdkQTZoZVdtTGR6TnpTZjFxaXdxX0twYnp1QjRzQlJUOGdvWEhhbXE2V3gyM21xQXNSR01IMWxLYWd1SVZtY2dlNGRrM3NqM25zOWlFdnphaEJSaUNaZHZhUU5tWl9ZSkU0RGdLb09mSVlXclRKenpVSmJJSi02UDZZdzV6MVlzOGVMQldrYWx3TTdhWmdRT1RBelB1UElJSUIyRFNwOWVPVHFRZGxEWHczWk9GNFBBbW1iZUdpeF9CMVh1X3hQU1F0V3Z4LXNaWG1mZ2RvaDdoYlFfUDNCdldwQkx4NC1VYjhtUjg1aUJGelBrR3BVSlpTbkFSVFF1OEJfamU3SVQ2V0lFUUowb2J4dV95QUwxQ2lfeTVCbHBaNjRqcVk1NUhPS2ZleXp0R3UxMkVvOHpyQnhkTGUteUtYVnNIa3hONXZwcXk2d3F3S0JyVUxYY0wxNE93R2hOZUY5OHRkRm5WV2o5M2xfbkpqSi0zd0s5RXV0Q2hWRDNnYlFoT2dUS1llRS1ISEw4dDBoQTJCWktRZ01FSGRsZWRHT0pOQ0VpMTlEZkp0dXdxQTl4OEZPZDJNSUplckNUSWhDT3c2SWtRTzBmaWNrZHRGM0xURF9HejVRWmFwU19qQS1HWGVCMFMtekdvdjluTFlEWTdnSDVPWnljdk1rdGR4Qk14TVN5WjdVZlNDQW5BR3FRMjJTQmIzOWpubk5waGdWZ3pSUzJoYXo4eFFGaHRCaXRMQW9RN185TkM1RlhRMENOOXVVNENLd3ZwY3VqRzF3eWFCSGpyYmQ0YnBvRmpoMzByZTE1NFJ0WGl6VHhDd1RfN2hlRU5JVG5uQUVwR2JhZmFjbHdxbkl4VnppQnJkQkRQM3ZLVjJZVDRwa0lXRUNyMlZ1bHVXVTNmZ1pRalNVNkJ0bkJDaVFDNXJCME5SeF9iQlpoOGZqaC1zcUtPbzJCWkk3TC16dGJ2TlVxY18zWjdNM2ZJdXJ4X0xva0l1UHhNeEtHQjZMdXN5M2lNdzRDR3dOaHhwaWtxa1NGekhnOExkT01mNFByQ3B2ZFJ1QnJNSTN1cXlnNFdzUHZGZGNQcDBWQ1g3SVhUcXVSVGpITjN5ZWRSaDBmQWNjQmttd3ZTV3dFOF9UNWZkZUotdE1XLTZiT3V0NDVvS1RpT3pyWHNDMWttd2JRMmhUR2FhZFM2a2VLanA3WmNQZ2dzN3lvRENDdUNIbWFiaUdmSU01VXNzRUoyM2FNS1BFZHFRSHlwZTJVaW1tODB0UUVOVS0xVHp5bmZGbXFiMEhCbzR0OWFCdUJXLUhyWHlVc0hQR01sbDAwYlpFZFI0bmpRUGVYeTR3WnN2eUx2RmVIY1JlVjRxQzdwYjg5RkU1ZUI2bGFnb2JGV2MxYXVHbXh5ME1wU0hxMVpqZF9MLVZ3OWlfcDZOLWMxY1pQOVZ5aFdvbHhXMkN5bjdNcEFmMUx4ekFsZDgtM3hDOHIwTkI5SG5TV082V1h6cjBOQU8xUmlnUTU5TnhGdDZqU08wM1Q2UTBTbkJYM0VjYURGZUJLbUUtVjdUQ3BweURQbk1XMWlZZ1MtREtQMGJpVERMSnhnaDZxUXhUYWxzMmtaOWNoWUdrV3BBTFpRUHJFTHI5TkxERnRPUTRWNm9UUGxnek5qOFlUNVQ2ckZWWTJKU3NhZjJleHlHZ3JyVXRtUjRMUl9ZRDRNT0dFcmV2cENOakI0R2tHbHpNVzdtZlNIUTlISk1WMHhpVUpMbGFXOUR6dnROZ0J5RENPOUNpVFJpU3BqTjhJbHBzekdSY2VxWlpHTTZvUUZjcU92M29jZ2I3V0prakFMZUd4bnBaejVHbThUUmhGRXJqYXpvZ2ZIYzBGN1loRUxaZ3hWaF9MNk14T09jVUNsOG9hblFPQ3ZtTURkek5XU0d0OENSeFFRcmJ0c2hFcUloNG4xdlpxemNHa0tJWmt0YjUyQWxZeENGejI2YWYtdjFuekRndUp1cVQ3bnhySE5SLWd2YklKRmU0LXg5MEhiOXRnVGpNV3ktclN5VWRfN3V0bGZyZ1NMNEloelBMMkdEZTJKZUpXTXluS2FSb25pTzVXNkYzWVVlTFVtQWhHdnYyU3BEUERIS25OSXM1akY5VGk2V1JSYVZkS3otMnkzdk91WVZsakxxMnl2Y2x6QzI3Y2lYeXpRNkwxWXkzUmtYUy13UjMtejdXU3hCaDY3RTh2TzNHTjJUcVFwLXpkeTdpR01aRWMxOEdnTnNlYzk0T2Z3X1FfOVgxcGIwdnZINkEtV05IX25qNGIzeXZRQXB1dm1sV0RSdGU1YW5zWTdLcHp4eVE5N05SOC1HWDM3aUJvcFJFendCX0ViYkFIQzFEUVFaLTVQTTZRRlBaNUZvWk1hZXJpQzRCVlU4U0hVTkJwVjZpMEd4QXZYOFF5Tm15VGF6Ynd0VnlUclhLd0tRZEM3MHU5ajlWUUZQM3JBY3lUQndVbk8wM3d3b0NUcDJfYmxjLXZka2ozSGU0eXVkMXdTT3l4SDA1OHhqcnhuRUppMG5sRU9MbzhzYm5wTllUYjNPSWw1ZWlQNU1xcFlPbzZ5dG5MSkZ2emZvZHZUd2JQRmFuSE1SWUV3cm5hWG5Bb3ZwNTFyS1c4a3BtdzdPZGg0LWJEdzBRcjlOSTZVY21Cd0hUbXpZOTg3eklVNmFDZDRQc1JQbnVGeFp5YTFGb3ZabWpCUTg2cHBYM1NEaUZ6Qzg5UldocjVXdjhiWG9mZENtNXZMU0RPZmQ0Q2VtbGVxMTN5cXp3S0UwUU9TVEszMktsa3JraVNkSjA0eTdYb1VHaWlkaW9SWDRZLVRVYVNZTVptSjd5SVBkWnpxeTZwNWsxckJ6d3VmYUotVXlyVFNTWXVDNVRxM29XZnRGaEV5YUNjUTQ1ZWpEQ3ZFc3NWMmt4TW9XVFM2Nmw4NGZVeXIwZkVPOWJHQ2lxOTNLWG1ZYlpHWjhrc0pIRlhWQ0dMY3BPd2kyYm5nTEtlV3JsSUZlUmd1UXIyemNLVFdwa0lHQWpXdm9hOHJXdGhYaGlwMTAtSThQdW9aUzM2UlpLUlRLRy10TndWWDhWdGNvcGhMb01KWjBBS2t2X3lQMVNXTmxhRnJmZGpnNUYweEY0WHJCbEFaX0lIdlNwa1hURERzVmdQNFNDZDE2V0ZUUDMwRVpZR29jQ29zVlJIUWVaZ0NlZk9OQnE3QWR6Qy1iVXU2VThfNlJqX1AwWXp5aDJKNi1EM3h5ZE9QUTJ1UGh0V0Ytd3VQUjhqaEpHQ2JzRG5HT3VsMGFtaHJjd1V2V01Ra2dzMlEzWThTeWR0dk8tWXcxa0xrVnU1VVBTM0RBVksyRWR6WkdiSURHYjY2SnRXVElDanVzeVBOUUFBdEJKdE9ya2cyRjhDYjhqblAzQkhxbkZSVU9kT1otcUNVU2JUZExGd0tHWTFud1dnYzF0OFJnU1JEOW91U3dBUVR4aG9GZl9vVVpSYndjS2RfQVd5UjdMZGVjQXZqNjhFTDlCakFrWk1ZclM2VEpNbnBjWHNsRXVla3dGbGgyNFJ2ZC13ZWxUZmhpZy1HcjA4UW1zbzFtbEZsVEhYU1ZQdW9PVFpnT2VLWDBPWW5sR2ViMXlpck5VSFFjYVFZcHZ3X0VLV2Q2THhsVmJUSVFLbklUV3BTX1VTODdEVWJwem9CWDNsZWJPQjRXUXQ5SnNYUHJHX09FdlQ1Sm52eUpDZVJNMXgxRjVYUHk5UFRoNDZUWllndXptRGV1ZGpRVVlRMnh0NF91TkNrRGVLMW9mZllfVURNOGVBXzFXVDRJN0tjNUF5My1qRU1YbHJKMC10bzljY19ieVd4QWZpajhvdXR4ODYtMlJFRklkSUNYTENmZW5RVWdoeDhTUEgzVWlDdUJBMFdDWWZzUmJxTXEyVloyMjRCVTdraVhzUU5EZXdjdnFPd0gtN1RxWHVhcDdzUm1teXpMTC1BRG5KeV93VkdBZlN3dElfUW52d1piOFJJaWdEenpwUzNxVFRTZzAxOFJZV0ZyNHhmWUlrcDlVMnlWN0V5OGNjb1BNWHBYb1Q4X2tBQlA0TzlpMHZXU2xjNGd1b2x2d2tVZ3VSdmZJWUxhTWR1TURqMkR3R3BhT29EV1RSM2p4QzJxWFpyZUIzaU9vbTgxNXBiYmo1dkl4NUFtQUFJaE5hUWNBWXV5MTR6M0UzV01RYmRYdldFNFdXV1M5blcxRUFmcW1icXc1YkE1NFdqa1NTOEQ2dktpdFZvMUJBYTNtTTA5LV8ycFlHSERSTVJ5bktna0dJVUg4MEhWLWdwYkpTbWw4Ulk5bWNBWnloZEl0ZDI1dE5HWDJTU25RM3JqR1hRN2tHTFoxX3NheFJuLWNYZHhvaVFZVUtWc0dRQk55aWdScUNPb1ViaTJhZGM0aVdsTTJNQmZSSlFDS3JVbGFXNG5peU1iMloxbnplcWJwTFVWc1k3b0VoMTJONEZHd1M4dUQ5aHE0Nm9RMUFGT0JMelRQU1ZNRGt2cnJXaUx1TmgzNlpRZ3NQMXViUDkwZU5fTHJzcTJLalIzU3F1MDMwWml0NWR5ZFFjTzBBV1N4OW53Q2g1UU83VE1MOGRNV1pONmdWQWhLcEFPWTh0QktwZ3R1MEJleVpaYmJYUy05RjF6ZDlnSWRoNGFLWndzVDBTcUlCbnFHS1B1eXhFMWp3UUtMcVlKcXkwaFNnMzJzZzNOMjg0dmlTSnJwNHZJVHFlLXMzX3hoX3haZ2VmRGNRYXc4dWFPWDQxMTlyYmxUMGdrNzQ4YlpaVGU5WG9idGhDclJfZFI1Z0VFNnBBNDI0bFVjRTR0c1pxMkg2UTBRak5Qd1FVTk1MZ05PWFZQdTRJakVrSnNBSVd5S0NFQTYySTJPVnlSd3E1VExrMEVQLVRLejRLZFMtZ01ubTFnMTZVUV9VdUhjcGlkSWlWaXBNOHJlLTFScFFrT2N6N0JjZXlXXzlsc0lLTEpaN3dZc2dHLWNnRlVMaWpoUWRMa1dhbmhma3Fkdm5ldnd2MzUwZXRnck0xRUxZUVZ3N1Fsa2pVd1JNcDBvUWlkVGVTVmpEQ2E5UjVDNU5GSEllYVh5LUcwY0lKQXRwUW1jVEhQN19UT3VwQnhQSXNGUE5qcHJvekVhakpTOWxydnA1UnpibUZVNGJmRWloWFdhVFd0T2tKZW9WSVo1UzRTN2tBR1pMTkJPbmJmTTZDVXZHMWxlT29HakVRUFl5Vi1IVEZqZUt3US1ST0RqMnY4YUFvZjVTTU5GV3d4VHg2RmZFWHdKNEZIWjRSMmg5b1BCMnNPR01vUFZCYlA5cjAzNWdWT1dkeENNNVdhSWU0QmRqVWdCZTdtOF9Ga3c4MDRLeFlFNGRkc0NTMWJ0aUhQU3ZUbjB5N0s2bEV4TlRwTm9SZDBHTDdwVk51VmxxZjlXMi1VSWo0cFQ4VEYtd1NEWk0xanhDd3A2S2NUTXBrdHRhMVR3MVc0enl1VzNBODBoY1NpZ1VZQldxbVJ4MUNsMnoyYUd3alZBdExLS3U5UmFTRTZhcENrTDZ5eTVkeG1nMkp3eUdfY0IwSWU4ZW5QcHAtdWEtX1RGT010WVZOTVFLTW1SWFliODNVTmFWU054dGUwNVZBbERQZEY2UWV5MlE1ejRRbWZ2TkNneXYzbF9UY0pVemx3SHpTd0IxVHAtUHFNMl9LOEFJVkVQU1loWndoMS1oRmthRHI2aXlSbGdEVGR4dVBXaW9DTk1jcWR2NnlUNFFuNTRDRDYtWjVjUXhDLXM1bGdmRWR4UmtoRGxSMTF5N1FrZGFYOHN3MTVRRDAtcy04UTJnUUV0SGxhSkk5YUdYWm9HVEZCSVd0NXIzUjN0NjhaX01PV04tYUtoc3lEaWpFRXhGU0lsVUlmQmcwejI2ME5DYkt3SjZuMFFRRmNSZHNKdDdlVGM0RzJVeUJLOUJvRk82V0kwUzNkY1J5RV9oM09kaFduMEgtX0VFSWNKNDFEWUhTUXBNc0hmRV9EdFdqTVJlbWFuOHBJTXdSTnN3OFNEVXZERDBQel96bUxGalZ0Z3ZEbFh6dDRILVRlZ2UyX3hBTXVleDlmaU14dWFUMGF2LXVRSlc3M1YtLW9IQUlfWmpwSk94MHlZck9JR05qbHlRQjc5cVdGemZ6UmJHUjRTTUtwenRXNmg4b0d6cS1ta19QMGs0SXVsb1QxdXB0QW5sU0FNU0VOYzVVZTdHVHhSaDZMNE5reF9ESVpleFFuRllWOXFBXzFMd3ZiN2lJcDQ5YzEyVllqZm5TTjJlZENUZnpUeTdIVC1jLWlmZzlXNXpfbDd6SWxELXo2anZDS2Z2QTlBelhCR2IwZjg2b2g5Ujc4Tk80aWprZEYxcHpOTFpvYmRObUhIV2JxeFlqX1FLVUpiQndPeTZHQjZpdEhySHBCNHJ4Ukg1RTREZnRUODFTQ3F6U2RHZVdObzBURkszQnBDRzZsS1R2MnRLdmZqNU5sdWZlWHZRVnBxeHNnb0FmRUlfNXo2LVZVZTl2MlRHNENfdGlPQkM3SkJTZ0ZDWXVxR2xhdUZsdkU4c1U2R0F3a0hUdlRja2xyb2ZiTUp0cThtOUd1SHh3azJZT1ZhbUZoOVU5TUEzNEJrX2hSUDc1bHRUX1VkR3BhTTlWOEpPbXNsMG8tUV9sU3RfRnpqUENGNWRQRW5PU19OX3N4VHZZTnJmckRKb2lvT0dUUXJ3SVlDMUQycHFSR0p1RGhVOHBuN1B1SlFEUEdDMnhDNnVBeWlsakVUSXdlYXZ2ZzRnNmVLSVJnY3BwX3h2TzVFREJCa0thZmlxY2d5cGRpZF9lZnd3U2I0dGNIQXdtYXk1c3E5SjhsUE1LN0JtcFA3c2M0VmZVZW4wTVR4YVY1Yk02djRjT051di1yUVhUbkNMQ1dfbUxqOTNnVGpGcEEwRzdpSGx1QVQ3S2pQNWFIUWtRWEtXVTV6QUFPNjVjb0l4bVVnR2o3UHl6TTYtbzFSN3VIV3l0Z1k1NmVscGJheVVULXotQnZnTmJyNzlUNm15RUpOZWFoT3c3RmhGdjNIOGRCb0FkVGZfdVVtM01vdkViUjdJMjJWWGdEVk54dnpFSlAzdEdrVjlDdUkzSmhJcFppNzJfcHZ4bjBiSy04VFlPeDJlTVV6aGZfWDJZaE00d0IzZmkwTjQ0V1ZHQTRKWnFrUEp1Q043NUhFWGJwbDJIZ0Y2YnNyVExNVFpPYjY4SzZELVh6dlRkbi16S2hPNzRuZUwyWTZTbjVaMGJyOXdZZFhEcjBaZVE5dzEza2lBU01fR3dBWlJxbU00LWJuM0s5bDNfeHZ6ZGdobjFsLXhvM2JfczhyWm8yMVhBa3VpVkZyV3pNeEVQTmNPSHlCR2JPR2kwbGt2d2FsUm9aUWdkQktQblNSQngwWVNaMkl1OE9OR0Y1amp0ZDluRXlTeVg1MVF1c2loLTZvYXE1YVc1bzRJVzVkbnBBbFdjTXpGX1FWd1pNc21tOVRsUEJCNi01d1UtcVFMS0xzTVFYa25ZMWVJWjZmc2RMT1RJNU5IWXo0TkQyVEFPRDdYbXVHT1VHNWpZYjJpRE03Q1l2eHpsRTRpX2ZWNGF1TmdnSWlhTG9EV081TW1iUXM0TElla0VzVmhZVzNoWndvOFZTZ043THVlckE2Q0otTWIxcllYbm9SaHM1b2JuLXVFbWlVOFRNZmxwVFk0VnktWnZpVS1mdXRNZjFPODIwbG1nNngzTzVWbEtFUjhEZzZ6UVFJczlBSHUxNGpqTHMwRU9zZW9hTWhqaFZ0QWZwWmFORXNmd0VPbk5pWnVXdWl6Yzh0NktnblN4OEZwYW5sVEN0M05hQWkzWkRZNEdPSGFsWVppRmNJanA0MndDWjdLU0hzbFFodVFiY0pBNm55QS1HWDNncmpZRThVT3NGeGNsT3JvTERnRnQ3V0VWYkU2QUdDaVlZSVpRV1dzVFp4eGZJOUR6QXJ0S2VxZzdVNU14d09DOEp3Yk1uSWpUeEpqRS04R1hfMjZkTjdlZS02TC15VXQ4dE01cWVZZnNLOUViVzBXUUh4SDZwUTNlSko2T0NrYnBIWXRWTG9Mb2pNbmwwNEdMWWpub1JnbE85TXZfV2RWWmtZTDQ3aDBlTklNVm52RnpYRlBhSzlxYjJETTFhcHRVWl8zQWRrbzJaaXBNNlo4elgtSUlYNEZLNzMyUUdGbS0yQzdhamFJeFVhOFA1NDRJYm04cjlGcDVjem9sWHhzS1JqUXptWWhWZWZRTVEyeF9ZOTh3bTNKbkZUR3pqOXRKdTBTVGMyUlRUMGpGNFVBX2RWamx5SzlpMEktaVRQZnB4cXVrMU9tT2s1WGpqSk83YlJfWVF5eVNQOXBuai1sb2UyRHRMSERLb1l6N0dISWZ6QmRfcWN1YUlxdHl4YWpNbjY5YkQtTy1aQmpWbmcyZU1hN195aGtrYnI2dVZvcmlUWWZEQ1BNZ3gwZmR0ZjdzVXFET1hobXhVUU9JZXBUcXVrTUxBVG02VkhLTW9TSEhYUGJ0UWd2bEN5MG9vU0pOTzVQRG0tOWNuMTFIa0FRM2xOdFF3MGwxVnBGNUV2MkNQSlRXYlpNVmp5WUZpdklwY05qTUMycjc5U1JUemJ1QnhwOFR1MmtyMWU4a2gtZmg4ckFfNGpRTllJT01Kc0xUZ1Z1UmFKeXdFMWV6YnFpT0p5czA3N2FUbWVyVEdZWUVnTkJPLXB1alFzWDV0LXlqamdyNU5qN3BBQmlyRHVUOXU0TW9IMEJQb3ZGc0M0NElna1g1dFNEbW84SUx4cGtuX094OGNEMkZWMW9renlmMTJkQW5SM0NrSHRBZTB5REppQjFqek5ZRUVJSzJ2aU9felAxbkFBak83SWluV3hXOU85c3JIOFJadVotOVVlc19ydURWLTE3SFhpYW9FUzA1RENCWUctVHJxR0pVeWp1QVB4UFp2XzdJTTBYMDdHZzNGbFRlREgwSWpFS2NsX0VwdzFZU2VRYk9yaDViM29IdXA3S0s0c3lmNGdkR3BTTlBQQlZpRlBvQk1MaGRteDliNkpRdFpxcE1jaUdYUnhCYVZCaE1hamdRejkxT290SUdsUUFELVBjWGdLcTlOZE5SVDFqaWtyU1BHLXo3VVUxU29nd2twQVNwak5NU0tfTmNUTElQeG1hZWx1SDE1eTRTQTJBTE9iR09yUzkwNXQ5Nnh0QVNocktseUJLUWxjUkZOem1OVHNvWHA5aVFrMTlwcW5WZlIzSkgwQ09VTTliSnVQamJDU2RQT2F6VGZvM29Cb09KeUpENzZTQm1jcERLVG1CdjlzOHcxYjJCbFlFUDh6eXNqTFJETjd4LWlmN1VneUxFWnI0YjNpQWJBbDVtcklQNzhqazA4akFTRzBFQi0zYmNwVW10eHlISmVJUm51TmJncER1d2Z5emstejVqcm9CYngzLU5DNzdyUHBkNEtnUDVTRVFDTmcwZFExNnN4Zk9KTHM1bFl5UEhPR1J1TEgwZURFczFtZUFHN3o2dzEwdjNqelBLZjZ2c2dOdW9GOTUtenRNVC16WXZFSXpnMzB1LWczMDhLbVpjVVdiRThfeHgwY3lxOGUyWEhnTzh5WldxcmJpRUdQSEJpOHFQR1M0bElLaE4xZkVsWW01bDBhdDdUTEpJemZ4d29UVFBXNmc2aDBfTDZDdjVORzVnaVBRZ3luX21rTEtGMk0way1WZ0F6WF9FdVc0VmlJVWZUSTN6MWpPWFFKNzFRVmJtX1J2dWRFT2FEeWJzU0RVaEZhdDA0ZDVLVkw0Y1ZFbHk5SURJeWZEMURmUzJEbDdYTHBOajNaTVpMLUZOMVV1cGhQa3pMOW9aZlVUT1ZqS2FBQWY4dzVFNm1QcTltR3VJWHkwS3d4U0xCVTBSajEtc3ZycndoOThhdWVVUVZKZXZaanhaZ0lQRjZNNGs3UGVFazYzUmJNRDVrc1BEaGpyVURnTmtzMGJEekN6bVJncTdiX19JZTVsU0FJclEyd05Pd1U0Q0huUUV2c25NLTd2QTBmQ3Z0d1NRX2M2Ykt2Zy1PNG43WjdyUGNyUWpWLU8yUHZHY3dTd0p4ZEVkN2VTRnI3WkM1VDRySEZmLUFoZm8tM2RLSUVnV2QtLU10RjFyZFJrRDlwQzluVUZPY0pEMzMxOXBmSWJ2cF9GY0Zfb0FwRXo4cEZfOEY4M1BBaUVTa0hlT2tDZzhwZVF2Nlg0UWFMdWNfcnptSDlwQ0NKSUJHZDlrMjJEY212eDUxNkJCTlBsdGxVdzZsSlVXYklXaFpCME9XcjhXM2RRblh0V3lmNWd5UXJiTGdRSGVrSTVXYkZONGx4YUF0dW1YQ2VfdnI2MHg3bkgxSEFIVlR3UzFrT1ZudmpvMXk0VFdCSFZoaEtSdzdpdWRMdGZXX21scFZQQlphZElpS3piZHp0T2prckxEY2FEaVhGNF9UX3pXQXd6eFliWUZjeUZ2dTNsd2VEQ0UzWkdaZncxOFRFYVNQTVFPMzFpTk15aUNCZ0RoRFZkbVV4RmZVbGljaGZsZVdsSVQ0d2xjMy1mbkx5blMxcWdVdEt5VGlmajhoNEJVa2ZQMzlXdUh1TmhzZW1Tc1Q0dmRBYm1kSDM1Zk5RaUlOYXVDVEszR3JGVndCN3RpS0Q1M0drS0VLUTRqMVlOTDVfbkU2NDFJalNZSGxkLXdlRUZNVXhkR0hBVEJaUnY4UFBTVlJWOFJCcHpJSDNLUUpGQ0ZKaHVJYkxlY1pqSm92cHZFUzdxaXVDSEdzRWlfcWJYcGE2dnE2X2sxdkkwaGQ1QS0tckQ5Uy1RVFR3NkNZZUtBUldJMWRTY0hIeHFBd21jR3BJbUdPUk53akUyN0h2NFp1MUwyMUM3c0VrNXlUb25LXzVXU2t0MVhOWDNDa3h6OWVLUmJJNjhEdVVXN3Vsd0MwcFFFcnRTZ2pKYzIxYTFsUGhoWkxiOHpRdVNKVzBaOXJ1OC1fRkxSRGlTbHpnMmJRS2V0QmZaSFo1VV91MHJ2dFRaeC1NMVR1Q2NFU29DdmpTdUR5TjFLQ0ViNExZVmRDekRVNGhlazJBU0pRSDFsMDZBcVlFaDkxdndBaVBGSlZZNV9PUEF3enJKZy14dENYTk1IaTc3WU9SNG9EMTdBMW00RkVQQTRNWXFjYVFCOXh1Q29iaWo2NlV2RTNmRUZHem1xOEZHV1l1RWhLVWxzRnBLUWRpLU1JS1RtUnZEMk5iYWpCM0Jmd1ZYRktvNDJ1X0JPZG1ON0FxUXc3OUdySmtBeUNoVU5fUFlkZUtyWFR2NmNvTlB0R0piY2xKWVMxRUhrak1ra3hhVjA3ODJ5enU3NDNUcmY1NUlyY214N0ZTRV9YVC14UHRzdUVvQlF6RDM1OG1Tc3FhSldyZDZOalJ4UXh2c05NNGd6Q1V2c0tLbGRqQkl5XzlOTDNJb1pBM05rY3hKdUJ4dEJKSURmTDZaNndhalVRYUtGWExDT1ZwMXNkcXFtS1ZzdEE4cUVvOFQtV01adExheElGd1FaWHFPS0hfTVNGQWtxaFJ1X0k3SXhEYmM5eEdpenBMUnV0UjQzbEh5eFUwXzFpUHZyQklhRi10dXdiOW01am52SkxqeUNPQnNWM0hrLXotQTRwWHlPYUlQUmJfLVdFekR3cFNZZTgxVDRMaUFFVlduUEdUaXpfUnpqNVpxWm83TS5vclhvZXluZXNGbnZuLU9SS2cySjNB"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/8ceaca8797e24ee4a6b86924ff79a88a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ou1lQsCDRArNkoCL1RBQq6bYBaGZSuBFDyi-vdG_tpm_pf-x-oxkrLvCSUU5VIAW8w7z2snDLr3RbYFP11YTtIR20T4KfsSDQSVEsnYLOYT9nwhof_V2BX-EGrmuPVspDrbfaGYWOZGr4ValT6IJMLosAGHOdzyqG2E898UKQ2aRRTUbSTKJDcLrkeT7cLnsiC2spWVJwgDAR0nGlOAcCwySLALtcQHmYPkTCfRIIUo2i5FZx2XR6mbS3urBVFRvoBNbkXBz_d3AEDE9wIqHRhxqFYnpGct5Mf7yfm2CShHbdI51UgIAzXPcswNijSRWUmxMrFbj1Hg4B5ZZo6pYvw","e":"AQAB"},"attributes":{"enabled":true,"created":1568661087,"updated":1568661087,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '461541da-9ba9-4436-a814-64c96fec582a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '716'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b33508fa-52f6-41f6-93cf-af16659b7a7f',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:06 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '91e32c98-0bc4-4c27-9e03-af657cd94200',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:07 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/8ceaca8797e24ee4a6b86924ff79a88a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ou1lQsCDRArNkoCL1RBQq6bYBaGZSuBFDyi-vdG_tpm_pf-x-oxkrLvCSUU5VIAW8w7z2snDLr3RbYFP11YTtIR20T4KfsSDQSVEsnYLOYT9nwhof_V2BX-EGrmuPVspDrbfaGYWOZGr4ValT6IJMLosAGHOdzyqG2E898UKQ2aRRTUbSTKJDcLrkeT7cLnsiC2spWVJwgDAR0nGlOAcCwySLALtcQHmYPkTCfRIIUo2i5FZx2XR6mbS3urBVFRvoBNbkXBz_d3AEDE9wIqHRhxqFYnpGct5Mf7yfm2CShHbdI51UgIAzXPcswNijSRWUmxMrFbj1Hg4B5ZZo6pYvw","e":"AQAB"},"attributes":{"enabled":true,"created":1568661087,"updated":1568661087,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '11b8e401-9ddb-4ee1-8420-ec6b3a471904',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '716'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '52ae54a0-402e-4573-841d-9df6714da9f2',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:09 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '32dd0d4d-db43-4655-ad2d-449276484400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:10 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1568661131,"scheduledPurgeDate":1576437131,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/8ceaca8797e24ee4a6b86924ff79a88a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ou1lQsCDRArNkoCL1RBQq6bYBaGZSuBFDyi-vdG_tpm_pf-x-oxkrLvCSUU5VIAW8w7z2snDLr3RbYFP11YTtIR20T4KfsSDQSVEsnYLOYT9nwhof_V2BX-EGrmuPVspDrbfaGYWOZGr4ValT6IJMLosAGHOdzyqG2E898UKQ2aRRTUbSTKJDcLrkeT7cLnsiC2spWVJwgDAR0nGlOAcCwySLALtcQHmYPkTCfRIIUo2i5FZx2XR6mbS3urBVFRvoBNbkXBz_d3AEDE9wIqHRhxqFYnpGct5Mf7yfm2CShHbdI51UgIAzXPcswNijSRWUmxMrFbj1Hg4B5ZZo6pYvw","e":"AQAB"},"attributes":{"enabled":true,"created":1568661087,"updated":1568661087,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  'df1b24b6-69d0-4499-b1fb-c553950a9171',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '907'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'dd6b00a6-74d9-4827-9142-d15556c5089e',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:12 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '9a9aa77b-71d6-4219-9617-fe87c6a14400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:13 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '5b852f35-a96a-43d8-b750-0f2a97374f2e',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:14 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'af5215f4-bc16-47df-89f4-d81eb1549779',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:24 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '2431b191-465e-4618-85ad-f51b17d44400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:26 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '7c57c90c-744b-445c-8562-3157a77d2dcd',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:27 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e98d7a28-cb0d-46c2-bd1d-132b61ca4815',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:38 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '7f666681-7d70-41e7-8a6e-e4f95b014100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:39 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:39 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '14c1eeaf-bd76-4def-a37a-0ae4754bf391',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:40 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'cdef4e89-f6d9-497b-9b01-622f87b8c6d0',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:41 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '0b0ecba5-b3fd-466c-81c0-1cc859424800',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoCu7meIBKVKs6uWYql0KESp4MoTFwAAAOfUEdUOAAAA; expires=Wed, 16-Oct-2019 19:12:43 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 19:12:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"})
  .query(true)
  .reply(400, {"error":{"code":"Malformed backup blob","message":"Backup blob contains invalid or corrupt version."}}, [
  'Cache-Control',
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
  'westus2',
  'x-ms-request-id',
  '47a92b27-7e49-40c5-bfad-7664c37df827',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 19:12:44 GMT',
  'Connection',
  'close'
]);

