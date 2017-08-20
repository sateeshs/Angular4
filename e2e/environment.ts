
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses 'environment.ts', but if you do
// 'ng build --env=prod' then 'environment.prod.ts' will be used instead.
// The list of which env maps to which file can be found in '.angular-cli.json'.

let webServerDefaultPort = 8080;

export const environment = {
    production: false,
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName':
        (process.env.TEST_BROWSER_NAME || 'chrome'),
        'version':
        (process.env.TEST_BROWSER_VERSION || 'ANY')
    },

    // Default http port to host the web server
    webServerDefaultPort: webServerDefaultPort,

    // Protractor interactive tests	
    interactiveTestPort: 6969,

    // A base URL for your application under test.
    baseUrl:
    'http://' + (process.env.HTTP_HOST || 'localhost') +
    ':' + (process.env.HTTP_PORT || webServerDefaultPort)
};

