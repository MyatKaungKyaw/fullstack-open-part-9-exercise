import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (daily_exercises == null || target == null) return res.send({ error: "parameters missing" });
    if (!Array.isArray(daily_exercises)) return res.send({ error: "malformatted parameters" });

    const dailyHours = daily_exercises.map(hour => Number(hour));
    const targetHour = Number(target);

    const isNaNDailyHours = dailyHours.every(hour => !isNaN(hour));
    console.log(dailyHours,isNaNDailyHours);
    if (isNaN(targetHour) || !isNaNDailyHours) return res.send({ error: "malformatted parameters" });

    const result = calculateExercises({dailyHours,targetHour,});
    return res.send(result);
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});