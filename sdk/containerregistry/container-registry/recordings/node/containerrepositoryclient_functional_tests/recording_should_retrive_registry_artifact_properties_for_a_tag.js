let nock = require('nock');

module.exports.hash = "18f8d7fd71d6b445cad073fd91c93211";

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
  '1a45531c-ad66-4468-9503-98008bda0000',
  'x-ms-ests-server',
  '2.1.11622.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AklEVY-UzkRHusop82WSHqN12iTZAQAAAGoO-NcOAAAA; expires=Sat, 01-May-2021 18:56:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Apr 2021 18:56:42 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"registry","Name":"catalog","Action":"*"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:56:43 GMT',
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
  'Bearer realm="https://myregistry.azurecr.iooauth2/token",service="myregistry.azurecr.io",scope="registry:catalog:*",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '89736af6-63c7-49fe-9ead-afae33b13d54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:56:43 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '043453d2-7bca-4e75-8617-768e2d815831',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:56:43 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '4a332fa2-b9ff-4691-b6ca-556d8eaf83d4',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(200, {"repositories":null}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:56:44 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '22',
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
  'b236f75b-c7a8-4931-9372-9c91a6c6e50b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/token', "grant_type=client_credentials&client_id=azure_client_id&resource=https%3A%2F%2Fmanagement.core.windows.net%2F&client_secret=azure_client_secret")
  .query(true)
  .reply(200, {"token_type":"Bearer","expires_in":"86399","ext_expires_in":"86399","expires_on":"1617389804","not_before":"1617303104","resource":"https://management.core.windows.net/","access_token":"access_token"}, [
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
  'client-request-id',
  '834494ec-6671-409e-bd52-6a19eb193711',
  'x-ms-request-id',
  '3331275f-0627-41df-927b-7aae385c0100',
  'x-ms-ests-server',
  '2.1.11622.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8G49QgKppPqUMscpF6hRhI-ePCAQAAAGwO-NcOAAAA; expires=Sat, 01-May-2021 18:56:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; httponly',
  'Date',
  'Thu, 01 Apr 2021 18:56:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1468'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f73ccb760e76b2f3ede9eeec607b7f279b6d3f9c4ef3ed7c37dbbfbf33cdee4fee3ff868f451b66ee7555dfc20c35bafab753d25901fbdaacafc49d6e4336ae1833d4347b7843c2b9a55995dbfc8168078fc83759da7af9ffe5ee9d3fc322fab555ea72fe9eb8bba5a2fb99b366bd1f074994dca5ec72fabb2981679f3d1a35ffc51594d195b7a7d9a2ff265cb589d2ddbbc5e66e5efbfb7b3bbbfbdf3707b679760fca275d5661bbe6f56f972562c2f9e178ba2a5565f9e9f7ff44b7ec9f77fc9ff035d6f48b25e010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-tenant-reads',
  '11999',
  'x-ms-request-id',
  '30b53e06-c8f6-441d-a29c-98044f301950',
  'x-ms-correlation-request-id',
  '30b53e06-c8f6-441d-a29c-98044f301950',
  'x-ms-routing-request-id',
  'WESTUS2:20210401T185644Z:30b53e06-c8f6-441d-a29c-98044f301950',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Apr 2021 18:56:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '343'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .post('/subscriptions/subscription_id/resourceGroups/yumeng-acr-test/providers/Microsoft.ContainerRegistry/registries/yumengacr/importImage', {"source":{"registryUri":"registry.hub.docker.com","sourceImage":"library/hello-world"},"targetTags":["library/hello-world:test1","library/hello-world:test-delete"],"mode":"Force"})
  .query(true)
  .reply(202, null, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '4',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/WESTUS2/operationResults/registries-99f9cc4f-7a48-4ab8-bbec-8b78a32e5992?api-version=2019-12-01-preview',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd10c186b-7e69-4ff3-a3c2-0435bcec4077',
  'x-ms-correlation-request-id',
  'd10c186b-7e69-4ff3-a3c2-0435bcec4077',
  'x-ms-routing-request-id',
  'WESTUS2:20210401T185645Z:d10c186b-7e69-4ff3-a3c2-0435bcec4077',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Apr 2021 18:56:45 GMT',
  'Connection',
  'close'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/WESTUS2/operationResults/registries-99f9cc4f-7a48-4ab8-bbec-8b78a32e5992')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671ffd","92ff0720887be416000000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45a18a20-b27a-4304-8be9-dd5576a60c68',
  'x-ms-correlation-request-id',
  '45a18a20-b27a-4304-8be9-dd5576a60c68',
  'x-ms-routing-request-id',
  'WESTUS2:20210401T185715Z:45a18a20-b27a-4304-8be9-dd5576a60c68',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Apr 2021 18:57:15 GMT',
  'Connection',
  'close'
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
  'dcb6aca3-3931-4a50-879b-56c1a8430200',
  'x-ms-ests-server',
  '2.1.11622.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AklEVY-UzkRHusop82WSHqN12iTZAgAAAGoO-NcOAAAA; expires=Sat, 01-May-2021 18:57:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Apr 2021 18:57:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1361'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:16 GMT',
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
  'Bearer realm="https://myregistry.azurecr.iooauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_read",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '12937857-a66e-451f-aa70-78765d9c4564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:16 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '78ed234f-5c45-4f03-8ab3-e73eed6d28c5',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:16 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '891d312a-b33a-4993-8eb5-564b8b7fbcd6',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.266667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-04-01T18:56:48.6062911Z","lastUpdateTime":"2021-04-01T18:56:48.6062911Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:16 GMT',
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
  'e65bedfb-7d34-4894-b084-0586d0ee5dde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:16 GMT',
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
  'Bearer realm="https://myregistry.azurecr.iooauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_read",error="invalid_token"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '4493bd61-973d-4159-8fc0-4fb4bb221d00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'fcfa41d8-064b-49f3-a6b2-137903503c46',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'ef516a80-c325-4fa2-8a7f-5002a7db94a8',
  'x-ms-ratelimit-remaining-calls-per-second',
  '165.983333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","imageSize":0,"createdTime":"2021-04-01T18:56:48.4948188Z","lastUpdateTime":"2021-04-01T18:56:48.4948188Z","mediaType":"application/vnd.docker.distribution.manifest.list.v2+json","tags":["test-delete","test1"],"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true},"references":[{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","architecture":"amd64","os":"linux"},{"digest":"sha256:e5785cb0c62cebbed4965129bae371f0589cadd6d84798fb58c2c5f9e237efd9","architecture":"arm","os":"linux"},{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","architecture":"arm","os":"linux"},{"digest":"sha256:963612c5503f3f1674f315c67089dee577d8cc6afc18565e0b4183ae355fb343","architecture":"arm64","os":"linux"},{"digest":"sha256:cb55d8f7347376e1ba38ca740904b43c9a52f66c7d2ae1ef1a0de1bc9f40df98","architecture":"386","os":"linux"},{"digest":"sha256:88b2e00179bd6c4064612403c8d42a13de7ca809d61fee966ce9e129860a8a90","architecture":"mips64le","os":"linux"},{"digest":"sha256:bb7ab0fa94fdd78aca84b27a1bd46c4b811051f9b69905d81f5f267fc6546a9d","architecture":"ppc64le","os":"linux"},{"digest":"sha256:e49abad529e5d9bd6787f3abeab94e09ba274fe34731349556a850b9aebbf7bf","architecture":"s390x","os":"linux"},{"digest":"sha256:b0408a0f1d74eced127a2658429f336ed8fa48e36d59878f155b19865e5dbd70","architecture":"amd64","os":"windows"}]}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 18:57:17 GMT',
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
  'fcaca7d6-2dde-4067-b718-7a4b25ba31d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
