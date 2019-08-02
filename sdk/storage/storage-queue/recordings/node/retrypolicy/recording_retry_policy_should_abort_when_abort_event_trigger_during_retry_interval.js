let nock = require('nock');

module.exports.testInfo = {"queue":"queue156404672818502458"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156404672818502458')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78edb0bd-c003-009b-2eca-42b3ae000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156404672818502458')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0618d451-4003-0106-66ca-428fbb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:52 GMT',
  'Connection',
  'close' ]);

