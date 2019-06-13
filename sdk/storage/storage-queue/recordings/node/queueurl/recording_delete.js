let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029727292208950"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029727292208950')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fea23436-1003-007e-29b1-20e55e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029727292208950')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6494bae2-4003-0000-5eb1-207a91000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:33 GMT',
  'Connection',
  'close' ]);

