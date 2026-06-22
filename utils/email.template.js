export const emailTemplates = () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Welcome</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;">
              
              <tr>
                <td style="background:#2563eb;padding:30px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;">Welcome!</h1>
                </td>
              </tr>

              <tr>
                <td style="padding:40px;">
                  <h2>Hello </h2>

                  <p>
                    Thank you for joining our platform. We're excited to have you onboard.
                  </p>

                  <p>
                    Click the button below to continue:
                  </p>

                  <div style="text-align:center;margin:30px 0;">
                    <a
                     
                      style="
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        padding:12px 24px;
                        border-radius:6px;
                        display:inline-block;
                      "
                    >
                      Get Started
                    </a>
                  </div>

                  <p>
                    If you have any questions, feel free to contact us.
                  </p>

                  <p>
                    Best Regards,<br />
                    Your Company
                  </p>
                </td>
              </tr>

              <tr>
                <td
                  style="
                    background:#f8f8f8;
                    padding:20px;
                    text-align:center;
                    color:#888;
                    font-size:12px;
                  "
                >
                 © ${new Date().getFullYear()} Your Company. All rights reserved.
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