
interface BMIinput {
    height: number,
    weight: number,
};

const parseArguments = (args: string[]): BMIinput => {
    if (args.length > 4) throw new Error('not enough arguments');
    if (args.length < 4) throw new Error('too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        }
    } else {
        throw new Error('Provided values are not number.')
    }
};

const calculateBmi = ({ height, weight }: BMIinput): string => {
    const BMI = weight / Math.pow((height / 100), 2);

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

// console.log(calculateBmi(180, 74))\

try {
    const BMIinput = parseArguments(process.argv)
    console.log(calculateBmi(BMIinput))
} catch (error: unknown) {
    const errorMsg = error instanceof Error ? 'Error: ' + error.message : 'Something went wrong';
    console.log(errorMsg)
}