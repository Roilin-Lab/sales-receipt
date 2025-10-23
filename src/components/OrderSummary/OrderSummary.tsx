import type { FC } from "react";
import type { Order } from "../../types";
import { currencyFromater } from "../../utils";

import classes from "./OrderSummary.module.css";

interface OrderSummaryProps {
  className?: string
  order: Order | null;
}

const OrderSummary: FC<OrderSummaryProps> = ({ order, className }) => {
  const { products, sum } = order ?? {};
  return (
    <div className={className}>
      <div className={classes.orderHeader}>Чек продажи</div>
      <div className={classes.productsList}>
        {products ? (
          products.map((item, index, array) => {
            const {
              product: { name, image },
              qty,
              price,
              sum,
            } = item;
            const quantity = "×" + qty * -1;

            return (
              <div className={classes.productCard}>
                <div className={classes.productImgWrapper}>
                  <img
                    className={classes.productImg}
                    src={image}
                    alt="product-image"
                  />
                </div>
                <div className={classes.productInfo}>
                  <div className={classes.productTitle}>{name}</div>
                  <div className={classes.productPrice}>
                    Цена: {currencyFromater(price, "full")}
                  </div>
                </div>
                <div className={classes.productQuantity}>{quantity}</div>
                <div className={classes.productSum}>
                  {currencyFromater(sum, "short")}
                </div>
                {index !== array.length - 1 ? <hr /> : null}
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: "1/5", textAlign: "center" }}>
            Нет товаров
          </div>
        )}
      </div>
      <div className={classes.orderTotal}>
        <span>ИТОГО:</span>
        {sum ? (
          <span>{currencyFromater(sum, "full")}</span>
        ) : (
          <span>0</span>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
