let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816836082003962"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816836082003962x0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a67dcf8-8003-0001-5f47-686701000000',
  'x-ms-client-request-id',
  '9edb6624-a0b7-43c4-a87a-d7bae2cbc2dd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:20 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816836082003962x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fadfb772-9003-001e-7647-68bc11000000',
  'x-ms-client-request-id',
  '8f008179-c212-4719-ad46-96799bbfd485',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:21 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816836082003962x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bdb0c35-9003-003c-5647-68d227000000',
  'x-ms-client-request-id',
  'f1b315f6-d7b4-41ba-a8e8-9927f77bab3e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:21 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816836082003962x3')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29c3bbc3-3003-0018-4547-684b69000000',
  'x-ms-client-request-id',
  '73f8a3ea-867c-4413-a552-acdaa738d2c0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:21 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Prefix>queue156816836082003962</Prefix><MaxResults>2</MaxResults><Queues><Queue><Name>queue156816836082003962x0</Name><Metadata><key>val</key></Metadata></Queue><Queue><Name>queue156816836082003962x1</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker>/fakestorageaccount/queue156816836082003962x2</NextMarker></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ea9c6c2-5003-004c-3747-68a1e3000000',
  'x-ms-client-request-id',
  'a54c1318-10ea-4d6f-9de6-9fe9892075a6',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:21 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Prefix>queue156816836082003962</Prefix><Marker>/fakestorageaccount/queue156816836082003962x2</Marker><MaxResults>10</MaxResults><Queues><Queue><Name>queue156816836082003962x2</Name><Metadata><key>val</key></Metadata></Queue><Queue><Name>queue156816836082003962x3</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker /></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b181cca-e003-0055-6347-688d8b000000',
  'x-ms-client-request-id',
  '92e46616-0902-40a4-8374-d4a9b7546dde',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:22 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816836082003962x0')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4534201-6003-000b-5447-687e88000000',
  'x-ms-client-request-id',
  '37dc7221-a12b-41be-9adf-c1751a89babd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:23 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816836082003962x1')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69a4fa25-a003-0052-5b47-687b0e000000',
  'x-ms-client-request-id',
  '83d846da-df83-403e-ac08-d3d7836e663c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:23 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816836082003962x2')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'db8eef22-4003-0035-1947-68c8a9000000',
  'x-ms-client-request-id',
  '3602a900-5a45-4faa-93fd-84ee6ce5736d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:23 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816836082003962x3')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9cbf9786-a003-0016-7b47-68a762000000',
  'x-ms-client-request-id',
  '44492e04-54e5-4826-8537-6942362e162d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:24 GMT' ]);

