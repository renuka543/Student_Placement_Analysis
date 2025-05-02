const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

let currentTestPercentage = "";

// Endpoint to update the test score
app.post("/update-score", (req, res) => {
  const { testPercentage } = req.body;

  if (testPercentage) {
    currentTestPercentage = testPercentage;
    console.log("Test percentage updated:", testPercentage);
    res.status(200).json({ success: true, testPercentage: currentTestPercentage });
  } else {
    res.status(400).json({ success: false, message: "Invalid test percentage" });
  }
});

// Endpoint to get the current test score
app.get("/get-score", (req, res) => {
  res.status(200).json({ testPercentage: currentTestPercentage });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
