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
  '602ed568-d106-4528-988f-2d671bf40800',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgSrTJ5XdB9Kv7BAuK4r2uU; expires=Wed, 19-Jan-2022 06:52:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrrZ9XVns7aarJ2dGN7p-8_Z-Ng89pyTD5jklGw81PUL488EehGfaz3q259o0kEB-_jYudewB1YzoWn5qHky_kuzuOr96fjkT4q95DWppKnpI94yj2l_8m1DLY3t5jYUr1H1ca9dpx0qcpTkw9mxTjt_JEaZcHaygqZEYXo_eEwUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:13 GMT',
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
  'c8a5e3e9-f35c-4dbc-a255-5341edab0400',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AgN-b1R7ZbBKgwcean8u2fw; expires=Wed, 19-Jan-2022 06:52:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdPbMwMBkq45Y-1A7N8JiqsGuK5M78ywVQGKvbynZarq2VWtXup-thOG_Lw33SK9NgxY-SjQci2bLZUfP6vJ8zdjKQNVpVT7_nWfiLRyXj9jQSRvOuIQuJP3Loxo3EjGm2Y4xRYIRtiBqfVo3r3jOnT3xIYycDs4MfM2Xuaep4nYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:13 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d138998e-1668-4cdc-9776-595d48040736&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c8a5e3e9-f35c-4dbc-a255-5341f1ab0400',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak84CmS3uP9EpO-ClQNHOD_Lj78gAQAAAB0fUtkOAAAA; expires=Wed, 19-Jan-2022 06:52:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:14 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e393ea6259b4c565fe3aaf2f8b69dedccda6d36abd6cf19efefaeeddbb8f461f2db305e1f551e7d3f67a854f6f03905ae76d7641ad7fdf8fee4f77761edc9b3ddcdea1677b6717ffd0b3fde9ee7467ef607742bfeffcbe1fd11bcd35e1be789ab5d9478f7ef147d33acfda7cf6e49a80e43b198df71e11805edade9fedee6d1f9c7f3add26c23cb8bfb3b33bbd3fcd08807de58d607abc5a95c5340339ddb7c72d7db3b7b3b7bb4d50f676deec7cfae8fedea39d07e34ff777efefeeecff14352db3a6fda29a15e705a051fb5b2210be17c5c26f72332abf845ea8f45dc282de5d83b6cddb3548a4d3f47a07edde164b30516f4ea83931c32aafdb82fea0b7f2e56c55154bf43d6fdb55f3e8ee5d013cce56c5786ade1f2fec3c4fabc55d0243efe4f5322bcfd0cfc1fd4f1fec3cd899eeed3d7cb07f2f9b1dec657b7b9f7e7aefc1e47c76effec3036a3f23729f08d1e985de387777c69f7e7a9f98781724a7be5ffa68d288a65959bea2b79f178b82b0fdc51fd5eb12df91bcbccd312be755bda873c6f807793d9eae9bb65a8cdb3a2b40e93a5fe65759f932af8b8a10f874872082393f7ab44bb85d13f18ae99b795db56d592c2f4e97d9a404a2e759d9e4a38f16593b9dbfcc5a0c59fa5c65edbcd7e95de9f4aee97491b773f4f6d1b73efa25dfff25a3cd984eabd5f5a29ae52526e9878aaef47af717f3cfb3d92fb90b540889f7429f5f6ec617794b6f6e409f7efdd9c19fbab5087f7efa6613ca19f1edf50f727c4a6f759025021b5cefff6ce1ead15a71213c2cf62fbf7c7d5bf4c7a4f2d76584e4de28767ed648de1fc62b4687be10bce81b42cd0eac3b2d02ecb26848a389a41266f4c286b17cc850fceeee5ede1bef88a01288bbdfa25e2d9ac4ee84e2c04bbb5fe7a5bdaff3d2bdaff3d2fef6aace2f8bfc6af8e5a109a01767c594adcb0f710a5caf3d4409cd81d77637bde68daf59e5f9743e6eae97ed3c6f8881a9e9e0c8f63e4c50a4afbb415f9bd1d2515530ccfe5b3fcb180e75bb19d965beaeb3b2ffd6cf32b243dd6e46568638f4eecf32ca9b3bbf01f16a79497e3afb7824c04b1b01d09b83687fa08697aeef36f44e49bf64cb655e66eb59516d42c61f060d2204b520d55fdc0469d2a5460f0c6296dbbdda27a4fc68ab367f17b38e44b06f9278d2cf2d34119ab595fc418d7fd6d0f2fbb9055af4237b9bd76ae741eacb3d7aa98b9ec56eef8390d3debe1e5ebbf4d2205e1fe4b035ab62b609a759355de4cbf60d98b0647ea4b683a87c188998d3a993aabe8ba9bc3b41c34dc8a1d52d31fb50d6d25e0c6a9b90aadee63f9ba834e4695eee9213b10187e70585d8e49d5ee4983c6a378ccc07710fe9a9963a80435c33714aeaf866f428fa477b28b441c43e8c957a88e96ff98db8bd624792beff6161a69eeb4d7895eba219dbc4c506f4ee7f107ae8a6870621e17f7d3b37f4aaaadf9e97d595457abcaa9a16190d44ad1df4bd6019bf7e7dfcef96d9f2624d8c7ff711f13fa2b36da2b835a6e87a005fc8f5315e212bde8cd74bc94fada96d4d08d07bc3287fa0445b9481c2ddcc74c92c61221bf2fe37d01a2f0ee38efcc4cd74ff610c622f1c443734c6ab1b86b15e219f769b91fcb007f25eb3312dd79891935b8c837eff060622be3979e28128842378cfa9c018643a6e338c1fda2836cd83bcff863ea33736614bbf7f7d74d1a7e485d02987ed9669a62d49317ff783fcf678eb0bd47c18e97bdf38d2f267044fc272f0ad3d3bd40f7d7f4fbe88bc3f48a7799e95ed7c9ad53f7452913927379dd67e04851eca84f0e0db6ec8bb1ff6faded0eb4304a366c3542229a03fbe31326dc0e917ad69b18e0499fceb2bc2e3064bfbe987a1f58be845c4569b10525d67f4cef8878aa0e9f52ef55a5f6fbf5d5657f4de453ec91ae2af2ed68473f7bd47f262b7a5373e4928520e9dc3cb1fe4718de8fcc97b1f3420e98d9cdcb0378b9ba4fd09b9b03df8e74b5a0a631ddf19389baade1bb4cab631909566f4fde0403f2c1412f89b3038cfa611d5f44df50fe89b7a9f10b09f2c9a7556beceb33a9a88b1987cd894a3a7bb970f289c2916c492a4a7b8db2647b7018a11146f466eefc3021c7472131227ec2adc8ccaee87a3225ec9cdb4219fa7a5a50d5a089b14257aa1a65dbc0819458c16e43f0c31ee62133eb3fc3ca3842735e8626191f8b038b9df37f5fe51d17c515c9056f020acd693b298bec85b049cc753ca3c139c8f4c3f844db6ca68406ca1b903c228a7162786a2d4e6322bd7f8ec1909d1f85b23fe817f4627d562b526dc487248bae9abce073f896cad35a9236837fb17b50efffe361b6878289d2f7eaffc7a35af49c50f7dfe937bfd6f5ef2375fbe78f17b77be7baeb6e059d6b4f866e0eb818f7b5dbd867b8334d2d0e7c36ffce4bde16f5e8adf327afed5d9eb31fe21d2726644934355adf4f3127cf4c96bce91beceeb4bac31d007cf68a9f695b12ef40e9b0633c565b5060b98e9053887cce074f06f3fc8473fa196ff982dfff8b82c8f57453332945224c66133e271b422861d7d64321fc477bff8a327f44d4a1154d5ac2f482b92807c346fdb55f3e8eedd9c666a4d9efeaaa0b5101a485b5ce663129bba6aaaf3963e5bdca55130001a7f59a627f37cfaf6eb0138a51968af53556e5f0bc419d4fa074178915f351f0480e5ee83207c379f7cd0fba400c8a87d100831335f1704f4d37bbf64d417d027967deff7212829cb0724e5bd5f37a24362208984f786404ac2c6fe5969e07db5249dd1b4d972f60dc0fcea15992fd252ef0de72796c75f20ba78ef17dbf5d7a2c51b7e2d7d9ae7abefd605a5d3df17404f73bd370428eef1d79f4dbcfede2f7d25011a54219982f77e9d661b6626b57626dd4e35e9ff4d80d2dfdf7f3262c0b08e937a0b39ef0b13e2ead9cfedcfcb6a92951e9881f7dd72177d1b83e481b81d264fabe91a43f810186f7865ed7ddf025dc5cf7bdf3785c1483fb39d2783257fb7550a6aa4977be39d6f1ce6bd9f15982e07b9fbc1d0d56afd64457f7d30b0e3f5aca8524c11f1467a4241fcd7e28c2e58fa1b8a38fd49d26ae7c5f49b057a36235cbf3e58a1dfef2f06f8f7273758d7d27effaf33f51b80bdff4c87c048528b2529f56f16d4de3707eade7b830a6385f77c9da2cf555d512e83d020045eb7a2e45faf29e4cc67f90c0dc82b25d6682940a638962ce2b45865e519c5aa1fed9d1f3cc87666f9f6bd07f7ceb7f7f307f9f6c1f4c1c3edddf3c9f4d37b0793ddc90c910a8941b66cf98d077be70f0f0e26e7db079f9eef6eefef66e7db0f77b3c9f6deecc174b6b3bb3b9bec3fc01bd72b46e3ba69f3c571d314174bc265f4d1bac96bf3a770ac04c0bff897fc925ff2fd","5ff2ff0002b7d8eb7a310000"], [
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
  '36504514-1b2b-40d5-af6b-c8a86e47e5f3',
  'x-envoy-upstream-service-time',
  '25',
  'Server',
  'istio-envoy',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '84d357fb-3798-4b46-b751-58f0b54c5dc0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211220T065215Z:84d357fb-3798-4b46-b751-58f0b54c5dc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Mon, 20 Dec 2021 06:52:15 GMT'
]);
