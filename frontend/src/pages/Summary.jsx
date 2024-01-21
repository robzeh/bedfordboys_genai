import { useState, useEffect } from "react";
import { postGenerate} from "../services/ollama.js";

const Summary = ({ patientId }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(inputText);
  }, [inputText]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // Send user's message to the API
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
      ]);

      setInputText('');

      setLoading(true)

      const response = await postGenerate({
        prompt: inputText,
        context: "",
        patientId: patientId
      });

      const generatedResponse = response.response;
      console.log(generatedResponse);

      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: generatedResponse, sender: 'chatbot' },
      ]);
    } catch (error) {
      console.error('Error sending message to API:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-2/4 p-6 overflow-y-auto">
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="bg-slate-100 p-6 rounded-lg w-[600px] h-screen overflow-y-auto">
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">HarmonyHelper 👋</h2>
        </div>

        <div className="pr-4 h-[800px]" style={{ minWidth: '100%', display: 'table' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >

              <span
                className={`inline-block px-4 py-2 rounded-md ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
          {loading && (
              <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
              <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
              </div>
          )}
        </div>


        <div className="flex items-center pt-0">
          <div className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              type={"text"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Summary;
