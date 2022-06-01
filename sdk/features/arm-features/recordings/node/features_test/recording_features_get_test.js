let nock = require('nock');

module.exports.hash = "29e1cb86a520b59f57817b5a85b9f61f";

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
  '984c7d98-3da9-4a7a-88cb-e71e49a51600',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Akg1KyKUo41Kvv94EljRnrg; expires=Thu, 06-Jan-2022 02:24:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6vEC-7ExuQdRJGnNXbmGzPD7w-_CGyUvgph6NXNTSdx5g9_b0CQDjQCiatZiGZAvqpR5-A_ATaieRCZ6Rgfk4ZqwlwBbNCbJDAGlBnaynMN0RbZwRS8dQdD6XCdKG0gwL8lnp1mNiO4c6qSj5ZbQII6tp0uRhxjOMQ3wgh7oGzwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 02:24:21 GMT',
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
  '9fd634e6-fcfa-489c-b3b7-161ff1861700',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Au9VfzEnyT9EpnccojVjEgQ; expires=Thu, 06-Jan-2022 02:24:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrw5tXSboRG4pR2aq0aaLcKBAl6XsSx-LBd-otZJ8YH0PmjVXDPERN5emn3CaxbSe0zX4mJ7yVPLItb_Kz_1RUNTCPByaNEQMF9szmJQkbxCsXMtWt9Ouhi-uQgbcx78kJ44mqpGZ4LWqWS4D99csIR3QueS4H72W4gBnx00KUFcMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 02:24:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=34e4e73d-7d77-4345-b270-9a7f4b7dfc70&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '66e9cb12-9881-44b0-9397-f8f99a7f1a00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjsCm1Lx1nhHmkYtLOjbtjIWPr5BAQAAANa8QNkOAAAA; expires=Thu, 06-Jan-2022 02:24:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 02:24:21 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Features/providers/Microsoft.Compute/features')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d1a35ffc51d3662d7dfed18baa7d955f144d9bd7f9eca35f32faa898d1a7779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb7709fe6531cbebe6ee17c5b4ae9aeabc1d3fcbb3765de74df4cb936ab15ab7f9dd73d3e8f5d9e7a7b38bfca7aa65fe723d298b665e2c2fce96c765693efe68f4517bbd02de0e4ca40f03919a2fb345d8dcf47a8bce7ec9e8ff23547b53af0995d9f36cbd9cce7ff20b1af63748a52ef0ff6f50e5595694f4cbab7c5a5de6f5f54f16d9ab9c5f6c080b9a691af43745a31bbbfaff06c54eca6a3d7b9dd797c5346f480caaab577953adeb69fe058d8b08f04dd1eb868efebf41adaf9afc65eda6399ffde417cdb3aa3ea996e7f4eeb22db2923e21327c5354bb6587ffdfa0de49b624d19866e569d308eecdcb325bd2f8bf29720df5f0ff31fa1ccf2eb3e5349fbd5eaf5655ddd288bf710275bbf8ff1885ecfc1afc7f1648d4ebe3ffab346acc007e3689643bf9ff08958e5fbe3e5b64179e1b48e3fdc6c81381feff11ba98897ddd66cb59565b05f10d1267a88bff8f50a8aa5f521320430a9406fa8dd12504fcff0d6a3ccd6734951429bca866f9e775b55ed110bf298a4480ff7f832ab3a2c92665feb468de36c7cbd9eb65b66ae655dbd0fcbefafc79b128be4979ba4567ffdfa01a8d0003a12081ec09b9b84d557e93f21505ffff35ca207cfa769e95b0283f1ba4f1e1ff7f8436cda2799d4febbcc510bf318a7850ffbf4187d325a6f084be2657ccf5ffdda29dff5ef9f54f66eb927095881b23ffa608f55eddfe7f8492efc80223dc6e9e654dbbcada3911e01ba3571ff8ff37a8f22c9bd4c574cca99baf9673d211edfc1a869946fb4d1167b88fff6fd1e807afbf18bfc8af9ee6abb2ba5e508034fe72d57eb9fe26adfe8d5dfd7f8a627103f48d532bdecdff1729f5bcb8ccbf282eea0c387c9e7f9349b41b3afaff22b5dee4cb6cd93ecfb326ff9210e7b1345f2e59b3fc6c116e539fff5fa4e14f7ef10cc6fc6cf9d3f9b4ad6aca42cb0889223f3b041cecf0ff53d413ffe8699ecd0229fac68936d0cfff076975422b8fd5a2f8413e93f90e341051e26785709b3bfdff16157940c100c0093f4b84ebf5f3ff755ad1c87ff60945a3ffff1c955eb7d54a0690932ea6608f86feb342a97e47ffdfa616d9b3b727d5ea9a0623ca8528f1b34db87e9fff1fa4a1601e77a17e9648b8a9cbff0f52d0e308e8e69f25a2757af9ff149d3cdc5fbf2d569edc40f17ce304dbdcddffa72827733fe8a57fe3a4bba1bfff4fd1ee27bf7859e7fc02528148427ce3e4ea77f1ff4a0a4d156b333283fe574f91422e96cf9e1e97c5c512992d1af487d2c8f4b6a193ff5752c9ccad191b0da0695f5625f25794ef3bfb66557b07f4ff472822bfc492c7df206da44dac93ff6f514994e9e6a8f79b27db6d7afdff161dc98063489d8cf2374fb9783fff1fa155554db29a46f98d114500fe7f63f49f676599d7d7678bec227f525c3c29ab6fd2ad8c41ffff145d8e57abb298b2e893bf7259e45734dc6f983a913efe3f45239edd6f1717f3d7d3acfc26cd591cfeffa7686326f41b278a01fcff296abcca17d565fe5593d7afab753da5f58055be9ce5cbe9358df81b26d086befebf41b3b3c52a9fe59ebb4b83fea668d487fdff119a2c3f5fe78474d64ee71c41b20c7c837489c2ffff0a6da6758e18312b5f2fb35533af5a8cf59b234d04fcff5728c3b3fa935f7cb59a01bb6f922821e4ff6fd0e3794586f469717e4e6efb5bc3e4df1c51a2e0ffbf41190a9b577551d5457bdd90562cf3cb058df49b224c0cfaff37e8f245b6241f6c86096dcc8c7e73748941ffff145d5ee50dfb18cd17e472d048bf61c284e0ffdf4e191ed5dd2f5ebdacabf382fcf52e39687c5f971c16e6ff8b68b0b05f9aecad19cadd2f6825a05895f9f1655694d9a42849f07faa5a12c25f9726fdce86fbf87f118ddc97662acdd0eebec8dbabaa7efbb2cca6ec5d7c5e57eb95d5025f974eaeb9e970733fff5fa1d51532bb942aa8bec97c5500f6ff2394a094f6335a13997f13ab2e06ba07f4ff1b54a0f58f2fd72d67455ee7edcb6295532897134fe70b468406fb4dd1e6c6aefe3f42b1d75fad28934ff34c2bda92ac96b5361afb3746aac13efe5f44a3be213143bbfbe5655e939d9585591ae8d7a34bbf8310eeff8b68e1be34536886c3387343e09ccf4edfb5f912bf3ecdcbec9bcc596deee7ff3bb4b2f38b85ebaf9e3ec9ca6c39fd265dc00d9dfc7f944acf74001410d2c07fd6e8e477f3ff514a99a9c6107e1629e577f3ff0d4abdccebf33794867aed754e43fea6281405ffff11cad4d5bb624121d180dfff0d12e9869efebf412f20522db3f2abb2adb3d7af9ffee41718f43745a318f4ffafd0659515f54f7e611ce0b325614946c74eef3749a41bbafa7f11c5fa4e9e192186816650aa50a45f973efd1e3a80ff5f440df7a5994b339ebbaf64954d030333935f9728aeb9e9280effff93b4a9ca627a0da35cd39b34e69f251285ddfc7f8452ebe56bee1403fdc6e8e280fe7f830aafcf3e3f5d6693126cbe28d68be7af5e934ea0e9cc80060df59ba2cc0d1dfdbf925a464b9af1dd7dbdaada2f72c2e427b3b2a0354aea9bc6fca12432ddc4a0ffbf922e664ecda0eebefe89e79fdf7ff19206f7a1b430a00dc4ffef8cff53c2f69b1d3f20fe7f64fce454cdb27a466e280dea1ba38107f5ff1b7478932fb325a1d350a6323f9eb6c52570fce6281287ffff11da142bac09d0f0be316a28c4ff6f8cffaba7c88714cb674f8f69596489a09606f74dd12206fdff2374d1f815f853a0f69a46f98d11a50bfaff23145916e7453e7b5a346f4f97d3fa9a7ba771c6c8226f38b00608351f264b14feff8769436b43c87efc2c53487bf9ff309d200776410d04f859a557a7b7ff8fd0ad4180c24d9114c96798f26f905031f0ff9fa14c7db6c82ef2d7f3aca6d89f86f90d522504fdff0d8afc6451b7ebacfc229b92e1cd29f46f8b45ae8bd4240a1cec66d3b7342e2fa0fbe6a8f6b5baffff0865bf7859ac72ca30e54fb216c3bb20a9e12cdc3748bec13efebf41a3cb45d31caf0a45fa784a496d8cf79b224f14fcff1729f3937b8afccf166d6c07ffdfa0ce4fbd7acdbab6395ece5e2fb35533af285bf9cd11270effff1bb4397dfd7b174ff3199292f9ecdb55f34d46687dd8ffdfa0c917af2f43b4bf3992f440ff7f8322afaf97d32755f57691d56f6978df143502b0ffdfa0c4d393d7c50f08bd6f8e0806e2ff37c6ff7b3fcfea0b385bdf241f7840ffbf4185a73f794f26ed9ba38105f9ff0d0a205b7f8fc6f34d0d5fe0fd7f67ecfb34986f72ecfb34a6ffaf8cfd3e0de69b1cfb7d1ad3ff57c6fe290de69b1cfba734a6ffaf8cfd390de69b1cfb731ad3ff47c6fef48406f30d8e9de0fd7f67ecdfa5c17c9363ff2e8de9ff2363fffca76830dfe0d809deff77c6fe050de69b1cfb1734a6ff8f8cfdf8e41b167800fcffcce8692cdfe0d0693cff5f18f7d3a7c79fe7cb6fd2b73110ffbf31fe634aa4137a674b4266999534b06f8a0e5dc8ffdfa0c7d3cbbd17396132a3a17d53947030ff3f43033b6bdf1415980a16eafbd3e1e7820e6f4e5fbff90609c0e0febf33f23d1acb3739f43d1ad3ff17c6fefaec73b7b64f83faa66810c2fdff062dbeb8dc7bbdc8ca12392a51e734c26f8a2011e0ffdfa0ca4f7ef1653d9d9346afb3b6aabf58976df1ec298df49b224c1cfeff1769f39a569bcb9c90ffd9228eede0ff1bd4395b7ebe26d4bf5db52fb1164f4bf3b2b44a03fea6e833d8c5ffa72874bc6eab0efedf3889227dfc7f8346afe719217136cb976dd15e9f2eb34949387d73f489c3ffff066d5e54aff226af2ff3e3695b5c127e67cb93aaac68e995b0a0417f5334dadccfff3768f59cd0f8f2fc65b15ce6b367d9a42ea627e51a9861e4df14a13674f2ff222a2dec9753c5db8cedee8b97afe1a160905f8f267dd816e4ff8b28e0be3433674672f7d59a787bb1c89633a327bf2e295c7302c89df461ff7f8326ce953f265bdbb434c66f8a243dd0ffdfa0c89b1a623dfbc92f9e64d3b7e745591ac3f1cd5166b08bff6f50e83bf9ac7892b7d91b723e6898df145502b0ffdfa0c449b5bafec96f32c1a000ff3f32fab25acf28e2bd2ca684e437488400eeff376801277c414ed3f455beca8abaf96ed1ce4faae57971b1ae21dbf2319c2c428a06ff4dd1eafdfafdff062d5f5f131a8b977551d5e4b743248802df14c122c0ffbf4195af4a4a153c2d9ab7f777f74e6984df144142b8ffdfa005e5205fceb3267f3dcdcafccb754bd3086cbf39a20c74f0ff19ea20f4a594120df11ba48801faff0d2a3cabeaabac9e1dffe073c2ed2abb7e935d6080df143da2e0ffbf4199936c954d49f949e44fc6a35a9aa0e59ba3cf864efebf4125cdaef51290aff24955b565de60f8df14b56ed1d9ff37a8466ac2463734e06f8a3e01d8ff6f5022e699fde4176c505ee76d73dcf2af34e86f8a46b7ecf0ff3bd4fbf2f557ab8b3a9be5af9fbec4603ea745b6bcbe3e5b6417df34dd3676f54d52ec678f6292941c1fffe0f517e317f9d5d37c5556d70bca7d8f5fafb2e5920cf7f8cb554bbe0cd1e29b22ddedfbfcff060d291b5e9525a1addc4046fef5b3803f881adf14f16ed1d9ff37a8f655939f9659439ae765b1ca6944394d7ab1287e40ca881611be398addd0d1ff37a8352c33c73f78796ae4e59b23daedfafbff3aed7c7d73f64df2dcadbbfcff0605c91d6fab3a7f5915cbb67995b775915fe6af8f5f1309be298a0d76f1ff0d0a4502171aed37459c18f4ff6fd045052136806f8e3c1b3af9ff3a95444bfc3048253dfd7f835e1af8c2edd1c8f784c2bc6ac19eb706c144856f8a68b7eaeeffab94e31f5f54b3fccbcbbcae090051e2678f70fc23e8edff1b74c310ea8a10a34ec9e546e6db5fa92639fa26bdafdbf4f6ff0dba512ae1f5b3327f67a4e49ba35117f2ff57e871bc5a615cdf1c1918e0ff3746ff7a55b56f6a581de2ef6f52d17400ff7f831ac4c1c8ad519acde7e36f8e2871f8ffdfa08dce248703a7efa6e57a96430b62bcdf147906bbf8ff06857ef28b17797b55d56fcf9684ce7936cded0a3ee34143ffa628756357ffdfa01894c493b29abea5b17e53a47130ffbf4183e7c565fea6c8eb9379b6a424f53747880ee0ff6f50e334abcbebd76d56b7a42b5f5362353f5b129ecb29a1fccd9166532fffdfa013e1ad96e465c1d92b1aee37459d3eecff6fd0e4abb2ad3336185f5497dfa4247500ff7f831ac765595d51a832cd9fe6654ee87d73f4e881feff06454e6afa8d971aaae549592dbf4992f461ff7f8326de2c1a77f49b234a04f8ff37a8f27a9e11122cf134063214cb5956cf5ebf7e4aa3fda68833dcc7ff3768e465928e9b266f1a2ca6503a4927fa9b23d40d1dc5a905503f9bd48a8ea68fbb19dfddd7ebd5aaaadb93755d13f6cf8be5faddf105fdf6e5b2bca6c17f53b4dad8cdff3728e54d37a7267f72d1347eb4fccd11eba69efebf412f5a4c7f51af5eae5ba0ff32afdfe4cb6cf94da63e073af8ff0675100dbec9eb45b124dc5e4fe7f96c5de6b3d34b92091af33745a24dbdfc7f834e27f37cfa96ecd04f7e717a594cd1358df79b224f04f8ff37a8c28eff937551b65faebf497e09e1febf92165345d50ce7eeeffdfc27ef3da3417d280d0c6081f7ff95b11f03d96f72f00cf0ff95a3374c6ac671f77533fba9baf9225bd2daaa38ac34b40fa584e92502fcff1b5439aea7f3a2cda7f88b06f84dd12300fbff0d4abc3efbfc357d21811e8ded9b224508f7ff23b4282ef6e8ff924ea4ffe5d51a63fcc6485244c0ff7f8332f4c162bd2cdaebcfb3b2cc6b60facdd1857e7681ff7f832a146b70bb863aa54c2b3949a7ab79bec8ebacfcc92f9aef16ed9c16c5aa35f228c5f939f4e3cb92567b1002133dbe29f27d0816ffdfa0330531fe20f3198d8b86f9a65e137af883c8f34d51f3e6befe3f433389f59a2fcf5f173fc89fd182128dfb1b24531ffcff37284396e955be2a8b29a1f6935f7cfe9a86f94d51a507faff3314a18426d6050cf6d43b8df31b244b04feff3768f37b5d4ff2fa2717c79759516693a22433f545ded6c59406fc4dd167b88fff6fd0e859362164c7c3c3f8e648756357ff9fa21819e36c52e658ecffa2b8a8452ebe7162457bf9ff069dce16ab6cda9eafcbd3776dbe8441fe6a35039adf1c9106bbf8ff06855ebf2d28bd3b21ad7ab6fa6e4dc1e7ab27c7272e67f7226fafaafaedd992703d27afefa45a9e17176b6182465e247f8753e6df1c4dbf41a4febf310b3fb9a0a86e45813f756a30ffe6c81983feff0dba904cd5d9f3acbe2077e8f5342bf3d779fb9a5202d3f635a14363fea648744347ffdfa0d6d38ab0395ea1ed37a9e102b0ffdfa084aeeed9d51859e2b3cbc6df1c6d6ee8e8ff1bd422fffac4e1fccd112784fbff0d5ac0cba17c0785a434b20142503307cbbc49cd0709e1011da6c2cb7c39a3fc0bb5f8b91cfff1b7bf7a4243f9a646cee086c7fcff9a693f4674e92f4420d224d7e2cbd7f88b46f88d11647347c3a4fa7f097b007d92e857641bb3867e5ca0771af0374a9f7e07ff9fa0cb4f666541ae3ff56bd0fe86e9d2ef60982e68f1ff0ad1caeac5f1aaa0298515389e4ef30603fda6e81283feff01a21cafdb6a413339fdf2f5572b8aa9673912edb280717db620ed4083fea668748bcefe3f42323b009d701af53749a41ef861b2fcbf44ed78092c8a585e164b2ce1d030bf31aac43bf87f3d5d7eeaf825a7079658c47afd7b7d4563fcc648d283fdff7a6afce0f8258de81b2300c00d8ff9ff3d0ae307f4e3278bba5d67e517d9745e2c29aaaf8baca47c515395dfa886bda9ab6172fdbf84457eea495666cb2930f906c9e241fd7f3b059e2072ff3c6f6559f26c795ed50bfa85507895ff22c4f818e93745985b74364cafffd708d8cb326b813919869626b0f9f232af6b7a8b46fe4d116ab08bff0f90071e05bb5d945c342b038177f1cd91e9c6ae7ec9f7","7fc9ff0363678cadb6f00000"], [
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
  'southeastasia:35d0e315-0c1f-4fd9-bae6-9f1b669af855',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  'd192cec2-f89c-403f-aad7-d980b94702e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211207T022423Z:d192cec2-f89c-403f-aad7-d980b94702e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 02:24:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Features/providers/Microsoft.Compute/features/SIGEdgeZonePublishingInAllEdgeZone')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef1474d9bb5f9478f3e7a51b5aff28ba269f33a9f7df44b461f1533faf46eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff72ec1bf2c6679dddcfda298d655539db7e36779d6aeebbc897e79522d56eb36bf7b6e1abd3efbfc747691ff54b5cc5fae2765d1cc8be5c5d9f2b82ccdc71f8d3e6aaf57c0db8189f4612052f365b6089b9b5e6fd1d9","2ff97f000ce8051f35010000"], [
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
  'southeastasia:e4466c55-23f6-4fec-8343-b132f02b2f89',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  'eb48a79a-bbff-4199-8744-974dcd8e27a7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211207T022423Z:eb48a79a-bbff-4199-8744-974dcd8e27a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 02:24:23 GMT'
]);
