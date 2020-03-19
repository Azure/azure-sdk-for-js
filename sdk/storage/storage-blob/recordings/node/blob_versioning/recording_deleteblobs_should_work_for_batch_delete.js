let nock = require('nock');

module.exports.hash = "6f6a281fc76eb2011a24cc4f8e8e5fd5";

module.exports.testInfo = {"uniqueName":{"container":"container158459900270600707","blob":"blob158459900294706388"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900270600707')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:22 GMT',
  'ETag',
  '"0x8D7CBCE0674D411"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4286-b01e-0088-1ab6-fd3fcb000000',
  'x-ms-client-request-id',
  '2fcf3631-70a9-4f23-a03d-6d0a46ee940d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900270600707/blob158459900294706388', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:23 GMT',
  'ETag',
  '"0x8D7CBCE069A354C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e42c7-b01e-0088-55b6-fd3fcb000000',
  'x-ms-client-request-id',
  '30e1ee1b-1578-4702-a037-00e61e37c0a5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:23.0685516Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900270600707/blob158459900294706388')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:23 GMT',
  'ETag',
  '"0x8D7CBCE06BF503D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4338-b01e-0088-39b6-fd3fcb000000',
  'x-ms-client-request-id',
  'abef7945-21b5-4064-9ea3-68cc2ca62275',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:23.3127245Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:23 GMT'
]);
