import React from "react";
import { useState } from "react";
import { createGames, createRound } from "../../modules/axios";
import Layout from "../../components/layout/Layout";
import Sidebar from "../../components/sidebar/Sidebar";
import ToastComponent from "../../components/ToastComponent";
import Loading from "../../components/loading/Loading";
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
  const [load, setLoad] = useState(false);
  const [games_id, setGames_id] = useState("");

  const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
  let players = [];
  for (let i = 0; i <= inputPlayers.length - 1; i++) {
    let numberDice = Math.floor(Math.random() * 6);
    let pointer = (numberDice) => {
      let newPoint = 0;
      if (numberDice === 6) {
        return (newPoint += 1);
      }
    };
    players.push({
      id: inputPlayers[i] + 1,
      rollTimes,
      images: dices[numberDice],
      result: numberDice + 1,
      point: pointer(numberDice + 1),
    });
  }
  console.log(players);
  const addGame = async () => {
    try {
      if (rollTimes === 0) {
        setShowToast(true);
        return setMsg("Please input roll times");
      }
      if (inputPlayers === 0) {
        setShowToast(true);
        return setMsg("Please input total players");
      }
      setLoad(true);
      const body = {
        total_player: inputPlayers.length,
      };
      const result = await createGames(body);
      setGames_id(result.data.data.id);
      setMsg(result.data.msg);
      setShowToast(true);
      setLoad(false);
      setStartGame(true);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
      setShowToast(true);
      setLoad(false);
    }
  };

  const addRound = async () => {
    try {
      if (rollTimes === 0) {
        setShake(false);
        setMsg("Roll time end");
        return setShowToast(true);
      }
      setShake(!shake);
      if (!shake) {
        const body = {
          game_id: games_id,
          player_info: players,
        };
        const result = await createRound(body);
        setMsg(result.data.msg);
      } else {
        setRollTimes(rollTimes - 1);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
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
    <>
      {load ? <Loading /> : <></>}
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
                      <div className="rolltime">{`Roll left = ${rollTimes}`}</div>
                      <div className="play" onClick={addRound}>
                        {shake ? "Stop" : "Roll the Dice"}
                      </div>
                      {rollTimes === 0 ? (
                        <div className="play">Submit Result</div>
                      ) : (
                        <></>
                      )}
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
                          <div className="play" onClick={addGame}>
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
    </>
  );
};

export default Home;
