import EYE_ICON from "./assets/eye-icon.png";
import EYE_ICON_HIDE from "./assets/eye-icon-hide.png";

export const SHOPPER_URL = "https://api.chec.io/v1/products?limit=200";
export const SHOPPER_URL_TAX = "https://api.chec.io/v1/tax/zones";
export const SHOPPER_API = process.env.REACT_APP_SHOPPER_API;
export const SHOPPER_API_TAX = process.env.REACT_APP_SHOPPER_API_TAX;

export const EYE_ICONS = {
  SHOW: EYE_ICON,
  HIDE: EYE_ICON_HIDE,
};

export const PASSWORD_RULES = `
Password must be 8-20 characters, including at least one capital letter, at least one small letter,
one number and one special character -!@#$%^&*()_+
`;

export const accounts = ["a@a.com", "b@b.com", "c@c.com"];

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
