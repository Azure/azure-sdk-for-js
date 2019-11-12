let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816834850103187"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834850103187')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '177bccc6-1003-0026-2c47-68fd48000000',
  'x-ms-client-request-id',
  '8be5a451-3700-4fd0-b592-8e984166491a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:08 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816834850103187')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '177bcd88-1003-0026-6247-68fd48000000',
  'x-ms-client-request-id',
  '761b3435-cb3d-4722-b140-e26e0f105c79',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:08 GMT' ]);

