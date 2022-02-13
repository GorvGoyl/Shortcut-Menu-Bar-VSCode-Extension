![shortcut menu bar](images/1.jpg)

# Shortcut Menu Bar - VSCode Extension

Add 35+ handy buttons like beautify, show opened files, save, toggle terminal, activity bar, Find replace etc to the editor menu bar in VSCode. You can also create your own buttons with custom commands.

<sub> <i> - Made by [Gourav Goyal](https://gourav.io)</i></sub>

#### [See on VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar)

#### [See on Open-VSX](https://open-vsx.org/extension/jerrygoyal/shortcut-menu-bar)

## 📷 Screenshot

![shortcut menu bar](images/intro.png)

## ⚙ Enable/Disable buttons from VSCode settings

Go to VSCode settings (`CTRL+,` or `CMD+,`) and search for `shortcut menu bar`. Toggle buttons from there.

![shortcut menu bar](images/settings.jpg)

## ✅ Currently added buttons

![shortcut menu bar](images/all_buttons.png)

✔ Save active file  
✔ Navigate back  
✔ Navigate forward  
✔ Beautify/format document or selection  
✔ Beautify/format document or selection with multiple formatters  
✔ Undo/Redo buttons  
✔ Open files list  
✔ Save all  
✔ show/hide terminal  
✔ show/hide render whitespace  
✔ Quick open (Ctrl+P)  
✔ show/hide activity bar  
✔ Find & replace in active file (Ctrl+H)  
✔ Switch header source (for .cpp files)  
✔ Toggle line comment  
✔ Open file, New file  
✔ Go to definition  
✔ Cut, Copy, Paste  
✔ Start Debugging  
✔ User-defined buttons (0-9)

## Create buttons with custom commands

You can create upto 10 user-defined buttons.  
Buttons will be shown as numbers as shown in below image.

![User Buttons](images/user-buttons.png)

> Note: To add custom icons for commands, see this [hack](https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension/issues/58#issuecomment-918663851).

You can also trigger a button by using corresponding hotkey combination (Windows: `Ctrl+Alt+0`, `Ctrl+Alt+1`, `Ctrl+Alt+2`, etc, Mac: `Shift+Cmd+0`, `Shift+Cmd+1`, `Shift+Cmd+2`, etc)

1. Got to extension settings (`Ctrl+,` or `Cmd+,`).
2. Look for `Shortcut Menu Bar: User Button`
3. Add any [VSCode command](https://code.visualstudio.com/docs/getstarted/keybindings#_default-keyboard-shortcuts) or any other extension command in the input field. Button icon will be visible only when you add a command.

   ![Add Command](images/add-command.jpg)

Optionally, you can also:

- Pass command arguments: add command arguments separated by pipe (e.g. `workbench.action.tasks.runTask|My Task`)
- Run multiple commands: add comma-separated list of commands and those will get executed sequentially.

---

### ❤ Support continuous development [Buy me a Coffee](https://ko-fi.com/gorvgoyl)

<p align="center">
  <a href="https://ko-fi.com/gorvgoyl">
  <img src="https://github.com/GorvGoyl/Notion-Boost-browser-extension/raw/master/src/images/readme/bmc.png" width="200" alt="Buy me a Coffee"/>
  </a>
</p>

### 👨‍💻 Follow the maker [@GorvGoyl](https://twitter.com/intent/follow?user_id=325435736) behind this extension

<p align="center">
  <a href="https://twitter.com/intent/follow?user_id=325435736">
  <img src="https://img.shields.io/badge/@GorvGoyl-1da1f2?style=for-the-badge&labelColor=1da1f2&color=1da1f2&logo=twitter&logoColor=white&label=Follow" alt="Follow on Twitter"/>
  </a>
</p>

### 👍 Liked the extension? Express your love by rating it [⭐⭐⭐⭐⭐](https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar) (clickable stars)

---

### FAQ 🙋‍

**I found a bug, where to report?**  
Please create a [new issue on Github](https://github.com/gorvgoyl/Shortcut-Menu-Bar-VSCode-Extension/issues).

**How can I add my own/custom buttons?**  
Follow above [section](#create-buttons-with-custom-commands).

**Can I contribute new buttons to the extension repo?**  
Sure. To add buttons see ["Adding new buttons" section of `help.md` file in repo](https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension/blob/master/help.md#adding-new-buttons).  
Go through the [repo](https://github.com/gorvgoyl/Shortcut-Menu-Bar-VSCode-Extension/), it's fairly simple to understand code and add a button. Send me a PR!

**How can I disable/Enable a button?**  
Follow above [section](#-enabledisable-buttons-from-vscode-settings).
