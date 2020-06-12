let nock = require('nock');

module.exports.hash = "451c6fd62c81383c6e0cce46649063e6";

module.exports.testInfo = {"uniqueName":{"container":"container158459901405902088","blob":"blob158459901430407722","appendblob":"appendblob158459901478704253","pageblob":"pageblob158459901502809947"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901405902088')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:34 GMT',
  'ETag',
  '"0x8D7CBCE0D395269"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e51d6-b01e-0088-23b6-fd3fcb000000',
  'x-ms-client-request-id',
  'a860ac66-29b6-44a1-8fed-9444239e0645',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901405902088/blob158459901430407722', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:34 GMT',
  'ETag',
  '"0x8D7CBCE0D5E8CEE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8b95-701e-005c-79b6-fd8f9a000000',
  'x-ms-client-request-id',
  '758156ed-19ca-4cbc-90ac-d3233809b027',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:34.4226312Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901405902088/blob158459901430407722')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:34 GMT',
  'ETag',
  '"0x8D7CBCE0D83A7E4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e526b-b01e-0088-25b6-fd3fcb000000',
  'x-ms-client-request-id',
  '983e5e09-80f1-4347-aeed-2f9aaef9eabc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:34.6658036Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901405902088/appendblob158459901478704253')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:34 GMT',
  'ETag',
  '"0x8D7CBCE0DA89BC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8c3b-701e-005c-0eb6-fd8f9a000000',
  'x-ms-client-request-id',
  'f74f7cb5-8987-4250-a54a-a8b48ba25e63',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:34.9069761Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901405902088/pageblob158459901502809947')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:35 GMT',
  'ETag',
  '"0x8D7CBCE0DCD6884"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5321-b01e-0088-46b6-fd3fcb000000',
  'x-ms-client-request-id',
  'c030965b-1792-4fe5-8ac7-aa7d620bd50e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:35.1481476Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901405902088')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8d21-701e-005c-5ab6-fd8f9a000000',
  'x-ms-client-request-id',
  'c1122fe5-8e67-403e-ada5-0d683341ca80',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:34 GMT'
]);
