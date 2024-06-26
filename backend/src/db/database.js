const mysql2 = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const pool = mysql2.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE  
}).promise();

const allPatients = async() => {
    const res = await pool.query("SELECT *  FROM Patients");
    return res[0];
};

// Registering a Patient
const register = async ({firstname,lastname,dateofbirth,gender,contactnumber,email,password,address}) => {
    const res = await pool.query("INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Password, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [firstname,lastname,dateofbirth,gender,contactnumber,email,password,address]);
    return res[0];
};

// Logging in a Patient
const loginPatient = async ({email,password}) => {
    const res = await pool.query("SELECT * FROM Patients WHERE Email = ? AND Password = ? ",[email,password]);
    const res1 =  ("CREATE OR REPLACE VIEW loginInfo IS SELECT * FROM Patients WHERE Email = ? AND Password = ?",[email,password]);
    return res[0];
};

// Logging in as a Doctor
const loginDoctor = async ({email,password}) => {
    const res = await pool.query("SELECT * FROM Doctors WHERE Email = ? AND Password = ?" , [email,password]);
    return res[0];
}

//Verifying if the patient exists
const verifyPatient = async ({email,password}) => {
    const res = await pool.query("SELECT * FROM Patients WHERE Email = ? AND Password = ?", [email,password]);
    return res[0];
};

//Verifying if the Doctor exists
const verifyDoctor = async ({email,password}) =>{
    const res = await pool.query("SELECT * FROM Doctors WHERE Email = ? AND Password = ?",[email,password]);
    return res[0];
}

// Get appointments for Patient
// const getAppointments = async (id) => {
//     const res = await pool.query("SELECT * FROM Appointments WHERE PatientID = ?" , [id]);
//     return res[0];
// };

const getAppointments = async (id) => {
    const res = await pool.query("SELECT Appointments.AppointmentID, Appointments.DoctorID, Appointments.PatientID, Appointments.AppointmentDate, Appointments.AppointmentTime, Appointments.Status, Doctors.FirstName AS DoctorFirstName, Doctors.LastName AS DoctorLastName FROM Appointments JOIN Doctors ON Appointments.DoctorID = Doctors.DoctorID WHERE Appointments.PatientID = ?" , [id]);
    return res[0];
};

const getDocAppointments = async (id) => {
    const res = await pool.query("SELECT Appointments.PatientID,Appointments.AppointmentDate, Appointments.Status,Appointments.AppointmentTime,Patients.Firstname, Patients.Lastname FROM Appointments JOIN Patients ON Appointments.PatientID = Patients.PatientID AND Appointments.DoctorID = ?", [id]);
    return res[0];
};

const addAppointments = async ({PatientID,DoctorID,appointmentDate,appointmentTime,Status}) => {
    const res = await pool.query("INSERT INTO Appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Status) VALUES (?, ?, ?, ?, ?)", [PatientID,DoctorID,appointmentDate,appointmentTime,Status]);
    return res[0];
}

const getDoctors = async () => {
    const res = await pool.query("SELECT * FROM doctors");
    return res[0];
};

const getMedicalRecords = async (id) => {
    const res = await pool.query("SELECT * FROM MedicalRecords WHERE PatientID = ?",[id]);
    return res[0];
};
const getBills = async (id) => {
    const res = await pool.query("SELECT * FROM Bills WHERE PatientID = ?",[id]);
    return res[0];
};

const getBillsDoctor = async (id) => {
    const res = await pool.query("SELECT Bills.*,Patients.Firstname,Patients.Lastname FROM Bills JOIN Patients ON Patients.PatientID = Bills.PatientID WHERE DoctorID = ?", [id]);
    return res[0];
};

const addBillsDoctor = async ({PatientID,DoctorID,Date,TotalAmount,PaymentStatus,PaymentMethod}) => {
    const res = await pool.query("INSERT INTO Bills (PatientID, DoctorID, Date, TotalAmount, PaymentStatus, PaymentMethod)  VALUES (?,?,?,?,?,?)",[PatientID,DoctorID,Date,TotalAmount,PaymentStatus,PaymentMethod]);
    return res[0];
};

const updateBill = async ({PatientID,TotalAmount,PaymentMethod}) => {
    const res = await pool.query("UPDATE Bills SET PaymentStatus = 'Paid', PaymentMethod = ? WHERE PatientID = ? AND TotalAmount = ?", [PaymentMethod,PatientID,TotalAmount]);
    return res[0];
}
module.exports = {
    allPatients,register,loginPatient,loginDoctor,verifyPatient,verifyDoctor,getAppointments,getDocAppointments,getDoctors,getBillsDoctor,addAppointments,getMedicalRecords,getBills,updateBill,addBillsDoctor
}