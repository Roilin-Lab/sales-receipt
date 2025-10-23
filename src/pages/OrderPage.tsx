import { useEffect, useState, type FC } from "react";
import { isOrder, isSettings, type Order, type Settings } from "../types";
import Carousel from "../components/Carousel/Carousel";
import OrderSummary from "../components/OrderSummary/OrderSummary";

import logo from "../assets/Logo.svg";
import classes from "./OrderPage.module.css";

const Order: FC = ({}) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const onMessage = (event: MessageEvent) => {
    if (isSettings(event.data.settings)) {
      setSettings(event.data.settings);
    }
    if (isOrder(event.data.order)) {
      setOrder(event.data.order);
    }
  };

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ loaded: true });
    }
  }, []);

  const { carousel, products } = settings ?? {
    carousel: { duration: 100 },
    products: { position: 'right'},
  };

  return (
    <div
      className={classes.container}
      style={{
        flexDirection: products.position === "right" ? "row" : "row-reverse",
      }}
    >
      <Carousel className={classes.carousel} duration={carousel.duration}>
        {carousel.items ? (
          carousel.items.map((image) => (
            <Carousel.Item imageUrl={image.url} />
          ))
        ) : (
          <img className={classes.carouselLogo} src={logo} alt="logo" />
        )}
      </Carousel>
      <OrderSummary className={classes.order} order={order} />
    </div>
  );
};

export default Order;
