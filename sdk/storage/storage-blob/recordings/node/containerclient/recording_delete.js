let nock = require('nock');

module.exports.testInfo = {"container":"container156816840876303147"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816840876303147')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:09 GMT',
  'ETag',
  '"0x8D7365E916F68D0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc0aaeac-901e-003c-1f47-68d227000000',
  'x-ms-client-request-id',
  'c3ee5ec2-d95f-4bde-bab7-2116ad8537b3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:08 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816840876303147')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10728039-c01e-0024-3247-68ffb2000000',
  'x-ms-client-request-id',
  '0aaf5513-ca61-4cc6-90a7-9cbe9003abfd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:08 GMT' ]);

