requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery.min',
        bootstrap: 'bootstrap.min',
        timer: 'timer',
        countdown: '../app/countdown'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
