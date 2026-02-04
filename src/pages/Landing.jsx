import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useNavigate } from "react-router-dom";
import "../App.css";

gsap.registerPlugin(TextPlugin);

export default function Landing() {
  const navigate = useNavigate();

  /* ---------- REFS ---------- */
  const splashRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const descriptionRef = useRef(null);
  const authCardRef = useRef(null);

  /* ---------- STATE ---------- */
  const [isLogin, setIsLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [userType, setUserType] = useState(null); // customer | vendor

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    companyName: "",
    businessType: "",
    gstNumber: "",
  });

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    gsap.set(mainRef.current, { opacity: 0 });
    gsap.set(authCardRef.current, { x: 160, y: 40, opacity: 0, scale: 0.9 });

    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { scale: 0, rotationY: 180 },
      { scale: 1.2, rotationY: 0, duration: 1.2, ease: "back.out(1.7)" }
    )
      .to(logoRef.current, { scale: 1, duration: 0.3 })
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      .to(textRef.current, {
        text: "Welcome to MOHAMMAD Software Service",
        duration: 2.5,
      })
      .to(splashRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1,
      })
      .to(mainRef.current, { opacity: 1, duration: 1 }, "-=1")
      .to(headlineRef.current, {
        text: " Welcome to MOHAMMAD Software ",
        duration: 2.5,
      })
      .to(subheadlineRef.current, {
        text: "My adaptability isn’t survival — it’s strategic dominance",
        duration: 1.5,
      })
      .to(descriptionRef.current, {
        text:
          " Every version of me exists to dominate, syncing to every frequency until I control the rhythm. ",
        duration: 4,
      })
      .to(heroRef.current, {
        xPercent: 8,
        delay: 1,
        duration: 1.2,
      })
      .to(authCardRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.6");
  }, []);

  /* ---------- HANDLERS ---------- */

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const payload = {
      user_type: userType,
      name: userType === "customer" ? formData.name : formData.companyName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: userType === "customer" ? formData.address : null,
      company_name: userType === "vendor" ? formData.companyName : null,
      business_type: userType === "vendor" ? formData.businessType : null,
      gst_number: userType === "vendor" ? formData.gstNumber : null,
    };

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful!");
        setShowRegister(false);
        setIsLogin(true);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleLogin = (type) => {
    if (type === "customer") navigate("/homepage");
    if (type === "vendor") navigate("/vendor-dashboard");
  };

  /* ---------- UI ---------- */

  return (
    <div className="container">
      {/* SPLASH */}
      <div ref={splashRef} className="splash">
        <img ref={logoRef} src="image.png" className="logo" alt="Logo" />
        <h1 ref={titleRef} className="title">MOHAMMMAD Software</h1>
        <p ref={textRef} className="subtitle"></p>
      </div>

      {/* MAIN */}
      <main ref={mainRef} className="main">
        <header className="header">
          <div className="logo-container">
            <img src="image.png" className="mini-logo" alt="logo" />
            <span className="brand">MOHAMMAD Software </span>
          </div>
        </header>

        <section className="hero-auth-wrapper">
          {/* HERO */}
          <div ref={heroRef} className="content hero-left">
            <h1 ref={headlineRef} className="headline"></h1>
            <h2 ref={subheadlineRef} className="subheadline"></h2>
            <p ref={descriptionRef} className="description"></p>
          </div>

          {/* AUTH CARD */}
          <div ref={authCardRef} className={`registration-card ${isLogin ? "login" : "signup"}`}>
            <div className="card-inner">
              {/* LOGIN */}
              <div className="card-front">
                <h2>Login</h2>
                <input placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div className="extras">
                  <span onClick={() => alert("Forgot Password")}>Forgot Password?</span>
                  <span onClick={() => navigate("/homepage")}>Continue as Guest</span>
                </div>
                <button className="btn login-btn" onClick={() => handleLogin("customer")}>Login</button>
                <div className="socials">
                  <button className="btn google">Google</button>
                  <button className="btn facebook">Facebook</button>
                </div>
                <span className="toggle" onClick={() => setIsLogin(false)}>Signup</span>
              </div>

              {/* SIGNUP */}
              <div className="card-back">
                <h2>Register As</h2>
                <button className="btn" onClick={() => { setUserType("customer"); setShowRegister(true); }}>Customer</button>
                <button className="btn" onClick={() => { setUserType("vendor"); setShowRegister(true); }}>Vendor</button>
                <span className="toggle" onClick={() => setIsLogin(true)}>Back to Login</span>
              </div>
            </div>
          </div>
        </section>

        {/* REGISTRATION FORM */}
        {showRegister && (
          <div className="registration-form-overlay">
            <div className="registration-form">
              <h2>{userType === "customer" ? "Customer" : "Vendor"} Registration</h2>

              {userType === "customer" ? (
                <>
                  <input name="name" placeholder="Full Name" onChange={handleInput} />
                  <input name="email" placeholder="Email" onChange={handleInput} />
                  <input name="password" type="password" placeholder="Password" onChange={handleInput} />
                  <input name="phone" placeholder="Phone" onChange={handleInput} />
                  <input name="address" placeholder="Address" onChange={handleInput} />
                </>
              ) : (
                <>
                  <input name="companyName" placeholder="Company Name" onChange={handleInput} />
                  <input name="email" placeholder="Email" onChange={handleInput} />
                  <input name="password" type="password" placeholder="Password" onChange={handleInput} />
                  <input name="phone" placeholder="Phone" onChange={handleInput} />
                  <input name="businessType" placeholder="Business Type" onChange={handleInput} />
                  <input name="gstNumber" placeholder="GST Number" onChange={handleInput} />
                </>
              )}

              <div className="form-buttons">
                <button className="btn signup-btn" onClick={handleRegister}>Register</button>
                <button className="btn cancel-btn" onClick={() => setShowRegister(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          © 2025 MOHAMMAD Software . All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}

