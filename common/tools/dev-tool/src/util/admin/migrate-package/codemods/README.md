# Codemods for CJS to ESM package conversion

## What are codemods

A codemod is a tool or script that automates large-scale code changes across a codebase, typically used to refactor or upgrade syntax, APIs, or frameworks. It enables developers to apply consistent transformations, such as renaming variables, updating method signatures, or migrating to new library versions, without manually editing each file. Codemods are especially useful in projects with many files or when upgrading libraries where manual changes would be time-consuming and error-prone.

## What is ts-morph

[ts-morph](https://ts-morph.com/) is the library we use to setup, navigate, and manipulate TypeScript sourcefiles.

## Purpose of this directory

As part of the CJS to ESM migration we're seeing a large number of changes that have to be made manually. While most changes are straightforward, they are time-consuming and error-prone. This directory contains codemods that automate these changes.

## Contributing

If you have a codemod that you think would be useful, please add it to this directory. Make sure that it is well-tested and that it only makes the changes it is supposed to make. If you're unsure, please ask for a review or help.

Feel free to contribute codemods that may not always apply as long as they are safe to run. For example, a codemod that removes a deprecated API that is no longer used in the codebase or something that is specific to certain packages. The goal here is to incrementally improve the migration experience and reduce the manual work required.

In order to include your codemode in the migration process, please add it to the `codemods` array in `index.ts`

## FAQ

### Errors and how to resolve them

#### InvalidOperationError: Attempted to get information from a node that was removed or forgotten

This can happen when a node is removed or modified in the source tree, but the iteration over the tree is still ongoing. When attempting to access any of its children nodes, you will see this error. To resolve this correctly, use the `traversal` property of `forEachDescendant` to skip all children if the node is removed or replaced.

There are additional ways to control traversal (skip all children, stop altogether, etc) and you can find more information in the [ts-morph documentation](https://ts-morph.com/navigation/#traversal-control).
