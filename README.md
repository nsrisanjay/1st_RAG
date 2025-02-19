* Created a RAG agent that uses Pinecone, vectorDB that stores only the food name and sugar amount coloumns in the form of 
 numerical embeddings created using an embedding model.
* Whenever a query is passed related to a food item and their respective sugar levels , similarity search is done in the vectorDB and top_K responses are
  given out. These responses have the highest probability wrt the query.
* This type of app may especially be used for diabetic patients who need to be conscious about the sugar levels in the food that they take.
* To achieve this I used LangChain.js which is a library that helps us build generative AI solutions.
