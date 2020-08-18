let nock = require('nock');

module.exports.hash = "e73fdefb2f170953767bf7140fa3f9ac";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0fee9d1eec3d79b6f76cf7d3d367bfef47d46a992d72fa7a5eb579b95d1697f936babd47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe6eae97d5f27af145b6c288beff4b467650d955de548b7c9937cdf3fc322f6938de109f566b204300b89b00337f8882e0c611cadfde00e5031e9f42fc5919e02c6fa675b16a8b6a49e3f0c6169d3e41ca1f9ae2b6716cdac61b9c7ef243185d9b156543a3f04676522d5665feee0d3e21ac7a8c4cf2e2bd715295653e057db6f0b290e50e7d2fb8c97864c43e5de493f7248bb4f859a28a4f9779319be5cbefe6c5c5bca5a1e85031beb3657b6f8f3e923e042dc5c51f9e7e148c4f3fdb3440fde4676b84f451a0acf8e3d147f459f325b3387da0afae2f2e48cde5357d822606b4fed9566ff365d1f9fb198f5f3f21dad4c107f9725a5f7327bf1746a7dd148ba2cc6ae8e34756d12bb57ffc8b625a574d75de8e8f7fb0aef3f16b1ef4f8c9177bf75fbbf7885abb06dc447ef925bfe4ff01fcb34a4635060000"], [ 'Cache-Control',
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
  'W/"0x8D83E82BF2F16EF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ff03b57b-ecfd-432c-9f17-059e06e233b4',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:16 GMT',
  'Content-Length',
  '662' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":true,"sortable":false,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D83E82BF2F16EF\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0fee9d1eec9dec1c3c7c7af2f0d3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f37d7cb6a79bdf8225b6144dfff25233ba8ec2a6faa45becc9be6797e9997341c6f884fab35902100dc4d80993f444170e308e56f6f80f2018f4f21feac0c709637d3ba58b545b5a47178638b4e9f20e50f4d71db38366de30d4e3ff9218caecd8ab2a15178233ba916ab327ff7069f10563d462679f1de38a9ca329f823e5b7859c87287be17dc643c32629f2ef2c97b92455afc2c51c5a7cbbc98cdf2e577f3e262ded25074a818dfd9b2bdb7471f491f8296e2e20f4f3f0ac6a79f6d1aa07ef2b3344237be326bdaaf56a4fef2d9971dbe7e4a1fbe2916f997e7e74d8ec14b5f017efe48654e8281ca473f77e3fc3e7d142865fe78f4117dd67cc9a24c1fe8abeb8b0b52e7794d9fa08901ad7fb6d5db7c5974fe7ec6a3d74f883275f041be9cd6d7dcc9ef85d16937c5a228b31a76e79135684af41fffa298d655539db7e3e31faceb7cfc9a073d7ef2c5defdd7ee3da2d6ae0137915f7ec92ff97f000ad3e6b21d070000"], [ 'Cache-Control',
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
  'W/"0x8D83E82C089DC96"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1d011ded-5a89-4141-8ffa-3b163866a356',
  'elapsed-time',
  '120',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:16 GMT',
  'Content-Length',
  '706' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0fee9d1eec9dec1c3c7c7af2f0d3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f37d7cb6a79bdf8225b6144dfff25233ba8ec2a6faa45becc9be6797e9997341c6f884fab35902100dc4d80993f444170e308e56f6f80f2018f4f21feac0c709637d3ba58b545b5a47178638b4e9f20e50f4d71db38366de30d4e3ff9218caecd8ab2a15178233ba916ab327ff7069f10563d462679f1de38a9ca329f823e5b7859c87287be17dc643c32629f2ef2c97b92455afc2c51c5a7cbbc98cdf2e577f3e262ded25074a818dfd9b2bdb7471f491f8296e2e20f4f3f0ac6a79f6d1aa07ef2b3344237be326bdaaf56a4fef2d9971dbe7e4a1fbe2916f997e7e74d8ec14b5f017efe48654e8281ca473f77e3fc3e7d142865fe78f4117dd67cc9a24c1fe8abeb8b0b52e7794d9fa08901ad7fb6d5db7c5974fe7ec6a3d74f883275f041be9cd6d7dcc9ef85d16937c5a228b31a76e79135684af41fffa298d655539db7e3e31faceb7cfc9a073d7ef2c5defdd7ee3da2d6ae0137915f7ec92ff97f000ad3e6b21d070000"], [ 'Cache-Control',
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
  'W/"0x8D83E82C089DC96"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6b1ae48f-6e26-4a40-923e-eeb598540d82',
  'elapsed-time',
  '22',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:17 GMT',
  'Content-Length',
  '706' ]);
