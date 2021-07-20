let nock = require('nock');

module.exports.hash = "ed0144555258e44db57c40caad94ff21";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy162679514273103323"},"newDate":{}}

nock('https://skrattestation.azurewebsites.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpfRUZtUTVVQm9lNHJMNUltNmw1cU1rQXN0QXluaE5JQUJ6dFZLQ0RMV1UiLCJqa3UiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL3NrcmF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiIwQU8zUk85UWpJdWlFbmw3QlliLTVnNW1SVUZZeFJ5aXktLXpURWgzLXRFWmVPUktHM2lWT2Zha2R1V1NGcVptVDZJdGxRZlM2b1BrNG1qRWljZmNNdzBTRlF3c3pQd3VTV1Z5LVAzLTg5T2FHWThxbXBqX3E1cmI2MlRoX05lVXlURmU1Zkh6eGxrNjFwV0FTeXlYV1RQXzZaQjlNY3dJaXRJV2hwcmVnOFRiOHUtTUxYVi1oeDdsaTZrYWs1aFNIVVd1VUlzOG0xTm96cGV6YnBPOWpwU2U1emNSRVNqVmdaeGhjcHE4MlU2ZjdCVGhYd1oxeFBFeVJOOUE5NVlCdS1fNm5CVkhwN2w2aHJJUW9PeGt6OGVmRWladExCYzdXWkFtc1RzUW5WWHVncXVJS243TFdSMlZvOGZIVGdwTW03UnlmdkNlcW5ZTnRmWk4ySGhyWlEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjY3OTUxNDIsImV4cCI6MTk0MjM3MTE0Mn0.lC1eflqTK1ttupG4xAZJ1AhdMX4IQneu_SAQ2NX8aBe5-bLtW8cMezit43C6-Kd99wvCGQs0W44_FmjL-xBqqe1x3kuexboCZSc7D0kGhujtzYpRASeCHknU6aB72WGKa2eaF-ZfBwT2L_Nj3YrnZSaUnsTQuhfm08PVn3fk9BYQH0cno2G_K6JgfqLquA2f9XK1Y5bqmtFqwERvl6DIIIIYsWVSs1Nbi_mcjKEYieQozI-43A2Iavk94L-F3cU21IQh3tjnxfILxJkgY2bpX3xIwS_maQAmkihYQMyTPFEa2cegrSypjUW9eVYly7Lxp5B4ZkL67J1fGFrxKlBVjQ"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"519-fTm7FXGwdXoblrMIP4wLOOKbfaQ"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;Secure;Domain=skrattestation.azurewebsites.net',
  'Set-Cookie',
  'ARRAffinitySameSite=31a267ed7b71ec86982412cc9dc4ad2f31ca2b8f51b692363aa765c405b03b84;Path=/;HttpOnly;SameSite=None;Secure;Domain=skrattestation.azurewebsites.net',
  'Date',
  'Tue, 20 Jul 2021 15:32:22 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162679514273103323/create')
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
  'ad79732e-e96f-11eb-9ff0-000d3ae28186',
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
  '6592a016-fd0a-43df-ab98-a6f2b5c7fc00',
  'x-ms-ests-server',
  '2.1.11898.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufzGtGZi9FLjB5JyRFLzjwuyjXLAQAAAIHjiNgOAAAA; expires=Thu, 19-Aug-2021 15:32:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjqAPIuhvA_8uAzEu_LEtZd-sF8Q7YZ304XFI3UOm8EfZUH9hAZJ2Ba3QApaznMgJD_CYxR39wA1MdGJlLCG0Y3BcWieQZb-GxVepBk_qVb2Whv_IhfOAfLmTgpW5HXpbhXeyV7TuTsWKd0_OrlJQIscnn3RlBmPoCVJNJXy4i04gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 20 Jul 2021 15:32:21 GMT',
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
  'e8e97e39-c5e7-4b62-b356-71ca5abaea00',
  'x-ms-ests-server',
  '2.1.11898.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufzGtGZi9FLjB5JyRFLzjwuyjXLAQAAAIHjiNgOAAAA; expires=Thu, 19-Aug-2021 15:32:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrl225_nZQMF7mOx3waNt4qY_42wdpL9__L4NmtdawjqaESKLhDsxqaShz7PfWlse-iLUyYyelWEC0-wsSSAF5yqCn7YlRNgec9PZHSkSAKB26xP7pyvaNViXS_Fel-OXmXTg1JC8dOnPT3EJhzVuOY584N0eRZFfwqjMnzPfmSL0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 20 Jul 2021 15:32:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=51a0b23c-69c5-4d68-9fa8-8f8adf7777ae&client_secret=azure_client_secret")
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
  'dbe9af15-6595-48d2-b39f-7ee76fa95802',
  'x-ms-ests-server',
  '2.1.11898.8 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AufzGtGZi9FLjB5JyRFLzjwuyjXLAQAAAIHjiNgOAAAA; expires=Thu, 19-Aug-2021 15:32:22 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .post('/keys/exportablenopolicy162679514273103323/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: adaf502a-e96f-11eb-9ff0-000d3ae28186)"}}, [
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
  'adaf502a-e96f-11eb-9ff0-000d3ae28186',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
