let nock = require('nock');

module.exports.hash = "37a08100ed6592cd54bb718b89d4b663";

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
  '414eea9f-1cc9-485f-a776-546cf12b0f00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlKTlj9cLt5GvLZIDJ9nA1w; expires=Sun, 16-Jan-2022 06:44:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIchzCH9lE4rscGfuSlPJzA5wZc_KCaSSg4SCygNw4zRyjP9UYZGfWyB20qTLbv5HRlLCBsMDTQQnMRSRh7jSkhf9UU4B4bR8qHCjFxjcF1K4cP7HHeeAOFS-ylh7UqljrYObYb3RwSjZQfGxN_bDOGL5IGpq8O6RUSrB8KliRcUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:24 GMT',
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
  '4150cca7-f51d-4a39-827d-43dba6c10f00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlfcWs6EvTZHvcfNh5p2ugc; expires=Sun, 16-Jan-2022 06:44:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlZoL-FHEvfEaCDDjln3rfhCtUe99ZIPh_nlJUSxh9g0CQos0JgVGgGkwxLqxy3_yq8370Rn980Gyj66UuEnATIn9R2RMp_mHXPognSFYSxrmeZ7kIPaWnnP2NBbLnTGTazxu7CyfZ7C9QojAP2sBh5f8hy2HC3Fo-PF63aQcdCIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ebd2f7e0-886b-4ea9-ad76-ca8cff21cf95&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '4150cca7-f51d-4a39-827d-43dba8c10f00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmE3cB26FkJPlLYM13IhlTzLj78gAQAAAMgoTtkOAAAA; expires=Sun, 16-Jan-2022 06:44:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 06:44:24 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac51fbdcdafe9e3cbac5ce7bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3efb7471f5faec33fa94c8b1caebb6c8190d8322fdf13df717bd754a08a75fbda617eaaac4405775b1c8ea6bc23568f75dea2b68d7e4d36a39e396dfa761b5598b4f8fa76d7199532beafeb268e8dd6279f15abf7cbd9e4ef37c96cfe8fb62f5ac28dbbc7eb52e81212175ce7fbfc8782e6afa18c3ce081ef77f4cafae30da62f545d6bca54f76efed8e77771f8c77ef3f1cdfbfc7582cf3f6aaaadf02e6ebbc25b0bff8a3597e9eadcb1678319ca7f9f29aa064ab5579fda67ab2a64ecf96a797f9129379ba9cadaa62d97ef4a8add739fa02288273337a65595dd107c3d8d1dccfaba65500115e1b673f58d7f9f64cd86b4c632178790733c2e517cb87fc5b9db7f42ba1f0a658e467cba7d9357dbc4bd4cf68e6f1f949b5c670f6bc8fce66d4e67b1fed10f4dd8f8868abac9dc731a216b9f64b0d9ac9a3bb77a5cdf6b2d976edb7773fddbfb777ffdedef6c18387f974b2bf933f1837798d714cd6cdf8aa58ceaa2b1ed1dd8f7e09d18158b825b6c0000c7c42e9177fa4ef3c59373fb1ced74c77c2cf7dfaa65a1553fd94694084d13f9bb6aab38bfca45ab659b12425808fb52b03e83c2bcb49367dfb0a9fa13f95fbdfcd7c41e31521a30f45cabfc89b86c042a0c1ed4c3ffa12dc411f19e431a7e843906a40d4a2395d66939258fd11416f720c5b710ca6f27753fec4ef4dd6bc69cbe3e6aca90e3eddd9a57e5ebed9fd36f5435d2f73e6b4d76dcd84fb483e95b1a27b7c843e08114298da04bd10efe62faab6382f449ef94312eeb74fd7357fd0e9f40b02df46515964ef9ee62589787dadacb5bb837e731e2d8974fed5aaacb259a737a601a15c56ebd99b4a680b1c62e0464666e3c438270dc29345af7fa34338cfb3960490b0fde845b5c4fc2e8ae59bb2f949e226824f1fef8ef7e8536296ea2a9f3dfb45b3e5f3821430f116bdddbc5d032365a9d7500e6d91d7f8bdcda027a1f4a6d92a9b162d59845d7a858c15c92efefac5c6ca70c7bfe497","fc3f03e74d631e070000"], [
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
  '11944',
  'x-ms-request-id',
  '1212fa4b-8fc4-4688-af60-d15721e5adf8',
  'x-ms-correlation-request-id',
  '1212fa4b-8fc4-4688-af60-d15721e5adf8',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T064426Z:1212fa4b-8fc4-4688-af60-d15721e5adf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 06:44:25 GMT'
]);
