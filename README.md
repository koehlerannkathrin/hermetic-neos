# Neos Headstart

A distribution of [Neos CMS](https://www.neos.io/) with batteries included.

* `./headstart` utility to manage [local](#markdown-header-local) and
  [remote](#markdown-header-remote) installations
* Site package with useful defaults
* Assets (precompiler, minification)

## Local

### Setup

```
git clone --depth 1 git@bitbucket.org:instanode/neos-headstart-template.git example-neos
cd example-neos
MYSQL_PASSWORD="<secret>" ./headstart setup
direnv allow
./headstart run
```

### Commands

> `./headstart <command>`

```
configure     Configure database and initialize site
setup         Install dependencies, setup database, and import site
run           Run server and watch assets
import        Import site
export        Export site
```

Run `./headstart --help` for details.

### Requirements

* PHP
* Composer
* Node
* [direnv](http://direnv.net/)

### Troubleshooting

```
ERROR 1007 (HY000) at line 1: Can't create database 'example'; database exists
```

This is a security precaution. To avoid loosing any data, existing databases are not modified by default.

> `./headstart setup --force`

## Remote

### Deploy

> `./headstart remote deploy`

By default site content is untouched. To replace site content with `Sites.xml`
(and resources), run:

> `./headstart remote deploy --import`

### Commands

> `./headstart remote <command>`

```
deploy        Deploy containers
export        Export remote site
```
