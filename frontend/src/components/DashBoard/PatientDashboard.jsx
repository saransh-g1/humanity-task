import styles from "./Dashboard.module.css";
import { React, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { UserContext } from "../../Context/UserContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import Button from "@mui/material/Button";

export default function PatientDashboard() {
  const { currentUser } = useContext(UserContext);
  const [firstAppointmentInFuture, setFirstAppointmentInFuture] = useState({});
  const [prescriptions, setPrescription] = useState([]);

  const getAppMonth = (dateOfJoining) => {
    if (!dateOfJoining) {
      return;
    }
    // console.log("dateOfJoining",dateOfJoining);
    let month = new Date(dateOfJoining.slice(0, -1)).getMonth();
    // console.log("dateOfJoining",dateOfJoining);
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthList[month];
  };

  const getAppDate = (dateOfJoining) => {
    if (!dateOfJoining) {
      return;
    }
    // console.log("dateOfJoining",dateOfJoining);
    let date = new Date(dateOfJoining.slice(0, -1)).getDate();
    // console.log("dateOfJoining",dateOfJoining);
    return date;
  };

  const getAppYear = (dateOfJoining) => {
    if (!dateOfJoining) {
      return;
    }
    // console.log("dateOfJoining",dateOfJoining);
    let year = new Date(dateOfJoining.slice(0, -1)).getFullYear();
    // console.log("dateOfJoining",dateOfJoining);
    return year;
  };

  const getBookedSlots = async () => {
    let response = await axios.post(
      `http://localhost:8080/api/appointments`,
      {
        isTimeSlotAvailable: false,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.message == "success") {
      // getAvailableSlot();
      // window.alert("success add")
      // setAvailableSlot(response.data.appointments)
      let aptms = response.data.appointments;
      console.log("aptms", aptms);
      // console.log(firstAppointmentInFuture)
      const futureAppointments = aptms.filter((appointment) => {
        const appointmentDate = new Date(
          appointment.appointmentDate.slice(0, -1)
        );
        const now = new Date();
        return appointmentDate > now;
      });
      console.log("futureAppointments", futureAppointments);

      if (futureAppointments && futureAppointments.length > 0) {
        const sortedAppointments = futureAppointments.sort((a, b) => {
          const aDate = new Date(a.appointmentDate.slice(0, -1));
          const bDate = new Date(b.appointmentDate.slice(0, -1));
          return aDate - bDate;
        });
        console.log("sortedAppointments", sortedAppointments);
        let firstApp = sortedAppointments.find((appointment) => {
          const appointmentDate = new Date(
            appointment.appointmentDate.slice(0, -1)
          );
          const now = new Date();
          return appointmentDate > now;
        });
        console.log(firstApp);
        setFirstAppointmentInFuture(firstApp);
      }

      // setBookedAppointments(sortedAptms);
      // console.log(aptms)
    } else {
      // window.alert("error add")
    }
  };
  const getPrescription = async () => {
    let response = await axios.post(
      `http://localhost:8080/api/prescriptions`,
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.message == "success") {
      let respPrescription = response.data.prescriptions;
      let newResp = respPrescription.sort((a, b) => {
        const timeA = new Date(
          `${moment(
            new Date(a.appointmentId.appointmentDate.slice(0, -1))
          ).format("MM/DD/YYYY")} ${a.appointmentId.appointmentTime}`
        );
        const timeB = new Date(
          `${moment(
            new Date(b.appointmentId.appointmentDate.slice(0, -1))
          ).format("MM/DD/YYYY")} ${b.appointmentId.appointmentTime}`
        );
        // console.log(timeA)
        return timeB - timeA;
      });
      //   console.log(newResp);
      setPrescription(newResp);
    }
  };

  useEffect(() => {
    getBookedSlots();
    getPrescription();
  }, []);

  return (
    <Box
      className={styles.dashboardBody}
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
    >
      <div id={styles.welcomeBanner}>
        <div className="text-white">
          <h3>Welcome!</h3>
          <br />
          <h4>
            {" "}
            {currentUser.firstName} {currentUser.lastName}{" "}
          </h4>
          <br />
          <div class={styles.horizontalLine}></div>
          At Green Hills, we believe that every patient deserves the highest
          quality care possible.
          <br />
          Our commitment to excellence in healthcare is matched only by our
          compassion for those we serve.
        </div>
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="customPatientApt mx-auto">
            <div className="topicHeader">
              <h3 className="text-center">Upcoming Appointment</h3>
            </div>
            
            <div className="topicContent" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
  {firstAppointmentInFuture.appointmentDate && (
    <div className="contentCard" style={{ display: 'flex', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <div className="apDate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '80px', marginRight: '20px', borderRight: '1px solid #eaeaea', paddingRight: '20px' }}>
        <p className="date" style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
          {getAppDate(firstAppointmentInFuture.appointmentDate)}
        </p>
        <p style={{ margin: '5px 0', textAlign: 'center' }}>
          {getAppMonth(firstAppointmentInFuture.appointmentDate)}
        </p>
        <p style={{ margin: '0', textAlign: 'center' }}>
          {getAppYear(firstAppointmentInFuture.appointmentDate)}
        </p>
      </div>
      <div className="apDetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1' }}>
        <p className="py-2" style={{ margin: '5px 0' }}>
          <span className="fw-bold" style={{ fontWeight: 'bold', minWidth: '120px', display: 'inline-block' }}>Doctor Name </span>:{" "}
          {firstAppointmentInFuture?.doctorId?.userId.firstName}{" "}
          {firstAppointmentInFuture?.doctorId?.userId.lastName}
        </p>
        <p className="py-2" style={{ margin: '5px 0' }}>
          <span className="fw-bold" style={{ fontWeight: 'bold', minWidth: '120px', display: 'inline-block' }}>Department </span>:{" "}
          {firstAppointmentInFuture?.doctorId?.department}
        </p>
        <p className="py-2" style={{ margin: '5px 0' }}>
          <span className="fw-bold" style={{ fontWeight: 'bold', minWidth: '120px', display: 'inline-block' }}>Time</span>:{" "}
          {firstAppointmentInFuture?.appointmentTime}
        </p>
      </div>
    </div>
  )}
  {!firstAppointmentInFuture.appointmentDate && (
    <div className="contentCard-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <p className="fw-bolder" style={{ fontWeight: 'bold', fontSize: '18px', margin: '0 0 15px 0' }}>You have no upcoming Appointments</p>
      <p className="mt-5" style={{ marginTop: '20px' }}>
        Would you like to book a new Appointment?
      </p>
      <Button
        variant="contained"
        color="success"
        className="my-3"
        startIcon={<BookOnlineIcon />}
        component={NavLink}
        to="/appointments"
      >
        Book Now
      </Button>
    </div>
  )}
</div>
</div>
</div>
<div className="col-md-6 col-sm-12">
<div className="customPatientApt mx-auto">
  <div className="topicHeader">
    <h3 className="text-center">Patient History</h3>
  </div>
  <div className="topicContent" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
    {prescriptions[0]?.appointmentId && (
      <div className="contentCard" style={{ display: 'flex', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div className="apDate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '80px', marginRight: '20px', borderRight: '1px solid #eaeaea', paddingRight: '20px' }}>
          <p className="date" style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
            {getAppDate(
              prescriptions[0]?.appointmentId?.appointmentDate
            )}
          </p>
          <p style={{ margin: '5px 0', textAlign: 'center' }}>
            {getAppMonth(
              prescriptions[0]?.appointmentId?.appointmentDate
            )}
          </p>
          <p style={{ margin: '0', textAlign: 'center' }}>
            {getAppYear(
              prescriptions[0]?.appointmentId?.appointmentDate
            )}
          </p>
        </div>
        <div className="apDetails" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1' }}>
          <p className="py-2" style={{ margin: '5px 0' }}>
            <span className="fw-bold" style={{ fontWeight: 'bold', minWidth: '120px', display: 'inline-block' }}>Doctor Name </span>:{" "}
            {
              prescriptions[0]?.appointmentId?.doctorId?.userId
                ?.firstName
            }{" "}
            {
              prescriptions[0]?.appointmentId?.doctorId?.userId
                ?.lastName
            }
          </p>
          <p className="py-2" style={{ margin: '5px 0' }}>
            <span className="fw-bold" style={{ fontWeight: 'bold', minWidth: '120px', display: 'inline-block' }}>Department </span>:{" "}
            {prescriptions[0]?.appointmentId?.doctorId?.department}
          </p>
          <p className="py-2" style={{ margin: '5px 0' }}>
            <span className="fw-bold" style={{ fontWeight: 'bold', minWidth: '120px', display: 'inline-block' }}> Doctor's Remarks </span> :{" "}
            {prescriptions[0]?.remarks}
          </p>
        </div>
      </div>
    )}
    {!prescriptions[0]?.appointmentId && (
      <div className="contentCard-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <p className="fw-bolder" style={{ fontWeight: 'bold', fontSize: '18px', margin: '0' }}>
          You have no medical history in this hospital
        </p>
      </div>
    )}
  </div>

          </div>
        </div>
      </div>
    </Box>
  );
}
