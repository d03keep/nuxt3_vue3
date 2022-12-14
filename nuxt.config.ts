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
    modules: [
        // '@nuxtjs/axios',
        "@pinia/nuxt",
    ],
    buildModules: [

    ],
    hooks: {
        // 去掉多余的window.__NUXT__内容
        'vue-renderer:ssr:context'(context) {
            if (context?.nuxt?.error?.statusCode === 200) {
                const routePath = JSON.stringify(context.nuxt.routePath);
                context.nuxt = { serverRendered: true, routePath };
            }
        }
    },
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
    loading: { color: '#3B8070' },
    vite: {
        define: {
            __ENV__: `'${ENV}'`,
            __VERSION__: `'${VERSION}'`,
            __API_URL__: `'https://api.mliveplus.com'`,
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
        server: {
            proxy: {
                '/proxy': {
                    // target: "https://test3_api.sun8tv.com",
                    // target: "https://test2-api.sun8tv.com",
                    // target: "https://test1-api.sun8tv.com",
                    // target: "https://uat-api.sun8tv.com",
                    target: "https://api.mliveplus.com",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/proxy/, '')
                },
            }
        },
    },
    build: {
        extractCSS: true,
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
