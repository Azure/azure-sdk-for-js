let nock = require('nock');

module.exports.hash = "1aa68a918ecb32fa9fcc4e9eda4f3f45";

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
    '20c21895-1a18-42b2-be76-531df0c3af00',
    'x-ms-ests-server',
    '2.1.12171.15 - SCUS ProdSlices',
    'Set-Cookie',
    'fpc=AmZBqsVKBthPr-757buCe8w; expires=Thu, 09-Dec-2021 01:43:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhocsyTyFJScIZLOIqPKuBf7JsFVNra-G96omn-Rb6hj925yYf3AiTslMdNTm5qNQAdOrL679kxYZ5e_snt2VnsG_t0cKtU2R4QuG8XZpyKmJJOAt-UQ7BBGYjMGLUQlf3otBmva6FWpn3k4I6ukWxa5nzD7mRJUq9ntis_uzh3cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Tue, 09 Nov 2021 01:43:39 GMT',
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
    'c32f5b8f-7521-4c8d-b841-264c9c7bb900',
    'x-ms-ests-server',
    '2.1.12197.4 - WUS2 ProdSlices',
    'Set-Cookie',
    'fpc=Al0W8jksIadPthDu5FBbpV4; expires=Thu, 09-Dec-2021 01:43:39 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrN9dL7rvuFw4RUzKoutDgz-bP-WrV2bNMqBK0z93ipEivFrR5J8tBNsn9QISd9it44ADKWZvyAFO6RJn1h9DUmgIiGPNKhhM5zEmVldhLHYDeib-DikONq6BJ1LwUHWortfS_7F-YUOhLsg3NcHbUKnRlgG2He_j1N5NWXKhqY2UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Tue, 09 Nov 2021 01:43:39 GMT',
    'Content-Length',
    '1753'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7b31bf47-4740-4685-8dfb-f9c296401b2a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
    'ccb20cb1-6f40-4498-b2d4-32c2b15daa00',
    'x-ms-ests-server',
    '2.1.12197.4 - NCUS ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=Arj2C0gLlYRNiwBHQA7LHVfJVDEwAQAAAEzJG9kOAAAA; expires=Thu, 09-Dec-2021 01:43:40 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT',
    'Content-Length',
    '1318'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/Tables', { "TableName": "batchTableTestTokenCredentialnode" })
  .reply(201, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#Tables/@Element", "TableName": "batchTableTestTokenCredentialnode" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'Location',
    "https://fakeaccount.table.core.windows.net/Tables('batchTableTestTokenCredentialnode')",
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '58e1c467-9002-0133-240b-d59ec7000000',
    'x-ms-client-request-id',
    '79dfdd1e-2687-4647-a7c4-5a28e5c3095a',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"\",\"RowKey\":\"\",\"value\":\"\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_a92b7076-8702-4318-8507-6cd580f1edb5\r\nContent-Type: multipart/mixed; boundary=changesetresponse_42c060d3-5863-4fc2-9eb2-e265212f80a3\r\n\r\n--changesetresponse_42c060d3-5863-4fc2-9eb2-e265212f80a3\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='',RowKey='')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='',RowKey='')\r\nETag: W/\"datetime'2021-11-09T01%3A43%3A40.499321Z'\"\r\n\r\n\r\n--changesetresponse_42c060d3-5863-4fc2-9eb2-e265212f80a3--\r\n--batchresponse_a92b7076-8702-4318-8507-6cd580f1edb5--\r\n", [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'multipart/mixed; boundary=batchresponse_a92b7076-8702-4318-8507-6cd580f1edb5',
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '58e1c4b5-9002-0133-6a0b-d59ec7000000',
    'x-ms-client-request-id',
    '089038f7-870b-451b-a68d-d4fc835bff2f',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPATCH https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='',RowKey='') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n\r\n{\"PartitionKey\":\"\",\"RowKey\":\"\",\"value\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_ffee660c-e56a-4107-af4d-51fda22d7f6f\r\nContent-Type: multipart/mixed; boundary=changesetresponse_0fe141bf-2f97-49aa-873f-d3967464c348\r\n\r\n--changesetresponse_0fe141bf-2f97-49aa-873f-d3967464c348\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-11-09T01%3A43%3A40.5435185Z'\"\r\n\r\n\r\n--changesetresponse_0fe141bf-2f97-49aa-873f-d3967464c348--\r\n--batchresponse_ffee660c-e56a-4107-af4d-51fda22d7f6f--\r\n", [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'multipart/mixed; boundary=batchresponse_ffee660c-e56a-4107-af4d-51fda22d7f6f',
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '58e1c4ce-9002-0133-020b-d59ec7000000',
    'x-ms-client-request-id',
    'b0b37b1d-9977-4c4a-aa37-7f1e09814da7',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .get(`/batchTableTestTokenCredentialnode(PartitionKey='',RowKey='')`)
  .reply(200, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#batchTableTestTokenCredentialnode/@Element", "odata.etag": "W/\"datetime'2021-11-09T01%3A43%3A40.5435185Z'\"", "PartitionKey": "", "RowKey": "", "Timestamp": "2021-11-09T01:43:40.5435185Z", "value": "updated" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'ETag',
    `W/"datetime'2021-11-09T01%3A43%3A40.5435185Z'"`,
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '58e1c4e5-9002-0133-180b-d59ec7000000',
    'x-ms-client-request-id',
    'a0fcf1ea-de3b-4803-883f-24cfb97c819f',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Access-Control-Expose-Headers',
    'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
    'Access-Control-Allow-Origin',
    '*',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPATCH https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='',RowKey='') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"\",\"RowKey\":\"\",\"value\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_f995a456-1a59-4cab-9c47-6a5354bc13a6\r\nContent-Type: multipart/mixed; boundary=changesetresponse_dda9eb47-5e12-4080-9cd9-9a94a329bd74\r\n\r\n--changesetresponse_dda9eb47-5e12-4080-9cd9-9a94a329bd74\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-11-09T01%3A43%3A40.6264728Z'\"\r\n\r\n\r\n--changesetresponse_dda9eb47-5e12-4080-9cd9-9a94a329bd74--\r\n--batchresponse_f995a456-1a59-4cab-9c47-6a5354bc13a6--\r\n", [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'multipart/mixed; boundary=batchresponse_f995a456-1a59-4cab-9c47-6a5354bc13a6',
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '58e1c4fd-9002-0133-300b-d59ec7000000',
    'x-ms-client-request-id',
    '4fb9ccaa-1bad-4fb8-affb-8d4f90b9ef32',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT'
  ]);

nock('https://fakeaccount.table.core.windows.net:443', { "encodedQueryParams": true })
  .get(`/batchTableTestTokenCredentialnode(PartitionKey='',RowKey='')`)
  .reply(200, { "odata.metadata": "https://fakeaccount.table.core.windows.net/$metadata#batchTableTestTokenCredentialnode/@Element", "odata.etag": "W/\"datetime'2021-11-09T01%3A43%3A40.6264728Z'\"", "PartitionKey": "", "RowKey": "", "Timestamp": "2021-11-09T01:43:40.6264728Z", "value": "upserted" }, [
    'Cache-Control',
    'no-cache',
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
    'ETag',
    `W/"datetime'2021-11-09T01%3A43%3A40.6264728Z'"`,
    'Server',
    'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
    'x-ms-request-id',
    '58e1c512-9002-0133-450b-d59ec7000000',
    'x-ms-client-request-id',
    '36d3268c-8da8-44e9-beb4-86c971075abc',
    'x-ms-version',
    '2019-02-02',
    'X-Content-Type-Options',
    'nosniff',
    'Access-Control-Expose-Headers',
    'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
    'Access-Control-Allow-Origin',
    '*',
    'Date',
    'Tue, 09 Nov 2021 01:43:40 GMT'
  ]);
