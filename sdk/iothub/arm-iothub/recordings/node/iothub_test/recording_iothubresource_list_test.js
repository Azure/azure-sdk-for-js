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
  '286f026a-4e77-4472-873b-fa6ecf8b0000',
  'x-ms-ests-server',
  '2.1.12249.16 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhrzCYRDyXVLvADzVgCJK3U; expires=Sun, 02-Jan-2022 03:27:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2kG2_1xbh1VfEUjD6n25ls8xPyb0gdtbkSIgwiIe_krKqfjJxP-MRnSWePYNftiRqS-EU8elxtspkw-M4QX6KPwp3VtEWDXSRbNguPLsNhoGhFvw08iMr2lphL7lgTLFWYIRMq7i5sNRu47khsxcYJbkmTVPuvgy1F9arDbgp4EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:42 GMT',
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
  'eb92b564-1fb3-4221-b0e7-177b946b0100',
  'x-ms-ests-server',
  '2.1.12249.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao3s9jy-kDZBnwEerFptibg; expires=Sun, 02-Jan-2022 03:27:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrt-q6TtC1jkFIbtfjZ4XE6QGCd9SZqpaikS3zIbhsoZhkyHH6OTd8_C13R7iw19etaOHRw5nhDaDZGcZgbbBmP-U4Df9rsbQwqHzNSWjKT4pQn0uoWmhkm0Hjq_7K38xEn9NC68ld4M_KnjEGQdcRkPcNe0izuXztdNNk3Rb5k1wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:42 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9e3aebaf-482d-44af-9003-e7b581e9aeae&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9e931c9e-8125-4724-b41f-bd2744d80000',
  'x-ms-ests-server',
  '2.1.12249.16 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AifQmzMjqRxPuFDH8VOOXfcWPr5BAQAAAK6FO9kOAAAA; expires=Sun, 02-Jan-2022 03:27:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:42 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7f96531cd9bbb6755fb6dea891a17553b5f4fded1737d7dfdd33f5dd71f8d3e5a660bc2e9a3f897edf50a5f0ec2a4266535cd30006a96674dbbc6676d76d17cf4e8177ff436bfa68f79d8bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3edbfffc177de7e033fa94c8b1caebb6c8190d8322fd41b4377fd15ba78470fad56b7aa1ae4a0c7455178bacbe265c8376dfa5be82764d3ead96336ef97d1a569bb5f8f478da169739b5a2ee2f8b86de2d9617aff5cbd7ebe934cf67f98cbe2f56cf8ab2cdeb57eb12181252e7fcf78b8ce7a2a68f31ec8ce071ffc7f4ea0aa32d565f64cd5bfa64f7deee7877f7c178f7fec3f1fd7b8cc5326fafaafa2d60bece5b02fb8b3f9ae5e7d9ba6c8117c3799a2faf094ab65a95d76faa276beaf46c797a992f3199a7cbd9aa2a96ed478fda7a9da32f80223837a35796d5157d308c1dcdfdbc6a5a0510e1b571f683759d6fcf84bdc6341682977730235c7eb17cc8bfd5794bbf120a6f8a457eb67c9a5dd3c7bb44fd8c661e9f9f546b0c67cffbe86c466dbef7d10e41dffd8888b6cada791c236a916bbfd4a0993cba7b57da6c2f9b6dd77e7bf7d3bd4ff7771edcdfdecdb3fdfb0fb38383d9b8c96b8c63b26ec657c572565df188ee7ef44b880ec4c22db1050660e0134abff8237de7c9baf98975be66ba137eeed337d5aa98eaa74c03228cfed9b4559d5de427d5b2cd8a2529017cac5d1940e759594eb2e9db57f80cfda9dcff6ee60b1aaf08197d2852fe45de340416020d6e67fad197e00efac8208f39451f825403a216cde9329b94c4ea8f087a9363d88a633095bf9bf2277e6fb2e64d5b1e37674d75f0e9ce2ef5f3f2cdeeb7a91fea7a9933a7bd6e6b26dc47f2a98c15dde323f4418810c2d426e88578377f51b5c57921f2cc1f9270bf7dbaaef9834ea75f10f8368aca227bf7342f49c4eb6b65addd1df49bf36849a4f3af566595cd3abd310d08e5b25acfde54425be010033732321b27c63969109e2c7afd1b1dc2799eb5248084ed472faa25e677512cdf94cd4f1237117cfa7877bc479f12b35457f9ecd92f9a2d9f17a48089b7e8ede6ed1a18294bbd8672688bbcc6ef6d063d09a537cd56d9b468c922ecd22b64ac4876f1d72f3656863bfe25bfe4fb","bfe4ff01991c470a2a070000"], [
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
  '11933',
  'x-ms-request-id',
  'a6ca5c92-c8f8-4dfd-8a2d-dcd70693253f',
  'x-ms-correlation-request-id',
  'a6ca5c92-c8f8-4dfd-8a2d-dcd70693253f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032743Z:a6ca5c92-c8f8-4dfd-8a2d-dcd70693253f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:43 GMT'
]);
