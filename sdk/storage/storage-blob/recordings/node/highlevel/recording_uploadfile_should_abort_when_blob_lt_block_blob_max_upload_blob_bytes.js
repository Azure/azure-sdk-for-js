let nock = require('nock');

module.exports.testInfo = {"container":"container156816867731604046","blob":"blob156816867774708647"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816867731604046')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:37 GMT',
  'ETag',
  '"0x8D7365F31844E74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbeda578-701e-001f-4048-68bdec000000',
  'x-ms-client-request-id',
  'ba9dc53f-893d-4022-8a95-cb6e9b5f0f5d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:37 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816867731604046')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64cf3f61-601e-0066-0448-68d4a6000000',
  'x-ms-client-request-id',
  '7c273608-db5b-4a80-a662-67f5f58d0a5c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:37 GMT' ]);

