let nock = require('nock');

module.exports.hash = "640875540e407a4e5971f994280785d0";

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
  '8347f94c-67d6-49fe-87f8-43ac5d860d00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiLsnmEsDzFIlA6vVo4lAIg; expires=Thu, 30-Jun-2022 03:48:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJLOzxuKEYOMv4jS2u-5UagyTlj6ZabjdAmYUWPm38gKbUikOqyjp9_FUg3InoK8R86Y-_HnefJNmZIiHcxzYsfr7v8CcbsizDffdNl4YFjdTmex-F6BMXs3_r3tHpT9KjV-kmsjHN6-Bz8uC9H7-KZCwDBLwg17oC7vK8UCCnvcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:27 GMT',
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
  'fb5a535c-34a8-46f1-8d9b-3f1e5a641c00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiHdi5qgpdlPkP_9v-D2hsU; expires=Thu, 30-Jun-2022 03:48:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlCN7BF-oq_iyygbWKZs3CbxxwbTPy42K2AhVhYcPHmh7JrkeeX5mjex6hRGD934DU9XjkB-ZVGhn_dt2xYXWI00uyhcldJsoCwdqRVcsM6Ml8ESsPW0v8iJvJg2pSNc4L--y3Vc_8qyDhaCL-vOMr7_hjJKScQVO1JQXv3BJxqsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f095bfb4-b9d1-401d-a380-4fddc5d16fb9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '5dd4fdbd-15fa-4ea3-94b6-bd1dee051b00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AuC8MfzC-rVEhqr9EhUjXyoX6p3SAQAAAAuHJ9oOAAAA; expires=Thu, 30-Jun-2022 03:48:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:27 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx', {"location":"eastus","properties":{"serverFarmId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx","reserved":false,"isXenon":false,"hyperV":false,"siteConfig":{"netFrameworkVersion":"v4.6","appSettings":[{"name":"WEBSITE_NODE_DEFAULT_VERSION","value":"10.14"}],"localMySqlEnabled":false,"http20Enabled":true},"scmSiteAlsoStopped":false,"httpsOnly":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffa20cf9a768d06d4f92aafdb825a3ffac551f84d9bb5f8f0d57ab92c9617f4c9bc6ada17d4925ef99ed7769cfd605de757f9041f34e365de7ef4fdd147f4f7eb5536050433e2ed53eafdabd7f44dc3df501f7979febc58bea546f3b65d358feedebdcaae9a6dc26eb63d29d7dbf7761e8cb355d1e9e28a46575d71578ff6efefdffd1a9302584002848e6227a4a46ff193460992d4f9aaa23fabfafa357d085210e2418bea6a99d71f3d5aaecb72f4d1bac92ef2d74ac61755bdc84a6a922fb34999d3ecb4f53a1f7d94cd16c5f234fc4c9b7cfbd6f41ef95f37d345a4094d09fe7819ccfb226fb359d6660663a2bbfdf67b962d6886d6ef9ebdfb4962552230757699956b7cf1d12f19d946df9539893403e85f42dd1333becedb967889a0f387f4d9655694d9a4288bf6ba47a9a6294f80cd7941fc0b94f0d2e8a36953d3efdf238853eaca7c8ac17d51cd0880fc6d98f5755332606ae846e451ab4f2982a5ef50cba745c373419f16ab275993cf08e0abbc5997ade9e9b2a8db75569ebd341fb4f3f562b2aa8ba56dd2565fad88ce0430fcfbcc8234dfb84e0c062faaf6a45a9e17178427d0c0c0de88ec5393e52cab67fe3c78438b33c2ff7786f7ca8adb47e09f69b558adc3496ef2fa32af9f65f5a2ffc91989d30f475f7397e7d4251a1397e383629aafca6c49d340632288f4110defd179563624e045f37be74b9211f3f79c065cffa4fdb3cc9a9686498c9fcfde148bfcab764a63d9dbd9dbdbdeb9bf7d6ff7cdcebd47fb078feeed8f0f0eeee1a13e1aa213a99b57f9b4226cae9fe6e7194da2a1b253e2d36ad9e6cbf67893e0d5eb654bdd6e6c7349bcf4aaa2f9382e4babbe147f9ab45c26154a6649ec92d75f9e7fb7aadf12f53e7ab43bfa6826e83dada6eb0561431fcaf411d0673531f215b5358a44bf5acd57dd4faedb79b5ec7cb824f6e87cb4aaaef2faf53c2fcbce1765a8d848a191ddeaea316d5be7bf684d5cf0a6cea644483b62f3e5a26af3a7f9647d7171e3b71dc0307ccf2bfea6f31ecbee17d51222402d4e68062eaa9a95b33698d65f35f917d992267e76362342d24c9d901c510b9d0a695277da9c3d3520caeaa2795ad4f994fa20abf683fc79b128ac60cfc83e1484d1695d330a112457eb49593473fa02fd8812ea7ef3326b1a9a51fb0ec9486809c87e514fa432ac2522365d125244a7d72da91aaf61362590f9ef955f9b4fe6a4044b0c71b5f21bce94b75e55951d0f6944d12df2e7bac9efed3d295ae14c328de40fd8f74969beaea66ff3b6e98c382bafb2ebe64b9a40a5f14f9315eb4c2a3e220920ea79fe40f061e70542fea45a2c6828646d2d82f437a6ed65b1ca895789179cea53b57cbc5a95308f04ca615e2c8fd7edfc189e85ca6df0c51bf22f964635c837d335e98f05017b5955a5e1923e8068b30838a3409e8227a21f7659a2acb2d9938c3426a4cb7c480a184cf26a5d3a9ecfdf91aa24309ed228c1b2f6af6cdd56dfce33a794c28f0360ad48f397621ecca7506d701dfcbf7baace7df5b22e2e69ec2fabba6d4e2a1aa4f9920560fa226f69a06f8fa73e734d2b2842f97db56ee6e677f27549731724f28490f7a1c82f464d0cc47a55bfa251bdbeca56afcb2a40192e7ff9c5f5eb5fd4455839ea35d9233251660a612be5fb77d2d37083b7f9f54f4275bfcacff33a5fba26a64141b23d5dd7f409f91124bb2cc43458f2be8ad5f16c46c690fefae878794dda36e36ff167595657f401f915a4e2008dac846813f92ecd4a989d596ecdb9ff4d9a0979e12790909ffdbf1607e2fd2f48fe0db1a0fcf776ec1ca94221b17b53361d0d211f9e14ab3919b3355958f345b35ead88f7c85508bea601eaf7d3c517fc6e07e079bb6a02a95dd5f977c98bc967674b0afe686a036e3e5f2f790824fdaf89b98ca1d8a1419058b5f393793e7dfb326b2d2f9f93e53821e57c911faf67456b07a9df2ab8865c13a80586a9c68e44b2d39a94319c0a38433f552d2dc6449362b15e9cc2612aa61db40933b6a0af0922b13409203eb76411d293d27f77fdacccac44a11b88b2f99b545b41ba76dd10822e4e93ef481902b2332914d1ccc8efabae21a990998f9c3b4e8cd374a494d4cf3905372272b517eec9d7cddb3541a02912279f3e982e10781e974d45835aad8089b24c9bd517796b54818100679a894923a896406af81ba20466cc349896057d784cf8d1945cdb814b802a5f2238b35f281eee1b3156e4c4ffa235f91740df7d77fa6e5aaec18be0173b5ee0c404b05189813aab162434c4bfe4128bb113ad430eb2d3a3629c9e469a121af7ef3fdb3bdddfbf77fff8d307fb07cf764eee1def7ffae9a7f777ee3fb9f7e983bdfdfd4f8f1fd27fa7cf9e3e3dd9db79f6f0e0f4d9e9e9fe93fb4f4f4e1e1cec3c3825f4839c4ab19c1037cdce3c6db2b733dedd7d38a67fe97b8a5c9a82c670d66987d90d5b9218925250cfc9e397dff7f7fddddc1fd2ae312c420df167345d425f74a23e32fb706911fd7156e3eed5d5550daf88f215eb368edfc1fdf1defdfdf1eea79f8edc5f7bbb3bfe5f7bfbfe5ff78296f7efd9bfee8f1fe0773762439b2f7f789debefbbfe1f7b7eab7b0fbd3feedff7ff70a0e90fbfd9a7bbfe1f7eb307fe370ff6ec1f34fe87eeabddf1eec181fdebde783740e29e43628786eb03d90b5027c2dabfe8bb7beebb5d6ae9ffe1bed91befed3802125aeeabddf1befb86fe6034a80f9d3c72ccc58145b0c04a764621c2f51714e3d4d7d0cf3fb1aee0c6d317cdba59e5cb1919a682eca64a2918d0c8f72b4a47c21e515b630e4edf91d1c42f5f91da694ec8d9a74ee4cd45f6ee453794946fe615d98f365bac887d7a02019c4bb22bcb8bb3e579e55ee9ea3fa809f9aecd5c14416ce9920104de640308aac6b09e4c3a79ed4820491ebd00f5cf1a9a8c2e2561b507d8218a264a723754db91b65c93ca5f4eaf5587be80c983ce211d7d4118355f920f6c759b80b9c82b222bf91913269f054fce0cbcd3d3e56c5551ca86dc478dab5c8b613775b22eca19e952a86af399589a27916f16c58560850112def229452e1790760a1ffd08f623f811e264d26ff46533a29fe613380c9dcf08f3a66230fea7df7ef3e665e7a3b397e478c520bc2cb3f69cf217fc31cc397e21ba92d98019a7a1933622c7560d96990ee210445a4aa0d7eb09cda6a3fb067ff8a3d7d7c42b8b63d276174b02f84b","7ec9ff03979e4d2b46180000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  '"1D874A14DFCCF00"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4aad2b94-abfe-418b-8d3f-1a2d91abf75b',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '499',
  'x-ms-correlation-request-id',
  'd5ba32a2-63fd-4ba4-b4a9-90b8c854efa1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034851Z:d5ba32a2-63fd-4ba4-b4a9-90b8c854efa1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:48:51 GMT'
]);
