module.exports = ({ env, options }) => ({
    plugins: {
        'postcss-import': { 
            path: "src/assets/sass/config"
         },
        'postcss-cssnext': options.cssnext ? options.cssnext : false,
        'autoprefixer': env === 'production' ? options.autoprefixer : false,
        'cssnano': env === 'production' ? options.cssnano : false
    }
})