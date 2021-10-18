let nock = require('nock');

module.exports.hash = "43a1d1f75484fbd9ceb8e68334d18563";

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
  '90bf9598-47f6-443d-a82e-58f67a9e0f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aijz46IoPCRBpCZ1UZbQbCs; expires=Wed, 17-Nov-2021 01:50:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrxk5s_rn8ZNeCUJAUDRuyTgQQKnW1vhuu_9hPh3waNxeZ-PvTELOimGQTltYQiDkwMz3pi_hYakkDFYGuxvOBFd2VbWp6lTtoHvXHQ6EQU6Jr7fOe44qZeQ9S-k2dr727kDFF0rXSGROR68EKL8sRxn0ei_oJ6yksj3orgjUlQTwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 01:50:27 GMT',
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
  '31d2e3b7-79a7-4da5-8620-a1537cd30e00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Apbw2Owko5lKtWbyOw1CNgk; expires=Wed, 17-Nov-2021 01:50:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvKp3G0ZiY4bmDcbEutwXxMk3RCPfXgr_-jDplBWuXfv0itIw4m8QZ8BpctWdM096nyFnLNJNlonJo80AWyCGzadDbfQA4h4AXdRa-2OeVqL0uXXrBX5WMn2nYe2KUrWSfgVF9Jvr2pHpy2eqhA6qDOuAbbuUaN3oItG6A0zLJD0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 01:50:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ee5dba2f-71ed-4400-bf67-6fdc35177795&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '31d2e3b7-79a7-4da5-8620-a1537dd30e00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Auf2iV5hNO1MoMzJ_ED1pLYWPr5BAQAAAOTJ_tgOAAAA; expires=Wed, 17-Nov-2021 01:50:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 01:50:28 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/policynameaxx', {"properties":{"policyType":"Custom","description":"Don't create a VM anywhere","policyRule":{"if":{"allof":[{"source":"action","equals":"Microsoft.Compute/virtualMachines/write"},{"field":"location","in":["eastus","eastus2","centralus"]}]},"then":{"effect":"deny"}}}})
  .query(true)
  .reply(201, {"properties":{"policyType":"Custom","mode":"Indexed","description":"Don't create a VM anywhere","metadata":{"createdBy":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","createdOn":"2021-10-12T09:15:07.5619086Z","updatedBy":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","updatedOn":"2021-10-18T01:50:28.823231Z"},"policyRule":{"if":{"allof":[{"source":"action","equals":"Microsoft.Compute/virtualMachines/write"},{"field":"location","in":["eastus","eastus2","centralus"]}]},"then":{"effect":"deny"}}},"id":"/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/policynameaxx","type":"Microsoft.Authorization/policyDefinitions","name":"policynameaxx","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-10-12T09:15:07.5424058Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-10-18T01:50:28.7958754Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '996',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-tenant-writes',
  '1199',
  'x-ms-request-id',
  '5e34bdac-51da-46ae-b05f-168aa65852b9',
  'x-ms-correlation-request-id',
  '5e34bdac-51da-46ae-b05f-168aa65852b9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211018T015028Z:5e34bdac-51da-46ae-b05f-168aa65852b9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Oct 2021 01:50:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/policynameaxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8afaa2ca6d76fae57f9478f3e3a59376db5f868f4d1a29ae1efb3e52c7f97cfe88359de4ceb62d516d5923e7f5a2d3f6ed3699d676d9e66e94f7e9166cbebab795ee7d47491b7d92c6b33409726b327d7f4d2f9834fcf0ff63ebdbffd69f620dfdecff6ceb71feece0eb6efefec4df24fcf77f667e7fbf4babef225fad9dbd9dbdddeddd9dedd7bb3f3f0d1eefd473b0fc6f73fdd7db873f0e94f51d3f58afa793fe8fa4a08fde0cdceeea3fb3b8ff60ec6077bf7f6eeedfed447bf64a49479b52e8912bff8a3e21cff666559d12fdffbc51f35d5ba9ed2371f655326cae8a3fc17adb39268fad117c5b4ae9aeabc1d9f548bd5bacdef5e16754b5f7e914de7c5326fee5ed5459b531fbff8a3f3222f67f44e594d338553106edffb28cf9a76ddd09ff2cb1efd36cd976d9d95f4e9f77fc9f709c1769e53d35ffc517e7e9e4f5b0232cb97d71ffd925f425f1580799766fab298e57573d7a1f445b6cc2ef20581babbb0bf7e5e57eb5573776f479e6dfaff2efee1dfe41f7e76f7ee45811eafdb7955173fe021dc15c23dcdcf8b65810f1afd64992df2ecdd3b1a492bec766b00f40a5ea657e42bfc21909aeba6cd174f63ec96ed3fc876efed6c9f67f7a7dbfbb3c9cef6c3e9f4fef664fae9fd9dfbd383fd07fb0f08807d4545e078b5a21e180ff7ed31a86bd9c567c6fdbdfd9dfb0760c692e6e98b6a56d08c12346a7f4b04c2f7a258f84d42543cce7df0f0fec183fbfbc4babf","e4ff0144cd10b6e4030000"], [
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
  '11999',
  'x-ms-request-id',
  'f268698a-93ab-4928-8dbe-5a4797e272ff',
  'x-ms-correlation-request-id',
  'f268698a-93ab-4928-8dbe-5a4797e272ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211018T015029Z:f268698a-93ab-4928-8dbe-5a4797e272ff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Oct 2021 01:50:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('//providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123//providers/Microsoft.Authorization/policyAssignments/passigment', {"properties":{"policyDefinitionId":"/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/policynameaxx"}})
  .query(true)
  .reply(201, {"properties":{"policyDefinitionId":"/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/policynameaxx","scope":"/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123","metadata":{"createdBy":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","createdOn":"2021-10-18T01:50:29.2802899Z","updatedBy":null,"updatedOn":null},"enforcementMode":"Default"},"id":"/providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyAssignments/passigment","type":"Microsoft.Authorization/policyAssignments","name":"passigment","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-10-18T01:50:29.2358928Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-10-18T01:50:29.2358928Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '961',
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
  '470543ce-17a5-40a3-b7df-30ee649f49d8',
  'x-ms-correlation-request-id',
  '470543ce-17a5-40a3-b7df-30ee649f49d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211018T015029Z:470543ce-17a5-40a3-b7df-30ee649f49d8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Oct 2021 01:50:28 GMT'
]);
