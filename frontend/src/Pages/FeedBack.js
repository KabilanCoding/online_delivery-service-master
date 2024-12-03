import React from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useState } from "react";
const Contact = () => {
  const [mail, setMail] = useState("");
  const [feed, setFeed] = useState("");

  const handleFeedback = (e) => {
    console.log(mail);
    console.log(feed);
    e.preventDefault();
    axios
      .post("http://localhost:8082/api/v1/feed/addFeedback", {
        email: mail,
        feedback: feed,
      })
      .then((res) => {
        alert("Feedback added successfully");
      })
      .catch((e) => {
        alert("Error occured while submitting");
        console.log(e);
      });
  };

  return (
    <>
      <Navbar />
      <body className="con">
        <div class="container2">
          <div class="content2">
            <div class="left-side2">
              <div class="address details2">
                <i class="fas fa-map-marker-alt"></i>
                <div class="topic">Address</div>
                <div class="text-one">123 Main Street,Anytown</div>
                <div class="text-two">Coimbatore </div>
              </div>
              <div class="phone details2">
                <i class="fas fa-phone-alt"></i>
                <div class="topic">Phone</div>
                <div class="text-one">1800 200 6668</div>
                <div class="text-two">1900 100 6769</div>
              </div>
              <div class="email details2">
                <i class="fas fa-envelope"></i>
                <div class="topic">Email</div>
                <div class="text-one">ZipZap@gmail.com</div>
                <div class="text-two">Admin@gmail.com</div>
              </div>
            </div>
            <div class="right-side2">
              <div class="color-orange">Send us a message</div>
              <p>ZipZap PVT LTD </p>
              <form action="#">
                <div class="input-box">
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div class="input-box">
                  <input
                    type="text"
                    value={mail}
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                    placeholder="Enter your email"
                  />
                </div>
                <div class="input-box message-box">
                  <input
                    className="vino3"
                    type="text"
                    value={feed}
                    onChange={(e) => {
                      setFeed(e.target.value);
                    }}
                    placeholder="Message"
                  />
                </div>
                <div class="button">
                  <input
                    type="button"
                    onClick={handleFeedback}
                    value="Send Now"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
export default Contact;
