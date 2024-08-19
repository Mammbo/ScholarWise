import React from 'react'
import Image from "next/image"
import HeroCarousel from '@/components/HeroCarousel'
import { scholarship, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import SearchBar from '@/components/SearchBar'
import { getScholarships } from '@/lib/actions'
import mongoose from 'mongoose'


async function getData(): Promise<scholarship[]> {
  // fetch data from your db's api
  let data = await getScholarships();
  return data
}

export default async function Page() {
  const data = await getData()

  return (
    <>
      <section className='px-6 md:px-20 py-24 '>
          <SearchBar />
        <div className="flex max-xl:flex-col gap-16">
          <div className='flex flex-col justify-center '>
            <p className="small-text">
              Finding Funding For Your Education Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className='head-text'>
              Finding Scholarships has Never Been Easier With
              <span className='text-primary'> ScholarSearch</span>
            </h1>

            <p className="mt-6">
              You're probably in scholarship season right now or just stressing out about how to pay for school. Well, ScholarSearch will help you find and manage your Scholarships. 
            </p>
          </div>

          <HeroCarousel />
        </div>
      </section>
      
      <section className='scholarship-section'>
          <div className='flex scholar flex-col'>

              <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
              </div>
              
          </div>
      </section>
    </>
  )
}


