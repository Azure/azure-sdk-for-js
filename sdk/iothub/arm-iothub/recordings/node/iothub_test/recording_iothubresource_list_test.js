let nock = require('nock');

module.exports.hash = "8e5894c76622a8c97acb6ec3ef36fa63";

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
  'd3033c4a-b30b-4222-a25d-93df17770a00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvH9zNoTYwVDuuzp65Q4DVQ; expires=Sun, 16-Jan-2022 06:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrT3FAngV0gtvl9AjjxaQuL4NLp3b6nrSxoy1M30Ft0TayMnu7uwrHGm5GgeRdReQr6l-qKBt7_6CKciaI2pVqHCriPRo8Wqh-iUuIeVqnZL0FVhn6X2ce_SP8kTFB0tBHJjDCkOtqwGx5gOW3HVCjXAOyCk8ZYPNDFhuxIzjqoe8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:25 GMT',
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
  'd0c9695e-6cfc-4eda-9b3f-58d3aa110b00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhrD-SeJQg9Gt0Vs0otVLNA; expires=Sun, 16-Jan-2022 06:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpUxLoai2PuEL8g4AzCvuk3aOEw1tBXqAgb2-o8_sHVloyBGIFBkjCSUnWozD4nSDlGBklkOYTZf9NkckErpUhzxDBVbMvd8l5PI1UfPvKXqaxa3LKTraNSpdJfwDos3myHj0fdThK4VMvCWdjSwRFBRTSM23bm4RI1DBl6YlTZggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=238344f3-70ff-4663-ad11-1518a32db617&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e9fffaaa-ac72-407c-a105-da26e06b0a00',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtAYvBVDGBBGimqN2jSNgAbLj78gAQAAAMooTtkOAAAA; expires=Sun, 16-Jan-2022 06:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:25 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7f96531cd9bbb6755fb6dea891a17553b5f4fded1737d7dfdd33f5dd71f8d3e5a660bc2e9a3f897edf50a5f0ec2a4266535cd30006a96674dbbc6676d76d17cf4e8177ff436bfa68f79d8bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3efb7471f5faec33fa94c8b1caebb6c8190d8322fd41b4377fd15ba78470fad56b7aa1ae4a0c7455178bacbe265c8376dfa5be82764d3ead96336ef97d1a569bb5f8f478da169739b5a2ee2f8b86de2d9617aff5cbd7ebe934cf67f98cbe2f56cf8ab2cdeb57eb12181252e7fcf78b8ce7a2a68f31ec8ce071ffc7f4ea0aa32d565f64cd5bfa64f7deee7877f7c178f7fec3f1fd7b8cc5326fafaafa2d60bece5b02fb8b3f9ae5e7d9ba6c8117c3799a2faf094ab65a95d76faa276beaf46c797a992f3199a7cbd9aa2a96ed478fda7a9da32f80223837a35796d5157d308c1dcdfdbc6a5a0510e1b571f683759d6fcf84bdc6341682977730235c7eb17cc8bfd5794bbf120a6f8a457eb67c9a5dd3c7bb44fd8c661e9f9f546b0c67cffbe86c466dbef7d10e41dffd8888b6cada791c236a916bbfd4a0993cba7b57da6c2f9b6dd77e7bf7d3fd7b7bf7efed6d1f3c78984f27fb3bf9837193d718c764dd8caf8ae5acbae211ddfde897101d88855b620b0cc0c027947ef147face9375f313eb7ccd7427fcdca76faa5531d54f99064418fdb369ab3abbc84faa659b154b5202f858bb3280ceb3b29c64d3b7aff019fa53b9ffddcc17345e1132fa50a4fc8bbc69082c041adccef4a32fc11df491411e738a3e04a906442d9ad365362989d51f11f426c7b015c7602a7f37e54ffcde64cd9bb63c6ece9aeae0d39d5deae7e59bdd6f533fd4f532674e7bddd64cb88fe453192bbac747e883102184a94dd00bf16efea26a8bf342e4993f24e17efb745df3079d4ebf20f06d149545f6ee695e9288d7d7ca5abb3be837e7d19248e75fadca2a9b757a631a10ca65b59ebda984b6c021066e6464364e8c73d2203c59f4fa373a84f33c6b490009db8f5e544bccefa258be299b9f246e22f8f4f1ee788f3e2566a9aef2d9b35f345b3e2f4801136fd1dbcddb353052967a0de5d016798ddfdb0c7a124a6f9aadb269d19245d8a557c85891ece2af5f6cac0c77fc4b7ec9f77f","c9ff03fba1aa0d2a070000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-request-id',
  '9107796e-1f6f-40a1-8394-f5f7ff1e74cb',
  'x-ms-correlation-request-id',
  '9107796e-1f6f-40a1-8394-f5f7ff1e74cb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T064426Z:9107796e-1f6f-40a1-8394-f5f7ff1e74cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 06:44:26 GMT'
]);
