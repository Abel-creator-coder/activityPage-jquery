var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var server1 = require('browser-sync').create("server1");
var server2 = require('browser-sync').create("server2");
var test = require('browser-sync').create("test");
var proxy = require('browser-sync').create("proxy");
var snippet = require('browser-sync').create("snippet");
var server1Url = "D:/techwolf-fe/GruntProjects/boss-v2.0/src/html/special";
var server2Url = "D:/test";
var testUrl = "./app";
gulp.task('start', function() {
    server1.init({
        server: {
            baseDir: server1Url,
            directory: true,
            routes: {
                "/fe": "./"
            }
        },
        ui: {
            port: 4000
        },
        port: 3000,
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        snippetOptions: {
            rule: {
                match: /<\/head>/i,
                fn: function(snippet, match) {
                    return '<link rel="stylesheet" type="text/css" href="/_custom.css"/>' + snippet + match;
                }
            }
        },
        files: [server1Url],
        open: false,
        browser: "firefox",
        logLevel: "info",
        logPrefix: "lzq project",
        logConnections: true,
        logFileChanges: true,
        reloadOnRestart: true,
        minify: false,
        timestamps: true
    });
    server2.init({
        server: {
            baseDir: server2Url,
            directory: true,
            routes: {
                "/fe": "./"
            }
        },
        ui: {
            port: 4002
        },
        port: 3001,
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        snippetOptions: {
            rule: {
                match: /<\/head>/i,
                fn: function(snippet, match) {
                    return '<link rel="stylesheet" type="text/css" href="/_custom.css"/>' + snippet + match;
                }
            }
        },
        files: [server2Url],
        open: false,
        browser: "firefox",
        logLevel: "info",
        logPrefix: "lzq project",
        logConnections: true,
        logFileChanges: true,
        reloadOnRestart: true,
        minify: false,
        timestamps: true
    });
    test.watch("app/*.js", function(event, file) {
        if (event === "change") {
            gulp.src("app/*.js")
                .pipe(sourcemaps.init())
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(sourcemaps.write("."))
                .pipe(gulp.dest("dist"));
        }
    });
    test.init({
        server: {
            baseDir: testUrl,
            directory: true,
            routes: {
                "/fe": "./"
            }
        },
        ui: {
            port: 4003
        },
        port: 3003,
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        snippetOptions: {
            rule: {
                match: /<\/head>/i,
                fn: function(snippet, match) {
                    return '<link rel="stylesheet" type="text/css" href="/_custom.css"/>' + snippet + match;
                }
            }
        },
        files: [testUrl],
        open: false,
        browser: "firefox",
        logLevel: "info",
        logPrefix: "lzq project",
        logConnections: true,
        logFileChanges: true,
        reloadOnRestart: true,
        minify: false,
        timestamps: true
    });
    // proxy.init({
    //     proxy: "localhost:82",
    //     "ui": false,
    //     port: 3003,
    //     open: false,
    //     browser: "firefox",
    //     logLevel: "info",
    //     logPrefix: "lzq project",
    //     logConnections: true,
    //     logFileChanges: true,
    //     reloadOnRestart: true,
    //     minify: false,
    //     timestamps: false
    // });
});
