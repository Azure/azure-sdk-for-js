let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test6/create')
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
  '86372368-9c75-4d6b-a4f6-624a86c5d2a9',
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
  'Sun, 15 Sep 2019 18:52:47 GMT',
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
  'bbf31d7f-8d09-47f7-9bab-c1fce32b2800',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aq_iHE1NB1dIq3PqwEENZDap4MoTAQAAAIB_ENUOAAAA; expires=Tue, 15-Oct-2019 18:52:49 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sun, 15 Sep 2019 18:52:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test6/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vq2LIZu3mefyA4-Sj3wyluNuNAjuSJBGdyAvmRt-aPrdL18a9OVVcrywJQRXuml9bnKxkOoJjXUITbUzAsmO750WWXnON5qB9dgP5Jmw9IUlOH6zUsfn9sYtYHboq7LlRhIy24oNDS_yZslJKjcsoSI8N9ysEh5NhLWB9k9qF8sx0rxb_jKS-y_avIV-HDvcWv0oO-kNue9eO7yakWZQE69XOB3COwBVFs6UmOlPqIbQ61oyjxlXhO0dcFOC_QVjyxK5Pgc-vkJIugQB9kE9ow8XkXttY7nfXskwegRBCH_lC3hwIcqGXOQ5mrLIgc-1XT5AkUlm91kxzPI_I0zdpQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568573570,"updated":1568573570,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '904ab28b-66b8-43b9-abfb-784e4509459b',
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
  'Sun, 15 Sep 2019 18:52:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '678'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a')
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
  '8eb3a6d6-1379-4415-b04e-70298fc4669a',
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
  'Sun, 15 Sep 2019 18:52:51 GMT',
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
  '0b0ecba5-b3fd-466c-81c0-1cc839cf2b00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aq_iHE1NB1dIq3PqwEENZDap4MoTAgAAAIB_ENUOAAAA; expires=Tue, 15-Oct-2019 18:52:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sun, 15 Sep 2019 18:52:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vq2LIZu3mefyA4-Sj3wyluNuNAjuSJBGdyAvmRt-aPrdL18a9OVVcrywJQRXuml9bnKxkOoJjXUITbUzAsmO750WWXnON5qB9dgP5Jmw9IUlOH6zUsfn9sYtYHboq7LlRhIy24oNDS_yZslJKjcsoSI8N9ysEh5NhLWB9k9qF8sx0rxb_jKS-y_avIV-HDvcWv0oO-kNue9eO7yakWZQE69XOB3COwBVFs6UmOlPqIbQ61oyjxlXhO0dcFOC_QVjyxK5Pgc-vkJIugQB9kE9ow8XkXttY7nfXskwegRBCH_lC3hwIcqGXOQ5mrLIgc-1XT5AkUlm91kxzPI_I0zdpQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568573570,"updated":1568573570,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '10369deb-cfcd-4b9c-ab04-a83084b27a97',
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
  'Sun, 15 Sep 2019 18:52:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '678'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a/decrypt')
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
  'a5460dea-954f-40fb-b396-9c35244fff5c',
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
  'Sun, 15 Sep 2019 18:52:54 GMT',
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
  'b556d84d-c391-4fe1-8558-b268295b2b00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aq_iHE1NB1dIq3PqwEENZDap4MoTAwAAAIB_ENUOAAAA; expires=Tue, 15-Oct-2019 18:52:55 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sun, 15 Sep 2019 18:52:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a/decrypt', {"alg":"RSA1_5","value":"itRIztiiaZqVy9-P0aLRb_h6G8dGaSOpKaLiAFuBN5Q_VBQqnD9xx_FtffTvkzTkz4bf4Bu0ULjop4McnbKm1wfb6wFzOpotOO6R0pLYrTb2OrwIYBZBHwcPXBG0mtQf1dmLadgVD6xHXLONuhYWSI1attK4_VqV75VQ5FT1uy43Bn531DtdepAE84ou9nIRoguplyuNcYhyPM-0FhgFPK4ODHrYa48hcsi8hqcKXxPT3mdC6muf5iDTdHHDAFyighCDtJ85syF3U3WgAo6W2gFbKZBJ4MpR65XzghwpgC7SYwhXX8VTp0ZW_SIAh_Pp0HmvSpxxuwQgj8CIGk-JCA"})
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation is not allowed.\r\nOperation: \"decrypt\"\r\nCaller: appid=azure_client_id;oid=01111cf6-e558-4db5-b03e-b0154730395a;numgroups=0;iss=https://sts.windows.net/azure_tenant_id/\r\nVault: keyvault_name;location=westus2","innererror":{"code":"ForbiddenByPolicy"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '355',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ace88b8d-90b7-477c-a9c1-34a6a6072ead',
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
  'Sun, 15 Sep 2019 18:52:56 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test6')
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
  '2ea29e89-798e-49c4-b3af-1148b2ca0cc8',
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
  'Sun, 15 Sep 2019 18:52:56 GMT',
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
  '771aabef-adc5-4d6e-96e4-587a765e2900',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aq_iHE1NB1dIq3PqwEENZDap4MoTBAAAAIB_ENUOAAAA; expires=Tue, 15-Oct-2019 18:52:58 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sun, 15 Sep 2019 18:52:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test6')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test6","deletedDate":1568573579,"scheduledPurgeDate":1576349579,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test6/7086fa7dfb2248879b945e1c5828dc6a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vq2LIZu3mefyA4-Sj3wyluNuNAjuSJBGdyAvmRt-aPrdL18a9OVVcrywJQRXuml9bnKxkOoJjXUITbUzAsmO750WWXnON5qB9dgP5Jmw9IUlOH6zUsfn9sYtYHboq7LlRhIy24oNDS_yZslJKjcsoSI8N9ysEh5NhLWB9k9qF8sx0rxb_jKS-y_avIV-HDvcWv0oO-kNue9eO7yakWZQE69XOB3COwBVFs6UmOlPqIbQ61oyjxlXhO0dcFOC_QVjyxK5Pgc-vkJIugQB9kE9ow8XkXttY7nfXskwegRBCH_lC3hwIcqGXOQ5mrLIgc-1XT5AkUlm91kxzPI_I0zdpQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568573570,"updated":1568573570,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '743a5e1e-fb36-4116-bb39-6530cfa0d16e',
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
  'Sun, 15 Sep 2019 18:52:59 GMT',
  'Connection',
  'close',
  'Content-Length',
  '831'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test6')
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
  'ea9c4197-3ca9-407f-89f6-999b4498c980',
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
  'Sun, 15 Sep 2019 18:53:00 GMT',
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
  '09f9f762-7e96-45cb-b965-37b7c03d2900',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aq_iHE1NB1dIq3PqwEENZDap4MoTBQAAAIB_ENUOAAAA; expires=Tue, 15-Oct-2019 18:53:01 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sun, 15 Sep 2019 18:53:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test6')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation is not allowed.\r\nOperation: \"purge\"\r\nCaller: appid=azure_client_id;oid=01111cf6-e558-4db5-b03e-b0154730395a;numgroups=0;iss=https://sts.windows.net/azure_tenant_id/\r\nVault: keyvault_name;location=westus2","innererror":{"code":"ForbiddenByPolicy"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a4e755f9-b0e1-4be8-87fc-9c166380448b',
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
  'Sun, 15 Sep 2019 18:53:02 GMT',
  'Connection',
  'close'
]);

