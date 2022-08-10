import React from "react";
import "./sidebar.css";
import { getGames } from "../../modules/axios";
import { useEffect } from "react";

const Sidebar = () => {
  const getHistory = async () => {
    try {
      const result = await getGames();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="sidebar-contianer">
      <div className="form">
        <div className="title">Winner History</div>
      </div>
    </div>
  );
};

export default Sidebar;
