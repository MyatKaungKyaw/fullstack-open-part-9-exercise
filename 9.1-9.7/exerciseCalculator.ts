interface exercisesResult extends rate{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    target: number,
    average: number,
}

interface rate{
    rating: 1 | 2 | 3,
    ratingDescription: string,
}

const calculateExercises = (dailyHours: [number], targetHour: number): exercisesResult => {
    const trainingDays = dailyHours.filter(hour => hour > 0).length;
    const periodLength = dailyHours.length;
    const rateResult = ((): rate => {
        const percent = trainingDays / periodLength
        if (percent >= 0.7) {
            return {
                rating:3, 
                ratingDescription: 'good',
            };
        } else if (percent >= 0.5) {
            return {
                rating: 2,
                ratingDescription: 'not bad',
            };
        }
        return {
            rating: 1,
            ratingDescription: 'not bad',
        };
    })();
    const average = dailyHours.reduce((total,hour) => total += hour,0)/dailyHours.length;

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: trainingDays >= periodLength,
        rating: rateResult.rating,
        ratingDescription: rateResult.ratingDescription,
        target: targetHour,
        average: average,
    };
};