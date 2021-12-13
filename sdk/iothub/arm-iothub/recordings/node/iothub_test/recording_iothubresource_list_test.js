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
  '518e4bd1-1302-465e-a88a-d3347a231e00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ai5-l9BSWTdEhhs5hd0D_HI; expires=Wed, 12-Jan-2022 02:43:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr76wfuh_mqJ_UzwFa2K1v6VXrxcLjFfw0dg6mXlN89hv-g2-aEPUv095uKLpQt12JFw_5VYUJOfA7ghT_hh4Twk14HY35-9saLbBpaXXyB3Xp2ZX2OKkro3wv64Gm0vOZY2NBe_33-E-azltNRPkt_UMg2D7oEmnYAK0KPzFT5JYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 02:43:02 GMT',
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
  '518e4bd1-1302-465e-a88a-d33484231e00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At84XoS26gJGl5Gm-nkZmnI; expires=Wed, 12-Jan-2022 02:43:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVufTmo5eGhggdcsu-ElSGYYX9hZhDyiu8brQT0i0f-_oCVZ876Ho2g0X3MNMMgy9m8V_LFZV91Jf5oPN06lCezi3BeuWAEt6uruz-y0iRjaWLzTvKJbULJ9sUCK_GkZCFgxJbw7iOHlOwPberZSInaqH7y-WtWzvTjaCtWp-YTEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 02:43:02 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=cd192adf-e543-459b-9e7c-4444d1bdb03d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '518e4bd1-1302-465e-a88a-d33485231e00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ajy81buZ775Lh2eBzpYAU98WPr5BAQAAADaqSNkOAAAA; expires=Wed, 12-Jan-2022 02:43:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 02:43:02 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7f96531cd9bbb6755fb6dea891a17553b5f4fded1737d7dfdd33f5dd71f8d3e5a660bc2e9a3f897edf50a5f0ec2a4266535cd30006a96674dbbc6676d76d17cf4e8177ff436bfa68f79d8bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3ebbdf1e2f4e3fa34f891cabbc6e8b9cd13028d21f447bf317bd754a08a75fbda617eaaac4405775b1c8ea6bc23568f75dea2b68d7e4d36a39e396dfa761b5598b4f8fa76d7199532beafeb268e8dd6279f15abf7cbd9e4ef37c96cfe8fb62f5ac28dbbc7eb52e81212175ce7fbfc8782e6afa18c3ce081ef77f4cafae30da62f545d6bca54f76efed8e77771f8c77ef3f1cdfbfc7582cf3f6aaaadf02e6ebbc25b0bff8a3597e9eadcb1678319ca7f9f29aa064ab5579fda67ab2a64ecf96a797f9129379ba9cadaa62d97ef4a8add739fa02288273337a65595dd107c3d8d1dccfaba65500115e1b673f58d7f9f64cd86b4c632178790733c2e517cb87fc5b9db7f42ba1f0a658e467cba7d9357dbc4bd4cf68e6f1f949b5c670f6bc8fce66d4e67b1fed10f4dd8f8868abac9dc731a216b9f64b0d9ac9a3bb77a5cdf6b2d976edb7773fbdf7607767e7def6fef92ccba73be7fbe7e326af318ec9ba195f15cb5975c523bafbd12f213a100bb7c4161880814f28fde28ff49d27ebe627d6f99ae94ef8b94fdf54ab62aa9f320d8830fa67d3567576919f54cb362b96a404f0b17665009d676539c9a66f5fe133f4a772ffbb992f68bc2264f4a148f91779d310580834b89de9475f823be823833ce6147d08520d885a34a7cb6c5212ab3f22e84d8e612b8ec154fe6eca9ff8bdc99a376d79dc9c35d5c1a73bbbd4cfcb37bbdfa67ea8eb65ce9cf6baad99701fc9a73256748f8fd007214208539ba017e2ddfc45d516e785c8337f48c2fdf6e9bae60f3a9d7e41e0db282a8becddd3bc2411afaf95b57677d06fcea32591cebf5a955536ebf4c6342094cb6a3d7b53096d81430cdcc8c86c9c18e7a44178b2e8f56f7408e779d6920012b61fbda89698df45b17c53363f49dc44f0e9e3ddf11e7d4acc525de5b367bf68b67c5e900226dea2b79bb76b60a42cf51acaa12df21abfb719f42494de345b65d3a2258bb04baf90b122d9c55fbfd85819eef897fc92ef","ff92ff079e7aa6402a070000"], [
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
  '11936',
  'x-ms-request-id',
  '75e046b4-f868-4af9-b6c3-d72d0b88796a',
  'x-ms-correlation-request-id',
  '75e046b4-f868-4af9-b6c3-d72d0b88796a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T024303Z:75e046b4-f868-4af9-b6c3-d72d0b88796a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 02:43:02 GMT'
]);
