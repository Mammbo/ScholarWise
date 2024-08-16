"use server"

import { scrapeScholarshipWebsiteACT, scrapeScholarshipWebsiteAppily, scrapeScholarshipWebsiteCareerOneStop, scrapeScholarshipWebsiteCollegeBoard, scrapeScholarshipWebsiteJLVCounseling } from "../scraper";

export async function scrapeAndStoreScholarship() {
    try {
      // connect to database

      console.log("Scraping and storing scholarships...");
      const scrapedScholarship1 = await scrapeScholarshipWebsiteACT("https://www.act.org/content/act/en/students-and-parents/college-planning-resources/paying-for-college/free-college-scholarships/free-college-scholarships-info.html?submissionGuid=9f7183aa-9c5d-4a24-93ba-8c88a12fd164"); {
      
      console.log("Scholarship data:" , scrapedScholarship1);
      }
/*
      console.log("Scraping and storing scholarships...");
      const scrapedScholarship2 = await scrapeScholarshipWebsiteJLVCounseling("https://jlvcollegecounseling.com/scholarships/all-scholarships-2/"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship2);
      }
/*
      console.log("Scraping and storing scholarships...");
      const scrapedScholarship3 = await scrapeScholarshipWebsiteAppily("https://www.appily.com/guidance/equity-and-access#tab_522046_3"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship3);
      }

      console.log("Scraping and storing scholarships...");
      const scrapedScholarship4 = await scrapeScholarshipWebsiteCareerOneStop("https://www.careeronestop.org/Toolkit/Training/find-scholarships.aspx?curPage=1&sortcolumns=Deadline&sortdirections=DESC&studyLevelfilter=High%20School&awardTypefilter=Scholarship"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship4);
      }

      console.log("Scraping and storing scholarships...");
      const scrapedScholarship5 = await scrapeScholarshipWebsiteCollegeBoard("https://bigfuture.collegeboard.org/scholarship-search"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship5);
      }
      */
    } catch (error: any) {
      throw new Error(`Failed to create/update scholarship: ${error.message}`)
      
    }
}