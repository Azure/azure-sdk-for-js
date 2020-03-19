import * as https from "https";
import * as url from "url";
import {
  PerfStressTest,
  ParsedPerfStressOptions,
  PerfStressOption,
  defaultPerfStressOptions,
  makePerfStressOption
} from "../src";

function makeHTTPSRequest(stringURL: string): Promise<string> {
  return new Promise(function(resolve, reject) {
    const options = url.parse(stringURL);

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });
      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", reject);
    req.end();
  });
}

interface ParsedHTTPSRequestOptions extends ParsedPerfStressOptions {
  url: PerfStressOption;
}

export class HTTPSGetTest extends PerfStressTest<ParsedHTTPSRequestOptions> {
  public optionsToParse: PerfStressOption[] = [
    ...defaultPerfStressOptions,
    makePerfStressOption(true, "URL for the HTTP GET Test", "url", "u")
  ];
  async run() {
    await makeHTTPSRequest(this.parsedOptions!.url.value as string);
  }
}
