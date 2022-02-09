import * as o from "obsidian";

export const replaceCurrentLine = (
	editor: o.Editor | undefined,
	cb: (lineStr: string) => string
) => {
	if (!editor) return;
	const cursor = editor.getCursor();
	const oldLineStr = editor.getLine(cursor.line);
	const newLineStr = cb(oldLineStr);
	console.info(newLineStr);

	editor.replaceRange(
		newLineStr,
		{ line: cursor.line, ch: 0 },
		{ line: cursor.line, ch: oldLineStr.length }
	);
	editor.setCursor({
		line: cursor.line,
    // If `cursor.ch` is 0, simply leaving it at the start of the line is generally the desired
    // behavior since its position there doesn't indicate a specific spot in the middle of the line.
    // Thus modifying the line shouldn't modify the cursor position since there is no "spot" to
    // preserve.
		ch: cursor.ch ? Math.max(cursor.ch + newLineStr.length - oldLineStr.length, 0) : 0,
	});
};

export const replaceCurrentLineViaStringReplace = (
	editor: o.Editor | undefined,
	old: RegExp | string,
	newStr: string
) => {
	replaceCurrentLine(editor, (line) => line.replace(old, newStr));
};
