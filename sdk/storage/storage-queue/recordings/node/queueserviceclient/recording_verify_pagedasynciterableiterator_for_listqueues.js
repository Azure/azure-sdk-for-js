let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816835236506133"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816835236506133x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0caea595-d003-0012-5847-6852e0000000',
  'x-ms-client-request-id',
  '57a492e3-4113-4880-839d-0ea63f7b2055',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:12 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816835236506133x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8da71f2a-5003-0047-2047-68b997000000',
  'x-ms-client-request-id',
  '9bc83719-6697-4c2c-824b-2d59f30fa18b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:12 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Prefix>queue156816835236506133</Prefix><Queues><Queue><Name>queue156816835236506133x1</Name><Metadata><key>val</key></Metadata></Queue><Queue><Name>queue156816835236506133x2</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker /></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95b6dfa4-c003-0006-1047-689184000000',
  'x-ms-client-request-id',
  '56eefec7-ac80-41c2-8d84-433de33b9bcd',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:13 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816835236506133x1')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e39da765-f003-000e-1f47-688af7000000',
  'x-ms-client-request-id',
  '4dad8454-0df7-4f53-a18b-a2ce26b007eb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:13 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816835236506133x2')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78a07d6e-6003-0044-0447-68ba90000000',
  'x-ms-client-request-id',
  'be92487f-a3d8-4a1e-a364-f70fc153cfe3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:14 GMT' ]);

