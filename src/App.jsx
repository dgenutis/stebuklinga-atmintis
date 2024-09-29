import { useEffect, useState } from "react";
import "./App.css";
import Korta from "./components/Korta";


const kortuImg = [
  { src: "/img/pic-1.jpg", matched: false },
  { src: "/img/pic-2.jpg", matched: false },
  { src: "/img/pic-3.jpg", matched: false },
  { src: "/img/pic-4.jpg", matched: false },
  { src: "/img/pic-5.png", matched: false },
  { src: "/img/pic-6.png", matched: false },
];

function App() {
  const [kortos, setKortos] = useState([]);
  const [bandymai, setBandymai] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const manoKortos = () => {
    const visosKortos = [...kortuImg, ...kortuImg]
      .sort(() => Math.random() - 0.5)
      .map((korta) => ({ ...korta, id: Math.random() }));

    setPasirinkimas1(null);
    setPasirinkimas2(null);
    setKortos(visosKortos);
    setBandymai(0);
  };

  const [pasirinkimas1, setPasirinkimas1] = useState(null);
  const [pasirinkimas2, setPasirinkimas2] = useState(null);

  const handlePasirinkimas = (korta) => {
    pasirinkimas1 ? setPasirinkimas2(korta) : setPasirinkimas1(korta);
  };

  const resetBandymus = () => {
    setPasirinkimas1(null);
    setPasirinkimas2(null);
    setBandymai((anksciau) => anksciau + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (pasirinkimas1 && pasirinkimas2) {
      setDisabled(true);
      if (pasirinkimas1.src === pasirinkimas2.src) {
        setKortos((prevKortos) => {
          return prevKortos.map((korta) => {
            if (korta.src === pasirinkimas1.src) {
              return { ...korta, matched: true };
            } else {
              return korta;
            }
          });
        });
        resetBandymus();
      } else {
        setTimeout(() => resetBandymus(), 1000);
      }
    }
  }, [pasirinkimas1, pasirinkimas2]);

  useEffect(() => {
    manoKortos();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Stebuklinga atmintis</h1>
        <button onClick={manoKortos}>Naujas žaidimas</button>
        <div className="kortu-gridas">
          {kortos.map((korta) => (
            <Korta
              key={korta.id}
              korta={korta}
              flipped={
                korta === pasirinkimas1 ||
                korta === pasirinkimas2 ||
                korta.matched
              }
              handlePasirinkimas={handlePasirinkimas}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Bandymai: {bandymai}</p>
      </div>
    </>
  );
}

export default App;
