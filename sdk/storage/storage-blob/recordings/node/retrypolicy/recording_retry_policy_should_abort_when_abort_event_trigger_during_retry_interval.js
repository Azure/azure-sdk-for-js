let nock = require('nock');

module.exports.testInfo = {"container":"container156816855983506335"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816855983506335')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:40 GMT',
  'ETag',
  '"0x8D7365EEB7C62ED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6530082-a01e-0034-4347-68c954000000',
  'x-ms-client-request-id',
  '77ab42b4-8a01-4f4f-81c8-fa6afa73043d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:39 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816855983506335')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b550de7-b01e-002b-3c47-681244000000',
  'x-ms-client-request-id',
  '4551d6f5-9efc-48c5-a7a3-8e832df540e5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:42 GMT' ]);

