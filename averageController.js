// exports.calculateAverage = (req, res) => {
//   const { numbers } = req.body;

//   if (!Array.isArray(numbers) || numbers.length === 0) {
//     return res.status(400).json({ error: 'Provide a non-empty array of numbers.' });
//   }

//   const sum = numbers.reduce((acc, num) => acc + num, 0);
//   const average = sum / numbers.length;

//   res.json({ average });
// };

const axios = require('axios');

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzEzNDMzLCJpYXQiOjE3NDk3MTMxMzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk4MmFlNGJmLWY5OWQtNDJjMC1hYjEzLTlmZjMxMGNmMDYwNSIsInN1YiI6ImFudWdhbXVkYXlraXJhbkBnbWFpbC5jb20ifSwiZW1haWwiOiJhbnVnYW11ZGF5a2lyYW5AZ21haWwuY29tIiwibmFtZSI6ImFudWdhbSB1ZGF5IGtpcmFuIiwicm9sbE5vIjoiMjIwNWE0MjAwMiIsImFjY2Vzc0NvZGUiOiJNVkd3RUYiLCJjbGllbnRJRCI6Ijk4MmFlNGJmLWY5OWQtNDJjMC1hYjEzLTlmZjMxMGNmMDYwNSIsImNsaWVudFNlY3JldCI6Ik1SaFpkTU5YZWZoQmpQbkoifQ.UFRdCbII5OHNWESrem8qxULyKDswGZlqGk1GsfsNnFU"


exports.fetchAndCalculateAverage = async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;

  console.log(`\n📥 Request received for ticker: ${ticker}, minutes: ${minutes}, aggregation: ${aggregation}`);

  if (!ticker || !minutes || aggregation !== 'average') {
    console.log("❌ Missing or invalid query parameters");
    return res.status(400).json({ error: 'Missing or invalid query parameters' });
  }

  const url = `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`;
  console.log(`🌐 Fetching data from: ${url}`);

  try {
    const startTime = Date.now();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    const endTime = Date.now();
    console.log(`✅ Data fetched in ${endTime - startTime} ms`);

    const priceHistory = response.data;
    console.log(`📊 Received ${priceHistory.length} price points`);

    if (!Array.isArray(priceHistory) || priceHistory.length === 0) {
      console.log("⚠️ No price data found.");
      return res.status(404).json({ error: 'No price data found' });
    }

    // Manual average
    let sum = 0;
    for (let i = 0; i < priceHistory.length; i++) {
      sum += priceHistory[i].price;
    }
    const average = sum / priceHistory.length;

    console.log(`📈 Average calculated: ${average.toFixed(2)}`);

    res.json({
      averageStockPrice: average,
      priceHistory: priceHistory
    });

  } catch (error) {
    console.error("🚨 Error fetching stock data:", error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};
