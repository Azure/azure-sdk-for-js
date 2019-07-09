let nock = require('nock');

module.exports.testInfo = {"queue":"queue156266528644904191"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156266528644904191')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '38c26d4b-5003-0052-523a-362364000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156266528644904191')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '108e95b3-2003-003b-313a-367cc8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:02 GMT',
  'Connection',
  'close' ]);

