import { HttpClient } from "@azure/core-rest-pipeline";
import { getRealAndFakePairs } from "./utils/connectionStringHelpers";
import { createRecordingRequest } from "./utils/createRecordingRequest";
import { paths } from "./utils/paths";
import {
  ConnectionStringSanitizer,
  ContinuationSanitizer,
  FindReplaceSanitizer,
  getTestMode,
  HeaderSanitizer,
  isRecordMode,
  isStringSanitizer,
  ProxyToolSanitizers,
  RecorderError,
  RemoveHeaderSanitizer,
  SanitizerOptions,
} from "./utils/utils";

/**
 * Signature of a function that adds a sanitizer of type T.
 */
type AddSanitizer<T> = (
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  sanitizer: T
) => Promise<void>;

/**
 * Given an AddSanitizer<T> function, create an AddSanitizer function that operates on an array of T, adding
 * each sanitizer in the array individually.
 */
const pluralize =
  <T>(singular: AddSanitizer<T>): AddSanitizer<T[]> =>
  async (httpClient: HttpClient, url: string, recordingId: string, sanitizers: T[]) => {
    await Promise.all(
      sanitizers.map((sanitizer) => singular(httpClient, url, recordingId, sanitizer))
    );
  };

/**
 * Makes an AddSanitizer<unknown> function that passes the sanitizer content directly to the test proxy request body.
 */
const makeAddSanitizer =
  (sanitizerName: ProxyToolSanitizers): AddSanitizer<Record<string, unknown>> =>
  async (
    httpClient: HttpClient,
    url: string,
    recordingId: string,
    sanitizer: Record<string, unknown>
  ) => {
    await addSanitizer(httpClient, url, recordingId, {
      sanitizer: sanitizerName,
      body: sanitizer,
    });
  };

/**
 * Makes an AddSanitizer<boolean> function that adds the sanitizer if the value is set to true,
 * and otherwise makes no request to the server. Used for ResetSanitizer and OAuthResponseSanitizer.
 */
const makeAddBodilessSanitizer =
  (sanitizerName: ProxyToolSanitizers): AddSanitizer<boolean> =>
  async (httpClient: HttpClient, url: string, recordingId: string, enable: boolean) => {
    if (enable) {
      await addSanitizer(httpClient, url, recordingId, {
        sanitizer: sanitizerName,
        body: undefined,
      });
    }
  };

/**
 * Makes an AddSanitizer function for a FindReplaceSanitizer, for example a bodySanitizer.
 * Depending on the input FindReplaceSanitizer options, either adds a sanitizer named `regexSanitizerName`
 * or `stringSanitizerName`.
 */
const makeAddFindReplaceSanitizer =
  (
    regexSanitizerName: ProxyToolSanitizers,
    stringSanitizerName: ProxyToolSanitizers
  ): AddSanitizer<FindReplaceSanitizer> =>
  async (
    httpClient: HttpClient,
    url: string,
    recordingId: string,
    sanitizer: FindReplaceSanitizer
  ): Promise<void> => {
    if (isStringSanitizer(sanitizer)) {
      await addSanitizer(httpClient, url, recordingId, {
        sanitizer: stringSanitizerName,
        body: {
          target: sanitizer.target,
          value: sanitizer.value,
        },
      });
    } else {
      await addSanitizer(httpClient, url, recordingId, {
        sanitizer: regexSanitizerName,
        body: {
          regex: sanitizer.target,
          value: sanitizer.value,
          groupForReplace: sanitizer.groupForReplace,
        },
      });
    }
  };

/**
 *  Internally,
 * - connection strings are parsed and
 * - each part of the connection string is mapped with its corresponding fake value
 * - GeneralStringSanitizer is applied for each of the parts with the real and fake values that are parsed
 */
async function addConnectionStringSanitizer(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  { actualConnString, fakeConnString }: ConnectionStringSanitizer
): Promise<void> {
  if (!actualConnString) {
    if (!isRecordMode()) return;
    throw new RecorderError(
      `Attempted to add an invalid sanitizer - ${JSON.stringify({
        actualConnString: actualConnString,
        fakeConnString: fakeConnString,
      })}`
    );
  }
  // extract connection string parts and match call
  const pairsMatched = getRealAndFakePairs(actualConnString, fakeConnString);
  await addSanitizers(httpClient, url, recordingId, {
    generalSanitizers: Object.entries(pairsMatched).map(([key, value]) => {
      return { value, target: key };
    }),
  });
}

/**
 * Adds a ContinuationSanitizer with the given options.
 */
async function addContinuationSanitizer(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  sanitizer: ContinuationSanitizer
) {
  await addSanitizer(httpClient, url, recordingId, {
    sanitizer: "ContinuationSanitizer",
    body: {
      ...sanitizer,
      resetAfterFirst: sanitizer.resetAfterFirst.toString(),
    },
  });
}

