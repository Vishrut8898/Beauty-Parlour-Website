const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact.js');
const Appointment = require('../models/Appointment.js');
const Service = require('../models/Service.js');
const nodemailer = require('nodemailer');

// All Authors Route
router.get('/', async (req, res) => {
    const services = await Service.find();
    res.render('index', {services: services, show: false,});
})

router.get('/appointment', async (req, res) => {
  res.render('appointment', {show: false})
})

router.post('/', async (req, res) => {
    const services = await Service.find();
    const contact = new Contact({
        fullName: req.body.contactName,
        email: req.body.contactEmail,
        subject: req.body.contactSubject,
        message: req.body.contactMessage,
    })
    const newContact = await contact.save();

    const output = `
        <p>You have a New Enquiry Request</p>
        <h3>Details</h3>
        <ul>  
        <li>Name: ${req.body.contactName}</li>
        <li>Email: ${req.body.contactEmail}</li>
        <li>Subject: ${req.body.contactSubject}</li>
        <li>Message: ${req.body.contactMessage}</li>
        </ul>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'lucifermorningstar9869@outlook.com', // generated ethereal user
            pass: 'dummy@12345'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Shree Santoshi Beauty Parlour" <lucifermorningstar9869@outlook.com>', // sender address
        to: 'lucifermorningstar9869@gmail.com', // list of receivers
        subject: 'Enquiry Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.render('index', {show: true, services: services, title: 'Oops !', text: 'Well, I think something went wrong while you wanted to contact us'})
            return console.log(error);
        }
        res.render('index', {show: true, services: services, title: 'Yippie !!', text: 'Your response has been submitted. You will hear from us in less than 24 hours. Have a GOOD DAY :)'})

        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
})

router.post('/appointment', async (req, res) => {
    const appointment = new Appointment({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.appointmentEmail,
        service: req.body.appointmentService,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime
    })
    const newAppointment = await appointment.save()

    const output = `
        <p>You have a new appointment request</p>
        <h3>Details</h3>
        <ul>  
        <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
        <li>Email: ${req.body.appointmentEmail}</li>
        <li>Service: ${req.body.appointmentService}</li>
        <li>Appointment Date: ${req.body.appointmentDate}</li>
        <li>Appointment Time: ${req.body.appointmentTime}</li>
        </ul>
    `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'lucifermorningstar9869@outlook.com', // generated ethereal user
        pass: 'dummy@12345'  // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Shree Santoshi Beauty Parlour" <lucifermorningstar9869@outlook.com>', // sender address
      to: 'lucifermorningstar9869@gmail.com', // list of receivers
      subject: 'Appointment Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.render('appointment', {show: true, title: 'Oops !', text: 'Well, I think something went wrong while you wanted to contact us'})
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('appointment', {show: true, title: 'Yippie !!', text: 'Your response has been submitted. You will hear from us in less than 24 hours. Have a GOOD DAY :)'})
  });
})

module.exports = router;