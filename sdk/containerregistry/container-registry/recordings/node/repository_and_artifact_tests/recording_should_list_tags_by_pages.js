let nock = require('nock');

module.exports.hash = "18b81bb928f6edcd687781b6d52a05ff";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:00 GMT',
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
  '23e307b5-a5c3-4ccb-b1bd-b73d00c771ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'a2e15a45-d1c8-4c7d-8047-59a615cc2700',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlVaRLADfc1Bt9OLZk_AihhGOXJzCQAAAA-vVdgOAAAA; expires=Sun, 11-Jul-2021 19:23:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 19:23:00 GMT',
  'Content-Length',
  '1351'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/exchange', "grant_type=access_token&service=myregistry.azurecr.io&access_token=access_token")
  .reply(200, {"refresh_token":"sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  'e895d43e-98a7-4b15-a205-74c847786200',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.333333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  'c2eaa928-6468-43d4-8608-beb15e5d9d1a',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.316667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags')
  .query(true)
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tags":[{"name":"latest","digest":"sha256:5122f6204b6a3596e048758cabba3c46b1c937a46b5be6225b835d091b90e46c","createdTime":"2021-06-01T17:44:40.8107647Z","lastUpdateTime":"2021-06-01T17:44:40.8107647Z","signed":false,"quarantineState":"Passed","changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '419',
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
  'Link',
  '</acr/v1/library%2Fhello-world/_tags?last=latest&n=1&orderby=>; rel="next"',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  'd5d7b826-bd55-4455-9cf8-c350635e7864',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags')
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_read"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:01 GMT',
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
  'f5a20a85-d4c3-4886-a22a-e11f43f1f1b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "grant_type=refresh_token&service=myregistry.azurecr.io&refresh_token=sanitized.eyJleHAiOjg2NDAwMDAwMDAwMDB9.sanitized&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read")
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'X-Ms-Correlation-Request-Id',
  'bd6eb59e-7120-4a97-836e-c2811ece1235',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .get('/acr/v1/library%2Fhello-world/_tags')
  .query(true)
  .reply(200, {"registry":"myregistry.azurecr.io","imageName":"library/hello-world","tags":[{"name":"test-delete","digest":"sha256:930490f97e5b921535c153e0e7110d251134cc4b72bbb8133c6a5065cc68580d","createdTime":"2021-06-11T19:11:39.1851357Z","lastUpdateTime":"2021-06-11T19:19:17.7951835Z","signed":false,"changeableAttributes":{"deleteEnabled":true,"writeEnabled":true,"readEnabled":true,"listEnabled":true}}]}, [
  'Server',
  'openresty',
  'Date',
  'Fri, 11 Jun 2021 19:23:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '397',
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
  'Link',
  '</acr/v1/library%2Fhello-world/_tags?last=test-delete&n=1&orderby=>; rel="next"',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '780f358e-ad14-4c66-95c1-6c8cceff086a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
