const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await fetch(`https://www.linkedin.com/voyager/api/graphql?variables=(query:(keywords:${encodeURIComponent(query)},flagshipSearchIntent:SEARCH_SRP))&queryId=voyagerSearchDashClusters.838ad2ecdec3b0347f493f93602336e9`, {
            headers: {
                'Cookie': 'li_at=AQEDATfAxvUFwC2rAAABj5khY74AAAGPvS3nvk0AkypDidyT-pq0QYgtDFDvbsAgpRSP-O1hN1KDzXS4jOaFgEWoZboZvQlcRcb_JosgkVyP5kyThrhJwkKOx3hG1wNFqZh74wzcE9Za3rgYx8xZAhBb; JSESSIONID="ajax:8597322449642359719";',
                'Csrf-Token': 'ajax:8597322449642359719',
                'Accept': 'application/vnd.linkedin.normalized+json+2.1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.60 Safari/537.36',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from LinkedIn');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from LinkedIn' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});