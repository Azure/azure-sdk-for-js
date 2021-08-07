let nock = require('nock');

module.exports.hash = "d73e305d84d2f50c6a0d4d43e039ab0b";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable162829788689603566"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ0VHhqaHMyZ2d4c1hUb29xZkhhVUtxa0hlYzNpWHdjdkMyOGVpT2RqajQ0Zk1BM205SVZSVVAwQ2lYNnZkUG5iTFNSNFZxR0d1SlA2dEljT2xLbWhKNkJVeHB3MVIxbmcxWmVFOHRWX1BWUmQ1cWlORGh0UWR4ZmZWR0VpaG5UVXpPMENVMHQzRU14WWExay1tRHpmbFVCS2NDVEJBOEpGRGMtNzYtS0NVWjVNcWx0Q0gxZ2Q5amh6b1RUcVNvQnA5MVVVdlh6VWZaYmdhTTZCVm9DcmdPb2ZlTnlYQ211bFF4WllLdmlNZEp2eC11RW5WREdQQm5BM3RGMEhNX1JteE9SWHlFQ1E3eWNiajZvUkNEMk1WaWx4ZEpheGdtc2VMWGdKRmpWNEpoSDVlOXVKUFVpMTN1cS1ZeFBpVE9HdENSSHFFXy1Hbm1QUzVBd3pNSURVSFEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgyOTc4ODYsImV4cCI6MTYyODkwMjY4Nn0.G44CJNCWd_tB2VOXYtBx0-ZBhHgTzELZeTVvNI-QnlmZkxzIkoCg1cnxgl86Rp0ZNu4jZQPYOEpTX1uTQLPYl6a_qBGDc-4tVprRraRIxIpB4SjlB4xgEeysCYvgSJ-xYtUdG3MjMXyx02nn1eSaubDJoZ_FiMdnFi6O_xOr0bVx9HCAyUGJutL29i1QvdxJtVcL3mFEvMSdrjDnFtR0_KlJ5MCx1U0rTdyPei4ExCDPS1bj7v8gd4l5FSrKAtyuTrutocIDMT9D4H11P1qM2vZwb4xTZ_M4WjXM_5r9aK9gmFA_iYM8SV09s17e4UfUCrrjimiPw4zmo2rxq-_R5w","attestationToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ0VHhqaHMyZ2d4c1hUb29xZkhhVUtxa0hlYzNpWHdjdkMyOGVpT2RqajQ0Zk1BM205SVZSVVAwQ2lYNnZkUG5iTFNSNFZxR0d1SlA2dEljT2xLbWhKNkJVeHB3MVIxbmcxWmVFOHRWX1BWUmQ1cWlORGh0UWR4ZmZWR0VpaG5UVXpPMENVMHQzRU14WWExay1tRHpmbFVCS2NDVEJBOEpGRGMtNzYtS0NVWjVNcWx0Q0gxZ2Q5amh6b1RUcVNvQnA5MVVVdlh6VWZaYmdhTTZCVm9DcmdPb2ZlTnlYQ211bFF4WllLdmlNZEp2eC11RW5WREdQQm5BM3RGMEhNX1JteE9SWHlFQ1E3eWNiajZvUkNEMk1WaWx4ZEpheGdtc2VMWGdKRmpWNEpoSDVlOXVKUFVpMTN1cS1ZeFBpVE9HdENSSHFFXy1Hbm1QUzVBd3pNSURVSFEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgyOTc4ODYsImV4cCI6MTYyODkwMjY4Nn0.G44CJNCWd_tB2VOXYtBx0-ZBhHgTzELZeTVvNI-QnlmZkxzIkoCg1cnxgl86Rp0ZNu4jZQPYOEpTX1uTQLPYl6a_qBGDc-4tVprRraRIxIpB4SjlB4xgEeysCYvgSJ-xYtUdG3MjMXyx02nn1eSaubDJoZ_FiMdnFi6O_xOr0bVx9HCAyUGJutL29i1QvdxJtVcL3mFEvMSdrjDnFtR0_KlJ5MCx1U0rTdyPei4ExCDPS1bj7v8gd4l5FSrKAtyuTrutocIDMT9D4H11P1qM2vZwb4xTZ_M4WjXM_5r9aK9gmFA_iYM8SV09s17e4UfUCrrjimiPw4zmo2rxq-_R5w"}, [
  'Content-Length',
  '2684',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a7c-vMuywNEpzUBrQPsUbyQoDEWiGOU"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Sat, 07 Aug 2021 00:58:06 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162829788689603566/create')
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
  '86d5159e-f71a-11eb-a358-000d3a0f8fc4',
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
  '918164ad-f826-4a0c-a4f3-289d9a48fd02',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAwAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9eqt1QECR4JN0TsIUV9XDtOQ3EWMVXNDZDzhCjYR_a6yuzK8uSqm5KjhtO9QOdmfNRQ_AM5PRzSMiT4DIU8PhYyIHjKNp95N0lMWEk7QXE7prTAGMJyWvQSnaEzrQxyDfEJU4TdSnumcrcOrzxp2R8fB0i5aiqeCYN-1dcb9Y2MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:06 GMT',
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
  'd585b3a5-eed4-42d6-8e40-474d28ab0800',
  'x-ms-ests-server',
  '2.1.11935.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAwAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1zl8X5U7haV2zkUN5MCxHDUjiFwDFXVJGfYeck8LnJld3c8oiHHF0rh92_L_15Y2_7k0LkfSGbQ1DS9WUnBaA4nSYvw3J6M-KTpvjPJuyhmZaXzBfkTBQNzAF6BGdwKKhp9sAZbdgZHwmM1nAkD7vB-nt_YFWfyQBDkFiOBb0UggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:06 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=cc03aaf6-2456-401f-8d58-43e8be66b176&client_secret=azure_client_secret")
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
  '664d9919-affb-491b-a0f0-b6ca99320300',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKBAAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:06 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162829788689603566/create', {"kty":"RSA","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyX2F0dGVzdGF0aW9uLmF6dXJlLm5ldC8ifV0sInZlcnNpb24iOiIxLjAifQ"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Non-exportable keys must not have release policy (Activity ID: 870140d8-f71a-11eb-a358-000d3a0f8fc4)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '18',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '146',
  'x-ms-request-id',
  '870140d8-f71a-11eb-a358-000d3a0f8fc4',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
