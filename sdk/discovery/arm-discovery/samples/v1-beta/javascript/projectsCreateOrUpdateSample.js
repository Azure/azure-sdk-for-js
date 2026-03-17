// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Project
 *
 * @summary create a Project
 * x-ms-original-file: 2026-02-01-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json
 */
async function projectsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate(
    "rgdiscovery",
    "1cf6d2a754acbb9655",
    "55cdd016d5653ebf82",
    {
      properties: {
        storageContainerIds: [
          "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/resourceGroups/rgdiscovery/providers/Microsoft.Discovery/storageContainers/storageContainer12",
        ],
        settings: {
          behaviorPreferences:
            "zjhzrtkwdmwbueseguplzpxeqvbqrknwvxxgtwtpldnguihcbprdwsihucbrmhyvmxuvldlgtrheqehrpcmdqtjknlyjnzdvphjicifbuvlsjgoaiaeunshmuupogxhwywntzhdvrdkknumgyofeltjqyenfiemerqsafaphhzgkwqrnuhbxklclishnnailctvcdjzvfroakitqkmllziocaolmyvytjmqhivljovriyicparifitswaynjsczcpfsgwyjsojiwqzauscpgmxqhznkofwydrjauiwkwkjrvclbufqmzyftfwjkymalhwkpiabljammjstpsknxqouabruobyznqnscucrvurarbbtefmaqiqfkyykuifojikmnkfgnjyagxwpjilfjyfpkqjdgrupitpqbvebmhsizeomzxqekqbsqqnlkefolbgbnfavtliixrvqxcbcxrxnpozucsvseddpjzsydiebyxxdehaniinfvfbflqwmyqelsjquigikebmfuuhdervonditfsummrsuokoqtessdmwptawejkqkkmtzgomamsbcbpviejbirvdwbcoenrsxeyayglvygsknetjuxdmbroritqklncrrnstwuaoohrqnypxfgbvfofsabnrgofobhdkktjyuhrxzmkrwglqczjlrfxbcbrplqmocjbphkjpdfxrfpkfrvlqqmiwftsuhxmjpimvngakbpkcvdevwubfqjjpnjmoiruabwxtzqehlwangolxjeqzjbfxltrgchuiginrgaeaztcqwacogzhvuhxcolvlzmoulikspebsdjyqlzgrtkqobkszfspnjftmnzsbyctxhkjsyemlehnqqhvvfdtrfarpjgaklmvbwukaykstipsnejnpnwaxskppilmgcdebupwpyyqajergevjizlhkiinvvqojrnegwbilhaktgjfkkefnwfbcxmjgylidekqjvgkxvnxdrttxzoyndupwqvlebbfgyiddgixrhcdbfkgakpausgcmjsgpqsjonrrrodgzzkworpvxzjzgtdbzqerqwjhjwoescduqwdwxsgmgyxolhlpdhuvscmzuuiynntspcyjlyngexpardjklyycnyquvbtfwlnqzxujowoljfvpnbyyoqiblxiiojiaeqpoblnrgttqmjqvqjaawevmbxgmbsaumjutbxhywkvhrljzcpitnunwfvtyiglqwlcngffnzdnfvccfqgdiazxoxgsepfqlyoxnofvogtsudsxarqpxhpidrwbykeypszgcbbyshljhlxperpdysagbmumexubjzimbetfayqfcbdkdpfsqrfuisioggdewxmeuihqitkwqfvmmwfppxfoigaoskgzedlhtmjagcbvwwnfkeyocceioccfjmxvtjutydhwapxkgdgjxuquujkdjtbkwhrlbxgclyqdcdnexitthelxajidteqtahvjwoovaripeuzycrdazmmzvpcecahnyentvdqdfteddmddcllromsumkucqhcgdelqsotimumwulnplxqeckhwgngafyvjlykdyotciabfkkdbqlfgwxkjreelzdswbaqzhiweqopubmxlestbvcrdimtiyleisfsvheanokuaipbniseceonfqlbrfofrhbuwtuirnrooflajdyrzwgcmpztgeyzrgvohijxrwrgsmfxagjuuygqtbyilneezxkmcbjoyhljlnesiuhgznvxzglpemwqfpixqlppehxeqzwhuxfcknkmpfttpywxaimzrsfalarhtoiwenlulyoadfdcyvsahzngcashxrchwrxknrvzhldforskqsktvltfuuxhummulwcfvezmfedfobzyfryrrzbypsvakkgppvhhicjydgzmnhcxsfqrdwgbmitmzzmjyzgvzusjigujfohqdlgmrtxmvvxoaxyfiyrgvfawkyynjykpmejzqmrpzitetxhqcjrqspglkzricplkrecaiumajvsobcddohclhmyinyteblkxqoqnoiyfwspencqszjbsnpyokusxgptshytgzqkynhncmqgrxaeugwyzxxqubfdkozfqrdeveopnhyvjcpjziogeyinlvcbhwltteivcnkfehvatnbvkfoqedljupaxholukhagwcasdgagdhpmkiumdclzstyexknhlojeoqkuejmnbuhdwgskgbqfomxvkgziun",
        },
      },
      tags: { key717: "tdn" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main() {
  await projectsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
