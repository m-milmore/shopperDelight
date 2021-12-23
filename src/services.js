import { SHOPPER_URL, SHOPPER_API } from "./constants";

class ShopperService {
  async fetchShopperProducts() {
    return new Promise(async (success, failure) => {
      try {
        const response = await fetch(
          `${SHOPPER_URL}`,
          {
            method: "GET",
            headers: {
              "X-Authorization":
                `${SHOPPER_API}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const json = await response.json();
          const data = json.data.map((product) => ({
            id: product.id,
            title: product.name,
            desc: product.description,
            price: product.price.formatted_with_symbol,
            image: product.image.url,
            category: product.categories[0].name,
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

export default ShopperService;
