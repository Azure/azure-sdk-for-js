let nock = require('nock');

module.exports.hash = "20704860a85aed25d0f147a937a3b7a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 20:57:38 GMT',
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
  '685e1405-8e74-4c32-b9c5-b9e0c960fdbe',
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
  'a72da958-7448-4fd4-9413-cec1167f0c00',
  'x-ms-ests-server',
  '2.1.11787.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AluB2YsQJ9RGqRWXociWMRxGOXJzBAAAAD3FVdgOAAAA; expires=Sun, 11-Jul-2021 20:57:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr87bkpNSQnkiXnxpsty_wTA2QWo7d5PfB4QlXt_safJucz-TZkCVO0VCMXUS0VnH5WzahVCBg3hwa0yqDbKe1ezpzKTRAy1EBbetNlX3uXiqCHj4dAjz83lfpyBYlB3MmbdzeIX7xMtgent8M1hyaqBUkRDQ5YCDhv2wlirFU_QggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 20:57:37 GMT',
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
  '6f333939-cabf-4c50-acb0-3232a0e22a00',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AluB2YsQJ9RGqRWXociWMRxGOXJzBAAAAD3FVdgOAAAA; expires=Sun, 11-Jul-2021 20:57:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrd8_3MJ8gnFDia2YxASXbjlYMUopAcvfmDWQ0OOADjsrWZ_kdcSykzC-5DsoC_BO7166whuwn8snDcAQVpbedf5oKAdYJyT4QIDIyK0j9C9_Dz4O4CuIawbfT-54bH3OQZo5GW_-pXqx_WQO3cP3Hkl64b9SMttFSHm6CzO4CzUsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 20:57:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=810353d1-1414-4c12-b7f5-6443dbed03a3&client_secret=azure_client_secret")
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
  '86d1ccf2-51fd-4060-a2d7-afc125922700',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AluB2YsQJ9RGqRWXociWMRxGOXJzBQAAAD3FVdgOAAAA; expires=Sun, 11-Jul-2021 20:57:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 20:57:38 GMT',
  'Content-Length',
  '1351'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 20:57:38 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '6aa28128-b485-49a8-99cb-0d6f7c5dce56',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.483333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 20:57:38 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  '5421c780-1a1f-4828-af4b-91c8f294887e',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.466667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifests":[{"digest":"sha256:04ebe37e000dcd9b1386af0e2d9aad726cbd1581f82067bea5cd2532b1f06310","imageSize":528,"createdTime":"2021-06-11T19:19:17.6685388Z","lastUpdateTime":"2021-06-11T19:19:17.6685388Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:0dc4e9a14237cae2d8e96e9e310116091c5ed4934448d7cfd22b122778964f11","imageSize":527,"createdTime":"2021-06-11T19:19:17.5875184Z","lastUpdateTime":"2021-06-11T19:19:17.5875184Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:0dd359f0ea0f644cbc1aa467681654c6b4332015ae37af2916b0dfb73b83fd52","imageSize":527,"createdTime":"2021-06-11T19:19:17.6307166Z","lastUpdateTime":"2021-06-11T19:19:17.6307166Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:121373e88baca4c1ef533014de2759e002961de035607dd35d00886b052e37cf","imageSize":527,"createdTime":"2021-06-11T19:19:17.3343432Z","lastUpdateTime":"2021-06-11T19:19:17.3343432Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-06-11T19:11:38.3530937Z","lastUpdateTime":"2021-06-11T19:11:38.3530937Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","imageSize":525,"createdTime":"2021-06-01T17:44:41.0103898Z","lastUpdateTime":"2021-06-01T17:44:41.0103898Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:5122f6204b6a3596e048758cabba3c46b1c937a46b5be6225b835d091b90e46c","imageSize":5325,"createdTime":"2021-06-01T17:44:41.177556Z","lastUpdateTime":"2021-06-01T17:44:41.177556Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["latest"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:7fed95756fe4ebeb6eb1d82c2176e0800a02807cc66fe48beb179e57c54ddcf1","imageSize":1125,"createdTime":"2021-06-01T17:44:41.7420809Z","lastUpdateTime":"2021-06-01T17:44:41.7420809Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:842295d11871c16bbce4d30cabc9b0f1e0cc40e49975f538179529d7798f77d8","imageSize":527,"createdTime":"2021-06-11T19:19:17.2116157Z","lastUpdateTime":"2021-06-11T19:19:17.2116157Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","imageSize":525,"createdTime":"2021-06-01T17:44:41.9901717Z","lastUpdateTime":"2021-06-01T17:44:41.9901717Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:90e120baffe5afa60dd5a24abcd051db49bd6aee391174da5e825ee6ee5a12a0","imageSize":1125,"createdTime":"2021-06-11T19:11:39.292044Z","lastUpdateTime":"2021-06-11T19:11:39.292044Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:930490f97e5b921535c153e0e7110d251134cc4b72bbb8133c6a5065cc68580d","imageSize":4745,"createdTime":"2021-06-11T19:19:16.7766065Z","lastUpdateTime":"2021-06-11T19:19:16.7766065Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","imageSize":525,"createdTime":"2021-06-01T17:44:41.698893Z","lastUpdateTime":"2021-06-01T17:44:41.698893Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:9cd47e9327430990c932b19596f8760e7d1a0be0311bb31bab3170bec5f27358","imageSize":527,"createdTime":"2021-06-11T19:19:16.8871039Z","lastUpdateTime":"2021-06-11T19:19:16.8871039Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:9f6ad537c5132bcce57f7a0a20e317228d382c3cd61edae14650eec68b2b345c","imageSize":5325,"createdTime":"2021-06-11T19:11:38.2304296Z","lastUpdateTime":"2021-06-11T19:11:38.2304296Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","imageSize":525,"createdTime":"2021-06-01T17:44:41.6023044Z","lastUpdateTime":"2021-06-01T17:44:41.6023044Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:c10e75f6e5442f446b7c053ff2f360a4052f759c59be9a4c7d144f60207c6eda","imageSize":528,"createdTime":"2021-06-11T19:19:18.1427653Z","lastUpdateTime":"2021-06-11T19:19:18.1427653Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","imageSize":525,"createdTime":"2021-06-01T17:44:41.5396886Z","lastUpdateTime":"2021-06-01T17:44:41.5396886Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:ccff0c7e8498c0bd8d4705e663084c25810fd064a184671a050e1a43b86fb091","imageSize":527,"createdTime":"2021-06-11T19:19:17.7388458Z","lastUpdateTime":"2021-06-11T19:19:17.7388458Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:dca71257cd2e72840a21f0323234bb2e33fea6d949fa0f21c5102146f583486b","imageSize":527,"createdTime":"2021-06-11T19:19:16.6208398Z","lastUpdateTime":"2021-06-11T19:19:16.6208398Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","imageSize":525,"createdTime":"2021-06-01T17:44:41.8244996Z","lastUpdateTime":"2021-06-01T17:44:41.8244996Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","imageSize":525,"createdTime":"2021-06-01T17:44:40.7616804Z","lastUpdateTime":"2021-06-01T17:44:40.7616804Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 20:57:40 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
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
  '0046ebfb-411e-4ddb-a256-d59c19b36a9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
