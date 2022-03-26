### Setup (one time)

- npm install

### Run & Debug

- Press `F5` to open a new window with your extension loaded.
- Set breakpoints in your code inside `src/extension.ts` to debug your extension.
- Find output from your extension in the debug console.

### Make changes

- You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

### Adding new buttons

1. Add both icons i.e dark `#C5C5C5` and light `#424242` to `images/` folder. Set SVG dimensions: `width="16"`, `height="16"` and, `viewBox` (see exisiting icons to get idea). You can get free svg icons from flaticon.com

2. add command to `src\extension.ts`

3. inside `package.json`:

   1. add entry to `activationEvents`
   2. add entry to `contributes`{`configuration` (set 'default' to false)
   3. add icons path to `contributes`{`commands`
   4. add entry to `menus`{`editor/title`

4. Test (`F5` to run in Debug mode). Make sure both icons (light, dark) are showing properly and command is working fine.

### Explore the API

https://code.visualstudio.com/api/references/contribution-points#Command-icon-specifications
https://code.visualstudio.com/docs/getstarted/keybindings
https://code.visualstudio.com/docs/extensionAPI/vscode-api
https://code.visualstudio.com/api/references/contribution-points#contributes.menus
https://code.visualstudio.com/updates/v1_42#_workbench
https://code.visualstudio.com/api/references/extension-manifest

- You can open the full set of our API when you open the file `node_modules/vscode/vscode.d.ts`.

### Publish on VSCode

Publishing tools setup

- https://code.visualstudio.com/docs/extensions/publish-extension
- npm install -g vsce

- update version in package.json next to https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar
- `npm run lint`
- remove warnings if any
- commit git changes
- `npm run publish`
  - In case of PAT expire error
    - run `npm run login`
    - mention new token
      - get from https://jerrygoyal.visualstudio.com/_usersSettings/tokens
        - create one if it's expired
          - name: vscode
          - Organisation: all accessible organizations
          - Scopes: Full access
- check status: https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar

add to Github release

- get binary by running `npm run package`
- submit https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension/releases

### Publish on open-vsx

Get token from https://open-vsx.org/user-settings/tokens

- `npx ovsx publish shortcut-menu-bar-3.0.X.vsix -p <token>`
- check status: https://open-vsx.org/extension/jerrygoyal/shortcut-menu-bar
