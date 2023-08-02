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
        {coursePart.name} {coursePart.exerciseCount}
      </p>
    ))}
  </>
);

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CoursePartsProps {
  courseParts: CoursePart[];
}

const Total = (props: CoursePartsProps) => (
  <>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header header={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;
