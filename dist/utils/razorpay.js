import { config } from "#config/config.js";
import Razorpay from "razorpay";
export const instance = new Razorpay({ key_id: config.razorPayKeyId, key_secret: config.razorPayKeySecret });
//# sourceMappingURL=razorpay.js.map