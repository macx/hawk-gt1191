# HAWK GT1191

![Maintenance](https://img.shields.io/maintenance/yes/2021)
![cms](https://img.shields.io/badge/cms-hugo-orange)

"GT 1191" (formerly "4411") is a seminar of the study program Bachelor of Arts (BA) of the Faculty of Design at the HAWK University of Applied Science and Art in Hildesheim.

This is a private project from the lecturer [David Maciejewski](https://macx.io) to support students with informations via the [website](https://hawk-gt1191.de) and is not related to HAWK as a publisher of this information.

## Prequisites

Clone this repository to start working on it:

```sh
$ git clone git@github.com:macx/hawk-gt1191.git && cd hawk-gt1191
```

In order to run this project, you need to install the following depenencies with [Homebrew](https://brew.sh/index_de):

```sh
$ brew install yarn hugo
$ yarn install
```

## Development

You have the following options to run the development tasks:

```sh
# Start a development server with live-reload
$ yarn dev

# Deploy this site to /public folder
$ yarn build
```

## Deployment

### Auto deploy with git

Prepare your server to pull changes from the main branch of this repository. Then change to public folder of your virtual host to `public` and log into the SSH terminal to install HUGO directly above your document root (mostly `httpdocs`).

```sh
$ wget https://github.com/gohugoio/hugo/releases/download/v0.91.2/hugo_extended_0.91.2_Linux-64bit.tar.gz
$ tar zxf hugo_extended_0.91.2_Linux-64bit.tar.gz
$ rm ./hugo_extended_0.91.2_Linux-64bit.tar.gz
```

Now, go to your git settings and enable additional deploy settings:

```sh
cd httpdocs/
rm -rf ./public
../hugo
```

### Deploy script

Alternative use the deploy script of this repository. First, copy `deploy/.sample.env` to `deploy/.env` and fill in the SSH credentials. Use the following commands to deploy your public folder:

```sh
$ deploy/it dry  # to test it
$ deploy/it now  # to deploy it
```
