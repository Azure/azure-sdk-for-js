let nock = require('nock');

module.exports.hash = "010606fd5093efc05d3b4507cbef1a58";

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
  '1f623800-874c-4277-b16b-879a55486f00',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiWY3Kx3fvZElGiMFi-_2kh12iTZBQAAALO0K9gOAAAA; expires=Wed, 09-Jun-2021 23:11:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:11:56 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:11:57 GMT',
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
  '57970244-5d8e-4051-bcf4-c5a393e2087e',
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
  '428c50f7-d2da-402a-a895-321208c50700',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiWY3Kx3fvZElGiMFi-_2kh12iTZBgAAALO0K9gOAAAA; expires=Wed, 09-Jun-2021 23:11:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:11:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1361'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:11:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'ada94efa-a318-4d4e-8526-7a974047b588',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:11:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '7cdfc911-d6c8-4a99-82e0-b828b88480d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifests":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-05-10T23:10:47.853971Z","lastUpdateTime":"2021-05-10T23:10:47.853971Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","imageSize":525,"createdTime":"2021-05-10T23:10:47.928765Z","lastUpdateTime":"2021-05-10T23:10:47.928765Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","imageSize":525,"createdTime":"2021-05-10T23:10:48.3467323Z","lastUpdateTime":"2021-05-10T23:10:48.3467323Z","architecture":"mips64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","imageSize":525,"createdTime":"2021-05-10T23:10:47.8983446Z","lastUpdateTime":"2021-05-10T23:10:47.8983446Z","architecture":"arm64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","imageSize":525,"createdTime":"2021-05-10T23:10:48.8787311Z","lastUpdateTime":"2021-05-10T23:10:48.8787311Z","architecture":"ppc64le","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","imageSize":525,"createdTime":"2021-05-10T23:10:48.153056Z","lastUpdateTime":"2021-05-10T23:10:48.153056Z","architecture":"386","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","imageSize":525,"createdTime":"2021-05-10T23:10:48.8096187Z","lastUpdateTime":"2021-05-10T23:10:48.8096187Z","architecture":"s390x","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","imageSize":525,"createdTime":"2021-05-10T23:10:49.1349813Z","lastUpdateTime":"2021-05-10T23:10:49.1349813Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:ea0cfb27fd41ea0405d3095880c1efa45710f5bcdddb7d7d5a7317ad4825ae14","imageSize":1125,"createdTime":"2021-05-10T23:10:49.0004578Z","lastUpdateTime":"2021-05-10T23:10:49.0004578Z","architecture":"amd64","os":"windows","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineState":"Passed"}},{"digest":"sha256:f2266cbfc127c960fd30e76b7c792dc23b588c0db76233517e1891a4e357d519","imageSize":5325,"createdTime":"2021-05-10T23:10:46.9516237Z","lastUpdateTime":"2021-05-10T23:10:46.9516237Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:11:58 GMT',
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
  'd329b249-92b6-4ac6-b6f2-c32711308e97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
