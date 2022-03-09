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
    '5cabe536-e953-4b0d-ac70-002561d52501',
    'x-ms-ests-server',
    '2.1.12108.10 - SCUS ProdSlices',
    'Set-Cookie',
    'fpc=AqR2b7P-tWpJpRUMAZjH1DY; expires=Wed, 17-Nov-2021 20:22:00 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlpHRdevRXxOMkkldqWYNxfCiwygK_l9AMT1VKqpsnewgzwQrHkVJAjsVB5q1zJRJPK0titZJ8o4GAJIJCUpQZBLaUTTmEy-EHQ5fUmuLiTsJie1UxsX-9pMH44jx0i8ZMhx7I32P_qQz5SmJILDdihHlKcW7TFzeXmhyeXBC4RQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 20:21:59 GMT',
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
    '97928f70-5761-4fa3-9bd2-a217f1da9200',
    'x-ms-ests-server',
    '2.1.12158.6 - NCUS ProdSlices',
    'Set-Cookie',
    'fpc=AnwViRw6GoRJgunR9PkNFUE; expires=Wed, 17-Nov-2021 20:22:00 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5Pwo2Wyp5qx7_1DbOstV-WExW6Zhmsdp2uNJL4m7GD9CUdgfNMwkcFK94VWbPhq8ng7ioTzpwNHi22Am9NDdnXVN3D4GRNIeAvhXr7Ftri34f-2Hz8vzsJcyPk0096flor3ea-GwW2YIgSGzwaNlRC5RyhBhXbbcD_hbKLX1vXIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 20:21:59 GMT',
    'Content-Length',
    '1753'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4417f104-cff2-4f38-92bb-6bb0cb554f4e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
    'd0c2953f-89af-4397-b681-1844a7308b00',
    'x-ms-ests-server',
    '2.1.12158.6 - NCUS ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=AgMZ833xWHNPk6UXuSlLrh7JVDEwAQAAAGfO_9gOAAAA; expires=Wed, 17-Nov-2021 20:22:00 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Mon, 18 Oct 2021 20:21:59 GMT',
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
    `W/"datetime'2021-10-18T20%3A22%3A00.5097754Z'"`,
    'Location',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='second_TokenCredentialnode')",
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '48325493-c002-0060-095d-c4c49d000000',
    'x-ms-client-request-id',
    'bd7c6406-e40a-484e-9715-05466c3261e8',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Preference-Applied',
    'return-no-content',
    'DataServiceId',
    "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='second_TokenCredentialnode')",
    'Date',
    'Mon, 18 Oct 2021 20:22:00 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .get(`/tableClientTestTokenCredentialnode(PartitionKey='CreateBinary_TokenCredentialnode',RowKey='second_TokenCredentialnode')`)
  .reply(200, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode/@Element", "odata.etag": "W/\"datetime'2021-10-18T20%3A22%3A00.5097754Z'\"", "PartitionKey": "CreateBinary_TokenCredentialnode", "RowKey": "second_TokenCredentialnode", "Timestamp": "2021-10-18T20:22:00.5097754Z", "binary@odata.type": "Edm.Binary", "binary": "QmFy", "binaryMetadata@odata.type": "Edm.Binary", "binaryMetadata": "QmFy" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'ETag',
    `W/"datetime'2021-10-18T20%3A22%3A00.5097754Z'"`,
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '483254a2-c002-0060-185d-c4c49d000000',
    'x-ms-client-request-id',
    '606ae6bf-2f18-43ea-8364-805b52c505de',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Access-Control-Expose-Headers',
    'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
    'Access-Control-Allow-Origin',
    '*',
    'Date',
    'Mon, 18 Oct 2021 20:22:00 GMT'
  ]);
