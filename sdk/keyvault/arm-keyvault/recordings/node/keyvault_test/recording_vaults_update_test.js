let nock = require('nock');

module.exports.hash = "8d2c8c4d9fc6ec950e3474f998f45e17";

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
  '87924dab-ad29-471a-88ef-bce57fe24300',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=As0IkRSVYHtHu5nW8N55RWk; expires=Fri, 31-Dec-2021 03:09:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra7upUaOTVSfFfRuWC5CZePJuDonKRyX_4pr6EE5K6H0xxgiEjFieuqGmOEw-GxTvd5CL7WgB-TRTTUq8P7lvaVrZEIRtR34XQOM8zHs8XbARrn96Tq4_4Qlk0ReE1kpqj6VlFYBPp4m1Wl-2UF8juSXfwVc_f1NFBWqfUGVyu1UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 03:09:31 GMT',
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
  'a0cc0735-c774-41c3-92ae-98477fdc4500',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjBnt0cf9NJOqK-lA7chYec; expires=Fri, 31-Dec-2021 03:09:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKS05tVnnjeW0yHvP6mdmq3Izgw3gUu5BXTG4vh3rK94dJTGNyuHsEFcRGopPcCbWdCzmZZbTm6OoQsQ4Hz3sk7SOoSW26AKaw2xhb1WsdQpQkLLRgwBuA8xoVEvQViu2-fbPP5cPW5_6GFHl8-Y_QvXFn02PpteObbPlTRaZmx8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 03:09:31 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2fba7135-ca70-4180-9bbf-3a21cd06236c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1eccb38e-8029-4916-b814-3d1626ff4400',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkF8D90_TuRBjxDd0m5E8B0WPr5BAQAAAGzeONkOAAAA; expires=Fri, 31-Dec-2021 03:09:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 03:09:31 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.KeyVault/vaults/myvaultzzzz', {"tags":{"tag1":"value1","tag2":"value2"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e7faffcfa27b375d9debdc4bf68ccbffc809e8f461f2db3454e48841fb6d72b7c3808839a94d53403c2d42ccf9a768dcfdaeca2f9e8d12fc6cf5dfafc322bd7f9ae7cbe67fedefbe8978c3e6aae09ddc5d3accdd07c5ae7599bcf9e5c539bf36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87f4010ed2b6f04d3e3d5aa2c1421fbed714bdfecedeced6eefee6defecbed9b9f768e7e1a3ddddf1bdfbf77e8a9a9584f717d5ac382f0089dadeb2f3f0bd28067e93381af7f6c69fee101a440d9ab4555eb745cec46bdeaef1e33c5b1425903a26703a494d9b2d67593dc34b6dbecc96ed1918e80171ccc1c1e47cfbe0d3f35de298ec9c38269b6cefcd885f7676776713463b9b4ef3a67959119adcd5f768a2de1b4835f9e97c2a6fece8b34dffeffe631e7a8386b6289a86e8427dfee28fdee6d7f4f37b1fe5cb697dbd6aa9c12c37bf5dd5d98a388d7e5b2fddef4d7101925ee675718ebf2f72b42d8b063f64aae997f56a26bf148b5555e3ab595ee6fcc9249bbe5dafe817929ab6aaf1519d4f2b0248bfadd6f545fed1f7a91b422327d626dc821e1afee33d814d319fe7e007a67408d1c2a20ea901fd6271b6a35864cbec82e02edb6c4a48f1a8898a6b126dfa0380dc5f84a1fb4380bbbf0590fbbb87ec2ff925842ff1c1a4cc67cfaafa69be2aabeb45be24ae6deb751e7c57346f4f65de683afbdfbfc917ab92f01f82f19a54c953c6cf7cceeae4abba20769ab7edaa7974d7574f63fe6d9cfd605de7e365dede05d6d070e0a66279f1baa5cee8d5d76b62ed7c96cff0fd7a420cfe226fafaafaed317dded0047c74cafd93e0fc","92ff07a5a5213f75050000"], [
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
  'x-ms-client-request-id',
  'f6a5ab25-0347-4753-ae50-43c36aebfb15',
  'x-ms-keyvault-service-version',
  '1.5.192.0',
  'x-ms-request-id',
  '99241b17-2cb5-4913-9a44-65221681bcb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '722d2663-dd59-427c-8d1a-ac5694dd4cc1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T030935Z:722d2663-dd59-427c-8d1a-ac5694dd4cc1',
  'Date',
  'Wed, 01 Dec 2021 03:09:34 GMT'
]);
