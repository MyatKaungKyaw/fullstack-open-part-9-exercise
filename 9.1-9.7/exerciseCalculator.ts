interface exercisesResult extends rate {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    target: number,
    average: number,
}

interface rate {
    rating: 1 | 2 | 3,
    ratingDescription: string,
}

const calculateExercises = (dailyHours: number[], targetHour: number): exercisesResult => {
    const trainingDays = dailyHours.filter(hour => hour > 0).length;
    const periodLength = dailyHours.length;
    const averageHour = dailyHours.reduce((total, hour) => total += hour, 0) / dailyHours.length;
    const rateResult = ((): rate => {
        const percent = averageHour / targetHour
        if (percent >= 1) {
            return {
                rating: 3,
                ratingDescription: 'good',
            };
        } else if (percent >= 0.9) {
            return {
                rating: 2,
                ratingDescription: 'not bad',
            };
        }
        return {
            rating: 1,
            ratingDescription: 'not good',
        };
    })();

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: averageHour >= targetHour,
        rating: rateResult.rating,
        ratingDescription: rateResult.ratingDescription,
        target: targetHour,
        average: averageHour,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
console.log(calculateExercises([3, 4, 2, 4.5, 4, 3, 1], 2))
console.log(calculateExercises([3, 4, 2, 4.5, 0, 3, 1], 2))
console.log(calculateExercises([0, 0, 2, 4.5, 0, 3, 1], 2))
console.log(calculateExercises([0, 0, 0, 4.5, 0, 3, 1], 2))
console.log(calculateExercises([3, 0, 0, 4.5, 0, 0, 0], 2))
console.log(calculateExercises([0, 0, 0, 4.5, 0, 0, 0], 2))
console.log(calculateExercises([0, 0, 0, 0, 0, 0, 0], 2))