"use strict";

var gulp = require("gulp"),
  watch = require("gulp-watch"),
  sass = require("gulp-sass"),
  csscomb = require("gulp-csscomb"),
  gcmq = require("gulp-group-css-media-queries"),
  prefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  rigger = require("gulp-rigger"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  rimraf = require("rimraf"),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: {
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/images/",
    fonts: "build/fonts/"
  },
  src: {
    html: "src/*.html",
    js: "src/js/*.js",
    style: "src/css/style.sass",
    img: "src/images/**/*.*",
    fonts: "src/fonts/**/*.*"
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/css/**/*.*",
    img: "src/images/**/*.*",
    fonts: "src/fonts/**/*.*"
  },
  clean: "./build"
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: "localhost",
  port: 9000,
  logPrefix: "mazax1ct"
};

gulp.task("webserver", function() {
  browserSync(config);
});

gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});

gulp.task("html:build", function() {
  gulp
    .src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});

gulp.task("js:build", function() {
  gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task("style:build", function() {
  gulp
    .src(path.src.style)
    .pipe(sass())
    .pipe(csscomb())
    .pipe(gcmq())
    .pipe(
      prefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

gulp.task("image:build", function() {
  gulp
    .src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});

gulp.task("fonts:build", function() {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task("build", [
  "html:build",
  "style:build",
  "js:build",
  "image:build",
  "fonts:build"
]);

gulp.task("watch", function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start("html:build");
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start("style:build");
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start("js:build");
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start("image:build");
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start("fonts:build");
  });
});

gulp.task("default", ["build", "webserver", "watch"]);
