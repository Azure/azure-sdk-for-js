let nock = require('nock');

module.exports.hash = "6a40a1e6d9d1faf359946e842729e35e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'b13583e1-1cd0-494c-a900-14ed75167700',
  'x-ms-ests-server',
  '2.1.12231.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Av95muZ3felDkTsG1LfEaW4; expires=Sat, 18-Dec-2021 20:54:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5ulwVdkAHINSNRrQPzixwt8ILGtRmUy2l85tGrlZ85uXzub8xlisdlveCeqTzqMAhXBUvM9Wuh9xE7JK2Xy29oDhjh_oZYBx1UomrigOrizTmVfx06HOUaM1GBPYT1gREx14a5K0RG8jrV-6sye3lrVgzL67E42Z_pBkUZmoGm8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 20:54:00 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '117c489b-9d58-468a-a880-eb7d74f91d00',
  'x-ms-ests-server',
  '2.1.12231.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuBPV7ZWxvNInMHaJeTu9UE; expires=Sat, 18-Dec-2021 20:54:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-IE82G8YsVEyLPl7AZi12TohQYiX2bowTjyXCQ8xmE8msebXqMtQIdv0d3H_hICbsyk-Jkcbq2NDtEK6KrR3tC8QfCkq7oJEhDQJl2uBMPUJFqfoyaOVNPa27BZnTCKORxqQlbgtromgfLHAd9IwjV2_hxANHHBI3fOZODEDmPEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 20:54:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=09e1f8cd-6884-4ce4-8590-e9ae6bc02a14&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9f968b54-6fd6-4ceb-969c-d52f7a311e00',
  'x-ms-ests-server',
  '2.1.12231.8 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvAvxTcKQG5HiiJC0_d4Zsb__1r8AQAAAGi0KNkOAAAA; expires=Sat, 18-Dec-2021 20:54:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 20:54:01 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/catalog/api/atlas/v2/glossary', {"name":"jssdkGlossary997Node","shortDescription":"Example Short Description","longDescription":"Example Long Description","language":"en","usage":"Example Glossary"})
  .query(true)
  .reply(200, {"guid":"077ad627-66a8-4ad2-8a1b-7607d69f25ec","qualifiedName":"jssdkGlossary997Node","name":"jssdkGlossary997Node","shortDescription":"Example Short Description","longDescription":"Example Long Description","lastModifiedTS":"1","language":"en","usage":"Example Glossary"}, [
  'Date',
  'Thu, 18 Nov 2021 20:54:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'AzurePurview',
  'Cache-Control',
  'no-store, must-revalidate, no-cache, max-age=0',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Expires',
  '0',
  'Access-Control-Allow-Headers',
  'authorization,content-type,x-xsrf-header,x-ms-client-request-id,lastmodifiedts',
  'Access-Control-Allow-Methods',
  'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,lastmodifiedts',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '15471c34-66f3-4155-ae1d-920f7ee902f3',
  'x-ms-request-id',
  '23230219-e60c-4b03-be5b-c324815f774b',
  'X-Frame-Options',
  'DENY',
  'X-Content-Type-Options',
  'nosniff',
  'X-Content-Type-Options',
  'nosniff',
  'x-xss-protection',
  '1; mode=block',
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:; connect-src 'self'; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline';font-src 'self' data:"
]);
