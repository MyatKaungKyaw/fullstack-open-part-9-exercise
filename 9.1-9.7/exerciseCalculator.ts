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
    const rate = ((): rate => {
        const percent = trainingDays / periodLength
        if (percent >= 0.7) {
            return 3;
        } else if (percent >= 0.5) {
            return 2;
        }
        return 1;
    })();

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: trainingDays >= periodLength,
        rating: rate.rating,
        ratingDescription: rate.ratingDescription,
        
    };
};