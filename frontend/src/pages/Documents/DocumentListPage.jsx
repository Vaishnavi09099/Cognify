import { FileText, Plus, Trash2, Upload, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import documentService from '../../services/documentService'
import { ClipLoader } from "react-spinners";
import DocumentCard from './DocumentCard.jsx';
import AppLayout from '../../components/layout/AppLayout';


const DocumentListPage = () => {
  const[documents,setDocuments] = useState([]);
  const[loading,setLoading] = useState(true);
  const[isUploadModalOpen,setIsUploadModalOpen] = useState(false);
  const[uploadFile,setUploadFile]=useState(null);
  const[uploadTitle,setUploadTitle] = useState("");
  const[uploading,setUploading] = useState(false);

  const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const[deleting,setDeleting]=useState(false);
  const[selectedDoc,setSelectedDoc]=useState(null);

  const fetchDocuments =async ()=>{
    try{
      const data = await documentService.getDocuments();
      setDocuments(data.data || []);
    }catch(err){
      toast.error("failed to fetch documnets");
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchDocuments();
  },[])

  const handleFileChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      setUploadFile(file);
      setUploadTitle(file.name.split(".")[0])
    }
  };

  const handleUpload = async (e)=>{
    e.preventDefault();
    if(!uploadFile || !uploadTitle){
      toast.error("Please provide a title and select a file!");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file",uploadFile);
    formData.append("title",uploadTitle);

    try{
      await documentService.uploadDocument(formData);
      toast.success("Document uploaded succesfully");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();

    }catch(error){
      toast.error(error.message || "Upload failed.");
    }finally{
      setUploading(false);
    }
  }

  const handleDeletRequest = (doc)=>{
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  }
  
  const handleConfirmDelete = async ()=>{
    if(!selectedDoc) return;
    setDeleting(true);
    try{
      await documentService.deleteDocument(selectedDoc._id);
      toast.success(`'${selectedDoc.title}' deletd.`);
      setIsDeleteModalOpen(false);
      setSelectedDoc(null);
      setDocuments(documents.filter((d)=>d._id !== selectedDoc._id));
    }catch(err){
      toast.error(err.message || "Failed to delete document.");
    }finally{
      setDeleting(false);
    }
  }

  const renderContent = ()=>{
    //  if(loading){
    //   return <ClipLoader color="#00d492" size={24} />;
      
    // }
    
    // if(documents.length===0){
    //   return(
        
    //        <div className='flex items-center mt-20 flex-col justify-center'>
    //       <div className='rounded-xl text-gray-600/80 p-4 mb-5 shadow-md bg-gray-300/50'>
    //         <FileText size={30} />
    //       </div>
    //       <p className='font-semibold text-lg '>No Documents Yet</p>
    //       <p className='text-gray-600 font-semibold/80 mb-5'>Get started by uploading your first PDF document to begin learning.</p>
    //         <div onClick={()=>setIsUploadModalOpen(true)}  className='flex  items-center p-3 shadow-md  bg-green-600/80  hover:-translate-y-1 transition-all ease-in-out  duration-300 cursor-pointer border-none text-white font-bold rounded-xl p-2'>
    //         <Plus />
    //         <p>Upload Document</p>

    //       </div>
    //    </div>

    //   )
    // }

    return (
     
      <div className='flex'>
        {documents.map((doc)=>(
          <DocumentCard document ={doc} onDelete={handleDeletRequest}
        >
  </DocumentCard>
        ))}
      </div>
    )


  }

  
  return (

    <AppLayout>
      <div className='flex justify-between p-2 m-4 ml-10 '>
        <div >
          <p className='font-semibold text-3xl mb-2'>My Documents</p>
          <p className='text-gray-500/70 font-semibold'>Manage and organize your learning materials</p>
</div>


   <div onClick={()=>setIsUploadModalOpen(true)} className=' p-2 mr-10 cursor-pointer'>
          <div  className='flex items-center p-3 shadow-md  bg-green-600/80 border-none text-white font-bold rounded-xl p-2'>
            <Plus />
            <p>Upload Document</p>

          </div>
         </div>
    </div>
 
<div>
{renderContent()}
</div>



{isUploadModalOpen && (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm'>
  <div className='relatie w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-4'>
    <button onClick={()=>setIsUploadModalOpen(false)}>
      <X />
    </button>

    <div>
      <h2>
        Upload New document
      </h2>
      <p>
        Add a pdf document to ur library
      </p>
    </div>

    <form onSubmit={handleUpload}>
      <div>
        <label>
          Document title
        </label>
        <input
        type='text'
        value={uploadTitle}
        onChange={(e)=>setUploadTitle(e.target.value)}
        required
        className=''
        placeholder='eg.React interview prep'
          />
        
      </div>

      <div>
        <label>
          PDF File
        </label>
        <div>
          <input
          type="file"
          className=''
          onChange={handleFileChange}
          accept='.pdf'
          
          />
          <div>
            <div>
              <Upload />


            </div>
            <p>{uploadFile ? (
              <span>{uploadFile.name}</span>
            ):(
              <>
              <span>
                Click to upload
              </span>
              or drag and drop
              
              </>
            )}</p>

            <p>Pdf upto 10mb</p>
          </div>
        </div>
      </div>

      <div>
        <button
        type='button'
        onClick={()=>setIsUploadModalOpen(false)}
        disabled={uploading}
        className=''
        >
          Cancel

        </button>
        <button
        type='submit'
        disabled={uploading}
        className=''>
          {uploading ?(
            <span>
              <div />
                Uplaoding.....
              
            </span>
          ):(
            "upload"
          
          )}

        </button>
      </div>
    </form>
  </div>

  </div>
)}


 </AppLayout>
 )

}

export default DocumentListPage