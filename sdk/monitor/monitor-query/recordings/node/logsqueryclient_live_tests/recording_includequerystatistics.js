let nock = require('nock');

module.exports.hash = "e1fbb8bf640bc71422d415d0d29fd399";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'ec10535d-9a4a-4dae-93db-feb5a94f8500',
  'x-ms-ests-server',
  '2.1.12071.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiX_gI_uMdVMgGiC-tk86J4; expires=Fri, 29-Oct-2021 01:09:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrnk6llSA3Leo3QEDap4PqP1FJda-keC4Yw4hsv5VvxeNtfwq87kaziAPfRkW7_Z4WPBDyRhdECcCS2IPd99wycdKsbnPgT5J05jugwaHWy7N4cw29MKzgNU1sD6zJP6jy8ksAf4EX8Hi-_y0o453Gj3D0atsDDMkb6vwLWqY9ljUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:46 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'df60bb9e-6748-4698-804a-9f3507389f00',
  'x-ms-ests-server',
  '2.1.12071.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnCtjGAsMIdEhTtUJvAEb7U; expires=Fri, 29-Oct-2021 01:09:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7qdB7TejqyaxD2MrTIuq26eFr_-Kyl-VLsGj507rqnldeeo2V4IrtB6xJYBQcrAX1-hFFtfk2X3VYuXjhJ8IDr5ohJD5blzgTj4YEVLh2rUIcriUvbsb4SCT4fk5RrXtBhu3Ce2Zki9OYmOWhE_K9I4c3aDGg9dBKFH2J_ZEctkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=cfc28819-d0b8-474b-beeb-a55a1ab0f9b3&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b87587ba-2ba3-4d1b-bf63-68f31f64d400',
  'x-ms-ests-server',
  '2.1.12071.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhC-QpJxidhHgQ6dKhypk23KBMGnAQAAANqz5dgOAAAA; expires=Fri, 29-Oct-2021 01:09:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:46 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/workspaces/workspace-id/query', {"query":"AppEvents | limit 1","timespan":"P1D"})
  .reply(200, ["1f8b0800000000000003","95555f6fda3010ff2e7e669519ab0879eb40aaa28a8208f461139a4c72028bc4ce6ca72343f9ee3b3ba1a16a15331489b3ef77ffef7c6762d82e034dc29f6722580e24244bc573a6aa15e832336440129995b97807598360c24429724d55d81b6d14177b520f3a0ccfe111042866e00a98e2d120eb1afa6cff7a542d952c40198e7e767a2a64f2e41a3607a64b053908d30f5c14d62b2e85cff01bb03fd42553e04b475c0973c0c89358962ae9b51a83d65e9b1b0dca8f7828d1a840abb60837c0934496be481e8ae20594f5d0835ac90c7c196e6191d08689feb44c338ea1ac2ddb8b9acb14323f6c11fb31d1d28f997253f951b1c12a2c1476f32bbf29d6a92d86aa166a057b4fba1b81ef4afec132f60171ac5d033e6ea2591f2e7a82de90e2d9d30d5d1019c85d141d88e3e15a8ff326ae34227b9f134fdd7f5d02fbac79b7036233834fd8d6d2d86b866b9c0abc3993df25a8ca127082a4b4d36e9f2e12d23b3a0e86c1f01b0ab7ba379aedc14213961c1c91432e1be903c75727a4039273ada1218d342c43aa1e9094ebe30d307d602a756e1da469f1bbca4027d39d146078f00a979bdabdd5e9ff4bedaa827590daea294aaba6b4cd14124a43f7ddd1c9687c4f2926f8084ae084753cd28631b5921f25506797aa02d87109ea19879484c3aff74140a933cb45519a19334c839b96ae487032ee5947f2922d4c56c284c0e57245cfb9985d368c75830ebfb86fdd79d4fc7e904e869d6e95a92f8df4b91b2ddb48050ed372564e2418d1d11bf8856525e898ff4593e3c924c014bcabbe6d4adc776e81e2f2b266daabb88084b30c25d3b658e9c784e1aa768b1d2d37e3e7daccde342669bdadebfa1f6d28542bfe070000"], [
  'Date',
  'Wed, 29 Sep 2021 01:09:47 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-5cb6f',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Expose-Headers',
  'Retry-After,Age,WWW-Authenticate,x-resource-identities,x-ms-status-location',
  'Vary',
  'Accept-Encoding',
  'Content-Encoding',
  'gzip'
]);
