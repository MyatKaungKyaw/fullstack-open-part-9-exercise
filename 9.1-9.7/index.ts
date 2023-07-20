import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();
app.get('hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height)) {
        return res.send({ error: "malformatted parameters" });
    }
    const input = { weight, height };
    const bmiResult = calculateBmi(input);
    return res.send({
        weight: input.weight,
        height: input.height,
        bmi: bmiResult,
    });
});

app.post('/exercise',(req,res) =>{

});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});