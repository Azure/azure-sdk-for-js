let nock = require('nock');

module.exports.hash = "647987d0718c0c0b2d59c0dc032dd00d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrecoveradeletedkey-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2aba9ac3-0cf2-4f4c-b5a0-eafb97fda191',
  'x-ms-request-id',
  '4b618312-4ef8-4b54-872d-e6a54ca5150c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '1efc2592-3d3d-4623-b99f-81317d4d7a01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxEAAAC_wRvYDgAAAA; expires=Fri, 28-May-2021 20:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLXp_dpa4EgDGuwWDiNgu2ac2-MiI07KoJG3B0zsc-CSC6uhZ0Rq6Ke7VXMwu7VvYA-j20aBf1pfECacpFxFAvhnsLYdTey6SSzQXAbiQ6ZDEs1qdvFfHRQOGAgNdWXM_Cja3C3JsrJ3ekloSdpe0oFixZDBrMtbal0Sd5keXNs8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:57:17 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '876efea4-2cbe-4fef-a2b5-ed01f7c79a00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxEAAAC_wRvYDgAAAA; expires=Fri, 28-May-2021 20:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7-I4y4Hd10dUWWqifVPLlXA39gRFqhnTJD3cMLMS-HJxxOawOqz2SWjB3j9f1ADZHZrdeRQmuzyfY5NNTN4Uc8gnT917w2cGumtq0UhmZuzw6juu3AaUDveFKdGoqLNQMVNgK-K348FKeKH75Mh79qQRl_cPp_Jn1uuepYM83BMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:57:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '203b35d4-9021-435d-aca9-12283fc03a01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw0AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:57:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:57:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrecoveradeletedkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2aba9ac3-0cf2-4f4c-b5a0-eafb97fda191',
  'x-ms-request-id',
  'fa402daa-76ad-4532-a416-daa3b1a80655',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:18 GMT',
  'Content-Length',
  '735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1619643438,"scheduledPurgeDate":1620248238,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b61eb97a-7bef-496d-922d-03fd700813d5',
  'x-ms-request-id',
  '35529384-12da-4a30-b924-dc90ede9188d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:18 GMT',
  'Content-Length',
  '915'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c6fdaff4-05c7-4193-93d6-56b79a40ae10',
  'x-ms-request-id',
  'e1d9bd1f-fc46-44af-9cb5-4ee5012be4cc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '00b7d369-0454-48d9-9675-9c752a8fab33',
  'x-ms-request-id',
  '08ef6222-df88-4c2a-a3d9-f12e0a47c724',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '95dc3b31-a58b-4a76-bed5-e6a3e24b1d91',
  'x-ms-request-id',
  '19ebc037-0f81-489b-a594-bbe5f2579f26',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7363477a-11e0-4ea8-ad2a-46dd8d390058',
  'x-ms-request-id',
  'ee187b0c-f32c-4a51-991d-a2dcc5da6c8e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0f0e7754-1077-4073-a83f-96de4b4443cd',
  'x-ms-request-id',
  '2d7e1aff-b901-481e-90e8-bb4bd0828148',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd3b86c28-9f77-44e3-ad07-aab86310ab65',
  'x-ms-request-id',
  '967cbcb5-0dcf-40f2-9d89-c1d29553d745',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1619643438,"scheduledPurgeDate":1620248238,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '76717745-dfaf-446d-990f-3d46430da54e',
  'x-ms-request-id',
  'f9c8752d-b817-4ab4-9248-6488a2403dd3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:29 GMT',
  'Content-Length',
  '915'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2afbc67d-57dd-4826-9dd3-49b8155103f5',
  'x-ms-request-id',
  '2d7f43da-0b45-48f1-ae37-798d7a1020c7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-/recover')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2ac5a1b0-e1d2-4a50-981a-da4f20e10193',
  'x-ms-request-id',
  '38ca7cf5-4c96-4f7f-88d8-44c5bb612b06',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:29 GMT',
  'Content-Length',
  '735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4561e3e3-da46-464e-8368-f61933a93ab7',
  'x-ms-request-id',
  '79f450c4-3ca4-4b88-8e1f-ef79c27cb32e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '73637195-c6b7-456f-acbd-7b8c63ab6454',
  'x-ms-request-id',
  'db2177ee-faad-4b86-96ba-84e3c0496778',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3b84c9b0-58fb-4936-b759-ea404309f522',
  'x-ms-request-id',
  '23d4e578-19fb-45a9-9878-330c147fd948',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'aeaf69f6-b09a-46a4-8b06-99e516c46c6c',
  'x-ms-request-id',
  '82cb953a-6450-4181-8242-da0d20c78ed1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ba9867ad-85be-47b0-8c19-d45710e66fc2',
  'x-ms-request-id',
  '10f589a0-9b25-431e-a51d-0ce479b67644',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3ab3609a-94f5-472e-8037-b9bab62db246',
  'x-ms-request-id',
  '3f10d77a-a8e2-4c40-9709-e6762c72464a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '91652a87-30b0-4411-9f57-8f47aa281442',
  'x-ms-request-id',
  '2f002775-7b96-4f03-af9c-62f435fc3732',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7279382b-07ae-4ec4-a29f-b23f047c3a6a',
  'x-ms-request-id',
  '3993a60a-1485-41c2-bde5-c0fb27f78ac0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '68cd59ef-46a0-42ce-9128-60f76e6eaaea',
  'x-ms-request-id',
  '2baf0916-9520-4e29-a59a-6c067a0f76d7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:44 GMT',
  'Content-Length',
  '735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ea9e93b7-d746-4350-a83d-ea4c27fc3b41',
  'x-ms-request-id',
  '10c31fa8-4334-4153-a68f-1f4477d7be8e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:44 GMT',
  'Content-Length',
  '735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1619643465,"scheduledPurgeDate":1620248265,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ab738dba-431b-4698-a725-1c92e9717a4d',
  'x-ms-request-id',
  'b2984182-0090-4ff9-a011-2d0356493abd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:45 GMT',
  'Content-Length',
  '915'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1876e003-c6c4-48a6-8ea9-820882db98d4',
  'x-ms-request-id',
  'b5892243-1205-48a6-87cf-779ca72a96d4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '04d01199-171f-4e23-99c4-48ae1d21ca3f',
  'x-ms-request-id',
  'b6d89786-8836-431a-a572-c1cb4ef64a68',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7dd55981-24b9-45c5-8310-56718729fdb0',
  'x-ms-request-id',
  'a038c1d8-0d17-464f-b589-c9e098f8485c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6d02e011-4aca-4fad-a5af-1e417a8e7fa9',
  'x-ms-request-id',
  '315cb006-dbd5-4091-b224-54cc271041c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2e547173-f289-4d85-a104-31926368d658',
  'x-ms-request-id',
  'd04591f0-ac95-4223-b621-0a771945d377',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1619643465,"scheduledPurgeDate":1620248265,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/d11441c155d94df8af07ef4f72d067da","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"owJD2epiPUwI2un_pkSmSYaeQOWea_2VisAWQeCnCSDO9jDGlpUKRUSxvsJDOGCqyuCWOfWJ1LvTBkZ_sE140JBT2bWoWnPPwOD7Kcm34wPIK4hswOjCE0X5jS0pOCeGl2ZWQ7YPF1Qn0-Th6j3aTpOp-kI6DILLgdaOMaEbzB8kEGwEMS-Txliw0uiITFaOH8srxHl5_i3veVnttbmIobz-Kl5y9_ojUdhnrzuHzs3Qfopt-DwpcN321IfT5tLNvXRBKzebJUxnZwrMt_UpMzEisJYSYQ0-40DQYkJuMOnC28UeSZqD3Ut7Ew6S9bfvHMMugZ2lCXWoq-SU8QadOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643438,"updated":1619643438,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1373e5f9-10c8-4bd6-9e60-7ccaf40e9b35',
  'x-ms-request-id',
  '4542d3aa-2c77-49d1-a13b-2b60181be9ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:53 GMT',
  'Content-Length',
  '915'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0621af25-3492-4307-b55d-764bf3c090ac',
  'x-ms-request-id',
  '99f77cf0-5bd4-4539-b68c-ee1961d46022',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:57:54 GMT'
]);
