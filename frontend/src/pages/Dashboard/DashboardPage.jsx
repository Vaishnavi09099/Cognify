import React, { useEffect, useState } from 'react'
import progressService from '../../services/progressService'
import toast from 'react-hot-toast'
import { FileText, BookOpen, BrainCircuit, TrendingUp, Clock } from 'lucide-react'  
import { ClipLoader } from "react-spinners";
import AppLayout from '../../components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data___getDashboardData", data);
        setDashboardData(data.data);
      } catch (err) {
        toast.error("Failed to fetch dashboard data.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <ClipLoader color="#00d492" size={24} />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className='min-h-screen bg-gray-200 flex justify-center items-center'>
        <div className='text-center'>
          <TrendingUp className='mx-auto mb-2' />
          <p>No dashboard data available.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Documents',
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      bg: ' bg-blue-500/70',   
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      bg:'bg-purple-500/70',
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      bg:'bg-green-500/70',
    }
  ];


  return(
    <AppLayout>
       
                <div className='p-5'>
    
      <h1 className='font-bold text-3xl'>Dashboard</h1>
      <p className='text-gray-600 font-semibold pt-2'>Track your learning progress and activity</p>
    </div>

    <div className='flex  gap-8'>
     {stats.map((stat,index)=>{
      const IconComponent = stat.icon;
      return(
        <div key={index} className='bg-white flex-1 flex justify-between p-5 m-5  border-none rounded-2xl shadow-lg  hover:-translate-y-1 transition-all duration-300 ease-in-out'>
          <div>
            <p className='uppercase font-semibold text-sm text-gray-500'>{stat.label}</p>
            <p className='font-bold text-3xl mt-2'>{stat.value}</p>

          </div>
          <div> 
            <div className={`border-none shadow-md p-2 rounded-xl ${stat.bg}`  }>
                 <IconComponent size={20} className='text-white'/>

            </div>

         

          </div>
        </div>
      )
     })}




    </div>

    <div className='bg-white p-8 m-5 rounded-2xl shadow-xl'>
      <div className='flex items-center mb-5 '>
        <div className='bg-gray-300 shadow-md  p-2 rounded-xl'>
            <Clock className=''/>

        </div>
      
        <p className='ml-3 text-2xl font-bold '>Recent Activity</p>
      </div>
      {dashboardData.recentActivity && (dashboardData.recentActivity.documents.length>0 || dashboardData.recentActivity.quizzes.length>0) ? (
        <div>
          {[
            ...(dashboardData.recentActivity.documents || []).map(doc =>({
              id:doc._id,
              description:doc.title,
              timestamp:doc.lastAccessed,
                   link:`/documents/${doc._id}`,
                 type:'document'
            })),
            ...(dashboardData.recentActivity.quizzes || []).map(quiz =>({
              id:quiz._id,
              description:quiz.title,
              timestamp:quiz.lastAccessed,
                   link:`/quizzes/${quiz._id}`,
                 type:'quiz'
            })),
          ]
          .sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp))
          .map((activity,index)=>{
            return(
             
                 <div className='bg-gray-100/50 mb-3 hover:shadow-md hover:-translate-y-1 transition-all rounded-xl p-4 flex justify-between border border-gray-300/50 ' key={index}>

                <div className=''>
                 <p className='font-bold'><span className={`w-2 h-2 inline-block mr-2 rounded-xl ${activity.type==='document' ?'bg-green-500' :'bg-blue-500'}`}></span>
                  {activity.type==='document'?"Accessed Document: " :"Attempted Quiz: "}<span className='font-semibold text-gray-900'>{activity.description}</span></p>
                 <p className='text-gray-600 '>{new Date(activity.timestamp).toLocaleString()}</p>
                  

                </div>
                <div >
                  {activity.link &&(<a className='text-green-600 font-bold' href='activity.link'>View</a>)}
                  
                </div>

              </div>

           
             
            )
          })

          }
        </div>
      ):(
        <div>
          <h1>No recent Activity here</h1>
          <h2>Start learning to see your progress</h2>
        </div>
      )}


    </div>

        

      
    </AppLayout>
    
  )
}

export default DashboardPage;
  

                  


