let nock = require('nock');

module.exports.hash = "71d5c67b938ea3caf2750b37e88fc138";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable164012520204504440"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNfT1drYTlNcEpTeFM0NHZBbXRSRHNKelFkeFJPNkxfQkF5VHNXUVhEeUUiLCJqa3UiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC9rZXlzIn0.eyJpc3MiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC8iLCJzZGstdGVzdCI6dHJ1ZSwieC1tcy1pbml0dGltZSI6e30sIngtbXMtcnVudGltZSI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJraWQiOiJmYWtlLXJlbGVhc2Uta2V5IiwidXNlIjoiZW5jIiwiZSI6IkFRQUIiLCJuIjoidFNjQlVVWDEyV2NxNVlQSTVzSWhwejhQNElHZ20yUVpHR2FIcVItd3JROG42WEw4d0NRZXJNdDlCejdmb2dVdVpQNVNlTUJ0RUh5TlhfRUtaZEd6OGNjRlA0VmhkRmh6MXJFNW1vTUcwcm9jZTZ5TEZQOHlqZTMxYmpiTnJhVnlYUUR3R1ZndE0zNXBsdmlkVXI3bUZYdGpTWUpkMFZwcGxOeFNza3RKQmhQWEtPUnpTd1VHVnFjZEktU2V4OU51WWZfYTV3TFdEWkxoZU9Td05LYjYxSlMwUF9VRUFPbERrMHcxb3JuZkFaOTVnZThHRXR6bE5HajF6eVFKUW5ob0l1TWkxNmt1NHdpWV8zaFFCYnZQOXVSRVF2Q1RlQ2RVNHEyUW9rd3dHOC05cmhMaEdma2s5S2dwMk9ab0d0Uk5JREsxMjdfLS03Tk5pcTBrQVNqZDFRIn1dfSwibWFhLWVoZCI6InNkay10ZXN0IiwiaWF0IjoxNjQwMTI1MjAxLCJleHAiOjE2NDA3MzAwMDF9.F5573uhRrLcU6xGI5XuCYORtBfPp5whlpdDW-EnEwwUGvMe9p4RgyoVbEM_zqlCf4fKTIDjdccsSp_Hv53QgCcLrr8fvCStgdLBB6s5nauXZfcB8LspXzoezqHsz2TuU9A_qLja36B71pD34iJj_-bYHamJ3g6QjqResV3-QGe16DSj4nkRI1j8SkY--x3sgG3JYfQJ0QCp_EDnCAxoyJFIO2C4dvObEsC2PgFuPM4lPvGGK9F-mt5XFhXNbWK5feJ8kH9dbCOTgOVH8MQBPzS1_qEMuJUSv8nCHPXvfr0NdvM3D9z1KrydqNyporHORdN8NTY1JEVjo_JEt-XVYsA"}, [
  'Content-Length',
  '1307',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"51b-s+34oGWOI9848HNcjHK9OPg4lvU"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT',
  'Connection',
  'close'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable164012520204504440/create')
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
  'de1c84dd-7b97-4efb-9760-99fd0cb9db32',
  'x-ms-request-id',
  '9d2517a5-3e08-4b45-854f-789bd5de4dba',
  'x-ms-keyvault-service-version',
  '1.9.226.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT'
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
  '4c6c4380-fb90-4055-876d-d15f96843800',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtOvPUWjFtJJnhz2td_AVek; expires=Thu, 20-Jan-2022 22:20:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrstx0wBmD9bEtGqbRf-FTHca4Wr09-FFVsBLu45MKKvkMVExR4pwW1WJbYHUsgwZhieHa5drjcz9PFT83j-JE9NY43nJqz5ASI_0Ztw7wR3_VzbYDLPJM5yZHk8e4j09KHo0dEbDUZNh282sSCvx3LR0Q3boQ-V0lgaFROKroPYkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT',
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
  'dc463c3c-c6e9-4194-941c-f92a1eaf6100',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgWRIxtXZgZBpfvZExm7eAw; expires=Thu, 20-Jan-2022 22:20:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriFeuq_9lZGQWBAJ2NBWWfLS1NGl_SzWzQlkFiRVeudg-TPn7niHTiU1NCv4fPTK_8vpv5_SeIyna_hhnQ0hVc3d0_X1bLbaPvTVAX3ZXdQ0yrc4xe1SNmYP8y1KEQKeakgPjSouzikoLZUluEYLWAVnF8NhOIJHs2ZZWu0cVDQYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a2d22322-ec53-4e69-8b7d-f486e179e02c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '3f0add06-c986-4810-8102-1a6b84f24b00',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AihJuaI1tTJBnuKfUBAp3KwDBgNGAQAAABFKVNkOAAAA; expires=Thu, 20-Jan-2022 22:20:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable164012520204504440/create', {"kty":"RSA-HSM","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYWxsT2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wLjAifQ"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"AKV.SKR.1005: Non-exportable keys must not have release policy."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  'de1c84dd-7b97-4efb-9760-99fd0cb9db32',
  'x-ms-request-id',
  'cafac322-1109-4f76-be70-97e656463b80',
  'x-ms-keyvault-service-version',
  '1.9.226.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '41066385-37cd-5a3a-83db-c5df12b11057',
  'x-ms-keyvault-rbac-cache',
  'ra_age=8621;da_age=8621;rd_age=8621;brd_age=22371;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT'
]);
