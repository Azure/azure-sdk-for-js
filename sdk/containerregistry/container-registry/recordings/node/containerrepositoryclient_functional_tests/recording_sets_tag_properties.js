let nock = require('nock');

module.exports.hash = "65e926e34f2a65002879e4591b8b16f6";

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
  'c189df1f-4e17-4cf4-aed3-163708590900',
  'x-ms-ests-server',
  '2.1.11622.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnrASb4gcKZCjvJY8y4LgAJ12iTZAQAAADBD-NcOAAAA; expires=Sat, 01-May-2021 22:41:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Apr 2021 22:41:52 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"registry","Name":"catalog","Action":"*"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:41:52 GMT',
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
  '13398de4-eff6-409a-878d-13126602415a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:41:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '09072bef-39e5-4580-9f6f-bfe9e566837b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:41:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'ad219379-c5a1-4dd5-b079-e36bbb3bfd07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(200, {"repositories":null}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:41:54 GMT',
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
  'bc6184fd-5912-4f49-85ef-7284ef74497c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/token', "grant_type=client_credentials&client_id=azure_client_id&resource=https%3A%2F%2Fmanagement.core.windows.net%2F&client_secret=azure_client_secret")
  .query(true)
  .reply(200, {"token_type":"Bearer","expires_in":"86399","ext_expires_in":"86399","expires_on":"1617403321","not_before":"1617316621","resource":"https://management.core.windows.net/","access_token":"access_token"}, [
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
  '0f538547-1bf4-40f6-b713-6647039d0a77',
  'x-ms-request-id',
  '67bc55a2-740c-4019-b837-e181f6b60700',
  'x-ms-ests-server',
  '2.1.11622.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnRuDHFYzz5IuOKsBadnCQlI-ePCAQAAADlD-NcOAAAA; expires=Sat, 01-May-2021 22:42:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; httponly',
  'Date',
  'Thu, 01 Apr 2021 22:42:01 GMT',
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
  '20ca454e-8761-497e-a0f1-c76de39f763b',
  'x-ms-correlation-request-id',
  '20ca454e-8761-497e-a0f1-c76de39f763b',
  'x-ms-routing-request-id',
  'WESTUS2:20210401T224202Z:20ca454e-8761-497e-a0f1-c76de39f763b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Apr 2021 22:42:01 GMT',
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
  'https://management.azure.com/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/CENTRALUS/operationResults/registries-d331b3b6-819c-472e-aeaf-3cf95c312e06?api-version=2019-12-01-preview',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56a56b43-b6d4-4496-b94c-708537e5b8ee',
  'x-ms-correlation-request-id',
  '56a56b43-b6d4-4496-b94c-708537e5b8ee',
  'x-ms-routing-request-id',
  'WESTUS2:20210401T224202Z:56a56b43-b6d4-4496-b94c-708537e5b8ee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Apr 2021 22:42:02 GMT',
  'Connection',
  'close'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/CENTRALUS/operationResults/registries-d331b3b6-819c-472e-aeaf-3cf95c312e06')
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
  '3dd8bd8a-e3a8-42e1-b3ca-ef6a8f7701ff',
  'x-ms-correlation-request-id',
  '3dd8bd8a-e3a8-42e1-b3ca-ef6a8f7701ff',
  'x-ms-routing-request-id',
  'WESTUS2:20210401T224233Z:3dd8bd8a-e3a8-42e1-b3ca-ef6a8f7701ff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Apr 2021 22:42:33 GMT',
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
  '955ca94f-d590-46c5-a2e9-e93b70820900',
  'x-ms-ests-server',
  '2.1.11622.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnrASb4gcKZCjvJY8y4LgAJ12iTZAgAAADBD-NcOAAAA; expires=Sat, 01-May-2021 22:42:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 01 Apr 2021 22:42:50 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:42:51 GMT',
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
  '96b98294-002c-4cd5-b51b-4cf247c06135',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:42:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'd87fa999-2330-4ab4-88d9-7f56c7480b7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:42:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '75d918aa-295b-4710-b701-d4f8a2b915cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-04-01T22:42:07.4417462Z","lastUpdateTime":"2021-04-01T22:42:07.4417462Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:42:52 GMT',
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
  'b138c210-460b-4a41-8993-07535fc7cc24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_tags/test1', {"deleteEnabled":false,"writeEnabled":false,"listEnabled":false,"readEnabled":false})
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:05 GMT',
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
  '58f05ec0-56a5-4bdf-886a-fe3dd41075b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'ff16dd51-2d71-4647-aef4-33875a16b605',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'e10b55c0-5d79-45d0-9469-681eec34448c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_tags/test1', {"deleteEnabled":false,"writeEnabled":false,"listEnabled":false,"readEnabled":false})
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-04-01T22:42:07.4417462Z","lastUpdateTime":"2021-04-01T22:42:07.4417462Z","signed":false,"changeableAttributes":{"deleteEnabled":false,"writeEnabled":false,"readEnabled":false,"listEnabled":false}}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:06 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '392',
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
  '3ca40d9b-f1ad-46c4-90ee-74067eeca18e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:06 GMT',
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
  'fa4b73a0-3845-44e9-9a79-9420800ee322',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:06 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '7aa37fc2-6a35-460c-882c-560cd0dec2f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '81a3d52c-5891-464b-86f9-8e265bd7fb04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags/test1')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-04-01T22:42:07.4417462Z","lastUpdateTime":"2021-04-01T22:42:07.4417462Z","signed":false,"changeableAttributes":{"deleteEnabled":false,"writeEnabled":false,"readEnabled":false,"listEnabled":false}}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '392',
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
  'b60e1a18-941a-4efd-b1d6-0e7924417aa1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_tags/test1', {"deleteEnabled":true,"writeEnabled":true,"listEnabled":true,"readEnabled":true})
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:17 GMT',
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
  '91175199-368c-4eaf-b280-abc441554707',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'f780f960-4890-4f5e-b12a-5d50e1efae02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '4683e30b-82d5-4e67-9c82-8b9cfa896ba0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_tags/test1', {"deleteEnabled":true,"writeEnabled":true,"listEnabled":true,"readEnabled":true})
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tag":{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-04-01T22:42:07.4417462Z","lastUpdateTime":"2021-04-01T22:42:07.4417462Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}}, [
  'Server',
  'openresty',
  'Date',
  'Thu, 01 Apr 2021 22:43:18 GMT',
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
  '99073641-1af0-4374-8238-6b9d49123d60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
