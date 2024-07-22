const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'graphbd',
    password: 'Brumbar',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Маршрут для збереження графу
app.post('/saveGraph', async (req, res) => {
    const { nodes, edges } = req.body;
    try {
        await pool.query('BEGIN');
        await pool.query('DELETE FROM nodes');
        await pool.query('DELETE FROM edges');
        for (const node of nodes) {
            await pool.query(
                'INSERT INTO nodes (id, label, x, y, degree) VALUES ($1, $2, $3, $4, $5)',
                [node.id, node.label, parseFloat(node.x), parseFloat(node.y), parseInt(node.degree, 10)]
            );
        }
        for (const edge of edges) {
            await pool.query(
                'INSERT INTO edges (id, label, source, target, directed) VALUES ($1, $2, $3, $4, $5)',
                [edge.id, edge.label, edge.source, edge.target, edge.directed]
            );
        }
        await pool.query('COMMIT');
        res.send('Graph saved successfully');
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error saving graph:', err);
        res.status(500).send('Error saving graph');
    }
});

// Маршрут для завантаження графу
app.get('/loadGraph', async (req, res) => {
    try {
        const nodesResult = await pool.query('SELECT * FROM nodes');
        const edgesResult = await pool.query('SELECT * FROM edges');
        res.json({
            nodes: nodesResult.rows,
            edges: edgesResult.rows,
        });
    } catch (err) {
        console.error('Error loading graph:', err);
        res.status(500).send('Error loading graph');
    }
});

