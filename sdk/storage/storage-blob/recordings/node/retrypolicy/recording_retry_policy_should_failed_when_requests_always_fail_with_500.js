let nock = require('nock');

module.exports.testInfo = {"container":"container156816856267401402"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816856267401402')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:43 GMT',
  'ETag',
  '"0x8D7365EED2CFCBA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7e0c1c3-501e-002a-3347-6813b9000000',
  'x-ms-client-request-id',
  '5b6ec28b-8ebc-4e6a-a703-c3ca83e2cba1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:42 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816856267401402')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b6412cb-801e-0001-7047-686701000000',
  'x-ms-client-request-id',
  '44419a29-0fa3-4575-84fc-1899c302e4b5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:47 GMT' ]);

