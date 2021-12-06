let nock = require('nock');

module.exports.hash = "6e52b7a8bf581490d51d15b569251bf7";

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
  '93ef7e08-1935-4d62-bd81-4c493c184900',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkhmyW1y70ZLuReBVxZcToI; expires=Fri, 31-Dec-2021 07:14:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraFSAI7A3sRJZ8nTJAoyw8jodhu28DdsnjnoOosUPn3oIdU30hJ1vZ3-jO2dkfgkJhfFJk4KzwBZnPx1t_N1VgTea-HCv9HU50--HddzEKhz31LkAQ4TvgtLR6Qqx63dJcc71BCy9T5E4hUanSHtygKVx0iKoAq9hBeTBsKhTfhggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:39 GMT',
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
  '06e8a334-c653-458a-90ba-720274984a00',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlRwljTPdnxPgtLAuzq_W1U; expires=Fri, 31-Dec-2021 07:14:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEJ80TsTEpZG0-D_IBvBkGc46EzxWJKUib6xocd-m0T-RU6yQ2rgvZYhiwYvsh-rlT_WuZ8Iz1L_dCR9FUcDdrFrplARepXXlD2dQ-mIp5kXNi24VgV9i93ruWLjOrn3wqvLedlkw-jcwNfgZ282q0Xq0n8s1WjpQ1TLHwOZTOMkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:40 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2721c7b7-9eeb-41fb-a922-751d13b77c7b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '06e8a334-c653-458a-90ba-720275984a00',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ajo7aVlpkG1Fv8abxMrScqMWPr5BAQAAAOAXOdkOAAAA; expires=Fri, 31-Dec-2021 07:14:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:40 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e393ea6259b4c565fe3aaf2f8b69dedccda6d36abd6cf19efefaeeddbb8f461f2db305e1f551e7d3f67a854f6f03905ae76d7641ad7fdf8feedfdfd9cfef3d986defd0b3bdb38b7fe8d9fe74377bb0b733cbe9f79ddff7237aa3b926dc174fb336fbe8d12ffe685ae7599bcf9e5c1390f36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87f4000ec2b6f04d3e3d5aa2ca619c8e9be3d6ee99bbd9dbdddeddd3dc2e6cdce8347bbfb8feeed8f0f761e3cdcdb7ff853d4b4cc9af68b6a569c178046ed6f8940f85e140bbfc9cda8fc127aa1d2771f7d94d3bb6bd0b679bb0689749a5eefa0dddb620926eacd0935276658e5755bd01ff456be9cadaa6289bee76dbb6a1eddbd2b80c7d9aa184fcdfbe3859de769b5b84b60e89dbc5e66e519fad99fec130feede3f981e1cecd38f879fee3ffcf4defeece0e0c1a793f37c9fdacf88dc2742747aa13fce4fc70fef3dd87978b00b9253df2f7d346944d3ac2c5fd1dbcf8b4541d8fee28fea7589ef485edee63c2b55bda873c6f807793d9eae9bb65a8cdb3a2b40e93a5fe65759f932af8b8a10f874872082393f7ab44bb85d13f18ae99b795db56d592c2f4e97d9a404a2e759d9e4a38f16593b9dbfcc5a0c59fa5c65edbcd7e95de9f4aee97491b773f4f6d1b73efa25dfff25a3cd984eabd5f5a29ae52526e9878aaef47af717f3cfb3d92fb90b540889f7429f5f6ec617794b6f6e409f7efdd9c19fbab5087f7efa6613ca19f1edf50f727c4a6f759025021b5cefff6ce1ead15a71213c2cf62fbf7c7d5bf4c7a4f2d76584e4de28767ed648de1fc62b4687be10bce81b42cd0eac3b2d02ecb26848a389a41266f4c286b17cc850fceeee5ede1bef88a01288bbdfa25e2d9ac4ee84e2c04bbb5fe7a5bdaff3d2bdaff3d2fef6aace2f8bfc6af8e5a109a01767c594adcb0f710a5caf3d4409cd81d77637bde68daf59e5f9743e6eae97ed3c6f8881a9e9e0c8f63e4c50a4afbb415f9bd1d2515530ccfe5b3fcb180e75bb19d965beaeb3b2ffd6cf32b243dd6e46568638f4eecf32ca9b3bbf01f16a79497e3afb7824c04b1b01d09b83687fa08697aeef36f44e49bf64cb655e66eb59516d42c61f060d2204b520d55fdc0469d2a5460f0c6296dbbdda27a4fc68ab367f17b38e44b06f9278d2cf2d34119ab595fc418d7fd6d0f2fbb9055af4237b9bd76ae741eacb3d7aa98b9ec56eef8390d3debe1e5ebbf4d2205e1fe4b035ab62b609a759355de4cbf60d98b0647ea4b683a87c188998d3a993aabe8ba9bc3b41c34dc8a1d52d31fb50d6d25e0c6a9b90aadee63f9ba834e4695eee9213b10187e70585d8e49d5ee4983c6a378ccc07710fe9a9963a80435c33714aeaf866f428fa477b28b441c43e8c957a88e96ff98db8bd624792beff6161a69eeb4d7895eba219dbc4c506f4ee7f107ae8a6870621e17f7d3b37f4aaaadf9e97d595457abcaa9a16190d44ad1df4bd6019bf7e7dfcef96d9f2624d8c7ff711f13fa2b36da2b835a6e87a005fc8f5315e212bde8cd74bc94fada96d4d08d07bc3287fa0445b9481c2ddcc74c92c61221bf2fe37d01a2f0ee38efcc4cd74ff610c622f1c443734c6ab1b86b15e219f769b91fcb007f25eb3312dd79891935b8c837eff060622be3979e28128842378cfa9c018643a6e338c1fda2836cd83bcff863ea33736614bbf7f7d74d1a7e485d02987ed9669a62d49317ff783fcd67853b38dc8d21fdf18b61b70fa456b5a53217a931b744578dca0103ffd30b47e11bd0817781342ca92863dc63f54044daf77a9d7fa7afbedb2baa2f72ef249d6d01250176bc2b9fbde2379b1dbd21b9fe47d28d5c951c00ff238e33ab37fef830624bd912f12f6667193ec2c2117b607ff7c492b162c8a9d81b346e9bd418b211be30d6946df0f0ef4c33c5681bf0983f36cbad131fdb0fe017d53ef1302f69345b3cecad7795647e3658bc9874d397aba7bf980bcce62412c49ba8abb6d72747b138a3723b7f7617e283ab9098913d6e837a3b2fbe1a888f1b89936649a5aca40d37ac5a428d10b35ede245c82862f73f4c0b69179bf099e5e719e5a5a841170b8bc4878533fdbea9f78f8ae68be282b4820761b59ed01af08bbc455c703ca50461f3d1a38f4c3f844db6ca684094efd0054ec2084bbb2786a2d4e6322bd7f8ec1909d1f85b23fe817f4627d562b526dc487248bae9abce073f89a49a35a9236837fb17b50efffe769e95ed7c9ad579e78bdf2bbf5ecd6b52f1439fffe45eff9b97fccd972f5efcde9def9eab2d78462bcff866e0eb818f7b5dbda6a0b240b43ff4f9f01b3f796ff89b97e2bb8c9e7f75f67a8c7f88b41cc06a0c5fd54a3f2f0f439fbce654965980a70f9ed18ada2b635de81d360d668acb6a0d1630d30b700e196f3a7e426dfc31dbf8f171591eaf8a666468a2dd8dc366c4cd6845ac39b20bffc461bff8a327f44d4a2e6dd5ac2f48ff91287c346fdb55f3e8eedd9ce664dd8c69459e92d384725b5ce6631290ba6aaaf3963e5bdc257c19008db42cd393793e7dfbf5009c12addbeb54d5d8d702710605fe41105ee457cd07016009fb2008dfcd271ff43e893a99af0f022106e5eb8280267aef978ca202fac4b2effd3e6425b5c2f2deaf1bd1213190c8eebd21903ab0c158561a785f2d493b346db69c7d0330bf7a45868af4d17bc3f989e5f1178823defbc576fdb568f1865f4b9fe6f9eabb7541f9cdf705d0d35cef0d012a7afcf56713afbff74b5f49280655484affbd5fa7d9864149ad4549b753cdc27e13a0f4f7f79f8c183024d6532fb3febe3021ae9ea5dcfebcac2659e9811978dfad3fd0b731481e88db61f2b49aae31840f81f186973adef72dd0553cbaf77d53188cf433db793258f2775ba5a0467ab937def9c661defb5981e99242bb1f0c5dadd64f62d5fd8381d1dfd098e94f92fa392fa65f8f2f084814e8d98c18eeeb839581fefe62297f7ff24c7515e2f7ff3a73b401d8fb4f49088c44aa5892f6fd6641ed7d73a0eebd37a8d07d7fcfd729205cd515a517080d42e0752bdaf8f59aa2c07c96cfd080dc47628d9662560a2dc9744d8b55569e51f8f8d1fefe83fbf70ef2fded87d964b2bdbf339d6e67b3fd4fb7f7f6cfa70feeefee4c0e3edd210c495567cb96df78b077fef0e06072be7df0e9f9eef6fe6e76befd70379b6cefcd1e4c673bbbbbb3c9fe03bc71bd6234ae9b365f1c374d71b1245c461fad9bbc367f0ac74a4cfa8b7fc92ff925dfff25","ff0f317f4884b42e0000"], [
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
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  'dc1c9b69-9f34-46c9-a980-53af2623d947',
  'x-envoy-upstream-service-time',
  '23',
  'Server',
  'istio-envoy',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '8cc03e42-1fee-4683-b41d-3b728c20ad74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T071441Z:8cc03e42-1fee-4683-b41d-3b728c20ad74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Wed, 01 Dec 2021 07:14:41 GMT'
]);
