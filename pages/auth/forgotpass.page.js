import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/layout/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const router = useRouter();
  const { entity } = router.query; // 'entity' will contain the entity type ('user' or 'mentor')
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const url = new URL(window.location.href);
      const entityTypeFromUrl = url.searchParams.get("entityType");
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forgotPassword?entityType=${entityTypeFromUrl}`;
      const { data } = await axios.post(backendUrl, { email: email });

      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>GrabTern | Frogot Password</title>
      </Head>
      <Header navbarBackground={true} />

      <main className="forgot-password-body">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="forgot-password-form">
            <div className="logout-login">
              <a href="index.html">
                <img src="assets/img/logo/loder.webp" alt="" />
              </a>
            </div>
            <h2>Forgot Password</h2>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="form-input pt-30">
              <input type="submit" name="submit" value="Reset Password" />
            </div>
            {isLoading && (
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  border: "none",
                }}
                src="/assets/img/gif/Spinner.gif"
                alt="loading..."
              />
            )}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && (
              <div style={{ color: "green" }}>
                Please check your email for instructions to reset your password.
              </div>
            )}
          </div>
        </form>
      </main>
    </>
  );
}

export default ForgotPassword;
