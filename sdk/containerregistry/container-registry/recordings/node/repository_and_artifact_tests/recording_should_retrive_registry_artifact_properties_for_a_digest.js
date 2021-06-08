let nock = require('nock');

module.exports.hash = "60e74ab8e3223d009ad58cf900091d80";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '4182c83c-94a0-4547-94b5-1071399a0000',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiSsWWVRlshFlSAUqhHbMGh12iTZFAAAAKxiQ9gOAAAA; expires=Sun, 27-Jun-2021 22:16:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 28 May 2021 22:16:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1361'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1')
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 28 May 2021 22:16:38 GMT',
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
  '9cd9cbe6-a892-4da0-bd07-64356d6a8819',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'e726e29a-b6c3-4e9d-b3a0-ee1323a10300',
  'x-ms-ests-server',
  '2.1.11722.26 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiSsWWVRlshFlSAUqhHbMGh12iTZFAAAAKxiQ9gOAAAA; expires=Sun, 27-Jun-2021 22:16:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 28 May 2021 22:16:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1361'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 28 May 2021 22:16:38 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '331c04dd-47e9-435d-b4a3-f0b61f45a9a1',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.583333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 28 May 2021 22:16:39 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '9a3d3132-5667-4673-b74b-9d922e43ba8e',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_manifests/sha256%3A50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1')
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","manifest":{"digest":"sha256:50b8560ad574c779908da71f7ce370c0a2471c098d44d1c8f6b513c5a55eeeb1","imageSize":525,"createdTime":"2021-05-28T17:15:15.4118286Z","lastUpdateTime":"2021-05-28T17:15:15.4118286Z","architecture":"arm","os":"linux","mediaType":"application/vnd.docker.distribution.manifest.v2+json","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true,"quarantineDetails":"{\"state\":\"Scan Failed\",\"link\":\"https://aka.ms/test\",\"scanner\":\"Azure Security Monitoring-Qualys Scanner\",\"result\":{\"version\":\"5/28/2021 10:14:59 PM\",\"summary\":[{\"severity\":\"High\",\"count\":0},{\"severity\":\"Medium\",\"count\":0},{\"severity\":\"Low\",\"count\":0}]}}","quarantineState":"Passed"}}}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 28 May 2021 22:16:39 GMT',
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
  '6e820653-46d7-4095-a2f5-0bf6a52a8832',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
