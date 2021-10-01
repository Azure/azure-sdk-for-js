let nock = require('nock');

module.exports.hash = "ba43551d9e76cf88d114b3ef81134b9b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .delete('/acr/v1/library%2Fbusybox')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/busybox","Action":"delete"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '211',
  'Connection',
  'keep-alive',
  'Access-Control-Expose-Headers',
  'Docker-Content-Digest',
  'Access-Control-Expose-Headers',
  'WWW-Authenticate',
  'Access-Control-Expose-Headers',
  'Link',
  'Access-Control-Expose-Headers',
  'X-Ms-Correlation-Request-Id',
  'Docker-Distribution-Api-Version',
  'registry/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Www-Authenticate',
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/busybox:delete"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '6185e8e4-8e01-45e8-94da-b853bc27afe2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '3b06bc5f-d348-4c35-a7d1-b41102829a00',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlzdW5BmMAVGoUHF3MZMP_M; expires=Wed, 20-Oct-2021 18:54:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEwAgNGEeS37vTK7DEBa2ktIs1JYB53Ml8cXrTfE4C9xHgxJr_k087seu1GwpECcAshNaFFtRR-CeIyQqbtb2aJZlNnejc3BGAuTyRCeTDEr9XZ9y0EIduX_JRWPHbPy0aHglKSW78NGlt4kasrxT6ro-f9gBfCH7yOAkHp5Hv_MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:26 GMT'
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
  'a8477190-69d6-4500-b10a-edf9e538a800',
  'x-ms-ests-server',
  '2.1.12071.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ah2a3HAsSIFFgy7EGUgGtcs; expires=Wed, 20-Oct-2021 18:54:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbJFVy2Y0dt9BkCBTfs_-k8lO3PwXusBNzXDwkSiE6IpLC1d948xv0094EMwZW_JKJ3yI67haYk_50F-W8wSv6US1vV2AElb3sQso7It3idgA7Sm-2Wgl4Khmrwgz06aFj_Yh8oXqvDr4fnFSNHy2J25p8woh1zKBXPOyPD4W6lMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=454ba46c-11dd-4e00-a566-0e1e9032c89b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'ad5c7372-4d10-4042-b615-46b719ecb200',
  'x-ms-ests-server',
  '2.1.12071.7 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtySsEJguFdLj02iXA5S4vhGOXJzAQAAAOLP2tgOAAAA; expires=Wed, 20-Oct-2021 18:54:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:26 GMT',
  'Content-Length',
  '1351'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  'd2f18ec7-ddb4-4f0e-91d0-9ed34ad25c59',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.533333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fbusybox%3Adelete")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  'e10f6d39-7e83-48b9-bc51-8ea7ca0d9802',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.516667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .delete('/acr/v1/library%2Fbusybox')
  .query(true)
  .reply(202, {"manifestsDeleted":["sha256:149ff441a10b7e05b3c60da0916f98405e9bb551923fefd930079d1a55c01ce0","sha256:52f73a0a43a16cf37cd0720c90887ce972fe60ee06a687ee71fb93a7ca601df7","sha256:75c155e143b2cd2c2cfc3574b944cb2bff5a989f038d70769b5f4c430e4a1822","sha256:7698c9fb8475863d79c9f76ebd48341448ece7865a0066e7d9d39adda53c1a35","sha256:829b46ecdbdda76abbfe33b8a66332a02aa1593acc434541b4069ce5927bb811","sha256:96a17b68467be2bbf8df538d24cf8615c9790ed5d1a5f895e78bb2ae95405105","sha256:a78428bd5e3428ea3f71f14eb5c2e3a38316098eb99430b3e49f49a63994bb0d","sha256:c71cb4f7e8ececaffb34037c2637dc86820e4185100e18b4d02d613a9bd772af","sha256:e2992f6a4bd258e6c3ad3c4449ba42010ef114ff643afbb27dc5f8a98f590b13","sha256:ed88784ce1c8a3aac3745f5a6edadf2e8f901e86a524e66221178f280013109c","sha256:febcf61cd6e1ac9628f6ac14fa40836d16f3c6ddef3b303ff0321606e55ddd0b"],"tagsDeleted":["latest"]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '862',
  'Connection',
  'keep-alive',
  'Access-Control-Expose-Headers',
  'Docker-Content-Digest',
  'Access-Control-Expose-Headers',
  'WWW-Authenticate',
  'Access-Control-Expose-Headers',
  'Link',
  'Access-Control-Expose-Headers',
  'X-Ms-Correlation-Request-Id',
  'Docker-Distribution-Api-Version',
  'registry/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Client-Request-Id',
  'a9535496-9867-4ced-b8bd-96b0d660f8c2',
  'X-Ms-Correlation-Request-Id',
  '7f3d0123-a2f2-47e4-8aad-286783d16822',
  'X-Ms-Ratelimit-Remaining-Calls-Per-Second',
  '8.000000',
  'X-Ms-Request-Id',
  '66bb2dba-dc4b-411c-b204-855740fb197c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"registry","Name":"catalog","Action":"*"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '196',
  'Connection',
  'keep-alive',
  'Access-Control-Expose-Headers',
  'Docker-Content-Digest',
  'Access-Control-Expose-Headers',
  'WWW-Authenticate',
  'Access-Control-Expose-Headers',
  'Link',
  'Access-Control-Expose-Headers',
  'X-Ms-Correlation-Request-Id',
  'Docker-Distribution-Api-Version',
  'registry/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Www-Authenticate',
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="registry:catalog:*"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '53146e25-f479-48dc-a51d-44bf57319ade',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=registry%3Acatalog%3A*")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '425e70cd-7e97-46ff-a8c1-a61249f87b36',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .query(true)
  .reply(200, {"repositories":["busybox","hello-world","library/hello-world"]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '65',
  'Connection',
  'keep-alive',
  'Access-Control-Expose-Headers',
  'Docker-Content-Digest',
  'Access-Control-Expose-Headers',
  'WWW-Authenticate',
  'Access-Control-Expose-Headers',
  'Link',
  'Access-Control-Expose-Headers',
  'X-Ms-Correlation-Request-Id',
  'Docker-Distribution-Api-Version',
  'registry/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '3e938e9c-609f-4a17-95e3-bdfb43abf3f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
