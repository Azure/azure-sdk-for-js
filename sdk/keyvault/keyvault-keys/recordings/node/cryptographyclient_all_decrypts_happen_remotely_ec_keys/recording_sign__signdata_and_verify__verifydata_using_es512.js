let nock = require('nock');

module.exports.hash = "911230e858263a0086ce3c1d50fc429c";

module.exports.testInfo = {"uniqueName":{"EC":"EC162542153241309297"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542153241309297/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '753648c4-2aa2-42ad-aeab-34807e2b49a6',
  'x-ms-request-id',
  '63e4f894-5871-4bed-8f48-2962e38accae',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:52 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'b0cd2e93-6c09-4d3e-a2b5-f19a9d684e01',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAwAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbrbF10E-TbAXI-1BRYGRbnjVX57PmYOLhDUuVmiy_BOljelf1KZcZUpWpC6icRoOVrz0wxAl-TFmeQ4KP0KASo5SnLXUOANp3IeCxVT_t433piivd_shYevUIi0ytzBs6sOl6pqhCGvD3UV50_KhOtYvLNoHsbFQEDWs1zhm6yEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:58:52 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'ae650fba-7c79-46e9-81aa-7ec8f24f5202',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDAwAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwFVY5QMoxBwAF2Tbjjo30NS0FuTDqkr4wGCxwFvo5wehR_I0bao1Va3JUwQ_7bGKqqk8zp2kLwJf200IXe7VmRRTmoN8hQsroflumNaLcyyXcOQfNyNkDtrpPlBOwIz7FQxtW7s3K--j7k6_-8heXpmE-3wuzHvc2lx7HnsYBHggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=de1e53ca-ac89-4ee6-aa23-59b23cf19ab9&client_secret=azure_client_secret")
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
  'eab54377-ea4c-4e0d-a5d6-ad795703df01',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjVrzuzuZ8RJklET2I9vRLL1qjVDBAAAABztc9gOAAAA; expires=Tue, 03-Aug-2021 17:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542153241309297/create', {"kty":"EC","attributes":{},"crv":"P-521"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e","kty":"EC","key_ops":["sign","verify"],"crv":"P-521","x":"AFMEDOzfoN0h7ILfnJ6dTtHnups4y6gAIcaT6dWLJeqtQWPF65xpM5AMpoVnLeRhP2vdyPiAF6FTvfz84AFMxJkB","y":"AXec-_EKc0dEeDzcjn3FZFiiwscO8a4XnK1ZDcM4kMjUy-MaaNT6vDvCentH95nRZr-Nl-XhqR8wk3rIZSxM-6KO"},"attributes":{"enabled":true,"created":1625421533,"updated":1625421533,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '753648c4-2aa2-42ad-aeab-34807e2b49a6',
  'x-ms-request-id',
  '748f36a9-6593-4c97-93dd-4a01b537d7e8',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '486'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'efab0b67-61e1-4a38-b472-0172c057fa27',
  'x-ms-request-id',
  '7abb00d8-0558-4251-9679-6926e8f6d677',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e","kty":"EC","key_ops":["sign","verify"],"crv":"P-521","x":"AFMEDOzfoN0h7ILfnJ6dTtHnups4y6gAIcaT6dWLJeqtQWPF65xpM5AMpoVnLeRhP2vdyPiAF6FTvfz84AFMxJkB","y":"AXec-_EKc0dEeDzcjn3FZFiiwscO8a4XnK1ZDcM4kMjUy-MaaNT6vDvCentH95nRZr-Nl-XhqR8wk3rIZSxM-6KO"},"attributes":{"enabled":true,"created":1625421533,"updated":1625421533,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'efab0b67-61e1-4a38-b472-0172c057fa27',
  'x-ms-request-id',
  '87f45a21-66d3-4815-beeb-e215f980cccf',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '486'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e/sign', {"alg":"ES512","value":"B4beYodf2cUPnIqnRwb0UQezfuMQ9HlbsgoS_yn_WednQ0Cgwu2m10ocv3iHM06zxtKXTSkZrDtW1IzMzBJ-qQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e","value":"AFCNUhbxrmIcnHSGwQWsoG_ZCNUyW1BWQjgIpN44cT5rn3-c5vULCQMpDfAAiv_2eYd0dO_sJHYa_wvTn8DkqI2vARNbynJ5JtbqkplQUs2z9VsbLULluTyeRIHdVFNOZF_srlHgZBDn2yOppW5Yab1lzRtXb6lc_yxeQYQLex2CfrRj"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '4731f520-1d63-4714-b6ef-303f2faeed49',
  'x-ms-request-id',
  '139b7cd0-b348-46ec-a601-f463a00f7f20',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '289'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e/verify', {"alg":"ES512","digest":"B4beYodf2cUPnIqnRwb0UQezfuMQ9HlbsgoS_yn_WednQ0Cgwu2m10ocv3iHM06zxtKXTSkZrDtW1IzMzBJ-qQ","value":"AFCNUhbxrmIcnHSGwQWsoG_ZCNUyW1BWQjgIpN44cT5rn3-c5vULCQMpDfAAiv_2eYd0dO_sJHYa_wvTn8DkqI2vARNbynJ5JtbqkplQUs2z9VsbLULluTyeRIHdVFNOZF_srlHgZBDn2yOppW5Yab1lzRtXb6lc_yxeQYQLex2CfrRj"})
  .query(true)
  .reply(200, {"value":true}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '55e3a135-58f3-4534-b250-fdaaec7ae9b2',
  'x-ms-request-id',
  'da6add86-5313-4609-a142-b4bd440c10b6',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e/sign', {"alg":"ES512","value":"B4beYodf2cUPnIqnRwb0UQezfuMQ9HlbsgoS_yn_WednQ0Cgwu2m10ocv3iHM06zxtKXTSkZrDtW1IzMzBJ-qQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e","value":"APA3RVMD-vMFLiaIEOyopiEtHE3EsdxWZY933mCsOrVxC6LOALWozJCdur-ilYRDojIu9RfHZ1pK-tiM2coIsJqBAFZ-T1it7W7kNxLLfuQkWy9vJgFHGQ5zcyAPZ_Ka-UXB16QWJ0K7glYxZxzK6NnvHuPgqKB1vZSwpXhmnGrbZ6eN"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f3a2c360-4ffb-4001-9a2e-3ee643da1a59',
  'x-ms-request-id',
  '46f2123f-aeae-4774-9e9d-3c69517c1434',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '289'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e/verify', {"alg":"ES512","digest":"B4beYodf2cUPnIqnRwb0UQezfuMQ9HlbsgoS_yn_WednQ0Cgwu2m10ocv3iHM06zxtKXTSkZrDtW1IzMzBJ-qQ","value":"APA3RVMD-vMFLiaIEOyopiEtHE3EsdxWZY933mCsOrVxC6LOALWozJCdur-ilYRDojIu9RfHZ1pK-tiM2coIsJqBAFZ-T1it7W7kNxLLfuQkWy9vJgFHGQ5zcyAPZ_Ka-UXB16QWJ0K7glYxZxzK6NnvHuPgqKB1vZSwpXhmnGrbZ6eN"})
  .query(true)
  .reply(200, {"value":true}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'f3c9c93b-15c0-4cf8-8bd4-fe8b77d07bf4',
  'x-ms-request-id',
  '1b523181-18ce-4185-93d3-dcc3c17b86f2',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/EC162542153241309297')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/EC162542153241309297","deletedDate":1625421533,"scheduledPurgeDate":1633197533,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e","kty":"EC","key_ops":["sign","verify"],"crv":"P-521","x":"AFMEDOzfoN0h7ILfnJ6dTtHnups4y6gAIcaT6dWLJeqtQWPF65xpM5AMpoVnLeRhP2vdyPiAF6FTvfz84AFMxJkB","y":"AXec-_EKc0dEeDzcjn3FZFiiwscO8a4XnK1ZDcM4kMjUy-MaaNT6vDvCentH95nRZr-Nl-XhqR8wk3rIZSxM-6KO"},"attributes":{"enabled":true,"created":1625421533,"updated":1625421533,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9638fab3-8c8f-4401-bf26-a71f5a257071',
  'x-ms-request-id',
  'dd5559c2-a40c-4717-81a2-6b8c25b5fd59',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT',
  'Content-Length',
  '625'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'd054a244-cd68-49ec-aae0-dd84e43681f3',
  'x-ms-request-id',
  '4fbc9ba9-2d57-4cda-807b-39bc872b4e0c',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '701140b1-fcb9-4d5f-80d3-21898c156775',
  'x-ms-request-id',
  '58860e7a-4522-4e78-b8bc-7232ad0165a4',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '8983c689-cb52-4035-9540-fb4df283c3a1',
  'x-ms-request-id',
  '82ffd4c7-a2b4-428b-b6b3-d4249e488c3f',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '6a044448-9b10-4758-8219-981cf9bf0f7a',
  'x-ms-request-id',
  'ce91870e-2117-4dad-a401-f8f94af29c8b',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '07f40b39-9270-45ab-8706-b44eef2850a9',
  'x-ms-request-id',
  '94987fd7-49b2-4909-9bdd-f704aaddeee4',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:58:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '3b4543d9-3201-4a07-8fc9-003dbeae6b5d',
  'x-ms-request-id',
  '8416168d-4d41-41e5-b3bc-da16ce7baa53',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'c208ff41-4efc-49c7-a77f-32262b3a77c3',
  'x-ms-request-id',
  'bd89eae3-0f6b-4ece-b5ae-a553a61c293a',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '433ff7cc-e3eb-4139-976f-f22dceb1fee3',
  'x-ms-request-id',
  'e9fe3e79-16d4-4302-b536-c20dc82fcd0e',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'ce6d7a58-f9fb-4ada-acf6-6de2251ec744',
  'x-ms-request-id',
  'f06cd3f3-a3d2-4fae-a116-e1c3981a0162',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'a2cfaea4-a07f-429d-ac79-1cd4d9479138',
  'x-ms-request-id',
  '8340f552-ca64-480c-8c01-9bdf13f4cb67',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'fdeb227c-ce7a-48e5-b04c-da470838c14f',
  'x-ms-request-id',
  'dee5419b-8b70-4caf-bd4f-f16d7c499ea0',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '0186944c-07c3-4b01-98b9-01c37191b0ab',
  'x-ms-request-id',
  '66fca09e-5594-46cb-bd19-bf2c77b9d1e9',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'bca6c343-42ea-4b64-8800-334a4280a05a',
  'x-ms-request-id',
  '89de8ca9-590c-4dda-88ae-a31d3429c583',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'adf37069-08b2-43f4-8db8-2ccf9dad1878',
  'x-ms-request-id',
  '4206ed93-4669-4edd-862d-98d4634c0c00',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '1c5195ec-dd69-4201-9cbc-338a27d174b1',
  'x-ms-request-id',
  'fc165e45-a9af-4ca0-8d60-790a6592c31d',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '8300649c-95f3-4fde-b9a5-e7c0b99333be',
  'x-ms-request-id',
  '463c93d4-0a37-4530-8857-cf6b5dcbb1ba',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '5e393458-9334-4a53-8b59-19dabd49e2ee',
  'x-ms-request-id',
  'd9bf8f3a-4ea9-493e-a34c-f1d24bf05205',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'a3c510e8-82a3-4a81-8d15-6b1f34d0334b',
  'x-ms-request-id',
  'de60387e-d7b9-4746-a94b-2d072233a337',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '77078270-96bd-43cf-abb9-5f77889d2523',
  'x-ms-request-id',
  '28612d9b-4d99-44b3-853c-e3c7d27b5a69',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '7616069e-37c6-4019-9cbb-795a8f7a0ce0',
  'x-ms-request-id',
  'e2b74728-2f6b-49b7-8966-8115876dcb52',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '100df9bf-0715-4ba0-b203-2459d42ff882',
  'x-ms-request-id',
  'f681df87-1d88-43f5-a9fd-3e50c65707c4',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '034908fb-64d9-4a23-ab7f-1d1f97897525',
  'x-ms-request-id',
  'd3814345-be5c-4015-bbe5-7a1234208dae',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '0e4811f1-ed8c-430e-89a7-fb09099766ca',
  'x-ms-request-id',
  'bc5d43e6-7b8a-4a8b-aa93-d28905beaeef',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'ff7f806e-ba74-474b-9f1b-69768a656b91',
  'x-ms-request-id',
  '5675b65a-5640-4bfe-80c1-dbd0cbc39bf2',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '098eec7a-ce86-458b-8fac-cff4ba08a5db',
  'x-ms-request-id',
  '4b17974d-c62b-4762-b3d2-d9ec0e164c2e',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '0f6602f7-5936-4cc7-a380-15ce2f2eae32',
  'x-ms-request-id',
  '4374db7d-4d28-424f-bbb0-324e3c7b6276',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'acb80771-bd26-4e09-a787-39f622529206',
  'x-ms-request-id',
  '154b45ed-efbb-41e7-acc2-3b4026122fcc',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '3a5f76bc-f98d-4e32-8ed2-25567a33c688',
  'x-ms-request-id',
  'aaac5c6c-c82e-422f-91f8-a4904081a9dd',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '9a6b3479-273d-4a67-baa3-3cf411fe923c',
  'x-ms-request-id',
  '4189cb1d-bf8b-460e-9af2-43226269e607',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '4f631a2a-4322-49c1-b743-c22caaaa033c',
  'x-ms-request-id',
  '6008cf1f-420b-460b-8d72-7ab17d107926',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: EC162542153241309297"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '88',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '05ca1e80-3a30-422b-8f43-7c0cb5c40938',
  'x-ms-request-id',
  '81bd0969-736f-4ee5-a279-ef8785c6252e',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/EC162542153241309297","deletedDate":1625421533,"scheduledPurgeDate":1633197533,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/EC162542153241309297/ae1df616cb14466a8d38d368c2ee885e","kty":"EC","key_ops":["sign","verify"],"crv":"P-521","x":"AFMEDOzfoN0h7ILfnJ6dTtHnups4y6gAIcaT6dWLJeqtQWPF65xpM5AMpoVnLeRhP2vdyPiAF6FTvfz84AFMxJkB","y":"AXec-_EKc0dEeDzcjn3FZFiiwscO8a4XnK1ZDcM4kMjUy-MaaNT6vDvCentH95nRZr-Nl-XhqR8wk3rIZSxM-6KO"},"attributes":{"enabled":true,"created":1625421533,"updated":1625421533,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  'b434c21f-66c3-4cfe-b449-3fcb4e9bba52',
  'x-ms-request-id',
  '0d9da766-d3ad-45e4-a086-7bfe4ccef342',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:54 GMT',
  'Content-Length',
  '625'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/EC162542153241309297')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-client-request-id',
  '5b5bf76b-4be4-44e3-8752-4c7c72ad13c3',
  'x-ms-request-id',
  'de599c25-0abd-4a4f-947e-9b2598e0502e',
  'x-ms-keyvault-service-version',
  '1.9.12.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 04 Jul 2021 17:59:54 GMT'
]);
