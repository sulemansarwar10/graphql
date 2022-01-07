import { useQuery, gql } from "@apollo/client";

const GET_STUDENTS = gql`
    query {
      students {
        id,
        name
      }
    }
  `;

function Student() {

    const { loading, error, data } = useQuery(GET_STUDENTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
    const {students}=data;
    
    return (
        <div>
            <h1>hello data</h1>
            console.log(data)
        </div>
    )

}

export default Student
