let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816837405805707"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816837405805707')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bdb1571-9003-003c-4447-68d227000000',
  'x-ms-client-request-id',
  '6f53c5e0-c5da-44e8-a9c3-59df6c402554',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:33 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816837405805707')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b182e89-e003-0055-1647-688d8b000000',
  'x-ms-client-request-id',
  'afde528d-b944-4f13-9423-a8449b1b5b03',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:36 GMT' ]);

