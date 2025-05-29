// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// isomorphic-webcrypto is not listed as a dependency in package.json because
// doing so requires adding a bunch of react packages as peer dependencies. So,
// it is being loaded dynamically here to not cause compiler error.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as globalCrypto from "isomorphic-webcrypto";
export { globalCrypto };
//# sourceMappingURL=globalCrypto-react-native.mjs.map