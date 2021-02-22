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

1. add command to `extension.ts`
   > inside package.json:
2. add entry to `activationEvents`
3. add entry to `contributes`{`configuration` (set 'default' to false)
4. add entry to `contributes`{`commands`
5. add both icons dark `#C5C5C5` and light `#424242` to `images/` folder, you can get svg icons from flaticon.com)
6. add entry to `menus`{`editor/title`

### Explore the API

https://code.visualstudio.com/docs/getstarted/keybindings
https://code.visualstudio.com/docs/extensionAPI/vscode-api
https://code.visualstudio.com/api/references/contribution-points#contributes.menus
https://code.visualstudio.com/updates/v1_42#_workbench
https://code.visualstudio.com/api/references/extension-manifest

- You can open the full set of our API when you open the file `node_modules/vscode/vscode.d.ts`.

### Publishing tools setup

- https://code.visualstudio.com/docs/extensions/publish-extension
- npm install -g vsce

### Publish on VSCode

- update version in package.json next to https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar
- `npm run lint`
- remove warnings if any
- commit git changes
- `vsce publish`
- prepate git tag release (add binary by running `vsce package`)
- check status: https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar

### Publish on open-vsx

- `npx ovsx publish -p <token>`
- check status: https://open-vsx.org/extension/jerrygoyal/shortcut-menu-bar
