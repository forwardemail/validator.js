/* eslint import/no-extraneous-dependencies: 0 */
import fs from "fs";
import { rollup } from "rollup";
import babel from "rollup-plugin-babel";
import babelPresetEnv from "@babel/preset-env";
import pkg from "./package.json";

rollup({
  entry: "src/index.js",
  plugins: [
    babel({
      presets: [[babelPresetEnv, { modules: false }]],
      babelrc: false,
    }),
  ],
})
  .then((bundle) =>
    bundle.write({
      file: "validator.js",
      // name: pkg.name,
      // NOTE: hard-coded below due to @forwardemail/validator
      //       otherwise tests won't pass in `test/validators.test.js`
      //       it('should bind validator to the window if no module loaders are available', () => {
      //
      name: 'validator',
      format: "umd",
      banner: `/*!\n${String(fs.readFileSync("./LICENSE"))
        .trim()
        .split("\n")
        .map((l) => ` * ${l}`)
        .join("\n")}\n */`,
    })
  )
  .catch((e) => {
    process.stderr.write(`${e.message}\n`);
    process.exit(1);
  });
