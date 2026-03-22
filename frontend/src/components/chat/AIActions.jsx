import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";
import aiService from "../../services/aiService";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';


const AIActions = () => {

  const { id: documentId } = useParams();
  const [loadingAction, setLoadingAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [concept, setConcept] = useState("");

  const handleGenerateSummary = async () => {
    setLoadingAction("summary");
    try {
      const response = await aiService.generateSummary(documentId);
const summary = response.data.summary;
      setModalTitle("Generated Summary");
      setModalContent(summary);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to generate summary.");
    } finally{
      setLoadingAction(null);
    }
  }


  const handleExplainConcept = async (e) => {
  e.preventDefault();
  if (!concept.trim()) {
    toast.error("Please enter a concept to explain.");
    return;
  }
  setLoadingAction("explain");
  try {
   const response = await aiService.explainConcept(documentId, concept);
const explanation = response.data.explanation;
    setModalTitle(`Explanation of "${concept}"`);
    setModalContent(explanation);
    setIsModalOpen(true);
    setConcept("");
  } catch (error) {
    toast.error("Failed to explain concept.");
  } finally {
    setLoadingAction(null);
  }
}

return(
  <>
  <div className="bg-white rounded-xl shadow-xl h-110 flex flex-col">
    <div className="flex border-b-1 border-gray-300/60   p-5">
      <div className="flex items-center justify-center  rounded-xl bg-green-600/80 shadow-md  text-white px-3 mr-4">
        <Sparkles size={23}/>

      </div>
      <div>
        <p className="font-bold text-lg ">AI Assistant</p>
        <p className="font-semibold text-sm text-gray-500">Powered by advanced AI</p>
      </div>

    </div>


    <div className=" flex flex-col gap-5 m-5">
      <div className="border border-gray-300 rounded-xl shadow-md p-4">

       <div className="flex justify-between">
         <div className="flex items-center ">
          <div className="text-blue-700/80 p-2 mr-2 rounded-xl bg-blue-100 shadow-sm">
            <BookOpen size={18} strokeWidth={2.5}/>
          </div>
          <div>
            <p className="font-bold text-lg ">Generate Summary</p>
          </div>
        </div>
        <div>
         <button onClick={handleGenerateSummary} disabled={loadingAction==="summary"} className="text-white font-bold px-4 py-2 rounded-xl bg-green-700/80 shadow-md">
    {loadingAction === "summary" ?(
      <span>
        <div>
          Loading...
        </div>
      </span>
    ):("Summarize")}
  </button>
        </div>
       </div>
       <p className="font-semibold text-gray-700/60 mt-3 mb-2 ">Get a concise summary of the entire document</p>
      </div>

 <form onSubmit={handleExplainConcept}>
  <div className="border border-gray-300 rounded-xl shadow-md p-4">

       <div className="flex justify-between">
         <div className="flex items-center ">
          <div className="text-yellow-700/80 p-2 mr-2 rounded-xl bg-yellow-100 shadow-sm">
            <Lightbulb size={18} strokeWidth={2.5}/>
          </div>
          <div>
            <p className="font-bold text-lg ">Explain a Concept</p>
          </div>
        </div>
        <div>
        
        </div>
       </div>
       <p className="font-semibold text-gray-700/60 mt-3 mb-2 ">Enter a topic or concept from the document to get a detailed explanation</p>
        <div className="flex justify-between">
        <input type='text' value={concept} onChange={(e)=>setConcept(e.target.value)} placeholder="eg.react hooks" className=" border-gray-400/50 border w-full transition-all duration-200 outline-none hover:border-green-500 hover:border-2 text-sm px-3 mr-3 rounded-xl" disabled={loadingAction==="explain"}></input>
        <div>
           <button type='submit' disabled={loadingAction === "explain" || !concept.trim() } className={`text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all duration-200
  ${concept.trim() 
    ? "bg-green-700 opacity-100" 
    : "bg-green-700/40 opacity-50 cursor-not-allowed"
  }`}>
      {loadingAction === "explain" ?(
        <span>
          <div>
            Loading....
          </div>
        </span>
      ):("Explain")}

    </button>

        </div>
      </div>
       

      </div>
     

 </form>
      



      

    </div>


  </div>


{isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
   
    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto p-6">
   
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">{modalTitle}</p>
        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500 text-xl font-bold">✕</button>
      </div>

      
      <div className="text-gray-700 text-sm">
        <ReactMarkdown>{modalContent}</ReactMarkdown>
      </div>

    </div>
  </div>
)}



  </>
)
  {/* 

 
    
   
  </form> */}


}

export default AIActions;