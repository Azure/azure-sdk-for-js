let nock = require('nock');

module.exports.testInfo = {"container":"container156816839325107470","blob":"blob156816839367200385"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839325107470')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:53 GMT',
  'ETag',
  '"0x8D7365E8831D834"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb6005fd-401e-001c-6d47-68beeb000000',
  'x-ms-client-request-id',
  '25a2597b-fab1-466f-8a5d-ec16bc155792',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816839325107470')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '018932d0-d01e-0019-4447-684a94000000',
  'x-ms-client-request-id',
  'd0630925-b200-403b-b05c-214eb898bad3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:53 GMT' ]);

