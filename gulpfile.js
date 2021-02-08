
let project_folder = "dist";
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        fonts: project_folder + "/fonts/",
        img: project_folder + "/img/",
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
        gulp = require("gulp"),
        browsersync = require("browser-sync").create(),
        twig = require("gulp-twig"),
        del = require("del"),
        scss = require('gulp-sass'),
        autoprefixer = require("gulp-autoprefixer"),
        group_media = require("gulp-group-css-media-queries"),
        clean_css = require("gulp-clean-css"),
        rename = require("gulp-rename"),
        uglify = require("gulp-uglify-es").default,
        imagemin = require("gulp-imagemin"),
        webp = require("gulp-webp"),
        webphtml = require("gulp-webp-html"),
        webpcss = require("gulp-webpcss"),
        webp_converter = require("webp-converter"),
        webpack = require("webpack-stream");


let webConfig = {
        output: {
            filename: 'script.js'
        }
};

function html() {
    return src(path.src.html)
        .pipe(twig())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(browsersync.stream())
        .pipe(
            autoprefixer({
                overrideBrowserlist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(group_media())
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(webpack(webConfig))
        .pipe(uglify())
        .pipe(browsersync.stream())
        .pipe(dest(path.build.js))
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function clean(params) {
    return del(path.clean);
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}



let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, browserSync, watchFiles);

exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.watch = watch;
exports.default = watch;