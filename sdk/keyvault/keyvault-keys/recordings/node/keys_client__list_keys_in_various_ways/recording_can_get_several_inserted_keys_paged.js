let nock = require('nock');

module.exports.hash = "dbf7501e039ad32bbf1dc72e0258216e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-cangetseveralinsertedkeyspaged--0/create')
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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1317a9cc-9ce9-4c7f-8d36-414ebb788ec2',
  'x-ms-request-id',
  'f42caec4-8662-4a48-9e1b-546321cbd289',
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
  'Wed, 28 Apr 2021 21:34:21 GMT'
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
  '30daf34c-2b73-43fd-8b87-4a2063545401',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6Uw0AAABPyxvYDgAAAA; expires=Fri, 28-May-2021 21:34:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkoimIapsnrpiwY5TFPP8WHDd_ejERpVAXD-muC05CutJR3YR5vjVyhgPb97ccIvE6dguI7feEHzOZwR9gQdsblPw0rp21zxjP_kGDG1FT4PjgYFGLGN44_Y9edXXEoFCGiXiE9amsSO5pv-R_xWLam112X_DqVE6ZB_26NgFFoYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:34:20 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'a40fc326-6347-4632-9f59-417d66382f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6Uw0AAABPyxvYDgAAAA; expires=Fri, 28-May-2021 21:34:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYMCuUJ1_pOH_5B06yGHPnJFEfjyLg7DMVYBTIey7WrvdyzW05s0S57_iIwXR_waSYLjETRpMEUzZmhOJllZS8C4xzGzgwf1cmS4exG_8RyFqLzWC61AHgT71WN0gFHeCN6Z1Jo76nGMWZvrVX7LJ2RrCBcoJeKZmQifvOWACPmMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:34:20 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '20ad238c-0df7-44c7-9c46-7ba85215b501',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6Uw4AAABPyxvYDgAAAA; expires=Fri, 28-May-2021 21:34:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:34:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-cangetseveralinsertedkeyspaged--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--0/89d2366c70f04e749dca172ca342c035","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"3fQAzusQJJY7Ojx49rg5W0pk4UBcbG65pPWjSei9XnT1lwS1Xigo_UiiDMMn-5K8NmIuo5s6KqSfCRN0HvCxgm87h-CE23Wd3c_Pq68SXiy9tB5hYjdeTDMrSW2Ojgv1PbzdcLAvdg-ORKq6pI4UXBnvzBG-Z5m1oji747lmbvrVIM8JiOkzvROHhEyoEhbkiMu7JU3BGQeH11IsOIE0MbQVCHj-TAWVWiZpqqqycXFkLRmbGL2D1hA7YKRKaulQ1764Szi3vhU1SxLlRn24tEpJm395-yDOqfAI-FwuUhQWwbJzFSNq2_d_1FtBPY0SEkj6CJYuU9-tuaYR5wWaRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '1317a9cc-9ce9-4c7f-8d36-414ebb788ec2',
  'x-ms-request-id',
  '0a0b16ec-8b74-4d75-8020-f7c0f80a6b73',
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
  'Wed, 28 Apr 2021 21:34:21 GMT',
  'Content-Length',
  '737'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/listKeyName-cangetseveralinsertedkeyspaged--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--1/fa3cfa87ca954b97a0a756f937e47095","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pggHL7GBuKQun9vhG39Fr71g0A_-hmL4vEbjTQkfBay27SYbtBdob6lmG5dpOTOA3MBF9Hjzp9LOku6SqQu3b5y1nhgoF0XK5h_AGJEOcYMnOEAmyRh-8dhVKHrCeczIWktAovrH-1_o8AJ8yVVGpd9GTw0Mn932U43tIneXcRPzc0UcHJOMMfZ2Mc_5eQ4TTaYVUNxpHGDKRRhgdpJ3BSfrzWJQ86kopZF3qLNo6v97yNODXpHaj03D3SPCNyagMgX9wr8YBAuV2yt8tuR-zQ6YKkwPr2iMdlsy-cPoqdHZWSBfdbxXE1iuunMcq539BEwsk-cidAvJbhD-1SA0EQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '1dd95d00-1ba9-49fe-868a-dbbd6cc080f5',
  'x-ms-request-id',
  '7f476a82-7906-42e3-86c4-a5c28f28120d',
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
  'Wed, 28 Apr 2021 21:34:22 GMT',
  'Content-Length',
  '737'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--0","attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--1","attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
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
  'b59f6154-7f97-4957-88cd-80ff80312639',
  'x-ms-request-id',
  '9e9320d7-d918-48a2-9d03-747ecef1073c',
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
  'Wed, 28 Apr 2021 21:34:22 GMT',
  'Content-Length',
  '537'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/listKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0","deletedDate":1619645662,"scheduledPurgeDate":1620250462,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--0/89d2366c70f04e749dca172ca342c035","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"3fQAzusQJJY7Ojx49rg5W0pk4UBcbG65pPWjSei9XnT1lwS1Xigo_UiiDMMn-5K8NmIuo5s6KqSfCRN0HvCxgm87h-CE23Wd3c_Pq68SXiy9tB5hYjdeTDMrSW2Ojgv1PbzdcLAvdg-ORKq6pI4UXBnvzBG-Z5m1oji747lmbvrVIM8JiOkzvROHhEyoEhbkiMu7JU3BGQeH11IsOIE0MbQVCHj-TAWVWiZpqqqycXFkLRmbGL2D1hA7YKRKaulQ1764Szi3vhU1SxLlRn24tEpJm395-yDOqfAI-FwuUhQWwbJzFSNq2_d_1FtBPY0SEkj6CJYuU9-tuaYR5wWaRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'da6c125f-469c-4730-a613-4db70422eb14',
  'x-ms-request-id',
  'd5632fb0-1d61-412f-8459-71b5f1f07fd3',
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
  'Wed, 28 Apr 2021 21:34:22 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd1f3da80-bd37-48b5-ba52-e86faab07385',
  'x-ms-request-id',
  '347ec254-0153-4968-b42d-5781afdcea72',
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
  'Wed, 28 Apr 2021 21:34:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4f3d1db2-abab-4ed5-9063-131c7c7596a6',
  'x-ms-request-id',
  '2b25aa28-faf4-46aa-a833-bd2b4248f8a8',
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
  'Wed, 28 Apr 2021 21:34:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e7b723ac-0a72-4630-8d22-f0da57f03b8a',
  'x-ms-request-id',
  '29ed2290-0d70-4bd1-b7fc-a951b2fe4846',
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
  'Wed, 28 Apr 2021 21:34:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f7e529c4-bde4-477e-a736-330483f52776',
  'x-ms-request-id',
  'c684eb31-3975-4e58-b44b-811535c766f2',
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
  'Wed, 28 Apr 2021 21:34:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0","deletedDate":1619645662,"scheduledPurgeDate":1620250462,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--0/89d2366c70f04e749dca172ca342c035","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"3fQAzusQJJY7Ojx49rg5W0pk4UBcbG65pPWjSei9XnT1lwS1Xigo_UiiDMMn-5K8NmIuo5s6KqSfCRN0HvCxgm87h-CE23Wd3c_Pq68SXiy9tB5hYjdeTDMrSW2Ojgv1PbzdcLAvdg-ORKq6pI4UXBnvzBG-Z5m1oji747lmbvrVIM8JiOkzvROHhEyoEhbkiMu7JU3BGQeH11IsOIE0MbQVCHj-TAWVWiZpqqqycXFkLRmbGL2D1hA7YKRKaulQ1764Szi3vhU1SxLlRn24tEpJm395-yDOqfAI-FwuUhQWwbJzFSNq2_d_1FtBPY0SEkj6CJYuU9-tuaYR5wWaRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9db96c66-3618-489d-87f2-4748b736cc1e',
  'x-ms-request-id',
  '85e2cbba-f128-4293-b586-ecf744a08c77',
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
  'Wed, 28 Apr 2021 21:34:28 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--0')
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
  '15caca73-f60e-46b7-bee0-dbf58b8a6301',
  'x-ms-request-id',
  'd1df46bb-7c37-4103-beae-db3b56bc5095',
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
  'Wed, 28 Apr 2021 21:34:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1","deletedDate":1619645669,"scheduledPurgeDate":1620250469,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--1/fa3cfa87ca954b97a0a756f937e47095","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pggHL7GBuKQun9vhG39Fr71g0A_-hmL4vEbjTQkfBay27SYbtBdob6lmG5dpOTOA3MBF9Hjzp9LOku6SqQu3b5y1nhgoF0XK5h_AGJEOcYMnOEAmyRh-8dhVKHrCeczIWktAovrH-1_o8AJ8yVVGpd9GTw0Mn932U43tIneXcRPzc0UcHJOMMfZ2Mc_5eQ4TTaYVUNxpHGDKRRhgdpJ3BSfrzWJQ86kopZF3qLNo6v97yNODXpHaj03D3SPCNyagMgX9wr8YBAuV2yt8tuR-zQ6YKkwPr2iMdlsy-cPoqdHZWSBfdbxXE1iuunMcq539BEwsk-cidAvJbhD-1SA0EQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '982e92f5-14c4-4537-9dae-e0e78199fb9d',
  'x-ms-request-id',
  'e2d10a07-a7fd-4bed-8d87-2ae5b4af10b3',
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
  'Wed, 28 Apr 2021 21:34:29 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8e36b418-8334-4bf5-afa9-644c834ab56f',
  'x-ms-request-id',
  'ad3fab49-2992-4aff-b85d-a2e1917c1872',
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
  'Wed, 28 Apr 2021 21:34:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '07e4154c-ddd6-40a7-a89c-59cdc1d9cf90',
  'x-ms-request-id',
  'a6fef8a8-596e-4d7e-a2c7-eaa496e19826',
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
  'Wed, 28 Apr 2021 21:34:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f204b5d1-39f9-46ae-927d-9697c0bd8dfc',
  'x-ms-request-id',
  'a8947af3-78cd-4564-b3e0-be18e747e094',
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
  'Wed, 28 Apr 2021 21:34:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1feb19b5-83fd-4e5d-b85b-5e370879c4c8',
  'x-ms-request-id',
  '84785708-a428-4080-9fac-7a2f055d9df4',
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
  'Wed, 28 Apr 2021 21:34:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '904cdb56-980b-4b61-a9ac-ca1198a9255e',
  'x-ms-request-id',
  'c00c538c-6ea5-4a3e-8beb-662088ddcbd5',
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
  'Wed, 28 Apr 2021 21:34:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: listKeyName-cangetseveralinsertedkeyspaged--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e6191421-3ed2-481a-b662-d00d77d28a7f',
  'x-ms-request-id',
  '3495a2a8-d9ad-49a9-976f-769debdc7396',
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
  'Wed, 28 Apr 2021 21:34:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1","deletedDate":1619645669,"scheduledPurgeDate":1620250469,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/listKeyName-cangetseveralinsertedkeyspaged--1/fa3cfa87ca954b97a0a756f937e47095","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pggHL7GBuKQun9vhG39Fr71g0A_-hmL4vEbjTQkfBay27SYbtBdob6lmG5dpOTOA3MBF9Hjzp9LOku6SqQu3b5y1nhgoF0XK5h_AGJEOcYMnOEAmyRh-8dhVKHrCeczIWktAovrH-1_o8AJ8yVVGpd9GTw0Mn932U43tIneXcRPzc0UcHJOMMfZ2Mc_5eQ4TTaYVUNxpHGDKRRhgdpJ3BSfrzWJQ86kopZF3qLNo6v97yNODXpHaj03D3SPCNyagMgX9wr8YBAuV2yt8tuR-zQ6YKkwPr2iMdlsy-cPoqdHZWSBfdbxXE1iuunMcq539BEwsk-cidAvJbhD-1SA0EQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645661,"updated":1619645661,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'cdb9382a-a6eb-4e99-b0f6-93c4ab09da89',
  'x-ms-request-id',
  '60411f0c-ea6e-4009-bb07-1503857e2a1b',
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
  'Wed, 28 Apr 2021 21:34:40 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/listKeyName-cangetseveralinsertedkeyspaged--1')
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
  '5ba4a9e4-2fe6-4157-9527-9336bf7acbc8',
  'x-ms-request-id',
  '40fb63dd-7780-4352-a78c-a150b26ce699',
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
  'Wed, 28 Apr 2021 21:34:40 GMT'
]);
