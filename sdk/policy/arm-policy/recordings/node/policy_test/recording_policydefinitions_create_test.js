let nock = require('nock');

module.exports.hash = "6fdcb8257027bab970a2750e64c5a29a";

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
  'eca44161-bd66-497b-a7b0-ead7d8911a00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtkYYRPEZuNFleQtmIVCTyo; expires=Thu, 06-Jan-2022 08:31:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra8T3gWL-HnaTk92zJnircSFqEgn-5drqWZ2ijevzTIC3TAKuVwtiH_Y9nCaqbuDiF3YJaWZtEmKQP7jhqGHobeyIev6RBtqwJQPJj2fAp7REWa8D2UdaBqBxm_50OHwGatatRqjSkfIsvJaGBEUPjCKVLc4RR4dLEpWGTMjqDWQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 08:31:32 GMT',
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
  '66e9cb12-9881-44b0-9397-f8f94e301d00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuhpOpeD05RFlFOrkLjedac; expires=Thu, 06-Jan-2022 08:31:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrwx60s_5amxCzwTkU8038SoOUoG4EbhtklJAMMW9_KLOyLsLcCTX-VYF7GrKj6OYztxEWr9ONoi8LFWOrdnmVqsM2391NKNAKnvhh1srARWpEGUns31pjDh1tYZ_K23cytXhtnJY_7mOHep3jEVvxHM04607SiJkPUwotwinuBCUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 08:31:32 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d65b2e4f-4129-4069-aedc-9322b6997333&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '66e9cb12-9881-44b0-9397-f8f950301d00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak-wm4dTwoBGp19AZ26eUrQWPr5BAQAAAOUSQdkOAAAA; expires=Thu, 06-Jan-2022 08:31:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 08:31:33 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/jspolicy', {"properties":{"policyType":"Custom","description":"Don't create a VM anywhere","policyRule":{"if":{"allof":[{"source":"action","equals":"Microsoft.Compute/virtualMachines/write"},{"field":"location","in":["eastus","eastus2","centralus"]}]},"then":{"effect":"deny"}}}})
  .query(true)
  .reply(201, {"properties":{"policyType":"Custom","mode":"Indexed","description":"Don't create a VM anywhere","metadata":{"createdBy":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","createdOn":"2021-12-07T08:31:34.6382374Z","updatedBy":null,"updatedOn":null},"policyRule":{"if":{"allof":[{"source":"action","equals":"Microsoft.Compute/virtualMachines/write"},{"field":"location","in":["eastus","eastus2","centralus"]}]},"then":{"effect":"deny"}}},"id":"/providers/Microsoft.Management/managementGroups/20000000-0001-0000-0000-000000000123/providers/Microsoft.Authorization/policyDefinitions/jspolicy","type":"Microsoft.Authorization/policyDefinitions","name":"jspolicy","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-12-07T08:31:34.6111413Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-12-07T08:31:34.6111413Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '927',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-ratelimit-remaining-tenant-writes',
  '1199',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Kestrel',
  'x-ms-request-id',
  'fda1e7c2-0479-438d-ab0c-942eaa2e7d2e',
  'x-ms-correlation-request-id',
  'fda1e7c2-0479-438d-ab0c-942eaa2e7d2e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211207T083134Z:fda1e7c2-0479-438d-ab0c-942eaa2e7d2e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 08:31:34 GMT'
]);
