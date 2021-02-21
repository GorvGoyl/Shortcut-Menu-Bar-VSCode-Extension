/*
   Copyright (C) 2018-2021 Gourav Goyal and contributors.

   This file is part of the Shortcut Menu Bar extension.

   The Shortcut Menu Bar extension is free software: you can redistribute it
   and/or modify it under the terms of the GNU Lesser General Public License
   as published by the Free Software Foundation, either version 3 of the
   License, or (at your option) any later version.

   The Shortcut Menu Bar extension is distributed in the hope that it will
   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Lesser General Public License for more details.

   You should have received a copy of the GNU Lesser General Public License along
   with the Shortcut Menu Bar extension. If not,see <https://www.gnu.org/licenses/>.
*/

"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// let fs = require("fs");
import {
  window,
  workspace,
  commands,
  ExtensionContext,
  Disposable,
  extensions,
  env,
  Uri,
} from "vscode";
import { basename, dirname, extname } from "path";

var init = false;
var hasCpp = false;

const extensionId = "jerrygoyal.shortcut-menu-bar";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  if (!init) {
    init = true;

    commands.getCommands().then(function (value) {
      let result = value.indexOf("C_Cpp.SwitchHeaderSource");
      if (result >= 0) {
        hasCpp = true;
      }
    });
  }

  console.log("extension is now active!");

  // show notification on major release
  showWhatsNew(context);

  // rest of code
  // Step: If simple commands then add to this array
  let commandArray = [
    //=> ["name in package.json" , "name of command to execute"]

    ["ShortcutMenuBar.save", "workbench.action.files.save"],
    [
      "ShortcutMenuBar.toggleTerminal",
      "workbench.action.terminal.toggleTerminal",
    ],
    [
      "ShortcutMenuBar.toggleActivityBar",
      "workbench.action.toggleActivityBarVisibility",
    ],
    ["ShortcutMenuBar.navigateBack", "workbench.action.navigateBack"],
    ["ShortcutMenuBar.navigateForward", "workbench.action.navigateForward"],
    [
      "ShortcutMenuBar.toggleRenderWhitespace",
      "editor.action.toggleRenderWhitespace",
    ],
    ["ShortcutMenuBar.quickOpen", "workbench.action.quickOpen"],
    ["ShortcutMenuBar.findReplace", "editor.action.startFindReplaceAction"],
    ["ShortcutMenuBar.undo", "undo"],
    ["ShortcutMenuBar.redo", "redo"],
    ["ShortcutMenuBar.commentLine", "editor.action.commentLine"],
    ["ShortcutMenuBar.saveAll", "workbench.action.files.saveAll"],
    ["ShortcutMenuBar.openFile", "workbench.action.files.openFile"],
    ["ShortcutMenuBar.newFile", "workbench.action.files.newUntitledFile"],
    ["ShortcutMenuBar.goToDefinition", "editor.action.revealDefinition"],
    ["ShortcutMenuBar.cut", "editor.action.clipboardCutAction"],
    ["ShortcutMenuBar.copy", "editor.action.clipboardCopyAction"],
    ["ShortcutMenuBar.paste", "editor.action.clipboardPasteAction"],
    [
      "ShortcutMenuBar.compareWithSaved",
      "workbench.files.action.compareWithSaved",
    ],
    ["ShortcutMenuBar.showCommands", "workbench.action.showCommands"],
    ["ShortcutMenuBar.startDebugging", "workbench.action.debug.start"],
  ];

  let disposableCommandsArray: Disposable[] = [];
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  commandArray.forEach((command) => {
    disposableCommandsArray.push(
      commands.registerCommand(command[0], () => {
        commands.executeCommand(command[1]).then(function () {});
      })
    );
  });

  // Step: else add complex command separately

  let disposableBeautify = commands.registerCommand(
    "ShortcutMenuBar.beautify",
    () => {
      let editor = window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      if (window.state.focused === true && !editor.selection.isEmpty) {
        commands
          .executeCommand("editor.action.formatSelection")
          .then(function () {});
      } else {
        commands
          .executeCommand("editor.action.formatDocument")
          .then(function () {});
      }
    }
  );

  let disposableFormatWith = commands.registerCommand(
    "ShortcutMenuBar.formatWith",
    () => {
      let editor = window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      if (window.state.focused === true && !editor.selection.isEmpty) {
        commands
          .executeCommand("editor.action.formatSelection.multiple")
          .then(function () {});
      } else {
        commands
          .executeCommand("editor.action.formatDocument.multiple")
          .then(function () {});
      }
    }
  );

  // see opened files list
  let disposableFileList = commands.registerCommand(
    "ShortcutMenuBar.openFilesList",
    () => {
      let editor = window.activeTextEditor;
      if (!editor || !editor.viewColumn) {
        return; // No open text editor
      }
      commands
        .executeCommand("workbench.action.showAllEditorsByMostRecentlyUsed")
        .then(function () {});
    }
  );

  let disposableSwitch = commands.registerCommand(
    "ShortcutMenuBar.switchHeaderSource",
    () => {
      if (hasCpp) {
        commands
          .executeCommand("C_Cpp.SwitchHeaderSource")
          .then(function () {});
      } else {
        window.showErrorMessage(
          "C/C++ extension (ms-vscode.cpptools) is not installed!"
        );
      }
    }
  );

  // Adding 1) to a list of disposables which are disposed when this extension is deactivated

  disposableCommandsArray.forEach((i) => {
    context.subscriptions.push(i);
  });

  // Adding 2) to a list of disposables which are disposed when this extension is deactivated

  context.subscriptions.push(disposableFileList);
  context.subscriptions.push(disposableBeautify);
  context.subscriptions.push(disposableFormatWith);
  context.subscriptions.push(disposableSwitch);

  // Adding 3 // user defined userButtons
  for (let index = 1; index <= 10; index++) {
    const printIndex = index !== 10 ? "0" + index : "" + index;
    let action = "userButton" + printIndex;
    let actionName = "ShortcutMenuBar." + action;
    let disposableUserButtonCommand = commands.registerCommand(
      actionName,
      () => {
        const config = workspace.getConfiguration("ShortcutMenuBar");
        let configName = action + "Command";
        const command = config.get<String>(configName);

        // skip userButtons not set
        if (
          command === null ||
          command === undefined ||
          command.trimEnd() === ""
        ) {
          return;
        }

        const palettes = command.split(",");
        executeNext(action, palettes, 0);
      }
    );
    context.subscriptions.push(disposableUserButtonCommand);
  }

  //also update userButton in package.json.. see "Adding new userButtons" in help.md file
}

