const Header = (props: HeaderProps) => (
  <>
    <h1>{props.header}</h1>
  </>
);

interface HeaderProps {
  header: string;
}

const Content = (props: CoursePartsProps) => (
  <>
    {props.courseParts.map((coursePart) => (
      <p key={coursePart.name}>
        <Part coursePart={coursePart} />
      </p>
    ))}
  </>
);

const Part = ({ coursePart }: coursePartProp) => {
  const title = <h2>{coursePart.name} {coursePart.exerciseCount}</h2>;
  switch (coursePart.kind) {
    case 'group':
      return <>
        {title}
        <p>project exercises {coursePart.groupProjectCount}</p>
      </>;
    case 'background':
      return <>
        {title}
        {coursePart.description}<br />
        submit to {coursePart.backgroundMaterial}
      </>;
    case 'basic':
      return <>
        {title}
        <p>{coursePart.description}</p>
      </>
    case 'special':
      return <>
        {title}
        {coursePart.description}<br />
        required skills: {coursePart.requirements
          .map((req, index) =>
            coursePart.requirements.length === index + 1
              ? req
              : req + ','
          )};
      </>
    default:
      return coursePart;
  }
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpeical extends CoursePartDescription {
  requirements: string[];
  kind: 'special'
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpeical;

interface CoursePartsProps {
  courseParts: CoursePart[];
}

interface coursePartProp {
  coursePart: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const Total = (props: CoursePartsProps) => (
  <>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  return (
    <div>
      <Header header={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;