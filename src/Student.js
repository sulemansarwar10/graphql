import { useQuery, gql } from "@apollo/client";

const GET_STUDENTS = gql`
    query {
      students {
        id,
        name,
        email,
      age
          }
    }
  `;

function Student() {

  const { loading, error, data } = useQuery(GET_STUDENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  const { students } = data;

  return (
    <div>
      <h1>hello data</h1>
      {console.log(students)}
      <table border="3" width={500}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>

          </tr>
        </thead>
        <tbody>
          {students.map(dat => {
            return (
              <tr key={dat.id}>
                <td>{dat.name}</td>
                <td>{dat.email}</td>
                <td>{dat.age}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );

}

export default Student
