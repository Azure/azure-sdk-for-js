let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816840614505103"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816840614505103')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fadfe48a-9003-001e-0347-68bc11000000',
  'x-ms-client-request-id',
  '330f3cb4-8b9a-49f1-b87f-5c52614f849c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:06 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816840614505103')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5eb95cc-4003-0017-2347-68a69f000000',
  'x-ms-client-request-id',
  '64ea1b94-0eb5-4e74-848e-dd1273eb74f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:06 GMT' ]);

