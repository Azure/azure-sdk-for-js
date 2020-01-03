let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816827694108683"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816827694108683')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3201e5d0-c003-0049-6b47-68559c000000',
  'x-ms-client-request-id',
  'c51649a7-01da-48df-ac2b-b8cca0d340b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:56 GMT' ]);

