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
  'b337dc1f-cf49-42cb-831f-bd2e93c21f00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkK5QeMd6htGsom5VIhtlC8; expires=Fri, 19-Nov-2021 07:57:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrkndply7vme7vyaeOE2Up9dEpA-5aGOGAnV_OskZJdlW9ak9IgLmOOzZrGg7UC5szLdN0S82zE7XR136m5TXaLccYdlep9rTseFZcyDnF7IZK6mjqpz94g2Rq4sIxTiXmUdQIOa9EdkhdnQcdn2YxvacgGmYedGZqfnktTS7WIqMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:57:57 GMT',
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
  '9ea55952-2798-4ab6-b940-678ab2e01d00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqWZ7JOxyypEkEZH2Ss79QQ; expires=Fri, 19-Nov-2021 07:57:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8mRaIsUe8OWUToPaS4csRDTVSuSB7D3z-hWBPytJYch9bc7OXiXgMfmosGn36wTKBTrJpp79mS0NzKp69ycHgYTyX4AI-0LeFi3VqlieI70O20KgCL8m9TWeHXJdgPjkqTY8IvXQsh079-hkHngLQ1S3yJUESIer25U-7RsWFvsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:57:58 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=dcca8b84-484a-4ed0-a234-82fc95b2ea42&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '862fd48a-9fb8-43a3-8f3e-d5a04e0a1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtdhtdLtM7dFqTrRCNjEQ4QWPr5BAQAAAAbDAdkOAAAA; expires=Fri, 19-Nov-2021 07:57:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:57:58 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/exportPipelines/myexportpipelinexxx', {"location":"eastus","identity":{"type":"SystemAssigned"},"properties":{"target":{"type":"AzureStorageBlobContainer","uri":"https://accountname.blob.core.windows.net/containername","keyVaultUri":"https://myvault.vault.azure.net/secrets/acrexportsas"},"options":["OverwriteBlobs"]}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147973377fb7aaeaf665b1ca4b6ad27c34faa8aca6595b544b82717afcfacd57afe9b362962fdba2bdfee8d12ffe685517cb69b1cacab31935d999ee4ea7bb07fbdbfbbb0f26dbfb0feecdb61f3e9c7dba7db0bb737ff7e1bdfcd3f383290168f365b66cf98d077be70f0f0e26e7db079f9eefd26bd9f9f6c3dd6cb2bd377b309dedeceece26fb0ff0860ca3b96eda7c71dc34c5c5329f7df44b800b7d7cb7594f9a695dac806973f721c1bc3f3b38dfbe37fdf401c1dcdb2798d307db07d3f31d823a39dfdbdfbd5be74db5aea7f9e775b55e357717d73f4da09bf6eeaaae2e69807573f796345b5ceb1fd7efdebdbbbeeed290be974f56fa09b5a2012db3050614ff5286f9346b3390785ae7599bcf9e10bd3f3acff61f64bbf776b6cfb3fbd3edfdd96467fbe1747a7f7b32fdf4fecefde9c1fe0326977de58dd0ed78b52a0b9d48fbed714bdfecedeced6eefee6cefedbcd979f0e83efdefe178f7e0dec387fbf73fd9d979b4b343edcbac69bfa866c5790190f4d22db108df8ba2e237b9253e34e93447abbc6e89faa04f9bd51739bd4bbf69173f58d7f9ebb6aab38bfc49594decf45187ebbaa016f3b65d358feedecda6d36abd6c3119e309b51c4fab3a1f5f15cb5975d58c97797b776ade451b7aff6d7efd93d9ba6cbf0ae02cae2ff1e158fecdd03fbfdde444ebb6a17e6a99e7266b30804a38f5a347dffbe8cbcbbcbeaa8b96316d3efa3e8feeb268e8fb6279f1baa599a28e5eafa7d33c9f81e77f","c9ff0314ea26fad5030000"], [
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
  '1197',
  'x-ms-request-id',
  '45db2926-277a-4dc8-8bb5-b603f6be3a47',
  'x-ms-correlation-request-id',
  '45db2926-277a-4dc8-8bb5-b603f6be3a47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211020T075800Z:45db2926-277a-4dc8-8bb5-b603f6be3a47',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 20 Oct 2021 07:57:59 GMT'
]);
