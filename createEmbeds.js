// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone';
import dataObj from './csv_loader.js'
import 'dotenv/config';
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});
const index = pc.index('test1');
// Define a sample dataset where each item has a unique ID and piece of text
const data = dataObj;


// Convert the text into numerical vectors that Pinecone can index
const model = 'multilingual-e5-large';

const embeddings = await pc.inference.embed(
  model,
  data.map(d => d.text),
  { inputType: 'passage', truncate: 'END' }
);

// console.log(embeddings);
// Target the index where you'll store the vector embeddings


// Prepare the records for upsert
// Each contains an 'id', the embedding 'values', and the original text as 'metadata'
const records = data.map((d, i) => ({
  id: d.id,
  values: embeddings[i].values,
  metadata: { text: d.text }
}));

// can use system template for predefined context setting to the LLM
const SYSTEM_TEMPLATE = ChatPromptTemplate.fromTemplate(
  `You are a nutrition expert. All the food data provided is per 100 grams of food.
  Please provide a detailed answer including an estimated sugar level for the food item in question.`
);
// Upsert the vectors into the index
await index.namespace('test1').upsert(records);
const query = [
  'Tell me the amount of sugar present in 200 gm cottage chesse',
];
const queryEmbedding = await pc.inference.embed(
  model,
  query,
  { inputType: 'query' }
);
const queryResponse = await index.namespace("test1").query({
  topK: 3,
  vector: queryEmbedding[0].values,
  includeValues: false,
  includeMetadata: true
});

// console.log(queryResponse);
queryResponse.matches.forEach(match => {
  console.log(`ID: ${match.id}, Sugar Content: ${match.metadata.text}`);
});
