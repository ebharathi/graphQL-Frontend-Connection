import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navabar'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='mx-28 parent'>
        <Navbar/>
        
    </main>
  )
}
