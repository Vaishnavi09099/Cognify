import React, { useEffect, useState } from 'react'
import progressService from '../../services/progressService'
import toast from 'react-hot-toast'
import { FileText, BookOpen, BrainCircuit, TrendingUp, Clock } from 'lucide-react'  // ✅ Icon remove kiya
import { ClipLoader } from "react-spinners";
import AppLayout from '../../components/layout/AppLayout';

const DashboardPage = () => {
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
      icon: FileText,        // ✅ Component reference save hai
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
    }
  ];

  return (
    <AppLayout>
      <div className='p-6'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-gray-500 mb-6'>Track your learning progress and activity</p>

        {/* Stats Cards */}
        <div className='grid grid-cols-3 gap-4 mb-8'>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;  // ✅ stat.icon (stat, stats nahi)
            return (
              <div key={index} className='bg-white rounded-xl p-4 shadow'>  {/* ✅ key add kiya */}
                <p className='text-gray-500 text-sm'>{stat.label}</p>   {/* ✅ stat.label */}
                <p className='text-2xl font-bold'>{stat.value}</p>       {/* ✅ stat.value */}
                <div className='mt-2'>
                  <IconComponent size={20} />  {/* ✅ Capital letter wala component */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-xl p-4 shadow'>
          <div className='flex items-center gap-2 mb-4'>
            <Clock size={18} />
            <h2 className='text-lg font-semibold'>Recent Activity</h2>
          </div>

          {dashboardData.recentActivity?.documents.length > 0 ? (
            dashboardData.recentActivity.documents.map((doc, index) => (
              <div key={doc._id || index} className='border-b py-2'>  {/* ✅ key add kiya */}
                <div>
                  <p className='font-medium'>Accessed: {doc.title}</p>
                  <p className='text-sm text-gray-400'>
                    {new Date(doc.lastAccessed).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-400'>No recent activity</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;