const sendSmsVerification = async (phoneNumber: number) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    const response = await fetch(
      `https://verify-4474-aoq7ld.twil.io/start-verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkVerification = async (phoneNumber: string, code: string) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code: code,
    });

    const response = await fetch(
      `https://verify-4474-aoq7ld.twil.io/check-verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