/**
 * Adds a RemoveHeaderSanitizer with the given options.
 */
async function addRemoveHeaderSanitizer(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  sanitizer: RemoveHeaderSanitizer
) {
  await addSanitizer(httpClient, url, recordingId, {
    sanitizer: "RemoveHeaderSanitizer",
    body: {
      headersForRemoval: sanitizer.headersForRemoval.toString(),
    },
  });
}

/**
 * Adds a HeaderRegexSanitizer or HeaderStringSanitizer.
 *
 * HeaderSanitizer is a special case of FindReplaceSanitizer where a header name ('key') must be provided.
 * Additionally, the 'target' option is not required. If target is unspecified, the header's value will always
 * be replaced.
 */
async function addHeaderSanitizer(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  sanitizer: HeaderSanitizer
) {
  if (sanitizer.regex || !sanitizer.target) {
    await addSanitizer(httpClient, url, recordingId, {
      sanitizer: "HeaderRegexSanitizer",
      body: {
        key: sanitizer.key,
        value: sanitizer.value,
        regex: sanitizer.target,
        groupForReplace: sanitizer.groupForReplace,
      },
    });
  } else {
    await addSanitizer(httpClient, url, recordingId, {
      sanitizer: "HeaderStringSanitizer",
      body: {
        key: sanitizer.key,
        target: sanitizer.target,
        value: sanitizer.value,
      },
    });
  }
}

const addSanitizersActions: {
  [K in keyof SanitizerOptions]: AddSanitizer<Exclude<SanitizerOptions[K], undefined>>;
} = {
  generalSanitizers: pluralize(
    makeAddFindReplaceSanitizer("GeneralRegexSanitizer", "GeneralStringSanitizer")
  ),
  bodySanitizers: pluralize(
    makeAddFindReplaceSanitizer("BodyRegexSanitizer", "BodyStringSanitizer")
  ),
  headerSanitizers: pluralize(addHeaderSanitizer),
  uriSanitizers: pluralize(makeAddFindReplaceSanitizer("UriRegexSanitizer", "UriStringSanitizer")),
  connectionStringSanitizers: pluralize(addConnectionStringSanitizer),
  bodyKeySanitizers: pluralize(makeAddSanitizer("BodyKeySanitizer")),
  continuationSanitizers: pluralize(addContinuationSanitizer),
  removeHeaderSanitizer: addRemoveHeaderSanitizer,
  oAuthResponseSanitizer: makeAddBodilessSanitizer("OAuthResponseSanitizer"),
  uriSubscriptionIdSanitizer: makeAddSanitizer("UriSubscriptionIdSanitizer"),
  resetSanitizer: makeAddBodilessSanitizer("Reset"),
};

export async function addSanitizers(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  options: SanitizerOptions
): Promise<void> {
  await Promise.all(
    Object.entries(options).map(([key, sanitizer]) => {
      const action = addSanitizersActions[key as keyof SanitizerOptions];
      if (!action) {
        throw new RecorderError(`Sanitizer ${key} not implemented`);
      }

      return action(httpClient, url, recordingId, sanitizer);
    })
  );
}

/**
 * Atomic method to add a simple sanitizer.
 */
async function addSanitizer(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
  options: {
    sanitizer: ProxyToolSanitizers;
    body: Record<string, unknown> | undefined;
  }
): Promise<void> {
  const uri = `${url}${paths.admin}${
    options.sanitizer !== "Reset" ? paths.addSanitizer : paths.reset
  }`;
  const req = createRecordingRequest(uri, undefined, recordingId);
  if (options.sanitizer !== "Reset") {
    req.headers.set("x-abstraction-identifier", options.sanitizer);
  }
  req.headers.set("Content-Type", "application/json");
  req.body = options.body !== undefined ? JSON.stringify(options.body) : undefined;

  const rsp = await httpClient.sendRequest({
    ...req,
    allowInsecureConnection: true,
  });
  if (rsp.status !== 200) {
    throw new RecorderError("addSanitizer request failed.");
  }
}

/**
 * Returns the html document of all the available transforms in the proxy-tool
 */
export async function transformsInfo(
  httpClient: HttpClient,
  url: string,
  recordingId: string
): Promise<string | null | undefined> {
  if (recordingId) {
    const infoUri = `${url}${paths.info}${paths.available}`;
    const req = createRecordingRequest(infoUri, undefined, recordingId, "GET");
    if (!httpClient) {
      throw new RecorderError(
        `Something went wrong, Sanitizer.httpClient should not have been undefined in ${getTestMode()} mode.`
      );
    }
    const rsp = await httpClient.sendRequest({
      ...req,
      allowInsecureConnection: true,
    });
    if (rsp.status !== 200) {
      throw new RecorderError("Info request failed.");
    }
    return rsp.bodyAsText;
  } else {
    throw new RecorderError("Bad state, recordingId is not defined when called transformsInfo().");
  }
}
