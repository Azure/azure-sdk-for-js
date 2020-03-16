# Writing tests for the Azure SDK for JS/TS

## Index

- [Introduction](#introduction)
- [Engineering setup](#engineering-setup)
- [Recommended tools](#recommended-tools)
- [Structure of tests](#structure-of-tests)
- [Individual tests](#individual-tests)

## Introduction

## Engineering setup

## Recommended tools

## Structure of tests

a. Internal tests.
	i. Should be stateless unit tests.
	ii. Should not be recorded.
b. Public API tests
	i. Can be recorded or live tests.
	ii. Can target more than one environment.
	iii. Should I separate tests by the target environment?
		1) Perhaps a hashtag in the title.
		2) Or separation by folder if needed.
		3) Talk about how these affect or are affected by the configuration files.
	iv. Make clear separations about what we're testing, by how the API is separated.
		1) Having a file per group of tests is fine.
			a) If the file is too big, consider making another file with the type, then an underscore, then a relevant name for the sub-group of tests.
		2) Examples include separating CRUD (create, read, update, delete) tests from other API methods. It's up to the developers to decide what can be separated.
	v. TODO


## Individual tests