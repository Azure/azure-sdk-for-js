let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816833998709123"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816833998709123')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5a69bd3-c003-000d-1b47-6889f0000000',
  'x-ms-client-request-id',
  '78c8ef43-6471-4bb7-8979-964da223463b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816833998709123')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9cbf7adf-a003-0016-4f47-68a762000000',
  'x-ms-client-request-id',
  'dc05cf54-3685-40ec-b4a1-eb9c75813479',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:00 GMT' ]);

