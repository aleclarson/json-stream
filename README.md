# @aleclarson/json-stream

Fork of `@streamparser/json-whatwg`

The purpose of this fork is to avoid module resolution issues that prevented certain types from
working in TypeScript.

## Changelog

- Compiled to ESM only.
- Removed the `exports` field.
- The `@streamparser-json` package is bundled.
- Removed any exports not accessible from a `JSONParser` instance.
- Replaced all type namespaces with direct type exports.
- Source code is excluded from NPM artifact.
