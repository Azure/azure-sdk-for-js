let nock = require('nock');

module.exports.hash = "b2d25868b8ff52e57a85b43124f61a43";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.core.windows.net%2F.default")
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
  'c9722808-e9e4-4df0-a75f-f5de4f030600',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AubVabojdJVHvZY0mJSQ0Yl12iTZBwAAAFeL-dcOAAAA; expires=Sun, 02-May-2021 22:03:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 02 Apr 2021 22:03:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1361'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"registry","Name":"catalog","Action":"*"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '196',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="registry:catalog:*",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  'a1cb9cde-165f-4429-9068-a44b6bddbf31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'ea468470-984e-4a59-b8af-1e269ea74f76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '074311db-3def-47ed-8df4-b35d09950a56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(200, {"repositories":["library/hello-world"]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '41',
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
  '0d5d1cb9-d61c-49b5-8a61-2d9d95178da5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.core.windows.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1361',
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
  '654efeb7-2bcf-45ac-94c9-2aae54cf0700',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AubVabojdJVHvZY0mJSQ0Yl12iTZCAAAAFeL-dcOAAAA; expires=Sun, 02-May-2021 22:03:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 02 Apr 2021 22:03:26 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:27 GMT',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_read",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  'c126ac72-a41e-4b4e-b652-14aa8f7cd592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '119700fb-d136-4ee5-b9bd-043dcbf7cefa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'e3ae955d-fc9c-4977-a9f0-11adde7babf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifests":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":0,"createdTime":"2021-04-02T22:02:52.5006059Z","lastUpdateTime":"2021-04-02T22:02:52.5006059Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","imageSize":0,"createdTime":"2021-04-02T22:02:51.8564359Z","lastUpdateTime":"2021-04-02T22:02:51.8564359Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","imageSize":0,"createdTime":"2021-04-02T22:02:52.0152663Z","lastUpdateTime":"2021-04-02T22:02:52.0152663Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","imageSize":0,"createdTime":"2021-04-02T22:02:52.6173755Z","lastUpdateTime":"2021-04-02T22:02:52.6173755Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","imageSize":0,"createdTime":"2021-04-02T22:02:52.2212959Z","lastUpdateTime":"2021-04-02T22:02:52.2212959Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:b0408a0f1d74eced127a2658429f336ed8fa48e36d59878f155b19865e5dbd70","imageSize":0,"createdTime":"2021-04-02T22:02:53.064934Z","lastUpdateTime":"2021-04-02T22:02:53.064934Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","imageSize":0,"createdTime":"2021-04-02T22:02:52.6675733Z","lastUpdateTime":"2021-04-02T22:02:52.6675733Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","imageSize":0,"createdTime":"2021-04-02T22:02:52.095761Z","lastUpdateTime":"2021-04-02T22:02:52.095761Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","imageSize":0,"createdTime":"2021-04-02T22:02:53.1512412Z","lastUpdateTime":"2021-04-02T22:02:53.1512412Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","imageSize":0,"createdTime":"2021-04-02T22:02:51.5504862Z","lastUpdateTime":"2021-04-02T22:02:51.5504862Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 02 Apr 2021 22:03:28 GMT',
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
  '29c92f07-a13c-4613-b838-d893552a5004',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
