let nock = require('nock');

module.exports.hash = "c10d8352eee813454b7cbdfd02ecf2dd";

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
  '680f5cc5-01db-4cb3-b576-45b075dc1200',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ak13iwJ5jsVBma3zIVcKuGU; expires=Sun, 19-Dec-2021 07:07:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrh-GVurAnLywB900ggm_v4rzTEb7Xhpx1qClUml7yCajkeloJQ3VcvjxMcBM6Bk_l5-g7erIuxD-dE6ANJYXdMICuqAb6rpmSD7R7osbi12y91XMw_MzBpGVpxtaFhbNcn8W5y1I003HFfdRRKD05ylgxgA-RnjWy0Agr94vdSzIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:26 GMT',
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
  'cb0f8a18-9cf2-4235-8927-6ea924543e00',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqPxuFiJHrxMsXX1-h5V_OE; expires=Sun, 19-Dec-2021 07:07:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2UBlW1ThO5UJevzqgAkmT1fcMZATyVw100SkWbnnnjMEDaBdcZ4Dv1sHuNx92vd7jQncZXzyfXcZwEoAvfhwdCVs4M-JV32NlDy0Zqbvbhvhc40oifLMPaInxP7bGzqbjbLVyM-5PRVrnYtQgiyaUFqIGF-1w91cKyg6Ao3JtHYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6d7430ac-2944-431a-aeb9-0ffa29f4910d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f2cd5188-710b-40eb-b71f-1e6199891900',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjZVW-XgU6BMiTeMagu8MMkWPr5BAQAAAC9EKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:26 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx', {"tags":{"key1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eea3d147cb6c9113269d4fdbeb153edd08899a95d53403ead434cf9a768dcf088f555eb745de7cf4e8177fa4504f97b355552c5b6ae8f73496b7c60c779cfd605de7e369b51028974543a08be5c5eb366b81cdebf5749ae7b37c46dfd3bf05f59dcf4eaa3aff8975d5661f3dbabfb313fbe2655effe417cfb245515e7ff4e87bbfd88cb869b3e52cab67c7977bfae5e8a3a9798781fd9251aff1d378e3bdfbf1c6f7628de3904fdfa7f1d3d7ef85c7ebf7817dfa5ead9f0d60b21b6dfde224d6766f3fd6f4276fddf4e9d3cbfd58e3380e4f891cefd1fcf4bd809fbe1ff0e39ddffff841ac79b4f1c1ef7fbcbb7bdbd64f6fdbf0f39b1a4eb2a6981edfd4ca807b76db862f7ef2655d2daa5b373f79afe6dfbe75c3f702fbc5ebdbb67c7aeb96cf6eddf2f35bb77cfe1e2de3021c6bfbe2e47d1adf9e02801bd539b1c6df7e726bb8df3eb975d3173ff95e28d4cded09f1f438ae12e26d07f447acf1e97b003e7d1fc05fbcc7349f9edd9e6e20f28d4890b5e7c6e98b13c2f9deefff663fbde91503fff73e3d1bd2bf7e73d703939bb4eaceceadfb784abc7a6be27cfbc97b10e7e5ad99f5d9effdc5d39f1c68fdfd1b5ca0d3e57945de23799f6dbdcee1c25dbdac8baa2eda6bdb9c8d3df9605555eadf44a111f9726d71997fa79a1c2f67f4efebe93c9fad4bf3ca3d6eb26eabd76d55671784ef2f2684f957f518cfa8d39f7597577bbf1b768d97f413e77d12e9caac697faffcfaf5f5724ab8ededeced6eefd2ff1ebed979f088feb7b733deddbfb7fb60f7a7a82d8d6d9e2f5b909650ffa29ad11089971828c1683efa2542b2e3d2b8c5da867de7d7797d594c7382b35a4fca62fa226fafaafa2de19737e4297f74bacc26254dcbe8a37c39adaf993c20e15bc28e074f6ddc2819243acca8b3ab7c76dcc38d607eefa3d7f3acce67841c813d3e7e4affbec99ab761e337d5db7cf9d1f709569b5dd05bdce52ef5769995eb7c179d108da9794beef32f3691c18b6a997ff44b7e","c9ff0386763447c80c0000"], [
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
  'Last-Modified',
  'Fri, 19 Nov 2021 07:07:28 GMT',
  'ETag',
  '"0x8D9AB2B3F2BA456"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1195',
  'x-ms-request-id',
  '3e8571b4-c6e2-4b94-9957-7e7957a58ef5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'a905878f-a07e-40ca-a0e9-c9f12a6880e8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070729Z:a905878f-a07e-40ca-a0e9-c9f12a6880e8',
  'Date',
  'Fri, 19 Nov 2021 07:07:28 GMT'
]);
