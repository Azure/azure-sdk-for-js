let nock = require('nock');

module.exports.hash = "9bffdd9e78d97841b9f11917b9f35378";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world', {"deleteEnabled":false})
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:17 GMT',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_write"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '14ea2103-d3f8-4f4d-82e9-288d17885e1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .post('/oauth2/token', "service=myregistry.azurecr.io&scope=repository%3Alibrary%2Fhello-world%3Ametadata_write&refresh_token=&grant_type=password")
  .query(true)
  .reply(200, {"access_token":"access_token"}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'X-Ms-Correlation-Request-Id',
  '7ee112df-b7fd-4e9b-9260-9adfaee5d5a4',
  'x-ms-ratelimit-remaining-calls-per-second',
  '166.65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);

nock('https://myregistry.azurecr.io:443', {"encodedQueryParams":true})
  .patch('/acr/v1/library%2Fhello-world', {"deleteEnabled":false})
  .query(true)
  .reply(401, {"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for more information.","detail":[{"Type":"repository","Name":"library/hello-world","Action":"metadata_write"}]}]}, [
  'Server',
  'openresty',
  'Date',
  'Mon, 08 Nov 2021 20:10:17 GMT',
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
  'Bearer realm="https://myregistry.azurecr.io/oauth2/token",service="myregistry.azurecr.io",scope="repository:library/hello-world:metadata_write",error="insufficient_scope"',
  'X-Content-Type-Options',
  'nosniff',
  'X-Ms-Correlation-Request-Id',
  '2686d567-5612-4dce-8ec5-7a29ac91a5bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
