let nock = require('nock');

module.exports.testInfo = {"queue":"queue156599419673004582"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156599419673004582')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c83103d4-c003-00d6-7b81-54314b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:23:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156599419673004582')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e2ce7d-8003-001d-3681-54a37b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:23:16 GMT',
  'Connection',
  'close' ]);

