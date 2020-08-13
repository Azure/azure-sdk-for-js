let nock = require('nock');

module.exports.hash = "8d6bc4aaf866aef1073cc6757afa3dc5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA15-19670557858824056')
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
  '2b7dba03-266f-4f90-8b1c-0583ed60f24c',
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
  'Thu, 25 Jun 2020 12:02:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-listdeletedkeys--0/create')
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
  'f64c2918-5bd7-46bf-a69c-6c7a85a90530',
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
  'Thu, 25 Jun 2020 12:02:55 GMT'
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
  'ab7488bc-406b-44ee-9c45-f7dd2d932001',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=An5rkG7gBjNJsPNj8MbKeDs_aSJHAQAAAG-JhtYOAAAA; expires=Sat, 25-Jul-2020 12:02:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:02:55 GMT',
  'Content-Length',
  '1315'
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
  '7983d960-d0e4-4f13-9e91-7d1d4c03f500',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aj1RMk9p7ShFsFZATXn3ujI_aSJHAQAAAG-JhtYOAAAA; expires=Sat, 25-Jul-2020 12:02:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:02:55 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-19670557858824056","deletedDate":1593086576,"scheduledPurgeDate":1600862576,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-19670557858824056/4dd8875013204ccdbf9ac122386de213","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2HbCIvqTg-97AwXzT9_F8DNZPc4qj-HbHN1LSNdqJ4STLHJ8uSwvzfK75KwVSBlXiiqngVOruY9JZC6VPFYkwPKLxQD03N9ZiawrZ10p69sP2iaU59AbiKQ1HBIQwgLapZ3rbjcD6YJ30Nh8IkwyW3sPRECO30MtHIoO27jb_r43KcEqxV9JPfmAc4RAMvm_w4GdeX6du-CrDHODT8qn7nk8-Coqx_ecC9Txln1iVmCwF9U7oWepTSJdYFEQztiYzeUfRupgvPBVGZHOYS16Msg9jlURWA8TTPXIOLD3AEQCO8eguJGVFS4Jh7BZ95RukQlUfIW6F3sg8SQvP7x7MQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592682881,"updated":1592682881,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c2ff501f-bd0a-4b7b-9438-ea727686bd43',
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
  'Thu, 25 Jun 2020 12:02:55 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  '7efbe6d9-30ba-44c8-8244-64da7ec4c13d',
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
  'Thu, 25 Jun 2020 12:02:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-listdeletedkeys--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--0/41edb6001c0947cd88ee39b3f61d47b4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xzY7jM5Eo4P4ZtBl7dOR2GzToexFgHbbB515Ge9-lRbEkAGe3lu5Nf-3dkHEB2JSq2EgHShj5ILR_ct0i2w_FnjZ1yNGr-x_lQD3KR4tJcR2lXO0RLwvtcviRs_LtnV9B-j5N3kCY6UQ8xpY-_ofFfNfflsaVVxfOpc2ma5ltauaLj6ANdVg1SOyl57iL5hgQ3y1zSL2EaTj2ygkXIPExx-6q0T6eQd4k_aRS8F7Nbdwjk6pfYiSv83YLQMutgzbcOkuXi5xgbRHy4y-CyMbNevav7fOQAiaTInENUXsJ6mvYprsjZlojeEWHjA5UeCZ5fJY_dLEN6aydUYR8fvieQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '69d3cae3-c511-45e0-97cb-2f4b44586fdc',
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
  'Thu, 25 Jun 2020 12:02:55 GMT',
  'Content-Length',
  '720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  '26613218-852b-44fc-bdd0-4d960d166ef3',
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
  'Thu, 25 Jun 2020 12:02:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-listdeletedkeys--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--1/6896eb7ef64247fc9226ad07add8d849","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2o0cpLFC2e0UV6k70dCBKH-bHDOdMpoxD3Pgf_FMW3ypboaSRFM8uPjk1dTZvaLzE9Fwe04o_s9tjIYBin_0RsuTscLHKeNmFvgoR4ERNAXZU5tdZ39BG-KzfNAjMpOm0PmL6FkXUYA-TB6z_nWXZvM5CUQfFL6xcofYBrcASpRxKXcKwnKliXVj_4cVX_Q5tZk8ramg9e9QmyBzoRDhMLUYiE26PDWtG0Xjx1L7PjNaNyvWdCWW-3YJzqLb1QYo4e1Ia5faT-7sqVav6NEhIoQ2kCktqeIqo28f8A1K-caCajD54cNVkoCmRXQWeQptXh_Y6O8btg-jBaIPkB8xrw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '232628af-f018-4bc2-b163-7af994206b86',
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
  'Thu, 25 Jun 2020 12:02:55 GMT',
  'Content-Length',
  '720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys--0","deletedDate":1593086576,"scheduledPurgeDate":1600862576,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--0/41edb6001c0947cd88ee39b3f61d47b4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xzY7jM5Eo4P4ZtBl7dOR2GzToexFgHbbB515Ge9-lRbEkAGe3lu5Nf-3dkHEB2JSq2EgHShj5ILR_ct0i2w_FnjZ1yNGr-x_lQD3KR4tJcR2lXO0RLwvtcviRs_LtnV9B-j5N3kCY6UQ8xpY-_ofFfNfflsaVVxfOpc2ma5ltauaLj6ANdVg1SOyl57iL5hgQ3y1zSL2EaTj2ygkXIPExx-6q0T6eQd4k_aRS8F7Nbdwjk6pfYiSv83YLQMutgzbcOkuXi5xgbRHy4y-CyMbNevav7fOQAiaTInENUXsJ6mvYprsjZlojeEWHjA5UeCZ5fJY_dLEN6aydUYR8fvieQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '74008bfb-8da2-4a02-aa06-3045c4f36355',
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
  'Thu, 25 Jun 2020 12:02:56 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bb49baec-4bc7-44fc-ba9c-ab77b8f10bdd',
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
  'Thu, 25 Jun 2020 12:02:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '75799c0d-2967-4704-be9d-6687436ecf70',
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
  'Thu, 25 Jun 2020 12:02:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  'e79cfc85-4eea-448f-a242-ac4b50bc6db6',
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
  'Thu, 25 Jun 2020 12:02:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '61a138ab-88a0-4ea5-9a81-4d2065a2b6ab',
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
  'Thu, 25 Jun 2020 12:02:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  '403c6ff0-f455-43a1-a889-a881db611956',
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
  'Thu, 25 Jun 2020 12:03:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '79fecd42-1f6b-4daa-9a62-4d0cd26ea1a9',
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
  'Thu, 25 Jun 2020 12:02:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  '59c374d9-058c-43a6-9564-db452334edf4',
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
  'Thu, 25 Jun 2020 12:03:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '71f6228c-9b0a-45a1-8c8f-8e4491284774',
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
  'Thu, 25 Jun 2020 12:03:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  '49545f46-a887-4229-9b91-f01cb7f9b25e',
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
  'Thu, 25 Jun 2020 12:03:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '60828020-2910-47cf-adab-d9cfe70664c3',
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
  'Thu, 25 Jun 2020 12:03:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  '588bd183-ae68-418b-8bce-cd2a139091d9',
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
  'Thu, 25 Jun 2020 12:03:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1b2da928-2542-4e7e-88e7-107c436a3605',
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
  'Thu, 25 Jun 2020 12:03:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-19670557858824056"}}, [
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
  'westus',
  'x-ms-request-id',
  'ce78bf13-93c4-497e-bdad-8ed8eb511186',
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
  'Thu, 25 Jun 2020 12:03:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--0"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8ee5af0c-6665-4b47-aa65-b2a2e36c1a90',
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
  'Thu, 25 Jun 2020 12:03:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-19670557858824056","deletedDate":1593086576,"scheduledPurgeDate":1600862576,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-19670557858824056/4dd8875013204ccdbf9ac122386de213","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2HbCIvqTg-97AwXzT9_F8DNZPc4qj-HbHN1LSNdqJ4STLHJ8uSwvzfK75KwVSBlXiiqngVOruY9JZC6VPFYkwPKLxQD03N9ZiawrZ10p69sP2iaU59AbiKQ1HBIQwgLapZ3rbjcD6YJ30Nh8IkwyW3sPRECO30MtHIoO27jb_r43KcEqxV9JPfmAc4RAMvm_w4GdeX6du-CrDHODT8qn7nk8-Coqx_ecC9Txln1iVmCwF9U7oWepTSJdYFEQztiYzeUfRupgvPBVGZHOYS16Msg9jlURWA8TTPXIOLD3AEQCO8eguJGVFS4Jh7BZ95RukQlUfIW6F3sg8SQvP7x7MQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592682881,"updated":1592682881,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '79b0fc34-60d1-4aca-a118-049fa32d82a2',
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
  'Thu, 25 Jun 2020 12:03:11 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RSA15-19670557858824056')
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
  'f270a3a4-860c-40ad-b3c2-40c0cf0f5db8',
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
  'Thu, 25 Jun 2020 12:03:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys--0","deletedDate":1593086576,"scheduledPurgeDate":1600862576,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--0/41edb6001c0947cd88ee39b3f61d47b4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xzY7jM5Eo4P4ZtBl7dOR2GzToexFgHbbB515Ge9-lRbEkAGe3lu5Nf-3dkHEB2JSq2EgHShj5ILR_ct0i2w_FnjZ1yNGr-x_lQD3KR4tJcR2lXO0RLwvtcviRs_LtnV9B-j5N3kCY6UQ8xpY-_ofFfNfflsaVVxfOpc2ma5ltauaLj6ANdVg1SOyl57iL5hgQ3y1zSL2EaTj2ygkXIPExx-6q0T6eQd4k_aRS8F7Nbdwjk6pfYiSv83YLQMutgzbcOkuXi5xgbRHy4y-CyMbNevav7fOQAiaTInENUXsJ6mvYprsjZlojeEWHjA5UeCZ5fJY_dLEN6aydUYR8fvieQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5f0c16e3-c327-49dc-a56c-283664722f72',
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
  'Thu, 25 Jun 2020 12:03:11 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-1972124414426204","deletedDate":1593086591,"scheduledPurgeDate":1600862591,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-1972124414426204/6fdf0394751c4f8dac6c57eb50fcee52","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sVJmXgfHdvYJYArLFOaXV-maL-juaFsvJ0z67rOlgYRCI_axwxoJEf-4rmumuSrKeBzxCI9dPoQj-_IBvm274abtdfa6Ddj8RT_P7VFEMiNJBD40Clehmu3g7mmpGOyd1v22Ry7_X0Lha_VxBQGXcsAHy6Xm3H1mMweOXUHHI54VwHJrAmma7pMwVpjPnGXP1FCn3sBY7126oiKEPThVBgb8MOA0OsPAHBd7ok-x-P3DIRXUhED2g9ZK8aCSmPb0eL13UOKKAE9v7ECtVYP_4Qd_rjfvcCqx77V6istqT6hTFqJSO-SOk8wCJzpw2FL_R-gSfccSmnP1s4wzUW295w","e":"AQAB"},"attributes":{"enabled":true,"created":1592682126,"updated":1592682126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a19712cc-c59a-4923-a398-6de5b29cf0f3',
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
  'Thu, 25 Jun 2020 12:03:11 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '668139ee-15e1-4d63-a9cc-1d436f823a9c',
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
  'Thu, 25 Jun 2020 12:03:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys--1","deletedDate":1593086591,"scheduledPurgeDate":1600862591,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--1/6896eb7ef64247fc9226ad07add8d849","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2o0cpLFC2e0UV6k70dCBKH-bHDOdMpoxD3Pgf_FMW3ypboaSRFM8uPjk1dTZvaLzE9Fwe04o_s9tjIYBin_0RsuTscLHKeNmFvgoR4ERNAXZU5tdZ39BG-KzfNAjMpOm0PmL6FkXUYA-TB6z_nWXZvM5CUQfFL6xcofYBrcASpRxKXcKwnKliXVj_4cVX_Q5tZk8ramg9e9QmyBzoRDhMLUYiE26PDWtG0Xjx1L7PjNaNyvWdCWW-3YJzqLb1QYo4e1Ia5faT-7sqVav6NEhIoQ2kCktqeIqo28f8A1K-caCajD54cNVkoCmRXQWeQptXh_Y6O8btg-jBaIPkB8xrw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '8fdcc8d0-2f3d-4d5e-b118-9f3b32ab559e',
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
  'Thu, 25 Jun 2020 12:03:11 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '19aed248-4d49-436a-b4dc-a10afdb69b7b',
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
  'Thu, 25 Jun 2020 12:03:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5ab5476a-a22c-4780-8945-95712d9bc185',
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
  'Thu, 25 Jun 2020 12:03:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6f905b0c-8c47-48d5-b429-e5d82dda5b4f',
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
  'Thu, 25 Jun 2020 12:03:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '8653d38c-5f13-4dc3-8993-fcf33eb86192',
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
  'Thu, 25 Jun 2020 12:03:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1cc3cba7-7c2d-4559-adcb-b171bb94db9b',
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
  'Thu, 25 Jun 2020 12:03:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '628becc4-28c0-4a42-addc-d3ac253cd68d',
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
  'Thu, 25 Jun 2020 12:03:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3e606cfc-1ea2-4d71-81f2-5a638579de25',
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
  'Thu, 25 Jun 2020 12:03:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  'ede1ca18-e8ef-4054-870b-5da3e78f63dd',
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
  'Thu, 25 Jun 2020 12:03:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '85618c74-db8e-4f09-b759-7eb5a969c788',
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
  'Thu, 25 Jun 2020 12:03:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '1337eda3-e226-492f-8d01-bcbda92358d0',
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
  'Thu, 25 Jun 2020 12:03:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e212d63d-adde-4e46-95e4-8f05bcd18c8e',
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
  'Thu, 25 Jun 2020 12:03:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '6c9920af-c024-4b36-a846-089a5c124ca6',
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
  'Thu, 25 Jun 2020 12:03:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0859ab58-f225-41fa-b2a6-bca6755ca2d8',
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
  'Thu, 25 Jun 2020 12:03:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '2c47e292-aa5a-42dd-9950-16870d9cda6f',
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
  'Thu, 25 Jun 2020 12:03:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c17ddb4e-788c-4dfd-957e-61801da4055e',
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
  'Thu, 25 Jun 2020 12:03:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '7f46f234-e797-44d2-a021-744208ec4c93',
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
  'Thu, 25 Jun 2020 12:03:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-listdeletedkeys--1"}}, [
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
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e65256ce-fa50-47e6-bf84-b2ec24a1ce64',
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
  'Thu, 25 Jun 2020 12:03:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-1972124414426204"}}, [
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
  '44ab1c5d-08d9-4f2a-a3cf-6e95086ff6d2',
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
  'Thu, 25 Jun 2020 12:03:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-listdeletedkeys--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys--1","deletedDate":1593086591,"scheduledPurgeDate":1600862591,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--1/6896eb7ef64247fc9226ad07add8d849","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2o0cpLFC2e0UV6k70dCBKH-bHDOdMpoxD3Pgf_FMW3ypboaSRFM8uPjk1dTZvaLzE9Fwe04o_s9tjIYBin_0RsuTscLHKeNmFvgoR4ERNAXZU5tdZ39BG-KzfNAjMpOm0PmL6FkXUYA-TB6z_nWXZvM5CUQfFL6xcofYBrcASpRxKXcKwnKliXVj_4cVX_Q5tZk8ramg9e9QmyBzoRDhMLUYiE26PDWtG0Xjx1L7PjNaNyvWdCWW-3YJzqLb1QYo4e1Ia5faT-7sqVav6NEhIoQ2kCktqeIqo28f8A1K-caCajD54cNVkoCmRXQWeQptXh_Y6O8btg-jBaIPkB8xrw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '67327429-6b72-45a8-80a8-71b0874fc3a4',
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
  'Thu, 25 Jun 2020 12:03:28 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzIhTURBd01USTRJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklRMFZTVkVsR1NVTkJWRVZPUVUxRkxVRlZWRWhGVGxSSlEwRlVTVTlPVTBoUFZVeEVWMDlTUzBaUFVsQkJVa0ZNVEVWTVVrVlJWVVZUVkZNdE5EWTVNams1T0RVME16azJNekF6TWkweEx6SkZNVUpHTmpJd01UZEJSRFJEUWpJNU9FUkdPVUpHTWpORVFVTkVOalJHSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '38bdb773-553e-42d1-82bd-24688b0e365d',
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
  'Thu, 25 Jun 2020 12:03:28 GMT',
  'Content-Length',
  '486'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklRMFZTVkVsR1NVTkJWRVZPUVUxRkxVOU9RMFZCVlZSSVJVNVVTVU5CVkVWRVRrVlhVa1ZSVlVWVFZGTlRTRTlWVEVST1QxUkJWVlJJUlU1VVNVTkJWRVZCUjBGSlRpMHhORFF3TWpFNU1UUTJPVFV3T0RBM05DMHdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'fe50bed6-7afb-4cce-ab39-b32df9c5405d',
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
  'Thu, 25 Jun 2020 12:03:28 GMT',
  'Content-Length',
  '448'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDQhTURBd01UTTVJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklRMFZTVkVsR1NVTkJWRVZPUVUxRkxVOU9RMFZCVlZSSVJVNVVTVU5CVkVWRVRrVlhVa1ZSVlVWVFZGTlRTRTlWVEVST1QxUkJWVlJJUlU1VVNVTkJWRVZCUjBGSlRpMDRPVFkxTXpJMk5qSTJNVFUxTmpJM0xUQXZRVEl3TlVSRU4wTkNRa0UwTkRRelJEZzRRMEpETmtVM1FVUXpORE0yT0RVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'b9864517-07eb-4fbd-80c9-0aa66daddf6f',
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
  'Thu, 25 Jun 2020 12:03:28 GMT',
  'Content-Length',
  '502'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16149549216697756-1","deletedDate":1593035323,"scheduledPurgeDate":1600811323,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16149549216697756-1","attributes":{"enabled":true,"created":1590017514,"updated":1590017514,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16814512386480018-0","deletedDate":1593035345,"scheduledPurgeDate":1600811345,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16814512386480018-0","attributes":{"enabled":true,"created":1590017675,"updated":1590017675,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-9345955924083531-1","deletedDate":1590068833,"scheduledPurgeDate":1597844833,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-9345955924083531-1","attributes":{"enabled":true,"created":1590068824,"updated":1590068824,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain-13811670984275715-1","deletedDate":1590067762,"scheduledPurgeDate":1597843762,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain-13811670984275715-1","attributes":{"enabled":true,"created":1590067755,"updated":1590067755,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklTMFZaVGtGTlJTMVBUa05GUVZWVVNFVk9WRWxEUVZSRlJFNUZWMUpGVVZWRlUxUlRVMGhQVlV4RVRrOVVRVlZVU0VWT1ZFbERRVlJGUVVkQlNVNHROVEkxTURReU16WTJPREkxTlRBMU15MHdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '057c6e75-69cf-462f-83f2-baca4b97d2e7',
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
  'Thu, 25 Jun 2020 12:03:28 GMT',
  'Content-Length',
  '2403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8086538548846101","deletedDate":1593034751,"scheduledPurgeDate":1600810751,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateakeywhilegivingamanualtype-8086538548846101","attributes":{"enabled":true,"created":1593034751,"updated":1593034751,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanECkeywithcurve-7291694565462314","deletedDate":1593040884,"scheduledPurgeDate":1600816884,"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanECkeywithcurve-7291694565462314","attributes":{"enabled":true,"created":1593040884,"updated":1593040884,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/importKeyName-canimportakey-47104081536819553","deletedDate":1593036664,"scheduledPurgeDate":1600812664,"kid":"https://keyvault_name.vault.azure.net/keys/importKeyName-canimportakey-47104081536819553","attributes":{"enabled":true,"created":1593035909,"updated":1593035909,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys--0","deletedDate":1593086576,"scheduledPurgeDate":1600862576,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--0","attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-listdeletedkeys--1","deletedDate":1593086591,"scheduledPurgeDate":1600862591,"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-listdeletedkeys--1","attributes":{"enabled":true,"created":1593086576,"updated":1593086576,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-ES256-15651833048644925","deletedDate":1593040097,"scheduledPurgeDate":1600816097,"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-ES256-15651833048644925","attributes":{"enabled":true,"created":1592606621,"updated":1592606621,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-ES384-4521240533268982","deletedDate":1593040727,"scheduledPurgeDate":1600816727,"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-ES384-4521240533268982","attributes":{"enabled":true,"created":1592606654,"updated":1592606654,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS256-23553669887808448","deletedDate":1592606543,"scheduledPurgeDate":1600382543,"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS256-23553669887808448","attributes":{"enabled":true,"created":1592606542,"updated":1592606542,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RS512-8334506985225505","deletedDate":1592607302,"scheduledPurgeDate":1600383302,"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS512-8334506985225505","attributes":{"enabled":true,"created":1592607302,"updated":1592607302,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-1972124414426204","deletedDate":1593086591,"scheduledPurgeDate":1600862591,"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-1972124414426204","attributes":{"enabled":true,"created":1592682126,"updated":1592682126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5TVQwTkJURU5TV1ZCVVQwdEZXVTVCVFVVdFVsTkJNVFV0TXprd01URTFNRFV5T0RJek56azFNeTg0TVRJM016YzNOVVZHUXpFME56QXdRVEV3TVVJd01FTTRNek15T0RKRFJpRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '4f4a1d43-f81b-4e73-b55c-2b395f71cfb2',
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
  'Thu, 25 Jun 2020 12:03:28 GMT',
  'Content-Length',
  '4518'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazVJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVEF6TVRBMU5qYzRNREkwTXpjMU1qUTNNQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '56d78533-cebb-42e8-8dc4-efafb3f6b2fc',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzYhTURBd01UTXlJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVEExTVRJMU1UQXdNVFUyTURNNE16YzJNQzg1UVVJeFFqYzJNelJCTVVFME1FVTVPVUk1UlVFMFJVRXhRelUzTVRnNU55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f72b676a-0cd4-469e-b30e-09c9d0fc021d',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '491'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVEl5T0RZNU5qZzRPRFl4TXpRNE9UY3hJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '82e0df88-bda1-4320-91c7-093fdc70414f',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-1972124414426204","deletedDate":1593086591,"scheduledPurgeDate":1600862591,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-1972124414426204/6fdf0394751c4f8dac6c57eb50fcee52","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sVJmXgfHdvYJYArLFOaXV-maL-juaFsvJ0z67rOlgYRCI_axwxoJEf-4rmumuSrKeBzxCI9dPoQj-_IBvm274abtdfa6Ddj8RT_P7VFEMiNJBD40Clehmu3g7mmpGOyd1v22Ry7_X0Lha_VxBQGXcsAHy6Xm3H1mMweOXUHHI54VwHJrAmma7pMwVpjPnGXP1FCn3sBY7126oiKEPThVBgb8MOA0OsPAHBd7ok-x-P3DIRXUhED2g9ZK8aCSmPb0eL13UOKKAE9v7ECtVYP_4Qd_rjfvcCqx77V6istqT6hTFqJSO-SOk8wCJzpw2FL_R-gSfccSmnP1s4wzUW295w","e":"AQAB"},"attributes":{"enabled":true,"created":1592682126,"updated":1592682126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c62630d4-8a3d-4bfa-81a2-b72f32360455',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RSA15-1972124414426204')
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
  '06e9c99e-4249-4ec4-a33c-95106ff0e59e',
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
  'Thu, 25 Jun 2020 12:03:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzYhTURBd01UTXlJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVFF4TWprNU1Ea3hNekEzTnpZNU5qVXpNQzgzTVRWRU1UUTROVGN4TXpBME4wSkZRa1pDTmpRelJVWkJRakF3TVRVek1DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7018f83a-5cc7-465b-8244-cdc47f81a41b',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '491'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-22567097283112192","deletedDate":1593086610,"scheduledPurgeDate":1600862610,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-22567097283112192/36f9980d7d7d40b69fb0c454afcb0052","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mrw2WXPBHXZybuCxmjfr7ww8mJuQkbSQwCOKqk1inVcpRAe_dHP7It8jdPwPhY0sl5b_l4dieEFkL922cs0R9AT2XP9F7a21oFqTrdqqACZnG8ZGg6LVwX6ViCapeBoXjdAYmrHMWbUKZQQTi3t_FiTLnbGul0fIfKWlMgDRjKQ0829OTLv-FTtzI_kmT-Jn32LXrmTbQuPniZHEAa_dORALnshzJ3DH9huwGC3lwviNjCtQcD_1ayG1r51nZ0bQfQLxueZrrBhYBPFgd968qPwKeYRH2XvnUOroh2C9_1mcsolf6P_wbzvcNE4yXPkyQh9vpNquVFZQpoog_KA8XQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592682763,"updated":1592682763,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '92d87a0f-42e7-41e2-9c84-a0ca62d1ae19',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  '6eb0a11e-b83d-47d1-85af-7e04994372fb',
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
  'Thu, 25 Jun 2020 12:03:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVGd3T1RjMU5qYzFOekUwTURJMU9URXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '0ff0c023-1e89-4b82-967c-57b4575675d9',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  'cde4fb7a-efea-45ff-a196-8cc2bbb1a1ce',
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
  'Thu, 25 Jun 2020 12:03:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDQhTURBd01UTTNJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMDVQVGtKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRBd01UUTJOamN3TnpFNU9UY3lNVFF4TnpZeEx6VXhOamd6UWtRMVFUaEdRalF6TVRkQlFUVTRRVE5HUWpVeFJrSkNPRVU0SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'c5747fb2-c8b7-4ed6-b313-cb6db22d4c79',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '502'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMDVQVGtKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRjd05USXpNVFE1TlRZME56TTBORFF4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '16f14f87-3568-4a90-b572-c65b8a188d2f',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtGQ1QxSlVRMUpGUVZSSlRrZEJRMFZTVkVsR1NVTkJWRVV0TURFNE56Z3pOekUyT1Rnd09EQTBOUzlGUmtSQk5VSXhOVVkwTjBZMFFVTkVPVEpGUWpFME0wVTRRVGsyTkRBMU55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '1531dc49-a123-4eac-941c-e37c03b8a8aa',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtGQ1QxSlVRMUpGUVZSSlRrZEJRMFZTVkVsR1NVTkJWRVV0TWpRek9UUTBPVGcwTlRZMk9USTJPREVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'e67c1e5f-c28b-4235-a6fe-d5f14197c6a5',
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
  'Thu, 25 Jun 2020 12:03:29 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtGQ1QxSlVRMUpGUVZSSlRrZEJRMFZTVkVsR1NVTkJWRVV0TkRrMk16STFNams1TWpZM09UQTNORGN2TkRoQ05ERTVSRUU0TlRjNE5ETkNNemczTkRORU16WXlOemRHTkVSRlEwWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'b387b395-1e17-4688-95ad-d6e89151ff46',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtGQ1QxSlVRMUpGUVZSSlRrZEJRMFZTVkVsR1NVTkJWRVV0T0RJeE5EUTFOekE1TlRreU5EazJOU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '760b5e08-a0c8-402e-986e-cbdfdc8dba41',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01UQXdJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwd01qUTBOamMyTURNNU5qRTJORGt4TlRRdk56bEROalpFUkRRNU4wRTRORU5DTVVJeVJrWTRNRFpEUmpSR04wVXlNa01oTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'b1e9793f-a3bc-4149-9827-247ae31b6054',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMweU1qVTBNRFkzT0RRME5UUTVOVFU0T0NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '876c59d3-1f0b-46d4-b9c2-ffde44699ab2',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwek56TTNNek13T0RrMk5UYzJNamd4THpBM1EwWkdNa05CTjBKRk5UUXhSRGRDTlRVMlF6SXhRekUzTmtNNE56WkRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '838c82a7-fa5f-4a29-aaeb-82df08dfbe43',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwMU1EYzFORFE1TVRNd016YzFOREE1SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'd2762a34-7f7c-4a0f-b689-52be4ae43979',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwMk1qTTRNVEk0TnpJMU1EWTFOemMxTHpKQlFrUTNNa05FT1RreVJUUXpRVVJDUVRNMU1VSTNNakJCUWpjelEwRXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '02af636c-d09f-4f9b-ae4a-6ecea55e1524',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwNE9ESTFPVFkwT1RjM09UTTJPRFkzSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a95a79be-fa0d-44ae-9e7c-a5733970803b',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVkpGUVVSQlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVkpVMU5WUlZJdE1UVXpOemd4T0RBeE56YzVNRFkzTlRNdk1UQTJSVEExUTBReU5EZEdORFU0TVRnd01qWkVRek14TmtZM1FVSTRNRU1oTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '740c3b0d-e0a5-4b1b-b760-df223f332488',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '464'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVkpGUVVSQlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVkpVMU5WUlZJdE5qQTJOekUzTXpJeU56QTJNVEF5TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ce982545-6cb3-4cf0-adea-f3560b3e8241',
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
  'Thu, 25 Jun 2020 12:03:30 GMT',
  'Content-Length',
  '406'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVkpGUVVSQlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVkpVMU5WUlZJdE9EWTNPREl4TlRVMU5qTXdOemN5TWk4MU9Ea3dRVFUyTURZMU0wSTBSRFpHUVVVM09VWkZNREkyUVRGRE56Y3dNeUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '0edd6e85-eb01-48af-93b4-f8848d0b8960',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '464'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSRlRFVlVSVUZEUlZKVVNVWkpRMEZVUlMweU16QXpOVFExTkRreU1UTXdNRGN3TWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a0bd0674-225d-4140-8fd9-4a4b76852eb8',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSRlRFVlVSVUZEUlZKVVNVWkpRMEZVUlMwMU5EZ3lNall6TURjMk1qVTVOamt5TDBJeU56YzBPVUpCTmtJd05qUkNOamRCTkRKQlFqQTNOVU0xTVRFNU1UUkRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '8d70b156-a282-42ca-a137-d23d221e2f28',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  'b4462c51-50d8-4770-a51f-e424f4779e98',
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
  'Thu, 25 Jun 2020 12:03:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSRlRFVlVSVUZEUlZKVVNVWkpRMEZVUlMwNE16ZzJNemc1TVRVME1qUTNOamN4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '7933f9b1-97a8-4a8f-a3be-bbd9ebd2f15a',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSRlRFVlVSVUZEUlZKVVNVWkpRMEZVUlZkSlZFaFNSVkZWUlZOVVQxQlVTVTlPVTFSSlRVVlBWVlF0TnpNME5UUXpNVFk0TXpJMk5qZzFMek5CUlRCQ01FUXdNVFJHTXpSRk1UQkJOelU0T1VJeFF6azNOa0V4TlVJNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '05877233-5f2f-4172-a7bc-1d7fffa6b6e4',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSSlUwRkNURVZCUTBWU1ZFbEdTVU5CVkVVdE1qVXlOalV5TXpFME5UUTRNakEySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '91f77ef5-299b-43a3-ab97-d78452423fe0',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSUzB3TVRJd01qTXpNVFk1T0RVMk5URTRORFF2TlVVMlJqVTFSalU1TUVSRU5ETkVSams1TlRVMVJrVXpPVUUyTVVFNFJFTWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '14e3ae8d-25bf-499e-8f62-8e2f9e20abc1',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EWXhJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSUzAwTVRFMU9EWTBNVFl4TXpFMU56Y2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'fd689c71-b28b-4782-b2ef-c2b24b644720',
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
  'Thu, 25 Jun 2020 12:03:31 GMT',
  'Content-Length',
  '363'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSUzAzTnpNd01qVTBOVFEyTVRBek1qQTBMelZCTUVRd1FUWTJPVUU0TXpRNU5EaENSRUkyTURFMVJFVkVNRGd5TURreUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'c06cfc27-c9dd-40e2-9b8e-eef2a862ad3e',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVk5UUlVOU1JWUXROVGc0TURnMk5EUXlOalV6T0RZNU1pRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f0bef489-71fd-4771-a891-fcaf7938e2cd',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVk5UUlVOU1JWUkpUbEJGVFVaUFVrMUJWQzAyTWpRM05qRTROREkyTnprNE5qSXZNRGMxTnpWRE5qUkZRakU1TkRWQ05Ua3lSVVJEUlRVM1JVSTRPRUV6UWtFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '44a29984-7a36-4073-9b7c-ea29f4ac1058',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '454'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZ3pJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVk5UUlVOU1JWUkpUbEJMUTFNeE1rWlBVazFCVkMwek1UTTRPVFV3T0RReE9UUTVNamMxSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'f14a2d32-a401-4bd3-9ca0-b880d182fd75',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '406'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXhJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVmRKVkVoU1JWRlZSVk5VVDFCVVNVOU9VMVJKVFVWUFZWUXRNRGM1TkRJeU5UWXlNRFExTURReE9UUXZNVFZHTWtSRFJERkdPVGM1TkRCRk56Z3pOMFk0UkVReU56RTJOemt4T1RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '670e5d85-8af6-430a-a3f7-d988abea31c3',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '470'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVmRKVkVoU1JWRlZSVk5VVDFCVVNVOU9VMVJKVFVWUFZWUXRPVE13T0RFd01EazJNVGcwTmprNU55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0b135d10-12c9-4076-b7b6-eef1090e1383',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '411'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVXRORGc1TmpNNU5qRXhOemt6TURRMk1UWXZNakUwUVRORU0wUTNOVGN4TkRaRVEwSkdRVGswT0VWRU16STNOVVJDUlRBaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'b042af03-41bd-4140-9901-ddb582bcbfe8',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlZVMGxPUjBKRlIwbE9SRVZNUlZSRlEwVlNWRWxHU1VOQlZFVlRVRTlNVEVWU0xUWXhNemd4T1RrNU1ERTRNamt4TlRNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '0af83ccc-30bb-4adf-ac73-e56d3f0153f6',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TVRVeE9UVXhNREExTlRjME1qZzRNekF2TmtKQ1JEa3dOMEpDTlRRNE5FUTFPVGt6TVVRek5UaEdNek5FT0RkRFJUZ2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '215fc078-4d59-479b-ad06-c1b71cb1f13b',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TWpRMU9EVXdORGsxTkRNek1Ua3hNRFF4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '5bc2adb2-f68c-42e1-825b-eec5c4312711',
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
  'Thu, 25 Jun 2020 12:03:32 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TkRVNE56WXlOVEU1TVRZNE1EazVPVFl4THpNd04wUTBRVFV6TURWR05UUXpNakE0T0RGRVFURXhRekJDTVRnd09EUkNJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '0d85b42c-949c-452f-ac42-c04e5fe2ba54',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TlRnM05qTTBNamt6T0RBNE1qUTNNekFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '00f7c697-88d3-48e6-a51b-11f2d825e133',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '368'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TnpFME1ERXdPVGN5TnpZd01UUTFNVEF2UkRkQ01qQkNPVGc1TURrME5FVTVNVGt5UmpCQk5VSXpOekEyTVRBNU5qSWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'fcc54eb3-8f69-440a-b735-f213681b0796',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  'f1df8de5-b035-4e42-b212-970331c93843',
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
  'Thu, 25 Jun 2020 12:03:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10T0RZNU5UTTVPRGszTnpnMU1URXhNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'de3ec2bf-2429-4e9f-89c8-b320e050ab8a',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '368'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXRNRFExTXpjME1EQTRNak01T1Rnek9ETXhMelUyUWpjNE9USXdNekkzTkRRek9UVTRRMFl3TkRnM1FVWTNSamxGTUVRNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'bd0f9674-cd40-4ca8-8155-48507d72c070',
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
  'Thu, 25 Jun 2020 12:03:34 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXRNelUxTVRneU9EazRORFExT1RnMU9UUXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c94163e1-50d0-4b0f-9521-e3143e827089',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXRORGcyTlRBMU1USTNOakkyTURVeU5qQXZRMEl4TUVRd01EbENSRFJCTkRSQ05EaERRVGRETWpaR01UWTNSRUl4T1RNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '87b52ee1-c693-49de-9e7c-e0b5e30b1d3f',
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
  'Thu, 25 Jun 2020 12:03:34 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXROalF3T0RrMk5ETTNOalUzTWpBMU56RWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '06f27be7-fe87-45e2-823e-9b7afb47d24d',
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
  'Thu, 25 Jun 2020 12:03:33 GMT',
  'Content-Length',
  '379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXRPRFUxTlRVNU5qY3dNRGMxTXpneU56RXZOa0l3TkVJMk1qQkVSVEJCTkVKR1JrSkVNall4UlRZNVEwWXpNVEZGTkRJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'fddeb9cc-27ed-45c7-a5cd-270424ed9394',
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
  'Thu, 25 Jun 2020 12:03:34 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXRPVGN5TVRVNU1qSTBOek0wT0RVd01UQWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f068ce59-d115-493e-9f5e-100e51acfadc',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVEUxTXpnMU16WTJNakF5TkRVek9USXdMemxCTmtWR09EQkZNME00UlRSQ05VUTRNRGhHUlRjeU1rWXdPVGcxTnpZeUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '1b22cb7b-ae28-46d5-8a56-6636ae32d48c',
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
  'Thu, 25 Jun 2020 12:03:34 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVFF6T0RjMU1ETTFORFEzT0RZeU1UVTBNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '1d95211d-2958-4294-a2cd-6b6029380bbd',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVFkwTkRBd056RTNNelUyTlRVek5qWXhMekk0T1RaQ1FrWTJORGM0UmpRNVF6azVNa1F3TVRZM1JrUTJOakpDTkRBMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '2305e6a5-1bba-4bb0-b694-85ee0733ff33',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVGd6T0RjMk16WXdPRE01T1RZeE9ESXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '955d0018-c440-41d4-9ef2-d960607768f3',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVGt3TXprMk16VXpORFl3TWpreU9EQXZNamxHTVRFek5EVTNSRFZFTkRGR04wRTJRa1k1UmtWRU56Z3dPVEl5TmpBaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '37a3b768-ce95-43fd-b30d-bc624a789331',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxUQTNNakkzTVRnek56UTRNekEyTURRek1TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'be28e203-2168-4889-a093-05446d145381',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '395'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXhJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxURTBOekEyTkRRM09UazVNVGs1TmpJek1TODJRVFpCTURjeVJVWTJOek0wTmtSRFFVSTFNRGsxUTBSR1FURTBOREpDUkNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '2b387c4e-d19c-4c7f-8818-61255ed72725',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '454'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxUSTJNemMwTmpRMU5qa3dNelUxTWpFME1DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'bc2d5d0c-964c-4247-b828-746d3ba82874',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '395'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXhJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxUUTNOREl4TkRnMk56a3lPVFk0TXpFMU1DODFORUZEUVRKRFF6bEdOVEEwT1VKQ1FURkROamxFUlVVNE4wUkROa0V5UmlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '5a6825da-b182-41df-8145-250eca4dfb27',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '454'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  '7c9b765a-1df5-45c8-ab05-8a2878cc81ec',
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
  'Thu, 25 Jun 2020 12:03:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxUWXdOREV4TkRrNU5qZzBORFV4TURFeElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '21e8adff-4fbc-479d-a38f-ee4b1a521435',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '395'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlFVUkRRVTVEUlV4QlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVlRUMUJGVWtGVVNVOU9MVEUxTURjM056WXhNVEV6T1Rrek5qZ3lMekpHUlRGR01rVXpNRUV4T0RRNU0wRTRRekJDT0RCRlEwUkNOekZDTXprMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '3d325406-e60c-4985-9806-ae6393654b24',
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
  'Thu, 25 Jun 2020 12:03:35 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlFVUkRRVTVEUlV4QlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVlRUMUJGVWtGVVNVOU9MVFEzTVRVMU1URTJOVFE1TXpBNU5qWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '59f2f27a-8449-475f-a97d-530c78383ee4',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '411'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXhJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlFVUkRRVTVEUlV4QlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVlRUMUJGVWtGVVNVOU9MVGcxTWpjeE1UVTJOelkyTmpjMk1UUXZNa0ZDT1VOQ1JUY3lSRE5GTkVORE1UazJRa0U1TURZd09FVTRNekJFT1RJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '64d40056-fe1b-424f-9c96-d2bd4abe687f',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '470'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlEwOVdSVkpCUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRNek5EUXlORFkyTnpBNE9UWTBOQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'b5c14656-6ed4-4b7d-be37-6b1e3d7d3d0a',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzYhTURBd01UTXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlEwOVdSVkpCUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGVjBsVVNGSkZVVlZGVTFSUFVGUkpUMDVUVkVsTlJVOVZWQzB3TkRjME9UQXpNemc0TXpReU5UWXlOQzlDTlRVNE1USXlRVFl5UTBJME1qRXlRa05HTWtFd1JERXpNek0wTkRGQ01TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'b43808a0-9f7d-4e7d-a031-f8a966de4af9',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '491'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxUlBVa1ZCUTBWU1ZFbEdTVU5CVkVVdE5EYzFORFEyTXpjeU56Z3lOakl4TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'fd085814-d26a-4072-a2d8-ed4786e0a2c8',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazVJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxUlBVa1ZCUTBWU1ZFbEdTVU5CVkVVdE9UYzVOemN6TmpBNE16SXhPRGMyT1M4d1JFTTBSRU5GT0VOQ1F6YzBOemt4T0VZNU5USTRSRUpHTWpoRFJUVkNPU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '4c467555-52e5-40db-a816-8ed6dae7c268',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '432'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTB3TWpnNU56STBOelUzTnpBd05UZ3dNVFVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '30cad7d5-191a-4224-bd05-3a65e4338904',
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
  'Thu, 25 Jun 2020 12:03:37 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTB4TlRBek56YzBPVEUwTmpNNE1qZzVOUzh5T0RWQ1FUQTNNa001TlVFMFJVSXpRVEF5TjBSRE1qRkNPVFkzT0RBek55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '448e5c75-fe87-4bcf-8bf3-bfa95e95def1',
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
  'Thu, 25 Jun 2020 12:03:36 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTB6TURFeU1UUXlOamsxTWpBNU9EVXlJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '81fe340f-1c83-4af7-b99b-adc2877818d6',
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
  'Thu, 25 Jun 2020 12:03:37 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTAwT1RNNU56UTVOVEl6TmpBNU1URTRMekE0UVVFMVJqSTFNVEl5TnpSR1EwUTRNVFE1TkRjMFJqZENOalZCTnpReElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'ff2f6098-4022-43a7-b8f0-0b339b7e3b3b',
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
  'Thu, 25 Jun 2020 12:03:37 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTAyTlRBeE1UZ3hOakUwTURrMU9UQXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '45f205c0-2746-4ac0-8369-91ed3181af22',
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
  'Thu, 25 Jun 2020 12:03:37 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTA0TkRFNU5EY3dNRGMwTWpJMk5ETTJMelJDUWpNek1VUTFPVUUzTXpSR1JFWkNNMFEwTmpVeVFUSkdOakl5UmpBMElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '9d672cea-0370-4787-a3b0-5a53c008b7c7',
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
  'Thu, 25 Jun 2020 12:03:37 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGUVV4TVZrVlNVMGxQVGxOUFJrRkRSVkpVU1VaSlEwRlVSUzB4TURjNE5UVXdOakV3T1RZME9UTXdNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c492b404-b508-4627-bc99-d9a68e129662',
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
  'Thu, 25 Jun 2020 12:03:37 GMT',
  'Content-Length',
  '400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  '0bce2b3c-9b1a-4aa3-864c-a1b5000e601d',
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
  'Thu, 25 Jun 2020 12:03:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGUVV4TVZrVlNVMGxQVGxOUFJrRkRSVkpVU1VaSlEwRlVSUzB6TWpZNE5EazNNVGd4TkRJeE9USXhMekZDTXpKQ09EVTBNalUyUlRRM1FqTkJNekEzUXpnMk16RkdSalF5TjBVMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '1dc1e6a7-d52c-41df-8bcb-2b7e5497eddd',
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
  'Thu, 25 Jun 2020 12:03:38 GMT',
  'Content-Length',
  '459'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGUVV4TVZrVlNVMGxQVGxOUFJrRkRSVkpVU1VaSlEwRlVSUzAzTnprMk9USXhNak15TkRBNU5UQTRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'a4f47b72-db30-4ec2-98f4-9513bbac2cb7',
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
  'Thu, 25 Jun 2020 12:03:38 GMT',
  'Content-Length',
  '400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGVkVoRlRFRlVSVk5VVmtWU1UwbFBUazlHUVVORlVsUkpSa2xEUVZSRlZrRk1WVVV0TVRnMU56STROak0xTURjeU5UZ3lNaTlGTnpSRE5VSTNOa0kxT0RjMFFqYzNPVFEzUWtVNU5URkRSa0pCTjBRd01pRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0feb7a81-b4d8-4cd1-9196-2c06272238c4',
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
  'Thu, 25 Jun 2020 12:03:38 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGVkVoRlRFRlVSVk5VVmtWU1UwbFBUazlHUVVORlVsUkpSa2xEUVZSRlZrRk1WVVV0TkRVMU9UQXhOelk1TnpJMU9EQTFPRGNoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c073143c-6f79-4d29-aefe-4646abdc6228',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '416'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGVkVoRlRFRlVSVk5VVmtWU1UwbFBUazlHUVVORlVsUkpSa2xEUVZSRlZrRk1WVVV0T0RjNE5qUTFOalUyTXpRd05EY3lNeTgwUlRsRlJFRkVRamxFTVRBME0wTXhPVE0xTnpJNE4wWkJNalJHTURaRFJDRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'eac7b965-5a7b-4329-838a-bbe727896a72',
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
  'Thu, 25 Jun 2020 12:03:38 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVUZEUlZKVVNVWkpRMEZVUlZOUVQweEpRMWt0TWpZM09EZzJNalV6TkRjd05UY3pOU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '6755661d-822f-4167-8f9b-a4b246e4dbee',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVUZEUlZKVVNVWkpRMEZVUlZOUVQweEpRMWt0TlRZM05UZzVPREk1TkRRek16SXhNeTlDTWtNd00wWTFSalJGTUVVME5qWkRRVVU0TlRrNVFVVXpSamRCUVRFeU15RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'fffb8858-5604-4967-b7aa-3483f4864f13',
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
  'Thu, 25 Jun 2020 12:03:38 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVUZEUlZKVVNVWkpRMEZVUlZOUVQweEpRMWt0T0RBNE5qVTJNVGM1TlRneE1EZzVNaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '084eaecb-ea53-4b42-b2fe-bf18fe69de6d',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '384'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVU5GVWxSSlJrbERRVlJGVjBsVVNGSkZVVlZGVTFSUFVGUkpUMDVUVkVsTlJVOVZWQzAyT1RJM09EazRPVGsxTXpJMU1ESTRMelpDTmpJMVJUTXlSVFl6UkRSRE9EQTRRelZHTXpBM05ERkZNRVU0UkRaR0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '2f9c3f81-ba91-418b-bab9-2910d84a3cdb',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMweE1qRTVPVGszTVRVME9ETXlOamN5TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '25317409-ebd6-4f28-b015-ea4749c74933',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '390'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMwek1EazVOelUzT1RBeE1qZ3hOVEV5TkM5Rk56Z3lOVFJCUlVGQk1VTTBRVVl3T0RaR1F6QkNPVFl4UVRORk5EZzRRU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'e329587a-7e3c-44ba-94d5-8b7190d72b07',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '448'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMwMU9UUTVPVFF4TVRRM05EUXpNVEl4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '46a7474d-7850-4a93-8041-96c53769de81',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '390'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMwNU9ERXdNek16TVRnd05Ea3hNVFF2UWtReFJqZzVORU15TTBZNU5FSTFRamt5T0RsRk56QTJOamN3UmtSRlJUVWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'cadc756b-3adb-4880-acf7-55ec6042ecf4',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-22567097283112192')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-22567097283112192"}}, [
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
  'westus',
  'x-ms-request-id',
  '8b8e9693-9b41-4d16-be35-e03a30ae4bd6',
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
  'Thu, 25 Jun 2020 12:03:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRRMUpGUVZSRlJDMDNNRGszTlRNNU5USTJNVEV6TWpNNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '863a97e5-2924-464f-9eca-cf6bd3ee2132',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '395'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNjghTURBd01UVTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRRMUpGUVZSRlJFSlpSMFZVVkVsT1IxUklSVkJQVEV4RlVrWlNUMDFIUlZSRFJWSlVTVVpKUTBGVVJVOVFSVkpCVkVsUFRpMHdNVEF3TVRFNE1qVXpNekF3TnpreE5pOUVOVVpCT1RCRU9EbENNRUUwUlVWRVFUSTFNall5TTBZeE9ERTJOa1JETXlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '08da4b6a-f40d-4eb2-b98f-d5e3dcde5869',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '534'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRRMUpGUVZSRlJFSlpSMFZVVkVsT1IxUklSVkJQVEV4RlVrWlNUMDFIUlZSRFJWSlVTVVpKUTBGVVJVOVFSVkpCVkVsUFRpMDVNVEF4TXpFMU9EVTRNREV5TVRjNElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7ba0e7c4-6ccc-4f36-b905-66065236cf6c',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXdJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRSRVZNUlZSRlJDMHpORE0zTkRFME5URTVORGMzTmpBMEwwVTFOamczUVVOQlJETTRNRFF6UkVKQ01qQXhRVEV3TkRGQ1JVVkRPVU5FSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ed4e1f38-3bc8-45cf-8e94-0e83c97ad2cf',
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
  'Thu, 25 Jun 2020 12:03:39 GMT',
  'Content-Length',
  '454'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRSRVZNUlZSRlJDMDVOak16TURZeE1qZzBOVEF6T1RBeklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '16424a7d-647b-4e28-a1d2-984ba5eca941',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '395'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRVa1ZEVDFaRlVrVkVMVFV6TURnME1ERTJPVGd3TnpReU9Ua3ZSREpGTlRBME9UVTNNREUyTkVRMU4wSkJNelUzTmpZMlJVVkdSa000T0RraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '1348fdb8-3de9-40f6-8cde-9810f2732781',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '454'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVlZUU1U1SFFrVkhTVTVFUlV4RlZFVkRSVkpVU1VaSlEwRlVSVk5RVDB4TVJWSXRNek00TVRnME9Ea3lPRFF6TWpreU55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0f1e8040-d90c-434a-a4de-d0d494bb1608',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '395'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXhJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVlZUU1U1SFFrVkhTVTVFUlV4RlZFVkRSVkpVU1VaSlEwRlVSVk5RVDB4TVJWSXROek13TlRjeE1ETXlOalUwTXpBeU5TOHlNRUl6TUVSR1FVRkZOekEwUVVGRU9FVTJOemxHTVRreFJqbEdPRUZFUlNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'effac7c7-1e35-4108-8e95-4773c6130d65',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '454'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVlZUU1U1SFIwVlVSRVZNUlZSRlJFTkZVbFJKUmtsRFFWUkZMVE0zT1RjM016a3lPVE13T1RnMk9UUWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'd14972e7-787a-441c-8594-d1fb0e041aee',
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
  'Thu, 25 Jun 2020 12:03:41 GMT',
  'Content-Length',
  '379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXpJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVlZUU1U1SFIwVlVSRVZNUlZSRlJFTkZVbFJKUmtsRFFWUkZMVGcxTkRNeE1qVTJOek13T0RVMU1qTXZNVGt5TnpNME16a3hSRFF5TkRJMU5VRTVSREE0UmpVd01qVXhNa1ZETWtRaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'fb1cca1e-6c33-4913-88d3-bdd95fb1804a',
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
  'Thu, 25 Jun 2020 12:03:40 GMT',
  'Content-Length',
  '438'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-7880594307595072","deletedDate":1591051293,"scheduledPurgeDate":1598827293,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-7880594307595072","attributes":{"enabled":true,"created":1591051293,"updated":1591051293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-39382228416345266","deletedDate":1591014318,"scheduledPurgeDate":1598790318,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-39382228416345266","attributes":{"enabled":true,"created":1591014318,"updated":1591014318,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-45964389048784704","deletedDate":1591012356,"scheduledPurgeDate":1598788356,"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-45964389048784704","attributes":{"enabled":true,"created":1591012356,"updated":1591012356,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
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
  '63a90dc5-97b8-4506-8966-fd892ca0a75d',
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
  'Thu, 25 Jun 2020 12:03:41 GMT',
  'Content-Length',
  '1373'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/listKeyName-listdeletedkeys--0')
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
  'db57a207-013d-4322-a054-f489e3be6dde',
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
  'Thu, 25 Jun 2020 12:03:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/listKeyName-listdeletedkeys--1')
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
  '5d1e2e96-fafa-452b-98bb-1e14c579678e',
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
  'Thu, 25 Jun 2020 12:03:41 GMT'
]);
