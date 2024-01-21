import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from "axios";


const Summary = () => {
    const { id } = useParams();

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        console.log(inputText)
    }, [inputText]);

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        // Send user's message to the API
        try {
            const response = await axios.post('http://localhost:3000/generate', {
                userMessage: inputText,
            });

            const generatedResponse = response.data;
            console.log(generatedResponse)

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: inputText, sender: 'user' },
                { text: generatedResponse.response, sender: 'chatbot' },
            ]);
        } catch (error) {
            console.error('Error sending message to API:', error);
        }

        setInputText('');
    };


    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen">
                <div
                    className="fixed bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
                    style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                >
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
                    </div>

                    <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
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
                        {/*<div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">*/}
                        {/*    /!* ... (First message) *!/*/}
                        {/*    message 1*/}
                        {/*</div>*/}

                        {/*<div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">*/}
                        {/*    /!* ... (Second message) *!/*/}
                        {/*    message 2*/}
                        {/*</div>*/}

                        {/*<div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">*/}
                        {/*    /!* ... (Third message) *!/*/}
                        {/*    message 3*/}
                        {/*</div>*/}
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
        </>

    );
}

export default Summary;