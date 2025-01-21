import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Use secrets in the future
const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
export const getAIMessage = async (messages) => {
  try {
    const callAI = httpsCallable(functions, 'process_LLM_query');
    const result = await callAI({ messages: messages });
    console.log(result)
    const message = {
      role: "assistant",
      content: result.data
    }
    return message;
  } catch (error) {
    console.error('Error calling AI function:', error.message);
    throw error;
  }
};
