let nock = require('nock');

module.exports.hash = "203b6241d42d1c404abfe2b9b73e6b03";

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
  '79bca180-7e9b-4281-95ff-85b42d6c0400',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApKr9JZHEDFLsgfeCTryzXA; expires=Sun, 21-Nov-2021 07:40:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIVnzGBBgxXzDtKtf55X4vbPrmAmwN92AkSqOP7GztolhRu6sGF9fkq_OPlR5t2WuxJ6TvRAvpPxcoN-9NPLprOQzywQddy2b_QFX9dHffQ3TfrSDmFRFSOMU7-cRNjSFg0YPp9q2zpw0mOKUqN6oDB3RkKVppPwv6QZEkmjLQeEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:36 GMT',
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
  '7a197833-c317-4824-a670-b94f926a0a00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao2k35o8lUBOqxUzXGWKzxc; expires=Sun, 21-Nov-2021 07:40:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhlwXWWgW67MUGMuWzopuDsfrmVK14Trw9Af4vgDi5aGpRxdPio8WLhi9PUULvuBKYUlc6hRh-JeXANo1FEUZ4GPH4Q9_DhP1FWWK_WwCQioRSb_P8uUN4bVdu3TN_mQ0iMmR7E20qLQyG5SiUSDudjZd_mG1ZEBGPw_U-CJMtRUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f3117bc9-de99-4e90-a55f-cf61afe7801d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'd63a2fca-c65c-4373-b1f9-68c2674e0400',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ao9bdrMuiRdHhR5p1U5bhWsWPr5BAQAAAPRhBNkOAAAA; expires=Sun, 21-Nov-2021 07:40:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:37 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d123feebb2688a6a592c2f5eb7594b6d3e7abd9e4ef37c96cf3e1a7d34ad73fa70f6a658e09bbd9dbdddeddd9dedbdbd373b0f1eedef3cbab73fbebffb706767efc14fa1f13c5b5e6c6ebcf3f0e1fede7d346eb4b7d3653629b9afcbbc0626f4d9cec1fd83fb9f7efa60f7601f6fdc3b78b8b34b0d32c2ab694e97b355552c5b6a376fdb55f3e8ee5d1ac56c7be7fe38cf9a76dd8ccbeaa2988eb31faceb7c3cad168ff6f7efddbdaaeab7e76575d5dc3d3fdfd97fb037fb34fbf4c1c3fd4f1f4e1ece26fb0f1f4ef70feeef3d9c3ec8d0d12c3f2f9645cbc8fce28f7eb7663acf1799d79f7c305e64cbec225fe4cbd675065c2e8b190de5ee17c5b4ae9aeabc1d3f0742fa5673776f67f7d3ed1dfadfaec5ca7538fee9a65afe38e130ad962d41fe4982441f53e7bbe31dfc475fadb23a5be42d7d43e8fd92d1476d5d5c5cd8bfb229e0e81fd5ba5dad5bfe83feeabe982b299b936a795e5caceb0cafd2771f19c4f03bc1b8a0561767abe3d9aca61900eb102765f21750bb377eb8377e7830deddddfde8978cfcaff677c6bb7bbbe387bbe3fdd857bbfbe383bdf1eec3ee777bf7c6bb3bbbe3dd7b0fc7bbf7efc5bedc19efd1770f7762dfe1c54fc744e7ce97bb3bfbe3fdfb80383ee87e675fdca3170f3efa25df07257d7edb34fc07f41ec1ddf9747c7fbf039747f960fcf0e1f8c1c3f8573c963dea32f89281ee7e4ad4a3ff7f7a9f10a20923a658e6d3b6aa6f372fd4c183ddf1de3e11ea5ea473fd6e6f87a077bfc3cce0c7bdbdfe77f4deeeeef860e76e0f69fd9248f1297dfba0f3ed7d9ae9036292fb34b24f7b13b733e6ef681a1e7cda87ec7dfd708f417fff9780a58b197d79b7594f9a695dacc0becddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde25b8d5ba9ee69fd7d57ad5dc5d5cff74d3e64dbb417e8d4ca0b1f9fdddbb7724904b922a42a3fb717bbdc2c78370a849594d55e63e12e58571","fd3f0ec0c297af050000"], [
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
  'x-ms-request-id',
  'eastus:a6842d55-4e3e-4ef7-84ab-c95df2a8a6a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '19998',
  'x-ms-correlation-request-id',
  '70ae1287-d4c3-4b7a-9efa-024f339e2f56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211022T074037Z:70ae1287-d4c3-4b7a-9efa-024f339e2f56',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 22 Oct 2021 07:40:37 GMT'
]);
