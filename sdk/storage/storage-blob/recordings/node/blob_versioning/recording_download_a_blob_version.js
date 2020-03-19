let nock = require('nock');

module.exports.hash = "14cd8d7d4719c90f047013bf0b362ab3";

module.exports.testInfo = {"uniqueName":{"container":"container158459899682603969","blob":"blob158459899706506390"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899682603969')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:16 GMT',
  'ETag',
  '"0x8D7CBCE02F36EB9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3b03-b01e-0088-34b6-fd3fcb000000',
  'x-ms-client-request-id',
  '9f53a13f-8b77-4d1e-b43e-08062e3c7e2c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899682603969/blob158459899706506390', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'ETag',
  '"0x8D7CBCE031944A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3b75-b01e-0088-0cb6-fd3fcb000000',
  'x-ms-client-request-id',
  '57b8615a-c595-4102-9350-4c81ac2e41f8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:17.1903654Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899682603969/blob158459899706506390')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'ETag',
  '"0x8D7CBCE033D9C26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3ba8-b01e-0088-3bb6-fd3fcb000000',
  'x-ms-client-request-id',
  'fd165d94-759f-4e75-91b8-aa878d80d658',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:17.4295350Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158459899682603969/blob158459899706506390')
  .query(true)
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE031944A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3bee-b01e-0088-79b6-fd3fcb000000',
  'x-ms-client-request-id',
  'eb8342c3-7ec5-46e8-aca3-d0a0630380c1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:17.1903654Z',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158459899682603969/blob158459899706506390')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE033D9C26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3c2d-b01e-0088-2fb6-fd3fcb000000',
  'x-ms-client-request-id',
  '10fb02c8-bf66-4be5-bfef-b7f5ea6ca9c5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:17.4295350Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459899682603969/blob158459899706506390')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE031944A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3c7a-b01e-0088-75b6-fd3fcb000000',
  'x-ms-client-request-id',
  '5db15ebf-43c7-40ca-8024-490585102ad3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:17.1903654Z',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158459899682603969/blob158459899706506390')
  .query(true)
  .reply(206, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-10/11',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE031944A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3cc1-b01e-0088-38b6-fd3fcb000000',
  'x-ms-client-request-id',
  '58e8105e-358e-4f32-ad02-95e5f567a9a6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:17.1903654Z',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:17 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459899682603969')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3d17-b01e-0088-03b6-fd3fcb000000',
  'x-ms-client-request-id',
  'a419de47-975b-4fa2-b87f-b57421f28c89',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:18 GMT'
]);
