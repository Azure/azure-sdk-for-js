let nock = require('nock');

module.exports.hash = "a740b471769292b927261167b0cfa55b";

module.exports.testInfo = {"uniqueName":{"exportkey":"exportkey162801223463000476"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpfRUZtUTVVQm9lNHJMNUltNmw1cU1rQXN0QXluaE5JQUJ6dFZLQ0RMV1UiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ5UThORGZmWVd3WThxVklaV0RwbnB4STB6WWlWVjFpNUFGZVVWMnJxYWFxcmd3RW9PbHRtMUdoV09oVWdLaGVEd2R1aUxNc1hCMTFsNUJjTHAxbnYweDVNcWJjMDhZOW5iX2UzcG5FWVY0ckFaOW9iODZFQk1aYXhVVGNHcjB3djdrUWlZSzdTV1VOUkl5SVNic19OaERPU2JzU1UwazRmS0hZTzRXT3dLWHh1UWlQS0FlY0VUYTBjTEdUVVZyZW5Mc0dwcEYwNmtZQ21yTUJBcVA0X0Jvc2NtVGtRejhmamU5c1AtVlI2clhXNTdhRXU0V1c1TXk3T1NLZGlSOFBfMjlQNVNzSHNrbWh2NFMzVkJTSmpWM05XY180S1AyUFdTMWRtbEw5X0dtTGUzNkk4NHVnN2E5ZnpVdVdZYm05bXA3Y1k3VE1pMGYxS3BUMlBHcXZ2alEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgwMTIyMzQsImV4cCI6MTk0MzU4ODIzNH0.I2CJudPyAPKHyyqpeQHO5tVhkE-ojOWusJb-D6BUO7ZMZ5giZr1srNHb_pDdKGXPZ-mDjslcluSem2Gir9uZZ8XP4O0Q2NLxGKlFhbdb9GoyozeCtZd7HZGB76WftR9vixJLOSzm84-Rd0RgjK_aXT59V8LMghmXtren8Jk_SE6lmJf5d_0jjDISJ-QpoNjvasAduRi9bHocQkF6XGmXMQz-a3my3Gf_xtWNnWPj06sRRGFmAgxN7Vgohq64aZuFVO64OGNuiJuxxgxAV4a9JNalou20WL0f5pLF0XG8s55b5vR9V7hX4bNuNSrNMQCIv_-XR9Yel85R8FegezMsJg"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-UvcqlPj41sSpM2QaaWl/nftjjMo"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Tue, 03 Aug 2021 17:37:14 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey162801223463000476/create')
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
  '71098696-f481-11eb-8e15-000d3a7da679',
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
  '8c84153c-865e-4bc8-8a29-8456f366c700',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5dY; expires=Thu, 02-Sep-2021 17:37:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBFRarW8zau4QxcVKPpYr5bPTYUTNFvx4jR_otSgHId9ZRC2mHJm5FGA9LafnZktpzFCfD32H8zqSAUBzs-kNumOEoYcct3w0hi3X4euyYDUH-s0snqwxlhoF0ceLIbZl9vjxHRG_e9VfGLXUN7d7D0xM_AKuQUXP1FpTeb0yzIAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:14 GMT',
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
  'f5b4ff13-c47a-4925-93a8-4bc5de37f800',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5dY; expires=Thu, 02-Sep-2021 17:37:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-m97QBI9aCEcCPNe7u-VbvD31AkGIijVLeunmb8fU7y3UMbEl5rypZikCMBpTe0ZdNRrCuyqJZsiziew9Iaw-hts7gsPdxNTc0Ehiimm4JrNv-TYR4hvbzok1BZn2f-sti-H3qWm-R1VOrmRjmYOkj0U1dU2f0ddHZO4-9h2oy0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:14 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=dcff843c-3eaf-46b5-9eb3-b46db6e717fb&client_secret=azure_client_secret")
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
  '0ea71f5f-a92c-4ef8-a172-b23bfaa93801',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkvCKwkzsSVDvWRa-zNW5da3GWzCAQAAAMp1m9gOAAAA; expires=Thu, 02-Sep-2021 17:37:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 17:37:15 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey162801223463000476/create', {"kty":"RSA","key_ops":["encrypt","decrypt"],"attributes":{"exportable":true},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyYXR0ZXN0YXRpb24uYXp1cmV3ZWJzaXRlcy5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(200, {"attributes":{"created":1628012235,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1628012235},"key":{"e":"AQAB","key_ops":["decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey162801223463000476/d690eb1db68e0ca59fbca27d35a74329","kty":"RSA-HSM","n":"zcVNNepiwlnxY17nSfM80FlpN9IOWe5DVJ_gOwp530Vl2au8gsEEzycZu5mu-XwRAT8hHW0AnRzFkCCR0OoSEBJnvrNqvFWCS1dS-zJe0F2HR5Sf4QjwwqRd43y_sYgUwmWvYOk-hbN3AFo5jpcMrV66jS5h0fO0Ab_izQggwDjgqdx8fQV9BEJ12xMGXvRnrDJnl7SQOuDdVaB83WVCqG6nyGMa_f-c1JIpDGy6IEhzhBcREab2snn-4Ha_IyE7NUgynKBBOau1Ui6oyiwBXlXETWOeisV_aR94y-jLRQKtCJwNJvyygDCLH1_rbtHwjKW1-Q0o4FhY3QbwiZ6U3w"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyJ9XSwidmVyc2lvbiI6IjEuMC4wIn0"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '951',
  'x-ms-request-id',
  '715ed902-f481-11eb-8e15-000d3a7da679',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '757',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/exportkey162801223463000476/', {"attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6ImZhbHNlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3NoYXJlZGV1cy5ldXMuYXR0ZXN0LmF6dXJlLm5ldC8ifV0sInZlcnNpb24iOiIxLjAifQ"}})
  .query(true)
  .reply(200, {"attributes":{"created":1628012235,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1628012236},"key":{"e":"AQAB","key_ops":["encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey162801223463000476/d690eb1db68e0ca59fbca27d35a74329","kty":"RSA-HSM","n":"zcVNNepiwlnxY17nSfM80FlpN9IOWe5DVJ_gOwp530Vl2au8gsEEzycZu5mu-XwRAT8hHW0AnRzFkCCR0OoSEBJnvrNqvFWCS1dS-zJe0F2HR5Sf4QjwwqRd43y_sYgUwmWvYOk-hbN3AFo5jpcMrV66jS5h0fO0Ab_izQggwDjgqdx8fQV9BEJ12xMGXvRnrDJnl7SQOuDdVaB83WVCqG6nyGMa_f-c1JIpDGy6IEhzhBcREab2snn-4Ha_IyE7NUgynKBBOau1Ui6oyiwBXlXETWOeisV_aR94y-jLRQKtCJwNJvyygDCLH1_rbtHwjKW1-Q0o4FhY3QbwiZ6U3w"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJmYWxzZSJ9XSwiYXV0aG9yaXR5IjoiaHR0cHM6Ly9zaGFyZWRldXMuZXVzLmF0dGVzdC5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wLjAifQ"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '950',
  'x-ms-request-id',
  '71df9aa6-f481-11eb-8e15-000d3a7da679',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '423',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
