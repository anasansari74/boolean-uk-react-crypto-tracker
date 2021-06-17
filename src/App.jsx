import { useEffect, useState } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";
import NewsCard from "./components/NewsCard";

import { CRIPTO_LIST } from "./constants";
import { STATUS_UPDATES } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCriptoId, setSelectedCriptoId] = useState();
  const [criptoList, setCriptoList] = useState([]);
  const [statusUpdates, setstatusUpdates] = useState([]);

  const selectedCripto = criptoList.find(
    (item) => item.id === selectedCriptoId
  );

  const newsItem = statusUpdates.find((item) => item.id === selectedCriptoId);

  const getListItems = () => {
    fetch(CRIPTO_LIST)
      .then((resp) => resp.json())
      .then((data) => {
        setCriptoList(data);
      });
  };

  const getStatusUpdates = () => {
    fetch(STATUS_UPDATES)
      .then((resp) => resp.json())
      .then((data) => {
        setstatusUpdates(data);
      });
  };

  useEffect(() => {
    getListItems();
    getStatusUpdates();
  }, []);

  // This function gives you whether a coin has been selected or not

  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCriptoId === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {criptoList.map((item) => (
            <SideListItem
              isSelectedCripto={isSelectedCripto}
              selectCripto={setSelectedCriptoId}
              item={item}
            />
          ))}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCriptoId ? (
          <MainDetail selectedCripto={selectedCripto} />
        ) : (
          "Select a coin bro!"
        )}
        <NewsCard newsItem={newsItem} />
      </main>
    </>
  );
}

export default App;
