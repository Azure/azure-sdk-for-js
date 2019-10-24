let nock = require('nock');

module.exports.testInfo = {"share":"share157022255416704432","dir":"dir157022255485507020"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157022255416704432')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 20:55:54 GMT',
  'ETag',
  '"0x8D7490D3FA6759A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67263a96-d01a-0030-48f6-7a3cd6000000',
  'x-ms-client-request-id',
  'df229662-77ce-44b9-908d-93eeb2b399ec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 20:55:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157022255416704432/dir157022255485507020')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 20:55:55 GMT',
  'ETag',
  '"0x8D7490D3FEFA5A6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3deed4e0-101a-0069-34f6-7a3950000000',
  'x-ms-client-request-id',
  '26646a9a-9b4a-46ad-8bba-73e2398ae2b2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-04T20:55:55.2287142Z',
  'x-ms-file-last-write-time',
  '2019-10-04T20:55:55.2287142Z',
  'x-ms-file-creation-time',
  '2019-10-04T20:55:55.2287142Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 04 Oct 2019 20:55:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157022255416704432')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc130cc5-c01a-0049-6cf6-7a559c000000',
  'x-ms-client-request-id',
  'b06ada73-12ad-4ad6-9d00-5a99386e3180',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 20:55:54 GMT' ]);

