let nock = require('nock');

module.exports.hash = "c6be3e1ca6c8e7d6a40db1b5a8899f2a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '8241061c-7e96-4c3a-82b8-0d4b2c902000',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Amuw07cbHLFHulOvO_5Nh8p12iTZAwAAAEDy9tcOAAAA; expires=Fri, 30-Apr-2021 22:44:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 31 Mar 2021 22:44:59 GMT',
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
  'Wed, 31 Mar 2021 22:44:59 GMT',
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
  '27233f56-46ff-4ed2-9605-4b0afe74c197',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:00 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'a8fe8dab-1d13-4985-b021-bbe394735195',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=registry%3Acatalog%3A*")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:00 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '105da252-c601-427b-b5f2-a9e3cfebe88f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/_catalog')
  .reply(200, {"repositories":null}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:00 GMT',
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
  '3953024b-3218-45a9-9791-24701c79ab40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/token', "grant_type=client_credentials&client_id=azure_client_id&resource=https%3A%2F%2Fmanagement.core.windows.net%2F&client_secret=azure_client_secret")
  .query(true)
  .reply(200, {"token_type":"Bearer","expires_in":"86399","ext_expires_in":"86399","expires_on":"1617317100","not_before":"1617230400","resource":"https://management.core.windows.net/","access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1468',
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
  '1520f7e5-6283-475e-b819-fe33d8505397',
  'x-ms-request-id',
  'f622de1b-0230-4058-971a-2a8f11c92300',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ap9eaI8uvw1HoOdVvyP4gKpI-ePCAQAAAGvy9tcOAAAA; expires=Fri, 30-Apr-2021 22:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; httponly',
  'Date',
  'Wed, 31 Mar 2021 22:45:00 GMT',
  'Connection',
  'close'
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
  '38be6293-b5a7-486b-8243-ce9618258e5b',
  'x-ms-correlation-request-id',
  '38be6293-b5a7-486b-8243-ce9618258e5b',
  'x-ms-routing-request-id',
  'WESTUS2:20210331T224500Z:38be6293-b5a7-486b-8243-ce9618258e5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 31 Mar 2021 22:45:00 GMT',
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
  'https://management.azure.com/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/WESTUS2/operationResults/registries-711ed451-ef1c-4b25-92e1-8a20cdaed881?api-version=2019-12-01-preview',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f6b8e8c3-9415-4e62-9985-7b9f9ed3ebe6',
  'x-ms-correlation-request-id',
  'f6b8e8c3-9415-4e62-9985-7b9f9ed3ebe6',
  'x-ms-routing-request-id',
  'WESTUS2:20210331T224501Z:f6b8e8c3-9415-4e62-9985-7b9f9ed3ebe6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 31 Mar 2021 22:45:00 GMT',
  'Connection',
  'close'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/subscription_id/providers/Microsoft.ContainerRegistry/locations/WESTUS2/operationResults/registries-711ed451-ef1c-4b25-92e1-8a20cdaed881')
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
  '9cc92024-8277-4727-a578-2650c786d985',
  'x-ms-correlation-request-id',
  '9cc92024-8277-4727-a578-2650c786d985',
  'x-ms-routing-request-id',
  'WESTUS2:20210331T224531Z:9cc92024-8277-4727-a578-2650c786d985',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 31 Mar 2021 22:45:31 GMT',
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
  'a9795b8d-ecda-4fc3-a07b-da780e182100',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Amuw07cbHLFHulOvO_5Nh8p12iTZBAAAAEDy9tcOAAAA; expires=Fri, 30-Apr-2021 22:45:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 31 Mar 2021 22:45:31 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:31 GMT',
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
  '08a0a454-0fef-4b6a-970d-ede3bb5d82ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'e72c6a26-fcb3-40e5-ae84-58632733ff3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'f60babf4-c6b3-4b92-9dbd-338f5988b887',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tags":[{"name":"test-delete","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-03-31T22:45:06.4600505Z","lastUpdateTime":"2021-03-31T22:45:06.4600505Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}},{"name":"test1","digest":"sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24","createdTime":"2021-03-31T22:45:04.3251053Z","lastUpdateTime":"2021-03-31T22:45:04.3251053Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}]}, [
  'Server',
  'openresty',
  'Date',
  'Wed, 31 Mar 2021 22:45:32 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '709',
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
  'a731c57c-98f4-4d2a-bb97-83019f2488b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
