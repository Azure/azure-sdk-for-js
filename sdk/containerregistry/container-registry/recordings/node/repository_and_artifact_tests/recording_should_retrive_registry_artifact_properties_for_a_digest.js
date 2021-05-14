let nock = require('nock');

module.exports.hash = "60e74ab8e3223d009ad58cf900091d80";

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
  '0d36e83b-0546-4e28-8e0a-2e6322b70700',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiWY3Kx3fvZElGiMFi-_2kh12iTZFAAAALO0K9gOAAAA; expires=Wed, 09-Jun-2021 23:12:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:12:19 GMT',
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
  'Mon, 10 May 2021 23:12:20 GMT',
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
  '82963a62-dc88-468d-87c4-d997820d7287',
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
  'b78ca070-cf13-40cd-9b8f-3ef2bcce0600',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiWY3Kx3fvZElGiMFi-_2kh12iTZFAAAALO0K9gOAAAA; expires=Wed, 09-Jun-2021 23:12:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 23:12:19 GMT',
  'Connection',
  'close'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"refresh_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:21 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  'df8f580d-cdcc-4747-b6b6-f345bcc5a753',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=refresh_token&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:21 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '74b366ce-c8ab-418a-814c-68c598d35e4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792","imageSize":525,"createdTime":"2021-05-10T23:10:47.853971Z","lastUpdateTime":"2021-05-10T23:10:47.853971Z","architecture":"amd64","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineDetails":"{\"state\":\"Scan Failed\",\"link\":\"https://aka.ms/test\",\"scanner\":\"Azure Security Monitoring-Qualys Scanner\",\"result\":{\"version\":\"5/10/2021 11:11:07 PM\",\"summary\":[{\"severity\":\"High\",\"count\":0},{\"severity\":\"Medium\",\"count\":0},{\"severity\":\"Low\",\"count\":0}]}}","quarantineState":"Passed"}}}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 10 May 2021 23:12:21 GMT',
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
  '17176293-68d2-4632-9f7c-48e8cfd1f9d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
