let nock = require('nock');

module.exports.hash = "22964b2a9590bf6d05c2d411c750d477";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS512-/create')
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
  'e022f560-0c8b-4223-bae1-b58737ad2cd6',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:05 GMT'
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
  'c8a9006f-7f9a-437d-a4f6-ce3a52685900',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ak2385GL31ZLjEPZ1uHX6VQ_aSJHAQAAAFlHf9YOAAAA; expires=Sun, 19-Jul-2020 23:55:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS512-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPqBViI5SNEJ41Udso78gqYK5WuTGPzb-hBoj6K5A12ZsM3U0m-2ue9NS6MIxjUqbvOCxVm47x5TrE1Z6ClHZwTSDTYrX6REnzksOj97upt8klGZQkoGRIO8uqfo6f8HBhUGU7NUmMCcbC3CKbG6xJLzSo2ZfLIgnqIkFFVXawNolB1rkGOpY7_IaDmShwGpmX0m5Np062h1mi9PEUSyDEwgs9DKJIU71kQtKCd_TkBd0ruleW0tde3BeCn8WNdpRYfVtSHp2c0kvCP3E1yeXYNM9HC_CFhMp-g-IYz2FEhpcAslCABz3ywIwVdBCWJok-FpymPzqrXyMYHMPfcuZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610906,"updated":1592610906,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '8423b29c-f412-46c4-a736-9cf73f1f37cb',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62/sign')
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
  '21fc5262-95d8-419e-be37-f8f5a4ba7f35',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT'
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
  '1900d2c5-9d4b-4e46-9be5-e7bfca835900',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ak2385GL31ZLjEPZ1uHX6VQ_aSJHAgAAAFlHf9YOAAAA; expires=Sun, 19-Jul-2020 23:55:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62/sign', {"alg":"RS512","value":"QaLHow25_feqs3pxKJmCGrAMc8htSHcJZviGWeoVGheXIeIBgTa7IeQF-Ti_oEfg5Uo3phll52kljUTpML3v1g"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62","value":"d0SwMUbyFMGJF_lOUHmFPPUZsTgAwQTxMmrjsRQkS3L8MVQg0Nq9LpTQTmVmZsxIFHY9rwmkOrGsh5gBNM49yEBVlmnmvucnDuz3OVHAeybzppCsCL6qW_ahBB_bYs0F8T5oDETq5IBY_asFETFUMqU_f87KFDyFnyoiWQoGtRAh8OmMjDo7twFyuExBiPeTB4xLC-FWcnsaBgtIF0oFMMWKGdXk3B0o94lIsSNRribaxUMkfGJsvj0tWkNIJ0DTtwaIQYwI8H1qhzs2zPVI7E4z5GW7bCx6f3yBt66QKRCLMJI6yy0n5Jzb9lijowDjgcZcBavlTMRsYRGDgB-Teg"}, [
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
  'b87deef9-d4ab-477c-b6ca-3a5eb1eb8d5c',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT',
  'Content-Length',
  '485'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPqBViI5SNEJ41Udso78gqYK5WuTGPzb-hBoj6K5A12ZsM3U0m-2ue9NS6MIxjUqbvOCxVm47x5TrE1Z6ClHZwTSDTYrX6REnzksOj97upt8klGZQkoGRIO8uqfo6f8HBhUGU7NUmMCcbC3CKbG6xJLzSo2ZfLIgnqIkFFVXawNolB1rkGOpY7_IaDmShwGpmX0m5Np062h1mi9PEUSyDEwgs9DKJIU71kQtKCd_TkBd0ruleW0tde3BeCn8WNdpRYfVtSHp2c0kvCP3E1yeXYNM9HC_CFhMp-g-IYz2FEhpcAslCABz3ywIwVdBCWJok-FpymPzqrXyMYHMPfcuZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610906,"updated":1592610906,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '0d031f9b-79a7-4360-9dbb-4c464406c0bb',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:07 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RS512-","deletedDate":1592610907,"scheduledPurgeDate":1600386907,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPqBViI5SNEJ41Udso78gqYK5WuTGPzb-hBoj6K5A12ZsM3U0m-2ue9NS6MIxjUqbvOCxVm47x5TrE1Z6ClHZwTSDTYrX6REnzksOj97upt8klGZQkoGRIO8uqfo6f8HBhUGU7NUmMCcbC3CKbG6xJLzSo2ZfLIgnqIkFFVXawNolB1rkGOpY7_IaDmShwGpmX0m5Np062h1mi9PEUSyDEwgs9DKJIU71kQtKCd_TkBd0ruleW0tde3BeCn8WNdpRYfVtSHp2c0kvCP3E1yeXYNM9HC_CFhMp-g-IYz2FEhpcAslCABz3ywIwVdBCWJok-FpymPzqrXyMYHMPfcuZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610906,"updated":1592610906,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '961afb9f-d1f1-4f7a-9228-324ee38df68c',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  'cb516c70-0fe6-44e2-a096-15778c7322f9',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  '152f964f-75fa-493c-a8c0-7463a4e1c144',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  'dd5d731e-5a7b-4765-880f-931cfd714780',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  '0656297e-66d3-41a8-805b-8f1ee2fa22f5',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  'fc86a06e-09f3-4c13-8bce-119b1200bdde',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  '002343e7-081d-4e18-8055-665633d3b683',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  'b763e3b6-d90c-4769-8c55-e9176c402e9f',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  'df55afe6-1068-43f3-839a-340bbd930332',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  'a4cf7522-c289-432e-b2c5-e5c8f91286aa',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS512-"}}, [
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
  'westus',
  'x-ms-request-id',
  '53d0a871-c2e7-4b05-9ebd-8a4640ba259e',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS512-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RS512-","deletedDate":1592610907,"scheduledPurgeDate":1600386907,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS512-/f709fb40825e44979ca18be91690dc62","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPqBViI5SNEJ41Udso78gqYK5WuTGPzb-hBoj6K5A12ZsM3U0m-2ue9NS6MIxjUqbvOCxVm47x5TrE1Z6ClHZwTSDTYrX6REnzksOj97upt8klGZQkoGRIO8uqfo6f8HBhUGU7NUmMCcbC3CKbG6xJLzSo2ZfLIgnqIkFFVXawNolB1rkGOpY7_IaDmShwGpmX0m5Np062h1mi9PEUSyDEwgs9DKJIU71kQtKCd_TkBd0ruleW0tde3BeCn8WNdpRYfVtSHp2c0kvCP3E1yeXYNM9HC_CFhMp-g-IYz2FEhpcAslCABz3ywIwVdBCWJok-FpymPzqrXyMYHMPfcuZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610906,"updated":1592610906,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'bae01f19-4177-4532-8356-e374f8c6dc6b',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:25 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RS512-')
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
  'b4e76e69-5ed9-47bc-a3d9-dbe486c716c4',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:55:25 GMT'
]);
