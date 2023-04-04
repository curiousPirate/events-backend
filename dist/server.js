const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const filter = req.query.filter;
  const pageNumber = req.query.pageNumber;

  const url = `https://serpapi.com/search?q=${query}&engine=google_events&htichips=${filter}&
  start=${(pageNumber - 1) * 10}&source=nodejs&output=json&
  api_key=348e8db09351ac50bd0d138aa02fa794c792d94070d5fc3a628ea00c94025b64`;

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 348e8db09351ac50bd0d138aa02fa794c792d94070d5fc3a628ea00c94025b64",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.send(data.events_results);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while searching for events.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
