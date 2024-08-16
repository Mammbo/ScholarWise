"use client"

import { scrapeAndStoreScholarship } from "@/lib/actions"
import { Button } from "./ui/button"

const SearchBar = () => {

async function runScrapingProcess(){
  try { 
    const scholarshipData = await scrapeAndStoreScholarship();
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Button onClick={() => runScrapingProcess()}
    className='flex flex-wrap gap-4 btn'
    >
      test-scrape-button
    </Button>
  )
}


export default SearchBar