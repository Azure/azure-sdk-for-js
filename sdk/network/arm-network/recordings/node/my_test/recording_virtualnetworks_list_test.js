let nock = require('nock');

module.exports.hash = "6a478bc12c8c3ea232e8afed5d4cf956";

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
  '2ed88173-7e37-480e-a35c-f35043134000',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ajap5A_jAjxOoMXm8vIkB40; expires=Thu, 30-Dec-2021 06:53:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra151DZ8D2HwhxgZcPkkoTc52a4OLBjDWjDeaV8XnNkKXPP-Jh96A45ZsvGj0da2k9NHsylevM6-7qX7RgXxqsAepuHuCDmGG_8AqgA78ERWXw0yJLG6OGu9J2_QIzj0my_yBFkSdttyStj-FTPhjD5DxnlnoEc3dbIGFSB52u58gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:53:15 GMT',
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
  '6b2a26ef-1d09-4be9-958f-a201e0783f00',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnkCGuZosX9BjfU_9v3YH2w; expires=Thu, 30-Dec-2021 06:53:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrP0bFKlvsObYb4Oe9KN_Pa2b-oxoA1D6oJOqlfsf7EJuBHzG8pAHvix8IUCDzyaCtbqPSCSElDbuzqFIHP7HIU5rkBeqprYrqSFGYPobLl96ry1735IjhXL3vcwNk7wLRDDjvM8HKTVpYxR5JSZUj9FRlq93GdjDrNtUo_SymkiEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:53:15 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4d9875c5-c2ee-4e0e-956f-1ae5b09529bc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '11aa06e7-1c01-4d6d-9a48-918aca294300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AowpV4zfg0JIoizaJ8uNM3UWPr5BAQAAAFzBN9kOAAAA; expires=Thu, 30-Dec-2021 06:53:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:53:15 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Network/virtualNetworks')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a365b6c0e71f2df3f6aaaadfe2cf771f8decd7c50c5fde6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e5f48e7772f8bba5d67a5fed9dc1d402a6fb30ba0f5ddbbbfef470f1eece63bf9f9cef6c383fbf7b7f70f3e3dd83ed8dd79b07d7f3adddfb997e57b9feeecffbe1f792fb7d72b1ef08dbd7bef94d534c3d0f15e9e35eddaff9206b4caebb6c81bfada1256beb82c1a7aad585ebc6eb396bb7dbd9e4ef37c96cf1c046a6a89b51682ef3edc3ddf9bdddbdf9e7dbabfb3bdbfb39b6f1f640f26db7bf7f6f6b2ddbdddf3e9fe4100209bcd0846f37a954dd18d8786fbf2659d9f17ef184d6503f37cb4bb33e6ffeeee7efa91ffd5f7dd1fbfc4ef8ef881e6a60729e8969a61e2a88d36c75fde34caf3ff220ebb4b38d0df8dfee4cf7ae87e08efc903be88328c3cf8fa966c234f38bd686c67736f3fd29c868621bfcea7ebba68af997af4560f116afac39d9b1862cddd17afbe78bd3d7b707e712ffb45cbc583f2fe5adbf1fc6c136ef437ff1e702e1e9f65e5f9a8589d54cbf3e2625db3406306020e9627420bbcfb73418db3659bd7e724d5cdddc2fcfaee6e771877bfb83ed38f7a54203a743ffa7e9f30b3bccc2f04188df27b9116abbab8246e3c5dce5615a1a278beacca622aacfcd1e9329b945116d5779f174b9adefab298e61b5e0fdfee4ee2ed15f85d9a29a2621300f468e18ff1a3f0dd97795e93f801ad80141fe58ce3d35945e256b5f91404a346e759d9e4a699766110b7cc64d5a1f645b8a1af1ffce0078e623f6426534cf4cfc6fc1dc5ccd77c93c9bd8793fcdeeef6c37b79bebd7f4e966a32cb1f6ce7d964f73c9f3cfc34cf1ef89aeff693e6bdf343b7ba3b9f3e3cff742f9b125d1f10991feee5dbd984f4f9ceecfefefef94eb67f70ef41004035efffabad6e3089f2fcbf8dc9ee1222f4971158faa487f187309f3c608c28c7c883af6fc937f284f38bc6763aa366f7470ad67ff71b51b0f841b2f24b","fe1f8e5b9835e30c0000"], [
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
  'x-ms-request-id',
  'ae24bd35-a413-49ac-b974-f98b597377c8',
  'x-ms-correlation-request-id',
  'dc2bf78a-22ba-4fc5-960a-f4b0bb128bac',
  'x-ms-arm-service-request-id',
  '92e17f0d-9af5-4b6c-8e89-79e5a6597093',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T065316Z:dc2bf78a-22ba-4fc5-960a-f4b0bb128bac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 06:53:16 GMT'
]);
