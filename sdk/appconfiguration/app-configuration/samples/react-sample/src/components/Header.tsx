/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/

import React from "react";
// import { useFeatureFlags } from "../hooks/useFeatureFlags";

export default function Header(): JSX.Element {
  // Initialize the hooks needed for integrating with our Azure services.
  // const [getFeatureFlag] = useFeatureFlags();
  // const onLoad = async (key:string) => {
  //   await getFeatureFlag(key);
  // }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <button > </button>
          <h1>App</h1>
        </div>
      </div>
    </React.Fragment>
  );
}
