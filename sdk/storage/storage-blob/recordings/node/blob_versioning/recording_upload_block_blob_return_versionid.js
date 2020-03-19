let nock = require('nock');

module.exports.hash = "c3f7171fc37c565be96c4886a01aeb79";

module.exports.testInfo = {"uniqueName":{"container":"container158459901551208800","blob":"blob158459901575305766"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901551208800')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:35 GMT',
  'ETag',
  '"0x8D7CBCE0E16E264"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e53c7-b01e-0088-57b6-fd3fcb000000',
  'x-ms-client-request-id',
  '54572add-57d1-43f1-a53d-10285dab39a3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901551208800/blob158459901575305766', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:35 GMT',
  'ETag',
  '"0x8D7CBCE0E3BA7BE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8e08-701e-005c-2fb6-fd8f9a000000',
  'x-ms-client-request-id',
  'ef32afdb-4217-441f-b9a4-e3dc9e30c746',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:35.8706622Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901551208800/blob158459901575305766')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:36 GMT',
  'ETag',
  '"0x8D7CBCE0E6137ED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5477-b01e-0088-73b6-fd3fcb000000',
  'x-ms-client-request-id',
  '94e6dc5e-a2af-4077-bc38-7267e1d077a3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:36.1178365Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459901551208800/blob158459901575305766', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:36 GMT',
  'ETag',
  '"0x8D7CBCE0E86C816"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8f29-701e-005c-39b6-fd8f9a000000',
  'x-ms-client-request-id',
  '7bc516fc-9a82-49d9-a1fb-30af2a644ec9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:36.3640102Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459901551208800')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e5517-b01e-0088-07b6-fd3fcb000000',
  'x-ms-client-request-id',
  '56381488-cecc-4669-9ac6-fb8680910163',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:36 GMT'
]);
