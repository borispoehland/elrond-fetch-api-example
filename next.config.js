const keysTransformer = require('ts-transformer-keys/transformer').default

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                // make sure not to set `transpileOnly: true` here, otherwise it will not work
                getCustomTransformers: (program) => ({
                    before: [keysTransformer(program)],
                }),
            },
        })
        return config
    },
    images: {
        domains: ['media.elrond.com'],
    },
}

module.exports = nextConfig
