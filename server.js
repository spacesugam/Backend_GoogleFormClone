"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const dbFilePath = 'db.json';
app.get('/ping', (req, res) => {
    res.json(true);
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Read the existing submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    // Add the new submission to the array
    submissions.push({ name, email, phone, github_link, stopwatch_time });
    // Write the updated submissions back to the JSON file
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions));
    res.sendStatus(200);
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index);
    // Read the submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index);
    // Read the submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    if (index >= 0 && index < submissions.length) {
        // Remove the submission at the specified index
        submissions.splice(index, 1);
        // Write the updated submissions back to the JSON file
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions));
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
app.put('/edit', (req, res) => {
    const index = parseInt(req.query.index);
    const updatedSubmission = req.body;
    // Read the submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    if (index >= 0 && index < submissions.length) {
        // Update the submission data
        submissions[index] = updatedSubmission;
        // Write the updated submissions back to the JSON file
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions));
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=server.js.map