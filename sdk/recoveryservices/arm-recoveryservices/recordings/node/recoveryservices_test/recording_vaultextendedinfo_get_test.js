let nock = require('nock');

module.exports.hash = "db178ba8df9f6ff3bd4b00ab8431d64a";

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
  '79d11a11-0869-477b-a93a-cb74b9531d00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AujBXkuk3tBKrmaHyCt3Iw0; expires=Wed, 24-Nov-2021 08:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNQ8ksZkrjmtrj2C7fLHosODWEFD8bWxrv-Pryj2Ml9qqqHmiR0J7RgIbqc4MxPbZeukEhJQxyqNQ0RLmd51M99eNUiB6eolh7GfTesGjICXzNp8ZngRne1tviBOTikbvsTs34vwTTz2FJOQlf6IaFNNX6183nqD8Y-LWfHJXD_ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Oct 2021 08:58:07 GMT',
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
  '25a4d68e-a0c1-4646-b99a-9169274a1700',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuljCR4dqflKh81LJjFdwnI; expires=Wed, 24-Nov-2021 08:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreWFXgcpx--P2MPqDJcNBJA3d0QY1ADtBYowpBhWDke3KGJGfu13MocA-hK_uq6qqhAuTwjNdZ0M12MrvzVwvphYvFTf_onu85zTLwrqbvkuGHuaOwbg1sVGk6pkGoHIlwnzNsGHjjHsxLS0Ms8B4XLPmO5I2SP6pzNCUjErcEF4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Oct 2021 08:58:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=28fca1e0-6df0-445b-a6e1-9327ae999a45&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '25a4d68e-a0c1-4646-b99a-9169294a1700',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq7I-8n_F3BMlFYq0i_hq4sWPr5BAQAAAJ9oCNkOAAAA; expires=Wed, 24-Nov-2021 08:58:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Oct 2021 08:58:07 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.RecoveryServices/vaults/myvaultxxx/extendedInformation/vaultExtendedInfo')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a3cb6c5db6a7efda7c39cb6767cbf3eaa3d147799b5dd057f9bdfc60e7c12cdb9eecef67dbfbbb0f77b60f1eeced6ddfdfd939b8bfb73bdbcdef67d47a5557abbc6e8bbcf9e8d12ffe282b2faaba68e70b02f0a25ae61ffd92d147c58cfeb8dbac27cdb42e566d512d9bbb0ff7ce1fde9f1d9c6fdf9b7efa8080efed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbd4e56531cbebe6ee17c5b4ae9aeabc1dbfcaa7d5655e5fbfceebcb629a3777796478897f79f7ee5dee8db25e64c0431a7586df5eaf40999b4147007ef44b","fe1f3b708b865a010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '47cc2fb4-0495-4a13-af73-12395a850f8c',
  'x-ms-client-request-id',
  '523ea9ce-ab70-4c1e-b1af-743ee612e64e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  '47cc2fb4-0495-4a13-af73-12395a850f8c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211025T085808Z:47cc2fb4-0495-4a13-af73-12395a850f8c',
  'Date',
  'Mon, 25 Oct 2021 08:58:07 GMT'
]);
