import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function EditPatient() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [userId, setUserId] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const { id } = useParams();

  useEffect(() => {
    getPatientById();
  }, []);

  // Get Patient by ID using Axios Method
  const getPatientById = async () => {
    const response = await axios.get(
      `https://hmc-backend-six.vercel.app/api/patients/${id}`
    );
    setFirstName(response.data.userId.firstName);
    setLastName(response.data.userId.lastName);
    setEmail(response.data.userId.email);
    setUsername(response.data.userId.username);
    setPassword(response.data.userId.password);
    setPhone(response.data.phone);
    setAddress(response.data.address);
    setUserId(response.data.userId._id);
    setGender(response.data.gender);
    setDOB(response.data.dob);
  };

  // Update Patient using Axios Method
  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://hmc-backend-six.vercel.app/api/patients/${id}`,
        {
          firstName,
          lastName,
          username,
          email,
          phone,
          password,
          address,
          gender,
          dob,
          userId,
        }
      );

      toast.success("Patient updated successfully");
      navigate("/patients");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (password.length > 0 && password?.trim()?.length <= 6) {
      setPasswordValidationMessage(
        "Password Length must be greater than 6 characters"
      );
    } else {
      setPasswordValidationMessage("");
    }
  }, [password]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h3 className="page-title">Edit Patient</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="addPatientForm"
                  name="addPatientForm"
                  onSubmit={updatePatient}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="firstName"
                          className="form-control"
                          type="text"
                          required
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          name="lastName"
                          className="form-control"
                          type="text"
                          required
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          name="username"
                          className="form-control"
                          type="text"
                          required
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          className="form-control"
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          className="form-control"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone </label>
                        <input
                          name="phone"
                          className="form-control"
                          type="text"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Address </label>
                        <input
                          name="address"
                          className="form-control"
                          type="text"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          name="gender"
                          className="form-select"
                          value={gender}
                          onChange={(event) => setGender(event.target.value)}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Date of Birth </label>
                        <input
                          name="dob"
                          className="form-control"
                          type="date"
                          value={dob}
                          onChange={(event) => setDOB(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Update Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default EditPatient;
