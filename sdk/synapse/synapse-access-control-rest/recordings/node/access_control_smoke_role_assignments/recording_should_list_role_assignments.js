let nock = require('nock');

module.exports.hash = "c090fe0d54b16bfa66262584a73c7981";

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
  '834a483f-9b35-45d3-b09d-5efc998a9d00',
  'x-ms-ests-server',
  '2.1.12158.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkoBeWQaDjhNi8_1CA1pkxI; expires=Fri, 19-Nov-2021 22:09:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXiC86z4hBubeVtxj4UKhe9jz-5BOhrnVk6y6ZPiq28Ofmu-3hpxjeKmcDISCPIkYUFvqomvOwlhovnjrahjg5ArjrGQi41KQbZe7cD12DiuyuUMxXdqI1DsEnikTm4aEiZFzhZva48iX-zZRMXHh1etffdpCOP7eadOapADONw4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 22:09:39 GMT',
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
  'd9cb3bf8-be58-4ad6-8134-40dce0652101',
  'x-ms-ests-server',
  '2.1.12158.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsRGwnjwXfZIhOaLMLxlYwc; expires=Fri, 19-Nov-2021 22:09:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrR15SUOoQ6svkFPwuIDJxndxJ2i83r11M3AVBRvw1L_YF0RKYuW5IPHarxZ_eUCoYyv3RpQBS4YiDtZwVKnXaqIVJkdiIJqSda2auXPVouMTwQosuPSWg0nDtvtbualxks4klCGymXgjnzhJnHlarkzg38AXS1H47MDWUu2HNi0sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 22:09:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8ddc0eff-e740-4645-b1ae-e177a96e691d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b26484eb-1acb-4348-8a38-545404152a01',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnFpFY2572NEr3wx7F1uuLg; expires=Fri, 19-Nov-2021 22:09:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 22:09:39 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/roleAssignments')
  .query(true)
  .reply(200, {"count":20,"value":[{"id":"b57b943c-e3a3-4147-af09-0f7a0d99aa69","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"77d17c3a-4c6c-46dc-982b-7e9dc904d229","scope":"workspaces/xysynapsetest","principalType":"ServicePrincipal"},{"id":"d4eda14e-38fe-4ea4-911c-f3728aa4129c","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"794b8347-c398-4fd8-b557-37b60946e830","scope":"workspaces/xysynapsetest","principalType":"User"},{"id":"2df027b7-429b-4041-ae63-649868b21cae","roleDefinitionId":"7572bffe-f453-4b66-912a-46cc5ef38fda","principalId":"794b8347-c398-4fd8-b557-37b60946e830","scope":"workspaces/xysynapsetest","principalType":"User"},{"id":"2f03a406-f9f7-4f59-9c09-e87b46072f45","roleDefinitionId":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","principalId":"794b8347-c398-4fd8-b557-37b60946e830","scope":"workspaces/xysynapsetest","principalType":"User"},{"id":"fb12e920-542d-11eb-842b-a0481ca055a9","roleDefinitionId":"7af0c69a-a548-47d6-aea3-d00e69bd83aa","principalId":"30511c9d-ba1a-4c7b-b422-5b543da11b3f","scope":"workspaces/xysynapsetest"},{"id":"14103e0e-86db-425b-a50d-bdb323ffaaa0","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"35ac9d32-a8ca-4324-9393-d4000746f07c","scope":"workspaces/xysynapsetest","principalType":"User"},{"id":"7af0c69a-a548-47d6-aea3-d00e69bd83aa-30511c9d-ba1a-4c7b-b422-5b543da11b3f","roleDefinitionId":"7af0c69a-a548-47d6-aea3-d00e69bd83aa","principalId":"30511c9d-ba1a-4c7b-b422-5b543da11b3f","scope":"workspaces/xysynapsetest"},{"id":"fbd86815-541e-4a10-82f9-55091ef4faf9","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"c21a53bd-e8d7-412c-b60f-19e9f7fb0c7e","scope":"workspaces/xysynapsetest","principalType":"ServicePrincipal"},{"id":"378b9982-aa49-4b93-9f4e-db39fda4d115","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"f8cfe8ca-1f83-4deb-814c-ee49336fdebd","scope":"workspaces/xysynapsetest","principalType":"ServicePrincipal"},{"id":"262381d6-b22f-45a4-a40d-8d10e6996b54","roleDefinitionId":"2a385764-43e8-416c-9825-7b18d05a2c4b","principalId":"c582486c-3066-4c6a-b657-82f998581fc5","scope":"workspaces/xysynapsetest"},{"id":"c0f8a8a4-5a16-4dc6-9d78-706b3d0e49ed","roleDefinitionId":"2a385764-43e8-416c-9825-7b18d05a2c4b","principalId":"6e466ee4-5f74-4880-97a9-4eb11176961a","scope":"workspaces/xysynapsetest"},{"id":"8faea990-7bf3-403e-a192-84551335db9c","roleDefinitionId":"2a385764-43e8-416c-9825-7b18d05a2c4b","principalId":"e95b85d4-e5d1-4ba0-bb60-73c233ee8061","scope":"workspaces/xysynapsetest"},{"id":"daf7c955-9afb-417b-938a-459128682473","roleDefinitionId":"2a385764-43e8-416c-9825-7b18d05a2c4b","principalId":"5703759c-909d-4b6c-b2f9-af350de593ef","scope":"workspaces/xysynapsetest"},{"id":"a48086cb-4013-4282-a983-e2529170313c","roleDefinitionId":"2a385764-43e8-416c-9825-7b18d05a2c4b","principalId":"994ecf5e-be36-49a4-af62-72f5c55a5c3d","scope":"workspaces/xysynapsetest"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-eca6d4d4-89be-4b73-8699-6e70c9cbe6bf","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"eca6d4d4-89be-4b73-8699-6e70c9cbe6bf","scope":"workspaces/xysynapsetest"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-e6a55cd1-b0db-4fc9-b3e3-88507ceda553","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"e6a55cd1-b0db-4fc9-b3e3-88507ceda553","scope":"workspaces/xysynapsetest"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-8dd5e62d-9a80-43ce-8e9b-b3e7dc62cdb7","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"8dd5e62d-9a80-43ce-8e9b-b3e7dc62cdb7","scope":"workspaces/xysynapsetest"},{"id":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1-e6a55cd1-b0db-4fc9-b3e3-88507ceda553","roleDefinitionId":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","principalId":"e6a55cd1-b0db-4fc9-b3e3-88507ceda553","scope":"workspaces/xysynapsetest"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-30511c9d-ba1a-4c7b-b422-5b543da11b3f","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"30511c9d-ba1a-4c7b-b422-5b543da11b3f","scope":"workspaces/xysynapsetest"},{"id":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1-30511c9d-ba1a-4c7b-b422-5b543da11b3f","roleDefinitionId":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","principalId":"30511c9d-ba1a-4c7b-b422-5b543da11b3f","scope":"workspaces/xysynapsetest"}]}, [
  'Content-Length',
  '4318',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-continuation',
  '',
  'x-ms-request-id',
  'e87d94e5-d2e4-40ca-98b1-6ed3a65d53eb',
  'Date',
  'Wed, 20 Oct 2021 22:09:39 GMT'
]);
