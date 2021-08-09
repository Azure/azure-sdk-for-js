let nock = require('nock');

module.exports.hash = "ed0144555258e44db57c40caad94ff21";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy162708823795401483"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpfRUZtUTVVQm9lNHJMNUltNmw1cU1rQXN0QXluaE5JQUJ6dFZLQ0RMV1UiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiIybk1uWEZDZk1OeTMtdTA5ZWlHWndNT1FPUWxoamVIby00LWxKV1p1elB4Mm5xQ2ZGbkI3S0VJQ3Z4MDRfTlI3NzRkTzAtSWUwU2ktNzNUUVhBQlJHa0U4NlpuUEVXMHhaVDBHQmNVREhjbmxtWi1HSzhobVNnMkh4dHM5YkJfelNCSUFSdUQ1Sm9Lb0N6RHliWUpucy1DMG5KQnJDNFdQN0lJd0Fhby1KSVVpWTZpcXZyMnpqT01HbmtHcFA2Z0VsbDFqRlBZSTAyZXF6eERfeVlGYld2bzRfbW5uMUs1YzYyWkNjRDRRa051ZFlfNVJhUDVnd3IzZHM2bUxYRlQyRWVKeUZCdnM3M05paTliOWZnNEI3Ym5MZ3V1QWZpdEtlQTdSZUFXNVFaT1VlM2wzUHZNVU96V3g4a3JEYS1MbGlzTE9ncEtja2JsM2lHMnhLcXJIVHcifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjcwODgyMzcsImV4cCI6MTk0MjY2NDIzN30.qfZg0c9Ooo92FnKW9QPW3OCbP5JmjodCAZbXhiEU_AsM3lpjEnSIsiiejjxk8gQ-fEicg9MurpCcI1pQaQIjz3WRFVKmnnNDqlWZ-qAgp7LqhaD9ulNgjOS8qAXEFcdYoYl_KQbetqhV0tQ5_udtqJ7YK-UmFS0hMYoxAkZUWvFOnn4gDO8bmZvcmTq2Vopsl91DwvKibDvEuDHzbg_J31a0QDEexpsMWkBK-Yai3YZcJQCRhf3XHK5crsq3sqiwih8mGTnp--3kYuwzlC-9IMsgzxebmlmZR2A4FzMrLT9G43FbfDcutXBXWTDjZkUSw7euhrwYQMBsoX2is3oSuQ"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-E9X4sMvSJPFxew6BJcIh+Akxv18"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Sat, 24 Jul 2021 00:57:17 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162708823795401483/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '17b3b324-ec1a-11eb-a602-000d3a7a3d40',
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
  '34c4bfc5-0d82-4369-9b7a-71dc1e1a7b00',
  'x-ms-ests-server',
  '2.1.11898.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmyfsY-X8WhCqRyH2U6Lug8e087aAQAAAGpcjdgOAAAA; expires=Mon, 23-Aug-2021 00:57:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrp59T2mOZSXvVABVJJS1QxxFqJAh2zofIi4RtedCGS2RCflMZF85ZgLdmZx7Csp5YAR65q9QW6K6QPWMFwuaYtQb8JgHMyV6wx0uLgFfZMYAo9MxiQZhTY5MsPoIfZ3SYKAovwRVYFKBXtRDNgCJL65_rWIS7r4EcEro8TcjuZS0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 24 Jul 2021 00:57:17 GMT',
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
  '269cb539-8d59-41a0-aee9-a53c0ee53a00',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmyfsY-X8WhCqRyH2U6Lug8e087aAQAAAGpcjdgOAAAA; expires=Mon, 23-Aug-2021 00:57:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrahwY2MGwYNU1Y7PRj9p1yA-zPWUrilPBzmO894qMgEjv9pDmsPRvB05-G8y7y8V0ShaXoJqGH9Q7Mbm4OWumPsCpULqTv2riZYWbT_D38eMXlqT1PQJoh5KsQLbaqLF5NOSKBhtqtFg-mSgYYNKde3RessUC9lUHPVRHngfXSbIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 24 Jul 2021 00:57:17 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=c49396c4-5214-429f-907b-030d14b54a58&client_secret=azure_client_secret")
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
  'a14db1f5-3c3a-45e3-aad7-1a3936994e00',
  'x-ms-ests-server',
  '2.1.11898.8 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmyfsY-X8WhCqRyH2U6Lug8e087aAgAAAGpcjdgOAAAA; expires=Mon, 23-Aug-2021 00:57:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 24 Jul 2021 00:57:17 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162708823795401483/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: 17f05b08-ec1a-11eb-a602-000d3a7a3d40)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '17',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '138',
  'x-ms-request-id',
  '17f05b08-ec1a-11eb-a602-000d3a7a3d40',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
