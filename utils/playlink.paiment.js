import axios from "axios";
import { callBackUrl, cancelUrl, PAYLINK_API_KEY, PAYLINK_BASE_URL, PAYLINK_SECRET_KEY } from "../config/env.js";


async function getPaylinkToken() {
  try {
    const response = await axios.post(`${PAYLINK_BASE_URL}/api/auth`, {
      apiId: PAYLINK_API_KEY,
      secretKey: PAYLINK_SECRET_KEY,
      persistToken: false, // set true if you want 30-hour token
    });

    return response.data.id_token;
  } catch (error) {
    console.error("Paylink Auth Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with Paylink");
  }
}

async function createInvoice({
  amount,
  clientName,
  clientEmail,
  clientMobile,
  orderNumber,
  products,
}) {
  const token = await getPaylinkToken();

  const invoicePayload = {
    orderNumber,
    amount,
    callBackUrl: callBackUrl,
    cancelUrl: cancelUrl,
    clientName,
    clientEmail,
    clientMobile,
    products,
    note: "Client pack purchase",
  };

  try {
    const response = await axios.post(
      `${PAYLINK_BASE_URL}/api/addInvoice`,
      invoicePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Paylink Invoice Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create invoice with Paylink");
  }
}

export { createInvoice, getPaylinkToken };