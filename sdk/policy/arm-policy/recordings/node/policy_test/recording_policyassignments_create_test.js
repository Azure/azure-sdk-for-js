let nock = require('nock');

module.exports.hash = "5cf7c3dad62da5a8ace919ef2d0bf7bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'bb8a9736-480d-4035-82b3-7bd55dc51a00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Alo5tno4y5RJiYoXuL2cckQ; expires=Thu, 06-Jan-2022 09:30:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMlsOd2UdHcHyQMCopreI8aex928m1qh1RmU8xVA1qdIMh54bx16FnDB_2Xq6-plYyMWf7JFfI3hnl9R8WNa6pRJ5HByyc91BtYCjg_PcfMPsmO9VpPG8lCo2TsG-9M6POPNWUU0z9kPn5p358BA3SmXLCQzj9b3pMs7CcMkhUxYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 09:30:28 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'c1cfa25c-7442-47ca-b044-7b1762201b00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkM2YxVvjuxNhX_BhyTT23U; expires=Thu, 06-Jan-2022 09:30:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXcQEEcr4EBn4Z49eB7xU3Fjh5_CWomJbzrEcEw4BjVgHA6RVAX9FCJcWD00vvseBHk3NdnPCzFnISU6ydS0LegzfGH9PpxWB9ToaX5qL4L_dzx2G_9g41w3ZbYSr3SPlUq99gXAfAGEgMxB_kp79kzSY6RusFPSNyDTfRNA2Bg4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 09:30:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=87a6674c-ab7f-498d-83e5-9904916f1b6d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'daa1b668-967a-4557-9fd1-c449f4091a00',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=At-VRqi2F3VFgPQne1jZWHAWPr5BAQAAALUgQdkOAAAA; expires=Thu, 06-Jan-2022 09:30:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 09:30:28 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/jspolicy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8afaa2ca6d76fae57f9478f3e3a59376db5f868f4d1a29ae1efb3e52c7f97cfe88359de4ceb62d516d5923e7f5a2d3f6ed3699d676d9e66e94f7e9166cbebab795ee7d47491b7d92c6b33409726b327d7f4d2f9834fcf0ff63ebdbffd69f620dfdecff6ceb71feece0eb6efefec4df24fcf77f667e7fbf4babef225fad9dbd9dbdddedddbde79f066e7e1a37b3b8ff6ee8ff71e1eecef7fbafb53d474bda27e04fa725d96f603bc8b0f7ec94887f76a5dd2707ef147c539fecdcab2a25fbef78b3f6aaa753da56f3ecaa63cb2d147f92f5a672511e6a32f8a695d35d5793b3ea916ab759bdfbd2cea96befc229bce8b65dedcbdaa8b36ffe8978c7ef147e7455ecee89db29a660aa72014bef7519e35edbaa13fe5973dfa6d9a2fdb3a2be9d3efff92ef1382ed3ca7a6bff8a3fcfc3c9fb60464962faf3ffa25bf84be2a00f32e4dd76531cbebe6ae43e98b6c995de40b027577617ffdbcaed6abe6eede8e3cdbf4ff5dfcc3bfc93ffceceedd8b023d5eb7f3aa2e7ec043b82b847b9a9f17cb021f34777fba91cf6810adb0cbaddfa55796d902af78409aeba6cd174f639c92ed3fc876efed6c9f67f7a7dbfbb3c9cef6c3e9f4fef664fae9fd9dfbd383fd07fb0f08807d45b9f778b522d08c82fbf618348df2d183ddfb0ff7ef838f4a9a9d2faa5941f348d0a8fd2d1108df8b62e137b919955ff2","4bfe1fa5e32c0b9f030000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-tenant-reads',
  '11994',
  'x-ms-request-id',
  '4cf04099-7172-4b4c-b3c7-43e93e4f22f2',
  'x-ms-correlation-request-id',
  '4cf04099-7172-4b4c-b3c7-43e93e4f22f2',
  'x-ms-routing-request-id',
  'JAPANEAST:20211207T093029Z:4cf04099-7172-4b4c-b3c7-43e93e4f22f2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 09:30:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('//providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123//providers/Microsoft.Authorization/policyAssignments/passigment', {"properties":{"policyDefinitionId":"/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/jspolicy"}})
  .query(true)
  .reply(201, {"properties":{"policyDefinitionId":"/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/jspolicy","scope":"/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123","metadata":{"createdBy":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","createdOn":"2021-12-07T09:30:29.6720077Z","updatedBy":null,"updatedOn":null},"enforcementMode":"Default"},"id":"/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyAssignments/passigment","type":"Microsoft.Authorization/policyAssignments","name":"passigment","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-12-07T09:30:29.636594Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-12-07T09:30:29.636594Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-tenant-writes',
  '1198',
  'x-ms-request-id',
  '39e17ee0-f241-493a-a165-d9f6c3b7dfad',
  'x-ms-correlation-request-id',
  '39e17ee0-f241-493a-a165-d9f6c3b7dfad',
  'x-ms-routing-request-id',
  'JAPANEAST:20211207T093030Z:39e17ee0-f241-493a-a165-d9f6c3b7dfad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 09:30:29 GMT'
]);
