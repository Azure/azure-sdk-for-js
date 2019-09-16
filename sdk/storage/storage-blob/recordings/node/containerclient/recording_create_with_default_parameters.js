let nock = require('nock');

module.exports.testInfo = {"container":"container156816840629303613"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816840629303613')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:06 GMT',
  'ETag',
  '"0x8D7365E8FF5D8CD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66b13acc-f01e-004a-6947-68569b000000',
  'x-ms-client-request-id',
  '74613523-6490-448e-946a-a0dc9a1dd9c1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:06 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816840629303613')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b504b5d-b01e-0002-2a47-686406000000',
  'x-ms-client-request-id',
  'a107de50-3c54-4f72-8704-f37492990889',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:06 GMT' ]);

