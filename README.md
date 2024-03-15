# @aleclarson/json-stream

Fork of `@streamparser/json-whatwg`

The purpose of this fork is to avoid module resolution issues that prevented certain types from
working in TypeScript.

## Changelog

### 0.1.21

- Added the `ObjectParser` class, which is similar to `JSONParser` except it emits root-level objects/arrays that are line-delimited by default. Those objects/arrays are statically typed, but not validated at runtime.

  ```ts
  for await (const object of stream.pipeThrough(
    new ObjectParser<MyObject | MyArray>()
  )) {
    // object is either MyObject or MyArray
  }
  ```

### 0.1.20

- Compiled to ESM only.
- Removed the `exports` field.
- The `@streamparser-json` package is bundled.
- Removed any exports not accessible from a `JSONParser` instance.
- Replaced all type namespaces with direct type exports.
- Source code is excluded from NPM artifact.
