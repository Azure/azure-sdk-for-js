let nock = require('nock');

module.exports.hash = "d140e9bd7158bcf63ab46ce048686b27";

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
  '736867de-5e44-4f7b-abfc-6a69991c1c00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aj_fI5YlIuFOmigaDOs42o8; expires=Thu, 30-Jun-2022 03:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrg_hcR7bMI4Z_xYzJn2UY10_LtNdRq8KicaGGLepV22uLjUnNzJMdsmqguH3VUgepmGoPOfru4sFr11AFB4oHYpiMAdyWzRH9evnLg9jFKQpxof4st3jR20U1V-mH1ozQBQFAHTGrMMGzXdhMwcuFDZE-yCol4qQJEFI-GbI9iN0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:44:51 GMT',
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
  '8156c76f-8917-48cd-8b7c-f3f51a911b00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoYYH2SEfXBPgnifVQqK-f0; expires=Thu, 30-Jun-2022 03:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNZREaX9YAPdpA-me7J7x082ZQhqCnt9JGJtDp0B5gbtqp7_oxbM8yyQxbF3DWnMjEA7FrHQ_plUaSSp3lRIxGoftvKJdkUqu__O_zJKoAHblJyPFmdCNOh1Fq7lnbh6vBJ8dQ-6X1iOefp2Qo5Q2zYL3x39sa_LP3XKIO-1n6m8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:44:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4416b6ac-c001-453f-8cf9-7d7e3d87d370&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8156c76f-8917-48cd-8b7c-f3f51d911b00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ap-dBgBdX7FEixLiGP0OAc8X6p3SAQAAADSGJ9oOAAAA; expires=Thu, 30-Jun-2022 03:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:44:52 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3efe693bb4d5e5fe6f579562fd0385badf04131cd5765b67cf7eedd47a38f96d98270fa28fe657bbdc2978330a9c9db6289c1d0dbf447594d338c863e38cd9a36fdea357d48b8adf2ba2df2e6a347bff82379fb19bd7d46efed7dfae9fd8737207155d56ff3fa75f10334799a9f67ebb20d3e06a01df3c19b22af5f30b8e5ba2c09f47a31c9eb2fcfbfcbdf120abba38fa6ebbace97ad7c040801e0deb70a5f3f7f1101d8b459bba65f3f7a9567b36b8271954f5eafb229009b39da0645be7a4ddf34fc0dbde5cd3f35bc0d03d05bd96c512c5f176dee8f725e356db1bc385d5e1675b55c109ac3dfbcacabf3a2b4af2eb277c562bde80f8b868c49906e3efac9a26ed759f9349f1534c7f9ec257d65b079b55eb6c522ef2235ad16ab759b7f51cde82322b0be496f35d4523e96961779f52abf1032804cca38207f9bbf9e66258de0a347e759d9e4a38ff2925a14537c9c9f2eb3494920cd773a985369226339a9083d1a8fe30540c50863d4c1640b5245f37a55d18b0abaa13f4edfad8a9a39fc0d8dd7343caff3fccbf3f3bc8e7fdd6617d499fc1e484b20ccf4a9e114f98ac4c01b58d1fcdef912f4d1bfe72499f54fda3f173316a78faeb2ab669b046eb63d29d7db7b0feffdfe2c6104b1cdea8b5c995a294213ec7feab13a41b82c1a1a07d1e635f1368de5a3d7ebe934cf678493b037d110ad655cf9bb8209f91a58ab74bb41af27345196c21dfefb41b5cc5fe5b3f5729601291ed02f2172bf5d435da866780dce271552e3f736a3b635f06808657c826fcfb345515ee32ffa639a918c152dfdb9fb4b7ec9f769e6f377edf362f9d6740a058cdf","7ec9ff03b62bee6e96050000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '49437252-b2ba-4fe1-85fa-6b53db28231a',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  '7ad12a33-b182-4b6d-92f3-5bf07bb76396',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034453Z:7ad12a33-b182-4b6d-92f3-5bf07bb76396',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:44:52 GMT'
]);
