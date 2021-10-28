let nock = require('nock');

module.exports.hash = "bcaa1e46fa744ef0157b55f899ebaba8";

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
  '2e8633a5-c0fd-4bc7-80d5-d332ccbb3200',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Al8KdJuoyOpCkH_QskGf4Uk; expires=Sat, 27-Nov-2021 05:46:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryB82JbdbbBiJ2G4IAD6Jr2TD_gloonRNbb2oZkAJWkuTseTZN4yUEd2iy1oDF_7agqgnPCIcmuTPokbfaG4MXHGXc1esFJFymEJItfDYWTpT6aY3e7doc-TfWZmf8tUNnuOeDtS4jCcOSEfr0JdtlO4avb4c3d5Z5zVJl2sqgo0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 05:46:47 GMT',
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
  '2098487b-0f48-41e6-8c25-f80f92832f00',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtENIm6JIKxHjEQ-4kvl6A0; expires=Sat, 27-Nov-2021 05:46:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrx2hlDOPQvSfXyhd2_KrHEuXHikrDmkVXibVkLiyrPZ05glt03Crwf0i-lo61_5ZP2WLVNuOXPiiJPVIpi6uuRjkWIwymjBWHyupnwF5xamm3xBjI8dIKvfeyRYRAVcmUgcNO8zgb5zoQPAATvogqa1SRhDGq7CqXo8t7H5YTBGYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 05:46:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2b5526fc-765b-46e7-929c-418101a6c4dc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2e8633a5-c0fd-4bc7-80d5-d332cebb3200',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuML9kGwXHFNv4BWIJ9qErwWPr5BAQAAAEYwDNkOAAAA; expires=Sat, 27-Nov-2021 05:46:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 05:46:47 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Media/mediaservices/mymediaxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff4e8a3c5f5229f15d9bb77ef3e1a7d54cce893bbcd7ad24ceb62d516d5b2b9fb70effce1fdd9c1f9f6bde9a70fb6f777f7f6b71fee4e1f6c1f4ccf771e4c6793f3bdfdddbb75de54eb7a9a7f5e57eb55737771fdd34d9b37eddd555d5d16b3bc6eee7e514cebaaa9cedbf117e8ef2ef7dae4f56531cdf102ff2d58b4d72b60b6f10d6a5656d30c2852d3d3ac69d3af5ed387d4e12aafdb825a3ce271d248f9c5d7f2e21946b8bb9bcdce3fddcfb7ef7fba7b7f7bffc1e4c1767670fffe767e904ff2e9ec7c7fe7fc5382d5b4559d5de4c7d369b55eb604f07b02304d15329e1f0ecd5e0b2a773b2899bf33f9fb073ff84140c19775b1c8eaeb8f0cb6bf447ef9be1bdaba9de7cbb6b0847c7d4d382c0842be9cd6d73c1a4b471aabc29556bf576e20ff92d1476ff3eba779595ce6d49df702219637cd49b56cebaaf4bea0af66f979b62edbe3a974f2d171595657d473b1e2df9e174deb511c8ffbfdfbe6571d1121b05a4fca62fa226fafaafa2dd187ba25a0a7cb6c52e633c6931a358cf8d3accd2c2e1f4deb3c6bf3d913c2fba3f36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87f4028da57de083d8e572bea5b6868bf3d26f43fdadbd9dbdddeddd9de3b78b373ffd1fea78ff6ef8defdddfdbbf77ffe14f51d392f8f68b6a569c178046ed6f8940f85e140bbfc9cda8801644cb5f","f2ff009643056b1b040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '3d692ef9-6c52-4e93-b4de-32463a47a041',
  'x-ms-client-request-id',
  '6170e3f1-118f-4727-b742-333b173205d8',
  'OData-Version',
  '4.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  'c3015b54-b37a-4cdf-a487-c3218e6c3a0d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211028T054648Z:c3015b54-b37a-4cdf-a487-c3218e6c3a0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 05:46:48 GMT'
]);
