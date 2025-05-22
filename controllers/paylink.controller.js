import axios from "axios";
import { createInvoice, getPaylinkToken } from "../utils/playlink.paiment.js";
import { PAYLINK_BASE_URL } from "../config/env.js";

export const createPaylinkInvoice = async (req, res) => {
  const { orderNumber ,amount, clientName, clientEmail, clientMobile ,products } = req.body;

  try {
    const invoice = await createInvoice({
      amount,
      clientName,
      clientEmail,
      clientMobile,
      orderNumber,
      products,
    });
    res.json({ paymentUrl: invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { invoiceId } = req.params;

  try {
    const token = await getPaylinkToken();
    const response = await axios.get(`${PAYLINK_BASE_URL}/api/getInvoice/${invoiceId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to verify payment" });
    console.log(error);
  }
};

