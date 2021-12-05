let nock = require('nock');

module.exports.hash = "d0169502dea2613f7b682ac8b5098299";

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
  '581f625e-4f31-4ae3-9e99-482faa0b3500',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aq-GA3PBYBhDhogKx16uXrY; expires=Sun, 19-Dec-2021 07:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEjLz2SrN7qYUEGnZ58hF2C5gW0L8yGAF3KjNq_7zWf56uGoiBzVcIp4OBYxMfimneUAf4F7hq_7sun5AAm9xlFfDgAC2e1_jIdAmVta4LQIMd7d_80tFuI669NNR4_Vg40TI8FFBlu1AHIlwmzkq1FSqBghPU6NCaIMZkjgGef0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:41 GMT',
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
  'a928a7b3-5033-4d2f-a2fd-cb4b176a4100',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=As-JMqr13uJFpoYorU86Nco; expires=Sun, 19-Dec-2021 07:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlCzd4b6aiMyp-YuDllmlZtFI6dXqzwUGAeJMSt4VIAl365CtyaldyXwdB915GU4M3DB4BM9-gU8TrOY7e_g6XSsk9MgTSoQ2FvW0t_fYXZSWPReaWhTtKCKx0V5jop88NT9Bb-HNipgdkB94s-04S1hEaaRPww3YgH5gfUlaBD4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:41 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a7d38913-9cb8-480b-9c10-861a66648ae2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c711cb4a-a339-477b-a362-312147793600',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvUv1jbuiJJBsc2dIdzfiCkWPr5BAQAAAD5EKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:42 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/pools/mypoolxxx', {"properties":{"scaleSettings":{"autoScale":{"formula":"$TargetDedicatedNodes=34"}}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eeeeaaaa4a7c849ff4f747a38f96d92227ccfc8fdaeb153eda0c16cd1b6a9cb7d90535feeedddff7a39d77074f1f1e3fd97bb27f70ffd3dd279feefdbe1f5103c27395d76d91371f3dfac51f9559d37e51cd8af3220741f676f676b777e97f0fdfec3c7844ffdbbf37bebf7bb0fb706fefa7e8dd699d6720d59b8291ecb7de193fdc7bb0bb7fb08fd6d4d365d150f36279f1bacd5abcf27a3d9de6f98c3a8b7cffa6ce964d71fb0eb2b2aca68c10bf4e2fbcca9be20704aeffe52d600743bd5cbc2e7e8076afdf1cbf787afceae9efff749f3e2e966d5ebfa866f949b558ac9785f440cd9e164d3629795c6dd6bc7d5d566df3529a7ef468573f9ccef3d9ba24fc5e566531bdc6042ca9c1b3a22cdfc824bf5e1189671ffd92d147b37c5556d78b7cd99e54cbf3e2625d6b57bff8a36959ad67aff3fab298121e9d2fabe659b6284a02fed17d42a66a7e927892bffbe85b1ffd1202dc4cb3327f9db72de1c13c90addbea353ec41fe755bd589719b5feddde64f545de3ecd6718653ec3509acfee810af96556aeb9c733d083fea2f62fdfecdeff827b201121da7d496cc66d40ff35f7d446207ef4e8de3eb13dfdfa347773f6258b24417d95ffa275becea953818ad9abd62d7d23fdd178086a8b8fe9b38d934a984dd7754d14ed62b063bf795e5dbdac8baa2eda6bf79d25d0ab35a1f48bbde1dfa65bc67c5db6046b90a687fa45b7fbcf760e7f37fcd227cd67b512e697fc92","5ff2ff001d7220d6ce040000"], [
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
  'Fri, 19 Nov 2021 07:07:43 GMT',
  'ETag',
  'W/"0x8D9AB2B48561B62"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1190',
  'x-ms-request-id',
  '8a0419c9-734b-45c5-b3b8-fdf9236984ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '127c691f-bbe8-477b-92a6-441ed88ea8bf',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070743Z:127c691f-bbe8-477b-92a6-441ed88ea8bf',
  'Date',
  'Fri, 19 Nov 2021 07:07:43 GMT'
]);
