let nock = require('nock');

module.exports.hash = "6fb067957f0a85ffd676e6d50686fa64";

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
  '072cda1b-922b-40cc-b9fc-db3ceacf4300',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=As5o7TV4ykFAmCHCAqSJOhI; expires=Thu, 30-Dec-2021 08:38:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrueEhii5ToYvJo6rmBeXjvHG5qHCpHtWw37ooLciW8HUWB9wVQyddLRr1_WElBYVZmlba-Phf9rYQYTd63gIoEeytiVck7vc_lRz1pPRPN_3N0_NRR7lRdMLn4OL6QOL9wGTJakNUBXwy2pazbShl8wNfVSnEUYoyI1l61xmNy4ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:21 GMT',
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
  '7f6f33c0-2e74-490e-8f6c-dc6531b04400',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApKupz2oj29Juz6Ew-dw6tY; expires=Thu, 30-Dec-2021 08:38:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPeqVDxPoKjf_kXjwkR9F3JQ-iNpObjI-2785zywdM6BmFwa2SH_eVqruGAXtwLzkAMnKw2NTjA2FE_NQ7auThP09-WxIjWibM9YqUJ9sKZ3aICe7JcPg1cjAh_PntH3MZrAgfw4w6EaxwN_PsFRsWSKTWM80hgfC7IOreO_83GsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6a5d3c1e-e218-4360-8f30-e8cfbb040f1d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7f6f33c0-2e74-490e-8f6c-dc6534b04400',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmB_6A4zaj1CrNZizbNl_2YWPr5BAQAAAP3ZN9kOAAAA; expires=Thu, 30-Dec-2021 08:38:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 08:38:21 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Sql/servers/myserverppp/databases/mydatabasezzzz')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a3cf5ffefe9fe7cbfb1f8d3e6a8bbcc607f932afb3f2e5ba5e554d4e9f9f678ba2bc966fd06e9aadb269d1d2277bbf64f4d1db6239a3ef2e77f7c63ba37593d7a3cb6955e3bd555dadf29aa036e86e5a9565d616d5921abffe89e7bfff73fa63b98bbed1dbef7ff272f7f73f39fbfd8f5fd38b8becddebe207f993eb16afdedbbf77ffe1837b07f73e3d187dd4b459bba60f3ffa7259164bf432cbda6c9235f919b0389fde3fdf3bdfcdb7770ecef7b7f7b3fd6c7b7270906d4ff7ef1d64593639f8f4fe94de99d639f55e2d9f662d48b0b7b3b7bbbdbbbb7d6fe7cdcec1a37b078f761f8e3fbdf75368b8aeeb7cd9beceebcb629a7f39f9e97cda1697f98b8074bfff1eb5acf35fb4ce9b369fdda2ed2c3fcfd625419d56cb59565f3fafa68c0e35bb2218343eea998655561727b7a7da0faa65fe2a9fad09e4b2fde8d1795636f9e8a392705936f99beb15b0782e7f9d2da7e57a96cfe82da2f5f3eac223f7a7070f761fee3ff8f4c1bd4f31aa6cf67a9a9578f769d16493925f3264f9461949813ec9a66fd7abd76d556717763c536a436f55f49225f44d0d1759b16cf3257d969f54cbf3e2625d13f1aa2533cadd663d69a675b1c227cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde257ebe2c6679dddcfda298d655539db7e32f5c277757eb0951dbfb24e8b6b98bf97b2a534fe815cdf37c7691d75fd2d4ea5c15cdd9f2bcce4e97d3fa9a113b5d0ac5a501d1a8749c9267ca29057dffb5c653e74db5aea7f9e775b55e357717d73f4d646ddae8385fffa2f22ec9f6253e5d5ccb6fabd5eaae913e7c6a7eff013d8497b245eff35658310edbb46d3efa","25ff0fb578b818a9040000"], [
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
  'x-ms-request-id',
  '8f35c0c9-5b1d-4d07-9000-746b1b2d64b1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11197',
  'x-ms-correlation-request-id',
  '36e93228-97ad-4958-979b-16ff9c291ed6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T083822Z:36e93228-97ad-4958-979b-16ff9c291ed6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 08:38:22 GMT'
]);
