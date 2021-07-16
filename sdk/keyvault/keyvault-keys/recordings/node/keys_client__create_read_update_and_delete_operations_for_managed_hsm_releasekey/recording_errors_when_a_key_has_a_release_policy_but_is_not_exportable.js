let nock = require('nock');

module.exports.hash = "d73e305d84d2f50c6a0d4d43e039ab0b";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable162646264721806268"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh2d2xRVk9UZWJJZGgtU3Jyb2JuUGlEZTF4THZyeENteDBVMjM0bHBkUjAiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJyZXpWbVYxRDJUcUJNZ3JSQmlUQ3VHNGRDcG9kMnV4Y3BFck4wVUoyUHNSbDBUMjNxbVhTNHRucnUyZHgtZWpRM3NwR2F3MWt2RjVPZ1JqNVdLMzVQRjV5ZXI3ekdIRU1NTWNVbjhwb3d6cTZJRk5oOHJzTjk3eUxlX1RUUWdhWXVZckVoRlVMMUFjVk5kdWJ2djU3aF9OSVBnN183bVFrTzNTcTBzM2xvV0tIbXoxZEVoTW9wV2FmRXVDZ1hxSTVuUkJTUDBrLTNfYXByRXZsTy1PWjhUbDg3V3JVeks5VVlYMWJ5UlptSUw2ZFV5MHdOY2NGbnk2UC1YT0lHZmhOVE9qS3o1QUxReGprSmpXYklRS2tOODNscWQ1a0tsN0JNZVpITWtlR0F2SjdyalhpZ3ZPclBVSTJZZ3c3SHRMTTNRbTNsdGFLU0dkMndOTkJTY2hmbHcifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjY0NjI2NDYsImV4cCI6MTYyNzA2NzQ0Nn0.dYWHaO02SerbB-ipYWtz96t6v6kDw-uL3qHLypnDIQhFAd_Ax8xjhy7iiCIM2iiRyOqWZXUvXKq7ImjdJxU-GvMBiV86oBsth5zarhrlbiVS6Jah_joUVau__1-6HinEQ4f0r_KUaE-26u1jA8nGRtWtoye7DvbUIVJF8efi9di3zvAVtma87nkrfw7bzu3TDOTMFeAby2aF-EhbGa9ckryeKWDPu6msd-hDg6Z1OAalw2SNMBOtmlZ4LG1cpFx6TGbKlqen_28UVy2Fwnqpz3DBS3DTxVKhpClirVsiQOygXFC7eGt3vH2QH4bG-ffWOmnOuOtRbk2P-rL11Y34Jw"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-e0B7EWjmAkLJu/vA7gfRb+1mChM"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Fri, 16 Jul 2021 19:10:45 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162646264721806268/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '86514096-e669-11eb-a44d-000d3ae28186',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
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
  '8d2caacc-09b3-4603-8fec-535bb99d6301',
  'x-ms-ests-server',
  '2.1.11898.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkonlhTI8OlJrTg_UEVAeTkuyjXLAgAAALLQg9gOAAAA; expires=Sun, 15-Aug-2021 19:10:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8h6qW8pgADjaOUSabeXjok8V9mL1pLL8wQ4zyXZlKhyZm9wl8UK0UfFcYyaBgAFAlVSAzwo8GwmYScHNT10iPJdbfTRe-x5HL6FSPpHi4656ZXTyVqdW2zVcruQNlwx4rnsdFcEE1qX_vMrsoSu0tQ0dN5XdKz1C3TAXov-Gh04gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 19:10:45 GMT',
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
  '22ca0502-736d-4224-b6d3-fa4c7e4eb501',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkonlhTI8OlJrTg_UEVAeTkuyjXLAgAAALLQg9gOAAAA; expires=Sun, 15-Aug-2021 19:10:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGlJU9oUmv-TQbsdAnr8ssghsRGL8QJjBcgi1_m-D2qtUufxl12bo3kzQZuyHunZrXGN1hb7TEHIMSOHudGpYcGh_OHAjImggTQHYXpVKgBxKmFK0WTSXQFByD5tGFQJsQWxMVZilmRiOdbY9fPLt-zHjj5AypwKGxtBms49o1WggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 19:10:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=6d9248d6-42ce-4f1c-a2c4-c4569f4f1a17&client_secret=azure_client_secret")
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
  '320d1d20-2b47-45cc-a612-3d8059f6ba01',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkonlhTI8OlJrTg_UEVAeTkuyjXLAwAAALLQg9gOAAAA; expires=Sun, 15-Aug-2021 19:10:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 19:10:45 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162646264721806268/create', {"kty":"RSA","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyYXR0ZXN0YXRpb24uYXp1cmV3ZWJzaXRlcy5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Non-exportable keys must not have release policy (Activity ID: 8695a9fc-e669-11eb-a44d-000d3ae28186)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '27',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '146',
  'x-ms-request-id',
  '8695a9fc-e669-11eb-a44d-000d3ae28186',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
