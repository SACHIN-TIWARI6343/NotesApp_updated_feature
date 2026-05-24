const saveLog = async (
  message
) => {

  console.log(
    "Saving logs..."
  );

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 3000)
  );

  console.log(
    "Logs saved:",
    message
  );
};

module.exports = {
  saveLog,
};