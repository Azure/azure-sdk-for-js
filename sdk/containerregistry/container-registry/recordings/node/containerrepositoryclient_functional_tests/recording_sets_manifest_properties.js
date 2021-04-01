let nock = require('nock');

module.exports.hash = "1f00134f2d386b25bcb9d6e7ab70cd23";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.core.windows.net%2F.default")
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
  '9747230d-84eb-4716-bfc4-eee0024c0800',
  'x-ms-ests-server',
  '2.1.11622.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnrASb4gcKZCjvJY8y4LgAJ12iTZAwAAADBD-NcOAAAA; expires=Sat, 01-May-2021 22:43:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Apr 2021 22:43:18 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"registry","Name":"catalog","Action":"*"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:19 GMT',
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
  '97871900-53f3-4e76-8dae-a79bb909a412',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'f2f8ba01-3f3e-4bda-9d32-a8a22e8e4143',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '4d43181a-180e-4c8e-a59f-a08e6a55f14c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(200, {"repositories":["library/hello-world"]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:20 GMT',
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
  '4fa24188-af9e-4a33-a19b-68969b18f38f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.core.windows.net%2F.default")
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
  '3e0f3cd5-f416-40f9-a6bf-a7219a4b0a00',
  'x-ms-ests-server',
  '2.1.11622.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnrASb4gcKZCjvJY8y4LgAJ12iTZBAAAADBD-NcOAAAA; expires=Sat, 01-May-2021 22:43:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Apr 2021 22:43:24 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:25 GMT',
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
  '168286c1-b2f3-4784-b140-0ab8ddab88cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'be68c948-063a-4a6e-ae31-d269d988a2f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'fbe044a5-efe3-4be9-97bf-349f87bc9ec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-04-01T22:42:07.4417462Z","lastUpdateTime":"2021-04-01T22:42:07.4417462Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '388',
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
  '33f464de-e9c6-49b3-8084-1c053b9ebb2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:43 GMT',
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
  '61c1c8b2-96d8-432e-a31b-0724957c0664',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:43 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'eb3393a3-35f3-470b-94ba-13409f98bbea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:43 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '47cdd49a-2f66-42d6-b08b-cdf82a7b3909',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","imageSize":0,"createdTime":"2021-04-01T22:42:07.3623143Z","lastUpdateTime":"2021-04-01T22:42:07.3623143Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true},"references":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","architecture":"amd64","os":"linux"},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","architecture":"arm","os":"linux"},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","architecture":"arm","os":"linux"},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","architecture":"arm64","os":"linux"},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","architecture":"386","os":"linux"},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","architecture":"mips64le","os":"linux"},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","architecture":"ppc64le","os":"linux"},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","architecture":"s390x","os":"linux"},{"digest":"sha256:b0408a0f1d74eced127a2658429f336ed8fa48e36d59878f155b19865e5dbd70","architecture":"amd64","os":"windows"}]}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:44 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1585',
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
  '5d9cdf34-4c5f-4b7e-8f29-d4aadc0c1e05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24', {"deleteEnabled":false,"writeEnabled":false,"listEnabled":false,"readEnabled":false})
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:48 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '223',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_write",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  'c2ac1c8e-b832-4f2d-a135-3c928fa225c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:49 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'a8291c82-441d-4686-a786-daed50fe01f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:49 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'a48bc853-d2ad-4e11-b9a9-57adb2b2a9cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24', {"deleteEnabled":false,"writeEnabled":false,"listEnabled":false,"readEnabled":false})
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","imageSize":0,"createdTime":"2021-04-01T22:42:07.3623143Z","lastUpdateTime":"2021-04-01T22:42:07.3623143Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":false,"writeEnabled":false,"readEnabled":false,"listEnabled":false},"references":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","architecture":"amd64","os":"linux"},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","architecture":"arm","os":"linux"},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","architecture":"arm","os":"linux"},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","architecture":"arm64","os":"linux"},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","architecture":"386","os":"linux"},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","architecture":"mips64le","os":"linux"},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","architecture":"ppc64le","os":"linux"},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","architecture":"s390x","os":"linux"},{"digest":"sha256:b0408a0f1d74eced127a2658429f336ed8fa48e36d59878f155b19865e5dbd70","architecture":"amd64","os":"windows"}]}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:50 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1589',
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
  '9f36b168-efc2-4af1-8036-0967bfdb3996',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:50 GMT',
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
  '98e29708-7be0-4682-8622-b270bf69a4cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:50 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'c825cd18-6d6b-4473-bfd7-6afaf6728be3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:50 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'e2271c27-173f-40d9-bfff-c96315d763b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","imageSize":0,"createdTime":"2021-04-01T22:42:07.3623143Z","lastUpdateTime":"2021-04-01T22:42:07.3623143Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":false,"writeEnabled":false,"readEnabled":false,"listEnabled":false},"references":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","architecture":"amd64","os":"linux"},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","architecture":"arm","os":"linux"},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","architecture":"arm","os":"linux"},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","architecture":"arm64","os":"linux"},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","architecture":"386","os":"linux"},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","architecture":"mips64le","os":"linux"},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","architecture":"ppc64le","os":"linux"},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","architecture":"s390x","os":"linux"},{"digest":"sha256:b0408a0f1d74eced127a2658429f336ed8fa48e36d59878f155b19865e5dbd70","architecture":"amd64","os":"windows"}]}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:51 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1589',
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
  '8f2619fa-04ba-4cc0-b06d-5756f84f0473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24', {"deleteEnabled":true,"writeEnabled":true,"listEnabled":true,"readEnabled":true})
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:59 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '223',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_write",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '12ebb207-d83b-40ab-b42e-34612a07406c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:59 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '8a28662c-5f5f-4225-9c32-f86c09bd3cb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:44:00 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '81817457-907a-483d-aae8-35fcdfc87abb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24', {"deleteEnabled":true,"writeEnabled":true,"listEnabled":true,"readEnabled":true})
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","imageSize":0,"createdTime":"2021-04-01T22:42:07.3623143Z","lastUpdateTime":"2021-04-01T22:42:07.3623143Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true},"references":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","architecture":"amd64","os":"linux"},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","architecture":"arm","os":"linux"},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","architecture":"arm","os":"linux"},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","architecture":"arm64","os":"linux"},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","architecture":"386","os":"linux"},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","architecture":"mips64le","os":"linux"},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","architecture":"ppc64le","os":"linux"},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","architecture":"s390x","os":"linux"},{"digest":"sha256:b0408a0f1d74eced127a2658429f336ed8fa48e36d59878f155b19865e5dbd70","architecture":"amd64","os":"windows"}]}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:44:00 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1585',
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
  '5214aec9-dcc7-4d36-926d-996144b4e062',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
