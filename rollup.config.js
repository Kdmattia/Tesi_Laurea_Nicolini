import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const production = process.env.BUILD === 'production';

export default {
    input: [
        '@teipublisher/pb-components/src/pb-components-bundle.js',
        '@teipublisher/pb-components/src/pb-leaflet-map.js',
        '@teipublisher/pb-components/src/pb-odd-editor.js',
        '@teipublisher/pb-components/src/pb-edit-app.js',
        './pb-extension-bundle.js'
    ],
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: !production
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
            // __ACE_BASE_PATH__, __ACE_CSS_PATH__, __MONACO_PATH__ removed —
            // paths are now computed at runtime using import.meta.url
        }),
        babel({
            "plugins": [
                "@babel/plugin-proposal-object-rest-spread"
            ]
        }),
        resolve(),
        production && terser({
            compress: {
                reduce_vars: false
            }
        }),
        copy({
            targets: [
                // --- existing entries ---
                {
                    src:  './node_modules/leaflet/dist/leaflet.css',
                    dest: './css/leaflet'
                },
                {
                    src:  './node_modules/leaflet/dist/images/*',
                    dest: './images/leaflet'
                },
                {
                    src:  './node_modules/openseadragon/build/openseadragon/images/*',
                    dest: './images/openseadragon'
                },
                {
                    src:  './node_modules/openseadragon/build/openseadragon/openseadragon.min.js',
                    dest: './lib/'
                },
                {
                    src:  './node_modules/prismjs/themes/*',
                    dest: './css/prismjs'
                },
                {
                    src:  './node_modules/@teipublisher/pb-components/i18n/common/*',
                    dest: './i18n/common'
                },
                // --- new entries for pb-dsl-editor ---
                // ANTLR4 runtime bundle
                {
                    src:  './antlr4/runtime/JavaScript/dist/antlr4.js',
                    dest: './dist/antlr4/runtime/JavaScript/dist'
                },
                // DSL Web Worker — not bundled by rollup, copied as-is
                {
                    src:  './src/workers/dsl-worker.js',
                    dest: './dist/workers'
                },
                // ACE editor CSS
                {
                    src:  './node_modules/ace-builds/css/ace.css',
                    dest: './dist/css/ace'
                },
                {
                    src:  './node_modules/ace-builds/css/theme/textmate.css',
                    dest: './dist/css/ace/theme'
                },
                // ACE custom mode files
                {
                    src:  './ace-master/src/**/*',
                    dest: './dist/ace-master/src'
                },
                // Monaco editor — full min/vs folder required for dynamic loading
                {
                    src:  './node_modules/monaco-editor/min/vs/**/*',
                    dest: './dist/monaco-editor/min/vs'
                },
            ]
        })
    ]
}