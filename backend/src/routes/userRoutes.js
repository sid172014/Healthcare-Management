const express = require('express');
const jwt = require('jsonwebtoken');

// Implementing the router
const router = new express.Router();

// Implementing DB
const {allPatients, register, getAppointments, getDoctors, addAppointments, getMedicalRecords, getBills,getBillsDoctor, updateBill, loginPatient, loginDoctor, getDocAppointments, addBillsDoctor } = require('../db/database');
const authMiddleware = require('../middlewares/auth');

// Registering Users
router.post('/users/signup', async (req, res) => {
    try {
        const addUser = await register(req.body);
        if (!addUser) {
            res.status(400).json({
                message: "Some Error Occured from the DB"
            });
        }
        res.status(201).json({
            message: "User Created Successfully"
        })
    } catch (e) {
        res.status(404).json({
            message: "Internal Server Error"
        });
    }
});

// Logging in users
router.post('/users/login', async (req, res) => {
    try {
        let loginUser = "Patient";
        let user = await loginPatient(req.body);
        if (user.length === 0) {
            user = await loginDoctor(req.body);
            if (user.length === 0) {
                throw new Error("User does not exists")
            }else{
                loginUser  = "Doctor";
            }
        }

        // Generating the Secret Token
        const token = jwt.sign({
            email: user[0].Email,
            password: user[0].Password
        }, 'secret');

        res.json({
            ...user[0], token, type: loginUser
        });
    } catch (e) {
        res.status(404).json({
            message: e.message
        });
    };
});

router.get('/doctors/patients', authMiddleware, async (req,res) => {
    try{
        const response = await allPatients();
        res.send(response);
    }catch(e){ 
        res.status(400).send(e.message);
    }
})

// Getting Patient Info
router.get('/users/profile', authMiddleware, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
});

router.get('/users/appointments', authMiddleware, async (req, res) => {
    try {
        const response = await getAppointments(req.user.PatientID);
        res.send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/doctors/appointments', authMiddleware, async (req,res) => {
    try{
        const response = await getDocAppointments(req.user.DoctorID);
        res.send(response);
    }catch(e){
        res.status(400).send(e.message);
    }
})

router.post('/users/appointments', authMiddleware, async (req, res) => {
    try {
        const response = await addAppointments(req.body);
        res.send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});


router.get('/doctors', authMiddleware, async (req, res) => {
    try {
        const response = await getDoctors();
        res.send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/users/records', authMiddleware, async (req, res) => {
    try {
        const response = await getMedicalRecords(req.user.PatientID);
        res.send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/users/bills', authMiddleware, async (req, res) => {
    try {
        const response = await getBills(req.user.PatientID);
        res.send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/doctors/bills', authMiddleware, async (req,res) => {
    try{
        const response = await getBillsDoctor(req.user.DoctorID);
        res.send(response);
    }catch(e){
        res.status(400).send(e.message);
    }
});

router.post('/doctors/bills' ,authMiddleware, async (req,res) => {
    try{
        const patientID = parseInt(req.body.PatientID);
        const newObject = {
            PatientID : patientID,
            DoctorID : req.user.DoctorID,
            Date : req.body.Date,
            TotalAmount : req.body.TotalAmount,
            PaymentStatus : req.body.PaymentStatus,
            PaymentMethod : req.body.PaymentMethod
        };
        const response = await addBillsDoctor(newObject);
        res.send(response);
    }catch(e){
        res.status(400).send(e.message);
    }
})

router.patch('/users/bills', authMiddleware, async (req, res) => {
    try {
        const newObject = {
            PatientID: req.user.PatientID,
            TotalAmount: req.body.TotalAmount,
            PaymentMethod: req.body.PaymentMethod
        };
        const response = await updateBill(newObject);
        res.send(response)
    } catch (e) {
        res.status(400).send(e.message);
    }
});


module.exports = router;