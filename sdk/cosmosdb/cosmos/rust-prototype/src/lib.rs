// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

mod client;
mod response;

use napi::{Error, Result, Status};
use napi_derive::napi;

#[napi]
pub async fn probe_async(value: String) -> Result<String> {
    napi::tokio::task::yield_now().await;
    if value.is_empty() {
        return Err(Error::new(
            Status::InvalidArg,
            "The native probe requires a non-empty value.",
        ));
    }
    Ok(format!("rust-probe:{value}"))
}
