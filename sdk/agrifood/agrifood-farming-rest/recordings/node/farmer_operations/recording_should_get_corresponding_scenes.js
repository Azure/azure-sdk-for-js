let nock = require('nock');

module.exports.hash = "f0e11d320707c455675fb6bd684f2906";

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
  '1c877618-ed88-4ad8-99bd-e2926590a101',
  'x-ms-ests-server',
  '2.1.12171.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArZetRJ8zSJNm6zm16cr35A; expires=Sat, 04-Dec-2021 17:00:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPwyNspqEmSeX23cbj_XQOWVhElKF-LA9McCtaIci0ZCVp4gjldIU_qxqf031m-gFtLIj_lN251mCPRLsS209PM_o2jwG0XOlBYPwNieWb4YzOIiarIOl5rdDEq6YVNqsJjuWyh15PhBdjemAkl1SP5hf95ufjYvypDcTDB0FUQwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:26 GMT',
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
  'faa15175-e4c4-4d53-a3b9-4aaec4dc7600',
  'x-ms-ests-server',
  '2.1.12171.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsYaxHcYrJlGk-9-mJxCmVs; expires=Sat, 04-Dec-2021 17:00:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjGmWvi5zLdO59J38bcFmcIXeK7oZtt5FPBIPRk5aXuIl6tk-8PqJAhpjnzzogWBEiw5zz0zmaORJ63NfyCDDlf4b1b-_ZXhaeCvdfLRAok09fL5hq_RoeMRAiKITOKl2HyJVftdKygrz39l2SM-Pn7O5hsXdli_BDZt10kRtjiogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=948253be-2141-43e3-b2cb-1b2fd6decee0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a43996a2-e647-427b-a509-f2d8b82c2100',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsId2mIQyw1LsGQgZm-o_tA; expires=Sat, 04-Dec-2021 17:00:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:27 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes')
  .query(true)
  .reply(200, ["1f8b0800000000000403e4974d6ac3301085ef6268575122c9f96b209436a5ab180ac9aa5d04c51ec76a6cc948b243137af78ebd6828f6051a8116d2bc91f4be418bd125a8455e41b0f8b8043606052fc2c15616180938e594504ef8c396d2453bde8341501a5dcb040c66443236daead461d8eacac4cdb60d282715e43bbe5bf3275464210ef02a73b0ed3529ced6521d313573aeb48bd1c82647e2c0e2b60339c595256c980a53ec41383b14e7cac050811bb506ed28d127956b91b4473e8a52921a8c955a2dd1312334242123a5815ac2e9beb9ed4db86cf9ebf58ea77f2d62c059c768a87402b8f8ccf6ba5289305fd7d8b5169840b12ccdc0699c173b46874ea608aa445bb7d53ac28501abf3caa1ad608119f47b70096e0a3d114e14c21e3bfc8d10a1e043116c9c77f837abb50fe87bca3be8cf94fb811ef6a0877ea08f7bd0c77ea04f7ad0277ea04f7bd0a77ea0cf7ad0677ea0cf7bd0e75ea0cf45177dde74b337dfd7ed19eba233e6077a4f4bc3bc68699acfd2199474590142751e4023bfb77284f23f7c0b3f000000ffff","ecd8cd0a82401405e077699d300d8ee652824068d1c26d8b51c7904cc112a2a7ef8cda0fde0cdab4b96d5cccd58173391bbfafffec6c627d2d8eed878d84fd9ccb4a4e6dd55744577bfccd939260de7724ece61c5a82c84349a67732b484cf524a5d906e6cc288431f10fdad8920fe1489ecee425637477d868ac5d11aab4acbbacd5635686b6b006bd5198866250994349f01a70edbe262cad75937b9d35594e1262259b8d7c29a69baf153bd705ed80ff2240b840c522730beeb28cf4d1d95cba5e30ba9f4527962912478d7c47a8fb7e18342e5da5298f530af43313c3c91c985f4137b3cb3ee35298bee5f161fb2e8f295c551749eb2385a0227591c45e7248b243a1f5924d1f9c82289ce471649743eb248a2f3914512fdd7b278030000ffff","ecdab10d80300c44d1895c048203d32048ecfd47a0a239d35120741ee19f523de7bb8b31a613c922a613c96248e79145484f597c18845d166192944599e224298b380a932cc27bf8b92cce6d3974b88a5a3769554ddcbdc9aaee5646aff53490457b218b25ff2cfa2d8b65a395454ca794451c814816319d4816633a8d2cc6f4ba5f000000ffff","ecdbb10d80300c44d1892c19881cd2b20990b0ff084005f2a5a3012e237c974f673fd29ef4979b454ca791454ca791454ca791454ca7914548e7914548e791454ca791459f4e2f8bb58390cba23f499345a99ca4c9a23f0a912c56d2bfbc59ccd142b6a4126ded45479dc5b6b28ac5b274073986349c8f4af7cd627e228b6db378c9a233ea177f43ef000000ffff","ecdbb10d00200cc4c08928d87f397a9b9202c919c1dfe5a4bc7e04df486fca224628c922d24bb2a8f48e2c2abd238b4aefc8a2d23bb2a8f48e2c2abd238b4c0fc922d343b2a8f48e2c227d64f132485d1631c9c8e2e211fcf137f4010000ffff","ecdc4b0a80300c45d1151592c64fba9c6271ff4bb04e44f2106705792ee1063a39241df7455c1c0a932c8627f2f19dc57e0cbd7b514b932e9a5aee87d09a674b9b98792beeb69e7f7edd65b13eca627dbd86967f67f19245e1dd598ce994b2188740248b319d4816319d4616319d4616319d4616319d4616319d4616319d4616219d4716219d4716317db82c1e000000ffff","ecddbb0d80300c84e1892c99007218270fd87f0442053aa7a340e832c27fe5272bf9eac1784ca797c5de20e4b288930c5994ce24e36611472192c54efa9f6f169762a1a4ad4aae9644d7d08cf1d02c71dea3a5a93dc3a8d787224f592c6f6471dc2cdeb208464d74b3a890ce298b3002932c423a932cba741e5974e93cb2e8d27964d1a5f3c8a24b6fb278020000ffff","42bba3cdc96058dee0825ec327198c9c9145f4581f41238be85e1f41238b185e1f39238b685e1f1d59c41220237d64112d4846471675d1abc8d1358bc02b7ed10365248d2ca2659121be6631c5c2d03cd922d55237c9c8d45237d12235493725cdd8423719b4493ad9d0d4d4c81c74811ff2c86212a191c5d85a00000000ffff","0300432371a4277a0000"], [
  'Date',
  'Thu, 04 Nov 2021 17:00:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HMCT63I1PJNI:00000002',
  'api-supported-versions',
  '2021-03-31-preview, 2021-07-31-preview',
  'x-ms-throttle-information',
  '35',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
