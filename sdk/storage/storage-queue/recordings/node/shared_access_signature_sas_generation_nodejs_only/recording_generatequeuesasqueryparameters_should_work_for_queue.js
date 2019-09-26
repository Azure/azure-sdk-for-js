let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-04T07:16:20.361Z","tmr":"2019-09-04T07:16:20.361Z","queue":"queue156758138036100997"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758138036100997')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd1e2b12-a003-0103-52f0-62e8ea000000',
  'x-ms-client-request-id',
  '4151105b-8ab8-4e8d-aad3-7e60cd34e6de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758138036100997')
  .query(true)
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1f4f8fa-6003-00d8-12f0-62d0da000000',
  'x-ms-client-request-id',
  '55dc5771-af55-4550-ae97-002982bb9adf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-approximate-messages-count',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758138036100997')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a705b86-c003-0115-5ef0-621e3d000000',
  'x-ms-client-request-id',
  'bf086b63-a30d-4112-8926-78f1325ad530',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:20 GMT',
  'Connection',
  'close' ]);

