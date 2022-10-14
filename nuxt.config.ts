import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const lifecycle = process.env.npm_lifecycle_event;

const autoImportOpts = {
    imports: ['pinia', {}],
    resolvers: [ElementPlusResolver({ ssr: true })],
    dts: './auto-imports.d.ts',
}

const vueComponentsOpts = {
    resolvers: [ElementPlusResolver({ ssr: true })],
    dts: './vue-components.d.ts',
}
// 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
const { ENV } = process.env

const now = new Date();
const VERSION = [now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()].join(".")

console.log('ENV=', ENV)
console.log('VERSION=', VERSION)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        ['unplugin-auto-import/nuxt', autoImportOpts],
        ['unplugin-vue-components/nuxt', vueComponentsOpts],
        ["@pinia/nuxt"],
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
        'element-plus/theme-chalk/base.css'
    ],

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
    vite: {
        define: {
            __ENV__: `'${ENV}'`,
            __VERSION__: `'${VERSION}'`
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
    dir: {
        assets: 'assets',
        app: 'app',
        layouts: 'layouts',
        middleware: 'middleware',
        pages: 'pages',
        public: 'public',
        static: 'public',
        /**
         * Vuex store
         */
        store: 'store',
    },
    typescript: {
        shim: true,
        strict: false,
        typeCheck: true
    },
    webpack: {},
    devtools: true,
})
