import fs from 'fs';
import type { Code, Paragraph, Root } from 'mdast';
import path from 'path';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkInclude: Plugin<[], Root> = () => {
	return (tree, file) => {
		const baseDir = file.path ? path.dirname(file.path) : process.cwd();

		visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
			const first = node.children[0];
			if (first?.type === 'text' && first.value.startsWith('!include')) {
				const match = first.value.match(/!include\s+(.*)/);
				if (match) {
					const includePath = path.resolve(baseDir, match[1].trim());
					const content = fs.readFileSync(includePath, 'utf8');

					if (parent && typeof index === 'number') {
						const codeNode: Code = {
							type: 'code',
							lang: 'text',
							value: content,
						};
						parent.children.splice(index, 1, codeNode);
					}
				}
			}
		});
	};
};
