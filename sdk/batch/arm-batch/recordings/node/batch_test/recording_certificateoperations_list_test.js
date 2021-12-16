let nock = require('nock');

module.exports.hash = "a177cac3c8e72d1b80e7e593dfef054c";

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
  '0b42958c-c19f-4177-9106-df50116d1c01',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjpYMb3f1q9Jhpj8Pa9bgJE; expires=Sun, 19-Dec-2021 07:07:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrA1s0kMSdnVPjPGjC4KWdzEaVmj_y-mKGhX1HDfMh6Dnb-lCMTk75W6V1cjl5mQofjug5nj7gzcFz4nVy3vpgKK2nFwGwg0YuTFT_KPXP16XtMdClvD51yr4JHlwSW4m9BLHhkeL5LmgMXcWdrAyvPgqX-pAC9CE72nDlsPkx_jYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:33 GMT',
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
  '3144b304-c4ce-4f00-bf92-0eb725123c00',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtPHiZc-saNLmDc6WLyMKmQ; expires=Sun, 19-Dec-2021 07:07:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4nFx6XWALRuQkDmJWzbpVuJS8H_2vz_8Z30ZTICwLyObFGJ8MVKvabZIBmYkfPrylxVc1Crv7xxXSseMkkL4WyPeD58_WIpwiOFLkVhtDS0dopl3EwUtW5_uabsS3kfoXt8gRNdmD8tsaRbdavx6fLsIEu5UcDsVqxpR08fO1hQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1f5d5c2c-7a6f-484f-8445-5069102e3f4a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f4ed96f2-9537-472a-b9ab-348f57504500',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtzGotA7rQ1BgiZCMWqJlhQWPr5BAQAAADZEKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:33 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificates')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1325bd02f1f35f36c777b7a7ebe974d3ebd373d983ebc7f3fcbce1fec3e3c78989f679feeef4e1eee7c7afffec1ece1f9e4c147a38f8a19bd74b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cddd2f8a695d35d5793b7e92b5d3f9dd09fe3d9e4eabf5b2c50b99fcfaeeddbbbbd3bc6e8bf3629a1188bbef3b84f67a85916feeceef81dec9dbec82def9eedddff7a39d77074f1f1e3fd97bb2bf776f6feffef1f1effb1135a061acf00ab57ef48b3f6ae7ebc5645517cbf6b8bca8eaa29d2fe86d204a4ddd97f4d97be04d5d5c160d51bc585ebc6e09317afdf57a3acdf3593e8b7dffa6ce964d81397a53f064efedeced6eefd2ff1ebed979f088fe77efde786ff7dea70fefddff2902705ed58b0c48bd3c7f477faed693b2983ecdda8c3efae2ecec49fd839393e39fdcbb38be3a7b727c71f613dffea9cfdbbdb73bcf4f9e3ffbbd7e9fdfe7e4d9bbf23bcbb76f8ebff3e4e2abfae9c51727dffe89af8ebf78f2fbbc7bf6f4f8f5938b173ff9e4f88b3727bbdfb99cdcfb898b9ff8eeac9c2c5edcffe2c9feeffdf4cde9de174f4fafbe78737cef8ba7c7575f3cabf0d97ee7b3abd39f3efd892f8ef73f3fdefdeaf4f8dd17df9e2c1ebefda9dffbc5dbec07274f963f387ef1e4e2ed2f9abf2d3e7f78b5f3e4f8274e9f1d1f7ff9e4a77fe2f8eae2f7797b72f1fb9c1eaf7feffddffb8bef5ebf3a98fec4ab93e383dd373ffded2ff3fac597cfbe5c51c3bd2f0f7efa74f65397bfe8ea55f9d5ef73f145999ffe3e7b5f962f679f2cb3f2dd55f9130f3ff94593176f5f7c7efed3cbf9d91717c577ee9f7c51fede17b3575f3cbb77fae9d3e517cbb7ede2dbcf3e7ff87ce727173ff1e9f38bf6c164fe7bbf3a382bda57dfce7f9ff2f2fafef3ef94579f3e9f96f9fddf2b6bf67e7affcdfcf7f9e9e73f31f9e9275f3c7dfd7b3fddfff6e54fbdc8f7bffa7d4ebf3a39be3a3d3ece5e3cffe2f4edd5ababdfe7e94fbeda79f2e4f4f8ea6545235bffc4779effc4ef33fbf65707c73ffdddd3f9bd273ff5f6f7f9f4f4f7b989d617f3e3cf5fec5d1dffa28b276f8bf9b75fae5fbcfe45bff7d3df7be78be3b79f3f79dd7c49f33a7bf213c74f7fe2279edc9ffdf4cb7ce7f34fa7f77eeae0e9fad5a7a73f31399b3ff9e2cdf264e707bfcfcb7971f18b3e79b7fbfcf3837b0f3edd3dab0f5e16afaf3ff9b47a7775f2ed2fb3dfe7a7ae2fe7f977775e3eb95eb62777bffbeceaab6275be7c70f0d12ff925dfff25","ff0fa510cccd84040000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-request-id',
  '305bc426-f8dd-4f3c-b490-b67d407972ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '8a261698-333e-4acf-a032-9195ab76813c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070734Z:8a261698-333e-4acf-a032-9195ab76813c',
  'Date',
  'Fri, 19 Nov 2021 07:07:34 GMT'
]);
