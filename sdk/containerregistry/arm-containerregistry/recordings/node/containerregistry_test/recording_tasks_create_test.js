let nock = require('nock');

module.exports.hash = "c99415df90fe8363d69b304973445b4b";

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
  '9ea55952-2798-4ab6-b940-678ae4e01d00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsCQmifAfOFJotBL0i4gbyo; expires=Fri, 19-Nov-2021 07:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRfcq9NjrWq2Z2NgaP_Y-hL9-QV-pvfnwO9_iJsar-IApNOv2ByLJTNnx5JEpVPUXEk8Eavv6C8Eu8zUaE_fhe_Ykd7DtStcryOupKxoS40EaQz2BpymcsFIV2O_x8aUCSN_meY-H3w_KyFQtLQ4Fe-Qa3zsKf9CWSD2BO9eN_0YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:06 GMT',
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
  'cdee7f40-c5db-41db-bba8-8a28dff01e00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhQFWQMTPmBLuVJI6YsEp1o; expires=Fri, 19-Nov-2021 07:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXH6Jpe3_oxXfWquWxzp-593Gux4oIjHpN6Nic17xSNtQII_5KCIUawT8bxdpEGWhmq0LinfTDi8QQZoAIlhnKyAUoR2GFxcBRaBFu26dUo-eGMg_sFVM8Kw3IJC_OzVDLgXemVodCtom0t4nI6jd8sW2rMSXowvj3qftgtwP1scgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:06 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6f121c32-8a33-4cd6-8b57-785a96dbc2ea&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'cdee7f40-c5db-41db-bba8-8a28e1f01e00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkeFwECu0K9Nol2jtKe_PU0WPr5BAQAAAA7DAdkOAAAA; expires=Fri, 19-Nov-2021 07:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:06 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/tasks/mytaskxxx', {"location":"eastus","tags":{"testkey":"value"},"properties":{"status":"Enabled","platform":{"os":"Linux","architecture":"amd64"},"agentConfiguration":{"cpu":2},"step":{"type":"Docker","contextPath":"https://github.com/SteveLasker/node-helloworld","imageNames":["testtask:v1"],"isPushEnabled":true,"noCache":false,"dockerFilePath":"DockerFile"},"trigger":{"baseImageTrigger":{"baseImageTriggerType":"Runtime","updateTriggerPayloadType":"Default","status":"Enabled","name":"myBaseImageTrigger"}}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147973b7cd9ab7cd47a38f5675b5caeb963efae8d12fc65f97455354cb6279f1bacd5a007cbd9e4ef37c96cfa8f5b4ceb396be7e2a5fededeced6eefee6cefedbcd979f0e8fec1a3dd9df1bd0707f70e3eddff6467e7d1ce0ebdd210983501ffe874994d4a86b22ab3f6bcaa17e8b1c257cf8be5fa1d7d91d5d379d1e6d3765d037cb6987dbaffd12fa1cf2ff2654bc3392f2ed635238057a7abf5478ff6e8ebb658e4d5bafde8d1bd4f7776d063bec2f74a90a7d5f46d5e13f46241705e640b0cf57b1fb579d382088f2e773ffa3e7dd9bc5c377383e3a3b65ee7a38f96d549369d1390f3ac6ce8ef19837a5694f9cbac9d5bd8f880e04f89def9bb56bf9ab7edaa7974f7ee45d1ced793f1b45adc7ddde697f973ea33afef2eab59be3dcfcbb2baaaea728651d2c45c5c10a684fa246bf233a0fb66f8b33732bc57eb25c64ffdaf57339a16fdf665765d56d94c1b3dcdcfb375d952a3c8742c8924f4c1e2fa49a7878f7ec92f21b40a22c747779bf5a499d6c50ac46fee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff76e9d37d5ba9ee69fd7d57ad5dc5d5cff34cd4cd3de65269be57573f796bcbab8d63faedfbd7b777d2dbc4b9fe2277de20fc17dd46617344ce202eaf26d7e4ddf5e66e53a07a1cb6aaa4cf4519e352007d1e59a905b105f677889f93c9f3dc16be7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff8000d85794e4c7ab5559683ff6db6362d2bed4ec3c1cdfdf3f78f860f7a1959a92f0faa29a15e70540d24bb7c4227c2f8a8adfe496f8fc925f","f2ff006b5efb8c5f040000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-correlation-request-id',
  'f49ed5cd-3aff-4192-8a54-abd356cea57a',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1196',
  'x-ms-request-id',
  '382ef5f6-2910-4c1a-83e4-f4209e437c68',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'nginx/1.15.10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211020T075812Z:f49ed5cd-3aff-4192-8a54-abd356cea57a',
  'Date',
  'Wed, 20 Oct 2021 07:58:12 GMT'
]);
