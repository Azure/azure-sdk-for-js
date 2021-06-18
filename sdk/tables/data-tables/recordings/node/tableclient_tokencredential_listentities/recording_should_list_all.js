let nock = require('nock');

module.exports.hash = "322d467b8d45b1d35853c220ed663b12";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '97fc07a9-3c4d-4149-a572-b7ab7f81ab00',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Av09VhbPodtGnWEz0tYa-K8; expires=Sun, 18-Jul-2021 21:43:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrX5ISFtIhfYxWF0nutDKQkxqSrs1Kj5uoAJz0gxQfOyW6g3V-5uGw3NrQoqL4VvU2Zbzep8ox8PQVDhxt-H0ZPAhNHnaGLtXms77Sta1233UMS-w42Y2wBjsRXFeW9q5l_73VAXawH8nGCaQaed-wzrTnofXjdlPDCrmp8JMXQQ8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 21:43:36 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '7ea7871f-3513-4b8b-a8f5-e68c8a08b700',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Av09VhbPodtGnWEz0tYa-K8; expires=Sun, 18-Jul-2021 21:43:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxgV5xrcySvm-ywq3eIC7KI3ZnZVpFKhU8aGd6esCQ9r0kVghE7Fh5DZzN0vu9SmcRZ_i3IUpkmoWdvBNK2HEEpBlUfpJWvyhDHHDA8Im6Fj3OorbElht7KrWxkNTg_71MQWO7URXm_iemVaTHiQR3TjyOZo5-SNijt1-jSyfoV0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 21:43:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "client_id=95e39df0-df0c-4fdf-8e7c-e79f87b6f3a0&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=4de3e17e-506b-4387-8b2d-1a71ddfe7640&client_secret=qL6Crtfv-K~B5.8fb.6~.ybnfgJYf29G01")
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
  'c08daf02-0ea6-4d27-851f-e07477670000',
  'x-ms-ests-server',
  '2.1.11829.8 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Av09VhbPodtGnWEz0tYa-K_JVDEwAQAAAIgKX9gOAAAA; expires=Sun, 18-Jul-2021 21:43:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 21:43:36 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.758567Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-06-18T21:43:35.758567Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.7955935Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-06-18T21:43:35.7955935Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.1748605Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-06-18T21:43:36.1748605Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.2108858Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-06-18T21:43:36.2108858Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.2719288Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-06-18T21:43:36.2719288Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.3099556Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-06-18T21:43:36.3099556Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.3479823Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-06-18T21:43:36.3479823Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.4150295Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-06-18T21:43:36.4150295Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.452056Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-06-18T21:43:36.452056Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.4900823Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-06-18T21:43:36.4900823Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.5321119Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-06-18T21:43:36.5321119Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.5701387Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-06-18T21:43:36.5701387Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.8396245Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-06-18T21:43:35.8396245Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.8836551Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-06-18T21:43:35.8836551Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.9206812Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-06-18T21:43:35.9206812Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.9597086Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-06-18T21:43:35.9597086Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.9997372Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-06-18T21:43:35.9997372Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.0477706Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-06-18T21:43:36.0477706Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.0908009Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-06-18T21:43:36.0908009Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A36.1298292Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-06-18T21:43:36.1298292Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-18T21%3A43%3A35.7155372Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-06-18T21:43:35.7155372Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2fd8d88-3002-0090-7c8a-6414f3000000',
  'x-ms-client-request-id',
  '9ed646c1-5ce3-452a-80f9-84d3ef36caea',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 18 Jun 2021 21:43:36 GMT'
]);
