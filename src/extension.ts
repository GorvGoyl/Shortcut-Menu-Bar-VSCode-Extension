'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
import {window, commands, ExtensionContext} from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.save', () => {
        commands.executeCommand( 'workbench.action.files.save' ).then( function(e)
            {
                // window.showErrorMessage('File not saved');
            } );
    });
    // async function trySave(doc : TextDocument) : Promise<void> {
    //     if (doc.isUntitled) {
    //         const saved = await doc.save();
    //         window.showInformationMessage(`Document ${saved ? "was" : "was not"} saved. Check document is still open.`);
    //     } else {
    //         window.showErrorMessage('Please test on an unsaved document');
    //     }
    // }
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}