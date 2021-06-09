let nock = require('nock');

module.exports.hash = "73515af9958108f6acd31f0ae1ac34e6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P5_node","RowKey":"R5","testField":123,"testField@odata.type":"Edm.Int32"})
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.4109869Z\'"',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P5_node\',RowKey=\'R5\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c53-c002-0024-358c-5918f1000000',
  'x-ms-client-request-id',
  'b270f17c-e189-4f43-97cf-8a08fa87a90e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P5_node\',RowKey=\'R5\')',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A51.4109869Z'\"","PartitionKey":"P5_node","RowKey":"R5","Timestamp":"2021-06-04T21:59:51.4109869Z","testField":123}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.4109869Z\'"',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c59-c002-0024-3b8c-5918f1000000',
  'x-ms-client-request-id',
  'c224fa31-54e4-4b8c-bf56-e70c8037b1da',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')`)
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c5c-c002-0024-3e8c-5918f1000000',
  'x-ms-client-request-id',
  '0bc8d367-c089-468f-a8cc-dff34bc1165c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);