// this method is called when your extension is deactivated
export function deactivate() {}

// local functions for user-defined button execution follow, based on
// https://github.com/ppatotski/vscode-commandbar/ Copyright 2018 Petr Patotski

function executeNext(action: String, palettes: String[], index: number) {
  try {
    let [cmd, ...args] = palettes[index].split("|");
    if (args) {
      args = args.map((arg) => resolveVariables(arg));
    }
    cmd = cmd.trim();
    commands.executeCommand(cmd, ...args).then(
      () => {
        index++;
        if (index < palettes.length) {
          executeNext(action, palettes, index);
        }
      },
      (err) => {
        window.showErrorMessage(
          `Execution of '${action}' command has failed: ${err.message}`
        );
      }
    );
  } catch (err) {
    window.showErrorMessage(
      `Execution of '${action}' command has failed: ${err.message}`
    );
    console.error(err);
  }
}

const resolveVariablesFunctions = {
  env: (name) => process.env[name.toUpperCase()],
  cwd: () => process.cwd(),
  workspaceRoot: () => getWorkspaceFolder(),
  workspaceFolder: () => getWorkspaceFolder(),
  workspaceRootFolderName: () => basename(getWorkspaceFolder()),
  workspaceFolderBasename: () => basename(getWorkspaceFolder()),
  lineNumber: () => window.activeTextEditor?.selection.active.line,
  selectedText: () =>
    window.activeTextEditor?.document.getText(
      window.activeTextEditor.selection
    ),
  file: () => getActiveEditorName(),
  fileDirname: () => dirname(getActiveEditorName()),
  fileExtname: () => extname(getActiveEditorName()),
  fileBasename: () => basename(getActiveEditorName()),
  fileBasenameNoExtension: () => {
    const edtBasename = basename(getActiveEditorName());
    return edtBasename.slice(
      0,
      edtBasename.length - extname(edtBasename).length
    );
  },
  execPath: () => process.execPath,
};

const variableRegEx = /\$\{(.*?)\}/g;
function resolveVariables(commandLine: String) {
  return commandLine
    .trim()
    .replace(variableRegEx, function replaceVariable(match, variableValue) {
      const [variable, argument] = variableValue.split(":");
      const resolver = resolveVariablesFunctions[variable];
      if (!resolver) {
        throw new Error(`Variable ${variable} not found!`);
      }

      return resolver(argument);
    });
}

function getActiveEditorName() {
  if (window.activeTextEditor) {
    return window.activeTextEditor.document.fileName;
  }
  return "";
}

function getWorkspaceFolder(activeTextEditor = window.activeTextEditor) {
  let folder;
  if (workspace?.workspaceFolders) {
    if (workspace.workspaceFolders.length === 1) {
      folder = workspace.workspaceFolders[0].uri.fsPath;
    } else if (activeTextEditor) {
      const folderObject = workspace.getWorkspaceFolder(
        activeTextEditor.document.uri
      );
      if (folderObject) {
        folder = folderObject.uri.fsPath;
      } else {
        folder = "";
      }
    } else if (workspace.workspaceFolders.length > 0) {
      folder = workspace.workspaceFolders[0].uri.fsPath;
    }
  }
  return folder;
}

// https://stackoverflow.com/a/66303259/3073272
function isMajorUpdate(previousVersion: string, currentVersion: string) {
  // rain-check for malformed string
  if (previousVersion.indexOf(".") === -1) {
    return true;
  }
  //returns int array [1,1,1] i.e. [major,minor,patch]
  var previousVerArr = previousVersion.split(".").map(Number);
  var currentVerArr = currentVersion.split(".").map(Number);

  if (currentVerArr[0] > previousVerArr[0]) {
    return true;
  } else {
    return false;
  }
}

async function showWhatsNew(context: ExtensionContext) {
  try {
    const previousVersion = context.globalState.get<string>(extensionId);
    const currentVersion = extensions.getExtension(extensionId)!.packageJSON
      .version;

    // store latest version
    context.globalState.update(extensionId, currentVersion);

    if (
      previousVersion === undefined ||
      isMajorUpdate(previousVersion, currentVersion)
    ) {
      // show whats new notificatin:
      const actions = [{ title: "See how" }];

      const result = await window.showInformationMessage(
        `Shortcut Menubar v${currentVersion} — Add your own buttons!`,
        ...actions
      );

      if (result !== null) {
        if (result === actions[0]) {
          await env.openExternal(
            Uri.parse(
              "https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension#create-buttons-with-custom-commands"
            )
          );
        }
      }
    }
  } catch (e) {
    console.log("Error", e);
  }
}
