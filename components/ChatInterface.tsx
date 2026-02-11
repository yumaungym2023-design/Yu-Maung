
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fragranceService } from '../services/geminiService';
import { Message } from '../types';

export interface ChatInterfaceHandle {
  sendMessage: (text: string) => void;
}

interface ChatInterfaceProps {
  isDarkMode: boolean;
}

const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>(({ isDarkMode }, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'မင်္ဂလာပါခင်ဗျာ။ **Golden Perfume Milano** မှ နွေးထွေးစွာ ကြိုဆိုပါတယ်။ ရေမွှေးအကြောင်း သိလိုသည်များကို မေးမြန်းနိုင်ပါပြီ။'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ base64: string, mimeType: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const processMessage = async (text: string, image?: { base64: string, mimeType: string }) => {
    if ((!text.trim() && !image) || isLoading) return;

    setMessages(prev => [...prev, { 
      role: 'user', 
      content: text + (image ? " [Image Attached]" : "") 
    }]);
    setIsLoading(true);

    try {
      const response = await fragranceService.sendMessage(text, image?.base64, image?.mimeType);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
      setSelectedImage(null);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "အမှားတစ်ခုရှိနေပါတယ်။ နောက်မှ ပြန်ကြိုးစားပါ။" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    sendMessage: (text: string) => {
      processMessage(text);
    }
  }));

  const handleSend = () => {
    const text = inputValue.trim();
    if (text || selectedImage) {
      processMessage(text || "ဤရေမွှေးပုလင်းကို စစ်ဆေးပေးပါခင်ဗျာ။", selectedImage || undefined);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Implementation of error handling for image uploads
      
      // 1. Check file size (e.g., 10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "⚠️ **ပုံအရွယ်အစား အရမ်းကြီးလွန်းနေပါတယ်။** \n\n၁၀ မဂ္ဂါဘိုက် (10MB) ထက် သေးငယ်သော ပုံကိုသာ ရွေးချယ်ပေးပါခင်ဗျာ။" 
        }]);
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 2. Check supported types
      if (!file.type.startsWith('image/')) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "⚠️ **ရွေးချယ်ထားသော File အမျိုးအစား မမှန်ကန်ပါ။** \n\nကျေးဇူးပြု၍ ဓာတ်ပုံ (Image File) အမျိုးအစားကိုသာ ရွေးချယ်ပေးပါခင်ဗျာ။" 
        }]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const reader = new FileReader();
      
      reader.onloadstart = () => {
        setIsLoading(true);
      };

      reader.onloadend = () => {
        setIsLoading(false);
        try {
          const result = reader.result as string;
          if (!result || !result.includes(',')) {
            throw new Error("Invalid image data content");
          }
          const base64 = result.split(',')[1];
          setSelectedImage({ base64, mimeType: file.type });
        } catch (err) {
          setMessages(prev => [...prev, { 
            role: 'model', 
            content: "⚠️ **ပုံကို ဖတ်ရတာ အဆင်မပြေဖြစ်နေပါတယ်။** \n\nဓာတ်ပုံ file ပျက်စီးနေခြင်း သို့မဟုတ် format မမှန်ကန်ခြင်းကြောင့် ဖြစ်နိုင်ပါတယ်။ တခြားပုံတစ်ပုံနဲ့ ပြန်ကြိုးစားကြည့်ပေးပါခင်ဗျာ။" 
          }]);
        }
        // Reset input so the same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
      };

      reader.onerror = () => {
        setIsLoading(false);
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "⚠️ **ပုံကို upload တင်ရာမှာ အမှားတစ်ခု ရှိသွားပါတယ်။** \n\nကျေးဇူးပြု၍ ပြန်လည်ကြိုးစားကြည့်ပေးပါ။" 
        }]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="chat-section" className={`flex flex-col h-[70vh] rounded-[3rem] shadow-2xl overflow-hidden glass-panel transition-all duration-700`}>
      <div className={`px-8 py-6 flex items-center justify-between border-b transition-colors border-yellow-900/10`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white border glass-card transition-colors ${
            isDarkMode ? 'border-yellow-500/30' : 'border-yellow-200 shadow-sm'
          }`}>
            <span className="luxury-font font-black text-lg text-yellow-500">M</span>
          </div>
          <div>
              <h3 className={`font-black luxury-font tracking-[0.3em] uppercase text-[11px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Milano Consultant</h3>
              <div className="flex items-center space-x-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Fragrance Specialist Online</span>
              </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <div className="text-[9px] font-black uppercase tracking-widest text-yellow-600 hidden md:block">Verified Heritage</div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
           </svg>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin`}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] rounded-[2rem] px-6 py-5 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-yellow-600 text-white rounded-tr-none shadow-yellow-600/20' 
                : 'glass-card text-gray-200 rounded-tl-none border border-yellow-900/10'
            }`}>
              <div className={`markdown-content text-[13px] leading-loose ${msg.role === 'model' && !isDarkMode ? 'text-gray-800' : ''}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start space-y-3 animate-pulse">
            <div className={`rounded-full px-6 py-4 glass-card border border-yellow-900/10`}>
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-600/60 ml-3">မင်းအတွက် အမိုက်စား အနံ့ကို ရှာဖွေနေပါတယ်...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-8 border-t transition-colors border-yellow-900/10 bg-black/5 dark:bg-black/20`}>
        {selectedImage && (
          <div className={`mb-6 flex items-center p-3 rounded-3xl glass-card border border-yellow-500/20 animate-in fade-in slide-in-from-bottom-2`}>
             <div className="relative w-16 h-16 rounded-2xl border border-yellow-900/20 mr-4 overflow-hidden shadow-2xl">
                <img src={`data:${selectedImage.mimeType};base64,${selectedImage.base64}`} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedImage(null)} className="absolute top-1 right-1 bg-black/60 backdrop-blur-md text-white rounded-full p-1.5 hover:bg-red-600 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                </button>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">Scent Specimen Ready</span>
               <span className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter mt-1">AI analyzing bottle heritage...</span>
             </div>
          </div>
        )}
        <div className="flex items-end space-x-4">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className={`w-14 h-14 rounded-2xl flex items-center justify-center glass-card border shadow-xl transition-all hover:border-yellow-500/50 hover:scale-105 active:scale-95 ${
            isDarkMode ? 'text-yellow-500' : 'text-yellow-600 border-yellow-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          </button>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Luxury fragrance consultation..."
            className={`flex-1 glass-card border rounded-2xl px-6 py-5 focus:outline-none transition-all resize-none min-h-[58px] max-h-[150px] text-sm font-medium leading-relaxed ${
              isDarkMode ? 'text-white border-yellow-900/10 focus:border-yellow-500/40' : 'text-gray-900 border-gray-100 focus:border-yellow-400'
            }`}
            rows={1}
          />
          <button onClick={handleSend} disabled={isLoading || (!inputValue.trim() && !selectedImage)} className="bg-yellow-600 hover:bg-yellow-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ChatInterface;
