CREATE DATABASE healthcare;
USE healthcare;

CREATE TABLE Patients (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    DateOfBirth DATE,
    Gender VARCHAR(15),
    ContactNumber VARCHAR(15),
    Email VARCHAR(255),
    Password VARCHAR(255),
    Address TEXT
);
CREATE TABLE Doctors (
    DoctorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Specialization VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(255)
);
CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    Status ENUM('Scheduled', 'Completed', 'Cancelled'),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
CREATE TABLE MedicalRecords (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    Date DATE,
    Diagnosis TEXT,
    Medications TEXT,
    Treatments TEXT,
    Notes TEXT,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);
CREATE TABLE Bills (
    InvoiceID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    Date DATE,
    TotalAmount DECIMAL(10, 2),
    PaymentStatus ENUM('Paid', 'Pending'),
    PaymentMethod VARCHAR(255),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);

INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Password, Address) 
VALUES ('John', 'Doe', '1990-05-15', 'Male', '1234567890', 'john.doe@example.com', 'password123', '123 Main St, City, State, Zip');

INSERT INTO Doctors (FirstName, LastName, Specialization, ContactNumber, Email) 
VALUES ('Michael', 'Johnson', 'Pediatrics', '1234567890', 'michael.johnson@hospital.com');

INSERT INTO Appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Status) 
VALUES (2, 2, '2024-04-21', '14:30:00', 'Scheduled')

INSERT INTO MedicalRecords (PatientID, Date, Diagnosis, Medications, Treatments, Notes) 
VALUES (1, '2024-04-20', 'Hypertension', 'Lisinopril', 'Regular check-ups', 'Patient needs to monitor blood pressure');

INSERT INTO MedicalRecords (PatientID, Date, Diagnosis, Medications, Treatments, Notes) 
VALUES (4, '2024-03-15', 'Diabetes', 'Metformin', 'Insulin therapy', 'Diet control is essential');

INSERT INTO MedicalRecords (PatientID, Date, Diagnosis, Medications, Treatments, Notes) 
VALUES (4, '2024-02-10', 'Asthma', 'Albuterol', 'Inhaler usage', 'Avoid triggers like dust and pollen');

INSERT INTO MedicalRecords (PatientID, Date, Diagnosis, Medications, Treatments, Notes) 
VALUES (4, '2024-01-05', 'Hyperthyroidism', 'Methimazole', 'Thyroid function tests', 'Regular monitoring of thyroid levels');

INSERT INTO Bills (PatientID, Date, TotalAmount, PaymentStatus, PaymentMethod) 
VALUES (4, '2024-04-20', 150.00, 'Paid', 'Credit Card');

INSERT INTO Bills (PatientID, Date, TotalAmount, PaymentStatus, PaymentMethod) 
VALUES (4, '2024-03-15', 200.00, 'Pending', 'Cash');

INSERT INTO Bills (PatientID, Date, TotalAmount, PaymentStatus, PaymentMethod) 
VALUES (4, '2024-02-10', 100.00, 'Paid', 'Debit Card');

INSERT INTO Bills (PatientID, Date, TotalAmount, PaymentStatus, PaymentMethod) 
VALUES (4, '2024-01-05', 250.00, 'Pending', 'Online Transfer');

-- Inserting the fifth invoice
INSERT INTO Bills (PatientID, Date, TotalAmount, PaymentStatus, PaymentMethod) 
VALUES (4, '2024-03-01', 180.00, 'Paid', 'Credit Card');

-- Inserting the sixth invoice
INSERT INTO Bills (PatientID, Date, TotalAmount, PaymentStatus, PaymentMethod) 
VALUES (4, '2024-02-15', 220.00, 'Pending', 'Cash');

UPDATE Bills SET PaymentStatus = "Paid", PaymentMethod = "Credit Card" WHERE PatientID = 4 AND TotalAmount = 220;