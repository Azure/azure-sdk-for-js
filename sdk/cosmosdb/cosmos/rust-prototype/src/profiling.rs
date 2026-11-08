// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

use napi::{Error, Result, Status};
use napi_derive::napi;
use std::time::Instant;

#[napi(object)]
pub struct NativeReadProfile {
    pub dispatch_ms: f64,
    pub resolve_container_ms: f64,
    pub driver_operation_ms: f64,
    pub response_preparation_ms: f64,
    pub completion_ms: f64,
    pub elapsed_ms: f64,
}

pub struct ReadProfileClock {
    points: Vec<Instant>,
}

impl ReadProfileClock {
    pub fn new() -> Self {
        let mut points = Vec::with_capacity(6);
        points.push(Instant::now());
        Self { points }
    }

    pub fn mark(&mut self) {
        self.points.push(Instant::now());
    }

    pub fn finish(mut self) -> Result<NativeReadProfile> {
        self.mark();
        if self.points.len() != 6 {
            return Err(Error::new(
                Status::GenericFailure,
                "Incomplete native read profile.",
            ));
        }
        let elapsed = |first: usize, last: usize| {
            self.points[last]
                .duration_since(self.points[first])
                .as_secs_f64()
                * 1000.0
        };
        Ok(NativeReadProfile {
            dispatch_ms: elapsed(0, 1),
            resolve_container_ms: elapsed(1, 2),
            driver_operation_ms: elapsed(2, 3),
            response_preparation_ms: elapsed(3, 4),
            completion_ms: elapsed(4, 5),
            elapsed_ms: elapsed(0, 5),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn stages_reconcile_with_elapsed() {
        let mut clock = ReadProfileClock::new();
        for _ in 0..4 {
            clock.mark();
        }
        let profile = clock.finish().unwrap();
        let total = profile.dispatch_ms
            + profile.resolve_container_ms
            + profile.driver_operation_ms
            + profile.response_preparation_ms
            + profile.completion_ms;
        assert!((total - profile.elapsed_ms).abs() < 1e-6);
        assert!(profile.elapsed_ms >= 0.0);
    }

    #[test]
    fn missing_stages_fail_explicitly() {
        assert!(ReadProfileClock::new().finish().is_err());
    }
}
