let nock = require('nock');

module.exports.testInfo = {"container":"container156816828499605069","blob":"blob156816828541508246"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828499605069')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:05 GMT',
  'ETag',
  '"0x8D7365E47AAF005"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd971196d-501e-004c-5447-68a1e3000000',
  'x-ms-client-request-id',
  '9dc5e5fe-261b-441f-8d01-c441d799648d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:04 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816828499605069')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7bc7c2b-301e-005c-5e47-689705000000',
  'x-ms-client-request-id',
  '8e74e634-cc7e-418d-adc9-2ff4b929fd4d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:05 GMT' ]);

