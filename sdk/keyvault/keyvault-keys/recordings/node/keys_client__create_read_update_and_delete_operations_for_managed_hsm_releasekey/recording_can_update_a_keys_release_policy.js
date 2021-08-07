let nock = require('nock');

module.exports.hash = "2cc7eb87b845d81723bebfeb4b4ab5f0";

module.exports.testInfo = {"uniqueName":{"exportkey":"exportkey162829788229702669"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJwTVAzV2kzbTN0TlNTNUtEbXFaSkhkMjl1R0RwYTViU3ZKcUNoRkRKY215M2ZDTnJETlYxSFlqRTl2dkE2YjBBeXFsM1lCRFhXUWk4ajFxeHFiZjFHUm9hRUp4STdxTnZFdUVkLXQ3R1U3Qm1zWDFwY2hxUHl0c1FZZzVWSHpvSnBwSUNENUhvMUJiTUxzd0NoRmpvb2NWTHNfWTlYX1RaT3RTaUwycURrQ05GV2IwQi1veV9zQmZSZWpWTDVYeG1sUndqOVY2S3NhWl9XQV9YUm1jSDNoaUNDRUZjblJHOU1FNmFoTFJjXzViSk45Mk5FOGdXMEl2aWVKSVhMNHhCb0xneWh6VTBMcktRQ2U4NVo0ZkpOZTNtX1FEakRpMU1SVlA4WnRRR0psMEttaW1wOWtCX0ZGT1VLWERFajVva2tLTWZOQV9sX1lDdU5kbmo5U0dCd1EifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgyOTc4ODIsImV4cCI6MTYyODkwMjY4Mn0.DXl60r14C2_CDukIT89HYZ7cDA7H-2ItREwMEAQOemoNugOZ1apywu5LoUuh7-lbT96TUJ8LQS47q0y8oxgcAjbbmLXFvVtv1NaFEQ35MQGDOD_BfYssH_z9NcRtSN-FYhR9vouSRH8OCw3zayOnAqiqxKwvaaP6zCrksL3siuLzxK3F9zBvsaPhGuWRQ16j4QpPGKDFrBNpeNcEKTvT-1vmZ1PN_LptGz-xl2j_vvvGn8z11sZc3w0Q8LI4P6WMz0pR0mqNM0-z4kXnQdI7VoM74-QfRe4xaRcNlukvBA1CB-koXsjzpk2w2BiHLnyXGUNo7Kee3z-brLcS7Cxwkg","attestationToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJwTVAzV2kzbTN0TlNTNUtEbXFaSkhkMjl1R0RwYTViU3ZKcUNoRkRKY215M2ZDTnJETlYxSFlqRTl2dkE2YjBBeXFsM1lCRFhXUWk4ajFxeHFiZjFHUm9hRUp4STdxTnZFdUVkLXQ3R1U3Qm1zWDFwY2hxUHl0c1FZZzVWSHpvSnBwSUNENUhvMUJiTUxzd0NoRmpvb2NWTHNfWTlYX1RaT3RTaUwycURrQ05GV2IwQi1veV9zQmZSZWpWTDVYeG1sUndqOVY2S3NhWl9XQV9YUm1jSDNoaUNDRUZjblJHOU1FNmFoTFJjXzViSk45Mk5FOGdXMEl2aWVKSVhMNHhCb0xneWh6VTBMcktRQ2U4NVo0ZkpOZTNtX1FEakRpMU1SVlA4WnRRR0psMEttaW1wOWtCX0ZGT1VLWERFajVva2tLTWZOQV9sX1lDdU5kbmo5U0dCd1EifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgyOTc4ODIsImV4cCI6MTYyODkwMjY4Mn0.DXl60r14C2_CDukIT89HYZ7cDA7H-2ItREwMEAQOemoNugOZ1apywu5LoUuh7-lbT96TUJ8LQS47q0y8oxgcAjbbmLXFvVtv1NaFEQ35MQGDOD_BfYssH_z9NcRtSN-FYhR9vouSRH8OCw3zayOnAqiqxKwvaaP6zCrksL3siuLzxK3F9zBvsaPhGuWRQ16j4QpPGKDFrBNpeNcEKTvT-1vmZ1PN_LptGz-xl2j_vvvGn8z11sZc3w0Q8LI4P6WMz0pR0mqNM0-z4kXnQdI7VoM74-QfRe4xaRcNlukvBA1CB-koXsjzpk2w2BiHLnyXGUNo7Kee3z-brLcS7Cxwkg"}, [
  'Content-Length',
  '2684',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a7c-yJn+udwnxY2jOU+w0RWWkv0nXp4"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Sat, 07 Aug 2021 00:58:01 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey162829788229702669/create')
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
  '84176316-f71a-11eb-a358-000d3a0f8fc4',
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
  '865f0524-02de-4ffd-a219-156789423102',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAgAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnMTcCr8ePiPP4iQCM9b1WLoSE24glt-pCECyEm5ZSyKVOIrl_pwETtgE3vpf0Jr6Ua_u5RZsFbXXNXyv2mCTVMcqcdyBiUT0WyF6Op4yM9vl3-3YiHk8J0PgCcmIcS1vrrepmOxqL1YdPL-tu7nlYuAQe2cMgvy5Hhd_b0lOGHEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:01 GMT',
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
  '45396962-172b-4d8b-9b16-587dc3ce1000',
  'x-ms-ests-server',
  '2.1.11935.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAgAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrqa9ceXh9I6nfAqcvYvSePShWXgTAcnseriCBERX568wpxTAETM5r4VXDfhCSr26r2PNToF0ZGbYrcPp0VC8B7Dg4zj4pJ3ypLbAf6JtZn474E0_XZGz6Qh-qOD0yRsf9lZBW1_3tk1FObsK8Q2ja-rqhvbReTb5UeZ1hNg1MPOsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=ede567fe-1031-4e84-97a9-55be4ba3d332&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1322',
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
  '1ec19281-8bdd-468d-b33f-bf1920500400',
  'x-ms-ests-server',
  '2.1.11935.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAgAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:01 GMT'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey162829788229702669/create', {"kty":"RSA","key_ops":["encrypt","decrypt"],"attributes":{"exportable":true},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyX2F0dGVzdGF0aW9uLmF6dXJlLm5ldC8ifV0sInZlcnNpb24iOiIxLjAifQ"}})
  .query(true)
  .reply(200, {"attributes":{"created":1628297882,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1628297882},"key":{"e":"AQAB","key_ops":["decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey162829788229702669/923383d979eb058a28109626f061f0a1","kty":"RSA-HSM","n":"iMeH3cB79ashyi0QTg_taGEvRaCTlq-_OfxFBNpdbu7XeTam44DOUaN60GGs1hm3UKdwtZcsGY4NPrgaNZ42KkinakkIZMJR6GckMD5Zu_p9jKQqWBgYfgcQ_0R2STEV75u_Crm5eRI75uWckMnBqku_-6sgctVQT2Xlxalv0kxwbPi51vQ441ZlAC6TN2Zw2BUICnHegIZlvTHayw0kfnNJdGxRp12L8eNkOoB2_s6wxLjGT6lGg3_pR01zPlsp_i31Q4SIOMkZhu-ynAt2KCR73jutk2pjSpl243ttU4-nqPto7JJNjEQzPevXFNGnJ_v5vYn-AkHm-dGJev3bfw"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wLjAifQ"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '971',
  'x-ms-request-id',
  '8440f87a-f71a-11eb-a358-000d3a0f8fc4',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '1463',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/exportkey162829788229702669/', {"attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6ImZhbHNlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(200, {"attributes":{"created":1628297882,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1628297884},"key":{"e":"AQAB","key_ops":["encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey162829788229702669/923383d979eb058a28109626f061f0a1","kty":"RSA-HSM","n":"iMeH3cB79ashyi0QTg_taGEvRaCTlq-_OfxFBNpdbu7XeTam44DOUaN60GGs1hm3UKdwtZcsGY4NPrgaNZ42KkinakkIZMJR6GckMD5Zu_p9jKQqWBgYfgcQ_0R2STEV75u_Crm5eRI75uWckMnBqku_-6sgctVQT2Xlxalv0kxwbPi51vQ441ZlAC6TN2Zw2BUICnHegIZlvTHayw0kfnNJdGxRp12L8eNkOoB2_s6wxLjGT6lGg3_pR01zPlsp_i31Q4SIOMkZhu-ynAt2KCR73jutk2pjSpl243ttU4-nqPto7JJNjEQzPevXFNGnJ_v5vYn-AkHm-dGJev3bfw"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJmYWxzZSJ9XSwiYXV0aG9yaXR5IjoiaHR0cHM6Ly9za3JfYXR0ZXN0YXRpb24uYXp1cmUubmV0LyJ9XSwidmVyc2lvbiI6IjEuMC4wIn0"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '972',
  'x-ms-request-id',
  '852c9992-f71a-11eb-a358-000d3a0f8fc4',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '888',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
