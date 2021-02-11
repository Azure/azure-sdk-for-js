let nock = require('nock');

module.exports.hash = "372e68af9e366a7d87029637c5e23952";

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
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'fe163a0c-0ca1-4b00-ad65-052a1b033d1c',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:30 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  'b6aad7f3-0335-4209-ba5d-41f9bbed0700',
  'x-ms-ests-server',
  '2.1.10963.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai4bSIgNVvZBihjyk9-j0Ns_aSJHAQAAAPs-0tYOAAAA; expires=Sun, 20-Sep-2020 22:17:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 22:17:31 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/0a06c343c28b49ceb9a52650ea895844","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vZp4lEM0CDENmGRu5j18rx1fjU75VyJ2cs8GU5xLVnhtSjDqKIi_Yh-bi6grTrElVyyIwunHnKSgtEoigaUiHbCS8iWJhwsiqyFP5TtjgdaQ4tGqqktHIP_d1HS-yXpbcwR6l1RFadKWy4kixWitBL-_AqzeKQyI5bPuZ-cMjX5E7DYwISP2WhD41zMXGIzZ_6LI4Rl7z5SRo2LUgikJCGQrwwoVoh3iS_r6ct2YaucIRVcs5ezjahJu5pxdNNkVJkOl8DPXfvRlM0H-YU1vDuUklTXAc6MqiJKCemCqPU_duX4gWVdOdhH9DWmysWo33WAwSYGDjij5v8mMk3_slQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598048251,"updated":1598048251,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '77e1e52b-d369-477e-9f76-b88bec1934f2',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:31 GMT',
  'Content-Length',
  '717'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4JbJw_MWatF6zAZQaEzepIhBisBcsKGT-R0i9M_21GDC7G2ytJhA0e-_D69yCZI3ZRmgSZmQRJiM-uV_224G9DdtFB8sqC1SVXa8wTGC100qALr0yl2aZJN-WyW5x6meQRZsoO_BuR92UV5W7Ivq5QtbKqEq29QA2kzg8m5DspLn55OftI9XWFG2plbLbjm6osKHzrOM__rJFi5H_BB-Zl_dypR2W0Ren8IfVmqYHRFZMJs-gHM5dNxwaMYhDz1i9r4Q1UKjMGID_lvyrb-ud_HZnlZQ2McrG1IxlyfGd3f-jOp2jCHo2iS7E7s6Pghq9ivtdE9D3q2SVxTZxrfnw","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048252,"updated":1598048252,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '6a672709-50df-4f15-81d0-1df5c6473b29',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:32 GMT',
  'Content-Length',
  '724'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c')
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
  'eastus',
  'x-ms-request-id',
  'f8964d08-a8a5-44b4-8d29-29333ab34536',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  'd4090d6c-5d3b-4f0f-81c6-27d916a72c00',
  'x-ms-ests-server',
  '2.1.10963.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai4bSIgNVvZBihjyk9-j0Ns_aSJHAgAAAPs-0tYOAAAA; expires=Sun, 20-Sep-2020 22:17:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4JbJw_MWatF6zAZQaEzepIhBisBcsKGT-R0i9M_21GDC7G2ytJhA0e-_D69yCZI3ZRmgSZmQRJiM-uV_224G9DdtFB8sqC1SVXa8wTGC100qALr0yl2aZJN-WyW5x6meQRZsoO_BuR92UV5W7Ivq5QtbKqEq29QA2kzg8m5DspLn55OftI9XWFG2plbLbjm6osKHzrOM__rJFi5H_BB-Zl_dypR2W0Ren8IfVmqYHRFZMJs-gHM5dNxwaMYhDz1i9r4Q1UKjMGID_lvyrb-ud_HZnlZQ2McrG1IxlyfGd3f-jOp2jCHo2iS7E7s6Pghq9ivtdE9D3q2SVxTZxrfnw","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048252,"updated":1598048252,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '3daadfc5-abcb-4520-b93f-e034d8a8224c',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT',
  'Content-Length',
  '724'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c/sign', {"alg":"RS256","value":"VPSPcX0VRhWMFjpWyQ-RALlAGoaEJkxnOpiSe6NKnNs"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c","value":"ATpereXWSCrWuqOVu7ZbP319l7P0oKW1KDOPa_2kjVx6myjGBILZGCJmsAJxX7f3O2Mo0RIvIOG7lSmeNa__F5c2vtKJ_vVaXxfmPrc4xbXPSIOs7ziZfWZmcGI2WPw5XE85h2XdgIUUUjwIHkDs4bYnyeIdq2-HIjzaXtkZYRvalV3s24QLnbYqtuzqZxd1kpp_L0XROArCyibSQrCrLKu8S815ugyZcNOiU6DHApwytbWer0PhFPNDIEARYRO9MdMSrH-8ys_HX2MLvmWAPcr-AW4wPhd8t2ElnM5M_VRFGiNVH1haRrvSpRl6GMufG2ULkjl-tU95KYLUAJfv3Q"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '1dd683a0-531a-4389-9b8f-e1317e5cb5f6',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT',
  'Content-Length',
  '488'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c/verify', {"alg":"RS256","digest":"VPSPcX0VRhWMFjpWyQ-RALlAGoaEJkxnOpiSe6NKnNs","value":"ATpereXWSCrWuqOVu7ZbP319l7P0oKW1KDOPa_2kjVx6myjGBILZGCJmsAJxX7f3O2Mo0RIvIOG7lSmeNa__F5c2vtKJ_vVaXxfmPrc4xbXPSIOs7ziZfWZmcGI2WPw5XE85h2XdgIUUUjwIHkDs4bYnyeIdq2-HIjzaXtkZYRvalV3s24QLnbYqtuzqZxd1kpp_L0XROArCyibSQrCrLKu8S815ugyZcNOiU6DHApwytbWer0PhFPNDIEARYRO9MdMSrH-8ys_HX2MLvmWAPcr-AW4wPhd8t2ElnM5M_VRFGiNVH1haRrvSpRl6GMufG2ULkjl-tU95KYLUAJfv3Q"})
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
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '42f85ce9-3f23-4fcf-8a9f-6de02b76d59e',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:34 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598048254,"scheduledPurgeDate":1605824254,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4JbJw_MWatF6zAZQaEzepIhBisBcsKGT-R0i9M_21GDC7G2ytJhA0e-_D69yCZI3ZRmgSZmQRJiM-uV_224G9DdtFB8sqC1SVXa8wTGC100qALr0yl2aZJN-WyW5x6meQRZsoO_BuR92UV5W7Ivq5QtbKqEq29QA2kzg8m5DspLn55OftI9XWFG2plbLbjm6osKHzrOM__rJFi5H_BB-Zl_dypR2W0Ren8IfVmqYHRFZMJs-gHM5dNxwaMYhDz1i9r4Q1UKjMGID_lvyrb-ud_HZnlZQ2McrG1IxlyfGd3f-jOp2jCHo2iS7E7s6Pghq9ivtdE9D3q2SVxTZxrfnw","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048252,"updated":1598048252,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '06b8a78c-0b90-4417-9370-e09aaa373496',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT',
  'Content-Length',
  '896'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'd05cb733-54c2-4446-bae3-4f5c9f74b5bd',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '21eb8146-e0bc-4328-9802-59af3b545c00',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'ad9fc21a-c2ab-4da2-bf2f-1e156b3679fb',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '95340360-b223-466a-ae70-0f6a0eb11041',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '26bf93b4-ade0-4d55-9fdb-161bd8da586a',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '1a93c109-f122-43b8-8b7e-56ae6922a252',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '82d05d2b-d921-4ff3-a26e-a7a084f9667c',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '51ea3fe4-eed2-4dbf-88b2-eab7ac84ca31',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '7e205e30-5c46-4e8d-ae21-cadca42e4a0b',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '6b826c97-8989-4cb3-a675-b09c2f343207',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '604c11b3-d4f6-4381-907e-031f303ef05e',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598048254,"scheduledPurgeDate":1605824254,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/23556530365c447abe2f3de233f4f72c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4JbJw_MWatF6zAZQaEzepIhBisBcsKGT-R0i9M_21GDC7G2ytJhA0e-_D69yCZI3ZRmgSZmQRJiM-uV_224G9DdtFB8sqC1SVXa8wTGC100qALr0yl2aZJN-WyW5x6meQRZsoO_BuR92UV5W7Ivq5QtbKqEq29QA2kzg8m5DspLn55OftI9XWFG2plbLbjm6osKHzrOM__rJFi5H_BB-Zl_dypR2W0Ren8IfVmqYHRFZMJs-gHM5dNxwaMYhDz1i9r4Q1UKjMGID_lvyrb-ud_HZnlZQ2McrG1IxlyfGd3f-jOp2jCHo2iS7E7s6Pghq9ivtdE9D3q2SVxTZxrfnw","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048252,"updated":1598048252,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'd76f9287-0c93-43ae-a59d-f80aeca334ea',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:54 GMT',
  'Content-Length',
  '896'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '34992778-acb3-4ac2-9e7c-d79abb37c53c',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598048275,"scheduledPurgeDate":1605824275,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/0a06c343c28b49ceb9a52650ea895844","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vZp4lEM0CDENmGRu5j18rx1fjU75VyJ2cs8GU5xLVnhtSjDqKIi_Yh-bi6grTrElVyyIwunHnKSgtEoigaUiHbCS8iWJhwsiqyFP5TtjgdaQ4tGqqktHIP_d1HS-yXpbcwR6l1RFadKWy4kixWitBL-_AqzeKQyI5bPuZ-cMjX5E7DYwISP2WhD41zMXGIzZ_6LI4Rl7z5SRo2LUgikJCGQrwwoVoh3iS_r6ct2YaucIRVcs5ezjahJu5pxdNNkVJkOl8DPXfvRlM0H-YU1vDuUklTXAc6MqiJKCemCqPU_duX4gWVdOdhH9DWmysWo33WAwSYGDjij5v8mMk3_slQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598048251,"updated":1598048251,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '1e5132c2-f92a-4bd0-9d03-cefc525d5d93',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:55 GMT',
  'Content-Length',
  '888'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '83d91ea7-f3f0-4077-b82c-6954962477fd',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'a890cb3a-2c00-47e6-8ed3-2a9f8c7bc0c9',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '6951c8af-e8e7-4edb-b74e-75c3b37478ba',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '99f7f572-bed1-45af-97eb-bc9c6a9eb706',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '14321104-fcb3-4690-b0e7-14f289a4d71b',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'd01484e9-c2e6-4b20-91cf-48e81af971b8',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'f370bc61-257b-4f25-8936-4bab14473221',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '2376bbbb-ee80-4572-bb66-d3a79a75cd58',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '7e66810c-b2f7-4490-a5b2-56ce0a8909a0',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598048275,"scheduledPurgeDate":1605824275,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/0a06c343c28b49ceb9a52650ea895844","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vZp4lEM0CDENmGRu5j18rx1fjU75VyJ2cs8GU5xLVnhtSjDqKIi_Yh-bi6grTrElVyyIwunHnKSgtEoigaUiHbCS8iWJhwsiqyFP5TtjgdaQ4tGqqktHIP_d1HS-yXpbcwR6l1RFadKWy4kixWitBL-_AqzeKQyI5bPuZ-cMjX5E7DYwISP2WhD41zMXGIzZ_6LI4Rl7z5SRo2LUgikJCGQrwwoVoh3iS_r6ct2YaucIRVcs5ezjahJu5pxdNNkVJkOl8DPXfvRlM0H-YU1vDuUklTXAc6MqiJKCemCqPU_duX4gWVdOdhH9DWmysWo33WAwSYGDjij5v8mMk3_slQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598048251,"updated":1598048251,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '04d5c92e-b388-45df-a006-363c96342b85',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:12 GMT',
  'Content-Length',
  '888'
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
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '972a2811-2d8c-4fec-b867-35cdb56a999f',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:12 GMT'
]);
