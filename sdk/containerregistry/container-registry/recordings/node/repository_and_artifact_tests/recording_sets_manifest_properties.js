let nock = require('nock');

module.exports.hash = "f419bb95e36314a90a63ee5d57993f20";

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
  '0266bfab-019f-4dc1-8479-cdb67db10600',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AiWY3Kx3fvZElGiMFi-_2kh12iTZDQAAALO0K9gOAAAA; expires=Wed, 09-Jun-2021 23:12:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:12:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1361'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:07 GMT',
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
  '4769a9b5-163f-497c-a16f-c13e684bfcf1',
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
  '5426975d-5b90-4911-ac57-812dbdc27400',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiWY3Kx3fvZElGiMFi-_2kh12iTZDgAAALO0K9gOAAAA; expires=Wed, 09-Jun-2021 23:12:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:12:06 GMT',
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
  'Mon, 10 May 2021 23:12:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'decab59e-9779-479d-bb2a-f08ac609800d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '5a072fd2-d245-48d4-b862-f4de141bfc64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-05-10T23:10:47.853971Z","lastUpdateTime":"2021-05-10T23:10:47.853971Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineDetails":"{\"state\":\"Scan Failed\",\"link\":\"https://aka.ms/test\",\"scanner\":\"Azure Security Monitoring-Qualys Scanner\",\"result\":{\"version\":\"5/10/2021 11:11:07 PM\",\"summary\":[{\"severity\":\"High\",\"count\":0},{\"severity\":\"Medium\",\"count\":0},{\"severity\":\"Low\",\"count\":0}]}}","quarantineState":"Passed"}}}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '821',
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
  '8195e699-8dba-4c06-b4d9-af4effc7d8fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792', {"deleteEnabled":false,"writeEnabled":false,"listEnabled":false,"readEnabled":false})
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:08 GMT',
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
  'd000a81d-6e07-42b7-ab19-28a637210983',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'b9423c3f-598f-4701-a381-1292dc9d0e09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792', {"deleteEnabled":false,"writeEnabled":false,"listEnabled":false,"readEnabled":false})
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-05-10T23:10:47.853971Z","lastUpdateTime":"2021-05-10T23:10:47.853971Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":false,"writeEnabled":false,"readEnabled":false,"listEnabled":false,"quarantineDetails":"{\"state\":\"Scan Failed\",\"link\":\"https://aka.ms/test\",\"scanner\":\"Azure Security Monitoring-Qualys Scanner\",\"result\":{\"version\":\"5/10/2021 11:11:07 PM\",\"summary\":[{\"severity\":\"High\",\"count\":0},{\"severity\":\"Medium\",\"count\":0},{\"severity\":\"Low\",\"count\":0}]}}","quarantineState":"Passed"}}}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '825',
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
  'd5a2d9aa-aed6-400d-aa4d-92a94f9174a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792', {"deleteEnabled":true,"writeEnabled":true,"listEnabled":true,"readEnabled":true})
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:10 GMT',
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
  'c6d62cce-0d76-4268-bc06-3a90c96d8b10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '1afb53da-3a9f-4dc1-a5db-bdecc2ff69ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792', {"deleteEnabled":true,"writeEnabled":true,"listEnabled":true,"readEnabled":true})
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-05-10T23:10:47.853971Z","lastUpdateTime":"2021-05-10T23:10:47.853971Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineDetails":"{\"state\":\"Scan Failed\",\"link\":\"https://aka.ms/test\",\"scanner\":\"Azure Security Monitoring-Qualys Scanner\",\"result\":{\"version\":\"5/10/2021 11:11:07 PM\",\"summary\":[{\"severity\":\"High\",\"count\":0},{\"severity\":\"Medium\",\"count\":0},{\"severity\":\"Low\",\"count\":0}]}}","quarantineState":"Passed"}}}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '821',
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
  'd5abcc31-ed28-4001-b6c5-dfc9cf9fc32e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
