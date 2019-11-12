let nock = require('nock');

module.exports.testInfo = {"container":"container156816828935808795"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828935808795')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:09 GMT',
  'ETag',
  '"0x8D7365E4A443552"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7bc8110-301e-005c-3c47-689705000000',
  'x-ms-client-request-id',
  'f68c0971-b8ab-4558-998b-bb3a664ed599',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:09 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816828935808795')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6ec4b46-601e-0029-3247-6810be000000',
  'x-ms-client-request-id',
  '17865048-cfdb-4652-b7e0-69de2a2d50b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:09 GMT' ]);

