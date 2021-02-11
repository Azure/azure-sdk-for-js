let nock = require('nock');

module.exports.hash = "f704b5dcd1c546c6f4f50313162c61c3";

module.exports.testInfo = {"uniqueName":{"container":"container158471578931806353","blob":"blob158471579109309092"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471578931806353')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Mar 2020 14:49:50 GMT',
  'ETag',
  '"0x8D7CCDDF17A45A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f2d5-901e-0054-20c6-fe9595000000',
  'x-ms-client-request-id',
  '2f99cd47-c510-49f5-a983-1df5c8624b2d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 14:49:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471578931806353/blob158471579109309092', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 14:49:51 GMT',
  'ETag',
  '"0x8D7CCDDF1D974B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f395-901e-0054-3cc6-fe9595000000',
  'x-ms-client-request-id',
  'f529905c-b10d-401f-9517-fba0b651d652',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T14:49:51.3613494Z',
  'Date',
  'Fri, 20 Mar 2020 14:49:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471578931806353/blob158471579109309092')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 20 Mar 2020 14:49:52 GMT',
  'ETag',
  '"0x8D7CCDDF2630918"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f4e8-901e-0054-6bc6-fe9595000000',
  'x-ms-client-request-id',
  'ee33a835-5520-4e67-ad27-d3db046a380e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T14:49:52.2639912Z',
  'Date',
  'Fri, 20 Mar 2020 14:49:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158471578931806353/blob158471579109309092')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f5f1-901e-0054-56c6-fe9595000000',
  'x-ms-client-request-id',
  '4330c16a-03e1-4fee-a6aa-e44f79d76e79',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 20 Mar 2020 14:49:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158471578931806353')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f62f-901e-0054-08c6-fe9595000000',
  'x-ms-client-request-id',
  '07ff1691-d8fa-4c81-9196-9d15f0591b7b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 14:49:53 GMT'
]);
