let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758129289700289"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758129289700289')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3fdec99c-4003-0092-3ff0-627355000000',
  'x-ms-client-request-id',
  '3d5fac8d-38f8-4497-9a18-362899e40d3d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758129289700289')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5f52509-c003-0057-30f0-6259b0000000',
  'x-ms-client-request-id',
  'e96b612d-3f43-4763-baf5-82071d2e8cbb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:53 GMT',
  'Connection',
  'close' ]);

