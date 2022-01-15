import {
  SHOPPER_URL,
  SHOPPER_API,
  SHOPPER_URL_TAX,
  SHOPPER_API_TAX,
} from "./constants";

export class ShopperService {
  async fetchShopperProducts() {
    return new Promise(async (success, failure) => {
      try {
        const response = await fetch(`${SHOPPER_URL}`, {
          method: "GET",
          headers: {
            "X-Authorization": `${SHOPPER_API}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const json = await response.json();
          const data = json.data.map((product) => ({
            id: product.id,
            title: product.name,
            desc: product.description,
            price: product.price.formatted_with_symbol,
            image: product.image.url,
            category: product.categories[0].name,
            quantity: product.inventory.available,
          }));
          success({ response, data });
        } else {
          failure({ error: "Http Request Error" });
        }
      } catch (error) {
        failure(error);
      }
    });
  }
}
export class ShopperTax {
  async fetchShopperTax() {
    return new Promise(async (success, failure) => {
      try {
        const response = await fetch(`${SHOPPER_URL_TAX}`, {
          method: "GET",
          headers: {
            "X-Authorization": `${SHOPPER_API_TAX}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const json = await response.json();
          const data = {
            gst: parseFloat(json.data[0].country_standard_rate),
            pst: json.data[0].rates.filter(
              (rate) => rate.region_code === "QC"
            )[0].standard_rate,
          };
          success({ response, data });
        } else {
          failure({ error: "Http Request Error" });
        }
      } catch (error) {
        failure(error);
      }
    });
  }
}
