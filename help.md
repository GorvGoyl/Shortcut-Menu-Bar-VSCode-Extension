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

- add command to extension.ts
- in package.json:
  - add to activationEvents
  - add to contributes/configuration (set 'default' to false)
  - add to contributes/commands (add both icons dark #C5C5C5 and light #424242, you can get svg icons from flaticon.com)
  - add to menus/editor/title

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

### How to Publish

- remove warnings first
- update version in package.json next to https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar
- checkin git changes
- vsce publish

<!-- - package (.vsix): vsce package -->

#### TODO

- add button to format docuement with... (editor.action.formatDocument.multiple + editor.action.formatSelection.multiple)

#### Run tests

- Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Launch Tests`.
- Press `F5` to run the tests in a new window with your extension loaded.
- See the output of the test result in the debug console.
- Make changes to `test/extension.test.ts` or create new test files inside the `test` folder.
  - By convention, the test runner will only consider files matching the name pattern `**.test.ts`.
  - You can create folders inside the `test` folder to structure your tests any way you want.
