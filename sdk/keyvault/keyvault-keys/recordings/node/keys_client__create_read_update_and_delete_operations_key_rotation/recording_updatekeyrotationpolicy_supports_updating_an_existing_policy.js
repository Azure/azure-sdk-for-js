let nock = require('nock');

module.exports.hash = "11e6e958f4c9616eb52ab30b3123a76c";

module.exports.testInfo = {"uniqueName":{"keyrotationpolicy":"keyrotationpolicy162811056325905459"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotationpolicy162811056325905459/create')
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
  'eastus',
  'x-ms-client-request-id',
  '45d96ad6-1414-40a5-a716-d6412ff09922',
  'x-ms-request-id',
  'b51a6466-0329-44ad-8a7b-0d1cd12d0a31',
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
  'Wed, 04 Aug 2021 20:56:03 GMT'
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
  'c8306b55-04f1-4a1d-8aed-f06d31c4ae01',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ako-ybgyu-xEmwPTUI8x8CKN_3OUAgAAAN_1nNgOAAAA; expires=Fri, 03-Sep-2021 20:56:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbvFKO0JZP0e4ynDenqc2FaMO0HaOCrFwuCWAvdbHN1R2jns5CX7pxrndhJicoH4w5tah1-YVH4YI82hPNitPGzVFUZXNjCMDz1EOhzf4uqKAOIe2JXdgv7FXCJMDjfmfswRUlXE7XptV60arE4f44Bob2Gt70d6JS5i2mx5cFKsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 20:56:03 GMT',
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
  'c6c85d19-18ae-4998-aea5-a46147bb0100',
  'x-ms-ests-server',
  '2.1.11935.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ako-ybgyu-xEmwPTUI8x8CKN_3OUAgAAAN_1nNgOAAAA; expires=Fri, 03-Sep-2021 20:56:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqGUzemiwp4BEj-ODnNccezV5duvVOwMzU7L55l8jkSBXyP-jC92_DqAeJol7SE8a5JlBBOL5lRUjnoSXsv07SlCSM0nB2WFmZn3waUaEHqDbEJFuvkpYlXEkTTBzQs95AEgiwwD6WrTQibOtYXloT9FNfmPObeVRewbYpt_3VHAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 20:56:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=a2807cee-8c8c-442d-a0f7-c8cdafe24934&client_secret=azure_client_secret")
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
  'ccae6b68-540d-42f7-a248-216a33d30100',
  'x-ms-ests-server',
  '2.1.11935.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ako-ybgyu-xEmwPTUI8x8CKN_3OUAwAAAN_1nNgOAAAA; expires=Fri, 03-Sep-2021 20:56:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 20:56:03 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotationpolicy162811056325905459/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/keyrotationpolicy162811056325905459/a79ca5fabe7c4c5984b2d7843f30479d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5-OLcAHW2WAHyvLwP57hKI19BqOCA4VIp0rpJBjh2KXsmjLwP8ykLNqQrDV3gd31qfWlEerddLpyjKaoCEk1g9otkybTdYjtQMVRPdFS8wG7N4_GhEtmwLywsj3ypkGdY-y7pVJT3XNniA223tEVu-0YHWsG2ZFOmHhqKcBdzLwU6lounuOMWrYrRG_I_vEZKJaIpmrVl8CfziyVahNHOAwVtzsKXf83tblI8ZMAAvhRtJN8YWF7FM1nmOfPfph3iyEkLSwCVpDEKWEUxRdUOyVYttdpioA8cHVKiIUMrK0fjcs0OeMV5J88bIwU6IZe8gE5leIHKrb0Wtm-RwzDfQ","e":"AQAB"},"attributes":{"enabled":true,"created":1628110563,"updated":1628110563,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-client-request-id',
  '45d96ad6-1414-40a5-a716-d6412ff09922',
  'x-ms-request-id',
  '670ac019-1d30-4d3d-8e75-5731a9762ef3',
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
  'Wed, 04 Aug 2021 20:56:03 GMT',
  'Content-Length',
  '712'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/keyrotationpolicy162811056325905459/rotationpolicy', {"lifetimeActions":[{"trigger":{"timeAfterCreate":"P2M"},"action":{"type":"Rotate"}}],"attributes":{}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/keys/keyrotationpolicy162811056325905459/rotationpolicy","lifetimeActions":[{"trigger":{"timeAfterCreate":"P2M"},"action":{"type":"Rotate"}},{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"created":1628110563,"updated":1628110563}}, [
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
  'x-ms-client-request-id',
  'ea512208-42cf-46f7-8ad6-1a1b373cd221',
  'x-ms-request-id',
  '9abd8d32-26c5-4b9e-8a38-163957a6b040',
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
  'Wed, 04 Aug 2021 20:56:03 GMT',
  'Content-Length',
  '310'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/keyrotationpolicy162811056325905459/rotationpolicy', {"lifetimeActions":[{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"expiryTime":"P90D"}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/keys/keyrotationpolicy162811056325905459/rotationpolicy","lifetimeActions":[{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"expiryTime":"P90D","created":1628110563,"updated":1628110564}}, [
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
  'x-ms-client-request-id',
  'ee8bbb95-8ef3-4ee9-b92d-1cb3638bcfdd',
  'x-ms-request-id',
  'cd192336-ec1f-43af-b840-480fff0dfe82',
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
  'Wed, 04 Aug 2021 20:56:04 GMT',
  'Content-Length',
  '265'
]);
