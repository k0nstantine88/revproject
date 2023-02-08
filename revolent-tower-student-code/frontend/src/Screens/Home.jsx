import { Card, CircularProgress, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CList from "../Components/CList";
import Header from "../Components/Header";
import CloseIcon from "@mui/icons-material/Close";
import { getTopScores, putScore } from "../util/getTopScores";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

function Home() {
  const [gameOpen, setGameOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (gameOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [gameOpen]);
  const getScores = () => {
    setLoading(true);
    getTopScores()
      .then((res) => {
        console.log(res);
        setScores(res.data);
      })
      .catch((err) => {
        alert("Some error occured please try after sometime.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getScores();
    const messageEvent = (e) => {
      if (typeof e.data === "string" && e.data) {
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.type === "action-new-data") {
          putScore(data.data)
            .then((res) => res.json())
            .then((_) => {
              getScores();
            })
            .catch(() => {});
        }
      }
    };
    window.addEventListener("message", messageEvent);
    return () => {
      window.removeEventListener("message", messageEvent);
    };
  }, []);
  return (
    <>
      <Container maxWidth="md" style={{ display: gameOpen ? "none" : "" }}>
        <Header
          onPlayClick={() => {
            setGameOpen(true);
          }}
        />
        <Card
          style={{
            padding: "10px 30px",
            boxShadow: "rgb(38 123 209 / 20%) 0px 8px 24px",
            backgroundColor: "#fffffff0",
          }}
        >
          {loading && (
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                padding: 50,
              }}
            >
              <CircularProgress />
            </div>
          )}
          {!loading && scores.length === 0 ? (
            <div
              style={{
                padding: 8,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <ContentPasteIcon />
              Currently there is no data available in the database.
            </div>
          ) : null}
          {scores.map((item, i) => {
            return (
              <CList
                key={i * 5}
                name={item.fullName ?? "Unknown"}
                score={item.score}
                position={i + 1}
              />
            );
          })}
        </Card>
      </Container>
      <div
        id="iframe"
        style={{
          width: "100vw",
          height: "100vh",
          display: gameOpen ? "" : "none",
        }}
      >
        <CloseIcon
          onClick={() => {
            setGameOpen(false);
            localStorage.setItem("action-end-game", "1");
          }}
          style={{
            position: "absolute",
            right: 15,
            top: 15,
            fontSize: 40,
            color: "#2e2e3d",
            cursor: "pointer",
          }}
        />
        <iframe
          title="mytitle"
          src="./game.html"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}

export default Home;
