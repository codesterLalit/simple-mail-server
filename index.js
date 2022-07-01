let express = require("express"),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 8081;

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',function(req,res,){
  res.send("app working")
})
app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
          // should be replaced with real sender's account
          user: 'test@gmail.com', // your gmail
          pass: 'password' // your password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: 'laalit.sunaar@gmail.com',
      subject: `Student request form ${req.body.name}`,
      text: `
      student name: ${req.body.name},
        email : ${req.body.email},
        phone: ${req.body.phone},
        ielt: ${req.body.ielt},
        date: ${req.body.date}
      `
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

let server = app.listen(port, function(){
    
    console.log("Server started at http://localhost:%s", port);
});