let nock = require('nock');

module.exports.hash = "91e60c31279dd365b9a1d8ef64164a0f";

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
  'badfe93a-df4d-4f45-89c4-d13f68dc4700',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AugwQyt4JNpNkZMQZvLNP_Y; expires=Fri, 31-Dec-2021 07:14:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfEOSfy8h1OmYyEsOf_wIP_aJCPDGJ8PbE9Au8z-KAqQn-YOkg1K8Bozf7lUlvsi_HXxOMKtGx-p63u3qVZmBqoRHGyjyetZTm8KrNgKaitLyrBJpwla54JS9aMm4rkZOi-yEXZD1BENRiaqDDiT-_APGEacsWI1fWGWTNuJbHdQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
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
  '5c20cdd3-2e65-4999-871b-c93652983500',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsM7a45sZeJBlATLrTxJ5UY; expires=Fri, 31-Dec-2021 07:14:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFROCnq1jHKREXaRAHM9AQ5gui_P-GSLkxcsorF0NU5IxorIPYV0GZHFJbx13vcgTtAVfXwgN4n-qUgRxCGT267a_k2dhFWSgWjRIpqjyBdy5mvXu19ZVFmI-iwyF2MKc62GoftUOPAxUwNl1dIDdttECnOtoyVJBXgJVsuot1YggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d50d2530-6817-43f2-87e5-adc90eef9e3a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '74e93c75-7e31-4cc2-85bf-63997b9d4b00',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnAbpTZSFERKusfk_p4iYw0WPr5BAQAAAN8XOdkOAAAA; expires=Fri, 31-Dec-2021 07:14:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:39 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts/myaccountxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faa8b65d11697f9ebbcbe2ca67973379b4eabf5b2c57bfaebbb77ef3e1a7db4cc163921d4f9b4bd5ee1d3db00a4d6799b5d50ebdff7a3fbf777f6f37b0f66db3bf46cefece21f7ab63fddcd1eecedcc72fa7de7f7fd88de68ae09f7c5d3accd3e7af48b3f9ad679d6e6b327d704e43cdb7f90eddedbd93ecfee4fb7f767939ded87d3e9fdedc9f4d3fb3bf7a707fb0ff61f1000fbca1bc1f478b52a8b690672ba6f8f5bfa666f676f777b778fb079b3f3e0d1eefea37bfbe3839d070ff7f61ffe14352db3a6fda29a15e705a051fb5b2210be17c5c26f72332abf845ea8f4dd471fe5f4ee1ab46ddeae41229da6d73b68f7b65882897a7342cd89195679dd16f407bd952f67abaa58a2ef79dbae9a4777ef0ae071b62ac653f3fe7861e7795a2dee12187a27af975979867ef627fbc483bbf70fa60707fbf4e3e1a7fb0f3fbdb73f3b3878f0e9e43cdfa7f63322f789109d5ee88ff3d3f1c37b0f761e1eec82e4d4f74b1f4d1ad1342bcb57f4f6f3625110b6bff8a37a5de2bbeffde28fdee63c2b55bda873c6f807793d9eae9bb65a8cdb3a2b40e93a5fe65759f932af8b8a10f874872082393f7ab44bb85d13f18ae99b795db56d592c2f4e97d9a404a2e759d9e4a38f16593b9dbfcc5a0c59fa5c65edbcd7e95de9f4aee97491b773f4f6d1b73efa25dfff25a3cd984eabd5f5a29ae52526e9878aaef47af717f3cfb3d92fb90b540889f7429f5f6ec617794b6f6e409f7efdd9c19fbab5087f7efa6613ca19f1edf50f727c4a6f759025021b5cefff6ce1ead15a71213c2cf62fbf7c7d5bf4c7a4f2d76584e4de28767ed648de1fc62b4687be10bce81b42cd0eac3b2d02ecb26848a389a41266f4c286b17cc850fceeee5ede1bef88a01288bbdfa25e2d9ac4ee84e2c04bbb5fe7a5bdaff3d2bdaff3d2fef6aace2f8bfc6af8e5a109a01767c594adcb0f710a5caf3d4409cd81d77637bde68daf59e5f9743e6eae97ed3c6f8881a9e9e0c8f63e4c50a4afbb415f9bd1d2515530ccfe5b3fcb180e75bb19d965beaeb3b2ffd6cf32b243dd6e46568638f4eecf32ca9b3bbf01f16a79497e3afb7824c04b1b01d09b83687fa08697aeef36f44e49bf64cb655e66eb59516d42c61f060d2204b520d55fdc0469d2a5460f0c6296dbbdda27a4fc68ab367f17b38e44b06f9278d2cf2d34119ab595fc418d7fd6d0f2fbb9055af4237b9bd76ae741eacb3d7aa98b9ec56eef8390d3debe1e5ebbf4d2205e1fe4b035ab62b609a759355de4cbf60d98b0647ea4b683a87c188998d3a993aabe8ba9bc3b41c34dc8a1d52d31fb50d6d25e0c6a9b90aadee63f9ba834e4695eee9213b10187e70585d8e49d5ee4983c6a378ccc07710fe9a9963a80435c33714aeaf866f428fa477b28b441c43e8c957a88e96ff98db8bd624792beff6161a69eeb4d7895eba219dbc4c506f4ee7f107ae8a6870621e17f7d3b37f4aaaadf9e97d595457abcaa9a16190d44ad1df4bd6019bf7e7dfcef96d9f2624d8c7ff711f13fa2b36da2b835a6e87a005fc8f5315e212bde8cd74bc94fada96d4d08d07bc3287fa0445b9481c2ddcc74c92c61221bf2fe37d01a2f0ee38efcc4cd74ff610c622f1c443734c6ab1b86b15e219f769b91fcb007f25eb3312dd79891935b8c837eff060622be3979e28128842378cfa9c018643a6e338c1fda2836cd83bcff863ea33736614bbf7f7d74d1a7e485d02987ed9669a62d49317ff783fcd67853b38dc8d21fdf18b61b70fa456b5a53217a931b744578dca0103ffd30b47e11bd0817781342ca92863dc63f54044daf77a9d7fa7afbedb2baa2f72ef249d6d01250176bc2b9fbde2379b1dbd21b9fe47d28d5c951c00ff238e33ab37fef830624bd912f12f6667193ec2c2117b607ff7c492b162c8a9d81b346e9bd418b211be30d6946df0f0ef4c33c5681bf0983f36cbad131fdb0fe017d53ef1302f69345b3cecad7795647e3658bc9874d397aba7bf980bcce62412c49ba8abb6d72747b138a3723b7f7617e283ab9098913d6e837a3b2fbe1a888f1b89936649a5aca40d37ac5a428d10b35ede245c82862f73f4c0b69179bf099e5e719e5a5a841170b8bc4878533fdbea9f78f8ae68be282b4820761b59ed01af08bbc455c703ca50421c1f9c8f443d864ab8c0644f90e5de0248cb0b47b62284a1d5d66e51a9f3d23211a7f6bc43ff0cfe8a45aacd6841b490e49377dd5f9e0279154b3267504ed66ffa2d6e1dfdfceb3b29d4fb33aef7cf17be5d7ab794d2a7ee8f39fdceb7ff392bff9f2c58bdfbbf3dd73b505cf68e519df0c7c3df071afabd714541688f6873e1f7ee327ef0d7ff3527c97d1f3afce5e8ff10f919603588de1ab5ae9e7e561e893d79cca320bf0f4c1335a517b65ac0bbdc3a6c14c7159ad67def4029c43c69b8e9f501b7fcc367e7c5c96c7aba219199a6877e3b01971335a116b8eecc23f71d82ffee8097d93924b5b35eb0bd27f240a1fcddb76d53cba7b37a7395937635a91a7e434a1dc1697f99804a4ae9aeabca5cf1677095f0640232dcbf4649e4fdf7e3d00a744ebf63a5535f6b5409c41817f108417f955f3410058c23e08c277f3c907bd4fa24ee6eb83408841f9ba20a089defb25a3a8803eb1ec7bbf0f5949adb0bcf7eb4674480c24b27b6f08a40e6c30969506de574bd20e4d9b2d67df00ccaf5e91a1227df4de707e6279fc05e288f77eb15d7f2d5abce1d7d2a779befa6e5d507ef37d01f434d77b43808a1e7ffdd9c4ebeffdd257128a411592d27fefd769b66150526b51d2ed54b3b0df0428fdfdfd2723060c89f5d4cbacbf2f4c88ab6729b73f2fab49567a6006de77eb0ff46d0c9207e276983cada66b0ce14360bce1a58ef77d0b74158fee7ddf140623fdcc769e0c96fcdd5629a8915eee8d77be7198f77e5660baa4d0ee074357abf5935875ff6060f4373466fa93a47ece8be9d7e30b0212057a362386fbfa6065a0bfbf58cadf9f3c535d85f8fdbfce1c6d00f6fe53120223912a96a47dbf59507bdf1ca87bef0d2a74dfdff3750a08577545e90542831078dd8a367ebda628309fe5333420f79158a3a59895424b325dd362959567143e7eb4bfffe0febd837c7ffb6136996cefef4ca7dbd96cffd3edbdfdf3e983fbbb3b93834f77084352d5d9b2e5371eec9d3f3c38989c6f1f7c7abebbbdbf9b9d6f3fdccd26db7bb307d3d9ceeeee6cb2ff006f5caf188deba6cd17c74d535c2c0997d147eb26afcd9fc2b11293fee25ff24b","7ec9ff0389841566a82e0000"], [
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
  'ETag',
  '"5504e37d-0000-0100-0000-61a720de0000"',
  'Vary',
  'Accept-Encoding',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '6efb8166-b146-4c8c-a0f1-824662d9dd41',
  'x-envoy-upstream-service-time',
  '13',
  'Server',
  'istio-envoy',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '7fcd2cf9-029a-49a6-8bed-d63c3bfb8de5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T071440Z:7fcd2cf9-029a-49a6-8bed-d63c3bfb8de5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Wed, 01 Dec 2021 07:14:40 GMT'
]);
