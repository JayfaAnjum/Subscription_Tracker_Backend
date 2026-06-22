
import { serve } from "@upstash/workflow/express";
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [ 7,3,2,1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log("Renewal date passed, stopping workflow");
    return;
  }
 
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `reminder-${daysBefore}`,
        reminderDate
      );
      console.log("reminder date",reminderDate);
     continue;
    }
    else{
    await triggerReminder(
      context,
      `reminder-${daysBefore}`,
      subscription,
      daysBefore
    );
  }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get-subscription", async () => {
    return await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} at ${date}`);

  await context.sleepUntil(label, date.toDate());
};


const triggerReminder = async (context, label, subscription, daysBefore) => {
  return await context.run(label, async () => {
    try {
      console.log("Trigger started:", label);
      console.log("User:", subscription?.user?.email);

      await sendReminderEmail({
        to: subscription.user.email,
        type: label,
        subscription,
      });

      console.log("Email function completed");

      console.log(
        `Sent email to ${subscription.user.email} - ${daysBefore} days left`
      );
    } catch (err) {
      console.error("Email failed:", err);
    }
  });
};



