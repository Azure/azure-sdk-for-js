let nock = require('nock');

module.exports.hash = "80cf87fdd21f28e690711cf1fa09c675";

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
    '14dad806-e0ac-4aac-985d-e30ffc400f00',
    'x-ms-ests-server',
    '2.1.12158.6 - WUS2 ProdSlices',
    'Set-Cookie',
    'fpc=AtUgqtKLv1lOoklkcaSf3DU; expires=Wed, 17-Nov-2021 19:42:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_dT4_U5ZpAoDNI60e30Z8fI3f3HvzjnGBU2uYSNsIKbc4Vhxp3nkz4BeoVmuCCcju3C0mg3kMEdnO8vOiaxSgf3rsvx-3xvu95hq49S7aB7_gsi19oMsnYQaNNHLpwlMrru3xFt9L6DgvNk4b8Ntr4La7ArI6Tw9JnD7JzsyU3YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
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
    '2d6ed66b-e832-4b01-aa09-1323888c9300',
    'x-ms-ests-server',
    '2.1.12158.6 - SCUS ProdSlices',
    'Set-Cookie',
    'fpc=AvFGD6EDySlKi7Sjkivyfq8; expires=Wed, 17-Nov-2021 19:42:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzJn9nbzC01uLsWrcv6pUXWQFJJk6f-Mtdm_ZV1Wwnbn_rojafObKhZg5wFJJEMSoGs54wMAOdVCTkHVQGTgZlUrvffvxWBy5cUakKpQZKhQvMODeueJA-39gbvNPCnOJa5P2MA46nvriHGUwMACObZ9UOr_rLUQAIWcVJsiSfdEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
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
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d5579b80-79a6-42e6-bdf1-22f09448f880&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
    '31421e8d-4d72-46db-85aa-ac2a64c78800',
    'x-ms-ests-server',
    '2.1.12158.6 - NCUS ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=AhD2DWMGQrVPrf4a2SZyhs7JVDEwAQAAAC7F_9gOAAAA; expires=Wed, 17-Nov-2021 19:42:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 19:42:39 GMT',
    'Content-Length',
    '1318'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/tableClientTestTokenCredentialnode', { "PartitionKey": "CreateBinary_TokenCredentialnode", "RowKey": "second_TokenCredentialnode", "binary": "QmFy", "binary@odata.type": "Edm.Binary", "binaryMetadata": "QmFy", "binaryMetadata@odata.type": "Edm.Binary" })
  .reply(204, "", [
    'Cache-Control',
    'no-cache',
    'Content-Length',
    '0',
    'ETag',
    `W/"datetime'2021-10-18T19%3A42%3A39.6327867Z'"`,
    'Location',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='second_TokenCredentialnode')",
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    'edc5c3f7-a002-00b7-1158-c48eba000000',
    'x-ms-client-request-id',
    'e9efb5bb-cb68-4e00-bf59-a02e29c5c8d9',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Preference-Applied',
    'return-no-content',
    'DataServiceId',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='second_TokenCredentialnode')",
    'Date',
    'Mon, 18 Oct 2021 19:42:38 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .get(`/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='second_TokenCredentialnode')`)
  .reply(200, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode/@Element", "odata.etag": "W/\"datetime'2021-10-18T19%3A42%3A39.6327867Z'\"", "PartitionKey": "CreateBinary_TokenCredentialnode", "RowKey": "second_TokenCredentialnode", "Timestamp": "2021-10-18T19:42:39.6327867Z", "binary@odata.type": "Edm.Binary", "binary": "QmFy", "binaryMetadata@odata.type": "Edm.Binary", "binaryMetadata": "QmFy" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'ETag',
    `W/"datetime'2021-10-18T19%3A42%3A39.6327867Z'"`,
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    'edc5c419-a002-00b7-3258-c48eba000000',
    'x-ms-client-request-id',
    'e7b5c47d-3bec-4ed3-a158-cbc53306497f',
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
