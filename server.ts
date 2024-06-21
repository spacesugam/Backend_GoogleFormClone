import express from 'express';
import * as fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const index = parseInt(req.query.index as string);

    // Read the submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index as string);

    // Read the submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    if (index >= 0 && index < submissions.length) {
        // Remove the submission at the specified index
        submissions.splice(index, 1);
        // Write the updated submissions back to the JSON file
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions));
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.put('/edit', (req, res) => {
    const index = parseInt(req.query.index as string);
    const updatedSubmission = req.body;

    // Read the submissions from the JSON file
    const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    

    if (index >= 0 && index < submissions.length) {
        // Update the submission data
        submissions[index] = updatedSubmission;
        // Write the updated submissions back to the JSON file
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions));
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
