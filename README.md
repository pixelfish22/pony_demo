# webui-example-app

Example application to kickstart SPS web app development.

### What is Included

* Django app serving static files
* Angular 1.4.x single page app
* [WebUI-Core][webui-core] for SPS look and feel
* Sass with imported mixins and variables
* SPS page title, sidebar, and footer
* Basic I18N support via language files
* SystemJS module loader
* BrowserSync live reload
* Karma + Jasmine tests
* JSHint analysis
* Gulp tasks

### Requirements
* node
* npm
* jspm
* python 2.7
* virtualenv

## Installation

### Docker

*We're working on configuring a Docker image for this example app.*

*In the meantime, you'll just have to install the project the long way.*

### Install Node + NPM

NPM is installed as part of Node.

The best way to install NPM is to install Node using [the Node.js installer][node].

### Install JSPM

**Install JSPM globally on your machine**

```
    npm install jspm -g
```

#### Generate a Github Access Token for JSPM ####

To install packages from SPS repos, you will need to setup an access token.

*Note: You only need to do this once per machine. If you have done this previously,*
*no need to do it again.  You can jump straight to [Install the Example App](#install-the-example-app).*

1. Sign in to Github
1. Go to [Personal Access Tokens page][github tokens].
1. Click **Generate new token** button
1. Describe the token, such as ```sps - jspm local```
1. Select the following scopes:
![Github Scopes](https://cloud.githubusercontent.com/assets/44441/12596893/eedfbdda-c447-11e5-8fd9-fb4a1a04e704.png)
1. Click **Generate token** button
1. Copy the token into your clipboard

#### Configure JSPM to use the Access Token ####

Back to your terminal, type

```
    jspm registry config github
```

1. Setup GitHub credentials
1. Enter your GitHub username
1. Paste your token when it asks for password
1. Test credentials and you should be all set

### Install the Example App

```
    git clone git@github.com:SPSCommerce/webui-example-app.git
```

```
    cd webui-example-app
```

```
    rm -rf .git
```

```
    npm install
```

```
    jspm install
```

At this point you'll want to activate a Python 2.7 Virtual Environment.

[This tutorial should help you get one setup][virtualenv].

Once you've figured that out...

```
    pip install -r application/requirements.txt
```

## Running the Server

```
    python manage.py runserver
```

Python is now running a Django app at [http://localhost:8000][local-django]

During development, you will also want to run ```gulp server```.  See below for more info.

## Gulp Tasks

Included is a Gulpfile with tasks to assist in your app development.

To see a list of available tasks, run ```gulp``` by itself.

```
Available tasks
  sass              Create CSS files from SASS sources.
  server            Serve test coverage, test source files on change.
  test              JSHint and unit test the application JS.
```

### ``` gulp sass```

Compiles application and component Sass files into minified CSS with matching sourcemaps.

### ```gulp server```

Runs a [BrowserSync][browsersync] server that reloads your browser when static source files are modified.

The server runs at [http://localhost:8100][local-server] and as files are changed, will automatically:

* Recompile Sass into CSS
* Lint and unit test Javascript
* Generate code coverage reports
* Refresh browser with updates

Code coverage reports are found at [http://localhost:8200][local-coverage] and also update as files are modified.

### ```gulp test```

Lints and unit tests Javascript source files.  This task runs once and then exits.

This task is useful as part of a continuous build process (Travis, Jenkins, etc).

## Unit Tests

Karma is configured to load test spec files from ```application/static/js/**/*.spec.js```.

You can run Karma via ```karma start```.  Karma also runs when running ```gulp server```.

Karma is configured to work with JSPM and your SystemJS configuration, so you can require
modules and controllers directly into your test specs.

HTML code coverage reports can be found in ```application/static/test/reports/coverage/```

## Language Support

The Angular app includes a language module, which is made up of a service and a directive.

In this example, the language service is tied directly to the ui-router, allowing for language
settings to be defined by the URL route.  For example:

English:

```
    http://localhost:8100/#/en/users
```

Russian:

```
    http://localhost:8100/#/ru/users
```

#### Language Content

Language content is stored in ```application/static/lang/*.js```.

lang.en.js
```
module.exports = {
    'Good Morning': 'Good Morning',
    'Welcome Back': 'Welcome back {0}, we missed you!'
}
```

lang.ru.js
```
module.exports = {
    'Good Morning': 'Доброе утро',
    'Welcome Back': 'Добро пожаловать {0}, мы пропустили вас!'
}
```

#### Language in Templates

Access language strings in your Angular templates via the ```local-text``` directive.

```
    <h1 local-text="Good Morning"></h1>
    <p local-text="Welcome Back" local-params="[ctrl.username]"></p>
```

```local-text``` sets the key to use as a language lookup (always in English).

```local-params``` an array of variables you want to inject into your language string.

#### Language in Practice

**It is strongly recommended that you build your app with internationalization in mind.**

*Note: the language service and directive will eventually become a part of the webui-core,
but for the time being, please use the language module provided in this example.*


[browsersync]: http://browsersync.io
[github tokens]: https://github.com/settings/tokens
[jspm]: http://jspm.io
[local-coverage]: http://localhost:8200
[local-django]: http://localhost:8000
[local-server]: http://localhost:8100
[npm]: http://blog.npmjs.org/post/85484771375/how-to-install-npm
[node]: https://nodejs.org
[virtualenv]: http://docs.python-guide.org/en/latest/dev/virtualenvs/
[webui-core]: https://github.com/SPSCommerce/webui-core
