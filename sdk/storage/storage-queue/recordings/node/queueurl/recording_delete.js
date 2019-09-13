let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758134411206190"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758134411206190')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '373ea1ff-a003-000c-54f0-62608b000000',
  'x-ms-client-request-id',
  'fd30d394-be41-4a11-ad18-f6cc24037021',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758134411206190')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '157c1963-7003-00a6-43f0-62409d000000',
  'x-ms-client-request-id',
  'edfffb52-c3e0-4daf-8b05-0c76c97ac701',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:44 GMT',
  'Connection',
  'close' ]);

