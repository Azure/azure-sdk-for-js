let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049909145605269"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049909145605269')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '60006401-4003-007e-5279-7dafb9000000',
  'x-ms-client-request-id',
  'd824dbcf-2bb7-425e-acec-598646a650dc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049909145605269')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bc4c8d6-4003-013e-4b79-7dc002000000',
  'x-ms-client-request-id',
  '0c0380ae-c586-45ef-a336-8b4c10637801',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:50 GMT',
  'Connection',
  'close' ]);

