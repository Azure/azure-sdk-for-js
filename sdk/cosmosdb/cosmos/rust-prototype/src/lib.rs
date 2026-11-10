// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

mod client;
mod profiling;
mod response;

use napi::{Error, Result, Status};
use napi_derive::napi;

#[cfg(feature = "allocator-mimalloc")]
#[global_allocator]
static ALLOCATOR: mimalloc::MiMalloc = mimalloc::MiMalloc;

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
