let nock = require('nock');

module.exports.hash = "0c894391b37e47ed6a2a1ef03664d101";

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
  '5c20cdd3-2e65-4999-871b-c936c3833300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aja6ynrCTR1DkXLw5jMLwqA; expires=Fri, 31-Dec-2021 02:42:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9-mZp8eVdfexnaqNfTVH4nif1-ooq8MXxYSuPJITYHYPIeKnqoQHH0nEBNFCBGkWfIH2-BTcxZhA0jBtn3O8vNaxQ76-faNylpU0oJ5C-hKM86XXsgm0n8p_1dsYGKKcMlfo_C_mNFSj_sBHXTq-BWlmLugyyo76J6iWPh5dpH4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 02:42:56 GMT',
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
  'badfe93a-df4d-4f45-89c4-d13f1ac44500',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuQTwzhtk0tFjf_MfQKfYGo; expires=Fri, 31-Dec-2021 02:42:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZhSD7Aia0Z0nutq9TQ3dnut__0phk6IzNm-QQjs8QMuOb4DIlm4gmTq4q2XwA5w363RlwMBUCLeUs_zzuaBmDD1dsdrCE25WpjvVvPpkzb_PiP54KvwJ8MiL3VRiRTz6LtNNYTNa-nZbwBo83Ly1WRuaXtmwaSwOIiqZd1BSiaAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 02:42:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5a96479b-552d-48a7-b3a0-277435ca7dad&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '06e8a334-c653-458a-90ba-720266964800',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmOd0EKYSPNKoRMxQolFmy0WPr5BAQAAAC_YONkOAAAA; expires=Fri, 31-Dec-2021 02:42:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 02:42:56 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Resources/tags/default')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-request-id',
  'd022581b-ee1b-46cd-87ab-33f46cb34e1b',
  'x-ms-correlation-request-id',
  'd022581b-ee1b-46cd-87ab-33f46cb34e1b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T024256Z:d022581b-ee1b-46cd-87ab-33f46cb34e1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 01 Dec 2021 02:42:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/tagNames')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77dbece245b6c81bfcb2fbd1e823fa81bf091afd860fa6d57ad97ef4e8177fd45eaff0f19baacd4afa5cfbdefd25fa6bf30de2817f7e3203d0bb0c1b78988f08befdec46dc7ec9f77fc9e81b426a8fe0d20ffc4dd0e8377c702302faeb37489c3dfcc39450e2000ff311c1b79fdd88db37459cec074d3e5d65d3b7045c3f2490fea737a2a2bf7e5364b27de323264c7377592d577535a35ecd67d48bfbf04614bf296aadcaac3dafea4593b76db1bc68c6f3aa697fff7c7959d4d572912fdb7193d797c5341f9b96bf7fb56af359b1fcfde98fdfbfaeaa769ad76d43b8294cc2c834fd0680de4808fdf59b9a2b83d087a20e883cadf45b4d983279f803c2503fb9716cdfd424bfcdaf09acfe49c0e4ef1bbbd75fbf29d252aff88389a0ca025ad37c44e0ed6737a2f64d51e6a4ceb3b6aa09b47e4400dd6737a1f1e9374d22ed1a1f304d9abbc7ebb65a646d31cdcaf23acd66b37c964eaed317afbe789d1eff605de7e9cbaa2ca6984ff31221f11e6fdd3cc66f8ad6e87dfb6c795e1174fd9040fa9fde8c8bfefe4dd1db768e8f9878cddd79dbae1eddbd9bbdcdc60bd2d3a40a0803f3357518fdfe66ccbf512afe645e37f42e75a09f13d4ce173763a4bf7fa3b4d4fef129d3abb9bbb7b3fb707be7def6de0e756e3ea6be82cf6f46f69b221f29212818fd9ba0e907376070ef9ba616bac55f4c8e0fd386f7be31e2d02f7bf71f3e78b8bff3e9bd7bd401fd8d2f082cfd167c73034a3bdf34b9e817d73ffe622229dddc378481f98e7aec7f7923dadf14259fe665dee6c7e76d0e3ba21f13d0f0f31bd0d9dbffa6c9e8758f0f995010d1bd9ded9d83edddfb6f761e3cdad97bb4f7e9f8dede83837bfb848b69465d6f6c77c358c8647fd384c5878c1a8f60777b97907bf86677ffd1eecea37b901bf33df5196ff0ff2e9cf78192f99efa8c37f87f11cef73f7d74ef80ba36df539ff106ff6fc2f9c1a37b9f52d7e67bea33dee0ff3538df7fb4b34b1690ba36df539ff106ffafc099b403f1eabdfb8fee432d98efa9cf7883ff57e02c64dc7bf8680756c27c4f7dc61bfcbf08e77b3b8292f99efa8c37f87f17cef7901232df539ff106ff6fc279f7d1de7deada7c4f7dc61bfcbf09e77b8fd8bb36df539ff106ff6fc2992c1d5499f99efa8c37f87f17ce7b1031f33df5196ff0ff269ce97f0fa86bf33df5196ff0ff269c3f7db40f7635df539ff106ffafc1f9d347f777e97fd4b5f99efa8c37f87f05cebbfb6f761f3cda257702a6d97c4f7dc61bfcbf0be73d980cf33df5196ff0ff0e9c29827af8687fefd13e44cc7c4f7dc61bfcbf0b6776dbccf7d467bcc1ff5b7086ab49ffc3d49befa9cf7883ff37e14cec8ad0c97c4f7dc61bfcbf09678a9ea0caccf7d467bcc1cd387f43699827eba29c9d61414d3f2280eeb31bd0d8fbc6937eda353e60023577cb8a52f4d4a5f9847a301fdd8cdd374aa5ef541302ae9f1144efc39b31c1eff4fb374a27ea1b9f3059fedf44a817ebc584b377fa31010d3fbf191ffdfd1b2597748f0f993eff6fa2d8ab3c6b784d423f26a0e1e737e3a3bf7fa31493eef121d3e7ff2514a35feeed3eb87f7f7f678f6d12fd8d2f082cfd167c73034e410efe9b436e7fefdefebd9d877b7b30f2f437be20b0f45bf0cdcf0d72f7f71ededbbbf7e90e0c23fd89cf092afde67ff17383daf535565be9177c42f0e837f9e8fdd0f9fe2ff97f00fb5ae29668250000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-request-id',
  '6d42261c-c870-4ff0-9f0b-6e364e6d65e7',
  'x-ms-correlation-request-id',
  '6d42261c-c870-4ff0-9f0b-6e364e6d65e7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T024257Z:6d42261c-c870-4ff0-9f0b-6e364e6d65e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 01 Dec 2021 02:42:56 GMT',
  'Content-Length',
  '1408'
]);
