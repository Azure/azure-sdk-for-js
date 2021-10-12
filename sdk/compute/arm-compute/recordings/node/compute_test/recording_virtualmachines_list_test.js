let nock = require('nock');

module.exports.hash = "1bd53c422a517e7443264fd8c8ab8f20";

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
  '75642689-6c0a-4191-8a62-1d1517d52000',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsunfZGCZJtAm_9PNMPKEYQ; expires=Thu, 11-Nov-2021 02:40:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4x7CwxQnYka8yqT4VM7XncLzazywjs_YbW6xJh4TJGTDj9p9RuZPBYybt6_zeiLmUVUOom5Q6ftNpP3wGYooQ5wgWlCBAbTTyD2tTGileO1jw3V9--xqJNiGCiij_tbMVyp6osraLBMlwYb0cJqLUQ14gVVBRqM-4-2wZr_aolggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 02:40:26 GMT',
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
  '7d410443-5b41-4027-a989-1112fe592100',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArIfaQC-Fw5EntXhkui40Fw; expires=Thu, 11-Nov-2021 02:40:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrvdu89pO-DbG_PUwl-t7V9mDkBCi0OysYsFyizCpaKHtp-vo5UuK0mcwo7ksFqNWrHpPxYYzqnIUPi4SWr8jHcjd37wCWa0icIRYRc57kSbwSdIuTb_7NmagWQHAITC7phrsdvrXSGORHUcyXdR12QDVEjXFeY8pARXxuxiKARBsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 02:40:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=45da1c89-e275-4285-9680-c8a2cbb1d23a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'ae46e822-90b4-4400-b2ee-cc98e9691f00',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjHe0PU5JVFLt_czNHwyZvEWPr5BAQAAAJvs9tgOAAAA; expires=Thu, 11-Nov-2021 02:40:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 02:40:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a365b6c0e71f5d1675bbceca45369d17cbfcdd4723dba298e1fbbbcd7ad24ceb62d516d5b2b9fb70effce1fdd9c1f9f6bde9a70fb6f777f7f6b71fee4e1f6c1f4ccf771e4c6793f3bdfdddbb75de54eb7a9a7f5e57eb55737771fdd34d9b37eddd555d5d16b3bc6eee7e514cebaaa9cedbf149b558addbfcaee2f185e0d198bf2378b5d72bc6fc4618de3b6535cd3000bc97674dbbf6bf6cb38b86beb0b4a18fb21f34f974954ddfd2e71f2dab25613e736f50835599b5e755bd68f2b62d9617cd785e35edef9f2f09856ab9c897edb8c9ebcb629a8f4dcbdfbf5ab5f9ac58fefef4c7ef5f57553bcdeb16fd7ed4d6344506f62fb1bd7c449daea84d412309b1bb5c9cf1dcec9c67f7b22951ffdea79fee6eef7f3a7bb87d706ff6607b9aef640f1fdc9feedf3b0fb19e67f5ec2aabf39775755e94a0a20796bebf5cbc2e7e808f3f7add66cb19b5fefd9feefdfe977b163b1f3f6adfb4559d5d0c822b16f4e5abfc3caff3e5b4f7353558ad2765d1ccf39abe73f3f9dd6239abae9ad74440fac6eb0fcf47d539c143fbcdcd9ab76b34dadbd9fd74fb69d666539a9348337ab551bea0792226edb5c8df65d3f6275db3ddfd7b0fef8df73fbdbf3bdedbdd79b87b6f6777e79e47a0904404a06a9e160d18a93bfaaa79a3acac43e9f56d847471fd935f54cd0c60ba4da6754e787fc9e289a6cfea6a7106baf75bb2585ca0d1ab3c9b7db72eda7ea345b6a47767718ce97b9df1e3e9b45a2f5b83bfe596e7af5e7741d24b3f5c4d0232a1a92559884f383b841dda80ed3f7f4258eeee3df0bf0e1b7f34234602692090aa51cdd32755b9c684ec0410f0d859255d01756554dcef0f44f67effdd4fefdfdfd9df9f3e78b87bb03f994cb3073b07599e9defeeec4eefdd3fb817a16f97074e17abf63ad68e7b620e78512d7b934f2d6e987e6af17518805efbb96081af49df2ef6210fe0e9b0cccedebd7e93b67a923fcd49efcc730cfd3c2b9b3c6cd485dba3b672d06ea71d7db18983eefdfe0f27bb7b7b0ff6a70f270f0ff6f3d9f4e0203fd8fd7432dbbd97ddbf9f4f029320cf8f38e8f61c740bfa76b1efce348d06903e9c83fc3fbfeffef0fb232b33649ea732d6fa857213546648fa8fb2d9a2587e45ae8ce138106e4d7f77da5d89013ba996e7c5c5ba36be56d01f35638ac390fee417c7176490a9099c9f001635cb97d9a4cc8fd76db52048d3af56a477d9098a355e65ed74fe5add306ad3e9d3b4f8a29af1002cd427d75f4618eda3ac69f2a6810767de606bfa343fcfd665db99da60027caa13207220eb9c1dbcef7d3ffc262bcbeaeaf45d9b2f418a2fc9c7237c889ba9696f801fd5f92f5a1775fef99a084f1329e47b5d5c2cb352dbbbe63e061f2df3f6aaaadfd23b66f2cd4767f084cec923a21ebff78b59b07ed6e5ea85747db787c2ddc2fc4a3e3e1884c8212eef2fa6bfc883acaf3f7a8461fe925ff2fd607cd4548841f34eca837c199aabd7ebe934cf672430a6a54e11ff2011f9","25ff0f17904d65170d0000"], [
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
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/HighCostGet3Min;139,Microsoft.Compute/HighCostGet30Min;699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fcc03fbd-ad5d-437d-9172-3cdf66a4ffe9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11817',
  'x-ms-correlation-request-id',
  '32cd7580-bc76-4a51-b8e0-278f0cdd0894',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211012T024028Z:32cd7580-bc76-4a51-b8e0-278f0cdd0894',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Oct 2021 02:40:27 GMT'
]);
