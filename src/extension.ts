'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// let fs = require("fs");
import { window, commands, ExtensionContext } from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    console.log('extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let disposableSave = commands.registerCommand('extension.save', () => {
        commands.executeCommand('workbench.action.files.save').then(function () {
            // window.showErrorMessage('File not saved');
        });
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
        // switch (editor.viewColumn) {
        //     case 1:
        //         commands.executeCommand('workbench.action.showEditorsInFirstGroup').then(function () {
        //         });
        //         break;
        //     case 2:
        //         commands.executeCommand('workbench.action.showEditorsInSecondGroup').then(function () {
        //         });
        //         break;
        //     case 3:
        //         commands.executeCommand('workbench.action.showEditorsInThirdGroup').then(function () {
        //         });
        //         break;
        //     default:
        //         commands.executeCommand('workbench.action.showEditorsInGroup').then(function () {
        //         });
        //         break;
        // }
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(disposableFileList);
    context.subscriptions.push(disposableSave);
    context.subscriptions.push(disposableBeautify);
}

// this method is called when your extension is deactivated
export function deactivate() {
}