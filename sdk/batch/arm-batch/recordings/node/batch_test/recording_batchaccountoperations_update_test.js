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
  'f480e226-70a1-4283-a533-9f5eb83d2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlBVs0RdHhxFmRnsVY_EaVQ; expires=Sun, 23-Jan-2022 02:18:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWZwhN6nEab09aINB4P0oX6ypEPOC6x9f2-cxSVv-f7n73PuE6bnRjGSNriPiDMZh_h_knEXEp8KGGaPFlL6xd7P5VdWEA3yOJJwZPevloYgnYtrwqplnxXfoyirPyus_l6Od13dQXoL2adUVUL4fZP5p3keQzmx3riOLNxfqqUkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:54 GMT',
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
  '7777f699-653d-4eb0-b230-12e58ab51900',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkKK_uidmfVKvKwIuikwc80; expires=Sun, 23-Jan-2022 02:18:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQHr3bzaQL5YVaUdoqSwgDk-FJAEvT6WoTmgAhwWpVSQdIE7Zo7pgOQQpTNlScEgUUaUeiVGmfoRZAvUI2wVk4HO03BI5qOO71Bd0ldNy-wWj_W0MIq-2GSPqszu-F3sAIye8_7GwOSEhtzTJqXJIjdk9BZLXm41bVg8EB_YaJTwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b51690de-92ab-4130-966a-31978c00dcbb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7777f699-653d-4eb0-b230-12e58cb51900',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AosIuTlgUgBGjK1Y8tRYpkfLj78gAQAAAA4lV9kOAAAA; expires=Sun, 23-Jan-2022 02:18:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:18:55 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx', {"tags":{"key1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eea3d147cb6c9113269d4fdbeb153edd08899a95d53403ead434cf9a768dcf088f555eb745de7cf4e8177fa4504f97b355552c5b6ae8f73496b7c60c779cfd605de7e369b51028974543a08be5c5eb366b81cdebf5749ae7b37c46dfd3bf05f59dcf4eaa3aff8975d5661f3dbabfb313fbe2655effe417cfb245515e7ff4e87bbfd88cb869b3e52cab67c7977bfae5e8a3a9798781fd9251aff1d378e3bdfbf1c6f7628de3904fdfa7f1d3d7ef85c7ebf7817dfa5ead9f0d60b21b6dfde224d6766f3fd6f4276fddf4e9d3cbfd58e3380e4f891cefd1fcf4bd809fbe1ff0e39ddffff841ac79b4f1c1ef7fbcbb7bdbd64f6fdbf0f39b1a4eb2a6981edfd4ca807b76db862f7ef2655d2daa5b373f79afe6dfbe75c3f702fbc5ebdbb67c7aeb96cf6eddf2f35bb77cfe1e2de3021c6bfbe2e47d1adf9e02801bd539b1c6df7e726bb8df3eb975d3173ff95e28d4cded09f1f438ae12e26d07f447acf1e97b003e7d1fc05fbcc7349f9edd9e6e20f28d4890b5e7c6e98b13c2f9deefff663fbde91503fff73e3d1bd2bf7e73d703939bb4eaceceadfb784abc7a6be27cfbc97b10e7e5ad99f5d9effdc5d39f1c68fdfd1b5ca0d3e57945de23799f6dbdcee1c25dbdac8baa2eda6bdb9c8d3df9605555eadf44a111f9726d71997fa79a1c2f67f4efebe93c9fad4bf3ca3d6eb26eabd76d55671784ef2f2684f957f518cfa8d39f7597577bbf1b768d97f413e77d12e9caac697faffcfaf5f5724ab8ededeced6eefee6defedbfd9d97bb47bf068ffd3f1c34fefefdcdfbbff53d4980637cf972d684bb87f51cd688cc44c0c9580341ffd12a1d97169fc626dc3cef3ebbcbe2ca639c159ad2765317d91b75755fd9610cc1b72953f3a5d669392e665f451be9cd6d74c1fd0f02da1c7a3a7366e980c121d66d4d9553e3beee14630bff7d1eb7956e733428ec01e1f3fa57fdf64cddbb0f19bea6dbefce8fb04abcd2ee82dee72977abbccca75be8b4e88c8d4bc25fff9179bd0e045b5cc3ffa25bf","e4ff0162eb8040c90c0000"], [
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
  'Fri, 24 Dec 2021 02:18:57 GMT',
  'ETag',
  '"0x8D9C683BD819167"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-request-id',
  'cd50a09c-6f93-49a1-8d73-71ba9bb667f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'fb9b4820-e92d-42a8-a203-23095fe13f5d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021859Z:fb9b4820-e92d-42a8-a203-23095fe13f5d',
  'Date',
  'Fri, 24 Dec 2021 02:18:59 GMT'
]);
