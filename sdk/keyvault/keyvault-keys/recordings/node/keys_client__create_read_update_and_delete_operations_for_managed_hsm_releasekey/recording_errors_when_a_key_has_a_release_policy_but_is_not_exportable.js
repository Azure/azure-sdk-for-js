let nock = require('nock');

module.exports.hash = "d73e305d84d2f50c6a0d4d43e039ab0b";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable162837958695001139"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ6RmFXR0JyWkxUcVJNdkJ5WThWQ3Vyenc1RGpTRmpaWEo0Y2RVUjhCb1BxbDYxVXhlRlRhYi1Ucm13ZGlKTnpaaUFSZlVMUFViTWY2Q293T19Yb1VJZ05PWlVkUkw4X2h2a0I0VFdaZi1uSzIzTGtXT0tGTXM1dzBGUm5VTjFCNzF5OV9jeEt4WFh6aE9lY29FUjcweXo5dDA2aXFoV01aVEQ5SmNHQ0hWV1RMd25DU2ZWbDNXd1BBV3M5NEV6NzdvRC1abEdWZllCQ25KSUl2aGV6Q01tZ2xqUTBnaHBDWG1Celg5NlNiZXR4UGlVMWxIekc3Qk0zOEpqWUNWZzhkYm5sT0JoSE92NWM1clF6SHlTUkhwVUN3Snk2V1ZUeFg3NFZqWUJyOFk2OTZ3MkVwbmRVRzJiaGFwdjllWGx6Z2NyelFDY2JIOWF1a2RLcDB4VmhmR1EifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgzNzk1ODUsImV4cCI6MTYyODk4NDM4NX0.m5E41VIOQw40_eaau9sjwBk_EkdBiT2xSdTVMkbaVmQ5q8C5aOdocJLLDhpab_b_UuZQKVspqjTXXR9XfRbl18sSM5q07QFVzoj5Yx6qNKIedmg1U2cw7fO8oxNUpWmcjrLYnXxgwMKzBl08Uf65KFcCSYgxesUjog-SRw8148fmWYKj8z91JW7AHjj4gaUoPaYzmtHmRU8ygICPATUlFj2rta1fpomay1DOSJH-_NBLZ1JFIIx1kIeBTaNajMFFpdPqN3Vco187yjJizwsfWzmStgnO5hkgAPpUVEgLGuyQ0ZzjIbSBApDaEJzVZDGLDKX_zSQaGShTPwYlOPQx5w","attestationToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ6RmFXR0JyWkxUcVJNdkJ5WThWQ3Vyenc1RGpTRmpaWEo0Y2RVUjhCb1BxbDYxVXhlRlRhYi1Ucm13ZGlKTnpaaUFSZlVMUFViTWY2Q293T19Yb1VJZ05PWlVkUkw4X2h2a0I0VFdaZi1uSzIzTGtXT0tGTXM1dzBGUm5VTjFCNzF5OV9jeEt4WFh6aE9lY29FUjcweXo5dDA2aXFoV01aVEQ5SmNHQ0hWV1RMd25DU2ZWbDNXd1BBV3M5NEV6NzdvRC1abEdWZllCQ25KSUl2aGV6Q01tZ2xqUTBnaHBDWG1Celg5NlNiZXR4UGlVMWxIekc3Qk0zOEpqWUNWZzhkYm5sT0JoSE92NWM1clF6SHlTUkhwVUN3Snk2V1ZUeFg3NFZqWUJyOFk2OTZ3MkVwbmRVRzJiaGFwdjllWGx6Z2NyelFDY2JIOWF1a2RLcDB4VmhmR1EifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgzNzk1ODUsImV4cCI6MTYyODk4NDM4NX0.m5E41VIOQw40_eaau9sjwBk_EkdBiT2xSdTVMkbaVmQ5q8C5aOdocJLLDhpab_b_UuZQKVspqjTXXR9XfRbl18sSM5q07QFVzoj5Yx6qNKIedmg1U2cw7fO8oxNUpWmcjrLYnXxgwMKzBl08Uf65KFcCSYgxesUjog-SRw8148fmWYKj8z91JW7AHjj4gaUoPaYzmtHmRU8ygICPATUlFj2rta1fpomay1DOSJH-_NBLZ1JFIIx1kIeBTaNajMFFpdPqN3Vco187yjJizwsfWzmStgnO5hkgAPpUVEgLGuyQ0ZzjIbSBApDaEJzVZDGLDKX_zSQaGShTPwYlOPQx5w"}, [
  'Content-Length',
  '2684',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a7c-/zzspppMOUWHqXel3wwbK0WTr4M"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Sat, 07 Aug 2021 23:39:45 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162837958695001139/create')
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
  'bf452ae0-f7d8-11eb-ad25-0022484e2498',
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
  'Content-Length',
  '980',
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
  '74061dcf-109c-462f-afcf-8f36d39a3c00',
  'x-ms-ests-server',
  '2.1.11935.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKBAAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4TvqgTYHwNh9ajsdq8C5-tDkPxo5YnZos0KIGUAu8Qipc4v19CtuPd093q1yakJ5VxbK2rwaGARnmVwxNvBpsgoOE78vAF60Tb0RCmLTZn-u7EsIkkOVY5n5VRS7mT_NENKDIjebw-tzKsbiJeJgcw9azfZFyLbuIAxrRCNlrKogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:45 GMT'
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
  '31a28bd2-73dc-4d16-a18c-1a2cc4293400',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKBAAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrih0T1Ty37MlQzEgyAU21WMVCHK0AyP8MgnF6Xz5--3wrtOh92BQTTK6xcv3nVZZifRyo-aSS0cq_pcX7Pyj5YH2tbesTKcP44QyRffNdQ8I9dpwhiht0NLYcEGHatcRkdYog2XjdfBSFJ19gHM_yzcpfcF6f081B63OGPjHTQhcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=318a387c-4100-4f0d-950c-e7048962fc37&client_secret=azure_client_secret")
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
  '372fd3a7-f680-4de0-9254-d265e25b3600',
  'x-ms-ests-server',
  '2.1.11935.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKBAAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:45 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162837958695001139/create', {"kty":"RSA","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyX2F0dGVzdGF0aW9uLmF6dXJlLm5ldC8ifV0sInZlcnNpb24iOiIxLjAifQ"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Non-exportable keys must not have release policy (Activity ID: bf7fb26e-f7d8-11eb-ad25-0022484e2498)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '60',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '146',
  'x-ms-request-id',
  'bf7fb26e-f7d8-11eb-ad25-0022484e2498',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
