let nock = require('nock');

module.exports.hash = "f799251912cb2763f9c206835303099f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:36 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '222',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_read"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '11681e8b-fe11-4b63-9e25-480aeed0c350',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
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
  'b9d84aa9-477d-47dd-8c41-fd2bdd0f0e01',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Akv4_v47h3lKvPxHrX92TDw; expires=Wed, 20-Oct-2021 18:54:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrniCP41D1AKQ_whOLCoTsJmJ5MrGByqnA70zAU-u8ZRFSAIX8Lz0Hu61D6vaqwih9dOpQAsLFzgSHxGUjIaqpBcyV8vPiEWaa93_pI3XB-p9wle-J8HRewBoFve9DgrmjUdNYUefic0uS5i-NnmPheOI5D37v4tQGo6QCpoYJeCsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:36 GMT',
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
  '6c5e26fd-5061-4074-8042-a6ae8565dd00',
  'x-ms-ests-server',
  '2.1.12071.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlEJuIucW4JMifriGn8WgOA; expires=Wed, 20-Oct-2021 18:54:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4tCty39senzLCBqcInF8QKfQd-0sIwuXRG4ykaw6woj6gCGmuw4bwDHsrO7nd_sD2qNHNBdtEB-ninKBJyYi2DOWZ7bteg6zcCsw5gy4LaiIdmAlXO9AjNCwe2mfbiDrvaPE85V7NidoQiIfwvhvftirkjPLlkZP3eEgvMsUogsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=12b092f2-17f3-4543-9f32-71fb9ac70cdb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '0c2eb0f8-facc-4ede-99e3-5a557f578300',
  'x-ms-ests-server',
  '2.1.12071.7 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApYuj54GmaZAicArlN7FGEtGOXJzAQAAAOzP2tgOAAAA; expires=Wed, 20-Oct-2021 18:54:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:36 GMT',
  'Content-Length',
  '1351'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '8ab4196b-9ad2-43d1-aede-a80339e4a2c3',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.083333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '6aa6ec05-e8da-440c-92fa-3f923ac06c61',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.066667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .query(true)
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:61bd3cb6014296e214ff4c6407a5a7e7092dfa8eefdbbec539e133e97f63e09f","createdTime":"2021-06-11T19:11:38.7001063Z","lastUpdateTime":"2021-09-20T18:50:54.0904821Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '388',
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
  '5a19b6c4-6d3c-47d3-a71d-00ca0d7b44c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A61bd3cb6014296e214ff4c6407a5a7e7092dfa8eefdbbec539e133e97f63e09f')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '222',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_read"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '88cc9777-ed66-4903-8989-b8cfd3592bc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '35edb63a-baf4-40d8-b33c-14fa48c0ff96',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A61bd3cb6014296e214ff4c6407a5a7e7092dfa8eefdbbec539e133e97f63e09f')
  .query(true)
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:61bd3cb6014296e214ff4c6407a5a7e7092dfa8eefdbbec539e133e97f63e09f","imageSize":61958,"createdTime":"2021-09-20T18:50:53.9769732Z","lastUpdateTime":"2021-09-20T18:50:53.9769732Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true},"references":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","architecture":"amd64","os":"linux"},{"digest":"sha256:58d91e6625a0ea837222f24da4ca00be9da3db45cee5b172135eaf271610f9eb","architecture":"arm","os":"linux"},{"digest":"sha256:94b700b6ae5759e539e06fa6d483f5f0174067945f180cc1362cfda71c5fd722","architecture":"arm","os":"linux"},{"digest":"sha256:a10c347f4cc2924af832d319635d6d027ca8820ff683b6bcc728d825a37a7f69","architecture":"arm64","os":"linux"},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","architecture":"386","os":"linux"},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","architecture":"mips64le","os":"linux"},{"digest":"sha256:3e7d74d1c66c8f7dd5384f49bf0f8ab3e18e81e8d2a79218ed777c534b446552","architecture":"ppc64le","os":"linux"},{"digest":"sha256:b89e28f1d57f44064e96c4525e514f6f0498a433b83413538f79f82566d72114","architecture":"riscv64","os":"linux"},{"digest":"sha256:6d9fcdca25452c9a255f02c7d67eb28e8afbba2671f1e8f60b3b3585b7bdf172","architecture":"s390x","os":"linux"},{"digest":"sha256:dd295b166e7a35d810b7d286c62fee3c575fdde553182271fc0e5fb01ac81b15","architecture":"amd64","os":"windows"},{"digest":"sha256:4fb0dd2040e4a909567fb8fd36338a00e727926da9e8f93fa1fe58cbc3b9af9c","architecture":"amd64","os":"windows"}]}}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1835',
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
  '04b481c7-d0ef-4a21-83c8-600b7bfe29cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
