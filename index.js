import CryptoJS from 'crypto-js';
import {readFileSync, writeFileSync} from 'fs';

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let [, , inputDirectory, outputFile, password] = process.argv;

if (inputDirectory === undefined || outputFile === undefined) {
    console.error('Usage: <input directory> <output file> [password]');
    process.exit(1);
}

if (password === undefined) password = Array(64).fill(0).map(() => CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))).join('');

const input = readFileSync(inputDirectory).toString();
const result = CryptoJS.AES.encrypt(input, password).toString();
const outputDirectory = `docs/${outputFile}`;

writeFileSync(outputDirectory, result);

console.log(`Encrypted ${inputDirectory} to ${outputDirectory} using password "${password}"`);
