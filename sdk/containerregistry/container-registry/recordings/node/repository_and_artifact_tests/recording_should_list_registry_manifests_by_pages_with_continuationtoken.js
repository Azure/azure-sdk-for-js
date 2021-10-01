let nock = require('nock');

module.exports.hash = "aa22a3e39f1251356824caa4a409b64d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:31 GMT',
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
  'f07e7db1-c7da-4b8a-a52b-bd8601376bd3',
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
  '06cc8dfb-4baa-4a47-a8e7-e3a06d628700',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuRP20ufF-NFtzPIrp9xiCs; expires=Wed, 20-Oct-2021 18:54:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdCxBRHxvZKSUXVq7YzVKnZRSI0dGIX2RPpxThm7rQttoBwB4lhp6vV5Mx7BsFuZwjwFixqQQ0Qs5I9_hQ5nspHm77-044RR5otWtdoGRBVAdqjTaZPaj2eJvbRzNwIgS-ZCW_4kqdrPvKm_LlnGryRNrfY3-s_3qBRBfhcfMB2kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:31 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '8794f495-a762-411f-9ecc-6ec2b618ac00',
  'x-ms-ests-server',
  '2.1.12071.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al6MrJHmR9pBjcjsH_kX2r0; expires=Wed, 20-Oct-2021 18:54:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrm5p2lCPrKCAx_TTmejCj9EAgCw7iKUeiQUi0S3ca9WbRr92CzO3uHTdasNgaHO-_EutWpfs7HVDArB9DojV_vSmtdWIsU4MTIDdnrBYSB8INvE8t9v5qxZ3hhkCnkmFzc37H_RnoZ2zglgVcn2jn23JBhcnMCC1cuyL_kJFA8SMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:31 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3e973617-5fe3-4d6a-89c2-8a4497e9657e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'c73f6c83-e9b5-4167-ab68-9c65f390bc00',
  'x-ms-ests-server',
  '2.1.12071.7 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=An9m2XJ6vx9Glue7TMjzsVxGOXJzAQAAAOfP2tgOAAAA; expires=Wed, 20-Oct-2021 18:54:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 18:54:31 GMT',
  'Content-Length',
  '1351'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:31 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  'de123d92-7e26-4ffc-bc00-5003cd571b0f',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:31 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '64c7a8e9-95b5-4458-8b1f-62702de32b18',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.383333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .query(true)
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifests":[{"digest":"sha256:3e7d74d1c66c8f7dd5384f49bf0f8ab3e18e81e8d2a79218ed777c534b446552","imageSize":525,"createdTime":"2021-07-12T19:20:00.913255Z","lastUpdateTime":"2021-07-12T19:20:00.913255Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 20 Sep 2021 18:54:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '512',
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
  'Link',
  '</acr/v1/library%2Fhello-world/_manifests?last=sha256%3A3e7d74d1c66c8f7dd5384f49bf0f8ab3e18e81e8d2a79218ed777c534b446552&n=1&orderby=>; rel="next"',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '5c1391dd-c18b-4c6a-814b-2ded49440ada',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
