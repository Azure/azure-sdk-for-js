let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996389204501336"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996389204501336')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f655222-9003-009a-54a8-1d119d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996389204501336')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3870ecb-2003-0066-79a8-1d2f02000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:11 GMT',
  'Connection',
  'close' ]);

