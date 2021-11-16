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
  'd8a4ace5-c4d3-4353-b6ea-bd8986839200',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AocZvaGf5zBPlXgBt-ctz54; expires=Thu, 16-Dec-2021 01:53:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdgrLRL1XUS4d7pL4YVT2cg74PAq2xyHlE8og4jUVU3FmKVFECCpJQxqEe19qqt0-pzr0d8g9d8KBNJkKEQ9PECqFXeqAqgdVPpYhwqJU2ADJSRexuo72NrFUq-P2FV0TecM0svpLm9Q0t0x355ywJIoPLuKgyrOm9UV5q3YD178gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 01:53:55 GMT',
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
  'ac566b03-181e-4262-af31-1e928eac4400',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AgEssqnNKSBEg4uOEEvKfTY; expires=Thu, 16-Dec-2021 01:53:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrN-etrqYjMIgF4CBAvYrWjOBR438XdA3Nx0tg3VQloy91W779NkZ1C6zenICThVlcAcf_1S6_VNdxOXRCWojiDZL2zaqDgixhyBaGR9pHhFwLrd5Cx6CjWQSwU2aUkXd-TGyAraUJbyR-dHVggg1Rp14YSKYlqefaocN9fukLdzAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 01:53:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c825f9a4-573c-47ef-a57b-559fab9c4fff&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '96145cac-462e-4752-9529-a63d3649be00',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aunwf9emLg1ImlWmmny3U8QWPr5BAQAAADMGJdkOAAAA; expires=Thu, 16-Dec-2021 01:53:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 01:53:55 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Consumption/budgets/mybudgetxxxy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4f08ea7ac1d0ef4ed6b38bbcc50bf2dbbb77efae3f1a7db4cc163961d2f9b4bd5ee1d38d90a859fe26bba066bfef47bbb307b3ec603adbd99bcef60ff2dff723fa92105ae5755be4cd478f7ef1476db1c85fe67551d1b87ff1474d9bd5edd3ac45277b3b7bbbdbbbbbdb3bbb6f76761ef1ff7e8a5ecf97b3a0c15ed8e097109204f2f33a2b96d4e68b6ad9ce4ba09e2daaf5b2fde8d1eecece7867f4d1745dd7f9b27dbd2278e8d97ccd5fae9705fdfad157af9f02de94babba8ea6bfae4a46a5a82b5acdae2bca0cf69d83c8a6cdaaeb3f2f7ffbccea96dfd669e2d7fff839ddf9fc635a53ed0205f669332a79eda7a9d8f3e0205b2b6aa09a4f70e416ee7348ff3aaa496078cca940640d04f1759515257dffbe8a7abf97256e5bf27bea039184fab05bdf7d3d9326f16453b0f3effbe7dff555582dedfa3112cdbba98acd1f9e8a3577946ace1b513eea186f491c5e58dccfa310ff2a35f4224392f4ac21903cb40beeffde28f6644f46563e8a1dcf34a79f26c467d79633ec3502fb3722d38ddfd5967f7c56adde6772f8b1a23f8229bce0b2217bd74b920c6fee8fb3424e2c4ec82b0b1b8d3eccaac6fc2fc697e497fbfac897b0908fdef97","fc3fcbe70aa8c2030000"], [
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
  '4f16022a-135f-43c2-ba11-41f5fd070cf0',
  'x-ms-request-id',
  '92bedf6a-e9a1-402c-b42c-e4eaaa276e74',
  'x-ms-correlation-request-id',
  'e60481a5-3b6f-458e-81b5-a74061b8c059',
  'x-ms-client-request-id',
  '74ef2d87-4890-492b-b54f-8cf903043865',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211116T015356Z:e60481a5-3b6f-458e-81b5-a74061b8c059',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 01:53:56 GMT'
]);
