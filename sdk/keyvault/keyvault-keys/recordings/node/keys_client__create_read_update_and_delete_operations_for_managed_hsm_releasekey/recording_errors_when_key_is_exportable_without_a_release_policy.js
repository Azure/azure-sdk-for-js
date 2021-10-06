let nock = require('nock');

module.exports.hash = "ed0144555258e44db57c40caad94ff21";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy162837958616401382"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ4UGVybEZRYXlYSDVGcm05Xzk5aFFHYUw3LWg2UzVnSUVsYVM0WGFfTnFHTUpGbG9YXzFPbUJtYjh3Z3VOWWJhRmNnZGV2eEVBVTAtd2Q2YzhqcjZWY2Q4emVYTnNFa2JpQUtNMUtDR0pXbEgyRXhxeHBzWFR3XzRjTFUtWGFCeEFvSFJOdndrb1pMZlI2S2NPS2NaWlBqdC1vWWJ0ZEp4c3Z2YVpGRVExNXVKcERtU0MzSi15Y0NaQlkwaG9jMDVjMVBtRkpmVVRzM3d6elZfZWtRZWJYQTlOWVpEYmR0RmJsSFE2ZDljSnJHX2VlcVNZd1NBdWlSWVJpcXNya09mb3UzWk9tQmcwdHlzM3FVT2d0eGJxdV91NzBBTGlSb3JUMlJkUExxQUxpNzlMYjN4OWNCQW9IUTR4YWRvMFZ2YlJqaEhEdWQ3RmYwSGk0bzZvLWZnYncifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgzNzk1ODUsImV4cCI6MTYyODk4NDM4NX0.ahvsgfScusfGc0R2P-mVEwP_64HIdGAzAmptRYNmz2G5yfIVZIsScab-dq7c6d4ucpsedzpGe7rx0pkYZihlpnsgYLL2x0aId0115GmJJtewQCkNKd0WvR6pTh5mdXRWCwfaNNF3FYiTf-iayQ798TBrYGNSk3HXYkx6ZvtGstWs0plqpy43ob6Q7jklQnUvk8WQVDt6cwGgv1zW1QlMWS5sVMcIzdE6K_bf_NdJHP90oojQB8ETdZ6Dvpw5RhlnRuNHA-hQYyT_VXiBJGPo7tc0oHnD99cZrIJ2-qkol9EPLcj1yV-qy-7YwxlyDekcz6JWpxjLD7h2ThxusngZzw","attestationToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ4UGVybEZRYXlYSDVGcm05Xzk5aFFHYUw3LWg2UzVnSUVsYVM0WGFfTnFHTUpGbG9YXzFPbUJtYjh3Z3VOWWJhRmNnZGV2eEVBVTAtd2Q2YzhqcjZWY2Q4emVYTnNFa2JpQUtNMUtDR0pXbEgyRXhxeHBzWFR3XzRjTFUtWGFCeEFvSFJOdndrb1pMZlI2S2NPS2NaWlBqdC1vWWJ0ZEp4c3Z2YVpGRVExNXVKcERtU0MzSi15Y0NaQlkwaG9jMDVjMVBtRkpmVVRzM3d6elZfZWtRZWJYQTlOWVpEYmR0RmJsSFE2ZDljSnJHX2VlcVNZd1NBdWlSWVJpcXNya09mb3UzWk9tQmcwdHlzM3FVT2d0eGJxdV91NzBBTGlSb3JUMlJkUExxQUxpNzlMYjN4OWNCQW9IUTR4YWRvMFZ2YlJqaEhEdWQ3RmYwSGk0bzZvLWZnYncifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgzNzk1ODUsImV4cCI6MTYyODk4NDM4NX0.ahvsgfScusfGc0R2P-mVEwP_64HIdGAzAmptRYNmz2G5yfIVZIsScab-dq7c6d4ucpsedzpGe7rx0pkYZihlpnsgYLL2x0aId0115GmJJtewQCkNKd0WvR6pTh5mdXRWCwfaNNF3FYiTf-iayQ798TBrYGNSk3HXYkx6ZvtGstWs0plqpy43ob6Q7jklQnUvk8WQVDt6cwGgv1zW1QlMWS5sVMcIzdE6K_bf_NdJHP90oojQB8ETdZ6Dvpw5RhlnRuNHA-hQYyT_VXiBJGPo7tc0oHnD99cZrIJ2-qkol9EPLcj1yV-qy-7YwxlyDekcz6JWpxjLD7h2ThxusngZzw"}, [
  'Content-Length',
  '2684',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a7c-x+w3pOqghtfgV61uQkQzO9sKWZE"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Sat, 07 Aug 2021 23:39:44 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162837958616401382/create')
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
  'becd6906-f7d8-11eb-ad25-0022484e2498',
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
  'a5d0679a-b271-46d4-a074-d0a3b4574900',
  'x-ms-ests-server',
  '2.1.11935.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKAwAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNi05RJxm4ADmKB5oZAkhy05pTNJcv4uyTPLdm9TCq8RAGmgIR2tbK9gokoHKzF9V2E6gxS2kKXQkbXUmxKMfWN_JADWmlJ7XaZ_2yB1shcFjLsthBJ1cpF81hfRGLIdAoU1CSII3O2Mk1WEncpTYlGS-wpJZXK1z5IMyIwH5vDogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:44 GMT',
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
  '79f78bee-5708-438c-bc99-6aff47863300',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKAwAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDrfYnTtLHAeJFvzXoyav-cw4HSP3C4wOa0gZDPO5CgB255vGDdV5xyzilFNzIzutOYkpG2qp5OasH3dQvs3TtzC8zhBHpO551i4MNgFK9MRe4QxkIGVqhMdENh22iOGy1xtniJ6zqxmPuR18iNztsESffrWPhS8rpFXsOc8YR1EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 23:39:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=3a1a04ba-f0ed-440b-9ee2-aa7d195ddd8c&client_secret=azure_client_secret")
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
  '1e9fc6ec-5b11-4e8b-b0ba-6113a1b33f00',
  'x-ms-ests-server',
  '2.1.11935.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvJPmCVK3UFKoVkODOOkWfbA1qXKBAAAALcQodgOAAAA; expires=Mon, 06-Sep-2021 23:39:45 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .post('/keys/exportablenopolicy162837958616401382/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: bf07939c-f7d8-11eb-ad25-0022484e2498)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '19',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '138',
  'x-ms-request-id',
  'bf07939c-f7d8-11eb-ad25-0022484e2498',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
