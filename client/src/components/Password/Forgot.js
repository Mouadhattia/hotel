import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Paper, Typography, Container, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Field from "../Login/Field";
import { forgot } from "../../actions/auth";
import styles from "./Password.module.css";

const Forgot = () => {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState("");
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgot({ email: form }));
    window.navigator.onLine ? setStep(1) : setStep(2);
  };

  const handleChange = (e) => setForm(e.target.value);

  if (user) history.push("/dashboard");

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          {step === 0 && (
            <div>
              <Typography variant="h6" gutter="5">
                Veuillez saisir votre adresse e-mail
              </Typography>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Field
                    name="email"
                    label="Email Address"
                    handleChange={handleChange}
                    type="email"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {" "}
                    confirmé{" "}
                  </Button>
                </Grid>
              </form>
            </div>
          )}

          {step === 1 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: "55px", color: "#3e6947" }}
                ></i>
              </div>
              <br />
              <p>
                Un lien de réinitialisation du mot de passe a été envoyé à votre
                adresse e-mail. Veuillez suivre le lien pour réinitialiser votre
                mot de passe
              </p>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => history.push("/")}
                >
                  retour
                </button>
                <button className={styles.button} onClick={() => setStep(0)}>
                Renvoyer le lien
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: "55px", color: "#3e6947" }}
                ></i>
              </div>
              <br />
              <p>S'il vous plaît, vérifiez votre connexion à internet et réessayez</p>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => history.push("/")}
                >
                  retour
                </button>
                <button className={styles.button} onClick={() => setStep(0)}>
                Renvoyer le lien
                </button>
              </div>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Forgot;
