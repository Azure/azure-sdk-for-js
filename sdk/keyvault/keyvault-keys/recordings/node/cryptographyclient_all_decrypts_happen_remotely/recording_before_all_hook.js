let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  '1fc6afba-721c-4469-8ffb-862e3163f8bc',
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
  'Mon, 16 Sep 2019 18:12:41 GMT',
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
  '7f666681-7d70-41e7-8a6e-e4f9e7154000',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTAQAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:41 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:41 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ullU5-0Yb8uXma0GEMGWho_uTWh2cH-AbvdGVpFm40yg1ZrdTftD-dYXiyOQyUDa7OO-jXWIz1ZQ4z11BIVKqKn_2OflGNRKm75JVTPQz0vIRat4CEFoUtmSvK3G7BrZ9bmkRdLowQK1hkXOlm2Xd7s11TotJZdOxWvbVjVuHwCniiZOvr5-UffQ4DUY98Q7y49KDJ-2C9-eLl1nrn0DvO9Hr999L69O_RzOQ6HQC8m1fx5p2rulFxCHDwPXq3VEkFvojLXCGmUbJ-pkZrG4VwUWB6m2autSVCQwTZp-MSmmVpUVGk5wg8nkdKevsCZ-0vsMeh-RDx6hsFoUTJ0UmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657563,"updated":1568657563,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'e4d0f2a1-fac7-4132-a1ea-2061e2c03ca2',
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
  'Mon, 16 Sep 2019 18:12:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '692'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae')
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
  '87d1fc4b-9a00-4af7-a8e1-f917a1d49c25',
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
  'Mon, 16 Sep 2019 18:12:44 GMT',
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
  '0b0ecba5-b3fd-466c-81c0-1cc81c444700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTAgAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:45 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ullU5-0Yb8uXma0GEMGWho_uTWh2cH-AbvdGVpFm40yg1ZrdTftD-dYXiyOQyUDa7OO-jXWIz1ZQ4z11BIVKqKn_2OflGNRKm75JVTPQz0vIRat4CEFoUtmSvK3G7BrZ9bmkRdLowQK1hkXOlm2Xd7s11TotJZdOxWvbVjVuHwCniiZOvr5-UffQ4DUY98Q7y49KDJ-2C9-eLl1nrn0DvO9Hr999L69O_RzOQ6HQC8m1fx5p2rulFxCHDwPXq3VEkFvojLXCGmUbJ-pkZrG4VwUWB6m2autSVCQwTZp-MSmmVpUVGk5wg8nkdKevsCZ-0vsMeh-RDx6hsFoUTJ0UmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657563,"updated":1568657563,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '7b5b5aba-f94e-4b9c-adb2-de6452b87e34',
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
  'Mon, 16 Sep 2019 18:12:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '692'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae')
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
  '13a83c2f-0532-4ca1-b253-c09cd483b194',
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
  'Mon, 16 Sep 2019 18:12:47 GMT',
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
  '91e32c98-0bc4-4c27-9e03-af6585e84100',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTAwAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:48 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ullU5-0Yb8uXma0GEMGWho_uTWh2cH-AbvdGVpFm40yg1ZrdTftD-dYXiyOQyUDa7OO-jXWIz1ZQ4z11BIVKqKn_2OflGNRKm75JVTPQz0vIRat4CEFoUtmSvK3G7BrZ9bmkRdLowQK1hkXOlm2Xd7s11TotJZdOxWvbVjVuHwCniiZOvr5-UffQ4DUY98Q7y49KDJ-2C9-eLl1nrn0DvO9Hr999L69O_RzOQ6HQC8m1fx5p2rulFxCHDwPXq3VEkFvojLXCGmUbJ-pkZrG4VwUWB6m2autSVCQwTZp-MSmmVpUVGk5wg8nkdKevsCZ-0vsMeh-RDx6hsFoUTJ0UmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657563,"updated":1568657563,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '8ab4b3c9-c77a-430d-acdd-3356e966e720',
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
  'Mon, 16 Sep 2019 18:12:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '692'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt')
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
  '09dc8f3c-9720-452a-8476-3cbf0fbe724c',
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
  'Mon, 16 Sep 2019 18:12:50 GMT',
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
  '771aabef-adc5-4d6e-96e4-587afb5d4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTBAAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:51 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt', {"alg":"RSA1_5","value":"M1dw_XxqEtlRBd9DkJ0q4jGrOkaLUfIh3Pb1imo2phsXiPfIBNf92KBakkOV96gRUf7dUqK_hDhKjLQMt0-mxCAJu6W0rJXJ_wyIqZzPVUZ1I-cSbqztbyF-ZWN9Q2i62dKu3qPfrrrhG86RJMTBDxjYsvMkkvbpRgJvseIYt2Z_22Tb9pR4lkAiSaEMXnbi6WHmiNSFjZbsswsLuoDwpuDQ0P3WgXF3I7CCnXwGq3M2A2n70QBDTXlLgR3cfgGslsNj0FECYnAowzlzCgaxB9q6CPgeFnhc2euxLPhlj8AO-OupA42hnMd7EYtq9UAP1Z8-wt5xm_ajDJGDr6zuiQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"ZW5jcnlwdCAmIGRlY3J5cHQgd2l0aCBSU0ExXzU"}, [
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
  '8a8dbc10-2e72-4fb1-9a54-9d10471c5c06',
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
  'Mon, 16 Sep 2019 18:12:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '180'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt')
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
  'aeb81d09-c115-405b-b9f7-6e1172fe50af',
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
  'Mon, 16 Sep 2019 18:12:53 GMT',
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
  '17ecb9f4-a911-4dd9-b142-117577294600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTBQAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:54 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt', {"alg":"RSA1_5","value":"Y9fA538wFnr9xxI470gXdSD0CiaTjin_PYsb5DT4HwHxepVRpd9K1pkVgkUr0kD5k5JrP7rdolY4S6-5pxi53C_YQqvaRY7Re2Lez-cKotZHaHfqjtg8bGAq3VE9Ze3cZWvdmm0q6EHoEPIIPnx6rkPojDky1K14XvsXVhB9stwraQuYXCcTiHKTRvsKake69tDAZFeSpiaQbuJ-CQpghZC1o-HXobpPiYp4_8jX3q9mSgTnefBdiEnAGzTedB6ZBdFLoHCm1w3wVkhBfFeReXWDevZPoqNhyHqs9KhQABR_pXtyNEgwpggSk62uUjtSmRzg5Ppnv6lodobHSVATxg"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"bWFudWFsbHkgZW5jcnlwdCBsb2NhbGx5IGFuZCBkZWNyeXB0IHJlbW90ZWx5LCBib3RoIHdpdGggUlNBMV81"}, [
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
  'b51e6d29-654c-4497-829b-8314cd9c163b',
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
  'Mon, 16 Sep 2019 18:12:55 GMT',
  'Connection',
  'close',
  'Content-Length',
  '225'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt')
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
  'd5db1486-b64a-49a6-b92b-af77135b569b',
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
  'Mon, 16 Sep 2019 18:12:55 GMT',
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
  '28a489c3-90d7-46c3-88f8-21520bef4a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTBgAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:57 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt', {"alg":"RSA-OAEP","value":"cEWkAfW-BN6zLDgQiU0iiWMfe0mieq6MNcHo2j7pbGeMfj9rHUh8XrhDOSSUNHjG9YkaKT4FY7FT3V-2PW_HhLpXZWZID96M0KnGBRvoaFbfaIMBA3GXD2m-JAp2SGxuqgu7T5QFpLFYzk_HcjZmbUgNxWrDbuhkLTJ0AfHOzjkxxaep22C5vRYjonML5JaEmBYJKaqw723cO8lr6ZX8eNHj6Kef1u1zrYEH-EU-HxBvtHkXexKCWwXHLTT6uu87WZ5fii0qfE0XLX1SfsqcoDzw9OSpMecs2W0AQaIFm-gPqla94iA6cX1lOjRnlAS6_eP7zp_zJAuIihYvQAf4QQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"ZW5jcnlwdCAmIGRlY3J5cHQgd2l0aCBSU0EtT0FFUA"}, [
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
  '310fc327-5157-424f-9490-11538537d68b',
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
  'Mon, 16 Sep 2019 18:12:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '183'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt')
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
  '054d4863-3b62-4165-bf31-dcde49bbce3f',
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
  'Mon, 16 Sep 2019 18:12:59 GMT',
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
  '91e32c98-0bc4-4c27-9e03-af6566e94100',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTBwAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:00 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/decrypt', {"alg":"RSA-OAEP","value":"SvzkQK4aPjFfRI2c3NOEXEJ3B0YmZYWAuUTMZCsxXOa5qsZAj6xmCUJ17nDSu9_YSU8kcyHy3W-J9Ju6a7ZDfIPz0Y2iHoMPbQDdCBVDp6neAYvgDtjNV3ORRId3_7pRScCtZxO9PzZazGJZ7xa1W3c32AQ553YF04mvb8IsF4h8tqa5Mcayel-0gW9_qiudt6afZn9-1JcxAEbjwe0XeVkFUuqm-peNHZFP8IftzzJMUzRvyVBSKsA6cSyUvFY5CTQNkwULzXd0duSKcK2o1ivVKW_B3UEhycn3UNff9rH3_5dDQtXskLIt9DWrURBWLykS19nCWWaGoOMhi6FFVw"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"bWFudWFsbHkgZW5jcnlwdCBsb2NhbGx5IGFuZCBkZWNyeXB0IHJlbW90ZWx5LCBib3RoIHdpdGggUlNBLU9BRVA"}, [
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
  '4010c75e-7652-4d6f-ba6b-ac4997e70fbd',
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
  'Mon, 16 Sep 2019 18:13:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '228'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/sign')
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
  'faeebdd5-7bac-4397-88fd-04f233212199',
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
  'Mon, 16 Sep 2019 18:13:03 GMT',
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
  'bf8ceb73-ac66-4df0-a050-4e7fc1114400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTCAAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:03 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/sign', {"alg":"RS256","value":"ii4gB8og7fjrqhFxeftuIgWRjB9-jUgFyr8XqWVVdXc"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"MIaWGinJyHMoBF8mFczQJFYpI7vEunGjuWtMFEyCbKHu-GqycyOd5Zret90qmwqqzZeqaos8EIjwcj2Ye3JzimO9SMnTT6Gkp9siQYUwZ87Ak0EfyMyFXA97V_ctXPzEnbDR3gOvhHexPuZV5_45oXYq1IyR1Np24W8GhAWX-4y5vswtU6NwW1i47Cj6rjpAT57Q2smASz9PcBP6copHdOw_XIOp0lqLBy2LoMkyYASazA9BhCFdg68Mv29afxUf5l-WXRflj1OzbA6Yv5nHgQbN-v4UoV7qrMSU2vr6Z4qY0LRLutz1yV1pdXcwIac-zbT_d8keN5OT2wXnDv-wJg"}, [
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
  'c634c154-35db-4475-8d03-18575d6aaa30',
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
  'Mon, 16 Sep 2019 18:13:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '483'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/verify')
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
  '93e24f32-27e7-4819-8154-4f0129487f19',
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
  'Mon, 16 Sep 2019 18:13:05 GMT',
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
  '28a489c3-90d7-46c3-88f8-2152d2ef4a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTCQAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:07 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/verify', {"alg":"RS256","digest":"ii4gB8og7fjrqhFxeftuIgWRjB9-jUgFyr8XqWVVdXc","value":"MIaWGinJyHMoBF8mFczQJFYpI7vEunGjuWtMFEyCbKHu-GqycyOd5Zret90qmwqqzZeqaos8EIjwcj2Ye3JzimO9SMnTT6Gkp9siQYUwZ87Ak0EfyMyFXA97V_ctXPzEnbDR3gOvhHexPuZV5_45oXYq1IyR1Np24W8GhAWX-4y5vswtU6NwW1i47Cj6rjpAT57Q2smASz9PcBP6copHdOw_XIOp0lqLBy2LoMkyYASazA9BhCFdg68Mv29afxUf5l-WXRflj1OzbA6Yv5nHgQbN-v4UoV7qrMSU2vr6Z4qY0LRLutz1yV1pdXcwIac-zbT_d8keN5OT2wXnDv-wJg"})
  .query(true)
  .reply(200, {"value":true}, [
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
  '1be087ba-6f30-470b-ba13-5f7a36b9bf1c',
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
  'Mon, 16 Sep 2019 18:13:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '14'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/unwrapkey')
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
  '0909739e-c852-4e04-8119-ced98237c482',
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
  'Mon, 16 Sep 2019 18:13:09 GMT',
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
  'b954eee1-aea5-4d44-a151-cb0ef3204300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTCgAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:10 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:09 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/unwrapkey', {"alg":"RSA1_5","value":"RQ6waGiq_69fbFjW1BRGhKeKvip9cgx9lbP03rDDkoPiEygZitSpm4ePfSlRfQut0hTExSxT14GI8gIDtngDLOv5r0D6GGt1l2KvKiN9UXx6X26davymJkqVfNPo_96_YsN8vFqA2sGhSa3OR_DhprXBFA7PnN-Of922ZPMdGB_i1AXkp3PjVBCUBfFcziHFurl23vSJ368CRgZHSH0I2OHsOwwyOXZYuuIM4vNQdHneYIApefg_IyvoC2ymFnemIghzIhmHzECeEETvcES8Y08dyI7l6fAssLUlI4HIknvppXuDNbGmbX7U-xdSkZj937kq49tAeAFQ01S8dcYEvA"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"YXJlcGE"}, [
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
  '533ec849-543e-4e4b-b275-e551b42975c8',
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
  'Mon, 16 Sep 2019 18:13:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '148'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/unwrapkey')
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
  '0155836a-5609-40f1-9328-c5844ac17b3d',
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
  'Mon, 16 Sep 2019 18:13:12 GMT',
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
  'c1804488-dc1d-4fdb-9c73-7621726a4200',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTCwAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:13 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae/unwrapkey', {"alg":"RSA-OAEP","value":"e_OIQG1kwpbpT8gt8nDTKiSvI394JbKW386LH0qVcTftsy9Y44S15rMZ6oMnEBIsSEHl81nt2yKnhwp-VQUe1ov2_Dgz4_5ohSwbi42nYXIwlrxR3q4cSX48yxF-guWxafNsXdz_4qbQanMtKJITRgYDgdK9Ua5n9TlDkiTpj0C5Hl4sgP4RcaGKOMD5hW0yf7sLCLb6GltJb8WcSDfhtiuVbz8NP0gQrnr_sVn3C7bpzvXmA-A0vJxyAaM_m8m4xjtuHhSuZGhUgYfnGpeDakLxv8K7dm1tUQmcUf-V2hNASi4VJEQoAycf__5olEraLZqKxZeUCEApOF3zshhHlQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","value":"d3JhcCBhbmQgdW53cmFwIHdpdGggUlNBLU9BRVA"}, [
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
  '94c3dfc8-6090-4d83-adef-d0a827750e4d',
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
  'Mon, 16 Sep 2019 18:13:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '180'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
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
  '6e210903-2c7c-47cb-b519-7427f29d3dbd',
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
  'Mon, 16 Sep 2019 18:13:15 GMT',
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
  '95e5c8fe-800b-435e-a240-6579e8774100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTDAAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:17 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1568657597,"scheduledPurgeDate":1576433597,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d23b741bf7624d34a809844cee4d4aae","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ullU5-0Yb8uXma0GEMGWho_uTWh2cH-AbvdGVpFm40yg1ZrdTftD-dYXiyOQyUDa7OO-jXWIz1ZQ4z11BIVKqKn_2OflGNRKm75JVTPQz0vIRat4CEFoUtmSvK3G7BrZ9bmkRdLowQK1hkXOlm2Xd7s11TotJZdOxWvbVjVuHwCniiZOvr5-UffQ4DUY98Q7y49KDJ-2C9-eLl1nrn0DvO9Hr999L69O_RzOQ6HQC8m1fx5p2rulFxCHDwPXq3VEkFvojLXCGmUbJ-pkZrG4VwUWB6m2autSVCQwTZp-MSmmVpUVGk5wg8nkdKevsCZ-0vsMeh-RDx6hsFoUTJ0UmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657563,"updated":1568657563,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'cfc3a658-acac-4e4c-bff1-ac9d26680224',
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
  'Mon, 16 Sep 2019 18:13:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '859'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
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
  '6188f1c2-145b-4791-82e1-0a7733e684a8',
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
  'Mon, 16 Sep 2019 18:13:19 GMT',
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
  '9e060a1e-dbf0-4a2c-be90-fd167b174200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTDQAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
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
  '1dff2d7d-0468-4853-9222-232b888382f6',
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
  'Mon, 16 Sep 2019 18:13:20 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
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
  '1468bda2-ec8e-4148-a14d-afd04989dd34',
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
  'Mon, 16 Sep 2019 18:13:31 GMT',
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
  '0b0ecba5-b3fd-466c-81c0-1cc8bc474700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuE9ojnIdNpKtoc7Vz1K4fOp4MoTDgAAAJnHEdUOAAAA; expires=Wed, 16-Oct-2019 18:13:33 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:13:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
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
  '5664242f-1acc-47f0-bed2-13fda45fd99b',
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
  'Mon, 16 Sep 2019 18:13:34 GMT',
  'Connection',
  'close'
]);

