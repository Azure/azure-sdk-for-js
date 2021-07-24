let nock = require('nock');

module.exports.hash = "d73e305d84d2f50c6a0d4d43e039ab0b";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable162708823885709938"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpfRUZtUTVVQm9lNHJMNUltNmw1cU1rQXN0QXluaE5JQUJ6dFZLQ0RMV1UiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiI0b0I0ZEQyTE5LZFdEYm5FQkUxbGZGUDEyanJnVnQzcXZWUGVsdVV6Y0g4bkdsVW9jTkVzTGlZaGlQSHVINU45SmhfM2pQWEFGSndQMVhlZlFMdm0yUk10Y3FpNEpsTUJCUllJci0yZ1pVeDhTcHNMcTdySGU3UGpoSnhmOEFVTE1INW9TYTdIR3JRQ19LX3Z6TW9TTHVqaFZ3akNVVnp3c2sxRmlrY1F4WHRsaGhsQlN1Y0JlZ182eW82bGdnUWozQmFzQ2hOVXFWbXJBOHNVWnpxUk9tcmo1S1VTbUpxaHpYazJ2YmRZZkd0eGRPRGdQNVdJVUd6U2lUdnBRZ2d5eVNDY2U0cjZRU3dZanBhWHVzR1I0S2R1ZzFTYlpXS3JjZThFaUp6MUFZcXBicUY4R3JteXNEajlQak41c2hfRWswQnBfdjlCX081M1U5VW5peGo2QlEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjcwODgyMzgsImV4cCI6MTk0MjY2NDIzOH0.YMujHYZPoKJf_877PWVkT-A0-FwpNOBUHKeknX8Y3jNNz6HgXMxpFTJenzosqB5qOroyUodUYeK1J-52x5CEVvaFARSr15bvmsRzk2npy3Qra87-A23MaxPk5nQ5vCwW4eWV4YHxAOHhqta1uNYDprN6bOXcLddjPHI_0hpUF7CUjQ4Y6oNC8owMUekvcS9WOwwPBcJuqKe5vmnpiS9madprtd3aFZGpLVCm7QrHCbHDVENQwFbiAo2UvfqD1cuySruqUuicFfk9NZDWxSnlIkXGWDPUGC2Y6XHLcs3HRayNsF49uzYer0XP2Lzyi1QMBsDd55RjrWBabFgWt34IXA"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-JSzO0F4DEg5wk9/tzVRWHJyhpLA"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Sat, 24 Jul 2021 00:57:18 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162708823885709938/create')
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
  '183e0060-ec1a-11eb-a602-000d3a7a3d40',
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
  'ae0f224b-b115-4018-af2d-39da31b5e100',
  'x-ms-ests-server',
  '2.1.11898.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmyfsY-X8WhCqRyH2U6Lug8e087aAgAAAGpcjdgOAAAA; expires=Mon, 23-Aug-2021 00:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSOT0qoG3RTqUjTS7A_j-95O9sZ3L7TMZSzdl0ei6ad4YzwXkW2cNyng0nRtxK8uXOv4lH3tgtqzGO64OkAdnkK2slABaO33rJ3OiuUP-GSEHYhMNW-EXmHb53zVYothkXVJzy6HhCdIOY1pfwkbSL0a58axBosBkPRmDq3kU3dQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 24 Jul 2021 00:57:18 GMT',
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
  'efa22bde-62ef-4529-a05a-8e0a69c16100',
  'x-ms-ests-server',
  '2.1.11898.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmyfsY-X8WhCqRyH2U6Lug8e087aAgAAAGpcjdgOAAAA; expires=Mon, 23-Aug-2021 00:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXgRLS9_1B9Y4ulsJOiuKhpSDHL_yRiTvfbFRzOrDA3AEJFqRjSnjaHoz0-iEWtnNW9WzmqpZMSh4XkgE6SQxhbLqO2XqExjxOIk9vREje69JihR8MMGefEJAuLLJKMJUKE_8fZF4BNoWZYXptOWF7EEqdYTaTQ-1oghudjCjwJQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 24 Jul 2021 00:57:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=87f52576-b9a1-42d5-a3b8-404b5a7d1c06&client_secret=azure_client_secret")
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
  '10241810-b089-41a3-acab-e474e9c64900',
  'x-ms-ests-server',
  '2.1.11898.8 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmyfsY-X8WhCqRyH2U6Lug8e087aAwAAAGpcjdgOAAAA; expires=Mon, 23-Aug-2021 00:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 24 Jul 2021 00:57:18 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable162708823885709938/create', {"kty":"RSA","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJjb25kaXRpb24iOiJlcXVhbHMiLCJ2YWx1ZSI6InRydWUifV0sImF1dGhvcml0eSI6Imh0dHBzOi8vc2tyYXR0ZXN0YXRpb24uYXp1cmV3ZWJzaXRlcy5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Non-exportable keys must not have release policy (Activity ID: 1884a3c6-ec1a-11eb-a602-000d3a7a3d40)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '16',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '146',
  'x-ms-request-id',
  '1884a3c6-ec1a-11eb-a602-000d3a7a3d40',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
