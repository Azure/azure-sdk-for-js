let nock = require('nock');

module.exports.hash = "d73e305d84d2f50c6a0d4d43e039ab0b";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable162679514356000378"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpfRUZtUTVVQm9lNHJMNUltNmw1cU1rQXN0QXluaE5JQUJ6dFZLQ0RMV1UiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiI0OWFyUFROMjhsa09mX0h5MlNEN19TODdGOS1EQWFzZWxCZ0ZISmlGTDNvbU1fSGFpSGlNM2xYS1ZOaHhDSUFzSHdZZm9tTXhPek5KZkExSFNRYlNHUXpzSzE0Qm1RVnRYVUxGaVFHaExnejB5czc2d2pwRDFVY0daTmlhRHdXempqUkpxaXk2TnNfd2w1YlVxekM4NkFpdDE1YVVIeDFPb3kxTmJTanczWkUxM3c0MlBpTkJ0b2pjbTlKcEI0ZXFaNFdYQmdmZHRwbkpzMmE3cjA4Q0xNeHZKODVtcGpqMnJVa2JMQkYzdlE5NEVwTVp6VnREenlwOURmODlYNHVvRjhKRjctLUlkVHZOT3NrZmxycEFNSjVwRWdybDYtNG9za1FkenpXb2FWMzBVT2RnUl9nLUo2ZWF0bHd2THdjcjRCRDUxUU81YVZKMXJ5QlJpdkpiWncifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjY3OTUxNDMsImV4cCI6MTk0MjM3MTE0M30.GZfGkrpUMFYtabSsZlgKYCs1BbiRgkbtUsK56FvOIGR2vbTXGx-ogh54Tn6oMmjNKQmsnExDOTKKfBhuVnbZxFoQwuJPlwK2qcrTVos1vVzv-oKrneaFfXY40H7slE2y3WfJYe2CQDdFNr64JJWMJp-2NYUkRztb3JD03Wi_LyjXKzd6WnZIAj3OvbO_PSCXHnKCUf-WGG2wpR-_f9a3vA-jHVtb4_Ezla5XeXaTe6RDLzUZAUFa7d6g50yQCgIMeDwcgpuZVUSJYPlhGPB6umh4wgmtB8-23hz6TBw8b95_j207egLH2esBdI1IYTVz2JgxB3aA_RX47LukV3piFg"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-zoOwcR1DI2beSrmzPq2GZ2rdAog"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Tue, 20 Jul 2021 15:32:23 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162679514356000378/create')
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
  'adf7ca62-e96f-11eb-9ff0-000d3ae28186',
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
  'b0b90cae-070c-4f26-ab99-6998f5f8ff01',
  'x-ms-ests-server',
  '2.1.11898.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufzGtGZi9FLjB5JyRFLzjwuyjXLAQAAAIHjiNgOAAAA; expires=Thu, 19-Aug-2021 15:32:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqDoJkMJ6UQsTdW76HW0eahIDkRZNODAFq-950oegjCORG01DZTf-CKO0E1aaSKLAjbt9p845el4i1SPjWetGXW5kNAZqbdJLOW9IqWty_-mRAVKZ0e6St8ReZItWTH6pj28EVFVyRTbFVwIpAmIsHT1n_4vF12TE2MeeS_vXJjQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 20 Jul 2021 15:32:22 GMT',
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
  '0d5d6db0-b0e9-42d5-92c6-4b8131ab6402',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufzGtGZi9FLjB5JyRFLzjwuyjXLAQAAAIHjiNgOAAAA; expires=Thu, 19-Aug-2021 15:32:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQsxs5i-jRf5Q_NlAq9E1A1owe7hJXHZiaknUCFF3v8UhVkA521GPnOEiTbn_ELOp85e014BGScMup1ahrmXI7db5f8hmMZ0xNbsJzCxb8johIiBxhPoOurEFJSxdHcGhERpOR8VZCImuuT_dTpOV-419qcPDpjm1ksmrrQNgZ7wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 20 Jul 2021 15:32:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=8dbdb39f-c1c2-4b0a-9bb8-e111fdb8865d&client_secret=azure_client_secret")
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
  'f04d54c1-34fb-40ec-9ba5-4deef8611803',
  'x-ms-ests-server',
  '2.1.11898.8 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AufzGtGZi9FLjB5JyRFLzjwuyjXLAgAAAIHjiNgOAAAA; expires=Thu, 19-Aug-2021 15:32:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 20 Jul 2021 15:32:22 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162679514356000378/create', {"kty":"RSA","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyYXR0ZXN0YXRpb24uYXp1cmV3ZWJzaXRlcy5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Non-exportable keys must not have release policy (Activity ID: ae32ac90-e96f-11eb-9ff0-000d3ae28186)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '17',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '146',
  'x-ms-request-id',
  'ae32ac90-e96f-11eb-9ff0-000d3ae28186',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
