let nock = require('nock');

module.exports.hash = "2cc7eb87b845d81723bebfeb4b4ab5f0";

module.exports.testInfo = {"uniqueName":{"exportkey":"exportkey162837958323303915"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ0SmlkMEVEUWl0dWZVbGVEQUNrWUFmbFBGdDl3T0NhRUN6ajl6bEZ3WmxyQzZlZzQzVFpxXzNkS3YtR3JLaGFJX0hXaTZXWTkwNVlrNFVXQTJsMHh0MFdYTThoRFVNR21BLU9jNDZGcWFGejJyczAwcE9lQl8zWWlacXBRV0g5QURTLXhUb3RVVkxrRVFISVE0QXFGdVk5ZGZ2amZtckxXSGRrT0dmckU0eU5sQWJyY3dSYXhvYnlLeGc4VW95Vjg0a3dNN3FxQzU3VDAxVklfajlrWVpxenpjVnZEXzNURXlzNEYzZENwS2xPWGRYUmRsa3EtNEdWb1dZTGtwdXE3LTlCSkkzb1NZb0V2MmoyVGhNMG11dUpIWGRqM194VUhsZlRlVmRIZE9OWlUwZkNBVmFibVlKcjZqUlEtd3F6bW1WeWlLdmxJMllJWmNDRWpRQUhHY1EifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgzNzk1ODIsImV4cCI6MTYyODk4NDM4Mn0.v1T-jAoBLolVw__Gvr-m0FLTFvFIoC2jb1FblCcaKr1eg3Tg6S6PkTkEjSGvRQ1mmwq_YlFymgLEqtu5ywtjOU5ECH2a8MrSOKkLLWaLx-lrJeX8kRc8WMqO9rLtipzLvPYOhAoaC8eRVmwz_4JT-665N0rM-02WthlmOchV8BClFQmwT6PT90QL2IwJlzRGO4oS11raVSrwORLRiLHrTWvno1CfM6x4xxCNdKTSBh3ObfBYpsOyxWNTAfgi-4Tk90y7B8HpA28QTU5p7mFD8V3f1glgnpXaaHKYVRiLPnAJRYFgWUaGCtXgaMGQbZUD2guwY8pXdGJxNiN0-N6z8w","attestationToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ0SmlkMEVEUWl0dWZVbGVEQUNrWUFmbFBGdDl3T0NhRUN6ajl6bEZ3WmxyQzZlZzQzVFpxXzNkS3YtR3JLaGFJX0hXaTZXWTkwNVlrNFVXQTJsMHh0MFdYTThoRFVNR21BLU9jNDZGcWFGejJyczAwcE9lQl8zWWlacXBRV0g5QURTLXhUb3RVVkxrRVFISVE0QXFGdVk5ZGZ2amZtckxXSGRrT0dmckU0eU5sQWJyY3dSYXhvYnlLeGc4VW95Vjg0a3dNN3FxQzU3VDAxVklfajlrWVpxenpjVnZEXzNURXlzNEYzZENwS2xPWGRYUmRsa3EtNEdWb1dZTGtwdXE3LTlCSkkzb1NZb0V2MmoyVGhNMG11dUpIWGRqM194VUhsZlRlVmRIZE9OWlUwZkNBVmFibVlKcjZqUlEtd3F6bW1WeWlLdmxJMllJWmNDRWpRQUhHY1EifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgzNzk1ODIsImV4cCI6MTYyODk4NDM4Mn0.v1T-jAoBLolVw__Gvr-m0FLTFvFIoC2jb1FblCcaKr1eg3Tg6S6PkTkEjSGvRQ1mmwq_YlFymgLEqtu5ywtjOU5ECH2a8MrSOKkLLWaLx-lrJeX8kRc8WMqO9rLtipzLvPYOhAoaC8eRVmwz_4JT-665N0rM-02WthlmOchV8BClFQmwT6PT90QL2IwJlzRGO4oS11raVSrwORLRiLHrTWvno1CfM6x4xxCNdKTSBh3ObfBYpsOyxWNTAfgi-4Tk90y7B8HpA28QTU5p7mFD8V3f1glgnpXaaHKYVRiLPnAJRYFgWUaGCtXgaMGQbZUD2guwY8pXdGJxNiN0-N6z8w"}, [
  'Content-Length',
  '2684',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a7c-D0PaF/YQG7iDV9RifW+Hgfv0TtE"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Sat, 07 Aug 2021 23:39:42 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey162837958323303915/create')
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
  'bd0e2bbe-f7d8-11eb-ad25-0022484e2498',
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
  '50f8fdef-02af-4bba-8c31-c945787f1002',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKAgAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3BXdQL4SPJmmGBWhKTH-QNxVtinoxxzPhOdGAtBb1nf4JbLzUhv3wRRnxb2RCXmbrBeEhT1uTXZ2kU1TMrnd3iL8fGR7c9Obu2A1c48MaW66tLZRvgpHkaswDeJRTH8w4hef4lF4y3dBpxea7isvvv2WgHWE15D5yp-sUzSyQk0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:41 GMT',
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
  '31a28bd2-73dc-4d16-a18c-1a2c27293400',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKAgAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrh7Vyu0u86uds9vDzkH_o3JsjT7vawQ1XqRk6QYM-qzkLvXYoAuELJ3bnEgg3RfgZLPd1dM3VTqe9cUby3RW5vTCCIMyzQ8rrrc6pC7hcHj4VU-95p888NJRTzuim90FX_vFgWcPN-Dpgo7-BFLDUG-1oFMHze5Jl-9mjGogwZBggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:42 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=269602fc-d3f4-40f4-91e5-c5fb2b8ffa97&client_secret=azure_client_secret")
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
  '31a28bd2-73dc-4d16-a18c-1a2c2c293400',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKAwAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:42 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey162837958323303915/create', {"kty":"RSA","key_ops":["encrypt","decrypt"],"attributes":{"exportable":true},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyX2F0dGVzdGF0aW9uLmF6dXJlLm5ldC8ifV0sInZlcnNpb24iOiIxLjAifQ"}})
  .query(true)
  .reply(200, {"attributes":{"created":1628379582,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1628379582},"key":{"e":"AQAB","key_ops":["decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey162837958323303915/8c7288d895ed0db725f14e873a9e8b46","kty":"RSA-HSM","n":"pBCvwouEuwM3rNtxpfFeFykqN_LvY6TRmhwQFcHMi7U174lVS7uATlKspYaK2I7WnwXTcXaK9lanDzpEnxkoi00ZIvCOtzxRmydPtuwkG0P0lFchH2k6RlwLZzdNbPFrE_NfK8UoDw11k7cgbEWhC6Cv3ZV-xagap8vvc1HGqP7Osv0T3k08ESkqLkS3MeGu5wEv1h_0szq2_PDVqxb2u24MnBuGLLBSTvyUTYcsWA6QxMz8bZ1CgArPvH1pSUtJLIO0topciN24P1pHzosM_IxPV8gAlcpU7_TwY5tA38Eayf-xUOgv5VmVuVFVsOLMnwom4fpoARUDGtwh-aRgAw"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wLjAifQ"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '971',
  'x-ms-request-id',
  'bd4afbd4-f7d8-11eb-ad25-0022484e2498',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1057',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/exportkey162837958323303915/', {"attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6ImZhbHNlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(200, {"attributes":{"created":1628379582,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1628379583},"key":{"e":"AQAB","key_ops":["encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey162837958323303915/8c7288d895ed0db725f14e873a9e8b46","kty":"RSA-HSM","n":"pBCvwouEuwM3rNtxpfFeFykqN_LvY6TRmhwQFcHMi7U174lVS7uATlKspYaK2I7WnwXTcXaK9lanDzpEnxkoi00ZIvCOtzxRmydPtuwkG0P0lFchH2k6RlwLZzdNbPFrE_NfK8UoDw11k7cgbEWhC6Cv3ZV-xagap8vvc1HGqP7Osv0T3k08ESkqLkS3MeGu5wEv1h_0szq2_PDVqxb2u24MnBuGLLBSTvyUTYcsWA6QxMz8bZ1CgArPvH1pSUtJLIO0topciN24P1pHzosM_IxPV8gAlcpU7_TwY5tA38Eayf-xUOgv5VmVuVFVsOLMnwom4fpoARUDGtwh-aRgAw"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJmYWxzZSJ9XSwiYXV0aG9yaXR5IjoiaHR0cHM6Ly9za3JfYXR0ZXN0YXRpb24uYXp1cmUubmV0LyJ9XSwidmVyc2lvbiI6IjEuMC4wIn0"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '972',
  'x-ms-request-id',
  'bdf86fbc-f7d8-11eb-ad25-0022484e2498',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '984',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
