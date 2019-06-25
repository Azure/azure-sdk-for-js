let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty156150566283402389","Upper_another":"Upper_another156150566313109069"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156150566185403878/Dir%20empty156150566283402389')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:34:23 GMT',
  'ETag',
  '"0x8D6F9C5A754DEB9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00668e04-501a-009c-39ae-2b012c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:34:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156150566185403878/Dir%20empty156150566283402389/Upper_another156150566313109069')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:34:23 GMT',
  'ETag',
  '"0x8D6F9C5A783985F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5147174e-401a-0000-0fae-2b7a91000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:34:23 GMT',
  'Connection',
  'close' ]);

