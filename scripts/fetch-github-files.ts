import fs from 'fs';
import path from 'path';

const files = [
	'.github/workflows/ci.yml',
	'.github/workflows/deploy.yml',
	'terraform/main.tf',
];

const targetFolder = 'public/files';

function destinationFileName(fileName: string) {
	return fileName.replace(/^\./, '').split('/').join('-');
}

async function fetchFile(filePath: string) {
	const response = await fetch(
		`https://api.github.com/repos/calisera-io/calisera-project-blog/contents/${filePath}`,
	);
	const data = await response.json();
	return Buffer.from(data.content, 'base64').toString();
}

async function main() {
	const baseDir = process.cwd();
	fs.mkdirSync(path.resolve(baseDir, targetFolder), { recursive: true });

	for (const file of files) {
		const download = await fetchFile(file);
		fs.writeFileSync(
			path.resolve(baseDir, targetFolder, destinationFileName(file)),
			download,
		);
	}
}

main().catch(console.error);
