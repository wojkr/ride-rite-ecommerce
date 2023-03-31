"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * order service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    try {
      //getting the price from strapi, to avoid and unfair User Manipulations ....
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);
          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "https://localhost:3000/checkout/success",
        cancel_url: "https://localhost:3000",
        line_items: lineItems,
      });

      //   create an order
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });
    } catch (e) {
      ctx.response.status = 500;
      return { error: { message: "Problem creating a charge..." } };
    }
  },
}));
