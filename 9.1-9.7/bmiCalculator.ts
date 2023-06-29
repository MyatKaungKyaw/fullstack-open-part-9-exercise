const calculateBmi = (height: number, weight: number): string => {
    const BMI = weight / Math.pow((height / 100),2);

    if (BMI < 16 && BMI < 0) {
        return 'Underweight (Severe thinness)';
    } else if (BMI < 17) {
        return 'Underweight (Moderate thinness)'
    } else if (BMI < 18.5) {
        return 'Underweight (Mild thinness)';
    } else if (BMI < 25) {
        return 'Normal range';
    } else if (BMI < 30) {
        return 'Overweight (Pre-obese)';
    } else if (BMI < 35) {
        return 'Obese (Class I)';
    } else if (BMI < 40) {
        return 'Obese (Class II)';
    } else if (BMI >= 40) {
        return 'Obese (Class III)';
    }
    throw new Error('something went worng');
};

console.log(calculateBmi(180, 74))