import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  noExternal: [/^/],
  dts: true,
});
