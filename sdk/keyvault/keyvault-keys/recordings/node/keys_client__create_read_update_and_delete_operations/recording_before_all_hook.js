let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdatekeywithrequestOptionstimeout-/create')
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
  'westus',
  'x-ms-request-id',
  '19feb8f7-10e4-43ba-8410-d4e3d3d1ddc8',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:12 GMT'
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
  '5c7c44e9-ae20-42f8-ae64-986ec2460600',
  'x-ms-ests-server',
  '2.1.9587.7 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmLa8icMeaZBpP9T3M3EgwE_aSJHAQAAAAexQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdatekeywithrequestOptionstimeout-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekeywithrequestOptionstimeout-/a376afd949924891bfeafaa32e2ad633","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6tFg5q268a4-cltI2Gu0VxECljhvfj5B-XE6JI-0pW3q2pY7w2BDdajmhsW1wp5mzA0FJA6AWJOXq_ELd8SIIKl1LLnBA-sudmTldsqyB4BpURV_f6yUMz3ZQdplvhfAd6RDxsPU4Srr6bE60R20dyU-sBGonC6ZLWUSHiziIzTyO0VL_tMNSdN8-Hxc5PriJnaQa3ZIT9we7LpX02iU5DCirjsJ_DObKpfbxnvYVNv0xukfA1JO-IVZZ60hGjgtVVnjbWK_F-MM5K8B_T_gtZC-Sj5GBAp6870JiYvEMreu9lGfbg3n9K3Gmo6bpDmgLWrhA7Q9DoADxKp-PVfOEQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797512,"updated":1571797512,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus',
  'x-ms-request-id',
  'f3a8e597-d764-4814-884b-4964d4f65126',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:12 GMT',
  'Content-Length',
  '715'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakeywithrequestOptionstimeout-/create')
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
  'westus',
  'x-ms-request-id',
  '4fdfb47f-af2e-4762-b72a-2df336edb160',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:12 GMT'
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
  '52ef7e35-f4d0-43cd-90eb-15d1f9510600',
  'x-ms-ests-server',
  '2.1.9587.7 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmLa8icMeaZBpP9T3M3EgwE_aSJHAgAAAAexQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakeywithrequestOptionstimeout-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakeywithrequestOptionstimeout-/0a728c5c5d1148c68af7286c435a0d98","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"laVnHrw7ZMgIjCZ_gOrC7Dp2EDdJc4Dpojffw7Qv0r0NM8et067JdUhQJg6ZaFdhfBsh4F0f5DJudIdEGZRtf4igHueloH6EwUfg-y1qYEP8VUprd5BR7mbghZ8iTeHvHM60LC1Az-x3XbzIr71Iem1bSnCrVIHjGTrsn2oeRfcE7WLUI9UhvITKrDlpv4HsynqfcJzkkYab8tf6dPOJzXAcAMnO297I4fSayoFI71t9Jr__MdD3qN-yt6UrH0aFeUQDt1Gc4X3CMKTrC5irt7SHrcIiqWIFhcsu52UUZgM9UUcrltWqHpir9sXt1EUv8hOfi3avDO_oVitbBmF_dQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797513,"updated":1571797513,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus',
  'x-ms-request-id',
  '3c6254f9-8e8c-4828-bffa-b8246e369840',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:13 GMT',
  'Content-Length',
  '716'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetakeywithrequestOptionstimeout-/create')
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
  'westus',
  'x-ms-request-id',
  '1ff5b23f-7d23-47a9-8e59-9501f20357c8',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:13 GMT'
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
  '163ac763-f44f-4d49-8d51-8e61f0850700',
  'x-ms-ests-server',
  '2.1.9587.7 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmLa8icMeaZBpP9T3M3EgwE_aSJHAwAAAAexQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetakeywithrequestOptionstimeout-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakeywithrequestOptionstimeout-/0d421f4bafee430ba82b83e5490003c9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xkU0V9yP830qek9AyKb0ap-yZvtQ9uiao1Z0lacmohsgFdm8ysYTRrQSL8uN_wsmD01TMLlqPFMbLIb2gCkvAxbRbeRWpZBF24XOgxUwLw2eovnbAgUWGCgZNRAvzJN4par9hDpMJDvwi4jOjVXB-BQCx0m8vOIJm5p6i4uc5YlYP9WNptlpU9eSD6Ftxsi9DBfeKsJ8sKo_Kj4EjbebXQbtm1BENMMRfFKbDrwppH4LzTaZTi4VoEYOPFtVpJ6OHyk9y25NL1aZbj5KkjklBH8hAx9LkuOCzdELgnd9Z_kxT9EIIaoNxSDEpH5_yPqJ2y9rZD63jB7qUYlWMYSvaQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797514,"updated":1571797514,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus',
  'x-ms-request-id',
  '5cf68715-096b-4548-846a-cb5f7df5f3ab',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:13 GMT',
  'Content-Length',
  '713'
]);

