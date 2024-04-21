const mysql2 = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const pool = mysql2.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE  
}).promise();

const result = async() => {
    const res = await pool.query("SELECT *  FROM Patients");
};

// Registering a Patient
const register = async ({firstname,lastname,dateofbirth,gender,contactnumber,email,password,address}) => {
    const res = await pool.query("INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Password, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [firstname,lastname,dateofbirth,gender,contactnumber,email,password,address]);
    return res[0];
};

// Loggin in a Patient
const login = async ({email,password}) => {
    const res = await pool.query("SELECT * FROM Patients WHERE Email = ? AND Password = ? ",[email,password]);
    return res[0];
};

//Verifying if the patient exists
const verifyPatient = async ({email,password}) => {
    const res = await pool.query("SELECT * FROM Patients WHERE Email = ? AND Password = ?", [email,password]);
    return res[0];
};

// Get appointments for Patient
// const getAppointments = async (id) => {
//     const res = await pool.query("SELECT * FROM Appointments WHERE PatientID = ?" , [id]);
//     return res[0];
// };

const getAppointments = async (id) => {
    const res = await pool.query("SELECT Appointments.AppointmentID, Appointments.DoctorID, Appointments.PatientID, Appointments.AppointmentDate, Appointments.AppointmentTime, Appointments.Status, Doctors.FirstName AS DoctorFirstName, Doctors.LastName AS DoctorLastName FROM Appointments JOIN Doctors ON Appointments.DoctorID = Doctors.DoctorID WHERE Appointments.PatientID = ?" , [id]);
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

const updateBill = async ({PatientID,TotalAmount,PaymentMethod}) => {
    const res = await pool.query("UPDATE Bills SET PaymentStatus = 'Paid', PaymentMethod = ? WHERE PatientID = ? AND TotalAmount = ?", [PaymentMethod,PatientID,TotalAmount]);
    return res[0];
}
module.exports = {
    result,register,login,verifyPatient,getAppointments,getDoctors,addAppointments,getMedicalRecords,getBills,updateBill
}