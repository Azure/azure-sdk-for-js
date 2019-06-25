let nock = require('nock');

module.exports.testInfo = {"dir empty":"dir empty156150566215102798","file empty":"file empty156150566251305521"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156150566185403878/dir%20empty156150566215102798')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:34:22 GMT',
  'ETag',
  '"0x8D6F9C5A6F60BAA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1454c835-201a-007d-49ae-2be659000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:34:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156150566185403878/dir%20empty156150566215102798/file%20empty156150566251305521')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:34:22 GMT',
  'ETag',
  '"0x8D6F9C5A72428EF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '292f763b-601a-0053-3cae-2b669e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:34:21 GMT',
  'Connection',
  'close' ]);

