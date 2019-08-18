let nock = require('nock');

module.exports.testInfo = {"queue":"queue156599422587202920"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156599422587202920')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5a2231c-7003-00a9-3181-54af79000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:23:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156599422587202920')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ae923e4a-f003-00de-0d81-542a38000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:23:51 GMT',
  'Connection',
  'close' ]);

