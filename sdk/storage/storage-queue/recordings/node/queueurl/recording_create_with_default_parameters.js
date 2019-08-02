let nock = require('nock');

module.exports.testInfo = {"queue":"queue156404672150905412"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156404672150905412')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31041325-2003-0134-6bca-42d76b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156404672150905412')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '047ecfb1-4003-00ec-30ca-4236ef000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:43 GMT',
  'Connection',
  'close' ]);

