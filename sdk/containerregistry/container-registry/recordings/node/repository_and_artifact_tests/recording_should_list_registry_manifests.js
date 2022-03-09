let nock = require('nock');

module.exports.hash = "e338ef2c90128ccf3817ba097b769b85";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '222',
  'Connection',
  'close',
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
  '77a95250-5ded-4ed2-b3d6-ccc5d98b2e47',
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
  'fb476396-d72d-47b1-8ef9-f4247ab87d01',
  'x-ms-ests-server',
  '2.1.12171.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai54Amorss1Il6pc1AQC73g; expires=Wed, 08-Dec-2021 20:10:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrC7Pzj0-8q_IDzf09UjSf7XuodxpB4vQOPpU8-5liy8JsTQyjqZZ8GCiet3um5CD5R2rssTnNnwjYH8gcqJ3T8Umz07wtIL4nM8QAgsXQ-WZ_REqNsypDo4RcbHLgqlJzjKVpMv84pJg5l65_0gSDTg8u9tEL1ZCnC5Ml7yON_wogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 20:10:27 GMT',
  'Connection',
  'close',
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
  '7bc9d923-6cb0-43a7-afd2-d52ff977d600',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AitgweoL4fxCuGvJFegWqQU; expires=Wed, 08-Dec-2021 20:10:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8Bikx3zcuoG3AbzGHXGuwC5bls-DavAZrIxIvE9Niao_7Pill6SfWKg-EBLWR0wryVBoVtQGGQtiVn7KQLQo3DQYVFUhJJeLE2DN01KAcQo8UrBm5RcPoDR43kV-zKSvVdelFm0VXuyM8eL_BJhmbay7OPtgjBjd1arD9RMz7McgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 20:10:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=90c050e2-3d64-4dd2-b023-541796850e0d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '8dd0a396-b0a2-4764-b633-16b3b07dd000',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvGuiEulmtlJqEvsgl3p2GRGOXJzAQAAADN7G9kOAAAA; expires=Wed, 08-Dec-2021 20:10:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 20:10:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1351'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .query(true)
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:28 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '2f54e5c4-5b70-4ad0-b0a9-fb15aa72e2d1',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "service=myregistry.azurecr.io&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&grant_type=refresh_token")
  .query(true)
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:29 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'f258b2a1-d985-4905-a557-e7aecdbdd48f',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .query(true)
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifests":[{"digest":"sha256:01433e86a06b752f228e3c17394169a5e21a0995f153268a9b36a16d4f2b2184","imageSize":5216,"createdTime":"2021-10-06T21:01:30.4926548Z","lastUpdateTime":"2021-10-06T21:01:30.4926548Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:04ebe37e000dcd9b1386af0e2d9aad726cbd1581f82067bea5cd2532b1f06310","imageSize":528,"createdTime":"2021-06-11T19:19:17.6685388Z","lastUpdateTime":"2021-06-11T19:19:17.6685388Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:0dc4e9a14237cae2d8e96e9e310116091c5ed4934448d7cfd22b122778964f11","imageSize":527,"createdTime":"2021-06-11T19:19:17.5875184Z","lastUpdateTime":"2021-06-11T19:19:17.5875184Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:0dd359f0ea0f644cbc1aa467681654c6b4332015ae37af2916b0dfb73b83fd52","imageSize":527,"createdTime":"2021-06-11T19:19:17.6307166Z","lastUpdateTime":"2021-06-11T19:19:17.6307166Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:0fe98d7debd9049c50b597ef1f85b7c1e8cc81f59c8d623fcb2250e8bec85b38","imageSize":5850,"createdTime":"2021-08-17T16:55:59.3686577Z","lastUpdateTime":"2021-08-17T16:55:59.3686577Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:121373e88baca4c1ef533014de2759e002961de035607dd35d00886b052e37cf","imageSize":527,"createdTime":"2021-06-11T19:19:17.3343432Z","lastUpdateTime":"2021-06-11T19:19:17.3343432Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-06-11T19:11:38.3530937Z","lastUpdateTime":"2021-06-11T19:11:38.3530937Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:251bb7a536c7cce3437758971aab3a31c6da52fb43ff0654cff5b167c4486409","imageSize":4727,"createdTime":"2021-10-06T21:01:30.4148083Z","lastUpdateTime":"2021-10-06T21:01:30.4148083Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:31801872aacfc6245ba5277e07dc2c9a482a473c87d625f25c3e6d5de930b35d","imageSize":5871,"createdTime":"2021-11-08T19:55:54.7994646Z","lastUpdateTime":"2021-11-08T19:55:54.7994646Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:37a0b92b08d4919615c3ee023f7ddb068d12b8387475d64c622ac30f45c29c51","imageSize":61625,"createdTime":"2021-11-08T19:55:53.1835258Z","lastUpdateTime":"2021-11-08T19:55:53.1835258Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:3e7d74d1c66c8f7dd5384f49bf0f8ab3e18e81e8d2a79218ed777c534b446552","imageSize":525,"createdTime":"2021-07-12T19:20:00.913255Z","lastUpdateTime":"2021-07-12T19:20:00.913255Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:4fb0dd2040e4a909567fb8fd36338a00e727926da9e8f93fa1fe58cbc3b9af9c","imageSize":5830,"createdTime":"2021-09-20T18:50:55.4008325Z","lastUpdateTime":"2021-09-20T18:50:55.4008325Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","imageSize":525,"createdTime":"2021-06-01T17:44:41.0103898Z","lastUpdateTime":"2021-06-01T17:44:41.0103898Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:5122f6204b6a3596e048758cabba3c46b1c937a46b5be6225b835d091b90e46c","imageSize":5325,"createdTime":"2021-06-01T17:44:41.177556Z","lastUpdateTime":"2021-06-01T17:44:41.177556Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["latest"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:563c31a6b24347d3f367df5dc33890ab1aec20e9470e5d998f3b6a8fc6eb5763","imageSize":5806,"createdTime":"2021-11-08T19:55:54.8679861Z","lastUpdateTime":"2021-11-08T19:55:54.8679861Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:58d91e6625a0ea837222f24da4ca00be9da3db45cee5b172135eaf271610f9eb","imageSize":525,"createdTime":"2021-07-12T19:20:00.3959063Z","lastUpdateTime":"2021-07-12T19:20:00.3959063Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:61bd3cb6014296e214ff4c6407a5a7e7092dfa8eefdbbec539e133e97f63e09f","imageSize":61958,"createdTime":"2021-09-20T18:50:53.9769732Z","lastUpdateTime":"2021-09-20T18:50:53.9769732Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:6d9fcdca25452c9a255f02c7d67eb28e8afbba2671f1e8f60b3b3585b7bdf172","imageSize":525,"createdTime":"2021-07-12T19:20:00.5061197Z","lastUpdateTime":"2021-07-12T19:20:00.5061197Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:7b8b7289d0536a08eabdf71c20246e23f7116641db7e1d278592236ea4dcb30c","imageSize":5691,"createdTime":"2021-10-06T21:01:31.7709273Z","lastUpdateTime":"2021-10-06T21:01:31.7709273Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:7fed95756fe4ebeb6eb1d82c2176e0800a02807cc66fe48beb179e57c54ddcf1","imageSize":1125,"createdTime":"2021-06-01T17:44:41.7420809Z","lastUpdateTime":"2021-06-01T17:44:41.7420809Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:842295d11871c16bbce4d30cabc9b0f1e0cc40e49975f538179529d7798f77d8","imageSize":527,"createdTime":"2021-06-11T19:19:17.2116157Z","lastUpdateTime":"2021-06-11T19:19:17.2116157Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","imageSize":525,"createdTime":"2021-06-01T17:44:41.9901717Z","lastUpdateTime":"2021-06-01T17:44:41.9901717Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:90e120baffe5afa60dd5a24abcd051db49bd6aee391174da5e825ee6ee5a12a0","imageSize":1125,"createdTime":"2021-06-11T19:11:39.292044Z","lastUpdateTime":"2021-06-11T19:11:39.292044Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:930490f97e5b921535c153e0e7110d251134cc4b72bbb8133c6a5065cc68580d","imageSize":4745,"createdTime":"2021-06-11T19:19:16.7766065Z","lastUpdateTime":"2021-06-11T19:19:16.7766065Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:94b700b6ae5759e539e06fa6d483f5f0174067945f180cc1362cfda71c5fd722","imageSize":525,"createdTime":"2021-07-12T19:20:00.9631551Z","lastUpdateTime":"2021-07-12T19:20:00.9631551Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","imageSize":525,"createdTime":"2021-06-01T17:44:41.698893Z","lastUpdateTime":"2021-06-01T17:44:41.698893Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:98c9722322be649df94780d3fbe594fce7996234b259f27eac9428b84050c849","imageSize":4996,"createdTime":"2021-10-06T21:01:30.2509309Z","lastUpdateTime":"2021-10-06T21:01:30.2509309Z","architecture":"riscv64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:9ade9cc2e26189a19c2e8854b9c8f1e14829b51c55a630ee675a5a9540ef6ccf","imageSize":61611,"createdTime":"2021-10-06T21:01:29.283756Z","lastUpdateTime":"2021-10-06T21:01:29.283756Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:9cd47e9327430990c932b19596f8760e7d1a0be0311bb31bab3170bec5f27358","imageSize":527,"createdTime":"2021-06-11T19:19:16.8871039Z","lastUpdateTime":"2021-06-11T19:19:16.8871039Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:9f6ad537c5132bcce57f7a0a20e317228d382c3cd61edae14650eec68b2b345c","imageSize":5325,"createdTime":"2021-06-11T19:11:38.2304296Z","lastUpdateTime":"2021-06-11T19:11:38.2304296Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":false,"writeEnabled":false,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:a10c347f4cc2924af832d319635d6d027ca8820ff683b6bcc728d825a37a7f69","imageSize":525,"createdTime":"2021-07-12T19:20:00.5421832Z","lastUpdateTime":"2021-07-12T19:20:00.5421832Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:b836bb24a270b9cc935962d8228517fde0f16990e88893d935efcb1b14c0017a","imageSize":5925,"createdTime":"2021-10-06T21:01:31.2908944Z","lastUpdateTime":"2021-10-06T21:01:31.2908944Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:b89e28f1d57f44064e96c4525e514f6f0498a433b83413538f79f82566d72114","imageSize":525,"createdTime":"2021-07-12T19:20:00.7917219Z","lastUpdateTime":"2021-07-12T19:20:00.7917219Z","architecture":"riscv64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","imageSize":525,"createdTime":"2021-06-01T17:44:41.6023044Z","lastUpdateTime":"2021-06-01T17:44:41.6023044Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:c10e75f6e5442f446b7c053ff2f360a4052f759c59be9a4c7d144f60207c6eda","imageSize":528,"createdTime":"2021-06-11T19:19:18.1427653Z","lastUpdateTime":"2021-06-11T19:19:18.1427653Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:c2f204d26b4ea353651385001bb6bc371d8c4edcd9daf61d00ad365d927e00c0","imageSize":6088,"createdTime":"2021-10-06T21:01:29.9953911Z","lastUpdateTime":"2021-10-06T21:01:29.9953911Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:c7b6944911848ce39b44ed660d95fb54d69bbd531de724c7ce6fc9f743c0b861","imageSize":5270,"createdTime":"2021-10-06T21:01:29.8786957Z","lastUpdateTime":"2021-10-06T21:01:29.8786957Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","imageSize":525,"createdTime":"2021-06-01T17:44:41.5396886Z","lastUpdateTime":"2021-06-01T17:44:41.5396886Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:ccff0c7e8498c0bd8d4705e663084c25810fd064a184671a050e1a43b86fb091","imageSize":527,"createdTime":"2021-06-11T19:19:17.7388458Z","lastUpdateTime":"2021-06-11T19:19:17.7388458Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:dca71257cd2e72840a21f0323234bb2e33fea6d949fa0f21c5102146f583486b","imageSize":527,"createdTime":"2021-06-11T19:19:16.6208398Z","lastUpdateTime":"2021-06-11T19:19:16.6208398Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:dd295b166e7a35d810b7d286c62fee3c575fdde553182271fc0e5fb01ac81b15","imageSize":5833,"createdTime":"2021-09-20T18:50:54.9019432Z","lastUpdateTime":"2021-09-20T18:50:54.9019432Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:df5f5184104426b65967e016ff2ac0bfcd44ad7899ca3bbcf8e44e4461491a9e","imageSize":5850,"createdTime":"2021-07-12T19:19:59.5452001Z","lastUpdateTime":"2021-07-12T19:19:59.5452001Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","imageSize":525,"createdTime":"2021-06-01T17:44:41.8244996Z","lastUpdateTime":"2021-06-01T17:44:41.8244996Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","imageSize":525,"createdTime":"2021-06-01T17:44:40.7616804Z","lastUpdateTime":"2021-06-01T17:44:40.7616804Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:e70692d3144e0ddb23e2ecf72d4b78f1e9ffcb32a9c863b98a35d43adfb42ad8","imageSize":1125,"createdTime":"2021-08-17T16:56:00.1861796Z","lastUpdateTime":"2021-08-17T16:56:00.1861796Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:f130bd2d67e6e9280ac6d0a6c83857bfaf70234e8ef4236876eccfbd30973b1c","imageSize":5000,"createdTime":"2021-10-06T21:01:30.3566409Z","lastUpdateTime":"2021-10-06T21:01:30.3566409Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:f54a58bc1aac5ea1a25d796ae155dc228b3f0e11d046ae276b39c4bf2f13d8c4","imageSize":4473,"createdTime":"2021-10-06T21:01:30.0499098Z","lastUpdateTime":"2021-10-06T21:01:30.0499098Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
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
  '2d7cd1af-234c-4bd6-9a1f-37d0351afcde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
