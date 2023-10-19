import path from 'path';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import htmlPurge from 'vite-plugin-html-purgecss';
import Svgr from 'vite-plugin-svgr';

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src', 'js/main.js')
            },
            output: {
                entryFileNames: 'js/bundle.[hash].js',
                assetFileNames: 'assets/[name].[hash][extname]',
                // chunkFileNames: '[name].[hash].js'
            },
        },
    },

    plugins: [
        image(),
        // htmlPurge(),
        alias(),
        Svgr(),
        createHtmlPlugin({
            minify: true,
            entry: path.resolve(__dirname, 'src', 'js/main.js'),
            template: path.resolve(__dirname, 'index.html'),

            inject: {
                data: {
                    // title: 'index',
                    injectScript: `<script src="./inject.js"></script>`,
                },
                tags: [
                    {
                        injectTo: 'body-prepend',
                        tag: 'div',
                        attrs: {
                            id: 'tag',
                        },
                    },
                ],
            },
        }),

        url({
            limit: 10000, // пороговое значение в байтах; файлы меньше этого значения будут встроены как data URIs
            fileName: '[dirname][hash][extname]', // шаблон имени файла
            publicPath: 'assets/', // публичный путь к ресурсам
            include: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'], // какие типы файлов обрабатывать
        }),
    ],

    css: {
        postcss: {
            plugins: [require('postcss-preset-env')()],
        },
    },

    resolve: {
        alias: {
            '/@src/': path.resolve(__dirname, 'src'),
        },
    },

    optimizeDeps: {
        include: ['@babel/preset-env'],
    },

    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
})
