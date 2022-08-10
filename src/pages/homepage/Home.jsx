import React from "react";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import Sidebar from "../../components/sidebar/Sidebar";
import ToastComponent from "../../components/ToastComponent";
import "./home.css";
import dice1 from "../../assets/img/dice1.png";
import dice2 from "../../assets/img/dice2.png";
import dice3 from "../../assets/img/dice3.png";
import dice4 from "../../assets/img/dice4.png";
import dice5 from "../../assets/img/dice5.png";
import dice6 from "../../assets/img/dice6.png";

const Home = () => {
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState("");
  const [inputPlayers, setInputPlayers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [rollTimes, setRollTimes] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [shake, setShake] = useState(false);
  const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
  let players = [];
  for (let i = 0; i <= inputPlayers.length - 1; i++) {
    players.push({
      id: inputPlayers[i] + 1,
      rollTimes,
      images: dices[Math.floor(Math.random() * 6)],
    });
  }
  console.log(players);

  const token = localStorage.getItem("token");
  const playGame = () => {
    if (!token) {
      setShowToast(true);
      setMsg("Please login first");
    } else {
      setShowInput(!showInput);
    }
  };
  return (
    <Layout
      children={
        <>
          <ToastComponent
            showToast={showToast}
            setShowToast={setShowToast}
            message={msg}
          />
          <div className="home-container">
            <Sidebar />
            <div className="game">
              <div className="form">
                {startGame ? (
                  <>
                    <div>Enjoy the game</div>
                    <div className="startGame">
                      {players.map((players) => (
                        <img
                          className={`${shake ? "shake" : ""}`}
                          src={players.images}
                          key={players.id}
                          style={{
                            height: "50px",
                            width: "50px",
                            margin: "10px",
                          }}
                          alt="dice"
                        />
                      ))}
                    </div>
                    <div
                      className="play"
                      onClick={() => {
                        setShake(!shake);
                      }}
                    >
                      {shake ? "Stop" : "Roll the Dice"}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="title">Wellcome</div>
                    <div className="play" onClick={playGame}>
                      Play Game
                    </div>
                    {showInput ? (
                      <div className="input">
                        <input
                          type="number"
                          placeholder="Input players"
                          onChange={(e) => {
                            let players = [];
                            for (let i = 0; i <= e.target.value - 1; i++) {
                              players.push(i);
                            }
                            setInputPlayers(players);
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Input rolling times"
                          onChange={(e) => {
                            setRollTimes(e.target.value);
                          }}
                        />
                        <div
                          className="play"
                          onClick={() => {
                            if (rollTimes === 0) {
                              setShowToast(true);
                              return setMsg("Please input roll times");
                            }
                            if (inputPlayers === 0) {
                              setShowToast(true);
                              return setMsg("Please input total players");
                            }
                            setStartGame(true);
                          }}
                        >
                          Start
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Home;
