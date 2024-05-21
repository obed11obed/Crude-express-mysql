import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function Update() {
  const {id} = useParams();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/update/"+id, values)
      .then((res) => navigate('/'))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getit/"+id)
      .then((res) =>setValues({
          ...values,
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname,
          email: res.data[0].email,
        })
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            placeholder="First nane"
            name="firstname"
            value={values.firstname}
            onChange={(e) =>
              setValues({ ...values, firstname: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="Lastname">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Last name"
            name="lastname"
            value={values.lastname}
            onChange={(e) => setValues({ ...values, lastname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          style={{ marginRight: "20px" }}
        >
          Submit User{" "}
        </button>

        <Link to="/" className="btn btn-warning ml-5">
          Cancel
        </Link>
      </form>
    </div>
  );
}
