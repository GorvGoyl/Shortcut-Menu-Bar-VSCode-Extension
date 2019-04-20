'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// let fs = require("fs");
import { window, commands, ExtensionContext, Disposable } from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    console.log('extension is now active!');

    let commandArray = [
        //name in package.json , name of command to execute
        ["extension.save", "workbench.action.files.save"],
        ["extension.toggleTerminal", "workbench.action.terminal.toggleTerminal"],
        ["extension.toggleActivityBar", "workbench.action.toggleActivityBarVisibility"]
    ];

    let disposableCommandsArray: Disposable[] = [];
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    commandArray.forEach(command => {

        disposableCommandsArray.push(commands.registerCommand(command[0], () => {
            commands.executeCommand(command[1]).then(function () {
            });
        }));
    });

    let disposableBeautify = commands.registerCommand('extension.beautify', () => {

        let editor = window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        // if ((fs.statSync(editor.document.uri.fsPath).mode & 146) === 0) {
        //     // document is in read-only mode
        //     let t=9;
        //   }
        if (window.state.focused === true && !editor.selection.isEmpty) {
            commands.executeCommand('editor.action.formatSelection').then(function () {
            });
        } else {
            commands.executeCommand('editor.action.formatDocument').then(function () {
            });
        }
    });

    let disposableFileList = commands.registerCommand('extension.filelist', () => {
        let editor = window.activeTextEditor;
        if (!editor || !editor.viewColumn) {
            return; // No open text editor
        }
        commands.executeCommand('workbench.action.openPreviousRecentlyUsedEditorInGroup').then(function () {
        });
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(disposableFileList);
    context.subscriptions.push(disposableBeautify);
    disposableCommandsArray.forEach(i => {
        context.subscriptions.push(i);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}