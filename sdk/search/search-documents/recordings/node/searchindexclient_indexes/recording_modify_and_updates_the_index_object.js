let nock = require('nock');

module.exports.hash = "ba452171e66f849d7e6b41a30e645638";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f9e9c7e7afce0e4c9b39d07cf8e7fdf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c8887dbac827ef491669f1b344159f2ef36236cb97dfcd8b8b794b43d1a1627c67cbf6de1e7d247d085a8a8b3f3cfd28189f7eb66980fac9cfd608e9a34059f1c7a38fe8b3e64b6671fa405f5d5f5c909acb6bfa044d0c68fdb3addee6cba2f3f7331ebf7e42b4a9830ff2e5b4bee64e7e2f8c4ebb29164599d5d0c78faca2576afff817c5b4ae9aeabc1d1fff605de7e3d73ce8f1932ff6eebf76ef11b5760db889fcf24b7ec9ff0347f983d235060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6A7CBF07FA"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'f8ef32a6-3d86-4fa9-9257-6b555a05abca',
  'elapsed-time',
  '26',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:13:08 GMT',
  'Content-Length',
  '662'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":true,"sortable":false,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity"},"@odata.etag":"\"0x8D8BE6A7CBF07FA\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f9e9c7e7afce0d9fed3fbf7f7f67edf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c8887dbac827ef491669f1b344159f2ef36236cb97dfcd8b8b794b43d1a1627c67cbf6de1e7d247d085a8a8b3f3cfd28189f7eb66980fac9cfd208ddf8caac69bf5a91facb675f76f8fa297df8a658e45f9e9f3739062f7d05f8f923953909062a1ffddc8df3fbf451a094f9e3d147f459f3258b327da0afae2f2e489de7357d822606b4fed9566ff365d1f9fb198f5e3f21cad4c107f9725a5f7327bf1746a7dd148ba2cc6ad89d47d6a029d17ffc8b625a574d75de8e8f7fb0aef3f16b1ef4f8c9177bf75fbbf7885abb06dc447ef925bfe4ff0117a691d01d070000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6A7F4D5522"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '50dc273a-f47d-42fd-92d8-e060a880c7cf',
  'elapsed-time',
  '162',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:13:08 GMT',
  'Content-Length',
  '706'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f9e9c7e7afce0d9fed3fbf7f7f67edf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c8887dbac827ef491669f1b344159f2ef36236cb97dfcd8b8b794b43d1a1627c67cbf6de1e7d247d085a8a8b3f3cfd28189f7eb66980fac9cfd208ddf8caac69bf5a91facb675f76f8fa297df8a658e45f9e9f3739062f7d05f8f923953909062a1ffddc8df3fbf451a094f9e3d147f459f3258b327da0afae2f2e489de7357d822606b4fed9566ff365d1f9fb198f5e3f21cad4c107f9725a5f7327bf1746a7dd148ba2cc6ad89d47d6a029d17ffc8b625a574d75de8e8f7fb0aef3f16b1ef4f8c9177bf75fbbf7885abb06dc447ef925bfe4ff0117a691d01d070000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6A7F4D5522"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'fff6ebf4-de5f-42b6-8b47-2ded2ee0c8de',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:13:08 GMT',
  'Content-Length',
  '706'
]);
