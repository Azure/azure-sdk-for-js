let nock = require('nock');

module.exports.hash = "34b07546f4ad9c1cb6f47c313b3261e5";

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
  '79d11a11-0869-477b-a93a-cb74ae531d00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuDyaR7MXVZOprEReygKX-k; expires=Wed, 24-Nov-2021 08:58:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJLtTyjU-uaLInyXdD_4nwRHlmLa2W4Edd2YZ5g3k5lzPJsgLCRMvZbJ1I-sUenh_KMMfsk2v0tRYhZ55ie3CRAITvio5LF8Vyf39o4HIgV0K6t00naig_zIS1mZlMGTIM1gNUrlbT4voVVhzqZ4NwNBTr6yQnCIWIV9l1x3VlHsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Oct 2021 08:58:04 GMT',
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
  '25a4d68e-a0c1-4646-b99a-9169104a1700',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApVBozUYQ8tLjMdfs96IAo8; expires=Wed, 24-Nov-2021 08:58:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2EkDwVX28ZWWl-SG3XMLEWSCPLkkstKKDuIpBOuoRVm6-XZT8jwuz2JhiIlyL1lOiz5gMzaIoTm59Cs8RuH2EDrI15FZEgKC7waBW8QWlPQiBVhuBvhBb2ME-50exKsWehixH5-NHJzWE4XRElpQYMuA7sLAturzR2OmN2exflkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Oct 2021 08:58:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f9a61923-2922-4510-9406-bec163421e25&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '79d11a11-0869-477b-a93a-cb74b0531d00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlMawx9ZK5lIofZoJ6kQlkoWPr5BAQAAAJxoCNkOAAAA; expires=Wed, 24-Nov-2021 08:58:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Oct 2021 08:58:04 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.RecoveryServices/vaults')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc51594db3b6a8961f3dfa28cf9a76dd7c34fa68992de8cb8f16d797d9ba6cdfbd7b479fe56d76419f7df7eeeffbd12c6bf3b658e41fefedeced6eefee6cefdd7fb373f0bbdf3bbe8f7f7676c7f70f1edc3ff8f4de4f7dfcfb7e446f16b37cd916edf5478f7ef1476dbecc96edd98c203dd83b7f78703039df3ef8f47c777b7f373bdf7eb89b4db6f7660fa6b39dddddd964ff01bdbdaa8be5b4586525bf94dddfdddb9d1c50abe92cdfde7f38fd743bdbfdf47cfbd3fbb3bd07d3dd87d9dec13d7aa9bd5e6100afaf9b365f1c374d71b1cc671ffd1240ab5679dd1679036ce8afcba2a1c117cb8bd72d8d0aefaca7d33c9f5173b42e2ee9d3d3e56c5515cb969b3cabea27d9f4ed7a456d5f54cb7cb8d9eba2cd5fe5d3ea32af69ecd2985028308ebbcd7ad24ceb6205d237771f122deecf0eceb7ef4d3f7d40b4d8db275a4c1f6c1f4ccf77881a93f3bdfdddbb75de54eb7a9a7f5e57eb55737771fdd334baa6bdcba398e57573f78b625a574d75de8e4dbfaff3fab298e6cd5d9e49bcc4bfc8942a956e7c8b9a366fd7209832068d7039cb6aa2e82ff9fe","2ff97f00137166904d020000"], [
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
  '29630b50-3ec5-4bbd-9abb-9042f460603d',
  'x-ms-client-request-id',
  '2c4a9c0d-5e1b-4ce1-a218-24a2d8acb8a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '29630b50-3ec5-4bbd-9abb-9042f460603d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211025T085805Z:29630b50-3ec5-4bbd-9abb-9042f460603d',
  'Date',
  'Mon, 25 Oct 2021 08:58:04 GMT'
]);
