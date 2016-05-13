## Instructions to designers

`build/` folder is where your build tools will create the production/finished HTML/JS/CSS website.

Source files and build tools can be placed outside the `build/` folder.

If you want to rename this folder, change the `path: build` in the `manifest.yml` file.

Run `cf push` from the root folder to deploy the app (`build/` directory) again and again.
