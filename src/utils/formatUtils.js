import { some } from "lodash";

export const boolToStr = (isBool = false) => (isBool ? "Yes" : "No");

export const hasPermission = (userDetails, authority) =>
  some(userDetails.roles, (r) => r === authority);
