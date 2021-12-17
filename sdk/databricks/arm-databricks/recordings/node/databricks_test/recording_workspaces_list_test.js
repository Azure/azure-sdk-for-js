let nock = require('nock');

module.exports.hash = "c17a271496d1ea6bb971c8210186cfef";

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
  'b3a7059f-0393-4e8a-8412-56bddda41900',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ar_sRbXFY5FJi_ZImF2udlA; expires=Sun, 16-Jan-2022 08:30:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5qrGtWXT3thCcgjGro5O3DOxWGpHg4n4GWwNTaO6YbwnBmvxTzvv_qJiUI1Ou5SRh2xj2HwyXQ185kS0svNONLXjNAdatWUAPval3tq5YvNJh1vqRh199Cd0x70w0z7AqkdZMqBMi0GXr2uOsKihkNV7896z9USkozbaTaWN2M0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:30:00 GMT',
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
  'ba320f12-b9b3-49ec-bd56-153f105c1500',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgwWhSHs7gpJvWP7VScFvDc; expires=Sun, 16-Jan-2022 08:30:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrG-3MJle5RlSf1h0xRLo0pJAIzbMOYgmXJvKEa_2J8G2FM2uYAl7gQFbof1SWhO45OqA7LE4aJ3imgzSxgkRkpkr4z2TLD1ZjaWUzibkgimtJnqG3nwgQJN8dxaPWAKE7XygflU8Rtby4wFfGTEIfZVkVBLQxrYbFc8duIcnSPvIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:30:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5cb2241f-7118-4d39-8c04-24317797d989&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a7bc5054-7a68-471f-bd20-eea9f36f1200',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiQI8SPY-6hMoMPz2_ZUiAzLj78gAQAAAIhBTtkOAAAA; expires=Sun, 16-Jan-2022 08:30:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:30:00 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/providers/Microsoft.Databricks/operations')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1325bd02f1f7d514cebaaa9cedbf1d3accd2675317ddbdcadf38ba269f3fa6e366d8b6af9d1e8a359d1accaecfaa347bff8a3555d5d16b3bcf65f4eddcbd4b8ce9b6a5d4f01de7d9ebed4f7d2570cbdce1474b5caf5f7471fc957d4c6bd472d667933ad8b55b74d5b79cdc61ffd925f32da3caaabaa7edbacb2698e01663300fef0517dd700a516fe489e138edefbae1d407507d4d6457e993769969678ad3af7df7468bfdf18afeaa205563f8b833c213ab6b9072168198e52da628c5e738beefb0d6d969779cb5dfcec8ded55bea82e6f393669fbcd8ccd8ca3b9eb5a9e2d9be262de3677cbeae2697e5e2c0b74fcc360e357d483f7be1b544aa8a433870bbd17d2e4f3bc6dd2769ea7d9655694d9a4ecbd929e5724c4d42206ffa35f4288d4c5450158afaf49e017d4050d8f906b0b92221a6c93d797c5347fbdcaa7c57931559c7ff147d44ff01935760a6f3639676485662fe4430f836705616a3b9c94d5e4e9da92e3e59bdd6fd3a7d40135231df4326be95f7cb3f5f2675677ea7c51ac1784baed6d5aae0952bdb1c713d7e643bbcba6d36abd6c016ab0bb63d7e643bbfbe96a0230835d7d47beffd06e96559b4faaea2dbd34d8d50bd7e643bb6b9a39b51fece9f56b80fbd04e1ca36fe8ca97ca0fedb0c9a7358924bd33d8dd6bdbe4833bfb45e5cbbc5e144d43000070b8cf9f781eb6fcd0ae8b65d366cb69feb2aa4ac00b7b264dcadfa6e6eb0fed8e469a2db3f2ba2da60017f6168e333df61a7e68bf17f9b2005b0c76f8b936f8e08ee8fdac3c239dfd9ab53b901fee941ba7689dbae61f8a42912d5e55250633d8f1d9f117a9b6f9d0de16e579595d9dbe2343532cf2654b2f0f76fbc5f367d4360d1a7f68ffe7e427adebfc755bd518ce60dfcfa45d6a1a7e68bf7062dafcdbe48056f5f56b31ad0460b07f699fea0ba43ccc1b1f8a884cc0f1b4cc67c764ebcf2908a1f707f1d039e0f6a9f7c2d743e3fbbfe41b73d6664576b1ac1a12f8d779db16cb8b9f5b87cda193368a0fbd1b3a6d8468d7698bbcf6de8edbcf22457f0851ce77d18507c08d35461c7a39a4e9f16c9612bd16d5ac38bff6de68ec2b1420508fef49b3b252e7f6ee45debec85b20f5b22a8b2939c7df68dc4e8e7caaf049b1b7a4e4c8784a3ff48e4f28b47cbd9e2ce947ec056e1fd2066fc49b328f656923e0265943c25d2d99ebccc8d3353e9c5ca72f5ebdbc39c4326f35772dcae40ab404e383c5f24b0390743120d2b7b60ffa1a8304de9166213520bb227ef6f55470646ae00bd32bb1cc4d03b630beb9f1e1730b96bec0c8ecdff8321c0f7d2dc331590dd7f616f8832958ca9abb9745ddaeb35239e5654ec696c4e64387f59302d532a0c2a546164f6a458348875b0e0c58114e8977f98595bcf08d8cfa4335def060fc61436b0db70c878db6c49faae114edeed8bf89a17f70de677844fed89f7237b71ebe3447f647d1fea0a1d7f939213cf782a26f549b0f19b957d22da16cfba516e140236d583165ce22bed75017c505f59fbfac8b4bfaf1bc58beb5d8fd7006fd852040a969c620050aae31e08504385ead4a327b34bf57e98bb39729d969420d736f0dd4c775fe8bd6459dcf5e3417afd665de7c9c66cb59fa71be8437f5723d21eb461998bc693e7e2f5aad5733eae869bebc3e26ca5f2c116cfc5068f415774c79bbe5759ad9aea951489a78b3945237a96069586541e1f205d1ca60915ed4d57a05ebf075d96836b1b8d3e71fa81ddde7831441745b6465f183b85348ad43d2b8f6621c622fa55b05b93f3525088889caeb3bef4500551916df1f8ef0186de010a106e1c84d136f66d3aba29db300cdf296628c869c83b779fad5abe7ef35e495482c04f695620d3a7c903fe03e77630e5583ed8a5ef449c18b3d832d439a6c6afb352870ba9cad2ae29d936ab9cc79d6699ded1d29a99f556a985e53d72d7d57bdbb26183e61c821a2cf6f7e2724d1eddefa468945eba20514d8cf8ee410c6dcffe068080582e253ee271521fafa36af86047caf97bf513afe6ca85fc2947bdd388a907a2fd7377390bc1512eeb6ef7da334fb60afd67d7e03d1b4633b8c9068e2c7d2978cefc6f113ae01dddee3d56f84743f3bda0d9954f24d2895c82b648432771f1b0ec0f9b40bb4fa40fb906437bff10d51ea872d9278dd270d39cdd4dd8daf84d4b9d54bdf10817ee8f2476ffb0442227df350e985903cb778e57d8853addb0971fc4c23dda7f92a5f92278f149f01fdb323715f6ac7a9f69cdaaeaf53fa293d131c9f5c2c38c32f12cef442482e7228109e9b34547e417835ae8374cb04ecee236a9695e48c9b7e661efc3b12ca2cd3e31f60012636b271fa863c7d8b36453bb456433110918c3e6b09087ac8b3e9bc8b0d4ddcf7","7fc9ff03b79dd51ca9250000"], [
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
  'centralus:761b059a-932e-4063-9875-fa016fac7168',
  'x-ms-ratelimit-remaining-tenant-reads',
  '11999',
  'x-ms-correlation-request-id',
  '8a0fb970-5d39-4e9f-8a2d-5f2b3bc0be29',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T083002Z:8a0fb970-5d39-4e9f-8a2d-5f2b3bc0be29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:30:01 GMT'
]);
