// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "restrict-copy-paste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('restrict-copy-paste.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from restrict-copy-paste!');
	// });

	let disposable = vscode.commands.registerCommand('extension.preventCopyPaste', () => {
		const editor = vscode.window.activeTextEditor;
	
		if (editor) {
		  const documentUri = editor.document.uri;
		  const selection = editor.selection;
		  const selectedText = editor.document.getText(selection);
	
		  // Check if the selected text is within the workspace
		  if (vscode.workspace.getWorkspaceFolder(documentUri)) {
			vscode.window.showInformationMessage('Copying and pasting within the workspace is allowed!');
		  } else {
			// Implement your logic to handle copying and pasting outside the workspace.
			// For example, you can show a warning message and clear the clipboard.
			vscode.window.showWarningMessage('Copying and pasting outside the workspace is not allowed!');
			vscode.env.clipboard.writeText('');
		  }
		} else {
		  vscode.window.showErrorMessage('No active editor found!');
		}
	  });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
