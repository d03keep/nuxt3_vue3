import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
const lifecycle = process.env.npm_lifecycle_event;

const { ENV } = process.env

const now = new Date();
const VERSION = [now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()].join(".")

console.log('ENV=', ENV)
console.log('VERSION=', VERSION)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        "@pinia/nuxt",
    ],
    head: {
        "htmlAttrs": {lang: 'zh-CN'},
        "meta": [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        "link": [
            // { rel: 'stylesheet', href: 'https://awesome-lib.css' }
        ],
        "style": [
            // { children: ':root { color: red }', type: 'text/css' }
        ],
        "script": [],
        "noscript": [
            { children: 'Javascript is required' }
        ],
        "charset": "utf-8",
    },
    css: [
        '@/assets/css/base.less',
        // 'element-plus/theme-chalk/base.css',
        'element-plus/dist/index.css'
    ],
    vite: {
        define: {
            __ENV__: `'${ENV}'`,
            __VERSION__: `'${VERSION}'`
        },
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver({ ssr: true })]
            }),
            Components({
                dts: true,
                resolvers: [ElementPlusResolver({ ssr: true })]
            }),
        ],
    },
    build: {
        transpile: [
            ...(lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus'] : []), // 'element-plus/es',
        ],
        babel: {
            plugins: [
                // [
                //     'import',
                //     {
                //         libraryName: 'element-plus',
                //         libraryDirectory: 'es',
                //         // 选择子目录 例如 es 表示 ant-design-vue/es/component
                //         // lib 表示 ant-design-vue/lib/component
                //         style: true
                //         // 默认不使用该选项，即不导入样式 , 注意 ant-design-vue 使用 js 文件引入样式
                //         // true 表示 import  'ant-design-vue/es/component/style'
                //         // 'css' 表示 import 'ant-design-vue/es/component/style/css'
                //     }
                // ]
            ]
        },
    },
    components: {
        "dirs": [
            {
                "path": "~/components/global",
                "global": true
            },
            "~/components"
        ]
    },
    extensions: [
        ".js",
        ".jsx",
        ".mjs",
        ".ts",
        ".vue"
    ],
    typescript: {
        shim: true,
        strict: false,
        typeCheck: true
    },
    webpack: {},
    devtools: true,
})
