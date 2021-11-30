let nock = require('nock');

module.exports.hash = "37f1819f3583f1c2d9c4f749684f89d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f4cd2108-6ca0-4614-8872-7c3297da567c',
  'x-ms-request-id',
  '985cf03c-cb60-4499-b951-7f8af0ee5572',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:18 GMT'
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
  'bf187d7b-f764-422b-bd20-b6f4fb904201',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAAswFp9AIAAADMdZvYDgAAAA; expires=Thu, 02-Sep-2021 17:37:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevri222qBAm-7GzYxPjx8yfx66E8_ZZWNqOcfAAnrF7a2fajyXjTe5g-bfxsPuJNNZr0yNO0IJY7I9RdeUT2DySNPSxb1nZdU4nPqu2LIqyYsWkBxdhoGCghGqBfgXEWaMig8mS5QzIedCWFbsKQ7Yr-s2L9Gyw0O9_wIGf6YTIDKkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:18 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '18b0dc39-b4c5-46a0-aea4-dae2dd173301',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAAswFp9AIAAADMdZvYDgAAAA; expires=Thu, 02-Sep-2021 17:37:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2IAgqPAuX7Km4dKaTsLagZR77ihChuu97WPOA3pLb31LfjS0so87QZPHrF_JLb1swxp_LgZF-4WN4chMSw2szksS4UIYiA2ehMGn4P2mjnnew_DwjQ6GU8i8oSGU1VABrBfmnQFr033JoCVpQdy4A8V-Fid4NEcGroC2JiK1GqsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=a1410e20-d5ca-42f4-9bee-0485c1a64c54&client_secret=azure_client_secret")
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
  '1918afda-8c47-49a2-9b8c-c3d2faab2a01',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAAswFp9AIAAADMdZvYDgAAAA; expires=Thu, 02-Sep-2021 17:37:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:18 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/c56ab5121cf44426b6e398319604a407","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tlz1DXJA8kQD3KAcwO58pUcOiSGnXzEaAjJOUDIr3bzaifWYCHNAMNz9TWNDbW0y3yKrmnZPWUJrn-oCjFNUpBQsXwReGfkhasBAgWhCTmLzYr1z5KslPnBdhL9Q6aOCZ9Gma1EUeiq3kftCwEZjBDFPlRnclJc9gj74TG6dWnjOfwFhtmATgrVW6wFzGicthRMIs_InEI4nunja8IHAfT7JNYpHeOmZ-GQVwywPW1Qn2Had_s2T3Lx6n22bN5lPnj3mL4cFIb1dvvq8XEGKWtfvqGN8fv3lNie1UtW3wpBs7NHNUCaubmshtrtzqiiswcysfV1zgyz33Dq8WZ0fhQ","e":"AQAB"},"attributes":{"enabled":true,"created":1628012239,"updated":1628012239,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f4cd2108-6ca0-4614-8872-7c3297da567c',
  'x-ms-request-id',
  '75944c59-b075-4efc-a4db-b8bb2115acfc',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:19 GMT',
  'Content-Length',
  '748'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/18fa18ad505a4e0e82e84aefb546346d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oSWAJL4Maw0y3TKsbiZJi4OaePZdzDQ5HnwAvd_TsRYh29hm4pOWyTbAU7rvA5Cnfb4PS0jY0QzmcynqF0YHO5vO6SMM7dI2j1Lpt5m1ALPAGzpuy-_rCuVc6zSRR_7h4H2xBuLPXFpa7RP26FDDwQsCScCHR5TBlra6PBALcbgiXewlb0EKGuewr33T7dxlZ9ogofGTT0pVA9cc3qmvIGVUAu1ujotZDG1xHlfhyqOioepJDCU9o9BsTNNi4_EJkrrqm2t8g7bvkM-CmItyAjTeAtNDbo4mzpzp-15xdJY3OMD-cF02wctjxvjDd1OR7d671hCh9r7HgR40I07arQ","e":"AQAB"},"attributes":{"enabled":true,"created":1628012239,"updated":1628012239,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '5f6a92da-0d9a-40f8-a6e1-32c97cd1b3ab',
  'x-ms-request-id',
  'ff9b49bd-840a-4222-8855-d46940ae036c',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:19 GMT',
  'Content-Length',
  '748'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/c56ab5121cf44426b6e398319604a407', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateakeyspropertiesforaspecificversion-/c56ab5121cf44426b6e398319604a407","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tlz1DXJA8kQD3KAcwO58pUcOiSGnXzEaAjJOUDIr3bzaifWYCHNAMNz9TWNDbW0y3yKrmnZPWUJrn-oCjFNUpBQsXwReGfkhasBAgWhCTmLzYr1z5KslPnBdhL9Q6aOCZ9Gma1EUeiq3kftCwEZjBDFPlRnclJc9gj74TG6dWnjOfwFhtmATgrVW6wFzGicthRMIs_InEI4nunja8IHAfT7JNYpHeOmZ-GQVwywPW1Qn2Had_s2T3Lx6n22bN5lPnj3mL4cFIb1dvvq8XEGKWtfvqGN8fv3lNie1UtW3wpBs7NHNUCaubmshtrtzqiiswcysfV1zgyz33Dq8WZ0fhQ","e":"AQAB"},"attributes":{"enabled":false,"created":1628012239,"updated":1628012239,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '93ef0c07-d107-4052-9190-411825aaa567',
  'x-ms-request-id',
  'b779767e-52da-4c33-9777-be0b5a0d045c',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 17:37:19 GMT',
  'Content-Length',
  '749'
]);
