let nock = require('nock');

module.exports.hash = "37f0e73ac784b82cab4e3d0a7ce1bea4";

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
  'd4101ec2-ba9d-4bf0-b788-a4a2aedb0400',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnI2ZCfa3hxNlIE6SF0AGfU; expires=Fri, 03-Dec-2021 09:46:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3WAO6Z_9suqeT-UIzOQF8velBLNVmG8_vgDANhSNV0Qj7UhJLv-aRScXmGSodJdpVAmNPfaiJ_l6Cg-EBodLFGHHW3SK8h_HTs_Mbbcs9BBJGDm0cKCex8OqkOcTasNsBmmT-Em8etlr37XoBawldxAhkHsM1vyKLvx45AFskEcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:14 GMT',
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
  'edf2b598-6436-4d5a-afcb-728a60820500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ap5MTeMfGYxOrlGp0dEVQsw; expires=Fri, 03-Dec-2021 09:46:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrTp5d8JLLi0Nk_kvrLoAZbsSTIARe1PLkHtJWWgs3JYk6mCh3NOHurXLdEKC5XMkeJB-HkNlDEJP41oZiUPoGqMuQTFBIMQ2CW_AZNDv3-KP75uSHdRn0n4ENrnBkV5apx0jdvhNxOqfHXwNmNSxvkcw9JKE7946SE33CqypcXp8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:14 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=893d4e8b-d032-47a9-94d7-5a46751dc176&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'beeb6672-f285-407a-ac0e-c39d64860500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgrzD5g2pTtBgoA0ZHoqxF8WPr5BAQAAAGdRFNkOAAAA; expires=Fri, 03-Dec-2021 09:46:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:14 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/exportPipelines/myexportpipelinexxx', {"location":"eastus","identity":{"type":"SystemAssigned"},"properties":{"target":{"type":"AzureStorageBlobContainer","uri":"https://accountname.blob.core.windows.net/containername","keyVaultUri":"https://myvault.vault.azure.net/secrets/acrexportsas"},"options":["OverwriteBlobs"]}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147973377fb7aaeaf665b1ca4b6ad27c34faa8aca6595b544b82717afcfacd57afe9b362962fdba2bdfee8d12ffe685517cb69b1cacab31935d9dfc9cfb307f7f2ed87f73e9d6cef9f4fee6d4fb2d974fbd36c9adffb746feffe7e764000da7c992d5b7ee3c1def9c38383c9f9f6c1a7e7bbdbfbbbd9f9f6c3dd6cb2bd377b309dedeceece26fb0ff0860ca3b96eda7c71dc34c5c5329f7df44b800b7d7cb7594f9a695dac806973f721c1bc3f3b38dfbe37fdf401c1dcdb2798d307db07d3f31d823a39dfdbdfbd5be74db5aea7f9e775b55e357717d73f4da09bf6eeaaae2e69807573f796345b5ceb1fd7efdebdbbbeeed290be974f56fa09b5a2012db3050614ff5286f9346b3390785ae7599bcf9e10bd3f3acff61f64bbf776b6cfb3fbd3edfdd96467fbe1747a7f7b32fdf4fecefde9c1fe0326977de58dd0ed78b52a0b9d48fbed714bdfecedeced6eefee6eefdc7bb3f3f0d1fea78f76ef8f3ffd74677f7f6fef939d9d473b3bd4becc9af68b6a569c1700492fdd128bf0bd282a7e935be243934e73b4caeb96a80ffab4597d91d3bbf49b76f183759dbf6eab3abbc89f94d5c44e1f75b8ae0b6a316fdb55f3e8eedd6c3aadd6cb1693319e50cbf1b4aaf3f155b19c5557cd7899b777a7e65db4a1f7dfe6d73f99adcbf6ab00cee2fa121f8ee5df0cfdf3db4d4eb46e1beaa796796eb20603a884533f7af4bd8fbebcccebabba6819d3e6a3eff3e82e8b86be2f9617af5b9a29eae8f57a3acdf31978fe97","fc3f63337ce8d5030000"], [
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
  'api-supported-versions',
  '2019-12-01-preview, 2020-11-01-preview, 2021-06-01-preview, 2021-08-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1194',
  'x-ms-request-id',
  'f78945cb-03bf-4588-9673-a50ae4bccd46',
  'x-ms-correlation-request-id',
  'f78945cb-03bf-4588-9673-a50ae4bccd46',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T094616Z:f78945cb-03bf-4588-9673-a50ae4bccd46',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 03 Nov 2021 09:46:16 GMT'
]);
