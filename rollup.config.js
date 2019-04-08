import babel from 'rollup-plugin-babel'
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { terser } from 'rollup-plugin-terser'
const babelPlugin = babel({
  externalHelpers: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true
});

const generateConfig = (name)=>{
    return {
      input: `src/${name}/index.js`,
      output: { file: `lib/${name}.js`,name:`${name}`, format: 'umd', indent: false },
      plugins: [babelPlugin,resolve(),commonjs()]
    }
}
export default [
  generateConfig("core"),
  generateConfig("http"),
  // {
  //   input: 'src/index.js',
  //   output: { file: 'lib/aook.min.js',name:"aook", format: 'umd', indent: false },
  //   plugins: [babelPlugin,resolve(),commonjs(), terser({
  //     compress: {
  //       pure_getters: true,
  //       unsafe: true,
  //       unsafe_comps: true,
  //       warnings: false
  //     }
  //   })]
  // },
]
