let nock = require('nock');

module.exports.hash = "65cc82d96f05ba1e9b1cd10656750bd7";

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
    '0e004fe4-400b-4779-9b28-aa6b05df6501',
    'x-ms-ests-server',
    '2.1.12108.11 - EUS ProdSlices',
    'Set-Cookie',
    'fpc=ArwFvKPxSsBMmNSHW9NnmSA; expires=Wed, 17-Nov-2021 19:42:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq7XqCLCSz24LxDGqHuAKPboKKFb6I4T8336ANXnchKGHyZgTuQdn4UxonlgBbub6v1MaIZGo_r3uXbHTELd_Z8Ka5hNBLLlu7Uj_OuX7r461H3qVy9RQdOkLUZj22casPRYEpUzMJPWXtBldwlrHbN5xll_YAY-m9RmETRxzAtEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 19:42:38 GMT',
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
    '37cb551b-4d63-4b53-87e9-8b9f9f628000',
    'x-ms-ests-server',
    '2.1.12158.6 - NCUS ProdSlices',
    'Set-Cookie',
    'fpc=AvB2tYOJh_BAu7cGkG_KBcA; expires=Wed, 17-Nov-2021 19:42:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrng28AB149NKPDlU3UQ-iiXQNmW7Yx5tbk2pzeUwC1dTwUKEepmte8n1_8liK01FkXJqEoSdc7wxcHH0K7lxfLL-IOnzv7UuyC9CGzkNyNcvK3-iQG2CGkOIRpiSkyCoN-2OkuwKP-gfk-k1IZdwM3bnFGRfJIeVaJtwYyuoIRiQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 19:42:38 GMT',
    'Content-Length',
    '1753'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d5f70274-165d-4572-8dad-9e805501a56c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
    '5aa96ab2-0a65-488b-a4db-ae8e890d9100',
    'x-ms-ests-server',
    '2.1.12158.6 - SCUS ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=AiFpeoGwlAVNm421HTupP6HJVDEwAQAAAC_F_9gOAAAA; expires=Wed, 17-Nov-2021 19:42:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 19:42:38 GMT',
    'Content-Length',
    '1318'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/tableClientTestTokenCredentialnode', { "PartitionKey": "CreateBinary_TokenCredentialnode", "RowKey": "first_TokenCredentialnode", "binary": "QmFy", "binary@odata.type": "Edm.Binary", "binaryMetadata": "QmFy", "binaryMetadata@odata.type": "Edm.Binary" })
  .reply(204, "", [
    'Cache-Control',
    'no-cache',
    'Content-Length',
    '0',
    'ETag',
    `W/"datetime'2021-10-18T19%3A42%3A39.3285723Z'"`,
    'Location',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='first_TokenCredentialnode')",
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    'edc5c38f-a002-00b7-3258-c48eba000000',
    'x-ms-client-request-id',
    '77fa962d-3034-49ca-8de4-967b0edd70fa',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Preference-Applied',
    'return-no-content',
    'DataServiceId',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='first_TokenCredentialnode')",
    'Date',
    'Mon, 18 Oct 2021 19:42:38 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .get(`/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='first_TokenCredentialnode')`)
  .reply(200, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode/@Element", "odata.etag": "W/\"datetime'2021-10-18T19%3A42%3A39.3285723Z'\"", "PartitionKey": "CreateBinary_TokenCredentialnode", "RowKey": "first_TokenCredentialnode", "Timestamp": "2021-10-18T19:42:39.3285723Z", "binary@odata.type": "Edm.Binary", "binary": "QmFy", "binaryMetadata@odata.type": "Edm.Binary", "binaryMetadata": "QmFy" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'ETag',
    `W/"datetime'2021-10-18T19%3A42%3A39.3285723Z'"`,
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    'edc5c39d-a002-00b7-3c58-c48eba000000',
    'x-ms-client-request-id',
    '98dcd8a1-6fe6-48ee-a400-16327de4059b',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Access-Control-Expose-Headers',
    'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
    'Access-Control-Allow-Origin',
    '*',
    'Date',
    'Mon, 18 Oct 2021 19:42:38 GMT'
  ]);
