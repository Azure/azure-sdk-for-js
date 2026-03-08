// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Project
 *
 * @summary update a Project
 * x-ms-original-file: 2026-02-01-preview/Projects_Update_MaximumSet_Gen.json
 */
async function projectsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.projects.update(
    "rgdiscovery",
    "11e14e4bec2ea791b4",
    "1e7dd7aa730b25cabf",
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
      tags: { key2596: "kpfaeffbnzkz" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectsUpdateMaximumSet();
}

main().catch(console.error);
