let nock = require('nock');

module.exports.hash = "b514e17eaa36dd365a6e6674b159a41e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P2_node","RowKey":"R2","testField":"2020-09-17T00:00:00.111Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A56.94687Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P2_node',RowKey='R2')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa612-2002-00b8-38dd-f8a3cb000000',
  'x-ms-client-request-id',
  'a9a02ec4-f949-4899-8028-a1982109e564',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P2_node',RowKey='R2')",
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestnode(PartitionKey='P2_node',RowKey='R2')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A56.94687Z'\"","PartitionKey":"P2_node","RowKey":"R2","Timestamp":"2021-02-01T20:58:56.94687Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.111Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A56.94687Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa61f-2002-00b8-43dd-f8a3cb000000',
  'x-ms-client-request-id',
  '9016d0b1-9cfb-4831-9ba3-d5ce2467bc36',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestnode(PartitionKey='P2_node',RowKey='R2')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa625-2002-00b8-49dd-f8a3cb000000',
  'x-ms-client-request-id',
  'c29707e9-8736-4aa8-97c7-7b0b98fe8d30',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);
