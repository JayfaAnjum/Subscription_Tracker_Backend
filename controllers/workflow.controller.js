import { serve } from "@upstash/workflow/express";
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 3, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  console.log("renewalDate from DB:", subscription?.renewalDate);
  console.log("status:", subscription?.status);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate); // ✅ capital D
  console.log("renewal date formatted:", renewalDate.format("YYYY-MM-DD"));

  if (renewalDate.isBefore(dayjs())) {
    console.log("Renewal date passed, stopping workflow");
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    console.log(`reminder-${daysBefore} date:`, reminderDate.format("YYYY-MM-DD"));

    if (reminderDate.isBefore(dayjs())) {
      console.log(`Skipping reminder-${daysBefore}, date already passed`);
      continue;
    }

    await sleepUntilReminder(context, `reminder-${daysBefore}`, reminderDate);
    await triggerReminder(context, `reminder-${daysBefore}`, subscription, daysBefore, renewalDate);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get-subscription", async () => {
    return await Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} at ${date.format("YYYY-MM-DD")}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription, daysBefore, renewalDate) => {
  return await context.run(label, async () => {
    try {
      console.log("Trigger started:", label);
      console.log("User:", subscription?.user?.email);

      await sendReminderEmail({
        to: subscription.user.email,
        type: label,
        subscription,
        renewalDate, // ✅ capital D
        daysBefore,
      });

      console.log(`Sent email to ${subscription.user.email} - ${daysBefore} days left`);
    } catch (err) {
      console.error("Email failed:", err);
    }
  });
};