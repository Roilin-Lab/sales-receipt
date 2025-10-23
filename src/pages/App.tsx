import { useRef, useEffect, useState } from "react";
import { isReadyMessage, type Order } from "../types";

import "./App.module.css";

function App() {
  const secondScreenRef = useRef<Window | null>(null);
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const onMessage = (event: MessageEvent) => {
    if (isReadyMessage(event.data)) {
      fetch(
        "https://gist.githubusercontent.com/Roilin-Lab/f73e0fe581fed466f38b61e0658e8164/raw/6e4f378587cbd9b780acc999979e2e34de4c510a/order-data.json"
      )
        .then((res) => res.json())
        .then((data) => setOrderData(data));

      let settings = {
        carousel: {
          duration: 3000,
          items: [
            {
              url: "https://basket-03.wbbasket.ru/vol431/part43119/43119787/images/big/1.webp",
            },
            {
              url: "https://ir-8.ozone.ru/s3/multimedia-1-k/wc1000/7505633720.jpg",
            },
            {
              url: "https://ir-8.ozone.ru/s3/multimedia-1-o/wc1000/7325600376.jpg",
            },
            {
              url: "https://ir-8.ozone.ru/s3/multimedia-1-3/wc1000/7535602839.jpg",
            },
            {
              url: "https://basket-01.wbbasket.ru/vol142/part14201/14201942/images/big/1.webp",
            },
            {
              url: "https://img.freepik.com/free-photo/panorama-shot-canal-lake-pukaki-twisel-surrounded-with-mountains_181624-45343.jpg?t=st=1761212970~exp=1761216570~hmac=46c40ea976c3dce1a25a099462b0bbb24c803770d739bfefaa994af40dbe725c&w=1480"
            },
            {
              url: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
            }
          ],
        },
        products: {
          position: "right",
        },
      };
      secondScreenRef.current?.postMessage({ settings: settings }, "*");
    }
  };

  useEffect(() => {
    secondScreenRef.current?.postMessage({ order: orderData }, "*");
  }, [orderData]);

  const handleOpenNewWindow = () => {
    secondScreenRef.current = window.open(
      "/sales-receipt/second-screen",
      "SecondScreen",
      "width=800,height=600"
    );
  };

  return (
    <>
      <button
        style={{
          fontSize: "3.2rem",
          padding: "1rem",
        }}
        onClick={handleOpenNewWindow}
      >
        Open second screen
      </button>
    </>
  );
}

export default App;
