'use client'
import Layout from '@/layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Home page">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to SeeFood</h1>
        
        <Link href="/dashboard" passHref>
          <button className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </button>
        </Link>
        <div className="text-center mt-20">
          <p className="inline text-lg">SeeFood 🤨?</p>
            <a href='https://silicon-valley.fandom.com/wiki/SeeFood' target='_blank' className="text-lg text-blue-500 hover:text-blue-700 font-bold ml-2">Find out why</a>
         
        </div>
      </div>
    </Layout>
  );
}
