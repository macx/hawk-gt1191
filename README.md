# HAWK GT1191

![Maintenance](https://img.shields.io/maintenance/yes/2024)
![Generator](https://img.shields.io/badge/generator-Astro-orange)

"GT 1191" (formerly "4411") is a seminar of the study program Bachelor of Arts (BA) of the Faculty of Design at the HAWK University of Applied Science and Art in Hildesheim. This repository is the source code of the [website](https://hawk-gt1191.de), develped by the official lecturer [David Maciejewski](https://macx.io) to support students with informations and links. It's not related to HAWK as a publisher of this information.

The web framework [Astro](https://astro.build/) is used to generate the static HTML.

## Prequisites

Clone this repository to start working on it:

```sh
$ git clone git@github.com:macx/hawk-gt1191.git && cd hawk-gt1191
```

In order to run this project, you need to install the following depenencies with [Homebrew](https://brew.sh/index_de):

```sh
$ brew install yarn
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

Inside the Projects, you'll see the following folders and files:

```plaintext
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Deployment

The deployment is done through GitHub Actions. Tags and releases are done via release-it.
