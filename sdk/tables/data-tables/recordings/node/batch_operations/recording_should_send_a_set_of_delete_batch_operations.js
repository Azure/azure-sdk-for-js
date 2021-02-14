let nock = require('nock');

module.exports.hash = "d10683902da795c01916add792ff5e87";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:933285f3-b002-0036-8011-9904ab000000\nTime:2020-10-02T23:12:22.8490292Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '933285f3-b002-0036-8011-9904ab000000',
  'x-ms-client-request-id',
  'c42a6101-9a7e-46f3-a883-e4a130ce6768',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:22 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_16735c58-84cc-4d94-a1d1-42b13560c0ee\r\nContent-Type: multipart/mixed; boundary=changesetresponse_f4d4d340-7b12-4be9-85e8-e8aa5797b426\r\n\r\n--changesetresponse_f4d4d340-7b12-4be9-85e8-e8aa5797b426\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_f4d4d340-7b12-4be9-85e8-e8aa5797b426\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_f4d4d340-7b12-4be9-85e8-e8aa5797b426\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_f4d4d340-7b12-4be9-85e8-e8aa5797b426--\r\n--batchresponse_16735c58-84cc-4d94-a1d1-42b13560c0ee--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_16735c58-84cc-4d94-a1d1-42b13560c0ee',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fde6b0d1-f002-0018-6411-99846c000000',
  'x-ms-client-request-id',
  '553cdfcb-7af6-463a-9781-999ae3dd865c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:22 GMT'
]);
