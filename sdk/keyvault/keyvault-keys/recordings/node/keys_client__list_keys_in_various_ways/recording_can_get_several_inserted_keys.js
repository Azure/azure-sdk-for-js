let nock = require('nock');

module.exports.hash = "0e9231045e342442736a95e3e0e916f7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-cangetseveralinsertedkeys--0/create')
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
  'westus2',
  'x-ms-client-request-id',
  '498ad37f-1c6e-4e2d-927a-4af29f114339',
  'x-ms-request-id',
  'c1b991d1-26bd-4c17-b3b6-8d5602355c6d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:47 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'ce6b1385-9e52-4830-ba44-ab9c1ce63001',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw0AAACTwBvYDgAAAA; expires=Fri, 28-May-2021 20:51:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjLNUXyRebyFPIeXhruseVCc-lORFAnyAVe164gDpyv2s4914Bzv4Qf6HMdMZAFT0Veqeur4zTUFHDZhYNGm-HjqSY3DIWhFUpU2XTEZLd8Y3MKLJOZNKcI8G9OGTxK_GHCmoxQ5prFZmKYMDzRbwUcsbcT9azI1HzuLntzhe8_EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:51:47 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'c47a26d8-fbeb-4813-95a6-6ade30ec4401',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw0AAACTwBvYDgAAAA; expires=Fri, 28-May-2021 20:51:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxYgNR-Ox0ZzeVd3laQ1vttyiVjIUEoSZrNzxhHOyuiWSs-yuANFkmrM8u2NyR6BRGaZPwcoh_Q0f9UmeaSnwSlXzeqoOoPIQuZNWWEkYR33e84HsFQh0I-4eNTAIVoAzhqQhRoZqzFIgCfKSANGMBN0XcBo05_8VmnsOJ_tPV4EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '59be9ca1-3141-4a1b-8056-7be0f4758f00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UwkAAAC_wRvYDgAAAA; expires=Fri, 28-May-2021 20:51:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-cangetseveralinsertedkeys--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--0/8a494f175cc04f9992fbebefae6731b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vYOyHLTE0NvAM89ibSmtyVylzvjiKkZ9QGAMhGFeGKNtFZb4YjfzMWY03ywgPfdjswpJSwmhenD4JQ_gC0Z9WkMUFhkpUM2w5uRDqGFzvCsHvh--NJUkk_wGvuMfCCgT-waR9Sk9cyrReFHo59JvDXmETjeaFDynUm2vOFa75Ou0ReJPK9oG2XMc-iP8ABSAbGXIgz-sJo4RHp2Jc3N6O827Gzo8LJs5hvp5ShAzgmb1_up4n3SZvXmzxDP91h7FgpXxOxS1vRAl-nTjX7bo4c7YELUAGmD-pZwZMRwAh5R_uRCU13Rjm21syoh34ZPrFZ0Y1uIZhmiZPw76nToBHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '498ad37f-1c6e-4e2d-927a-4af29f114339',
  'x-ms-request-id',
  '7d21b47b-bcab-4e53-b545-cd1fd5e432b0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT',
  'Content-Length',
  '732'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-cangetseveralinsertedkeys--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--1/07aab93f9a474ef6af4e529fd5191fb9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tzf2Nzw6RBWk4yDrugXZap_nE1IhGWKLNA1c7rdnBtOheEK5MCPj-m2uV5q-geSooiD-ScnDRlZv9dQ5AayirjartFfjay4Mg7zEgpyK7BDw5y-k7x807aD-b2fEiq_6AePXMuCznhCEJvDhVEc_PXyMIXn7vMWETYV3Ch7kVG42SzCeV-sT106HcxRwzSDiX29OtTCiXlQd0TDX2JctVet4-5r1ACjZLEQq0QBaeYEPrYORAqfvp7zv2oBL9Jn3xuPlNji-esBu4tDR7D4KTuKCm3_c2eZOujjgS5ZZIlCyVi2g7aKSPcVrSz0C4ZWJ9IgUZWKNXuu1c7q4zXHqgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f0bdb0bd-2504-492e-aa31-0fec1ad4024f',
  'x-ms-request-id',
  '5f05d451-6ef4-4e3d-8821-eb7c683a36c8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT',
  'Content-Length',
  '732'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--0","attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--1","attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '97bc29b1-b427-4d32-b77f-4d266dc84a6c',
  'x-ms-request-id',
  '34d9c4f5-d849-45d6-9856-be9fe9bed574',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT',
  'Content-Length',
  '527'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys--0","deletedDate":1619643109,"scheduledPurgeDate":1620247909,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--0/8a494f175cc04f9992fbebefae6731b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vYOyHLTE0NvAM89ibSmtyVylzvjiKkZ9QGAMhGFeGKNtFZb4YjfzMWY03ywgPfdjswpJSwmhenD4JQ_gC0Z9WkMUFhkpUM2w5uRDqGFzvCsHvh--NJUkk_wGvuMfCCgT-waR9Sk9cyrReFHo59JvDXmETjeaFDynUm2vOFa75Ou0ReJPK9oG2XMc-iP8ABSAbGXIgz-sJo4RHp2Jc3N6O827Gzo8LJs5hvp5ShAzgmb1_up4n3SZvXmzxDP91h7FgpXxOxS1vRAl-nTjX7bo4c7YELUAGmD-pZwZMRwAh5R_uRCU13Rjm21syoh34ZPrFZ0Y1uIZhmiZPw76nToBHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bf09403f-0641-4d2b-898f-a9341bda4ca3',
  'x-ms-request-id',
  '927afa73-490c-4c5a-9f1f-c48f2beeb7b0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT',
  'Content-Length',
  '909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e207a7da-04c7-4ee1-8b8f-253842b91cac',
  'x-ms-request-id',
  'b18a8a81-945c-4aed-8462-2a88d621d60f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f51f0d7e-a164-4f11-bc2f-c4ee7d898d54',
  'x-ms-request-id',
  '342783e8-ff51-4fe5-bc12-866e56a91b4c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bd171cfe-817a-4fc8-b01a-08200581eab4',
  'x-ms-request-id',
  '0cb11777-6bdf-4575-81e7-83e8f6927de1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '540d698b-9ab3-4e8a-9ec4-417e3f157c04',
  'x-ms-request-id',
  'd77c85c1-02ec-4256-a7ba-67ada6a37f10',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'addd8c14-f20d-4c33-a8d6-4b6ef25694cd',
  'x-ms-request-id',
  'b9382adb-f4ad-45c3-9298-c250a06a3ab0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fa3aae8c-ae65-48e6-a2e2-f4f6e20e196e',
  'x-ms-request-id',
  'b831b73a-96ca-43e5-b9a0-77295f7400bf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys--0","deletedDate":1619643109,"scheduledPurgeDate":1620247909,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--0/8a494f175cc04f9992fbebefae6731b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vYOyHLTE0NvAM89ibSmtyVylzvjiKkZ9QGAMhGFeGKNtFZb4YjfzMWY03ywgPfdjswpJSwmhenD4JQ_gC0Z9WkMUFhkpUM2w5uRDqGFzvCsHvh--NJUkk_wGvuMfCCgT-waR9Sk9cyrReFHo59JvDXmETjeaFDynUm2vOFa75Ou0ReJPK9oG2XMc-iP8ABSAbGXIgz-sJo4RHp2Jc3N6O827Gzo8LJs5hvp5ShAzgmb1_up4n3SZvXmzxDP91h7FgpXxOxS1vRAl-nTjX7bo4c7YELUAGmD-pZwZMRwAh5R_uRCU13Rjm21syoh34ZPrFZ0Y1uIZhmiZPw76nToBHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '88970c07-59d7-41db-8324-3c0a3fe61932',
  'x-ms-request-id',
  'f0401870-cfe6-4d67-af8f-607afd541070',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:51:59 GMT',
  'Content-Length',
  '909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/listKeyName-cangetseveralinsertedkeys--0')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '99612e2b-b4f0-42e7-98e6-6a67c68ef6d1',
  'x-ms-request-id',
  '56fb4a10-78a4-43b5-9b1d-7caff3e1758f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys--1","deletedDate":1619643120,"scheduledPurgeDate":1620247920,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--1/07aab93f9a474ef6af4e529fd5191fb9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tzf2Nzw6RBWk4yDrugXZap_nE1IhGWKLNA1c7rdnBtOheEK5MCPj-m2uV5q-geSooiD-ScnDRlZv9dQ5AayirjartFfjay4Mg7zEgpyK7BDw5y-k7x807aD-b2fEiq_6AePXMuCznhCEJvDhVEc_PXyMIXn7vMWETYV3Ch7kVG42SzCeV-sT106HcxRwzSDiX29OtTCiXlQd0TDX2JctVet4-5r1ACjZLEQq0QBaeYEPrYORAqfvp7zv2oBL9Jn3xuPlNji-esBu4tDR7D4KTuKCm3_c2eZOujjgS5ZZIlCyVi2g7aKSPcVrSz0C4ZWJ9IgUZWKNXuu1c7q4zXHqgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0f8b97fe-4e40-4f0b-aeb1-c7e8d6f30765',
  'x-ms-request-id',
  'f06f275c-50f0-4694-ad81-13042db6924b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:00 GMT',
  'Content-Length',
  '909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0c2525e2-5e53-44a3-8ada-86ff40b7f708',
  'x-ms-request-id',
  '19ebe027-d633-4eb4-b056-40dfcc6b89b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '357c52e4-d447-462d-bf1c-81c93cbf0477',
  'x-ms-request-id',
  '5583fe03-ad1d-4134-8307-83a931a513ce',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '52b35606-ff01-43a3-bb79-cb21ccd78722',
  'x-ms-request-id',
  'c6935f72-34f4-4b2c-8014-4ec2fcb2b9bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '07dd96da-54ad-403e-a94e-ce7e46733201',
  'x-ms-request-id',
  '2af5d37b-dfc5-46d3-b0cc-0c6b3aaa96ff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeys--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fdf26b52-c9e8-4558-ab52-3d1885a9aca0',
  'x-ms-request-id',
  '9cec17e8-8851-4c54-9691-7a9d58414a41',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeys--1","deletedDate":1619643120,"scheduledPurgeDate":1620247920,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeys--1/07aab93f9a474ef6af4e529fd5191fb9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tzf2Nzw6RBWk4yDrugXZap_nE1IhGWKLNA1c7rdnBtOheEK5MCPj-m2uV5q-geSooiD-ScnDRlZv9dQ5AayirjartFfjay4Mg7zEgpyK7BDw5y-k7x807aD-b2fEiq_6AePXMuCznhCEJvDhVEc_PXyMIXn7vMWETYV3Ch7kVG42SzCeV-sT106HcxRwzSDiX29OtTCiXlQd0TDX2JctVet4-5r1ACjZLEQq0QBaeYEPrYORAqfvp7zv2oBL9Jn3xuPlNji-esBu4tDR7D4KTuKCm3_c2eZOujjgS5ZZIlCyVi2g7aKSPcVrSz0C4ZWJ9IgUZWKNXuu1c7q4zXHqgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643108,"updated":1619643108,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2da673f6-ea71-42e0-ac77-9d7a9e01bdfd',
  'x-ms-request-id',
  '0b14837f-4e99-4248-9d5b-5a4611876666',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:08 GMT',
  'Content-Length',
  '909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/listKeyName-cangetseveralinsertedkeys--1')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'a2695152-7ba1-40c4-885e-43a1b094119c',
  'x-ms-request-id',
  'c1115f51-8385-45c7-ad27-fc47deca46d7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:52:08 GMT'
]);
