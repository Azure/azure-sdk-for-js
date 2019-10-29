let nock = require('nock');

module.exports.testInfo = {"share":"share156816847432502605"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816847432502605')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:14 GMT',
  'ETag',
  '"0x8D7365EB882BB85"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc18c6f-b01a-0064-2147-68d65c000000',
  'x-ms-client-request-id',
  '45336da7-5852-4aaf-8b63-f853a7c3f618',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:13 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816847432502605')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f431eadf-201a-006a-0347-683a57000000',
  'x-ms-client-request-id',
  '1ffe191b-8a5f-41f1-bbd0-47db7941fa0c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:14 GMT' ]);

