let nock = require('nock');

module.exports.hash = "d711b34109b833fac705f4ae209505c3";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy162639634445501359"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh2d2xRVk9UZWJJZGgtU3Jyb2JuUGlEZTF4THZyeENteDBVMjM0bHBkUjAiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJzbGx5Q0lJUkJqbFJWUTNVd2NzSTlEQWpYNUtHX3dYZXYtVVc1bFNxYl9XZ3F5SGNCYlpLVXZ4YUd1cEdvcVhJQ3dhX25neHFiVzBjMGpicGNNSFlyV1RHbFpLeVFFRXdNb0h2WHJUc1pBOGQzLU9uM1l0YTdJUHJaem1IdUhWeEVqdkVIR0ViQlJFYS0xMllUMjkzUWk2UlZIZ25WbU1DOEN4N3hDNjFkSVNiTGdHR2pyV1djUkFGV3UtNWxJb0dlQVhwUC02NXRwUFBnbGc3SlB4YnU5amJNeHYybVZRQVk4T25MTVVMbjdfSUNWbmVwSlk0ZDBkOU5sY1pFMWVjMXdDZTVtVEdraEFFWUczUzV2dnhWRnFRb0FZSUh0YlRzblR6ZTZSZk1PZkpkYTc3VGhIdFFGemtKN3B2WXUyaVI2blppdG5PQWxrUnhDa2lMdzNBcVEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjYzOTYzNDMsImV4cCI6MTYyNzAwMTE0M30.6vyfDVbDuwe40K99CbkutD3NGiw88i2BRk-AeEgVxGd3HGiGjoBtVvn_9gtzETLDiDxQU0Hd4_k4n8qfM434LKluPPgqLYR0omFmd4fOjo1KFyW_FnBvIFo_qBrrtI11bEMoXN1a3_uCy-ppEkM-XDlsfriyONufW7CxcsrSpgLu-sdoTEfoFGoEMpyRULTm8oQuzDnfJRRpRbBs97cDd_e23JyhU7rgccuzQO8ncyOMRHRTEjrob2Hz9IGUVYhj3XC-cKEX4xRBEOpUoCCFHCBebUCKTcr2X9-9VDkcqyGWLvO0hDyvA5sslTBYnsWzZ20dhw5eG2PM1pXHLxtdsg"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-VvM1yzI9eZRu22/sqgHZbSM/PHg"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Fri, 16 Jul 2021 00:45:43 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162639634445501359/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '2',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '2746183c-e5cf-11eb-a24b-000d3a028720',
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
  'd56a8d93-9cfb-4ca0-909d-f38d96be1400',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkSeKlBfrhlNrQuCRsCQLwc; expires=Sun, 15-Aug-2021 00:45:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1Mxrh9NkOWpOECD4qCKwmvb4qQr2fSzzN-vm7VqXEIiPhWbAxlyVjYGySNMZnVXxprOJkFgTdwVIC-i_6XgIFSRdAfe8NQADK5QBmXYeN5V8J7Q5Az5AGm1gwraatd3yeKZMTWPc09vvCflFj1ogVOcHMmMJMrrAaQ9BIdgxt-EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 00:45:44 GMT',
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
  '328d2da1-37dd-422a-8604-875d1bee9501',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkSeKlBfrhlNrQuCRsCQLwc; expires=Sun, 15-Aug-2021 00:45:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZtZEp1ppTmMRjKQ8mxOH1OHNuhW6xLZJm9ecCuyqWrvQeW2_fFstKIcFeCpbldzggRi9zWl_IXeuWcO2HdTOXSytJ0lw4fLgVcfbDpRThy_6w48zLmrhTg_7ltofv7YMrRA2setwxnJ2Jxr2pLEj8RvTyvX-N50nn7yoBQmePrcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 00:45:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=e41de4eb-fa6c-4c5a-b42b-5d6be5307c19&client_secret=azure_client_secret")
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
  '21b40078-1c8a-452f-a9c7-09eb1635c801',
  'x-ms-ests-server',
  '2.1.11898.8 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkSeKlBfrhlNrQuCRsCQLwcuyjXLAQAAALjNgtgOAAAA; expires=Sun, 15-Aug-2021 00:45:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 16 Jul 2021 00:45:44 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162639634445501359/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: 27a66c1e-e5cf-11eb-a24b-000d3a028720)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '14',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '138',
  'x-ms-request-id',
  '27a66c1e-e5cf-11eb-a24b-000d3a028720',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
