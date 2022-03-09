let nock = require('nock');

module.exports.hash = "bc232e4b36253a7a7c22fa8a40d13ad3";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, { "tenant_discovery_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration", "api-version": "1.1", "metadata": [{ "preferred_network": "login.microsoftonline.com", "preferred_cache": "login.windows.net", "aliases": ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com", "sts.windows.net"] }, { "preferred_network": "login.partner.microsoftonline.cn", "preferred_cache": "login.partner.microsoftonline.cn", "aliases": ["login.partner.microsoftonline.cn", "login.chinacloudapi.cn"] }, { "preferred_network": "login.microsoftonline.de", "preferred_cache": "login.microsoftonline.de", "aliases": ["login.microsoftonline.de"] }, { "preferred_network": "login.microsoftonline.us", "preferred_cache": "login.microsoftonline.us", "aliases": ["login.microsoftonline.us", "login.usgovcloudapi.net"] }, { "preferred_network": "login-us.microsoftonline.com", "preferred_cache": "login-us.microsoftonline.com", "aliases": ["login-us.microsoftonline.com"] }] }, [
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
    'e41712a8-4716-44fe-b9d0-40fd139bc400',
    'x-ms-ests-server',
    '2.1.12171.15 - EUS ProdSlices',
    'Set-Cookie',
    'fpc=AnztuPKK-sdPs9DTjkxIl2I; expires=Thu, 09-Dec-2021 00:41:24 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_bMEB0YssoNv07xZL3R_YGp9mCVHxusH85pDr2xJ08BdOcIPqwj2CKy2AZrzE7ZwgxRFfilDwkwEYgAxWfJlzYJ4ZOp9NhPN02zCDhyXEOJcH618uuAJdUSMJ60XmGnCUaYyyC6XKbI7wkJLIMRwr-N2rU77qRoyR-DJNR6TqdwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Tue, 09 Nov 2021 00:41:24 GMT',
    'Content-Length',
    '980'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, { "token_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token", "token_endpoint_auth_methods_supported": ["client_secret_post", "private_key_jwt", "client_secret_basic"], "jwks_uri": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys", "response_modes_supported": ["query", "fragment", "form_post"], "subject_types_supported": ["pairwise"], "id_token_signing_alg_values_supported": ["RS256"], "response_types_supported": ["code", "id_token", "code id_token", "id_token token"], "scopes_supported": ["openid", "profile", "email", "offline_access"], "issuer": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0", "request_uri_parameter_supported": false, "userinfo_endpoint": "https://graph.microsoft.com/oidc/userinfo", "authorization_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize", "device_authorization_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode", "http_logout_supported": true, "frontchannel_logout_supported": true, "end_session_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout", "claims_supported": ["sub", "iss", "cloud_instance_name", "cloud_instance_host_name", "cloud_graph_host_name", "msgraph_host", "aud", "exp", "iat", "auth_time", "acr", "nonce", "preferred_username", "name", "tid", "ver", "at_hash", "c_hash", "email"], "kerberos_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos", "tenant_region_scope": "WW", "cloud_instance_name": "microsoftonline.com", "cloud_graph_host_name": "graph.windows.net", "msgraph_host": "graph.microsoft.com", "rbac_url": "https://pas.windows.net" }, [
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
    '3698112b-cd73-416e-af8a-3f15d67cdc00',
    'x-ms-ests-server',
    '2.1.12197.4 - EUS ProdSlices',
    'Set-Cookie',
    'fpc=Ahp8tip9AYNEmGR70MYJ17E; expires=Thu, 09-Dec-2021 00:41:24 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxiGD0RRhwqM2ELhZk67naYXyYQnyNpPC_opJq66b5Mo0ULjXMF_OaHUlvRwcZQdsueJ8bymVyOg_yNG0HgV-c9CV4icFJzj1eg31iFYlKAKNX9eUPVRXsy6ctdQgsCFH3mLiTBJu-sb5z8rubBNgSmh5HRtEH-QD9fBNBMeHt8cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Tue, 09 Nov 2021 00:41:24 GMT',
    'Content-Length',
    '1753'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c708fe9e-d415-4645-8a69-9bc37be6c0cc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, { "token_type": "Bearer", "expires_in": 86399, "ext_expires_in": 86399, "access_token": "access_token" }, [
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
    '0989961c-71ed-479a-8c98-50978930b000',
    'x-ms-ests-server',
    '2.1.12197.4 - WUS2 ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=AjXbfY_FdpFMgyxjyYlLbPvJVDEwAQAAALS6G9kOAAAA; expires=Thu, 09-Dec-2021 00:41:25 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Tue, 09 Nov 2021 00:41:24 GMT',
    'Content-Length',
    '1318'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/tableClientTestTokenCredentialnode', { "PartitionKey": "", "RowKey": "", "testField": "testEntity" })
  .reply(204, "", [
    'Cache-Control',
    'no-cache',
    'Content-Length',
    '0',
    'ETag',
    `W/"datetime'2021-11-09T00%3A41%3A25.1447408Z'"`,
    'Location',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='',RowKey='')",
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '729741ca-f002-0086-0b02-d5d56d000000',
    'x-ms-client-request-id',
    '3d6c9ed4-67d3-414e-94dc-db9979f48e5f',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Preference-Applied',
    'return-no-content',
    'DataServiceId',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='',RowKey='')",
    'Date',
    'Tue, 09 Nov 2021 00:41:24 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .get(`/tableClientTestTokenCredentialnode(PartitionKey='',RowKey='')`)
  .reply(200, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode/@Element", "odata.etag": "W/\"datetime'2021-11-09T00%3A41%3A25.1447408Z'\"", "PartitionKey": "", "RowKey": "", "Timestamp": "2021-11-09T00:41:25.1447408Z", "testField": "testEntity" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'ETag',
    `W/"datetime'2021-11-09T00%3A41%3A25.1447408Z'"`,
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '729741de-f002-0086-1d02-d5d56d000000',
    'x-ms-client-request-id',
    '11715219-5690-4d0d-bbcc-126538462a4b',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Access-Control-Expose-Headers',
    'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
    'Access-Control-Allow-Origin',
    '*',
    'Date',
    'Tue, 09 Nov 2021 00:41:24 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .delete(`/tableClientTestTokenCredentialnode(PartitionKey='',RowKey='')`)
  .reply(204, "", [
    'Cache-Control',
    'no-cache',
    'Content-Length',
    '0',
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '729741ee-f002-0086-2c02-d5d56d000000',
    'x-ms-client-request-id',
    '8fd7941c-4d26-489a-a9a0-6d75cf42cb66',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Date',
    'Tue, 09 Nov 2021 00:41:24 GMT'
  ]);
