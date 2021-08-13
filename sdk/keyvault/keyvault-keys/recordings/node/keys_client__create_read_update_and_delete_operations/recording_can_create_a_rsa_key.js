let nock = require('nock');

module.exports.hash = "c1ddf333069ccf3d34dd2b18b2bee419";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateaRSAkey-/create')
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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'eca11290-6a4d-42ea-bbbc-18388ab37caa',
  'x-ms-request-id',
  '951da7ad-de22-4996-ab6d-3893be0ca5b7',
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
  'Wed, 28 Apr 2021 21:23:04 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '3c0aee28-9fb3-4161-b786-931e7d8d4901',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6UwMAAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:23:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDUNr40p84g0AVzzR6QzWljsGB80cNh1O7GdnrRhlkIPMCvsbvQ0af8faWUQkaEu2cCIuVKF9yXi4fsDq8CTbp_cYVBRb6mTo3rmzHoZJUo7iFll3veeV0InwVvBCs_niDOLbyj97qWDgRuuEMx8WC7cBnfmeAxukmxSA15Fi5uAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:23:04 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '78ca8339-4e14-4418-b2c8-9ef257fad001',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6UwMAAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:23:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrljzyGd5hdyM6uTq9rieQlf7ArdQOBfFU8KLFWKpkU9gz7aFe_-2tiN2b5WvAtuppwDRofG9HMgiQFz_f89rzrrwy5ewOuCkoAWl6PvqE15XrhxOwVNvMlDowfEsl3NIcms0ebKinGdp8nKptcTBgDDscnq58t7m5mBzz7LhThGYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:23:04 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '9fc12fe8-93d6-47a4-b375-aa2cc290de00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6UwQAAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:23:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:23:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateaRSAkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-/4845e6a70e234ff096cf44b1af33f4bc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oQEOJQXrfrQNf5xuxvodr34FvFgZHEjBxZg9jZC_ZXkhTEk7oHQ902C2MmDVW8uameGa2t_H28usGOZXTm5Z8QqolXuB_knmkzXF54HupkV54EqWAz-5-u2nAmxKP0P4MaGDpiwtdnBgK9CPs1RSYW8Mpn2-zZLqKlkPmuf_dIUAemdRaMw-hwR6XiZENBiblt0GOB0AJQJHf7qvnB8nUv88uL-bjD2zLGoxZeml5ncewUt4vxD2HPEa6awv0-DRYcXtHoMWaJXwGiJ3iktt3Ch4N87Cph4XzEgFeJCN62RfQTdj9eH9IU02aU11HkrnxWhAte5Truc_hftqBdlTxQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619644985,"updated":1619644985,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'eca11290-6a4d-42ea-bbbc-18388ab37caa',
  'x-ms-request-id',
  '7bf12369-2654-4418-9a5f-e79f31611611',
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
  'Wed, 28 Apr 2021 21:23:05 GMT',
  'Content-Length',
  '719'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-","deletedDate":1619644985,"scheduledPurgeDate":1620249785,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-/4845e6a70e234ff096cf44b1af33f4bc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oQEOJQXrfrQNf5xuxvodr34FvFgZHEjBxZg9jZC_ZXkhTEk7oHQ902C2MmDVW8uameGa2t_H28usGOZXTm5Z8QqolXuB_knmkzXF54HupkV54EqWAz-5-u2nAmxKP0P4MaGDpiwtdnBgK9CPs1RSYW8Mpn2-zZLqKlkPmuf_dIUAemdRaMw-hwR6XiZENBiblt0GOB0AJQJHf7qvnB8nUv88uL-bjD2zLGoxZeml5ncewUt4vxD2HPEa6awv0-DRYcXtHoMWaJXwGiJ3iktt3Ch4N87Cph4XzEgFeJCN62RfQTdj9eH9IU02aU11HkrnxWhAte5Truc_hftqBdlTxQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619644985,"updated":1619644985,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '68da5a0c-8878-42b2-8b9c-1ec24975d980',
  'x-ms-request-id',
  'e82e7105-4e25-4084-bd0f-cc8fd8f40728',
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
  'Wed, 28 Apr 2021 21:23:05 GMT',
  'Content-Length',
  '883'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b1986a58-71a1-4407-b851-8c5631e508c1',
  'x-ms-request-id',
  '0fa06c23-d9c8-4ad9-959a-84116f58b74f',
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
  'Wed, 28 Apr 2021 21:23:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '04496d51-f28c-4a4d-9264-4dd7941eae6d',
  'x-ms-request-id',
  '7b5d2aba-a172-4501-8ad3-089710f6ff77',
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
  'Wed, 28 Apr 2021 21:23:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd11c8c7c-0447-4a05-b4a7-ab96cef62e68',
  'x-ms-request-id',
  'be04d6a0-7fac-4240-b142-08bd217228c7',
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
  'Wed, 28 Apr 2021 21:23:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2e020d31-f8a3-4144-90da-3ee8a4a94dd4',
  'x-ms-request-id',
  '2ca5cbbf-d2ff-4514-9ffa-1ad8ce3b3fdb',
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
  'Wed, 28 Apr 2021 21:23:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '72584099-a9b8-41a5-8d48-af8b3272c4cc',
  'x-ms-request-id',
  'b5b40606-c30f-4f0b-9600-50260007c9d7',
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
  'Wed, 28 Apr 2021 21:23:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkey-","deletedDate":1619644985,"scheduledPurgeDate":1620249785,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkey-/4845e6a70e234ff096cf44b1af33f4bc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oQEOJQXrfrQNf5xuxvodr34FvFgZHEjBxZg9jZC_ZXkhTEk7oHQ902C2MmDVW8uameGa2t_H28usGOZXTm5Z8QqolXuB_knmkzXF54HupkV54EqWAz-5-u2nAmxKP0P4MaGDpiwtdnBgK9CPs1RSYW8Mpn2-zZLqKlkPmuf_dIUAemdRaMw-hwR6XiZENBiblt0GOB0AJQJHf7qvnB8nUv88uL-bjD2zLGoxZeml5ncewUt4vxD2HPEa6awv0-DRYcXtHoMWaJXwGiJ3iktt3Ch4N87Cph4XzEgFeJCN62RfQTdj9eH9IU02aU11HkrnxWhAte5Truc_hftqBdlTxQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619644985,"updated":1619644985,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'b5aab497-177b-4806-bea8-870c24f8bbdc',
  'x-ms-request-id',
  'e486d18a-a9ce-462d-9962-d7f6fb539fb8',
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
  'Wed, 28 Apr 2021 21:23:14 GMT',
  'Content-Length',
  '883'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-cancreateaRSAkey-')
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
  '20b88072-1917-45ea-b660-309523772b5e',
  'x-ms-request-id',
  '400bf0e9-2b4e-4348-bfaf-06b50640d24d',
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
  'Wed, 28 Apr 2021 21:23:13 GMT'
]);
