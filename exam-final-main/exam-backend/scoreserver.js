const express = require("express");
const cors = require("cors");
const app = express();
const port = 5002; // or choose another port if 5002 is used by MongoDB

app.use(cors());
app.use(express.json());

let currentTestPercentage = "";

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

app.get("/get-score", (req, res) => {
  res.status(200).json({ testPercentage: currentTestPercentage });
});

app.listen(port, () => {
  console.log(`✅ Score server running at http://localhost:${port}`);
});
