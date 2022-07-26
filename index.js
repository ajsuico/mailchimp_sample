const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("mailchimp-marketing");
const app = express();
const https = require('https');
//static folder and body parser middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//mailchimp API config
// mailchimp.setConfig({
//   apiKey: "6840674b532e7ce17b5cd05af6892a7a-us18",
//   server: "us18",
// });

// async function run() {
//   //const response = await mailchimp.ping.get();
//   const response = await client.lists.batchListMembers("0b4e085d87", {
   
//   });
//   console.log(response);
// }

// run();

try {
  app.get('/', function (req, res) {
      res.sendFile(__dirname + "/signup.html");
    })
    
} catch (error) {
  res.status(500).send(error.message);
}

app.post('/', (req,res)=>{
  const{firstName, lastName, eMail}= req.body
  const data ={
    members: [
      {
      email_address: "ajsuico96@gmail.com",
      status: "subscribed",
      merge_fields: {
        FNAME: "firstName",
        LNAME: "lastName"
      }
     }
   ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/0b4e085d87"
  const options = {
    method: "POST",
    auth: "ajs1:f7b6b00d3a96682416b63ba602fb314e-us18"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
  console.log(req.body);
})

app.listen(3000, function(){
  console.log("The Server is in 3000!");
}
)

//mailchimp API key
//6840674b532e7ce17b5cd05af6892a7a-us18
//f7b6b00d3a96682416b63ba602fb314e-us18

//unique id for audience or list id
//0b4e085d87
