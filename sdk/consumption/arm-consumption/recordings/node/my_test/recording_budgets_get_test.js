let nock = require('nock');

module.exports.hash = "f0352c1810a8bbe7f6b6e0a2b912db95";

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
  '4babd1e2-3f69-4056-80cc-eab61a970200',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Asf9MIjFlCJDtGtZpVwZg-4; expires=Thu, 16-Dec-2021 06:18:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJTMdIQsfu9lTF1bPW09d9_SuSVkJlxMvLcoLTs5F6cSlqH7hz5GtiZji47EirKQlPdM1WOnz1p0oWqL6c9m8o-llt2V-jOLk0bQZyYUiPpSb4EVJJMmdDNaKN1zsM7IZHys9GA6SCCTweJa1RJtJV6TyZgeamSo_0YzIuzwumrsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 06:18:07 GMT',
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
  '0b24ff98-2978-4e10-88e4-968613ae0200',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AloMDyL7uUNJitp4OQWm7JU; expires=Thu, 16-Dec-2021 06:18:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0v0koPEDGeaasezckSgHK5RifWrLckezRfiMQrfKl_61GXs2NBMaSs0NddC1Qh-wRFZ0gcc0jqPZb5oNv1nY31H4Oyp6AYhPBETpxuuOT9Rpvoz-splGLNsTYCfZ4K5NlbI1a4hchRwGSPUKArFVUmecxkqDrj_IcoCftPP9RZkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 06:18:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=dd1964e6-2fde-457d-ad76-620a76ac32d2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '703dbeae-7c9e-4c41-85ca-e45102f90200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au-PgHMldaZHkYZ-4UmWHwQWPr5BAQAAAB9EJdkOAAAA; expires=Thu, 16-Dec-2021 06:18:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 06:18:07 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Consumption/budgets/mybudgetxxxy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4f08ea7ac1d0ef4ed6b38bbcc50bf2dbbb77efae3f1a7db4cc163961d2f9b4bd5ee1d38d90a859fe26bba066bfef47bbb307b36cb23b39983cdcddd9bdfffb7e445f1242abbc6e8bbcf9e8d12ffea82d16f9cbbc2e2a1af72ffea869b3ba7d9ab5e8646f676f777b77777b67f7cdcece23fedf4fd1ebf9721634d80b1bfc124292407e5e67c592da7c512ddb7909d4b345b55eb61f3ddaddd919ef8c3e9aaeeb3a5fb6af57040f3d9baff9cbf5b2a05f3ffaeaf553c09b527717557d4d9f9c544d4bb096555b9c17f4390d9b47914ddb7556fefe9fd739b5addfccb3e5ef7fb0f3fbd3b8a6d4071ae4cb6c52e6d4535baff3d147a040d6563581f4de21c8ed9ce6715e95d4f2805199d20008fae9222b4aeaea7b1ffd74355fceaafcf7c4173407e369b5a0f77e3a5be6cda268e7c1e7dfb7efbfaa4ad0fb7b3482655b1793353a1f7df42acf8835bc76c23dd4903eb2b8bc91593fe6417ef44b8824e7454938636019c8f7bd5ffcd18c88be6c0c3d947b5e294f9ecda82f6fcc6718ea6556ae05a7bb3febecbe58addbfcee655163045f64d37941e4a2972e17c4d81f7d9f86449c985d103616779a5d99f54d983fcd2fe9ef9735712f01a1fffd","92ff0730d92fa4c2030000"], [
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
  'session-id',
  '6ab3c300-6bd5-41e8-802e-99b6bac28f4d',
  'x-ms-request-id',
  '028611f4-ec24-405e-9b1d-97d361c11b4b',
  'x-ms-correlation-request-id',
  '23fcbf6f-72d3-4e8e-aef1-9336592c1c43',
  'x-ms-client-request-id',
  'a0d37db0-32f5-48d5-ab05-8685ebbe65a6',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T061808Z:23fcbf6f-72d3-4e8e-aef1-9336592c1c43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 06:18:07 GMT'
]);
