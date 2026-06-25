export const emailTemplates = ({  to,subscription }) => {
  const urgencyColor = daysLeft === 1 ? "#dc2626" : daysLeft <= 3 ? "#f59e0b" : "#2563eb";
  const urgencyText = daysLeft === 1 ? "⚠️ Last Day!" : daysLeft <= 3 ? "⏳ Renewing Soon" : "📅 Upcoming Renewal";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Subscription Reminder</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;">
              
              <!-- Header -->
              <tr>
                <td style="background:${urgencyColor};padding:30px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;">${urgencyText}</h1>
                  <p style="color:#ffffff;margin:10px 0 0;font-size:16px;">
                    Your subscription renews in <strong>${daysLeft} day${daysLeft > 1 ? "s" : ""}</strong>
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <h2 style="margin-top:0;">${to},</h2>

                  <p>
                    This is a friendly reminder that your <strong>${subscription}</strong> subscription 
                    is due for renewal on <strong>${renewalDate}</strong>.
                  </p>

                  <!-- Subscription Details Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;margin:24px 0;">
                    <tr>
                      <td style="padding:24px;">
                        <h3 style="margin:0 0 16px;color:#333;">Subscription Details</h3>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:8px 0;color:#666;">Plan</td>
                            <td style="padding:8px 0;text-align:right;font-weight:bold;color:#333;">${subscriptionName}</td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;color:#666;border-top:1px solid #eee;">Renewal Date</td>
                            <td style="padding:8px 0;text-align:right;font-weight:bold;color:#333;border-top:1px solid #eee;">${renewalDate}</td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;color:#666;border-top:1px solid #eee;">Amount</td>
                            <td style="padding:8px 0;text-align:right;font-weight:bold;color:${urgencyColor};border-top:1px solid #eee;">${currency} ${planPrice}</td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;color:#666;border-top:1px solid #eee;">Days Remaining</td>
                            <td style="padding:8px 0;text-align:right;font-weight:bold;color:${urgencyColor};border-top:1px solid #eee;">${daysLeft} day${daysLeft > 1 ? "s" : ""}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <p>
                    Make sure your payment method is up to date to avoid any interruption in service.
                  </p>

                  <div style="text-align:center;margin:30px 0;">
                    <a style="
                      background:${urgencyColor};
                      color:#ffffff;
                      text-decoration:none;
                      padding:12px 24px;
                      border-radius:6px;
                      display:inline-block;
                      font-weight:bold;
                    ">
                      Manage Subscription
                    </a>
                  </div>

                  <p>If you wish to cancel, please do so before the renewal date.</p>

                  <p>Best Regards,<br />Your Company</p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f8f8f8;padding:20px;text-align:center;color:#888;font-size:12px;">
                  © ${new Date().getFullYear()} Your Company. All rights reserved.<br/>
                  <span style="font-size:11px;">You're receiving this because you have an active subscription.</span>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};