let nock = require('nock');

module.exports.testInfo = {"share":"share157022255575302964","dir":"dir157022255629508316","file":"file157022255688402170"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157022255575302964')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 20:55:56 GMT',
  'ETag',
  '"0x8D7490D408648A7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aef7e74d-001a-0039-6cf6-7a2658000000',
  'x-ms-client-request-id',
  '0e4c4ec2-94ad-4d10-8282-0bba3311a1aa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 20:55:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157022255575302964/dir157022255629508316')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 20:55:56 GMT',
  'ETag',
  '"0x8D7490D40DF6126"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ddaa8e4-b01a-0009-25f6-7a7c72000000',
  'x-ms-client-request-id',
  '92a49ed1-41f2-4062-ac9d-0cd7c7c6e258',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-04T20:55:56.7998246Z',
  'x-ms-file-last-write-time',
  '2019-10-04T20:55:56.7998246Z',
  'x-ms-file-creation-time',
  '2019-10-04T20:55:56.7998246Z',
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
  'Fri, 04 Oct 2019 20:55:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157022255575302964')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08da50ef-901a-0051-09f6-7a7809000000',
  'x-ms-client-request-id',
  '4c856245-cda2-4609-8e13-735cf71a1b95',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 20:55:56 GMT' ]);

