// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { jwtDecode } from "jwt-decode";
export const parseToken = (token) => {
    const { exp } = jwtDecode(token);
    return {
        token,
        expiresOnTimestamp: exp * 1000,
    };
};
//# sourceMappingURL=tokenParser.js.map